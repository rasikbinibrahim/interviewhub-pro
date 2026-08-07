# PF009 · Reverse an Integer Number

**Difficulty:** Easy  
**Companies Asked:** Amazon, TCS, Infosys, Wipro, Microsoft  
**Interview Frequency:** ★★★★★  
**Category:** Programming Fundamentals  
**Concepts:** math, modulo, integer-overflow, digit-extraction  

## Problem Statement

Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-2^31, 2^31 - 1]`, then return `0`.

Assume the environment does not allow storing 64-bit integers.

## Input

- `x`: `number` — signed 32-bit integer

## Output

- `number` — reversed integer (or `0` if overflow occurs)

## Constraints

- `-2^31 <= x <= 2^31 - 1`

## Examples

| Input | Output | Why |
|---|---|---|
| `x = 123` | `321` | Reversed digits |
| `x = -123` | `-321` | Preserves negative sign |
| `x = 120` | `21` | Trailing zero dropped |

## Edge Cases

- Negative numbers (`-123`) -> preserves negative sign
- Number ending in zeroes (`1200`) -> outputs `21`
- 32-bit Integer Overflow (`1534236469`) -> returns `0`

## Hints

1. Extract digits using modulo 10: `digit = Math.trunc(num % 10)`.
2. Build reversed integer: `reversed = reversed * 10 + digit`.
3. Truncate integer division: `num = Math.trunc(num / 10)`.
4. Range check: Ensure `reversed` stays within `[-2147483648, 2147483647]`.

## Algorithm

**Pattern:** Modulo Digit Accumulation  
**Core Insight:** Repeatedly extracting the last digit via `% 10` and shifting accumulated results via `* 10` reverses integers in $O(\log_{10} N)$ time.

## Dry Run

`x = -123`:
- `isNegative = true`, `num = 123`, `reversed = 0`.
- Loop 1: `digit = 123 % 10 = 3`. `reversed = 0 * 10 + 3 = 3`. `num = 12`.
- Loop 2: `digit = 12 % 10 = 2`. `reversed = 3 * 10 + 2 = 32`. `num = 1`.
- Loop 3: `digit = 1 % 10 = 1`. `reversed = 32 * 10 + 1 = 321`. `num = 0`.
- Apply negative sign -> `-321`. Range check valid -> return `-321`.

## JavaScript Solution

```js
function reverseNumber(x) {
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;

  let isNegative = x < 0;
  let num = Math.abs(x);
  let reversed = 0;

  while (num > 0) {
    const digit = num % 10;
    reversed = reversed * 10 + digit;
    num = Math.floor(num / 10);
  }

  if (isNegative) {
    reversed = -reversed;
  }

  if (reversed < INT_MIN || reversed > INT_MAX) {
    return 0;
  }

  return reversed;
}
```

## TypeScript Solution

```ts
function reverseNumber(x: number): number {
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;

  let isNegative = x < 0;
  let num = Math.abs(x);
  let reversed = 0;

  while (num > 0) {
    const digit = num % 10;
    reversed = reversed * 10 + digit;
    num = Math.floor(num / 10);
  }

  if (isNegative) {
    reversed = -reversed;
  }

  if (reversed < INT_MIN || reversed > INT_MAX) {
    return 0;
  }

  return reversed;
}
```

## Time Complexity

`O(log10(N))` — number of digits in `x` is $\lfloor \log_{10} N \rfloor + 1$.

## Space Complexity

`O(1)` — constant space.

## Common Mistakes

- Converting number to string `x.toString().split('').reverse()`, which fails to check 32-bit signed integer overflow requirements cleanly.

## Follow-Up Questions

1. How would you check if an integer is a Palindrome Number without converting it to a string? (Reverse half the number and compare).

## Similar Questions

- Palindrome Number
- String to Integer (atoi)
