# S6126 · Method Overriding in JavaScript Classes

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Advanced OOP  

## Question

A subclass redefining a method it inherits from its parent class.

## Expected Answer

A subclass method with the same name as a parent method overrides it for that subclass's instances, with the parent version still reachable through super.methodName().

## Deep Explanation

When a subclass defines a method with the same name as one on its parent class, the subclass's version takes priority for instances of the subclass — this is method overriding, resolved through the prototype chain at call time (the engine finds the closest matching method walking up from the instance). The original parent implementation is still accessible via `super.methodName()`.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Method Overriding in JavaScript Classes.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Unlike some statically-typed OOP languages, JavaScript performs no signature checking when overriding — a subclass can override a method with a completely different number/type of parameters with no compiler warning, which is exactly the kind of contract violation TypeScript's type system exists to catch.

## Related Topics

- JavaScript Fundamentals
