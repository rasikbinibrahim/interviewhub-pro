# Q6623 · Distinct Subsequences (2D Matrix String Matching DP)

**Difficulty:** Hard  
**Companies Asked:** Amazon, Meta, Google, Microsoft  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, 2d-dp, strings  

## Problem Statement

Given two strings `s` and `t`, return the number of distinct **subsequences** of `s` which equals `t`.

## Algorithm

```javascript
function numDistinct(s, t) {
  const m = s.length;
  const n = t.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = 1;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[m][n];
}
```

## Time & Space Complexity

- **Time Complexity:** `O(M \cdot N)` — matrix pass.
- **Space Complexity:** `O(M \cdot N)` — 2D DP array.
