// Derived from frontend/src/document/Part_4_Module_9_Functions_Master_Handbook.md.
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

const CATEGORY = 'Functions';

const CONCEPTS = [
  'First-class functions',
  'Higher-order functions',
  'Callbacks',
  'IIFE',
  'Arrow functions',
  'Rest/spread parameters',
  'Default parameters',
  'Generators',
  'Async functions',
  'Pure functions',
  'Function composition',
  'Currying',
  'Partial application',
  'Memoization',
  'Debounce/throttle',
  'call/apply/bind',
];

const BEST_PRACTICES = [
  'Keep functions focused',
  'Prefer descriptive names',
  'Minimize hidden side effects',
  'Validate external input',
  'Keep parameter counts manageable',
  'Prefer composition over duplicated logic',
  'Avoid unnecessary mutation',
  'Use pure functions for domain transformations where practical',
  'Keep async error handling explicit',
  'Avoid accidental closure retention',
  'Avoid creating functions repeatedly inside hot paths unless necessary',
  'Do not overuse memoization',
  'Use debounce/throttle intentionally',
  'Document non-obvious contracts',
  'Keep functions easy to test',
];

const COMMON_MISTAKES = [
  'Interview trap: Choosing an arrow function for an object method that needs dynamic `this`',
  'Interview trap: Assuming `greet(null)` falls back to a default parameter (only `undefined` does)',
  'Interview trap: Reading a function expression before its initialization (TDZ), unlike a hoisted declaration',
  'Interview trap: Missing a base case in recursion, causing a stack overflow',
  'Interview trap: Using `call`/`apply`/`bind` to override an arrow function\'s lexical `this`',
  'Interview trap: Letting a naive memoize cache grow unbounded or key on unstable `JSON.stringify()` output',
  'Interview trap: Assuming debouncing cancels an already-sent network request',
];

const TRADE_OFFS =
  'Advantages: first-class, higher-order functions enable callbacks, composition, currying, and dependency injection without extra language machinery, and techniques like memoization, debounce, and throttle give direct control over expensive or noisy execution. Disadvantages: closures and memoized caches can retain memory longer than expected, curried/composed pipelines can hurt readability if overused, and debounce/throttle/memoize all require deliberate tuning (delay, cache eviction, key stability) or they cause subtle production bugs.';

const FOLLOW_UP_QUESTIONS = [
  'When would you choose a regular function over an arrow function?',
  'How does hoisting differ between function declarations and function expressions?',
  'What is the practical difference between debounce and throttle, and when would you pick each?',
  'How would you make a memoize implementation safe for object arguments?',
  'What is the difference between currying and partial application?',
  'Why does an `async` function always return a Promise, even for a plain return value?',
  'How would you isolate side effects from pure domain logic in a real codebase?',
  'What happens to `this` when a regular function is passed as a callback without binding?',
  'How do generators enable lazy sequences or custom iterators?',
  'What risks come with deep function chaining or heavy composition pipelines?',
];

const RELATED_TOPICS = [
  'First-class functions',
  'Higher-order functions',
  'Callbacks',
  'IIFE',
  'Arrow functions',
  'Rest and spread',
  'Default parameters',
  'Generators',
  'Async functions',
  'Pure functions and side effects',
  'Composition, currying, partial application',
  'Memoization',
  'Debounce and throttle',
  'call, apply, bind',
  'Recursion',
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
    id: 'jsadv-m9-176',
    number: 'JSADV-M9-176',
    title: 'What Are First-Class Functions?',
    difficulty: 'Easy',
    expectedAnswer:
      "Functions are first-class values in JavaScript, so a function reference can be stored, passed, returned, or placed in a collection just like other values.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nFunctions are first-class values in JavaScript, so a function reference can be stored, passed, returned, or placed in a collection just like other values.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction applyTwice<T>(fn: (value: T) => T, value: T): T {\n  return fn(fn(value));\n}\n\nconst result = applyTwice(\n  (value) => value + \"!\",\n  \"Hi\",\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst addBang = (value: string) => value + \"!\";\n\nconst result = addBang(addBang(\"Hi\"));\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-177',
    number: 'JSADV-M9-177',
    title: 'What Is a Higher-Order Function?',
    difficulty: 'Medium',
    expectedAnswer: "Higher-order functions treat functions as data and enable reusable control-flow/data-transformation patterns.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nHigher-order functions treat functions as data and enable reusable control-flow/data-transformation patterns.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction multiplier(factor: number): (value: number) => number {\n  return function apply(value: number): number {\n    return value * factor;\n  };\n}\n\nconst double = multiplier(2);\nconst result = double(10);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst double = (value: number) => value * 2;\nconst result = double(10);\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-178',
    number: 'JSADV-M9-178',
    title: 'What Is a Callback Function?',
    difficulty: 'Easy',
    expectedAnswer: "A callback is a function supplied to another function to be invoked later or under the caller's control.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nA callback is a function supplied to another function to be invoked later or under the caller's control.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction runLater(\n  value: number,\n  callback: (value: number) => number,\n): number {\n  return callback(value);\n}\n\nconst result = runLater(5, (value) => value * 2);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = [5].map(\n  (value) => value * 2,\n)[0];\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-179',
    number: 'JSADV-M9-179',
    title: 'What Is the Difference Between Anonymous and Named Functions?',
    difficulty: 'Easy',
    expectedAnswer:
      "An anonymous function has no function name at its declaration site; naming functions is often preferable when stack traces, recursion, or debugging matter.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nAn anonymous function has no function name at its declaration site; naming functions is often preferable when stack traces, recursion, or debugging matter.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-180',
    number: 'JSADV-M9-180',
    title: 'What Is an IIFE?',
    difficulty: 'Medium',
    expectedAnswer:
      "An IIFE is an immediately invoked function expression used to create an isolated scope and run initialization immediately.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nAn IIFE is an immediately invoked function expression used to create an isolated scope and run initialization immediately.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nconst value = (function (): number {\n  const internal = 10;\n  return internal * 2;\n})();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst value = (() => {\n  const internal = 10;\n  return internal * 2;\n})();\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-181',
    number: 'JSADV-M9-181',
    title: 'What Are Arrow Functions?',
    difficulty: 'Easy',
    expectedAnswer: "Arrow functions provide concise syntax and lexical `this`; they do not have their own `arguments`, `prototype`, or constructor behavior.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nArrow functions provide concise syntax and lexical `this`; they do not have their own `arguments`, `prototype`, or constructor behavior.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nconst add = function (a: number, b: number): number {\n  return a + b;\n};\n\nconst result = add(2, 3);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst add = (a: number, b: number): number =>\n  a + b;\n\nconst result = add(2, 3);\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-182',
    number: 'JSADV-M9-182',
    title: 'What Is the Difference Between Arrow Functions and Regular Functions?',
    difficulty: 'Hard',
    expectedAnswer:
      "Arrow functions provide concise syntax and lexical `this`; they do not have their own `arguments`, `prototype`, or constructor behavior.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nArrow functions provide concise syntax and lexical `this`; they do not have their own `arguments`, `prototype`, or constructor behavior.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nconst add = function (a: number, b: number): number {\n  return a + b;\n};\n\nconst result = add(2, 3);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst add = (a: number, b: number): number =>\n  a + b;\n\nconst result = add(2, 3);\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-183',
    number: 'JSADV-M9-183',
    title: 'What Are Rest Parameters?',
    difficulty: 'Easy',
    expectedAnswer: "Rest parameters collect remaining arguments into an array; spread expands an iterable into individual arguments/elements.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nRest parameters collect remaining arguments into an array; spread expands an iterable into individual arguments/elements.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction collect(first: string, rest: readonly string[]): string {\n  let result = first;\n\n  for (let i = 0; i < rest.length; i += 1) {\n    result += \"-\" + rest[i];\n  }\n\n  return result;\n}\n\nconst value = collect(\"a\", [\"b\", \"c\"]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nfunction collect(\n  first: string,\n  ...rest: string[],\n): string {\n  return [first, ...rest].join(\"-\");\n}\n\nconst value = collect(\"a\", \"b\", \"c\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-184',
    number: 'JSADV-M9-184',
    title: 'What Are Spread Parameters?',
    difficulty: 'Easy',
    expectedAnswer: "Rest parameters collect remaining arguments into an array; spread expands an iterable into individual arguments/elements.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nRest parameters collect remaining arguments into an array; spread expands an iterable into individual arguments/elements.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction collect(first: string, rest: readonly string[]): string {\n  let result = first;\n\n  for (let i = 0; i < rest.length; i += 1) {\n    result += \"-\" + rest[i];\n  }\n\n  return result;\n}\n\nconst value = collect(\"a\", [\"b\", \"c\"]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nfunction collect(\n  first: string,\n  ...rest: string[],\n): string {\n  return [first, ...rest].join(\"-\");\n}\n\nconst value = collect(\"a\", \"b\", \"c\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-185',
    number: 'JSADV-M9-185',
    title: 'What Are Default Parameters?',
    difficulty: 'Easy',
    expectedAnswer: "Rest parameters collect remaining arguments into an array; spread expands an iterable into individual arguments/elements.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nRest parameters collect remaining arguments into an array; spread expands an iterable into individual arguments/elements.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction collect(first: string, rest: readonly string[]): string {\n  let result = first;\n\n  for (let i = 0; i < rest.length; i += 1) {\n    result += \"-\" + rest[i];\n  }\n\n  return result;\n}\n\nconst value = collect(\"a\", [\"b\", \"c\"]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nfunction collect(\n  first: string,\n  ...rest: string[],\n): string {\n  return [first, ...rest].join(\"-\");\n}\n\nconst value = collect(\"a\", \"b\", \"c\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-186',
    number: 'JSADV-M9-186',
    title: 'Function Declaration vs Function Expression',
    difficulty: 'Medium',
    expectedAnswer:
      "**Function Declaration vs Function Expression** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n**Function Declaration vs Function Expression** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-187',
    number: 'JSADV-M9-187',
    title: 'What Are Generator Functions?',
    difficulty: 'Hard',
    expectedAnswer: "A generator can pause with `yield` and later resume, making it useful for lazy sequences and custom iteration.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nA generator can pause with `yield` and later resume, making it useful for lazy sequences and custom iteration.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction* ids(): Generator<number, void, void> {\n  let id = 1;\n  while (id <= 3) {\n    yield id;\n    id += 1;\n  }\n}\n\nconst generator = ids();\nconst first = generator.next().value;\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nfunction* ids() {\n  yield* [1, 2, 3];\n}\n\nconst first = ids().next().value;\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-188',
    number: 'JSADV-M9-188',
    title: 'What Are Async Functions?',
    difficulty: 'Medium',
    expectedAnswer: "An async function always returns a Promise; `await` suspends only that function's continuation until the awaited value settles.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nAn async function always returns a Promise; `await` suspends only that function's continuation until the awaited value settles.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nasync function loadName(): Promise<string> {\n  const value = \"Rasik\";\n  return value;\n}\n\nconst promise = loadName();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst loadName = async (): Promise<string> =>\n  \"Rasik\";\n\nconst promise = loadName();\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-189',
    number: 'JSADV-M9-189',
    title: 'What Is a Pure Function?',
    difficulty: 'Medium',
    expectedAnswer: "Pure functions return the same output for the same input and avoid observable side effects.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nPure functions return the same output for the same input and avoid observable side effects.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n\nconst result = add(2, 3);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = [2, 3].reduce(\n  (sum, value) => sum + value,\n  0,\n);\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-190',
    number: 'JSADV-M9-190',
    title: 'What Are Side Effects?',
    difficulty: 'Medium',
    expectedAnswer: "**What Are Side Effects?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n**What Are Side Effects?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-191',
    number: 'JSADV-M9-191',
    title: 'What Is Function Composition?',
    difficulty: 'Medium',
    expectedAnswer: "Function composition builds larger transformations from small functions while preserving explicit data flow.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nFunction composition builds larger transformations from small functions while preserving explicit data flow.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction double(value: number): number {\n  return value * 2;\n}\n\nfunction toText(value: number): string {\n  return String(value);\n}\n\nconst result = toText(double(5));\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\n  [5].map((value) => value * 2)[0],\n);\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-192',
    number: 'JSADV-M9-192',
    title: 'What Is Currying?',
    difficulty: 'Hard',
    expectedAnswer: "Currying transforms a function into nested unary functions and can help create reusable specialized functions.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nCurrying transforms a function into nested unary functions and can help create reusable specialized functions.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction add(a: number): (b: number) => number {\n  return function addSecond(b: number): number {\n    return a + b;\n  };\n}\n\nconst result = add(2)(3);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst add =\n  (a: number) =>\n  (b: number): number =>\n    a + b;\n\nconst result = add(2)(3);\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-193',
    number: 'JSADV-M9-193',
    title: 'What Is Partial Application?',
    difficulty: 'Hard',
    expectedAnswer: "Partial application fixes selected arguments and returns a function for the remaining arguments.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nPartial application fixes selected arguments and returns a function for the remaining arguments.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction multiply(a: number, b: number): number {\n  return a * b;\n}\n\nfunction partialMultiply(\n  a: number,\n): (b: number) => number {\n  return function apply(b: number): number {\n    return multiply(a, b);\n  };\n}\n\nconst double = partialMultiply(2);\nconst result = double(5);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst multiply = (a: number, b: number) =>\n  a * b;\n\nconst double = (b: number) =>\n  multiply(2, b);\n\nconst result = double(5);\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-194',
    number: 'JSADV-M9-194',
    title: 'What Is Memoization?',
    difficulty: 'Hard',
    expectedAnswer: "Memoization caches previous results based on stable inputs; production implementations need bounded/appropriate cache keys.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nMemoization caches previous results based on stable inputs; production implementations need bounded/appropriate cache keys.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction memoizeSquare(): (value: number) => number {\n  const cache: Record<string, number> = Object.create(null);\n\n  return function square(value: number): number {\n    const key = String(value);\n\n    if (cache[key] !== undefined) {\n      return cache[key];\n    }\n\n    const result = value * value;\n    cache[key] = result;\n    return result;\n  };\n}\n\nconst square = memoizeSquare();\nconst result = square(5);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst cache = new Map<number, number>();\n\nconst square = (value: number): number => {\n  if (!cache.has(value)) {\n    cache.set(value, value * value);\n  }\n\n  return cache.get(value)!;\n};\n\nconst result = square(5);\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-195',
    number: 'JSADV-M9-195',
    title: 'What Is Debouncing?',
    difficulty: 'Hard',
    expectedAnswer: "Debouncing delays execution until calls stop for the chosen interval, making it useful for search input and other bursty events.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nDebouncing delays execution until calls stop for the chosen interval, making it useful for search input and other bursty events.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction debounce(\n  callback: () => void,\n  delay: number,\n): () => void {\n  let timer: ReturnType<typeof setTimeout> | undefined;\n\n  return function trigger(): void {\n    if (timer !== undefined) {\n      clearTimeout(timer);\n    }\n\n    timer = setTimeout(callback, delay);\n  };\n}\n\nconst run = debounce(() => {}, 200);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst debounce = (\n  callback: () => void,\n  delay: number,\n) => {\n  let timer: ReturnType<typeof setTimeout> | undefined;\n\n  return () => {\n    if (timer) clearTimeout(timer);\n    timer = setTimeout(callback, delay);\n  };\n};\n\nconst run = debounce(() => {}, 200);\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-196',
    number: 'JSADV-M9-196',
    title: 'What Is Throttling?',
    difficulty: 'Hard',
    expectedAnswer: "**What Is Throttling?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n**What Is Throttling?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-197',
    number: 'JSADV-M9-197',
    title: 'What Is the Difference Between `call`, `apply`, and `bind`?',
    difficulty: 'Hard',
    expectedAnswer: "`call`, `apply`, and `bind` control `this` for normal functions; arrow functions keep lexical `this` and cannot be rebound.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`call`, `apply`, and `bind` control `this` for normal functions; arrow functions keep lexical `this` and cannot be rebound.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface User {\n  name: string;\n}\n\nfunction greet(this: User, suffix: string): string {\n  return this.name + suffix;\n}\n\nconst result = greet.call({ name: \"Rasik\" }, \"!\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst user = {\n  name: \"Rasik\",\n  greet(suffix: string) {\n    return this.name + suffix;\n  },\n};\n\nconst result = user.greet(\"!\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-198',
    number: 'JSADV-M9-198',
    title: 'What Is Recursion?',
    difficulty: 'Medium',
    expectedAnswer: "Recursion solves a problem by reducing it to smaller instances of itself and must have a terminating base case.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nRecursion solves a problem by reducing it to smaller instances of itself and must have a terminating base case.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction factorial(n: number): number {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n\nconst result = factorial(5);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nfunction factorial(n: number): number {\n  if (n <= 1) return 1;\n\n  return Array.from(\n    { length: n },\n    (_, index) => index + 1,\n  ).reduce(\n    (result, value) => result * value,\n    1,\n  );\n}\n\nconst result = factorial(5);\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-199',
    number: 'JSADV-M9-199',
    title: 'What Is Function Chaining?',
    difficulty: 'Hard',
    expectedAnswer: "Function chaining or composition connects transformations so each step feeds the next, but excessive chaining can reduce readability.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nFunction chaining or composition connects transformations so each step feeds the next, but excessive chaining can reduce readability.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction trim(value: string): string {\n  return value.trim();\n}\n\nfunction lower(value: string): string {\n  return value.toLowerCase();\n}\n\nconst result = lower(trim(\"  HELLO  \"));\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HELLO  \"\n  .trim()\n  .toLowerCase();\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m9-200',
    number: 'JSADV-M9-200',
    title: 'What Are Function Best Practices?',
    difficulty: 'Hard',
    experienceLevel: '5–8 Years+',
    expectedAnswer: "**What Are Function Best Practices?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n**What Are Function Best Practices?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
];

export const MOCK_JAVASCRIPT_ADVANCED_MODULE9_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map(
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