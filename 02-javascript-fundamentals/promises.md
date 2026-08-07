# S14 · Promises

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** JavaScript  

## Question

Objects representing eventual completion or failure of async operations.

## Expected Answer

A Promise is an object that handles asynchronous computations, resolving to a value or rejecting with an error.

## Deep Explanation

A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. It can be in one of three states:
1. Pending: Initial state, neither fulfilled nor rejected.
2. Fulfilled: The operation completed successfully.
3. Rejected: The operation failed with an error.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Promises.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Once a Promise settles, its state is immutable. You can attach multiple .then() handlers to the same promise, and they will all execute cleanly.

## Related Topics

- JavaScript Fundamentals
