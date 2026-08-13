# QADVJS058 · Implement curry() with Placeholder Support

**Difficulty:** Hard
**Companies Asked:** Google, Meta, Amazon, Uber
**Interview Frequency:** ★★★☆☆
**Category:** JavaScript → Functional Programming / Currying
**Concepts:** currying, partial application, `fn.length` arity detection, placeholder/gap-filling argument merge

## Problem Statement

Implement `curry(fn)`, which turns a function of fixed arity into a function
that can be called with its arguments spread across multiple invocations,
one argument at a time or several at once, until all arguments have been
supplied — at which point `fn` actually runs. In addition to standard
currying, support a **placeholder** value (exposed as `curry.placeholder`)
that can be passed in place of an argument to explicitly "skip" that
position and fill it on a later call — letting a caller fix a *later*
argument first while deferring an earlier one. For example, given
`const add3 = curry((a, b, c) => a + b + c)`, all of these must work:
`add3(1)(2)(3)`, `add3(1, 2)(3)`, `add3(1, 2, 3)`, and, with placeholders,
`add3(curry.placeholder, 2, 3)(1)` — which fixes `b` and `c` immediately but
defers `a` to the next call.

## Input

- `fn`: a function with a fixed, statically-known number of declared
  parameters (its arity, via `fn.length`).
- Subsequent calls to the curried function: any number of arguments, where
  any individual argument may be `curry.placeholder` to mean "leave this
  position open, fill it later."

## Output

A function that, when it has collected enough real (non-placeholder)
values to fill every parameter position, calls `fn` with those values and
returns `fn`'s result. Until then, it returns another function with the same
collect-more-arguments behavior.

## Constraints

- Arity is determined from `fn.length` (the number of parameters `fn`
  declares before any rest parameter or default-valued parameter — this
  problem assumes a simple fixed-arity `fn` for that reason).
- `curry.placeholder` must be a unique sentinel value that cannot collide
  with a legitimate argument a caller might pass (a plain string like
  `'_'` is not safe enough — a real argument could be that exact string).
- Placeholders are filled **in the order they appear**, left to right, by
  the next batch of real values supplied.
- Arguments beyond the ones needed to fill every position are extra and are
  simply not used by `fn` (mirrors how calling a JS function with more
  arguments than declared parameters silently ignores the extras).

## Examples

| Input | Output | Why |
|---|---|---|
| `const add3 = curry((a, b, c) => a + b + c); add3(1)(2)(3)` | `6` | Standard one-argument-at-a-time currying — no placeholders involved |
| `add3(curry.placeholder, 2, 3)(1)` | `6` | The first call fixes `b = 2` and `c = 3` immediately, but leaves `a`'s position as a placeholder; the second call supplies `1`, which fills that open placeholder slot |
| `add3(1, curry.placeholder, 3)(2)` | `6` | The placeholder can be in the *middle* — `a = 1` and `c = 3` are fixed up front, `b` is deferred and filled by the next call's `2` |

## Edge Cases

- Multiple placeholders in one call, e.g. `add3(curry.placeholder,
  curry.placeholder, 3)(1, 2)` → placeholders are filled left to right by
  the next batch, in order: first placeholder gets `1`, second gets `2` →
  `6`.
- A placeholder that's never filled → the curried function just keeps
  returning another function forever; `fn` never runs. This is expected,
  not an error state.
- Calling with more real arguments than remaining open positions → the
  extras are appended and simply ignored once `fn` actually runs (`fn`
  only reads its own declared parameters).
- Calling the fully-curried function with zero arguments (`add3(1,2,3)()`)
  → since no new values are added, nothing changes; it returns yet another
  waiting function (there's nothing to fill, and no placeholder to
  resolve) — a real edge case worth naming explicitly, since it's easy to
  assume any call attempts invocation.

## Hints

1. You need to know how many total arguments `fn` expects before you can
   decide "do I have enough yet?" — what property on a function object
   tells you its declared parameter count without calling it?
2. A placeholder needs to be reliably distinguishable from every possible
   real argument value, including `undefined` — what kind of JS value is
   guaranteed unique and can't be accidentally produced by normal code?
   (Think `Symbol`.)
3. When a new batch of arguments comes in, walk the *already-collected*
   arguments in order; every time you hit an open placeholder slot,
   consume the next value from the new batch to fill it. Any values left
   over in the new batch after every placeholder is filled get appended
   to the end of the collected list.

## Algorithm

**Pattern:** recursive partial application with an arity counter and a
gap-filling merge step.
**Core insight:** curried behavior is "keep collecting arguments across
calls until you have at least `fn.length` of them, with none of the first
`fn.length` slots still being a placeholder — then invoke `fn`." The
placeholder twist only changes how a **new batch merges into the existing
collected list**: instead of always appending new arguments to the end,
walk the existing collected arguments left to right, and every time an
existing slot holds the placeholder sentinel, replace it with the *next*
value from the incoming batch instead of appending. Only once every
placeholder slot has been consumed does the merge fall back to appending
any remaining new values past the current length. This single merge
function is reused on every call, so placeholders introduced at any step
can be resolved by any later step.
**Arity check:** on every call, after merging, check two things: (1) is
`collected.length >= fn.length`? and (2) do any of the first `fn.length`
slots still hold the placeholder sentinel? `fn` only runs when (1) is true
*and* (2) is false — having "enough" arguments by count isn't sufficient if
one of them is still an unresolved placeholder.
**Invariant:** at the start of every call, `collected` holds exactly the
arguments (real values and/or unresolved placeholders) accumulated across
every prior call, in their final relative order.

## Dry Run

**Input:** `const add3 = curry((a, b, c) => a + b + c); add3(_, 2, 3)(1)`
(using `_` as shorthand for `curry.placeholder`)

| Step | Call | `collected` (before) | Check: enough args? / has placeholder in first 3? | Result |
|---|---|---|---|---|
| 1 | `add3(_, 2, 3)` | `[]` (first call, nothing collected yet) | merge `[]` with `[_, 2, 3]` → nothing to fill (collected is empty), so all three simply append → `[_, 2, 3]` | length `3 >= 3` ✓, but slot 0 is `_` ✗ → **not enough**, return a new waiting function |
| 2 | `(1)` — calling the function step 1 returned | `[_, 2, 3]` | merge `[_, 2, 3]` with `[1]`: walk existing slots — slot 0 is `_`, consume next batch value `1` → slot 0 becomes `1`; no more batch values left → `[1, 2, 3]` | length `3 >= 3` ✓, no placeholder in first 3 ✓ → **enough** — call `add3Fn(1, 2, 3)` |

**Result:** `1 + 2 + 3 = 6` — matches `add3(_, 2, 3)(1) === 6`.

## JavaScript Solution

```js
function curry(fn) {
  const arity = fn.length; // captured once, from the ORIGINAL function

  function curried(...args) {
    const hasEnoughArgs = args.length >= arity;
    const stillHasOpenPlaceholder = args
      .slice(0, arity) // only the slots that actually matter for invocation
      .includes(curry.placeholder);

    if (hasEnoughArgs && !stillHasOpenPlaceholder) {
      return fn(...args);
    }

    // Not ready yet — return a function that merges the next batch of
    // arguments into what's already been collected, then re-checks.
    return function collectMore(...nextArgs) {
      return curried(...mergeArgs(args, nextArgs));
    };
  }

  return curried;
}

// A unique sentinel — guaranteed not to collide with any real argument a
// caller could pass, including `undefined`, `null`, or the string `'_'`.
curry.placeholder = Symbol('curry.placeholder');

function mergeArgs(collected, nextArgs) {
  const merged = collected.slice();
  let nextIndex = 0;

  // Fill open placeholder slots first, left to right, from the new batch.
  for (let i = 0; i < merged.length && nextIndex < nextArgs.length; i++) {
    if (merged[i] === curry.placeholder) {
      merged[i] = nextArgs[nextIndex];
      nextIndex++;
    }
  }

  // Anything left over in the new batch (no more placeholders to fill)
  // is appended to the end, exactly like ordinary curried application.
  while (nextIndex < nextArgs.length) {
    merged.push(nextArgs[nextIndex]);
    nextIndex++;
  }

  return merged;
}
```

## TypeScript Solution

Full, arity-generic, placeholder-aware return-type inference (TypeScript
knowing exactly which parameter positions remain open after a partial call)
requires recursive tuple subtraction and is impractical to hand-write
soundly for an interview answer. The type below is a documented, honest
simplification: it models a curried call as *always* accepting the same
argument shape as the original function (each position either its real type
or the placeholder), returning either the final result or another function
of that same shape — sound for how the runtime behaves, but it doesn't
shrink the accepted tuple as positions get filled.

```ts
declare const CURRY_PLACEHOLDER: unique symbol;
type Placeholder = typeof CURRY_PLACEHOLDER;
type CurryArg<T> = T | Placeholder;

// Recursive type: a curried function keeps returning "itself-shaped"
// functions until it finally returns `Return`.
type CurriedFn<Args extends unknown[], Return> = (
  ...args: { [K in keyof Args]: CurryArg<Args[K]> }
) => Return | CurriedFn<Args, Return>;

function curry<Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
): CurriedFn<Args, Return> {
  const arity = fn.length;

  function curried(...args: CurryArg<unknown>[]): Return | CurriedFn<Args, Return> {
    const hasEnoughArgs = args.length >= arity;
    const stillHasOpenPlaceholder = args.slice(0, arity).includes(CURRY_PLACEHOLDER);

    if (hasEnoughArgs && !stillHasOpenPlaceholder) {
      return fn(...(args as Args));
    }

    return ((...nextArgs: CurryArg<unknown>[]) =>
      curried(...mergeArgs(args, nextArgs))) as CurriedFn<Args, Return>;
  }

  return curried as CurriedFn<Args, Return>;
}

function mergeArgs(
  collected: CurryArg<unknown>[],
  nextArgs: CurryArg<unknown>[],
): CurryArg<unknown>[] {
  const merged = [...collected];
  let nextIndex = 0;

  for (let i = 0; i < merged.length && nextIndex < nextArgs.length; i++) {
    if (merged[i] === CURRY_PLACEHOLDER) {
      merged[i] = nextArgs[nextIndex];
      nextIndex++;
    }
  }

  while (nextIndex < nextArgs.length) {
    merged.push(nextArgs[nextIndex]);
    nextIndex++;
  }

  return merged;
}

export const placeholder: Placeholder = CURRY_PLACEHOLDER;
```

## Time Complexity

O(a) per call, where a is `fn`'s arity — each call re-scans up to `arity`
positions to check for a remaining placeholder, and `mergeArgs` walks the
collected list once (bounded by the same `arity`, since the list never
grows meaningfully past it for a well-formed call sequence). Across an
entire curried invocation sequence, total work is O(a·k), where k is the
number of separate calls made before `fn` finally runs.

## Space Complexity

O(a), where a is `fn`'s arity — `collected` holds at most a small constant
multiple of `arity` values at any point, and each intermediate
`collectMore` closure retains one reference to that array via closure.

## Common Mistakes

- Recomputing arity from a partially-applied function instead of capturing
  `fn.length` once from the *original* function — a partial application is
  a closure, not the original function, and doesn't expose the same
  `.length`.
- Checking the *entire* `args` array for a placeholder instead of only the
  first `arity` slots — a placeholder-like value that landed past the
  positions that actually matter for invocation would wrongly delay
  calling `fn` forever.
- Using a plain sentinel like the string `'_'` or `null` for the
  placeholder instead of a `Symbol` — collides with a legitimate argument a
  caller might actually want to pass.
- Filling placeholders right-to-left, or filling the *most recently added*
  placeholder first instead of the earliest one — breaks the documented
  "placeholders fill in the order they appear" contract.
- Forgetting to append leftover new arguments after all placeholders are
  filled — silently drops extra values a caller passed instead of using
  them to complete the call.

## Interview Follow-up Questions

1. How does this compare to Lodash's `_.curry` with `_` placeholder
   support — what matches, and what did this implementation simplify?
2. `fn.length` doesn't count rest parameters or parameters with default
   values — how would you handle currying a function like
   `(a, b, ...rest) => ...` or `(a, b = 1) => ...`?
3. How would you add memoization so that calling the curried function again
   with the exact same fully-resolved arguments doesn't redundantly re-run
   `fn`?
4. Could you implement `curry` using `Function.prototype.bind` internally
   for the non-placeholder case — what would `bind` alone not give you?
5. How would you write unit tests that specifically cover placeholders in
   multiple positions across three or more separate calls?

## Similar Questions

- [Implement a Curried Sum Function](implement-curried-sum-function.md)
- Implement `partial(fn, ...presetArgs)` (partial application without a
  fixed-arity completion check)
- [Implement Function.prototype.bind (Polyfill)](function-bind-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
