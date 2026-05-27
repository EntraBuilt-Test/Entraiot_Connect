const fs = require('fs');

const files = [
  'stage1/assets/index-CaPdr700.css',
  'dist-vercel/portfolio/assets/index-CaPdr700.css'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // Replace '#root .portfolio-item' with '.portfolio-item' globally
    const updated = content.replace(/#root \.portfolio-item/g, '.portfolio-item');
    fs.writeFileSync(file, updated);
    console.log('SUCCESS: Replaced #root selector in', file);
  } else {
    console.warn('File not found:', file);
  }
});
