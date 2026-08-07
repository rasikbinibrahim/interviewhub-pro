# S6090 · Service Workers

**Difficulty:** Hard  
**Companies Asked:** Google, Amazon, Microsoft, Meta, Apple  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Browser & Runtime APIs  

## Question

A programmable network proxy that runs independently of any page, enabling offline support.

## Expected Answer

A Service Worker is a background network proxy script that can intercept requests and serve cached responses, enabling offline support and push notifications independent of any open page.

## Deep Explanation

A Service Worker is a special kind of Web Worker that sits between the browser and the network, able to intercept `fetch` requests, serve cached responses, and run even when no page using it is open (it has its own lifecycle: install, activate, fetch/message events). It's the foundation of offline-capable web apps and Progressive Web Apps (PWAs).

## Production Example

```js
Follow standard modern practices.
```

## Best Practices

- Apply modern standards and clear conventions.
- Prefer explicit intent over implicit coercion or hidden side effects.

## Trade-offs

Consider memory footprint, CPU utilization, and code readability when applying Service Workers.

## Common Mistakes

- Misunderstanding scope or execution context.
- Neglecting edge cases in asynchronous or complex state operations.

## Follow-up Questions

1. Service Worker lifecycle management is the tricky part in production — a new Service Worker version installs alongside the old one and only 'activates' (taking control of pages) once all old pages using the previous version are closed, unless you explicitly call `self.skipWaiting()` and `clients.claim()` to force immediate takeover, which itself risks version-mismatch bugs mid-session.

## Related Topics

- JavaScript Fundamentals
