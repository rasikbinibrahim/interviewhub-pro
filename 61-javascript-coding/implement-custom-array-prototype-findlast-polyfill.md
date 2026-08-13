# QJSC023 · Implement Custom Array prototype findLast Polyfill

**Difficulty:** Easy
**Companies Asked:** Amazon, Meta, Google
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Methods / Polyfills
**Concepts:** reverse iteration, predicate callback, early termination

## Problem Statement

Implement `customFindLast(array, predicate)`, a polyfill for
`Array.prototype.findLast`. It searches `array` from the **end toward
the start** and returns the first element for which `predicate` returns
truthy — which, because the search runs backward, is the *last* such
element in the array's normal left-to-right order.

## Input

- `array`: the array to search
- `predicate`: a function `(element, index, array) => boolean`-like
  value, called for each element until one returns truthy

## Output

The matching element, or `undefined` if no element satisfies `predicate`.

## Constraints

- Must search from `array.length - 1` down to `0`, stopping at the
  first match found in that direction.
- `predicate` receives `(element, index, array)` — the same three
  arguments the native method passes, in the same order.
- Must stop as soon as a match is found — must not continue scanning the
  rest of the array once a result is available.
- Returns `undefined` (not `-1`, not `null`) when nothing matches, same
  as `find`.

## Examples

| `array` | `predicate` | Output | Why |
|---|---|---|---|
| `[1, 3, 4, 7, 8]` | `n => n % 2 === 0` | `8` | Scanning from the end, `8` is the first even number encountered |
| `[5, 12, 8, 130, 44]` | `n => n > 100` | `130` | `130` is the only match, found regardless of scan direction |
| `[1, 3, 5]` | `n => n % 2 === 0` | `undefined` | No element satisfies the predicate |

## Edge Cases

- Empty array (`customFindLast([], predicate)`) → `undefined`
  immediately, `predicate` never called.
- Exactly one matching element → that element, regardless of its
  position.
- Every element matches → the *last* element in normal order is
  returned first when scanning backward, so the result is
  `array[array.length - 1]`.
- `predicate` uses the `index` argument (e.g. `(el, i) => i < 2`) → the
  `index` passed must be the element's real position in `array`, not a
  position relative to the reverse scan.
- Sparse array (holes, e.g. `[1, , 3]`) — the native method still visits
  hole positions as `undefined`; a straightforward index-based loop
  naturally does the same.

## Hints

1. "Search from the end" is the entire difference from `find` — the
   loop just needs to run its index downward instead of upward.
2. The loop should start at the last valid index, `array.length - 1`,
   and decrement toward (and including) `0`.
3. `predicate` still reports the element's *true* index in the array
   (not a countdown counter) — pass the loop variable itself as the
   index argument, since it already represents the real position when
   counting down from `length - 1`.

## Algorithm

**Pattern:** reverse linear scan with early exit.
**Core insight:** `findLast` is functionally identical to `find` except
for the direction of traversal — running the index from
`array.length - 1` down to `0` means the first truthy `predicate` result
encountered corresponds to the highest-indexed (i.e. last, in normal
reading order) matching element, without ever needing to scan the whole
array first and remember the last match seen (which would be O(n) even
after finding matches early). Returning immediately on the first
truthy result during the backward scan is what makes this correct *and*
efficient in the common case where a match exists well before the
array's start.
**Invariant:** at the point a match is found at index `i`, every index
from `i + 1` to `array.length - 1` has already been checked and did not
satisfy `predicate` — so `i` is guaranteed to be the highest-indexed
(last, left-to-right) match.

## Dry Run

**Input:** `customFindLast([1, 3, 4, 7, 8], n => n % 2 === 0)`

| Step | index | `array[index]` | `predicate(array[index])` | Action |
|---|---|---|---|---|
| 1 | 4 | 8 | `true` (even) | Match found — return `8` immediately |

**Result:** `8`, found on the very first check because the scan starts
at the end — no need to inspect indices `0`–`3` at all, unlike a
forward `find` call with the same predicate, which would have to scan
past `1, 3, 4` before also landing on a different question entirely
(forward `find` on this array/predicate would return `4`, the *first*
even number, illustrating why direction changes the answer).

## JavaScript Solution

```js
function customFindLast(array, predicate) {
  for (let index = array.length - 1; index >= 0; index -= 1) {
    // Pass (element, index, array) — same signature as the native
    // callback, so existing predicate functions work unmodified.
    if (predicate(array[index], index, array)) {
      return array[index]; // first match found scanning backward = last match in normal order
    }
  }
  return undefined; // no element satisfied predicate
}
```

## TypeScript Solution

```ts
function customFindLast<T>(
  array: readonly T[],
  predicate: (element: T, index: number, array: readonly T[]) => boolean,
): T | undefined {
  for (let index = array.length - 1; index >= 0; index -= 1) {
    if (predicate(array[index] as T, index, array)) {
      return array[index];
    }
  }
  return undefined;
}
```

## Time Complexity

O(n) worst case (no match, or the match is near the start — the scan
must traverse nearly the whole array); O(1) best case (the last element
itself matches).

## Space Complexity

O(1) — a single loop counter, no auxiliary storage.

## Common Mistakes

- Implementing this as `[...array].reverse().find(predicate)` — works,
  but allocates a full reversed copy of `array` (O(n) extra space) just
  to reuse `find`, when a simple backward-counting loop does the same
  work in O(1) space; it also reports the wrong `index` to `predicate`
  (the reversed array's index, not the original array's), which breaks
  any predicate that relies on `index`.
- Continuing the scan after finding a match instead of returning
  immediately — defeats early termination and can silently return the
  wrong (earlier) match if the loop direction/return logic is muddled.
- Confusing `findLast` with `findLastIndex` — returning the *index* of
  the match instead of the element itself.
- Off-by-one on the starting index — starting at `array.length` instead
  of `array.length - 1` reads one position past the end (`undefined`)
  on the first iteration.

## Interview Follow-up Questions

1. How would you implement `findLast` using the existing native `find`
   without allocating a reversed copy of the array?
2. What's the time complexity difference between `findLast` and a
   forward `find` call, in the best and worst cases respectively — are
   they actually different in Big-O terms, or just in typical-case
   constant factors?
3. How would this behave differently if `predicate` also needs to see
   `this` bound to a specific object (i.e. supporting the optional
   `thisArg` second parameter some array methods accept)?
4. Why did TC39 add `findLast`/`findLastIndex` in ES2023 instead of
   expecting developers to keep using `[...array].reverse().find(...)`?

## Similar Questions

- [Implement Custom Array prototype findLastIndex Polyfill](implement-custom-array-prototype-findlastindex-polyfill.md)
- Implement `Array.prototype.find` (forward version)
- Implement `Array.prototype.indexOf`/`lastIndexOf` (equality-based
  instead of predicate-based search)

---
[← Back to 61-javascript-coding](README.md)
