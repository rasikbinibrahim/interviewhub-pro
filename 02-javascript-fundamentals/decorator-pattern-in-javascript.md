# S6064 · Decorator Pattern in JavaScript

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Design Patterns  

## Question

Wrapping a function or object to add behavior without modifying its original source.

## Expected Answer

The Decorator pattern wraps a function or object with additional behavior while delegating to the original, without modifying its source code.

## Deep Explanation

The Decorator pattern wraps an existing function/object with another function/object that adds new behavior (logging, caching, validation, timing) before or after delegating to the original — without altering the original's source code. In JavaScript, higher-order functions naturally implement this: `withLogging(fn)` returns a new function that logs, then calls `fn`.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Decorator Pattern in JavaScript.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This is exactly how middleware in Express or Redux works — each middleware decorates the request/dispatch pipeline with extra behavior (auth, logging) and calls `next()`/the original dispatch, composing many decorators around one core function without ever touching its implementation.

## Related Topics

- JavaScript Fundamentals
