# QJS348 · Implement a Custom Object.is Polyfill

**Difficulty:** Easy
**Companies Asked:** Meta, Google, Amazon
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Objects & Data Structures / Equality
**Concepts:** the SameValue algorithm, `NaN` self-inequality, distinguishing `+0` from `-0`

## Problem Statement

Implement `myObjectIs(a, b)`, matching `Object.is`, which performs the
SameValue comparison. `Object.is` behaves *identically* to `===` for
every value pair except exactly two: `Object.is(NaN, NaN)` is `true`
(where `===` says `false`), and `Object.is(0, -0)` is `false` (where
`===` says `true`). Correctly handling those two special cases — and
only those two — is the entire question.

## Input

Two arbitrary JavaScript values, `a` and `b`.

## Output

A boolean: `true` if `a` and `b` are the "same value" per the SameValue
algorithm, `false` otherwise.

## Constraints

- Must match `===` exactly for every value pair except `NaN`-vs-`NaN`
  and `0`-vs-`-0`.
- `myObjectIs(NaN, NaN)` must be `true`.
- `myObjectIs(0, -0)` and `myObjectIs(-0, 0)` must both be `false`
  (the check must be symmetric, not only correct in one direction).
- Must not call the native `Object.is` internally.

## Examples

| Input | Output | Why |
|---|---|---|
| `myObjectIs(1, 1)` | `true` | Ordinary primitive equality — behaves exactly like `===` here |
| `myObjectIs(NaN, NaN)` | `true` | The first of the two special cases — differs from `===`, which reports `NaN === NaN` as `false` |
| `myObjectIs(0, -0)` | `false` | The second special case — differs from `===`, which reports `0 === -0` as `true` |

## Edge Cases

- `myObjectIs({}, {})` → `false` — two distinct object references,
  matching `===`'s reference-equality behavior for objects.
- `myObjectIs(null, null)` → `true`, same as `===`.
- `myObjectIs(-0, -0)` → `true` — both are the same sign of zero.
- `myObjectIs(0, 0)` → `true` — both are the same (positive) sign.
- `myObjectIs(NaN, 0 / 0)` → `true` — every `NaN`, regardless of how it
  was produced, is treated identically for this comparison.

## Hints

1. For every value pair except two, `Object.is` behaves exactly like
   `===`. What if you started from an `===` check as the baseline, and
   layered the two special cases on top of it as explicit corrections?
2. `NaN` is the only value that doesn't equal itself under `===` — what
   self-inequality check flags exactly that case (the same trick used
   for a `Number.isNaN` polyfill)?
3. Distinguishing `+0` from `-0` needs more than a plain numeric
   comparison, since `0 === -0` is `true`. What operation behaves
   *differently* for the two zeros — dividing `1` by each produces two
   different infinities — that you could use to detect the sign
   difference?

## Algorithm

**Pattern:** `===` as a baseline, with two explicit special-case
corrections layered on top.
**Core insight:** `a === b` already gets every case right *except* two:
it says `false` for `NaN === NaN` (should be `true`), and it says `true`
for `0 === -0` (should be `false`). So the SameValue algorithm can be
built as: if `a === b`, everything is already correct *unless* both
happen to be zero with different signs — which can only be detected by
an operation that's sign-sensitive, unlike `===`. Dividing `1` by each
value works: `1 / 0` is `Infinity`, but `1 / -0` is `-Infinity` — two
different results that a plain `===` on `a` and `b` themselves could
never reveal. If `a !== b`, the only way the two could still be
"the same value" is if both are `NaN` — checked via `a !== a && b !==
b`, since self-inequality is the unique signature of `NaN` and nothing
else.
**Invariant:** the function returns `true` exactly when `a` and `b` are
either the same non-zero, non-`NaN` value; the same-signed zero; or both
`NaN` — precisely the SameValue algorithm's definition.

## Dry Run

**Input:** `myObjectIs(0, -0)`

| Step | Check | Result | Action |
|---|---|---|---|
| 1 | `a === b` → `0 === -0` | `true` | Both are zero under `===` — need the sign-sensitive check |
| 2 | `a !== 0` → `0 !== 0` | `false` | Falls through to the division check |
| 3 | `1 / a === 1 / b` → `1 / 0 === 1 / -0` → `Infinity === -Infinity` | `false` | Signs differ — not the same value |

**Result:** `myObjectIs(0, -0)` → `false`, correctly distinguishing the
two zeros where `===` could not.

## JavaScript Solution

```js
function myObjectIs(a, b) {
  if (a === b) {
    // === treats +0 and -0 as equal, but SameValue must not.
    // 1 / 0 is Infinity, 1 / -0 is -Infinity - a cheap way to
    // detect the sign difference only when both values are zero.
    return a !== 0 || 1 / a === 1 / b;
  }

  // === treats NaN as unequal to itself, but SameValue must not.
  // NaN is the only value that fails self-equality.
  return a !== a && b !== b;
}
```

## TypeScript Solution

```ts
function myObjectIs(a: unknown, b: unknown): boolean {
  if (a === b) {
    if (typeof a === 'number' && a === 0) {
      // Both values are zero under === - the division trick reveals
      // whether they're the same sign of zero or not.
      return 1 / a === 1 / (b as number);
    }
    return true;
  }

  return a !== a && b !== b;
}
```

## Time Complexity

O(1) — a fixed, constant number of comparisons regardless of the input
values.

## Space Complexity

O(1) — no additional storage beyond the two input values.

## Common Mistakes

- Implementing this via `JSON.stringify(a) === JSON.stringify(b)` — not
  only wrong for object identity, but gets *both* special cases wrong
  in the opposite direction: `JSON.stringify` turns `NaN` into `null`
  (so two `NaN`s would compare via `'null' === 'null'`, accidentally
  "working" only by coincidence) and doesn't distinguish `0` from `-0`
  at all (`JSON.stringify(-0)` is `'0'`, indistinguishable from
  positive zero).
- Implementing this as plain `a === b` with no special cases at all —
  passes every "normal" test case but silently fails the two cases that
  are the entire point of `Object.is`.
- Handling only the `NaN` special case and forgetting the `0`/`-0`
  distinction — `NaN` is the "famous" trick people remember, but the
  zero-sign distinction is just as much a part of SameValue's contract
  and is tested just as often.
- Detecting `+0`/`-0` asymmetrically, e.g. explicitly checking `a === 0
  && b === -0` in one specific direction — `myObjectIs(-0, 0)` must
  also be `false`, not just `myObjectIs(0, -0)`; an implementation that
  only checks one direction passes half its test cases and fails the
  other half.

## Interview Follow-up Questions

1. Where does JavaScript itself rely on SameValue (or the closely
   related SameValueZero) internally, besides `Object.is` — e.g. `Map`/
   `Set` key equality, `Array.prototype.includes` — and how do
   SameValue and SameValueZero differ from each other? (SameValueZero
   treats `+0` and `-0` as equal, unlike SameValue.)
2. Why might a UI library use `Object.is` internally for prop/state
   comparison during reconciliation instead of `===` — what practical
   bug does that avoid?
3. How would you extend this into a "deep" `Object.is` that recursively
   applies SameValue semantics to nested structures, rather than only
   comparing top-level values?
4. Why is `1 / 0 === Infinity` but `1 / -0 === -Infinity` a reliable way
   to distinguish the two zeros, when `0 === -0` is `true` and most
   other arithmetic treats them identically?

## Similar Questions

- [Implement a Custom Deep Equal Comparison](implement-custom-deep-equal-comparison.md)
- [Implement a Custom Number.isNaN Polyfill](implement-custom-number-isnan-polyfill.md)
- [Implement a Custom Number.isFinite Polyfill](implement-custom-number-isfinite-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
