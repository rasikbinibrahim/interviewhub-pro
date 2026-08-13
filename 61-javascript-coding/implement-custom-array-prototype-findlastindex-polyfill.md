# QJSC024 · Implement Custom Array prototype findLastIndex Polyfill

**Difficulty:** Easy
**Companies Asked:** Amazon, Meta, Google
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Methods / Polyfills
**Concepts:** reverse iteration, predicate callback, early termination, index-vs-element return value

## Problem Statement

Implement `customFindLastIndex(array, predicate)`, a polyfill for
`Array.prototype.findLastIndex`. It searches `array` from the **end
toward the start** and returns the **index** of the first element for
which `predicate` returns truthy — which, since the scan runs backward,
is the index of the *last* such element in normal left-to-right order.

## Input

- `array`: the array to search
- `predicate`: a function `(element, index, array) => boolean`-like
  value

## Output

The index (a number `>= 0`) of the last matching element, or `-1` if no
element satisfies `predicate`.

## Constraints

- Must scan from `array.length - 1` down to `0`, returning the index of
  the first match encountered in that direction.
- `predicate` receives `(element, index, array)`, matching the native
  callback signature.
- Must return `-1`, not `undefined`, when no element matches — this is
  the key contract difference from `findLast`, which returns
  `undefined`.
- Must stop scanning as soon as a match is found.

## Examples

| `array` | `predicate` | Output | Why |
|---|---|---|---|
| `[1, 3, 4, 7, 8]` | `n => n % 2 === 0` | `4` | `8` (index `4`) is the last even number, and it's found first when scanning backward |
| `[5, 12, 8, 130, 44]` | `n => n > 100` | `3` | `130` is at index `3`, the only match |
| `[1, 3, 5]` | `n => n % 2 === 0` | `-1` | No element matches — returns `-1`, not `undefined` |

## Edge Cases

- Empty array → `-1` immediately, `predicate` never called.
- Only the first element (`index = 0`) matches → the scan must continue
  all the way down to `0` rather than stopping early with a false
  negative; returns `0`.
- Every element matches → returns `array.length - 1`, the last index in
  normal order (found immediately, since the scan starts there).
- Distinguishing this method's `-1` "not found" sentinel from
  `findLast`'s `undefined` sentinel is itself a common point of
  confusion worth calling out explicitly.

## Hints

1. This is `findLast`'s twin — same backward scan, but track and return
   the *index*, not the element itself.
2. Because the loop already counts the index downward as its control
   variable, no extra bookkeeping is needed to know "what index am I
   at" — the loop variable *is* the answer once a match is found.
3. The not-found sentinel is different from `findLast` — make sure the
   fallback return value is `-1`, matching `indexOf`/`lastIndexOf`'s
   convention, not `undefined`.

## Algorithm

**Pattern:** reverse linear scan with early exit, returning position
instead of value.
**Core insight:** identical traversal strategy to `findLast` — index
runs from `array.length - 1` down to `0`, and the first truthy
`predicate` result during that backward scan corresponds to the
highest-indexed (last, in normal order) match. The only difference is
what gets returned: the loop's own index variable, rather than
`array[index]`. Using `-1` as the fallback (rather than `undefined`)
mirrors `indexOf`/`lastIndexOf`'s established convention for "no match,"
which is why `findLastIndex` and `findLast` intentionally have different
not-found sentinels despite otherwise near-identical logic.
**Invariant:** when a match is found at index `i`, every index from
`i + 1` through `array.length - 1` has already been checked and failed
to match, guaranteeing `i` is the highest (last, left-to-right) matching
index.

## Dry Run

**Input:** `customFindLastIndex([1, 3, 4, 7, 8], n => n % 2 === 0)`

| Step | index | `array[index]` | `predicate(array[index])` | Action |
|---|---|---|---|---|
| 1 | 4 | 8 | `true` | Match — return index `4` immediately |

**Result:** `4` — the index of `8`, the last even number in the array,
found on the first check of the backward scan.

## JavaScript Solution

```js
function customFindLastIndex(array, predicate) {
  for (let index = array.length - 1; index >= 0; index -= 1) {
    if (predicate(array[index], index, array)) {
      return index; // return the POSITION, not the element itself
    }
  }
  return -1; // sentinel for "no match" — matches indexOf's convention
}
```

## TypeScript Solution

```ts
function customFindLastIndex<T>(
  array: readonly T[],
  predicate: (element: T, index: number, array: readonly T[]) => boolean,
): number {
  for (let index = array.length - 1; index >= 0; index -= 1) {
    if (predicate(array[index] as T, index, array)) {
      return index;
    }
  }
  return -1;
}
```

## Time Complexity

O(n) worst case (no match, or match near the start of the array); O(1)
best case (the last element itself matches, found on the very first
check).

## Space Complexity

O(1) — a single loop counter, no auxiliary storage.

## Common Mistakes

- Returning `undefined` instead of `-1` when nothing matches — a
  reasonable-sounding mistake since `findLast` (its sibling method) does
  return `undefined`, but `findLastIndex` deliberately follows
  `indexOf`'s `-1` convention instead, because `0` is itself a valid
  index and needs to be unambiguously distinguishable from "not found."
- Returning `array[index]` (the element) instead of `index` itself —
  confusing this method with `findLast`.
- Reusing a reversed-copy-plus-`findIndex` approach
  (`array.length - 1 - [...array].reverse().findIndex(predicate)`) — the
  arithmetic to translate the reversed index back to the original is
  error-prone (easy to be off by one), and it costs O(n) extra space for
  the reversed copy, for no benefit over a direct backward loop.
- Treating `index = 0`'s match as falsy in a subsequent `if
  (findLastIndexResult)` check elsewhere in calling code — `0` is a
  legitimate found-index, not a "not found" signal, so callers must
  compare explicitly against `-1`, not just truthiness.

## Interview Follow-up Questions

1. Why does `findLastIndex` return `-1` for "not found" while
   `findLast` returns `undefined` for the same situation — what
   convention is each one following, and why do those conventions
   differ?
2. How would you implement `lastIndexOf` (equality-based) by
   specializing this predicate-based approach?
3. Could you derive `findLastIndex`'s result directly from
   `findLast`'s, or do they need genuinely separate implementations?
   (Hint: think about what information `findLast` alone gives you.)
4. How would you add an optional `fromIndex` parameter so the backward
   search starts somewhere other than the very last element?

## Similar Questions

- [Implement Custom Array prototype findLast Polyfill](implement-custom-array-prototype-findlast-polyfill.md)
- [Implement Custom Array prototype lastIndexOf Search](implement-custom-array-prototype-lastindexof-search.md)
- Implement `Array.prototype.findIndex` (forward version)

---
[← Back to 61-javascript-coding](README.md)
