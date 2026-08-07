# T1034 · Synchronous Layout Measurement: `useLayoutEffect()` vs `useEffect()`

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft  
**Category:** React  
**Concepts:** react, uselayouteffect, useeffect, dom-measurement, flicker  

## Question

Why does **`useLayoutEffect()`** execute synchronously AFTER DOM mutations but BEFORE browser paint (preventing visual layout flicker during DOM measurements), whereas `useEffect()` runs asynchronously after paint?

```jsx
// Measure DOM element size BEFORE browser paints to avoid UI flicker!
useLayoutEffect(() => {
  const rect = ref.current.getBoundingClientRect();
  setHeight(rect.height);
}, []);
```
