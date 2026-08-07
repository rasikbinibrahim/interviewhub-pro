# T1026 · Component Composition Patterns: HOCs vs Render Props vs Custom Hooks

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft  
**Category:** React  
**Concepts:** react, hoc, render-props, custom-hooks, composition  

## Question

How have React code reuse patterns evolved from Higher-Order Components (HOCs) and Render Props to **Custom React Hooks**?

## Expected Answer

- **HOCs**: Wrapper functions (`withAuth(Component)`). Prop name collisions and wrapper hell.
- **Render Props**: Children as functions (`<Tracker render={data => <Comp data={data} />} />`). Nesting pyramid.
- **Custom Hooks**: Functional state sharing (`const data = useTracker()`). Flat, composable, no extra DOM nodes or prop collisions.
