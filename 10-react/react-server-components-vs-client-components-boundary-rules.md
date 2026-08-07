# QREACT039 · React Server Components vs Client Components Boundary Rules

**Difficulty:** Hard  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Meta, Vercel, Netflix  
**Interview Frequency:** ★★★★★  
**Category:** React  
**Concepts:** React Server Components (RSC), "use client" directive, Serialization boundary, Bundle size  

## Expected Answer

React Server Components execute exclusively on the server, outputting a serialized UI stream directly to the browser without shipping JS code to the client bundle. Client Components (marked with "use client") execute on both server (SSR) and client, handling interactivity, hooks, and browser APIs.

## Deep Explanation

The boundary between Server and Client components is defined by prop serialization. Props passed from a Server Component to a Client Component must be JSON-serializable (primitives, plain objects, arrays, JSX elements, Server Actions). Functions, classes, and Symbol references cannot cross the boundary.

## Production Example

Importing heavy node-only libraries (e.g. database drivers or markdown parsers) into Client Components accidentally inflates JavaScript client bundles by megabytes; keeping them in RSC retains zero client bundle footprint.

## Best Practices

- Keep "use client" boundaries as low as possible in the component tree
- Pass Server Components as children to Client Components to preserve server-side rendering benefits

## Trade-offs

- Server Components cannot use state, effects, or browser DOM event listeners
- Client Components require JS download and hydration cost

## Common Mistakes

- Adding "use client" at the top of page layouts, unintentionally converting the entire subtree into Client Components
- Attempting to pass un-serializable functions as props across the RSC boundary

## Follow-up Questions

1. How does React serialize JSX children passed into a Client Component wrapper?
2. What is the RSC Flight data format used during streaming server responses?

## Related Topics

- Next.js App Router
- React Performance
