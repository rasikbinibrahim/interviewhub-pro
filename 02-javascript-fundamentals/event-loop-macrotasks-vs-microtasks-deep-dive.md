# T210 · Event Loop Execution Order: `process.nextTick`, `queueMicrotask`, `requestAnimationFrame` & Timers

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** JavaScript  
**Concepts:** event-loop, microtasks, macrotasks, nexttick, requestanimationframe, async-execution  

## Question

In what exact order does the JavaScript Event Loop process Call Stack execution, Node.js `process.nextTick()`, Microtasks (`Promise.then`, `queueMicrotask`), Rendering Phases (`requestAnimationFrame`), and Macrotasks (`setTimeout`, `setInterval`, `setImmediate`)?

## Expected Answer

1. **Execution Priority Order (Highest to Lowest)**:
   - **1. Synchronous Code**: Call Stack execution.
   - **2. `process.nextTick()` Queue (Node.js)**: Runs immediately after current synchronous operation, before any other microtasks!
   - **3. Microtask Queue**: `Promise.then/catch/finally`, `queueMicrotask()`, `MutationObserver`. The microtask queue is **completely drained** until empty before the browser/Node event loop moves forward.
   - **4. Animation Frame Callbacks (Browser)**: `requestAnimationFrame()` runs before the next browser Paint/Reflow stage.
   - **5. Macrotask Queue**: `setTimeout`, `setInterval`, `setImmediate` (Node.js), I/O events, postMessage. Executes **one macrotask at a time**, then drains the Microtask queue again.

## Deep Explanation

### Event Loop Phase Diagram

```
[ Call Stack (Sync JS) ]
          │
          ▼ Stack Empty
[ Node.js process.nextTick Queue ] ──(Drain All)──►
          │
          ▼
[ Microtask Queue (Promises, queueMicrotask) ] ──(Drain All)──►
          │
          ▼ Needs Repaint?
[ Browser requestAnimationFrame Callbacks ]
          │
          ▼
[ Macrotask Queue (setTimeout, I/O) ] ──(Process 1 Task)──► Loop back to Stack!
```

## Production Example

```javascript
console.log('1. Sync Start');

setTimeout(() => {
  console.log('6. Macrotask (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('4. Microtask (Promise 1)');
});

queueMicrotask(() => {
  console.log('5. Microtask (queueMicrotask)');
});

if (typeof process !== 'undefined' && process.nextTick) {
  process.nextTick(() => {
    console.log('3. Node nextTick');
  });
}

console.log('2. Sync End');

/* Expected Output in Node.js:
1. Sync Start
2. Sync End
3. Node nextTick
4. Microtask (Promise 1)
5. Microtask (queueMicrotask)
6. Macrotask (setTimeout)
*/
```

## Best Practices

- Use `queueMicrotask()` when scheduling non-blocking asynchronous state cleanups or batching operations that must run before the browser repaints the screen.
- Avoid recursive `process.nextTick()` calls in Node.js, which starves the Macrotask I/O queue indefinitely, freezing HTTP server socket listening.

## Common Mistakes

- Believing `setTimeout(fn, 0)` executes immediately — it is pushed to the Macrotask queue and must wait for all synchronous code AND microtasks to finish.

## Follow-up Questions

1. Why does scheduling recursive microtasks (`function loop() { Promise.resolve().then(loop); }`) cause the browser tab to freeze, while recursive `setTimeout` does not?

## Related Topics

- Polyfilling `Promise.allSettled`, `Promise.race` & `Promise.any`
- Reflow, Repaint & Browser Rendering Pipeline
