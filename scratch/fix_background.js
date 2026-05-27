const fs = require('fs');

const files = [
  'stage1/assets/Portfolio-CFTaDZT1.js',
  'dist-vercel/portfolio/assets/Portfolio-CFTaDZT1.js'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find the portfolioItemMaterial tag and add visible: false
    const target = 'S.jsx("portfolioItemMaterial",{ref:o,';
    const replacement = 'S.jsx("portfolioItemMaterial",{ref:o,visible:false,';
    
    if (content.includes(target)) {
      content = content.replace(target, replacement);
      fs.writeFileSync(file, content);
      console.log('SUCCESS: Hidden background 3D visual mesh in', file);
    } else {
      console.error('ERROR: Could not find portfolioItemMaterial in', file);
    }
  } else {
    console.warn('File not found:', file);
  }
});
