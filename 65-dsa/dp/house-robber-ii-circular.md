# Q6580 · House Robber II (Circular Dynamic Programming)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, circular-array, 1d-dp  

## Problem Statement

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are **arranged in a circle**. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array `nums` representing the amount of money of each house, return the **maximum amount of money** you can rob tonight without alerting the police.

## Input

- `nums`: `number[]` — array of house values in a circular street

## Output

- `number` — maximum stolen money integer

## Constraints

- `1 <= nums.length <= 1000`
- `0 <= nums[i] <= 1000`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [2,3,2]` | `3` | Cannot rob house 1 (val 2) and house 3 (val 2) because they are adjacent in circle |
| `nums = [1,2,3,1]` | `4` | Rob house 1 (val 1) and house 3 (val 3) |
| `nums = [1,2,3]` | `3` | Rob house 3 (val 3) |

## Edge Cases

- `nums.length === 1` -> returns `nums[0]`

## Hints

1. **Break Circular Dependency**:
   - Because House 0 and House $N-1$ are adjacent, you CANNOT rob both of them.
   - This creates 2 mutually exclusive subproblems:
     1. Rob houses from index `0` to `N - 2` (excluding the last house).
     2. Rob houses from index `1` to `N - 1` (excluding the first house).
2. Run standard House Robber I DP helper on both sub-arrays.
3. Return `Math.max(robLinear(0, N-2), robLinear(1, N-1))`.

## Algorithm

**Pattern:** Circular Boundary Splitting Subproblem Reduction  
**Core Insight:** Splitting a circular DP dependency into two linear range queries (`0...N-2` and `1...N-1`) reduces circular array constraints to standard $O(N)$ linear DP.

## Dry Run

`nums = [2, 3, 2]`:
- Range 1 `[2, 3]`: `max = 3`.
- Range 2 `[3, 2]`: `max = 3`.
- `Math.max(3, 3) = 3`. Return `3`.

## JavaScript Solution

```js
function rob(nums) {
  if (nums.length === 1) return nums[0];

  function robLinear(start, end) {
    let prev2 = 0;
    let prev1 = 0;

    for (let i = start; i <= end; i++) {
      const curr = Math.max(prev1, prev2 + nums[i]);
      prev2 = prev1;
      prev1 = curr;
    }

    return prev1;
  }

  return Math.max(
    robLinear(0, nums.length - 2),
    robLinear(1, nums.length - 1)
  );
}
```

## TypeScript Solution

```ts
function rob(nums: number[]): number {
  if (nums.length === 1) return nums[0];

  function robLinear(start: number, end: number): number {
    let prev2 = 0;
    let prev1 = 0;

    for (let i = start; i <= end; i++) {
      const curr = Math.max(prev1, prev2 + nums[i]);
      prev2 = prev1;
      prev1 = curr;
    }

    return prev1;
  }

  return Math.max(
    robLinear(0, nums.length - 2),
    robLinear(1, nums.length - 1)
  );
}
```

## Time Complexity

`O(N)` — two linear passes through array of length $N$.

## Space Complexity

`O(1)` — constant space state variables.

## Common Mistakes

- Forgetting base case `if (nums.length === 1) return nums[0]`, causing out-of-bounds array slicing errors on single-element inputs.

## Follow-Up Questions

1. How would you solve House Robber III, where houses are arranged in a Binary Tree instead of a linear or circular array?

## Similar Questions

- House Robber I
- House Robber III
