# T3214 · Core Web Vitals 2024: INP (Interaction to Next Paint), LCP & CLS Optimization

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Netflix  
**Category:** Performance  
**Concepts:** core-web-vitals, inp, lcp, cls, performance  

## Question

How does **Interaction to Next Paint (INP)** replace FID as Google's official responsiveness metric, and how do long tasks ($>50\text{ms}$) impact INP scores?

## Expected Answer

- **INP Target**: $\le 200\text{ms}$ at 75th percentile of user visits.
- **Components of INP**: Input Delay + Processing Time + Presentation Delay.
- **Optimization Strategy**: Yield to main thread via `requestAnimationFrame` or `scheduler.yield()` inside long loops.
