# T309 · V8 Garbage Collector Architecture: Generational GC, Scavenger & Mark-Sweep-Compact

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix  
**Interview Frequency:** ★★★★☆  
**Category:** Advanced JavaScript  
**Concepts:** v8, garbage-collection, generational-gc, memory-leaks, scavenger, mark-sweep  

## Question

How does V8's Generational Garbage Collector manage memory across the Young Generation (Nursery & Intermediate) and Old Generation heaps, how do the **Scavenger (Cheney's Algorithm)** and **Mark-Sweep-Compact** algorithms work, and what triggers Major GC pause spikes in Node.js / browser applications?

## Expected Answer

1. **Generational Hypothesis**: Most objects die young (temporary variables, closures inside functions). V8 splits the JS Heap into:
   - **Young Generation (1MB - 64MB)**: Short-lived objects. Frequently cleaned by fast **Minor GC (Scavenger)**.
   - **Old Generation**: Long-lived objects promoted after surviving two Minor GC cycles, string constants, and closures. Cleaned by **Major GC (Mark-Sweep-Compact)**.
2. **Minor GC (Scavenger Algorithm)**:
   - Divides Young Generation space into two semi-spaces: **From-Space** and **To-Space**.
   - During GC, live objects in From-Space are copied sequentially into To-Space (compacting memory). Dead objects are discarded. From and To roles swap.
3. **Major GC (Mark-Sweep-Compact Algorithm)**:
   - **Marking**: Roots (stack pointers, window/global) are traversed via Depth-First Search to identify reachable objects.
   - **Sweeping**: Memory addresses of unreachable objects are freed and added to free-lists.
   - **Compacting**: Shifts surviving objects to eliminate fragmentation.

## Deep Explanation

### V8 Heap Layout

```
┌─────────────────────────────────────────────────────────────┐
│                          V8 HEAP                            │
├──────────────────────────────┬──────────────────────────────┤
│      Young Generation        │       Old Generation         │
│  ┌────────────┬───────────┐  │  ┌────────────────────────┐  │
│  │ From-Space │ To-Space  │  │  │ Old Pointer Space      │  │
│  └────────────┴───────────┘  │  │ Old Data Space         │  │
│    (Minor GC / Scavenger)    │  └────────────────────────┘  │
│                              │   (Major GC / Mark-Sweep)    │
└──────────────────────────────┴──────────────────────────────┘
```

## Production Example

```javascript
// Identifying V8 GC Allocation Patterns & Leaks
import { performance, PerformanceObserver } from 'perf_hooks';

// Monitor GC pause duration in Node.js
const obs = new PerformanceObserver((list) => {
  const entry = list.getEntries()[0];
  console.log(`GC Type: ${entry.detail.kind}, Duration: ${entry.duration.toFixed(2)}ms`);
});
obs.observe({ entryTypes: ['gc'] });

// Anti-Pattern: Triggering High Allocation Rate in Hot Loop (V8 Scavenger Churn!)
function processLargeBatch(items) {
  for (let i = 0; i < items.length; i++) {
    // Creating short-lived object allocations inside 1,000,000 loop iterations!
    const tempContext = { id: i, payload: items[i] };
    doWork(tempContext);
  }
}

// Optimized Pattern: Object Reuse / Flat Struct (Zero Scavenger Churn!)
function processLargeBatchOptimized(items) {
  const context = { id: 0, payload: null };
  for (let i = 0; i < items.length; i++) {
    context.id = i;
    context.payload = items[i];
    doWork(context);
  }
}
```

## Best Practices

- Avoid creating short-lived temporary objects inside high-frequency `requestAnimationFrame` loops or hot processing functions.
- Detach un-needed DOM elements, event listeners, and global timers to allow V8 Root Marking to mark memory unreachable.

## Common Mistakes

- Accidental creation of global variables (`window.cache = {}`), which root-references objects permanently, preventing Old Generation GC cleanup.

## Follow-up Questions

1. How does V8 Concurrent & Incremental Marking reduce Stop-The-World (STW) main thread pause times?

## Related Topics

- ES6 Collections: `Map`, `Set`, `WeakMap`, `WeakSet` & Garbage Collection
- Memory Leaks: Retained DOM Elements, Detached Nodes & Closures
