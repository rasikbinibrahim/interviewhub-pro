# T3411 · CDN Edge Architecture: Geographic PoP Routing & Cache Invalidation

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Cloudflare, Fastly  
**Category:** Networking  
**Concepts:** networking, cdn, edge-caching, pop, cache-invalidation  

## Question

How do **Content Delivery Networks (CDNs)** use Anycast IP routing to route users to the nearest Points of Presence (PoPs), and how do Cache Invalidation strategies (Purge by Tag / Path) operate?

## Expected Answer

- **Points of Presence (PoP)**: Edge servers deployed worldwide close to users to serve cached static assets with minimal latency.
- **Anycast Routing**: Single IP address announced by multiple BGP routers globally; DNS routes traffic to geographically closest server.
- **Cache Invalidation**: Hard purge vs soft purge (Stale-While-Revalidate) using cache tags / surrogate keys.
