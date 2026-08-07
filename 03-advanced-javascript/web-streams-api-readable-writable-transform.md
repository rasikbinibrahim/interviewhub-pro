# T335 · Web Streams API: `ReadableStream`, `WritableStream`, and `TransformStream`

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Cloudflare, Vercel  
**Category:** Advanced JavaScript  
**Concepts:** streams, readablestream, transformstream, backpressure  

## Question

How does the native **Web Streams API** stream large payloads over the network chunk-by-chunk using backpressure pipelines?

```javascript
const response = await fetch('/api/large-file');
const reader = response.body.getReader();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(`Received chunk of ${value.length} bytes`);
}
```
