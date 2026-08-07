# S6001 · Stack Memory vs Heap Memory

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Execution & Memory Model  

## Question

How JavaScript engines allocate primitives on the stack and objects on the heap.

## Expected Answer

Primitives live on the stack (fixed size, fast); objects live on the heap (dynamic size, accessed by reference).

## Deep Explanation

The call stack stores execution contexts and primitive values (numbers, strings, booleans, undefined, null) because their size is known at compile time. Objects, arrays, and functions are stored on the heap — an unstructured region for dynamic memory — and the stack only holds a reference (pointer) to their heap location.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Stack Memory vs Heap Memory.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This is why primitives are copied by value and objects by reference — assigning an object copies the stack pointer, not the heap data, so both variables mutate the same underlying structure.

## Related Topics

- JavaScript Fundamentals
