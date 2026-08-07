# S6128 · JSON.stringify() Edge Cases

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** JSON  

## Question

How stringify handles functions, undefined, symbols, circular references, and custom toJSON.

## Expected Answer

JSON.stringify() silently drops undefined/function/symbol values (or nulls them in arrays), throws on circular structures, and defers to a custom toJSON() method if the object defines one.

## Deep Explanation

`JSON.stringify()` silently omits `undefined` values, functions, and symbol-keyed properties (or converts them to `null` inside arrays), throws a TypeError on circular references, and calls a `toJSON()` method on an object first if one is defined, using its return value instead of the object's raw properties.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying JSON.stringify() Edge Cases.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The `toJSON()` hook is how `Date` objects serialize as ISO strings automatically — `Date.prototype.toJSON` exists specifically for this — and it's the standard extension point for controlling exactly how a custom class serializes (e.g. omitting sensitive fields like a password hash) without needing a separate serialization function everywhere the object is stringified.

## Related Topics

- JavaScript Fundamentals
