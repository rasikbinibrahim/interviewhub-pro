# PF025 · Check Armstrong Number

**Difficulty:** Easy
**Companies Asked:** TCS, Infosys, Wipro
**Interview Frequency:** ★★★☆☆
**Category:** Programming Fundamentals
**Concepts:** math, digits

## Problem Statement

Write a function `isArmstrong(n)` that returns `true` if `n` is an
Armstrong number — a number equal to the sum of its own digits, each
raised to the power of the total digit count — and `false` otherwise.

## Input

`n`: a non-negative integer.

## Output

A boolean: `true` if `n` is an Armstrong number, `false` otherwise.

## Constraints

`0 <= n <= 10^8`

## Examples

| Input | Output | Why |
|---|---|---|
| `153` | `true` | `1³ + 5³ + 3³ = 1 + 125 + 27 = 153` |
| `9474` | `true` | `9⁴ + 4⁴ + 7⁴ + 4⁴ = 6561 + 256 + 2401 + 256 = 9474` |
| `123` | `false` | `1³ + 2³ + 3³ = 1 + 8 + 27 = 36 ≠ 123` |

## Edge Cases

- Single-digit numbers (`0`-`9`) → always Armstrong numbers, since any
  digit raised to the power `1` is itself
- `n = 0` → `0⁰...` handled correctly since it's a single digit, sum is
  `0`, matches `n`
- Large digit counts → each digit raised to a higher power grows fast;
  the check still works, just with bigger intermediate sums

## Hints

1. You need two things about `n`: how many digits it has, and what each
   individual digit is — what's a simple way to get both at once?
2. Converting `n` to a string gives you its digit count (`str.length`)
   and lets you iterate each digit as a character, which `parseInt` can
   turn back into a number.
3. Raise each digit to the power of the *total* digit count (not its own
   position), sum those, and compare the sum back against the original
   `n`.

## Algorithm

**Pattern:** digit decomposition and power summation.
**Core insight:** an Armstrong number (also called a narcissistic
number) is defined entirely in terms of its own digits and their count —
so the check is a direct translation of that definition: extract every
digit, raise each to the power of how many digits there are in total,
sum the results, and compare against the original number.
**Invariant:** after processing every character of `str`, `sum` holds
the total of every digit raised to the `numDigits` power, and comparing
that total to the original `n` is exactly the Armstrong-number
definition.

## Dry Run

**Input:** `n = 153`

| char | digit | numDigits | digit^numDigits | running sum |
|---|---|---|---|---|
| `'1'` | 1 | 3 | 1 | 1 |
| `'5'` | 5 | 3 | 125 | 126 |
| `'3'` | 3 | 3 | 27 | 153 |

`sum (153) === n (153)`. **Result:** `true` — matches expected output.

## JavaScript Solution

```js
function isArmstrong(n) {
  const str = String(n);
  const numDigits = str.length;
  let sum = 0;
  for (const char of str) {
    sum += Math.pow(parseInt(char, 10), numDigits);
  }
  return sum === n;
}
```

## TypeScript Solution

```ts
function isArmstrong(n: number): boolean {
  const str: string = String(n);
  const numDigits: number = str.length;
  let sum = 0;
  for (const char of str) {
    sum += Math.pow(parseInt(char, 10), numDigits);
  }
  return sum === n;
}
```

## Time Complexity

O(d), where d is the number of digits in `n` — one pass to convert to a
string, one pass to sum the powered digits.

## Space Complexity

O(d) — the string representation of `n` takes space proportional to its
digit count.

## Common Mistakes

- Raising each digit to a *fixed* power (like always cubing) instead of
  the actual digit count of `n` — this only works for 3-digit Armstrong
  numbers and silently breaks for any other length, like `9474`.
- Computing digit count and digits via repeated `% 10` / `Math.floor(/
  10)` arithmetic instead of string conversion — also valid, but easy to
  get the digit *count* wrong if not computed as a fully separate first
  pass before the summation pass.
- Comparing `sum` to `n` with loose equality across mixed types — not an
  issue here since both are numbers, but worth being deliberate about
  when digit extraction goes through strings and `parseInt`.

## Interview Follow-up Questions

1. How would you find all Armstrong numbers within a given range, like 1
   to 1,000,000?
2. Why do Armstrong numbers become extremely rare as digit count grows —
   what's the intuition for why the powered-digit sum eventually can't
   keep up with the number of digits?
3. How would you adapt this check to a different numeral base, like
   base 8 or base 16, instead of base 10?

## Similar Questions

- Sum of Digits of a Number (see [pf020-sum-of-digits-of-number.md](pf020-sum-of-digits-of-number.md))
- Check Perfect Number (see [pf034-check-perfect-number.md](pf034-check-perfect-number.md))

---
[← Back to Programming Fundamentals](README.md)
