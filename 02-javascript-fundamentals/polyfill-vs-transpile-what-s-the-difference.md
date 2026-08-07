# S6097 · Polyfill vs Transpile: What's the Difference

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Polyfills  

## Question

Two distinct strategies for supporting older browsers/environments.

## Expected Answer

Polyfills add missing runtime features/APIs in JS; transpilers rewrite new syntax into older, equivalent syntax at build time — they solve different problems and are typically used together.

## Deep Explanation

A polyfill adds a missing *runtime feature* (a function/API that doesn't exist yet, like `Array.prototype.flat` or `fetch`) by defining it in JavaScript. Transpiling converts new *syntax* (arrow functions, optional chaining, class fields) that an older parser can't even understand into equivalent older syntax, at build time — Babel is the standard transpiler, `core-js` is the standard polyfill library.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Polyfill vs Transpile: What's the Difference.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. A common mistake is assuming Babel alone provides full legacy support — Babel only handles syntax transformation; without also including `core-js` polyfills (or `@babel/preset-env`'s `useBuiltIns` option), code using `Promise`, `Array.prototype.includes`, or `fetch` will still throw a runtime error on older browsers, since the syntax was transpiled but the API was never actually added.

## Related Topics

- JavaScript Fundamentals
