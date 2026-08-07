# S6066 · Reflect API

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Meta-programming  

## Question

A built-in object providing default, spec-compliant implementations for the same operations Proxy traps intercept.

## Expected Answer

Reflect provides method equivalents of the low-level object operations Proxy traps intercept, and is the recommended way to forward those operations to the original target inside a trap.

## Deep Explanation

`Reflect` is a built-in object whose methods (`Reflect.get`, `Reflect.set`, `Reflect.has`, `Reflect.deleteProperty`, etc.) mirror the internal operations that Proxy traps intercept, exposing them as regular callable functions. It exists mainly as the correct way to forward a trapped operation to the original target from inside a Proxy handler, guaranteeing spec-correct default behavior.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Reflect API.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Using `target[prop] = value` instead of `Reflect.set(target, prop, value, receiver)` inside a Proxy `set` trap subtly breaks correctness for inherited proxies (where `this`/`receiver` differs from `target`) — `Reflect` methods correctly propagate the `receiver`, which manual property access does not.

## Related Topics

- JavaScript Fundamentals
