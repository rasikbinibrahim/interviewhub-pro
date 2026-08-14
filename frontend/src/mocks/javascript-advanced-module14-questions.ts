// Derived from frontend/src/document/Part_4_Module_14_Modules_Master_Handbook.md.
// Mirrors the MockTechnicalQuestion shape defined in @/mocks/questions.

import type { MockTechnicalQuestion } from '@/mocks/questions';

const COMPANIES = [
  'Google',
  'Meta',
  'Amazon',
  'Microsoft',
  'Netflix',
  'Adobe',
  'Atlassian',
  'Stripe',
  'Uber',
  'Flipkart',
  'Zoho',
];

const CATEGORY = 'Modules';

const CONCEPTS = [
  'CommonJS',
  'ES Modules',
  'import/export',
  'Default vs named exports',
  'Dynamic import()',
  'Tree shaking',
  'Circular dependencies',
  'Barrel files',
  'Module scope',
  'Lazy loading',
  'Browser modules',
  'Node.js modules',
  'Module resolution and bundling',
];

const BEST_PRACTICES = [
  'Prefer ESM over CommonJS when the toolchain supports it',
  'Declare static imports at module top level; use dynamic `import()` for conditional loading',
  'Choose a consistent default-vs-named export convention across the codebase',
  'Use `export *` and barrel files deliberately, not automatically in every folder',
  'Avoid circular dependencies by routing shared behavior through a lower-level module',
  'Keep dependency direction intentional and define explicit public package APIs',
  'Use dynamic imports/lazy loading for route-level or rarely used feature boundaries',
  'Combine lazy loading with prefetching/preloading to reduce perceived delay',
  'Configure package `exports` and analyze bundle output for production module architecture',
  'Document module ownership and keep shared packages stable',
];

const COMMON_MISTAKES = [
  'Interview trap: Saying "CommonJS is old and ESM is new" instead of explaining their actual semantic, loading, and tooling differences',
  'Interview trap: Saying "Node.js only supports CommonJS" — modern Node.js supports ESM too',
  'Interview trap: Assuming tree shaking always removes unused code regardless of side effects, CommonJS usage, or bundler configuration',
  'Interview trap: Accessing a circularly-imported binding before its initialization, causing a `ReferenceError`',
  'Interview trap: Creating giant barrel files that unintentionally expose internal modules or create circular dependencies',
  'Interview trap: Assuming a classic `<script type="module">` blocks HTML parsing the same way a synchronous script does',
  "Interview trap: Assuming `export *` keeps a module's public API explicit",
];

const TRADE_OFFS =
  "Advantages: ES modules give a standardized, statically-analyzable syntax that enables tree shaking, live bindings, and predictable module scope, while dynamic `import()` and lazy loading shrink initial bundle size and startup cost. Disadvantages: CommonJS interop still matters for legacy Node.js code and older packages, circular dependencies can produce partially-initialized bindings and runtime errors, barrel files can blur module boundaries and inflate the dependency graph if used indiscriminately, and lazy loading trades a smaller initial bundle for a delay the first time a deferred feature is requested.";

const FOLLOW_UP_QUESTIONS = [
  'What are the concrete semantic differences between CommonJS and ESM, beyond "old vs new"?',
  'When would you choose a default export over a named export?',
  'How does tree shaking rely on static analysis, and what can defeat it?',
  'How can a circular dependency cause a runtime error in ESM specifically?',
  'What are the risks of a poorly designed barrel file?',
  'How does lazy loading change the startup vs. first-use performance trade-off?',
  'How do module scripts behave differently from classic scripts in the browser?',
  'How does Node.js decide whether a `.js` file is CommonJS or ESM?',
  'How would you design a production module architecture for a large React application?',
  'What senior-level principles keep a dependency graph maintainable at scale?',
];

const RELATED_TOPICS = [
  'CommonJS',
  'ES Modules',
  'import and export',
  'Default vs named exports',
  'Dynamic import()',
  'Tree shaking',
  'Circular dependencies',
  'Barrel files',
  'Module scope',
  'Lazy loading',
  'Browser and Node.js module behavior',
  'Module resolution and bundling',
];

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface QuestionSeed {
  id: string;
  number: string;
  title: string;
  difficulty: Difficulty;
  experienceLevel?: string;
  expectedAnswer: string;
  deepExplanation: string;
}

const EXPERIENCE_BY_DIFFICULTY: Record<Difficulty, string> = {
  Easy: '0–2 Years',
  Medium: '2–5 Years',
  Hard: '5–8 Years / 8+ Years',
};

const FREQUENCY_BY_DIFFICULTY: Record<Difficulty, number> = {
  Easy: 5,
  Medium: 4,
  Hard: 3,
};

const QUESTION_SEEDS: QuestionSeed[] = [
  {
    id: 'jsadv-m14-291',
    number: 'JSADV-M14-291',
    title: 'What Is CommonJS?',
    difficulty: 'Easy',
    expectedAnswer: 'CommonJS is the module system historically associated with Node.js, using `require()`, `module.exports`, and `exports`, with a synchronous loading model.',
    deepExplanation:
      "`module.exports = { add }` in `math.js` and `const { add } = require('./math');` in `app.js` gives `add(2, 3)` → `5`. CommonJS remains important when maintaining older Node.js services, legacy tooling, older test configurations, and existing npm packages, even though modern frontend applications generally prefer ESM when the toolchain supports it.",
  },
  {
    id: 'jsadv-m14-292',
    number: 'JSADV-M14-292',
    title: 'What Are ES Modules?',
    difficulty: 'Easy',
    expectedAnswer: 'ES Modules (ESM) are the standardized JavaScript module system defined by ECMAScript, using `export` and `import`.',
    deepExplanation:
      "`export function add(a, b) { return a + b; }` in `math.js` consumed as `import { add } from './math.js';` in `app.js` gives `add(2, 3)` → `5`. ESM provides standardized module syntax, module scope, static import/export structure, live bindings, tooling-friendly dependency graphs, tree-shaking opportunities, and native browser support via `<script type=\"module\" src=\"/app.js\"></script>`.",
  },
  {
    id: 'jsadv-m14-293',
    number: 'JSADV-M14-293',
    title: 'What Is the Difference Between CommonJS and ESM?',
    difficulty: 'Medium',
    expectedAnswer: 'CommonJS uses `require()`/`module.exports` with synchronous loading and limited static analysis; ESM uses `import`/`export` with a static module graph, live bindings, and strong tree-shaking support.',
    deepExplanation:
      "Beyond syntax, ESM offers native browser support (CommonJS has none), stronger static analysis and tree shaking, and supports top-level await, none of which CommonJS provides in the same way. Interview answer: don't just say \"CommonJS is old and ESM is new\" — explain the actual module semantics, loading behavior, interoperability, static analysis, and tooling/runtime differences.",
  },
  {
    id: 'jsadv-m14-294',
    number: 'JSADV-M14-294',
    title: 'What Is `import`?',
    difficulty: 'Easy',
    expectedAnswer: '`import` consumes exported bindings from an ES module, supporting named, multiple, namespace, default, and side-effect-only forms.',
    deepExplanation:
      "`import { add } from './math.js';` is a named import; `import * as math from './math.js';` is a namespace import; `import UserService from './UserService.js';` is a default import; `import './analytics.js';` loads a module purely for its side effects without importing a binding. Static imports must be declared at module top level — use dynamic `import()` when loading must happen conditionally.",
  },
  {
    id: 'jsadv-m14-295',
    number: 'JSADV-M14-295',
    title: 'What Is `export`?',
    difficulty: 'Easy',
    expectedAnswer: '`export` exposes module bindings, either inline at declaration, after declaration, as multiple named exports, or via re-export from another module.',
    deepExplanation:
      "`export function add(a, b) {...}` exports inline; `function subtract(a, b) {...} export { subtract };` exports after declaration; `export { add } from './math.js';` re-exports a binding from another module; `export * from './math.js';` re-exports everything. `export *` should be used carefully, since it can make a module's public API less explicit.",
  },
  {
    id: 'jsadv-m14-296',
    number: 'JSADV-M14-296',
    title: 'What Is the Difference Between Default and Named Exports?',
    difficulty: 'Medium',
    expectedAnswer: 'A named export is imported with `{}` using its declared name (and a module can have many), while a default export is imported without `{}` under any local name the consumer chooses (only one per module).',
    deepExplanation:
      "`export function formatDate(date) {...}` is imported as `import { formatDate } from './date.js';`, keeping the name part of the exported interface. `export default function formatDate(date) {...}` is imported as `import formatDate from './date.js';`, where the consumer can rename it freely. Senior recommendation: choose a convention and apply it consistently — consistency usually matters more than which style is \"correct.\"",
  },
  {
    id: 'jsadv-m14-297',
    number: 'JSADV-M14-297',
    title: 'What Is Dynamic `import()`?',
    difficulty: 'Medium',
    expectedAnswer: 'Dynamic `import()` loads a module asynchronously and returns a Promise, enabling conditional and on-demand loading.',
    deepExplanation:
      "`const analytics = await import('./analytics.js'); analytics.initialize();` loads the module only when called, e.g. conditionally: `if (user.isAdmin) { const { AdminPanel } = await import('./AdminPanel.js'); AdminPanel.mount(); }`. Production uses include route-level code splitting, admin functionality, heavy charts/editors/PDF viewers, and rarely used workflows; failures should be handled with `try/catch` around the `await import(...)` call.",
  },
  {
    id: 'jsadv-m14-298',
    number: 'JSADV-M14-298',
    title: 'What Is Tree Shaking?',
    difficulty: 'Medium',
    expectedAnswer: "Tree shaking removes unused exports from a production bundle when tooling can statically determine they are unreachable.",
    deepExplanation:
      "If `math.js` exports `add`, `subtract`, and `multiply`, but the application only imports `add`, a capable bundler can eliminate `subtract` and `multiply` from the output. ESM's statically analyzable import/export declarations make this dependency graph → used exports → dead code elimination → smaller bundle pipeline possible. Important: tree shaking isn't magic — it can be defeated by side effects, CommonJS modules, dynamic behavior, package configuration, and bundler configuration.",
  },
  {
    id: 'jsadv-m14-299',
    number: 'JSADV-M14-299',
    title: 'What Are Circular Dependencies?',
    difficulty: 'Hard',
    expectedAnswer: 'A circular dependency occurs when modules depend on each other directly or indirectly (A imports B, B imports A), which can cause initialization-order problems.',
    deepExplanation:
      "With `a.js` importing `valueB` from `b.js` to compute `valueA`, and `b.js` importing `valueA` from `a.js` to compute `valueB`, evaluation order determines whether a binding is initialized yet when it's read. ESM imports are live bindings and module evaluation follows dependency ordering — a circular graph isn't automatically invalid, but accessing a binding before its initialization causes a `ReferenceError`. Prefer `A → shared module ← B` over `A ↔ B`, extracting shared behavior into a lower-level abstraction.",
  },
  {
    id: 'jsadv-m14-300',
    number: 'JSADV-M14-300',
    title: 'What Are Barrel Files?',
    difficulty: 'Medium',
    expectedAnswer: 'A barrel file re-exports multiple modules from a single central entry point, giving consumers one convenient import path.',
    deepExplanation:
      "`components/index.js` re-exporting `Button`, `Modal`, and `Input` lets consumers write `import { Button, Modal } from './components/index.js';`. Advantages: convenient imports, a centralized public API, cleaner package boundaries, easier discoverability. Disadvantages: poorly designed barrels can increase dependency graph complexity, create circular dependencies, blur module boundaries, affect bundling, and expose internals unintentionally — use barrels for deliberate public APIs, not automatically in every folder.",
  },
  {
    id: 'jsadv-m14-301',
    number: 'JSADV-M14-301',
    title: 'What Is Module Scope?',
    difficulty: 'Easy',
    expectedAnswer: 'Variables declared inside an ES module are scoped to that module and are inaccessible from other modules unless explicitly exported.',
    deepExplanation:
      "`const secret = 'private';` in `module.js` is invisible to other modules unless the module also `export`s a way to reach it (e.g. `export function getSecret() { return secret; }`). ES modules are also strict-mode code by definition. This module scope provides natural encapsulation without relying on global variables.",
  },
  {
    id: 'jsadv-m14-302',
    number: 'JSADV-M14-302',
    title: 'What Is Lazy Loading?',
    difficulty: 'Medium',
    expectedAnswer: 'Lazy loading defers loading a module until it is actually needed, instead of loading everything eagerly at startup.',
    deepExplanation:
      "`async function openReports() { const { Reports } = await import('./Reports.js'); Reports.open(); }` only downloads the `Reports` chunk when the user actually opens reports. Benefits: smaller initial JavaScript, faster startup, lower initial parse/compile work, reduced memory pressure. Trade-off: it can introduce a delay the first time a feature is requested — mitigate with prefetching, preloading, route-based splitting, and intelligent caching.",
  },
  {
    id: 'jsadv-m14-303',
    number: 'JSADV-M14-303',
    title: 'How Do Modules Work in the Browser?',
    difficulty: 'Medium',
    expectedAnswer: 'A browser module script (`<script type="module">`) resolves its imports as URLs, fetches the dependency graph, then parses, instantiates, and evaluates the modules, and is deferred by default.',
    deepExplanation:
      "The flow: HTML → module script → resolve imports → fetch dependency graph → parse modules → instantiate → evaluate → application executes. `<script type=\"module\" src=\"/app.js\"></script>` does not block HTML parsing the way a classic synchronous script can. Module specifiers resolve as URLs — relative (`./math.js`), absolute (`/assets/math.js`) — while bare specifiers usually require tooling, import maps, or an environment that resolves them.",
  },
  {
    id: 'jsadv-m14-304',
    number: 'JSADV-M14-304',
    title: 'How Do Modules Work in Node.js?',
    difficulty: 'Medium',
    expectedAnswer: 'Node.js supports both CommonJS (`require`) and ESM (`import`), with project configuration (like `"type": "module"` in `package.json`) determining how `.js` files are interpreted by default.',
    deepExplanation:
      "`const fs = require('node:fs');` is CommonJS; `import fs from 'node:fs';` is ESM. Node ESM considerations: module resolution differs from browsers, package `exports` affects public entry points, file extensions may matter, CommonJS/ESM interoperability has specific rules, and `import()` works for asynchronous loading in either system. Interview trap: don't say \"Node.js only supports CommonJS\" — modern Node.js supports ESM as well.",
  },
  {
    id: 'jsadv-m14-305',
    number: 'JSADV-M14-305',
    title: 'What Are Module Resolution, Bundling and Production Module Architecture?',
    difficulty: 'Hard',
    experienceLevel: '5–8 Years+',
    expectedAnswer: 'Module resolution determines which physical module a specifier like `@company/ui` refers to, and production architecture flows that resolution through a bundler into deployable chunks.',
    deepExplanation:
      "The pipeline: source code → module specifier → package/alias/file resolution → dependency graph → bundler → chunks → minification → deployment. A large application typically separates `apps/web` from shared `packages/` (ui, api, auth, config, utils, analytics), importing only public package APIs rather than reaching into internal paths. Senior design principles: keep dependency direction intentional, avoid circular dependencies, define public package APIs, prefer ESM where practical, use dynamic imports for appropriate feature boundaries, keep shared packages stable, avoid giant barrel files, analyze bundle output, configure package `exports` where appropriate, and document module ownership.",
  },
];

export const MOCK_JAVASCRIPT_ADVANCED_MODULE14_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map(
  (seed) => ({
    detail: {
      id: seed.id,
      questionNumber: seed.number,
      title: seed.title,
      difficulty: seed.difficulty,
      companies: COMPANIES,
      frequency: FREQUENCY_BY_DIFFICULTY[seed.difficulty],
      category: CATEGORY,
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: seed.experienceLevel ?? EXPERIENCE_BY_DIFFICULTY[seed.difficulty],
      question: seed.title,
    },
    answer: {
      expectedAnswer: seed.expectedAnswer,
      deepExplanation: seed.deepExplanation,
      productionExample: `Work through the accompanying code example for "${seed.title}" and verify the documented output before generalizing the behavior to production code.`,
      bestPractices: BEST_PRACTICES,
      tradeOffs: TRADE_OFFS,
      commonMistakes: COMMON_MISTAKES,
      followUpQuestions: FOLLOW_UP_QUESTIONS,
      relatedTopics: RELATED_TOPICS,
    },
  }),
);
