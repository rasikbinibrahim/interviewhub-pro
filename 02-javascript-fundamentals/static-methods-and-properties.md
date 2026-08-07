# S6019 · Static Methods and Properties

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Prototypes & OOP  

## Question

Members that live on the class itself rather than on instances.

## Expected Answer

static members belong to the class itself, not to instances, and are typically used for factory methods or class-level utilities/constants.

## Deep Explanation

The `static` keyword attaches a method or property directly to the class/constructor function, not to `prototype`. Static members are called on the class itself (`ClassName.method()`) and are not accessible on instances, making them ideal for utility/factory functions related to the class but not tied to a specific instance's state.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Static Methods and Properties.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Static members participate in inheritance too — a subclass can call an inherited static method via `Subclass.staticMethod()`, and `this` inside a static method refers to the class that was used to invoke it (useful for static factory methods that must work correctly across subclasses).

## Related Topics

- JavaScript Fundamentals
