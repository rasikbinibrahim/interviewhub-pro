# S6067 · Proxy Traps Deep Dive (get/set/has/deleteProperty)

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Meta-programming  

## Question

Common Proxy traps and real-world use cases for each.

## Expected Answer

get/set intercept property read/write, has intercepts the `in` operator, and deleteProperty intercepts `delete` — each can be customized to add validation, hide keys, or block operations.

## Deep Explanation

`get`/`set` intercept property reads/writes (useful for validation, reactivity, computed properties). `has` intercepts the `in` operator (useful for hiding certain keys from existence checks, e.g. private-ish fields). `deleteProperty` intercepts `delete obj.key` (useful for protecting specific keys from removal, or logging deletions for an audit trail).

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Proxy Traps Deep Dive (get/set/has/deleteProperty).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Combining `set` (for validation) with `deleteProperty` (to block removal of required fields) is a common way to build a lightweight runtime schema-enforcement wrapper around a plain object, without needing a full validation library, especially useful for guarding config objects passed between modules.

## Related Topics

- JavaScript Fundamentals
