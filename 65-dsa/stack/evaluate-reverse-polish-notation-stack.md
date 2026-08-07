# Q6574 · Evaluate Reverse Polish Notation (Postfix Stack Computation)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Stack  
**Concepts:** stack, reverse-polish-notation, expression-evaluation, math  

## Problem Statement

You are given an array of strings `tokens` that represents an arithmetic expression in a **Reverse Polish Notation** (Postfix Notation).

Evaluate the expression. Return an integer that represents the value of the expression.

Note that:
- The valid operators are `'+'`, `'-'`, `'*'`, and `'/'`.
- Each operand may be an integer or another expression.
- The division between two integers always **truncates toward zero**.
- There will not be any division by zero.
- The input represents a valid arithmetic expression in Reverse Polish Notation.
- The answer and all intermediate calculations fit in a **32-bit integer**.

## Input

- `tokens`: `string[]` — array of operands and operators in RPN order

## Output

- `number` — 32-bit integer evaluation result

## Constraints

- `1 <= tokens.length <= 10^4`
- `tokens[i]` is either an operator `"+"`, `"-"`, `"*"` or `"/"`, or an integer in the range `[-200, 200]`.

## Examples

| Input | Output | Why |
|---|---|---|
| `tokens = ["2","1","+","3","*"]` | `9` | `((2 + 1) * 3) = 9` |
| `tokens = ["4","13","5","/","+"]` | `6` | `(4 + (13 / 5)) = 4 + 2 = 6` |
| `tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]` | `22` | Postfix evaluation yields 22 |

## Edge Cases

- Negative numbers truncation `"6" / "-132"` -> `Math.trunc(6 / -132) = 0`

## Hints

1. **Stack for Operands**:
   - Iterate through `tokens`.
   - If token is a number: parse to integer and push onto Stack.
   - If token is an operator (`+`, `-`, `*`, `/`):
     - Pop `b = stack.pop()` (right operand).
     - Pop `a = stack.pop()` (left operand).
     - Perform calculation `a op b`.
     - Push result back onto Stack.
2. Truncation toward zero: Use `Math.trunc(a / b)` in JS/TS.

## Algorithm

**Pattern:** Stack Postfix Expression Operand Processing  
**Core Insight:** RPN guarantees that operators apply to the two most recently encountered operands on the Stack, eliminating operator precedence parentheses checks.

## Dry Run

`tokens = ["4", "13", "5", "/", "+"]`:
- Push 4: `stack = [4]`.
- Push 13: `stack = [4, 13]`.
- Push 5: `stack = [4, 13, 5]`.
- Token `/`: `b = 5, a = 13`. `Math.trunc(13 / 5) = 2`. `stack = [4, 2]`.
- Token `+`: `b = 2, a = 4`. `4 + 2 = 6`. `stack = [6]`.
- Return `6`.

## JavaScript Solution

```js
function evalRPN(tokens) {
  const stack = [];

  for (const token of tokens) {
    if (token === '+') {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(a + b);
    } else if (token === '-') {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(a - b);
    } else if (token === '*') {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(a * b);
    } else if (token === '/') {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(Math.trunc(a / b));
    } else {
      stack.push(parseInt(token, 10));
    }
  }

  return stack[0];
}
```

## TypeScript Solution

```ts
function evalRPN(tokens: string[]): number {
  const stack: number[] = [];

  for (const token of tokens) {
    if (token === '+') {
      const b = stack.pop()!;
      const a = stack.pop()!;
      stack.push(a + b);
    } else if (token === '-') {
      const b = stack.pop()!;
      const a = stack.pop()!;
      stack.push(a - b);
    } else if (token === '*') {
      const b = stack.pop()!;
      const a = stack.pop()!;
      stack.push(a * b);
    } else if (token === '/') {
      const b = stack.pop()!;
      const a = stack.pop()!;
      stack.push(Math.trunc(a / b));
    } else {
      stack.push(parseInt(token, 10));
    }
  }

  return stack[0];
}
```

## Time Complexity

`O(N)` — single linear pass over tokens array.

## Space Complexity

`O(N)` — stack storing operands.

## Common Mistakes

- Using `Math.floor(a / b)` instead of `Math.trunc(a / b)` for negative division (`Math.floor(-6 / 132) = -1`, whereas `Math.trunc(-6 / 132) = 0`).

## Follow-Up Questions

1. How would you convert standard Infix notation `"(2 + 1) * 3"` into Postfix Reverse Polish Notation using the Shunting Yard Algorithm?

## Similar Questions

- Basic Calculator II
- Min Stack Design
