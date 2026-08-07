# T1019 · React Fiber Architecture: Render Phase vs Commit Phase

**Difficulty:** Hard  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Netflix  
**Category:** React  
**Concepts:** react-fiber, render-phase, commit-phase, reconciliation  

## Question

How does the **React Fiber Reconciler** separate work into the **Render Phase** (asynchronous, interruptible, pure calculation) and **Commit Phase** (synchronous, non-interruptible DOM mutation)?

## Expected Answer

- **Render Phase**: Calculates Virtual DOM tree changes (`child`, `sibling`, `return` Fiber pointers). Asynchronous and interruptible in Concurrent React. Side effects forbidden!
- **Commit Phase**: Applies Fiber side-effect mutations to real DOM synchronously. Calls `useLayoutEffect`, paints DOM, then fires `useEffect`.
