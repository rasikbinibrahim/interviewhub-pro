# QBI004 · Event Loop Architecture: Microtasks vs Macrotasks

**Difficulty:** Hard  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Google, Meta, Amazon, Netflix, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Browser Internals  
**Concepts:** Event Loop, Call Stack, Microtask Queue, Task Queue (Macrotasks), requestAnimationFrame  

## Expected Answer

The Browser Event Loop coordinates script execution, event processing, and rendering. The Call Stack executes synchronous code. Asynchronous callbacks are dispatched to either the Microtask Queue (Promises, queueMicrotask, MutationObserver) or the Macrotask Queue (setTimeout, setInterval, setImmediate, I/O events).

## Deep Explanation

After each call stack frame completes, the Event Loop drains the ENTIRE Microtask Queue completely before picking the next single Macrotask. If microtasks continuously schedule new microtasks, the Event Loop starves the Macrotask Queue and rendering pipeline, causing the browser UI thread to freeze.

## Production Example

An infinite recursive Promise loop (.then(() => Promise.resolve().then(...))) starves the main thread, blocking user clicks and browser paint cycles despite being non-blocking asynchronous code.

## Best Practices

- Use microtasks for immediate state consistency operations prior to rendering
- Use setTimeout(..., 0) or requestIdleCallback to yield main thread control for heavy background tasks

## Trade-offs

- Microtasks run immediately after current synchronous code before any paint occurs
- Macrotasks yield thread control allowing rendering between tasks

## Common Mistakes

- Assuming setTimeout(fn, 0) executes before Promise.resolve().then(fn)
- Assuming requestAnimationFrame callbacks run inside the microtask queue

## Follow-up Questions

1. How does requestAnimationFrame timing fit relative to microtask queue flushing and style recalculation?
2. How does Node.js event loop phase execution differ from the browser window event loop?

## Related Topics

- Advanced JS
- Performance
