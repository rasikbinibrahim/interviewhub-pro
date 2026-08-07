# S6070 · Map vs Plain Object

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Collections (Map/Set/WeakMap/WeakSet)  

## Question

When a Map is the better choice over a regular object for key-value storage.

## Expected Answer

Map supports any key type, guarantees insertion order, and has a direct .size property; plain objects only support string/symbol keys and inherit prototype properties that can collide with data.

## Deep Explanation

A `Map` allows any value (including objects and functions) as a key, preserves insertion order reliably, provides a direct `.size` property, and is optimized for frequent additions/removals. A plain object only allows string/symbol keys (numbers get coerced to strings), inherits prototype properties that can collide with data keys, and requires `Object.keys(obj).length` to get a count.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Map vs Plain Object.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The prototype-pollution risk is the sharpest practical difference — a plain object used as a lookup table is vulnerable to a malicious key like `__proto__` or `constructor` corrupting the prototype chain, while a Map has no such inherited surface, which is why Map is the safer default for dictionaries built from untrusted keys.

## Related Topics

- JavaScript Fundamentals
