# S6027 · Top-level await

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Modules  

## Question

Using await directly in a module body without wrapping it in an async function.

## Expected Answer

Top-level await lets a module await a Promise directly in its body, and any module importing it will wait for that Promise to resolve before proceeding.

## Deep Explanation

In ES modules (not scripts, and not CommonJS), `await` can be used directly at the top level of the module body. The importing modules will wait for that top-level Promise to settle before their own execution continues, effectively making module evaluation itself asynchronous.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Top-level await.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This can create real load-order hazards in large dependency graphs — if module A does a slow top-level await, every module that transitively imports A is blocked until it resolves, so it should be reserved for essential startup dependencies (e.g. fetching a remote config) rather than convenience.

## Related Topics

- JavaScript Fundamentals
