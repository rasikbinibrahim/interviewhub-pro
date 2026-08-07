# QHOOKS003 · useLayoutEffect vs useEffect Paint Timing Differences

**Difficulty:** Hard  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Meta, Google, Apple  
**Interview Frequency:** ★★★★★  
**Category:** React Hooks  
**Concepts:** useLayoutEffect, Synchronous paint blocking, DOM measurement, Layout flicker mitigation  

## Expected Answer

useLayoutEffect runs synchronously after DOM mutations but BEFORE the browser paints pixels to the screen. It is designed for synchronous DOM measurements and preventing visual layout flickers.

## Deep Explanation

During the commit phase, React mutates the DOM tree. Immediately after DOM mutation and before browser paint, React synchronously executes useLayoutEffect callbacks and cleanups. Because execution blocks the browser main thread paint step, DOM measurements taken here (e.g. getBoundingClientRect) match the exact new layout, allowing state adjustments without visual screen flash.

## Production Example

Measuring tooltip dimensions and adjusting top/left coordinates inside useEffect causes a visible 1-frame layout jump; switching to useLayoutEffect eliminates the visual flicker completely.

## Best Practices

- Use useLayoutEffect exclusively for DOM measurements and synchronous layout adjustments
- Default to useEffect for data fetching, subscriptions, and non-visual side effects

## Trade-offs

- useLayoutEffect guarantees flicker-free DOM mutations but blocks browser screen rendering until finished
- Triggers SSR warning when executed on Node server environment

## Common Mistakes

- Using useLayoutEffect for heavy data processing or fetch requests, stalling main thread paint
- Using useEffect for tooltip/popover positioning resulting in user-visible layout shift

## Follow-up Questions

1. How does useLayoutEffect interact with Server-Side Rendering (SSR)?
2. What is useInsertionEffect and why is it preferred by CSS-in-JS library authors?

## Related Topics

- Browser Critical Rendering Path
- React Commit Phase
