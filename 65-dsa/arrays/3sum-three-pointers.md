# Q6523 · 3Sum (Sort + Two Pointers)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Arrays  
**Concepts:** arrays, two-pointers, sorting, duplicate-avoidance  

## Problem Statement

Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

Notice that the solution set must not contain duplicate triplets.

## Input

- `nums`: `number[]` — array of integers

## Output

- `number[][]` — 2D array of unique triplets summing to 0

## Constraints

- `3 <= nums.length <= 3000`
- `-10^5 <= nums[i] <= 10^5`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [-1,0,1,2,-1,-4]` | `[[-1,-1,2],[-1,0,1]]` | Distinct triplets that sum to 0 |
| `nums = [0,1,1]` | `[]` | No triplet sums to 0 |
| `nums = [0,0,0]` | `[[0,0,0]]` | Triple zero triplet |

## Edge Cases

- `nums` length less than 3 -> return `[]`
- All positive or all negative numbers -> return `[]`

## Hints

1. Sort `nums` in ascending order (`nums.sort((a, b) => a - b)`).
2. Fix the first element `nums[i]` in a loop (`i` from `0` to `nums.length - 3`).
3. Skip duplicate `nums[i]` values (`if (i > 0 && nums[i] === nums[i - 1]) continue`).
4. Use Two Pointers `left = i + 1` and `right = nums.length - 1` to find pairs where `nums[left] + nums[right] === -nums[i]`.
5. When a triplet is found, push to results and advance both pointers while skipping duplicate `nums[left]` and `nums[right]` values.

## Algorithm

**Pattern:** Sorting + Two Pointer Target Search  
**Core Insight:** Sorting `nums` converts 3Sum into $N$ Two-Pointer 2Sum problems while enabling effortless duplicate skipping via adjacent element comparisons.

## Dry Run

`nums = [-1, 0, 1, 2, -1, -4]`:
- Sorted: `[-4, -1, -1, 0, 1, 2]`
- `i = 0 (val -4)`: target = 4. `left = 1 (-1)`, `right = 5 (2)`. Sum = 1 < 4 -> `left++`. No pair found.
- `i = 1 (val -1)`: target = 1. `left = 2 (-1)`, `right = 5 (2)`. Sum = 1 -> Found `[-1, -1, 2]`. Skip dups -> `left = 3 (0)`, `right = 4 (1)`. Sum = 1 -> Found `[-1, 0, 1]`.
- `i = 2 (val -1)`: Duplicate (`nums[2] === nums[1]`) -> Skip.
- Result: `[[-1, -1, 2], [-1, 0, 1]]`.

## JavaScript Solution

```js
function threeSum(nums) {
  const result = [];
  if (nums.length < 3) return result;

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break; // Cannot sum to 0 if smallest number > 0
    if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicate i

    let left = i + 1;
    let right = nums.length - 1;
    const target = -nums[i];

    while (left < right) {
      const sum = nums[left] + nums[right];

      if (sum === target) {
        result.push([nums[i], nums[left], nums[right]]);

        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < target) {
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
  const result: number[][] = [];
  if (nums.length < 3) return result;

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;
    const target = -nums[i];

    while (left < right) {
      const sum = nums[left] + nums[right];

      if (sum === target) {
        result.push([nums[i], nums[left], nums[right]]);

        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < target) {
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

`O(N^2)` — sorting takes `O(N log N)`, nested outer loop and two pointers take `O(N^2)`.

## Space Complexity

`O(1)` or `O(N)` — depending on array sorting algorithm implementation space.

## Common Mistakes

- Forgetting to skip duplicates for `left` and `right` after finding a matching triplet, returning duplicate triplets in the output array.

## Follow-Up Questions

1. How would you extend this to 4Sum? (Generalize to K-Sum via recursion).

## Similar Questions

- Two Sum
- 3Sum Closest
- 4Sum
