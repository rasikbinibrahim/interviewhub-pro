# S6046 · Function Composition (compose & pipe)

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Functional Programming  

## Question

Combining small single-purpose functions into a single pipeline.

## Expected Answer

compose applies functions right-to-left and pipe applies them left-to-right, both building one function out of many small reusable ones.

## Deep Explanation

`compose` combines functions right-to-left (`compose(f, g)(x) === f(g(x))`), matching mathematical function composition notation. `pipe` combines left-to-right (`pipe(f, g)(x) === g(f(x))`), often considered more readable since it matches the order functions are listed and data flows. Both build a single function out of many small, reusable, single-purpose ones.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Function Composition (compose & pipe).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Composition only works cleanly when every function in the chain is unary (accepts exactly one argument) — this is precisely why currying and composition are almost always taught and used together in functional-style codebases.

## Related Topics

- JavaScript Fundamentals
