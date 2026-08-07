# S5030 · Reflow vs Repaint

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** JavaScript  

## Question

Interview questions and core concepts related to Reflow vs Repaint under JavaScript (Hard).

## Expected Answer

Interview questions and core concepts related to Reflow vs Repaint under JavaScript (Hard).

## Deep Explanation

Reflow (or Layout) is the calculation of geometries and positions of elements, triggered by modifications to layout-affecting properties (width, height, display, padding, margins, font size). Repaint is drawing updated pixels onto the screen, triggered by cosmetic properties (color, background-color, visibility) without layout changes. Reflow is significantly more expensive than Repaint.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Reflow vs Repaint.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Be aware of runtime engine optimizations and edge cases.

## Related Topics

- JavaScript Fundamentals
