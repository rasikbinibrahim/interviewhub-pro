# T3210 · Offscreen Rendering Optimization: `content-visibility: auto` & `contain-intrinsic-size`

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Microsoft  
**Category:** Performance  
**Concepts:** performance, content-visibility, rendering, css-containment  

## Question

How does the CSS property `content-visibility: auto` skip rendering and layout calculations for offscreen elements until scrolled into view?

## Expected Answer

```css
.long-feed-card {
  content-visibility: auto; /* Skips layout and paint for off-screen items! */
  contain-intrinsic-size: 0 300px; /* Placeholder height to prevent scrollbar jumping */
}
```
