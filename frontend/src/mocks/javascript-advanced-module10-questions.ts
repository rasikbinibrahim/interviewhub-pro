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
    expectedAnswer: 'The JavaScript runtime is the environment that provides JavaScript execution capabilities beyond the language itself.',
    deepExplanation:
      'A browser runtime combines a JavaScript engine, Web APIs, task scheduling, and a rendering system: the engine runs the call stack and heap, Web APIs handle timers/DOM/fetch/events, and the event loop coordinates queues/tasks between them. This explains why JavaScript can run asynchronous operations even though JavaScript code itself executes on a single main thread in the browser.',
  },
  {
    id: 'jsadv-m10-202',
    number: 'JSADV-M10-202',
    title: 'What Is the Call Stack?',
    difficulty: 'Easy',
    expectedAnswer: 'The call stack tracks currently executing JavaScript execution contexts in a last-in-first-out order.',
    deepExplanation:
      'Calling `first()`, which calls `second()`, which calls `console.log()`, pushes each call onto the stack and pops them off as they return, leaving the stack empty afterward. Deep synchronous recursion without a base case (e.g. `function recurse() { recurse(); } recurse();`) overflows the stack, typically producing `RangeError: Maximum call stack size exceeded`.',
  },
  {
    id: 'jsadv-m10-203',
    number: 'JSADV-M10-203',
    title: 'What Is the Heap?',
    difficulty: 'Medium',
    expectedAnswer: 'The heap is the memory area the JavaScript engine uses for dynamically allocated objects and other runtime-managed data.',
    deepExplanation:
      "For `const user = { name: 'Rasik', skills: [...] };`, the stack holds a reference to `user`, while the object itself (and the array it points to) conceptually lives in the heap. This is a conceptual model — engines are free to optimize physical representation, so it's inaccurate to claim every primitive is always physically on the stack or every object always physically on the heap; the specification defines observable semantics, not implementation details.",
  },
  {
    id: 'jsadv-m10-204',
    number: 'JSADV-M10-204',
    title: 'What Are Web APIs?',
    difficulty: 'Easy',
    expectedAnswer: 'Web APIs are browser-provided capabilities available to JavaScript, such as `fetch`, timers, DOM APIs, `localStorage`, and observers.',
    deepExplanation:
      "In `console.log('Start'); setTimeout(() => console.log('Timer callback'), 0); console.log('End');`, the output is `Start`, `End`, `Timer callback` — the timer callback is not placed directly on the call stack; the browser schedules it as a later task once the delay and current work allow.",
  },
  {
    id: 'jsadv-m10-205',
    number: 'JSADV-M10-205',
    title: 'What Is the Callback Queue / Task Queue?',
    difficulty: 'Medium',
    expectedAnswer: 'Tasks are units of work — such as timer callbacks, user interaction tasks, and message events — that the runtime schedules for later JavaScript execution.',
    deepExplanation:
      'The conceptual flow is: a Web API completes → its task becomes runnable → it enters a task queue/task source → the event loop picks it up → it runs on the call stack. The exact scheduling is defined by the HTML/event-loop model and multiple distinct task sources, not by one simplistic FIFO queue shared by every browser event.',
  },
  {
    id: 'jsadv-m10-206',
    number: 'JSADV-M10-206',
    title: 'What Is the Microtask Queue?',
    difficulty: 'Medium',
    expectedAnswer: 'Microtasks are higher-priority continuation work — such as Promise reactions, `queueMicrotask()`, and `MutationObserver` callbacks — generally processed after the current task finishes and before the next task starts.',
    deepExplanation:
      "`console.log('A'); Promise.resolve().then(() => console.log('B')); console.log('C');` logs `A`, `C`, `B`, because the `.then()` reaction is queued as a microtask that only runs once the current task's synchronous code finishes and the call stack empties, before the event loop proceeds to the next task.",
  },
  {
    id: 'jsadv-m10-207',
    number: 'JSADV-M10-207',
    title: 'What Is a Macrotask?',
    difficulty: 'Medium',
    expectedAnswer: '"Macrotask" is an informal term commonly used for a normal task (e.g. `setTimeout`, `setInterval`, user interaction, message events) in browser event-loop discussions.',
    deepExplanation:
      "Pairing `setTimeout(() => console.log('Task'), 0)` with `Promise.resolve().then(() => console.log('Microtask'))` typically logs `Microtask` before `Task`, since microtasks drain before the next task runs. In precise, specification-oriented explanations, prefer the term \"task\" over the informal \"macrotask.\"",
  },
  {
    id: 'jsadv-m10-208',
    number: 'JSADV-M10-208',
    title: 'What Is the Event Loop?',
    difficulty: 'Medium',
    expectedAnswer: 'The event loop coordinates execution between JavaScript execution, tasks, microtasks, rendering opportunities, and browser APIs.',
    deepExplanation:
      'A useful interview-level model: run the call stack until empty → drain microtasks → allow a rendering/update opportunity → run the next task → repeat. The real browser rendering and scheduling model is more nuanced, but this loop captures the ordering interviewers expect.',
  },
  {
    id: 'jsadv-m10-209',
    number: 'JSADV-M10-209',
    title: 'How Do Promises Use the Event Loop?',
    difficulty: 'Medium',
    expectedAnswer: 'Promise handlers (`.then`/`.catch`/`.finally` callbacks) are always scheduled as microtasks, never invoked synchronously.',
    deepExplanation:
      "`console.log('1'); Promise.resolve().then(() => console.log('2')); console.log('3');` logs `1`, `3`, `2` — `2` registers as a Promise reaction, `3` runs as part of the current synchronous task, and only once that task finishes does the microtask run and log `2`. `.then()` never executes synchronously just because the Promise is already fulfilled.",
  },
  {
    id: 'jsadv-m10-210',
    number: 'JSADV-M10-210',
    title: 'What Is `queueMicrotask()`?',
    difficulty: 'Medium',
    expectedAnswer: '`queueMicrotask()` schedules a callback to run as a microtask directly, without needing a Promise.',
    deepExplanation:
      "`console.log('A'); queueMicrotask(() => console.log('B')); console.log('C');` logs `A`, `C`, `B` — useful when work needs to run after the current synchronous execution but before the next task. Caution: scheduling too many microtasks (especially ones that re-queue themselves) can delay tasks and rendering.",
  },
  {
    id: 'jsadv-m10-211',
    number: 'JSADV-M10-211',
    title: 'What Is MutationObserver?',
    difficulty: 'Medium',
    expectedAnswer: '`MutationObserver` observes DOM mutations and schedules its callback as a microtask once the relevant mutations are processed.',
    deepExplanation:
      "`new MutationObserver((mutations) => console.log('Mutations:', mutations.length))` observing `document.body` and then appending a new element triggers the callback asynchronously, after the mutation is applied. Production uses include observing dynamic DOM changes, legacy UI integration, custom DOM tooling, and browser extensions — but prefer application-level state/events over observing your own DOM changes when possible.",
  },
  {
    id: 'jsadv-m10-212',
    number: 'JSADV-M10-212',
    title: 'What Is `requestAnimationFrame()`?',
    difficulty: 'Medium',
    expectedAnswer: '`requestAnimationFrame()` schedules a callback to run at the next browser rendering opportunity, ideal for visual updates.',
    deepExplanation:
      "A recursive `function animate() { console.log('Animation frame'); requestAnimationFrame(animate); }` calls itself once per rendering opportunity, making it suitable for animations, canvas drawing, scroll-linked visual work, and coordinated DOM visual updates. Don't use `setInterval()` as a universal replacement — it isn't synchronized with the browser's actual rendering opportunities.",
  },
  {
    id: 'jsadv-m10-213',
    number: 'JSADV-M10-213',
    title: 'What Is `requestIdleCallback()`?',
    difficulty: 'Hard',
    expectedAnswer: '`requestIdleCallback()` schedules work to run during periods when the browser has spare idle time.',
    deepExplanation:
      "`requestIdleCallback(() => console.log('Non-critical work'))` is useful for non-critical preparation, analytics batching, background computation, and other low-priority work. Caution: it should not be used for work with a strict deadline — use an explicit scheduling strategy for anything time-critical instead.",
  },
  {
    id: 'jsadv-m10-214',
    number: 'JSADV-M10-214',
    title: 'How Does Rendering Relate to the Event Loop?',
    difficulty: 'Hard',
    expectedAnswer: 'The browser must balance JavaScript execution against rendering opportunities, and long JavaScript tasks can delay rendering.',
    deepExplanation:
      "A simplified model: task → JavaScript → microtasks → rendering opportunity → next task. A synchronous busy-loop like `while (performance.now() - start < 3000) {}` blocks the main thread for its whole duration, during which the browser cannot freely process user input or render updates. The production lesson is to break long work into smaller chunks.",
  },
  {
    id: 'jsadv-m10-215',
    number: 'JSADV-M10-215',
    title: 'How Does `setTimeout()` Work?',
    difficulty: 'Easy',
    expectedAnswer: '`setTimeout()` schedules a callback to become eligible for execution after a minimum delay, not an exact delay.',
    deepExplanation:
      "`console.log('Start'); setTimeout(() => console.log('Timer'), 0); console.log('End');` logs `Start`, `End`, `Timer`. Critical interview point: `0` does not mean \"execute immediately\" — it means the callback becomes eligible once the delay and scheduling conditions are satisfied; if the main thread is busy, the timer task waits until the current task, then microtasks, then the event loop reach it.",
  },
  {
    id: 'jsadv-m10-216',
    number: 'JSADV-M10-216',
    title: 'How Does `setInterval()` Work?',
    difficulty: 'Easy',
    expectedAnswer: '`setInterval()` schedules a callback to run repeatedly, roughly every given interval, until cleared.',
    deepExplanation:
      "Incrementing `count` inside `setInterval(() => { ...; if (count === 3) clearInterval(id); }, 1000)` logs `1`, `2`, `3` before the interval is cleared. Production caution: don't rely on intervals for work needing precise real-time scheduling, and for async polling prefer an explicit request → wait → request-again loop over letting interval callbacks potentially overlap.",
  },
  {
    id: 'jsadv-m10-217',
    number: 'JSADV-M10-217',
    title: 'What Happens When JavaScript Blocks the Main Thread?',
    difficulty: 'Medium',
    expectedAnswer: 'Long synchronous JavaScript blocks the thread running it, delaying clicks, rendering, timers, and overall responsiveness.',
    deepExplanation:
      "A tight synchronous loop like `for (let i = 0; i < 1_000_000_000; i++) {}` between two `console.log()` calls freezes the UI for its duration — causing delayed clicks, delayed rendering, delayed timers, poor INP, and a frozen UI. Solutions include optimizing the algorithm, chunking work, using Web Workers, avoiding unnecessary computation, virtualizing large lists, memoizing carefully, and moving non-UI computation off the main thread.",
  },
  {
    id: 'jsadv-m10-218',
    number: 'JSADV-M10-218',
    title: 'What Is Async Execution?',
    difficulty: 'Medium',
    expectedAnswer: 'JavaScript can initiate asynchronous work without blocking the current synchronous call stack, letting later work resume once results are ready.',
    deepExplanation:
      "`console.log('Start'); fetch('/api/users').then(...).then((users) => console.log(users)); console.log('End');` typically logs `Start`, `End`, then the API result, since the network operation is handled by browser infrastructure while the Promise reactions are scheduled for later JavaScript execution.",
  },
  {
    id: 'jsadv-m10-219',
    number: 'JSADV-M10-219',
    title: 'What Is Event Loop Starvation?',
    difficulty: 'Hard',
    expectedAnswer: 'Starvation occurs when continuously scheduled higher-priority work (typically microtasks) never lets the event loop reach other work.',
    deepExplanation:
      "A self-re-queuing `function loopMicrotasks() { queueMicrotask(loopMicrotasks); } loopMicrotasks();` continuously generates new microtasks; if the microtask queue never empties, the browser may be unable to progress to tasks or rendering. Production rule: never create unbounded microtask chains.",
  },
  {
    id: 'jsadv-m10-220',
    number: 'JSADV-M10-220',
    title: 'How Does the Browser Event Loop Differ From Node.js?',
    difficulty: 'Hard',
    expectedAnswer: 'Both use an event-driven asynchronous model, but the browser combines the JS engine, Web APIs, the HTML event loop, and rendering, while Node.js combines V8, Node APIs, libuv, and distinct event-loop phases.',
    deepExplanation:
      "Node's event loop has phases such as timers → pending callbacks → poll → check → close callbacks, and also provides `process.nextTick()`, Promise microtasks, and `setImmediate()`, none of which map one-to-one onto the browser's task/microtask/rendering model. Interview warning: never say \"browser event loop = Node.js event loop\" — they share concepts but differ in host-specific behavior.",
  },
  {
    id: 'jsadv-m10-221',
    number: 'JSADV-M10-221',
    title: 'What Is the Node.js Event Loop?',
    difficulty: 'Hard',
    expectedAnswer: 'Node.js uses V8 for JavaScript execution and libuv for asynchronous I/O and event-loop infrastructure, organized into distinct phases.',
    deepExplanation:
      'A simplified view: V8 runs the call stack while libuv coordinates the event loop against the OS/threads. The event loop phases include timers → pending callbacks → idle/prepare → poll → check → close callbacks. The exact scheduling of Promise microtasks and `process.nextTick()` relative to these phases needs separate, careful attention.',
  },
  {
    id: 'jsadv-m10-222',
    number: 'JSADV-M10-222',
    title: 'What Are Common Event Loop Interview Traps?',
    difficulty: 'Hard',
    expectedAnswer: 'Classic traps include ordering `setTimeout` against `Promise.resolve().then()`, ordering `queueMicrotask` against synchronous code, and reasoning about `await` inside an `async` function.',
    deepExplanation:
      "`setTimeout(() => console.log('A'), 0)` paired with `Promise.resolve().then(() => console.log('B'))` typically logs `B` then `A` in a browser. `console.log('A'); queueMicrotask(() => console.log('B')); console.log('C');` logs `A`, `C`, `B`. And an `async function test() { console.log('A'); await null; console.log('B'); } test(); console.log('C');` logs `A`, `C`, `B`, because `await` causes the continuation after it to resume asynchronously via microtask scheduling.",
  },
  {
    id: 'jsadv-m10-223',
    number: 'JSADV-M10-223',
    title: 'How Does the Event Loop Affect Performance?',
    difficulty: 'Hard',
    expectedAnswer: 'The main-thread event loop directly determines perceived responsiveness — long tasks and excessive microtasks delay rendering and input handling.',
    deepExplanation:
      'Performance problems include long tasks, excessive DOM work, large JavaScript bundles, expensive JSON parsing, synchronous loops, excessive microtasks, unnecessary rendering, and frequent event handlers. In the performance model (interaction → task → JavaScript → microtasks → rendering → next task), a long task visibly delays rendering and the response to input.',
  },
  {
    id: 'jsadv-m10-224',
    number: 'JSADV-M10-224',
    title: 'What Are Event Loop Best Practices?',
    difficulty: 'Hard',
    expectedAnswer: 'Keep main-thread tasks short, avoid synchronous CPU-heavy work in UI paths, batch DOM updates, and offload suitable work to Web Workers or idle time.',
    deepExplanation:
      'Concretely: use `requestAnimationFrame()` for visual updates, debounce expensive input processing, throttle continuous events where appropriate, avoid unbounded microtask chains, cancel stale asynchronous work, use performance instrumentation, avoid unnecessary timers, prefer event-driven design, break large data processing into chunks, measure before optimizing, and understand browser vs. Node scheduling differences.',
  },
  {
    id: 'jsadv-m10-225',
    number: 'JSADV-M10-225',
    title: 'Final Event Loop Interview Question',
    difficulty: 'Hard',
    experienceLevel: '5–8 Years+',
    expectedAnswer: 'When a React dashboard freezes after a fast API response, the bottleneck is almost always main-thread work after the network call — parsing, transformation, or rendering — not the network itself.',
    deepExplanation:
      'A senior answer separates the pipeline into network → parsing → data transformation → state update → React rendering → DOM/layout/paint, then profiles the main thread with browser performance tooling looking for long JavaScript tasks, expensive JSON processing, large array transformations, repeated renders, expensive selectors, and excessive DOM nodes — since the API being fast rules out the network as the cause of the multi-second freeze.',
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
