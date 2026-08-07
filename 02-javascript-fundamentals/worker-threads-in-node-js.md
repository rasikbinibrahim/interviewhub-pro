# S6089 · Worker Threads in Node.js

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Browser & Runtime APIs  

## Question

Node's equivalent of Web Workers for true multi-threaded CPU-bound work.

## Expected Answer

worker_threads lets Node.js run genuinely parallel JavaScript on separate threads (communicating via messages or SharedArrayBuffer), used specifically to offload CPU-bound work off the main event loop.

## Deep Explanation

Node.js's `worker_threads` module runs JavaScript in parallel OS threads within the same process, each with its own V8 instance and event loop, communicating via message passing (like Web Workers) or optionally via `SharedArrayBuffer` for true shared memory. It's the correct tool for CPU-bound work (image processing, heavy computation) that would otherwise block Node's single main event loop.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Worker Threads in Node.js.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Worker threads should be reserved for CPU-bound tasks, not I/O-bound ones — I/O (file reads, network calls, database queries) is already handled efficiently and non-blockingly by libuv's thread pool under the hood, so spinning up a worker thread for a database query is unnecessary overhead compared to just awaiting the async I/O call.

## Related Topics

- JavaScript Fundamentals
