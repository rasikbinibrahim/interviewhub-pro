# S122 · useEffect

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** React.js  
**Concepts:** React.js  

## Question

Handle side effects like data fetching and subscriptions.

## Expected Answer

useEffect executes side-effect scripts post-render and registers cleanups to prevent resource leaks.

## Deep Explanation

useEffect is the React Hook used to perform side effects in functional components, such as data fetching, subscriptions, manual DOM updates, and timers. It runs after layout and paint, and can return a cleanup function to clean up side effects before the component unmounts or before the effect runs again.

## Production Example

```js
useEffect(() => { const timer = setTimeout(cb, 100); return () => clearTimeout(timer); }, []);
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying useEffect.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Be aware of runtime engine optimizations and edge cases.

## Related Topics

- React.js Fundamentals
