# S6058 · Custom Events (CustomEvent API)

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Event Handling  

## Question

Dispatching your own application-specific events on DOM elements.

## Expected Answer

CustomEvent lets you create and dispatch application-specific events (with custom data in event.detail) using the browser's native DOM event system.

## Deep Explanation

`new CustomEvent(name, { detail, bubbles })` creates an event carrying arbitrary application data in `event.detail`, which can then be dispatched on any DOM node with `element.dispatchEvent(event)` and listened for with the normal `addEventListener`. This lets decoupled parts of a UI communicate through the DOM's native event system instead of a custom pub/sub layer.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Custom Events (CustomEvent API).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Setting `bubbles: true` lets a custom event be caught via delegation on an ancestor, making it a genuinely useful lightweight cross-component communication channel in vanilla-JS widgets or Web Components, without needing to reach for an external event bus library.

## Related Topics

- JavaScript Fundamentals
