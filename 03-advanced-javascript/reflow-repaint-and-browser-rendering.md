# T302 · Reflow vs Repaint: DOM Batching & Composite Layers

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Apple, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Advanced JavaScript  
**Concepts:** browser-rendering, reflow, repaint, layout-thrashing, composite-layers, web-performance  

## Question

What is the difference between Reflow (Layout) and Repaint in the browser rendering pipeline, what specific DOM read operations trigger Forced Synchronous Layout (Layout Thrashing), and how do hardware-accelerated CSS Composite Layers (`transform`, `opacity`, `will-change`) maintain 60fps / 120fps smooth animations?

## Expected Answer

1. **Reflow vs Repaint**:
   - **Reflow (Layout)**: Occurs when changes affect document geometry (width, height, margin, position, font-size, adding/removing DOM nodes). Browser recalculates positions and geometry of all affected elements. High CPU cost.
   - **Repaint**: Occurs when visual changes do not alter element geometry (background-color, visibility, color, outline). Browser redraws pixels on screen without recalculating layout. Moderate GPU/CPU cost.
   - **Composite Only**: Changes to GPU-promoted layer properties (`transform`, `opacity`, `filter`). Bypasses both Reflow and Repaint entirely, executing on GPU.
2. **Forced Synchronous Layout (Layout Thrashing)**: Happens when JavaScript writes to the DOM (e.g. `element.style.width = '100px'`) and immediately reads geometry (e.g. `element.offsetWidth`) in a loop. To return the exact value, the browser is forced to flush pending style changes and execute an instant synchronous Reflow inside the loop.

## Deep Explanation

### 1. Browser Rendering Pipeline Steps

```
[JS / CSS Animations] -> [Style Recalculation] -> [Layout (Reflow)] -> [Paint (Repaint)] -> [Composite Layers]
```

### 2. High-Risk Geometry Read Properties (Triggers Reflow)
Reading any of the following properties forces the browser to flush pending rendering queues and execute a Reflow:
- `element.offsetWidth`, `element.offsetHeight`, `element.offsetTop`, `element.offsetLeft`
- `element.clientWidth`, `element.clientHeight`
- `element.scrollTop`, `element.scrollLeft`, `element.scrollHeight`, `element.scrollWidth`
- `window.getComputedStyle(element)`
- `element.getBoundingClientRect()`

## Production Example

```javascript
// ANTIPATTERN: Layout Thrashing (Forces 100 Synchronous Reflows)
function updateWidthsBad(elements) {
  for (let i = 0; i < elements.length; i++) {
    // Write followed by Read in loop!
    const width = elements[i].offsetWidth; // Read -> Forces Reflow!
    elements[i].style.width = width + 10 + 'px'; // Write
  }
}

// PATTERN: Batched Reads then Batched Writes (Single Reflow)
function updateWidthsGood(elements) {
  // Step 1: Batch all Read operations
  const widths = elements.map((el) => el.offsetWidth);

  // Step 2: Batch all Write operations
  elements.forEach((el, index) => {
    el.style.width = widths[index] + 10 + 'px';
  });
}

// OPTIMAL PATTERN: GPU Compositor Layer Animation
// CSS:
// .animated-card {
//   will-change: transform, opacity;
//   transition: transform 300ms ease, opacity 300ms ease;
// }
// .animated-card:hover {
//   transform: translate3d(0, -10px, 0) scale(1.05); /* Bypasses Reflow & Repaint */
// }
```

## Best Practices

- Batch DOM reads and DOM writes separately using `window.requestAnimationFrame()` or FastDOM.
- Promote frequently animated elements (modals, sidebars, carousels) to separate GPU Composite Layers using `will-change: transform` or `transform: translateZ(0)`.
- Use `opacity` and `transform` for animations instead of animating `top`, `left`, `width`, or `height`.

## Common Mistakes

- Animating layout properties (`left`, `top`, `margin`) directly in CSS transitions, triggering Reflow on every animation frame (16.6ms).
- Over-using `will-change` on hundreds of elements, overloading GPU memory and slowing down browser rendering.

## Follow-up Questions

1. How do OffscreenCanvas and Web Workers help prevent main-thread layout thrashing during heavy graphics calculations?
2. What is the difference between `requestAnimationFrame` and `requestIdleCallback`?

## Related Topics

- Critical Rendering Path: HTML Parsing to Paint
- DOM MutationObserver, ResizeObserver & IntersectionObserver
