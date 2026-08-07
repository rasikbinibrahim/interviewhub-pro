# S6081 · Object.is() vs ===

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Object Internals  

## Question

The subtle edge cases where strict equality and Object.is disagree.

## Expected Answer

Object.is() matches === for all values except NaN (Object.is(NaN, NaN) is true) and signed zero (Object.is(0, -0) is false), where it's more mathematically precise.

## Deep Explanation

`Object.is()` behaves like `===` for almost all values, but differs in two specific edge cases: `Object.is(NaN, NaN)` returns `true` (whereas `NaN === NaN` is famously `false`), and `Object.is(0, -0)` returns `false` (whereas `0 === -0` is `true`). This makes Object.is useful anywhere you need mathematically precise identity rather than IEEE-754 equality semantics.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Object.is() vs ===.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. React's internal `Object.is`-based comparison (used in `useState`'s bailout check and dependency array comparisons) is exactly why setting state to `NaN` twice in a row *does* correctly bail out of a re-render, whereas a naive `===` check would treat every `NaN` update as a change.

## Related Topics

- JavaScript Fundamentals
