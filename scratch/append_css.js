const fs = require('fs');

const files = [
  'stage1/assets/index-CaPdr700.css',
  'dist-vercel/portfolio/assets/index-CaPdr700.css'
];

const newStyles = `

/* ==========================================================================
   FUTURISTIC POPUP LET'S GO DRIFT TEXT OVERLAY & CAR DRIFT KEYFRAMES
   ========================================================================== */

.portfolio-item .card-drift-text {
  position: absolute !important;
  top: 41% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) scale(0) rotate(-12deg) !important;
  font-family: 'Zen Dots', sans-serif !important;
  font-size: 2.1rem !important;
  font-weight: 900 !important;
  color: #ffffff !important;
  text-shadow: 
    -2px -2px 0 #000,  
     2px -2px 0 #000,
    -2px  2px 0 #000,
     2px  2px 0 #000,
     0 0 15px var(--dept-color) !important;
  font-style: italic !important;
  pointer-events: none !important;
  z-index: 6 !important;
  opacity: 0 !important;
  transition: transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease !important;
}

.portfolio-item:hover .card-drift-text {
  transform: translate(-50%, -50%) scale(1.1) rotate(-8deg) !important;
  opacity: 1 !important;
  animation: textPulse 1s infinite alternate !important;
}

@keyframes textPulse {
  0% { transform: translate(-50%, -50%) scale(1.1) rotate(-8deg); text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 0 12px var(--dept-color); }
  100% { transform: translate(-50%, -50%) scale(1.16) rotate(-5deg); text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 0 28px var(--dept-color), 0 0 6px #ffffff; }
}

.portfolio-item .card-car-overlay {
  transform-origin: center center !important;
}

.portfolio-item:hover .card-car-overlay {
  animation: cardCarDrift 1.1s cubic-bezier(0.25, 1, 0.5, 1) forwards !important;
}

@keyframes cardCarDrift {
  0% { transform: scale(0.95) translateX(-80px) rotate(9deg); }
  35% { transform: scale(1.06) translateX(12px) rotate(-16deg); }
  75% { transform: scale(1.03) translateX(-3px) rotate(-5deg); }
  100% { transform: scale(1.04) translateY(-6px) rotate(0deg); }
}
`;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('card-drift-text')) {
      fs.appendFileSync(file, newStyles);
      console.log('SUCCESS: Appended drift styles to', file);
    } else {
      console.log('Styles already exist in', file);
    }
  } else {
    console.warn('File not found:', file);
  }
});
