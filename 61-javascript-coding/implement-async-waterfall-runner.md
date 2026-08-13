# QADVJS070 · Implement an Async Waterfall Runner

**Difficulty:** Medium
**Companies Asked:** Google, Meta, Amazon, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Promises / Async Control Flow
**Concepts:** sequential async composition, promise chaining via `reduce`, fail-fast propagation, pipeline pattern

## Problem Statement

Implement `waterfall(taskFns, initialValue)`. Given an array of
functions that each take one value and return a `Promise` of the next
value — `taskFns: Array<(input: unknown) => Promise<unknown>>` — run
them **strictly in sequence**, where each function receives the
*resolved* result of the previous one as its single argument (the first
function receives `initialValue`). Return a `Promise` that resolves
with the final function's resolved result. This is the "waterfall" or
"pipeline" pattern: unlike `Promise.all`/a concurrency-limited runner,
nothing here runs concurrently — each step is a hard dependency of the
next, by design (e.g. "fetch user" → "fetch that user's permissions" →
"filter permissions by feature flag").

## Input

- `taskFns`: an array of length `n`, where each element is a function
  `(previousResult: unknown) => Promise<unknown>` (or a value —
  synchronous return values should also be supported, treated as
  already-resolved).
- `initialValue`: the value passed to `taskFns[0]`.

## Output

A single `Promise` that resolves with `taskFns[n-1]`'s resolved return
value (the *last* step's result — waterfall is not `Promise.all`; there
is no array of every step's output, only the final one, since each
intermediate value exists only to feed the next step). If `n === 0`,
resolves immediately with `initialValue` unchanged (nothing to run).

## Constraints

- Steps must run strictly one after another — step `i+1` must not start
  until step `i`'s promise has resolved.
- If any step rejects, the whole waterfall must reject immediately with
  that reason, and no subsequent step should run.
- Each step receives exactly one argument: the previous step's resolved
  value (or `initialValue` for the first step).
- Must not use the real `Promise.all`/`Promise.race` internally — this
  is fundamentally a sequential fold, not a coordination primitive.

## Examples

| Input | Behavior | Why |
|---|---|---|
| `waterfall([addOne, double, toString], 3)` where `addOne(x) => x+1`, `double(x) => x*2`, `toString(x) => String(x)` | Resolves to `"8"` | `3 → 4 (addOne) → 8 (double) → "8" (toString)`, each step fed the previous one's output |
| `waterfall([fetchUser, fetchPermissions], userId)` | Resolves to that user's permissions object | `fetchUser(userId)` resolves to a user object, which becomes the *only* argument to `fetchPermissions` |
| `waterfall([stepA, stepB_thatRejects, stepC], initial)` | Rejects with `stepB`'s rejection reason; `stepC` never runs | Fail-fast — sequential steps stop the moment one fails, since later steps assume the earlier ones succeeded |
| `waterfall([], initial)` | Resolves immediately to `initial` | No steps to run — the input passes through unchanged |

## Edge Cases

- `taskFns = []` → resolves to `initialValue` itself, unchanged.
- A single-element `taskFns` → equivalent to just calling
  `Promise.resolve(taskFns[0](initialValue))`.
- A step returns a plain (non-promise) value instead of a `Promise` →
  must still work; the next step receives that resolved value exactly
  as if it had gone through `Promise.resolve()`.
- A step throws synchronously instead of returning a rejected promise →
  must be caught and treated as that step's rejection, propagating the
  same as an async rejection would.
- `initialValue` is itself `undefined` → the first step must still run
  and receive `undefined`, not be skipped.

## Hints

1. This is structurally a **fold/reduce** over the task array, where
   the "accumulator" is a `Promise` (starting as
   `Promise.resolve(initialValue)`) and each step is `.then`-chained
   onto the accumulator from the previous iteration — what built-in
   array method directly expresses "start with a seed value and
   combine it with each element in turn"?
2. Each iteration's `.then` callback needs to *call the next step* with
   the value `.then` hands it — `accumulatorPromise.then(currentValue
   => taskFns[i](currentValue))`, then that returned promise becomes
   the new accumulator for the next iteration.
3. You don't need any manual error-handling branches for the fail-fast
   behavior — a single rejection anywhere in a `.then` chain
   automatically skips every subsequent `.then` and propagates straight
   to the final rejection, which is exactly the semantics `Array.prototype.reduce`
   building up one continuous `.then` chain gives you for free.

## Algorithm

**Pattern:** sequential promise chaining via a left fold (`reduce`).
**Core insight:** "run these steps one after another, each fed by the
previous" is precisely what chaining `.then` calls already does natively
— `waterfall` doesn't need to manually track "has the previous step
finished yet," because a `.then` callback is *guaranteed* not to run
until the promise it's attached to has settled. Building the chain with
`reduce` — starting the accumulator at `Promise.resolve(initialValue)`
and, for each `taskFn`, replacing the accumulator with
`accumulator.then(taskFn)` — produces exactly one linear chain of `n`
`.then` calls. Because a promise chain's rejection short-circuits every
remaining unattached `.then` (they simply never run, and the rejection
falls through to the final `.catch`/rejection), fail-fast behavior is
inherited automatically rather than requiring separate logic.
**Invariant:** at the moment step `i` begins running, every step before
it has already resolved, and step `i` receives exactly step `i-1`'s
resolved value (or `initialValue` when `i = 0`).

## Dry Run

**Input:** `waterfall([addOne, double, toString], 3)`.

| Step | taskFn | Input received | Output (resolves to) | Chain so far |
|---|---|---|---|---|
| seed | — | — | — | `Promise.resolve(3)` |
| 1 | `addOne` | `3` | `4` | `Promise.resolve(3).then(addOne)` → resolves to `4` |
| 2 | `double` | `4` | `8` | `...then(double)` → resolves to `8` |
| 3 | `toString` | `8` | `"8"` | `...then(toString)` → resolves to `"8"` |

**Result:** the final chain resolves to `"8"`, which is what
`waterfall` returns. Each step only ever saw the immediately-previous
step's output — `toString` never saw `3` or `4` directly, only `8`.

## JavaScript Solution

```js
function waterfall(taskFns, initialValue) {
  // Fold the task list into one continuous .then chain, seeded with
  // initialValue. Each taskFn is chained directly as a .then handler,
  // so it automatically receives the previous step's resolved value.
  return taskFns.reduce(
    (accumulatorPromise, taskFn) => accumulatorPromise.then(taskFn),
    Promise.resolve(initialValue),
  );
}
```

## TypeScript Solution

```ts
type WaterfallStep<T> = (input: T) => T | Promise<T>;

function waterfall<T>(
  taskFns: Array<WaterfallStep<T>>,
  initialValue: T,
): Promise<T> {
  return taskFns.reduce<Promise<T>>(
    (accumulatorPromise, taskFn) => accumulatorPromise.then(taskFn),
    Promise.resolve(initialValue),
  );
}
```

## Time Complexity

O(n) — one `.then` attachment per task function, and the chain runs
each step exactly once; total work is linear in the number of steps
(the *duration* of each async step doesn't factor into the complexity
analysis, only the count of operations).

## Space Complexity

O(n) — `reduce` builds one promise object per step in the chain, all of
which must be retained (via internal `.then` linkage) until the chain
resolves.

## Common Mistakes

- Using `Promise.all(taskFns.map(fn => fn(initialValue)))` — this is
  wrong on two counts: it runs every step *concurrently* instead of
  sequentially, and every step receives the same `initialValue` instead
  of the previous step's output — waterfall's entire point is the
  dependency chain between steps.
- Writing a manual recursive/`async` loop that re-implements what
  `reduce` + `.then` already gives for free — not wrong, but a strong
  interview signal is recognizing that this problem *is* a fold over
  promises, rather than reaching immediately for an imperative loop
  with manual index tracking.
- Forgetting that a step might return a plain value instead of a
  promise — calling `.then` directly on whatever a step returns without
  it being wrapped in `Promise.resolve` first would still technically
  work here (`.then` on the outer promise handles this automatically
  because `.then`'s return value is always normalized into the chain by
  the Promise spec), but candidates sometimes second-guess this and add
  unnecessary manual `Promise.resolve()` wrapping — worth explaining
  why it's already safe.
- Not handling the empty-array case explicitly and assuming it "just
  works" without checking — it does work correctly here (`reduce` with
  an empty array simply returns the seed unchanged), but candidates
  should be able to explain *why*, not just assume it.
- Swallowing a step's synchronous throw by not routing it through the
  promise chain — since each step is called as a `.then` handler here,
  a synchronous throw inside `taskFn` is automatically converted into a
  rejection of that `.then`'s promise, which is correct, but a
  candidate reimplementing this with a hand-rolled loop and manual
  `await` inside a `try/catch` per step must remember to add that
  handling explicitly.

## Interview Follow-up Questions

1. How would you implement this with `async`/`await` and a `for` loop
   instead of `reduce` — what would the two approaches look like side
   by side, and is one meaningfully better?
2. How would you add a way to short-circuit early with a *successful*
   result (not an error) — e.g. a step signaling "we're done, skip the
   rest" the way `async.waterfall`'s Node-style callback API supports?
3. How does `waterfall` differ from `compose`/`pipe` (functional
   composition of synchronous functions) — what does adding
   asynchrony actually change structurally?
4. How would you add per-step timeout support, so a single hung step
   doesn't block the pipeline forever?
5. Would you ever want *partial* results from a waterfall — e.g. all
   intermediate values, not just the final one — and how would you
   change the return shape to support that without changing each
   step's own signature?

## Similar Questions

- [Implement Promise.all (Polyfill)](promise-all-polyfill.md) — the
  concurrent counterpart; contrast fail-fast-but-parallel vs.
  fail-fast-and-sequential
- [Implement an Async Task Runner with a Concurrency Limit](implement-async-task-runner-with-concurrency-limit.md)
- Implement `compose`/`pipe` for synchronous functions
- [Implement a Promise Retry Utility with Exponential Backoff](implement-promise-retry-with-exponential-backoff.md)

---
[← Back to 61-javascript-coding](README.md)
