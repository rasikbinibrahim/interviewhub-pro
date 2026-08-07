# S6109 · Array Holes and Sparse Arrays

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Modern Syntax  

## Question

How arrays with missing indices behave differently from dense arrays.

## Expected Answer

Array holes (missing indices, e.g. from [1, , 3] or `new Array(3)`) are skipped by iteration methods like map/forEach/filter but still count toward .length, unlike an index explicitly set to undefined.

## Deep Explanation

A sparse array has 'holes' — indices with no actual value assigned, distinct from an index explicitly set to `undefined`. Methods like `forEach`, `map`, and `filter` skip holes entirely (never invoking the callback for them), while `for` loops and `.length` still count them, which is why `[1, , 3].length` is `3` but `[1, , 3].forEach()` only fires twice.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Array Holes and Sparse Arrays.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. `new Array(3)` creates a sparse array of length 3 with zero actual elements — calling `.map()` on it does nothing (all holes are skipped), which is why `new Array(3).fill(0).map(...)` (fill first, to convert holes into real values) is the standard idiom for generating a sequence, not `new Array(3).map(...)` directly.

## Related Topics

- JavaScript Fundamentals
