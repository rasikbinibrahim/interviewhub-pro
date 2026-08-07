# Q6568 · Longest Common Subsequence (LCS 2D Matrix DP)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, 2d-dp, strings, lcs  

## Problem Statement

Given two strings `text1` and `text2`, return the length of their **longest common subsequence**. If there is no common subsequence, return `0`.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, `"ace"` is a subsequence of `"abcde"`.

A **common subsequence** of two strings is a subsequence that is common to both strings.

## Input

- `text1`: `string` — first string
- `text2`: `string` — second string

## Output

- `number` — length of longest common subsequence

## Constraints

- `1 <= text1.length, text2.length <= 1000`
- `text1` and `text2` consist of only lowercase English characters.

## Examples

| Input | Output | Why |
|---|---|---|
| `text1 = "abcde", text2 = "ace"` | `3` | Longest common subsequence is `"ace"` (length 3) |
| `text1 = "abc", text2 = "abc"` | `3` | Longest common subsequence is `"abc"` |
| `text1 = "abc", text2 = "def"` | `0` | No common characters |

## Edge Cases

- No matching characters -> returns `0`
- Single character strings `"a"`, `"a"` -> returns `1`

## Hints

1. **2D DP Grid**: Let `dp[i][j]` be the length of the LCS of prefixes `text1[0...i-1]` and `text2[0...j-1]`.
2. Transitions for `i, j > 0`:
   - If `text1[i - 1] === text2[j - 1]`: `dp[i][j] = 1 + dp[i - 1][j - 1]`.
   - Else: `dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])`.
3. Base cases: `dp[0][j] = 0` and `dp[i][0] = 0`.

## Algorithm

**Pattern:** 2D Sequence Alignment Matrix Dynamic Programming  
**Core Insight:** Matching characters extend the previous diagonal subsequence by 1, while mismatching characters inherit the maximum choice from ignoring either the current character of `text1` or `text2`.

## Dry Run

`text1 = "abcde", text2 = "ace"`:
- `dp` matrix of size $6 \times 4$ initialized to 0.
- `i = 1 ('a'), j = 1 ('a')`: match! `dp[1][1] = 1 + 0 = 1`.
- `i = 3 ('c'), j = 2 ('c')`: match! `dp[3][2] = 1 + dp[2][1] = 2`.
- `i = 5 ('e'), j = 3 ('e')`: match! `dp[5][3] = 1 + dp[4][2] = 3`.
- Return `3`.

## JavaScript Solution

```js
function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}
```

## TypeScript Solution

```ts
function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length;
  const n = text2.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}
```

## Time Complexity

`O(M * N)` — filling $M \times N$ matrix cells.

## Space Complexity

`O(M * N)` — space for 2D DP matrix (optimizable to $O(\min(M, N))$ with 1D rolling rows).

## Common Mistakes

- Conflating Subsequence (order matters, non-contiguous) with Substring (must be contiguous).

## Follow-Up Questions

1. How would you reconstruct and return the actual LCS string (e.g. `"ace"`) using the DP matrix?

## Similar Questions

- Edit Distance
- Longest Palindromic Subsequence
