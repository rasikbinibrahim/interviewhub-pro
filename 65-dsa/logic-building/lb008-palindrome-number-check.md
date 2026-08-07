# LB008 · Palindrome Number Check

**Difficulty:** Easy
**Companies Asked:** TCS, Infosys, Wipro, Accenture, Amazon
**Interview Frequency:** ★★★★☆
**Category:** Logic Building
**Concepts:** digit reversal, comparison without string conversion

## Problem Statement

Write a function `isPalindromeNumber(n)` that returns `true` if the
integer `n` reads the same forwards and backwards, without converting
`n` to a string.

## Input

`n`: an integer.

## Output

Boolean — `true` if `n`'s digits form a palindrome.

## Constraints

`-2^31 <= n <= 2^31 - 1`

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 121` | `true` | Reversed is also 121 |
| `n = -121` | `false` | Reversed would read `121-`, which isn't how negative numbers work — negative numbers are never palindromes |
| `n = 10` | `false` | Reversed is `01`, which as a number is `1`, not equal to `10` |

## Edge Cases

- Negative numbers → always `false` (the minus sign breaks any possible
  symmetry)
- `n = 0` → trivially `true`, a single digit
- Numbers ending in `0` (but not `0` itself, e.g. `10`, `100`) → can
  never be palindromes, since a palindrome can't have a leading zero
  when reversed, but this falls out naturally from the reversal
  comparison without needing a special case

## Hints

1. This reduces directly to a problem you may already know how to
   solve: reversing a number's digits — how could you use that to check
   for a palindrome?
2. Reverse the number using the standard modulo/division digit
   extraction, then compare the reversed value to the original.
3. Handle the sign specially: negative numbers should return `false`
   immediately, since a reversed negative number's digit pattern can
   never equal the original (the sign position breaks any symmetry
   claim).

## Algorithm

**Pattern:** digit reversal, then equality comparison.
**Core insight:** a number is a palindrome exactly when its reversed
digit sequence equals its original digit sequence — which is precisely
what the standard modulo/division digit-reversal technique computes
directly, without ever needing to touch a string. Negative numbers are
excluded upfront, since their sign makes the "reads the same forwards
and backwards" question not meaningfully apply the same way (and no
negative number can equal its own positive reversal).
**Invariant:** the same loop invariant as digit reversal — after each
iteration, `reversed` holds the correctly-ordered reversal of every
digit consumed from `remaining` so far.

## Dry Run

**Input:** `n = 121`

| Step | remaining (before) | digit = remaining % 10 | reversed = reversed*10 + digit | remaining = Math.floor(remaining/10) |
|---|---|---|---|---|
| 1 | 121 | 1 | 0*10+1 = 1 | 12 |
| 2 | 12 | 2 | 1*10+2 = 12 | 1 |
| 3 | 1 | 1 | 12*10+1 = 121 | 0 |

Loop ends. `reversed (121) === n (121)` → **Result:** `true` — matches
expected output.

## JavaScript Solution

```js
function isPalindromeNumber(n) {
  if (n < 0) return false;

  let reversed = 0;
  let remaining = n;

  while (remaining > 0) {
    const digit = remaining % 10;
    reversed = reversed * 10 + digit;
    remaining = Math.floor(remaining / 10);
  }

  return reversed === n;
}
```

## TypeScript Solution

```ts
function isPalindromeNumber(n: number): boolean {
  if (n < 0) return false;

  let reversed = 0;
  let remaining = n;

  while (remaining > 0) {
    const digit: number = remaining % 10;
    reversed = reversed * 10 + digit;
    remaining = Math.floor(remaining / 10);
  }

  return reversed === n;
}
```

## Time Complexity

O(d) — where `d` is the number of digits in `n`.

## Space Complexity

O(1) — a fixed number of scalar variables.

## Common Mistakes

- Converting to a string and comparing against its reverse — works, but
  violates the "no string conversion" constraint and doesn't demonstrate
  the numeric-reversal technique.
- Forgetting to reject negative numbers upfront — comparing a reversed
  positive digit sequence against a negative original always fails
  anyway, but explicitly handling it makes the reasoning clear rather
  than relying on it falling out incidentally.
- Not considering numbers ending in zero — these are correctly handled
  by the general algorithm without special-casing, but worth verifying
  explicitly (e.g. `10` reverses to `01` which as a number is `1`,
  correctly not equal to `10`).

## Interview Follow-up Questions

1. How would you check for a palindrome using only half the digit
   reversal, stopping once the reversed half meets or exceeds the
   remaining original half (a common follow-up optimization)?
2. How does this relate to the Reverse a Number problem, and where do
   the two diverge?
3. How would you check whether a number is a palindrome in a different
   base (e.g. binary) instead of base 10?

## Similar Questions

- Sum of Digits (see [lb006-sum-of-digits.md](lb006-sum-of-digits.md))
- Valid Palindrome (see [../strings/valid-palindrome.md](../strings/valid-palindrome.md))

---
[← Back to 65-dsa](../README.md)
