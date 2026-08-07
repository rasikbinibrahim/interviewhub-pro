# S6125 · Simulating Abstract Classes in JavaScript

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Advanced OOP  

## Question

JS has no native 'abstract class' keyword — how to enforce the pattern manually.

## Expected Answer

JavaScript simulates abstract classes by throwing in the constructor if the base class is instantiated directly (checking new.target) and having placeholder methods throw unless a subclass overrides them.

## Deep Explanation

JavaScript classes have no built-in `abstract` modifier, so an 'abstract base class' is simulated by checking `new.target` (or `this.constructor`) in the base constructor to throw an error if the base class is instantiated directly, and by defining methods that throw 'not implemented' errors, forcing subclasses to override them.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Simulating Abstract Classes in JavaScript.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. TypeScript has a real `abstract` keyword that enforces this at compile time with zero runtime cost, which is one concrete, practical reason many senior engineers prefer TypeScript for larger OOP-heavy codebases — the abstract-class contract stops being a runtime convention and becomes a build-time guarantee.

## Related Topics

- JavaScript Fundamentals
