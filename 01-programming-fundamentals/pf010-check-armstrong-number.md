# PF010 · Check Armstrong / Narcissistic Number

**Difficulty:** Easy  
**Companies Asked:** TCS, Infosys, Wipro, Accenture, Cognizant  
**Interview Frequency:** ★★★★☆  
**Category:** Programming Fundamentals  
**Concepts:** math, armstrong-number, digit-power, modulo  

## Problem Statement

Write a function that checks whether a given positive integer `n` is an **Armstrong Number** (also known as a Narcissistic Number).

An $k$-digit number `n` is an **Armstrong number** if the sum of its digits raised to the power of $k$ equals `n` itself:
`d1^k + d2^k + ... + dk^k = n`

## Input

- `n`: `number` — non-negative integer

## Output

- `boolean` — `true` if `n` is an Armstrong number, `false` otherwise

## Constraints

- `0 <= n <= 10^9`

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 153` | `true` | `1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153` (3 digits) |
| `n = 1634` | `true` | `1^4 + 6^4 + 3^4 + 4^4 = 1 + 1296 + 81 + 256 = 1634` (4 digits) |
| `n = 123` | `false` | `1^3 + 2^3 + 3^3 = 1 + 8 + 27 = 36 != 123` |

## Edge Cases

- Single digit numbers `0-9` (e.g. `n = 5`) -> `5^1 = 5` (always `true`)
- `n = 0` -> returns `true`

## Hints

1. Count the total number of digits $k$: `k = Math.floor(Math.log10(n)) + 1` (or `n.toString().length`).
2. Extract each digit using `% 10`.
3. Raise each digit to power $k$ (`Math.pow(digit, k)` or `digit ** k`) and add to `sum`.
4. Return `sum === originalN`.

## Algorithm

**Pattern:** Positional Digit Exponential Accumulation  
**Core Insight:** Computing total digit count $k$ first allows exact $d^k$ power summation in $O(k)$ time.

## Dry Run

`n = 153`:
- Digit count `k = 3`. `temp = 153`, `sum = 0`.
- Loop 1: `digit = 153 % 10 = 3`. `sum += 3^3 = 27`. `temp = 15`.
- Loop 2: `digit = 15 % 10 = 5`. `sum += 5^3 = 27 + 125 = 152`. `temp = 1`.
- Loop 3: `digit = 1 % 10 = 1`. `sum += 1^3 = 152 + 1 = 153`. `temp = 0`.
- Compare `sum (153) === original (153)` -> return `true`.

## JavaScript Solution

```js
function isArmstrong(n) {
  if (n < 0) return false;
  if (n === 0) return true;

  const numStr = n.toString();
  const k = numStr.length;
  
  let temp = n;
  let sum = 0;

  while (temp > 0) {
    const digit = temp % 10;
    sum += Math.pow(digit, k);
    temp = Math.floor(temp / 10);
  }

  return sum === n;
}
```

## TypeScript Solution

```ts
function isArmstrong(n: number): boolean {
  if (n < 0) return false;
  if (n === 0) return true;

  const numStr = n.toString();
  const k = numStr.length;

  let temp = n;
  let sum = 0;

  while (temp > 0) {
    const digit = temp % 10;
    sum += Math.pow(digit, k);
    temp = Math.floor(temp / 10);
  }

  return sum === n;
}
```

## Time Complexity

`O(log10(N))` — proportional to the number of digits in `n`.

## Space Complexity

`O(1)` — constant space.

## Common Mistakes

- Hardcoding power to 3 (`digit ** 3`) for all numbers, which fails for 4-digit Armstrong numbers like `1634`.

## Follow-Up Questions

1. How many 3-digit Armstrong numbers exist in total? (Only 4 exist: 153, 370, 371, 407).

## Similar Questions

- Happy Number
- Perfect Number
