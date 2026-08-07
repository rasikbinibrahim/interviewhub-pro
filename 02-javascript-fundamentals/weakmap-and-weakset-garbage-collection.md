# T234 · Garbage Collection Collections: `WeakMap` and `WeakSet`

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** JavaScript  
**Concepts:** weakmap, weakset, garbage-collection, memory-management  

## Question

Why do **`WeakMap`** and **`WeakSet`** hold weak references to object keys, preventing memory leaks without blocking Garbage Collection, and why are they non-iterable?

## Expected Answer

- **Weak Keys**: Keys MUST be objects. If no other strong reference to a key object exists, the key is automatically garbage collected!
- **Non-Iterable**: Cannot call `.size`, `.keys()`, `.values()`, or `for...of` because GC garbage collection is non-deterministic.
