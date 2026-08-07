# S6055 · Event Delegation

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Event Handling  

## Question

Attaching a single listener to a parent element to handle events from many children.

## Expected Answer

Event delegation attaches one listener to a parent and uses event.target to identify which child triggered it, instead of binding a listener to every child individually.

## Deep Explanation

Event delegation relies on event bubbling — instead of attaching a listener to every individual child element, you attach one listener to a common ancestor and inspect `event.target` to determine which child actually triggered it. This scales efficiently to dynamically added children (no re-binding needed) and drastically reduces the number of listeners in the DOM.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Event Delegation.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This is essential for lists that render/re-render dynamically (e.g. a virtualized table or infinite-scroll list) — binding per-row listeners means constantly adding/removing handlers as rows mount/unmount, while delegation on the container needs to be set up exactly once, regardless of how many rows come and go.

## Related Topics

- JavaScript Fundamentals
