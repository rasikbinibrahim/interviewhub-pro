const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const dirList = fs.readdirSync(ROOT).filter(f => /^\d{2}-/.test(f));
let removedCount = 0;
let keptCount = 0;

dirList.forEach(dir => {
  function scan(d) {
    const items = fs.readdirSync(d);
    items.forEach(item => {
      const p = path.join(d, item);
      if (fs.statSync(p).isDirectory()) {
        scan(p);
      } else if (item.endsWith('.md') && item.toLowerCase() !== 'readme.md') {
        const content = fs.readFileSync(p, 'utf-8');
        const isPlaceholder = content.includes('// Optimal implementation for') ||
                              content.includes('// Best practice pattern for') ||
                              content.includes('Parameters as specified') ||
                              content.includes('Standard test case') ||
                              content.includes('// Implementation for') ||
                              content.includes('// TODO');
        if (isPlaceholder) {
          fs.unlinkSync(p);
          removedCount++;
        } else {
          keptCount++;
        }
      }
    });
  }
  scan(path.join(ROOT, dir));
});

console.log(`Successfully removed ${removedCount} placeholder files. Retained ${keptCount} authentic question files.`);
