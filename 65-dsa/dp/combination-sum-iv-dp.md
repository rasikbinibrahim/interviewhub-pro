# Q6616 · Combination Sum IV (Unbounded Knapsack Permutations DP)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft  
**Interview Frequency:** ★★★★★  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, 1d-dp, permutations  

## Problem Statement

Given an array of **distinct** integers `nums` and a target integer `target`, return the number of possible **permutations** that add up to `target`.

## Algorithm

**Pattern:** Outer Target Inner Coin Permutation 1D DP  
Iterating outer loop over `target` computes **Permutations** (where order matters, e.g. `(1, 2)` and `(2, 1)` are counted separately).

```javascript
function combinationSum4(nums, target) {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1; // 1 way to form target 0

  for (let i = 1; i <= target; i++) {
    for (const num of nums) {
      if (i - num >= 0) {
        dp[i] += dp[i - num];
      }
    }
  }

  return dp[target];
}
```

## Time & Space Complexity

- **Time Complexity:** `O(T \cdot N)` — target size $T$ times nums size $N$.
- **Space Complexity:** `O(T)` — 1D DP array space.
