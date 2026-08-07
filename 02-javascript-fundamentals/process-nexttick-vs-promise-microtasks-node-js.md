# S6110 · process.nextTick vs Promise Microtasks (Node.js)

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Node.js Event Loop  

## Question

Node's additional, even-higher-priority queue that runs before regular microtasks.

## Expected Answer

process.nextTick() runs on a Node-specific queue with higher priority than Promise microtasks — it's fully drained before the Promise microtask queue gets a turn.

## Deep Explanation

In Node.js, `process.nextTick()` schedules a callback on its own queue that is fully drained *before* the regular Promise microtask queue, after every phase of the event loop (and even between microtasks currently being processed). This makes `process.nextTick` callbacks run with strictly higher priority than `Promise.then()` callbacks.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying process.nextTick vs Promise Microtasks (Node.js).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Recursive/excessive use of `process.nextTick()` can starve the event loop entirely (a classic Node.js production incident) — since its queue is drained completely before moving on, a callback that keeps re-scheduling itself via nextTick can block I/O callbacks and timers indefinitely, unlike setImmediate which always yields to the next event loop phase.

## Related Topics

- JavaScript Fundamentals
