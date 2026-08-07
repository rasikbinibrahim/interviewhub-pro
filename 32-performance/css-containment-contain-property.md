# T3217 · CSS Containment: The `contain` Property for Render Performance

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Microsoft  
**Category:** Performance  
**Concepts:** css-containment, contain-property, layout-isolation  

## Question

How does the CSS `contain: strict` (or `layout paint style size`) property isolate component subtrees so browser reflows and repaints remain localized inside the target element container?

```css
.isolated-widget {
  contain: layout paint; /* Isolates internal layout/paint recalculations from parent page! */
}
```
