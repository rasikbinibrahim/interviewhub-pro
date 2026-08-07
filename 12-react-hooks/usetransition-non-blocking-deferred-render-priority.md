# QHOOKS009 · useTransition Non-Blocking Deferred Render Priority

**Difficulty:** Hard  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Meta, Vercel, Google  
**Interview Frequency:** ★★★★★  
**Category:** React Hooks  
**Concepts:** useTransition, startTransition, isPending, Concurrent React, Transition priority  

## Expected Answer

useTransition marks state updates as low-priority transitions. This allows React to keep the UI interactive by interrupting transition rendering if high-priority user input occurs.

## Deep Explanation

React 18 introduced priority-based lane scheduling. High-priority updates (typing, clicking) execute immediately. Updates wrapped in startTransition(() => setQuery(val)) are assigned Transition Lane priority. If a user types another key while React is rendering the transition, React yields main thread execution, discards incomplete transition work, and handles the keypress immediately.

## Production Example

Filtering a 10,000 item list on keypress lags typing feedback; wrapping list state update in startTransition keeps input typing 60fps responsive while list renders in background.

## Best Practices

- Use useTransition for heavy filtering, tab switching, and page navigation
- Display visual pending feedback using the returned isPending flag

## Trade-offs

- Transitions allow UI responsiveness during heavy renders but delay transition render completion
- Transitions cannot be used for controlled input value state updates

## Common Mistakes

- Wrapping controlled text input value state in startTransition, causing typed character lag
- Attempting to wrap async operations inside startTransition without React 19 Actions

## Follow-up Questions

1. How does useDeferredValue compare to useTransition?
2. What is the difference between Discrete Event Lane and Transition Lane in Fiber scheduler?

## Related Topics

- Concurrent React Priority Levels
- useDeferredValue Value Deferral
