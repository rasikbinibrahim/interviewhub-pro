# QNEXT003 · Next.js App Router Rendering Strategies: SSR, SSG, and ISR

**Difficulty:** Medium  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Vercel, Amazon, Nike  
**Interview Frequency:** ★★★★★  
**Category:** Next.js  
**Concepts:** App Router, Dynamic rendering, Static rendering, revalidatePath, fetch cache  

## Expected Answer

The Next.js App Router unifies Static Site Generation (SSG), Server-Side Rendering (SSR), and Incremental Static Regeneration (ISR) through route segment configurations and the extended fetch() caching API.

## Deep Explanation

By default, routes are statically rendered at build time if they do not consume dynamic functions (cookies(), headers(), searchParams). Including { next: { revalidate: 60 } } in fetch requests enables ISR, serving cached static pages while revalidating data in the background every 60 seconds.

## Production Example

E-commerce product detail pages utilize ISR to serve instantly from CDN caches while background revalidating price updates without rebuilding the entire 100,000-page site static export.

## Best Practices

- Default to static rendering whenever content is not user-personalized
- Use revalidateTag() for event-driven cache invalidation via webhooks

## Trade-offs

- Static pages load instantly but require revalidation strategies for stale content
- Dynamic SSR routes always compute at request time, introducing TTFB latency

## Common Mistakes

- Unintentionally forcing an entire route into dynamic rendering by accessing cookies() in a top-level component
- Not configuring proper fetch cache revalidation windows

## Follow-up Questions

1. How does Next.js 15 handle fetch cache defaults compared to Next.js 14?
2. What is Partial Prerendering (PPR) and how does it combine static shells with dynamic streams?

## Related Topics

- Next.js
- Performance
