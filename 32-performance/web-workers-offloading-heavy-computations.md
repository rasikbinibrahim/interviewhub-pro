# T3211 · Main Thread Offloading via Web Workers

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix  
**Category:** Performance  
**Concepts:** performance, web-workers, multi-threading, main-thread-blocking  

## Question

How do **Web Workers** run JavaScript on background threads to prevent heavy CPU calculations from blocking main thread DOM rendering and user interaction (INP)?

## Expected Answer

```javascript
// main.js
const worker = new Worker('worker.js');
worker.postMessage({ data: heavyArray });
worker.onmessage = (e) => console.log('Result:', e.data);

// worker.js
self.onmessage = (e) => {
  const result = heavyCalculation(e.data);
  self.postMessage(result);
};
```
