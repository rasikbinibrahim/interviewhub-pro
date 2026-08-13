# QJS325 · Debounce vs Throttle Implementation and Timing Differences

**Difficulty:** Medium  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Google, Meta, Uber  
**Interview Frequency:** ★★★★★  
**Category:** JavaScript  
**Concepts:** Debounce, Throttle, setTimeout, Leading/Trailing options

## Expected Answer

Debounce delays invoking a function until a specified quiet period has elapsed since the last call — every new call resets the timer, so the function runs only once activity has actually stopped. Throttle guarantees the function runs at most once per fixed interval no matter how many calls occur, firing at a bounded rate throughout continuous activity rather than only at the end. The distinguishing question is: do you care about the final state after things settle down (debounce), or do you need periodic updates while activity is still ongoing (throttle)?

## Deep Explanation

Both are built on `setTimeout`, but they manage the timer differently. Debounce clears and restarts a single pending timer on every call, so the wrapped function only actually fires once no new call has arrived within the wait window. Throttle instead tracks whether it's currently "in cooldown" (via a timestamp or a boolean flag) — calls that arrive during the cooldown are ignored (or, in a "trailing" implementation, the most recent one is queued to fire once the cooldown ends), while calls after the cooldown expires fire immediately and restart the window. The "leading" and "trailing" options change exactly when within that window the function fires: leading fires on the first call of a burst and then ignores the rest until the interval passes; trailing fires once more at the end of the interval to capture the final value of a burst that would otherwise be dropped. A naive throttle implementation without a trailing call silently discards the last event of a burst, which is a real correctness gap, not just a style choice.

## Production Example

A search-input autocomplete field debounces its API call (commonly 250-400ms) so a network request fires only after the user pauses typing, instead of firing one request per keystroke — this is exactly the "I only care about the final state" case. A scroll or resize handler that recalculates a sticky header's position, or triggers infinite-scroll pagination, uses throttle (commonly 100-200ms) instead, because the handler needs to keep running at a bounded rate throughout continuous scrolling — debouncing it would mean the header only updates once the user stops scrolling, which is visibly wrong for something that's supposed to track position live.

## Best Practices

- Use debounce when only the final state after activity stops matters: search-as-you-type, validate-on-type, batching rapid-fire state updates before an expensive recompute.
- Use throttle when periodic feedback during continuous activity is required: scroll position tracking, drag handlers, mousemove-driven UI, rate-limited analytics pings.
- In React, memoize the debounced/throttled function itself (via `useMemo`/`useRef`, or a stable module-level instance) — creating a new debounced function on every render resets its internal timer state every time and defeats the purpose entirely.
- Always clear pending timers on unmount (`clearTimeout` in a cleanup function) to avoid invoking a callback — and potentially calling `setState` — after the component is gone.

## Trade-offs

Debounce can feel unresponsive if the wait window is too long, since the user gets zero feedback until activity fully stops. Throttle can miss the very last event's true final value unless a trailing-edge call is explicitly implemented, which adds complexity. Both introduce timing edge cases (what happens on the very first call, what happens if leading and trailing are both enabled) that are easy to get subtly wrong, which is exactly why hand-rolling either from scratch is a common coding-interview question in its own right.

## Common Mistakes

- Using debounce and throttle interchangeably, without being able to state which one is correct for a given scenario and why.
- Implementing throttle with no trailing call, so the final event in a burst is silently dropped and the UI ends up stale relative to the user's last action.
- Losing the correct `this` binding or arguments when forwarding the call inside the wrapper (especially in a hand-rolled implementation using a regular `function` vs. an arrow function).
- Creating a new debounced/throttled function on every render inside a React component without memoizing it, which means every keystroke gets its own fresh timer instead of sharing one.

## Follow-up Questions

1. How would you implement a throttle that supports both leading and trailing edge options?
2. What breaks if you create a debounced function inside a React component body without memoizing it?
3. For a stock ticker updating 100 times a second, would you throttle or debounce the UI update, and why?
4. How do RxJS's `debounceTime`/`throttleTime` operators differ conceptually from a hand-rolled debounce/throttle?
5. How would you unit test that a debounce implementation correctly resets its timer on every call?

## Related Topics

- 61-javascript-coding/debounce.md (full implementation)
- 61-javascript-coding/throttle.md (full implementation)
- Event loop and the task/timer queue
- React re-render optimization
