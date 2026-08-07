# S6100 · Optional Catch Binding

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Error Handling  

## Question

Omitting the error parameter in a catch block when it isn't needed.

## Expected Answer

Optional catch binding lets you write `catch { }` without an error parameter when the handler doesn't need to inspect the caught error object.

## Deep Explanation

Since ES2019, `catch` no longer requires a bound parameter — `catch { ... }` is valid when the handler doesn't need to inspect the error object itself, only needs to know that an error occurred (e.g. falling back to a default value). Previously, `catch (e) { ... }` was mandatory even if `e` went unused.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Optional Catch Binding.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This is commonly used in feature-detection patterns — e.g. `try { JSON.parse(input); } catch { return false; }` — where the specific error details are irrelevant and forcing an unused `(e)` parameter would just trigger an unused-variable lint warning for no benefit.

## Related Topics

- JavaScript Fundamentals
