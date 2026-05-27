const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'stage1', 'assets', 'index-CaPdr700.css');
const css = fs.readFileSync(cssPath, 'utf8');

// Find all matches of ENTRAIOT DASHBOARD CARD REDESIGN
const startIdx = css.indexOf('ENTRAIOT DASHBOARD CARD REDESIGN');
if (startIdx !== -1) {
  console.log('Found redesign block at index', startIdx);
  const part = css.substring(startIdx);
  fs.writeFileSync(path.join(__dirname, 'redesign_css.css'), part);
  console.log('Written to scratch/redesign_css.css');
} else {
  console.log('Redesign comment not found!');
  // Let's just output the last 300 lines of the CSS file
  const lines = css.split('\n');
  const last300 = lines.slice(-300).join('\n');
  fs.writeFileSync(path.join(__dirname, 'last_300.css'), last300);
}
