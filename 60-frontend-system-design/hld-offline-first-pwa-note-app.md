# T6018 · High-Level System Design: Offline-First Progressive Web App (PWA Note App)

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Microsoft, Notion  
**Category:** Frontend System Design  
**Concepts:** hld, system-design, pwa, service-worker, indexeddb, offline-first  

## Question

How do you design an **Offline-First Progressive Web App (PWA Note Taking App)** supporting Service Worker asset caching (`Stale-While-Revalidate`), local-first mutations in **IndexedDB**, background sync, and two-way server conflict resolution?

## Key Architectural Pipeline

1. **Service Worker Offline Shell**: Caches static application shell resources (`CacheStorage`) for instant load time.
2. **IndexedDB Local Source of Truth**: All user mutations write directly to local IndexedDB first for 0ms response latency.
3. **Background Sync API**: When internet connection restores, Service Worker triggers `sync` events to push queued offline mutations to backend servers.
