# QJSC042 · Implement a Custom Number.isNaN Polyfill

**Difficulty:** Easy
**Companies Asked:** Amazon, Meta, Google
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Math / Number Handling
**Concepts:** strict type checking without coercion, `x !== x` self-inequality, distinguishing from global `isNaN`

## Problem Statement

Implement `myNumberIsNaN(value)`, matching `Number.isNaN`: return `true`
only if `value` is *already* the number `NaN` — not a value that would
merely coerce to `NaN`. Unlike the global `isNaN()` function, this must
perform **no type coercion**: a non-number input is never `NaN`, full
stop, regardless of what it would become if converted to a number.

## Input

A single value `value` of any type.

## Output

A boolean: `true` only if `value`'s type is exactly `number` and it is
the specific value `NaN`; `false` for every other input, including all
non-number types.

## Constraints

- Must not coerce `value` to a number before checking it — this is the
  exact distinction from the global `isNaN()` and the entire point of
  the exercise.
- Must not call the native `Number.isNaN` internally.
- Must not compare `value === NaN` as the detection mechanism (this
  never works for any value, including `NaN` itself — see Common
  Mistakes).

## Examples

| Input | Output | Why |
|---|---|---|
| `myNumberIsNaN(NaN)` | `true` | The actual number `NaN`, detected directly |
| `myNumberIsNaN('foo')` | `false` | The input is a string, not a number — no coercion happens, unlike the global `isNaN('foo')`, which is `true` because it coerces `'foo'` to `NaN` first |
| `myNumberIsNaN(5)` | `false` | A genuine, non-`NaN` number |

## Edge Cases

- `myNumberIsNaN(undefined)` → `false` — the global `isNaN(undefined)`
  is `true` because `Number(undefined)` is `NaN`; this function must not
  perform that coercion.
- `myNumberIsNaN({})` → `false`, for the same reason — the global
  `isNaN({})` is `true`.
- `myNumberIsNaN(0 / 0)` → `true` — `0 / 0` evaluates to the actual
  number `NaN` at the language level, so this is a genuine number input,
  not a coercion case.
- `myNumberIsNaN('NaN')` → `false` — the *string* `'NaN'` is not the
  number `NaN`, and must not be coerced into becoming one.
- `NaN` produced through different operations (`0 / 0`, `Math.sqrt(-1)`,
  `Number('abc')`) → all detected identically as `true`, since
  JavaScript treats every `NaN` uniformly for equality purposes,
  regardless of how it was produced.

## Hints

1. What check should run first to make sure `value` is never coerced —
   the same "must already be a number" gate that distinguishes
   `Number.isFinite` from the global `isFinite`?
2. Once `typeof value === 'number'` is confirmed, how do you detect
   specifically `NaN` among all possible number values, without calling
   `Number.isNaN` itself?
3. Self-inequality (`value !== value`) is uniquely `true` for `NaN`
   among every value in the language — no other JavaScript value fails
   to equal itself.

## Algorithm

**Pattern:** type guard followed by a self-inequality check.
**Core insight:** the type check (`typeof value !== 'number'`) must run
first and immediately return `false` for anything that isn't already a
number — this is what prevents the coercion the global `isNaN()`
performs, where `isNaN('foo')` converts `'foo'` to a number (`NaN`)
*before* checking it. Once `value` is confirmed to already be a number,
detecting `NaN` specifically comes down to one fact from the IEEE-754
floating-point specification that JavaScript numbers follow: `NaN` is
defined to never equal anything, including itself. So `value !== value`
is `true` if and only if `value` is `NaN` — no other number, and no
other JS value at all, has this property.
**Invariant:** the function returns `true` exactly when both are true —
`value`'s type is `number`, and `value` fails to equal itself — which
holds for `NaN` and only `NaN`.

## Dry Run

**Input:** `myNumberIsNaN('foo')`

| Step | Check | Result | Action |
|---|---|---|---|
| 1 | `typeof 'foo' !== 'number'` | `true` (it's a string) | Return `false` immediately |

**Result:** `myNumberIsNaN('foo')` → `false` — contrast with the global
`isNaN('foo')`, which returns `true` because it coerces `'foo'` to the
number `NaN` before checking it.

## JavaScript Solution

```js
function myNumberIsNaN(value) {
  if (typeof value !== 'number') {
    return false; // no coercion - unlike global isNaN, a non-number is never "NaN" here
  }

  // NaN is the only value in JS that does not equal itself.
  return value !== value;
}
```

## TypeScript Solution

```ts
function myNumberIsNaN(value: unknown): boolean {
  if (typeof value !== 'number') {
    return false;
  }

  return value !== value;
}
```

## Time Complexity

O(1) — a single type check and a single self-comparison, regardless of
the input.

## Space Complexity

O(1) — no additional storage beyond the input value itself.

## Common Mistakes

- Delegating to the global `isNaN(value)` directly — reintroduces
  coercion, so `myNumberIsNaN('foo')` would incorrectly return `true`
  instead of `false`.
- Coercing `value` with `Number(value)` before the self-comparison —
  defeats the entire purpose of the exercise, since `Number.isNaN`'s
  whole distinguishing feature relative to the global `isNaN` is that it
  performs no coercion.
- Writing `value === NaN` as the detection check — this **never** works
  for detecting `NaN`, for any input, including `NaN` itself, since
  `NaN` is specified to never equal anything (not even the `NaN` global
  binding used in the comparison). A candidate reaching for `=== NaN`
  signals a real gap in understanding `NaN`'s equality semantics, not
  just a style slip.
- Skipping the `typeof` guard on the assumption that only numbers would
  ever be passed in — silently produces wrong results the moment a
  non-number value (which correctly is never "NaN") reaches the
  self-comparison without first being confirmed as a number.

## Interview Follow-up Questions

1. Contrast `Number.isNaN('foo')` (`false`) with the global `isNaN('foo')`
   (`true`) — what coercion step does the global version take that this
   one deliberately skips?
2. Why does `value === NaN` always evaluate to `false`, for every value
   including `NaN` itself — what does the IEEE-754 spec say about `NaN`
   comparisons, and why was the language designed to make `NaN`
   unequal to everything, including itself?
3. Does the concept of `NaN` apply to `BigInt`? What happens if you try
   an operation like `10n / 0n`, and how would you detect an "invalid"
   `BigInt` computation if `NaN` itself doesn't exist for that type?
4. If you needed a general-purpose, *coercing* `isNaN` check for
   backward-compatible legacy code (matching the global `isNaN`'s
   behavior), how would you implement it — and why would you name it
   clearly differently from this strict version, to avoid the two being
   confused by future maintainers?

## Similar Questions

- [Implement a Custom Number.isFinite Polyfill](implement-custom-number-isfinite-polyfill.md)
- [Implement a Custom Object.is Polyfill](implement-custom-object-is-polyfill.md)
- [Implement a Custom Deep Equal Comparison](implement-custom-deep-equal-comparison.md)

---
[← Back to 61-javascript-coding](README.md)
