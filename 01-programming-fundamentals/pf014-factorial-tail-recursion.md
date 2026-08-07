# PF014 · Factorial of a Number (Iterative vs Tail-Recursive)

**Difficulty:** Easy  
**Companies Asked:** Amazon, Microsoft, Google, TCS, Infosys  
**Interview Frequency:** ★★★★★  
**Category:** Programming Fundamentals  
**Concepts:** factorial, recursion, tail-call-optimization, math, loop  

## Problem Statement

Write functions to compute the **factorial** of a non-negative integer `n` ($n!$), both iteratively and using **Tail Call Optimization (TCO)** recursion.

The factorial of a non-negative integer `n` is the product of all positive integers less than or equal to `n`. By definition, $0! = 1$.

## Input

- `n`: `number` — non-negative integer

## Output

- `number` — factorial value $n!$

## Constraints

- `0 <= n <= 18` (fits within standard JavaScript IEEE 754 Safe Integer limit `Number.MAX_SAFE_INTEGER`)

## Examples

| Input | Output | Explanation |
|---|---|---|
| `n = 5` | `120` | $5 \times 4 \times 3 \times 2 \times 1 = 120$ |
| `n = 0` | `1` | $0! = 1$ by definition |

## Edge Cases

- `n = 0` or `n = 1` -> returns `1`

## Hints

1. **Iterative Approach**:
   - Loop `i` from `2` to `n`. Accumulate product `result *= i`.
2. **Tail-Recursive Approach**:
   - Pass accumulator parameter `acc` initialized to `1`.
   - Base case: if `n <= 1`, return `acc`.
   - Recursive step: return `factorialTail(n - 1, n * acc)` (Direct tail position!).

## Algorithm

**Pattern:** Accumulator Tail-Recursive State Passing  
**Core Insight:** Passing accumulated sub-results into the tail recursion arguments eliminates caller frame state retention, enabling $O(1)$ stack frame reuse.

## Dry Run

`n = 5`:
- `factorialTail(5, 1)` -> `factorialTail(4, 5)` -> `factorialTail(3, 20)` -> `factorialTail(2, 60)` -> `factorialTail(1, 120)` -> returns `120`.

## JavaScript Solution

```js
// 1. Iterative Approach (O(1) Space)
function factorialIterative(n) {
  if (n < 0) return -1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// 2. Tail-Recursive Approach (TCO Safe)
function factorialTail(n, acc = 1) {
  if (n < 0) return -1;
  if (n <= 1) return acc;
  return factorialTail(n - 1, n * acc); // Tail call!
}
```

## TypeScript Solution

```ts
function factorialIterative(n: number): number {
  if (n < 0) return -1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function factorialTail(n: number, acc: number = 1): number {
  if (n < 0) return -1;
  if (n <= 1) return acc;
  return factorialTail(n - 1, n * acc);
}
```

## Time Complexity

`O(N)` — $N$ multiplication iterations.

## Space Complexity

`O(1)` — constant auxiliary space for both iterative and tail-recursive versions.

## Common Mistakes

- Standard non-tail recursion `return n * factorial(n - 1)`, which keeps caller frames alive on stack to perform multiplication after return.

## Follow-Up Questions

1. How do BigInt types (`100n`) prevent integer overflow when calculating $n!$ for $n > 18$?

## Similar Questions

- Generate Fibonacci Sequence up to N Terms
- Reverse an Integer Number
