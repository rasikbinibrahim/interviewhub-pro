# S6038 · Generators Basics

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Generators & Iterators  

## Question

Functions that can pause and resume execution, yielding multiple values over time.

## Expected Answer

A generator function can pause at yield and resume later via .next(), producing a sequence of values lazily instead of computing them all at once.

## Deep Explanation

A generator function (`function*`) returns a Generator object without running its body immediately. Calling `.next()` runs the body until the next `yield` expression, pausing execution there and returning `{ value, done }`; calling `.next()` again resumes exactly where it left off, preserving all local state across pauses.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Generators Basics.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Because state is preserved across `yield` pauses without any closures or manual bookkeeping, generators are the underlying mechanism async/await is desugared to in some transpilers (Babel's regenerator), and they're the natural tool for implementing custom iterables and cooperative task scheduling.

## Related Topics

- JavaScript Fundamentals
