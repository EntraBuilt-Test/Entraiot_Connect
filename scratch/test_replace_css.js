const fs = require('fs');

const files = [
  'stage1/assets/index-CaPdr700.css',
  'dist-vercel/portfolio/assets/index-CaPdr700.css'
];

const target = `#root .portfolio-item .card-car-overlay {
  position: absolute !important;
  top: 31% !important;
  left: 5% !important;
  width: 90% !important;
  height: 180px !important;
  z-index: 4 !important;
  pointer-events: none !important;
  transform: scale(0.95) translateY(0) !important;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
#root .portfolio-item:hover .card-car-overlay {
  transform: scale(1.05) translateY(-8px) !important;
}
#root .portfolio-item .card-car-overlay .car-render-img {
  width: 105% !important;
  height: auto !important;
  max-height: 100% !important;
  object-fit: contain !important;
  mix-blend-mode: screen !important;
  filter: drop-shadow(0 0 5px rgba(var(--dept-color-rgb), 0.3)) !important;
  transition: filter 0.6s ease !important;
}
#root .portfolio-item:hover .card-car-overlay .car-render-img {
  filter: drop-shadow(0 0 20px rgba(var(--dept-color-rgb), 0.8)) !important;
}`;

const replacement = `#root .portfolio-item .card-car-overlay {
  position: absolute !important;
  top: 24% !important;
  left: 8% !important;
  width: 84% !important;
  height: 185px !important;
  z-index: 4 !important;
  pointer-events: none !important;
  transform: scale(0.95) translateY(0) !important;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  overflow: hidden !important;
  border-radius: 8px !important;
  border: 1px solid rgba(var(--dept-color-rgb), 0.25) !important;
  background: rgba(0, 0, 0, 0.4) !important;
}
#root .portfolio-item:hover .card-car-overlay {
  transform: scale(1.02) translateY(-4px) !important;
  border-color: rgba(var(--dept-color-rgb), 0.65) !important;
  box-shadow: 0 0 20px rgba(var(--dept-color-rgb), 0.3) !important;
}
#root .portfolio-item .card-car-overlay .car-render-img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  mix-blend-mode: normal !important;
  border-radius: 8px !important;
  filter: saturate(0.85) brightness(0.9) !important;
  transition: filter 0.6s ease, transform 0.6s ease !important;
}
#root .portfolio-item:hover .card-car-overlay .car-render-img {
  filter: saturate(1.1) brightness(1.05) drop-shadow(0 0 10px rgba(var(--dept-color-rgb), 0.4)) !important;
  transform: scale(1.06) !important;
}`;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // We normalize carriage returns to ensure exact matching
    content = content.replace(/\r\n/g, '\n');
    const normTarget = target.replace(/\r\n/g, '\n');
    const normReplacement = replacement.replace(/\r\n/g, '\n');
    
    if (content.includes(normTarget)) {
      content = content.replace(normTarget, normReplacement);
      fs.writeFileSync(file, content);
      console.log('SUCCESS: Updated CSS in', file);
    } else {
      console.error('ERROR: Could not find target CSS block in', file);
      // Let's try matching a simpler chunk or log search
      const partial = `#root .portfolio-item .card-car-overlay {`;
      console.log('Contains partial:', content.includes(partial));
    }
  } else {
    console.warn('File not found:', file);
  }
});
