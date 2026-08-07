# T2201 · Next.js App Router, React Server Components (RSC) & Rendering Strategies

**Difficulty:** Hard  
**Companies Asked:** Vercel, Meta, Stripe, Netflix, Airbnb  
**Interview Frequency:** ★★★★★  
**Category:** Next.js  
**Concepts:** nextjs, app-router, server-components, ssr, ssg, isr, streaming  

## Question

How does the Next.js App Router leverage React Server Components (RSC) to minimize client bundle size, what are the differences between SSR, SSG, ISR, and Dynamic Rendering, and how does Streaming with Suspense improve Core Web Vitals (specifically LCP and INP)?

## Expected Answer

1. **React Server Components (RSC)** run exclusively on the Node.js server during render, generating zero client JavaScript bundle. Dependencies imported only by RSC (e.g. Markdown parsers, database drivers) are stripped from client bundles. Client Components (`'use client'`) handle interactive DOM events.
2. **Rendering Strategies**:
   - **Static Site Generation (SSG)**: Pre-renders pages at build time. High performance via CDN edge caching.
   - **Server-Side Rendering (SSR)**: Renders HTML per request on the server. Always fresh data.
   - **Incremental Static Regeneration (ISR)**: Revalidates static pages in the background after a specified duration (`revalidate` seconds) without re-building the entire site.
   - **Dynamic Rendering**: Automatically triggered in App Router when uncached data or dynamic functions (`cookies()`, `headers()`) are accessed.
3. **Streaming & Suspense**: Break the HTML render into progressive chunks over HTTP/1.1 or HTTP/2 streams. Users see Shell/Skeleton UI immediately without waiting for slow server database queries.

## Deep Explanation

### 1. RSC Architecture vs Client Components Boundary
In the Next.js App Router:
- **Server Components (Default)**: Fetch data close to the database, keep secret keys secure, execute async/await directly in component bodies, and reduce bundle payload.
- **Client Components (`'use client'`)**: Executed on server for initial HTML generation, then hydrated on client. Required for React state (`useState`), effects (`useEffect`), and event listeners (`onClick`).

*Boundary Rule*: You can import a Client Component inside a Server Component. You cannot import a Server Component inside a Client Component; instead, pass it as a `children` prop.

### 2. Streaming with React Suspense
Traditional SSR blocks HTML delivery until the slowest API request finishes:
`Request -> Database Fetch -> Render Full HTML -> Send Response -> Hydrate All`

With Streaming:
`Request -> Send Shell HTML (with Skeleton) -> Stream Chunk 1 (Ready) -> Stream Chunk 2 (Async Resolved)`

This dramatically improves **First Contentful Paint (FCP)** and **Largest Contentful Paint (LCP)**.

## Production Example

```tsx
// app/dashboard/page.tsx (React Server Component)
import { Suspense } from 'react';
import { AnalyticsCard } from '@/components/AnalyticsCard';
import { SkeletonCard } from '@/components/SkeletonCard';
import { UserProfile } from '@/components/UserProfile';

// Revalidate static cache every 60 seconds (ISR)
export const revalidate = 60;

async function fetchAnalyticsData() {
  const res = await fetch('https://api.internal/analytics', {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
}

export default async function DashboardPage() {
  return (
    <div className="dashboard-layout">
      <h1>Executive Dashboard</h1>

      {/* Synchronous/fast Server Component */}
      <UserProfile />

      {/* Async Server Component wrapped in Suspense for HTML Streaming */}
      <Suspense fallback={<SkeletonCard />}>
        <AnalyticsSection />
      </Suspense>
    </div>
  );
}

async function AnalyticsSection() {
  const data = await fetchAnalyticsData();
  return <AnalyticsCard data={data} />;
}
```

## Best Practices

- Move `'use client'` directive as deep down the component tree as possible (e.g. wrap only the interactive button, not the entire page layout).
- Use `fetch` caching options (`{ cache: 'force-cache' }` vs `{ cache: 'no-store' }`) explicitly to control Static vs Dynamic page behavior.
- Leverage `loading.tsx` and `error.tsx` route segments for declarative fallback UI boundaries.

## Common Mistakes

- Adding `'use client'` to the root page or layout file, converting the entire page tree into Client Components and losing RSC bundle optimization.
- Calling browser-only APIs (`window`, `localStorage`) inside Server Components without checking environment or using Client Components.

## Follow-up Questions

1. How does Next.js handle Server Actions (`'use server'`) for form submissions and mutations?
2. What is the role of the `unstable_cache` API and tags-based revalidation (`revalidateTag`) in App Router?

## Related Topics

- React Fiber & Concurrent Rendering
- Core Web Vitals: LCP, INP, and CLS Optimization
