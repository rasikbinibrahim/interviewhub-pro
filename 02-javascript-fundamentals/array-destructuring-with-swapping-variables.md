# S6135 · Array Destructuring with Swapping Variables

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Senior Differentiators  

## Question

Swapping two variables' values in one line without a temporary variable.

## Expected Answer

[a, b] = [b, a] swaps two variables in a single expression because the right-hand array is evaluated completely before any assignment happens, removing the need for a temp variable.

## Deep Explanation

Array destructuring can swap two variables' values directly — `[a, b] = [b, a]` — because the right-hand side array literal `[b, a]` is fully evaluated first (capturing both original values), and only then destructured into `a` and `b` on the left, eliminating the need for a manual temporary variable.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Array Destructuring with Swapping Variables.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This pattern generalizes cleanly beyond two variables — `[a, b, c] = [c, a, b]` performs a three-way rotation just as easily — which is worth mentioning in an interview to show you understand *why* it works (evaluation order), not just that it's a memorized trick.

## Related Topics

- JavaScript Fundamentals
