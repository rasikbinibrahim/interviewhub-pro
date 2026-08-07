# S6138 · Structured Clone Algorithm vs JSON Deep Clone

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Senior Differentiators  

## Question

Comparing the native structuredClone/postMessage algorithm against the classic JSON round-trip hack.

## Expected Answer

JSON round-tripping only deep-clones plain JSON-safe data (breaking on Dates, circular refs, undefined, functions); structuredClone() correctly preserves richer types like Date/Map/Set/circular references but still can't clone functions or DOM nodes.

## Deep Explanation

The `JSON.parse(JSON.stringify(x))` trick deep-clones only JSON-safe data — it silently drops `undefined`, functions, and symbols, converts `Date` objects into strings (losing the Date type), and throws on circular references. The structured clone algorithm (used by `structuredClone()`, `postMessage`, and IndexedDB) correctly preserves `Date`, `Map`, `Set`, `RegExp`, typed arrays, and circular references, but still cannot clone functions or DOM nodes.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Structured Clone Algorithm vs JSON Deep Clone.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The Date-to-string silent conversion in the JSON trick is a particularly sneaky production bug — code that clones state containing a `Date` field and later calls `.getMonth()` on it will crash after a JSON-based deep clone (it's now a string), while the exact same code works fine with `structuredClone()`, since the Date type survives intact.

## Related Topics

- JavaScript Fundamentals
