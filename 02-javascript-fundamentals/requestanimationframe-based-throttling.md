# S6054 · requestAnimationFrame-based Throttling

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Performance Patterns  

## Question

Syncing high-frequency event handling to the browser's paint cycle instead of a fixed timer.

## Expected Answer

rAF-based throttling schedules a handler to run once per browser repaint via requestAnimationFrame, instead of an arbitrary fixed millisecond interval.

## Deep Explanation

Instead of throttling with a fixed millisecond interval via setTimeout, rAF-based throttling schedules the handler with `requestAnimationFrame`, which runs right before the browser's next repaint (typically ~16.6ms at 60fps). This ensures visual updates (like following mousemove for a custom cursor) never run more often than the screen can actually display, avoiding wasted work.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying requestAnimationFrame-based Throttling.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. This technique automatically adapts to the device's actual refresh rate (60Hz, 120Hz, or throttled when the tab is backgrounded) and is paused entirely when the tab isn't visible, which a naive setInterval/setTimeout-based throttle doesn't do — making it the correct choice for visual/animation-driven updates specifically.

## Related Topics

- JavaScript Fundamentals
