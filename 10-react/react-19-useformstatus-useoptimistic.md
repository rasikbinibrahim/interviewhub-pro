# T1022 · React 19 Form Hooks: `useFormStatus()` & `useOptimistic()`

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Vercel, Amazon  
**Category:** React  
**Concepts:** react-19, useformstatus, useoptimistic, server-actions  

## Question

How do React 19 **`useFormStatus()`** and **`useOptimistic()`** manage pending form submit states and instant optimistic UI updates during Server Actions?

## Expected Answer

```jsx
import { useFormStatus, useOptimistic } from 'react';

// 1. Child component reads parent <form> submission status
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? 'Saving...' : 'Save'}</button>;
}

// 2. Optimistic state updates
function LikeButton({ currentLikes, updateLikesAction }) {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    currentLikes,
    (state, newCount) => newCount
  );

  return (
    <button onClick={async () => {
      setOptimisticLikes(optimisticLikes + 1); // Instant UI update!
      await updateLikesAction(optimisticLikes + 1);
    }}>
      Likes: {optimisticLikes}
    </button>
  );
}
```
