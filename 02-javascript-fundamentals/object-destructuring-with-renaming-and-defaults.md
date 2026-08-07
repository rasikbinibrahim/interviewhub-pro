# S6107 · Object Destructuring with Renaming and Defaults

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Modern Syntax  

## Question

Extracting properties under new local names while providing fallback values.

## Expected Answer

Object destructuring can rename extracted properties to new local variable names and supply default values simultaneously, useful for avoiding naming collisions or handling optional API fields.

## Deep Explanation

Object destructuring supports renaming a property to a different local variable name (`const { name: userName } = obj`), combining renaming with a default value (`const { age: userAge = 18 } = obj`), and nested destructuring for deeply structured objects — all in one concise declaration, commonly used for cleanly extracting function parameters or API response fields.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Object Destructuring with Renaming and Defaults.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Renaming with defaults is especially valuable when destructuring function parameters directly in the signature — `function Card({ title: cardTitle, subtitle = 'N/A' }) {}` — since it avoids intermediate variables while still guarding against missing optional props, a pattern used constantly in React component signatures.

## Related Topics

- JavaScript Fundamentals
