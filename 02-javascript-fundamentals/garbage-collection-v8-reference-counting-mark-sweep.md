# T213 · JavaScript Memory Management: Reference Counting vs Mark-and-Sweep Garbage Collection

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix  
**Interview Frequency:** ★★★★★  
**Category:** JavaScript  
**Concepts:** garbage-collection, v8, memory-management, mark-and-sweep, memory-leaks  

## Question

How does JavaScript manage automatic memory allocation and de-allocation, why was the **Reference Counting** garbage collection algorithm replaced by the **Mark-and-Sweep** algorithm, and how does V8 organize memory into **Young Generation (Scavenger)** and **Old Generation (Mark-Sweep-Compact)** spaces?

## Expected Answer

1. **Reference Counting Flaw**:
   - Counts total references pointing to an object. When references reach 0, memory is freed.
   - **Circular References Bug**: If object A points to object B (`A.b = B`), and object B points to object A (`B.a = A`), reference count stays at 1 even when both objects become unreachable from root, causing permanent memory leaks!
2. **Mark-and-Sweep Algorithm (Modern GC)**:
   - Periodically starts from global **Roots** (Global Object, active Call Stack variables).
   - **Mark Phase**: Traverses reachable reference graphs, marking all visited objects as "reachable".
   - **Sweep Phase**: Reclaims memory for all un-marked objects. Handles circular references cleanly!
3. **V8 Generational Collector**:
   - **Young Generation (Scavenger / Cheney Algorithm)**: Holds short-lived objects (90% die young). High-frequency fast evacuation collector.
   - **Old Generation (Mark-Sweep & Mark-Compact)**: Holds objects surviving 2 GC cycles. Uses incremental marking to avoid UI jank.

## Deep Explanation

### Generational GC Architecture

```
[ Heap Memory Allocation ]
           │
           ▼
[ Young Generation (Nursery / Intermediate) ] ──(Survives 2 GC passes)──► [ Old Generation Space ]
(Cheney Scavenger Collector: Fast Evacuation)                              (Mark-Sweep-Compact)
```

## Production Example

```javascript
// Circular Reference Leak Example (Handled safely by Mark-and-Sweep!)
function createCircularLeak() {
  const objA = {};
  const objB = {};

  objA.child = objB;
  objB.parent = objA;

  // Under Reference Counting: objA and objB stay in memory forever!
  // Under Mark-and-Sweep: Once function returns, objA and objB are un-reachable from Global Root!
  return 'Done';
}

createCircularLeak(); // GC cleans both objects automatically on next Mark-and-Sweep cycle!
```

## Best Practices

- Unbind DOM event listeners, timers (`clearInterval`), and global EventEmitter listeners when components unmount to prevent root-reachable memory retention.
- Use `WeakMap` and `WeakSet` for metadata key storage so keys can be garbage collected when target objects are dereferenced.

## Common Mistakes

- Accidental global variables (`window.userData = data`) inside functions, making heavy objects permanently reachable from the Global Root.

## Follow-up Questions

1. What is the Chrome DevTools Memory Heap Snapshot tool and how do Detached DOM Nodes indicate memory leaks?

## Related Topics

- V8 Garbage Collector Architecture: WeakMap & WeakSet Internals
- Real-World Closure Use Cases & Memory Retention
