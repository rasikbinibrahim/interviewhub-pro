# T3209 · Web Font Optimization: `font-display: swap` & FOIT vs FOUT

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Netflix  
**Category:** Performance  
**Concepts:** performance, fonts, font-display, foit, fout  

## Question

How does `font-display: swap` eliminate **Flash of Invisible Text (FOIT)** by falling back to system fonts during download, and how do preloading and subsetting optimize font loading?

## Expected Answer

```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap; /* Instantly shows system font, swaps when custom font finishes loading! */
}
```
