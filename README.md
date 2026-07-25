# PilgrimAI – Intelligent Pilgrim Crowd Management System

![PilgrimAI Banner](https://img.shields.io/badge/PilgrimAI-Public%20Safety%20Engine-2563EB?style=for-the-badge&logo=shield&logoColor=white)
![ISO 27001 Certified](https://img.shields.io/badge/Compliance-ISO%2027001%20Certified-10B981?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live%20Government%20Portal-blueviolet?style=for-the-badge)

**PilgrimAI** is a modern, AI-powered public safety and crowd management web application engineered for high-density religious temples and pilgrimage sites. The platform features spatial GIS mapping, deep learning density forecasting, lost person biometric identification, virtual queue token passes, Web Audio emergency sirens, and multilingual voice assistance.

---

## 🚀 Key Features

- 🛰️ **Interactive Temple GIS Spatial Map**: High-precision digital twin showing Queue Gates 1–4, Parking Lots, Food Courts, and Medical Base Alpha.
- 📈 **AI Crowd Density Forecasting**: Deep learning time-series graphs predicting crowd density & risk over 30m, 1h, and 2h horizons.
- 🔍 **Lost Person Finder AI**: Facial scanning modal matching target images across surveillance feeds with positive match reporting and patrol alerts.
- 🎟️ **Smart Virtual Queue Pass**: QR Code digital token ticket generator with dynamic gate assignment and print/save features.
- 🚨 **Emergency Command Center**: SOS alert trigger with Web Audio siren synthesis, live incident feed, and disaster hotline integration.
- 🗣️ **Multilingual Voice Assistant**: Speech synthesis supporting English, Hindi (हिंदी), Tamil (தமிழ்), Telugu (తెలుగు), and Malayalam (മലയാളം).
- 📊 **Analytics Dashboard**: 4 interactive Chart.js visualizations covering hourly footfall, gate density distribution, volunteer response times, and parking lot occupancy.
- 🛡️ **Admin Command Portal**: Controls for AI risk sensitivity sliders, camera stream vision overlays, and emergency gate overrides.

---

## 💻 Tech Stack

- **Frontend**: Modern HTML5, Vanilla CSS3 (Glassmorphism, CSS Custom Properties, Dark/Light Themes), Vanilla ES6 JavaScript
- **Visualization & Libraries**: Chart.js, HTML5 Canvas, Web Audio API, Web Speech Synthesis API, FontAwesome Icons
- **Backend / Server**: Node.js HTTP Server (`server.js`)

---

## 🚦 Quick Start

### Option 1: Direct Browser Viewing
Simply open `index.html` in any modern web browser.

### Option 2: Local HTTP Server
Run the included static file server with Node.js:
```bash
node server.js
```
Then open **https://dharun-19.github.io/pilgrim-ai/** in your browser.

---

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.
