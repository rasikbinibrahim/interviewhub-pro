# Q6557 · Edit Distance / Levenshtein Distance (2D Matrix DP)

**Difficulty:** Hard  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, 2D-dp, strings, levenshtein-distance  

## Problem Statement

Given two strings `word1` and `word2`, return the **minimum number of operations** required to convert `word1` to `word2`.

You have the following three operations permitted on a word:
1. **Insert** a character
2. **Delete** a character
3. **Replace** a character

## Input

- `word1`: `string` — source string
- `word2`: `string` — target string

## Output

- `number` — minimum edit operation count

## Constraints

- `0 <= word1.length, word2.length <= 500`
- `word1` and `word2` consist of lowercase English letters.

## Examples

| Input | Output | Why |
|---|---|---|
| `word1 = "horse", word2 = "ros"` | `3` | horse -> rorse (replace 'h' with 'r') -> rose (remove 'r') -> ros (remove 'e') |
| `word1 = "intention", word2 = "execution"` | `5` | 5 insertion/deletion/replacement operations |

## Edge Cases

- Either `word1` or `word2` is empty `""` -> returns non-empty string length

## Hints

1. **2D DP Grid**: Let `dp[i][j]` be the minimum operations to convert prefix `word1[0...i-1]` to `word2[0...j-1]`.
2. Base cases:
   - `dp[i][0] = i` (requires `i` deletions to match empty string).
   - `dp[0][j] = j` (requires `j` insertions to match empty string).
3. Transitions for `i, j > 0`:
   - If `word1[i - 1] === word2[j - 1]`: `dp[i][j] = dp[i - 1][j - 1]` (no operation cost!).
   - Else: `dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])`
     - `dp[i - 1][j]`: Delete operation
     - `dp[i][j - 1]`: Insert operation
     - `dp[i - 1][j - 1]`: Replace operation

## Algorithm

**Pattern:** 2D String Alignment Matrix Dynamic Programming  
**Core Insight:** Minimum edit distance at cell $(i, j)$ derives from adding 1 to the minimum cost of adjacent Insert, Delete, or Replace decisions when characters differ.

## Dry Run

`word1 = "horse", word2 = "ros"`:
- `dp` dimensions $6 \times 4$.
- Row 0: `[0, 1, 2, 3]`. Col 0: `[0, 1, 2, 3, 4, 5]`.
- Fill cells row by row using `1 + min(insert, delete, replace)`.
- `dp[5][3] = 3`.
- Return `3`.

## JavaScript Solution

```js
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
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],    // Delete
          dp[i][j - 1],    // Insert
          dp[i - 1][j - 1] // Replace
        );
      }
    }
  }

  return dp[m][n];
}
```

## TypeScript Solution

```ts
function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],
          dp[i][j - 1],
          dp[i - 1][j - 1]
        );
      }
    }
  }

  return dp[m][n];
}
```

## Time Complexity

`O(M * N)` — filling $M \times N$ matrix.

## Space Complexity

`O(M * N)` — space for 2D DP matrix (can be optimized to $O(\min(M, N))$ using 1D rolling array).

## Common Mistakes

- Setting cost to 1 when characters match `word1[i-1] === word2[j-1]`, adding unwanted operation penalty.

## Follow-Up Questions

1. How would you optimize space complexity to $O(N)$ using two rolling 1D rows?

## Similar Questions

- Distinct Subsequences
- Longest Common Subsequence
