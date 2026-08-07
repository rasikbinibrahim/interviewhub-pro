# T1035 · React 18 `useId()` & Stable SSR Hydration Element IDs

**Difficulty:** Easy  
**Companies Asked:** Meta, Google, Vercel, Microsoft  
**Category:** React  
**Concepts:** react-18, useid, ssr, hydration, accessibility  

## Question

Why is **`useId()`** essential for generating stable unique accessibility IDs across SSR server rendering and client hydration without HTML ID mismatch errors?

```jsx
function LabeledInput() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Email:</label>
      <input id={id} type="email" />
    </>
  );
}
```
