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
    expectedAnswer: 'An `async` function always returns a Promise, even when its body returns a plain value.',
    deepExplanation:
      "`async function getMessage() { return 'Hello'; } getMessage().then(console.log)` logs `Hello`, and `getMessage() instanceof Promise` is `true` — a normal returned value is wrapped/adopted into Promise-based behavior automatically.",
  },
  {
    id: 'jsadv-m12-247',
    number: 'JSADV-M12-247',
    title: 'What Does `await` Do?',
    difficulty: 'Easy',
    expectedAnswer: "`await` suspends the current async function's continuation until the awaited value settles, without blocking the JavaScript thread.",
    deepExplanation:
      "`const value = await Promise.resolve(100); console.log(value);` inside an `async function load()` logs `100`. The execution model: entering `await` suspends only that function's continuation, other work can run in the meantime, and once the Promise settles the continuation is scheduled and the function resumes.",
  },
  {
    id: 'jsadv-m12-248',
    number: 'JSADV-M12-248',
    title: 'What Happens When an Async Function Returns a Value?',
    difficulty: 'Medium',
    expectedAnswer: 'A returned value from an async function becomes the fulfillment value of the Promise the function returns.',
    deepExplanation:
      "`async function calculate() { return 10; } calculate().then(console.log)` logs `10`. The useful interview mental model is that `async function calculate() { return 10; }` behaves conceptually like `function calculate() { return Promise.resolve(10); }`, even though the specification mechanics are more precise.",
  },
  {
    id: 'jsadv-m12-249',
    number: 'JSADV-M12-249',
    title: 'What Happens When an Async Function Throws?',
    difficulty: 'Medium',
    expectedAnswer: "A thrown error inside an async function makes the function's returned Promise reject with that error.",
    deepExplanation:
      "`async function loadUser() { throw new Error('User not found'); } loadUser().catch((error) => console.log(error.message))` logs `User not found`. Interview trap: `async` does not automatically \"handle\" errors — it converts a thrown error into rejection of the returned Promise, which still must be caught.",
  },
  {
    id: 'jsadv-m12-250',
    number: 'JSADV-M12-250',
    title: 'What Is Sequential Async Execution?',
    difficulty: 'Easy',
    expectedAnswer: 'Sequential execution means the next async operation only starts once the previous one has completed.',
    deepExplanation:
      "`const user = await fetchUser(); const orders = await fetchOrders(user.id);` runs `fetchOrders` only after `fetchUser` resolves. Use sequential execution when B depends on A, ordering matters, rate limits require serialization, or the business workflow is inherently sequential.",
  },
  {
    id: 'jsadv-m12-251',
    number: 'JSADV-M12-251',
    title: 'How Do You Run Independent Operations in Parallel?',
    difficulty: 'Medium',
    expectedAnswer: 'Start independent async operations together and await them collectively, e.g. with `Promise.all()`, instead of awaiting each one in sequence.',
    deepExplanation:
      "Awaiting `fetchUsers()`, `fetchProducts()`, `fetchAlerts()` one after another is less efficient than `const [users, products, alerts] = await Promise.all([fetchUsers(), fetchProducts(), fetchAlerts()]);` — when the calls are independent, total latency can approach the slowest single operation instead of the sum of all durations. Production warning: don't launch thousands of operations simultaneously; use controlled concurrency for large workloads.",
  },
  {
    id: 'jsadv-m12-252',
    number: 'JSADV-M12-252',
    title: 'How Do You Handle Errors With `try/catch`?',
    difficulty: 'Easy',
    expectedAnswer: 'Wrap `await` calls in `try/catch` to handle both network-level rejections and application-level HTTP errors.',
    deepExplanation:
      "`fetch()` normally rejects only for network-level failures, not simply because the server returned HTTP 404 or 500 — so code like `if (!response.ok) { throw new Error(\\`HTTP ${response.status}\\`); }` inside the `try` block is commonly required to surface application-level HTTP errors into the same `catch`.",
  },
  {
    id: 'jsadv-m12-253',
    number: 'JSADV-M12-253',
    title: 'What Is `try/catch/finally` With Async/Await?',
    difficulty: 'Medium',
    expectedAnswer: '`finally` runs after either the `try` block succeeds or the `catch` block handles an error, making it the natural place for cleanup.',
    deepExplanation:
      "`try { return await fetchData(); } catch (error) { return null; } finally { console.log('Cleanup'); }` always logs `Cleanup`, whether `fetchData()` succeeds or fails. Typical `finally` work includes stopping loading indicators, clearing timers, releasing resources, and resetting temporary UI state.",
  },
  {
    id: 'jsadv-m12-254',
    number: 'JSADV-M12-254',
    title: 'Async/Await vs Promises',
    difficulty: 'Medium',
    expectedAnswer: 'Async/await and `.then()` chaining both run on the same Promise semantics; async/await simply gives that semantics a more procedural, `try/catch`-friendly syntax.',
    deepExplanation:
      "`fetchUser().then(user => fetchOrders(user.id)).then(orders => ...).catch(console.error)` and `async function load() { try { const user = await fetchUser(); const orders = await fetchOrders(user.id); } catch (error) { console.error(error); } }` produce equivalent behavior. Key interview point: async/await is not a separate asynchronous runtime — it is syntax built around Promise semantics, so parallel work still uses `await Promise.all()` and cancellation still relies on the same external mechanisms (e.g. `AbortController`).",
  },
  {
    id: 'jsadv-m12-255',
    number: 'JSADV-M12-255',
    title: 'What Are Async Iterators?',
    difficulty: 'Hard',
    expectedAnswer: 'Async iterators let values be produced and consumed asynchronously, using the `Symbol.asyncIterator` protocol and `for await...of` for consumption.',
    deepExplanation:
      "An object implementing `async *[Symbol.asyncIterator]() { yield 1; yield 2; yield 3; }` can be consumed with `for await (const value of asyncIterable) { console.log(value); }`, logging `1`, `2`, `3`. Production uses include paginated APIs, streams, asynchronous queues, incremental data processing, and event sources.",
  },
  {
    id: 'jsadv-m12-256',
    number: 'JSADV-M12-256',
    title: 'What Are Async Generators?',
    difficulty: 'Hard',
    expectedAnswer: 'An async generator (`async function*`) combines generator semantics with asynchronous execution, letting `yield` and `await` appear in the same function.',
    deepExplanation:
      "`async function* generateNumbers() { yield 1; await delay(100); yield 2; await delay(100); yield 3; }` consumed via `for await (const number of generateNumbers())` logs `1`, `2`, `3`, pausing between values for the `delay()`. The architecture is: a producer implemented as an async generator feeds a consumer via `for await...of`.",
  },
  {
    id: 'jsadv-m12-257',
    number: 'JSADV-M12-257',
    title: 'What Is Top-Level Await?',
    difficulty: 'Hard',
    expectedAnswer: 'Top-level `await` allows `await` to be used directly inside an ECMAScript module, outside of any async function.',
    deepExplanation:
      "`const response = await fetch('/config.json'); const config = await response.json();` can run at the top level of a module (e.g. loaded via `<script type=\"module\" src=\"/app.js\">`). Top-level await can affect module evaluation and startup dependencies, so production code should avoid making critical application startup depend unnecessarily on slow top-level asynchronous work.",
  },
  {
    id: 'jsadv-m12-258',
    number: 'JSADV-M12-258',
    title: 'How Do You Use Fetch With Async/Await?',
    difficulty: 'Easy',
    expectedAnswer: '`await fetch(url, options)` resolves once the response headers arrive, and the body is read separately with another `await` (e.g. `response.json()`).',
    deepExplanation:
      "`async function getUsers(signal) { const response = await fetch('/api/users', { signal }); if (!response.ok) throw new Error(\\`HTTP ${response.status}\\`); return response.json(); }` shows the standard shape: await the network response via browser networking, check `response.ok` for HTTP errors, then await the parsed body, all wrapped by the caller's `try/catch`.",
  },
  {
    id: 'jsadv-m12-259',
    number: 'JSADV-M12-259',
    title: 'How Do You Cancel Async/Await Operations?',
    difficulty: 'Hard',
    expectedAnswer: 'Async/await has no universal cancellation mechanism; cancellable APIs like `fetch()` require an explicit `AbortController`/`AbortSignal`.',
    deepExplanation:
      "Passing `controller.signal` into `fetch()` and later calling `controller.abort()` causes the pending request to reject; the caller checks `error.name === 'AbortError'` to distinguish cancellation from a real failure. Cancellation is cooperative — the underlying API must understand and respect the signal, `await` itself cannot forcibly stop work.",
  },
  {
    id: 'jsadv-m12-260',
    number: 'JSADV-M12-260',
    title: 'How Do You Implement Async Timeouts?',
    difficulty: 'Hard',
    expectedAnswer: 'Combine `setTimeout()` with `AbortController` (or `AbortSignal.timeout()`) so a slow request aborts after a deadline.',
    deepExplanation:
      "`fetchWithTimeout(url, timeoutMs)` starts a `setTimeout` that calls `controller.abort()` after `timeoutMs`, passes `controller.signal` into `fetch()`, and clears the timer in a `finally` block regardless of outcome. Modern environments can also express this more directly with `fetch(url, { signal: AbortSignal.timeout(5000) })`.",
  },
  {
    id: 'jsadv-m12-261',
    number: 'JSADV-M12-261',
    title: 'How Do You Implement Retries?',
    difficulty: 'Hard',
    expectedAnswer: 'Retries should be selective, retrying only classified transient failures with exponential backoff, not blindly retrying every error.',
    deepExplanation:
      "A `retry(task, { retries, baseDelay })` helper loops, catching failures, computing `baseDelay * 2 ** attempt` as the delay, and re-attempting until `retries` is exhausted, at which point it re-throws. Potentially retryable cases depend on the API contract and may include transient network errors, `408`, `429`, or selected `5xx` responses. A production version adds retry classification, exponential backoff, jitter, a maximum delay, cancellation, and observability.",
  },
  {
    id: 'jsadv-m12-262',
    number: 'JSADV-M12-262',
    title: 'What Is the Performance Impact of Async/Await?',
    difficulty: 'Medium',
    expectedAnswer: 'Async/await is not inherently slow — poor orchestration (unnecessary serialization, missing concurrency limits) is usually the real performance issue.',
    deepExplanation:
      "Sequentially awaiting `fetchA()`, `fetchB()`, `fetchC()` when they are independent is worse than `await Promise.all([fetchA(), fetchB(), fetchC()])`, but genuinely dependent work (`A → B → C`, where B needs A and C needs B) must remain sequential. Other factors to consider: network latency, concurrency limits, API rate limits, browser resource limits, memory usage, rendering work, and unnecessary Promise creation.",
  },
  {
    id: 'jsadv-m12-263',
    number: 'JSADV-M12-263',
    title: 'What Are Common Async/Await Mistakes?',
    difficulty: 'Medium',
    expectedAnswer: 'Common mistakes include sequentializing independent work, forgetting `await`, using `forEach` with async callbacks, ignoring rejected Promises, and retrying every error.',
    deepExplanation:
      "Sequentially awaiting `getA()` then `getB()` when independent should use `Promise.all()` instead; `const data = fetchData(); console.log(data);` logs a Promise, not the resolved value, because `await` was forgotten; `items.forEach(async (item) => { await process(item); })` doesn't let the caller wait for completion — use a `for...of` loop for sequential processing or `Promise.all(items.map(...))` for parallel processing; calling `loadData()` without observing its rejection makes debugging harder if it fails; and retrying every error indiscriminately can amplify an outage.",
  },
  {
    id: 'jsadv-m12-264',
    number: 'JSADV-M12-264',
    title: 'Design a Production Async Data Loader',
    difficulty: 'Hard',
    expectedAnswer: 'A production async data loader needs cancellation, timeout, retry, concurrency control, partial-failure handling, logging, and caching layered around the raw request.',
    deepExplanation:
      "The architecture flows UI → data loader → cache/deduplication → concurrency limiter → timeout → `AbortSignal` → request → retry policy → result → telemetry. A foundation like `loadResource(url, { signal, timeoutMs })` combines a caller-provided signal with an internal timeout-driven `AbortController`. Senior improvements: combine caller cancellation and timeout signals, classify retryable errors, add backoff and jitter, deduplicate requests, cache successful responses, limit concurrency, record metrics/traces, and distinguish cancellation from failure.",
  },
  {
    id: 'jsadv-m12-265',
    number: 'JSADV-M12-265',
    title: 'Final Senior Async/Await Design Question',
    difficulty: 'Hard',
    experienceLevel: '5–8 Years+',
    expectedAnswer: 'A dashboard loading required data (User, Orders), optional data (Recommendations, Analytics), and independently updating Notifications should split required work via `Promise.all()`, optional work via `Promise.allSettled()`, and let Notifications update on its own path.',
    deepExplanation:
      "Strong architecture: `Promise.all()` for the required User/Orders data (the dashboard cannot render meaningfully without them) alongside `Promise.allSettled()` for optional Recommendations/Analytics (so one failing doesn't block the page), both feeding the UI, with Notifications updating independently. This design must still respect the stated requirements: requests time out, transient failures retry, API rate limits are respected, and navigating away should cancel in-flight work via `AbortController`.",
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
