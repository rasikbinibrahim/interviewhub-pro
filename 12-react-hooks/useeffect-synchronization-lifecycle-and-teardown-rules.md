# QHOOKS002 · useEffect Synchronization Lifecycle and Teardown Rules

**Difficulty:** Medium  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Meta, Google, Microsoft  
**Interview Frequency:** ★★★★★  
**Category:** React Hooks  
**Concepts:** useEffect, Passive effects, Teardown function, Dependency array, Object.is comparison  

## Expected Answer

useEffect schedules passive side-effects that execute asynchronously after browser paint. Its cleanup function runs before consecutive effect re-execution and during component unmount.

## Deep Explanation

During render, useEffect creates an effect tag on the Fiber. After the browser paints the updated DOM, React flushes passive effects asynchronously. React compares current dependency values with previous values using Object.is. If dependencies change (or array is omitted), the cleanup function from the previous render is invoked before running the new effect callback.

## Production Example

Subscribing to external WebSocket feeds inside useEffect without returning a cleanup function (socket.close()) causes orphaned connection memory leaks.

## Best Practices

- Always return a cleanup function for event listeners, timers, and subscriptions
- Include all referenced reactive props/state in the dependency array

## Trade-offs

- Async post-paint execution prevents blocking UI render but causes brief visual frame lag if updating state inside effect
- Exhaustive dependencies ensure freshness but require careful memoization of object props

## Common Mistakes

- Omitted dependency array when referencing state variables, creating stale closures
- Performing DOM layout measurements inside useEffect instead of useLayoutEffect

## Follow-up Questions

1. Why does React 18/19 flush passive effects before unmounting subtrees?
2. How does useEffect differ from useInsertionEffect for CSS-in-JS injection?

## Related Topics

- useLayoutEffect Timing
- React Strict Mode Double Rendering
