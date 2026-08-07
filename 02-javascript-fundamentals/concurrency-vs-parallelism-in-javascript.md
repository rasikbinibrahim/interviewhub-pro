# S6124 · Concurrency vs Parallelism in JavaScript

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Concurrency Model  

## Question

Distinguishing interleaved single-threaded async work from truly simultaneous multi-thread execution.

## Expected Answer

Concurrency (JS's default, via the event loop) interleaves multiple async tasks on one thread without true simultaneity; parallelism requires genuinely separate threads (Web Workers / worker_threads) to run tasks at the exact same instant.

## Deep Explanation

Concurrency is about *managing* multiple tasks over overlapping time periods — JS achieves this on a single thread via the event loop interleaving callbacks (async/await, Promises), giving the appearance of tasks progressing together without ever literally running at the same instant. Parallelism is *actually* executing multiple tasks simultaneously on separate CPU cores, which in JS requires genuinely separate threads — Web Workers or Node's worker_threads.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Concurrency vs Parallelism in JavaScript.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. A very common conflation in interviews: `Promise.all()` runs async I/O-bound tasks *concurrently*, not in parallel — the network requests happen concurrently at the I/O level (off-thread), but the JS callback code handling each response still executes one at a time on the single main thread; true CPU parallelism for JS logic itself only comes from actual worker threads.

## Related Topics

- JavaScript Fundamentals
