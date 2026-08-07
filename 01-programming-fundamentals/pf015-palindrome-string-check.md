# PF015 · Check if a String is a Palindrome (Two-Pointer Character Matching)

**Difficulty:** Easy  
**Companies Asked:** Amazon, Microsoft, Google, Meta, TCS, Infosys  
**Interview Frequency:** ★★★★★  
**Category:** Programming Fundamentals  
**Concepts:** palindrome, strings, two-pointers, clean-code  

## Problem Statement

Write a function to determine if a given string `s` is a **palindrome**, ignoring non-alphanumeric characters and case differences.

A **palindrome** is a string that reads the same forward and backward.

## Input

- `s`: `string` — input string

## Output

- `boolean` — `true` if string is a valid palindrome, `false` otherwise

## Constraints

- `1 <= s.length <= 2 * 10^5`
- `s` consists of printable ASCII characters.

## Examples

| Input | Output | Explanation |
|---|---|---|
| `s = "A man, a plan, a canal: Panama"` | `true` | Filtered alphanumeric string `"amanaplanacanalpanama"` is a palindrome |
| `s = "race a car"` | `false` | Filtered string `"raceacar"` is not a palindrome |
| `s = " "` | `true` | Empty filtered string is a valid palindrome |

## Edge Cases

- Empty string `""` or single character `"a"` -> returns `true`

## Hints

1. **Two Pointers Approach**:
   - Place `left = 0` and `right = s.length - 1`.
2. While `left < right`:
   - Increment `left` while `s[left]` is non-alphanumeric.
   - Decrement `right` while `s[right]` is non-alphanumeric.
   - Compare `s[left].toLowerCase() === s[right].toLowerCase()`. If false, return `false`.
   - Increment `left++`, decrement `right--`.

## Algorithm

**Pattern:** In-Place Filtered Two-Pointer Convergence  
**Core Insight:** Skipping non-alphanumeric characters in-place using two converging pointers validates palindromes in $O(N)$ time without allocating auxiliary string arrays.

## Dry Run

`s = "A man, a plan, a canal: Panama"`:
- `left` skips non-alphanumeric to `'A'`, `right` skips to `'a'`. `'a' === 'a'`.
- `left` to `'m'`, `right` to `'m'`. `'m' === 'm'`.
- Pointers converge at center. Return `true`.

## JavaScript Solution

```js
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  function isAlphanumeric(char) {
    const code = char.charCodeAt(0);
    return (
      (code >= 48 && code <= 57) ||  // 0-9
      (code >= 65 && code <= 90) ||  // A-Z
      (code >= 97 && code <= 122)    // a-z
    );
  }

  while (left < right) {
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}
```

## TypeScript Solution

```ts
function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  function isAlphanumeric(char: string): boolean {
    const code = char.charCodeAt(0);
    return (
      (code >= 48 && code <= 57) ||
      (code >= 65 && code <= 90) ||
      (code >= 97 && code <= 122)
    );
  }

  while (left < right) {
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}
```

## Time Complexity

`O(N)` — single linear pass through string of length $N$.

## Space Complexity

`O(1)` — in-place constant space.

## Common Mistakes

- Using regex `s.replace(/[^a-zA-Z0-9]/g, '')`, which allocates $O(N)$ auxiliary string copies instead of optimal in-place two-pointer traversal.

## Follow-Up Questions

1. How would you solve Valid Palindrome II (allowing at most 1 character deletion)?

## Similar Questions

- Valid Palindrome II
- Longest Palindromic Substring
