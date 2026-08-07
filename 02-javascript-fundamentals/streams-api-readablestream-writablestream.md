# S6091 · Streams API (ReadableStream/WritableStream)

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Browser & Runtime APIs  

## Question

Processing data incrementally in chunks instead of loading it all into memory at once.

## Expected Answer

Streams model data as incrementally-produced/consumed chunks (Readable/Writable/TransformStream) so large payloads can be processed without buffering everything in memory at once.

## Deep Explanation

The Streams API models data as a sequence of chunks that can be produced (`ReadableStream`), consumed (`WritableStream`), or transformed (`TransformStream`) incrementally, without needing to buffer the entire payload in memory first. `fetch()` response bodies are ReadableStreams, letting you process a large download (or generate a large upload) chunk-by-chunk as it arrives.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Streams API (ReadableStream/WritableStream).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Streaming is what makes progressive rendering possible — e.g. React's streaming SSR (renderToReadableStream) sends HTML chunks to the browser as they're ready rather than waiting for the entire page to render server-side first, directly improving Time To First Byte for large pages.

## Related Topics

- JavaScript Fundamentals
