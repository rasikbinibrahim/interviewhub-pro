# T1032 · Ref Forwarding: `React.forwardRef()` & React 19 Ref Prop Simplification

**Difficulty:** Easy  
**Companies Asked:** Meta, Google, Amazon, Microsoft  
**Category:** React  
**Concepts:** react, forwardref, refs, dom  

## Question

How does `forwardRef` pass DOM `ref` instances to child components, and how does React 19 simplify ref forwarding by allowing `ref` directly as a standard component prop?

```jsx
// React 19: ref is a standard prop!
function CustomInput({ ref, label }) {
  return <label>{label}<input ref={ref} /></label>;
}
```
