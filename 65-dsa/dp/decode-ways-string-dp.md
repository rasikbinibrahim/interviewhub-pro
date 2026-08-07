# Q6600 · Decode Ways (1D Dynamic Programming)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, 1d-dp, strings  

## Problem Statement

A message containing letters from `A-Z` can be encoded into numbers using the mapping: `'A' -> "1"`, `'B' -> "2"`, ..., `'Z' -> "26"`.

Given a string `s` containing only digits, return the **number of ways** to decode it.

## Input

- `s`: `string` — digit string

## Output

- `number` — total valid decoding count

## Constraints

- `1 <= s.length <= 100`
- `s` consists of digits.

## Examples

| Input | Output | Why |
|---|---|---|
| `s = "12"` | `2` | "AB" (1 2) or "L" (12) |
| `s = "226"` | `3` | "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6) |
| `s = "06"` | `0` | Invalid leading zero |

## Algorithm

**Pattern:** Single / Double Digit Sub-Problem DP  
**Core Insight:** At index `i`, add `dp[i-1]` if single digit `s[i-1]` is valid (1-9), and add `dp[i-2]` if double digit `s[i-2..i-1]` is valid (10-26).

```javascript
function numDecodings(s) {
  if (!s || s[0] === '0') return 0;

  const n = s.length;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    const singleDigit = parseInt(s.substring(i - 1, i), 10);
    const doubleDigit = parseInt(s.substring(i - 2, i), 10);

    if (singleDigit >= 1 && singleDigit <= 9) {
      dp[i] += dp[i - 1];
    }
    if (doubleDigit >= 10 && doubleDigit <= 26) {
      dp[i] += dp[i - 2];
    }
  }

  return dp[n];
}
```

## Time & Space Complexity

- **Time Complexity:** `O(N)` — single linear pass.
- **Space Complexity:** `O(N)` — 1D DP array space.
