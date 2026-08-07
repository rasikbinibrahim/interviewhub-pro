# S6015 · What Really Happens with the new Keyword

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** this, bind, call & apply  

## Question

The four steps the engine performs when a function is invoked with `new`.

## Expected Answer

`new` creates an object linked to the constructor's prototype, runs the constructor with `this` set to it, and returns that object unless the constructor returns another object itself.

## Deep Explanation

Calling `new Fn()` does four things in order: (1) creates a brand-new plain object, (2) sets that object's internal [[Prototype]] to Fn.prototype, (3) invokes Fn with `this` bound to the new object, and (4) returns the new object automatically — unless Fn explicitly returns its own object, in which case that object is returned instead.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying What Really Happens with the new Keyword.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. If a constructor returns a primitive (string, number, etc.), that return value is ignored and the newly created object is returned anyway — only an explicit object return value overrides the default `this`.

## Related Topics

- JavaScript Fundamentals
