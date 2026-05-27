const fs = require('fs');

const files = [
  'stage1/assets/index-CaPdr700.css',
  'dist-vercel/portfolio/assets/index-CaPdr700.css'
];

const target = `.portfolio-item:hover .card-car-overlay {
  transform: scale(1.04) translateY(-6px) !important;
}`;

const replacement = `.portfolio-item:hover .card-car-overlay {
  /* static transform removed to allow volumetric keyframe drift animation to run */
}`;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\r\n/g, '\n');
    const normTarget = target.replace(/\r\n/g, '\n');
    const normReplacement = replacement.replace(/\r\n/g, '\n');
    
    if (content.includes(normTarget)) {
      content = content.replace(normTarget, normReplacement);
      fs.writeFileSync(file, content);
      console.log('SUCCESS: Enabled keyframe drift animation in', file);
    } else {
      console.error('ERROR: Could not find target CSS block in', file);
    }
  } else {
    console.warn('File not found:', file);
  }
});
