# S6024 · CommonJS vs ES Modules

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Modules  

## Question

Comparing Node's original require/module.exports system with the native ESM standard.

## Expected Answer

CommonJS is synchronous with copied exports; ES Modules are asynchronous, statically analyzable, and live bindings.

## Deep Explanation

CommonJS (CJS) uses `require()`/`module.exports`, loads modules synchronously, and exports a mutable copy of the exports object at require-time. ES Modules (ESM) use `import`/`export`, are loaded asynchronously (allowing static analysis and tree-shaking), and live, read-only bindings — if the exporting module updates a variable, importers see the updated value.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying CommonJS vs ES Modules.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Because ESM imports are static (resolved at parse time, not runtime), bundlers can tree-shake unused exports — something impossible with CJS's dynamic `require()` calls, which is a major reason modern bundlers push ESM as the primary format even when targeting Node.

## Related Topics

- JavaScript Fundamentals
