# PF013 · Binary to Decimal and Decimal to Binary Conversion

**Difficulty:** Easy  
**Companies Asked:** Amazon, Microsoft, Google, TCS, Infosys  
**Interview Frequency:** ★★★★★  
**Category:** Programming Fundamentals  
**Concepts:** binary, decimal, bitwise, math, number-systems  

## Problem Statement

Write functions to convert a non-negative integer from **Binary (Base-2) string** representation to a **Decimal (Base-10) integer**, and from a **Decimal integer** to a **Binary string** without relying on built-in base conversion helper methods (`parseInt(s, 2)` or `num.toString(2)`).

## Input

- `binaryStr`: `string` — binary string containing only `'0'` and `'1'`
- `decimalNum`: `number` — non-negative integer

## Output

- `binaryToDecimal(binaryStr)`: `number`
- `decimalToBinary(decimalNum)`: `string`

## Constraints

- `0 <= decimalNum <= 2^31 - 1`
- `1 <= binaryStr.length <= 31`

## Examples

| Function Call | Output | Explanation |
|---|---|---|
| `binaryToDecimal("1101")` | `13` | $1 \times 2^3 + 1 \times 2^2 + 0 \times 2^1 + 1 \times 2^0 = 8 + 4 + 0 + 1 = 13$ |
| `decimalToBinary(13)` | `"1101"` | $13 \div 2 = 6$ rem 1, $6 \div 2 = 3$ rem 0, $3 \div 2 = 1$ rem 1, $1 \div 2 = 0$ rem 1 |

## Edge Cases

- `decimalNum = 0` -> returns `"0"`
- `binaryStr = "0"` -> returns `0`

## Hints

1. **Binary to Decimal**:
   - Iterate left-to-right through binary string.
   - Maintain `result = 0`. Multiply `result = result * 2 + bit`.
2. **Decimal to Binary**:
   - Loop while `n > 0`: prepend `(n % 2)` remainder to binary result string, set `n = Math.floor(n / 2)`.

## Algorithm

**Pattern:** Base-Radix Accumulation & Successive Division  
**Core Insight:** Multiplying accumulated total by 2 for each binary bit converts positional base-2 strings into decimal values in $O(N)$ time.

## Dry Run

`binaryToDecimal("1101")`:
- bit '1': `0 * 2 + 1 = 1`.
- bit '1': `1 * 2 + 1 = 3`.
- bit '0': `3 * 2 + 0 = 6`.
- bit '1': `6 * 2 + 1 = 13`. Return `13`.

## JavaScript Solution

```js
function binaryToDecimal(binaryStr) {
  let decimal = 0;
  for (let i = 0; i < binaryStr.length; i++) {
    const bit = binaryStr[i] === '1' ? 1 : 0;
    decimal = decimal * 2 + bit;
  }
  return decimal;
}

function decimalToBinary(decimalNum) {
  if (decimalNum === 0) return '0';

  let n = decimalNum;
  let binary = '';

  while (n > 0) {
    const remainder = n % 2;
    binary = remainder + binary;
    n = Math.floor(n / 2);
  }

  return binary;
}
```

## TypeScript Solution

```ts
function binaryToDecimal(binaryStr: string): number {
  let decimal = 0;
  for (let i = 0; i < binaryStr.length; i++) {
    const bit = binaryStr[i] === '1' ? 1 : 0;
    decimal = decimal * 2 + bit;
  }
  return decimal;
}

function decimalToBinary(decimalNum: number): string {
  if (decimalNum === 0) return '0';

  let n = decimalNum;
  let binary = '';

  while (n > 0) {
    const remainder = n % 2;
    binary = remainder + binary;
    n = Math.floor(n / 2);
  }

  return binary;
}
```

## Time Complexity

`O(N)` — where $N$ is total bit length.

## Space Complexity

`O(1)` — auxiliary memory.

## Common Mistakes

- Forgetting base case `decimalNum === 0`, causing empty string returns.

## Follow-Up Questions

1. How do Bitwise Operators (`n & 1`, `n >>= 1`) speed up decimal to binary conversion?

## Similar Questions

- Reverse Bits
- Single Number
