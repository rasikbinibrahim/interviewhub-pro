# T333 · `requestIdleCallback()` & Non-Blocking Idle Period Processing

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Microsoft  
**Category:** Advanced JavaScript  
**Concepts:** requestidlecallback, performance, background-tasks, event-loop  

## Question

How does **`requestIdleCallback(deadline => {})`** schedule low-priority background telemetry tasks during browser frame idle time (`deadline.timeRemaining() > 0`) without dropping 60 FPS frame rates?

```javascript
requestIdleCallback((deadline) => {
  while (deadline.timeRemaining() > 0 && tasks.length > 0) {
    doLowPriorityWork(tasks.pop());
  }
});
```
