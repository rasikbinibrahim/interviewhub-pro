# QPF044 · Garbage Collection Algorithms: Generational Mark-and-Sweep

**Difficulty:** Hard  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Google, Uber, Cloudflare  
**Interview Frequency:** ★★★★☆  
**Category:** Programming Fundamentals  
**Concepts:** Generational GC, Mark-Sweep, Compact phase, Scavenger algorithm, Write barriers  

## Expected Answer

Modern garbage collectors partition the heap into Young (Nursery) and Old (Tenured) generations based on the Generational Hypothesis: most objects die young. Young objects are collected frequently using fast Scavenger algorithms, while long-lived objects are promoted to the Old generation and managed via Mark-Sweep-Compact.

## Deep Explanation

The Scavenger algorithm splits the Young generation into From-Space and To-Space, copying surviving objects during minor GC. Objects surviving multiple cycles are promoted to Old space. Major GC uses Mark-Sweep-Compact: tracing root references (global object, active stack frames) to mark reachable objects, sweeping unreferenced memory, and compacting fragmented space.

## Production Example

Single Page Applications retaining detached DOM nodes inside long-lived event listeners prevent major GC sweeps, gradually increasing heap memory until the browser tab crashes.

## Best Practices

- Nullify global references when no longer required
- Detach event listeners and clear timers during component teardown

## Trade-offs

- Frequent minor GC pauses are sub-millisecond but happen often
- Major GC reclaims large volumes of memory but can cause noticeable UI jank if non-incremental

## Common Mistakes

- Assuming setting an variable to null immediately frees memory rather than waiting for GC cycle
- Creating unnecessary short-lived objects in animation frames

## Follow-up Questions

1. What is incremental marking and how does it prevent main-thread jank?
2. How do weak references (WeakMap/WeakSet) interact with the garbage collector?

## Related Topics

- Memory Layout in Execution Engines
- Memory Leaks & Memory Profiling
