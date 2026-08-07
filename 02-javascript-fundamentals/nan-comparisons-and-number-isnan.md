# S6087 · NaN Comparisons and Number.isNaN()

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Type Coercion  

## Question

Why NaN never equals itself, and how to safely check for it.

## Expected Answer

NaN never equals itself under any comparison; use Number.isNaN() (not the coercing global isNaN()) for a reliable, type-safe check, or Number.isNaN(x) / Object.is(x, NaN).

## Deep Explanation

`NaN` (Not-a-Number) is the only value in JavaScript that is not equal to itself under any comparison operator, per the IEEE 754 floating-point spec — `NaN === NaN` and `NaN == NaN` are both `false`. The global `isNaN()` coerces its argument to a number first (so `isNaN('hello')` is confusingly `true`), while `Number.isNaN()` checks strictly, without coercion, returning `true` only for the actual value `NaN`.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying NaN Comparisons and Number.isNaN().

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The global `isNaN()` function is a well-known footgun precisely because of its coercion — `isNaN('foo')` returns `true` since `'foo'` becomes `NaN` when coerced to a number, which has nothing to do with the input actually *being* NaN; `Number.isNaN('foo')` correctly returns `false`.

## Related Topics

- JavaScript Fundamentals
