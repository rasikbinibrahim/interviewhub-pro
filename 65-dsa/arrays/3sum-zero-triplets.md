# Q6651 · 3Sum (Sorted Array Two Pointers)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple
**Interview Frequency:** ★★★★★
**Category:** Arrays
**Concepts:** arrays, two-pointers, 3sum, sorting

## Problem Statement

Write a function `threeSum(nums)` that returns every unique triplet of
values in `nums` that sums to zero. Each triplet's values should appear
in ascending order, and the overall result must contain no duplicate
triplets.

## Input

`nums`: an array of integers.

## Output

An array of triplets (each a 3-element array), each summing to zero,
with no duplicate triplets.

## Constraints

`0 <= nums.length <= 3000`, `-10^5 <= nums[i] <= 10^5`

## Examples

| Input | Output | Why |
|---|---|---|
| `[-1,0,1,2,-1,-4]` | `[[-1,-1,2],[-1,0,1]]` | These are the only two combinations of three values summing to 0, with duplicates removed |
| `[0,1,1]` | `[]` | No combination of three values sums to 0 |
| `[0,0,0]` | `[[0,0,0]]` | The only triplet, using all three zeros |

## Edge Cases

- Fewer than 3 elements → `[]`, no triplet is possible
- All zeros → a single triplet `[0,0,0]`
- No valid triplet exists → `[]`
- Many duplicate values → must not produce duplicate triplets in the
  output, even though the same value may be usable in multiple valid
  triplets

## Hints

1. A brute-force triple-nested loop checking every combination works but
   is O(n³) and doesn't handle duplicate triplets cleanly — what does
   sorting the array first make easier?
2. Once sorted, fix one value at a time (the smallest of the triplet)
   and reduce the remaining problem to "find two values in the rest of
   the array that sum to the negative of the fixed value" — a classic
   two-pointer sum problem.
3. To avoid duplicate triplets, skip over repeated values both when
   choosing the fixed value and when advancing the two inner pointers
   past a match.

## Algorithm

**Pattern:** sort, then fix one value and two-pointer the rest.
**Core insight:** finding three values that sum to zero reduces to
finding two values that sum to a specific target (the negative of a
fixed third value) — a problem two pointers solve in O(n) on a sorted
array, since moving the left pointer right only increases the pair sum
and moving the right pointer left only decreases it, letting the search
narrow monotonically without ever needing to backtrack. Sorting first
also makes duplicate values adjacent, so they can be skipped
systematically rather than needing a separate deduplication pass over
the output.
**Invariant:** for each fixed index `i`, every valid pair `(left, right)`
found in `nums[i+1..n-1]` such that `nums[i] + nums[left] + nums[right]
=== 0` is recorded exactly once, because the pointers always move past
duplicate values before continuing.

## Dry Run

**Input:** `nums = [-1,0,1,2,-1,-4]` → sorted: `[-4,-1,-1,0,1,2]`

| i (nums[i]) | left, right | sum | action |
|---|---|---|---|
| 0 (-4) | 1,5 (-1,2) | -3 | sum < 0, left++ |
| 0 (-4) | 2,5 (-1,2) | -3 | sum < 0, left++ |
| 0 (-4) | 3,5 (0,2) | -2 | sum < 0, left++ |
| 0 (-4) | 4,5 (1,2) | -1 | sum < 0, left++ → left meets right, done with i=0 |
| 1 (-1) | 2,5 (-1,2) | 0 | **match: [-1,-1,2]**; skip duplicates, left++, right-- |
| 1 (-1) | 3,4 (0,1) | 0 | **match: [-1,0,1]**; left++, right-- → left meets right |
| 2 (-1) | skipped (duplicate of nums[1]) | – | – |

**Result:** `[[-1,-1,2], [-1,0,1]]` — matches expected output.

## JavaScript Solution

```js
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}
```

## TypeScript Solution

```ts
function threeSum(nums: number[]): number[][] {
  const sorted: number[] = [...nums].sort((a, b) => a - b);
  const result: number[][] = [];

  for (let i = 0; i < sorted.length - 2; i++) {
    if (i > 0 && sorted[i] === sorted[i - 1]) continue;

    let left = i + 1;
    let right = sorted.length - 1;

    while (left < right) {
      const sum: number = sorted[i] + sorted[left] + sorted[right];
      if (sum === 0) {
        result.push([sorted[i], sorted[left], sorted[right]]);
        while (left < right && sorted[left] === sorted[left + 1]) left++;
        while (left < right && sorted[right] === sorted[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}
```

## Time Complexity

O(n²) — sorting is O(n log n), and the outer loop combined with the
inner two-pointer scan is O(n) per fixed index, giving O(n²) overall.

## Space Complexity

O(n) to O(log n) for the sort's internal space (excluding the output
array itself, which is required regardless of approach).

## Common Mistakes

- Brute-forcing with three nested loops — correct but O(n³), and still
  requires separate duplicate-triplet handling.
- Forgetting to skip duplicate values for the *fixed* index `i`, not
  just within the two-pointer scan — produces duplicate triplets that
  only differ in which occurrence of a repeated value was used.
- Not advancing the pointers past duplicates after a match — leaves
  `left`/`right` pointing at the same values again, producing the same
  triplet multiple times.

## Interview Follow-up Questions

1. How would you adapt this to find triplets summing to an arbitrary
   target, not just zero?
2. How would you generalize this technique to `4Sum` (four values
   summing to a target)?
3. Why is sorting a necessary first step for the two-pointer technique
   to work at all?

## Similar Questions

- Container With Most Water (see [../two-pointers/container-with-most-water.md](../two-pointers/container-with-most-water.md))
- 4Sum (General K-Sum) (see [../two-pointers/4sum-k-sum-generalization.md](../two-pointers/4sum-k-sum-generalization.md))
