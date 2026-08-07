# T1036 · Programmatic Rendering Performance: `<Profiler>` Component

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft  
**Category:** React  
**Concepts:** react, profiler, performance, metrics  

## Question

How does the **`<Profiler id="..." onRender={callback}>`** component measure render duration, commit times, and re-render triggers across component subtrees programmatically?

```jsx
function onRenderCallback(id, phase, actualDuration, baseDuration) {
  console.log(`[Profiler ${id}] ${phase} took ${actualDuration}ms`);
}

<Profiler id="Navigation" onRender={onRenderCallback}>
  <Navigation />
</Profiler>
```
