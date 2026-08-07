# Q6601 · Word Break (1D Dynamic Programming)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, strings, hash-set  

## Problem Statement

Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.

## Input

- `s`: `string` — string to segment
- `wordDict`: `string[]` — dictionary of allowed words

## Output

- `boolean` — `true` if segmentable, `false` otherwise

## Constraints

- `1 <= s.length <= 300`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 20`

## Examples

| Input | Output | Why |
|---|---|---|
| `s = "leetcode", wordDict = ["leet","code"]` | `true` | "leet code" |
| `s = "applepenapple", wordDict = ["apple","pen"]` | `true` | "apple pen apple" |
| `s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]` | `false` | Cannot be segmented |

## Algorithm

**Pattern:** Substring Segment Search DP  
**Core Insight:** `dp[i]` is true if there exists a split index `j < i` such that `dp[j]` is true AND `s.substring(j, i)` exists in `wordDict`.

```javascript
function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true; // Empty string base case

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
}
```

## Time & Space Complexity

- **Time Complexity:** `O(N^2)` — nested substring check loops.
- **Space Complexity:** `O(N)` — DP array and Set space.
