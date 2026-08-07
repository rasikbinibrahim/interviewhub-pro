# S6083 · Type Coercion Rules in JavaScript

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Type Coercion  

## Question

How JS implicitly converts values between types in operators and comparisons.

## Expected Answer

JS coerces operand types based on the operator: + prefers string concatenation if either side is a string, while -, *, / always coerce toward numbers, with objects first converted via valueOf/toString.

## Deep Explanation

JavaScript implicitly converts operand types to make an operation valid — the `+` operator prefers string concatenation if either operand is a string (or converts via `toPrimitive` with a 'default' hint), while `-`, `*`, `/` always coerce both operands toward numbers. Objects are converted to primitives via `valueOf()`/`toString()` before these rules apply.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Type Coercion Rules in JavaScript.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The interview-classic `[] + []` (empty string) vs `[] + {}` ('[object Object]') both stem from the same rule: both operands are converted to primitives (arrays via join to '', plain objects via default toString to '[object Object]'), then concatenated as strings since `+` saw at least one string-like operand.

## Related Topics

- JavaScript Fundamentals
