# T502 · Client-Side Storage Architecture: `localStorage` vs `sessionStorage` vs `IndexedDB` vs Cookies

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** Browser Internals  
**Concepts:** storage, localstorage, sessionstorage, indexeddb, cookies, browser-security  

## Question

How do `localStorage`, `sessionStorage`, `IndexedDB`, and `Cookies` compare across capacity limits, persistence lifetimes, API complexity (synchronous vs asynchronous), server header inclusion, and security risks (XSS / CSRF)?

## Expected Answer

1. **Storage Mechanism Comparison Matrix**:
   - **`localStorage`**: Synchronous key-value storage. Persists across browser restarts until manually cleared. Capacity: ~5MB per origin. Accessible via JS (vulnerable to XSS).
   - **`sessionStorage`**: Synchronous key-value storage. Cleared automatically when the specific tab/window is closed. Capacity: ~5MB.
   - **`IndexedDB`**: Asynchronous transactional NoSQL object store. Persists indefinitely. Capacity: Hundreds of MBs / GBs (fraction of total disk space). Ideal for offline PWA data.
   - **Cookies**: Small strings sent automatically on every HTTP request header. Capacity: ~4KB per domain. Supports `HttpOnly` (blocks JS access, mitigating XSS) and `SameSite` (mitigates CSRF).

## Deep Explanation

### Browser Storage Architecture

| Property | `localStorage` | `sessionStorage` | `IndexedDB` | HTTP Cookies |
|---|---|---|---|---|
| **Capacity** | ~5 MB | ~5 MB | > 250 MB (Varies) | ~4 KB |
| **Lifetime** | Permanent | Tab Lifetime | Permanent | Configurable (`Expires`/`Max-Age`) |
| **I/O Access** | Synchronous | Synchronous | Asynchronous | Auto HTTP Headers + JS |
| **Sent to Server** | No | No | No | Yes (Every Request) |
| **XSS Risk** | High | High | High | Low (with `HttpOnly`) |

## Production Example

```javascript
// Production Pattern: Asynchronous IndexedDB Storage Utility using Promises
export function openDatabase(dbName = 'AppDB', version = 1) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('offlineQueue')) {
        db.createObjectStore('offlineQueue', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveOfflineItem(db, item) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['offlineQueue'], 'readwrite');
    const store = transaction.objectStore('offlineQueue');
    const request = store.add({ ...item, timestamp: Date.now() });

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
```

## Best Practices

- Never store JWT access tokens or sensitive user PII in `localStorage` — an XSS vulnerability allows malicious scripts to exfiltrate tokens via `localStorage.getItem('token')`.
- Use `HttpOnly; Secure; SameSite=Strict` cookies for authenticating session tokens.

## Common Mistakes

- Performing heavy `localStorage` operations inside main-thread scroll or animation callbacks, triggering main thread I/O junk due to `localStorage` synchronous blocking reads/writes.

## Follow-up Questions

1. What is the Storage Estimate API (`navigator.storage.estimate()`) and how does it prevent storage exhaustion errors in PWAs?

## Related Topics

- Frontend Security: XSS Prevention, CSRF Mitigation & Security Headers
- Browser Caching, Service Workers & Progressive Web Apps (PWA)
