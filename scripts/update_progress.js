const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Scan all md files in 00-99
const dirList = fs.readdirSync(ROOT).filter(f => /^\d{2}-/.test(f));
const mdFiles = [];

dirList.forEach(dir => {
  function scan(d) {
    const items = fs.readdirSync(d);
    items.forEach(item => {
      const p = path.join(d, item);
      if (fs.statSync(p).isDirectory()) {
        scan(p);
      } else if (item.endsWith('.md') && item.toLowerCase() !== 'readme.md') {
        mdFiles.push(path.relative(ROOT, p).replace(/\\/g, '/'));
      }
    });
  }
  scan(path.join(ROOT, dir));
});

console.log(`Total non-README md files: ${mdFiles.length}`);

// Map category targets and count actuals
const CATEGORIES = [
  { name: 'Programming Fundamentals', target: 300, match: f => f.startsWith('01-programming-fundamentals') || f.startsWith('66-sql') || f.startsWith('67-nosql') || f.startsWith('68-git') || f.startsWith('69-github') || f.startsWith('70-linux') },
  { name: 'Logic Building', target: 500, match: f => f.startsWith('70-logic-building') || f.startsWith('65-dsa/logic-building') },
  { name: 'Mathematics', target: 300, match: f => f.startsWith('65-dsa/math') || f.startsWith('71-mathematics') || f.startsWith('71-vscode') },
  { name: 'Pattern Problems', target: 250, match: f => f.startsWith('65-dsa/patterns') || f.startsWith('69-pattern-problems') },
  { name: 'Arrays', target: 500, match: f => f.startsWith('65-dsa/arrays') || f.startsWith('65-dsa/intervals') || f.startsWith('65-dsa/matrix') || f.startsWith('65-dsa/two-pointers') || f.startsWith('65-dsa/sliding-window') },
  { name: 'Strings', target: 500, match: f => f.startsWith('65-dsa/strings') || f.startsWith('65-dsa/string') },
  { name: 'Recursion', target: 250, match: f => f.startsWith('65-dsa/recursion') },
  { name: 'Searching', target: 200, match: f => f.startsWith('65-dsa/searching') },
  { name: 'Sorting', target: 200, match: f => f.startsWith('65-dsa/sorting') },
  { name: 'Hashing', target: 250, match: f => f.startsWith('65-dsa/hashing') },
  { name: 'Linked List', target: 300, match: f => f.startsWith('65-dsa/linked-list') },
  { name: 'Stack', target: 250, match: f => f.startsWith('65-dsa/stack') },
  { name: 'Queue', target: 200, match: f => f.startsWith('65-dsa/queue') },
  { name: 'Deque', target: 100, match: f => f.startsWith('65-dsa/deque') },
  { name: 'Heap', target: 200, match: f => f.startsWith('65-dsa/heap') },
  { name: 'Binary Search', target: 250, match: f => f.startsWith('65-dsa/binary-search/') },
  { name: 'Trees', target: 450, match: f => f.startsWith('65-dsa/binary-tree') || f.startsWith('65-dsa/tree') },
  { name: 'BST', target: 250, match: f => f.startsWith('65-dsa/binary-search-tree') },
  { name: 'Trie', target: 150, match: f => f.startsWith('65-dsa/trie') },
  { name: 'Graph', target: 500, match: f => f.startsWith('65-dsa/graph') },
  { name: 'Greedy', target: 250, match: f => f.startsWith('65-dsa/greedy') },
  { name: 'Backtracking', target: 300, match: f => f.startsWith('65-dsa/backtracking') },
  { name: 'Dynamic Programming', target: 700, match: f => f.startsWith('65-dsa/dp') },
  { name: 'Bit Manipulation', target: 250, match: f => f.startsWith('65-dsa/bit-manipulation') },
  { name: 'Segment Tree', target: 100, match: f => f.startsWith('65-dsa/segment-tree') },
  { name: 'Fenwick Tree', target: 80, match: f => f.startsWith('65-dsa/fenwick-tree') },
  { name: 'Disjoint Set', target: 100, match: f => f.startsWith('65-dsa/disjoint-set') },
  { name: 'JavaScript', target: 1000, match: f => f.startsWith('02-javascript') || f.startsWith('03-advanced') || f.startsWith('61-javascript') || f.startsWith('25-nodejs') },
  { name: 'TypeScript', target: 500, match: f => f.startsWith('04-typescript') || f.startsWith('62-typescript') },
  { name: 'HTML', target: 250, match: f => f.startsWith('06-html') },
  { name: 'CSS', target: 500, match: f => f.startsWith('07-css') || f.startsWith('08-responsive') },
  { name: 'React', target: 1000, match: f => f.startsWith('10-react') || f.startsWith('11-react') || f.startsWith('12-react') || f.startsWith('13-react') || f.startsWith('14-react') || f.startsWith('15-react') || f.startsWith('63-react-coding') },
  { name: 'Redux', target: 300, match: f => f.startsWith('16-redux') || f.startsWith('17-redux') || f.startsWith('18-rtk') || f.startsWith('19-zustand') || f.startsWith('21-mobx') },
  { name: 'React Query', target: 200, match: f => f.startsWith('20-react-query') },
  { name: 'Next.js', target: 400, match: f => f.startsWith('22-nextjs') },
  { name: 'React Native', target: 500, match: f => f.startsWith('23-react-native') || f.startsWith('24-expo') || f.startsWith('64-react-native') },
  { name: 'Browser Internals', target: 500, match: f => f.startsWith('05-browser-internals') },
  { name: 'Web APIs', target: 300, match: f => f.startsWith('30-web-apis') || f.startsWith('26-rest-api') || f.startsWith('27-graphql') },
  { name: 'Networking', target: 300, match: f => f.startsWith('34-networking') || f.startsWith('28-websockets') },
  { name: 'Security', target: 300, match: f => f.startsWith('29-authentication') || f.startsWith('30-authorization') || f.startsWith('31-security') },
  { name: 'Accessibility', target: 250, match: f => f.startsWith('09-accessibility') },
  { name: 'Performance', target: 300, match: f => f.startsWith('32-performance') || f.startsWith('33-caching') || f.startsWith('73-monitoring') || f.startsWith('74-logging') || f.startsWith('75-error') || f.startsWith('76-analytics') },
  { name: 'Testing', target: 300, match: f => f.startsWith('50-testing') || f.startsWith('72-debugging') },
  { name: 'Build Tools', target: 250, match: f => f.startsWith('35-vite') || f.startsWith('36-webpack') || f.startsWith('37-babel') || f.startsWith('38-npm') || f.startsWith('39-yarn') || f.startsWith('40-pnpm') || f.startsWith('51-ci-cd') },
  { name: 'Design Patterns', target: 300, match: f => f.startsWith('44-design-patterns') || f.startsWith('45-clean-code') || f.startsWith('46-solid') },
  { name: 'Frontend Architecture', target: 300, match: f => f.startsWith('41-monorepo') || f.startsWith('42-turborepo') || f.startsWith('43-nx') || f.startsWith('47-frontend-architecture') || f.startsWith('48-micro') || f.startsWith('49-module') || f.startsWith('52-docker') || f.startsWith('53-kubernetes') || f.startsWith('54-cloud') || f.startsWith('55-aws') || f.startsWith('56-azure') || f.startsWith('57-firebase') || f.startsWith('58-supabase') },
  { name: 'Machine Coding', target: 500, match: f => f.startsWith('59-machine-coding') || f.startsWith('93-coding') || f.startsWith('94-projects') || f.startsWith('95-open-source') },
  { name: 'Frontend System Design', target: 400, match: f => f.startsWith('60-frontend-system-design') || f.startsWith('96-ai') || f.startsWith('97-mcp') || f.startsWith('98-llm') },
  { name: 'Low-Level Design', target: 200, match: f => f.startsWith('57-lld') || f.startsWith('58-low-level') },
  { name: 'High-Level Design', target: 200, match: f => f.startsWith('55-hld') || f.startsWith('56-high-level') },
  { name: 'Behavioral', target: 300, match: f => f.startsWith('77-behavioral') || f.startsWith('78-leadership') },
  { name: 'HR Interview', target: 200, match: f => f.startsWith('80-resume') || f.startsWith('81-hr-questions') || f.startsWith('82-salary') || f.startsWith('92-interview') || f.startsWith('99-career') },
  { name: 'Company-wise', target: 2000, match: f => f.startsWith('85-company') || f.startsWith('86-faang') || f.startsWith('87-product') || f.startsWith('88-mnc') || f.startsWith('89-senior') || f.startsWith('90-staff') || f.startsWith('91-principal') },
  { name: 'Mock Interviews', target: 500, match: f => f.startsWith('79-mock') },
  { name: 'Revision & Cheat Sheets', target: 'Complete coverage', match: f => f.startsWith('83-cheat') || f.startsWith('84-revision') },
];

let totalMapped = 0;
const tableRows = CATEGORIES.map(cat => {
  const actual = mdFiles.filter(cat.match).length;
  if (typeof cat.target === 'number') {
    totalMapped += actual;
  }
  let statusStr = '🚧 Not started';
  if (actual > 0) {
    if (typeof cat.target === 'number') {
      const pct = ((actual / cat.target) * 100).toFixed(1);
      statusStr = `🚧 ${pct}%`;
    } else {
      statusStr = `🟡 In progress (${actual})`;
    }
  }
  const targetDisplay = typeof cat.target === 'number' ? cat.target.toLocaleString() : cat.target;
  return `| ${cat.name} | ${targetDisplay} | ${actual} | ${statusStr} |`;
});

console.log('Total mapped across categories:', totalMapped);

// Build table text
const tableHeader = `| Category | Target | Actual | Status |
|---|---:|---:|---|`;
const tableBody = tableRows.join('\n');
const totalRow = `| **Total** | **~19,730+** | **${totalMapped}** | **~${((totalMapped / 19730) * 100).toFixed(1)}%** |`;

const fullTable = `${tableHeader}\n${tableBody}\n${totalRow}`;

// Update PROGRESS.md content
let progressContent = fs.readFileSync(path.join(ROOT, 'PROGRESS.md'), 'utf-8');

// Replace table in PROGRESS.md
progressContent = progressContent.replace(/\| Category \| Target \| Actual \| Status \|[\s\S]*?\| \*\*Total\*\* \| \*\*~19,730\+\*\* \| \*\*\d+\*\* \| \*\*~\d+\.?\d*%\*\* \|/, fullTable);

// Replace header summary
progressContent = progressContent.replace(/\*\*Actual content written total: \d+ pages total\*\*/, `**Actual content written total: ${mdFiles.length} pages total**`);

fs.writeFileSync(path.join(ROOT, 'PROGRESS.md'), progressContent, 'utf-8');
console.log('Successfully updated PROGRESS.md table with latest actual counts!');
