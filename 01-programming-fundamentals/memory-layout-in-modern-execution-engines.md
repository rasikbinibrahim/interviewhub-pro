# QPF041 · Memory Layout in Modern Execution Engines

**Difficulty:** Hard  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Google, Meta, Microsoft  
**Interview Frequency:** ★★★★☆  
**Category:** Programming Fundamentals  
**Concepts:** Memory layout, Stack vs Heap, Allocation mechanics, Pointers, Garbage Collection  

## Expected Answer

Execution engines partition memory primarily into the Execution Stack (for primitive values, function call frames, and execution context references) and the Heap (for dynamically allocated objects, arrays, closures, and reference types). Understanding this boundary is critical for predicting memory overhead, cache locality, and potential memory leaks.

## Deep Explanation

The stack operates under LIFO discipline with fixed-size call frames allocated during function invocation. Each frame contains local primitive variables and return pointers. In contrast, the heap stores variable-size references allocated dynamically. Reference types stored in the heap are accessed via pointer addresses held on the stack or within parent heap objects.

## Production Example

Creating large object allocations inside hot loops causes excessive heap allocations, pressuring the V8 garbage collector (Scavenger and Mark-Sweep phases) and resulting in minor GC pause spikes that drop frame rates below 60fps.

## Best Practices

- Reuse object instances or pools for high-frequency operations
- Prefer primitive stack-allocated values in performance-critical calculation loops

## Trade-offs

- Stack allocation is extremely fast but limited in size
- Heap allocation allows dynamic lifecycle management but incurs garbage collection overhead

## Common Mistakes

- Assuming primitive values wrapped in Object wrappers stay on the stack
- Neglecting memory leaks caused by lingering heap references in closures

## Follow-up Questions

1. How does V8 differentiate between young and old generation objects?
2. What is the role of hidden classes and inline caches in memory optimization?

## Related Topics

- V8 Engine JIT Compilation
- Garbage Collection Basics
- Memory Leaks & Memory Profiling
