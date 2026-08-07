# Q6542 · Longest Increasing Subsequence (Binary Search Patience Sorting O(N log N))

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, binary-search, patience-sorting, subsequence  

## Problem Statement

Given an integer array `nums`, return the length of the **longest strictly increasing subsequence**.

A **subsequence** is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.

Could you improve the time complexity to `O(n log n)`?

## Input

- `nums`: `number[]` — array of integers

## Output

- `number` — length of longest strictly increasing subsequence

## Constraints

- `1 <= nums.length <= 2500`
- `-10^4 <= nums[i] <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [10,9,2,5,3,7,101,18]` | `4` | Longest increasing subsequence is `[2,3,7,101]`, length 4 |
| `nums = [0,1,0,3,2,3]` | `4` | Longest increasing subsequence is `[0,1,2,3]`, length 4 |
| `nums = [7,7,7,7,7]` | `1` | All elements equal -> max length 1 |

## Edge Cases

- Single element array `[10]` -> returns `1`
- Monotonically decreasing array `[5, 4, 3, 2, 1]` -> returns `1`

## Hints

1. **Patience Sorting with Binary Search O(N log N)**:
2. Maintain an array `tails` where `tails[i]` stores the smallest tail value of all increasing subsequences of length `i + 1`.
3. For each number `x` in `nums`:
   - Perform binary search (`lower_bound`) on `tails` to find the first index `idx` where `tails[idx] >= x`.
   - If found, replace `tails[idx] = x` (greedily lowering the tail for length `idx + 1`).
   - If `x` is larger than all elements in `tails`, append `x` to `tails`.
4. The length of `tails` is the length of the Longest Increasing Subsequence!

## Algorithm

**Pattern:** Patience Sorting / Greedy Binary Search  
**Core Insight:** Maintaining the smallest possible ending tail element for subsequences of every length $L$ allows new elements to extend subsequences in $O(\log N)$ binary search time per step.

## Dry Run

`nums = [10, 9, 2, 5, 3, 7, 101, 18]`:
- `x = 10`: `tails = [10]`.
- `x = 9`: binary search replaces 10 -> `tails = [9]`.
- `x = 2`: binary search replaces 9 -> `tails = [2]`.
- `x = 5`: appends 5 -> `tails = [2, 5]`.
- `x = 3`: replaces 5 -> `tails = [2, 3]`.
- `x = 7`: appends 7 -> `tails = [2, 3, 7]`.
- `x = 101`: appends 101 -> `tails = [2, 3, 7, 101]`.
- `x = 18`: replaces 101 -> `tails = [2, 3, 7, 18]`.
- Return `tails.length` = `4`.

## JavaScript Solution

```js
function lengthOfLIS(nums) {
  const tails = [];

  for (const x of nums) {
    let left = 0;
    let right = tails.length;

    // Binary search for insertion index (lower_bound)
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < x) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    if (left === tails.length) {
      tails.push(x);
    } else {
      tails[left] = x;
    }
  }

  return tails.length;
}
```

## TypeScript Solution

```ts
function lengthOfLIS(nums: number[]): number {
  const tails: number[] = [];

  for (const x of nums) {
    let left = 0;
    let right = tails.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < x) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    if (left === tails.length) {
      tails.push(x);
    } else {
      tails[left] = x;
    }
  }

  return tails.length;
}
```

## Time Complexity

`O(N log N)` — single pass through $N$ elements with $O(\log N)$ binary search insertion per element.

## Space Complexity

`O(N)` — for `tails` array.

## Common Mistakes

- Standard 2D or 1D DP `dp[i] = max(dp[j] + 1)` which takes $O(N^2)$ time, failing performance constraints for $N = 2500$.

## Follow-Up Questions

1. How would you reconstruct and return the actual sequence elements of the LIS? (Track parent pointers alongside `tails`).

## Similar Questions

- Number of Longest Increasing Subsequence
- Russian Doll Envelopes
