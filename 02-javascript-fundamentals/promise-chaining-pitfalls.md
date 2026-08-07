# S6031 · Promise Chaining Pitfalls

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Async & Promises  

## Question

Common mistakes that break the guarantees of a .then() chain.

## Expected Answer

Forgetting to `return` inside a .then() handler, or nesting .then() calls instead of flattening them, are the two most common ways developers accidentally break a promise chain.

## Deep Explanation

Each `.then()` returns a new Promise, so chains must explicitly `return` a value or Promise from each handler to pass it forward — forgetting to return silently produces `undefined` in the next `.then()`. A second common pitfall is nesting `.then()` calls instead of chaining, which reintroduces callback-pyramid complexity and breaks the linear error-propagation chain.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Promise Chaining Pitfalls.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Returning a Promise from inside a `.then()` automatically 'flattens' it — the outer chain waits for that inner Promise to settle before continuing — so nested async work should always be `return`ed, never fired-and-forgotten inside a handler.

## Related Topics

- JavaScript Fundamentals
