# T3204 · Core Web Vitals Optimization: INP (Interaction to Next Paint), LCP & CLS

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Netflix, Uber, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** Performance  
**Concepts:** web-vitals, inp, lcp, cls, performance-optimization, page-speed  

## Question

What are Google's 3 Core Web Vitals metrics — **Interaction to Next Paint (INP)**, **Largest Contentful Paint (LCP)**, and **Cumulative Layout Shift (CLS)** — how are their threshold boundaries defined, and what architectural engineering techniques resolve high INP lag, slow LCP image loads, and unexpected CLS layout shifts?

## Expected Answer

1. **The 3 Core Web Vitals Metrics**:
   - **INP (Interaction to Next Paint)**: Measures user interface responsiveness during the **entire page lifecycle**. Tracks latency between user interactions (tap, click, key press) and visual frame updates. Good threshold: **<= 200 ms**.
   - **LCP (Largest Contentful Paint)**: Measures perception of loading speed. Tracks when the main content element (hero image, heading) becomes visible. Good threshold: **<= 2.5 seconds**.
   - **CLS (Cumulative Layout Shift)**: Measures visual stability. Tracks unexpected layout shifts of visible elements. Good threshold: **<= 0.1**.

## Deep Explanation

### Core Web Vitals Optimization Matrix

```
  Metric    Good Target               Main Causes                            Engineering Fixes
 ───────   ─────────────   ─────────────────────────────────   ────────────────────────────────────────────
  INP      <= 200 ms       Long Tasks (>50ms) blocking CPU     Break Long Tasks via scheduler.yield()
  LCP      <= 2.5 s        Render-blocking CSS/JS, slow assets Preload hero image, fetchpriority="high"
  CLS      <= 0.1          Un-sized images, injected ads       Set explicit width/height & aspect-ratio
```

## Production Example

```javascript
// 1. Fixing INP: Breaking Long Tasks using scheduler.yield() or setTimeout
async function processHeavyDataInChunks(items) {
  for (let i = 0; i < items.length; i++) {
    doWork(items[i]);

    // Yield control back to main thread every 50 items to keep INP < 200ms!
    if (i % 50 === 0) {
      if ('scheduler' in window && 'yield' in window.scheduler) {
        await window.scheduler.yield(); // Native Task Yielding (Modern Browsers)
      } else {
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }
  }
}
```

```html
<!-- 2. Fixing LCP: Preload and Priority Hints for Hero Image -->
<link rel="preload" href="/hero-banner.avif" as="image" type="image/avif" fetchpriority="high">
<img src="/hero-banner.avif" alt="Hero" fetchpriority="high" width="1200" height="600" />

<!-- 3. Fixing CLS: Reserve Aspect Ratio Space for Dynamic Ads/Images -->
<style>
  .ad-slot-container {
    width: 100%;
    aspect-ratio: 16 / 9; /* Prevents CLS shift when ad populates asynchronously! */
    contain: layout;
  }
</style>
```

## Best Practices

- Break JavaScript execution blocks exceeding 50ms (Long Tasks) using `scheduler.yield()` to maintain responsive INP under 200ms.
- Always declare explicit `width` and `height` attributes or CSS `aspect-ratio` on images, embeds, and dynamic ad containers to eliminate CLS layout jumps completely.

## Common Mistakes

- Applying `loading="lazy"` to above-the-fold hero images, which delays LCP image downloads significantly. Above-the-fold LCP assets should always use `fetchpriority="high"`.

## Follow-up Questions

1. How does the Long Animation Frame API (`LoAF`) identify specific slow JavaScript scripts causing high INP frame delays?

## Related Topics

- Critical Rendering Path & Resource Hints
- Browser Caching, Service Workers & Progressive Web Apps (PWA)
