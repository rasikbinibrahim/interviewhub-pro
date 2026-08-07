# S6029 · Tree Shaking and Module Design

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Modules  

## Question

How to structure exports so bundlers can eliminate unused code.

## Expected Answer

Tree shaking removes unused exports from the final bundle by statically analyzing ESM import/graphs, which only works reliably with side-effect-free, ESM-authored modules.

## Deep Explanation

Tree shaking is dead-code elimination performed by bundlers (Rollup, Webpack, esbuild) that statically analyzes ESM `import`/`export` graphs to strip exports that are never actually used, shrinking the final bundle. It relies on ESM's static, side-effect-analyzable structure — the bundler must be able to prove that removing an has no observable effect.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Tree Shaking and Module Design.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Barrel files (`* from './x'` re-index files) and modules with top-level side effects (e.g. `console.log()` or global CSS imports at module scope) are the two most common things that defeat tree shaking — a `sideEffects: false` flag in package.json and avoiding broad barrel re-exports are standard senior-level fixes for bloated bundles.

## Related Topics

- JavaScript Fundamentals
