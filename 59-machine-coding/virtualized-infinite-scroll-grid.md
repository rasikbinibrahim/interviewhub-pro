# T108 · Machine Coding: Virtualized Infinite Scroll Grid

**Difficulty:** Hard  
**Companies Asked:** Meta, LinkedIn, Airbnb, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Machine Coding  
**Concepts:** DOM virtualization, IntersectionObserver, resize observer, bounding box  

## Question

Explain how to design and code a custom Windowed Virtualized Grid component from scratch without third-party libraries.

## Expected Answer

A virtualized grid maintains a total scroll container height equal to `totalRows * rowHeight`, while rendering only the subset of rows currently visible inside the viewport plus a small buffer (overscan). As the user scrolls, `scrollTop` is measured to compute `startIndex = Math.floor(scrollTop / rowHeight)` and `endIndex = startIndex + visibleCount`. Visible items are rendered inside an absolutely positioned or CSS-transformed wrapper.

## Deep Explanation

Mathematical Model:
- `containerHeight`: height of visible viewport (e.g. 600px)
- `rowHeight`: fixed height per row (e.g. 50px)
- `visibleCount`: `Math.ceil(containerHeight / rowHeight)` = 12
- `bufferCount`: 3 (overscan rows above and below to prevent white flickers during fast scrolling)
- `startIndex`: `Math.max(0, Math.floor(scrollTop / rowHeight) - bufferCount)`
- `endIndex`: `Math.min(totalItems, startIndex + visibleCount + 2 * bufferCount)`
- `offsetY`: `startIndex * rowHeight` (applied as `transform: translateY(${offsetY}px)`)

## Production Example

Feeds in LinkedIn or Instagram use virtualization to maintain 60fps scrolling over thousands of items by reusing a fixed pool of ~15-20 DOM nodes instead of creating 10,000 DOM nodes that consume gigabytes of memory.

## Best Practices

- Use CSS `transform: translate3d(0, offsetY, 0)` instead of `top` to keep scrolling on the GPU compositor layer.
- Use ResizeObserver to dynamically update container height when the browser window resizes.
- Pass passive scroll event listeners (`{ passive: true }`) to prevent main-thread scroll blocking.

## Trade-offs

Fixed row height virtualization is lightweight ($O(1)$ calculations), while variable dynamic row height requires measuring rendered DOM elements and maintaining a prefix sum array of node heights.

## Common Mistakes

- Re-rendering the entire list on every single scroll pixel without throttling or Math.floor bucket checks.
- Omitting overscan buffers, resulting in visible empty white bars during rapid touch scrolling.

## Follow-up Questions

1. How do you extend this fixed-height virtualization model to handle dynamic variable-height items?
2. How does IntersectionObserver simplify infinite pagination compared to scroll listeners?

## Related Topics

- React Window
- DOM Optimization
- IntersectionObserver
