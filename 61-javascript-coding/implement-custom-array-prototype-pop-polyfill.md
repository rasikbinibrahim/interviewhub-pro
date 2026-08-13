# QJSC033 · Implement Custom Array prototype pop Polyfill

**Difficulty:** Easy
**Companies Asked:** Infosys, TCS, Wipro
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Methods / Polyfills
**Concepts:** in-place mutation, `.length` manipulation, removal at the end

## Problem Statement

Implement `customPop(array)`, a polyfill for `Array.prototype.pop`. It
must remove the **last** element from `array`, mutating `array` in
place, and return the element that was removed.

## Input

`array`: the array to mutate.

## Output

The removed element, or `undefined` if `array` was already empty.

## Constraints

- Must mutate `array` directly — no new array is created or returned.
- `array.length` must decrease by exactly one after a successful
  removal (and must not go negative or change at all if `array` was
  already empty).
- Calling on an empty array must return `undefined` without throwing and
  without changing `array.length` (which is already `0`).
- Must not use the native `Array.prototype.pop` internally.

## Examples

| `array` before | Returned | `array` after | Why |
|---|---|---|---|
| `[1, 2, 3]` | `3` | `[1, 2]` | Last element removed and returned; length drops from 3 to 2 |
| `['only']` | `'only'` | `[]` | Removing the sole element leaves an empty array |
| `[]` | `undefined` | `[]` | Nothing to remove; length stays 0, no throw |

## Edge Cases

- Empty array → `undefined`, `array` unchanged (still `[]`, length still
  `0`).
- Single-element array → removed element returned, `array` becomes `[]`.
- Array containing `undefined` as an actual stored value (`[1, 2,
  undefined]`) → still correctly removes and returns `undefined` — this
  must be distinguished conceptually from "array was empty," even though
  both cases return `undefined` to the caller (the *only* observable
  difference is whether `array.length` changed).
- Very large array — the removal must still be O(1), not proportional to
  `array.length`, since only the last position is touched.

## Hints

1. The element to remove is always at `array[array.length - 1]` — no
   searching required, the position is already known.
2. After capturing that element, the array's `length` property can be
   *assigned* directly — setting `array.length = array.length - 1` is a
   real, spec-defined way to truncate an array and delete the last
   slot, not just a display value.
3. Handle the empty-array case first, before touching `.length` at all
   — decrementing an already-`0` length would produce `-1`, which is
   invalid and must never happen.

## Algorithm

**Pattern:** direct last-index removal via `.length` truncation.
**Core insight:** in JS, an array's `.length` isn't just a read-only
count — assigning a smaller number to it actually deletes the trailing
elements above the new length, a real mutation the spec defines
specifically for this purpose. So "removing the last element" reduces
to: read `array[array.length - 1]` to capture the value being removed,
then set `array.length -= 1` to both delete that slot and shrink the
array by one, in a single O(1) operation — no shifting of any other
element is needed, because only the very end of the array changes.
**Invariant:** before mutation, `array.length` accurately reflects the
number of elements; after mutation, `array.length` is exactly one less
(or unchanged, if it was already `0`), and every element at index `0`
through the new `length - 1` is untouched.

## Dry Run

**Input:** `customPop([10, 20, 30])`

| Step | Expression | Value |
|---|---|---|
| 1 | `array.length` | `3` |
| 2 | `array.length === 0`? | `false` — proceed |
| 3 | `removedElement = array[array.length - 1]` | `array[2] = 30` |
| 4 | `array.length = array.length - 1` | `array.length` becomes `2`, deleting index `2` |
| 5 | return `removedElement` | `30` |

**Result:** `30` is returned, and `array` is mutated in place to `[10,
20]` — the same reference, now with two elements.

## JavaScript Solution

```js
function customPop(array) {
  if (array.length === 0) {
    return undefined; // nothing to remove; length already 0, leave untouched
  }

  const removedElement = array[array.length - 1];

  // Assigning .length truncates the array, deleting the trailing slot —
  // this IS the mutation, not just bookkeeping after a separate delete.
  array.length = array.length - 1;

  return removedElement;
}
```

## TypeScript Solution

```ts
function customPop<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined;
  }

  const removedElement: T = array[array.length - 1] as T;
  array.length = array.length - 1;

  return removedElement;
}
```

## Time Complexity

O(1) — a single index read and one `.length` assignment, independent of
`array`'s size.

## Space Complexity

O(1) — one temporary variable holds the removed element; no allocation
scales with `array`'s size.

## Common Mistakes

- Using `delete array[array.length - 1]` instead of truncating
  `.length` — `delete` removes the value but leaves a *hole* at that
  index and does **not** shrink `array.length`, so the array ends up
  sparse (`[10, 20, <empty>]`) with a length that's still `3`, which is
  not what `pop` does.
- Returning a brand-new array with the last element removed (e.g. via
  `array.slice(0, -1)`) instead of mutating `array` in place and
  returning just the removed element — wrong return type *and* violates
  `pop`'s in-place-mutation contract.
- Not guarding the empty-array case before decrementing `.length` —
  `array.length = -1` throws a `RangeError` in real JS (array lengths
  must be non-negative), so the empty check must come first.
- Forgetting that `array[array.length - 1]` must be read **before**
  `.length` is reassigned — reading it after would read from the
  already-shrunk array, which no longer has that index.

## Interview Follow-up Questions

1. Why does assigning to `array.length` actually delete elements, and
   what does that reveal about how JS arrays are really implemented
   internally (versus a fixed-size array in a language like C)?
2. How would you implement `shift` (remove from the *front*) — why is
   it necessarily more expensive than `pop`?
3. What happens to `array.length` if you assign it a value *larger*
   than the current length — does that also work, and what does the
   array look like afterward?
4. How would you implement a `push`/`pop`-based stack data structure on
   top of a plain array using these two operations?

## Similar Questions

- [Implement Custom Array prototype push Polyfill](implement-custom-array-prototype-push-polyfill.md)
- [Implement Custom Array prototype shift Polyfill](implement-custom-array-prototype-shift-polyfill.md)
- [Implement Custom Array prototype unshift Polyfill](implement-custom-array-prototype-unshift-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
