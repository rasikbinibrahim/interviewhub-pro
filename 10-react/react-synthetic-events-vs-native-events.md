# T1024 · React SyntheticEvent Wrapper vs Native Browser Events

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft  
**Category:** React  
**Concepts:** react, synthetic-events, native-events, event-pooling  

## Question

How does React's **`SyntheticEvent`** wrapper cross-browser normalize native browser events, and how does event delegation attach listeners to the root React container (`#root`) in React 17+?

## Expected Answer

- **Cross-Browser Wrapper**: Wraps native browser `e.nativeEvent` for consistent cross-browser API properties.
- **Root Delegation**: In React 17+, event delegation attaches to the root container `document.getElementById('root')` rather than `document`, preventing micro-frontend event isolation leaks.
