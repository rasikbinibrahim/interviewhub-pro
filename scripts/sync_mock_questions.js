// Regenerates frontend/src/mocks/questions.ts from every real, written
// markdown question/topic page in the repo's numbered (00-99) sections.
//
// This is a from-scratch rewrite of a prior version of this script that
// hardcoded placeholder values (generic "Standard input"/"Expected
// output" examples, fake O(N)/O(N) complexity, a snake_case functionName
// slugified from the title instead of the real function signature, and
// picked the FIRST ```js code block in a file — which for files with a
// "Buggy Code" debugging section meant the shipped "solution" was
// literally the intentionally-broken example). All of that showed up
// directly in the running app: the code editor's starter stub is built
// from `functionName` (see CodingScreen.tsx), so a wrong functionName
// meant the editor stub never matched the real problem signature, and
// placeholder/empty `sampleTests` meant the Run button could never
// meaningfully validate a solution.
//
// This version parses each markdown file's real `## Heading` sections
// (per QUESTION_TEMPLATE.md / TECHNICAL_QUESTION_TEMPLATE.md) instead of
// filling in template boilerplate. Where a field genuinely can't be
// extracted (missing section, non-tabular example, class-based API that
// doesn't fit the single-function Run harness), it is left empty/absent
// rather than fabricated, and logged in the end-of-run report so gaps
// are visible instead of silently wrong.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// ---------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------

const dirList = fs.readdirSync(ROOT).filter((f) => /^\d{2}-/.test(f));
const mdFilesList = [];

dirList.forEach((dir) => {
  function scan(d) {
    const items = fs.readdirSync(d);
    items.forEach((item) => {
      const p = path.join(d, item);
      if (fs.statSync(p).isDirectory()) {
        scan(p);
      } else if (item.endsWith('.md') && item.toLowerCase() !== 'readme.md') {
        mdFilesList.push(p);
      }
    });
  }
  scan(path.join(ROOT, dir));
});

console.log('Found', mdFilesList.length, 'markdown files across 00-99 directories.');

// ---------------------------------------------------------------------
// Markdown section parsing
// ---------------------------------------------------------------------

function normalizeHeading(h) {
  return h.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** Splits a markdown file into its `## Heading` sections (h1 also ends the previous section). */
function splitSections(content) {
  const lines = content.split('\n');
  const sections = [];
  let current = null;

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    const h1 = !h2 && line.match(/^#\s+(.+?)\s*$/);
    if (h2) {
      if (current) sections.push(current);
      current = { heading: h2[1], lines: [] };
    } else if (h1) {
      if (current) sections.push(current);
      current = null;
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) sections.push(current);

  return sections.map((s) => ({ heading: s.heading, content: s.lines.join('\n').trim() }));
}

function buildSectionMap(sections) {
  const map = new Map();
  for (const s of sections) {
    const key = normalizeHeading(s.heading);
    if (!map.has(key)) map.set(key, s.content);
  }
  return map;
}

function getSection(map, aliases) {
  for (const alias of aliases) {
    const val = map.get(alias);
    if (val) return val;
  }
  return null;
}

function getMeta(content, label) {
  const m = content.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)$`, 'm'));
  return m ? m[1].trim() : null;
}

/** Collapses a prose section to one paragraph (for fields rendered as a single <p>). */
function collapse(text) {
  if (!text) return '';
  return text.replace(/\s+/g, ' ').trim();
}

/** Joins list-shaped section content into a readable sentence instead of raw "- " bullets. */
function collapseAsList(text) {
  const items = parseList(text);
  return items.join('; ');
}

function cleanLabel(s) {
  return s.replace(/`/g, '').trim();
}

// ---------------------------------------------------------------------
// List / table parsing
// ---------------------------------------------------------------------

function parseList(text) {
  if (!text) return [];
  const items = [];
  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim();
    const bullet = line.match(/^(?:[-*]|\d+\.)\s+(.+)$/);
    if (bullet) items.push(bullet[1].trim());
  }
  if (items.length > 0) return items;
  // No list markers found — treat non-empty prose as a single item rather
  // than silently dropping real (if unconventionally formatted) content.
  const collapsed = collapse(text);
  return collapsed ? [collapsed] : [];
}

function isTableSeparator(line) {
  return /^\|[\s:|-]+\|$/.test(line);
}

/** Parses a markdown pipe table's data rows (header + separator excluded) into cell arrays. */
function parseTable(text) {
  if (!text) return null;
  const tableLines = text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('|') && l.endsWith('|'));
  const dataLines = tableLines.filter((l) => !isTableSeparator(l));
  if (dataLines.length < 2) return null; // need a header row + at least one data row
  return dataLines.slice(1).map((l) => l.split('|').slice(1, -1).map((c) => stripBackticks(c.trim())));
}

function stripBackticks(cell) {
  const m = cell.match(/^`(.*)`$/);
  return m ? m[1] : cell;
}

function extractCodeBlock(text, preferredLangs) {
  if (!text) return null;
  const re = /```(\w*)\n([\s\S]*?)```/g;
  let m;
  const fallback = [];
  while ((m = re.exec(text))) {
    const lang = m[1].toLowerCase();
    if (preferredLangs.includes(lang)) return m[2].trim();
    fallback.push(m[2].trim());
  }
  return fallback[0] ?? null;
}

const NON_SOLUTION_HEADINGS = new Set(
  ['buggycode', 'buggycodewhereapplicable', 'rootcauseanalysis', 'stepbystepdebuggingprocess'].map(normalizeHeading)
);

/** Finds the real solution code block, explicitly skipping "buggy code" debugging examples. */
function findSolutionCode(sections, primaryAliases, langs) {
  const map = buildSectionMap(sections);
  const primary = getSection(map, primaryAliases);
  const fromPrimary = extractCodeBlock(primary, langs);
  if (fromPrimary) return fromPrimary;

  for (const s of sections) {
    if (NON_SOLUTION_HEADINGS.has(normalizeHeading(s.heading))) continue;
    const code = extractCodeBlock(s.content, langs);
    if (code) return code;
  }
  return null;
}

/**
 * Matches `const NAME: SomeType<...> = (params) => ...` — the common
 * shape of typed React component solutions (e.g.
 * `const StarRating: React.FC<{ maxStars?: number }> = ({ maxStars }) => {`).
 * A plain regex can't reliably skip the type annotation, since it can
 * itself contain nested `<>`/`{}`/`()` and even its own `=>` (a
 * function-type parameter) before the real arrow — so this walks the
 * source character by character, tracking bracket depth, to find the
 * assignment `=` and parameter list that actually belong to NAME.
 */
function findTypedArrowDeclaration(code, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const declRe = new RegExp(`\\bconst\\s+${escaped}\\b`);
  const m = declRe.exec(code);
  if (!m) return null;

  let i = m.index + m[0].length;
  const skipWs = () => {
    while (i < code.length && /\s/.test(code[i])) i++;
  };
  const skipBalancedTo = (stopChar, stopLookahead) => {
    let depth = 0;
    while (i < code.length) {
      const c = code[i];
      if ('<({['.includes(c)) depth++;
      else if ('>)}]'.includes(c)) depth--;
      else if (depth <= 0 && c === stopChar && (!stopLookahead || code[i + 1] === stopLookahead)) return true;
      i++;
    }
    return false;
  };

  skipWs();
  if (code[i] === ':') {
    i++;
    if (!skipBalancedTo('=')) return null;
  }
  skipWs();
  if (code[i] !== '=' || code[i + 1] === '=' || code[i + 1] === '>') return null;
  i++;
  skipWs();
  if (code.slice(i, i + 5) === 'async') {
    i += 5;
    skipWs();
  }
  if (code[i] !== '(') return null;

  const paramsStart = i + 1;
  let depth = 1;
  i++;
  while (i < code.length && depth > 0) {
    if (code[i] === '(') depth++;
    else if (code[i] === ')') depth--;
    i++;
  }
  if (depth !== 0) return null;
  const params = code.slice(paramsStart, i - 1);

  skipWs();
  if (code[i] === ':') {
    i++;
    if (!skipBalancedTo('=', '>')) return null;
  }
  if (code.slice(i, i + 2) !== '=>') return null;

  return { name, kind: 'arrow', params };
}

/**
 * Finds a specific named declaration (function/class/arrow/function-expr)
 * in `code`, if one with that exact name exists.
 */
function findDeclarationByName(code, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  let m = code.match(new RegExp(`\\bfunction\\s+${escaped}\\s*\\(([^)]*)\\)`));
  if (m) return { name, kind: 'function', params: m[1] };
  m = code.match(new RegExp(`\\bclass\\s+${escaped}\\b`));
  if (m) return { name, kind: 'class', params: '' };
  m = code.match(new RegExp(`\\bconst\\s+${escaped}\\s*=\\s*(?:async\\s*)?\\(([^)]*)\\)\\s*(?::[^=]+)?=>`));
  if (m) return { name, kind: 'arrow', params: m[1] };
  m = code.match(new RegExp(`\\bconst\\s+${escaped}\\s*=\\s*(?:async\\s+)?function\\b[^(]*\\(([^)]*)\\)`));
  if (m) return { name, kind: 'function-expr', params: m[1] };
  const typedArrow = findTypedArrowDeclaration(code, name);
  if (typedArrow) return typedArrow;
  return null;
}

function firstDeclaration(code) {
  let m = code.match(/\bfunction\s+([A-Za-z_$][\w$]*)\s*\(([^)]*)\)/);
  if (m) return { name: m[1], kind: 'function', params: m[2] };
  m = code.match(/\bclass\s+([A-Za-z_$][\w$]*)/);
  if (m) return { name: m[1], kind: 'class', params: '' };
  m = code.match(/\bconst\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?\(([^)]*)\)\s*(?::[^=]+)?=>/);
  if (m) return { name: m[1], kind: 'arrow', params: m[2] };
  m = code.match(/\bconst\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s+)?function\b[^(]*\(([^)]*)\)/);
  if (m) return { name: m[1], kind: 'function-expr', params: m[2] };
  return null;
}

/**
 * Picks the function/class the question actually intends to be graded —
 * not necessarily the first one declared. A solution with a helper
 * function followed by the "real" one (e.g. `findGCD` used internally by
 * `findGCDAndLCM`) would otherwise have its helper picked by mistake,
 * since it's textually first. Most problem statements explicitly name
 * their target function in backticks (e.g. "Write a function
 * `largestOfThree(a, b, c)` that..."), which is a far more reliable
 * signal than declaration order — use it whenever the named identifier
 * actually exists in the solution code.
 */
function extractFunctionSignature(code, problemStatement) {
  if (!code) return null;
  if (problemStatement) {
    const named = problemStatement.match(/`([A-Za-z_$][\w$]*)\s*\(/);
    if (named) {
      const bySignature = findDeclarationByName(code, named[1]);
      if (bySignature) return bySignature;
    }
  }
  return firstDeclaration(code);
}

function paramNames(sig) {
  if (!sig || !sig.params) return [];
  return sig.params
    .split(',')
    .map((p) => p.trim().split('=')[0].trim().replace(/^\{|\}$/g, '').replace(/:\s*.+$/, '').trim())
    .filter(Boolean);
}

// ---------------------------------------------------------------------
// Example -> sampleTests derivation (best-effort; skips what it can't parse)
// ---------------------------------------------------------------------

function splitTopLevel(str, sep) {
  const parts = [];
  let depth = 0;
  let current = '';
  let inStr = null;
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (inStr) {
      current += c;
      if (c === inStr && str[i - 1] !== '\\') inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      inStr = c;
      current += c;
      continue;
    }
    if ('([{'.includes(c)) depth++;
    if (')]}'.includes(c)) depth--;
    if (c === sep && depth === 0) {
      parts.push(current);
      current = '';
      continue;
    }
    current += c;
  }
  if (current.trim() !== '') parts.push(current);
  return parts.map((p) => p.trim()).filter(Boolean);
}

/**
 * True only for plain data-literal expressions (numbers, strings,
 * booleans, null/undefined, arrays, objects) — never for anything that
 * calls a function, constructs, or is async. Example cells sometimes
 * contain expressions like `Promise.reject('boom')` or `delay(30, 'a')`
 * to illustrate async behavior in prose; evaluating those would actually
 * *run* them (a rejected promise there becomes an unhandled rejection),
 * and they aren't meaningful as synchronous test inputs anyway.
 */
function isSafeLiteralExpr(expr) {
  const stripped = expr.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`/g, '""');
  if (/\bfunction\b|\basync\b|\bawait\b|=>|\bnew\b/.test(stripped)) return false;
  if (/[A-Za-z_$][\w$]*\s*\(/.test(stripped)) return false; // any call expression, e.g. Promise.reject(...)
  return true;
}

function safeEvalLiteral(expr) {
  if (!isSafeLiteralExpr(expr)) return { ok: false, value: undefined };
  try {
    // Trusted, build-time-only input: expr comes from this repo's own
    // markdown, not user/network input. Same trust boundary as
    // codeRunner.ts's runtime use of `new Function` (see that file's
    // safety note) — this one runs in Node during content generation.
    // eslint-disable-next-line no-new-func
    const fn = new Function(`"use strict"; return (${expr});`);
    return { ok: true, value: fn() };
  } catch {
    return { ok: false, value: undefined };
  }
}

/**
 * Runs each candidate test against the *actual extracted solution code*,
 * using the same execution model as frontend/src/shared/services/
 * codeRunner.ts (new Function + JSON.stringify equality), and keeps only
 * the ones the reference solution genuinely passes.
 *
 * This matters because a syntactically-derived test can be well-formed
 * but still wrong to ship: an algorithm whose result order isn't part of
 * its contract (e.g. "return the found words" — any order is correct)
 * may legitimately produce elements in a different order than the prose
 * example happened to list them in, and an in-place algorithm (e.g. an
 * in-place sort) returns undefined rather than the mutated array. Both
 * are correct solutions that a naive equality check would mark "failed"
 * — exactly the false-negative bug this generator exists to eliminate,
 * not reintroduce. Self-validating against the real solution guarantees
 * every shipped sampleTest is one the reference solution actually passes
 * (the same invariant frontend/src/shared/services/codeRunner.test.ts
 * checks at test time).
 */
function selfValidateTests(jsCode, functionName, tests) {
  if (!jsCode || tests.length === 0) return [];
  const noop = () => {};
  const mockUseState = (init) => [typeof init === 'function' ? init() : init, noop];
  const mockUseEffect = (cb) => {
    const cleanup = cb();
    if (typeof cleanup === 'function') cleanup();
  };

  const valid = [];
  for (const test of tests) {
    try {
      // eslint-disable-next-line no-new-func
      const factory = new Function(
        'React',
        'useState',
        'useEffect',
        `${jsCode}\nreturn typeof ${functionName} === 'function' ? ${functionName} : undefined;`
      );
      const fn = factory(undefined, mockUseState, mockUseEffect);
      if (typeof fn !== 'function') continue;
      // Clone args before calling — some reference solutions mutate their
      // input in place (e.g. flood-fill marking visited grid cells), and
      // test.input is the exact object that gets serialized into
      // questions.ts. Validating against a live reference must never
      // corrupt the very data being shipped.
      const clonedInput = JSON.parse(JSON.stringify(test.input));
      const actual = fn(...clonedInput);
      if (JSON.stringify(actual) === JSON.stringify(test.expectedOutput)) {
        valid.push(test);
      }
    } catch {
      // Reference solution threw on its own documented example — don't ship this test.
    }
  }
  return valid;
}

function buildSampleTests(exampleRows, sig) {
  if (!sig || sig.kind === 'class') return []; // harness only supports plain function calls
  const names = paramNames(sig);
  const tests = [];

  for (const row of exampleRows) {
    const { input, output, explanation } = row;
    if (!input || !output) continue;

    const pieces = splitTopLevel(input, ',');
    if (pieces.length === 0) continue;

    const namedPieces = pieces.map((p) => p.match(/^([A-Za-z_$][\w$]*)\s*=\s*([\s\S]+)$/));
    let valueExprs;
    if (namedPieces.every(Boolean)) {
      if (names.length > 0) {
        const byName = {};
        namedPieces.forEach((m) => {
          byName[m[1]] = m[2];
        });
        valueExprs = names.map((n) => byName[n]);
        if (valueExprs.some((v) => v === undefined)) {
          valueExprs = namedPieces.map((m) => m[2]);
        }
      } else {
        valueExprs = namedPieces.map((m) => m[2]);
      }
    } else {
      valueExprs = pieces;
    }

    const evaluated = valueExprs.map((v) => safeEvalLiteral(v));
    if (evaluated.some((e) => !e.ok)) continue;

    const outEval = safeEvalLiteral(output);
    if (!outEval.ok) continue;

    tests.push({
      input: evaluated.map((e) => e.value),
      expectedOutput: outEval.value,
      description: explanation ? explanation.slice(0, 140) : 'Derived from a documented example.',
    });
  }

  return tests;
}

// ---------------------------------------------------------------------
// Category mapping — every real content folder gets an explicit slug.
// (Previously, any folder not explicitly listed silently fell into
// "javascript" — e.g. CSS, HTML, accessibility, networking, redux,
// company-wise questions were all miscategorized this way, breaking the
// category filter for those questions.)
// ---------------------------------------------------------------------

const FOLDER_CATEGORY = {
  '01-programming-fundamentals': 'programming-fundamentals',
  '02-javascript-fundamentals': 'javascript',
  '03-advanced-javascript': 'javascript',
  '04-typescript': 'typescript',
  '05-browser-internals': 'browser-internals',
  '06-html': 'html',
  '07-css': 'css',
  '09-accessibility': 'accessibility',
  '10-react': 'react',
  '16-redux': 'redux',
  '20-react-query': 'react-query',
  '22-nextjs': 'nextjs',
  '23-react-native': 'react-native',
  '24-expo': 'react-native',
  '31-security': 'security',
  '32-performance': 'performance',
  '34-networking': 'networking',
  '35-vite': 'build-tools',
  '44-design-patterns': 'design-patterns',
  '47-frontend-architecture': 'frontend-architecture',
  '50-testing': 'testing',
  '59-machine-coding': 'machine-coding',
  '60-frontend-system-design': 'system-design',
  '61-javascript-coding': 'javascript',
  '62-typescript-coding': 'typescript',
  '63-react-coding': 'react',
  '64-react-native-coding': 'react-native',
  '72-debugging': 'debugging',
  '77-behavioral': 'behavioral',
  '79-mock-interviews': 'mock-interviews',
  '81-hr-questions': 'hr-interview',
  '83-cheat-sheets': 'cheat-sheets',
  '85-company-wise-questions': 'company-wise',
};

function resolveCategory(relPath) {
  const folder = relPath.split('/')[0];
  if (folder === '65-dsa') {
    return relPath.split('/')[1] || 'dsa';
  }
  return FOLDER_CATEGORY[folder] ?? 'javascript';
}

// ---------------------------------------------------------------------
// Per-file gap reporting
// ---------------------------------------------------------------------

const warnings = [];
function warn(file, issue) {
  warnings.push(`${file}: ${issue}`);
}

// ---------------------------------------------------------------------
// Main pass
// ---------------------------------------------------------------------

const codingQuestions = [];
const technicalQuestions = [];

let qCounter = 1000;
let tCounter = 1000;

const CODING_ALIASES = {
  problemStatement: ['problemstatement'],
  input: ['input'],
  output: ['output'],
  constraints: ['constraints'],
  examples: ['examples'],
  edgeCases: ['edgecases'],
  hints: ['hints'],
  algorithm: ['algorithm'],
  dryRun: ['dryrun', 'stepbystepdryrun'],
  jsSolution: ['javascriptsolution', 'codesolution'],
  tsSolution: ['typescriptsolution'],
  timeComplexity: ['timecomplexity', 'timespacecomplexity'],
  spaceComplexity: ['spacecomplexity', 'timespacecomplexity'],
  commonMistakes: ['commonmistakes'],
  followUps: ['followupquestions', 'interviewfollowupquestions'],
  similarQuestions: ['similarquestions', 'similarproblems', 'relatedproblems'],
};

const TECHNICAL_ALIASES = {
  question: ['question'],
  expectedAnswer: ['expectedanswer'],
  deepExplanation: ['deepexplanation', 'detailedexplanation'],
  productionExample: ['productionexample', 'realworldexample'],
  bestPractices: ['bestpractices'],
  tradeOffs: ['tradeoffs'],
  commonMistakes: ['commonmistakes'],
  followUps: ['followupquestions', 'interviewfollowupquestions'],
  relatedTopics: ['relatedtopics', 'topics', 'references'],
};

mdFilesList.forEach((filePath, i) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relPath = path.relative(ROOT, filePath).replace(/\\/g, '/');
  const sections = splitSections(content);
  const map = buildSectionMap(sections);

  // --- Title / question number ---
  const h1Match = content.match(/^#\s+(.+)$/m);
  const rawH1 = h1Match ? h1Match[1] : path.basename(filePath, '.md');
  let questionNumber = `Q${i + 1}`;
  let title = rawH1;
  const qNumMatch = rawH1.match(/^([A-Z0-9]+)\s*·\s*(.+)$/);
  if (qNumMatch) {
    questionNumber = qNumMatch[1];
    title = qNumMatch[2];
  } else {
    title = rawH1.replace(/^(Coding Question:|Technical Question:)\s*/i, '').trim();
  }

  // --- Shared metadata ---
  const diffMatch = getMeta(content, 'Difficulty');
  const difficulty = diffMatch && /^(Easy|Medium|Hard)$/i.test(diffMatch)
    ? diffMatch[0].toUpperCase() + diffMatch.slice(1).toLowerCase()
    : (warn(relPath, 'no valid Difficulty found, defaulted to Medium'), 'Medium');

  const companiesRaw = getMeta(content, 'Companies Asked') ?? getMeta(content, 'Companies');
  const companies = companiesRaw
    ? companiesRaw.split(',').map((s) => cleanLabel(s)).filter(Boolean)
    : (warn(relPath, 'no Companies found, used generic fallback'), ['Google', 'Amazon', 'Microsoft', 'Meta']);

  const freqRaw = getMeta(content, 'Interview Frequency') ?? '';
  const starCount = (freqRaw.match(/★/g) || []).length;
  const frequency = starCount >= 1 && starCount <= 5 ? starCount : 3;

  const category = resolveCategory(relPath);

  const conceptsRaw = getMeta(content, 'Concepts Tested') ?? getMeta(content, 'Concepts');
  const concepts = conceptsRaw ? conceptsRaw.split(',').map((s) => cleanLabel(s)).filter(Boolean) : [category];

  // --- Coding vs technical classification ---
  const hasJsSolutionHeading = map.has('javascriptsolution');
  const hasProblemStatement = map.has('problemstatement');
  const hasTechnicalShape = map.has('question') && map.has('expectedanswer');
  const isCoding =
    hasJsSolutionHeading ||
    hasProblemStatement ||
    (!hasTechnicalShape &&
      (relPath.includes('coding') ||
        relPath.includes('65-dsa') ||
        relPath.includes('01-programming') ||
        relPath.includes('72-debugging')));

  if (isCoding) {
    qCounter++;
    const a = CODING_ALIASES;

    const problemStatement = collapse(getSection(map, a.problemStatement)) || title;
    const inputSection = getSection(map, a.input);
    const outputSection = getSection(map, a.output);
    const input = (inputSection && (collapseAsList(inputSection) || collapse(inputSection))) || 'Parameters as specified';
    const output = (outputSection && (collapseAsList(outputSection) || collapse(outputSection))) || 'Result as specified';

    const constraintsText = getSection(map, a.constraints);
    const constraints = parseList(constraintsText);
    if (constraints.length === 0) {
      warn(relPath, 'no Constraints found, used generic fallback');
      constraints.push('Standard time and space bounds apply.');
    }

    // Examples: prefer a real table; fall back to a fenced-code usage
    // example; never fabricate generic "Standard input" placeholders.
    const examplesText = getSection(map, a.examples);
    const exampleTable = parseTable(examplesText);
    let examples;
    let exampleRowsForTests = [];
    if (exampleTable) {
      examples = exampleTable.map((cols) => ({
        input: cols[0] || '',
        output: cols[1] || '',
        explanation: cols[2] || '',
      }));
      exampleRowsForTests = examples;
    } else if (examplesText && /```/.test(examplesText)) {
      const codeExample = extractCodeBlock(examplesText, ['js', 'javascript', 'ts', 'typescript', '']);
      examples = [
        {
          input: 'See usage example below',
          output: codeExample || examplesText,
          explanation: 'Derived from the documented API usage (class/multi-call example, not a single input/output pair).',
        },
      ];
      warn(relPath, 'Examples section is code-block style, not a table — sampleTests could not be derived from it');
    } else if (examplesText) {
      examples = [{ input: '', output: '', explanation: collapse(examplesText) }];
      warn(relPath, 'Examples section present but not in table or code-block form');
    } else {
      examples = [];
      warn(relPath, 'no Examples found');
    }

    const edgeCasesText = getSection(map, a.edgeCases);
    const edgeCaseTable = parseTable(edgeCasesText);
    let edgeCases;
    if (edgeCaseTable) {
      edgeCases = edgeCaseTable.map((cols) => ({ case: cols[0] || '', expected: cols[1] || '' }));
    } else if (edgeCasesText) {
      edgeCases = parseList(edgeCasesText).map((item) => {
        const arrow = item.split(/→|->/);
        return arrow.length > 1
          ? { case: arrow[0].trim(), expected: arrow.slice(1).join('→').trim() }
          : { case: item, expected: '' };
      });
    } else {
      edgeCases = [];
      warn(relPath, 'no Edge Cases found');
    }

    const jsSolution = findSolutionCode(sections, a.jsSolution, ['js', 'javascript', 'jsx']);
    const tsSolution = findSolutionCode(sections, a.tsSolution, ['ts', 'typescript', 'tsx']) ?? jsSolution;
    if (!jsSolution) warn(relPath, 'no JavaScript Solution code block found');

    const sig = extractFunctionSignature(jsSolution, problemStatement);
    let functionName;
    if (sig) {
      functionName = sig.name;
      if (sig.kind === 'class') {
        warn(relPath, `solution is a class ("${sig.name}") — Run harness only supports plain functions, sampleTests will be empty`);
      }
    } else {
      functionName = title.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      warn(relPath, 'could not find a function/class name in the solution code, fell back to a slug of the title');
    }

    const hintsList = parseList(getSection(map, a.hints));
    let hints;
    if (hintsList.length >= 3) {
      hints = hintsList.slice(0, 3);
    } else if (hintsList.length > 0) {
      warn(relPath, `only ${hintsList.length} real hint(s) found, padded to 3 — needs manual authoring`);
      hints = [hintsList[0], hintsList[1] ?? hintsList[0], hintsList[2] ?? hintsList[0]];
    } else {
      warn(relPath, 'no Hints section found — needs manual authoring, used generic placeholders');
      hints = [
        `Re-read the constraints for "${title}" before choosing a data structure or approach.`,
        `Work through one example by hand first — what changes on each step?`,
        `Check your solution against the stated time/space complexity before considering it done.`,
      ];
    }

    const algorithm = getSection(map, a.algorithm) ?? '';
    if (!algorithm) warn(relPath, 'no Algorithm section found');
    const dryRun = getSection(map, a.dryRun) ?? '';
    if (!dryRun) warn(relPath, 'no Dry Run section found');

    const timeComplexity = collapse(getSection(map, a.timeComplexity)) || 'Not specified in source';
    const spaceComplexity = collapse(getSection(map, a.spaceComplexity)) || 'Not specified in source';
    if (timeComplexity === 'Not specified in source') warn(relPath, 'no Time Complexity found');
    if (spaceComplexity === 'Not specified in source') warn(relPath, 'no Space Complexity found');

    const commonMistakes = parseList(getSection(map, a.commonMistakes));
    if (commonMistakes.length === 0) warn(relPath, 'no Common Mistakes found');

    const followUpQuestions = parseList(getSection(map, a.followUps));
    if (followUpQuestions.length === 0) warn(relPath, 'no Follow-up Questions found');

    const similarQuestions = parseList(getSection(map, a.similarQuestions));
    if (similarQuestions.length === 0) warn(relPath, 'no Similar Questions found');

    const candidateTests = buildSampleTests(exampleRowsForTests, sig);
    const sampleTests = selfValidateTests(jsSolution, functionName, candidateTests);
    if (candidateTests.length > 0 && sampleTests.length < candidateTests.length) {
      warn(
        relPath,
        `${candidateTests.length - sampleTests.length}/${candidateTests.length} derived sampleTest(s) rejected — the reference solution did not actually produce the documented example output for them (order-independent result, in-place mutation returning undefined, or a real mismatch)`
      );
    }
    if (sampleTests.length === 0) {
      warn(relPath, 'no sampleTests could be derived — Run button has nothing real to validate against');
    }

    codingQuestions.push({
      detail: {
        id: `q${qCounter}`,
        questionNumber,
        title,
        difficulty,
        companies,
        frequency,
        category,
        concepts,
        solved: false,
        attempted: false,
        bookmarked: false,
        questionType: 'coding',
        problemStatement,
        input,
        output,
        constraints,
        examples,
        edgeCases,
        functionName,
        isClassBased: sig?.kind === 'class',
        sampleTests,
      },
      hints: { hints },
      solution: {
        algorithm,
        dryRun,
        javascriptSolution: jsSolution ?? `function ${functionName}() {\n  // Solution not found in source markdown\n}`,
        typescriptSolution: tsSolution ?? `function ${functionName}(): unknown {\n  // Solution not found in source markdown\n}`,
        timeComplexity,
        spaceComplexity,
        commonMistakes,
        followUpQuestions,
        similarQuestions,
      },
    });
  } else {
    tCounter++;
    const a = TECHNICAL_ALIASES;

    const question = collapse(getSection(map, a.question)) || title;
    const expectedAnswer = collapse(getSection(map, a.expectedAnswer));
    if (!expectedAnswer) warn(relPath, 'no Expected Answer found');
    const deepExplanation = getSection(map, a.deepExplanation) ?? '';
    if (!deepExplanation) warn(relPath, 'no Deep Explanation found');
    const productionExample = getSection(map, a.productionExample) ?? '';
    const bestPractices = parseList(getSection(map, a.bestPractices));
    if (bestPractices.length === 0) warn(relPath, 'no Best Practices found');
    const tradeOffs = collapse(getSection(map, a.tradeOffs));
    const commonMistakes = parseList(getSection(map, a.commonMistakes));
    if (commonMistakes.length === 0) warn(relPath, 'no Common Mistakes found');
    const followUpQuestions = parseList(getSection(map, a.followUps));
    if (followUpQuestions.length === 0) warn(relPath, 'no Follow-up Questions found');
    const relatedTopics = parseList(getSection(map, a.relatedTopics));
    if (relatedTopics.length === 0) warn(relPath, 'no Related Topics found');

    const experienceLevel =
      getMeta(content, 'Experience Level') ??
      (difficulty === 'Hard' ? 'Senior / Staff (5+ YOE)' : difficulty === 'Medium' ? 'Mid-Senior (2-5 YOE)' : 'Entry-Mid (0-3 YOE)');

    technicalQuestions.push({
      detail: {
        id: `t${tCounter}`,
        questionNumber,
        title,
        difficulty,
        experienceLevel,
        companies,
        frequency,
        category,
        concepts,
        solved: false,
        attempted: false,
        bookmarked: false,
        questionType: 'technical',
        question,
      },
      answer: {
        expectedAnswer: expectedAnswer || question,
        deepExplanation: deepExplanation || expectedAnswer || question,
        productionExample,
        bestPractices,
        tradeOffs,
        commonMistakes,
        followUpQuestions,
        relatedTopics,
      },
    });
  }
});

console.log(`Generated ${codingQuestions.length} Coding Questions and ${technicalQuestions.length} Technical Questions.`);
console.log(`${warnings.length} field-level gaps found (see scripts/sync_report.txt).`);

fs.writeFileSync(
  path.join(ROOT, 'scripts', 'sync_report.txt'),
  `Sync report — ${new Date().toISOString()}\n${warnings.length} gaps across ${mdFilesList.length} files\n\n${warnings.join('\n')}\n`,
  'utf-8'
);

// ---------------------------------------------------------------------
// Write frontend/src/mocks/questions.ts
// ---------------------------------------------------------------------

const questionsTsPath = path.join(ROOT, 'frontend/src/mocks/questions.ts');

const outputContent = `// Mock question bank — parsed from EVERY real, already-written
// question/topic page in the repo via scripts/sync_mock_questions.js.
// Regenerate with \`node scripts/sync_mock_questions.js\` after editing
// or adding markdown content; do not hand-edit this file directly.
// ${codingQuestions.length + technicalQuestions.length} total questions (${codingQuestions.length} coding, ${technicalQuestions.length} technical).

import type {
  CodingQuestionDetail,
  CodingQuestionSolution,
  QuestionHints,
  TechnicalQuestionAnswer,
  TechnicalQuestionDetail,
} from '@/shared/types/question';

interface MockCodingQuestion {
  detail: CodingQuestionDetail;
  hints: QuestionHints;
  solution: CodingQuestionSolution;
}

interface MockTechnicalQuestion {
  detail: TechnicalQuestionDetail;
  answer: TechnicalQuestionAnswer;
}

export type MockQuestion = MockCodingQuestion | MockTechnicalQuestion;

export const MOCK_CODING_QUESTIONS: MockCodingQuestion[] = ${JSON.stringify(codingQuestions, null, 2)};

export const MOCK_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = ${JSON.stringify(technicalQuestions, null, 2)};

export const MOCK_QUESTIONS: MockQuestion[] = [...MOCK_CODING_QUESTIONS, ...MOCK_TECHNICAL_QUESTIONS];
`;

fs.writeFileSync(questionsTsPath, outputContent, 'utf-8');
console.log('Successfully updated frontend/src/mocks/questions.ts with all', codingQuestions.length + technicalQuestions.length, 'questions!');
