# S6093 · Fetch API vs XMLHttpRequest

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Browser & Runtime APIs  

## Question

Comparing the modern Promise-based HTTP client to the legacy event-based one.

## Expected Answer

fetch() is a modern Promise-based API with cleaner async/await ergonomics; XHR is the older event-based API that still natively supports upload progress tracking, which fetch requires extra work to replicate.

## Deep Explanation

`fetch()` is Promise-based, has a cleaner streaming-friendly API, and integrates naturally with async/await. `XMLHttpRequest` (XHR) is event-based (`onload`, `onerror`, `onprogress`) and predates Promises entirely, but it natively supports upload progress tracking and request cancellation via `.abort()` without needing a separate controller — capabilities `fetch()` only gained later via AbortController and manual stream reading.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Fetch API vs XMLHttpRequest.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. A subtle but important fetch gotcha: `fetch()` does not reject on HTTP error status codes (404, 500) — it only rejects on network failure — so checking `response.ok` (or `response.status`) manually is required; forgetting this is a very common bug where error responses are silently treated as success.

## Related Topics

- JavaScript Fundamentals
