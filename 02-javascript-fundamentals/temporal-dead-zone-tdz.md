# S6002 · Temporal Dead Zone (TDZ)

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Execution & Memory Model  

## Question

The state between entering scope and the let/const declaration being initialized.

## Expected Answer

TDZ is the time window where a let/const variable is hoisted but not yet initialized, so referencing it throws instead of returning undefined.

## Deep Explanation

The TDZ is the period from the start of a block until a let/const declaration is evaluated. The binding exists (it was hoisted) but is uninitialized, so any access throws a ReferenceError instead of returning undefined like var would.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Temporal Dead Zone (TDZ).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. typeof on a TDZ variable also throws, unlike typeof on a truly undeclared variable — this trips up engineers who assume typeof is always a safe existence check.

## Related Topics

- JavaScript Fundamentals
