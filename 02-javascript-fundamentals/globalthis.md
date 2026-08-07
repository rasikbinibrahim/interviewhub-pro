# S6108 · globalThis

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Modern Syntax  

## Question

A standardized way to access the global object across every JavaScript environment.

## Expected Answer

globalThis is a single, standardized reference to the global object that works consistently across browsers, Web Workers, and Node.js, replacing the need for environment-specific checks like window/self/global.

## Deep Explanation

Before `globalThis`, accessing the global object required different syntax per environment — `window` in browsers, `self` in workers, `global` in Node.js, and none of these existed universally. `globalThis` is a standardized ES2020 property that always refers to the global object, regardless of which environment the code is running in.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying globalThis.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This matters most for isomorphic libraries that must run identically in Node and the browser — code that previously needed `typeof window !== 'undefined' ? window : global` feature-detection boilerplate can now just reference `globalThis` directly and trust it resolves correctly everywhere.

## Related Topics

- JavaScript Fundamentals
