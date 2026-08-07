# T8301 · Frontend System Design & Architecture One-Page Cheat Sheet

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Stripe, Netflix  
**Interview Frequency:** ★★★★★  
**Category:** Revision & Cheat Sheets  
**Concepts:** cheat-sheets, system-design, architecture, performance, security  

## Question

Provide a comprehensive, high-density one-page cheat sheet for Senior and Staff Frontend System Design & Architecture interviews covering client state, rendering strategies, caching, real-time networking, security, and performance metrics.

## Expected Answer

A complete, high-density reference sheet structured across the 6 core pillars of Frontend System Design:

### 1. Rendering Strategies Decision Matrix
- **Static Site Generation (SSG)**: Pre-rendered at build time. Ideal for marketing pages, documentation, and blogs.
- **Server-Side Rendering (SSR)**: Dynamic HTML rendered per-request on Node server. Ideal for personalized dynamic feeds needing strict SEO.
- **Incremental Static Regeneration (ISR)**: Static rendering with background revalidation interval (`revalidate: N`).
- **React Server Components (RSC)**: Zero-bundle server execution. Only interactive Client Components (`'use client'`) ship JS to the browser.

### 2. State Management Architecture
- **Server State**: Async, remote, shared. Managed via TanStack Query (React Query) or RTK Query. Uses `staleTime` and tag invalidation.
- **Global UI State**: Lightweight synchronous client state. Managed via Zustand or Redux Toolkit.
- **Local Component State**: Component-tree bounded state. Managed via `useState`, `useReducer`, or `useRef`.

### 3. Realtime Networking Selection
- **Short Polling**: Simple `setInterval` HTTP GETs. High overhead.
- **Long Polling**: Server holds HTTP request open until data is ready.
- **Server-Sent Events (SSE)**: Unidirectional (Server -> Client) text stream over HTTP (`EventSource`). Ideal for AI LLM token streaming & live feeds.
- **WebSockets**: Full-duplex bidirectional TCP socket. Ideal for chat, collaborative canvas (Figma), and games.

### 4. Client-Side Security Shield
- **XSS (Cross-Site Scripting)**: Prevent via automatic React JSX escaping, `DOMPurify` for HTML string rendering, and strict `Content-Security-Policy` (CSP) headers.
- **CSRF (Cross-Site Request Forgery)**: Prevent via `SameSite=Strict` or `SameSite=Lax` cookies and anti-CSRF tokens in `Custom-Header` headers.
- **Auth Tokens**: Store short-lived JWTs in memory; store refresh tokens in `HttpOnly`, `Secure`, `SameSite` cookies.

### 5. Web Performance Benchmarks (Core Web Vitals)
- **LCP (Largest Contentful Paint)**: Main content load speed. Target `< 2.5s`. Optimize via priority fetch, CDN edge caching, and image sizing.
- **INP (Interaction to Next Paint)**: UI responsiveness to clicks/taps. Target `< 200ms`. Optimize via Web Workers, splitting long tasks, and yields to main thread.
- **CLS (Cumulative Layout Shift)**: Visual layout stability. Target `< 0.1`. Optimize via explicit `aspect-ratio` and width/height dimensions.

## Deep Explanation

This cheat sheet serves as a rapid revision reference before architectural interview rounds, summarizing trade-offs and decision criteria across every major frontend layer.

## Production Example

```typescript
// Quick Reference: Standardized Query Key & Cache Matrix
export const QUERY_KEYS = {
  user: (id: string) => ['users', id] as const,
  userList: (filters: object) => ['users', 'list', filters] as const,
  posts: ['posts'] as const,
};
```

## Best Practices

- Keep cheat sheets concise, high-density, and structured around decision matrices.
- Review Core Web Vitals targets (`LCP < 2.5s`, `INP < 200ms`, `CLS < 0.1`) before every performance interview.

## Common Mistakes

- Conflating Server State caching with Client UI State stores.
- Suggesting WebSockets when Server-Sent Events (SSE) provide a simpler, native HTTP alternative.

## Follow-up Questions

1. How do you design an offline-first sync engine using IndexedDB and CRDTs?

## Related Topics

- Frontend System Design Framework
- Web Performance: Core Web Vitals & INP Optimization
