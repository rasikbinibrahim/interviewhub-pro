# S6132 · Function.length and Function.name

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Senior Differentiators  

## Question

Two introspective properties every function carries about its own signature.

## Expected Answer

fn.length counts parameters before the first default/rest parameter; fn.name returns its name, which is auto-inferred from the assignment target for anonymous and arrow functions.

## Deep Explanation

`fn.length` returns the number of declared parameters *before* the first one with a default value or a rest parameter (default/rest params and everything after them are excluded from the count). `fn.name` returns the function's name — inferred automatically from a variable/property assignment for anonymous functions/arrow functions (`const foo = () => {}` gives `foo.name === 'foo'`).

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Function.length and Function.name.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. `fn.length` is exactly what a generic curry implementation relies on to know how many arguments to wait for before invoking the underlying function — which is also why a curried function with default parameters silently breaks (its `.length` undercounts), a subtle gotcha worth knowing when debugging a currying utility.

## Related Topics

- JavaScript Fundamentals
