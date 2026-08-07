# S6013 · this in Arrow Functions vs Regular Functions

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** this, bind, call & apply  

## Question

Why arrow functions don't have their own `this` binding.

## Expected Answer

Regular functions bind `this` based on how they're called; arrow functions inherit `this` lexically from where they were defined and it's fixed forever.

## Deep Explanation

Regular functions get their own `this`, determined dynamically by how they are called (implicit binding on the receiver object, or global/undefined in strict mode). Arrow functions have no `this` of their own — they lexically capture `this` from the enclosing scope at definition time, and it can never be changed by call(), apply(), bind(), or a new call-site.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying this in Arrow Functions vs Regular Functions.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This is exactly why arrow functions are preferred for callbacks inside class methods or object methods (e.g. event handlers, array callbacks) — they naturally preserve the outer `this` without needing `.bind(this)` or a `that = this` closure workaround.

## Related Topics

- JavaScript Fundamentals
