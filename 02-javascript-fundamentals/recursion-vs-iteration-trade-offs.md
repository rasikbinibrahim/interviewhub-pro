# S6122 · Recursion vs Iteration Trade-offs

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Recursion & Algorithms  

## Question

When recursive elegance is worth the stack-depth risk versus an explicit loop.

## Expected Answer

Recursion is more readable for naturally recursive structures like trees, but iteration avoids stack-overflow risk on deep input and has lower call overhead — the choice trades clarity for robustness/performance.

## Deep Explanation

Recursion often expresses tree/graph traversal and divide-and-conquer algorithms far more naturally and readably than an equivalent iterative version with a manual stack. Iteration avoids the risk of a stack overflow on deep/unbounded input and typically has lower per-call overhead (no new stack frame, no function-call bookkeeping) than recursion.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Recursion vs Iteration Trade-offs.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The senior-level decision framework: use recursion when the input depth is bounded and known-small (e.g. a UI component tree, a fixed-depth config object), and prefer iteration (or an explicit stack) whenever input depth is attacker-controlled or unbounded — like recursively parsing arbitrary user-submitted JSON, which could otherwise be used to crash the process via a maliciously deep structure.

## Related Topics

- JavaScript Fundamentals
