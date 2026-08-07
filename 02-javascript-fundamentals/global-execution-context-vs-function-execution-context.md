# S6004 · Global Execution Context vs Function Execution Context

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Execution & Memory Model  

## Question

How the base context differs from the context created on each function call.

## Expected Answer

There is exactly one Global Execution Context per program, but a new Function Execution Context is created on every function invocation.

## Deep Explanation

The Global Execution Context (GEC) is created once when the script starts — it creates the global object (window/globalThis) and binds `this` to it in non-strict mode. A new Function Execution Context (FEC) is pushed onto the call stack every time a function is invoked, each with its own variable environment, scope chain, and `this` binding.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Global Execution Context vs Function Execution Context.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Each FEC keeps a reference to its outer lexical environment at the time the function was *defined*, not called — that reference chain is what makes closures possible.

## Related Topics

- JavaScript Fundamentals
