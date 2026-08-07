# Q6658 · Edit Distance (Levenshtein Distance 2D Matrix DP)

**Difficulty:** Hard  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, 2d-dp, strings, levenshtein-distance  

## Problem Statement

Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.

You have the following three operations permitted on a word:
1. Insert a character
2. Delete a character
3. Replace a character

## Algorithm

```javascript
function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,    // Delete
          dp[i][j - 1] + 1,    // Insert
          dp[i - 1][j - 1] + 1 // Replace
        );
      }
    }
  }

  return dp[m][n];
}
```

## Time & Space Complexity

- **Time Complexity:** `O(M \cdot N)` — 2D table pass.
- **Space Complexity:** `O(M \cdot N)` — 2D DP array.
