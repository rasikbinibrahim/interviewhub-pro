# S6059 · Observer Pattern (Concept)

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Design Patterns  

## Question

Subjects notifying a list of subscribed observers whenever their state changes.

## Expected Answer

In the Observer pattern, a subject maintains a list of dependent observers and automatically notifies all of them whenever its state changes.

## Deep Explanation

The Observer pattern defines a one-to-many dependency: a 'subject' maintains a list of 'observer' callbacks and notifies all of them automatically whenever its internal state changes. Observers subscribe/unsubscribe without the subject needing to know anything about who they are.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Observer Pattern (Concept).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This is the conceptual foundation of both DOM events (`addEventListener` is literally the Observer pattern) and reactive state libraries (RxJS Subjects, MobX observables) — recognizing that connection is often the actual point of the interview question, not just reciting the GoF definition.

## Related Topics

- JavaScript Fundamentals
