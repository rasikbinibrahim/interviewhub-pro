# QADVJS073 · Implement a Promise Retry Utility with Exponential Backoff

**Difficulty:** Medium
**Companies Asked:** Google, Meta, Amazon, Stripe, Uber
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Promises / Async Control Flow
**Concepts:** recursive/looped retry, exponential backoff, `setTimeout`-based delay, jitter (as an optimization)

## Problem Statement

Implement `retry(fn, maxRetries, baseDelayMs)`. `fn` is a function that
returns a `Promise` (e.g. a flaky network call). If `fn()` rejects,
`retry` should call it again after waiting, doubling the wait each time
(`baseDelayMs * 2^attempt` — "exponential backoff"), up to `maxRetries`
additional attempts. If an attempt finally succeeds, `retry` resolves
with that value immediately. If every attempt — the original call plus
all `maxRetries` retries — fails, `retry` rejects with the **last**
error encountered.

## Input

- `fn`: a zero-argument function returning a `Promise<T>` (e.g. a
  fetch wrapper) — assume calling it again is safe/idempotent, which is
  a real precondition for retry to be a valid strategy at all.
- `maxRetries`: a non-negative integer — the number of *additional*
  attempts after the first, if the first fails.
- `baseDelayMs`: a positive number — the delay before the *first*
  retry; each subsequent retry's delay doubles.

## Output

A `Promise<T>` that resolves with `fn()`'s resolved value from whichever
attempt first succeeds, or rejects with the most recent rejection
reason if every attempt (1 initial + `maxRetries` retries) fails.

## Constraints

- Total attempts made: at most `1 + maxRetries`.
- Delay before retry attempt `k` (1-indexed: the first retry is `k=1`):
  `baseDelayMs * 2^(k-1)` — i.e. the first retry waits `baseDelayMs`,
  the second waits `2 * baseDelayMs`, the third `4 * baseDelayMs`, and
  so on.
- Must not retry at all once `maxRetries` attempts have been exhausted
  — the final failure propagates as the overall rejection.
- `maxRetries = 0` means `fn` is called exactly once — no retries — and
  any rejection propagates immediately.
- Must not use the real `Promise.all`/`race` — this is a purely
  sequential loop (each attempt depends on the previous one having
  already failed).

## Examples

| Scenario | Behavior | Why |
|---|---|---|
| `retry(fn, 3, 100)`, `fn` fails twice then succeeds on the 3rd call | Resolves with the 3rd call's value, after waiting ~100ms then ~200ms between attempts | Two failures, two backoff delays (100ms, 200ms), then success — the 3rd (final, successful) attempt needs no further delay |
| `retry(fn, 3, 100)`, `fn` always rejects | Rejects with the *last* (4th attempt's, i.e. the `maxRetries`-th retry's) rejection reason, after 1 initial call + 3 retries (delays ~100/200/400ms between them) | All attempts exhausted; the most recent failure is the one that surfaces |
| `retry(fn, 0, 100)`, `fn` rejects | Rejects immediately with that single rejection — no delay, no retry | `maxRetries = 0` means only the original call is made |
| `retry(fn, 3, 100)`, `fn` succeeds on the very first call | Resolves immediately with no delay at all | No failure ever occurred, so no backoff logic runs |

## Edge Cases

- `maxRetries = 0` → exactly one attempt, any failure propagates with
  no delay.
- `fn` always succeeds → resolves on the first call, no timers ever
  created.
- `fn` always rejects → after exhausting all attempts, rejects with the
  reason from the *final* attempt specifically (not the first failure,
  and not some combined/aggregated error, unless the interviewer asks
  for that as an enhancement — see follow-ups).
- `fn` throws synchronously instead of returning a rejected promise →
  must be caught and treated the same as an async rejection, triggering
  the same retry logic.
- Very large `maxRetries` with a nontrivial `baseDelayMs` → delays grow
  exponentially and can become unreasonably long very quickly; worth
  mentioning capping the delay (e.g. `Math.min(delay, maxDelayMs)`) as
  a real-world refinement, plus jitter (see Algorithm) to avoid many
  clients retrying in lockstep.

## Hints

1. Structure this as a function that calls `fn()`, and on rejection,
   checks whether any retries remain — if so, waits (via a
   `setTimeout`-wrapped `Promise`) and calls *itself* again with one
   fewer retry remaining and a doubled delay; if not, propagates the
   rejection as-is. What two variables need to change on each recursive
   call: the retries-remaining count, and the delay for the *next*
   wait?
2. You need a small `delay(ms)` helper — `new Promise(resolve =>
   setTimeout(resolve, ms))` — to `await`/`.then` a pause between
   attempts without blocking the event loop.
3. Track "attempts remaining" as a countdown (starts at `maxRetries`,
   decremented each retry) rather than an "attempts made" counter
   compared against `maxRetries` — this keeps the recursive base case
   (`if (retriesLeft === 0) throw`) simple and avoids an off-by-one
   between "attempts" and "retries" (the first call is *not* a retry).

## Algorithm

**Pattern:** recursive (or looped) retry with exponentially-growing
delay between attempts.
**Core insight:** retry-with-backoff is naturally expressed as
recursion on failure: try `fn()`; if it succeeds, you're done; if it
fails and retries remain, wait for the current backoff delay, then
retry with one fewer attempt remaining and a doubled delay for *next*
time. The doubling must happen on the delay value itself, carried
between recursive calls (or computed from an attempt-number counter as
`baseDelayMs * 2^attemptIndex`), not recomputed from scratch each time
in a way that loses track of how many failures have already occurred.
Exponential growth exists to avoid hammering a struggling
downstream service at a fixed rate; a further real-world refinement is
**jitter** — adding a small random offset to each computed delay (e.g.
`delay * (0.5 + Math.random() * 0.5)`) — so that many clients retrying
the same failing endpoint don't all retry in lockstep and cause a
synchronized "thundering herd" spike right as the backoff window closes.
**Invariant:** at the start of the call handling the `k`-th retry
attempt, exactly `k-1` prior retries (plus the original call) have
already failed, and the delay used before this attempt is
`baseDelayMs * 2^(k-1)`.

## Dry Run

**Input:** `retry(fn, 3, 100)`; `fn` rejects on attempts 1 and 2,
resolves with `'ok'` on attempt 3.

| Attempt | retriesLeft (before) | Result | Delay before next attempt | retriesLeft (after) |
|---|---|---|---|---|
| 1 (original call) | 3 | rejects (`'err1'`) | `100ms * 2^0 = 100ms` | 2 |
| 2 (1st retry) | 2 | rejects (`'err2'`) | `100ms * 2^1 = 200ms` | 1 |
| 3 (2nd retry) | 1 | resolves (`'ok'`) | — (no further attempt needed) | — |

**Result:** `retry` resolves with `'ok'` after 1 initial call + 2
retries, having waited ~100ms then ~200ms between attempts (total
~300ms of backoff delay before the successful 3rd attempt). The 3rd
retry (which would have used a 400ms delay had attempt 3 also failed)
never happens.

## JavaScript Solution

```js
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function retry(fn, maxRetries, baseDelayMs) {
  function attempt(retriesLeft, currentDelayMs) {
    return Promise.resolve()
      .then(() => fn()) // wraps a synchronous throw into a rejection too
      .catch((error) => {
        if (retriesLeft === 0) {
          // Every attempt (1 original + maxRetries retries) is
          // exhausted — propagate the most recent failure.
          throw error;
        }

        return delay(currentDelayMs).then(() =>
          // Next attempt gets one fewer retry and a doubled delay.
          attempt(retriesLeft - 1, currentDelayMs * 2),
        );
      });
  }

  return attempt(maxRetries, baseDelayMs);
}
```

## TypeScript Solution

```ts
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number,
  baseDelayMs: number,
): Promise<T> {
  function attempt(retriesLeft: number, currentDelayMs: number): Promise<T> {
    return Promise.resolve()
      .then(() => fn())
      .catch((error: unknown) => {
        if (retriesLeft === 0) {
          throw error;
        }

        return delay(currentDelayMs).then(() =>
          attempt(retriesLeft - 1, currentDelayMs * 2),
        );
      });
  }

  return attempt(maxRetries, baseDelayMs);
}
```

## Time Complexity

O(k) promise/timer overhead, where k = number of attempts actually
made (`1 <= k <= 1 + maxRetries`) — independent of `fn`'s own runtime
cost, each attempt does O(1) bookkeeping beyond calling `fn()` itself.

## Space Complexity

O(k) — each retry adds one pending `.then`/`.catch` frame to the
promise chain (or one stack frame, in the recursive formulation) until
the chain resolves or the final rejection propagates; bounded by
`1 + maxRetries`.

## Common Mistakes

- Computing the delay as `baseDelayMs * 2^attemptNumber` using an
  attempt counter that's off by one relative to how many failures have
  actually occurred — produces a first-retry delay of `2 *
  baseDelayMs` instead of `baseDelayMs`, or vice versa; the dry run
  above is the concrete check for this (first retry = `baseDelayMs *
  2^0`).
- Rejecting with the *first* failure instead of the *last* one once
  retries are exhausted — the last attempt's error is almost always
  more useful for debugging (e.g. "connection refused" on attempt 1 vs.
  "still connection refused, definitively down" on attempt 4), and it's
  what the spec here explicitly asks for.
- Not catching a *synchronous* throw from `fn()` — if `fn` isn't
  guaranteed to always return a promise (e.g. it might throw before
  reaching its first `await`), calling it directly outside a
  `Promise.resolve().then(...)` wrapper crashes the retry loop instead
  of triggering a retry.
- Forgetting that `maxRetries = 0` must still make exactly one attempt
  (not zero) — a common off-by-one is treating `maxRetries` as "total
  attempts" instead of "additional attempts after the first."
- No cap on the exponential growth for large `maxRetries` — worth
  mentioning `Math.min(currentDelayMs, maxDelayMs)` as a production
  refinement, since uncapped doubling can reach absurd wait times after
  only ~10-15 retries.

## Interview Follow-up Questions

1. How would you add jitter to the delay, and why does jitter matter
   for a service under real load (thundering herd avoidance)?
2. How would you cap the maximum delay so backoff doesn't grow
   unboundedly for a large `maxRetries`?
3. How would you make this respect an `AbortSignal`, so a caller can
   cancel an in-progress retry sequence (including any pending delay)?
4. Should every kind of failure be retried? How would you add a
   predicate (`shouldRetry(error) => boolean`) so, e.g., a 4xx HTTP
   error isn't retried the same way a 5xx or network timeout is?
5. How would you unit test the backoff timing without waiting real
   wall-clock time across potentially several seconds of cumulative
   delay?

## Similar Questions

- [Implement setInterval Using setTimeout](implement-setinterval-using-settimeout.md)
- [Implement an Async Waterfall Runner](implement-async-waterfall-runner.md)
- Implement a circuit breaker for repeated failing calls
- [Implement an Async Task Runner with a Concurrency Limit](implement-async-task-runner-with-concurrency-limit.md)

---
[← Back to 61-javascript-coding](README.md)
