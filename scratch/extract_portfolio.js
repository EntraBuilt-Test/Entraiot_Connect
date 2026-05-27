const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'stage1', 'assets', 'Portfolio-CFTaDZT1.js');
let code = fs.readFileSync(filePath, 'utf8');

// A very simple formatter that inserts newlines after semicolons and braces
let formatted = code
  .replace(/;/g, ';\n')
  .replace(/{/g, '{\n')
  .replace(/}/g, '\n}\n')
  .replace(/const /g, '\nconst ')
  .replace(/function /g, '\nfunction ')
  .replace(/return /g, '\nreturn ');

fs.writeFileSync(path.join(__dirname, 'formatted_portfolio.js'), formatted);
console.log('Formatted file written to scratch/formatted_portfolio.js');
