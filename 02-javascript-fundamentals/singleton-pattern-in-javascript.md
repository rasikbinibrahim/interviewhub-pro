# S6061 · Singleton Pattern in JavaScript

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Design Patterns  

## Question

Ensuring a class or module has exactly one shared instance across the app.

## Expected Answer

A Singleton restricts a class to a single shared instance; in JavaScript, this is usually achieved simply by exporting a pre-instantiated object from an ES module, since modules are cached and shared.

## Deep Explanation

A Singleton guarantees only one instance of a class ever exists, typically by caching the instance on first creation and returning that same cached instance on subsequent construction attempts. In JavaScript, ES modules already provide this naturally — a module's top-level exported object is instantiated once and shared by every importer, no special class pattern required.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Singleton Pattern in JavaScript.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Overusing singletons for mutable application state (a shared config or cache object) can make testing painful, since state persists across otherwise-independent test cases unless explicitly reset — many teams avoid the pattern for exactly this reason and prefer dependency injection instead.

## Related Topics

- JavaScript Fundamentals
