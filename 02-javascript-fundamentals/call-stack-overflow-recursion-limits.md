# S6005 · Call Stack Overflow & Recursion Limits

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Execution & Memory Model  

## Question

Why deep or unbounded recursion crashes with RangeError: Maximum call stack size exceeded.

## Expected Answer

Stack overflow happens when recursive calls push more frames than the fixed-size call stack can hold, usually from a missing or unreachable base case.

## Deep Explanation

The call stack has a fixed size (engine and platform dependent, typically ~10k-15k frames in V8). Each recursive call pushes a new frame; if a base case is missing or the recursion is too deep, the stack exceeds its limit and the engine throws a RangeError.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Call Stack Overflow & Recursion Limits.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. JavaScript does not guarantee tail-call optimization in production engines (it was in the ES6 spec but only Safari ever shipped it), so converting recursion to an explicit loop or trampoline is the practical fix for deep recursion, not just adding a tail call.

## Related Topics

- JavaScript Fundamentals
