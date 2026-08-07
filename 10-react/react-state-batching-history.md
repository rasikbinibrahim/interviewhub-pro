# T1031 · React State Batching Evolution: Legacy Event Batching vs React 18 Automatic Batching

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft  
**Category:** React  
**Concepts:** react, state-batching, automatic-batching, flushsync  

## Question

How did state batching evolve from React 17 (batching ONLY inside synthetic event handlers) to React 18 (Automatic Batching across Promises, timeouts, and native events)?

```jsx
// React 18: All updates batched automatically into 1 single re-render!
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
}, 1000);
```
