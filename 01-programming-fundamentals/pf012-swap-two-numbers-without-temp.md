# PF012 · Swap Two Numbers Without Temporary Variable

**Difficulty:** Easy  
**Companies Asked:** TCS, Infosys, Wipro, Accenture, Cognizant  
**Interview Frequency:** ★★★★☆  
**Category:** Programming Fundamentals  
**Concepts:** math, bitwise, swap, Destructuring  

## Problem Statement

Write a function that accepts two numbers `a` and `b` and returns an array `[a, b]` containing their swapped values **without using a third temporary variable**.

Explore both Arithmetic Addition/Subtraction and Bitwise XOR approaches.

## Input

- `a`: `number` — first number
- `b`: `number` — second number

## Output

- `number[]` — tuple `[a, b]` with swapped values

## Constraints

- `-10^9 <= a, b <= 10^9`

## Examples

| Input | Output | Why |
|---|---|---|
| `a = 5, b = 10` | `[10, 5]` | Values swapped |
| `a = -3, b = 7` | `[7, -3]` | Handles negative integers |
| `a = 0, b = 0` | `[0, 0]` | Equal numbers |

## Edge Cases

- `a === b` -> returns `[a, b]`
- Zero or negative values (`a = -5, b = 10`)

## Hints

1. **Arithmetic Addition & Subtraction**:
   - `a = a + b`
   - `b = a - b` (Now `b` holds original `a`)
   - `a = a - b` (Now `a` holds original `b`)
2. **Bitwise XOR (`^`)**:
   - `a = a ^ b`
   - `b = a ^ b` (Now `b` holds original `a`)
   - `a = a ^ b` (Now `a` holds original `b`)
3. **Modern ES6 Destructuring Assignment**:
   - `[a, b] = [b, a]`

## Algorithm

**Pattern:** In-Place Algebraic Mutation / Bitwise Cancelation  
**Core Insight:** XORing any value with itself results in 0 ($X \oplus X = 0$), allowing value exchange without auxiliary memory allocation.

## Dry Run

`a = 5, b = 10` (Bitwise XOR):
- Binary: `a = 0101 (5)`, `b = 1010 (10)`.
- Step 1: `a = 0101 ^ 1010 = 1111 (15)`.
- Step 2: `b = 1111 ^ 1010 = 0101 (5)`. (b is now 5!)
- Step 3: `a = 1111 ^ 0101 = 1010 (10)`. (a is now 10!)
- Return `[10, 5]`.

## JavaScript Solution

```js
// Approach 1: Bitwise XOR
function swapXOR(a, b) {
  a = a ^ b;
  b = a ^ b;
  a = a ^ b;
  return [a, b];
}

// Approach 2: Arithmetic Addition & Subtraction
function swapArithmetic(a, b) {
  a = a + b;
  b = a - b;
  a = a - b;
  return [a, b];
}

// Approach 3: Modern ES6 Destructuring
function swapDestructuring(a, b) {
  [a, b] = [b, a];
  return [a, b];
}
```

## TypeScript Solution

```ts
function swapXOR(a: number, b: number): [number, number] {
  a = a ^ b;
  b = a ^ b;
  a = a ^ b;
  return [a, b];
}

function swapArithmetic(a: number, b: number): [number, number] {
  a = a + b;
  b = a - b;
  a = a - b;
  return [a, b];
}

function swapDestructuring(a: number, b: number): [number, number] {
  [a, b] = [b, a];
  return [a, b];
}
```

## Time Complexity

`O(1)` — constant time bitwise / arithmetic operations.

## Space Complexity

`O(1)` — constant auxiliary space.

## Common Mistakes

- Arithmetic addition `a = a + b` on massive 64-bit float bounds causing precision loss or integer overflow.

## Follow-Up Questions

1. Why does Bitwise XOR swap fail if both references point to the exact same memory pointer in C/C++ arrays (`swap(&arr[i], &arr[i])`)? (Sets array element to 0).

## Similar Questions

- Single Number (XOR)
- Reverse Bits
