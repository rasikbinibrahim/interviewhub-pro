# Q6537 · Word Break (Dynamic Programming & Trie)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Bloomberg  
**Interview Frequency:** ★★★★★  
**Category:** Dynamic Programming  
**Concepts:** dynamic-programming, strings, trie, memoization  

## Problem Statement

Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

## Input

- `s`: `string` — target string
- `wordDict`: `string[]` — list of valid dictionary words

## Output

- `boolean` — `true` if `s` can be segmented, `false` otherwise

## Constraints

- `1 <= s.length <= 300`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 20`
- `s` and `wordDict[i]` consist of lowercase English letters.
- All strings of `wordDict` are **unique**.

## Examples

| Input | Output | Why |
|---|---|---|
| `s = "leetcode", wordDict = ["leet","code"]` | `true` | Segmented as `"leet code"` |
| `s = "applepenapple", wordDict = ["apple","pen"]` | `true` | Segmented as `"apple pen apple"` (reuse allowed) |
| `s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]` | `false` | Cannot be segmented into dictionary words |

## Edge Cases

- `s` length 1 with matching word -> `true`
- String cannot be completely covered -> `false`

## Hints

1. **Boolean DP Array**: Let `dp[i]` be `true` if prefix `s[0...i-1]` can be segmented into dictionary words.
2. Initialize `dp = new Array(s.length + 1).fill(false)`.
3. Base case: `dp[0] = true` (empty string is always valid).
4. Iterate `i` from `1` to `s.length`.
5. Inner loop `j` from `0` to `i - 1`:
   - If `dp[j] === true` AND `wordSet.has(s.substring(j, i))`, set `dp[i] = true` and break inner loop.
6. Return `dp[s.length]`.

## Algorithm

**Pattern:** Bottom-Up Substring DP Partitioning  
**Core Insight:** If prefix `s[0...j]` is valid (`dp[j] === true`) and substring `s[j...i]` exists in `wordDict`, then prefix `s[0...i]` MUST be valid (`dp[i] = true`).

## Dry Run

`s = "leetcode", wordDict = ["leet", "code"]`:
- `dp = [true, false, false, false, false, false, false, false, false]` (len 9).
- `i = 4 ("leet")`: `j = 0`, `dp[0] = true`, `"leet"` in set -> `dp[4] = true`.
- `i = 8 ("leetcode")`: `j = 4`, `dp[4] = true`, `"code"` in set -> `dp[8] = true`.
- Result: `dp[8] = true`.

## JavaScript Solution

```js
function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

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

## TypeScript Solution

```ts
function wordBreak(s: string, wordDict: string[]): boolean {
  const wordSet = new Set<string>(wordDict);
  const dp: boolean[] = new Array(s.length + 1).fill(false);
  dp[0] = true;

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

## Time Complexity

`O(N^2 * K)` — where `N = s.length` and `K` is average word length (due to substring slicing).

## Space Complexity

`O(N + M)` — where `N = s.length` for DP array and `M` is total characters in `wordDict`.

## Common Mistakes

- Un-memoized plain recursion checking all substring splits, leading to exponential $O(2^N)$ TLE.

## Follow-Up Questions

1. How would you solve Word Break II, which asks for all possible sentence combinations (`["leet code"]`)?

## Similar Questions

- Word Break II
- Concatenated Words
