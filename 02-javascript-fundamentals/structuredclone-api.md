# S6080 · structuredClone() API

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Object Internals  

## Question

The native browser/Node API for deep-cloning most JavaScript values.

## Expected Answer

structuredClone() natively deep-clones objects (including circular references, Maps, Sets, and Dates) without the limitations of the old JSON.stringify/parse trick.

## Deep Explanation

`structuredClone(value)` is a built-in global function that performs a true deep clone using the structured clone algorithm — the same algorithm used internally by `postMessage` and IndexedDB. It handles nested objects, arrays, Maps, Sets, Dates, and circular references correctly, without needing `JSON.parse(JSON.stringify(x))`.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying structuredClone() API.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Unlike the JSON round-trip hack, structuredClone correctly handles circular references and preserves types like Date and Map — but it still can't clone functions, DOM nodes, or class instances with private fields/prototypes (it throws a DataCloneError), so it's not a universal replacement for every deep-clone scenario.

## Related Topics

- JavaScript Fundamentals
