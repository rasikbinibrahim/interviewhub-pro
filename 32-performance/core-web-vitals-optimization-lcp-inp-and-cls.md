# QPERF019 · Core Web Vitals Optimization: LCP, INP, and CLS

**Difficulty:** Hard  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Google, Meta, Amazon, Shopify, Walmart  
**Interview Frequency:** ★★★★★  
**Category:** Performance  
**Concepts:** Core Web Vitals, LCP (Largest Contentful Paint), INP (Interaction to Next Paint), CLS (Cumulative Layout Shift)  

## Expected Answer

Core Web Vitals measure real-world user experience across loading (LCP < 2.5s), interactivity (INP < 200ms), and visual stability (CLS < 0.1). Optimizing these metrics requires prioritizing critical hero assets, breaking up long main-thread tasks, and reserving layout dimensions.

## Deep Explanation

LCP measures when the largest visual element renders; optimize via preloading hero images and removing render-blocking CSS. INP replaces FID, measuring latency across all user interactions during page lifecycle; optimize by splitting long tasks (>50ms) using yieldToMain/scheduler.yield(). CLS measures unexpected layout movements; fix by explicitly defining width/height attributes on images and ad containers.

## Production Example

Injecting dynamic top banners without height reservations pushes page content down, causing massive CLS penalties and poor search ranking.

## Best Practices

- Preload the LCP image using <link rel="preload"> and fetchpriority="high"
- Reserve explicit aspect-ratio or CSS container space for dynamic images/embeds
- Break up heavy JS loops using yieldToMain() to keep INP under 200ms

## Trade-offs

- Preloading LCP assets consumes early network bandwidth
- Reserving layout slots requires upfront design geometry decisions

## Common Mistakes

- Lazy-loading the hero image (loading="lazy" on LCP element severely hurts LCP)
- Executing synchronous heavy calculations inside click or keydown handlers

## Follow-up Questions

1. How does the Long Animation Frame (LoAF) API help diagnose INP latency sources in production?
2. Why did Google replace First Input Delay (FID) with Interaction to Next Paint (INP)?

## Related Topics

- Performance Optimization
- Browser Internals
