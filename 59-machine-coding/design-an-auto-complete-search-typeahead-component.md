# QMC017 · Design an Auto-complete Search Typeahead Component

**Difficulty:** Hard  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Google, Meta, Uber, Amazon, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** Machine Coding  
**Concepts:** Debounce, AbortController, ARIA Combobox, Keyboard Navigation, Cache, Highlighting  

## Expected Answer

Building a production-grade Auto-complete Typeahead requires debouncing inputs, cancelling out-of-order async responses using AbortController, caching prior queries, implementing ARIA combobox accessibility, and providing keyboard arrow navigation.

## Deep Explanation

Key architectural requirements: 1. Input listener debounced by 300ms. 2. Fetch requests track an active AbortController; new queries abort prior pending network requests to prevent race conditions. 3. Results stored in an LRU or Map cache. 4. Keyboard navigation (ArrowDown, ArrowUp, Enter, Escape) manages an activeIndex highlight index. 5. Accessible markup uses role="combobox", aria-expanded, and aria-activedescendant.

## Production Example

A search bar without race condition protection displays stale results when a slow first API call returns AFTER a faster second query response finishes; AbortController resolves this cleanly.

## Best Practices

- Use AbortController to cancel stale in-flight HTTP requests on consecutive keystrokes
- Support keyboard navigation and screen reader live announcements out of the box

## Trade-offs

- Debouncing introduces minor response latency to conserve backend request quota
- Client caching increases memory usage slightly

## Common Mistakes

- Neglecting race conditions when rapid keystrokes dispatch concurrent network calls
- Omitting keyboard access for dropdown item selection

## Follow-up Questions

1. How would you implement virtualized list rendering inside the dropdown for 10,000 search results?
2. What strategy handles fuzzy string match highlighting in search results?

## Related Topics

- Machine Coding
- Web APIs
