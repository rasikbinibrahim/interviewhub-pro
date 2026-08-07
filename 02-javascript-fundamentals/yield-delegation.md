# S6041 · yield* Delegation

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Generators & Iterators  

## Question

Delegating part of a generator's work to another iterable or generator.

## Expected Answer

yield* forwards iteration (and next/throw/return calls) to another iterable or generator, flattening its yielded values into the outer generator's sequence.

## Deep Explanation

`yield*` delegates iteration to another iterable (array, string, or another generator), yielding each of its values one by one as if they were yielded directly by the outer generator. It also forwards `.next()`, `.throw()`, and `.return()` calls to the inner iterator, and its own expression value is the inner generator's final `return` value.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying yield* Delegation.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. yield* is the cleanest way to compose generators — e.g. flattening a tree structure by having each node's generator `yield*` its children's generators recursively — without manually re-implementing forwarding logic for every nested `.next()` call.

## Related Topics

- JavaScript Fundamentals
