# QINT009 · Double Rendering in React Strict Mode and Effect Cleanup Verification

**Difficulty:** Easy  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Meta, Vercel, Google  
**Interview Frequency:** ★★★★☆  
**Category:** React Internals  
**Concepts:** StrictMode, Double rendering, Effect mounting/unmounting, Side effect detection  

## Expected Answer

In development mode, React Strict Mode intentionally invokes component render functions and effects TWICE (mount -> unmount -> remount) to catch missing effect cleanups and impure renders.

## Deep Explanation

Strict Mode helps developers prepare applications for Concurrent React features (like reusable state and fast refresh). By mounting, unmounting, and re-mounting components in development, React verifies that effect cleanup functions correctly undo all setup operations (such as event listeners or timers) and that render functions are strictly pure.

## Production Example

An effect that appends a <div> to document.body without cleanup creates 2 duplicated DOM elements in Strict Mode dev, exposing the memory leak bug immediately.

## Best Practices

- Ensure all useEffect hooks return appropriate cleanup functions
- Keep component render functions strictly pure without side-effects

## Trade-offs

- Doubles dev console logs and effect executions to proactively surface bugs
- Disabled automatically in production builds with zero runtime impact

## Common Mistakes

- Assuming Strict Mode double rendering occurs in production builds
- Attempting to disable Strict Mode double rendering instead of fixing broken effect cleanup logic

## Follow-up Questions

1. Why does Strict Mode suppress duplicate console.log calls in modern React devtools?
2. How does double mounting prepare components for off-screen hidden tab preservation?

## Related Topics

- useEffect Teardown
- Pure Functions and Side Effects
