# QDP004 · Observer Pattern and Event Emitter Architecture

**Difficulty:** Medium  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Google, Meta, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Design Patterns  
**Concepts:** Observer Pattern, Event Emitter, Subscriptions, Memory Leak Prevention, Pub/Sub  

## Expected Answer

The Observer Pattern defines a one-to-many dependency between objects: when a subject changes state, all registered observers are notified automatically. In JavaScript, EventEmitters and RxJS Observables embody this pattern.

## Deep Explanation

A basic EventEmitter maintains an internal map of event names to listener callback sets. Calling .on(event, fn) registers a listener; .emit(event, data) iterates and invokes registered callbacks; .off(event, fn) removes a listener. Failing to unsubscribe listeners when components unmount causes memory leaks because the subject retains references to detached callbacks.

## Production Example

Global WebSocket event managers retaining component callbacks after page navigation keep unmounted view instances pinned in memory, causing severe memory leaks.

## Best Practices

- Always return an cleanup function from subscription setup hooks (useEffect / custom hooks)
- Use WeakMap or explicit teardown methods for object lifecycle management

## Trade-offs

- Decouples event producers from consumers cleanly
- Can make global application data flow difficult to trace if overused

## Common Mistakes

- Forgetting to pass the exact same function reference to eventEmitter.off() during cleanup
- Creating memory leaks by binding inline anonymous arrow functions to event emitters

## Follow-up Questions

1. How does the RxJS Observable pattern extend basic EventEmitters with functional operators?
2. What is the structural difference between Pub/Sub and the classic Observer pattern?

## Related Topics

- Frontend Architecture
- React Hooks
