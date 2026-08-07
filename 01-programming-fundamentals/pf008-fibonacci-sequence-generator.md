# PF008 · Generate Fibonacci Sequence up to N Terms

**Difficulty:** Easy  
**Companies Asked:** TCS, Infosys, Wipro, Accenture, Amazon  
**Interview Frequency:** ★★★★★  
**Category:** Programming Fundamentals  
**Concepts:** fibonacci, loops, array-generation, recursion  

## Problem Statement

Write a function that accepts an integer `n` and returns an array containing the first `n` terms of the **Fibonacci Sequence**.

The **Fibonacci Sequence** is a series of numbers where each number is the sum of the two preceding ones, starting from `0` and `1`:
`F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)` for `n >= 2`.

## Input

- `n`: `number` — number of terms to generate

## Output

- `number[]` — array of the first `n` Fibonacci terms

## Constraints

- `0 <= n <= 50`

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 5` | `[0, 1, 1, 2, 3]` | First 5 Fibonacci numbers |
| `n = 1` | `[0]` | Single term |
| `n = 0` | `[]` | Zero terms |

## Edge Cases

- `n = 0` -> returns `[]`
- `n = 1` -> returns `[0]`
- `n = 2` -> returns `[0, 1]`

## Hints

1. Handle base edge cases for `n === 0` and `n === 1`.
2. Initialize array `result = [0, 1]`.
3. Loop `i` from `2` up to `n - 1`:
   - Compute `nextTerm = result[i - 1] + result[i - 2]`.
   - Push `nextTerm` into `result`.
4. Return `result`.

## Algorithm

**Pattern:** Iterative Dynamic Accumulation  
**Core Insight:** Constructing the sequence iteratively using previous two array values avoids the exponential $O(2^N)$ recursion call overhead.

## Dry Run

`n = 6`:
- Base check `n > 2` -> `result = [0, 1]`.
- `i = 2`: `0 + 1 = 1` -> `result = [0, 1, 1]`.
- `i = 3`: `1 + 1 = 2` -> `result = [0, 1, 1, 2]`.
- `i = 4`: `1 + 2 = 3` -> `result = [0, 1, 1, 2, 3]`.
- `i = 5`: `2 + 3 = 5` -> `result = [0, 1, 1, 2, 3, 5]`.
- Return `[0, 1, 1, 2, 3, 5]`.

## JavaScript Solution

```js
function generateFibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];

  const result = [0, 1];

  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }

  return result;
}
```

## TypeScript Solution

```ts
function generateFibonacci(n: number): number[] {
  if (n <= 0) return [];
  if (n === 1) return [0];

  const result: number[] = [0, 1];

  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }

  return result;
}
```

## Time Complexity

`O(N)` — single loop up to $N$.

## Space Complexity

`O(N)` — to store output array of size $N$.

## Common Mistakes

- Using naive un-memoized recursion `fib(n-1) + fib(n-2)` to build an array, taking $O(2^N)$ time.

## Follow-Up Questions

1. How would you find the $N$-th Fibonacci number in $O(\log N)$ time? (Use Matrix Exponentiation).

## Similar Questions

- N-th Tribonacci Number
- Climbing Stairs
