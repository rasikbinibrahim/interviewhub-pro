# S6047 · Pure Functions and Side Effects

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Functional Programming  

## Question

Functions whose output depends only on their input and cause no observable changes elsewhere.

## Expected Answer

A pure function's output depends only on its inputs and it causes zero observable side effects outside its own scope.

## Deep Explanation

A pure function always returns the same output for the same input and produces no side effects — it doesn't mutate arguments, external state, the DOM, or perform I/O. Anything that touches state outside its own scope (logging, network calls, mutating a passed-in object, reading Date.now()) makes a function impure.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Pure Functions and Side Effects.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Purity is what makes memoization, easy unit testing, and predictable state management (like Redux reducers, which must be pure) possible — a reducer that mutates the store directly or calls an API breaks time-travel debugging and predictable re-renders.

## Related Topics

- JavaScript Fundamentals
