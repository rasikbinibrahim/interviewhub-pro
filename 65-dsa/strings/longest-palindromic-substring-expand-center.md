# Q6562 · Longest Palindromic Substring (Expand Around Center)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Strings  
**Concepts:** strings, palindrome, expand-around-center, dynamic-programming  

## Problem Statement

Given a string `s`, return the **longest palindromic substring** in `s`.

A **palindrome** is a string that reads the same backward as forward.

## Input

- `s`: `string` — input string

## Output

- `string` — longest palindromic substring

## Constraints

- `1 <= s.length <= 1000`
- `s` consists of only digits and English letters.

## Examples

| Input | Output | Why |
|---|---|---|
| `s = "babad"` | `"bab"` | `"aba"` is also a valid answer of length 3 |
| `s = "cbbd"` | `"bb"` | Longest palindromic substring is `"bb"` |

## Edge Cases

- Single character `"a"` -> returns `"a"`
- String with all identical characters `"aaaa"` -> returns `"aaaa"`

## Hints

1. **Expand Around Center Concept**:
   - A palindrome mirrors around its center.
   - For a string of length $N$, there are $2N - 1$ potential centers (odd length centers `(i, i)` and even length centers `(i, i+1)`).
2. For each center, expand outward while `left >= 0 && right < s.length && s[left] === s[right]`.
3. Track maximum length `maxLen` and starting index `start`.

## Algorithm

**Pattern:** Expand Around Center  
**Core Insight:** Expanding outward from all $2N - 1$ possible center positions checks all candidate palindromes in $O(N^2)$ time with $O(1)$ space, bypassing $O(N^2)$ DP matrix memory overhead.

## Dry Run

`s = "babad"`:
- Center `i = 0 ('b')`: odd expand `"b"` (len 1).
- Center `i = 1 ('a')`: odd expand `left=0 ('b'), right=2 ('b')` -> `"bab"` (len 3). `maxLen = 3, start = 0`.
- Center `i = 2 ('b')`: odd expand `left=1 ('a'), right=3 ('a')` -> `"aba"` (len 3).
- Return `s.substring(0, 3)` = `"bab"`.

## JavaScript Solution

```js
function longestPalindrome(s) {
  if (!s || s.length <= 1) return s;

  let start = 0;
  let maxLen = 1;

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const currentLen = right - left + 1;
      if (currentLen > maxLen) {
        maxLen = currentLen;
        start = left;
      }
      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i);     // Odd length palindromes
    expandAroundCenter(i, i + 1); // Even length palindromes
  }

  return s.substring(start, start + maxLen);
}
```

## TypeScript Solution

```ts
function longestPalindrome(s: string): string {
  if (!s || s.length <= 1) return s;

  let start = 0;
  let maxLen = 1;

  function expandAroundCenter(left: number, right: number): void {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const currentLen = right - left + 1;
      if (currentLen > maxLen) {
        maxLen = currentLen;
        start = left;
      }
      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i);
    expandAroundCenter(i, i + 1);
  }

  return s.substring(start, start + maxLen);
}
```

## Time Complexity

`O(N^2)` — expanding around $2N - 1$ centers up to $N$ steps each.

## Space Complexity

`O(1)` — constant auxiliary space.

## Common Mistakes

- Forgetting to test even-length centers `expandAroundCenter(i, i + 1)`, missing even palindromes like `"cbbd"` -> `"bb"`.

## Follow-Up Questions

1. How does Manacher's Algorithm find Longest Palindromic Substring in $O(N)$ linear time?

## Similar Questions

- Palindromic Substrings
- Longest Palindromic Subsequence
