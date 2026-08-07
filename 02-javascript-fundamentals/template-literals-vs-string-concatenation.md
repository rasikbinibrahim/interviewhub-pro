# S6119 · Template Literals vs String Concatenation

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** String Handling  

## Question

Comparing backtick interpolation to the traditional + operator for building strings.

## Expected Answer

Template literals embed expressions directly with ${} and support real multi-line strings, making them more readable than chained + concatenation, which also has no equivalent of tagged-template processing.

## Deep Explanation

Template literals (backtick strings with `${expr}` interpolation) embed expressions directly and support multi-line strings without escape characters, improving readability over chained `+` concatenation. They also support tagged templates for custom processing, something plain concatenation has no equivalent for.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Template Literals vs String Concatenation.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Beyond readability, template literals avoid a common concatenation bug where `+` unexpectedly performs numeric addition instead of string concatenation depending on operand order/type (`1 + 1 + 'px'` is `'2px'`, but `'px' + 1 + 1` is `'px11'`) — interpolation makes the intended string boundaries explicit and unambiguous.

## Related Topics

- JavaScript Fundamentals
