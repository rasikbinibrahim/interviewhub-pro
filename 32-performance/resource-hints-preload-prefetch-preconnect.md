# T3215 · Resource Hints Architecture: `dns-prefetch`, `preconnect`, `preload`, and `prefetch`

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Netflix  
**Category:** Performance  
**Concepts:** performance, resource-hints, preload, prefetch, preconnect  

## Question

What are the critical differences in browser priority and execution timing between **`<link rel="preload">`**, **`<link rel="prefetch">`**, **`<link rel="preconnect">`**, and **`<link rel="dns-prefetch">`**?

```html
<!-- High priority fetch for critical hero image -->
<link rel="preload" href="/hero.webp" as="image" type="image/webp">

<!-- Low priority pre-fetch for future page navigation -->
<link rel="prefetch" href="/next-page.js" as="script">

<!-- Warm up TLS/DNS connection to API domain -->
<link rel="preconnect" href="https://api.example.com">
```
