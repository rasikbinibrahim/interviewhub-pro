# S5027 · Mark & Sweep

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** JavaScript  

## Question

Interview questions and core concepts related to Mark & Sweep under JavaScript (Hard).

## Expected Answer

Mark-and-Sweep traverses active object references to mark reachable objects and sweep unreachable ones from memory heap.

## Deep Explanation

Mark-and-Sweep is the standard garbage collection algorithm used by modern JavaScript engines like V8. The engine starts at designated root references (like window or active variables on the stack) and 'marks' all objects reachable from them. It then 'sweeps' the remaining memory, reclaiming any unmarked objects that are unreachable.

## Production Example

```js
let root = { data: 'active' };
root = null; // object reclaimed
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Mark & Sweep.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Be aware of runtime engine optimizations and edge cases.

## Related Topics

- JavaScript Fundamentals
