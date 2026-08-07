# T1030 · React Server Components (RSC) vs Client Components (`'use client'`)

**Difficulty:** Hard  
**Companies Asked:** Meta, Vercel, Google, Amazon, Next.js  
**Category:** React  
**Concepts:** rsc, react-server-components, use-client, ssr  

## Question

How do **React Server Components (RSC)** execute exclusively on the server with 0-bundle-size footprint, and how does the `'use client'` directive demarcate interactive client subtrees?

## Expected Answer

- **Server Components (Default in RSC)**: Async components fetching databases/APIs directly on the server. Code never ships to the browser (0KB JS bundle size!). Cannot use state (`useState`) or event handlers (`onClick`).
- **Client Components (`'use client'`)**: Standard interactive components shipped to browser. Can use hooks, state, DOM event listeners, and browser APIs.
