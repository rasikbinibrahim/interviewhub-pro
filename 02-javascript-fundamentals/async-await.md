# S15 · async/await

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** JavaScript  

## Question

Syntactic sugar over Promises for cleaner async code.

## Expected Answer

async/await is a modern syntax to write cleaner, synchronous-looking asynchronous code based on Promises.

## Deep Explanation

async/await is syntactic sugar built on top of Promises. An async function automatically returns a Promise, and the await keyword pauses the execution of the async function until the awaited Promise settles (resolves or rejects), making async code read like synchronous code.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying async/await.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. await pauses the execution of the async function, yielding control back to the event loop pool. It does not block the entire main browser thread.

## Related Topics

- JavaScript Fundamentals
