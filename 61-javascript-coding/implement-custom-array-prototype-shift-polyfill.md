# QJSC034 · Implement Custom Array prototype shift Polyfill

**Difficulty:** Easy
**Companies Asked:** Infosys, TCS, Wipro
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Methods / Polyfills
**Concepts:** in-place mutation, index shifting, removal at the front

## Problem Statement

Implement `customShift(array)`, a polyfill for `Array.prototype.shift`.
It must remove the **first** element from `array`, mutating `array` in
place — every remaining element moves down by one index — and return
the element that was removed.

## Input

`array`: the array to mutate.

## Output

The removed (formerly first) element, or `undefined` if `array` was
already empty.

## Constraints

- Must mutate `array` directly, in place — no new array is created or
  returned.
- Every remaining element must shift down by exactly one index (the
  element formerly at index `1` becomes index `0`, index `2` becomes
  index `1`, and so on); `array.length` decreases by one.
- Calling on an empty array must return `undefined` without throwing and
  without changing `array.length`.
- Must not use the native `Array.prototype.shift` internally.

## Examples

| `array` before | Returned | `array` after | Why |
|---|---|---|---|
| `[1, 2, 3]` | `1` | `[2, 3]` | First element removed; everything else shifts down one index |
| `['only']` | `'only'` | `[]` | Removing the sole element leaves an empty array |
| `[]` | `undefined` | `[]` | Nothing to remove; length stays 0, no throw |

## Edge Cases

- Empty array → `undefined`, `array` unchanged.
- Single-element array → element returned, `array` becomes `[]`.
- Large array — every remaining element must shift, so this operation is
  inherently O(n), unlike `pop`'s O(1) — worth stating explicitly, since
  it's a common efficiency trap when `shift` is called repeatedly in a
  loop.
- Array with a stored `undefined` at index `0` (`[undefined, 1, 2]`) →
  still correctly removed and returned; the only way to tell this apart
  from "array was already empty" is that `array.length` actually
  decreased.

## Hints

1. Unlike `pop`, the element being removed isn't at the end — it's at
   index `0` — so simply truncating `.length` won't do the job; every
   *other* element needs to physically move.
2. After capturing `array[0]` as the value to return, every element from
   index `1` onward needs to move one position to the left — index `1`'s
   value goes to index `0`, index `2`'s value goes to index `1`, and so
   on, in that left-to-right order so a value is never overwritten
   before it's been read.
3. Once every element has shifted, the array is left with one
   duplicate value at its old last index — shrinking `.length` by one
   (the same truncation trick from `pop`) removes that trailing
   duplicate and finalizes the new size.

## Algorithm

**Pattern:** capture-then-left-shift, followed by length truncation.
**Core insight:** removing the first element conceptually means every
subsequent element needs to close the gap by moving one position
toward the start. Walking forward through the array (from index `1` to
the end) and copying each element one position back accomplishes this
in a single pass — processing left-to-right guarantees each value is
read from its original position *before* anything overwrites it,
since the write always targets an already-processed (already-copied)
index. After the shift, `array.length` still shows the pre-removal
count with a stale duplicate value trailing at the end, so truncating
`.length` by one (the same technique `pop` uses) removes that leftover
slot.
**Invariant:** after processing index `i` (copying `array[i]` to
`array[i - 1]`), every index from `0` to `i - 1` already holds its
final, post-shift value.

## Dry Run

**Input:** `customShift([10, 20, 30, 40])`

| Step | Action | `array` state |
|---|---|---|
| 1 | `removedElement = array[0]` → `10` | `[10, 20, 30, 40]` (unchanged so far) |
| 2 | Copy `array[1]` (`20`) into `array[0]` | `[20, 20, 30, 40]` |
| 3 | Copy `array[2]` (`30`) into `array[1]` | `[20, 30, 30, 40]` |
| 4 | Copy `array[3]` (`40`) into `array[2]` | `[20, 30, 40, 40]` |
| 5 | Truncate: `array.length = array.length - 1` | `[20, 30, 40]` |

**Result:** `10` is returned, and `array` is mutated in place to `[20,
30, 40]`.

## JavaScript Solution

```js
function customShift(array) {
  if (array.length === 0) {
    return undefined; // nothing to remove
  }

  const removedElement = array[0];

  // Shift every remaining element one position left. Processing
  // left-to-right is essential: array[index] must still hold its
  // original value when it's read, which is guaranteed here because
  // we only ever write to index - 1, an already-processed slot.
  for (let index = 1; index < array.length; index += 1) {
    array[index - 1] = array[index];
  }

  // One stale duplicate now trails at the old last index — truncate
  // it away, same technique as pop().
  array.length = array.length - 1;

  return removedElement;
}
```

## TypeScript Solution

```ts
function customShift<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined;
  }

  const removedElement: T = array[0] as T;

  for (let index = 1; index < array.length; index += 1) {
    array[index - 1] = array[index] as T;
  }

  array.length = array.length - 1;

  return removedElement;
}
```

## Time Complexity

O(n) — every remaining element (up to n - 1 of them) must be copied one
position to the left; this is fundamentally more expensive than `pop`'s
O(1), because removing from the front disturbs every other element's
position, while removing from the end disturbs none.

## Space Complexity

O(1) — one temporary variable for the removed element; the shift happens
in place with no auxiliary array.

## Common Mistakes

- Shifting elements in the *wrong direction* (right-to-left instead of
  left-to-right) — copying `array[index]` into `array[index - 1]`
  starting from the *end* and working backward would overwrite values
  before they're read, corrupting the array; the loop must start at
  index `1` and increase.
- Using `delete array[0]` instead of an actual shift — `delete` leaves a
  hole at index `0` without moving any other elements down and without
  updating `.length`, producing a sparse array, not a properly shifted
  one.
- Forgetting the final `.length` truncation — without it, the array
  retains a stale duplicate of the old last element and reports one
  extra length.
- Assuming `shift` is as cheap as `pop` — treating them as
  interchangeable in a hot loop (e.g. repeatedly `shift`ing a large
  queue) ignores the O(n) cost per call, which compounds to O(n²) across
  n calls; a real queue implementation should avoid repeated `shift` on
  a large array (see follow-up questions).

## Interview Follow-up Questions

1. Why is `shift` fundamentally O(n) while `pop` is O(1), and what does
   that imply about using a plain array as a queue (FIFO) versus a stack
   (LIFO)?
2. How would you implement an efficient queue that avoids the O(n) cost
   of repeated `shift` calls (hint: a circular buffer, or two-stack
   approach)?
3. How does `unshift` (insert at the front) compare in cost to `shift`
   (remove from the front) — are they the same complexity class, and
   why?
4. Could this be implemented using `array.splice(0, 1)` instead — what
   would the trade-offs be versus the manual loop?

## Similar Questions

- [Implement Custom Array prototype pop Polyfill](implement-custom-array-prototype-pop-polyfill.md)
- [Implement Custom Array prototype unshift Polyfill](implement-custom-array-prototype-unshift-polyfill.md)
- Implement a Queue using two Stacks

---
[← Back to 61-javascript-coding](README.md)
