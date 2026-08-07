# S6092 · AbortController and AbortSignal

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Browser & Runtime APIs  

## Question

The standard API for cancelling in-flight async operations like fetch requests.

## Expected Answer

AbortController provides a signal you can pass to cancellable APIs like fetch(); calling abort() cancels the operation and rejects it with an AbortError.

## Deep Explanation

`AbortController` creates a controller with a `.signal` property (an `AbortSignal`) that can be passed to cancellable APIs like `fetch()`. Calling `controller.abort()` triggers the signal, which causes the associated operation to reject with an `AbortError` (or, for custom async code, fires an 'abort' event the code can listen for and react to manually).

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying AbortController and AbortSignal.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The most important production use case is cleaning up stale requests in React's useEffect — creating a new AbortController per effect run and calling `.abort()` in the cleanup function prevents a slow, outdated request from overwriting state with stale data after the component has already re-rendered for newer props.

## Related Topics

- JavaScript Fundamentals
