# Q6617 · Partition Equal Subset Sum (0/1 Knapsack Subset DP)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, 01-knapsack, subset-sum  

## Problem Statement

Given an integer array `nums`, return `true` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or `false` otherwise.

## Algorithm

**Pattern:** 0/1 Knapsack Boolean Target 1D DP  
Target = `sum / 2`. If `sum` is odd, return `false` immediately. Iterate `num` in outer loop and `i` backwards from `target` down to `num`.

```javascript
function canPartition(nums) {
  const sum = nums.reduce((acc, n) => acc + n, 0);
  if (sum % 2 !== 0) return false;

  const target = sum / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;

  for (const num of nums) {
    for (let i = target; i >= num; i--) {
      if (dp[i - num]) {
        dp[i] = true;
      }
    }
  }

  return dp[target];
}
```

## Time & Space Complexity

- **Time Complexity:** `O(N \cdot \text{target})` — array size $N$ times target sum.
- **Space Complexity:** `O(\text{target})` — 1D boolean DP array.
