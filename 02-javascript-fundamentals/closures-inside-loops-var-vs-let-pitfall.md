# S6010 · Closures Inside Loops (var vs let Pitfall)

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Scope & Closures  

## Question

The classic bug where setTimeout callbacks in a var loop all log the same final value.

## Expected Answer

var shares one binding across all iterations so async callbacks see the final value; let creates a new binding per iteration so each closure sees its own value.

## Deep Explanation

With `var`, there is a single function-scoped binding shared across every loop iteration, so by the time an async callback (like setTimeout) runs, the loop has finished and the variable holds its final value. With `let`, each iteration gets a fresh block-scoped binding, so each closure captures its own snapshot of the loop variable.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Closures Inside Loops (var vs let Pitfall).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The pre-ES6 fix was wrapping the loop body in an IIFE to force a new scope per iteration — knowing that history is often asked as a follow-up to test whether a candidate understands *why* let fixes it, not just *that* it does.

## Related Topics

- JavaScript Fundamentals
