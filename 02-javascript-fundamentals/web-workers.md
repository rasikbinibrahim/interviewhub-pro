# S6088 · Web Workers

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Browser & Runtime APIs  

## Question

Running JavaScript on a separate background thread to avoid blocking the UI.

## Expected Answer

Web Workers run scripts on a separate thread with no DOM access, communicating with the main thread only via postMessage, which keeps expensive computation from blocking the UI.

## Deep Explanation

A Web Worker runs a script in a separate OS-level thread with its own global scope, isolated from the main thread — it has no access to the DOM, `window`, or the main thread's variables. Communication happens exclusively through asynchronous message passing (`postMessage`/`onmessage`), where data is copied via the structured clone algorithm (not shared by reference).

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Web Workers.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Because data is copied (not shared) on every postMessage, large payloads (e.g. big typed arrays for image/audio processing) can be expensive to transfer — `Transferable` objects (like ArrayBuffer) can be moved instead of copied via the second argument to postMessage, transferring ownership with zero copy cost.

## Related Topics

- JavaScript Fundamentals
