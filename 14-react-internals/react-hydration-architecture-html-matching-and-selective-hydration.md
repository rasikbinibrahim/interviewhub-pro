# QINT007 · React Hydration Architecture: HTML Matching and Selective Hydration

**Difficulty:** Hard  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Vercel, Meta, Next.js  
**Interview Frequency:** ★★★★★  
**Category:** React Internals  
**Concepts:** Hydration, Server-Side Rendering (SSR), Selective Hydration, Suspense streaming, Mismatch  

## Expected Answer

Hydration attaches React event listeners and internal Fiber structures to pre-rendered server HTML. Selective Hydration uses Suspense to hydrate visible user-interacted subtrees first.

## Deep Explanation

SSR sends static HTML to the browser for fast FCP. During client hydration (hydrateRoot), React walks the server DOM tree, matching DOM nodes against React elements, building Fiber nodes, and binding event handlers. Selective Hydration with Suspense streams HTML chunks and prioritizes hydrating subtrees the user clicks on before un-clicked background content.

## Production Example

A user clicking a button inside a streaming Suspense boundary forces React to pause current hydration and hydrate that button's subtree immediately to process the click.

## Best Practices

- Ensure server-rendered HTML matches client initial render output exactly
- Use <Suspense> boundaries to enable selective hydration for heavy page sections

## Trade-offs

- Provides fast initial page FCP while progressively enabling interactivity
- Hydration mismatch warnings incur client DOM patch overhead

## Common Mistakes

- Using Date.now() or Math.random() in render, producing server/client HTML mismatches
- Accessing window or localStorage during SSR initial render pass

## Follow-up Questions

1. How does suppressHydrationWarning suppress client mismatch errors?
2. What is the role of React Server Components in eliminating client hydration bundle size?

## Related Topics

- React Server Components
- Next.js App Router
