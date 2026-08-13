# QJSC046 · Implement a Custom Array.prototype.lastIndexOf Polyfill

**Difficulty:** Easy
**Companies Asked:** Infosys, TCS, Wipro
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Method Polyfills
**Concepts:** backward linear search, strict-equality (`===`) comparison, sparse-array hole skipping, `fromIndex` normalization

## Problem Statement

Implement `myLastIndexOf`, a polyfill for `Array.prototype.lastIndexOf`,
attached as `Array.prototype.myLastIndexOf`. Called as
`array.myLastIndexOf(searchElement, fromIndex)`, it searches
**backward**, starting from `fromIndex` (default: the last index) down
to index `0`, and returns the first index it encounters — which is the
*last* occurrence in forward order — where `searchElement` strictly
(`===`) equals the element. If no match is found, it returns `-1`.

## Input

- The array `myLastIndexOf` is called on (possibly sparse).
- `searchElement`: the value being searched for.
- `fromIndex` (optional, default `array.length - 1`): the index to start
  the backward search from; may be negative.

## Output

A number: the highest index at or before the (normalized) `fromIndex`
whose element strictly equals `searchElement`, or `-1` if none does.

## Constraints

- `0 <= array.length <= 10^5`
- Must search backward (from `fromIndex` down to `0`), not forward.
- Must use strict equality (`===`) — `NaN` can never be found, same
  caveat as `indexOf`.
- Must skip holes in sparse arrays.
- Negative `fromIndex` is normalized by adding `length`; if the result
  is *still* negative, the array is not searched at all and `-1` is
  returned immediately (this differs from `indexOf`, which clamps a
  still-negative normalized index to `0` instead).
- `fromIndex >= length` is clamped down to `length - 1`.
- Must not call the native `Array.prototype.lastIndexOf` internally.

## Examples

| Input | Output | Why |
|---|---|---|
| `[1, 2, 3, 2].myLastIndexOf(2)` | `3` | with no `fromIndex`, the search starts at the last index and finds the match closest to the end first |
| `[1, 2, 3, 2].myLastIndexOf(2, 2)` | `1` | `fromIndex = 2` starts the backward search at index 2 (`3`), skipping the match at index 3 entirely since it's after the start point |
| `[1, 2, 3].myLastIndexOf(NaN)` | `-1` | strict equality means `NaN === NaN` is `false` — same reason `indexOf` can never find `NaN` |

## Edge Cases

- `searchElement` not present → `-1`.
- `fromIndex` negative enough that `length + fromIndex` is still
  negative (e.g. `fromIndex = -100` on a length-3 array) → the array is
  not searched at all, `-1` is returned immediately — **not** clamped to
  `0` the way `indexOf` clamps a too-negative `fromIndex`.
- `fromIndex >= length` (including out-of-range positive values) →
  clamps down to `length - 1`, i.e. "start from the actual last index."
- A hole in a sparse array, e.g. `[1, , 3].myLastIndexOf(undefined)` →
  `-1`, the hole is skipped, never compared against `undefined`.
- Empty array → `-1` regardless of `searchElement`.

## Hints

1. This is `indexOf`'s mirror image: default starting point is the
   *last* valid index instead of `0`, and the loop counts *down* to `0`
   instead of up to `length - 1`.
2. `fromIndex` normalization has one important asymmetry with
   `indexOf`: if a negative `fromIndex`, after adding `length`, is
   *still* negative, `lastIndexOf` gives up immediately and returns
   `-1` — it does **not** clamp up to `0` and search forward from there
   the way `indexOf` would.
3. Holes are skipped with the same `index in this` guard as `indexOf` —
   `lastIndexOf` never treats a hole as a candidate `undefined` match,
   unlike `includes`.

## Algorithm

**Pattern:** linear backward scan with strict equality and a
hole-existence guard, starting from a normalized/clamped index.
**Core insight:** reusing `indexOf`'s comparison logic (`===`, skip
holes) but reversing both the default start point and the direction of
travel is sufficient — the only genuinely new piece of logic is
`fromIndex` normalization, which has a different edge case than
`indexOf`'s: a too-negative index means "there's nothing valid to search
backward from," so the correct response is to bail out with `-1`
immediately, not to clamp into a still-valid but semantically wrong
starting point.
**Invariant:** at each step, every index strictly *after* the current
one, down to (and including) the normalized `fromIndex`, has already
been checked and did not strictly equal `searchElement` — so the first
match found while scanning downward is guaranteed to be the highest
(last, in forward-reading order) matching index.

## Dry Run

**Input:** `[1, 2, 3, 2].myLastIndexOf(2, 2)`

| Step | index | `index in this`? | element | `element === 2`? | Action |
|---|---|---|---|---|---|
| — | normalize `fromIndex = 2` | — | — | — | already `< length` and non-negative → `startIndex = 2` |
| 1 | 2 | yes | `3` | `false` | continue, decrement to index 1 |
| 2 | 1 | yes | `2` | `true` | return `1` |

**Result:** `1` — the match at index 3 is never considered because the
backward scan starts at index 2, matching Example 2.

## JavaScript Solution

```js
Array.prototype.myLastIndexOf = function (searchElement, fromIndex) {
  const length = this.length;
  if (length === 0) {
    return -1;
  }

  // Default: start from the very last index, not 0.
  const rawFromIndex = fromIndex === undefined ? length - 1 : fromIndex;

  // Negative fromIndex counts back from the end. Unlike indexOf, if the
  // result is STILL negative, there is nothing valid to search — bail
  // out immediately instead of clamping up to 0.
  let startIndex = rawFromIndex < 0 ? length + rawFromIndex : rawFromIndex;
  if (startIndex < 0) {
    return -1;
  }
  startIndex = Math.min(startIndex, length - 1); // clamp an over-large fromIndex

  for (let index = startIndex; index >= 0; index -= 1) {
    // Holes are skipped entirely, same rule as indexOf.
    if (!(index in this)) {
      continue;
    }

    if (this[index] === searchElement) {
      return index; // strict equality — NaN can never match here
    }
  }

  return -1;
};
```

## TypeScript Solution

```ts
interface Array<T> {
  myLastIndexOf(searchElement: T, fromIndex?: number): number;
}

Array.prototype.myLastIndexOf = function <T>(
  this: T[],
  searchElement: T,
  fromIndex?: number,
): number {
  const length = this.length;
  if (length === 0) {
    return -1;
  }

  const rawFromIndex = fromIndex === undefined ? length - 1 : fromIndex;

  let startIndex = rawFromIndex < 0 ? length + rawFromIndex : rawFromIndex;
  if (startIndex < 0) {
    return -1;
  }
  startIndex = Math.min(startIndex, length - 1);

  for (let index = startIndex; index >= 0; index -= 1) {
    if (!(index in this)) {
      continue;
    }

    if (this[index] === searchElement) {
      return index;
    }
  }

  return -1;
};
```

## Time Complexity

O(n) worst case — the match is near index `0`, or absent entirely, so
the scan runs from `startIndex` down to `0`.

## Space Complexity

O(1) — only scalar locals, independent of array size.

## Common Mistakes

- Defaulting `fromIndex` to `0` instead of `length - 1` — this makes the
  backward scan only ever check a single index (or none), defeating the
  entire "search from the end" behavior the method name promises.
- Clamping a too-negative `fromIndex` to `0` (copying `indexOf`'s rule
  verbatim) instead of returning `-1` immediately — `lastIndexOf`'s spec
  behavior is genuinely different here, and this is the single most
  common bug when a candidate assumes the two methods are perfect
  mirrors of each other in every detail.
- Not clamping an out-of-range positive `fromIndex` down to `length -
  1` — without this, the loop could start past the end of the array.
- Using SameValueZero instead of strict equality — same `NaN` pitfall as
  `indexOf`.

## Interview Follow-up Questions

1. Why does `lastIndexOf`'s negative-`fromIndex` handling differ from
   `indexOf`'s (bail out to `-1` vs. clamp to `0`) — what does that
   asymmetry say about what each method considers "nothing left to
   search"?
2. Could you implement `lastIndexOf` by reversing a copy of the array
   and calling `indexOf` on it? What extra index-correction math would
   that require, and why might it be less efficient than a direct
   backward scan?
3. How does this relate to
   [findLastIndex](implement-custom-array-prototype-findlastindex-polyfill.md),
   which also searches backward but takes a predicate callback instead
   of a raw value — and does *not* skip holes, unlike this method?
4. How would you find *every* index of a value instead of just the last
   one?
5. If this were called repeatedly against the same large, unchanging
   array, how would you speed up repeated lookups?

## Similar Questions

- [Implement a Custom Array.prototype.indexOf Polyfill](implement-custom-array-prototype-indexof-polyfill.md)
- [Implement a Custom Array.prototype.includes Polyfill](implement-custom-array-prototype-includes-polyfill.md)
- [Implement a Custom Array.prototype.findLastIndex Polyfill](implement-custom-array-prototype-findlastindex-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
