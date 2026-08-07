# QINT005 · Concurrent React Priority Levels and Scheduler Mechanics

**Difficulty:** Hard  
**Experience Level:** Staff / Principal  
**Companies:** Meta, Google, Vercel  
**Interview Frequency:** ★★★★★  
**Category:** React Internals  
**Concepts:** Concurrent React, Scheduler, Priority lanes, Immediate, UserBlocking, Normal, Idle  

## Expected Answer

Concurrent React uses a priority lane model managed by the React Scheduler to prioritize urgent user interactions over background rendering tasks.

## Deep Explanation

React assigns bitmask Lanes to every update. Priority hierarchy: 1. SyncLane / DiscreteEventLane (clicks, keypresses). 2. InputContinuousLane (hover, drag). 3. DefaultLane / TransitionLane (startTransition, data fetching). 4. IdleLane (off-screen work). The Scheduler uses messageChannel / requestAnimationFrame timing to run work in 5ms execution slices, yielding back to main thread if high-priority lanes receive updates.

## Production Example

During a heavy background list re-render (TransitionLane), a user click event (DiscreteEventLane) preempts the background render, maintaining 60fps interaction response.

## Best Practices

- Wrap non-urgent heavy renders in startTransition to assign low priority lanes
- Avoid forcing synchronous layout flushes in discrete event handlers

## Trade-offs

- Lane priority model enables zero-lag user input during massive DOM updates
- Increases engine internal complexity and state queue resolution rules

## Common Mistakes

- Overriding priority lanes by calling flushSync unnecessarily
- Assuming all state updates run at identical priority level

## Follow-up Questions

1. What is the purpose of flushSync and when should it be avoided?
2. How does bitwise lane masking allow combining multiple priority updates?

## Related Topics

- useTransition Priority
- Fiber Work Loop
