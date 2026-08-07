# S6065 · Proxy Object Fundamentals

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Meta-programming  

## Question

Intercepting and customizing fundamental operations on an object using Proxy.

## Expected Answer

Proxy wraps an object and lets you intercept fundamental operations (get, set, has, delete, etc.) via trap functions defined on a handler object.

## Deep Explanation

`new Proxy(target, handler)` creates a wrapper around `target` where the `handler` object's 'traps' (like `get`, `set`, `has`, `deleteProperty`) intercept and can customize fundamental operations performed on the proxy — reading a property, assigning one, checking `in`, deleting a key — before optionally forwarding to the real target via `Reflect`.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Proxy Object Fundamentals.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Proxy is the mechanism Vue 3's reactivity system is built on — instead of Vue 2's `Object.defineProperty`-based getter/setter injection (which couldn't detect new property additions or array index assignments), a Proxy's `get`/`set` traps transparently observe *any* property access, including ones added after the object was created.

## Related Topics

- JavaScript Fundamentals
