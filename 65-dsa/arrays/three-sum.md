# Q104 · 3Sum

**Difficulty:** Medium
**Companies Asked:** Google, Meta, Amazon, Microsoft, Apple
**Interview Frequency:** ★★★★★
**Category:** Data Structures & Algorithms → Arrays / Two Pointers
**Concepts:** sorting, two pointers, duplicate elimination

## Problem Statement

Given an integer array `nums`, return all unique triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] === 0`.

Notice that the solution set must not contain duplicate triplets.

## Input

- `nums`: an array of integers

## Output

An array of arrays of integers, where each inner array is a unique 3-element triplet `[a, b, c]` that sums to 0.

## Constraints

- `3 <= nums.length <= 3000`
- `-10^5 <= nums[i] <= 10^5`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [-1, 0, 1, 2, -1, -4]` | `[[-1, -1, 2], [-1, 0, 1]]` | Distinct triplets: `(-1)+(-1)+2 = 0` and `(-1)+0+1 = 0` |
| `nums = [0, 1, 1]` | `[]` | Only triplet is `[0, 1, 1]` which sums to 2 |
| `nums = [0, 0, 0]` | `[[0, 0, 0]]` | `0 + 0 + 0 = 0`, only unique triplet |

## Edge Cases

- Minimum size (`nums.length = 3`, e.g. `[0, 0, 0]`) → single check
- All elements identical (`[0, 0, 0, 0]`) → must return `[[0, 0, 0]]` once, omitting duplicates
- All positive or all negative numbers → impossible to sum to 0, returns `[]`
- Large duplicates (e.g. `[-2, 0, 0, 2, 2]`) → must skip duplicate `left` and `right` bounds cleanly

## Hints

1. Sorting the array first (`O(n log n)`) orders numbers and enables two pointers to navigate toward a target sum.
2. For each element `nums[i]`, the problem reduces to finding two elements in the remaining sub-array `nums[i+1..n-1]` that sum to `-nums[i]`.
3. To avoid duplicate triplets in the output, skip identical consecutive elements when moving `i`, `left`, and `right`.

## Algorithm

**Pattern:** Sorting + Two Pointers.

**Core insight:** sort `nums`. Iterate `i` from `0` to `n - 3`. For each fixed `nums[i]`, set two pointers `left = i + 1` and `right = n - 1`. Check `sum = nums[i] + nums[left] + nums[right]`:
- If `sum === 0`: record `[nums[i], nums[left], nums[right]]`, then increment `left` and decrement `right` while skipping equal elements to avoid duplicate triplets.
- If `sum < 0`: increment `left` to increase the sum.
- If `sum > 0`: decrement `right` to decrease the sum.

**Early exit optimization:** if `nums[i] > 0`, break early — since the array is sorted, no three positive numbers can sum to 0.

**Invariant:** at any step, `nums[i] <= nums[left] <= nums[right]`.

## Dry Run

**Input:** `nums = [-1, 0, 1, 2, -1, -4]`  
**Sorted:** `nums = [-4, -1, -1, 0, 1, 2]`

| Step | i | nums[i] | left | right | sum | Action | Triplet added |
|---|---|---|---|---|---|---|---|
| 1 | 0 | -4 | 1 (-1) | 5 (2) | -4 + (-1) + 2 = -3 | `sum < 0`, `left++` | None |
| 2 | 0 | -4 | 2 (-1) | 5 (2) | -4 + (-1) + 2 = -3 | `sum < 0`, `left++` | None |
| 3 | 0 | -4 | 3 (0) | 5 (2) | -4 + 0 + 2 = -2 | `sum < 0`, `left++` | None |
| 4 | 0 | -4 | 4 (1) | 5 (2) | -4 + 1 + 2 = -1 | `sum < 0`, `left++` | None |
| 5 | 1 | -1 | 2 (-1) | 5 (2) | -1 + (-1) + 2 = 0 | Match! `left++`, `right--` | `[-1, -1, 2]` |
| 6 | 1 | -1 | 3 (0) | 4 (1) | -1 + 0 + 1 = 0 | Match! `left++`, `right--` | `[-1, 0, 1]` |
| 7 | 2 | -1 | Skip! (`nums[2] === nums[1]`) | | | | |
| 8 | 3 | 0 | 4 (1) | 5 (2) | 0 + 1 + 2 = 3 | `sum > 0`, `right--` | None |

Loop ends. **Result:** `[[-1, -1, 2], [-1, 0, 1]]` — matches expected output.

## JavaScript Solution

```js
function threeSum(nums) {
  const result = [];
  const sorted = [...nums].sort((a, b) => a - b);

  for (let i = 0; i < sorted.length - 2; i++) {
    // Optimization: if current element is positive, no triplet can sum to 0
    if (sorted[i] > 0) break;

    // Skip duplicate values for the first element
    if (i > 0 && sorted[i] === sorted[i - 1]) continue;

    let left = i + 1;
    let right = sorted.length - 1;

    while (left < right) {
      const sum = sorted[i] + sorted[left] + sorted[right];

      if (sum === 0) {
        result.push([sorted[i], sorted[left], sorted[right]]);

        // Skip duplicates for left and right pointers
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

## TypeScript Solution

```ts
function threeSum(nums: readonly number[]): number[][] {
  const result: number[][] = [];
  const sorted = [...nums].sort((a, b) => a - b);

  for (let i = 0; i < sorted.length - 2; i++) {
    const current = sorted[i]!;

    if (current > 0) break;
    if (i > 0 && current === sorted[i - 1]) continue;

    let left = i + 1;
    let right = sorted.length - 1;

    while (left < right) {
      const leftVal = sorted[left]!;
      const rightVal = sorted[right]!;
      const sum = current + leftVal + rightVal;

      if (sum === 0) {
        result.push([current, leftVal, rightVal]);

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

O(n²) — sorting takes `O(n log n)`. The outer loop runs `n` times, and the inner two-pointer scan takes `O(n)` per iteration, yielding `O(n²)`.

## Space Complexity

O(1) auxiliary space (or `O(n)` depending on the sorting implementation's memory footprint).

## Common Mistakes

- Not sorting the array first.
- Failing to skip duplicate elements for `i`, `left`, or `right`, producing duplicate triplets in the output.
- Forgetting `(a, b) => a - b` in `Array.prototype.sort()` in JS (default string sort puts `-10` after `-4`).

## Interview Follow-up Questions

1. How would you solve 4Sum using this exact approach?
2. What if the target sum was a parameter `k` instead of fixed `0`?
3. How can you write a generic `NSum` recursive solver?

## Similar Questions

- Two Sum (see [arrays/two-sum.md](two-sum.md))
- 3Sum Closest
- 4Sum

---
[← Back to Arrays](README.md) · [← Back to 65-dsa](../README.md)
