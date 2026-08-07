# QINT006 · Automatic Batching Mechanics in React 18 and 19

**Difficulty:** Medium  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Meta, Vercel, Amazon  
**Interview Frequency:** ★★★★★  
**Category:** React Internals  
**Concepts:** Automatic Batching, React 18, Microtask batching, flushSync, State consolidation  

## Expected Answer

Automatic Batching consolidates multiple state updates into a single re-render cycle, regardless of where updates originate (promises, setTimeout, native event handlers).

## Deep Explanation

Before React 18, state updates were only batched inside React event handlers. Updates inside fetch callbacks or setTimeout triggered separate consecutive re-renders. React 18+ automatically batches all updates occurring within the same browser microtask tick. If immediate synchronous DOM updates are required, developers opt out using flushSync().

## Production Example

Setting three state variables inside an async fetch .then() block triggers exactly 1 component re-render pass in React 18+, compared to 3 separate re-renders in React 17.

## Best Practices

- Rely on automatic batching to group related state updates without manual boilerplate
- Use flushSync sparingly when third-party DOM measurements require immediate paint

## Trade-offs

- Reduces component re-render count significantly across async workflows
- Synchronous state reading immediately after setter requires flushSync opt-out

## Common Mistakes

- Expecting state variables to update synchronously on the next line of code
- Using flushSync unnecessarily, triggering forced layout thrashing

## Follow-up Questions

1. How does flushSync opt out of automatic batching?
2. What is the role of microtasks in batching state updates across async boundaries?

## Related Topics

- useState Dispatcher
- Event Loop Microtasks
