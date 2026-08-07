# Q6653 · Longest Palindromic Substring (Expand Around Center)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple
**Interview Frequency:** ★★★★★
**Category:** Dynamic Programming
**Concepts:** dp, string, expand-around-center

## Problem Statement

Write a function `longestPalindrome(s)` that returns the longest
contiguous substring of `s` that reads the same forwards and backwards.
If more than one substring of the maximum length qualifies, return any
one of them.

## Input

`s`: a string.

## Output

The longest palindromic substring of `s`.

## Constraints

`1 <= s.length <= 1000`

## Examples

| Input | Output | Why |
|---|---|---|
| `"cbbd"` | `"bb"` | The only palindrome longer than a single character |
| `"babad"` | `"aba"` | Both `"bab"` and `"aba"` are valid length-3 answers; this implementation returns `"aba"` |
| `"a"` | `"a"` | A single character is trivially a palindrome of itself |

## Edge Cases

- Single-character string → that character itself
- Entire string is already a palindrome → the whole string
- No palindrome longer than 1 character exists → any single character
  (the loop always finds at least a length-1 palindrome at every
  position)
- Even-length palindrome (`"bb"`) vs odd-length palindrome (`"aba"`) —
  both must be detected, since a palindrome can be centered either on a
  single character or between two characters

## Hints

1. Every palindrome has a center — either a single character (for
   odd-length palindromes) or the gap between two characters (for
   even-length ones). What if, for every possible center, you expanded
   outward as far as the string stays symmetric?
2. For each index `i`, try expanding around `(i, i)` (odd-length center)
   and around `(i, i+1)` (even-length center), and take whichever
   produces the longer palindrome.
3. Track the best `start`/`end` boundary found across every center
   checked, and slice that final range out of `s` at the end.

## Algorithm

**Pattern:** expand around center, checked at every possible center
position.
**Core insight:** rather than checking every possible substring for the
palindrome property (which is O(n³) naively, or O(n²) with DP tables),
you can exploit the fact that a palindrome is symmetric around its
center: starting from a candidate center and expanding outward one
character at a time in both directions, the expansion can only succeed
as long as the characters on both sides keep matching — the moment they
don't, that's the maximal palindrome for that center. Trying this for
every one of the `2n - 1` possible centers (n single-character centers,
n-1 between-character centers) and keeping the longest result found
covers every possible palindrome in the string.
**Invariant:** after checking centers `0` through `i`, `start` and `end`
mark the boundaries of the longest palindromic substring found among
every center considered so far.

## Dry Run

**Input:** `s = "cbbd"`

| i | expand(i,i) [odd] | expand(i,i+1) [even] | len | update start/end? |
|---|---|---|---|---|
| 0 | `'c'` alone → len 1 | `'c','b'` mismatch → len 0 | 1 | yes: start=0, end=0 |
| 1 | `'b'` alone → len 1 | `'b','b'` match, then `'c'` vs `'d'` mismatch → len 2 | 2 | yes: start=1, end=2 |
| 2 | `'b'` alone, then `'b'` vs `'d'` mismatch → len 1 | `'b','d'` mismatch → len 0 | 1 | no (1 ≤ current best of 2) |
| 3 | `'d'` alone → len 1 | out of bounds → len 0 | 1 | no |

**Result:** `s.substring(1, 3) = "bb"` — matches expected output.

## JavaScript Solution

```js
function longestPalindrome(s) {
  if (!s || s.length < 1) return '';
  let start = 0, end = 0;

  function expand(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }

  for (let i = 0; i < s.length; i++) {
    const len1 = expand(i, i);
    const len2 = expand(i, i + 1);
    const len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }

  return s.substring(start, end + 1);
}
```

## TypeScript Solution

```ts
function longestPalindrome(s: string): string {
  if (!s || s.length < 1) return '';
  let start = 0;
  let end = 0;

  function expand(left: number, right: number): number {
    let l = left;
    let r = right;
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    return r - l - 1;
  }

  for (let i = 0; i < s.length; i++) {
    const len1: number = expand(i, i);
    const len2: number = expand(i, i + 1);
    const len: number = Math.max(len1, len2);
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }

  return s.substring(start, end + 1);
}
```

## Time Complexity

O(n²) — there are O(n) possible centers, and each expansion can take up
to O(n) steps in the worst case (e.g. a string that's entirely one
repeated character).

## Space Complexity

O(1) — a fixed number of scalar variables (excluding the output
substring itself, which is required regardless of approach).

## Common Mistakes

- Checking every substring for the palindrome property directly —
  O(n³) (O(n²) substrings, each taking O(n) to verify), far slower than
  expand-around-center.
- Forgetting to check *both* the odd-length center (`i, i`) and the
  even-length center (`i, i+1`) — omitting one silently misses every
  palindrome of the other parity, like missing `"bb"` if only odd
  centers are checked.
- Off-by-one errors converting the expansion's final `left`/`right`
  bounds back into a `start`/`end` substring range — the loop always
  overshoots by one position past the last valid match on both sides,
  so the actual palindrome spans `[left + 1, right - 1]`.

## Interview Follow-up Questions

1. How would you solve this with an O(n²) DP table instead
   (`dp[i][j] = `is `s[i..j]` a palindrome), and what's the space
   trade-off?
2. Manacher's algorithm solves this in O(n) — what's the core idea that
   lets it avoid the O(n²) worst case of repeated expansion?
3. How would you count the *total number* of palindromic substrings,
   rather than just finding the longest one?

## Similar Questions

- Palindromic Substrings (Count All) (see [palindromic-substrings-expand-center.md](palindromic-substrings-expand-center.md))
- Check Valid Anagram Strings (see [../../01-programming-fundamentals/pf028-check-anagram-strings.md](../../01-programming-fundamentals/pf028-check-anagram-strings.md))
