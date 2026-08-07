# QCSS005 · Stacking Context and z-index Stacking Rules

**Difficulty:** Hard  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Amazon, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** CSS  
**Concepts:** Stacking context, z-index, Compositing, opacity, transform, isolation  

## Expected Answer

A Stacking Context is a 3D conceptual layering of HTML elements along the Z-axis relative to the user. An element’s z-index value only applies within its parent stacking context. New stacking contexts are created by properties like position (with z-index), opacity < 1, transform, filter, and isolation: isolate.

## Deep Explanation

Elements without explicit z-index values stack in DOM order. When an element creates a new stacking context, all descendant elements are grouped inside that context. No child element can break out of its parent stacking context to render behind or above external elements that out-rank the parent context.

## Production Example

A dropdown menu inside a sticky header with overflow: hidden or transform fails to render over page contents because transform created an isolated stacking context.

## Best Practices

- Use isolation: isolate to explicitly create clean, predictable stacking contexts
- Avoid arbitrary large z-index values (e.g. z-index: 999999) across application stylesheets

## Trade-offs

- Creating many stacking contexts increases GPU layer creation overhead
- Deeply nested stacking contexts make global modal overlay placement tricky without portals

## Common Mistakes

- Assuming setting z-index: 9999 on a child will force it above an element whose parent has a higher z-index
- Not realizing CSS properties like opacity < 1 or filter create new stacking contexts

## Follow-up Questions

1. How does the CSS isolation property simplify component design token z-index management?
2. What is the relationship between stacking contexts and GPU hardware compositing layers?

## Related Topics

- CSS Architecture
- Browser Rendering Pipeline
