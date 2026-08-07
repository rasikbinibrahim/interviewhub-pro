# T1016 · React 19 `use()` Hook: Suspense Promise Unwrapping & Context Consumption

**Difficulty:** Medium  
**Companies Asked:** Meta, Vercel, Google, Amazon, Netflix  
**Interview Frequency:** ★★★★★  
**Category:** React  
**Concepts:** react, react-19, use-hook, suspense, promises, context  

## Question

What makes the React 19 **`use()` API** unique compared to traditional React hooks (`useContext`, `useEffect`), how does `use(promise)` unwrap asynchronous Promises directly inside component render functions in combination with `<Suspense>`, and why is `use()` the ONLY React hook allowed inside conditional statements and loops?

## Expected Answer

1. **The `use()` Hook Uniqueness**:
   - Standard React hooks (`useState`, `useEffect`, `useContext`) have strict rules of hooks — they CANNOT be called inside `if` statements, loops, or nested functions.
   - **`use(resource)` is the exception!** It can be called **conditionally** inside `if` blocks or loops!
2. **Unwrapping Promises (`use(promise)`)**:
   - Accepts a Promise or Context resource.
   - When passed a Promise, `use(promise)` **suspends rendering** until the Promise resolves, delegating loading fallback UI to the nearest `<Suspense>` boundary.
   - If the Promise rejects, the nearest `<ErrorBoundary>` catches the rejection.
3. **Conditional Context Consumption (`use(Context)`)**:
   - Replaces `useContext(Context)` with the added benefit of conditional execution: `if (showUser) { const user = use(UserContext); }`.

## Deep Explanation

### React 19 `use()` Hook vs Traditional Hooks

```
Traditional Hooks (Rules of Hooks Violation):
if (isLoggedIn) {
  const user = useContext(UserContext); // ERROR! Cannot call hook inside if block!
}

React 19 use() API (Conditional Call Allowed!):
if (isLoggedIn) {
  const user = use(UserContext); // VALID! Works inside conditional statements!
}
```

## Production Example

```jsx
// Production Pattern: Async Data Fetching with React 19 use(promise) and Suspense
import React, { use, Suspense } from 'react';

// 1. Initiate Data Promise on Server or Cache
function fetchUserProfile(userId) {
  return fetch(`/api/users/${userId}`).then((res) => {
    if (!res.ok) throw new Error('User not found');
    return res.json();
  });
}

// 2. Component unwrapping Promise via use()
function UserCard({ profilePromise }) {
  // Suspends component until promise resolves! No useState/useEffect needed!
  const user = use(profilePromise);

  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

// 3. Parent Wrapper with Suspense Fallback
export function UserProfilePage({ userId }) {
  const profilePromise = fetchUserProfile(userId);

  return (
    <main>
      <h1>User Dashboard</h1>
      <Suspense fallback={<div className="skeleton">Loading profile...</div>}>
        <UserCard profilePromise={profilePromise} />
      </Suspense>
    </main>
  );
}
```

## Best Practices

- Create Promise objects outside component render loops (or pass from Server Components) to prevent re-creating new pending Promise references on every render pass.
- Use `use(Context)` over `useContext(Context)` when context reads are optional or dependent on feature flags.

## Common Mistakes

- Initiating raw `fetch()` calls inline inside `use(fetch(...))` directly in the render body, which triggers infinite fetch loops on every render pass.

## Follow-up Questions

1. How does `use()` Promise unwrapping differ from React Server Components (RSC) `async/await` components?

## Related Topics

- React 19 Innovations: Auto-Memoization Compiler, `use()` Hook & Server Actions
- React Error Boundaries & Fallback UIs
