# S6033 · async/await Error Handling Patterns

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Async & Promises  

## Question

The idiomatic ways to catch rejected promises when using await.

## Expected Answer

await turns a Promise rejection into a thrown exception, catchable with try/catch, or teams use a [error, data] tuple helper to avoid try/catch nesting.

## Deep Explanation

A rejected awaited Promise throws inside the async function, so it can be caught with a normal `try/catch`. An alternative, popular in senior codebases, is a helper that wraps a Promise and returns a `[error, data]` tuple (similar to Go's error handling), avoiding nested try/catch blocks entirely for sequential async calls.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying async/await Error Handling Patterns.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. An uncaught rejection inside an async function that isn't awaited anywhere becomes an unhandled promise rejection — a common production bug is calling an async function without awaiting or `.catch()`-ing it ('fire and forget'), silently swallowing errors that should have surfaced.

## Related Topics

- JavaScript Fundamentals
