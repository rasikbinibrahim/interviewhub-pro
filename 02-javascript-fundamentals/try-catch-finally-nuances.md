# S6099 · try/catch/finally Nuances

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Error Handling  

## Question

Execution order guarantees and edge cases in exception handling blocks.

## Expected Answer

finally always executes regardless of try/catch outcome, including overriding pending returns — and a return inside finally silently discards any error or return value from try/catch.

## Deep Explanation

`finally` always runs, whether the `try` block succeeds, throws (and is caught), or even if `return` is called inside `try` or `catch` — it runs after the return value is computed but before the function actually returns. If `finally` itself contains a `return` statement, it overrides any pending return value or thrown error from `try`/`catch`.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying try/catch/finally Nuances.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The `return` inside `finally` overriding an in-flight exception is a genuinely dangerous footgun — if `try` throws but `finally` has its own `return`, the exception is silently swallowed entirely, with no trace of it ever having happened, which is why linters commonly flag `return`/`throw` inside `finally` blocks.

## Related Topics

- JavaScript Fundamentals
