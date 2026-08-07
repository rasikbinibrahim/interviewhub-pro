# S6123 · Single-Threaded Nature of JavaScript

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Concurrency Model  

## Question

Why JS can only execute one piece of code at a time, and how async work still happens.

## Expected Answer

JavaScript itself executes on a single thread, one operation at a time; the illusion of concurrency for async work comes from the runtime (browser/Node) handling I/O off-thread and queueing callbacks for the event loop.

## Deep Explanation

The JavaScript engine itself runs on a single thread — only one line of JS code executes at any given moment, with no true parallel execution of JS logic within one realm. Asynchronous behavior (timers, network requests, file I/O) is handled by the surrounding runtime environment (browser Web APIs, or libuv in Node), which runs those operations off-thread and queues their callbacks to run on the single JS thread once ready.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Single-Threaded Nature of JavaScript.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This single-threaded nature is exactly why a long-running synchronous computation (a huge loop, JSON.parse on a massive string) freezes the entire UI — there's no other thread to keep handling clicks or repaints while that one thread is busy, which is the core motivation for Web Workers and chunking expensive work.

## Related Topics

- JavaScript Fundamentals
