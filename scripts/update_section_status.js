const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const dirs = fs.readdirSync(ROOT).filter(f => /^\d{2}-/.test(f)).sort();

const sectionCounts = {};
dirs.forEach(d => {
  let count = 0;
  function scan(dir) {
    fs.readdirSync(dir).forEach(f => {
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) scan(p);
      else if (f.endsWith('.md') && f.toLowerCase() !== 'readme.md') count++;
    });
  }
  scan(path.join(ROOT, d));
  sectionCounts[d] = count;
});

let progressContent = fs.readFileSync(path.join(ROOT, 'PROGRESS.md'), 'utf-8');

// Parse lines in "Status by section" table
const lines = progressContent.split('\n');
let inSectionTable = false;
const updatedLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith('## Status by section')) {
    inSectionTable = true;
    updatedLines.push(line);
    continue;
  }
  
  if (inSectionTable && line.startsWith('## ')) {
    inSectionTable = false;
  }
  
  if (inSectionTable && line.startsWith('| ') && !line.startsWith('| #') && !line.startsWith('|---')) {
    const parts = line.split('|').map(s => s.trim());
    if (parts.length >= 4) {
      const secNum = parts[1];
      const secName = parts[2];
      
      // Find matching directory
      const matchingDir = dirs.find(d => d.startsWith(secNum + '-'));
      const count = matchingDir ? sectionCounts[matchingDir] : 0;
      
      let newStatus = '🚧 Planned';
      if (secNum === '00') {
        newStatus = '✅ Done — see [ROADMAP.md](ROADMAP.md)';
      } else if (count > 0) {
        newStatus = `🟡 In progress (${count} page${count > 1 ? 's' : ''})`;
      }
      
      updatedLines.push(`| ${secNum} | ${secName} | ${newStatus} |`);
      continue;
    }
  }
  
  updatedLines.push(line);
}

fs.writeFileSync(path.join(ROOT, 'PROGRESS.md'), updatedLines.join('\n'), 'utf-8');
console.log('Successfully updated Status by section table in PROGRESS.md!');
