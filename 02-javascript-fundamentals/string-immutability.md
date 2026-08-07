# S6118 · String Immutability

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** String Handling  

## Question

Why string methods always return a new string instead of modifying the original.

## Expected Answer

Strings are immutable primitives, so every string method returns a new string rather than modifying the original in place.

## Deep Explanation

Strings are a primitive type in JavaScript, and primitives are immutable — no method (`.toUpperCase()`, `.slice()`, `.replace()`, etc.) can change a string's existing characters in place. Every string-transforming method returns a brand-new string, leaving the original completely untouched.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying String Immutability.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This is why `str[0] = 'X'` silently does nothing (no error, no effect) — bracket notation on a string only reads a character, it can never assign one, which surprises engineers coming from languages where strings are mutable character arrays (like C).

## Related Topics

- JavaScript Fundamentals
