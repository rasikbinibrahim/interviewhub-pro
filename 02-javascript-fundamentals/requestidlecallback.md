# S6094 · requestIdleCallback

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Browser & Runtime APIs  

## Question

Scheduling low-priority work to run only when the browser is otherwise idle.

## Expected Answer

requestIdleCallback schedules low-priority work to run only when the browser has spare idle time, checking a deadline so it doesn't block rendering.

## Deep Explanation

`requestIdleCallback(fn)` schedules `fn` to run during a browser idle period — after layout, paint, and any higher-priority tasks have completed — receiving a deadline object (`.timeRemaining()`) so the callback can do incremental work and yield back before it starves the next frame. It's designed for non-urgent background work like analytics batching or pre-fetching.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying requestIdleCallback.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. React's Fiber scheduler was originally inspired by (though ultimately implemented its own version of) this idle-time-yielding concept for cooperative scheduling — breaking a large render into small units of work that can be interrupted between idle-time chunks is exactly the same core idea as concurrent rendering's time-slicing.

## Related Topics

- JavaScript Fundamentals
