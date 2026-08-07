# Q6637 · Evaluate Reverse Polish Notation (Postfix Stack Evaluation)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Stack
**Concepts:** stack, postfix, math

## Problem Statement

Write a function `evalRPN(tokens)` that evaluates an arithmetic
expression given in Reverse Polish Notation (postfix notation, where
operators follow their operands) and returns the result.

## Input

`tokens`: an array of strings, each either an integer or one of the
operators `+`, `-`, `*`, `/`.

## Output

A single number: the result of evaluating the expression.

## Constraints

`1 <= tokens.length <= 10^4`, division always truncates toward zero, the
expression is always a valid RPN expression

## Examples

| Input | Output | Why |
|---|---|---|
| `["2","1","+","3","*"]` | `9` | `(2 + 1) * 3 = 9` |
| `["4","13","5","/","+"]` | `6` | `4 + (13 / 5) = 4 + 2 = 6` (integer division truncates) |
| `["18"]` | `18` | A single token with no operators is just that value |

## Edge Cases

- Single-token expression (just a number, no operators) → that number
  itself
- Negative operands (e.g. `"-4"`) → parsed correctly as negative
  numbers, not mistaken for an operator
- Division truncates toward zero, not floored — matters specifically for
  negative results (e.g. `-7 / 2` truncates to `-3`, not `-4`)
- Operand order matters for non-commutative operators (`-`, `/`) — the
  second-popped value is always the left-hand operand, the first-popped
  is the right-hand operand

## Hints

1. Postfix notation is specifically designed to be evaluated with a
   stack, without ever needing operator precedence rules or
   parentheses — what should happen when you encounter a number versus
   when you encounter an operator?
2. Push every number token onto a stack. When you hit an operator, pop
   the two most recently pushed values, apply the operator, and push the
   result back — that result then becomes available as an operand for
   later operators.
3. Be careful about operand order for `-` and `/`: the value popped
   *second* is the left-hand side of the operation, and the value popped
   *first* is the right-hand side, since the stack is LIFO.

## Algorithm

**Pattern:** single-pass stack evaluation.
**Core insight:** in postfix notation, by the time an operator is
encountered, both of its operands have already appeared and been pushed
onto the stack — so evaluating left-to-right with a stack naturally
produces correct results without ever needing to know operator
precedence or parse parentheses, unlike infix expressions. Each operator
application pops its two operands, computes a single combined result,
and pushes that result back, which then acts as an operand for any
operator that follows.
**Invariant:** at any point during the scan, the stack holds exactly the
sequence of intermediate values that would remain if every token
processed so far were fully evaluated left to right according to
postfix rules.

## Dry Run

**Input:** `tokens = ["4","13","5","/","+"]`

| token | action | stack after |
|---|---|---|
| `"4"` | push `4` | `[4]` |
| `"13"` | push `13` | `[4, 13]` |
| `"5"` | push `5` | `[4, 13, 5]` |
| `"/"` | pop `5` (b), pop `13` (a); push `trunc(13/5) = 2` | `[4, 2]` |
| `"+"` | pop `2` (b), pop `4` (a); push `4 + 2 = 6` | `[6]` |

**Result:** `stack[0] = 6` — matches expected output.

## JavaScript Solution

```js
function evalRPN(tokens) {
  const stack = [];
  const ops = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b)
  };

  for (const token of tokens) {
    if (token in ops) {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(ops[token](a, b));
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
  const ops: Record<string, (a: number, b: number) => number> = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b),
  };

  for (const token of tokens) {
    if (token in ops) {
      const b = stack.pop()!;
      const a = stack.pop()!;
      stack.push(ops[token](a, b));
    } else {
      stack.push(parseInt(token, 10));
    }
  }

  return stack[0];
}
```

## Time Complexity

O(n) — each token is processed exactly once, with O(1) work per token.

## Space Complexity

O(n) — in the worst case (all numbers, no operators until the very end),
the stack holds nearly every token.

## Common Mistakes

- Popping operands in the wrong order for non-commutative operators —
  since the stack is LIFO, the operand popped *second* is the left-hand
  side; swapping this silently produces wrong results for `-` and `/`
  (though `+` and `*` are unaffected, since they're commutative).
- Using `Math.floor` instead of `Math.trunc` for division — these differ
  for negative results (`Math.floor(-7/2) = -4`, `Math.trunc(-7/2) =
  -3`), and RPN evaluation conventionally truncates toward zero.
- Checking `token in ops` without accounting for negative number tokens
  that could be mistaken for the `-` operator — this specific solution
  is safe because operator tokens are always exactly one of `+ - * /`
  with nothing else, while negative numbers are multi-character strings
  like `"-4"`, so the `in ops` check correctly distinguishes them; it's
  still a subtlety worth being able to explain.

## Interview Follow-up Questions

1. How would you evaluate a standard *infix* expression (with operator
   precedence and parentheses) instead of postfix?
2. How would you convert an infix expression into postfix notation
   (the Shunting Yard algorithm)?
3. How would you handle malformed input gracefully, such as an
   expression with too many or too few operands for its operators?

## Similar Questions

- Valid Parentheses Expression Stack Matcher (see [../../01-programming-fundamentals/pf040-valid-parentheses-stack-check.md](../../01-programming-fundamentals/pf040-valid-parentheses-stack-check.md))
- Remove K Digits (Monotonic Stack) (see [remove-k-digits-monotonic-stack.md](remove-k-digits-monotonic-stack.md))
