# S42 · Garbage Collection

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** JavaScript  

## Question

Mark-and-sweep, generational GC, and memory management.

## Expected Answer

Garbage Collection automatically frees memory of unreachable objects using the Mark-and-Sweep algorithm.

## Deep Explanation

Garbage Collection (GC) is JavaScript's automatic memory management system. It periodically sweeps the memory heap to free up memory allocated to objects that are no longer reachable from the root execution contexts.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Garbage Collection.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Be aware of runtime engine optimizations and edge cases.

## Related Topics

- JavaScript Fundamentals
