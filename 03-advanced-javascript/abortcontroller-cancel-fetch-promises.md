# T318 · Async Task Cancellation: `AbortController` & `AbortSignal`

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix, Stripe  
**Category:** Advanced JavaScript  
**Concepts:** abortcontroller, abortsignal, fetch, promises, cancellation  

## Question

How does the **`AbortController` API** cancel ongoing `fetch()` HTTP requests, DOM event listeners, and custom Promises, and how do `AbortSignal.timeout()` and `AbortSignal.any()` handle automated request cancellations?

## Expected Answer

- **`AbortController`**: Creates an `controller.signal` passed to async operations.
- **`controller.abort(reason)`**: Signals cancellation, immediately rejecting associated promises with an `AbortError`.
- **`AbortSignal.timeout(5000)`**: Automatically aborts after specified millisecond timeout.
- **`AbortSignal.any([signal1, signal2])`**: Aborts as soon as ANY passed signal aborts.

```javascript
const controller = new AbortController();

fetch('/api/heavy-data', { signal: controller.signal })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Fetch request was safely cancelled!');
    }
  });

// Cancel fetch request after 2 seconds!
setTimeout(() => controller.abort(), 2000);
```
