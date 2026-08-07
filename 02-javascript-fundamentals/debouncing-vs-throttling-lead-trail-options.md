# T215 · Debouncing vs Throttling: Implementation with Leading & Trailing Edge Options

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** JavaScript  
**Concepts:** debouncing, throttling, closures, rate-limiting, event-handlers  

## Question

What are the behavioral differences between **Debouncing** and **Throttling**, how do you implement production-grade `debounce()` and `throttle()` higher-order functions supporting **Leading Edge** (`leading: true`) and **Trailing Edge** (`trailing: true`) execution options, and how do you handle function cancellation (`debouncedFn.cancel()`)?

## Expected Answer

1. **Debouncing vs Throttling**:
   - **Debouncing**: Delays function execution until a specified delay period (`delay`) has elapsed since the **LAST time the function was invoked**. Resets timer on every new call (ideal for autocomplete search inputs, window resize stop).
   - **Throttling**: Guarantees function execution at most once every specified time interval (`limit`), regardless of how many times the function is triggered (ideal for infinite scroll pagination, mouse move trackers).
2. **Leading vs Trailing Edge Execution**:
   - `leading: true`: Executes function immediately on the first call, then delays subsequent calls.
   - `trailing: true`: Executes function after the timer expires following the last call.

## Deep Explanation

### Debouncing vs Throttling Event Triggers

```
Rapid Events:  |||||||||||||||||||||||||||
Debounce(300): ───────────────────────────► [ EXECUTE ONCE AT END ]
Throttle(300): ──► [ EXEC ] ──────► [ EXEC ] ──────► [ EXEC ]
```

## Production Example

```javascript
// 1. Production Debounce Function with Leading/Trailing & Cancel
export function debounce(fn, delay = 300, options = { leading: false, trailing: true }) {
  let timerId = null;
  let lastArgs = null;

  function debounced(...args) {
    lastArgs = args;
    const callNow = options.leading && !timerId;

    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(() => {
      timerId = null;
      if (options.trailing && lastArgs) {
        fn.apply(this, lastArgs);
        lastArgs = null;
      }
    }, delay);

    if (callNow) {
      fn.apply(this, args);
      lastArgs = null;
    }
  }

  debounced.cancel = () => {
    if (timerId) clearTimeout(timerId);
    timerId = null;
    lastArgs = null;
  };

  return debounced;
}

// 2. Production Throttle Function
export function throttle(fn, limit = 300) {
  let inThrottle = false;

  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
```

## Best Practices

- Always clean up debounced timers on component unmount (`debouncedFn.cancel()`) in React `useEffect` cleanups to prevent state updates on unmounted components.
- Use `requestAnimationFrame` for scroll/animation throttling to sync updates directly with 60 FPS browser paint refreshes.

## Common Mistakes

- Re-creating new `debounce()` function wrappers inside component render bodies on every state render pass without wrapping with `useCallback` or `useRef`, destroying timer closure persistence.

## Follow-up Questions

1. How does `requestAnimationFrame` throttle UI updates to 60 FPS natively without hardcoded millisecond timeouts?

## Related Topics

- Event Loop Execution Order: Macrotasks vs Microtasks
- Core Web Vitals Optimization: INP, LCP & CLS
