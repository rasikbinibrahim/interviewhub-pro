# T3202 · Browser Caching: Cache-Control, ETag & Service Worker PWA Strategies

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Netflix, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Performance  
**Concepts:** caching, cache-control, service-workers, pwa, etag, offline-first  

## Question

How do HTTP Browser Caching headers (`Cache-Control`, `ETag`, `Last-Modified`) interact with the browser cache, how do Service Workers intercept network requests using the Cache API, and what are the 5 core Service Worker Caching Strategies (Cache First, Network First, Stale While Revalidate)?

## Expected Answer

1. **HTTP Caching Directives**:
   - `max-age=N`: Cache asset locally for `N` seconds.
   - `no-cache`: Forces browser to validate with server (`ETag` / `If-None-Match` 304 Not Modified) before using cached copy.
   - `no-store`: Completely forbids caching; always fetches fresh asset from origin server.
   - `immutable`: Asserts asset content will never change (e.g. content-hashed bundles `main.a8f9d.js`); browser never revalidates during reloads.
2. **Service Worker Architecture**: A programmable network proxy worker running in a background thread, intercepting `fetch` events and managing the `caches` storage API.
3. **Core Service Worker Strategies**:
   - **Cache First**: Serves from Cache API; falls back to Network. Ideal for static assets (fonts, images, hashed JS/CSS).
   - **Network First**: Fetches fresh copy from Network; falls back to Cache API when offline. Ideal for dynamic user data APIs.
   - **Stale-While-Revalidate**: Serves stale copy instantly from Cache API while triggering a background fetch to update the cache for next time. Ideal for avatars, news feeds, and dashboard widgets.

## Deep Explanation

### Service Worker Caching Strategies Architecture

```
Stale-While-Revalidate Flow:
Client Fetch ---> [Service Worker] --(1. Instant Return Stale)---> Client UI
                        |
                        +--(2. Async Background Fetch)---> Server API
                                                                |
                                                           (Update Cache API)
```

## Production Example

```javascript
// service-worker.js: Stale-While-Revalidate Implementation
const CACHE_NAME = 'v1-app-cache';
const DYNAMIC_URLS = ['/api/dashboard', '/api/user/profile'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(['/', '/index.html', '/styles.css', '/bundle.js']);
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (DYNAMIC_URLS.includes(url.pathname)) {
    // Strategy: Stale-While-Revalidate for dynamic API endpoints
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);
        
        // Trigger background network fetch to revalidate
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });

        // Return cached response instantly if available, otherwise wait for network
        return cachedResponse || fetchPromise;
      })
    );
  }
});
```

## Best Practices

- Use `Cache-Control: public, max-age=31536000, immutable` for content-hashed static assets (`bundle.x8f2a.js`).
- Use `Cache-Control: no-cache` for `index.html` to guarantee instant deployment rollouts when HTML asset references change.

## Common Mistakes

- Setting `max-age=31536000` on `index.html` without content hashing, locking users into outdated application versions for a year with no way to force a remote update.

## Follow-up Questions

1. How does the Workbox library simplify complex PWA caching routing strategies?

## Related Topics

- Web Performance: Core Web Vitals & INP Optimization
- Frontend System Design Framework
