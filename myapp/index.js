const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || 'unknown';
const version = process.env.APP_VERSION || '1.0.0';

// Mock movie data with details
const movies = [
  { id: 1, title: 'Kubernetes Quest', badge: 'New', genre: 'Sci-Fi', rating: 8.5, image: '🚀', year: 2024, duration: '2h 15m', director: 'Cloud Architect', description: 'An epic journey through the Kubernetes ecosystem, discovering the secrets of container orchestration.' },
  { id: 2, title: 'Container Dreams', genre: 'Drama', rating: 8.2, image: '📦', year: 2023, duration: '1h 58m', director: 'DevOps Master', description: 'A heartfelt story about developers learning to containerize their applications and scale globally.' },
  { id: 3, title: 'Pod Racing', badge: 'Trending', genre: 'Action', rating: 8.8, image: '🏎️', year: 2024, duration: '2h 5m', director: 'Speed Demon', description: 'High-octane action as pods compete in a thrilling race across distributed clusters worldwide.' },
  { id: 4, title: 'Service Mesh', genre: 'Thriller', rating: 8.0, image: '🕸️', year: 2023, duration: '2h 20m', director: 'Network Ninja', description: 'A tense thriller about microservices communicating through a complex service mesh, facing security threats.' },
  { id: 5, title: 'Helm Adventures', genre: 'Adventure', rating: 8.7, image: '⛵', year: 2024, duration: '2h 10m', director: 'Release Captain', description: 'Join the crew as they navigate the seas of Kubernetes deployments using Helm charts as their compass.' },
  { id: 6, title: 'Docker Nights', genre: 'Romance', rating: 7.9, image: '🐳', year: 2023, duration: '1h 52m', director: 'Love.dev', description: 'A romantic comedy about two developers who fall in love while debugging their Docker containers.' },
  { id: 7, title: 'Ingress Infinity', genre: 'Action', rating: 8.6, image: '♾️', year: 2024, duration: '2h 12m', director: 'Gateway Guardian', description: 'An infinite loop of action as traffic routes through the ingress controller facing impossible challenges.' },
  { id: 8, title: 'StatefulSet Story', genre: 'Drama', rating: 8.3, image: '📊', year: 2023, duration: '2h 8m', director: 'Data Keeper', description: 'A powerful drama about maintaining state in a stateless world, starring a determined database.' },
  { id: 9, title: 'Replica Revolt', badge: 'New', genre: 'Sci-Fi', rating: 8.1, image: '🔁', year: 2025, duration: '1h 50m', director: 'Scale Maestro', description: 'Replicas come alive and orchestrate a synchronized rebellion across multiple nodes.' },
  { id: 10, title: 'Helm Charted', genre: 'Adventure', rating: 7.8, image: '⚓', year: 2022, duration: '2h 0m', director: 'Chart Captain', description: 'A voyage through charts and templates to deploy a fleet of resilient apps.' },
  { id: 11, title: 'Persistent Love', genre: 'Romance', rating: 7.6, image: '💾', year: 2021, duration: '1h 45m', director: 'Storage Sage', description: 'A tender story about two volumes finding a way to persist together.' },
  { id: 12, title: 'Controller Loop', badge: 'Trending', genre: 'Thriller', rating: 8.4, image: '⚙️', year: 2025, duration: '2h 4m', director: 'Reconciler', description: 'A controller races to reconcile the desired state before chaos breaks the cluster.' },
];

app.get('/', (req, res) => {
  const movieHTML = movies.map(m => `
    <div class="movie-card">
      ${m.badge ? `<div class="badge ${m.badge.toLowerCase()}">${m.badge}</div>` : ''}
      <div class="movie-image">${m.image}</div>
      <h3>${m.title}</h3>
      <p class="genre">${m.genre} • ${m.year}</p>
      <p class="rating">⭐ ${m.rating}/10</p>
    </div>
  `).join('');

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Latch's Kubernetes Streaming</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          color: #fff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          /* allow normal horizontal behavior while clamping inner containers
             so Upside-Down doesn't prevent expected scroll gestures */
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        
        header {
          background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%);
          padding: 20px 50px;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 2px solid #e50914;
        }
        
        .logo {
          font-size: 32px;
          font-weight: bold;
          color: #e50914;
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .toggle-btn {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.12);
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 13px;
        }

        .toggle-btn:hover {
          background: rgba(255,255,255,0.04);
          transform: translateY(-1px);
        }
        
        .pod-info {
          position: absolute;
          top: 20px;
          right: 50px;
          font-size: 12px;
          background: rgba(229, 9, 20, 0.2);
          padding: 8px 15px;
          border-radius: 20px;
          border: 1px solid #e50914;
        }
        
        .hero {
          background: linear-gradient(180deg, rgba(229,9,20,0.3) 0%, transparent 100%),
                      url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"><rect fill="%23e50914" opacity="0.1" width="1200" height="400"/></svg>');
          padding: 60px 50px;
          text-align: center;
          margin-bottom: 40px;
        }
        
        .hero h1 {
          font-size: 48px;
          margin-bottom: 20px;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.8);
        }
        
        .hero p {
          font-size: 18px;
          color: #b3b3b3;
          margin-bottom: 30px;
        }
        
        .container {
          padding: 0 50px;
          max-width: 1400px;
          margin: 0 auto;
          /* prevent accidental page-level horizontal overflow from inner content */
          overflow-x: hidden;
        }
        
        .section-title {
          font-size: 24px;
          margin-bottom: 20px;
          font-weight: bold;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .movies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
          margin-bottom: 50px;
          animation: fadeIn 0.6s ease-in;
          /* prevent horizontal sliding of the whole grid on touch devices */
          overflow-x: hidden;
          touch-action: pan-y;
        }

        /* Disable hover-based scaling on devices that don't support hover (touch) */
        @media (hover: none) {
          .movie-card:hover {
            transform: none;
            box-shadow: none;
          }
        }
        
        @keyframes fadeIn {
          /* only fade opacity to avoid any sliding/translate effects */
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .movie-card {
          background: linear-gradient(135deg, #1f1f1f 0%, #2a2a2a 100%);
          border-radius: 8px;
          overflow: hidden;
          cursor: default; /* no click interaction */
          transition: all 0.2s ease;
          border: 2px solid transparent;
          padding: 0;
          position: relative;
        }

        .badge {
          position: absolute;
          top: 10px;
          left: 10px;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          color: #111;
          z-index: 30;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }

        .badge.new {
          background: linear-gradient(90deg,#9be7a6,#57d17b);
        }

        .badge.trending {
          background: linear-gradient(90deg,#ffd97d,#ffb84d);
        }
        
        .movie-card:hover {
          /* remove transform-based scaling to prevent sliding/shift */
          border-color: #e50914;
          box-shadow: 0 6px 20px rgba(229, 9, 20, 0.35);
        }
        
        .movie-image {
          font-size: 80px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
          border-bottom: 2px solid #e50914;
        }
        
        .movie-card h3 {
          padding: 12px 10px 5px;
          font-size: 14px;
          min-height: 40px;
          display: flex;
          align-items: center;
          text-align: center;
        }
        
        .movie-card p {
          padding: 0 10px;
          font-size: 12px;
          color: #b3b3b3;
        }
        
        .genre { margin: 5px 0; }
        .rating { margin: 8px 0; color: #e50914; font-weight: bold; }
        
        .play-btn {
          width: 100%;
          padding: 10px 12px;
          background: #e50914;
          color: white;
          border: 2px solid transparent;
          border-radius: 4px;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          margin-top: 8px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 0 rgba(229, 9, 20, 0.4);
        }
        
        .play-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .play-btn:hover:not(:disabled) {
          background: #c4081d;
          border-color: rgba(229, 9, 20, 0.8);
          box-shadow: 0 0 20px rgba(229, 9, 20, 0.6), inset 0 0 10px rgba(255,255,255,0.1);
          animation: pulse-glow 0.6s ease-out;
        }
        
        .play-btn:focus:not(:disabled) {
          outline: 2px solid #e50914;
          outline-offset: 2px;
        }

        .play-btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        .play-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: linear-gradient(135deg, #5a0a0d 0%, #6f1518 100%);
          border-color: rgba(229, 9, 20, 0.3);
          box-shadow: none;
        }

        @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 0 rgba(229, 9, 20, 0.6), inset 0 0 10px rgba(255,255,255,0.1);
          }
          50% {
            box-shadow: 0 0 30px rgba(229, 9, 20, 0.8), inset 0 0 15px rgba(255,255,255,0.15);
          }
          100% {
            box-shadow: 0 0 20px rgba(229, 9, 20, 0.6), inset 0 0 10px rgba(255,255,255,0.1);
          }
        }
        
        /* Modal Styles */
        .modal {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 1000;
          background-color: rgba(0, 0, 0, 0.8);
          animation: fadeIn 0.3s ease;
          -webkit-overflow-scrolling: touch;
          /* ensure modal and its content don't inherit any page-level transform
             or flipping behavior so the modal stays in the same readable orientation */
          transform: none !important;
          backface-visibility: hidden;
        }

        .modal.show {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Fullscreen single-card mode for a focused view */
        .modal.fullscreen .modal-content {
          max-width: 980px;
          width: calc(100% - 32px);
          height: 80vh;
          max-height: 80vh;
        }

        .modal-content {
          background: linear-gradient(135deg, #1f1f1f 0%, #2a2a2a 100%);
          padding: 30px;
          border-radius: 12px;
          max-width: 720px;
          width: calc(100% - 40px);
          border: 2px solid #e50914;
          box-shadow: 0 0 30px rgba(229, 9, 20, 0.6);
          animation: slideUp 0.3s ease;
          max-height: 80vh;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
          /* keep modal content orientation and smooth scrolling in upside-down */
          transform: none;
          margin: 16px;
        }
        
        @keyframes slideUp {
          /* keep modal animation subtle (opacity only) to avoid movement */
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        
        .modal-title {
          font-size: 32px;
          font-weight: bold;
          color: #fff;
        }
        
        .close-btn {
          font-size: 28px;
          font-weight: bold;
          color: #e50914;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .close-btn:hover {
          transform: scale(1.2);
          color: #fff;
        }
        
        .modal-image {
          font-size: 100px;
          text-align: center;
          margin: 20px 0;
        }
        
        .modal-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin: 20px 0;
          padding: 15px;
          background: rgba(229, 9, 20, 0.1);
          border-radius: 8px;
        }
        
        .detail-item {
          font-size: 13px;
        }
        
        .detail-label {
          color: #e50914;
          font-weight: bold;
        }
        
        .detail-value {
          color: #b3b3b3;
          margin-top: 3px;
        }
        
        .modal-description {
          font-size: 16px;
          color: #d0d0d0;
          line-height: 1.6;
          margin: 20px 0;
          font-style: italic;
        }
        
        .modal-buttons {
          display: flex;
          gap: 15px;
          margin-top: 25px;
        }
        
        .btn-play {
          flex: 1;
          padding: 12px;
          background: #e50914;
          color: white;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-play:hover {
          background: #c4081d;
          transform: scale(1.05);
        }
        
        .btn-close-modal {
          flex: 1;
          padding: 12px;
          background: #333;
          color: white;
          border: 1px solid #555;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-close-modal:hover {
          background: #444;
          border-color: #e50914;
        }
          background: #000;
          padding: 30px 50px;
          margin-top: 50px;
          border-top: 1px solid #e50914;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        
        .status-bar {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          padding: 15px;
          background: rgba(229, 9, 20, 0.1);
          border-radius: 5px;
          margin-bottom: 30px;
        }
        
        .status-item {
          font-size: 12px;
          color: #b3b3b3;
        }
        /* Snow / Upside-Down effect */
        .snowflake {
          position: fixed;
          top: -5vh;
          z-index: 9999;
          pointer-events: none;
          user-select: none;
          opacity: 0.9;
          transform: translateY(0);
          animation-name: fall;
          animation-timing-function: linear;
        }

        @keyframes fall {
          to { transform: translateY(110vh) rotate(360deg); opacity: 0.95; }
        }

        /* Falling hearts effect */
        .heart {
          position: fixed;
          top: -5vh;
          z-index: 9999;
          pointer-events: none;
          user-select: none;
          opacity: 0.8;
          font-size: 20px;
          animation-name: float-down;
          animation-timing-function: ease-in;
        }

        @keyframes float-down {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.9;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(110vh) translateX(100px) rotate(360deg);
            opacity: 0;
          }
        }

        body.upside-down {
          /* Visual effect only — do NOT rotate or flip layout/orientation */
          filter: invert(0.06) hue-rotate(180deg) saturate(0.7) contrast(1.05);
          background: radial-gradient(circle at 20% 10%, #0b0b0b, #0f0f1a 40%, #000000 100%);
          /* preserve default scrolling gestures and orientation behavior */
          -webkit-transform: none !important;
          transform: none !important;
          touch-action: pan-x pan-y;
        }
      </style>
    </head>
    <body>
      <header>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display:flex; align-items:center; gap:12px;">
            <div class="logo">🎬 Latch's</div>
            <button id="toggleUpside" class="toggle-btn">Upside Down</button>
          </div>
          <div class="pod-info">Pod: ${hostname}</div>
        </div>
      </header>
      
      <div class="hero">
        <h1>🚀 STREAMING KUBERNETES</h1>
        <p>Watch the best cloud-native movies, running on Kubernetes</p>
      </div>
      
      <div class="container">
        <div class="status-bar">
          <div class="status-item"><strong>Pod:</strong> ${hostname}</div>
          <div class="status-item"><strong>Version:</strong> ${version}</div>
          <div class="status-item"><strong>Timestamp:</strong> ${new Date().toLocaleTimeString()}</div>
          <div class="status-item"><strong>Node.js:</strong> ${process.version}</div>
        </div>
        
        <div class="section-title">📺 Trending Now</div>
        <div class="movies-grid">
          ${movieHTML}
        </div>
      </div>
      
      <!-- Modal -->
      <div id="movieModal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <div class="modal-image" id="modalImage"></div>
              <h2 class="modal-title" id="modalTitle"></h2>
            </div>
            <button class="close-btn" onclick="closeModal()">&times;</button>
          </div>
          
          <div class="modal-details">
            <div class="detail-item">
              <div class="detail-label">📺 Genre</div>
              <div class="detail-value" id="modalGenre"></div>
            </div>
            <div class="detail-item">
              <div class="detail-label">⭐ Rating</div>
              <div class="detail-value" id="modalRating"></div>
            </div>
            <div class="detail-item">
              <div class="detail-label">📅 Year</div>
              <div class="detail-value" id="modalYear"></div>
            </div>
            <div class="detail-item">
              <div class="detail-label">⏱️ Duration</div>
              <div class="detail-value" id="modalDuration"></div>
            </div>
            <div class="detail-item">
              <div class="detail-label">🎬 Director</div>
              <div class="detail-value" id="modalDirector"></div>
            </div>
            <div class="detail-item">
              <div class="detail-label">🖥️ Served By</div>
              <div class="detail-value">${hostname}</div>
            </div>
          </div>
          
          <div class="modal-description" id="modalDescription"></div>
          
          <div class="modal-buttons">
            <button class="btn-play" onclick="playMovie()">▶ Dive In</button>
            <button class="btn-close-modal" onclick="closeModal()">✕ Close</button>
          </div>
        </div>
      </div>
      
      <footer>
        <p>Running on Kubernetes • Pod: ${hostname} • Powered by Node.js</p>
        <p>This app demonstrates microservices, ingress, auto-scaling, and multi-replica load balancing</p>
      </footer>
      
      <script>
        let currentMovie = null;
        // Upside-down / snow effect control
        let snowInterval = null;
        const snowflakes = new Set();
        // Hearts falling effect
        let heartsInterval = null;
        const hearts = new Set();

        function createSnowflake() {
          const el = document.createElement('div');
          el.className = 'snowflake';
          // Use different symbols for a stylized upside-down look
          const symbols = ['❄️','✦','✺','✶'];
          el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
          const size = Math.floor(Math.random() * 28) + 12; // 12-40px
          el.style.fontSize = size + 'px';
          el.style.left = Math.random() * 100 + 'vw';
          const duration = (Math.random() * 8) + 6; // 6s - 14s
          el.style.animationDuration = duration + 's';
          el.style.opacity = (Math.random() * 0.6 + 0.4).toString();
          el.style.transform = 'translateY(0) rotate(' + (Math.random() * 360) + 'deg)';
          document.body.appendChild(el);
          snowflakes.add(el);
          // remove after animation
          setTimeout(() => {
            if (el && el.parentNode) el.parentNode.removeChild(el);
            snowflakes.delete(el);
          }, duration * 1000 + 500);
        }

        function createHeart() {
          const el = document.createElement('div');
          el.className = 'heart';
          el.textContent = '❤️';
          el.style.left = Math.random() * 100 + 'vw';
          const duration = (Math.random() * 6) + 8; // 8s - 14s
          el.style.animationDuration = duration + 's';
          el.style.opacity = (Math.random() * 0.4 + 0.5).toString();
          el.style.fontSize = (Math.random() * 16 + 18) + 'px';
          document.body.appendChild(el);
          hearts.add(el);
          // remove after animation
          setTimeout(() => {
            if (el && el.parentNode) el.parentNode.removeChild(el);
            hearts.delete(el);
          }, duration * 1000 + 500);
        }

        function enableHearts(enable) {
          if (enable) {
            if (!heartsInterval) heartsInterval = setInterval(createHeart, 300);
          } else {
            if (heartsInterval) { clearInterval(heartsInterval); heartsInterval = null; }
            // remove remaining hearts
            hearts.forEach(el => { if (el && el.parentNode) el.parentNode.removeChild(el); });
            hearts.clear();
          }
        }

        function enableUpsideDown(enable) {
          if (enable) {
            document.body.classList.add('upside-down');
              // Stop hearts when entering Upside-Down
              enableHearts(false);
            if (!snowInterval) snowInterval = setInterval(createSnowflake, 250);
            document.getElementById('toggleUpside').textContent = 'Return';
          } else {
            document.body.classList.remove('upside-down');
            if (snowInterval) { clearInterval(snowInterval); snowInterval = null; }
            // remove remaining snowflakes
            snowflakes.forEach(el => { if (el && el.parentNode) el.parentNode.removeChild(el); });
            snowflakes.clear();
              // Restart hearts when returning to main page
              enableHearts(true);
            document.getElementById('toggleUpside').textContent = 'Upside Down';
          }
        }

        document.addEventListener('DOMContentLoaded', function() {
          // Start hearts falling automatically
          enableHearts(true);
          
          const btn = document.getElementById('toggleUpside');
          if (btn) {
            btn.addEventListener('click', function() {
              const enabled = document.body.classList.contains('upside-down');
              enableUpsideDown(!enabled);
            });
          }
        });
        
        function openModal(movie, singleView = false) {
          currentMovie = movie;
          const modal = document.getElementById('movieModal');
          document.getElementById('movieModal').classList.add('show');
          // toggle fullscreen single-card display when called from Play
          if (singleView) {
            modal.classList.add('fullscreen');
          } else {
            modal.classList.remove('fullscreen');
          }
          document.getElementById('modalImage').textContent = movie.image;
          document.getElementById('modalTitle').textContent = movie.title;
          document.getElementById('modalGenre').textContent = movie.genre;
          document.getElementById('modalRating').textContent = movie.rating + '/10';
          document.getElementById('modalYear').textContent = movie.year;
          document.getElementById('modalDuration').textContent = movie.duration;
          document.getElementById('modalDirector').textContent = movie.director;
          document.getElementById('modalDescription').textContent = movie.description;
          // prevent page scroll while modal is open, but allow modal internal scroll
          document.body.style.overflow = 'hidden';
          // Ensure modal content starts at top and focus close button for accessibility
          const content = modal.querySelector('.modal-content');
          if (content) content.scrollTop = 0;
          const closeBtn = modal.querySelector('.close-btn');
          if (closeBtn) closeBtn.focus();
        }
        
        function closeModal() {
          const modal = document.getElementById('movieModal');
          modal.classList.remove('show');
          modal.classList.remove('fullscreen');
          document.body.style.overflow = 'auto';
          currentMovie = null;
        }

        function playMovie() {
          if (currentMovie) {
            openModal(currentMovie, true);
          }
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
          const modal = document.getElementById('movieModal');
          if (event.target === modal) {
            closeModal();
          }
        }

        // Close modal on Escape key
        document.addEventListener('keydown', function(event) {
          if (event.key === 'Escape') {
            closeModal();
          }
        });

        // play buttons use inline handlers to open modal; remove JS-driven scaling
        // JavaScript hover scaling removed to avoid sliding effects on touch devices
      </script>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', pod: hostname, version: version });
});

app.get('/api/movies', (req, res) => {
  res.json({ movies: movies, served_by: hostname });
});

app.listen(port, () => {
  console.log(`NetFlix-K8s running on port ${port}`);
  console.log(`Pod: ${hostname}`);
  console.log(`Version: ${version}`);
});
