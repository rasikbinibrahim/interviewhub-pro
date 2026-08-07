# LB005 · FizzBuzz

**Difficulty:** Easy
**Companies Asked:** TCS, Infosys, Wipro, Accenture, Amazon, Microsoft
**Interview Frequency:** ★★★★★
**Category:** Logic Building
**Concepts:** modulo operator, conditional branching, string building

## Problem Statement

Write a function `fizzBuzz(n)` that returns an array of strings for the
numbers `1` to `n`, where: multiples of 3 are replaced with `"Fizz"`,
multiples of 5 are replaced with `"Buzz"`, multiples of both 3 and 5 are
replaced with `"FizzBuzz"`, and all other numbers appear as their
string form.

## Input

`n`: a positive integer.

## Output

An array of `n` strings.

## Constraints

`1 <= n <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 5` | `["1","2","Fizz","4","Buzz"]` | 3 is a multiple of 3, 5 is a multiple of 5 |
| `n = 15` | `[..., "13","14","FizzBuzz"]` (last element) | 15 is a multiple of both 3 and 5 |
| `n = 1` | `["1"]` | Not a multiple of either |

## Edge Cases

- `n = 1` → single-element array, no Fizz/Buzz possible
- The very first multiple of 15 (`n = 15`) → must produce `"FizzBuzz"`,
  not `"Fizz"` followed later by a separate `"Buzz"`
- Numbers divisible by neither 3 nor 5 → appear as plain number strings

## Hints

1. Checking divisibility by 3 and by 5 as two entirely independent `if`
   statements can accidentally produce two separate outputs for one
   number — what order of checks avoids that?
2. The "both" case (divisible by 15) must be checked *before* the
   individual "3 only" and "5 only" cases, otherwise the individual
   checks would fire first and the combined case would never be reached.
3. `num % 3 === 0 && num % 5 === 0` is equivalent to `num % 15 === 0` —
   either form works, but checking both individual conditions together
   makes the "why" more explicit for someone reading the code.

## Algorithm

**Pattern:** modulo-based conditional branching, checked from most to
least specific.
**Core insight:** since "divisible by both 3 and 5" is a strict subset
of "divisible by 3" and of "divisible by 5" individually, checking the
combined condition first (before either individual condition) is what
prevents the individual branches from firing on numbers that should get
"FizzBuzz" instead.
**Invariant:** exactly one of the four branches (FizzBuzz, Fizz, Buzz,
the number itself) executes for each number, because the conditions are
checked in most-specific-first order and each branch returns/continues
immediately.

## Dry Run

**Input:** `n = 15` (showing the tail end)

| num | num % 3 | num % 5 | Output |
|---|---|---|---|
| 13 | 1 | 3 | `"13"` |
| 14 | 2 | 4 | `"14"` |
| 15 | 0 | 0 | `"FizzBuzz"` |

**Result:** `[..., "13", "14", "FizzBuzz"]` — matches expected output.

## JavaScript Solution

```js
function fizzBuzz(n) {
  const result = [];

  for (let num = 1; num <= n; num++) {
    if (num % 3 === 0 && num % 5 === 0) {
      result.push('FizzBuzz');
    } else if (num % 3 === 0) {
      result.push('Fizz');
    } else if (num % 5 === 0) {
      result.push('Buzz');
    } else {
      result.push(String(num));
    }
  }

  return result;
}
```

## TypeScript Solution

```ts
function fizzBuzz(n: number): string[] {
  const result: string[] = [];

  for (let num = 1; num <= n; num++) {
    if (num % 3 === 0 && num % 5 === 0) {
      result.push('FizzBuzz');
    } else if (num % 3 === 0) {
      result.push('Fizz');
    } else if (num % 5 === 0) {
      result.push('Buzz');
    } else {
      result.push(String(num));
    }
  }

  return result;
}
```

## Time Complexity

O(n) — one constant-time check per number from 1 to n.

## Space Complexity

O(n) — the output array holds n strings.

## Common Mistakes

- Checking `num % 3` and `num % 5` as separate, non-exclusive `if`
  blocks (not `else if`) — pushes two separate values for multiples of
  15 instead of one `"FizzBuzz"`.
- Checking the individual `"Fizz"`/`"Buzz"` conditions before the
  combined one — the combined case never gets reached, since the
  individual branch already fired and (if using `else if` correctly)
  returned first.
- Forgetting to convert plain numbers to strings — mixing numbers and
  strings in the same output array when the problem expects a uniform
  string array.

## Interview Follow-up Questions

1. How would you generalize this to arbitrary pairs of divisors and
   labels, not just hardcoded 3/Fizz and 5/Buzz?
2. How would you solve this without any `if`/`else` branching at all
   (e.g. building the label by string concatenation)?
3. How would you print the result instead of returning it, and what's
   the tradeoff between a function that returns vs. one that has the
   side effect of printing?

## Similar Questions

- Check Prime Number (see [lb007-check-prime-number.md](lb007-check-prime-number.md))
- Sum of Digits (see [lb006-sum-of-digits.md](lb006-sum-of-digits.md))

---
[← Back to 65-dsa](../README.md)
