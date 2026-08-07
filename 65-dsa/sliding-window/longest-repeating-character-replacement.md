# Q6606 · Longest Repeating Character Replacement (Sliding Window)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Sliding Window  
**Concepts:** sliding-window, hash-map, two-pointers, strings  

## Problem Statement

You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.

Return the **length of the longest substring** containing the same letter you can get after performing the above operations.

## Input

- `s`: `string` — uppercase string
- `k`: `number` — max allowed character replacement operations

## Output

- `number` — max substring length

## Examples

| Input | Output | Why |
|---|---|---|
| `s = "ABAB", k = 2` | `4` | Replace two 'A's with 'B's to get "BBBB" |
| `s = "AABABBA", k = 1` | `4` | Replace middle 'A' to get "AABBBBA" |

## Algorithm

**Pattern:** Frequency Count Variable Sliding Window  
**Core Insight:** Valid window condition: `windowLength - maxFrequencyInWindow <= k`. Maintain `maxFreq` seen in the window. Shrink window `left++` when replacements needed exceed `k`.

```javascript
function characterReplacement(s, k) {
  const counts = new Array(26).fill(0);
  let left = 0;
  let maxFreq = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const charIdx = s.charCodeAt(right) - 65;
    counts[charIdx]++;
    maxFreq = Math.max(maxFreq, counts[charIdx]);

    // If operations needed exceed k, shrink left side of window
    while ((right - left + 1) - maxFreq > k) {
      counts[s.charCodeAt(left) - 65]--;
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

## Time & Space Complexity

- **Time Complexity:** `O(N)` — single linear pass through string.
- **Space Complexity:** `O(1)` — fixed 26-element count array.
