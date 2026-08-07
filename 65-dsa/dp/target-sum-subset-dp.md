# Q6577 · Target Sum (0/1 Knapsack & Subset DP)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, 01-knapsack, subset-sum, memoization  

## Problem Statement

You are given an integer array `nums` and an integer `target`.

You want to build an **expression** out of `nums` by adding one of the symbols `'+'` and `'-'` before each integer in `nums` and then concatenate all the integers.

For example, if `nums = [2, 1]`, you can add a `'+'` before `2` and a `'-'` before `1` and concatenate them to build the expression `"+2-1"`.

Return the number of **different expressions** that you can build, which evaluate to `target`.

## Input

- `nums`: `number[]` — integer array
- `target`: `number` — target evaluation integer

## Output

- `number` — total valid expression count

## Constraints

- `1 <= nums.length <= 20`
- `0 <= nums[i] <= 1000`
- `0 <= sum(nums[i]) <= 1000`
- `-1000 <= target <= 1000`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [1,1,1,1,1], target = 3` | `5` | 5 combinations of symbols (+1+1+1+1-1, etc.) evaluate to 3 |
| `nums = [1], target = 1` | `1` | `+1 = 1` |

## Edge Cases

- `target > sum(nums)` or `target < -sum(nums)` -> returns `0`
- `(sum + target)` is odd -> returns `0`

## Hints

1. **Math Reduction to 0/1 Subset Sum**:
   - Partition `nums` into positive subset $P$ and negative subset $N$.
   - $\text{sum}(P) - \text{sum}(N) = \text{target}$
   - $\text{sum}(P) + \text{sum}(N) = \text{sum}(\text{nums})$
   - Adding both equations: $2 \times \text{sum}(P) = \text{target} + \text{sum}(\text{nums}) \implies \text{sum}(P) = (\text{target} + \text{sum}(\text{nums})) / 2$.
2. Problem reduces to finding the number of subsets in `nums` with sum equal to $S = (\text{target} + \text{sum}) / 2$.
3. 1D DP Knapsack: `dp[w]` = number of ways to form subset sum `w`.

## Algorithm

**Pattern:** Mathematical 0/1 Subset Sum DP Reduction  
**Core Insight:** Converting sign assignment into a Subset Sum problem eliminates negative array index handling, allowing standard 1D $O(S)$ Knapsack DP.

## Dry Run

`nums = [1, 1, 1, 1, 1], target = 3`:
- `sum = 5`. `S = (3 + 5) / 2 = 4`.
- `dp` array of size $5$ initialized: `dp[0] = 1`, rest 0.
- Process `nums[0] = 1`: `dp = [1, 1, 0, 0, 0]`.
- Process `nums[1] = 1`: `dp = [1, 2, 1, 0, 0]`.
- Process `nums[2] = 1`: `dp = [1, 3, 3, 1, 0]`.
- Process `nums[3] = 1`: `dp = [1, 4, 6, 4, 1]`.
- Process `nums[4] = 1`: `dp = [1, 5, 10, 10, 5]`.
- `dp[4] = 5`. Return `5`.

## JavaScript Solution

```js
function findTargetSumWays(nums, target) {
  const totalSum = nums.reduce((sum, val) => sum + val, 0);

  if (Math.abs(target) > totalSum || (totalSum + target) % 2 !== 0) {
    return 0;
  }

  const subsetSum = (totalSum + target) / 2;
  const dp = new Array(subsetSum + 1).fill(0);
  dp[0] = 1;

  for (const num of nums) {
    for (let j = subsetSum; j >= num; j--) {
      dp[j] += dp[j - num];
    }
  }

  return dp[subsetSum];
}
```

## TypeScript Solution

```ts
function findTargetSumWays(nums: number[], target: number): number {
  const totalSum = nums.reduce((sum, val) => sum + val, 0);

  if (Math.abs(target) > totalSum || (totalSum + target) % 2 !== 0) {
    return 0;
  }

  const subsetSum = (totalSum + target) / 2;
  const dp: number[] = new Array(subsetSum + 1).fill(0);
  dp[0] = 1;

  for (const num of nums) {
    for (let j = subsetSum; j >= num; j--) {
      dp[j] += dp[j - num];
    }
  }

  return dp[subsetSum];
}
```

## Time Complexity

`O(N * S)` — where $N = \text{nums.length}$ and $S = (\text{target} + \text{sum}) / 2$.

## Space Complexity

`O(S)` — 1D DP array space.

## Common Mistakes

- Iterating inner loop forward `for (let j = num; j <= subsetSum; j++)`, which allows elements to be used multiple times (unbounded knapsack error).

## Follow-Up Questions

1. How would you solve this problem using Top-Down Recursion with Memoization (`Map<string, number>`)?

## Similar Questions

- Partition Equal Subset Sum
- Coin Change II
