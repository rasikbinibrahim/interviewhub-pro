# Q6628 · Palindromic Substrings (Expand Around Center)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Dynamic Programming
**Concepts:** dp, strings, two-pointers

## Problem Statement

Write a function `countSubstrings(s)` that returns the total number of
palindromic substrings in `s` (counting each occurrence separately, even
if the same substring text repeats at different positions).

## Input

`s`: a string.

## Output

A single number: the count of palindromic substrings.

## Constraints

`1 <= s.length <= 1000`

## Examples

| Input | Output | Why |
|---|---|---|
| `"abc"` | `3` | `"a"`, `"b"`, `"c"` — three single-character palindromes, nothing longer |
| `"aaa"` | `6` | `"a","a","a","aa","aa","aaa"` — every contiguous run of `a`s is itself a palindrome |
| `"a"` | `1` | A single character is always a palindrome of itself |

## Edge Cases

- Single-character string → `1`
- String of all-identical characters → every possible contiguous
  substring is a palindrome (count grows quadratically with length)
- No repeated characters at all → the count equals the string's length
  (only the single-character palindromes)
- Empty positions between characters (even-length centers) must be
  checked too, or palindromes like `"aa"` are undercounted

## Hints

1. Every palindromic substring has a center — either a single character
   (odd length) or the gap between two adjacent characters (even
   length). What if you expanded outward from every possible center and
   counted a match on every successful expansion step?
2. For each index `i`, expand around `(i, i)` for odd-length
   palindromes and around `(i, i+1)` for even-length ones — every
   successful expansion step (where the characters on both sides still
   match) represents one more valid palindromic substring centered
   there.
3. There's no need to track *which* substrings were found — only how
   many valid expansion steps occurred in total across every center.

## Algorithm

**Pattern:** expand around center, counting every successful step.
**Core insight:** rather than checking every substring individually,
each of the `2n - 1` possible centers can be expanded outward once, and
every step where the two sides still match represents exactly one
distinct palindromic substring centered there (of increasing length).
Summing the number of successful expansion steps across every center —
without needing to record the substrings themselves — directly gives
the total count.
**Invariant:** after processing centers `0` through `i`, `count` holds
the exact number of palindromic substrings whose center lies at or
before position `i`.

## Dry Run

**Input:** `s = "aaa"`

| i | expand(i,i) steps (count++) | expand(i,i+1) steps (count++) | count after |
|---|---|---|---|
| 0 | `l=0,r=0`: match, count→1 | `l=0,r=1`: match, count→2 | 2 |
| 1 | `l=1,r=1`: match, count→3; `l=0,r=2`: match, count→4 | `l=1,r=2`: match, count→5 | 5 |
| 2 | `l=2,r=2`: match, count→6 | out of bounds, no step | 6 |

**Result:** `6` — matches expected output.

## JavaScript Solution

```js
function countSubstrings(s) {
  let count = 0;

  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      count++;
      l--;
      r++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // Odd length
    expand(i, i + 1); // Even length
  }

  return count;
}
```

## TypeScript Solution

```ts
function countSubstrings(s: string): number {
  let count = 0;

  function expand(left: number, right: number): void {
    let l = left;
    let r = right;
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      count++;
      l--;
      r++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }

  return count;
}
```

## Time Complexity

O(n²) — O(n) centers, each expanding up to O(n) steps in the worst case
(e.g. a string of all-identical characters).

## Space Complexity

O(1) — a single counter and a couple of loop variables, no auxiliary
storage proportional to input size.

## Common Mistakes

- Checking every substring directly for the palindrome property —
  O(n³), far slower than expand-around-center's O(n²).
- Only expanding around odd-length centers (`i, i`) — silently
  undercounts every even-length palindrome, like the `"aa"` substrings
  in `"aaa"`.
- Confusing this with "Longest Palindromic Substring" — that problem
  wants the *longest single* palindrome; this one wants the *total
  count* of all palindromic substrings, which uses the same
  expand-around-center technique but accumulates differently (counting
  every step, not just tracking the best one).

## Interview Follow-up Questions

1. How would you solve this with an O(n²) DP table instead, and what
   does each cell represent?
2. How would you count only palindromic substrings of even length, or
   only those longer than some minimum length?
3. Could this be solved in O(n) using Manacher's algorithm, and what
   would that trade off in implementation complexity?

## Similar Questions

- Longest Palindromic Substring (see [longest-palindromic-substring-dp.md](longest-palindromic-substring-dp.md))
- Valid Parentheses Expression Stack Matcher (see [../../01-programming-fundamentals/pf040-valid-parentheses-stack-check.md](../../01-programming-fundamentals/pf040-valid-parentheses-stack-check.md))
