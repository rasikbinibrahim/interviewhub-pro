# S6103 · Tagged Template Literals

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Modern Syntax  

## Question

Passing a template literal through a custom function to process its parts before final output.

## Expected Answer

Tagging a template literal passes its static string segments and interpolated values separately into a custom function, which can then build and return any custom output — not just a string.

## Deep Explanation

A tagged template literal (`tagFn\`Hello ${name}\``) calls `tagFn` with the literal's static string parts as the first argument (an array) and each interpolated expression's evaluated value as the remaining arguments, letting the function fully control how the final string (or any other value) is constructed — including escaping, formatting, or internationalization.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Tagged Template Literals.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This is exactly how styled-components parses CSS-in-JS (`styled.div\`color: ${props => props.color};\``) and how GraphQL client libraries parse `gql\`query {...}\`` — the tag function receives the raw query/style text and interpolated variables separately, letting it build an AST or sanitize values before final use.

## Related Topics

- JavaScript Fundamentals
