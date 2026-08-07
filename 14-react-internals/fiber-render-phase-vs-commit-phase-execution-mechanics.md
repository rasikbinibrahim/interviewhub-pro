# QINT002 · Fiber Render Phase vs Commit Phase Execution Mechanics

**Difficulty:** Hard  
**Experience Level:** Staff / Principal  
**Companies:** Meta, Google, Vercel  
**Interview Frequency:** ★★★★★  
**Category:** React Internals  
**Concepts:** Render phase, Commit phase, Reconciliation, Mutation, Effect flushing, Side effects  

## Expected Answer

React execution is split into two phases: Render Phase (asynchronous, interruptible, computes DOM changes) and Commit Phase (synchronous, uninterruptible, mutates real DOM).

## Deep Explanation

Render Phase walks the Fiber tree, invokes component functions, performs virtual DOM reconciliation, and constructs an effect list of DOM mutations. This phase is pure and can be paused, restarted, or discarded. Commit Phase runs synchronously in 3 sub-stages: Before Mutation (getSnapshotBeforeUpdate), Mutation (DOM inserts/deletes/updates), and Layout (useLayoutEffect, ref assignment). Passive effects (useEffect) are flushed asynchronously after commit.

## Production Example

Side effects inside component render bodies fire multiple times during discarded render passes under concurrent mode; moving side effects to useEffect guarantees single execution.

## Best Practices

- Keep component render functions strictly pure and side-effect free
- Perform all DOM mutations and side effects exclusively inside lifecycle hooks or event handlers

## Trade-offs

- Render phase interruptibility guarantees high UI responsiveness
- Commit phase synchronous execution prevents partial DOM rendering glitches

## Common Mistakes

- Triggering HTTP requests or mutating global variables directly in component render bodies
- Expecting useEffect to run synchronously during the commit phase

## Follow-up Questions

1. Why can the Render Phase be safely restarted by React without breaking the application?
2. What happens during the Mutation sub-stage of the Commit Phase?

## Related Topics

- React Fiber Architecture
- useEffect Synchronization
