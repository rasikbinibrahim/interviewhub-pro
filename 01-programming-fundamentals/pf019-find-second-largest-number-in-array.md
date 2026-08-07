# PF019 · Find Second Largest Number in an Array

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, TCS, Infosys
**Interview Frequency:** ★★★★☆
**Category:** Programming Fundamentals
**Concepts:** arrays, loops, linear-scan

## Problem Statement

Write a function `findSecondLargest(arr)` that returns the second
largest *distinct* value in an array of numbers, in a single pass and
without sorting.

## Input

`arr`: an array of numbers.

## Output

The second largest distinct number in `arr`, or `null` if no such value
exists (fewer than two elements, or every element is equal).

## Constraints

`0 <= arr.length <= 10^5`, `-10^9 <= arr[i] <= 10^9`

## Examples

| Input | Output | Why |
|---|---|---|
| `[3, 7, 2, 9, 4]` | `7` | 9 is largest, 7 is the next distinct value down |
| `[5, 5, 3]` | `3` | Largest is 5; second largest *distinct* value is 3, not another 5 |
| `[5, 5, 5]` | `null` | Every value is equal — no second distinct value exists |

## Edge Cases

- Array with fewer than 2 elements → `null` (nothing to compare)
- All elements identical → `null` (no second *distinct* value)
- Largest value repeated (`[5, 5, 3]`) → second largest is the next
  distinct value down (`3`), not a duplicate of the largest
- All-negative array → sentinel values must not be mistaken for real
  data (see Common Mistakes)

## Hints

1. Sorting and taking `arr[arr.length - 2]` works but costs O(n log n)
   and still needs de-duplication logic for repeated maximums — can you
   track "largest" and "second largest" with a single pass instead?
2. Keep two running values, `first` and `second`. When a new number beats
   `first`, the *old* `first` becomes the new `second` before `first` is
   updated.
3. A number equal to the current `first` should never overwrite `second`
   — it's the same value, not a new distinct one, so it must be
   explicitly excluded from updating `second`.

## Algorithm

**Pattern:** single-pass linear scan tracking two running values.
**Core insight:** you never need every value sorted — you only need to
remember the two largest distinct values seen so far. When a new number
exceeds the current largest, the previous largest "demotes" to become
the new second-largest, because it's still bigger than everything else
seen except the new leader.
**Invariant:** after processing any prefix of the array, `first` holds
the largest value seen so far and `second` holds the largest value
strictly less than `first` seen so far (or `-Infinity` if no such value
has appeared yet).

## Dry Run

**Input:** `[3, 7, 2, 9, 4]`

| Step | num | num > first? | action | first | second |
|---|---|---|---|---|---|
| start | – | – | – | `-Infinity` | `-Infinity` |
| 1 | 3 | yes (3 > -∞) | second←first, first←3 | 3 | -Infinity |
| 2 | 7 | yes (7 > 3) | second←first, first←7 | 7 | 3 |
| 3 | 2 | no | 2 > second(3)? no | 7 | 3 |
| 4 | 9 | yes (9 > 7) | second←first, first←9 | 9 | 7 |
| 5 | 4 | no | 4 > second(7)? no | 9 | 7 |

Loop ends. `second` (`7`) is not `-Infinity`. **Result:** `7` — matches
expected output.

## JavaScript Solution

```js
function findSecondLargest(arr) {
  if (!arr || arr.length < 2) return null;
  let first = -Infinity;
  let second = -Infinity;

  for (const num of arr) {
    if (num > first) {
      second = first;
      first = num;
    } else if (num > second && num !== first) {
      second = num;
    }
  }

  return second === -Infinity ? null : second;
}
```

## TypeScript Solution

```ts
function findSecondLargest(arr: number[]): number | null {
  if (!arr || arr.length < 2) return null;
  let first: number = -Infinity;
  let second: number = -Infinity;

  for (const num of arr) {
    if (num > first) {
      second = first;
      first = num;
    } else if (num > second && num !== first) {
      second = num;
    }
  }

  return second === -Infinity ? null : second;
}
```

## Time Complexity

O(n) — a single pass over the array, one comparison chain per element.

## Space Complexity

O(1) — two scalar variables regardless of input size.

## Common Mistakes

- Seeding `first`/`second` from `arr[0]`/`arr[1]` instead of `-Infinity`
  — this looks reasonable but silently breaks when the first two
  elements happen to be in the "wrong" order relative to later ones,
  unless the seeding also handles ordering; `-Infinity` sidesteps this
  entirely since anything real number is greater than it.
- Forgetting the `num !== first` guard — without it, an array like
  `[5, 5, 3]` incorrectly reports `5` as the second largest instead of
  `3`, because the second `5` would overwrite `second` before the `!==`
  check excludes it.
- Sorting the array first (`arr.sort((a,b) => b-a)[1]`) — correct, but
  O(n log n) instead of O(n), and still needs its own de-duplication
  step to handle repeated maximums correctly.

## Interview Follow-up Questions

1. How would you generalize this to find the k-th largest distinct
   value in a single pass?
2. How would the approach change if duplicates of the largest value
   *should* count (i.e. `[5, 5, 3]` should return `5`, not `3`)?
3. Why does seeding from `-Infinity` work correctly even when every
   array value is negative, while seeding from `0` would not?

## Similar Questions

- Find the Largest Number in an Array (see [pf017-find-largest-number-in-array.md](pf017-find-largest-number-in-array.md))
- Find Missing Number in Sequence (see [pf033-find-missing-number-in-sequence.md](pf033-find-missing-number-in-sequence.md))

---
[← Back to Programming Fundamentals](README.md)
