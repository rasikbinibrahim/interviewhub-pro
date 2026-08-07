# S6112 · setTimeout vs setImmediate (Node.js)

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Node.js Event Loop  

## Question

Two similarly-purposed Node APIs for deferring work, with different event-loop-phase guarantees.

## Expected Answer

setTimeout(fn, 0) waits for the timers phase after at least a minimal delay; setImmediate(fn) runs in the check phase right after the current poll/I/O phase, which is Node's intended way to defer work until 'right after I/O finishes'.

## Deep Explanation

`setTimeout(fn, 0)` schedules `fn` for the timers phase, requiring at least the specified delay (clamped to a minimum) to have elapsed. `setImmediate(fn)` schedules `fn` specifically for the check phase, which runs immediately after the current poll phase completes — designed explicitly to run 'as soon as possible after I/O', distinct from a timer-based delay.

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying setTimeout vs setImmediate (Node.js).

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. setImmediate is generally preferred over setTimeout(fn, 0) for 'defer to next tick after I/O' use cases specifically because its semantics are the accurate match for that intent — setTimeout(0) is really 'run this after roughly 1ms', an implementation detail of the timers phase, not a true 'run immediately after I/O' guarantee.

## Related Topics

- JavaScript Fundamentals
