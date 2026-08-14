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
    expectedAnswer: 'A Promise is a JavaScript object representing the eventual completion or failure of an asynchronous operation.',
    deepExplanation:
      "`new Promise((resolve) => setTimeout(() => resolve('Success'), 1000))` starts pending and later resolves; `.then((value) => console.log(value))` logs `Success` once it fulfills. A Promise itself does not make an operation asynchronous — it provides a standardized representation for a result that may become available later.",
  },
  {
    id: 'jsadv-m11-227',
    number: 'JSADV-M11-227',
    title: 'What Are Promise States?',
    difficulty: 'Easy',
    expectedAnswer: 'A Promise is pending, then settles into either fulfilled (via `resolve(value)`) or rejected (via `reject(reason)`) — never both.',
    deepExplanation:
      "Calling both `resolve('A')` and `reject('B')` inside the same executor still logs `A`, since the first settlement wins and a settled Promise cannot transition to another state. Interview trap: do not describe states as `pending → fulfilled → rejected`; a Promise settles into fulfilled *or* rejected, not through both in sequence.",
  },
  {
    id: 'jsadv-m11-228',
    number: 'JSADV-M11-228',
    title: 'What Happens When `then()` Is Called?',
    difficulty: 'Medium',
    expectedAnswer: '`then()` registers fulfillment and/or rejection reactions and returns a new Promise rather than mutating the original.',
    deepExplanation:
      "`Promise.resolve(10).then((value) => value * 2)` produces a new Promise `next`; calling `next.then(console.log)` logs `20`. Conceptually: original Promise → `then()` → new Promise → transformed value. `then()` never mutates the Promise it was called on.",
  },
  {
    id: 'jsadv-m11-229',
    number: 'JSADV-M11-229',
    title: 'What Is `catch()`?',
    difficulty: 'Easy',
    expectedAnswer: '`catch()` handles rejection and is effectively shorthand for `promise.then(undefined, onRejected)`.',
    deepExplanation:
      "`Promise.reject(new Error('Network failed')).catch((error) => console.error(error.message))` logs `Network failed`. A `catch()` handler can also recover: `Promise.reject(new Error('Failed')).catch(() => 'Fallback').then(console.log)` logs `Fallback`, since the chain becomes fulfilled once the catch handler returns normally.",
  },
  {
    id: 'jsadv-m11-230',
    number: 'JSADV-M11-230',
    title: 'What Is `finally()`?',
    difficulty: 'Medium',
    expectedAnswer: '`finally()` runs regardless of whether the Promise fulfilled or rejected, and is intended for cleanup work.',
    deepExplanation:
      "Chaining `.finally(() => console.log('Request finished'))` after a `fetch().then().catch()` sequence runs the cleanup callback whether the request succeeded or failed. It's useful for hiding loading indicators, releasing resources, stopping spinners, and resetting temporary state. `finally()` normally preserves the previous fulfillment/rejection outcome unless its own callback throws or returns a rejected Promise.",
  },
  {
    id: 'jsadv-m11-231',
    number: 'JSADV-M11-231',
    title: 'What Is `Promise.resolve()`?',
    difficulty: 'Easy',
    expectedAnswer: '`Promise.resolve(value)` creates or adopts a fulfilled Promise-like result, useful for normalizing values and thenables into Promise-based APIs.',
    deepExplanation:
      "`Promise.resolve(42).then(console.log)` logs `42`, and wrapping an arbitrary `value` in a `normalize(value)` helper lets callers always `.then()` on the result. If the input is already a native Promise, `Promise.resolve()` can return it directly rather than wrapping it unnecessarily.",
  },
  {
    id: 'jsadv-m11-232',
    number: 'JSADV-M11-232',
    title: 'What Is `Promise.reject()`?',
    difficulty: 'Easy',
    expectedAnswer: '`Promise.reject(reason)` returns an already-rejected Promise.',
    deepExplanation:
      "`Promise.reject(new Error('Invalid request')).catch((error) => console.log(error.message))` logs `Invalid request`. In production, a validation function like `validateUser(user)` can return `Promise.reject(new Error('User ID is required'))` for invalid input and `Promise.resolve(user)` otherwise, keeping the function's return type consistently Promise-based.",
  },
  {
    id: 'jsadv-m11-233',
    number: 'JSADV-M11-233',
    title: 'What Is `Promise.all()`?',
    difficulty: 'Medium',
    expectedAnswer: '`Promise.all()` waits for every input to fulfill, preserving order, and rejects as soon as any input rejects.',
    deepExplanation:
      "`Promise.all([usersPromise, postsPromise]).then(([users, posts]) => ...)` resolves once both inputs fulfill, in the same order they were passed. It fulfills only when all fulfill, rejects when any one rejects, and does not automatically cancel the other underlying operations. It's well suited to parallel independent requests, e.g. `await Promise.all([fetchUser(), fetchOrders(), fetchNotifications()])`, which can be much faster than sequential requests when the calls are independent.",
  },
  {
    id: 'jsadv-m11-234',
    number: 'JSADV-M11-234',
    title: 'What Is `Promise.allSettled()`?',
    difficulty: 'Medium',
    expectedAnswer: '`Promise.allSettled()` waits for every input Promise to settle — fulfilled or rejected — and never short-circuits on a rejection.',
    deepExplanation:
      "`await Promise.allSettled([Promise.resolve('A'), Promise.reject(new Error('B')), Promise.resolve('C')])` resolves to an array of `{ status, value }` / `{ status, reason }` objects for each input, in order. It's useful whenever every operation should be observed independently — bulk notifications, batch processing, analytics, multiple optional widgets, and multi-file operations.",
  },
  {
    id: 'jsadv-m11-235',
    number: 'JSADV-M11-235',
    title: 'What Is `Promise.any()`?',
    difficulty: 'Medium',
    expectedAnswer: '`Promise.any()` fulfills as soon as the first input Promise fulfills, ignoring rejections unless every input rejects.',
    deepExplanation:
      "`await Promise.any([Promise.reject('Server A failed'), Promise.resolve('Server B'), Promise.resolve('Server C')])` resolves to `Server B`, the first fulfillment, even though one input rejected. If every input rejects, `Promise.any()` itself rejects with an `AggregateError`. Useful for fallback services, multiple mirrors, or picking the fastest successful provider — but note \"first\" means first fulfillment, not first settlement.",
  },
  {
    id: 'jsadv-m11-236',
    number: 'JSADV-M11-236',
    title: 'What Is `Promise.race()`?',
    difficulty: 'Medium',
    expectedAnswer: '`Promise.race()` settles as soon as the first input Promise settles, whether fulfilled or rejected.',
    deepExplanation:
      "Racing a 1000ms `'Slow'` timer against a 100ms `'Fast'` timer resolves to `Fast`. Unlike `Promise.any()` (first fulfillment), `Promise.race()` reacts to the first settlement of either kind — which makes it useful for a timeout pattern like `Promise.race([fetch('/api/data'), timeout(5000)])`. Production warning: `Promise.race()` does not cancel the losing operation; combine a timeout strategy with `AbortController` for real network cancellation.",
  },
  {
    id: 'jsadv-m11-237',
    number: 'JSADV-M11-237',
    title: 'How Does Promise Chaining Work?',
    difficulty: 'Medium',
    expectedAnswer: 'Promises can form a sequence of dependent asynchronous operations, where returning a Promise from a `.then()` callback makes the next step wait for it.',
    deepExplanation:
      "`fetch('/api/user').then(r => r.json()).then(user => fetch('/api/orders/${user.id}')).then(r => r.json()).then(orders => ...).catch(...)` chains request → parse → dependent request → parse → use, with a single `.catch()` handling failures from any step. The key rule is that returning a Promise from a `.then()` callback causes the chain to wait for that Promise before continuing.",
  },
  {
    id: 'jsadv-m11-238',
    number: 'JSADV-M11-238',
    title: 'How Does Promise Error Propagation Work?',
    difficulty: 'Medium',
    expectedAnswer: 'A thrown error or rejection inside a `.then()` propagates through the chain, skipping fulfillment handlers, until a rejection handler (`.catch()` or the second `.then()` argument) handles it.',
    deepExplanation:
      "Throwing inside the first `.then()` in `Promise.resolve().then(() => { throw new Error('Failure'); }).then(() => console.log('This does not run')).catch((error) => console.log(error.message))` skips the second `.then()` entirely and logs `Failure` in the `.catch()`. Production best practice: don't silently swallow errors with `.catch(() => {})`; when the current layer can't safely recover, log and re-throw so the failure remains observable.",
  },
  {
    id: 'jsadv-m11-239',
    number: 'JSADV-M11-239',
    title: 'What Happens Internally When a Promise Settles?',
    difficulty: 'Hard',
    expectedAnswer: 'When a Promise settles, its registered fulfillment/rejection reactions become eligible, reaction jobs are scheduled, and they run through microtask processing.',
    deepExplanation:
      'Conceptually, a Promise tracks its state (pending/fulfilled/rejected) and a list of reactions (fulfillment and rejection handlers). Once it settles, the corresponding reactions become eligible, their jobs are scheduled, and they execute as microtasks. The ECMAScript specification defines these Promise semantics and jobs; the host environment (browser or Node.js) integrates those jobs with its own scheduling/event-loop model.',
  },
  {
    id: 'jsadv-m11-240',
    number: 'JSADV-M11-240',
    title: 'Why Are Promise Callbacks Asynchronous?',
    difficulty: 'Medium',
    expectedAnswer: 'Even an already-fulfilled Promise never invokes `.then()` synchronously — the reaction is always deferred to a microtask.',
    deepExplanation:
      "`const promise = Promise.resolve(); console.log('A'); promise.then(() => console.log('B')); console.log('C');` logs `A`, `C`, `B`, because the `.then()` reaction is registered, the current task finishes (logging `C`), and only then does the microtask run and log `B`. This predictable, always-asynchronous behavior prevents surprising synchronous execution from Promise handlers.",
  },
  {
    id: 'jsadv-m11-241',
    number: 'JSADV-M11-241',
    title: 'What Is Promise Performance?',
    difficulty: 'Hard',
    expectedAnswer: 'Promises are lightweight, but excessive asynchronous orchestration — unnecessary objects, chaining, unbounded concurrency, or accidental serialization — can still add real overhead.',
    deepExplanation:
      "Sequentially awaiting `fetchA()`, `fetchB()`, `fetchC()` unnecessarily serializes independent requests, while `Promise.all([fetchA(), fetchB(), fetchC()])` parallelizes them and can reduce total latency when they are truly independent. But don't blindly parallelize: if `B` depends on `A`, the `A → B` sequence must remain sequential. Other performance issues include thousands of unnecessary Promise objects, excessive chaining, redundant requests, unbounded concurrency, large closures retained by pending operations, and excessive retries.",
  },
  {
    id: 'jsadv-m11-242',
    number: 'JSADV-M11-242',
    title: 'What Are Common Promise Mistakes?',
    difficulty: 'Medium',
    expectedAnswer: 'Common mistakes include forgetting to `return`/collect Promises, accidentally serializing independent work, unbounded concurrency, assuming `race()` cancels the loser, and swallowing errors.',
    deepExplanation:
      "Calling `fetchUser(user.id)` inside `users.map()` without collecting the results loses the Promises — collect them (`const requests = users.map(...)`) and `await Promise.all(requests)` if you need them. `for (const id of ids) { await fetchUser(id); }` accidentally serializes independent requests (sometimes correct when ordering or rate limits require it). `Promise.all(hugeArray.map(fetchSomething))` can overload browser networking, API servers, memory, CPU, or rate limits without a concurrency limiter. `Promise.race()` does not cancel the losing operation. And `.catch(() => null)` can hide production failures.",
  },
  {
    id: 'jsadv-m11-243',
    number: 'JSADV-M11-243',
    title: 'What Is Promise Cancellation?',
    difficulty: 'Hard',
    expectedAnswer: 'Native Promises have no general built-in cancellation method; cancellable browser operations like `fetch` instead use `AbortController`.',
    deepExplanation:
      "`const controller = new AbortController(); fetch('/api/users', { signal: controller.signal }); controller.abort();` cancels the in-flight request; the caller then catches an error with `error.name === 'AbortError'` to detect cancellation versus a real failure. In React production use, a component that unmounts before a request finishes should abort the request to avoid unnecessary network work and avoid handling a stale result.",
  },
  {
    id: 'jsadv-m11-244',
    number: 'JSADV-M11-244',
    title: 'How Should Promises Be Used in Production?',
    difficulty: 'Hard',
    expectedAnswer: 'Production Promise usage combines explicit error handling, cancellation, concurrency limits, a deliberate retry/backoff policy, timeouts, observability, and cleanup.',
    deepExplanation:
      "Concretely: wrap awaited calls in `try/catch` and report failures; use `AbortController` where supported for cancellation; avoid creating thousands of simultaneous operations without considering resource limits; retry only appropriate failures, using exponential backoff with jitter for suitable transient errors; give user-critical requests a timeout so they cannot hang indefinitely; track duration, success/failure, retry count, cancellation, endpoint, and correlation/request IDs; and release resources and remove subscriptions/listeners when work completes.",
  },
  {
    id: 'jsadv-m11-245',
    number: 'JSADV-M11-245',
    title: 'Final Promise Interview Question',
    difficulty: 'Hard',
    experienceLevel: '5–8 Years+',
    expectedAnswer: "For 50 API requests with transient failures, rate limits, navigable-away users, and optional items, a naive `Promise.all(ids.map(id => fetch(...)))` should be replaced with a concurrency-limited, cancellable, per-item-resilient pipeline.",
    deepExplanation:
      "A strong senior design: deduplicate input IDs → apply a concurrency limiter → attach an `AbortSignal` (aborted if the user navigates away) → issue each request → retry only transient failures with backoff and jitter → collect individual results (via `Promise.allSettled()` since items are independent and optional) → update the UI progressively → observe failures. This lets successful items render even when some requests fail, respects the API's rate limits, and avoids wasted work once the user navigates away.",
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
