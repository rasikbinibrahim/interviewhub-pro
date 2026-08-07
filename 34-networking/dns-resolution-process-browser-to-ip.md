# T3408 · DNS Resolution Journey: Browser Cache to Recursive Resolver to Root & Authoritative Nameservers

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Cloudflare, Amazon, Fastly  
**Interview Frequency:** ★★★★★  
**Category:** Networking  
**Concepts:** networking, dns, browser-cache, recursive-resolver, root-nameservers, ip-lookup  

## Question

What happens step-by-step when a user types a URL (e.g. `https://example.com`) into the browser address bar, how does **DNS Resolution** traverse caching layers (Browser Cache -> OS Cache -> Router Cache -> ISP Resolver), and how do **Recursive DNS Resolvers** query Root, TLD, and Authoritative Nameservers to resolve domain names to IP addresses?

## Expected Answer

1. **Caching Layer Lookup (Fast Path)**:
   - **Step 1: Browser DNS Cache**: Browser checks internal DNS cache (`chrome://net-internals/#dns`).
   - **Step 2: OS DNS Cache**: Checks OS resolver cache (`hosts` file, Windows DNS Client).
   - **Step 3: Router / ISP DNS Resolver**: Queries local Wi-Fi router and ISP Recursive Resolver.
2. **Recursive Name Resolution Journey (Un-cached Path)**:
   - **Step 4: Root Nameserver (`.`):** ISP Resolver queries Root Server to locate Top-Level Domain (TLD) nameserver.
   - **Step 5: TLD Nameserver (`.com`):** Root server responds with `.com` TLD Nameserver IP.
   - **Step 6: Authoritative Nameserver (`example.com`):** TLD server responds with Authoritative Nameserver IP (AWS Route53, Cloudflare).
   - **Step 7: IP Response:** Authoritative server returns target IPv4 (`93.184.216.34`) or IPv6 address.
   - **Step 8: Caching & TCP Handshake:** ISP Resolver caches IP with TTL (Time-To-Live) and returns to browser to initiate TCP/TLS handshake.

## Deep Explanation

### Recursive DNS Resolution Hierarchy

```
Browser typing "example.com"
          │
          ▼ Check Local Caches (Browser -> OS -> Router)
   [ ISP Recursive Resolver ]
          │
          ├── 1. Query Root Server (.) ─────────► Returns .com TLD Server IP
          ├── 2. Query TLD Server (.com) ──────► Returns Authoritative Server IP
          └── 3. Query Authoritative Server ───► Returns 93.184.216.34 (Target IP!)
          │
          ▼
Browser Initiates TCP / TLS 1.3 Handshake to IP!
```

## Production Example

```http
<!-- Resource Hint: DNS Prefetching for third-party API domains -->
<link rel="dns-prefetch" href="//api.stripe.com">
<link rel="dns-prefetch" href="//cdn.jsdelivr.net">

<!-- Preconnect: Resolves DNS + Performs TCP & TLS Handshake ahead of time! -->
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
```

## Best Practices

- Use `<link rel="dns-prefetch">` for third-party domains (analytics, ad networks) to resolve IP addresses in the background before users trigger actions.
- Use `<link rel="preconnect">` for critical third-party origin domains (Google Fonts, CDN assets) to complete DNS + TCP + TLS handshakes early.

## Common Mistakes

- Overusing `<link rel="preconnect">` on dozens of domains, wasting CPU and socket connections on TLS handshakes for domains that are never fetched.

## Follow-up Questions

1. What is DNS-over-HTTPS (DoH) and how does it encrypt DNS queries against ISP eavesdropping?

## Related Topics

- Critical Rendering Path & Resource Hints
- Networking Protocol Evolution: HTTP/1.1 vs HTTP/2 vs HTTP/3 QUIC
