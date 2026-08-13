# QJSC019 · Implement a Custom Array.prototype.indexOf Polyfill

**Difficulty:** Easy
**Companies Asked:** Infosys, TCS, Wipro
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Array Method Polyfills
**Concepts:** strict-equality (`===`) comparison, sparse-array hole skipping, negative `fromIndex` normalization

## Problem Statement

Implement `myIndexOf`, a polyfill for `Array.prototype.indexOf`,
attached as `Array.prototype.myIndexOf`. Called as
`array.myIndexOf(searchElement, fromIndex)`, it returns the first index
at or after `fromIndex` where `searchElement` is found using **strict
equality** (`===`) — not SameValueZero — meaning it can never report a
match for `NaN`, since `NaN === NaN` is always `false`. `fromIndex`
defaults to `0` and may be negative, counted back from the end of the
array. If no match is found, it returns `-1`.

## Input

- The array `myIndexOf` is called on (possibly sparse).
- `searchElement`: the value being searched for.
- `fromIndex` (optional, default `0`): index to start searching from,
  may be negative.

## Output

A number: the first matching index at or after the (normalized)
`fromIndex`, or `-1` if there's no match.

## Constraints

- `0 <= array.length <= 10^5`
- Must use strict equality (`===`), not SameValueZero — `NaN` can never
  be found, even when searching for `NaN` in an array containing `NaN`.
- Must skip holes in sparse arrays — a hole is never a candidate match,
  regardless of what's being searched for (including `undefined`).
- `fromIndex` may be negative; normalize by adding `length`, then clamp
  to `0` if still negative.
- Must not call the native `Array.prototype.indexOf` internally.

## Examples

| Input | Output | Why |
|---|---|---|
| `[1, 2, 3, 2].myIndexOf(2)` | `1` | the first match, scanning left to right |
| `[1, 2, 3].myIndexOf(NaN)` | `-1` | strict equality means `NaN === NaN` is `false` — `indexOf` can *never* find `NaN`, no matter how many times it appears |
| `[1, 2, 3, 2].myIndexOf(2, 2)` | `3` | `fromIndex = 2` skips the earlier match at index 1; the search only considers indices 2 and onward |

## Edge Cases

- `searchElement` not present anywhere in range → `-1`.
- `fromIndex >= length` → `-1` immediately, nothing left to search.
- `fromIndex` more negative than `-length` → clamps to `0`, searching
  the whole array.
- A hole in a sparse array, e.g. `[1, , 3].myIndexOf(undefined)` →
  `-1` — the hole is skipped entirely, never compared against
  `undefined`. This is the classic contrast with
  [includes](implement-custom-array-prototype-includes-polyfill.md),
  which treats the same hole as if it held `undefined` and would return
  `true` for `.includes(undefined)`.
- Empty array → `-1` regardless of `searchElement`.

## Hints

1. Unlike `includes`, there's no special-casing needed for equality —
   plain `===` is exactly the comparison `indexOf` uses, which is
   precisely why it can never find `NaN`.
2. A hole must never be treated as a candidate — check `index in this`
   before comparing, the same guard used in `every`/`some`/`filter`,
   *not* the "compare the read-out value" approach `includes` uses.
3. Normalize `fromIndex` exactly like other methods that accept it: add
   `length` if negative, then clamp to `0` if the result is still
   negative.

## Algorithm

**Pattern:** linear scan with strict equality and a hole-existence
guard, starting from a normalized index.
**Core insight:** `indexOf` is `includes`'s stricter, index-returning
sibling — same normalized-`fromIndex` scan, but two things differ: the
comparison is plain `===` (no `NaN`-equals-`NaN` carve-out), and holes
are skipped via existence-checking rather than read as `undefined`.
Those two differences are exactly why `[NaN].indexOf(NaN) === -1` but
`[NaN].includes(NaN) === true`, and why `[, ].indexOf(undefined) === -1`
but `[, ].includes(undefined) === true`.
**Invariant:** at each step, every present index strictly before the
current one — starting from the normalized `fromIndex` — has already
been checked and did not strictly equal `searchElement`.

## Dry Run

**Input:** `[1, 2, 3, 2].myIndexOf(2, 2)`

| Step | index | `index in this`? | element | `element === 2`? | Action |
|---|---|---|---|---|---|
| — | normalize `fromIndex = 2` | — | — | — | `startIndex = 2` (already non-negative, no adjustment needed) |
| 1 | 2 | yes | `3` | `false` | continue |
| 2 | 3 | yes | `2` | `true` | return `3` |

**Result:** `3` — the match at index 1 is never considered because the
scan starts at index 2, matching Example 3.

## JavaScript Solution

```js
Array.prototype.myIndexOf = function (searchElement, fromIndex = 0) {
  const length = this.length;
  if (length === 0) {
    return -1;
  }

  // Same negative-index normalization as includes/fill: count back
  // from the end, then clamp to 0 if still negative.
  const startIndex = fromIndex < 0 ? Math.max(length + fromIndex, 0) : fromIndex;

  for (let index = startIndex; index < length; index += 1) {
    // Holes are skipped entirely — a hole is never a candidate match,
    // even when searching for `undefined` (contrast with `includes`).
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
  myIndexOf(searchElement: T, fromIndex?: number): number;
}

Array.prototype.myIndexOf = function <T>(
  this: T[],
  searchElement: T,
  fromIndex = 0,
): number {
  const length = this.length;
  if (length === 0) {
    return -1;
  }

  const startIndex = fromIndex < 0 ? Math.max(length + fromIndex, 0) : fromIndex;

  for (let index = startIndex; index < length; index += 1) {
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

O(n) worst case — the match is at the last index, or absent entirely, so
the scan runs from `startIndex` to `length - 1`.

## Space Complexity

O(1) — only scalar locals, independent of array size.

## Common Mistakes

- Using SameValueZero (or `Object.is`) instead of plain `===` — this
  would make `myIndexOf` incorrectly "find" `NaN`, which is precisely
  the behavior `indexOf` is famous for lacking (and exactly why
  `includes` was added later).
- Reading `this[index]` and comparing without first checking `index in
  this` — this silently treats a hole as `undefined` and can return a
  wrong index (or find a false match) for `myIndexOf(undefined)` on a
  sparse array, when the correct behavior is to skip the hole entirely.
- Forgetting to clamp a very negative `fromIndex` to `0` before starting
  the loop.
- Confusing this with `lastIndexOf` — this scans forward from
  `fromIndex`; `lastIndexOf` scans backward from `fromIndex` (or the end
  of the array), and returns the *last* match, not the first.

## Interview Follow-up Questions

1. Why can `indexOf` never find `NaN`, and what's the one-line fix if
   you needed `NaN`-aware searching (hint: that fix *is* `includes`)?
2. Why does `indexOf` skip holes while `includes` treats them as
   `undefined` — what does this suggest about when each was added to
   the spec (ES5 vs. ES2016) and what conventions were established by
   then?
3. How would you implement `lastIndexOf` by reusing most of this logic,
   just changing the direction and default starting point?
4. If this method were called very frequently against the same large,
   unchanging array, how would you speed up repeated lookups (e.g. a
   `Map<value, index[]>` built once)?
5. How would `indexOf`'s behavior need to change to support searching
   for objects by structural/deep equality instead of reference
   equality?

## Similar Questions

- [Implement a Custom Array.prototype.includes Polyfill](implement-custom-array-prototype-includes-polyfill.md)
- [Implement a Custom Array.prototype.lastIndexOf Polyfill](implement-custom-array-prototype-lastindexof-search.md)
- [Implement a Custom Array.prototype.findIndex Polyfill](implement-custom-array-prototype-findindex-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
