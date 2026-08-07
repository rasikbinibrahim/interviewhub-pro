# QHTML006 · Canvas vs SVG Rendering and Performance Profiles

**Difficulty:** Medium  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Apple, Uber, Figma  
**Interview Frequency:** ★★★★☆  
**Category:** HTML  
**Concepts:** HTML5 Canvas 2D/WebGL, Scalable Vector Graphics, Raster vs Vector, DOM overhead  

## Expected Answer

SVG is an XML-based vector format where every element exists in the DOM tree, ideal for interactive vector graphics with low node counts. Canvas is a pixel-based immediate-mode rendering surface (2D or WebGL), optimal for high-density rendering, games, and large datasets.

## Deep Explanation

SVG graphics retain accessibility features, support CSS styling, and handle user events natively per element. However, thousands of complex SVG DOM nodes cause memory bloat and layout recalculation bottlenecks. Canvas bypasses the DOM entirely, executing immediate pixel commands to GPU memory, but requires manual hit-testing and custom accessibility layers.

## Production Example

Rendering 50,000 data points in a dynamic charting tool using SVG crashes browser rendering threads due to DOM node overhead; switching to Canvas maintains 60fps.

## Best Practices

- Use SVG for icons, small UI diagrams, and interactive logos requiring crisp scaling
- Use Canvas or WebGL for particle systems, heavy data visualizations, and game loops

## Trade-offs

- SVG maintains crisp resolution at any scale but scales poorly with object count
- Canvas handles huge object counts efficiently but loses crispness when upscaled without DPI adjustment

## Common Mistakes

- Attempting to attach native DOM event listeners to individual shapes drawn on a Canvas
- Using high node-count SVGs for real-time animations

## Follow-up Questions

1. How do high-DPI (Retina) displays affect Canvas rendering pixel density?
2. What is OffscreenCanvas and how does it execute rendering off the main thread?

## Related Topics

- Performance
- Browser Internals
