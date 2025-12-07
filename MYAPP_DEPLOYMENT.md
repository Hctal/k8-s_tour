# MyApp Deployment Guide

## Overview
A custom Node.js web application deployed to your Kubernetes cluster via Ingress.

## What was created

### Source Code (`myapp/` folder)
- **`package.json`** — Node.js dependencies (Express framework).
- **`index.js`** — Simple web server:
  - `/` — HTML page showing pod info, app version, request time.
  - `/health` — JSON health check endpoint.
- **`Dockerfile`** — Container image with Node.js 20 Alpine.

### Docker Image
- Built as `myapp:1.0.0` in minikube (no push to registry needed).
- Image size: ~180 MB.
- Health check: pings `/health` every 30 seconds.

### Kubernetes Manifests
- **`k8s/02-apps/deployment-myapp.yaml`** — Deployment (2 replicas).
  - Image: `myapp:1.0.0`.
  - Port: 3000.
  - Resource requests: 64Mi RAM, 100m CPU.
  - Readiness & liveness probes: check `/health` endpoint.
- **`k8s/02-apps/service-myapp.yaml`** — ClusterIP Service (port 3000).
- **`k8s/06-ingress/ingress-myapp.yaml`** — Ingress routing `myapp.local` → service.

### Current Status
- **Deployment:** Running (2/2 pods ready).
- **Service:** ClusterIP at `10.106.237.43:3000`.
- **Ingress:** Accessible at `192.168.49.2` with Host header `myapp.local`.

## Access the app

### From in-cluster (always works):
```powershell
kubectl run --rm -i --tty curlpod --image=curlimages/curl --restart=Never --namespace demo -- \
  sh -c "curl -H 'Host: myapp.local' http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/"
```

### From your host (requires setup):

**Option 1: PowerShell Invoke-WebRequest**
```powershell
Invoke-WebRequest -Uri http://192.168.49.2/ -Headers @{ Host = 'myapp.local' } -UseBasicParsing
```

**Option 2: Add hosts entry and use browser**
- Edit `C:\Windows\System32\drivers\etc\hosts` (admin rights):
  ```
  192.168.49.2 myapp.local
  ```
- Open browser: `http://myapp.local/`

**Option 3: Port forward (easiest)**
```powershell
kubectl port-forward svc/myapp-svc 3000:3000 -n demo
```
Then open: `http://localhost:3000/`

## Common tasks

### View logs
```powershell
kubectl logs -f deployment/myapp -n demo
kubectl logs -f pod/<pod-name> -n demo
```

### Scale the deployment
```powershell
kubectl scale deployment myapp --replicas=5 -n demo
kubectl get pods -n demo -l app=myapp
```

### Check metrics
```powershell
kubectl top pods -n demo -l app=myapp
```

### Update the app
1. Edit `myapp/index.js`
2. Rebuild image:
   ```powershell
   cd C:\Users\latch\PROJECTS\KUBERNETES\myapp
   minikube image build -t myapp:1.0.1 .
   ```
3. Update `k8s/02-apps/deployment-myapp.yaml`: change `image: myapp:1.0.0` → `myapp:1.0.1`
4. Re-apply:
   ```powershell
   kubectl apply -f k8s/02-apps/deployment-myapp.yaml
   ```

### Delete the app
```powershell
kubectl delete deployment myapp -n demo
kubectl delete service myapp-svc -n demo
kubectl delete ingress myapp-ingress -n demo
```

## Troubleshooting

**Pod not starting / CrashLoopBackOff:**
```powershell
kubectl describe pod <pod-name> -n demo
kubectl logs <pod-name> -n demo
```

**Can't reach from host:**
- Verify ingress: `kubectl get ingress -n demo`
- Verify service: `kubectl get svc -n demo`
- Try port-forward instead: `kubectl port-forward svc/myapp-svc 3000:3000 -n demo`

**Image not found:**
- Check minikube built it: `minikube image ls | Select-String myapp`
- Verify `imagePullPolicy: Never` in deployment (tells k8s not to pull from registry).

## Next steps
- Modify the app, rebuild image, redeploy.
- Add database connection (use postgres StatefulSet already in cluster).
- Add environment variables via ConfigMap.
- Set up auto-scaling (HPA already configured).
