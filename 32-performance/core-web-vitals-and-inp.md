# T106 · Web Performance: Core Web Vitals & INP Optimization

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Shopify, Flipkart  
**Interview Frequency:** ★★★★★  
**Category:** Performance  
**Concepts:** LCP, INP, CLS, long tasks, main thread optimization  

## Question

What are Core Web Vitals (LCP, INP, CLS), and specifically how do you optimize Interaction to Next Paint (INP) for complex React applications?

## Expected Answer

Core Web Vitals are Google’s three standardized metrics for user experience: LCP (Largest Contentful Paint - loading speed <2.5s), INP (Interaction to Next Paint - responsiveness <200ms), and CLS (Cumulative Layout Shift - visual stability <0.1). INP measures the latency of user interactions (clicks, taps, keypresses) until visual feedback occurs. Optimizing INP requires breaking up long tasks (>50ms) on the main thread, deferring non-urgent rendering with `startTransition`, and yielding to the main thread with `scheduler.yield()`.

## Deep Explanation

INP consists of 3 phases:
1. **Input Delay**: Time between user hardware event and main thread event handler execution. Minimizing event handler backlog reduces this.
2. **Processing Time**: Time spent executing JavaScript event handlers. Avoid heavy synchronous loops or huge React re-renders here.
3. **Presentation Delay**: Time taken by the browser to recalculate style, layout, and paint the next frame.

Techniques to reduce INP:
- Split heavy JS tasks using `scheduler.yield()` or `setTimeout(..., 0)`.
- Use `startTransition` to mark non-blocking updates.
- Avoid layout thrashing (interleaved DOM reads and writes).

## Production Example

In a search input filtering 10,000 table rows, updating the input value immediately while wrapping the table filtering state update in `startTransition` allows the typed character to paint instantaneously (<50ms INP), while the heavy table re-render processes concurrently in the background.

## Best Practices

- Measure real-user monitoring (RUM) INP using the `web-vitals` JS library.
- Use explicit width and height attributes on images and containers to prevent CLS.
- Preload LCP hero images using `<link rel="preload">`.

## Trade-offs

Splitting heavy tasks into micro-yields improves responsiveness (INP), but slightly increases overall total wall-clock execution time due to scheduling overhead.

## Common Mistakes

- Confusing FID (First Input Delay - retired) with INP (Interaction to Next Paint - current standard).
- Testing performance only on high-end developer M-series MacBooks instead of throttled low-end mobile devices.

## Follow-up Questions

1. How does `scheduler.yield()` differ from `setTimeout(..., 0)` for main-thread yielding?
2. What causes Cumulative Layout Shift during dynamic font loading?

## Related Topics

- Performance Profiling
- Web Vitals
- Code Splitting
