# LB001 · Print Hello World

**Difficulty:** Easy  
**Experience Level:** Fresher (0–1 YOE)  
**Companies Asked:** TCS, Infosys, Wipro, Cognizant, Accenture, Deloitte  
**Interview Frequency:** ★★★★★  
**Category:** Logic Building  
**Subcategory:** Basic Logic  
**Concepts Tested:** I/O streams, standard output, string literals  

## Problem Statement

Write a function `printHelloWorld()` that returns the exact string `"Hello, World!"`.

## Constraints

- No external parameters required.
- String must match case and punctuation exactly (`"Hello, World!"`).

## Input

None (`()`).

## Output

Returns the string `"Hello, World!"`.

## Example 1

```text
Input: ()
Output: "Hello, World!"
```

## Example 2

```text
Input: ()
Output: "Hello, World!"
```

## Edge Cases

| Edge Case | Expected Behavior |
|---|---|
| Whitespace inclusion | Must contain exact space after comma: `"Hello, World!"` |
| Case sensitivity | Must use capital `"H"` and `"W"` |

## Dry Run

| Step | Action | Return Value |
|---|---|---|
| 1 | Construct string literal `"Hello, World!"` | `"Hello, World!"` |

## Logical Thinking Process

1. Identify the output specification: The requirement asks for the canonical `"Hello, World!"` string.
2. Character verification: Ensure uppercase `'H'`, lowercase `'ello'`, comma `,`, space `' '`, uppercase `'W'`, lowercase `'orld'`, and exclamation mark `'!'`.
3. Return mechanism: Return the string literal directly from the function.

## Brute Force Approach

Constructing the string dynamically using string concatenation or character code arrays (`String.fromCharCode(72, 101, ...)`). Unnecessarily complex ($O(n)$ character operations).

## Better Approach

Storing `"Hello, World!"` in a intermediate variable before returning. Good, but incurs extra line overhead.

## Optimal Approach

Directly returning the string literal `"Hello, World!"` in $O(1)$ time and $O(1)$ space.

## Step-by-Step Dry Run

| Step | Operation | Result |
|---|---|---|
| 1 | Execute `printHelloWorld()` | Function frame created |
| 2 | Evaluate return expression `"Hello, World!"` | Literal `"Hello, World!"` evaluated |
| 3 | Return to caller | `"Hello, World!"` received |

## Algorithm

1. Begin `printHelloWorld`.
2. Return string `"Hello, World!"`.
3. End function.

## JavaScript Solution

```js
function printHelloWorld() {
  return "Hello, World!";
}
```

## TypeScript Solution

```ts
function printHelloWorld(): string {
  return "Hello, World!";
}
```

## Time Complexity

O(1) — Direct string literal return in constant time.

## Space Complexity

O(1) — Uses constant auxiliary stack space.

## Common Mistakes

- Omitting the comma or exclamation mark (`"Hello World"`).
- Printing to `console.log()` instead of returning the string from the function.

## Optimization Notes

String literals are primitive immutable primitives in V8; returning them directly reuses internal atomized string pointers.

## Interview Follow-up Questions

1. How does string interning (string pooling) work in V8 engine memory for literal constants?
2. What is the difference between `console.log()` side-effect printing and returning a value from a function?

## Similar Problems

- `LB002` Print Multiple Lines
- `LB003` Input and Output

## Revision Notes

- Standard baseline problem establishing function signature and return value contracts.

---
[← Back to 65-dsa](../README.md)
