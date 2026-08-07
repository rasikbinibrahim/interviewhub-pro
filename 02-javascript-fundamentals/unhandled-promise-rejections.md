# S6037 · Unhandled Promise Rejections

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Async & Promises  

## Question

What happens when a rejected promise has no .catch() or try/catch attached.

## Expected Answer

A rejected Promise with no attached error handler triggers an unhandledrejection event in the browser, or can crash a Node process, since the runtime assumes the error was never dealt with.

## Deep Explanation

If a Promise rejects and no `.catch()` handler (or awaiting try/catch) is ever attached to it, the runtime raises an 'unhandledrejection' event (browser) or crashes the process with a warning/error (Node, depending on version) once it determines no handler will ever be added.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Unhandled Promise Rejections.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. In production, teams attach a global `window.addEventListener('unhandledrejection', ...)` or Node's `process.on('unhandledRejection', ...)` as a last-resort logging/monitoring net, but that's a safety net for bugs, not a substitute for handling rejections at the call site.

## Related Topics

- JavaScript Fundamentals
