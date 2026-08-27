// Derived from frontend/src/document/Part_4_Module_10_Event_Loop_Master_Handbook.md.
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

const CATEGORY = 'Event Loop';

const CONCEPTS = [
  'JavaScript runtime',
  'Call stack',
  'Heap',
  'Web APIs',
  'Task queue',
  'Microtask queue',
  'Event loop',
  'queueMicrotask',
  'requestAnimationFrame',
  'requestIdleCallback',
  'setTimeout/setInterval',
  'Main-thread blocking',
  'Node.js event loop',
];

const BEST_PRACTICES = [
  'Keep main-thread tasks short',
  'Avoid synchronous CPU-heavy work in UI paths',
  'Batch DOM updates',
  'Use `requestAnimationFrame()` for visual updates',
  'Debounce expensive input processing',
  'Throttle continuous events where appropriate',
  'Use Web Workers for suitable CPU-heavy work',
  'Avoid unbounded microtask chains',
  'Cancel stale asynchronous work',
  'Use performance instrumentation',
  'Avoid unnecessary timers',
  'Prefer event-driven design',
  'Break large data processing into chunks',
  'Measure before optimizing',
  'Understand browser and Node scheduling differences',
];

const COMMON_MISTAKES = [
  'Interview trap: Assuming `setTimeout(fn, 0)` runs immediately instead of after the current task and pending microtasks',
  'Interview trap: Assuming a fulfilled Promise\'s `.then()` runs synchronously instead of as a microtask',
  "Interview trap: Saying \"browser event loop = Node.js event loop\" when their host environments and phases differ",
  'Interview trap: Creating an unbounded microtask chain (e.g. a `queueMicrotask` that re-queues itself) and starving tasks/rendering',
  'Interview trap: Using `setInterval()` for visual animation instead of `requestAnimationFrame()`',
  'Interview trap: Using `requestIdleCallback()` for work that must complete by a strict deadline',
  'Interview trap: Treating every browser event as flowing through one simple FIFO task queue',
];

const TRADE_OFFS =
  "Advantages: the event loop lets JavaScript stay single-threaded yet still handle timers, network I/O, and rendering without blocking on each one, and separating tasks from microtasks gives fine-grained control over ordering (e.g. Promise continuations always run before the next task). Disadvantages: long synchronous tasks still block the entire main thread (freezing input and rendering), unbounded microtask chains can starve tasks and rendering, and scheduling primitives like `setTimeout`, `requestAnimationFrame`, and `requestIdleCallback` have different guarantees that are easy to conflate under deadline pressure.";

const FOLLOW_UP_QUESTIONS = [
  'Why does a Promise `.then()` callback run after synchronous code even when the Promise is already resolved?',
  'What is the practical difference between a task and a microtask?',
  'Why does `setTimeout(fn, 0)` not run immediately?',
  'How would you diagnose a UI freeze caused by a long JavaScript task?',
  'How does the Node.js event loop differ from the browser event loop?',
  'What can cause event loop starvation, and how would you prevent it?',
  'When would you choose `requestAnimationFrame()` over `setTimeout()`?',
  'When is `requestIdleCallback()` appropriate, and when is it risky?',
  'How does `await` affect the order of execution around synchronous code?',
  'What strategies break up a long-running synchronous computation?',
];

const RELATED_TOPICS = [
  'JavaScript runtime',
  'Call stack',
  'Heap',
  'Web APIs',
  'Task queue',
  'Microtask queue',
  'Event loop',
  'queueMicrotask',
  'MutationObserver',
  'requestAnimationFrame',
  'requestIdleCallback',
  'setTimeout and setInterval',
  'Main-thread blocking',
  'Node.js event loop phases',
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
    id: 'jsadv-m10-201',
    number: 'JSADV-M10-201',
    title: 'What Is the JavaScript Runtime?',
    difficulty: 'Easy',
    expectedAnswer: "A JavaScript runtime combines an engine with host capabilities such as timers, networking, DOM, or Node.js APIs and scheduling.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nA JavaScript runtime combines an engine with host capabilities such as timers, networking, DOM, or Node.js APIs and scheduling.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-202',
    number: 'JSADV-M10-202',
    title: 'What Is the Call Stack?',
    difficulty: 'Easy',
    expectedAnswer: "The JavaScript stack model describes active execution frames; recursion/deep synchronous calls can overflow it.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nThe JavaScript stack model describes active execution frames; recursion/deep synchronous calls can overflow it.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-203',
    number: 'JSADV-M10-203',
    title: 'What Is the Heap?',
    difficulty: 'Medium',
    expectedAnswer: "Objects are allocated in engine-managed memory. Heap growth should be measured through retained references and allocation behavior rather than assumed layout.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nObjects are allocated in engine-managed memory. Heap growth should be measured through retained references and allocation behavior rather than assumed layout.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-204',
    number: 'JSADV-M10-204',
    title: 'What Are Web APIs?',
    difficulty: 'Easy',
    expectedAnswer: "Browser Web APIs such as timers, Fetch, DOM events, and storage are host capabilities rather than ECMAScript language features.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nBrowser Web APIs such as timers, Fetch, DOM events, and storage are host capabilities rather than ECMAScript language features.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-205',
    number: 'JSADV-M10-205',
    title: 'What Is the Callback Queue / Task Queue?',
    difficulty: 'Medium',
    expectedAnswer: "Tasks are host-scheduled units such as timers or user events. After the current task, pending microtasks are processed before the browser can continue to the next task.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nTasks are host-scheduled units such as timers or user events. After the current task, pending microtasks are processed before the browser can continue to the next task.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-206',
    number: 'JSADV-M10-206',
    title: 'What Is the Microtask Queue?',
    difficulty: 'Medium',
    expectedAnswer: "Tasks are host-scheduled units such as timers or user events. After the current task, pending microtasks are processed before the browser can continue to the next task.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nTasks are host-scheduled units such as timers or user events. After the current task, pending microtasks are processed before the browser can continue to the next task.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-207',
    number: 'JSADV-M10-207',
    title: 'What Is a Macrotask?',
    difficulty: 'Medium',
    expectedAnswer: "The event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nThe event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-208',
    number: 'JSADV-M10-208',
    title: 'What Is the Event Loop?',
    difficulty: 'Medium',
    expectedAnswer: "The event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nThe event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-209',
    number: 'JSADV-M10-209',
    title: 'How Do Promises Use the Event Loop?',
    difficulty: 'Medium',
    expectedAnswer: "The event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nThe event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-210',
    number: 'JSADV-M10-210',
    title: 'What Is `queueMicrotask()`?',
    difficulty: 'Medium',
    expectedAnswer: "Microtasks such as Promise reactions run after the current synchronous work and before the next task; excessive microtasks can starve rendering/tasks.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nMicrotasks such as Promise reactions run after the current synchronous work and before the next task; excessive microtasks can starve rendering/tasks.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-211',
    number: 'JSADV-M10-211',
    title: 'What Is MutationObserver?',
    difficulty: 'Medium',
    expectedAnswer: "The event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nThe event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-212',
    number: 'JSADV-M10-212',
    title: 'What Is `requestAnimationFrame()`?',
    difficulty: 'Medium',
    expectedAnswer: "`requestAnimationFrame` schedules work before a browser rendering opportunity and is preferred for visual updates.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`requestAnimationFrame` schedules work before a browser rendering opportunity and is preferred for visual updates.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-213',
    number: 'JSADV-M10-213',
    title: 'What Is `requestIdleCallback()`?',
    difficulty: 'Hard',
    expectedAnswer: "`requestIdleCallback` is for best-effort background work and has weaker timing guarantees than frame- or user-critical scheduling.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`requestIdleCallback` is for best-effort background work and has weaker timing guarantees than frame- or user-critical scheduling.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-214',
    number: 'JSADV-M10-214',
    title: 'How Does Rendering Relate to the Event Loop?',
    difficulty: 'Hard',
    expectedAnswer: "The event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nThe event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-215',
    number: 'JSADV-M10-215',
    title: 'How Does `setTimeout()` Work?',
    difficulty: 'Easy',
    expectedAnswer: "`setTimeout` and `setInterval` schedule future tasks; a zero delay does not mean immediate execution.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`setTimeout` and `setInterval` schedule future tasks; a zero delay does not mean immediate execution.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-216',
    number: 'JSADV-M10-216',
    title: 'How Does `setInterval()` Work?',
    difficulty: 'Easy',
    expectedAnswer: "`setTimeout` and `setInterval` schedule future tasks; a zero delay does not mean immediate execution.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\n`setTimeout` and `setInterval` schedule future tasks; a zero delay does not mean immediate execution.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-217',
    number: 'JSADV-M10-217',
    title: 'What Happens When JavaScript Blocks the Main Thread?',
    difficulty: 'Medium',
    expectedAnswer: "The event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nThe event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-218',
    number: 'JSADV-M10-218',
    title: 'What Is Async Execution?',
    difficulty: 'Medium',
    expectedAnswer: "The event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nThe event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-219',
    number: 'JSADV-M10-219',
    title: 'What Is Event Loop Starvation?',
    difficulty: 'Hard',
    expectedAnswer: "The event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nThe event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-220',
    number: 'JSADV-M10-220',
    title: 'How Does the Browser Event Loop Differ From Node.js?',
    difficulty: 'Hard',
    expectedAnswer: "The event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nThe event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-221',
    number: 'JSADV-M10-221',
    title: 'What Is the Node.js Event Loop?',
    difficulty: 'Hard',
    expectedAnswer: "The event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nThe event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-222',
    number: 'JSADV-M10-222',
    title: 'What Are Common Event Loop Interview Traps?',
    difficulty: 'Hard',
    expectedAnswer: "The event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nThe event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-223',
    number: 'JSADV-M10-223',
    title: 'How Does the Event Loop Affect Performance?',
    difficulty: 'Hard',
    expectedAnswer: "The event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nThe event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-224',
    number: 'JSADV-M10-224',
    title: 'What Are Event Loop Best Practices?',
    difficulty: 'Hard',
    expectedAnswer: "The event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nThe event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
  {
    id: 'jsadv-m10-225',
    number: 'JSADV-M10-225',
    title: 'Final Event Loop Interview Question',
    difficulty: 'Hard',
    experienceLevel: '5–8 Years+',
    expectedAnswer: "The event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.",
    deepExplanation:
      "Step 1 — Understand the concept.\n\nThe event loop coordinates execution of synchronous JavaScript with queued tasks, microtasks, and rendering opportunities.\n\nStep 2 — Easy method:\nState the rule in one sentence, trace one small example from input to output, then cover the important edge case.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity(\"value\");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = String(\"value\");\n```\n\nStep 5 — Production example:\nUse the native language/platform primitive when it communicates intent clearly, but understand the manual implementation so you can reason about behavior, complexity, and failures.\n\nStep 6 — Edge cases:\nTest empty/nullish inputs, invalid values, repeated calls, boundary sizes, asynchronous failure, cleanup, and browser/Node differences when applicable.\n\nStep 7 — Senior interview takeaway:\nExplain the semantic rule first, then implementation, complexity, failure mode, production use case, and trade-off.",
  },
];

export const MOCK_JAVASCRIPT_ADVANCED_MODULE10_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map(
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