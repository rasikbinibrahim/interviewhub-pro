# T329 · V8 Generational Garbage Collection: Mark-and-Sweep & Scavenger Algorithms

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, V8  
**Category:** Advanced JavaScript  
**Concepts:** garbage-collection, v8, mark-and-sweep, scavenger, memory  

## Question

How does V8 Generational Garbage Collection split memory into **New Space (Young Generation)** managed by the **Scavenger (Cheney's Copying Algorithm)** and **Old Space (Old Generation)** managed by **Major GC (Mark-Sweep-Compact)**?

## Expected Answer

- **Generational Hypothesis**: Most objects die young!
- **Young Generation (New Space)**: Small buffer (1MB - 64MB). Scavenger algorithm copies live objects between From-Space and To-Space, promoting survivors to Old Space.
- **Old Generation (Old Space)**: Long-lived objects. Major GC runs Mark-and-Sweep (marking root-reachable objects) followed by Compaction to prevent memory fragmentation.
