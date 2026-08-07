# S6085 · Falsy Values: The Complete List

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Type Coercion  

## Question

The exact eight values that evaluate to false in a boolean context.

## Expected Answer

The only falsy values in JavaScript are false, 0, -0, 0n, '', null, undefined, and NaN — everything else, including [] and {}, is truthy.

## Deep Explanation

JavaScript has exactly eight falsy values: `false`, `0`, `-0`, `0n` (BigInt zero), `''` (empty string), `null`, `undefined`, and `NaN`. Every other value — including `'0'`, `'false'`, empty arrays `[]`, and empty objects `{}` — is truthy.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Falsy Values: The Complete List.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The fact that `[]` and `{}` are truthy trips up many candidates when writing conditionals like `if (someArray)` intending to check emptiness — that only checks reference existence, not length; the correct check is `if (someArray.length)`.

## Related Topics

- JavaScript Fundamentals
