# S6053 · Debounce vs Throttle: When to Use Which

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Performance Patterns  

## Question

Choosing the right rate-limiting strategy for a given UI interaction.

## Expected Answer

Use debounce when you only need the result after activity stops (search input); use throttle when you need regular updates while activity is still happening (scroll, drag).

## Deep Explanation

Debounce is right when you only care about the *final* state after activity stops — search input, form validation, window resize 'settle' handlers. Throttle is right when you need *periodic* feedback during ongoing activity — infinite scroll position checks, drag-to-resize previews, mousemove-based tooltips, or rate-limiting button clicks.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Debounce vs Throttle: When to Use Which.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. A common production bug is using debounce for infinite scroll — because the user keeps scrolling continuously, the debounced handler may never fire until they stop, which feels laggy; throttle is the correct choice there since it fires periodically during continuous scrolling.

## Related Topics

- JavaScript Fundamentals
