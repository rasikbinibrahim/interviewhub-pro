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
    expectedAnswer: "CommonJS uses `require()` and `module.exports` and remains important for legacy Node.js packages/tooling.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nCommonJS uses `require()` and `module.exports` and remains important for legacy Node.js packages/tooling.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m14-292',
    number: 'JSADV-M14-292',
    title: 'What Are ES Modules?',
    difficulty: 'Easy',
    expectedAnswer: "ES modules are the standardized `import`/`export` module system with static structure suitable for tooling and tree shaking.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nES modules are the standardized `import`/`export` module system with static structure suitable for tooling and tree shaking.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m14-293',
    number: 'JSADV-M14-293',
    title: 'What Is the Difference Between CommonJS and ESM?',
    difficulty: 'Medium',
    expectedAnswer: "CommonJS uses `require()` and `module.exports` and remains important for legacy Node.js packages/tooling.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nCommonJS uses `require()` and `module.exports` and remains important for legacy Node.js packages/tooling.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m14-294',
    number: 'JSADV-M14-294',
    title: 'What Is `import`?',
    difficulty: 'Easy',
    expectedAnswer: "Static `import` declares a module dependency at module scope and participates in the module graph.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nStatic `import` declares a module dependency at module scope and participates in the module graph.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m14-295',
    number: 'JSADV-M14-295',
    title: 'What Is `export`?',
    difficulty: 'Easy',
    expectedAnswer: "Exports form a module's public API; named/default exports should be chosen consistently and deliberately.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nExports form a module's public API; named/default exports should be chosen consistently and deliberately.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m14-296',
    number: 'JSADV-M14-296',
    title: 'What Is the Difference Between Default and Named Exports?',
    difficulty: 'Medium',
    expectedAnswer: "CommonJS and ESM differ in syntax, loading/evaluation model, live bindings, tooling, and interoperability; explain those semantics instead of only calling one old/new.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nCommonJS and ESM differ in syntax, loading/evaluation model, live bindings, tooling, and interoperability; explain those semantics instead of only calling one old/new.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m14-297',
    number: 'JSADV-M14-297',
    title: 'What Is Dynamic `import()`?',
    difficulty: 'Medium',
    expectedAnswer: "Static `import` declares a module dependency at module scope and participates in the module graph.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nStatic `import` declares a module dependency at module scope and participates in the module graph.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m14-298',
    number: 'JSADV-M14-298',
    title: 'What Is Tree Shaking?',
    difficulty: 'Medium',
    expectedAnswer: "Tree shaking removes statically unused exports when the bundler can prove they have no required side effects.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nTree shaking removes statically unused exports when the bundler can prove they have no required side effects.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m14-299',
    number: 'JSADV-M14-299',
    title: 'What Are Circular Dependencies?',
    difficulty: 'Hard',
    expectedAnswer: "Circular dependencies can expose partially initialized bindings or temporal errors depending on the module system and evaluation order.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nCircular dependencies can expose partially initialized bindings or temporal errors depending on the module system and evaluation order.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m14-300',
    number: 'JSADV-M14-300',
    title: 'What Are Barrel Files?',
    difficulty: 'Medium',
    expectedAnswer: "Barrel files re-export symbols for convenience but can hide ownership and create cycles or larger dependency graphs if overused.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nBarrel files re-export symbols for convenience but can hide ownership and create cycles or larger dependency graphs if overused.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m14-301',
    number: 'JSADV-M14-301',
    title: 'What Is Module Scope?',
    difficulty: 'Easy',
    expectedAnswer: "Each module has its own scope; bindings are not global unless deliberately attached to a global object.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nEach module has its own scope; bindings are not global unless deliberately attached to a global object.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m14-302',
    number: 'JSADV-M14-302',
    title: 'What Is Lazy Loading?',
    difficulty: 'Medium',
    expectedAnswer: "Lazy loading trades smaller initial work for first-use latency and should be paired with prefetching when useful.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nLazy loading trades smaller initial work for first-use latency and should be paired with prefetching when useful.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m14-303',
    number: 'JSADV-M14-303',
    title: 'How Do Modules Work in the Browser?',
    difficulty: 'Medium',
    expectedAnswer: "Browser ESM is loaded with `type=\"module\"`; module scripts are deferred by default and participate in the module dependency graph.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nBrowser ESM is loaded with `type=\"module\"`; module scripts are deferred by default and participate in the module dependency graph.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m14-304',
    number: 'JSADV-M14-304',
    title: 'How Do Modules Work in Node.js?',
    difficulty: 'Medium',
    expectedAnswer: "Modern Node.js supports both CommonJS and ESM; package metadata and file extensions influence how files are interpreted.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nModern Node.js supports both CommonJS and ESM; package metadata and file extensions influence how files are interpreted.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m14-305',
    number: 'JSADV-M14-305',
    title: 'What Are Module Resolution, Bundling and Production Module Architecture?',
    difficulty: 'Hard',
    experienceLevel: '5–8 Years+',
    expectedAnswer: "Module resolution maps specifiers to files/packages; bundlers may transform, split, or eliminate code based on static analysis.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nModule resolution maps specifiers to files/packages; bundlers may transform, split, or eliminate code based on static analysis.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
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
      part: 'Advanced JS',
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