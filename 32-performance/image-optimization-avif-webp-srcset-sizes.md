# T3212 · Modern Image Format & Responsive Loading: AVIF, WebP, `srcset`, and `<picture>`

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Netflix  
**Category:** Performance  
**Concepts:** performance, image-optimization, avif, webp, srcset  

## Question

How do modern image formats (AVIF, WebP) and responsive `<picture>` tags with `srcset` and `sizes` optimize bandwidth delivery and LCP?

## Expected Answer

```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Responsive Hero" loading="lazy" decoding="async">
</picture>
```
