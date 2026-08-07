# QINT010 · React Suspense Internals: Promise Throwing and Fallback Rendering

**Difficulty:** Hard  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Meta, Vercel, Google  
**Interview Frequency:** ★★★★★  
**Category:** React Internals  
**Concepts:** Suspense, Promise throwing, Fallback UI, Ping listener, Concurrent data fetching  

## Expected Answer

React Suspense catches promises thrown by child components during render, pauses subtree rendering, and displays a fallback UI until the promise resolves.

## Deep Explanation

When a data-fetching reader (e.g. React 19 use() or Suspense resource) accesses pending data during render, it throws a Promise. The nearest parent <Suspense> boundary catches the thrown promise in a try/catch block during the Render Phase. React attaches a ping listener (.then()) to the promise and renders the Suspense fallback. When the promise resolves, the ping listener dispatches a re-render to retry rendering the subtree.

## Production Example

Wrapping lazy-loaded components (React.lazy(() => import(...))) in <Suspense fallback={<Spinner />}> catches the dynamic import promise and renders a spinner while bundle downloads.

## Best Practices

- Place Suspense boundaries strategically to isolate loading states
- Use React 19 use() API or framework loaders (Next.js/Remix) for Suspense data integration

## Trade-offs

- Eliminates imperative loading state flags and waterfall rendering
- Requires data sources to conform to React Suspense promise-throwing protocol

## Common Mistakes

- Catching thrown Suspense promises with standard JS try/catch blocks in component bodies
- Forgetting to wrap lazy components in a Suspense boundary causing unhandled runtime errors

## Follow-up Questions

1. How does the React 19 use() API handle Promise unwrapping inside components?
2. What is the role of Suspense in Server Component HTML streaming?

## Related Topics

- React 19 use API
- Server Components Streaming
