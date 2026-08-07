# S6131 · Currying with Placeholder Arguments

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Senior Differentiators  

## Question

Building a curry helper that allows skipping arguments to fill in later, like Lodash's _.

## Expected Answer

A placeholder-aware curry lets you skip an argument with a marker value and supply it in a later call, enabling partial application of non-leading parameters without an extra wrapper function.

## Deep Explanation

A placeholder-aware curry implementation lets you call a curried function with a special marker (commonly `_`) in place of an argument you want to supply later, out of order — `add(_, 2)(1)` fills the first argument (`1`) after the second (`2`) was already given, useful for partially applying a non-first parameter without wrapping in an extra arrow function.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Currying with Placeholder Arguments.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This is exactly the mechanism behind Lodash's `_.curry` and its exported `_` placeholder — it's a genuinely useful production pattern for building specialized functions from a general one where the parameter you want to fix isn't the first one, e.g. `divideBy = curriedDivide(_, 2)` fixing the divisor while leaving the dividend open.

## Related Topics

- JavaScript Fundamentals
