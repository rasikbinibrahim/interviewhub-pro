// Derived from frontend/src/document/Part_4_Module_12_Async_Await_Master_Handbook.md.
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

const CATEGORY = 'Async/Await';

const CONCEPTS = [
  'async functions',
  'await',
  'Sequential vs parallel execution',
  'try/catch/finally',
  'Async iterators and generators',
  'Top-level await',
  'Fetch API',
  'Cancellation',
  'Timeouts',
  'Retries and backoff',
  'Concurrency control',
];

const BEST_PRACTICES = [
  'Use `Promise.all()` for independent work instead of sequential `await`',
  'Wrap awaited calls in `try/catch` and handle failures deliberately',
  'Throw on non-OK `fetch()` responses instead of assuming rejection means an HTTP error',
  'Use `AbortController`/`AbortSignal` for cancellation and timeouts',
  'Retry only classified, transient failures with backoff and jitter',
  'Avoid `forEach` with async callbacks when completion needs to be awaited',
  'Always observe/await a Promise so rejections are not silently lost',
  'Limit concurrency for large workloads instead of firing everything at once',
  'Distinguish cancellation from failure in error handling',
  'Add caching, deduplication, and telemetry for production data loaders',
];

const COMMON_MISTAKES = [
  'Interview trap: Sequentializing independent `await` calls instead of using `Promise.all()`',
  'Interview trap: Forgetting `await`, leaving a Promise where a resolved value was expected',
  'Interview trap: Using `items.forEach(async (item) => { await process(item); })` when the caller needs completion',
  'Interview trap: Assuming `fetch()` rejects on HTTP 404/500 instead of only on network-level failures',
  'Interview trap: Ignoring a rejected Promise that no caller observes',
  'Interview trap: Retrying every error instead of only transient, retryable failures',
  'Interview trap: Believing `await` blocks the JavaScript thread',
];

const TRADE_OFFS =
  'Advantages: async/await reads as procedural code while still being fully Promise-based, making sequential dependencies and `try/catch` error handling straightforward to express. Disadvantages: it offers no built-in cancellation (requiring `AbortController`), naive sequential `await` chains can serialize otherwise-independent work, and retry/timeout/concurrency logic still has to be built deliberately — async/await syntax alone does not make orchestration correct or fast.';

const FOLLOW_UP_QUESTIONS = [
  'Why does `await` not block the JavaScript thread?',
  'How would you run three independent async calls in parallel instead of sequentially?',
  'What happens to the returned Promise when an async function throws?',
  'How do you cancel an in-flight `fetch()` request?',
  'How would you implement a timeout for an async operation?',
  'What makes an error appropriate to retry versus not?',
  'How do async iterators and `for await...of` differ from synchronous iteration?',
  'What are the constraints on using top-level `await` in a module?',
  'How would you design a production async data loader with caching and concurrency limits?',
  'Why is `async function` conceptually similar to wrapping a return value in `Promise.resolve()`?',
];

const RELATED_TOPICS = [
  'async functions',
  'await',
  'Promise.all and Promise.allSettled',
  'try/catch/finally',
  'Async iterators and generators',
  'Top-level await',
  'Fetch API',
  'AbortController',
  'Timeouts and retries',
  'Concurrency control',
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
    id: 'jsadv-m12-246',
    number: 'JSADV-M12-246',
    title: 'What Is an Async Function?',
    difficulty: 'Easy',
    expectedAnswer: "An async function returns a Promise and converts a returned value into fulfillment or a thrown error into rejection.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nAn async function returns a Promise and converts a returned value into fulfillment or a thrown error into rejection.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m12-247',
    number: 'JSADV-M12-247',
    title: 'What Does `await` Do?',
    difficulty: 'Easy',
    expectedAnswer: "`await` unwraps a settled value for the current async function continuation without blocking the JavaScript thread.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`await` unwraps a settled value for the current async function continuation without blocking the JavaScript thread.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m12-248',
    number: 'JSADV-M12-248',
    title: 'What Happens When an Async Function Returns a Value?',
    difficulty: 'Medium',
    expectedAnswer: "An async function returns a Promise and converts a returned value into fulfillment or a thrown error into rejection.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nAn async function returns a Promise and converts a returned value into fulfillment or a thrown error into rejection.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m12-249',
    number: 'JSADV-M12-249',
    title: 'What Happens When an Async Function Throws?',
    difficulty: 'Medium',
    expectedAnswer: "An async function returns a Promise and converts a returned value into fulfillment or a thrown error into rejection.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nAn async function returns a Promise and converts a returned value into fulfillment or a thrown error into rejection.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m12-250',
    number: 'JSADV-M12-250',
    title: 'What Is Sequential Async Execution?',
    difficulty: 'Easy',
    expectedAnswer: "Sequential `await` is correct when step B depends on step A; otherwise it can unnecessarily serialize independent work.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nSequential `await` is correct when step B depends on step A; otherwise it can unnecessarily serialize independent work.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m12-251',
    number: 'JSADV-M12-251',
    title: 'How Do You Run Independent Operations in Parallel?',
    difficulty: 'Medium',
    expectedAnswer: "Independent async operations should often start together and then be awaited with `Promise.all` or `Promise.allSettled`.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nIndependent async operations should often start together and then be awaited with `Promise.all` or `Promise.allSettled`.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m12-252',
    number: 'JSADV-M12-252',
    title: 'How Do You Handle Errors With `try/catch`?',
    difficulty: 'Easy',
    expectedAnswer: "`try/catch` catches synchronous exceptions and rejections observed through awaited Promises.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`try/catch` catches synchronous exceptions and rejections observed through awaited Promises.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m12-253',
    number: 'JSADV-M12-253',
    title: 'What Is `try/catch/finally` With Async/Await?',
    difficulty: 'Medium',
    expectedAnswer: "`await` unwraps a settled value for the current async function continuation without blocking the JavaScript thread.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`await` unwraps a settled value for the current async function continuation without blocking the JavaScript thread.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m12-254',
    number: 'JSADV-M12-254',
    title: 'Async/Await vs Promises',
    difficulty: 'Medium',
    expectedAnswer: "`await` unwraps a settled value for the current async function continuation without blocking the JavaScript thread.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`await` unwraps a settled value for the current async function continuation without blocking the JavaScript thread.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m12-255',
    number: 'JSADV-M12-255',
    title: 'What Are Async Iterators?',
    difficulty: 'Hard',
    expectedAnswer: "Iterators expose a `next()` protocol; generators provide a convenient way to implement iterable sequences lazily.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nIterators expose a `next()` protocol; generators provide a convenient way to implement iterable sequences lazily.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m12-256',
    number: 'JSADV-M12-256',
    title: 'What Are Async Generators?',
    difficulty: 'Hard',
    expectedAnswer: "An async function always returns a Promise; `await` suspends only that function's continuation until the awaited value settles.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nAn async function always returns a Promise; `await` suspends only that function's continuation until the awaited value settles.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nasync function loadName(): Promise<string> {\n  const value = \"Rasik\";\n  return value;\n}\n\nconst promise = loadName();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst loadName = async (): Promise<string> =>\n  \"Rasik\";\n\nconst promise = loadName();\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m12-257',
    number: 'JSADV-M12-257',
    title: 'What Is Top-Level Await?',
    difficulty: 'Hard',
    expectedAnswer: "`await` unwraps a settled value for the current async function continuation without blocking the JavaScript thread.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`await` unwraps a settled value for the current async function continuation without blocking the JavaScript thread.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m12-258',
    number: 'JSADV-M12-258',
    title: 'How Do You Use Fetch With Async/Await?',
    difficulty: 'Easy',
    expectedAnswer: "`await` unwraps a settled value for the current async function continuation without blocking the JavaScript thread.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`await` unwraps a settled value for the current async function continuation without blocking the JavaScript thread.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m12-259',
    number: 'JSADV-M12-259',
    title: 'How Do You Cancel Async/Await Operations?',
    difficulty: 'Hard',
    expectedAnswer: "`await` unwraps a settled value for the current async function continuation without blocking the JavaScript thread.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`await` unwraps a settled value for the current async function continuation without blocking the JavaScript thread.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m12-260',
    number: 'JSADV-M12-260',
    title: 'How Do You Implement Async Timeouts?',
    difficulty: 'Hard',
    expectedAnswer: "Timeouts bound how long user-critical async work may wait; cancellation should stop underlying work where the API supports it.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nTimeouts bound how long user-critical async work may wait; cancellation should stop underlying work where the API supports it.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m12-261',
    number: 'JSADV-M12-261',
    title: 'How Do You Implement Retries?',
    difficulty: 'Hard',
    expectedAnswer: "An async function always returns a Promise; `await` suspends only that function's continuation until the awaited value settles.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nAn async function always returns a Promise; `await` suspends only that function's continuation until the awaited value settles.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nasync function loadName(): Promise<string> {\n  const value = \"Rasik\";\n  return value;\n}\n\nconst promise = loadName();\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst loadName = async (): Promise<string> =>\n  \"Rasik\";\n\nconst promise = loadName();\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m12-262',
    number: 'JSADV-M12-262',
    title: 'What Is the Performance Impact of Async/Await?',
    difficulty: 'Medium',
    expectedAnswer: "`await` unwraps a settled value for the current async function continuation without blocking the JavaScript thread.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`await` unwraps a settled value for the current async function continuation without blocking the JavaScript thread.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m12-263',
    number: 'JSADV-M12-263',
    title: 'What Are Common Async/Await Mistakes?',
    difficulty: 'Medium',
    expectedAnswer: "`await` unwraps a settled value for the current async function continuation without blocking the JavaScript thread.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`await` unwraps a settled value for the current async function continuation without blocking the JavaScript thread.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m12-264',
    number: 'JSADV-M12-264',
    title: 'Design a Production Async Data Loader',
    difficulty: 'Hard',
    expectedAnswer: "A production async data loader should combine caching/deduplication, cancellation, retries, timeouts, concurrency control, and observability.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nA production async data loader should combine caching/deduplication, cancellation, retries, timeouts, concurrency control, and observability.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m12-265',
    number: 'JSADV-M12-265',
    title: 'Final Senior Async/Await Design Question',
    difficulty: 'Hard',
    experienceLevel: '5–8 Years+',
    expectedAnswer: "`await` unwraps a settled value for the current async function continuation without blocking the JavaScript thread.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`await` unwraps a settled value for the current async function continuation without blocking the JavaScript thread.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
];

export const MOCK_JAVASCRIPT_ADVANCED_MODULE12_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map(
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