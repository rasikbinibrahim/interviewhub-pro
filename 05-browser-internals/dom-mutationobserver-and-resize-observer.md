# T502 · DOM MutationObserver, ResizeObserver & IntersectionObserver

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Uber  
**Interview Frequency:** ★★★★☆  
**Category:** Browser Internals  
**Concepts:** browser-internals, web-apis, mutation-observer, resize-observer, intersection-observer  

## Question

What performance problems occur when polling element dimensions or DOM tree mutations with traditional scroll/resize event listeners, and how do modern browser Observer APIs (`IntersectionObserver`, `ResizeObserver`, `MutationObserver`) batch callbacks asynchronously without causing layout thrashing?

## Expected Answer

1. **Traditional Polling Issues**: Attaching sync event listeners to `window.onscroll` or `window.onresize` fires dozens of times per second. Querying element geometry properties (`offsetWidth`, `getBoundingClientRect()`) inside sync scroll handlers causes **Layout Thrashing (Forced Synchronous Reflow)**, freezing main thread rendering.
2. **Observer APIs**:
   - **`IntersectionObserver`**: Asynchronously tracks when an element enters or exits the browser viewport or parent container. Ideal for lazy-loading images, infinite scroll triggers, and ad impressions.
   - **`ResizeObserver`**: Asynchronously monitors element content box or border box size changes (e.g. dynamic container resizes) without polling.
   - **`MutationObserver`**: Asynchronously observes DOM tree additions, removals, attribute modifications, and text node mutations, batching microtask callbacks.

## Deep Explanation

### 1. Observer Comparison Matrix

| API | Triggers On | Typical Use Case | Performance Benefit |
|---|---|---|---|
| **`IntersectionObserver`** | Element visibility threshold relative to viewport/root | Lazy loading, infinite scroll, ad tracking | Zero main-thread polling; offloaded to browser compositor |
| **`ResizeObserver`** | Element `contentBoxSize` or `borderBoxSize` changes | Container queries, virtualized lists, responsive charts | Eliminates global window resize polling |
| **`MutationObserver`** | DOM subtree, attribute, or character data mutations | Rich text editors, third-party script detection, DOM sanitizers | Microtask batching prevents layout thrashing |

## Production Example

```typescript
import { useEffect, useRef } from 'react';

// Custom Hook for Infinite Scroll using IntersectionObserver
export function useInfiniteScroll(onLoadMore: () => void, hasMore: boolean, isLoading: boolean) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sentinelRef.current || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      {
        root: null, // Viewport root
        rootMargin: '200px', // Trigger 200px BEFORE element reaches viewport
        threshold: 0.1,
      }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [onLoadMore, hasMore, isLoading]);

  return sentinelRef;
}

// Custom Hook for Component Resize Tracking using ResizeObserver
export function useElementBounds<T extends HTMLElement>() {
  const targetRef = useRef<T>(null);
  const boundsRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        boundsRef.current = { width, height };
      }
    });

    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, []);

  return { targetRef, boundsRef };
}
```

## Best Practices

- Always specify `rootMargin` in `IntersectionObserver` to prefetch content (e.g. images or next page items) before the user reaches the bottom.
- Always call `observer.disconnect()` in component unmount cleanups to prevent memory leaks.
- Prefer `ResizeObserver` over `window.onresize` for component-level container queries.

## Common Mistakes

- Reading layout properties inside `MutationObserver` callbacks without debouncing, leading to forced synchronous reflow.
- Re-creating observer instances on every component render due to missing dependencies in React `useEffect`.

## Follow-up Questions

1. What causes "ResizeObserver loop limit exceeded" warnings in the browser console and how do you handle them?
2. How does `ReportingObserver` work for capturing deprecated browser APIs and web performance violations?

## Related Topics

- Critical Rendering Path: Reflow, Repaint & Layout Thrashing
- Infinite Scroll Grid Machine Coding Pattern
