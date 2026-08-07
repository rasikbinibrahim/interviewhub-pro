# S6020 · Private Class Fields (#)

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Prototypes & OOP  

## Question

True encapsulation in classes using the # syntax, enforced by the engine itself.

## Expected Answer

#field syntax creates truly private class members enforced by the language itself, unlike the `_field` naming convention which is only a soft signal.

## Deep Explanation

Fields and methods prefixed with `#` are private to the class — they can only be accessed from inside the class body, not from outside, subclasses, or even via bracket notation or reflection. Unlike the old convention of naming a field `_field` (which is just a hint), `#field` access from outside throws a real SyntaxError/TypeError.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Private Class Fields (#).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Because private fields aren't real properties, `'#balance' in obj` doesn't work and `obj.hasOwnProperty('#balance')` returns false — the correct existence check uses the `#field in obj` ergonomic brand-check syntax introduced alongside private fields.

## Related Topics

- JavaScript Fundamentals
