# PART 4 – ADVANCED JAVASCRIPT MASTER HANDBOOK

# Module 11 — Promises

**Questions 226–245**

**Audience:** Freshers → Junior → Mid-Level → Senior → Staff → Principal Frontend Engineers

---

# Module Objective

This module provides a complete interview-focused treatment of JavaScript Promises.

Topics covered:

- Promise states
- Promise lifecycle
- `then()`
- `catch()`
- `finally()`
- `Promise.resolve()`
- `Promise.reject()`
- `Promise.all()`
- `Promise.allSettled()`
- `Promise.any()`
- `Promise.race()`
- Promise chaining
- Error propagation
- Promise internals
- Promise reactions
- Microtasks
- Async/await relationship
- Sequential vs parallel work
- Cancellation
- Timeouts
- Retries
- Concurrency
- Promise performance
- Common interview traps
- Browser and Node.js behavior
- Production patterns
- Coding exercises
- Output questions
- Senior / Staff / Principal questions

---

# Question 226 — What Is a Promise?

**Difficulty:** ⭐ Easy  
**Experience Level:** 0–2 Years

A Promise is a JavaScript object representing the eventual completion or failure of an asynchronous operation.

A Promise has three states:

```text
             ┌───────────────┐
             │    Pending    │
             └───────┬───────┘
                     │
          ┌──────────┴──────────┐
          ↓                     ↓
     Fulfilled               Rejected
```

Example:

```js
const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Success");
  }, 1000);
});

promise.then((value) => {
  console.log(value);
});
```

Output after the asynchronous operation completes:

```text
Success
```

### Important

A Promise itself does not make an operation asynchronous. It provides a standardized representation for a result that may become available later.

---

# Question 227 — What Are Promise States?

**Difficulty:** ⭐ Easy

A Promise has:

1. **Pending**
2. **Fulfilled**
3. **Rejected**

```text
Pending
  │
  ├── resolve(value) ──→ Fulfilled
  │
  └── reject(reason) ──→ Rejected
```

A settled Promise cannot transition to another state.

```js
const promise = new Promise((resolve, reject) => {
  resolve("A");
  reject("B");
});

promise.then(console.log);
```

Output:

```text
A
```

The later `reject()` does not change the already-settled Promise.

### Interview trap

Do not describe Promise states as:

```text
pending → fulfilled → rejected
```

A Promise settles into either fulfilled **or** rejected.

---

# Question 228 — What Happens When `then()` Is Called?

**Difficulty:** ⭐⭐ Medium

`then()` registers fulfillment and/or rejection reactions and returns a **new Promise**.

```js
const original = Promise.resolve(10);

const next = original.then((value) => {
  return value * 2;
});

next.then(console.log);
```

Output:

```text
20
```

Conceptually:

```text
original Promise
      │
      ↓
   then()
      │
      ↓
new Promise
      │
      ↓
 transformed value
```

### Important

`then()` does not mutate the original Promise.

---

# Question 229 — What Is `catch()`?

**Difficulty:** ⭐ Easy

`catch()` handles rejection and is effectively a convenient form of:

```js
promise.then(undefined, onRejected);
```

Example:

```js
Promise.reject(new Error("Network failed"))
  .catch((error) => {
    console.error(error.message);
  });
```

Output:

```text
Network failed
```

### Recovery

A `catch()` handler can return a value:

```js
Promise.reject(new Error("Failed"))
  .catch(() => "Fallback")
  .then(console.log);
```

Output:

```text
Fallback
```

The chain becomes fulfilled after the handler returns normally.

---

# Question 230 — What Is `finally()`?

**Difficulty:** ⭐⭐ Medium

`finally()` executes regardless of whether the Promise is fulfilled or rejected.

```js
fetch("/api/users")
  .then((response) => response.json())
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Request finished");
  });
```

Typical behavior:

```text
success or error
       ↓
finally()
```

### Important

`finally()` is useful for cleanup:

- hiding loading indicators
- releasing resources
- stopping spinners
- resetting temporary state

It normally preserves the previous fulfillment/rejection outcome unless the `finally()` callback itself throws or returns a rejected Promise.

---

# Question 231 — What Is `Promise.resolve()`?

**Difficulty:** ⭐ Easy

`Promise.resolve(value)` creates or adopts a fulfilled Promise-like result.

```js
Promise.resolve(42).then(console.log);
```

Output:

```text
42
```

It is useful for normalizing values and thenables into Promise-based APIs.

```js
function normalize(value) {
  return Promise.resolve(value);
}
```

Then:

```js
normalize(10).then(console.log);
```

Output:

```text
10
```

### Important

If the input is already a native Promise, `Promise.resolve()` can return it directly rather than wrapping it unnecessarily.

---

# Question 232 — What Is `Promise.reject()`?

**Difficulty:** ⭐ Easy

`Promise.reject(reason)` returns an already-rejected Promise.

```js
Promise.reject(new Error("Invalid request"))
  .catch((error) => {
    console.log(error.message);
  });
```

Output:

```text
Invalid request
```

Production use:

```js
function validateUser(user) {
  if (!user?.id) {
    return Promise.reject(
      new Error("User ID is required")
    );
  }

  return Promise.resolve(user);
}
```

---

# Question 233 — What Is `Promise.all()`?

**Difficulty:** ⭐⭐ Medium

`Promise.all()` waits for all input values to fulfill.

```js
const usersPromise = Promise.resolve(["A", "B"]);
const postsPromise = Promise.resolve(["P1", "P2"]);

Promise.all([
  usersPromise,
  postsPromise
]).then(([users, posts]) => {
  console.log(users);
  console.log(posts);
});
```

Output:

```text
["A", "B"]
["P1", "P2"]
```

### Important properties

- preserves input order
- fulfills when all fulfill
- rejects when one input rejects
- does not cancel the other underlying operations automatically

Diagram:

```text
P1 ────────┐
P2 ────────┼──→ Promise.all()
P3 ────────┘
              │
              ↓
       all fulfilled
              │
              ↓
       result array
```

### Production use

Parallel independent requests:

```js
const [user, orders, notifications] =
  await Promise.all([
    fetchUser(),
    fetchOrders(),
    fetchNotifications()
  ]);
```

This can be much faster than sequential requests when they are independent.

---

# Question 234 — What Is `Promise.allSettled()`?

**Difficulty:** ⭐⭐ Medium

`Promise.allSettled()` waits for every input Promise to settle, regardless of success or failure.

```js
const results = await Promise.allSettled([
  Promise.resolve("A"),
  Promise.reject(new Error("B")),
  Promise.resolve("C")
]);

console.log(results);
```

Conceptual output:

```js
[
  { status: "fulfilled", value: "A" },
  { status: "rejected", reason: Error("B") },
  { status: "fulfilled", value: "C" }
]
```

### Use cases

Useful when every operation should be observed independently:

- bulk notifications
- batch processing
- analytics
- multiple optional widgets
- multi-file operations

---

# Question 235 — What Is `Promise.any()`?

**Difficulty:** ⭐⭐ Medium

`Promise.any()` fulfills as soon as the first input Promise fulfills.

```js
const result = await Promise.any([
  Promise.reject("Server A failed"),
  Promise.resolve("Server B"),
  Promise.resolve("Server C")
]);

console.log(result);
```

Output:

```text
Server B
```

If all inputs reject, it rejects with an `AggregateError`.

```text
P1 rejected
P2 rejected
P3 rejected
      ↓
AggregateError
```

### Production use

Potential use cases:

- fallback services
- multiple mirrors
- fastest successful provider
- redundant endpoints

### Important

"First" means first fulfillment, not first Promise to settle.

---

# Question 236 — What Is `Promise.race()`?

**Difficulty:** ⭐⭐ Medium

`Promise.race()` settles as soon as the first input Promise settles.

```js
const result = await Promise.race([
  new Promise((resolve) =>
    setTimeout(() => resolve("Slow"), 1000)
  ),
  new Promise((resolve) =>
    setTimeout(() => resolve("Fast"), 100)
  )
]);

console.log(result);
```

Output:

```text
Fast
```

Unlike `Promise.any()`:

```text
race → first settled
any  → first fulfilled
```

### Timeout pattern

```js
function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Timeout"));
    }, ms);
  });
}

const response = await Promise.race([
  fetch("/api/data"),
  timeout(5000)
]);
```

### Production warning

`Promise.race()` does not automatically cancel the losing operation.

For network cancellation, combine a timeout strategy with `AbortController`.

---

# Question 237 — How Does Promise Chaining Work?

**Difficulty:** ⭐⭐ Medium

Promises can form a sequence of dependent asynchronous operations.

```js
fetch("/api/user")
  .then((response) => response.json())
  .then((user) => {
    return fetch(`/api/orders/${user.id}`);
  })
  .then((response) => response.json())
  .then((orders) => {
    console.log(orders);
  })
  .catch((error) => {
    console.error(error);
  });
```

Flow:

```text
Request user
    ↓
Parse user
    ↓
Request orders
    ↓
Parse orders
    ↓
Use orders
    ↓
Catch failures
```

### Key rule

Returning a Promise from a `.then()` callback causes the next step to wait for it.

---

# Question 238 — How Does Promise Error Propagation Work?

**Difficulty:** ⭐⭐ Medium

Errors propagate through the chain until a rejection handler handles them.

```js
Promise.resolve()
  .then(() => {
    throw new Error("Failure");
  })
  .then(() => {
    console.log("This does not run");
  })
  .catch((error) => {
    console.log(error.message);
  });
```

Output:

```text
Failure
```

Diagram:

```text
then()
  ↓
throw
  ↓
rejected Promise
  ↓
next fulfillment handler skipped
  ↓
catch()
```

### Production best practice

Do not silently swallow errors:

```js
// Bad
.catch(() => {});
```

Prefer:

```js
.catch((error) => {
  logger.error("User request failed", {
    error
  });

  throw error;
});
```

when the current layer cannot safely recover.

---

# Question 239 — What Happens Internally When a Promise Settles?

**Difficulty:** ⭐⭐⭐ Hard

Conceptually:

```text
Promise
  │
  ├── state
  │    ├── pending
  │    ├── fulfilled
  │    └── rejected
  │
  └── reactions
       ├── fulfillment handlers
       └── rejection handlers
```

When a Promise settles:

```text
Promise settles
      ↓
registered reactions become eligible
      ↓
reaction jobs are scheduled
      ↓
microtask processing
      ↓
callback executes
```

The ECMAScript specification defines Promise semantics and jobs; the host environment integrates those jobs with its scheduling/event-loop model.

---

# Question 240 — Why Are Promise Callbacks Asynchronous?

**Difficulty:** ⭐⭐ Medium

Even an already-fulfilled Promise does not invoke `.then()` synchronously.

```js
const promise = Promise.resolve();

console.log("A");

promise.then(() => {
  console.log("B");
});

console.log("C");
```

Output:

```text
A
C
B
```

Flow:

```text
A
 ↓
register reaction
 ↓
C
 ↓
current task ends
 ↓
microtask
 ↓
B
```

This predictable asynchronous behavior prevents surprising synchronous execution from Promise handlers.

---

# Question 241 — What Is Promise Performance?

**Difficulty:** ⭐⭐⭐ Hard

Promises are generally lightweight abstractions, but excessive asynchronous orchestration can still introduce overhead.

Potential issues:

- thousands of unnecessary Promise objects
- excessive chaining
- redundant requests
- unbounded concurrency
- unnecessary serialization
- large closures retained by pending operations
- excessive retries
- duplicate work

### Sequential

```js
const a = await fetchA();
const b = await fetchB();
const c = await fetchC();
```

If independent, this may unnecessarily serialize requests.

### Parallel

```js
const [a, b, c] = await Promise.all([
  fetchA(),
  fetchB(),
  fetchC()
]);
```

If independent, parallelization can reduce total latency.

### But do not blindly parallelize

If:

```text
B depends on A
```

then:

```text
A → B
```

must remain sequential.

---

# Question 242 — What Are Common Promise Mistakes?

**Difficulty:** ⭐⭐ Medium

### Mistake 1 — Forgetting `return`

```js
// Bad
users.map((user) => {
  fetchUser(user.id);
});
```

If you need the Promises:

```js
const requests = users.map((user) =>
  fetchUser(user.id)
);

await Promise.all(requests);
```

### Mistake 2 — Accidental sequential execution

```js
for (const id of ids) {
  await fetchUser(id);
}
```

May be correct when ordering or rate limits require it, but unnecessary if requests are independent.

### Mistake 3 — Unbounded concurrency

```js
await Promise.all(
  hugeArray.map(fetchSomething)
);
```

This can overload:

- browser networking
- API servers
- memory
- CPU
- rate limits

Use a concurrency limiter when necessary.

### Mistake 4 — Assuming race cancels work

It does not.

### Mistake 5 — Swallowing errors

```js
.catch(() => null);
```

This can hide production failures.

---

# Question 243 — What Is Promise Cancellation?

**Difficulty:** ⭐⭐⭐ Hard

Native Promises do not have a general built-in cancellation method.

For cancellable browser operations such as `fetch`, use `AbortController`.

```js
const controller = new AbortController();

const request = fetch("/api/users", {
  signal: controller.signal
});

controller.abort();
```

Handle cancellation:

```js
try {
  await request;
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Request cancelled");
  } else {
    throw error;
  }
}
```

Diagram:

```text
Component
   │
   ↓
AbortController
   │
   ↓
fetch()
   │
   ↓
AbortSignal
   │
   ↓
request cancelled
```

### React production use

When a component no longer needs a request:

```text
component unmounts
       ↓
abort request
       ↓
avoid unnecessary network work
       ↓
avoid stale result handling
```

---

# Question 244 — How Should Promises Be Used in Production?

**Difficulty:** ⭐⭐⭐ Hard

Production Promise architecture should consider:

### 1. Error handling

```js
try {
  const data = await loadData();
} catch (error) {
  reportError(error);
}
```

### 2. Cancellation

Use `AbortController` where supported.

### 3. Concurrency limits

Do not create thousands of simultaneous operations without considering resource limits.

### 4. Retry policy

Retry only appropriate failures.

### 5. Backoff

Use exponential backoff with jitter for suitable transient failures.

### 6. Timeouts

Do not let user-critical requests hang indefinitely.

### 7. Observability

Track:

- duration
- success/failure
- retry count
- cancellation
- endpoint
- correlation/request IDs

### 8. Cleanup

Release resources and remove subscriptions/listeners.

---

# Question 245 — Final Promise Interview Question

**Difficulty:** ⭐⭐⭐ Hard  
**Experience Level:** 5–8 Years+

## Scenario

A production dashboard makes 50 API requests.

The current implementation is:

```js
const results = await Promise.all(
  ids.map((id) => fetch(`/api/items/${id}`))
);
```

Problems:

- some requests fail transiently
- the API has rate limits
- users can navigate away
- some items are optional
- the UI should show successful items even if some fail

### Design a production solution.

A strong senior design would include:

```text
Input IDs
   ↓
Deduplicate
   ↓
Concurrency limiter
   ↓
AbortSignal
   ↓
Request
   ↓
Retry only transient failures
   ↓
Backoff + jitter
   ↓
Collect individual results
   ↓
Update UI progressively
   ↓
Observe failures
```

For independent optional requests, `Promise.allSettled()` can be appropriate.

For cancellation:

```js
const controller = new AbortController();

try {
  const results = await Promise.allSettled(
    ids.map((id) =>
      fetch(`/api/items/${id}`, {
        signal: controller.signal
      })
    )
  );

  return results;
} finally {
  // Cleanup associated resources if needed.
}
```

For a large number of requests, add a concurrency limiter instead of launching all requests simultaneously.

---

# Promise Master Diagram

```text
                  Promise
                     │
             ┌───────┴───────┐
             ↓               ↓
          Pending          Settled
                              │
                     ┌────────┴────────┐
                     ↓                 ↓
                 Fulfilled          Rejected
                     │                 │
                     └────────┬────────┘
                              ↓
                       Promise Reaction
                              ↓
                         Microtask
                              ↓
                          Callback
                              ↓
                         New Promise
```

---

# Promise Combinator Comparison

| Method | Completes When | Failure behavior | Result |
|---|---|---|---|
| `Promise.all()` | All fulfill | First rejection rejects aggregate | Array |
| `Promise.allSettled()` | All settle | Never rejects because of input rejection | Status objects |
| `Promise.any()` | First fulfillment | Rejects if all reject | First fulfilled value |
| `Promise.race()` | First settlement | First rejection rejects | First settled value |

---

# `Promise.all()` vs Sequential

## Sequential

```js
const user = await fetchUser();
const orders = await fetchOrders();
const notifications = await fetchNotifications();
```

Timeline:

```text
User
██████
      Orders
      ██████
            Notifications
            ██████
```

Total latency is approximately the sum of independent durations.

## Parallel

```js
const [user, orders, notifications] =
  await Promise.all([
    fetchUser(),
    fetchOrders(),
    fetchNotifications()
  ]);
```

Timeline:

```text
User
██████

Orders
████████

Notifications
████
```

Total latency is closer to the slowest operation, assuming they are independent and resource constraints do not dominate.

---

# Built-in Coding Exercise 1 — Parallel Requests

```js
async function loadDashboard() {
  const [user, orders, alerts] =
    await Promise.all([
      fetchUser(),
      fetchOrders(),
      fetchAlerts()
    ]);

  return {
    user,
    orders,
    alerts
  };
}
```

### Expected behavior

All independent requests start without waiting for one another.

---

# Coding Exercise 2 — Without `Promise.all()`

Implement a custom equivalent of `Promise.all()` for interview practice.

```js
function promiseAll(values) {
  return new Promise((resolve, reject) => {
    const items = Array.from(values);
    const results = [];
    let completed = 0;

    if (items.length === 0) {
      resolve([]);
      return;
    }

    items.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          results[index] = value;
          completed++;

          if (completed === items.length) {
            resolve(results);
          }
        },
        reject
      );
    });
  });
}
```

### Important

This is an interview implementation, not a replacement for the native method in production.

### Complexity

For `n` inputs:

```text
Time: O(n) orchestration
Space: O(n)
```

---

# Coding Exercise 3 — Custom `Promise.race()`

```js
function promiseRace(values) {
  return new Promise((resolve, reject) => {
    for (const value of values) {
      Promise.resolve(value).then(
        resolve,
        reject
      );
    }
  });
}
```

Concept:

```text
P1 ────────┐
P2 ────┐   │
P3 ────┼───┼──→ first settlement wins
        │   │
        └───┘
```

---

# Coding Exercise 4 — Custom `Promise.any()`

Implement an interview version that:

- fulfills on the first fulfillment
- tracks rejection count
- rejects only when all inputs reject
- returns an `AggregateError`

Senior follow-up:

```text
How would you handle:
- empty input?
- thenables?
- cancellation?
- memory usage?
```

---

# Coding Exercise 5 — Concurrency Limiter

Implement:

```js
runWithConcurrency(tasks, 3);
```

Requirements:

```text
Maximum active tasks = 3
Preserve result order
Handle failures
Do not start all tasks at once
```

Expected architecture:

```text
Tasks
 ↓
Queue
 ↓
Worker 1 ──┐
Worker 2 ──┼──→ Results
Worker 3 ──┘
```

---

# Coding Exercise 6 — Retry With Exponential Backoff

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

      const delay =
        baseDelay * 2 ** attempt;

      await new Promise((resolve) =>
        setTimeout(resolve, delay)
      );

      attempt++;
    }
  }
}
```

### Production improvement

Add:

- jitter
- retryable error classification
- maximum delay
- cancellation
- logging
- request IDs

---

# Coding Exercise 7 — Timeout With AbortController

```js
async function fetchWithTimeout(
  url,
  timeoutMs
) {
  const controller =
    new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal
    });

    return response;
  } finally {
    clearTimeout(timer);
  }
}
```

### Why this is better than only using `Promise.race()`

A pure race can reject due to timeout while leaving the underlying fetch running.

`AbortController` can communicate cancellation to APIs that support `AbortSignal`.

---

# Output-Based Interview Questions

## Output 1

```js
Promise.resolve()
  .then(() => console.log("A"));

console.log("B");
```

Output:

```text
B
A
```

---

## Output 2

```js
Promise.resolve("A")
  .then((value) => {
    console.log(value);
    return "B";
  })
  .then(console.log);
```

Output:

```text
A
B
```

---

## Output 3

```js
Promise.reject("A")
  .catch((error) => {
    console.log(error);
    return "B";
  })
  .then(console.log);
```

Output:

```text
A
B
```

---

## Output 4

```js
Promise.resolve("A")
  .finally(() => {
    console.log("Cleanup");
  })
  .then(console.log);
```

Output:

```text
Cleanup
A
```

---

## Output 5

```js
Promise.all([
  Promise.resolve(1),
  Promise.resolve(2)
]).then(console.log);
```

Output:

```text
[1, 2]
```

---

## Output 6

```js
Promise.all([
  Promise.resolve(1),
  Promise.reject("Error"),
  Promise.resolve(3)
]).then(
  console.log,
  console.error
);
```

Output conceptually:

```text
Error
```

The aggregate Promise rejects.

---

## Output 7

```js
Promise.allSettled([
  Promise.resolve("A"),
  Promise.reject("B")
]).then(console.log);
```

Output conceptually:

```js
[
  { status: "fulfilled", value: "A" },
  { status: "rejected", reason: "B" }
]
```

---

## Output 8

```js
Promise.any([
  Promise.reject("A"),
  Promise.resolve("B"),
  Promise.resolve("C")
]).then(console.log);
```

Output:

```text
B
```

---

## Output 9

```js
Promise.race([
  Promise.reject("A"),
  Promise.resolve("B")
]).then(
  console.log,
  console.error
);
```

Because both inputs are already settled, the first iterable element's settlement is observed first in this setup.

Output:

```text
A
```

---

## Output 10

```js
Promise.resolve()
  .then(() => {
    console.log("A");
    throw new Error("B");
  })
  .catch((error) => {
    console.log(error.message);
  })
  .finally(() => {
    console.log("C");
  });
```

Output:

```text
A
B
C
```

---

# MCQs

## MCQ 1

What does `then()` return?

A. The original Promise  
B. A new Promise  
C. A callback  
D. `undefined`

**Answer: B**

---

## MCQ 2

Which method waits for all inputs to settle?

A. `Promise.all()`  
B. `Promise.any()`  
C. `Promise.race()`  
D. `Promise.allSettled()`

**Answer: D**

---

## MCQ 3

Which method rejects when any input rejects?

A. `Promise.all()`  
B. `Promise.allSettled()`  
C. `Promise.any()`  
D. `Promise.resolve()`

**Answer: A**

---

## MCQ 4

Which method waits for the first fulfillment?

A. `Promise.race()`  
B. `Promise.any()`  
C. `Promise.all()`  
D. `Promise.allSettled()`

**Answer: B**

---

## MCQ 5

What does `finally()` primarily provide?

A. Retry  
B. Cancellation  
C. Cleanup  
D. Parallelization

**Answer: C**

---

# Scenario-Based Interview Questions

## Scenario 1 — 100 API Requests

You have 1000 IDs and need to request data.

Would you use:

```js
Promise.all(ids.map(fetchItem));
```

Not automatically.

Consider:

```text
1000 requests
   ↓
rate limits
   ↓
network saturation
   ↓
memory
   ↓
server load
```

Use controlled concurrency.

---

## Scenario 2 — Search Race Condition

User searches:

```text
react
react native
react native interview
```

The older request may finish after the newer request.

Solution:

```text
Search 1 ──────────────── response
Search 2 ─────── response
Search 3 ── response
```

Cancel or ignore stale requests.

Use `AbortController` where supported.

---

## Scenario 3 — Optional Dashboard Widgets

A dashboard contains:

```text
Revenue
Orders
Notifications
Recommendations
```

Recommendations may fail without making the entire page unusable.

Use:

```js
Promise.allSettled(...)
```

or independently managed requests.

---

# Senior Follow-Up Questions

1. Does `Promise.all()` cancel remaining requests after one rejects?
2. What happens to the underlying `fetch()` operations?
3. Why does `then()` return a new Promise?
4. What is a thenable?
5. What is Promise assimilation?
6. How does Promise resolution differ from fulfillment?
7. How does `await` use Promise machinery?
8. Why are Promise reactions microtasks?
9. What happens when a `.then()` callback throws?
10. How would you implement concurrency limiting?
11. How would you cancel a Promise-based workflow?
12. How would you add timeout semantics?
13. How would you implement retries safely?
14. When should `allSettled()` be preferred over `all()`?
15. `race()` vs `any()` — what is the exact semantic difference?

---

# Staff Engineer Questions

1. Design a reusable Promise orchestration layer for an enterprise frontend.
2. How would you prevent unbounded concurrency?
3. How would you implement request deduplication?
4. How would you design retries without causing a retry storm?
5. How would you add exponential backoff and jitter?
6. How would you propagate cancellation across nested operations?
7. How would you observe Promise latency in production?
8. How would you classify retryable vs non-retryable errors?
9. How would you handle partial success?
10. How would you design a priority-based async scheduler?

---

# Principal Engineer Questions

1. Design a browser-side request orchestration platform for multiple teams.
2. Define concurrency budgets for different API classes.
3. Design cancellation semantics across React, workers, and network requests.
4. Design an enterprise retry policy.
5. How would you prevent duplicate API calls across multiple components?
6. How would you instrument asynchronous operations globally?
7. How would you detect Promise leaks?
8. How would you handle degraded backend dependencies?
9. How would you design graceful partial failure?
10. How would you balance latency, reliability, and API cost?

---

# 30-Second Interview Answer

> A Promise represents the eventual outcome of an asynchronous operation. It starts pending and becomes fulfilled or rejected. Promise handlers such as `then`, `catch`, and `finally` create asynchronous reaction jobs, which are processed through the runtime's microtask mechanism. `Promise.all` is useful for independent operations that must all succeed, `allSettled` for partial success, `any` for the first successful result, and `race` for the first settled result. In production I also consider cancellation, timeouts, retries, concurrency limits, error propagation, and observability.

---

# 2-Minute Interview Answer

> Promises provide a standard abstraction for asynchronous results. A Promise has pending, fulfilled, and rejected states. Calling `then` returns a new Promise, allowing asynchronous operations to be composed into chains. If a handler returns a normal value, the next Promise fulfills with that value. If it throws or returns a rejected Promise, rejection propagates until a rejection handler handles it.
>
> For composition, I use `Promise.all` when independent operations must all succeed, `allSettled` when partial failure is acceptable, `any` when I need the first successful operation, and `race` when I care about the first settlement. I don't assume these methods cancel underlying work. For cancellable browser operations I use `AbortController`. For production workloads with many requests, I add concurrency limits, retry classification, backoff, timeouts, and observability.

---

# 5-Minute Deep Explanation

```text
                 Promise
                    │
             Pending State
                    │
          ┌─────────┴─────────┐
          ↓                   ↓
      Fulfilled            Rejected
          │                   │
          └─────────┬─────────┘
                    ↓
             Reaction Job
                    ↓
              Microtask
                    ↓
              .then/.catch
                    ↓
              New Promise
```

Promises solve the problem of representing asynchronous outcomes while supporting composition.

The important architecture distinction is:

```text
ECMAScript Promise semantics
            +
Host scheduling / event loop
            +
Browser or Node APIs
```

Promises themselves do not perform network requests. APIs such as `fetch()` initiate network operations. Promise machinery represents the eventual result.

---

# Promise Production Checklist

```text
□ Handle errors
□ Avoid swallowed errors
□ Avoid unbounded concurrency
□ Use Promise.all for independent required operations
□ Use allSettled for partial success
□ Use any for first successful provider
□ Use race carefully
□ Use AbortController for cancellable browser requests
□ Add timeouts where appropriate
□ Retry only transient failures
□ Use exponential backoff + jitter
□ Prevent duplicate requests
□ Track latency
□ Track failures
□ Track cancellation
□ Clean up resources
```

---

# Assignment 1 — Promise Playground

Build an application that visually displays:

```text
Pending
   ↓
Fulfilled / Rejected
   ↓
then()
   ↓
new Promise
```

Add controls for:

- resolve
- reject
- delay
- chain
- catch
- finally

---

# Assignment 2 — API Concurrency Manager

Build:

```js
createRequestPool({
  concurrency: 5,
  retryCount: 3,
  timeout: 5000
});
```

Support:

- concurrency
- retries
- timeout
- cancellation
- progress
- result ordering
- error reporting

---

# Assignment 3 — Search Request Manager

Implement:

```js
search(query)
```

Requirements:

- debounce input
- cancel stale requests
- cache previous searches
- handle errors
- show loading state
- avoid race conditions

---

# Mini Project — Enterprise API Orchestrator

Build a frontend API orchestration layer supporting:

```text
Request
  ↓
Cache
  ↓
Deduplication
  ↓
Concurrency
  ↓
Timeout
  ↓
Retry
  ↓
Cancellation
  ↓
Result
  ↓
Observability
```

---

# Revision Notes

```text
Promise
→ represents eventual outcome

Pending
→ not settled

Fulfilled
→ successful result

Rejected
→ failed result

then()
→ registers reactions and returns new Promise

catch()
→ rejection handler

finally()
→ cleanup regardless of outcome

Promise.all()
→ all must fulfill

Promise.allSettled()
→ wait for every input to settle

Promise.any()
→ first fulfillment

Promise.race()
→ first settlement

AbortController
→ cancellation mechanism for APIs supporting AbortSignal

Concurrency limit
→ controls active asynchronous work

Retry
→ repeat selected transient failures

Backoff
→ increase delay between retries
```

---

# Cheat Sheet

| API | Key Behavior |
|---|---|
| `Promise.resolve(x)` | Adopt/return a fulfilled Promise result |
| `Promise.reject(x)` | Create rejected Promise |
| `Promise.all()` | All fulfill or aggregate rejects |
| `Promise.allSettled()` | Wait for every settlement |
| `Promise.any()` | First fulfillment |
| `Promise.race()` | First settlement |
| `.then()` | Transform/chain |
| `.catch()` | Handle rejection |
| `.finally()` | Cleanup |
| `AbortController` | Signal cancellation |

---

# Related Topics

- Module 10 — Event Loop
- Module 12 — Async/Await
- Module 21 — Advanced Async Patterns
- Module 23 — Polyfills
- Module 24 — JavaScript Coding Questions
- Module 25 — JavaScript Output Questions
- Module 26 — Senior JavaScript
- React data fetching
- Fetch API
- AbortController
- Concurrency control
- Retry architecture
- Caching
- Race conditions

---

# Module 11 Complete

**Part 4 → Module 11: Promises**

**Questions:** 226–245

**Previous:** Module 10 — Event Loop

**Next:** Module 12 — Async/Await (Questions 246–265)
