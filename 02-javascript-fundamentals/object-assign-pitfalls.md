# S6082 · Object.assign() Pitfalls

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Object Internals  

## Question

Common mistakes when merging objects with Object.assign — mutation and shallow merging.

## Expected Answer

Object.assign() mutates its first argument in place (pass {} to avoid corrupting an existing object) and only shallow-merges, so nested keys are overwritten wholesale, not merged.

## Deep Explanation

`Object.assign(target, ...sources)` copies enumerable own properties from each source into `target`, mutating and returning `target` itself. The two common pitfalls are: (1) forgetting `target` is mutated in place — passing an existing object instead of `{}` silently corrupts it — and (2) it only performs a shallow merge, so nested objects with the same key are fully overwritten, not deeply merged.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Object.assign() Pitfalls.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. The 'forgot to pass an empty target' bug is subtle because it doesn't throw — `Object.assign(defaults, overrides)` silently mutates the shared `defaults` object, which can then leak stale overridden values into the *next* unrelated call that reuses `defaults`, a classic hard-to-trace production bug.

## Related Topics

- JavaScript Fundamentals
