# Q204 · Longest Palindromic Substring

**Difficulty:** Medium
**Companies Asked:** Amazon, Microsoft, Google, Meta, Bloomberg
**Interview Frequency:** ★★★★★
**Category:** Data Structures & Algorithms → Strings
**Concepts:** expand around center, odd/even-length palindromes

## Problem Statement

Given a string `s`, return the longest substring of `s` that is a
palindrome (reads the same forwards and backwards). If more than one
substring of the maximum length qualifies, return any one of them.

## Input

- `s`: a string

## Output

A string: the longest palindromic substring found in `s`.

## Constraints

- `1 <= s.length <= 1000`
- `s` consists of digits and English letters.

## Examples

| Input | Output | Why |
|---|---|---|
| `s = "babad"` | `"bab"` (or `"aba"`) | Both are valid length-3 palindromes; either is accepted |
| `s = "cbbd"` | `"bb"` | The longest palindromic substring is the even-length pair `"bb"` |
| `s = "a"` | `"a"` | A single character is trivially a palindrome |

## Edge Cases

- Single character → the character itself
- Entire string is already a palindrome → return the whole string
- No palindrome longer than 1 character exists → any single character is
  a valid (length-1) answer
- Even-length palindrome only (e.g. `"cbbd"`) → a solution that only
  checks odd-length centers would miss it entirely

## Hints

1. Checking every possible substring for the palindrome property is
   O(n^3) (O(n^2) substrings, O(n) to verify each) — what does a
   palindrome look like if you start from its *middle* instead of its
   edges?
2. A palindrome is symmetric around a center. If you pick a center and
   expand outward one character at a time in both directions, you can
   stop the instant the characters on either side stop matching.
3. There are two *kinds* of center: a single character (for odd-length
   palindromes like `"aba"`) and the gap between two characters (for
   even-length palindromes like `"bb"`) — every index needs to be tried
   as both kinds of center.

## Algorithm

**Pattern:** expand around center.
**Core insight:** rather than checking all O(n^2) substrings for the
palindrome property independently, treat each of the `2n - 1` possible
centers (n single-character centers, n-1 between-character centers) as
a starting point and expand outward while the characters on both sides
keep matching. Because expansion stops as soon as a mismatch occurs, the
total work across all centers for a given string is bounded by O(n^2),
without ever needing to re-verify a substring's palindrome property from
scratch.
**Invariant:** while expanding from a given center, everything strictly
between the current `left` and `right` pointers has already been
confirmed to be a palindrome; the loop only continues if extending by
one more character on each side preserves that.

## Dry Run

**Input:** `s = "babad"`

| Center type | Center index | Expansion | Palindrome found | Longer than best so far? |
|---|---|---|---|---|
| odd | 0 (`b`) | can't expand (edge) | `"b"` | best = `"b"` |
| odd | 1 (`a`) | expand: `s[0]=b`, `s[2]=b` match; `s[-1]` out of bounds, stop | `"bab"` | best = `"bab"` |
| odd | 2 (`b`) | expand: `s[1]=a`, `s[3]=a` match; `s[0]=b`, `s[4]=d` mismatch, stop | `"aba"` | length 3, not longer, keep `"bab"` |
| odd | 3 (`a`) | expand: `s[2]=b`, `s[4]=d` mismatch, stop | `"a"` | not longer |
| odd | 4 (`d`) | can't expand (edge) | `"d"` | not longer |
| even centers | (all gaps) | no adjacent equal pair found | — | no change |

**Result:** `"bab"` — matches one of the accepted expected outputs.

## JavaScript Solution

```js
function expandFromCenter(s, left, right) {
  // Expand outward while both sides exist and match; return the final
  // matching bounds (one step back from where the mismatch occurred).
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }

  return { start: left + 1, end: right - 1 };
}

function longestPalindromicSubstring(s) {
  let longestStart = 0;
  let longestEnd = 0;

  for (let center = 0; center < s.length; center++) {
    // Odd-length palindromes center on a single character.
    const odd = expandFromCenter(s, center, center);
    if (odd.end - odd.start > longestEnd - longestStart) {
      longestStart = odd.start;
      longestEnd = odd.end;
    }

    // Even-length palindromes center on the gap between two characters.
    const even = expandFromCenter(s, center, center + 1);
    if (even.end - even.start > longestEnd - longestStart) {
      longestStart = even.start;
      longestEnd = even.end;
    }
  }

  return s.slice(longestStart, longestEnd + 1);
}
```

## TypeScript Solution

```ts
interface PalindromeBounds {
  start: number;
  end: number;
}

function expandFromCenter(s: string, centerLeft: number, centerRight: number): PalindromeBounds {
  let left = centerLeft;
  let right = centerRight;

  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }

  return { start: left + 1, end: right - 1 };
}

function longestPalindromicSubstring(s: string): string {
  let longest: PalindromeBounds = { start: 0, end: 0 };

  for (let center = 0; center < s.length; center++) {
    const odd = expandFromCenter(s, center, center);
    if (odd.end - odd.start > longest.end - longest.start) {
      longest = odd;
    }

    const even = expandFromCenter(s, center, center + 1);
    if (even.end - even.start > longest.end - longest.start) {
      longest = even;
    }
  }

  return s.slice(longest.start, longest.end + 1);
}
```

## Time Complexity

O(n^2) — `2n - 1` centers, each expanding up to O(n) times in the worst
case (e.g. a string of all identical characters).

## Space Complexity

O(1) auxiliary space — a fixed number of index variables, not counting
the returned substring itself.

## Common Mistakes

- Only checking odd-length centers (single characters) — misses every
  even-length palindrome, like `"bb"` in `"cbbd"`.
- Off-by-one errors converting the final `left`/`right` pointers back
  into substring bounds — the loop overshoots by one position on each
  side right before it exits, so the actual palindrome is
  `[left + 1, right - 1]`, not `[left, right]`.
- Re-scanning the whole string to verify a candidate substring is a
  palindrome (O(n) per check) instead of trusting the expansion's own
  matching guarantee — redundant work that doesn't change the asymptotic
  complexity here but is unnecessary.

## Interview Follow-up Questions

1. Manacher's algorithm solves this in O(n) — what's the core idea that
   lets it avoid re-doing overlapping expansion work between centers?
2. How would you count the *total number* of palindromic substrings
   instead of just finding the longest one?
3. How does this differ from the Longest Palindromic *Subsequence*
   problem (characters don't need to be contiguous)?

## Similar Questions

- Valid Palindrome (see [valid-palindrome.md](valid-palindrome.md))
- Palindromic Substrings (count variant)
- Longest Palindromic Subsequence

---
[← Back to Strings](README.md) · [← Back to 65-dsa](../README.md)
