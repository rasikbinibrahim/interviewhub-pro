# S6129 · JSON.parse() Reviver Function

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** JSON  

## Question

Transforming parsed values on the fly as JSON.parse walks the resulting structure.

## Expected Answer

JSON.parse's optional reviver function is called for every parsed key-value pair (bottom-up) and can transform, replace, or delete values as the final object is built.

## Deep Explanation

`JSON.parse(text, reviver)` accepts an optional second argument — a function called for every key-value pair in the parsed structure, bottom-up, whose return value replaces the original parsed value. Returning `undefined` deletes that key entirely; it's commonly used to revive date strings back into real `Date` objects or filter out unwanted fields during parsing.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying JSON.parse() Reviver Function.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Because the reviver runs bottom-up (children before their parent object), it can correctly transform deeply nested date strings into real Date instances before the containing object is ever handed to the reviver call for that parent key — making it the standard technique to counter the fact that JSON has no native Date type.

## Related Topics

- JavaScript Fundamentals
