# Q6534 · Minimum Window Substring (Sliding Window & Character Frequency)

**Difficulty:** Hard  
**Companies Asked:** Meta, Amazon, Google, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Strings  
**Concepts:** strings, sliding-window, hash-map, two-pointers  

## Problem Statement

Given two strings `s` and `t` of lengths `m` and `n` respectively, return the **minimum window substring** of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.

The testcases will be generated such that the answer is **unique**.

## Input

- `s`: `string` — target search string
- `t`: `string` — required characters string

## Output

- `string` — shortest substring in `s` containing all characters of `t`

## Constraints

- `m == s.length`
- `n == t.length`
- `1 <= m, n <= 10^5`
- `s` and `t` consist of uppercase and lowercase English letters.

## Examples

| Input | Output | Why |
|---|---|---|
| `s = "ADOBECODEBANC", t = "ABC"` | `"BANC"` | Shortest window containing A, B, and C |
| `s = "a", t = "a"` | `"a"` | Single character match |
| `s = "a", t = "aa"` | `""` | `t` requires two 'a's, but `s` only has one |

## Edge Cases

- `t.length > s.length` -> return `""`
- Exact match `s === t` -> return `s`

## Hints

1. **Sliding Window with Two Frequency Maps**:
2. Count frequencies of all characters in `t` inside `targetMap`. `requiredCount = targetMap.size`.
3. Expand window `right` from `0` to `s.length - 1`, tracking frequencies in `windowMap`.
4. When `windowMap.get(char) === targetMap.get(char)`, increment `formedCount`.
5. When `formedCount === requiredCount`, try shrinking window from `left` (`left++`) to find the minimal valid window, updating `minWindowLen` and `minWindowStart`.

## Algorithm

**Pattern:** Dynamic Shrinking Sliding Window  
**Core Insight:** Expand `right` until all required characters are satisfied, then contract `left` while maintaining validity to discover the smallest possible window bounds in $O(N)$ time.

## Dry Run

`s = "ADOBECODEBANC", t = "ABC"`:
- `requiredCount = 3` (A:1, B:1, C:1).
- Expand `right` until `right = 5` (`"ADOBEC"`): `formedCount = 3` (Valid window!).
- Shrink `left`: `left = 0` (`"ADOBEC"` len 6) -> `left = 1` (`"DOBEC"` invalid).
- Continue expanding `right` until `right = 12` (`"ADOBECODEBANC"`).
- Shrinking `left` to index 9 yields `"BANC"` (len 4).
- Result: `"BANC"`.

## JavaScript Solution

```js
function minWindow(s, t) {
  if (!s || !t || s.length < t.length) return "";

  const targetMap = new Map();
  for (const char of t) {
    targetMap.set(char, (targetMap.get(char) || 0) + 1);
  }

  const required = targetMap.size;
  let formed = 0;

  const windowMap = new Map();
  let minLen = Infinity;
  let minStart = 0;

  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    windowMap.set(char, (windowMap.get(char) || 0) + 1);

    if (targetMap.has(char) && windowMap.get(char) === targetMap.get(char)) {
      formed++;
    }

    // Try contracting window from left
    while (left <= right && formed === required) {
      const windowLen = right - left + 1;
      if (windowLen < minLen) {
        minLen = windowLen;
        minStart = left;
      }

      const leftChar = s[left];
      windowMap.set(leftChar, windowMap.get(leftChar) - 1);
      if (targetMap.has(leftChar) && windowMap.get(leftChar) < targetMap.get(leftChar)) {
        formed--;
      }
      left++;
    }
  }

  return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}
```

## TypeScript Solution

```ts
function minWindow(s: string, t: string): string {
  if (!s || !t || s.length < t.length) return "";

  const targetMap = new Map<string, number>();
  for (const char of t) {
    targetMap.set(char, (targetMap.get(char) || 0) + 1);
  }

  const required = targetMap.size;
  let formed = 0;

  const windowMap = new Map<string, number>();
  let minLen = Infinity;
  let minStart = 0;

  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    windowMap.set(char, (windowMap.get(char) || 0) + 1);

    if (targetMap.has(char) && windowMap.get(char) === targetMap.get(char)) {
      formed++;
    }

    while (left <= right && formed === required) {
      const windowLen = right - left + 1;
      if (windowLen < minLen) {
        minLen = windowLen;
        minStart = left;
      }

      const leftChar = s[left];
      windowMap.set(leftChar, windowMap.get(leftChar)! - 1);
      if (targetMap.has(leftChar) && windowMap.get(leftChar)! < targetMap.get(leftChar)!) {
        formed--;
      }
      left++;
    }
  }

  return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}
```

## Time Complexity

`O(M + N)` — where `M = s.length` and `N = t.length`. Each character in `s` is visited at most twice (by `right` and `left` pointers).

## Space Complexity

`O(M + N)` — space for character frequency maps.

## Common Mistakes

- Re-building or re-checking the entire character frequency array on every step ($O(M \times N)$), causing TLE on large strings.

## Follow-Up Questions

1. How would you optimize the search if `s` is extremely sparse and contains mostly non-target characters? (Filter `s` into `[(char, index)]` list first).

## Similar Questions

- Longest Substring Without Repeating Characters
- Permutation in String
