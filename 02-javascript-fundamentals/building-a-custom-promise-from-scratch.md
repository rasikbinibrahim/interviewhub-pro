# S6030 · Building a Custom Promise from Scratch

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Async & Promises  

## Question

Implementing the core Promise state machine (pending/fulfilled/rejected) manually.

## Expected Answer

A custom Promise tracks pending/fulfilled/rejected state, locks in a value on the first resolve/reject call, and always invokes .then() callbacks asynchronously via the microtask queue.

## Deep Explanation

A minimal Promise implementation is a state machine with three states (pending, fulfilled, rejected) that starts pending, can transition exactly once to fulfilled or rejected, stores an internal value/reason, and queues `.then()` callbacks to run asynchronously (via microtask, e.g. queueMicrotask) once settled — or immediately-but-still-async if already settled when `.then()` is called.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Building a Custom Promise from Scratch.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The trickiest correctness detail interviewers probe is that resolve/reject must be idempotent (only the first call has any effect) and that callbacks registered via `.then()` after the promise has already settled must still fire asynchronously, not synchronously — violating that breaks the guaranteed ordering the real spec provides.

## Related Topics

- JavaScript Fundamentals
