# PF017 · Find the Largest Number in an Array

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, TCS, Infosys
**Interview Frequency:** ★★★★★
**Category:** Programming Fundamentals
**Concepts:** arrays, loops, linear-scan

## Problem Statement

Write a function `findLargest(arr)` that returns the largest number in
an array of integers, without using `Math.max` or `Array.prototype.sort`.

## Input

`arr`: an array of numbers (may be empty).

## Output

The largest number in `arr`, or `null` if `arr` is empty.

## Constraints

`0 <= arr.length <= 10^5`, `-10^9 <= arr[i] <= 10^9`

## Examples

| Input | Output | Why |
|---|---|---|
| `[3, 7, 2, 9, 4]` | `9` | 9 is greater than every other element |
| `[-5, -1, -8]` | `-1` | The least negative value is the largest |
| `[]` | `null` | No elements to compare — nothing to return |

## Edge Cases

- Empty array → `null` (nothing to compare)
- Single-element array → that element is trivially the largest
- All elements equal → that shared value is the largest
- All-negative array → the running maximum must be seeded from the
  array's own first element, not from `0`

## Hints

1. `Math.max(...arr)` trivializes exactly what this exercise tests — a
   manual linear scan. What single value would you need to track as you
   walk through the array once?
2. Seed your "current largest" from the array's first element, not from
   `0` — seeding from `0` breaks silently on an all-negative array.
3. At each subsequent index, you only need one comparison: is this
   element bigger than what you're currently tracking? If so, update;
   otherwise move on.

## Algorithm

**Pattern:** single-pass linear scan with a running maximum.
**Core insight:** you never need to compare every pair of elements — you
only need to remember the single largest value seen *so far* and compare
each new element against it once. Seeding that running maximum from the
array's own first element (rather than `0` or `-Infinity`) means the
logic works correctly even when every value is negative.
**Invariant:** after processing index `i`, `max` holds the largest value
among `arr[0..i]`.

## Dry Run

**Input:** `[3, 7, 2, 9, 4]`

| Step | i | arr[i] | arr[i] > max? | max |
|---|---|---|---|---|
| start | – | – | – | `3` (seeded from arr[0]) |
| 1 | 1 | 7 | yes | 7 |
| 2 | 2 | 2 | no | 7 |
| 3 | 3 | 9 | yes | 9 |
| 4 | 4 | 4 | no | 9 |

Loop ends. **Result:** `9` — matches expected output.

## JavaScript Solution

```js
function findLargest(arr) {
  if (!arr || arr.length === 0) return null;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}
```

## TypeScript Solution

```ts
function findLargest(arr: number[]): number | null {
  if (!arr || arr.length === 0) return null;
  let max: number = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}
```

## Time Complexity

O(n) — one pass over every element exactly once.

## Space Complexity

O(1) — a single `max` variable regardless of input size.

## Common Mistakes

- Seeding `max` from `0` instead of `arr[0]` — silently wrong whenever
  every value in the array is negative.
- Using `Math.max(...arr)` — trivializes the manual scan this exercise
  tests, and can hit an argument-limit error on very large arrays.
- Not handling the empty-array case, leaving `max` as `undefined`
  instead of a defined "no answer" value like `null`.

## Interview Follow-up Questions

1. How would you find both the largest and second-largest value in a
   single pass?
2. How would this change if you needed the *index* of the largest
   element instead of its value?
3. How would you adapt this to find the largest value across a stream
   of numbers you can only read once, with no array to re-scan?

## Similar Questions

- Find Second Largest Number in an Array (see [pf019-find-second-largest-number-in-array.md](pf019-find-second-largest-number-in-array.md))
- Find Missing Number in Sequence (see [pf033-find-missing-number-in-sequence.md](pf033-find-missing-number-in-sequence.md))

---
[← Back to Programming Fundamentals](README.md)
