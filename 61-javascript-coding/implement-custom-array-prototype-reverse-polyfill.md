# QJSC036 · Implement Custom Array prototype reverse Polyfill

**Difficulty:** Easy
**Companies Asked:** Infosys, TCS, Wipro
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Methods / Polyfills
**Concepts:** two-pointer swap, in-place mutation, same-reference return

## Problem Statement

Implement `customReverse(array)`, a polyfill for
`Array.prototype.reverse`. It must reverse the order of `array`'s
elements **in place** — mutating the original array — and return a
reference to that same array (not a new, separately-allocated one).

## Input

`array`: the array to reverse.

## Output

The same `array` reference, with its elements now in reverse order.

## Constraints

- Must mutate `array` in place — must not build and return a new
  array (e.g. via `.slice().reverse()` internally, or manual
  construction).
- The returned value must be `===` (strictly the same reference) to the
  `array` argument, not merely equal in contents.
- Must not use the native `Array.prototype.reverse` internally.
- Works for any length, including `0` and `1` (both are already
  "reversed" trivially).

## Examples

| `array` before | Returned | `array` after | Why |
|---|---|---|---|
| `[1, 2, 3, 4]` | same reference | `[4, 3, 2, 1]` | Elements mirrored end-to-end |
| `[1, 2, 3]` | same reference | `[3, 2, 1]` | Odd length: the middle element (`2`) stays in place, swapped with itself conceptually |
| `[42]` | same reference | `[42]` | Single element is trivially its own reverse |

## Edge Cases

- Empty array (`[]`) → returns the same empty array, unchanged.
- Single-element array → returned unchanged (no swap needed or
  performed).
- Odd-length array → the exact middle element never participates in a
  swap (the two-pointer loop naturally stops before `left` and `right`
  cross at that position).
- Caller relies on the return value being reference-equal to the
  original (`const same = customReverse(arr); same === arr`) → must be
  `true`, not just deep-equal.

## Hints

1. Reversing in place means swapping pairs of elements from opposite
   ends moving inward — you don't need any extra array to hold
   intermediate state.
2. Two index pointers, one starting at `0` and one at `array.length -
   1`, moving toward each other one step at a time after each swap, are
   exactly enough to visit every pair that needs swapping — and no
   pair twice.
3. The loop should stop once the two pointers meet or cross (`left <
   right`), not continue past that point — continuing would undo the
   swaps you already made.

## Algorithm

**Pattern:** two-pointer, symmetric in-place swap.
**Core insight:** reversing an array is equivalent to swapping the
element at position `i` with the element at position `array.length - 1
- i`, for every `i` from `0` up to (but not including) the middle.
Using two pointers — `left` starting at the beginning, `right` starting
at the end, each stepping toward the center after every swap — visits
exactly those pairs, once each, and naturally leaves a middle element
(in an odd-length array) untouched, since `left` and `right` meet there
without ever needing to "swap it with itself."
**Invariant:** after each iteration, every position outside the current
`[left, right]` window already holds its final, reversed-order value;
only positions strictly between `left` and `right` (inclusive) remain
to be resolved.

## Dry Run

**Input:** `customReverse([1, 2, 3, 4, 5])`

| Step | `left` | `right` | `array[left]` ↔ `array[right]` | `array` after swap |
|---|---|---|---|---|
| 1 | 0 | 4 | `1` ↔ `5` | `[5, 2, 3, 4, 1]` |
| 2 | 1 | 3 | `2` ↔ `4` | `[5, 4, 3, 2, 1]` |
| 3 | 2 | 2 | `left < right`? `2 < 2` → false, loop ends | `[5, 4, 3, 2, 1]` |

**Result:** `[5, 4, 3, 2, 1]` — the middle element (`3`, at index `2`)
was never swapped because `left` and `right` met exactly there, which is
correct: a middle element in an odd-length reversal stays put.

## JavaScript Solution

```js
function customReverse(array) {
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    // Swap the pair using a temporary variable — no destructuring
    // spread or extra array needed, keeping this O(1) space.
    const temp = array[left];
    array[left] = array[right];
    array[right] = temp;

    left += 1;
    right -= 1;
  }

  return array; // same reference, now mutated in place
}
```

## TypeScript Solution

```ts
function customReverse<T>(array: T[]): T[] {
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    const temp: T = array[left] as T;
    array[left] = array[right] as T;
    array[right] = temp;

    left += 1;
    right -= 1;
  }

  return array;
}
```

## Time Complexity

O(n) — each of the `n / 2` swaps touches two elements once, so total
work is linear in `array.length`.

## Space Complexity

O(1) — a single `temp` variable and two index pointers; no auxiliary
array proportional to input size.

## Common Mistakes

- Building a new reversed array (`array.slice().reverse()`, or manually
  pushing into a fresh array from the end) and returning that instead of
  mutating `array` — produces the right *values* but violates the
  in-place contract, and the return value fails a `result === array`
  reference check.
- Looping the full length and swapping each element with its mirror
  *twice* (once as `array[i]` ↔ `array[n-1-i]`, and again later when `i`
  reaches the old `n-1-i` position) — undoes the first swap, leaving the
  array unreversed. The `left < right` stopping condition exists
  specifically to prevent this.
- Using `left <= right` instead of `left < right` — on an odd-length
  array, this makes the middle element swap with itself, which is
  harmless in isolation but signals a misunderstanding of why the
  strict `<` is actually necessary (it avoids one wasted iteration, not
  a correctness bug in this specific case, though the reasoning matters).
- Forgetting to return `array` at all (or returning `undefined` from a
  function with no explicit return) — the native method's return value
  is used by chained calls like `array.reverse().join(',')`.

## Interview Follow-up Questions

1. Why does `reverse` mutate in place and return the same reference,
   while `toReversed()` (ES2023) does the opposite — when would you
   reach for each?
2. How would you reverse only a sub-range of the array (indices `start`
   to `end`), reusing this same two-pointer technique?
3. How does this generalize to reversing a singly linked list — what's
   the same, and what's fundamentally different about the technique
   there?
4. What would break if you tried to reverse the array using
   `array.forEach` with a single forward-only index instead of two
   pointers?

## Similar Questions

- Implement `Array.prototype.toReversed` (non-mutating variant, ES2023)
- Reverse a string in place (character array version of the same
  two-pointer swap)
- Reverse a singly linked list

---
[← Back to 61-javascript-coding](README.md)
