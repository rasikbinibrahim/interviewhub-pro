# T3206 · Critical Rendering Path Optimization: `<script async>` vs `<script defer>` vs Dynamic Imports

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Netflix, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** Performance  
**Concepts:** performance, critical-rendering-path, async, defer, script-loading, code-splitting  

## Question

How does the browser **Critical Rendering Path (CRP)** process HTML parsing, CSSOM construction, Layout, and Painting, and how do `<script>`, `<script async>`, `<script defer>`, and ES6 Dynamic Imports (`import()`) alter script downloading, HTML parser blocking, and execution timing?

## Expected Answer

1. **Script Tag Comparison Matrix**:
   - **`<script src="...">`**: **Parser Blocking!** Browser stops HTML parsing immediately, fetches script over network, executes it, and only then resumes HTML parsing.
   - **`<script async src="...">`**: **Asynchronous Fetch, Immediate Execution!** Fetches script in background parallel with HTML parsing. As soon as download completes, HTML parsing pauses to execute script immediately. Order of execution is **not guaranteed!** (Ideal for independent analytics scripts like Google Tag Manager).
   - **`<script defer src="...">`**: **Asynchronous Fetch, Deferred Execution!** Fetches script in background parallel with HTML parsing. Guarantees execution **AFTER HTML parsing completes**, right before `DOMContentLoaded`. **Preserves script execution order!** (Ideal for application JS bundles).
2. **ES6 Dynamic Imports (`import()`)**:
   - Asynchronously loads code-split JavaScript chunks on demand (e.g. on route navigation or button click), shrinking initial bundle size.

## Deep Explanation

### Script Loading & Execution Timeline

```
<script>:       HTML Parsing ───[ PAUSED (Fetch + Exec) ]───► Resume HTML Parsing
<script async>: HTML Parsing ──(Fetch Background)──► [ EXEC (Pauses HTML) ] ──► Resume
<script defer>: HTML Parsing (Fetch Background) ─────────► HTML Complete ──► [ EXECUTE ]
```

## Production Example

```html
<!-- Production HTML Head Loading Strategy -->
<head>
  <!-- 1. Critical CSS Resource Preload -->
  <link rel="preload" href="/styles/main.css" as="style">
  
  <!-- 2. Independent Analytics Script (async: execute as soon as downloaded!) -->
  <script async src="https://www.google-analytics.com/analytics.js"></script>

  <!-- 3. Primary Application Bundles (defer: execute after HTML parsed in order!) -->
  <script defer src="/js/vendor.js"></script>
  <script defer src="/js/app.js"></script>
</head>
```

```javascript
// Production Dynamic Import Code-Splitting Example
export function HeavyChartButton() {
  const handleLoadChart = async () => {
    // Dynamic import loads heavy D3/Chart JS chunk ON DEMAND!
    const { renderChart } = await import(/* webpackChunkName: "chart" */ './chartModule');
    renderChart('#chart-container', data);
  };

  return <button onClick={handleLoadChart}>Load Interactive Chart</button>;
}
```

## Best Practices

- Use `<script defer>` for application JavaScript bundles to prevent parser-blocking render delays.
- Use `<script async>` ONLY for independent third-party scripts (analytics, ad trackers) that do not depend on the DOM or other scripts.

## Common Mistakes

- Placing standard `<script src="bundle.js">` in the `<head>` without `async` or `defer`, blocking HTML parsing and causing white screen delays before initial paint.

## Follow-up Questions

1. How do `<link rel="modulepreload">` directives optimize native ES Module loading waterfalls in Vite applications?

## Related Topics

- Critical Rendering Path & Resource Hints
- Core Web Vitals Optimization: INP, LCP & CLS
