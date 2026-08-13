# QJSC050 · Implement Custom Array prototype at Index Getter

**Difficulty:** Easy
**Companies Asked:** Infosys, TCS, Wipro
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Methods / Polyfills
**Concepts:** negative-index normalization, relative indexing, bounds checking

## Problem Statement

Implement `customAt(array, index)`, a polyfill for `Array.prototype.at`.
Unlike bracket notation, `at` accepts negative indices to mean "counted
from the end" — `array.at(-1)` returns the last element, `array.at(-2)`
the second-to-last, and so on — while still accepting ordinary
non-negative indices the same way bracket access does.

## Input

- `array`: the array to index into
- `index`: an integer, positive, negative, or zero

## Output

The element at the resolved position, or `undefined` if the resolved
position falls outside the array's bounds.

## Constraints

- `index` can be any integer (positive, negative, or `0`); it is not
  restricted to `array`'s current bounds.
- A negative `index` counts backward from the end: `-1` is the last
  element, `-array.length` is the first element.
- If the resolved position is out of range in either direction, return
  `undefined` rather than throwing.
- Must not use bracket notation's built-in negative-index behavior,
  because there isn't any — plain `array[-1]` looks up a property
  literally named `"-1"`, which is `undefined` for a normal array; the
  whole point of this polyfill is providing the translation bracket
  notation lacks.

## Examples

| `array` | `index` | Output | Why |
|---|---|---|---|
| `[10, 20, 30]` | `0` | `10` | Non-negative index behaves exactly like `array[0]` |
| `[10, 20, 30]` | `-1` | `30` | Negative index counts from the end: last element |
| `[10, 20, 30]` | `5` | `undefined` | Out of bounds in the positive direction |

## Edge Cases

- `index = -array.length` → the first element (the most negative valid
  index).
- `index = -array.length - 1` → `undefined` (one step past the start).
- `index = array.length` → `undefined` (one step past the end, same as
  bracket notation).
- Empty array (`[]`) with any `index` → `undefined`, since no resolved
  position can ever land inside an empty array.
- Non-integer `index` (e.g. `1.5`) — the native method truncates toward
  zero before resolving; this polyfill should do the same via
  `Math.trunc`.

## Hints

1. The only real difference between `at` and bracket notation is what
   happens to a *negative* index — a non-negative index should resolve
   exactly the same way in both.
2. A negative index counts backward from `array.length`, so adding
   `array.length` to a negative index converts it into the equivalent
   positive, from-the-start index — `at(-1)` on a 3-element array is the
   same position as `at(3 + (-1))` = `at(2)`.
3. After converting negative to positive, the resolved position still
   needs a bounds check — a very negative index (like `-100` on a
   3-element array) converts to a still-negative or otherwise
   out-of-range number, which should return `undefined`, not attempt an
   invalid lookup.

## Algorithm

**Pattern:** relative-index normalization + bounds check.
**Core insight:** every negative index is really "distance from the end,"
and every distance-from-the-end has an equivalent distance-from-the-start
— specifically `array.length + index` when `index` is negative. Once
that normalization happens, the problem reduces to a single bounds
check (`0 <= resolvedIndex < array.length`) followed by a plain indexed
read, exactly like bracket notation.
**Invariant:** after normalization, `resolvedIndex` always represents a
non-negative, from-the-start position (or an out-of-range value if the
original index was too far negative or too far positive) — never a
negative number that still needs further translation.

## Dry Run

**Input:** `customAt([10, 20, 30, 40], -2)`

| Step | Expression | Value |
|---|---|---|
| 1 | `index` | `-2` |
| 2 | `Math.trunc(index)` | `-2` (already an integer) |
| 3 | `index < 0`? | `true` → normalize |
| 4 | `resolvedIndex = array.length + index` | `4 + (-2) = 2` |
| 5 | `0 <= resolvedIndex < array.length`? | `0 <= 2 < 4` → `true` |
| 6 | `array[resolvedIndex]` | `array[2] = 30` |

**Result:** `30` — the second-to-last element of `[10, 20, 30, 40]`,
matching the expected "count from the end" behavior.

## JavaScript Solution

```js
function customAt(array, index) {
  const length = array.length;

  // Normalize to an integer first — at() truncates fractional indices
  // toward zero, same as most other integer-index array methods.
  let resolvedIndex = Math.trunc(index) || 0; // `|| 0` also handles NaN

  // A negative index counts from the end: -1 is the last element,
  // which is the same position as (length - 1) from the start.
  if (resolvedIndex < 0) {
    resolvedIndex += length;
  }

  // Bounds check AFTER normalization — a too-negative or too-large
  // index resolves outside [0, length) and should read as undefined,
  // not throw or wrap around again.
  if (resolvedIndex < 0 || resolvedIndex >= length) {
    return undefined;
  }

  return array[resolvedIndex];
}
```

## TypeScript Solution

```ts
function customAt<T>(array: readonly T[], index: number): T | undefined {
  const length = array.length;

  let resolvedIndex: number = Math.trunc(index) || 0;

  if (resolvedIndex < 0) {
    resolvedIndex += length;
  }

  if (resolvedIndex < 0 || resolvedIndex >= length) {
    return undefined;
  }

  return array[resolvedIndex];
}
```

## Time Complexity

O(1) — a fixed number of arithmetic operations and one indexed read,
regardless of the array's size.

## Space Complexity

O(1) — only scalar temporaries (`length`, `resolvedIndex`); no
allocation proportional to input size.

## Common Mistakes

- Only normalizing negative indices and forgetting the *second* bounds
  check afterward — `customAt([1,2,3], -10)` normalizes to `3 + (-10) =
  -7`, which is still negative and must be caught, not read as
  `array[-7]` (which is `undefined` anyway on a real array, but silently
  masks the bug rather than deliberately handling it).
- Forgetting `Math.trunc` and passing a fractional index straight
  through — `array[1.5]` is always `undefined` since array indices are
  string-keyed integer properties, so a fractional index should be
  truncated first to match the native method's documented behavior.
- Re-implementing this with `array.slice(index)[0]` — works for
  negative indices but is O(n) (allocates a full sliced copy) for what
  should be an O(1) lookup, and trivializes the exact arithmetic the
  question is testing.
- Not handling `index = 0` distinctly from "falsy index defaults" —
  `resolvedIndex < 0` must be a strict numeric comparison, not a
  truthiness check, or `at(0)` on a non-empty array could be mishandled.

## Interview Follow-up Questions

1. How does `at()` differ in behavior from `array[array.length + index]`
   written out manually, for a *positive* index?
2. How would you extend this to work on strings (`String.prototype.at`),
   and what changes, if anything?
3. Why do you think TC39 added `at()` in ES2022 when `array[-1]` could
   have simply been made to work the same way — what would break if
   bracket notation itself supported negative indices?
4. How would you implement `at` using `Array.prototype.slice` instead,
   and what's the complexity trade-off versus the direct arithmetic
   approach?

## Similar Questions

- [Implement Custom Array prototype slice Polyfill](implement-custom-array-prototype-slice-polyfill.md)
  (shares the same negative-index-to-positive-index normalization)
- [Implement Custom Array prototype indexOf Polyfill](implement-custom-array-prototype-indexof-polyfill.md)
- String negative-index access (`String.prototype.at`)

---
[← Back to 61-javascript-coding](README.md)
