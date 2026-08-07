# Q502 · Implement Throttle

**Difficulty:** Medium
**Companies Asked:** Google, Amazon, Meta, Microsoft, Uber, Adobe, Flipkart
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Async Control Flow / Higher-Order Functions
**Concepts:** closures, `setTimeout`, timestamps, rate limiting

## Problem Statement

Implement a `throttle(fn, intervalMs)` utility. It should return a new
function that, no matter how frequently it's called, only actually runs
`fn` at most once per `intervalMs` — the classic use case is a scroll or
mousemove handler that would otherwise fire hundreds of times a second.
Unlike debounce (which waits for calls to *stop*), throttle guarantees
`fn` runs on a roughly regular cadence *during* continuous activity.

## Input

- `fn`: the function to throttle (any arity, may use `this`)
- `intervalMs`: a number, the minimum milliseconds between two
  executions of `fn`

## Output

A new function with the same call signature as `fn`. Calling it runs
`fn` immediately if the interval has elapsed since the last run;
otherwise it's rate-limited according to the chosen policy (see
Algorithm — this solution uses the common "leading + trailing" policy).

## Constraints

- Must run `fn` at most once every `intervalMs`.
- Must preserve `this` and the most relevant call's arguments.
- `intervalMs >= 0`.
- No external libraries — implement with only `setTimeout`/`Date.now`.

## Examples

| Scenario | Behavior |
|---|---|
| `throttle(log, 200)` called once at t=0 | `log` runs immediately at t=0 (leading call) |
| Same throttled function called again at t=50 (within the 200ms window) | Doesn't run immediately; scheduled to run at t=200 with the latest args seen before the window closes (trailing call) |
| Called continuously (e.g. every 10ms) from t=0 to t=1000, interval=200 | `fn` runs at t=0, ~200, ~400, ~600, ~800, ~1000 — roughly every 200ms, not on every individual call |
| Called once, then never again | `fn` runs once, immediately (leading call only; no trailing call scheduled since there was nothing new after it) |

## Edge Cases

- A single call with no follow-up calls → runs immediately, no trailing
  call left dangling.
- Calls that land exactly on the interval boundary → should not double-
  fire (avoid an off-by-one that lets two runs happen in the same
  window).
- `intervalMs = 0` → effectively runs `fn` on every call (no throttling).
- Continuous calls for much longer than `intervalMs` → `fn` keeps
  running periodically for as long as calls keep coming, not just once.

## Hints

1. Throttle needs two pieces of state across calls: *when* `fn` last ran
   (a timestamp), and whether a trailing call is currently scheduled —
   both need to live in the closure, same as debounce's `timerId`.
2. On each call, compare `Date.now()` against `lastRan + intervalMs`. If
   enough time has passed, run `fn` immediately and update `lastRan` —
   that's the "leading edge" behavior.
3. If *not* enough time has passed, don't drop the call silently —
   schedule a single trailing `setTimeout` for the remaining time so the
   *last* call in a burst still eventually runs, but only schedule one
   such trailing call at a time (overwrite the pending one's arguments
   rather than stacking more timers).

## Algorithm

**Pattern:** closures + timestamp-gated execution, leading + trailing.
**Core insight:** unlike debounce (which always resets its timer),
throttle checks elapsed real time against the last actual run. If enough
time has passed, it runs `fn` right away (leading edge) and records
`lastRan`. If not, instead of doing nothing, it remembers the latest
arguments and schedules exactly one trailing call for when the current
window closes — this ensures the very last call in a burst is never
silently dropped, which a naive "just check the timestamp and bail"
implementation would do.
**Invariant:** `fn` executes at most once per `intervalMs` window, and at
most one trailing call is ever pending at a time (a new call inside the
same window replaces the pending trailing call's arguments rather than
scheduling a second one).

## Dry Run

**Input:** `const throttled = throttle(fn, 200)`; calls at t=0 (`'a'`),
t=50 (`'b'`), t=150 (`'c'`), then silence.

| Call | t (ms) | Since last run | Action | lastRan / pending |
|---|---|---|---|---|
| `throttled('a')` | 0 | n/a (first call) | runs `fn('a')` immediately (leading) | `lastRan = 0` |
| `throttled('b')` | 50 | 50ms < 200ms | too soon; schedule trailing call for t=200 with args `'b'` | trailing pending, args=`'b'` |
| `throttled('c')` | 150 | 150ms < 200ms | too soon; overwrite pending trailing call's args with `'c'` (don't add a second timer) | trailing pending, args=`'c'` |
| — trailing fires — | 200 | — | runs `fn('c')` (trailing) | `lastRan = 200`, pending cleared |

**Result:** `fn` runs twice total — `fn('a')` at t=0 and `fn('c')` at
t=200. `'b'` never runs on its own; it was superseded by `'c'` before the
trailing window closed.

## JavaScript Solution

```js
function throttle(fn, intervalMs) {
  let lastRan = -Infinity; // timestamp of the last actual execution
  let trailingTimerId;     // pending trailing-edge timer, if any
  let trailingArgs;        // most recent args to use if a trailing call fires

  return function throttled(...args) {
    const now = Date.now();
    const remaining = intervalMs - (now - lastRan);

    if (remaining <= 0) {
      // Enough time has passed — run immediately (leading edge).
      clearTimeout(trailingTimerId);
      trailingTimerId = undefined;
      lastRan = now;
      fn.apply(this, args);
    } else {
      // Too soon — remember the latest args and ensure exactly one
      // trailing call is scheduled for when this window closes.
      trailingArgs = args;
      if (!trailingTimerId) {
        trailingTimerId = setTimeout(() => {
          lastRan = Date.now();
          trailingTimerId = undefined;
          fn.apply(this, trailingArgs);
        }, remaining);
      }
    }
  };
}
```

## TypeScript Solution

```ts
function throttle<Args extends unknown[]>(
  fn: (...args: Args) => void,
  intervalMs: number,
): (...args: Args) => void {
  let lastRan = -Infinity;
  let trailingTimerId: ReturnType<typeof setTimeout> | undefined;
  let trailingArgs: Args | undefined;

  return function throttled(this: unknown, ...args: Args): void {
    const now = Date.now();
    const remaining = intervalMs - (now - lastRan);

    if (remaining <= 0) {
      clearTimeout(trailingTimerId);
      trailingTimerId = undefined;
      lastRan = now;
      fn.apply(this, args);
    } else {
      trailingArgs = args;
      if (!trailingTimerId) {
        trailingTimerId = setTimeout(() => {
          lastRan = Date.now();
          trailingTimerId = undefined;
          fn.apply(this, trailingArgs as Args);
        }, remaining);
      }
    }
  };
}
```

## Time Complexity

O(1) per call — a timestamp comparison and at most one `setTimeout`/
`clearTimeout`, independent of call volume.

## Space Complexity

O(1) — a fixed handful of scalar/reference variables held in closure,
regardless of how many times the throttled function is called.

## Common Mistakes

- Implementing only the leading edge (run immediately, then flag-lock
  for `intervalMs` and drop everything else) — this silently loses the
  *last* call in a burst, which is often the most important one (e.g.
  the final scroll position before the user stops scrolling).
- Scheduling a *new* trailing timer on every call instead of reusing the
  pending one — this causes `fn` to run far more often than once per
  interval, especially under rapid, continuous calls.
- Comparing against a re-computed "window start" instead of `lastRan` +
  `remaining` — using `setTimeout(fn, intervalMs)` naively for the
  trailing call (instead of the *remaining* time left in the current
  window) delays the trailing call longer than necessary.
- Confusing this with debounce — throttle guarantees periodic execution
  during continuous activity; debounce guarantees execution only after
  activity stops (see [debounce.md](debounce.md)).

## Interview Follow-up Questions

1. How would you make the leading and trailing behavior independently
   configurable (Lodash's `{ leading: true, trailing: false }` options)?
2. Why is `Date.now()` used here instead of relying purely on nested
   `setTimeout` calls to track elapsed time?
3. How would you unit test the timing behavior deterministically?
   (Expect: fake timers, and asserting call count/arguments at specific
   simulated timestamps.)
4. In a scroll-handler use case, would you throttle or debounce — and
   why might the answer differ for a "save draft as you type" feature
   versus an "infinite scroll load more" feature?

## Similar Questions

- [Implement Debounce](debounce.md)
- Implement a rate limiter (token bucket) for API calls
- Implement `requestAnimationFrame`-based throttling for scroll/resize
  handlers

---
[← Back to 61-javascript-coding](README.md)
