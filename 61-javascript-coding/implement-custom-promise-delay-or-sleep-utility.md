# QJSC014 · Implement Custom Promise delay or sleep Utility

**Difficulty:** Easy
**Companies Asked:** Google, Meta, Amazon, Microsoft, Adobe
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Promises / Async Control Flow
**Concepts:** Promise construction, `setTimeout`, async/await composition, non-cancellable native Promises

## Problem Statement

Implement `delay(ms)`, a utility that returns a `Promise` which resolves
(with no meaningful value, or optionally a passed-through value) after
`ms` milliseconds have elapsed. This is the standard building block for
adding pauses inside `async` functions — e.g. `await delay(1000)` to
wait one second — and for spacing out retries, animations, or simulated
network latency in tests.

## Input

`ms`: a non-negative number of milliseconds to wait.

## Output

A `Promise<void>` (or `Promise<T>` if a value is optionally threaded
through) that resolves after `ms` milliseconds have elapsed. It never
rejects on its own.

## Constraints

- `ms >= 0`; `ms = 0` still resolves asynchronously (next macrotask), not
  synchronously.
- The returned promise must resolve exactly once, after the delay — it
  is not cancellable by default (native `setTimeout`/`Promise` don't
  support cancellation; this is explored as a follow-up).
- Must be usable with `await` inside an `async` function, and with
  `.then()` directly.

## Examples

| Scenario | Behavior |
|---|---|
| `await delay(1000)` inside an `async` function | Execution pauses at that line for ~1000ms, then continues to the next statement |
| `delay(0).then(() => console.log('next tick'))` | Logs `'next tick'` on the next macrotask, not synchronously — even a 0ms delay still yields to the event loop |
| `Promise.all([delay(100), delay(50), delay(200)])` | Resolves after ~200ms — the slowest of the three delays, since `Promise.all` waits for every input to settle |

## Edge Cases

- `ms = 0` → still asynchronous; the calling code after `await delay(0)`
  does not run until the current synchronous execution (and the
  microtask queue) drains and the timer's macrotask fires.
- Very large `ms` (e.g. exceeding `setTimeout`'s ~24.8-day practical
  32-bit signed integer limit) → browsers/Node clamp or wrap this;
  worth mentioning even though it's a `setTimeout` platform quirk, not
  something `delay` itself needs to guard against for typical interview
  scope.
- `delay` used in a loop to build a sequence of paced operations (e.g.
  retry with backoff) → each call creates an independent, freshly-timed
  promise; there's no shared state between calls.
- Attempting to "cancel" a pending `delay` — not supported out of the
  box; see Interview Follow-up Questions for the extension.

## Hints

1. `delay` needs to return a `new Promise((resolve, reject) => { ... })`
   — the executor function is where the actual waiting gets scheduled.
2. Inside the executor, `setTimeout(() => resolve(), ms)` is the entire
   mechanism: after `ms` milliseconds, the timer callback resolves the
   promise, which is exactly the "the wait is over" signal that `await`
   is listening for.
3. There's no `reject` path needed for the basic version — `delay` is
   defined to never fail on its own; only add a `reject` case if
   explicitly extending it (e.g. to support cancellation via an
   `AbortSignal`, discussed below).

## Algorithm

**Pattern:** wrap `setTimeout` in a `Promise` executor.
**Core insight:** `async`/`await` doesn't have a native "pause for N
milliseconds" primitive — it can only `await` a promise. `delay` bridges
that gap by returning a promise whose *only* job is to resolve when a
timer fires, turning a callback-based API (`setTimeout`) into something
`await`-compatible. Because `setTimeout`'s callback naturally runs
asynchronously (as a macrotask), the returned promise is guaranteed to
never resolve synchronously, even for `ms = 0`.
**Invariant:** the promise transitions from pending to resolved exactly
once, exactly when the underlying timer fires — there is no code path
that resolves it earlier or more than once.

## Dry Run

**Input:**
```js
async function demo() {
  console.log('start');
  await delay(100);
  console.log('end');
}
demo();
console.log('after calling demo()');
```

| Step | Time | Event |
|---|---|---|
| 1 | t=0 | `demo()` called; synchronously logs `'start'` |
| 2 | t=0 | `await delay(100)` creates the promise, `setTimeout` schedules a callback for t=100; `demo()`'s execution pauses here and returns control to the caller |
| 3 | t=0 | `console.log('after calling demo()')` runs (this line was never inside `demo()`, so it isn't blocked by the `await`) |
| 4 | t=100 | The `setTimeout` callback fires, calling `resolve()` — the pending promise settles |
| 5 | t=100 | `demo()` resumes after the `await`, logs `'end'` |

**Result:** logged order is `'start'`, `'after calling demo()'`, then
(~100ms later) `'end'` — demonstrating that `delay` pauses only the
`async` function that awaits it, never the surrounding synchronous code.

## JavaScript Solution

```js
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(); // signal "the wait is over" — no value needed
    }, ms);
  });
}

// Optional value-passthrough variant, useful for chaining:
// await delay(500, 'done') resolves to the string 'done' after 500ms.
function delayWithValue(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}
```

## TypeScript Solution

```ts
function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function delayWithValue<T>(ms: number, value: T): Promise<T> {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}
```

## Time Complexity

O(1) — creating the promise and scheduling the timer are both constant-
time operations, independent of `ms`'s magnitude (the wait itself is
elapsed wall-clock time, not CPU work).

## Space Complexity

O(1) — one promise and one timer handle per call, regardless of `ms`.

## Common Mistakes

- Forgetting to actually call `resolve()` inside the `setTimeout`
  callback — the promise then stays pending forever, and any `await
  delay(ms)` hangs indefinitely.
- Calling `resolve` synchronously outside of `setTimeout` (e.g. by
  mistake, or trying to "optimize" `ms = 0`) — this breaks the
  guarantee that `delay` is always asynchronous, which callers may rely
  on for consistent event-loop ordering.
- Not exposing any way to cancel a pending `delay` and then being
  surprised when asked about it in the follow-up — native `setTimeout`
  callbacks keep running even if nobody is listening anymore (unless
  explicitly cleared), and native `Promise`s have no built-in
  cancellation at all.
- Using `delay` inside a loop expecting all delays to run concurrently
  when `await`ed sequentially (`for (...) { await delay(100); doWork();
  }`) — each iteration's `await` blocks the loop, so N iterations take
  N * 100ms total, not 100ms; this is often the actual intent (pacing),
  but candidates should be able to articulate why, versus firing all the
  delays at once with `Promise.all`.

## Interview Follow-up Questions

1. Native promises aren't cancellable — how would you add cancellation
   to `delay` using an `AbortSignal`, so a caller can abort a pending
   wait early (and what should happen to the promise when aborted —
   reject, or resolve early)?
2. How would you implement a `retry(fn, { attempts, delayMs })` utility
   on top of `delay`, adding a pause between failed attempts?
3. How would you implement exponential backoff (each retry's delay
   longer than the last) using this same `delay` building block?
4. Why does even `delay(0)` still yield to the event loop instead of
   resolving synchronously — what does that guarantee about execution
   order that a synchronous "delay" couldn't provide?
5. How would you unit test code that uses `delay` without actually
   waiting real wall-clock time in your test suite (hint: fake timers)?

## Similar Questions

- [Implement Debounce](debounce.md)
- [Implement Throttle](throttle.md)
- [Implement Promise.race and Promise.any](implement-custom-promise-race-and-promise-any.md)

---
[← Back to 61-javascript-coding](README.md)
