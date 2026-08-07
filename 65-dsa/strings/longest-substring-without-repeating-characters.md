# Q6524 · Longest Substring Without Repeating Characters (Sliding Window)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Bloomberg  
**Interview Frequency:** ★★★★★  
**Category:** Strings  
**Concepts:** strings, sliding-window, hash-map, two-pointers  

## Problem Statement

Given a string `s`, find the length of the **longest substring** without repeating characters.

## Input

- `s`: `string` — input string

## Output

- `number` — max length of a substring with all distinct characters

## Constraints

- `0 <= s.length <= 5 * 10^4`
- `s` consists of English letters, digits, symbols and spaces.

## Examples

| Input | Output | Why |
|---|---|---|
| `s = "abcabcbb"` | `3` | Answer is `"abc"`, length 3 |
| `s = "bbbbb"` | `1` | Answer is `"b"`, length 1 |
| `s = "pwwkew"` | `3` | Answer is `"wke"`, length 3 |

## Edge Cases

- Empty string `""` -> returns `0`
- Single character `"a"` -> returns `1`
- All unique characters `"abcdef"` -> returns `6`

## Hints

1. **Dynamic Sliding Window**: Maintain a window `[left, right]`.
2. Use a Map/Object `charMap` to store the last seen index of each character.
3. Iterate `right` from `0` to `s.length - 1`.
4. If `s[right]` exists in `charMap` and its last seen index is `>= left`, jump `left = charMap.get(s[right]) + 1`.
5. Update `charMap.set(s[right], right)` and update `maxLength = Math.max(maxLength, right - left + 1)`.

## Algorithm

**Pattern:** Optimized Sliding Window with Direct Index Jumps  
**Core Insight:** Storing character-to-last-index mappings allows `left` to jump directly past duplicate instances in $O(1)$ time without shrinking the window one element at a time.

## Dry Run

`s = "abcabcbb"`:
- `right = 0 ('a')`: `charMap['a'] = 0`, `left = 0`, `len = 1`, `max = 1`.
- `right = 1 ('b')`: `charMap['b'] = 1`, `left = 0`, `len = 2`, `max = 2`.
- `right = 2 ('c')`: `charMap['c'] = 2`, `left = 0`, `len = 3`, `max = 3`.
- `right = 3 ('a')`: Duplicate `'a'` at index 0 >= `left` (0) -> Jump `left = 0 + 1 = 1`. `charMap['a'] = 3`, `len = 3 - 1 + 1 = 3`, `max = 3`.
- Result: `3`.

## JavaScript Solution

```js
function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let left = 0;
  const lastSeen = new Map();

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    if (lastSeen.has(char) && lastSeen.get(char) >= left) {
      // Jump left boundary past previous occurrence
      left = lastSeen.get(char) + 1;
    }

    lastSeen.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
```

## TypeScript Solution

```ts
function lengthOfLongestSubstring(s: string): number {
  let maxLength = 0;
  let left = 0;
  const lastSeen = new Map<string, number>();

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    if (lastSeen.has(char) && lastSeen.get(char) >= left) {
      left = lastSeen.get(char) + 1;
    }

    lastSeen.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
```

## Time Complexity

`O(N)` — single pass through string `s`.

## Space Complexity

`O(min(N, K))` — where `K` is the size of the character set (e.g. 128 for ASCII).

## Common Mistakes

- Forgetting to check `lastSeen.get(char) >= left`, causing `left` to jump backwards when encountering duplicates outside the current sliding window.

## Follow-Up Questions

1. How would you solve Longest Substring with At Most K Distinct Characters?

## Similar Questions

- Minimum Window Substring
- Substrings with Consecutive Distinct Characters
