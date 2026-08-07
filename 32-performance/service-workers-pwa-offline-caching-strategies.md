# T3207 · Service Workers & PWA Offline Caching Strategies: Stale-While-Revalidate vs Cache-First vs Network-First

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Performance  
**Concepts:** performance, service-workers, pwa, caching-strategies, stale-while-revalidate  

## Question

How do **Service Workers** run in an isolated background thread to intercept network requests, and how do the 5 Workbox PWA caching strategies (**Stale-While-Revalidate**, **Cache First**, **Network First**, **Network Only**, and **Cache Only**) manage offline reliability vs content freshness?

## Expected Answer

1. **Service Worker Architecture**:
   - Event-driven background script registered by the browser (`navigator.serviceWorker.register()`). Operates on a separate thread, independent of the DOM.
   - Intercepts all outgoing HTTP fetch requests via `fetch` event listeners.
2. **The 5 PWA Caching Strategies**:
   - **Stale-While-Revalidate**: Returns cached asset **instantly** (0ms latency!), while concurrently fetching updated version from network in background to update cache for next load. Ideal for avatars, fonts, semi-static UI assets.
   - **Cache First (Cache Falling Back to Network)**: Serves from Cache; fetches from network ONLY if cache misses. Ideal for static immutable build assets (`app.a1b2c3.js`, images).
   - **Network First (Network Falling Back to Cache)**: Fetches from Network; falls back to Cache if offline. Ideal for dynamic real-time data (user feeds, inbox).
   - **Network Only**: Forces online network fetch. Ideal for non-cacheable API mutations (checkout POST).
   - **Cache Only**: Serves exclusively from Cache. Ideal for static offline fallback pages.

## Deep Explanation

### Caching Strategy Flow Diagrams

```
Stale-While-Revalidate:
Browser Request ──► [ Service Worker ] ──┬──► Return Cached Version Instantly! (0ms)
                                         └──► Async Network Fetch ──► Update Cache

Network First:
Browser Request ──► [ Service Worker ] ──► Try Network ──(If Success)──► Return & Cache
                                                │
                                          (If Offline)
                                                ▼
                                         Return Cache Version
```

## Production Example

```javascript
// service-worker.js (Native Service Worker Implementation)
const CACHE_NAME = 'app-v1';
const STATIC_ASSETS = ['/', '/index.html', '/styles/main.css', '/js/app.js'];

// 1. Install Event: Pre-cache static App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// 2. Fetch Event: Stale-While-Revalidate Strategy for API requests
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/feed')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);

        // Background Network Fetch to revalidate cache!
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });

        // Return cached version immediately if available, else wait for network!
        return cachedResponse || fetchPromise;
      })
    );
  }
});
```

## Best Practices

- Always version Cache names (`app-v1`, `app-v2`) and delete stale caches inside `activate` event handlers.
- Serve Service Worker scripts (`sw.js`) with `Cache-Control: no-cache` header so browsers check for service worker updates on every page load.

## Common Mistakes

- Using Cache First strategy for dynamic HTML pages or manifest files, permanently locking users into outdated application versions.

## Follow-up Questions

1. How does the Background Sync API (`sync` event) queue offline POST mutations to replay when network connectivity recovers?

## Related Topics

- Client-Side Storage Architecture: `localStorage` vs `IndexedDB`
- Core Web Vitals Optimization: INP, LCP & CLS
