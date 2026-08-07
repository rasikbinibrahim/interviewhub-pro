# S6056 · Event Bubbling vs Capturing

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Event Handling  

## Question

The two phases a DOM event travels through: down to the target, then back up.

## Expected Answer

Events travel down from the root to the target in the capturing phase, then back up to the root in the bubbling phase; listeners default to the bubbling phase unless { capture: true } is set.

## Deep Explanation

A DOM event fires in three phases: capturing (from `window` down to the target element), target (on the element itself), then bubbling (back up from the target to `window`). By default, `addEventListener` listens during the bubbling phase; passing `{ capture: true }` as the third argument listens during the capturing phase instead.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Event Bubbling vs Capturing.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Capturing-phase listeners are useful for intercepting an event *before* it reaches a child that might call `stopPropagation()` — e.g. a top-level analytics click tracker registered with `{ capture: true }` will still fire even if a deeply nested button stops the event from bubbling further.

## Related Topics

- JavaScript Fundamentals
