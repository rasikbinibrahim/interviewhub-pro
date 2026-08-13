# QJSC039 · Implement a Custom Math.abs Polyfill

**Difficulty:** Easy
**Companies Asked:** Infosys, TCS, Wipro
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Math / Number Handling
**Concepts:** sign comparison without built-ins, `NaN` propagation, `-0` vs. `0` normalization

## Problem Statement

Implement `myAbs(n)`, a function that returns the absolute value of a
number `n`, without calling the native `Math.abs` or `Math.sign`
anywhere inside it.

## Input

A single value `n`, always a JavaScript `number` (which may be
positive, negative, zero, negative zero, `NaN`, or infinite).

## Output

A single `number`: the absolute value of `n`, or `NaN` if `n` is `NaN`.

## Constraints

- Must not call `Math.abs` or `Math.sign` internally.
- `NaN` input must produce `NaN` output, not a thrown error and not a
  silently wrong number.
- `-0` input must produce `0` (positive zero), not `-0` — `Math.abs(-0)`
  is mathematically `0`, and the sign must actually be normalized, not
  just left as-is.
- Must handle `Infinity`/`-Infinity` the same way as any other
  negative/positive value.

## Examples

| Input | Output | Why |
|---|---|---|
| `-5` | `5` | A negative value's magnitude is its negation |
| `5` | `5` | Already non-negative — returned unchanged |
| `-Infinity` | `Infinity` | The same negation logic applies uniformly to infinite values, not just finite ones |

## Edge Cases

- `myAbs(0)` → `0` (already positive zero, unchanged).
- `myAbs(-0)` → `0`, **not** `-0` — this is the trickiest case:
  `-0 < 0` evaluates to `false` in JS, so a naive `n < 0 ? -n : n`
  implementation returns the *original* `-0` unchanged, which fails a
  sign-sensitive check like `Object.is(myAbs(-0), 0)`.
- `myAbs(NaN)` → `NaN` — must propagate, not throw and not silently
  convert to `0` or any other number.
- `myAbs(Number.MAX_VALUE)` → itself, unchanged (already positive).
- `myAbs(-Number.MIN_VALUE)` → `Number.MIN_VALUE` — the smallest
  possible non-zero magnitude still flips correctly.

## Hints

1. What comparison lets you determine whether a number is negative
   without calling `Math.sign` — and what does that same comparison
   evaluate to specifically when `n` is `NaN`?
2. A number's absolute value is either the number itself (already ≥ 0)
   or its negation (`-n`) — which of those two paths should `NaN` take,
   and how do you make sure it lands there deliberately rather than by
   accident?
3. `-0` is a genuinely distinct value from `0` in JS — `Object.is(-0, 0)`
   is `false`, even though `-0 === 0` is `true` and `-0 < 0` is also
   `false`. How would you explicitly force a `-0` input to become a
   `+0` output, given that the "is it negative" comparison alone won't
   catch it?

## Algorithm

**Pattern:** explicit sign comparison with dedicated special cases.
**Core insight:** `n < 0 ? -n : n` gets *most* inputs right, but two
values expose its gaps if left unhandled: `NaN < 0` is `false` for every
comparison operator (comparisons against `NaN` are always `false`), so a
bare `n < 0 ? -n : n` happens to return `NaN` unchanged in the `else`
branch — correct, but only by coincidence of comparison semantics, not
by deliberate design a candidate should be able to explain. Worse, `-0
< 0` is also `false`, so the same `else` branch would return the
original `-0` unchanged — genuinely wrong, since the whole point of
`myAbs` is to normalize sign. The fix is to handle both cases
explicitly and *first*: check `Number.isNaN(n)` and return `NaN`
directly (making the propagation intentional rather than incidental),
then check `n === 0` (which is `true` for both `0` and `-0`) and return
the literal `0` (forcing sign normalization). Only after both special
cases are ruled out does the ordinary `n < 0 ? -n : n` comparison run,
where it now only ever sees genuinely nonzero, non-`NaN` numbers.
**Invariant:** by the time the final comparison runs, `n` is guaranteed
to be a finite-or-infinite, nonzero, non-`NaN` number — so `n < 0 ? -n :
n` is unambiguously correct for it.

## Dry Run

**Input:** `myAbs(-0)`

| Step | Check | Result | Action |
|---|---|---|---|
| 1 | `Number.isNaN(-0)` | `false` | Not `NaN` — continue |
| 2 | `-0 === 0` | `true` | Zero (positive or negative) — return the literal `0` |

**Result:** `myAbs(-0)` → `0`. `Object.is(myAbs(-0), 0)` is `true` (the
sign was actually normalized, not just passed through unchanged).

## JavaScript Solution

```js
function myAbs(n) {
  if (Number.isNaN(n)) {
    return NaN; // NaN has no sign to flip - propagate it explicitly
  }

  if (n === 0) {
    return 0; // forces -0 to become +0 (0 === -0 is true, so this also normalizes an already-positive zero)
  }

  return n < 0 ? -n : n;
}
```

## TypeScript Solution

```ts
function myAbs(n: number): number {
  if (Number.isNaN(n)) {
    return NaN;
  }

  if (n === 0) {
    return 0;
  }

  return n < 0 ? -n : n;
}
```

## Time Complexity

O(1) — a fixed, constant number of comparisons regardless of the
magnitude of `n`.

## Space Complexity

O(1) — no additional storage beyond the input and a single return
value.

## Common Mistakes

- Writing only `n < 0 ? -n : n` with no dedicated `-0` check — passes
  every loosely-written test that checks `myAbs(-0) === 0` (which is
  `true` for `-0` regardless), but fails a sign-aware check like
  `Object.is(myAbs(-0), 0)` or `1 / myAbs(-0) === Infinity`, because the
  original `-0` is returned unchanged.
- Reaching for `Math.sign(n) * n` — besides using exactly the family of
  built-ins the exercise disallows, it also happens to produce `-0 *
  -0 = 0` and `Math.sign(NaN) * NaN = NaN`, so it "looks correct" while
  entirely sidestepping the actual thing being tested.
- Omitting the explicit `Number.isNaN` check on the theory that "`n < 0`
  already handles it" — it happens to still return the right answer
  here since every comparison against `NaN` is `false`, but that's an
  accident of comparison semantics a candidate should be able to name,
  not something to leave implicit and unexplained.
- Calling `Math.abs` anywhere inside the "polyfill" — trivializes the
  entire exercise by delegating to the exact function being reimplemented.

## Interview Follow-up Questions

1. How would this change if you also needed to support `BigInt` inputs
   alongside regular numbers — what changes about the comparison and
   negation operators, and can the two types be mixed in one function?
2. Some low-level languages compute absolute value branch-free using the
   sign bit directly (e.g. clearing it with a bitmask). Would that
   technique translate meaningfully to JS's double-precision floats, and
   why or why not?
3. Why does `-0 === 0` evaluate to `true` in JS even though `Object.is(-0,
   0)` is `false` — what does that reveal about how `===` treats the two
   zeros compared to how `Object.is`'s SameValue algorithm treats them?
4. How would you write a unit test that actually *catches* an
   implementation that forgets to normalize `-0`, given that a naive
   `expect(myAbs(-0)).toBe(0)` in some test frameworks would still pass
   even for a buggy version that returns `-0` unchanged?

## Similar Questions

- [Implement Custom Math.max and Math.min Polyfills](implement-custom-math-max-and-math-min-polyfills.md)
- [Implement a Custom Number.isNaN Polyfill](implement-custom-number-isnan-polyfill.md)
- [Implement a Custom Object.is Polyfill](implement-custom-object-is-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
