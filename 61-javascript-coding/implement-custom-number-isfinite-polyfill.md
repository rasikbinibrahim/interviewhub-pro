# QJSC043 · Implement a Custom Number.isFinite Polyfill

**Difficulty:** Easy
**Companies Asked:** Amazon, Meta, Google
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Math / Number Handling
**Concepts:** strict type checking without coercion, `NaN` self-inequality, distinguishing from global `isFinite`

## Problem Statement

Implement `myNumberIsFinite(value)`, matching `Number.isFinite`: return
`true` only if `value` is *already* of type `number` and is finite
(neither `NaN`, `Infinity`, nor `-Infinity`). Unlike the global
`isFinite()` function, this must perform **no type coercion** —
non-number inputs are always `false`, even ones that would coerce to a
finite number.

## Input

A single value `value` of any type.

## Output

A boolean: `true` only if `value`'s type is exactly `number` and its
value is finite; `false` for every other case, including all non-number
types.

## Constraints

- Must not coerce `value` to a number before checking it — this is the
  entire point of the exercise and the core distinction from the global
  `isFinite()` function.
- `NaN`, `Infinity`, and `-Infinity` must all return `false`.
- Must not call the native `Number.isFinite` internally.

## Examples

| Input | Output | Why |
|---|---|---|
| `myNumberIsFinite(5)` | `true` | A genuinely finite number |
| `myNumberIsFinite('123')` | `false` | The input is a string, not a number — no coercion is performed, unlike the global `isFinite('123')`, which is `true` because it coerces the string to `123` first |
| `myNumberIsFinite(Infinity)` | `false` | The type check passes (it *is* a number), but the value itself is not finite |

## Edge Cases

- `myNumberIsFinite(NaN)` → `false`.
- `myNumberIsFinite(null)` → `false` — the global `isFinite(null)` is
  `true` because it coerces `null` to `0`; this function must not.
- `myNumberIsFinite(undefined)` → `false`.
- `myNumberIsFinite(true)` → `false` — the global `isFinite(true)` is
  `true` because it coerces booleans to `1`/`0`; this function must not.
- `myNumberIsFinite(-Infinity)` → `false`.

## Hints

1. The core distinguishing behavior versus the global `isFinite` is that
   `Number.isFinite` performs *zero* type coercion — what check has to
   come first, before any numeric range check, to guarantee that?
2. Once `value`'s type is confirmed to be exactly `'number'`, which
   specific non-finite numeric values still need to be explicitly ruled
   out? (There are effectively three "special" values that are numbers
   but not finite.)
3. You can't use the native `Number.isFinite` (that's the point) or the
   global `isFinite` (wrong coercion semantics) — but comparing a value
   to itself, and comparing it directly against `Infinity`/`-Infinity`,
   are both plain operators available to you.

## Algorithm

**Pattern:** type guard followed by explicit range checks.
**Core insight:** the type check (`typeof value !== 'number'`) must run
*first* and return `false` immediately for anything that isn't already a
number — this single line is what makes the function behave differently
from the global `isFinite`, which instead attempts to coerce its
argument via `ToNumber` before checking it. Once `value` is confirmed to
be a number, only three specific numeric values are not finite: `NaN`,
`Infinity`, and `-Infinity`. `NaN` is detected via `value !== value` —
`NaN` is the *only* value in JavaScript that does not equal itself,
which is a direct, allowed consequence of the IEEE-754 floating-point
spec rather than a call to `Number.isNaN`. `Infinity` and `-Infinity`
are then ruled out with direct comparisons against those two global
constants.
**Invariant:** by the time the final `Infinity`/`-Infinity` comparison
runs, `value` is guaranteed to be a genuine, non-`NaN` number — so a
direct comparison against the two infinite values is sufficient and
unambiguous.

## Dry Run

**Input:** `myNumberIsFinite('123')`

| Step | Check | Result | Action |
|---|---|---|---|
| 1 | `typeof '123' !== 'number'` | `true` (it's a string) | Return `false` immediately |

**Result:** `myNumberIsFinite('123')` → `false` — contrast with the
global `isFinite('123')`, which returns `true` because it coerces
`'123'` to the number `123` before checking it.

## JavaScript Solution

```js
function myNumberIsFinite(value) {
  if (typeof value !== 'number') {
    return false; // no coercion - unlike global isFinite, a non-number is never finite here
  }

  // NaN is the only value in JS that is not equal to itself.
  if (value !== value) {
    return false;
  }

  return value !== Infinity && value !== -Infinity;
}
```

## TypeScript Solution

```ts
function myNumberIsFinite(value: unknown): value is number {
  if (typeof value !== 'number') {
    return false;
  }

  if (value !== value) {
    return false;
  }

  return value !== Infinity && value !== -Infinity;
}
```

## Time Complexity

O(1) — a fixed, constant number of comparisons regardless of the input.

## Space Complexity

O(1) — no additional storage is used beyond the input value itself.

## Common Mistakes

- Implementing this as `!isNaN(value) && value !== Infinity && value
  !== -Infinity` without a leading `typeof` check — this silently
  reintroduces the global `isNaN`'s coercion behavior, misreporting any
  non-number that happens to coerce to a finite number (like `'123'`)
  as finite.
- Coercing the input with `Number(value)` before checking it — this
  defeats the entire point of the exercise, since `Number.isFinite`'s
  headline distinction from the global `isFinite` is precisely that it
  performs no coercion at all.
- Checking `Math.abs(value) === Infinity` without first confirming
  `typeof value === 'number'` — risks incorrect behavior for objects
  with a custom `valueOf`/`Symbol.toPrimitive` that could otherwise
  slip through an unordered or missing type check.
- Forgetting the `NaN` self-inequality check and assuming `value !==
  Infinity && value !== -Infinity` alone is sufficient — `NaN !==
  Infinity` is `true` and `NaN !== -Infinity` is also `true`, so a
  `NaN` input would incorrectly be reported as finite without the
  explicit self-comparison.

## Interview Follow-up Questions

1. Contrast `Number.isFinite('123')` (`false`) with the global
   `isFinite('123')` (`true`) — walk through exactly what coercion step
   the global version performs that this one deliberately skips.
2. How would you implement `Number.isInteger` using a very similar
   pattern (a type check plus one additional numeric check)?
3. Why is `NaN !== NaN` `true` in JavaScript — what does that reveal
   about how IEEE-754 floating point defines equality for `NaN`, and why
   can that be leveraged as a `NaN`-detection technique instead of
   calling `Number.isNaN`?
4. Would this implementation behave "correctly" for a `BigInt` value
   like `myNumberIsFinite(10n)`? Walk through why `typeof 10n` is
   `'bigint'`, not `'number'`, and what the conceptually correct answer
   should be here.

## Similar Questions

- [Implement a Custom Number.isNaN Polyfill](implement-custom-number-isnan-polyfill.md)
- [Implement Custom Math.max and Math.min Polyfills](implement-custom-math-max-and-math-min-polyfills.md)
- [Implement a Custom Math.abs Polyfill](implement-custom-math-abs-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
