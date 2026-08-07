# S6101 · Nullish Coalescing Operator (??)

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Modern Syntax  

## Question

Providing a default value only for null/undefined, not for other falsy values.

## Expected Answer

?? falls back to its right side only when the left side is null or undefined, unlike || which falls back for any falsy value — fixing bugs where 0, '', or false get wrongly overridden.

## Deep Explanation

`a ?? b` evaluates to `b` only when `a` is strictly `null` or `undefined` — unlike `||`, it does not treat other falsy values (`0`, `''`, `false`, `NaN`) as reasons to fall back to the default. This fixes the classic `||`-based default-value bug where a legitimately falsy value gets incorrectly overridden.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Nullish Coalescing Operator (??).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The go-to interview example is a quantity or count field: `const qty = input.quantity || 10` incorrectly resets a legitimate `quantity: 0` to `10`, while `input.quantity ?? 10` correctly preserves the explicit zero — a subtle but real production bug class that `??` was specifically introduced to eliminate.

## Related Topics

- JavaScript Fundamentals
