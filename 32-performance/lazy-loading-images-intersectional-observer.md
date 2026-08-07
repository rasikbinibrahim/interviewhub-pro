# T3205 · Image & Video Optimization: Native `loading="lazy"`, Responsive `srcset`, and IntersectionObserver

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Netflix, Stripe, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Performance  
**Concepts:** performance, lazy-loading, intersection-observer, srcset, image-optimization  

## Question

How do native browser `loading="lazy"` attributes, responsive `<picture>` / `srcset` images, modern formats (AVIF / WebP), and custom **`IntersectionObserver`** implementations reduce initial network payload size and improve Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS)?

## Expected Answer

1. **Native Lazy Loading (`loading="lazy"`)**:
   - Defers loading of below-the-fold images and `<iframe>` elements until they are within a browser-calculated distance threshold from the user's viewport. Zero JavaScript required!
2. **Responsive Images (`srcset` & `sizes`)**:
   - Serves appropriately sized image assets matched to device pixel ratio (DPR) and screen width, preventing mobile devices from fetching heavy 4K desktop images.
3. **Modern Formats (AVIF vs WebP)**:
   - AVIF provides ~50% smaller file sizes than JPEG and ~20% smaller than WebP at equivalent visual quality.
4. **`IntersectionObserver` API**:
   - Asynchronously observes changes in the intersection of a target element with an ancestor element or top-level document's viewport. Eliminates old main-thread `scroll` event listener degradation.

## Deep Explanation

### Responsive Image Selection with Fallbacks

```html
<!-- Production Responsive Image using <picture> and AVIF/WebP Formats -->
<picture>
  <!-- 1. AVIF Modern Format for supporting browsers (Smallest Payload!) -->
  <source srcset="/images/hero-mobile.avif 400w, /images/hero-desktop.avif 1200w"
          sizes="(max-width: 600px) 100vw, 1200px"
          type="image/avif" />

  <!-- 2. WebP Fallback Format -->
  <source srcset="/images/hero-mobile.webp 400w, /images/hero-desktop.webp 1200w"
          sizes="(max-width: 600px) 100vw, 1200px"
          type="image/webp" />

  <!-- 3. Standard Fallback <img> Tag -->
  <img src="/images/hero-desktop.jpg"
       alt="Optimized Banner"
       loading="lazy"
       decoding="async"
       width="1200"
       height="600"
       style="aspect-ratio: 2 / 1; width: 100%; height: auto;" />
</picture>
```

## Production Example

```javascript
// Production Custom Lazy Image Hook using IntersectionObserver
import { useState, useEffect, useRef } from 'react';

export function useLazyImage(src) {
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    let observer;

    if (imgRef.current) {
      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setImageSrc(src); // Load image source only when visible!
                observer.unobserve(entry.target);
              }
            });
          },
          { rootMargin: '200px 0px' } // Pre-load 200px before entering viewport!
        );
        observer.observe(imgRef.current);
      } else {
        // Fallback for ancient browsers
        setImageSrc(src);
      }
    }

    return () => {
      if (observer && observer.disconnect) observer.disconnect();
    };
  }, [src]);

  return { imageSrc, imgRef };
}
```

## Best Practices

- Always declare explicit `width` and `height` attributes or CSS `aspect-ratio` on `<img>` tags to reserve container space before download completes, avoiding CLS layout shifts.
- Never apply `loading="lazy"` to above-the-fold hero images — hero images should use `fetchpriority="high"` and `<link rel="preload">` to maximize LCP.

## Common Mistakes

- Using main-thread `window.addEventListener('scroll', checkBounds)` to implement lazy loading, causing severe main-thread scrolling lag.

## Follow-up Questions

1. What is the `decoding="async"` attribute and how does it prevent image decoding CPU spikes from blocking UI rendering?

## Related Topics

- Core Web Vitals Optimization: INP, LCP & CLS
- Critical Rendering Path & Resource Hints
