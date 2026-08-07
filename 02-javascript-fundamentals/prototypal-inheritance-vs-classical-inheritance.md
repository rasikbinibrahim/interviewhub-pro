# S6018 · Prototypal Inheritance vs Classical Inheritance

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Prototypes & OOP  

## Question

How JS's object-to-object delegation model differs from class-based inheritance in languages like Java.

## Expected Answer

Classical inheritance copies behavior from classes into instances; prototypal inheritance delegates property lookups between live objects at runtime.

## Deep Explanation

Classical inheritance (Java, C++) copies behavior from a class blueprint into instances at creation time, forming a rigid class hierarchy. JavaScript's prototypal inheritance instead links objects directly to other *objects* via the [[Prototype]] chain — property lookups delegate up the chain at access time, and any object can serve as a prototype for another, dynamically.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Prototypal Inheritance vs Classical Inheritance.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. ES6 `class` syntax is syntactic sugar over the exact same prototype chain — `class Dog extends Animal` still produces `Dog.prototype.__proto__ === Animal.prototype` under the hood, so understanding prototypes is still required to reason about `class` behavior correctly (e.g. static inheritance, method resolution order).

## Related Topics

- JavaScript Fundamentals
