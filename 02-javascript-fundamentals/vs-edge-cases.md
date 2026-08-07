# S6084 · == vs === Edge Cases

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Type Coercion  

## Question

The specific coercion rules loose equality applies before comparing.

## Expected Answer

=== never coerces types before comparing; == follows a defined coercion algorithm (null only equals undefined, booleans become numbers, objects convert via toPrimitive) that produces some famously surprising results.

## Deep Explanation

`===` never coerces — different types are always unequal. `==` applies a specific coercion algorithm: null == undefined (true, only to each other), number vs string coerces the string to a number, boolean is always converted to a number first, and object vs primitive converts the object via toPrimitive before comparing.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying == vs === Edge Cases.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The often-quoted `[] == ![]` evaluating to `true` is a great filter question: `![]` is `false` (arrays are truthy, so negating gives false) which coerces to `0`; `[]` coerces via toPrimitive to `''` which coerces to `0` — `0 == 0` is true. The senior-level takeaway is: use === always, and understand == well enough to explain legacy code, not to write new code with it.

## Related Topics

- JavaScript Fundamentals
