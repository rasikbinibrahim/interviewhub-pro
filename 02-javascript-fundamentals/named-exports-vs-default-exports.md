# S6025 · Named Exports vs Default Exports

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Modules  

## Question

The two styles ES Modules support and their trade-offs.

## Expected Answer

Named exports expose multiple explicitly-named bindings; a default exposes one unnamed value that the importer can call whatever it wants.

## Deep Explanation

A module can multiple named bindings (`const foo`) which must be imported with matching names (optionally aliased), and/or a single default (`default`) which the importer can name anything. Named exports are explicit and tree-shakeable per-binding; default exports are convenient for a module's single primary value but harder to statically analyze and rename-refactor safely.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Named Exports vs Default Exports.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Default exports make automated refactoring tools and tree-shaking slightly weaker (the imported name carries no semantic link back to the source), which is why many style guides (e.g. Airbnb's for utility libraries) prefer named exports exclusively, reserving default exports for framework conventions like a single React component per file.

## Related Topics

- JavaScript Fundamentals
