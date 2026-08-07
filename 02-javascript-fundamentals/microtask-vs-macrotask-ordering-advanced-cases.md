# S6032 · Microtask vs Macrotask Ordering (Advanced Cases)

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Async & Promises  

## Question

Predicting console output order across nested promises, setTimeout, and synchronous code.

## Expected Answer

Sync code runs first, then the entire microtask queue is drained (even microtasks scheduled by other microtasks), and only then does the next macrotask (like a setTimeout callback) run.

## Deep Explanation

After each single macrotask (a script run, a timer callback, an I/O callback) finishes, the engine fully drains the entire microtask queue — including any new microtasks scheduled by earlier microtasks — before rendering or moving to the next macrotask. Synchronous code always runs first, then all queued microtasks (Promise callbacks, queueMicrotask) in FIFO order, then the next macrotask.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Microtask vs Macrotask Ordering (Advanced Cases).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This is the classic senior-level trap question: a Promise chain of any length will always finish executing before a `setTimeout(fn, 0)` scheduled earlier in the same tick, because the whole microtask queue empties before the event loop even considers the macrotask/timer queue.

## Related Topics

- JavaScript Fundamentals
