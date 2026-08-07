# T3203 · Critical Rendering Path & Resource Hints (`preload`, `prefetch`, `preconnect`)

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Netflix, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Performance  
**Concepts:** critical-rendering-path, resource-hints, preload, prefetch, preconnect, page-speed  

## Question

What are the sequential stages of the Critical Rendering Path (CRP), how do HTML, CSS (render-blocking), and JS (parser-blocking) impact time-to-first-paint, and how do Resource Hints (`rel="preload"`, `rel="prefetch"`, `rel="preconnect"`, `dns-prefetch`) optimize browser fetch priorities?

## Expected Answer

1. **Critical Rendering Path (CRP) Stages**:
   - **DOM Construction**: HTML Bytes -> Characters -> Tokens -> Nodes -> DOM Tree.
   - **CSSOM Construction**: CSS Bytes -> Characters -> Tokens -> Nodes -> CSSOM Tree. CSS is **render-blocking** (browser pauses rendering until CSSOM is ready).
   - **Render Tree**: Combines DOM and CSSOM trees (excludes `display: none` nodes).
   - **Layout**: Calculates exact geometry and coordinates for visible nodes.
   - **Paint**: Rasterizes pixels onto screen.
2. **Resource Hints**:
   - **`dns-prefetch`**: Performs early DNS resolution for a third-party domain before an HTTP request is initiated.
   - **`preconnect`**: Performs DNS lookup + TCP handshake + TLS negotiation in advance (`<link rel="preconnect" href="https://fonts.googleapis.com">`).
   - **`preload`**: Forces browser to fetch a high-priority critical resource needed for the **current page** immediately (`<link rel="preload" href="/hero.webp" as="image">`).
   - **`prefetch`**: Fetches a low-priority resource needed for **future navigation** on subsequent pages during idle browser time.

## Deep Explanation

### Resource Hint Prioritization Matrix

| Resource Hint | Target Scope | Priority | Fetch Execution Phase |
|---|---|---|---|
| `rel="preload"` | Current Page | High | Immediate (High Priority) |
| `rel="preconnect"` | Third-Party Origin | High | Immediate Socket Setup |
| `rel="dns-prefetch"` | Third-Party Domain | Low | Early DNS Lookup |
| `rel="prefetch"` | Next Page | Low | Idle Time Fetch |

## Production Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>High Performance App</title>

  <!-- 1. Preconnect to API Origin (Saves ~100-300ms TLS Handshake) -->
  <link rel="preconnect" href="https://api.example.com" crossorigin>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- 2. Preload Above-the-Fold LCP Hero Image -->
  <link rel="preload" href="/images/hero-banner.avif" as="image" type="image/avif">

  <!-- 3. Preload Critical Font -->
  <link rel="preload" href="/fonts/inter-bold.woff2" as="font" type="font/woff2" crossorigin>

  <!-- 4. Async & Defer JS Scripts (Non-Parser Blocking) -->
  <script src="/js/app.js" defer></script>

  <!-- 5. Prefetch Next Likely Route Chunk -->
  <link rel="prefetch" href="/js/checkout-page.chunk.js" as="script">

  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

## Best Practices

- Always add `crossorigin` to `<link rel="preload" as="font">` and `preconnect` tags — fonts are fetched anonymously, requiring CORS mode.
- Use `preload` sparingly (only for 2-3 critical LCP assets) — over-preloading starves critical CSS and main JS bundle downloads.

## Common Mistakes

- Preloading resources that are not used within 3 seconds of page load, triggering Chrome console warnings: *"Resource was preloaded using link preload but not used within a few seconds"*.

## Follow-up Questions

1. How do `async` vs `defer` script attributes differ in execution timing relative to HTML parsing and `DOMContentLoaded`?

## Related Topics

- Web Performance: Core Web Vitals & INP Optimization
- Vite ESM Dev Server HMR vs Webpack
