# Q6547 · House Robber (Dynamic Programming)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, memoization, space-optimization, array-dp  

## Problem Statement

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight **without alerting the police**.

## Input

- `nums`: `number[]` — stash of money in each house

## Output

- `number` — maximum total money robbed

## Constraints

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 400`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [1,2,3,1]` | `4` | Rob house 1 (money = 1) and house 3 (money = 3), total = 1 + 3 = 4 |
| `nums = [2,7,9,3,1]` | `12` | Rob house 1 (money = 2), house 3 (money = 9), house 5 (money = 1), total = 12 |

## Edge Cases

- Single house array `[5]` -> returns `5`
- Two house array `[2, 7]` -> returns `max(2, 7) = 7`

## Hints

1. **State Choice at House `i`**:
   - Choice A: Rob house `i` -> Total = `nums[i] + rob(i - 2)`.
   - Choice B: Skip house `i` -> Total = `rob(i - 1)`.
2. Recurrence Relation: `dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1])`.
3. Base Cases: `dp[0] = nums[0]`, `dp[1] = Math.max(nums[0], nums[1])`.
4. Space Optimization: Maintain `prev2` and `prev1` variables to solve in `O(1)` space.

## Algorithm

**Pattern:** State Choice Inclusion/Exclusion Dynamic Programming  
**Core Insight:** Deciding whether to rob house `i` depends entirely on comparing robbing house `i` plus `dp[i - 2]` against taking the max money robbed up to house `i - 1`.

## Dry Run

`nums = [2, 7, 9, 3, 1]`:
- `prev2 = 0`, `prev1 = 0`.
- `num = 2`: `current = max(2 + 0, 0) = 2`. `prev2 = 0`, `prev1 = 2`.
- `num = 7`: `current = max(7 + 0, 2) = 7`. `prev2 = 2`, `prev1 = 7`.
- `num = 9`: `current = max(9 + 2, 7) = 11`. `prev2 = 7`, `prev1 = 11`.
- `num = 3`: `current = max(3 + 7, 11) = 11`. `prev2 = 11`, `prev1 = 11`.
- `num = 1`: `current = max(1 + 11, 11) = 12`. `prev2 = 11`, `prev1 = 12`.
- Result: `12`.

## JavaScript Solution

```js
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = 0;
  let prev1 = 0;

  for (const num of nums) {
    const current = Math.max(num + prev2, prev1);
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}
```

## TypeScript Solution

```ts
function rob(nums: number[]): number {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = 0;
  let prev1 = 0;

  for (const num of nums) {
    const current = Math.max(num + prev2, prev1);
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}
```

## Time Complexity

`O(N)` — single pass through `nums`.

## Space Complexity

`O(1)` — constant space.

## Common Mistakes

- Forgetting to handle `nums.length === 1` early exit, accessing out of bounds elements.

## Follow-Up Questions

1. How would you solve House Robber II, where houses are arranged in a circle (first and last houses are adjacent)? (Run House Robber twice: once for `0...N-2`, once for `1...N-1`).

## Similar Questions

- House Robber II
- House Robber III
