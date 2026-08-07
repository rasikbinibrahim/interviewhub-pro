# S6060 · Pub/Sub Pattern (Concept)

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Design Patterns  

## Question

Decoupling publishers and subscribers through a shared event broker/channel.

## Expected Answer

Pub/Sub routes events through a shared broker by name, so publishers and subscribers never hold direct references to each other, unlike the more tightly-coupled Observer pattern.

## Deep Explanation

Publish/Subscribe is similar to Observer but adds a layer of indirection — publishers emit named events to a shared broker (event bus/emitter), and subscribers register interest in event names on that same broker, without publishers and subscribers ever referencing each other directly. This is looser coupling than Observer, where the subject holds direct references to its observers.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Pub/Sub Pattern (Concept).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. In frontend architecture, Pub/Sub is the standard way to let unrelated features communicate (e.g. a 'cart' module and a 'notifications' module) without creating a direct import dependency between them — critical for micro-frontend or plugin-based architectures where modules must stay independently deployable.

## Related Topics

- JavaScript Fundamentals
