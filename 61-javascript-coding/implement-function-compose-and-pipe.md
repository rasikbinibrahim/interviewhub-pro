# QJS323 · Implement compose() and pipe()

**Difficulty:** Medium
**Companies Asked:** Meta, Apple, Netflix
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Functional Programming / Higher-Order Functions
**Concepts:** function composition, `reduce`/`reduceRight`, point-free style, unary chaining

## Problem Statement

Implement two utilities, `compose(...fns)` and `pipe(...fns)`, that combine
several single-input functions into one function. `compose` runs its
functions **right-to-left**: `compose(f, g, h)(x)` must behave exactly like
`f(g(h(x)))`. `pipe` runs its functions **left-to-right**: `pipe(f, g, h)(x)`
must behave exactly like `h(g(f(x)))`. Both return a new function that, when
called, threads a value through every supplied function in the correct order
and returns the final result. Do not use any composition utility from a
library (Redux's `compose`, lodash's `flow`/`flowRight`) — build the
mechanism yourself.

## Input

`fns`: a variable-length list of unary functions (each takes one value,
returns one value). The **first function that actually runs** (the rightmost
one for `compose`, the leftmost one for `pipe`) may be variadic and accept
more than one initial argument — every function after that receives exactly
one argument: the previous function's return value.

## Output

A new function. Calling it evaluates every function in `fns` in the required
order and returns the last function's result.

## Constraints

- `fns.length >= 0`. Calling `compose()` or `pipe()` with no functions must
  return the identity function.
- Every function except the first-applied one is strictly unary — it must
  only ever receive the single return value of the previous step.
- No use of a pre-built compose/pipe helper — implement the chaining logic
  yourself. Using `Array.prototype.reduce`/`reduceRight` to walk the
  function list is expected and fine — the question is testing composition
  order and argument threading, not `reduce` itself.

## Examples

| Input | Output | Why |
|---|---|---|
| `const double = x => x * 2; const increment = x => x + 1; compose(double, increment)(5)` | `12` | `compose` runs right-to-left: `increment` runs first (`5 → 6`), then `double` (`6 → 12`) — equivalent to `double(increment(5))` |
| `pipe(double, increment)(5)` | `11` | `pipe` runs left-to-right: `double` runs first (`5 → 10`), then `increment` (`10 → 11`) — equivalent to `increment(double(5))` |
| `compose()(42)` | `42` | With zero functions, both `compose` and `pipe` degrade to the identity function — the input passes through unchanged |

## Edge Cases

- Zero functions passed (`compose()`/`pipe()`) → returns the identity
  function; calling it returns its first argument unchanged.
- One function passed → behaves exactly like calling that function directly.
- A function in the chain throws → the error propagates immediately out of
  the composed call; functions later in the chain never run (fail fast, no
  swallowing).
- The first-applied function receives multiple arguments (e.g.
  `compose(double, sum)(2, 3)` where `sum = (a, b) => a + b`) → only that
  first-applied function may be variadic; everything after it is fed exactly
  one value.

## Hints

1. Both `compose` and `pipe` are really the same operation — "reduce over a
   list of functions, threading a value through each one" — with only the
   iteration direction differing. Which built-in walks an array from the
   last element to the first?
2. Because the *first-applied* function might take multiple arguments but
   every function after it only ever takes one (the previous result), try
   keeping the accumulator as a one-element array (`[value]`) and always
   computing the next accumulator as `[fn(...currentArray)]` — that lets the
   very first step spread multiple initial arguments while every later step
   naturally collapses to a single value.
3. `reduceRight` visits the array from the last element to the first —
   that's "rightmost function runs first," which is exactly `compose`.
   `reduce` visits first-to-last — that's `pipe`. The reducer function
   itself can be identical for both; only which built-in you call differs.

## Algorithm

**Pattern:** `reduce`/`reduceRight` over an array of functions, threading a
value through a call chain.
**Core insight:** represent "the value currently flowing through the chain"
as a one-element array. The reducer for both `compose` and `pipe` is the
same: `(accumulatedArgs, fn) => [fn(...accumulatedArgs)]`. Starting the
accumulator as the raw `args` array (not `[args]`) lets the very first
function spread multiple initial arguments; from the second step onward the
accumulator is always exactly one element, so every subsequent function
correctly receives just one value. `compose` walks `fns` with `reduceRight`
(last element in the array runs first, i.e. rightmost); `pipe` walks it with
`reduce` (first element runs first, i.e. leftmost). Unwrapping `[0]` at the
end returns the final scalar result instead of a one-element array.
**Invariant:** after each step of the reduction, the accumulator holds
exactly the single value the next function in the chain is supposed to
receive.

## Dry Run

**Input:** `f = x => x + 1`, `g = x => x * 2`, `h = x => x - 3`

**`compose(f, g, h)(5)`** — `reduceRight` over `[f, g, h]`, so `h` runs
first, then `g`, then `f`:

| Step | Function applied | accumulator (before) | accumulator (after) |
|---|---|---|---|
| 1 | `h` (rightmost, runs first) | `[5]` | `[h(5)] = [2]` |
| 2 | `g` | `[2]` | `[g(2)] = [4]` |
| 3 | `f` (leftmost, runs last) | `[4]` | `[f(4)] = [5]` |

**Result:** `5` — matches `f(g(h(5))) = f(g(2)) = f(4) = 5`.

**`pipe(f, g, h)(5)`** — `reduce` over `[f, g, h]`, so `f` runs first, then
`g`, then `h`:

| Step | Function applied | accumulator (before) | accumulator (after) |
|---|---|---|---|
| 1 | `f` (leftmost, runs first) | `[5]` | `[f(5)] = [6]` |
| 2 | `g` | `[6]` | `[g(6)] = [12]` |
| 3 | `h` (rightmost, runs last) | `[12]` | `[h(12)] = [9]` |

**Result:** `9` — matches `h(g(f(5))) = h(g(6)) = h(12) = 9`.

## JavaScript Solution

```js
function compose(...fns) {
  return function composed(...args) {
    // The accumulator starts as the raw call arguments so the FIRST
    // function to run (the last one in `fns`, since compose is
    // right-to-left) can be variadic. Every step after that wraps its
    // single result back into a one-element array for the next function.
    return fns.reduceRight((accumulatedArgs, fn) => [fn(...accumulatedArgs)], args)[0];
  };
}

function pipe(...fns) {
  return function piped(...args) {
    // Identical accumulator trick as compose, but walked left-to-right —
    // the FIRST function in `fns` is the one that may be variadic here.
    return fns.reduce((accumulatedArgs, fn) => [fn(...accumulatedArgs)], args)[0];
  };
}
```

## TypeScript Solution

Full type inference for an arbitrary-length chain requires heavy recursive
tuple types; the pragmatic, strict-mode-clean approach used in real
codebases is to provide fully-typed overloads for the common 2–3 function
chains, backed by a runtime implementation typed against `unknown`. The
typed overloads intentionally restrict every function (including the first)
to a single argument — full type safety for a multi-argument first call
isn't expressible without sacrificing readability, which is a fair trade-off
to call out explicitly in an interview.

```ts
type UnaryFn<T, R> = (arg: T) => R;

function compose<A, B, C>(f: UnaryFn<B, C>, g: UnaryFn<A, B>): UnaryFn<A, C>;
function compose<A, B, C, D>(
  f: UnaryFn<C, D>,
  g: UnaryFn<B, C>,
  h: UnaryFn<A, B>,
): UnaryFn<A, D>;
function compose(...fns: UnaryFn<unknown, unknown>[]): UnaryFn<unknown, unknown> {
  return (arg: unknown): unknown => fns.reduceRight((value, fn) => fn(value), arg);
}

function pipe<A, B, C>(f: UnaryFn<A, B>, g: UnaryFn<B, C>): UnaryFn<A, C>;
function pipe<A, B, C, D>(
  f: UnaryFn<A, B>,
  g: UnaryFn<B, C>,
  h: UnaryFn<C, D>,
): UnaryFn<A, D>;
function pipe(...fns: UnaryFn<unknown, unknown>[]): UnaryFn<unknown, unknown> {
  return (arg: unknown): unknown => fns.reduce((value, fn) => fn(value), arg);
}
```

## Time Complexity

O(n), where n is the number of functions passed to `compose`/`pipe` — each
one is called exactly once, and `reduce`/`reduceRight` are single linear
passes over the function list. (This treats each individual function as an
O(1) black box; their own internal cost is additive on top.)

## Space Complexity

O(1) additional space beyond the input function list — `reduce`/`reduceRight`
run iteratively, not recursively, so there's no call-stack growth
proportional to `n`, and the one-element accumulator array is replaced (not
accumulated) at each step.

## Common Mistakes

- Swapping `reduce` and `reduceRight` between `compose` and `pipe` — this
  silently reverses the execution order and is the single most common bug
  for this exact question, since both directions "type-check" and only
  produce different output for a chain of 2+ functions.
- Forgetting the zero-function case — `compose()`/`pipe()` should degrade to
  the identity function, not throw or return `undefined`.
- Letting every function in the chain accept multiple arguments — only the
  first-applied function realistically can, since every function after it
  is only ever handed one value: the previous step's single return value.
- Assuming `compose`/`pipe` must be recursive — the iterative `reduce`
  formulation is simpler, avoids stack growth for long chains, and is the
  version most interviewers expect.

## Interview Follow-up Questions

1. How would you make `compose`/`pipe` async-aware, so a function in the
   chain can return a `Promise` and the next function still receives the
   resolved value?
2. Can you implement `pipe` purely in terms of `compose` (or vice versa)
   without duplicating the reduce logic?
3. Redux's own `compose` utility is structurally identical to this — why is
   function composition a natural fit for chaining middleware?
4. How would you extend the TypeScript overloads to preserve full type
   inference for a chain of arbitrary length instead of just 2–3 functions?
5. What would change if a function in the chain needed to preserve `this`
   (e.g. an object method passed in unbound)?

## Similar Questions

- Implement an async-aware `pipe` for a chain of `Promise`-returning steps
- Implement a Redux-style `applyMiddleware`/`compose` for middleware chaining
- [Implement curry() with Placeholder Support](implement-curry-with-placeholder-support.md)

---
[← Back to 61-javascript-coding](README.md)
