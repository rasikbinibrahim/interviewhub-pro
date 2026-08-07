# PF011 · Find GCD (Greatest Common Divisor) and LCM

**Difficulty:** Easy  
**Companies Asked:** Amazon, TCS, Infosys, Wipro, Microsoft  
**Interview Frequency:** ★★★★★  
**Category:** Programming Fundamentals  
**Concepts:** math, euclidean-algorithm, gcd, lcm, recursion  

## Problem Statement

Write a function `findGCDAndLCM(a, b)` that accepts two positive integers `a` and `b` and returns an object containing both their **Greatest Common Divisor (GCD)** and **Least Common Multiple (LCM)**:
`{ gcd: number, lcm: number }`

- **GCD**: The largest positive integer that divides both `a` and `b` without leaving a remainder.
- **LCM**: The smallest positive integer that is divisible by both `a` and `b`.

## Input

- `a`: `number` — positive integer
- `b`: `number` — positive integer

## Output

- `{ gcd: number, lcm: number }` — object containing calculated GCD and LCM integers

## Constraints

- `1 <= a, b <= 10^9`

## Examples

| Input | Output | Why |
|---|---|---|
| `a = 12, b = 18` | `{ gcd: 6, lcm: 36 }` | GCD(12,18) = 6, LCM(12,18) = (12*18)/6 = 36 |
| `a = 5, b = 7` | `{ gcd: 1, lcm: 35 }` | Co-prime numbers |
| `a = 10, b = 10` | `{ gcd: 10, lcm: 10 }` | Equal numbers |

## Edge Cases

- `a === b` -> `gcd = a`, `lcm = a`
- Prime numbers `a = 13, b = 17` -> `gcd = 1`, `lcm = 13 * 17`

## Hints

1. **Euclidean Algorithm for GCD**:
   - `gcd(a, b) = gcd(b, a % b)` until `b === 0`, at which point `a` is the GCD.
2. **LCM Formula**:
   - `lcm(a, b) = (a * b) / gcd(a, b)`.
   - Prevent potential integer overflow by computing `(a / gcd(a, b)) * b`.

## Algorithm

**Pattern:** Euclidean Division Modulo Algorithm  
**Core Insight:** Reducing $(a, b)$ to $(b, a \bmod b)$ guarantees logarithmically fast convergence to the GCD in $O(\log(\min(a, b)))$ steps.

## Dry Run

`a = 12, b = 18`:
- `gcd(12, 18)`:
  - Step 1: `b != 0` -> `gcd(18, 12 % 18)` = `gcd(18, 12)`.
  - Step 2: `b != 0` -> `gcd(12, 18 % 12)` = `gcd(12, 6)`.
  - Step 3: `b != 0` -> `gcd(6, 12 % 6)` = `gcd(6, 0)`.
  - Step 4: `b === 0` -> return `6`.
- `lcm = (12 / 6) * 18 = 2 * 18 = 36`.
- Return `{ gcd: 6, lcm: 36 }`.

## JavaScript Solution

```js
function findGCD(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function findGCDAndLCM(a, b) {
  const gcdVal = findGCD(a, b);
  const lcmVal = (a / gcdVal) * b;

  return { gcd: gcdVal, lcm: lcmVal };
}
```

## TypeScript Solution

```ts
interface GCDLCMResult {
  gcd: number;
  lcm: number;
}

function findGCD(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function findGCDAndLCM(a: number, b: number): GCDLCMResult {
  const gcdVal = findGCD(a, b);
  const lcmVal = (a / gcdVal) * b;

  return { gcd: gcdVal, lcm: lcmVal };
}
```

## Time Complexity

`O(log(min(A, B)))` — logarithmic reduction via Euclidean algorithm.

## Space Complexity

`O(1)` — iterative constant space.

## Common Mistakes

- Computing `(a * b) / gcd` directly on massive integers, exceeding JavaScript safe integer limit `Number.MAX_SAFE_INTEGER` (`2^53 - 1`).

## Follow-Up Questions

1. How would you calculate GCD for an array of $N$ integers `[12, 18, 24, 30]`? (Fold array using `gcd(acc, val)`).

## Similar Questions

- Greatest Common Divisor of Strings
- Water and Jug Problem
