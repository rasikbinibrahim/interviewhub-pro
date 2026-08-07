# QHOOKS005 · useRef Persistent Mutable Container and DOM Node Binding

**Difficulty:** Easy  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Google, Meta, Amazon  
**Interview Frequency:** ★★★★★  
**Category:** React Hooks  
**Concepts:** useRef, { current: value }, Persistent object, DOM element binding, Re-render bypass  

## Expected Answer

useRef returns a persistent mutable object ({ current: value }) that survives component re-renders. Modifying ref.current does NOT trigger a component re-render.

## Deep Explanation

The ref object is stored on the fiber's memoizedState cell. Unlike useState, updating ref.current mutates the value synchronously without enqueuing a render work unit. This makes refs ideal for storing timer IDs, previous state values, third-party library instances, and binding direct DOM element references via ref attributes.

## Production Example

Storing an interval timer ID in a ref (timerRef.current = setInterval(...)) allows clearing it across lifecycle renders without causing unnecessary component re-render cycles.

## Best Practices

- Use refs for values that should not trigger visual re-renders when mutated
- Access DOM nodes via ref.current inside useEffect or event handlers, never during render

## Trade-offs

- Mutating ref.current does not notify React of state changes or update UI
- Reading ref.current during render yields unpredictable values under concurrent rendering

## Common Mistakes

- Attempting to render ref.current directly in JSX expecting UI to update when it changes
- Reading or mutating ref.current directly in the component render body

## Follow-up Questions

1. How does Callback Ref (ref={node => ...}) differ from useRef object pass-through?
2. What is the relationship between forwardRef and ref prop in React 19?

## Related Topics

- forwardRef and useImperativeHandle
- DOM Node Association
