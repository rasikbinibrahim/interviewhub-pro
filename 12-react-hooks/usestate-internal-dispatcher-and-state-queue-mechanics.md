# QHOOKS001 · useState Internal Dispatcher and State Queue Mechanics

**Difficulty:** Medium  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Meta, Google, Amazon  
**Interview Frequency:** ★★★★★  
**Category:** React Hooks  
**Concepts:** useState, State queue, Fiber memoizedState, Dispatcher, Functional updates  

## Expected Answer

useState allocates a memoizedState node on the current Fiber linked list. State updates push actions onto a update queue processed during the next render cycle, ensuring batching and state consistency.

## Deep Explanation

When useState is invoked, React reads the current dispatcher from ReactCurrentDispatcher. During mount, mountState initializes a cell on the fiber's memoizedState linked list and returns a dispatchAction function bound to that fiber and queue. Updates push action objects to the queue. During updateState, React loops over queued actions, computing new state values. Functional updates (prev => prev + 1) receive the latest computed value in sequence.

## Production Example

Calling setState multiple times synchronously (e.g. setCount(count + 1); setCount(count + 1);) uses stale closure values; passing a functional update (setCount(c => c + 1)) processes queued updates correctly.

## Best Practices

- Use functional state updates when next state depends on prior state
- Use lazy state initializers (useState(() => initialVal)) for expensive initial calculations

## Trade-offs

- Functional state updates avoid stale closures but add minor callback overhead
- Lazy initializers prevent recalculation on re-renders but require function wrapping

## Common Mistakes

- Mutating state objects in-place instead of returning new object references
- Calling useState inside loops or conditional branches, breaking fiber array ordering

## Follow-up Questions

1. How does React compare next state with previous state using Object.is?
2. What happens when state is set to its current value during render?

## Related Topics

- Fiber Linked List Architecture
- React Hook Call Order Rules
