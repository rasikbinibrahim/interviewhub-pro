# S6127 · The super Keyword: Mechanics

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Advanced OOP  

## Question

How super works differently in constructors versus regular methods.

## Expected Answer

super(...) in a constructor calls the parent constructor and must run before `this` is used; super.method() in a regular method calls the parent's version of that method with `this` still bound to the current instance.

## Deep Explanation

Inside a subclass constructor, `super(...)` must be called before accessing `this`, and it invokes the parent class's constructor, initializing the inherited portion of the instance. Inside a regular method, `super.methodName()` looks up and calls the parent class's version of that method with `this` still correctly bound to the current instance, not the parent.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying The super Keyword: Mechanics.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Forgetting `super()` in a subclass constructor that accesses `this` throws a ReferenceError ('Must call super before accessing this') — this isn't a style preference, it's a hard runtime requirement, because `this` is genuinely uninitialized in a derived class constructor until the parent constructor has run.

## Related Topics

- JavaScript Fundamentals
