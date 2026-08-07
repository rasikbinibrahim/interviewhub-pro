# Q202 · Valid Palindrome

**Difficulty:** Easy
**Companies Asked:** Microsoft, Amazon, Facebook/Meta, Apple
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Strings / Two Pointers
**Concepts:** two pointers converging from both ends, in-place character filtering

## Problem Statement

Given a string `s`, determine whether it's a palindrome after: converting
all uppercase letters to lowercase, and removing all non-alphanumeric
characters (spaces, punctuation). An empty string (after filtering)
counts as a valid palindrome.

## Input

`s`: a string that may contain letters, digits, spaces, and punctuation.

## Output

A boolean: `true` if the filtered, lowercased string reads the same
forwards and backwards, `false` otherwise.

## Constraints

- `1 <= s.length <= 2 * 10^5`
- `s` consists of printable ASCII characters.

## Examples

| Input | Output | Why |
|---|---|---|
| `"A man, a plan, a canal: Panama"` | `true` | Filtered: `"amanaplanacanalpanama"` — reads the same both ways |
| `"race a car"` | `false` | Filtered: `"raceacar"` — not a palindrome |
| `" "` | `true` | Filtered to an empty string, which trivially counts as a palindrome |

## Edge Cases

- String that's entirely punctuation/whitespace → filters down to
  empty → `true`
- Single alphanumeric character → always `true`
- Mixed case (`"Aa"`) → must be treated as equal after lowercasing
- Digits mixed with letters (`"a1b2b1a"` filtered stays as-is; digits
  count as alphanumeric, not stripped)

## Hints

1. You don't need to build the filtered string first and then check it
   — think about how you'd skip irrelevant characters *while* comparing.
2. Two pointers starting at opposite ends and moving toward the middle
   let you compare corresponding characters directly, without ever
   materializing a reversed copy of the string.
3. At each step, advance each pointer past any character that isn't
   alphanumeric *before* comparing — both pointers need this skip logic
   independently.

## Algorithm

**Pattern:** two pointers, converging from both ends.
**Core insight:** a palindrome check only requires comparing character
`i` from the start against character `i` from the end, for every `i` up
to the middle — there's no need to build a cleaned/reversed copy of the
string first. Skipping non-alphanumeric characters can happen inline, as
each pointer advances, rather than as a separate filtering pass.
**Invariant:** at every step, everything strictly outside the
`[left, right]` window has already been verified to match its mirrored
counterpart. The string is a palindrome if this holds all the way until
the pointers meet or cross.

## Dry Run

**Input:** `s = "A man, a plan, a canal: Panama"` (showing only the
alphanumeric-skip logic; full string omitted from the table for
brevity — the two pointers walk inward, skipping `,`, `:`, and spaces)

| left char | right char | Match (case-insensitive)? |
|---|---|---|
| 'A' | 'a' | Yes ('a' === 'a') |
| 'm' | 'm' | Yes |
| 'a' | 'a' | Yes |
| 'n' | 'n' | Yes |
| ... | ... | ... (continues matching through the middle) |

Pointers meet in the middle with every pair matched. **Result:** `true`
— matches expected output.

## JavaScript Solution

```js
function isAlphanumeric(char) {
  return /[a-z0-9]/i.test(char);
}

function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Skip non-alphanumeric characters from the left.
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }
    // Skip non-alphanumeric characters from the right.
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }

    // Compare case-insensitively — this is the actual palindrome check.
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true; // pointers met or crossed with no mismatch found
}
```

## TypeScript Solution

```ts
function isAlphanumeric(char: string): boolean {
  return /[a-z0-9]/i.test(char);
}

function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  // Every `!` below is safe: each access is guarded by the enclosing
  // `left < right` condition, which keeps both indices within bounds.
  while (left < right) {
    while (left < right && !isAlphanumeric(s[left]!)) {
      left++;
    }
    while (left < right && !isAlphanumeric(s[right]!)) {
      right--;
    }

    if (s[left]!.toLowerCase() !== s[right]!.toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}
```

## Time Complexity

O(n) — each character is visited at most once total across both
pointers combined, even accounting for the skip loops (they never
revisit a position).

## Space Complexity

O(1) — no filtered copy of the string is ever built; only two pointer
variables.

## Common Mistakes

- Building a cleaned/lowercased copy of the string first
  (`s.replace(/[^a-z0-9]/gi, '').toLowerCase()`) and then checking it
  against its reverse — works, but uses O(n) extra space and doesn't
  demonstrate the two-pointer technique the question is testing.
- Forgetting `left < right` as a guard inside the inner skip-loops —
  without it, an all-punctuation string can run `left` past `right`
  before the outer loop's condition is rechecked.
- Case-sensitive comparison (forgetting `.toLowerCase()`), which fails
  on any input with mixed case.

## Interview Follow-up Questions

1. How would you handle Unicode characters (accents, non-Latin scripts)
   correctly, given that `.toLowerCase()` and simple regex character
   classes don't always behave as expected across locales?
2. Could you solve this recursively instead of iteratively — what would
   the space complexity become, and why?
3. What if you needed to return the *longest palindromic substring*
   instead of just checking the whole string?

## Similar Questions

- Valid Palindrome II (allowed to delete at most one character)
- Longest Palindromic Substring
- Palindrome Linked List

---
[← Back to Strings](README.md) · [← Back to 65-dsa](../README.md)
