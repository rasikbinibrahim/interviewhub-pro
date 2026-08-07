# S6111 · Node.js Event Loop Phases

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Node.js Event Loop  

## Question

The distinct phases Node cycles through, unlike the browser's simpler task/microtask model.

## Expected Answer

Node's event loop runs distinct phases (timers, pending callbacks, poll, check, close) via libuv, draining the entire microtask queue between each phase transition — a more granular model than the browser's single task/microtask split.

## Deep Explanation

Node's event loop (via libuv) cycles through named phases each iteration: timers (setTimeout/setInterval callbacks whose time has elapsed), pending callbacks, poll (retrieving new I/O events, executing I/O callbacks), check (setImmediate callbacks), and close callbacks — with the full microtask queue (Promises + process.nextTick) drained between every single phase transition, not just once per full loop.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Node.js Event Loop Phases.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This is why `setTimeout(fn, 0)` vs `setImmediate(fn)` ordering is famously non-deterministic when called from the top-level script (depends on process performance/timing), but deterministic (setImmediate always wins) when both are called from *within* an I/O callback, since that callback runs in the poll phase and setImmediate's check phase is guaranteed to run next, before the event loop cycles back to timers.

## Related Topics

- JavaScript Fundamentals
