// Derived from frontend/src/document/Part_4_Module_13_ES6_Plus_Features_Master_Handbook.md.
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

const CATEGORY = 'ES6+ Features';

const CONCEPTS = [
  'let/const',
  'Template literals',
  'Destructuring',
  'Spread/rest',
  'Optional chaining',
  'Nullish coalescing',
  'Symbols',
  'BigInt',
  'ES modules',
  'Dynamic import',
  'Set/Map',
  'WeakMap/WeakSet',
  'Iterators and generators',
  'Proxy',
  'Reflect',
  'Object.entries/values/fromEntries',
];

const BEST_PRACTICES = [
  'Use `const` by default, `let` when reassignment is required, and avoid `var` in modern code',
  'Prefer template literals over string concatenation',
  'Use destructuring for explicit, readable data extraction',
  'Remember spread cloning is shallow — nested objects are still shared',
  'Use optional chaining (`?.`) only where a value may genuinely be missing',
  "Use `??` instead of `||` when falsy values like `0`, `false`, or `''` must be preserved",
  'Choose `Map`/`Set` for keyed lookups and uniqueness rather than plain objects/arrays when appropriate',
  'Use `WeakMap`/`WeakSet` when associated metadata should not keep an object alive',
  'Delegate Proxy trap handlers to `Reflect` to preserve correct receiver semantics',
  'Confirm target browser/Node.js support and add polyfills or transpilation before relying on a new feature',
  'Measure before assuming a modern syntax choice is a performance win or loss',
];

const COMMON_MISTAKES = [
  'Interview trap: Assuming `const` makes an object immutable — it only prevents reassigning the binding',
  'Interview trap: Assuming spread (`{ ...original }`) deep-clones nested objects',
  'Interview trap: Assuming optional chaining makes an entire expression safe instead of just the part it is applied to',
  'Interview trap: Using `||` for defaults when a valid falsy value like `0` needs to be preserved',
  'Interview trap: Mixing `BigInt` and `Number` directly (`10n + 10`) instead of converting to a matching type',
  'Interview trap: Assuming `JSON.stringify()` can serialize a `BigInt` without explicit conversion',
  'Interview trap: Assuming transpilation alone provides a missing runtime/browser API without a polyfill',
  'Interview trap: Reaching for `Proxy` for its own sake without weighing its overhead and debugging cost',
];

const TRADE_OFFS =
  "Advantages: ES6+ features make scoping predictable (`let`/`const`), data extraction and defaults concise (destructuring, `??`, optional chaining), collections purpose-built (`Map`/`Set`/`WeakMap`/`WeakSet`), and code splitting straightforward (dynamic `import()`). Disadvantages: none of this is free — spread/destructuring copies are shallow, `Proxy` adds real overhead and debugging complexity, `BigInt` cannot mix with `Number` or serialize through `JSON.stringify()` without care, and every feature still needs a browser/Node.js compatibility check (transpilation covers syntax, not missing runtime APIs).";

const FOLLOW_UP_QUESTIONS = [
  'Why does `const user = {}; user.name = "Sam";` work while `user = {}` throws?',
  'Why is spread/rest cloning shallow, and when does that matter?',
  'What is the difference between `||` and `??`, and when would each produce a different result?',
  'When would you choose `Map` over a plain object, or `WeakMap` over `Map`?',
  'How does a `Proxy` trap typically delegate to `Reflect`, and why?',
  'What is the practical difference between `for...in` and `for...of`?',
  'How would you safely transform an object using `Object.entries()`/`Object.fromEntries()`?',
  'What should you check before shipping a modern JavaScript feature to production?',
  'Why can mixing `BigInt` and `Number` throw a `TypeError`?',
  'How would you modernize a legacy codebase using `var`, CommonJS, and `eval` incrementally?',
];

const RELATED_TOPICS = [
  'let and const',
  'Template literals',
  'Destructuring',
  'Spread and rest',
  'Optional chaining and nullish coalescing',
  'Symbols and BigInt',
  'ES modules and dynamic import',
  'Set, Map, WeakMap, WeakSet',
  'Iterators and generators',
  'Proxy and Reflect',
  'Object.entries, Object.values, Object.fromEntries',
  'Browser compatibility and transpilation',
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
    id: 'jsadv-m13-266',
    number: 'JSADV-M13-266',
    title: 'What Are `let` and `const`?',
    difficulty: 'Easy',
    expectedAnswer: "**What Are `let` and `const`?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n**What Are `let` and `const`?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-267',
    number: 'JSADV-M13-267',
    title: 'What Are Template Literals?',
    difficulty: 'Easy',
    expectedAnswer: "Template literals provide readable interpolation and multiline strings.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nTemplate literals provide readable interpolation and multiline strings.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-268',
    number: 'JSADV-M13-268',
    title: 'What Is Destructuring?',
    difficulty: 'Easy',
    expectedAnswer: "Destructuring extracts values from arrays/objects into named bindings with defaults and renaming.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nDestructuring extracts values from arrays/objects into named bindings with defaults and renaming.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-269',
    number: 'JSADV-M13-269',
    title: 'What Are Spread and Rest Operators?',
    difficulty: 'Medium',
    expectedAnswer: "Spread expands iterable/object properties; object spread is shallow.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nSpread expands iterable/object properties; object spread is shallow.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nconst base = { name: \"Rasik\", role: \"Engineer\" };\nconst copy = {\n  name: base.name,\n  role: base.role,\n  active: true,\n};\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst base = { name: \"Rasik\", role: \"Engineer\" };\n\nconst copy = {\n  ...base,\n  active: true,\n};\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-270',
    number: 'JSADV-M13-270',
    title: 'What Is Optional Chaining?',
    difficulty: 'Easy',
    expectedAnswer: "Optional chaining stops a property/call chain when its left side is `null` or `undefined`.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nOptional chaining stops a property/call chain when its left side is `null` or `undefined`.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-271',
    number: 'JSADV-M13-271',
    title: 'What Is Nullish Coalescing?',
    difficulty: 'Easy',
    expectedAnswer: "Nullish coalescing (`??`) falls back only for `null`/`undefined`, preserving valid falsy values like `0` and `false`.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nNullish coalescing (`??`) falls back only for `null`/`undefined`, preserving valid falsy values like `0` and `false`.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-272',
    number: 'JSADV-M13-272',
    title: 'What Are Symbols?',
    difficulty: 'Medium',
    expectedAnswer: "Symbols are unique primitive values often used for non-colliding property keys and well-known protocols.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nSymbols are unique primitive values often used for non-colliding property keys and well-known protocols.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-273',
    number: 'JSADV-M13-273',
    title: 'What Is BigInt?',
    difficulty: 'Medium',
    expectedAnswer: "BigInt represents integers beyond Number's safe integer range but cannot be mixed directly with Number arithmetic.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nBigInt represents integers beyond Number's safe integer range but cannot be mixed directly with Number arithmetic.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-274',
    number: 'JSADV-M13-274',
    title: 'What Are JavaScript Modules?',
    difficulty: 'Easy',
    expectedAnswer: "**What Are JavaScript Modules?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n**What Are JavaScript Modules?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-275',
    number: 'JSADV-M13-275',
    title: 'What Is Dynamic Import?',
    difficulty: 'Medium',
    expectedAnswer: "Dynamic `import()` loads a module asynchronously and is useful for lazy or conditional features.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nDynamic `import()` loads a module asynchronously and is useful for lazy or conditional features.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-276',
    number: 'JSADV-M13-276',
    title: 'What Is a Set?',
    difficulty: 'Easy',
    expectedAnswer: "`Set` stores unique values and is useful for deduplication and membership checks.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`Set` stores unique values and is useful for deduplication and membership checks.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-277',
    number: 'JSADV-M13-277',
    title: 'What Is a Map?',
    difficulty: 'Easy',
    expectedAnswer: "`map` transforms every item and returns an array with the same number of elements.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`map` transforms every item and returns an array with the same number of elements.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-278',
    number: 'JSADV-M13-278',
    title: 'What Are WeakMap and WeakSet?',
    difficulty: 'Hard',
    expectedAnswer: "`map` transforms every item and returns an array with the same number of elements.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`map` transforms every item and returns an array with the same number of elements.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-279',
    number: 'JSADV-M13-279',
    title: 'What Are Iterators and Generators?',
    difficulty: 'Medium',
    expectedAnswer: "Iterators expose a `next()` protocol; generators provide a convenient way to implement iterable sequences lazily.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nIterators expose a `next()` protocol; generators provide a convenient way to implement iterable sequences lazily.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-280',
    number: 'JSADV-M13-280',
    title: "What Is `for...of`?",
    difficulty: 'Easy',
    expectedAnswer: "**What Is `for...of`?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n**What Is `for...of`?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-281',
    number: 'JSADV-M13-281',
    title: 'What Is Proxy?',
    difficulty: 'Hard',
    expectedAnswer: "Proxy intercepts operations on an object; traps should usually delegate to `Reflect` to preserve standard receiver/return semantics.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nProxy intercepts operations on an object; traps should usually delegate to `Reflect` to preserve standard receiver/return semantics.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-282',
    number: 'JSADV-M13-282',
    title: 'What Is Reflect?',
    difficulty: 'Medium',
    expectedAnswer: "Reflect provides function-style primitives for standard object operations and is useful inside Proxy traps.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nReflect provides function-style primitives for standard object operations and is useful inside Proxy traps.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-283',
    number: 'JSADV-M13-283',
    title: 'What Are `Object.entries()` and `Object.values()`?',
    difficulty: 'Easy',
    expectedAnswer: "`Object.entries`, `Object.values`, and `Object.fromEntries` provide predictable object-to-collection transformations.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`Object.entries`, `Object.values`, and `Object.fromEntries` provide predictable object-to-collection transformations.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-284',
    number: 'JSADV-M13-284',
    title: "What Is `Object.fromEntries()`?",
    difficulty: 'Medium',
    expectedAnswer: "`Object.entries`, `Object.values`, and `Object.fromEntries` provide predictable object-to-collection transformations.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`Object.entries`, `Object.values`, and `Object.fromEntries` provide predictable object-to-collection transformations.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-285',
    number: 'JSADV-M13-285',
    title: 'What Is the Relationship Between Entries, Values and FromEntries?',
    difficulty: 'Medium',
    expectedAnswer: "`Object.entries`, `Object.values`, and `Object.fromEntries` provide predictable object-to-collection transformations.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`Object.entries`, `Object.values`, and `Object.fromEntries` provide predictable object-to-collection transformations.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-286',
    number: 'JSADV-M13-286',
    title: 'How Does ES6+ Improve JavaScript Code Quality?',
    difficulty: 'Medium',
    expectedAnswer: "**How Does ES6+ Improve JavaScript Code Quality?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n**How Does ES6+ Improve JavaScript Code Quality?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-287',
    number: 'JSADV-M13-287',
    title: 'How Does Modern JavaScript Affect Performance?',
    difficulty: 'Medium',
    expectedAnswer: "**How Does Modern JavaScript Affect Performance?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n**How Does Modern JavaScript Affect Performance?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-288',
    number: 'JSADV-M13-288',
    title: 'What Are Modern JavaScript Security Considerations?',
    difficulty: 'Medium',
    expectedAnswer: "Modern JavaScript security means validating untrusted input, avoiding unsafe dynamic execution, protecting secrets, and understanding prototype/DOM risks.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nModern JavaScript security means validating untrusted input, avoiding unsafe dynamic execution, protecting secrets, and understanding prototype/DOM risks.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-289',
    number: 'JSADV-M13-289',
    title: 'What Browser Compatibility Should You Consider?',
    difficulty: 'Medium',
    expectedAnswer: "Check target browser/Node support; transpilation handles syntax but does not automatically provide missing runtime APIs.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nCheck target browser/Node support; transpilation handles syntax but does not automatically provide missing runtime APIs.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m13-290',
    number: 'JSADV-M13-290',
    title: 'Final ES6+ Senior Interview Question',
    difficulty: 'Hard',
    experienceLevel: '5–8 Years+',
    expectedAnswer: "**Final ES6+ Senior Interview Question** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n**Final ES6+ Senior Interview Question** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
];

export const MOCK_JAVASCRIPT_ADVANCED_MODULE13_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map(
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