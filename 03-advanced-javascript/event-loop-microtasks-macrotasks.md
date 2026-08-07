# T303 · Event Loop Mechanics: Call Stack, Microtasks & Macrotasks

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Advanced JavaScript  
**Concepts:** event-loop, microtasks, macrotasks, call-stack, promises, async-await  

## Question

Explain the exact execution order of the JavaScript Event Loop when processing the Call Stack, Microtask Queue (`Promise.then`, `queueMicrotask`, `MutationObserver`), and Macrotask Queue (`setTimeout`, `setInterval`, `requestAnimationFrame`, `I/O`). Predict the output of nested asynchronous code.

## Expected Answer

1. **Call Stack Execution**: Execute all synchronous code line-by-line until the stack is empty.
2. **Microtask Queue Draining**: When the Call Stack empties, the Event Loop drains **ALL pending tasks** in the Microtask Queue sequentially (including any new microtasks queued while draining) before moving to macrotasks.
3. **Rendering & Animation**: Optional browser repaint and `requestAnimationFrame` callbacks execute before picking the next macrotask.
4. **Macrotask Execution**: The Event Loop takes **EXACTLY ONE** task from the Macrotask (Task) Queue, pushes it to the Call Stack, executes it, and repeats the loop starting from step 1.

## Deep Explanation

### Event Loop Priority Priority Loop

```
+---------------------------------------------------------------+
|  1. Call Stack (Execute Synchronous Code)                     |
+-------------------------------+-------------------------------+
                                | (Stack Empty)
                                v
+---------------------------------------------------------------+
|  2. Drain ALL Microtasks (Promise.then, queueMicrotask)        |
+-------------------------------+-------------------------------+
                                | (Microtask Queue Empty)
                                v
+---------------------------------------------------------------+
|  3. Browser Render / Repaint (requestAnimationFrame)          |
+-------------------------------+-------------------------------+
                                |
                                v
+---------------------------------------------------------------+
|  4. Execute ONE Macrotask (setTimeout, setInterval, I/O)      |
+---------------------------------------------------------------+
```

## Production Example

```javascript
console.log('1: Sync Start');

setTimeout(() => {
  console.log('2: Macrotask 1 (setTimeout)');
  Promise.resolve().then(() => {
    console.log('3: Microtask inside Macrotask 1');
  });
}, 0);

Promise.resolve()
  .then(() => {
    console.log('4: Microtask 1 (Promise)');
    return Promise.resolve();
  })
  .then(() => {
    console.log('5: Microtask 2 (Promise chained)');
  });

queueMicrotask(() => {
  console.log('6: Microtask 3 (queueMicrotask)');
});

console.log('7: Sync End');

/* Expected Execution Order Output:
   1: Sync Start
   7: Sync End
   4: Microtask 1 (Promise)
   6: Microtask 3 (queueMicrotask)
   5: Microtask 2 (Promise chained)
   2: Macrotask 1 (setTimeout)
   3: Microtask inside Macrotask 1
*/
```

## Best Practices

- Use `queueMicrotask()` when you need asynchronous state updates to execute immediately after current synchronous execution completes, before the UI renders.
- Avoid recursive microtask queues (`function loop() { Promise.resolve().then(loop); }`), which completely starve the Macrotask Queue and freeze browser rendering (UI freeze).

## Common Mistakes

- Assuming `setTimeout(fn, 0)` executes immediately — it is placed at the back of the Macrotask Queue and must wait for all microtasks and preceding macrotasks to finish.
- Believing `async/await` is multi-threaded — code before `await` runs synchronously; code after `await` is wrapped in a microtask `.then()` callback.

## Follow-up Questions

1. How does Node.js Event Loop phases (`timers`, `pending callbacks`, `poll`, `check`, `close`) differ from Browser Event Loop mechanics?
2. What is the execution priority of `process.nextTick()` vs `Promise.then()` in Node.js?

## Related Topics

- Promises, Async/Await & Asynchronous JS
- Reflow vs Repaint: DOM Batching & Composite Layers
