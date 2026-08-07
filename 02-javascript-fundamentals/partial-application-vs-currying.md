# S6045 · Partial Application vs Currying

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Functional Programming  

## Question

Distinguishing fixing some arguments at once from transforming into unary chained calls.

## Expected Answer

Partial application pre-fills some arguments and takes the rest in one call; currying breaks the function into a strict chain of one-argument-at-a-time calls.

## Deep Explanation

Partial application fixes any number of a function's arguments in one call, returning a new function that accepts the rest all at once (`partial(f, a)(b, c)`). Currying strictly transforms a function into a chain of unary (single-argument) calls. Every curried function is trivially partially-applicable, but not every partial application is a curry.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Partial Application vs Currying.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Interviewers often use this distinction to check depth — a candidate who says 'currying and partial application are the same thing' hasn't internalized that arity matters: `bind()` is partial application, not true currying, since the bound function still accepts multiple remaining arguments at once.

## Related Topics

- JavaScript Fundamentals
