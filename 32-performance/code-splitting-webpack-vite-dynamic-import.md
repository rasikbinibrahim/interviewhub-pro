# T3216 · Code Splitting & Dynamic Imports (`import()`) with React Lazy

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Vercel  
**Category:** Performance  
**Concepts:** performance, code-splitting, dynamic-import, react-lazy  

## Question

How does **Code Splitting** via dynamic `import('./Component')` separate monolith JavaScript bundles into on-demand chunks, and how does `React.lazy()` wrap dynamic imports with `<Suspense>`?

```jsx
const HeavyChart = React.lazy(() => import('./HeavyChart'));

function AnalyticsDashboard() {
  return (
    <Suspense fallback={<div>Loading Chart...</div>}>
      <HeavyChart />
    </Suspense>
  );
}
```
