# T319 · Event Loop Internals: Microtasks Queue vs Macrotasks Queue Execution Priority

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix, Stripe  
**Category:** Advanced JavaScript  
**Concepts:** event-loop, microtasks, macrotasks, promise, settimeout, queue-microtask  

## Question

How does the browser Event Loop prioritize **Microtasks** (`Promise.then`, `queueMicrotask`, `MutationObserver`) vs **Macrotasks** (`setTimeout`, `setInterval`, `setImmediate`, `requestAnimationFrame`), and why does the Event Loop drain the ENTIRE Microtask queue before executing the next Macrotask?

## Expected Answer

- **Execution Order**:
  1. Call Stack executes all synchronous code.
  2. **Microtask Queue**: Event Loop drains ALL microtasks in order. If microtasks schedule new microtasks, they execute in the SAME tick (can block rendering if infinite!).
  3. **Rendering Phase**: Browser updates DOM layout/paint if needed (60 FPS / 16.6ms window).
  4. **Macrotask Queue**: Event Loop executes ONE macrotask, then loops back to check Microtasks again!

```javascript
console.log('1: Sync');

setTimeout(() => console.log('2: Macrotask Timeout'), 0);

Promise.resolve().then(() => {
  console.log('3: Microtask Promise');
  queueMicrotask(() => console.log('4: Nested Microtask'));
});

console.log('5: Sync End');

// Output order: 1, 5, 3, 4, 2!
```
