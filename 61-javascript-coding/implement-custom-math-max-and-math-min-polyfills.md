# QJSC040 · Implement Custom Math.max and Math.min Polyfills

**Difficulty:** Easy
**Companies Asked:** Infosys, TCS, Wipro
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Math / Number Handling
**Concepts:** variadic argument iteration, `NaN` propagation, identity elements for empty input

## Problem Statement

Implement `myMax(...values)` and `myMin(...values)`, matching the
behavior of `Math.max`/`Math.min`: return the largest (or smallest)
numeric argument given; if called with zero arguments, return
`-Infinity` for `myMax` and `Infinity` for `myMin`; and if *any*
argument is `NaN`, the overall result must be `NaN`.

## Input

Zero or more numeric arguments, passed individually (e.g. `myMax(1, 5,
3)`), potentially including `NaN`, `Infinity`, `-Infinity`, or
negative numbers.

## Output

A single number: the maximum (or minimum) of the given arguments, or
the appropriate identity value (`-Infinity`/`Infinity`) when called with
no arguments, or `NaN` if any argument was `NaN`.

## Constraints

- Calling with zero arguments must return `-Infinity` (`myMax`) or
  `Infinity` (`myMin`) — not `undefined`, not a thrown error.
- If any argument is `NaN`, the result must be `NaN`, regardless of
  where in the argument list it appears.
- Must correctly compare negative numbers, `Infinity`, and `-Infinity`
  alongside ordinary finite numbers.
- Must not call the native `Math.max`/`Math.min` internally.

## Examples

| Call | Result | Why |
|---|---|---|
| `myMax(1, 5, 3)` | `5` | The largest of the three given values |
| `myMax()` | `-Infinity` | `-Infinity` is the identity element for max — every real number is greater than it, so it's only ever the answer when there truly are no arguments to compare |
| `myMax(1, NaN, 3)` | `NaN` | A single `NaN` argument "poisons" the entire comparison — `NaN` compares `false` against everything, so it must be explicitly detected rather than silently skipped |

## Edge Cases

- `myMax()` → `-Infinity`; `myMin()` → `Infinity` (the identity/sentinel
  values for an empty argument list).
- `myMax(5)` (single argument) → `5`.
- `NaN` appearing anywhere in the argument list, not just first or last
  → the result is `NaN` regardless of position.
- A mix of `Infinity`/`-Infinity` and finite numbers (`myMax(1, Infinity,
  3)`) → correctly returns `Infinity`.
- All arguments equal (`myMax(3, 3, 3)`) → `3`.
- All-negative arguments (`myMax(-5, -1, -10)`) → `-1` — a naive
  implementation that starts its running max at `0` instead of
  `-Infinity` would wrongly return `0` here.

## Hints

1. What single "worst possible" starting value could you initialize a
   running max to, such that *any* real number given as input would
   immediately beat it in a comparison? (This mirrors exactly what
   `Math.max()` with no arguments returns.)
2. Because comparisons against `NaN` are always `false`, a naive
   running-max loop (`if (value > runningMax) runningMax = value`) will
   silently *skip over* a `NaN` argument instead of letting it "corrupt"
   the result the way real `Math.max` does — what explicit check do you
   need, and where does it need to go relative to the comparison?
3. Once a `NaN` is detected anywhere in the arguments, you can
   short-circuit and return `NaN` immediately — there's no need to
   finish comparing the rest of the list.

## Algorithm

**Pattern:** single-pass scan with a running extreme value, seeded at
the correct identity element.
**Core insight:** `myMax`'s running value starts at `-Infinity` — the
one number every other real number is guaranteed to beat in a `>`
comparison — so if there are zero arguments, the loop never runs and
`-Infinity` is correctly returned unchanged; if there's at least one
argument, it's guaranteed to overwrite that starting sentinel on the
first comparison. `myMin` mirrors this with `Infinity` as its identity
element. The one thing this comparison-based scan can't handle on its
own is `NaN`: since `value > runningMax` is `false` whenever `value` is
`NaN`, a bare comparison loop would silently treat a `NaN` argument as
"not the max" and skip right past it — the opposite of the required
behavior, where a single `NaN` must poison the entire result. Adding an
explicit `Number.isNaN(value)` check before the comparison, with an
immediate early return, makes that propagation deliberate instead of
leaving it to comparison semantics that would otherwise get it wrong.
**Invariant:** at the start of every loop iteration, `runningMax`
(`runningMin`) holds the correct maximum (minimum) of every argument
examined so far, and the loop has not yet encountered a `NaN`.

## Dry Run

**Input:** `myMax(1, NaN, 3)`

| Step | value | `Number.isNaN(value)`? | `runningMax` (before) | Action | `runningMax` (after) |
|---|---|---|---|---|---|
| 1 | `1` | `false` | `-Infinity` | `1 > -Infinity` → update | `1` |
| 2 | `NaN` | `true` | `1` | Detected — return `NaN` immediately | — (function returns) |

The loop never reaches `3` — it doesn't need to, since the result is
already determined. **Result:** `myMax(1, NaN, 3)` → `NaN`.

## JavaScript Solution

```js
function myMax(...values) {
  let runningMax = -Infinity; // the identity element: any real number beats it

  for (const value of values) {
    if (Number.isNaN(value)) {
      return NaN; // one NaN argument makes the entire result NaN
    }
    if (value > runningMax) {
      runningMax = value;
    }
  }

  return runningMax;
}

function myMin(...values) {
  let runningMin = Infinity; // the identity element for min

  for (const value of values) {
    if (Number.isNaN(value)) {
      return NaN;
    }
    if (value < runningMin) {
      runningMin = value;
    }
  }

  return runningMin;
}
```

## TypeScript Solution

```ts
function myMax(...values: number[]): number {
  let runningMax = -Infinity;

  for (const value of values) {
    if (Number.isNaN(value)) {
      return NaN;
    }
    if (value > runningMax) {
      runningMax = value;
    }
  }

  return runningMax;
}

function myMin(...values: number[]): number {
  let runningMin = Infinity;

  for (const value of values) {
    if (Number.isNaN(value)) {
      return NaN;
    }
    if (value < runningMin) {
      runningMin = value;
    }
  }

  return runningMin;
}
```

## Time Complexity

O(m), where m is the number of arguments — a single pass through the
argument list, with an early exit as soon as a `NaN` is found.

## Space Complexity

O(m) — the rest parameter `...values` necessarily collects all
arguments into an array before the function body runs (unavoidable for
any variadic function in JS); beyond that, only a fixed number of
scalar variables are used.

## Common Mistakes

- Initializing the running max to `0` (or to the first argument without
  handling the zero-argument case) instead of `-Infinity` — wrongly
  returns `0` for an all-negative input like `myMax(-5, -1, -10)`, since
  `0` beats every negative number.
- Not explicitly checking for `NaN` and relying only on the comparison —
  since `value > runningMax` is always `false` when `value` is `NaN`, a
  naive loop silently skips a `NaN` argument instead of propagating
  `NaN` through the whole result, diverging from native `Math.max`.
- Seeding `runningMax` from `values[0]` and starting the loop at index
  `1` without a guard for zero arguments — throws or produces `undefined`
  for `myMax()` instead of the correct `-Infinity`.
- Swapping the identity elements — seeding `myMax` with `Infinity` (or
  `myMin` with `-Infinity`) instead of the correct sentinel — silently
  returns the wrong value specifically (and only) on an empty argument
  list, since any real argument would still overwrite the wrong seed
  correctly.

## Interview Follow-up Questions

1. How would you extend `myMax`/`myMin` to also accept a single array
   argument, so callers don't have to spread it themselves (similar to
   how `Math.max(...arr)` is a common pattern)?
2. Real `Math.max`/`Math.min` coerce non-number arguments via `ToNumber`
   (e.g. `Math.max('5', 3)` is `5`). How would you add that coercion,
   and what should happen for `Math.max('abc', 3)`, given
   `Number('abc')` is `NaN`?
3. How would you make this work efficiently over a very large array
   (say, a million numbers) without risking the stack-size/argument-
   count limit that `Math.max(...hugeArray)` itself can hit when spread
   arguments exceed the engine's call-argument ceiling?
4. Why are `-Infinity` and `Infinity` the *correct* — not arbitrary —
   identity elements for max and min respectively, in terms of how they
   behave under repeated comparison against any real number?

## Similar Questions

- [Implement a Custom Math.abs Polyfill](implement-custom-math-abs-polyfill.md)
- [Implement a Custom Number.isNaN Polyfill](implement-custom-number-isnan-polyfill.md)
- [Implement a Custom Number.isFinite Polyfill](implement-custom-number-isfinite-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
