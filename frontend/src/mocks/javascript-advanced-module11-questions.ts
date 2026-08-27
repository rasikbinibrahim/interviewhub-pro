// Derived from frontend/src/document/Part_4_Module_11_Promises_Master_Handbook.md.
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

const CATEGORY = 'Promises';

const CONCEPTS = [
  'Promise states',
  'then/catch/finally',
  'Promise.resolve/reject',
  'Promise.all',
  'Promise.allSettled',
  'Promise.any',
  'Promise.race',
  'Promise chaining',
  'Error propagation',
  'Microtasks',
  'Cancellation',
  'Concurrency control',
  'Production Promise patterns',
];

const BEST_PRACTICES = [
  'Handle errors with try/catch or `.catch()` at an appropriate layer',
  'Use `AbortController` for cancellable requests where supported',
  'Limit concurrency instead of firing unbounded parallel requests',
  'Retry only appropriate, transient failures',
  'Use exponential backoff with jitter for suitable retries',
  'Set timeouts so user-critical requests cannot hang indefinitely',
  'Track duration, success/failure, retry count, cancellation, and endpoint for observability',
  'Clean up resources and remove subscriptions/listeners',
  'Parallelize independent work with `Promise.all()`/`Promise.allSettled()`',
  'Keep dependent work sequential when one result depends on another',
];

const COMMON_MISTAKES = [
  'Interview trap: Forgetting to `return` a Promise from `.map()`/`.then()`, losing the ability to await it',
  'Interview trap: Accidentally serializing independent requests with `await` inside a `for` loop',
  'Interview trap: Firing unbounded concurrent requests via `Promise.all()` over a huge array',
  'Interview trap: Assuming `Promise.race()` cancels the losing operation',
  'Interview trap: Swallowing errors with `.catch(() => null)` or `.catch(() => {})`',
  'Interview trap: Describing Promise states as `pending → fulfilled → rejected` instead of settling into exactly one of fulfilled or rejected',
  'Interview trap: Assuming `.then()` on an already-fulfilled Promise runs synchronously',
];

const TRADE_OFFS =
  'Advantages: Promises give asynchronous work a standardized, composable representation — chaining, `Promise.all()`/`allSettled()`/`any()`/`race()` cover parallel, best-effort, and racing workflows without manual callback bookkeeping, and errors propagate predictably through `.catch()`. Disadvantages: native Promises have no built-in cancellation (requiring `AbortController` for real cancellation), unbounded `Promise.all()` concurrency can overload servers or memory, and easy-to-write patterns like sequential `await` in a loop or swallowed `.catch()` handlers silently create performance or correctness problems in production.';

const FOLLOW_UP_QUESTIONS = [
  'Why do Promise callbacks always run asynchronously, even for an already-settled Promise?',
  'What is the difference between `Promise.all()`, `Promise.allSettled()`, `Promise.any()`, and `Promise.race()`?',
  'How does error propagation work through a `.then()` chain?',
  'How would you cancel an in-flight `fetch()` request?',
  'How would you limit concurrency across many independent async operations?',
  'When is sequential `await` in a loop actually correct?',
  'How would you add a timeout to a Promise-based request?',
  'What observability data would you track for production Promise-based requests?',
  'When would you choose `Promise.allSettled()` over `Promise.all()`?',
  'How do you design a retry strategy that only retries transient failures?',
];

const RELATED_TOPICS = [
  'Promise states',
  'then, catch, finally',
  'Promise.resolve and Promise.reject',
  'Promise.all',
  'Promise.allSettled',
  'Promise.any',
  'Promise.race',
  'Promise chaining and error propagation',
  'Microtasks',
  'AbortController',
  'Concurrency limiting',
  'Retry and backoff',
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
    id: 'jsadv-m11-226',
    number: 'JSADV-M11-226',
    title: 'What Is a Promise?',
    difficulty: 'Easy',
    expectedAnswer: "**What Is a Promise?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n**What Is a Promise?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m11-227',
    number: 'JSADV-M11-227',
    title: 'What Are Promise States?',
    difficulty: 'Easy',
    expectedAnswer: "A Promise starts pending and settles exactly once into fulfilled or rejected.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nA Promise starts pending and settles exactly once into fulfilled or rejected.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m11-228',
    number: 'JSADV-M11-228',
    title: 'What Happens When `then()` Is Called?',
    difficulty: 'Medium',
    expectedAnswer: "`.then()` registers fulfillment/rejection handlers and returns a new Promise, enabling chaining.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`.then()` registers fulfillment/rejection handlers and returns a new Promise, enabling chaining.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m11-229',
    number: 'JSADV-M11-229',
    title: 'What Is `catch()`?',
    difficulty: 'Easy',
    expectedAnswer: "`.catch()` handles rejection in the current chain and itself returns a new Promise.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`.catch()` handles rejection in the current chain and itself returns a new Promise.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m11-230',
    number: 'JSADV-M11-230',
    title: 'What Is `finally()`?',
    difficulty: 'Medium',
    expectedAnswer: "`finally` runs whether the try path succeeds or throws and is useful for cleanup.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`finally` runs whether the try path succeeds or throws and is useful for cleanup.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m11-231',
    number: 'JSADV-M11-231',
    title: 'What Is `Promise.resolve()`?',
    difficulty: 'Easy',
    expectedAnswer: "`Promise.resolve()` creates/adopts an already fulfilled Promise for ordinary values and assimilates thenables/Promises.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`Promise.resolve()` creates/adopts an already fulfilled Promise for ordinary values and assimilates thenables/Promises.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m11-232',
    number: 'JSADV-M11-232',
    title: 'What Is `Promise.reject()`?',
    difficulty: 'Easy',
    expectedAnswer: "`Promise.reject()` creates an already rejected Promise and lets the rejection propagate through the Promise chain.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`Promise.reject()` creates an already rejected Promise and lets the rejection propagate through the Promise chain.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m11-233',
    number: 'JSADV-M11-233',
    title: 'What Is `Promise.all()`?',
    difficulty: 'Medium',
    expectedAnswer: "`Promise.all()` fulfills when every input fulfills and rejects as soon as one input rejects; it is ideal for independent work where all results are required.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`Promise.all()` fulfills when every input fulfills and rejects as soon as one input rejects; it is ideal for independent work where all results are required.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m11-234',
    number: 'JSADV-M11-234',
    title: 'What Is `Promise.allSettled()`?',
    difficulty: 'Medium',
    expectedAnswer: "`Promise.allSettled()` waits for every input and reports each outcome, making it suitable for best-effort batch work.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`Promise.allSettled()` waits for every input and reports each outcome, making it suitable for best-effort batch work.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m11-235',
    number: 'JSADV-M11-235',
    title: 'What Is `Promise.any()`?',
    difficulty: 'Medium',
    expectedAnswer: "`Promise.any()` fulfills when the first input fulfills and rejects only when all inputs reject.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`Promise.any()` fulfills when the first input fulfills and rejects only when all inputs reject.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m11-236',
    number: 'JSADV-M11-236',
    title: 'What Is `Promise.race()`?',
    difficulty: 'Medium',
    expectedAnswer: "`Promise.race()` settles when the first input settles; it does not cancel losing operations.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`Promise.race()` settles when the first input settles; it does not cancel losing operations.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m11-237',
    number: 'JSADV-M11-237',
    title: 'How Does Promise Chaining Work?',
    difficulty: 'Medium',
    expectedAnswer: "Function chaining or composition connects transformations so each step feeds the next, but excessive chaining can reduce readability.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nFunction chaining or composition connects transformations so each step feeds the next, but excessive chaining can reduce readability.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction trim(value: string): string {\n  return value.trim();\n}\n\nfunction lower(value: string): string {\n  return value.toLowerCase();\n}\n\nconst result = lower(trim(\"  HELLO  \"));\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HELLO  \"\n  .trim()\n  .toLowerCase();\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m11-238',
    number: 'JSADV-M11-238',
    title: 'How Does Promise Error Propagation Work?',
    difficulty: 'Medium',
    expectedAnswer: "The Error object carries a name/message/stack and can be extended for domain-specific failures.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nThe Error object carries a name/message/stack and can be extended for domain-specific failures.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m11-239',
    number: 'JSADV-M11-239',
    title: 'What Happens Internally When a Promise Settles?',
    difficulty: 'Hard',
    expectedAnswer: "**What Happens Internally When a Promise Settles?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n**What Happens Internally When a Promise Settles?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m11-240',
    number: 'JSADV-M11-240',
    title: 'Why Are Promise Callbacks Asynchronous?',
    difficulty: 'Medium',
    expectedAnswer: "**Why Are Promise Callbacks Asynchronous?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n**Why Are Promise Callbacks Asynchronous?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m11-241',
    number: 'JSADV-M11-241',
    title: 'What Is Promise Performance?',
    difficulty: 'Hard',
    expectedAnswer: "**What Is Promise Performance?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n**What Is Promise Performance?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m11-242',
    number: 'JSADV-M11-242',
    title: 'What Are Common Promise Mistakes?',
    difficulty: 'Medium',
    expectedAnswer: "**What Are Common Promise Mistakes?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n**What Are Common Promise Mistakes?** should be explained through its runtime rule, one small example, edge cases, and the production trade-off that matters for maintainable TypeScript/JavaScript.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m11-243',
    number: 'JSADV-M11-243',
    title: 'What Is Promise Cancellation?',
    difficulty: 'Hard',
    expectedAnswer: "Promises themselves do not cancel underlying work; cancellable APIs such as `fetch` use `AbortController`.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nPromises themselves do not cancel underlying work; cancellable APIs such as `fetch` use `AbortController`.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m11-244',
    number: 'JSADV-M11-244',
    title: 'How Should Promises Be Used in Production?',
    difficulty: 'Hard',
    expectedAnswer: "Production Promise code should define timeout, cancellation, retry, concurrency, observability, and cleanup behavior explicitly.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nProduction Promise code should define timeout, cancellation, retry, concurrency, observability, and cleanup behavior explicitly.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m11-245',
    number: 'JSADV-M11-245',
    title: 'Final Promise Interview Question',
    difficulty: 'Hard',
    experienceLevel: '5–8 Years+',
    expectedAnswer: "Production Promise code should define timeout, cancellation, retry, concurrency, observability, and cleanup behavior explicitly.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nProduction Promise code should define timeout, cancellation, retry, concurrency, observability, and cleanup behavior explicitly.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
];

export const MOCK_JAVASCRIPT_ADVANCED_MODULE11_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map(
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