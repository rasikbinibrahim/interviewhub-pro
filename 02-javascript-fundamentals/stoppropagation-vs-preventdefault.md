# S6057 · stopPropagation vs preventDefault

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Event Handling  

## Question

Two distinct event methods that are frequently confused.

## Expected Answer

stopPropagation() stops the event from reaching other listeners up (or down) the DOM tree; preventDefault() cancels the browser's built-in default action, and neither implies the other.

## Deep Explanation

`event.stopPropagation()` prevents the event from continuing to bubble (or capture) to ancestor elements, but does not stop the browser's default action for that element. `event.preventDefault()` cancels the browser's default behavior for the event (like following a link or submitting a form), but does not stop the event from still propagating to parent listeners.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying stopPropagation vs preventDefault.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. A common bug is calling `stopPropagation()` when the intent was actually `preventDefault()` (e.g. trying to stop a form from submitting) — that leaves the default browser action untouched while breaking unrelated delegated listeners on ancestor elements that legitimately needed to observe the event.

## Related Topics

- JavaScript Fundamentals
