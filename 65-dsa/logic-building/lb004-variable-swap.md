# LB004 · Variable Swap

**Difficulty:** Easy  
**Experience Level:** Fresher (0–1 YOE)  
**Companies Asked:** TCS, Infosys, Wipro, Cognizant, Accenture, Amazon  
**Interview Frequency:** ★★★★★  
**Category:** Logic Building  
**Subcategory:** Basic Logic  
**Concepts Tested:** temporary variables, arithmetic swap, bitwise XOR swap, ES6 array destructuring  

## Problem Statement

Write a function `swapVariables(a, b)` that takes two values `a` and `b` and returns a tuple/array `[b, a]` containing the swapped values. Demonstrate both temporary variable and arithmetic/destructuring techniques.

## Constraints

- `a` and `b` can be numbers, strings, or booleans.
- `-10^9 <= a, b <= 10^9` (when numbers).

## Input

- `a`: first value
- `b`: second value

## Output

Returns a 2-element array `[b, a]`.

## Example 1

```text
Input: a = 5, b = 10
Output: [10, 5]
```

## Example 2

```text
Input: a = "hello", b = "world"
Output: ["world", "hello"]
```

## Edge Cases

| Edge Case | Expected Output |
|---|---|
| Same values (`a = 5, b = 5`) | `[5, 5]` |
| Zero and negative numbers (`a = 0, b = -5`) | `[-5, 0]` |
| Mixed types (`a = 10, b = "text"`) | `["text", 10]` |

## Dry Run

| Step | `a` | `b` | `temp` | Returned Pair |
|---|---|---|---|---|
| Initial | 5 | 10 | uninitialized | |
| `temp = a` | 5 | 10 | 5 | |
| `a = b` | 10 | 10 | 5 | |
| `b = temp` | 10 | 5 | 5 | `[10, 5]` |

## Logical Thinking Process

1. **Goal:** Swap values of `a` and `b` so `a` becomes `b` and `b` becomes `a`.
2. **Challenge:** Assigning `a = b` overwrites the original value of `a`, making `b = a` result in `b = b`.
3. **Solutions:**
   - **Temp Variable:** Store original `a` in `temp`, set `a = b`, set `b = temp`.
   - **ES6 Destructuring:** `[a, b] = [b, a]`.
   - **XOR Bitwise Swap (Numbers only):** `a = a ^ b; b = a ^ b; a = a ^ b;`.

## Brute Force Approach

Creating a new array literal `[b, a]` directly. Clean and idiomatic in JavaScript ($O(1)$ time, $O(1)$ space).

## Better Approach

Using a temporary variable `let temp = a; a = b; b = temp; return [a, b];`. Explicitly demonstrates pointer / memory buffer retention.

## Optimal Approach

ES6 Array Destructuring `[a, b] = [b, a]` or XOR Bitwise Swap for numbers without extra memory allocations.

## Step-by-Step Dry Run

**Input:** `a = 5, b = 10`

| Step | Operation | State of `a` | State of `b` | State of `temp` |
|---|---|---|---|---|
| 1 | `let temp = a` | 5 | 10 | 5 |
| 2 | `a = b` | 10 | 10 | 5 |
| 3 | `b = temp` | 10 | 5 | 5 |
| 4 | Return `[a, b]` | 10 | 5 | 5 |

**Final Output:** `[10, 5]`

## Algorithm

1. Accept parameters `a` and `b`.
2. Assign `[a, b] = [b, a]` using ES6 destructuring assignment.
3. Return `[a, b]`.

## JavaScript Solution

```js
function swapVariables(a, b) {
  [a, b] = [b, a];
  return [a, b];
}
```

## TypeScript Solution

```ts
function swapVariables<T, U>(a: T, b: U): [U, T] {
  return [b, a];
}
```

## Time Complexity

O(1) — Direct value assignment in constant time.

## Space Complexity

O(1) — Constant auxiliary memory.

## Common Mistakes

- Doing `a = b; b = a;` without a temporary variable or destructuring (results in both variables holding `b`).
- Using arithmetic swap (`a = a + b; b = a - b; a = a - b;`) on floating point numbers or large integers causing overflow or precision loss.

## Optimization Notes

ES6 destructuring `[a, b] = [b, a]` is optimized by V8 into register swaps at JIT compilation time without heap allocations.

## Interview Follow-up Questions

1. How do you swap two integers without using ANY temporary variable or extra memory space? (Bitwise XOR or Arithmetic addition/subtraction).
2. What are the dangers of arithmetic swap (`a = a + b`) with integer overflow in typed languages like C++/Java?

## Similar Problems

- `LB005` Largest of Two Numbers
- `LB051` Reverse Number

## Revision Notes

- ES6 destructuring `[a, b] = [b, a]` is the modern gold standard for variable swapping in JS/TS.

---
[← Back to 65-dsa](../README.md)
