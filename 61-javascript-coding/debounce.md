# Q501 · Implement Debounce

**Difficulty:** Easy
**Companies Asked:** Google, Amazon, Microsoft, Uber, Adobe, Atlassian, Flipkart, Swiggy
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Async Control Flow / Higher-Order Functions
**Concepts:** closures, `setTimeout`/`clearTimeout`, higher-order functions, `this` preservation

## Problem Statement

Implement a `debounce(fn, delayMs)` utility. It should return a new
function that, every time it's called, cancels any previously scheduled
call to `fn` and schedules a new one for `delayMs` milliseconds later.
`fn` should only actually run once the returned function stops being
called for a full `delayMs` — the classic use case is a search input
that shouldn't fire an API request on every keystroke, only once the
user pauses typing.

## Input

- `fn`: the function to debounce (any arity, may use `this`)
- `delayMs`: a number, milliseconds to wait after the last call before
  running `fn`

## Output

A new function with the same call signature as `fn`. Calling it doesn't
run `fn` synchronously — it (re)schedules `fn` to run after `delayMs` of
silence.

## Constraints

- Must correctly preserve `this` and all arguments from the *most
  recent* call when `fn` finally runs.
- Must cancel any pending scheduled call whenever the debounced function
  is called again before the delay elapses.
- `delayMs >= 0`.
- No external libraries — implement with only `setTimeout`/`clearTimeout`.

## Examples

| Scenario | Behavior |
|---|---|
| `debounce(log, 300)` called 3 times within 100ms of each other | `log` runs exactly once, ~300ms after the *third* (last) call, with that call's arguments |
| Debounced function called once, then never again | `fn` runs once, `delayMs` after that single call |
| Debounced function called, then called again after `delayMs` has already elapsed | `fn` runs twice — once for each call, since the gap exceeds the delay |

## Edge Cases

- Rapid-fire calls (e.g. every 10ms) for far longer than `delayMs` → `fn`
  never runs until the calls actually stop, no matter how long that
  takes (this is a real, intentional property of debounce — not a bug).
- `delayMs = 0` → still goes through `setTimeout(fn, 0)`, i.e. still
  asynchronous (next tick), never synchronous.
- `fn` called with different `this` contexts across calls (e.g. as an
  object method vs. detached) → only the `this` from the *last* call
  before the timer fires should be used, since earlier calls are
  effectively cancelled.
- Debounced function used as an object method (`this` must resolve to
  the object at call time, not be lost through the wrapper).

## Hints

1. The wrapper function needs to remember one thing across calls: the
   ID of the currently pending timer, if any — where would that state
   need to live so it survives between separate invocations of the
   returned function?
2. Every call should start by cancelling whatever timer is currently
   pending, *then* schedule a fresh one — that's the entire cancel-and-
   reschedule behavior.
3. To preserve `this` and forward all arguments correctly, the inner
   call to `fn` needs `fn.apply(this, args)` (or an arrow function
   closing over `arguments`/rest params) — not a plain `fn(...args)`,
   which would lose whatever `this` the wrapper itself was called with.

## Algorithm

**Pattern:** closures + higher-order function wrapping `setTimeout`.
**Core insight:** debouncing is "cancel the previous pending call, then
schedule a new one" — a single `timerId` variable, captured by closure
inside the returned function, is exactly enough state to always know
whether there's a call to cancel. Because the closure persists across
every invocation of the wrapped function (it's the same closure, not a
fresh one per call), `timerId` correctly accumulates across calls
instead of resetting.
**Invariant:** at most one `setTimeout` is ever pending at a time — every
call either clears an existing timer before scheduling a new one, or
(on the first call) has nothing to clear.

## Dry Run

**Input:** `const debounced = debounce(fn, 300)`, then `debounced('a')`
at t=0ms, `debounced('b')` at t=100ms, then silence.

| Call | t (ms) | timerId before | Action | timerId after |
|---|---|---|---|---|
| `debounced('a')` | 0 | `undefined` | nothing to clear; schedule `fn('a')` for t=300 | timer A (fires t=300) |
| `debounced('b')` | 100 | timer A | `clearTimeout(timer A)` — cancelled before it could fire; schedule `fn('b')` for t=400 | timer B (fires t=400) |
| — silence — | 400 | timer B | timer B fires → `fn('b')` runs | — |

**Result:** `fn` runs exactly once, with `'b'`, at t=400ms. The call with
`'a'` never runs — it was cancelled at t=100ms, 200ms before it would
have fired.

## JavaScript Solution

```js
function debounce(fn, delayMs) {
  let timerId; // holds the pending timer, shared across every call via closure

  return function debounced(...args) {
    // Cancel whatever call is currently scheduled — only the most
    // recent call should ever actually run.
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(this, args); // preserve the caller's `this` and arguments
    }, delayMs);
  };
}
```

## TypeScript Solution

```ts
function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delayMs: number,
): (...args: Args) => void {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  return function debounced(this: unknown, ...args: Args): void {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delayMs);
  };
}
```

## Time Complexity

O(1) per call — each invocation does one `clearTimeout` and one
`setTimeout`, independent of how many times the debounced function has
been called before.

## Space Complexity

O(1) — one `timerId` and, at any moment, at most one pending closure over
one set of arguments, regardless of call volume.

## Common Mistakes

- Declaring `timerId` *inside* the returned function instead of in the
  outer closure — this resets it to `undefined` on every call, so
  `clearTimeout` never actually cancels anything and every call schedules
  an independent timer, defeating the entire point of debouncing.
- Using a regular `function` for the inner `setTimeout` callback instead
  of an arrow function (or explicit `.apply(this, ...)`) — a regular
  function creates its own `this`, silently breaking method calls like
  `debounce(obj.method, 300)`.
- Forgetting to forward `args` at all and calling `fn()` with no
  arguments — the debounced call must carry the *last* call's arguments
  through to the delayed execution.
- Confusing debounce with throttle (see [throttle.md](throttle.md)) —
  debounce waits for silence before running once; it does not guarantee
  `fn` runs at a regular interval during continuous activity.

## Interview Follow-up Questions

1. How would you add a `leading` option so `fn` can optionally run
   immediately on the *first* call, in addition to (or instead of) the
   trailing call?
2. How would you add a `cancel()` method to the returned function so a
   caller can explicitly cancel a pending call without waiting for it to
   fire?
3. How would you unit test this without waiting real wall-clock time?
   (Expect: `vi.useFakeTimers()` / `jest.useFakeTimers()` +
   `advanceTimersByTime`.)
4. What's the difference in behavior and use case between this and
   throttle — when would you reach for one over the other?

## Similar Questions

- [Implement Throttle](throttle.md)
- Implement `useDebounce` (React hook version — see
  [63-react-coding/use-debounce-hook.md](../63-react-coding/use-debounce-hook.md))
- Implement `debounce` with a `cancel`/`flush` API (Lodash-style)

---
[← Back to 61-javascript-coding](README.md)
