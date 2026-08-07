# T1021 · React StrictMode Double Rendering & Effect Cleanup Verification

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Netflix  
**Category:** React  
**Concepts:** react, strict-mode, double-rendering, effect-cleanup  

## Question

Why does `<React.StrictMode>` double-invoke component render bodies and `useEffect` setup/cleanup functions during development in React 18+?

## Expected Answer

- **Purpose**: Verifies that components are pure functions and that `useEffect` cleanup handlers properly reset imperative subscriptions (e.g. WebSocket connections, event listeners).
- **Behavior**: Mounts -> Unmounts -> Remounts component in development mode only. Production builds run single render passes.
