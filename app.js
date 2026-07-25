/* ==========================================================================
   PilgrimAI – Intelligent Pilgrim Crowd Management System Engine
   Logic: Telemetry, Interactive Spatial GIS, AI Predictor, Biometric Lost Finder,
   Virtual Queue QR Ticket, Web Speech Assistant & Admin Controls.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Global State
  const state = {
    theme: 'dark',
    lang: 'en-US',
    liveCrowd: 48250,
    avgWait: 18,
    safetyIndex: 98.4,
    activeVolunteers: 340,
    selectedZone: 'gate2',
    predictionHorizon: '30m',
    aiSensitivity: 75,
    cameraOverlays: true,
    yoloBoxes: true
  };

  // 1. Navigation & Theme Manager
  initNavigation();
  initThemeToggle();
  initClock();

  // 2. Interactive Spatial Map Engine
  initTempleMap();

  // 3. AI Prediction & Chart.js Engine
  initPredictionEngine();

  // 4. Lost Person Biometric AI Finder
  initLostPersonFinder();

  // 5. Smart Queue Pass & Canvas QR Engine
  initQueuePassGenerator();

  // 6. Emergency Command & SOS Alert System
  initEmergencySOS();

  // 7. Analytics Dashboard Charts
  initAnalyticsCharts();

  // 8. Admin Control Operations
  initAdminControls();

  // 9. Multilingual Voice Assistant
  initVoiceAssistant();

  // Periodic Telemetry Simulator (Fluctuates numbers naturally every 4 seconds)
  setInterval(simulateLiveTelemetry, 4000);
});

/* --------------------------------------------------------------------------
   1. NAVIGATION, THEME & CLOCK
   -------------------------------------------------------------------------- */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  });
}

function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;

  themeBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    themeBtn.innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
  });
}

function initClock() {
  const clockEl = document.getElementById('live-clock');
  function updateClock() {
    const now = new Date();
    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
    }
  }
  updateClock();
  setInterval(updateClock, 1000);
}

function simulateLiveTelemetry() {
  // Random small delta
  const crowdDelta = Math.floor(Math.random() * 40) - 15;
  const crowdEl = document.getElementById('hero-stat-crowd');
  const telCrowdEl = document.getElementById('tel-crowd');

  if (crowdEl && telCrowdEl) {
    let current = parseInt(crowdEl.textContent.replace(/,/g, ''));
    current = Math.max(30000, current + crowdDelta);
    const formatted = current.toLocaleString('en-IN');
    crowdEl.textContent = formatted;
    telCrowdEl.textContent = formatted;
  }
}

/* --------------------------------------------------------------------------
   2. INTERACTIVE TEMPLE SPATIAL MAP (SVG & GIS)
   -------------------------------------------------------------------------- */
function initTempleMap() {
  const zones = document.querySelectorAll('.map-zone');
  const detailName = document.getElementById('map-zone-name');
  const detailDesc = document.getElementById('map-zone-desc');
  const detailCount = document.getElementById('map-zone-count');
  const detailWait = document.getElementById('map-zone-wait');
  const detailDensity = document.getElementById('map-zone-density');
  const viewCamBtn = document.getElementById('btn-view-cam');
  const rerouteBtn = document.getElementById('btn-trigger-reroute');
  const camModal = document.getElementById('cam-modal');
  const closeCamModal = document.getElementById('close-cam-modal');

  const zoneDataMap = {
    'zone-gate1': {
      name: 'Queue Gate 1 (East Corridor - VIP & Senior)',
      desc: 'Dedicated fast-track corridor for senior citizens, PWD, and pre-booked digital token holders.',
      count: '3,400 Devotees',
      wait: '8 Mins',
      density: '0.8 p/m² (Low Density)',
      camImg: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80'
    },
    'zone-gate2': {
      name: 'Queue Gate 2 (General Main Queue)',
      desc: 'Primary entrance line for general devotees. Current high density alert triggered AI dynamic flow diversion to Corridor B.',
      count: '14,200 Devotees',
      wait: '32 Mins',
      density: '3.4 p/m² (HIGH DENSITY ALERT)',
      camImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
    },
    'zone-gate3': {
      name: 'Queue Gate 3 (North Corridor)',
      desc: 'Balanced general line servicing north parking arrivals.',
      count: '8,100 Devotees',
      wait: '16 Mins',
      density: '1.9 p/m² (Medium Density)',
      camImg: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80'
    },
    'zone-gate4': {
      name: 'Queue Gate 4 (West Corridor Exit)',
      desc: 'Exit corridor equipped with automated counter gates and hydration stations.',
      count: '4,600 Devotees',
      wait: '10 Mins',
      density: '1.1 p/m² (Low Density)',
      camImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
    },
    'zone-parking-north': {
      name: 'North Smart Parking Lot (P1)',
      desc: 'Main multi-tier parking lot with electric shuttle connectivity.',
      count: '820 Vehicles',
      wait: '2 Mins Shuttle',
      density: '82% Occupied',
      camImg: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80'
    },
    'zone-medical-1': {
      name: 'Main Medical Base Alpha',
      desc: 'Fully equipped 24x7 emergency medical post with 4 doctors, ICU beds, and 2 ambulance bays.',
      count: '4 Paramedics',
      wait: 'Immediate',
      density: 'Optimal Preparedness',
      camImg: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
    }
  };

  zones.forEach(zone => {
    zone.addEventListener('click', () => {
      const id = zone.id;
      const data = zoneDataMap[id];
      if (data) {
        detailName.innerHTML = `<i class="fa-solid fa-location-dot text-blue"></i> ${data.name}`;
        detailDesc.textContent = data.desc;
        detailCount.textContent = data.count;
        detailWait.textContent = data.wait;
        detailDensity.textContent = data.density;

        if (viewCamBtn) {
          viewCamBtn.setAttribute('data-cam-img', data.camImg);
          viewCamBtn.setAttribute('data-cam-title', data.name);
        }
      }
    });
  });

  if (viewCamBtn) {
    viewCamBtn.addEventListener('click', () => {
      const img = viewCamBtn.getAttribute('data-cam-img');
      const title = viewCamBtn.getAttribute('data-cam-title') || 'Live AI Stream';
      const modalImg = document.getElementById('cam-stream-img');
      const modalTitle = document.getElementById('cam-modal-title');

      if (modalImg && img) modalImg.src = img;
      if (modalTitle) modalTitle.innerHTML = `<i class="fa-solid fa-video text-blue"></i> Live AI Feed - ${title}`;
      if (camModal) camModal.classList.remove('hidden');
    });
  }

  if (closeCamModal) {
    closeCamModal.addEventListener('click', () => {
      if (camModal) camModal.classList.add('hidden');
    });
  }

  if (rerouteBtn) {
    rerouteBtn.addEventListener('click', () => {
      alert('AI Dynamic Rerouting Command Issued! Barrier Gate 2 Flow Diverted to East Corridor B. Audio Announcements Triggered.');
      const path = document.getElementById('smart-route-path');
      if (path) {
        path.setAttribute('stroke', '#EF4444');
        setTimeout(() => path.setAttribute('stroke', '#10B981'), 3000);
      }
    });
  }
}

/* --------------------------------------------------------------------------
   3. AI PREDICTION ENGINE (CHART.JS)
   -------------------------------------------------------------------------- */
let predictionChartInstance = null;

function initPredictionEngine() {
  const ctx = document.getElementById('predictionChart');
  if (!ctx) return;

  const horizons = {
    '30m': {
      labels: ['11:00', '11:10', '11:20', '11:30 (Now)', '11:40 (Pred)', '11:50 (Pred)', '12:00 (Pred)'],
      actual: [42000, 44100, 46500, 48250, null, null, null],
      predicted: [null, null, null, 48250, 51000, 53400, 51800],
      riskVal: '28%',
      waitVal: '24 Mins'
    },
    '1h': {
      labels: ['10:30', '11:00', '11:30 (Now)', '12:00 (Pred)', '12:30 (Pred)', '01:00 (Pred)'],
      actual: [38000, 42000, 48250, null, null, null],
      predicted: [null, null, 48250, 54000, 61000, 52000],
      riskVal: '42% (Peak)',
      waitVal: '34 Mins'
    },
    '2h': {
      labels: ['10:00', '11:00', '11:30 (Now)', '12:30 (Pred)', '01:30 (Pred)', '02:30 (Pred)'],
      actual: [35000, 42000, 48250, null, null, null],
      predicted: [null, null, 48250, 61000, 49000, 39000],
      riskVal: '18% (Post Peak)',
      waitVal: '14 Mins'
    }
  };

  function renderPredictionChart(horizonKey) {
    const data = horizons[horizonKey];
    if (predictionChartInstance) {
      predictionChartInstance.destroy();
    }

    predictionChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Actual Telemetry Count',
            data: data.actual,
            borderColor: '#2563EB',
            backgroundColor: 'rgba(37, 99, 235, 0.15)',
            borderWidth: 3,
            fill: true,
            tension: 0.3
          },
          {
            label: 'AI Forecasted Density',
            data: data.predicted,
            borderColor: '#F97316',
            borderDash: [6, 6],
            backgroundColor: 'rgba(249, 115, 22, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#E5E7EB', font: { family: 'Inter' } } }
        },
        scales: {
          x: { ticks: { color: '#9CA3AF' }, grid: { color: 'rgba(255,255,255,0.05)' } },
          y: { ticks: { color: '#9CA3AF' }, grid: { color: 'rgba(255,255,255,0.05)' } }
        }
      }
    });

    const riskEl = document.getElementById('pred-risk-val');
    const waitEl = document.getElementById('pred-wait-val');
    if (riskEl) riskEl.textContent = data.riskVal;
    if (waitEl) waitEl.textContent = data.waitVal;
  }

  renderPredictionChart('30m');

  const tabs = document.querySelectorAll('.btn-time-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const horizon = tab.getAttribute('data-horizon');
      renderPredictionChart(horizon);
    });
  });
}

/* --------------------------------------------------------------------------
   4. LOST PERSON FINDER AI MODULE
   -------------------------------------------------------------------------- */
function initLostPersonFinder() {
  const form = document.getElementById('lost-person-form');
  const photoInput = document.getElementById('lost-photo-input');
  const photoPreview = document.getElementById('photo-preview');
  const placeholder = document.getElementById('upload-placeholder');
  const resultPlaceholder = document.getElementById('result-placeholder');
  const scanningState = document.getElementById('scanning-state');
  const matchFoundState = document.getElementById('match-found-state');
  const scanProgressBar = document.getElementById('scan-progress-bar');
  const scanLogText = document.getElementById('scan-log-text');
  const scanTargetImg = document.getElementById('scan-target-img');
  const sampleBtns = document.querySelectorAll('.btn-sample');

  // Preview uploaded image
  if (photoInput) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          photoPreview.src = evt.target.result;
          photoPreview.classList.remove('hidden');
          placeholder.classList.add('hidden');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Quick Demo Profiles
  sampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-sample');
      if (type === 'child') {
        document.getElementById('lost-name').value = 'Aarav Sharma';
        document.getElementById('lost-age').value = 7;
        document.getElementById('lost-dress').value = 'Yellow Kurta & White Pajama';
        document.getElementById('lost-location').value = 'Gate 2 General Queue';
        photoPreview.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80';
        photoPreview.classList.remove('hidden');
        placeholder.classList.add('hidden');
      } else {
        document.getElementById('lost-name').value = 'Lakshmi Devi';
        document.getElementById('lost-age').value = 72;
        document.getElementById('lost-dress').value = 'Red Saree with Gold Border';
        document.getElementById('lost-location').value = 'Annadanam Food Hall';
        photoPreview.src = 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=300&q=80';
        photoPreview.classList.remove('hidden');
        placeholder.classList.add('hidden');
      }
    });
  });

  // Submit scan trigger
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('lost-name').value || 'Missing Person';

      resultPlaceholder.classList.add('hidden');
      matchFoundState.classList.add('hidden');
      scanningState.classList.remove('hidden');

      if (scanTargetImg && photoPreview.src) {
        scanTargetImg.src = photoPreview.src;
      }

      // Simulate multi-feed scanning progress
      let progress = 0;
      const logs = [
        'Connecting to Neural Edge Mesh...',
        'Scanning CAM-01 East Corridor (142 faces)...',
        'Scanning CAM-07 Annadanam Exit (89 faces)...',
        'OpenCV Biometric Vector Match Detected!',
        'Finalizing confidence score...'
      ];

      const interval = setInterval(() => {
        progress += 20;
        scanProgressBar.style.width = `${progress}%`;
        const logIndex = Math.min(Math.floor(progress / 20) - 1, logs.length - 1);
        scanLogText.textContent = logs[logIndex];

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            scanningState.classList.add('hidden');
            matchFoundState.classList.remove('hidden');
            document.getElementById('match-person-name').textContent = `${name} (Found)`;
          }, 600);
        }
      }, 500);
    });
  }

  // Alert Patrol button
  const alertPatrolBtn = document.getElementById('btn-alert-patrol');
  if (alertPatrolBtn) {
    alertPatrolBtn.addEventListener('click', () => {
      alert('PATROL ALERT SENT! GPS Coordinates & Image sent to nearest Patrol Unit #42. SMS notification dispatched to registered mobile number.');
    });
  }
}

/* --------------------------------------------------------------------------
   5. SMART QUEUE PASS & CANVAS QR GENERATOR
   -------------------------------------------------------------------------- */
function initQueuePassGenerator() {
  const form = document.getElementById('queue-pass-form');
  const canvas = document.getElementById('qr-code-canvas');

  // Draw initial QR code
  renderCanvasQRCode(canvas, 'PLG-9842-X');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('pilgrim-name').value;
      const count = document.getElementById('pilgrim-count').value;
      const slot = document.getElementById('darshan-slot').value;
      const category = document.getElementById('special-category').value;

      const tokenId = `PLG-${Math.floor(1000 + Math.random() * 9000)}-X`;

      document.getElementById('t-devotee-name').textContent = name;
      document.getElementById('t-count').textContent = `${count} Devotees`;
      document.getElementById('t-slot-time').textContent = `Today • ${slot.split(' ')[0]} ${slot.split(' ')[1]}`;
      document.getElementById('t-pass-category').textContent = category.toUpperCase();
      document.getElementById('t-token-id').textContent = `TOKEN: #${tokenId}`;

      renderCanvasQRCode(canvas, tokenId);
      alert('Virtual Darshan Pass Generated Successfully! QR Token sent via SMS.');
    });
  }

  const downloadBtn = document.getElementById('btn-download-pass');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

// Lightweight HTML5 Canvas QR Code Pattern Generator
function renderCanvasQRCode(canvas, text) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  ctx.clearRect(0, 0, size, size);

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = '#111827';
  const grid = 21;
  const cellSize = size / grid;

  // Pseudo-random pattern based on string seed
  let seed = 0;
  for (let i = 0; i < text.length; i++) seed += text.charCodeAt(i);

  for (let r = 0; r < grid; r++) {
    for (let c = 0; c < grid; c++) {
      // Corner Finder Patterns
      if ((r < 7 && c < 7) || (r < 7 && c >= grid - 7) || (r >= grid - 7 && c < 7)) {
        if ((r === 0 || r === 6 || c === 0 || c === 6) && (r < 7 && c < 7)) ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        else if ((r === 0 || r === 6 || c === grid - 7 || c === grid - 1) && (r < 7 && c >= grid - 7)) ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        else if ((r === grid - 7 || r === grid - 1 || c === 0 || c === 6) && (r >= grid - 7 && c < 7)) ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        else if (r >= 2 && r <= 4 && c >= 2 && c <= 4) ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        else if (r >= 2 && r <= 4 && c >= grid - 5 && c <= grid - 3) ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        else if (r >= grid - 5 && r <= grid - 3 && c >= 2 && c <= 4) ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
      } else {
        // Data modules
        const val = Math.sin(seed * (r * grid + c)) * 10000;
        if ((val - Math.floor(val)) > 0.45) {
          ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }
      }
    }
  }
}

/* --------------------------------------------------------------------------
   6. EMERGENCY COMMAND & SOS ALERT SYSTEM
   -------------------------------------------------------------------------- */
function initEmergencySOS() {
  const headerSosBtn = document.getElementById('header-sos-btn');
  const bigSosBtn = document.getElementById('big-sos-trigger');
  const emergencyBanner = document.getElementById('emergency-banner');

  function triggerSOSAlert() {
    // Web Audio API Emergency Siren Sound
    playEmergencySiren();

    if (emergencyBanner) {
      emergencyBanner.classList.remove('hidden');
    }

    alert('🚨 EMERGENCY SOS ACTIVATED!\n\n1. Central Command Notification Dispatched.\n2. Ambulance Unit #02 Auto-Routed to Gate 2.\n3. Public Address Siren Triggered.');

    // Append to incident log
    const incidentList = document.getElementById('incident-list');
    if (incidentList) {
      const nowStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      const newIncident = document.createElement('div');
      newIncident.className = 'incident-item priority-high';
      newIncident.innerHTML = `
        <span class="incident-time">${nowStr}</span>
        <div class="incident-info">
          <strong>CRITICAL SOS TRIGGERED FROM PUBLIC PORTAL</strong>
          <p>Disaster Response Team #01 dispatched immediately.</p>
        </div>
        <span class="badge badge-yellow">Active Dispatch</span>
      `;
      incidentList.prepend(newIncident);
    }
  }

  if (headerSosBtn) headerSosBtn.addEventListener('click', triggerSOSAlert);
  if (bigSosBtn) bigSosBtn.addEventListener('click', triggerSOSAlert);
}

function playEmergencySiren() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.0);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.0);
  } catch (e) {
    console.log('Audio Context blocked or not supported');
  }
}

/* --------------------------------------------------------------------------
   7. ANALYTICS DASHBOARD CHARTS
   -------------------------------------------------------------------------- */
function initAnalyticsCharts() {
  // Chart 1: Hourly Flow
  const hourlyCtx = document.getElementById('hourlyChart');
  if (hourlyCtx) {
    new Chart(hourlyCtx, {
      type: 'bar',
      data: {
        labels: ['6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'],
        datasets: [{
          label: 'Hourly Devotees',
          data: [4200, 7800, 11200, 14200, 9800, 12500, 8900, 5400],
          backgroundColor: 'rgba(37, 99, 235, 0.7)',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#9CA3AF' } },
          y: { ticks: { color: '#9CA3AF' } }
        }
      }
    });
  }

  // Chart 2: Gate Pie
  const gateCtx = document.getElementById('gateDistributionChart');
  if (gateCtx) {
    new Chart(gateCtx, {
      type: 'doughnut',
      data: {
        labels: ['Gate 1 (VIP)', 'Gate 2 (Gen)', 'Gate 3 (North)', 'Gate 4 (West)'],
        datasets: [{
          data: [3400, 14200, 8100, 4600],
          backgroundColor: ['#10B981', '#EF4444', '#FBBF24', '#3B82F6']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#E5E7EB' } } }
      }
    });
  }

  // Chart 3: Response Line
  const responseCtx = document.getElementById('responseChart');
  if (responseCtx) {
    new Chart(responseCtx, {
      type: 'line',
      data: {
        labels: ['Incident 1', 'Incident 2', 'Incident 3', 'Incident 4', 'Incident 5'],
        datasets: [{
          label: 'Avg Response Time (Mins)',
          data: [4.2, 3.8, 2.5, 3.1, 2.8],
          borderColor: '#8B5CF6',
          backgroundColor: 'rgba(139, 92, 246, 0.2)',
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#9CA3AF' } },
          y: { ticks: { color: '#9CA3AF' } }
        }
      }
    });
  }

  // Chart 4: Parking
  const parkingCtx = document.getElementById('parkingChart');
  if (parkingCtx) {
    new Chart(parkingCtx, {
      type: 'bar',
      data: {
        labels: ['North Lot', 'South Lot', 'East Overflow', 'VIP Bay'],
        datasets: [{
          label: 'Occupancy %',
          data: [82, 45, 60, 30],
          backgroundColor: '#F97316',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#9CA3AF' } },
          y: { ticks: { color: '#9CA3AF' }, max: 100 }
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   8. ADMIN CONTROLS
   -------------------------------------------------------------------------- */
function initAdminControls() {
  const sensitivitySlider = document.getElementById('ai-sensitivity');
  const sensitivityVal = document.getElementById('sensitivity-val');
  const broadcastBtn = document.getElementById('btn-admin-broadcast');
  const overrideBtn = document.getElementById('btn-admin-emergency-override');

  if (sensitivitySlider) {
    sensitivitySlider.addEventListener('input', (e) => {
      const val = e.target.value;
      if (sensitivityVal) {
        sensitivityVal.textContent = `${val}% (${val > 80 ? 'High Sensitivity' : 'Balanced Safety'})`;
      }
    });
  }

  if (broadcastBtn) {
    broadcastBtn.addEventListener('click', () => {
      const msg = prompt('Enter Audio Announcement text to broadcast across Temple Loudspeakers:', 'Attention Devotees: Please maintain queue order at Gate 1. Water stations available at Corridor B.');
      if (msg) {
        speakVoiceText(msg, 'en-US');
        alert('Public Broadcast Transmitted!');
      }
    });
  }

  if (overrideBtn) {
    overrideBtn.addEventListener('click', () => {
      if (confirm('Initiate Emergency Lockdown Override? All barrier gates will immediately open.')) {
        alert('Emergency Lockdown Active! All automated barriers set to Open-Flow.');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   9. MULTILINGUAL VOICE ASSISTANT (WEB SPEECH API)
   -------------------------------------------------------------------------- */
function initVoiceAssistant() {
  const langSelect = document.getElementById('voice-lang-select');
  const testVoiceBtn = document.getElementById('btn-test-voice');
  const floatingVoiceBtn = document.getElementById('voice-widget');

  const voicePrompts = {
    'en-US': 'Welcome to PilgrimAI. Current wait time is 18 minutes. Safety index is normal.',
    'hi-IN': 'पिलग्रिम-एआई में आपका स्वागत है। दर्शन के लिए वर्तमान प्रतीक्षा समय 18 मिनट है। सुरक्षा का स्तर सामान्य है।',
    'ta-IN': 'பில்கிரிம் ஏஐ-க்கு நல்வரவு. தற்போதைய தர்சன காத்திருப்பு நேரம் 18 நிமிடங்கள். பாதுகாப்பு நிலை இயல்பானது.',
    'te-IN': 'పిల్‌గ్రిమ్ AI కి స్వాగతం. ప్రస్తుత దర్శనం నిరీక్షణ సమయం 18 నిమిషాలు. రక్షణ వ్యవస్థ సాధారణంగా ఉంది.',
    'ml-IN': 'പിൽഗ്രിം എഐ-ലേക്ക് സ്വാഗതം. നിലവിലെ ദർശന കാത്തിരിപ്പ് സമയം 18 മിനിറ്റാണ്. സുരക്ഷാ നില തൃപ്തികരമാണ്.'
  };

  function speakSelectedLang() {
    const lang = langSelect ? langSelect.value : 'en-US';
    const text = voicePrompts[lang] || voicePrompts['en-US'];
    speakVoiceText(text, lang);
  }

  if (testVoiceBtn) testVoiceBtn.addEventListener('click', speakSelectedLang);
  if (floatingVoiceBtn) floatingVoiceBtn.addEventListener('click', speakSelectedLang);
}

function speakVoiceText(text, lang = 'en-US') {
  if (!('speechSynthesis' in window)) {
    alert('Voice Synthesis Audio: ' + text);
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}
