# QINT001 · React Fiber Architecture: Linked List Node Structure and Work Loop

**Difficulty:** Hard  
**Experience Level:** Staff / Principal  
**Companies:** Meta, Google, Microsoft  
**Interview Frequency:** ★★★★★  
**Category:** React Internals  
**Concepts:** Fiber node, child, sibling, return, workInProgress, Fiber tree, Work Loop  

## Expected Answer

A Fiber is a JavaScript object representing a unit of component work. Fibers form a mutable doubly-linked tree (child, sibling, return pointers) allowing React to pause, resume, and prioritize render work.

## Deep Explanation

The pre-Fiber stack reconciler relied on synchronous recursive call stack execution which could not be interrupted. Fiber represents work as a linked list structure stored on the heap. Key pointers: child (first child), sibling (next sibling), return (parent), and alternate (points between current mounted fiber and workInProgress fiber). The Fiber Work Loop walks this tree using performUnitOfWork(), yielding main thread control back to the browser event loop when time slices expire.

## Production Example

Fiber architecture enables time-slicing and concurrent rendering, allowing a 50ms render workload to be split into 5ms chunks, preventing UI thread freeze.

## Best Practices

- Understand Fiber node lifecycles when diagnosing deep React performance profiles
- Avoid deep component tree nesting that increases Fiber tree traversal overhead

## Trade-offs

- Fiber data structure increases heap memory footprint per component instance
- Enables non-blocking interruptible concurrent rendering across large applications

## Common Mistakes

- Assuming Fiber uses native browser DOM nodes directly for tree traversal
- Conflating the current mounted Fiber tree with the workInProgress Fiber tree

## Follow-up Questions

1. What is the Double Buffering strategy used between current and workInProgress Fiber trees?
2. How does workLoopConcurrent check frame deadline remaining time?

## Related Topics

- Fiber Render vs Commit Phase
- Concurrent Priority Levels
