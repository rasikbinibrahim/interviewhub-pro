# PART 4 – ADVANCED JAVASCRIPT MASTER HANDBOOK

# Module 12 — Async/Await

**Questions 246–265**

## Module Objective

Complete senior-level coverage of:

- `async` functions
- `await`
- Promise relationship
- Sequential vs parallel execution
- `try/catch/finally`
- Async iterators and generators
- Top-level `await`
- Fetch API
- Cancellation
- Timeouts
- Retries and backoff
- Concurrency control
- Performance
- Browser and Node.js behavior
- Production patterns
- Coding exercises
- Output questions
- Senior / Staff / Principal interview questions

---

# Question 246 — What Is an Async Function?

**Difficulty:** ⭐ Easy  
**Experience:** 0–2 Years

An `async` function always returns a Promise.

```js
async function getMessage() {
  return "Hello";
}

getMessage().then(console.log);
```

**Output**

```text
Hello
```

Conceptually:

```text
async function
      ↓
return value
      ↓
fulfilled Promise
```

Even a normal returned value is wrapped/adopted into Promise-based behavior.

```js
const result = getMessage();

console.log(result instanceof Promise);
```

**Output**

```text
true
```

---

# Question 247 — What Does `await` Do?

**Difficulty:** ⭐ Easy  
**Experience:** 0–2 Years

`await` suspends the current async function's continuation until the awaited value is settled.

```js
async function load() {
  const value = await Promise.resolve(100);

  console.log(value);
}

load();
```

**Output**

```text
100
```

Important:

```text
await does NOT block the JavaScript thread
```

Execution model:

```text
async function
      ↓
await
      ↓
suspend async continuation
      ↓
other work can execute
      ↓
Promise settles
      ↓
continuation is scheduled
      ↓
async function resumes
```

---

# Question 248 — What Happens When an Async Function Returns a Value?

**Difficulty:** ⭐⭐ Medium

```js
async function calculate() {
  return 10;
}

calculate().then(console.log);
```

**Output**

```text
10
```

Interview mental model:

```js
async function calculate() {
  return 10;
}
```

is Promise-based, conceptually similar to:

```js
function calculate() {
  return Promise.resolve(10);
}
```

The specification mechanics are more precise, but this is the useful interview model.

---

# Question 249 — What Happens When an Async Function Throws?

**Difficulty:** ⭐⭐ Medium

A thrown error makes the async function's returned Promise reject.

```js
async function loadUser() {
  throw new Error("User not found");
}

loadUser().catch((error) => {
  console.log(error.message);
});
```

**Output**

```text
User not found
```

Flow:

```text
throw Error
    ↓
async function
    ↓
returned Promise rejected
    ↓
catch()
```

**Interview trap:** `async` does not automatically handle errors. It converts a thrown error into rejection of the returned Promise.

---

# Question 250 — What Is Sequential Async Execution?

**Difficulty:** ⭐ Easy

Sequential execution means the next operation starts after the previous operation completes.

```js
async function loadUserOrders() {
  const user = await fetchUser();

  const orders = await fetchOrders(user.id);

  return orders;
}
```

Flow:

```text
fetchUser
   ↓
await
   ↓
fetchOrders(user.id)
   ↓
await
   ↓
return
```

Use sequential execution when:

- B depends on A
- ordering matters
- rate limits require serialization
- the business workflow is sequential

---

# Question 251 — How Do You Run Independent Operations in Parallel?

**Difficulty:** ⭐⭐ Medium

Avoid unnecessary serialization.

**Less efficient when independent:**

```js
const users = await fetchUsers();
const products = await fetchProducts();
const alerts = await fetchAlerts();
```

**Better:**

```js
const [users, products, alerts] = await Promise.all([
  fetchUsers(),
  fetchProducts(),
  fetchAlerts()
]);
```

Flow:

```text
fetchUsers ───────┐
fetchProducts ────┼──→ Promise.all() → await
fetchAlerts ──────┘
```

If operations are independent, latency can approach the slowest operation instead of the sum of all durations.

**Production warning:** Do not launch thousands of operations simultaneously. Use controlled concurrency for large workloads.

---

# Question 252 — How Do You Handle Errors With `try/catch`?

**Difficulty:** ⭐ Easy

```js
async function loadData() {
  try {
    const response = await fetch("/api/data");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
}
```

Important:

`fetch()` normally rejects for network-level failures, not simply because the server returned HTTP 404 or 500.

Therefore:

```js
if (!response.ok) {
  throw new Error(...);
}
```

is commonly required for application-level HTTP error handling.

---

# Question 253 — What Is `try/catch/finally` With Async/Await?

**Difficulty:** ⭐⭐ Medium

```js
async function load() {
  try {
    console.log("Loading");
    return await fetchData();
  } catch (error) {
    console.error("Failed", error);
    return null;
  } finally {
    console.log("Cleanup");
  }
}
```

Flow:

```text
             try
              │
       ┌──────┴──────┐
       ↓             ↓
    success        error
       │             ↓
       │           catch
       │             │
       └──────┬──────┘
              ↓
           finally
```

Typical `finally` work:

- stop loading indicators
- clear timers
- release resources
- reset temporary UI state

---

# Question 254 — Async/Await vs Promises

**Difficulty:** ⭐⭐ Medium

Both use Promise semantics.

### Promise style

```js
fetchUser()
  .then((user) => fetchOrders(user.id))
  .then((orders) => {
    console.log(orders);
  })
  .catch(console.error);
```

### Async/await style

```js
async function load() {
  try {
    const user = await fetchUser();
    const orders = await fetchOrders(user.id);

    console.log(orders);
  } catch (error) {
    console.error(error);
  }
}
```

| Aspect | Promise chaining | Async/Await |
|---|---|---|
| Foundation | Promises | Promises |
| Readability | Can become complex | Usually procedural |
| Error handling | `catch()` | `try/catch` |
| Parallel work | `Promise.all()` | `await Promise.all()` |
| Cancellation | External mechanism | Same mechanisms |
| Runtime | Promise-based | Promise-based |

**Key interview point:** async/await is not a separate asynchronous runtime. It is syntax built around Promise semantics.

---

# Question 255 — What Are Async Iterators?

**Difficulty:** ⭐⭐⭐ Hard

Async iterators allow values to be consumed asynchronously.

```js
const asyncIterable = {
  async *[Symbol.asyncIterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
};

for await (const value of asyncIterable) {
  console.log(value);
}
```

**Output**

```text
1
2
3
```

The important protocol is:

```js
Symbol.asyncIterator
```

and consumption uses:

```js
for await...of
```

Production uses:

- paginated APIs
- streams
- asynchronous queues
- incremental data processing
- event sources

---

# Question 256 — What Are Async Generators?

**Difficulty:** ⭐⭐⭐ Hard

An async generator combines asynchronous execution with generator semantics.

```js
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function* generateNumbers() {
  yield 1;

  await delay(100);

  yield 2;

  await delay(100);

  yield 3;
}

for await (const number of generateNumbers()) {
  console.log(number);
}
```

**Output**

```text
1
2
3
```

Architecture:

```text
Producer
   ↓
async generator
   ↓
for await...of
   ↓
Consumer
```

---

# Question 257 — What Is Top-Level Await?

**Difficulty:** ⭐⭐⭐ Hard

Top-level `await` allows `await` directly inside an ECMAScript module.

```js
const response = await fetch("/config.json");

const config = await response.json();

console.log(config);
```

The script must be evaluated as a module, for example:

```html
<script type="module" src="/app.js"></script>
```

Top-level await can affect module evaluation and startup dependencies.

**Production consideration:** Avoid making critical application startup depend unnecessarily on slow top-level asynchronous work.

---

# Question 258 — How Do You Use Fetch With Async/Await?

**Difficulty:** ⭐ Easy

```js
async function getUsers(signal) {
  const response = await fetch("/api/users", {
    signal
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}
```

Usage:

```js
try {
  const users = await getUsers();
  console.log(users);
} catch (error) {
  console.error(error);
}
```

Browser behavior:

```text
JavaScript
   ↓
fetch()
   ↓
browser networking
   ↓
response available
   ↓
Promise settles
   ↓
async continuation resumes
```

---

# Question 259 — How Do You Cancel Async/Await Operations?

**Difficulty:** ⭐⭐⭐ Hard

Async/await does not provide universal cancellation.

For APIs such as `fetch()`, use `AbortController`.

```js
async function loadUsers(signal) {
  const response = await fetch("/api/users", {
    signal
  });

  return response.json();
}

const controller = new AbortController();

const request = loadUsers(controller.signal);

controller.abort();
```

Handle cancellation:

```js
try {
  await request;
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Cancelled");
  } else {
    throw error;
  }
}
```

Cancellation is cooperative: the underlying API must understand the signal.

---

# Question 260 — How Do You Implement Async Timeouts?

**Difficulty:** ⭐⭐⭐ Hard

```js
async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}
```

Usage:

```js
try {
  const data = await fetchWithTimeout(
    "/api/dashboard",
    5000
  );
} catch (error) {
  console.error(error);
}
```

Modern environments may also support:

```js
const response = await fetch("/api/data", {
  signal: AbortSignal.timeout(5000)
});
```

---

# Question 261 — How Do You Implement Retries?

**Difficulty:** ⭐⭐⭐ Hard

Retries should be selective.

Do not blindly retry every error.

Potentially retryable cases depend on the API contract and may include transient network errors, `408`, `429`, or selected `5xx` responses.

Example:

```js
async function retry(
  task,
  {
    retries = 3,
    baseDelay = 200
  } = {}
) {
  let attempt = 0;

  while (true) {
    try {
      return await task();
    } catch (error) {
      if (attempt >= retries) {
        throw error;
      }

      const delay = baseDelay * 2 ** attempt;

      await new Promise((resolve) => {
        setTimeout(resolve, delay);
      });

      attempt++;
    }
  }
}
```

Production improvement:

```text
retry classification
        +
exponential backoff
        +
jitter
        +
maximum delay
        +
cancellation
        +
observability
```

---

# Question 262 — What Is the Performance Impact of Async/Await?

**Difficulty:** ⭐⭐ Medium

Async/await is not automatically slow. Poor orchestration is often the larger issue.

### Bad when independent

```js
const a = await fetchA();
const b = await fetchB();
const c = await fetchC();
```

### Better

```js
const [a, b, c] = await Promise.all([
  fetchA(),
  fetchB(),
  fetchC()
]);
```

But do not parallelize dependent work:

```text
A → B → C
```

must remain sequential if B needs A and C needs B.

Consider:

- network latency
- concurrency limits
- API rate limits
- browser resource limits
- memory usage
- rendering work
- unnecessary Promise creation

---

# Question 263 — What Are Common Async/Await Mistakes?

**Difficulty:** ⭐⭐ Medium

## Mistake 1 — Sequentializing independent work

```js
const a = await getA();
const b = await getB();
```

Use `Promise.all()` when independence and failure semantics allow.

## Mistake 2 — Forgetting `await`

```js
const data = fetchData();

console.log(data);
```

`data` is a Promise.

## Mistake 3 — `forEach` with async callbacks

```js
// Bad when the caller needs completion.
items.forEach(async (item) => {
  await process(item);
});
```

### Sequential

```js
for (const item of items) {
  await process(item);
}
```

### Parallel

```js
await Promise.all(
  items.map((item) => process(item))
);
```

## Mistake 4 — Ignoring rejected Promises

```js
loadData();
```

If it rejects and no caller observes the Promise, debugging becomes harder.

## Mistake 5 — Retrying every error

This can amplify an outage.

---

# Question 264 — Design a Production Async Data Loader

**Difficulty:** ⭐⭐⭐ Hard

Requirements:

- cancellation
- timeout
- retry
- concurrency
- partial failure
- logging
- caching

Architecture:

```text
UI
 ↓
Data Loader
 ↓
Cache / Deduplication
 ↓
Concurrency Limiter
 ↓
Timeout
 ↓
AbortSignal
 ↓
Request
 ↓
Retry Policy
 ↓
Result
 ↓
Telemetry
```

Example foundation:

```js
async function loadResource(
  url,
  {
    signal,
    timeoutMs = 5000
  } = {}
) {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  const effectiveSignal = signal ?? controller.signal;

  try {
    const response = await fetch(url, {
      signal: effectiveSignal
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}
```

Senior improvements:

- combine caller cancellation and timeout signals
- classify retryable errors
- add backoff and jitter
- deduplicate requests
- cache successful responses
- limit concurrency
- record metrics and traces
- distinguish cancellation from failure

---

# Question 265 — Final Senior Async/Await Design Question

**Difficulty:** ⭐⭐⭐ Hard  
**Experience:** 5–8 Years+

A dashboard loads:

```text
User
Orders
Recommendations
Notifications
Analytics
```

Requirements:

1. User and Orders are required.
2. Recommendations and Analytics are optional.
3. Notifications update independently.
4. The user can navigate away.
5. Requests should timeout.
6. Transient failures should retry.
7. API rate limits must be respected.

Strong architecture:

```text
                     Dashboard
                         │
              ┌──────────┴──────────┐
              ↓                     ↓
        Required Data         Optional Data
              │                     │
        Promise.all()        Promise.allSettled()
              │                     │
              └──────────┬──────────┘
                         ↓
                       UI
                         │
                  Notifications
                   independently
```

Base implementation:

```js
async function fetchJson(url, signal) {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

async function loadDashboard(signal) {
  const requiredPromise = Promise.all([
    fetchJson("/api/user", signal),
    fetchJson("/api/orders", signal)
  ]);

  const optionalPromise = Promise.allSettled([
    fetchJson("/api/recommendations", signal),
    fetchJson("/api/analytics", signal)
  ]);

  const [required, optional] = await Promise.all([
    requiredPromise,
    optionalPromise
  ]);

  return {
    required,
    optional
  };
}
```

Production additions:

```text
AbortSignal
timeout
retry classification
exponential backoff
jitter
concurrency control
cache
deduplication
telemetry
partial UI rendering
stale-response protection
```

---

# Master Async/Await Diagram

```text
                 async function
                       │
                       ↓
                   execute
                       │
                       ↓
                     await
                       │
               ┌───────┴────────┐
               ↓                ↓
          Promise pending    Already settled
               │                │
               ↓                ↓
        return control      continuation
               │                │
               └──────→ microtask
                            │
                            ↓
                    resume function
                            │
                            ↓
                      next statement
```

---

# Async/Await vs Blocking

```text
Blocking model

Task A
████████████████████

Task B
                    ███████████████


Async model

Task A starts
████████

Other work
    ███████████████████

Task A settles
       ↓
continuation resumes
```

`await` suspends the async function's continuation; it does not freeze the JavaScript thread.

---

# Built-in Coding Exercise 1 — Sequential Loader

Implement:

```js
async function loadUserOrders(userId) {}
```

Requirements:

1. Load user.
2. Use `user.id`.
3. Load orders.
4. Handle errors.

Reference:

```js
async function loadUserOrders(userId) {
  const user = await fetchUser(userId);
  const orders = await fetchOrders(user.id);

  return {
    user,
    orders
  };
}
```

**Time complexity:** Depends on I/O; two dependent network operations are sequential.

---

# Coding Exercise 2 — Parallel Loader

Implement:

```js
async function loadDashboard() {}
```

Load users, products and notifications independently.

Reference:

```js
async function loadDashboard() {
  const [users, products, notifications] =
    await Promise.all([
      fetchUsers(),
      fetchProducts(),
      fetchNotifications()
    ]);

  return {
    users,
    products,
    notifications
  };
}
```

---

# Coding Exercise 3 — Fix Async `forEach`

Given:

```js
items.forEach(async (item) => {
  await saveItem(item);
});
```

Provide both implementations.

### Sequential

```js
for (const item of items) {
  await saveItem(item);
}
```

### Parallel

```js
await Promise.all(
  items.map((item) => saveItem(item))
);
```

Explain when each is appropriate.

---

# Coding Exercise 4 — Async Generator

Implement:

```js
async function* paginate(fetchPage) {}
```

Requirements:

- fetch page by page
- yield records
- stop at the last page
- support `for await...of`

Architecture:

```text
Page 1
 ↓
yield records
 ↓
Page 2
 ↓
yield records
 ↓
Page N
 ↓
done
```

---

# Coding Exercise 5 — Retry With Backoff

Implement:

```js
retry(task, {
  retries: 3,
  baseDelay: 200
});
```

Requirements:

- no infinite retries
- exponential delay
- final failure is thrown
- discuss jitter and cancellation

---

# Coding Exercise 6 — Timeout

Implement:

```js
fetchWithTimeout(url, 5000);
```

Use `AbortController` and clean up the timer.

---

# Coding Exercise 7 — Concurrency Limiter

Implement:

```js
runTasks(tasks, 3);
```

Requirements:

```text
Maximum active tasks = 3
Preserve output order
Handle failures
Do not start every task immediately
```

Architecture:

```text
Task Queue
   │
   ├── Worker 1
   ├── Worker 2
   └── Worker 3
          ↓
       Results
```

---

# Output-Based Interview Questions

## Output 1

```js
async function test() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}

console.log("C");
test();
console.log("D");
```

**Output**

```text
C
A
D
B
```

---

## Output 2

```js
async function test() {
  return 10;
}

console.log(test() instanceof Promise);
```

**Output**

```text
true
```

---

## Output 3

```js
async function test() {
  throw new Error("Failed");
}

test().catch((error) => {
  console.log(error.message);
});
```

**Output**

```text
Failed
```

---

## Output 4

```js
async function test() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}

test();
console.log("C");
```

**Output**

```text
A
C
B
```

---

## Output 5

```js
async function test() {
  try {
    await Promise.reject("Error");
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Cleanup");
  }
}

test();
```

**Output**

```text
Error
Cleanup
```

---

## Output 6

```js
async function test() {
  const value = await 42;
  console.log(value);
}

test();
```

**Output**

```text
42
```

---

## Output 7

```js
async function test() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}

test();

Promise.resolve().then(() => {
  console.log("C");
});
```

**Output**

```text
A
B
C
```

The Promise continuation from `await` is queued before the later explicit `.then()` reaction in this example.

---

## Output 8

```js
async function test() {
  return await Promise.resolve("A");
}

test().then(console.log);
```

**Output**

```text
A
```

---

# MCQs

## MCQ 1

What does an `async` function return?

A. String  
B. Promise  
C. Iterator  
D. Callback

**Answer: B**

## MCQ 2

Does `await` block the JavaScript thread?

A. Yes  
B. No  
C. Only Chrome  
D. Only Node.js

**Answer: B**

## MCQ 3

Which syntax consumes an async iterable?

A. `for...in`  
B. `for...of`  
C. `for await...of`  
D. `await...for`

**Answer: C**

## MCQ 4

Which API commonly cancels `fetch()`?

A. `Promise.cancel()`  
B. `AbortController`  
C. `AsyncController`  
D. `FetchController`

**Answer: B**

## MCQ 5

Which pattern is generally suitable for independent async operations?

A. Sequential awaits  
B. `Promise.all()`  
C. `setInterval()`  
D. Recursion

**Answer: B**

---

# Scenario-Based Interview Questions

## Scenario 1 — Five Independent APIs

Discuss whether this:

```js
const a = await getA();
const b = await getB();
const c = await getC();
const d = await getD();
const e = await getE();
```

should become:

```js
const [a, b, c, d, e] = await Promise.all([
  getA(),
  getB(),
  getC(),
  getD(),
  getE()
]);
```

Consider:

- dependency
- latency
- API capacity
- error semantics
- cancellation
- rate limits

---

## Scenario 2 — Search Race Condition

User searches:

```text
rea
react
react native
```

A previous response may arrive after a newer response.

Design:

```text
Query
 ↓
Cancel previous request
 ↓
Start newest request
 ↓
Ignore stale response
 ↓
Render newest data
```

---

## Scenario 3 — Large Batch

10,000 API operations must not execute simultaneously.

Design:

```text
10,000 tasks
     ↓
Queue
     ↓
Concurrency = 10
     ↓
Workers
     ↓
Results
```

Discuss:

- rate limits
- memory
- retries
- cancellation
- progress
- backpressure

---

# Senior Follow-Up Questions

1. What exactly does `await` do?
2. Why does `await` not block the JavaScript thread?
3. How does `await` relate to Promise reactions?
4. What happens when an awaited Promise rejects?
5. Why does an async function return a Promise?
6. How does `for await...of` work?
7. What is an async generator?
8. When is sequential await appropriate?
9. When should independent operations use `Promise.all()`?
10. Why is `forEach(async () => {})` problematic?
11. How would you cancel an async workflow?
12. How would you implement timeouts?
13. How would you prevent retry storms?
14. How would you implement concurrency control?
15. How would you handle partial failure?
16. How does top-level await affect module startup?
17. What are the performance implications of excessive awaits?
18. How would you instrument async latency?
19. How would you prevent stale responses?
20. How would you design an async task scheduler?

---

# Staff Engineer Questions

1. Design an enterprise async request manager.
2. Design cancellation propagation across nested operations.
3. Design a shared retry framework.
4. Define retryable and non-retryable errors.
5. Design API concurrency budgets.
6. Design request deduplication.
7. Design async observability.
8. Design graceful degradation for partial failures.
9. Design a browser task priority queue.
10. Design a streaming ingestion layer using async iterators.

---

# Principal Engineer Questions

1. Design a browser-side distributed request orchestration layer.
2. Balance API cost, latency and reliability.
3. Prevent retry storms across millions of clients.
4. Propagate cancellation through multiple service layers.
5. Design tenant-specific concurrency limits.
6. Design global async observability.
7. Detect memory retained by pending async operations.
8. Design graceful degradation across critical dependencies.
9. Coordinate async work across browser tabs.
10. Evolve async architecture without breaking consumers.

---

# 30-Second Interview Answer

> `async/await` is syntax built on JavaScript Promise semantics. An async function always returns a Promise. `await` suspends the async function's continuation until the awaited value settles, but it does not block the JavaScript thread. I use sequential awaits when operations depend on each other and `Promise.all()` when independent operations can run concurrently. In production I also consider cancellation, timeouts, retry policies, concurrency limits, race conditions, error handling and observability.

---

# 2-Minute Interview Answer

> Async/await makes Promise-based asynchronous code easier to read and reason about. An async function always returns a Promise. When execution reaches await, the async function suspends its continuation and returns control to the runtime. Once the awaited Promise settles, the continuation is scheduled and the function resumes.
>
> I use try/catch/finally for error and cleanup handling. For independent requests I create all Promises first and use Promise.all rather than accidentally serializing them. For large workloads I use controlled concurrency. For browser requests I use AbortController for cancellation and timeout policies. Retry logic should classify errors and use backoff and jitter rather than blindly retrying.

---

# 5-Minute Deep Explanation

```text
                 async function
                       │
                       ↓
                  execute code
                       │
                       ↓
                     await
                       │
               ┌───────┴────────┐
               ↓                ↓
        Promise pending     Promise settled
               │                │
               ↓                ↓
        return control      continuation
               │                │
               └──────→ microtask
                            │
                            ↓
                    resume function
                            │
                            ↓
                       next statement
```

The architecture is:

```text
ECMAScript async/Promise semantics
            +
host scheduling/event loop
            +
browser or Node.js APIs
```

Async/await does not make JavaScript blocking. It provides readable asynchronous control flow.

---

# Production Async Checklist

```text
□ Use async/await for readable Promise workflows
□ Use Promise.all for independent required work
□ Use allSettled for partial success
□ Limit concurrency for large batches
□ Handle rejected Promises
□ Check fetch response.ok
□ Use AbortController for cancellable fetches
□ Add timeout policies
□ Retry only appropriate transient errors
□ Use exponential backoff
□ Add jitter where appropriate
□ Prevent retry storms
□ Avoid async forEach mistakes
□ Prevent stale response updates
□ Deduplicate duplicate requests
□ Add caching where appropriate
□ Add telemetry
□ Track latency
□ Track failures
□ Clean up timers and subscriptions
```

---

# Assignment 1 — Async/Await Playground

Build a UI displaying:

```text
Started
  ↓
Awaiting
  ↓
Promise Settled
  ↓
Resumed
  ↓
Completed
```

Controls:

- delay
- resolve
- reject
- cancellation
- timeout

---

# Assignment 2 — Enterprise Request Manager

Implement:

```js
createRequestManager({
  concurrency: 5,
  timeout: 5000,
  retries: 3
});
```

Support:

- queueing
- cancellation
- retries
- timeout
- progress
- errors
- metrics

---

# Assignment 3 — Async Pagination

Build:

```js
async function* paginate(url) {}
```

Support:

- page numbers
- cursor pagination
- termination
- cancellation
- rate limiting

---

# Mini Project — Production Dashboard Loader

Build:

```text
Required
 ├── User
 └── Orders

Optional
 ├── Recommendations
 └── Analytics

Independent
 └── Notifications
```

Requirements:

- parallel loading
- partial failure
- loading states
- cancellation
- timeout
- retry
- cache
- race-condition protection

---

# Revision Notes

```text
async function
→ always returns Promise

await
→ suspends async continuation

await does NOT
→ block the JavaScript thread

try/catch
→ handles awaited rejection

finally
→ cleanup

Promise.all
→ independent parallel operations

for...of + await
→ sequential processing

map + Promise.all
→ parallel processing

forEach + async
→ does not await callbacks

Async iterator
→ Symbol.asyncIterator

Async generator
→ async function*

Async iteration
→ for await...of

Top-level await
→ await in ES modules

AbortController
→ cancellation for APIs supporting AbortSignal

Retry
→ repeat selected transient failures

Backoff
→ increase delay between attempts

Concurrency limit
→ restrict active async operations
```

---

# Cheat Sheet

| Topic | Key Point |
|---|---|
| `async` | Always returns a Promise |
| `await` | Suspends async continuation |
| `try/catch` | Handles awaited failures |
| `finally` | Cleanup |
| `Promise.all` | Parallel required operations |
| `allSettled` | Partial failure |
| `for...of + await` | Sequential |
| `map + Promise.all` | Parallel |
| `forEach(async)` | Does not await |
| Async iterator | `Symbol.asyncIterator` |
| Async generator | `async function*` |
| Async iteration | `for await...of` |
| Cancellation | `AbortController` |
| Timeout | AbortSignal / timer |
| Retry | Backoff + classification |

---

# Related Topics

- Module 10 — Event Loop
- Module 11 — Promises
- Module 21 — Advanced Async Patterns
- Module 23 — Polyfills
- Module 24 — JavaScript Coding Questions
- Module 25 — JavaScript Output Questions
- Module 26 — Senior JavaScript
- Fetch API
- AbortController
- Web Streams
- Web Workers
- Node.js event loop
- React data fetching
- Concurrency control
- Race conditions
- Caching

---

# Module 12 Complete

**Part 4 → Module 12: Async/Await**

**Questions:** 246–265

**Previous:** Module 11 — Promises

**Next:** Module 13 — ES6+ Features (Questions 266–290 in the original Part 4 structure)
