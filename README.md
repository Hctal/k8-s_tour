# Kubernetes Hands-on Manifests (demo)

This folder contains a comprehensive, opinionated set of example Kubernetes manifests you can apply to learn and test core Kubernetes resources.

Structure
- `00-namespace/namespace.yaml` — creates `demo` namespace.
- `01-configs/` — `ConfigMap` and `Secret` examples.
- `02-apps/` — example `Deployment` and `Service` (ClusterIP + LoadBalancer) for a simple app.
- `03-stateful/` — `StatefulSet` example (Postgres) with a PVC template.
- `04-storage/` — `PersistentVolume` and `StorageClass` (local example).
- `05-networking/` — `NetworkPolicy` deny-all example.
- `06-ingress/` — `Ingress` example (nginx ingress class).
- `07-rbac/` — `ServiceAccount`, `Role` and `RoleBinding`.
- `08-jobs/` — `Job` and `CronJob` examples.
- `09-daemonsets/` — `DaemonSet` example (node exporter).
- `10-hpa/` — `HorizontalPodAutoscaler` sample (requires metrics-server).

Quick apply order (recommended)
1. Create namespace and storage primitives:
```powershell
kubectl apply -f .\k8s\00-namespace\namespace.yaml
kubectl apply -f .\k8s\04-storage\storageclass.yaml
kubectl apply -f .\k8s\04-storage\pv.yaml
```
2. Configs and RBAC:
```powershell
kubectl apply -f .\k8s\01-configs\configmap.yaml
kubectl apply -f .\k8s\01-configs\secret.yaml
kubectl apply -f .\k8s\07-rbac\serviceaccount.yaml
kubectl apply -f .\k8s\07-rbac\role.yaml
kubectl apply -f .\k8s\07-rbac\rolebinding.yaml
```
3. Apps and stateful workloads:
```powershell
kubectl apply -f .\k8s\02-apps\deployment.yaml
kubectl apply -f .\k8s\02-apps\service-clusterip.yaml
# Optional LoadBalancer service
kubectl apply -f .\k8s\02-apps\service-lb.yaml
kubectl apply -f .\k8s\03-stateful\statefulset-postgres.yaml
```
4. Networking/Ingress/HPA/Monitoring/Jobs:
```powershell
kubectl apply -f .\k8s\05-networking\networkpolicy.yaml
kubectl apply -f .\k8s\06-ingress\ingress.yaml
kubectl apply -f .\k8s\09-daemonsets\daemonset-node-exporter.yaml
kubectl apply -f .\k8s\10-hpa\hpa.yaml
kubectl apply -f .\k8s\08-jobs\job.yaml
kubectl apply -f .\k8s\08-jobs\cronjob.yaml
```

Notes & prerequisites
- Ensure your `kubectl` context points to a running cluster (`kubectl cluster-info`).
- For `LoadBalancer` services you need a cloud provider or MetalLB for on-prem clusters.
- `HPA` requires `metrics-server` to be installed; `ingress` requires an ingress controller (e.g., ingress-nginx) installed in cluster.
- The `PersistentVolume` uses `hostPath` for local clusters — adapt for cloud storage (e.g., AWS EBS, GCE PD).
- `NetworkPolicy` examples assume a network plugin that implements policies (Calico, Cilium, etc.).

Tear down
```powershell
kubectl delete namespace demo
# Or delete in reverse apply order if you want more control
```

If you want, I can:
- Run `kubectl` diagnostic commands to check your cluster and point out which resources will fail to apply (e.g., missing ingress controller, metrics-server, cluster down).
- Convert this structure to a `kustomize` or `Helm` chart.
- Add a small sample app Dockerfile and steps to build and deploy a custom image.

Application access (sample `myapp`)
----------------------------------

- The demo web app is packaged as a local image and served on port `3000` inside the pod. For local testing we forward it to a host port.
- Current deployed image tag: **`myapp:3.5.0`** (may change as you iterate).
- Default local port-forward we use in this workspace: **`3018` → `3000`**.

Quick access (PowerShell)
```powershell
# Port-forward the service to localhost:3018
kubectl -n demo port-forward svc/myapp-svc 3018:3000

# Open the app in your browser at:
# http://127.0.0.1:3018
```

Run port-forward in a separate terminal if you want it to stay active. To start it in a new PowerShell window:
```powershell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "kubectl -n demo port-forward svc/myapp-svc 3018:3000"
```

Build & deploy a new local image (minikube)
```powershell
# Build image into minikube's daemon and tag it
minikube image build -t myapp:3.5.0 C:\Users\latch\PROJECTS\KUBERNETES\myapp

# Update the deployment and watch rollout
kubectl -n demo set image deployment/myapp myapp=myapp:3.5.0
kubectl -n demo rollout status deployment/myapp --timeout=120s
```

Features & UI notes
- Hearts effect: heart emoji particles fall automatically on the main page when you open the app (no button required).
- Upside-Down: click the **"Upside Down"** button in the site header to enable an inverted visual filter and **snow** particles; hearts are paused while Upside-Down is active and will resume after returning to the main view.

Troubleshooting
- If port 3018 is in use or port-forward fails, change the host port (e.g., `1830:3000` or `8888:3000`) when running `kubectl port-forward`.
- Kill stuck port-forward processes on Windows:
```powershell
taskkill /F /IM kubectl.exe /T 2>$null
```
- If `Ingress` is not routing traffic, ensure the ingress controller is installed and ready (e.g., `minikube addons enable ingress`), then check `kubectl -n ingress-nginx get pods`.

```
