# Q519 · Implement a once() Function

**Difficulty:** Easy
**Companies Asked:** Google, Amazon, Microsoft, Airbnb
**Interview Frequency:** ★★★☆☆
**Category:** JavaScript → Function Utilities / Closures
**Concepts:** closures, memoized single execution, argument-invariant caching

## Problem Statement

Implement `once(fn)`, a higher-order function that wraps `fn` so it can
only ever actually execute one time. Calling the wrapped function
repeatedly must invoke `fn` on the very first call only; every call
after that must return the cached result from that first call, without
re-running `fn` — even if the later calls pass different arguments.

## Input

`fn`: any function, taking zero or more arguments and returning any
value.

## Output

A new function `wrapped` with the same call signature as `fn`. Calling
`wrapped(...args)`:
- on the first call, invokes `fn(...args)`, caches the outcome, and
  returns it
- on every subsequent call, ignores `args` entirely and returns the
  cached outcome from the first call, without invoking `fn` again

## Constraints

- `fn` may return any value, including `undefined`, `null`, or `0` —
  the cache must distinguish "not called yet" from "called and returned
  a falsy value," since a naive falsy-check would re-invoke `fn` forever
  if it legitimately returns `0` or `undefined`.
- Arguments passed on calls after the first must have no effect on the
  result — they are silently ignored.
- If `fn` throws on its first call, that counts as "the one call" —
  `wrapped` must not silently swallow the error, and must not retry
  `fn` on a later call; it should consistently rethrow the same error
  every time after that.
- `wrapped` must work correctly no matter how many times it's called,
  including zero times (in which case `fn` never runs at all).

## Examples

| Setup | Calls | Result | Why |
|---|---|---|---|
| `let calls = 0; const init = once(() => { calls++; return 'initialized'; });` | `init(); init(); init();` | `calls === 1`, all three calls return `'initialized'` | `fn` body only runs on the first call; the next two just replay the cached result |
| `const getId = once((prefix) => `${prefix}-1`); ` | `getId('user'); getId('order');` | Both calls return `'user-1'` | The second call's different argument (`'order'`) is ignored — the cached result from the first call always wins |
| `const getZero = once(() => 0);` | `getZero(); getZero();` | Both calls return `0`, `fn` runs exactly once | Confirms the cache correctly stores a falsy value instead of mistaking "cached `0`" for "not yet called" |

## Edge Cases

- `fn` returns a falsy value (`0`, `''`, `false`, `null`, `undefined`) →
  must still be cached and replayed correctly; a check like `if
  (!cachedResult)` to decide "has this run before" is wrong for exactly
  this reason.
- `fn` throws on its first call → the thrown error is itself the cached
  outcome; every subsequent call must rethrow that same error rather
  than silently returning `undefined` or re-attempting `fn`.
- `wrapped` is never called → `fn` never executes, and no error occurs
  from that.
- `wrapped` is called with different arguments on different calls →
  only the arguments from the *first* call are ever actually used.

## Hints

1. You need a closure-scoped flag that tracks "has `fn` already run,"
   separate from tracking *what* it returned — the two are different
   pieces of state.
2. Don't use "is the cached value falsy?" as your "has it run" check —
   what boolean flag, initialized to `false` and flipped to `true`
   inside the wrapped function, avoids that trap entirely?
3. To handle a first call that throws, wrap the call to `fn` in
   `try`/`catch`: on the `catch` path, still mark "has run" as `true`
   and cache the error itself, so replays on later calls can rethrow it
   deterministically instead of trying `fn` again.

## Algorithm

**Pattern:** closure-based memoization with an explicit "already ran"
flag.
**Core insight:** `once` needs to distinguish "hasn't run yet" from "ran
and produced a falsy/undefined result," which rules out using the
cached value's truthiness as the guard — an explicit boolean (`called`)
captured in the closure is the only reliable signal. Once `called`
becomes `true`, every future invocation short-circuits straight to the
cached outcome without touching `fn` again.
**Invariant:** at most one call to `fn` ever happens across the
lifetime of `wrapped`; after that call (successful or throwing),
`called` is permanently `true` and the cached outcome (a value or an
error) is permanently fixed.

## Dry Run

**Input:**
```js
let sideEffects = 0;
const setup = once((label) => {
  sideEffects += 1;
  return `${label}-configured`;
});

setup('db');
setup('cache');
```

| Step | Call | `called` (before) | What happens | `called` (after) | Returned |
|---|---|---|---|---|---|
| 1 | `setup('db')` | `false` | Not called yet → invoke `fn('db')`, `sideEffects` becomes `1`, cache `result = 'db-configured'`, set `called = true` | `true` | `'db-configured'` |
| 2 | `setup('cache')` | `true` | Already called → `fn` is *not* invoked (argument `'cache'` is ignored entirely); return cached `result` | `true` | `'db-configured'` |

**Result:** `sideEffects` ends at `1`, and both calls return
`'db-configured'` — the second call's argument had zero effect, exactly
as specified.

## JavaScript Solution

```js
function once(fn) {
  let called = false;   // has fn run yet? (separate from what it returned)
  let result;            // cached return value, if fn resolved normally
  let error;              // cached thrown error, if fn's first call threw
  let didThrow = false;    // did that first call throw, specifically?

  return function (...args) {
    if (!called) {
      called = true; // mark "used up" before running, so a throw still counts
      try {
        result = fn.apply(this, args);
      } catch (caughtError) {
        didThrow = true;
        error = caughtError;
      }
    }

    if (didThrow) {
      throw error; // replay the same failure on every later call
    }

    return result;
  };
}
```

## TypeScript Solution

```ts
function once<Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
): (...args: Args) => Return {
  let called = false;
  let result: Return;
  let error: unknown;
  let didThrow = false;

  return function (this: unknown, ...args: Args): Return {
    if (!called) {
      called = true;
      try {
        result = fn.apply(this, args);
      } catch (caughtError: unknown) {
        didThrow = true;
        error = caughtError;
      }
    }

    if (didThrow) {
      throw error;
    }

    return result;
  };
}
```

## Time Complexity

O(1) for every call after the first (a boolean check plus a return);
the first call costs whatever `fn` itself costs, since that's the one
real invocation.

## Space Complexity

O(1) additional space — a fixed handful of closure variables (`called`,
`result`, `error`, `didThrow`), regardless of how many times `wrapped`
is called or what `fn` returns (beyond the space needed to hold one
copy of the cached result itself).

## Common Mistakes

- Using `if (!result)` (or similar truthiness check) as the "has this
  run" guard instead of an explicit boolean — silently breaks the
  moment `fn` legitimately returns `0`, `''`, `false`, or `undefined`,
  causing `fn` to be re-invoked on every subsequent call.
- Forgetting to forward `this` via `fn.apply(this, args)` — if `fn` is
  meant to be used as a method (e.g. `obj.init = once(function () {
  this.ready = true; })`), losing `this` silently breaks that usage.
- Swallowing a first-call exception (`catch (e) { return undefined; }`)
  instead of re-throwing it — this hides real errors from the caller
  and makes `once`-wrapped initialization code fail silently.
- Re-running `fn` on a later call just because the *previous* call
  threw — real `once` semantics treat the throwing call as the one
  permitted execution, not as "it didn't count, try again."

## Interview Follow-up Questions

1. How would you extend `once` to allow resetting it — i.e. a way to
   force `fn` to be callable again?
2. How does `once` relate to memoization in general — what would you
   need to add to turn this into a full memoize that caches per unique
   argument set instead of caching a single result forever?
3. Why does marking `called = true` *before* invoking `fn` (rather than
   after) matter for correctness, especially if `fn` were asynchronous
   or recursive?
4. Where have you seen `once` semantics show up in real frontend code
   (e.g. one-time app initialization, a "submit" handler that shouldn't
   double-fire)?

## Similar Questions

- [Implement `Function.prototype.bind` (Polyfill)](function-bind-polyfill.md)
- Implement a `memoize` function (per-argument caching, not single-call caching)
- Implement a `debounce` function ([Q501](debounce.md)) — also wraps a
  function's execution, but controls *timing* rather than call count

---
[← Back to 61-javascript-coding](README.md)
