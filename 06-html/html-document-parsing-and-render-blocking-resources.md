# QHTML005 · HTML Document Parsing and Render-Blocking Resources

**Difficulty:** Hard  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Google, Cloudflare, Meta  
**Interview Frequency:** ★★★★★  
**Category:** HTML  
**Concepts:** DOM construction, CSSOM, Render tree, Async/Defer scripts, Critical Rendering Path  

## Expected Answer

As the browser HTML parser scans a document, external stylesheets and synchronous <script> tags block DOM parsing and rendering. Understanding how resources block the browser parser is essential for optimizing First Contentful Paint (FCP) and Largest Contentful Paint (LCP).

## Deep Explanation

Synchronous scripts pause HTML parsing immediately while the script file is downloaded and executed. Stylesheets block script execution (because scripts can query style properties) and delay DOM rendering until the CSSOM is constructed. Placing defer or async on scripts allows HTML parsing to continue during downloads.

## Production Example

Loading third-party analytics scripts synchronously in the <head> halts DOM construction, adding 1.5 seconds of blank page render delay on 3G connections.

## Best Practices

- Use defer for scripts that rely on complete DOM construction or execution order
- Use async for independent third-party scripts (e.g. analytics)
- Preload critical fonts and stylesheets

## Trade-offs

- Async scripts execute as soon as downloaded, disregarding document order
- Defer scripts execute in document order after parsing completes

## Common Mistakes

- Placing heavy synchronous <script> tags in the <head> without async or defer
- Not realizing CSS is a render-blocking resource by default

## Follow-up Questions

1. How does the spec-compliant browser preload scanner work ahead of the main parser?
2. What is the impact of rel="preconnect" on third-party domain connection latencies?

## Related Topics

- Browser Internals
- Performance Optimization
