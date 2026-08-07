# T305 · Debounce vs Throttle: Implementations, Cancel & Immediate Options

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Uber, Airbnb  
**Interview Frequency:** ★★★★★  
**Category:** Advanced JavaScript  
**Concepts:** debounce, throttle, higher-order-functions, performance, timer  

## Question

What are the behavioral differences between Debounce and Throttle, how do you implement both higher-order functions from scratch in TypeScript with `cancel` methods and `leading`/`trailing` execution options, and what are their primary use cases in frontend applications?

## Expected Answer

1. **Debounce**: Delays invoking a function until after `wait` milliseconds have elapsed since the **LAST time** the debounced function was called. Ideal for search autocompletes and window resize finalizations.
2. **Throttle**: Enforces a maximum execution rate, guaranteeing the function is invoked **at most ONCE per `wait` millisecond window**. Ideal for scroll position listeners, window resize tracking, and drag-and-drop move events.
3. **Key Difference**:
   - Continuous inputs into **Debounce** reset the timer and delay execution indefinitely until input pauses.
   - Continuous inputs into **Throttle** execute periodically at regular time intervals.

## Deep Explanation

### Execution Timeline Comparison

```
Events Fired:  |||||||||||||||||||||||||||
Debounce:      --------------------------[Execute]
Throttle:      [Exec]-----[Exec]-----[Exec]-----[Exec]
```

## Production Example

```typescript
// 1. Debounce Implementation with Cancel & Immediate Support
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = function (this: any, ...args: Parameters<T>) {
    const context = this;
    const callNow = immediate && !timeoutId;

    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };

  debounced.cancel = function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}

// 2. Throttle Implementation
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let inThrottle: boolean = false;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const throttled = function (this: any, ...args: Parameters<T>) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      timeoutId = setTimeout(() => {
        inThrottle = false;
        timeoutId = null;
      }, limit);
    }
  };

  throttled.cancel = function () {
    inThrottle = false;
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return throttled;
}
```

## Best Practices

- Always invoke `.cancel()` on debounced or throttled functions inside component unmount cleanup functions (`useEffect` return) to prevent memory leaks and state updates on unmounted UI.
- Use `requestAnimationFrame` as a native browser throttling mechanism for DOM visual positioning updates.

## Common Mistakes

- Creating a new debounced function inside a React component render body without `useCallback` or `useMemo`, causing the debounced timer state to be recreated on every single render pass.

## Follow-up Questions

1. How do you implement a custom `useDebounce` and `useThrottle` React hook using `useRef`?

## Related Topics

- Event Loop Mechanics: Call Stack, Microtasks & Macrotasks
- `useEffect` Lifecycle Rules & Custom Hook Abstractions
