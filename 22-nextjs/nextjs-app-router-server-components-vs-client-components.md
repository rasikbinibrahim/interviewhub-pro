# T2202 · Next.js App Router Architecture: React Server Components (RSC) vs `'use client'` Directives

**Difficulty:** Medium  
**Companies Asked:** Vercel, Meta, Google, Netflix, Amazon  
**Interview Frequency:** ★★★★★  
**Category:** Next.js  
**Concepts:** nextjs, app-router, rsc, server-components, client-components, hydration  

## Question

How does the Next.js App Router model shift default component rendering to React Server Components (RSC), how do Server Components differ from traditional Client Components (`'use client'`), and what are the strict composition rules when passing data across the Server-Client Boundary?

## Expected Answer

1. **React Server Components (RSC) Default**:
   - In Next.js App Router (`app/`), **all components are Server Components by default**.
   - Rendered exclusively on the server into a streamed RSC payload. Zero client-side JavaScript bundle overhead for Server Components!
   - Can access server resources directly (databases, filesystem, internal API secrets).
2. **Client Components (`'use client'`)**:
   - Opted into by placing `'use client'` at the very top of the file.
   - Pre-rendered on the server (HTML) and hydrated on the client browser.
   - Required whenever using browser APIs (`window`, `localStorage`), React hooks (`useState`, `useEffect`, `useRef`), or interactive event listeners (`onClick`).
3. **Server-Client Boundary Rules**:
   - You **CANNOT import a Server Component directly into a Client Component**.
   - You **CAN pass a Server Component as `children` or a prop to a Client Component** (`<ClientLayout><ServerFeed /></ClientLayout>`).
   - Props passed from Server to Client Components **MUST be serializable** (no functions, dates, or symbols).

## Deep Explanation

### Server-Client Boundary Architecture

```
Server Component (app/page.js)
  │  ├── Queries Database directly (db.query())
  │  └── Passes serializable JSON props to Client Component
  │
  ▼
Client Boundary ('use client' in UserCard.js)
     ├── Hydrates on browser
     └── Listens for user click events (onClick)
```

## Production Example

```jsx
// app/dashboard/page.jsx (Server Component - Default)
import { db } from '@/lib/db';
import { InteractiveChart } from './InteractiveChart'; // Client Component

export default async function DashboardPage() {
  // Direct Server Database Access! Zero client JS payload!
  const analyticsData = await db.analytics.findMany();

  return (
    <main>
      <h1>Server Dashboard</h1>
      <p>Data fetched directly on server at zero bundle cost.</p>

      {/* Passing serializable JSON data across boundary */}
      <InteractiveChart data={analyticsData} />
    </main>
  );
}
```

```jsx
// app/dashboard/InteractiveChart.jsx (Client Component)
'use client'; // Opts this module and its imports into the Client Bundle

import { useState } from 'react';

export function InteractiveChart({ data }) {
  const [filter, setFilter] = useState('all');

  return (
    <div>
      <button onClick={() => setFilter('active')}>Filter Active</button>
      <p>Total Data Points: {data.length} (Filter: {filter})</p>
    </div>
  );
}
```

## Best Practices

- Keep `'use client'` leaves as far down the component tree as possible (e.g. on specific interactive buttons or charts) to maximize Server Component zero-bundle benefits.
- Use `server-only` build package (`import 'server-only'`) in server database utility files to prevent accidental importing of sensitive server logic into client bundles.

## Common Mistakes

- Placing `'use client'` at the root `layout.jsx` level, turning the entire application into a traditional heavy client-rendered app and invalidating RSC performance gains.

## Follow-up Questions

1. What is the RSC Payload format and how does Next.js stream Server Components to the browser progressively using `<Suspense>`?

## Related Topics

- Server-Side Rendering (SSR), Static Site Generation (SSG) & Incremental Static Regeneration (ISR)
- React 19 Innovations: Auto-Memoization Compiler, `use()` Hook & Server Actions
