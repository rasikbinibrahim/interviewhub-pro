# S6044 · Currying (Concept & Use Cases)

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Functional Programming  

## Question

Transforming a multi-argument function into a chain of single-argument functions.

## Expected Answer

Currying transforms f(a, b, c) into f(a)(b)(c), returning a new function after each argument until the function has everything it needs to execute.

## Deep Explanation

Currying converts a function `f(a, b, c)` into `f(a)(b)(c)`, where each call takes exactly one argument and returns a new function until all arguments have been supplied, at which point the original function runs. It's a way to build specialized functions incrementally by fixing arguments one at a time.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Currying (Concept & Use Cases).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Currying shines for building reusable, composable pipelines — e.g. `curriedFilter(predicate)(array)` lets you partially apply `predicate` once and reuse the resulting function across many arrays, which is the basis for point-free functional utilities like Ramda's.

## Related Topics

- JavaScript Fundamentals
