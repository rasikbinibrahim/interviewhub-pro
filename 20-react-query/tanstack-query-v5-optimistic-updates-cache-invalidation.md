# T2002 · TanStack Query v5 (React Query): Optimistic UI Updates, `useMutation` & Query Invalidation

**Difficulty:** Hard  
**Companies Asked:** Meta, Google, Amazon, Stripe, Airbnb, Netflix  
**Interview Frequency:** ★★★★★  
**Category:** React Query  
**Concepts:** react-query, tanstack-query, optimistic-updates, cache-invalidation, usemutation  

## Question

How does TanStack Query (React Query v5) manage server-state caching, how do you implement **Optimistic UI Updates** using `useMutation` (updating the UI instantly before backend response confirmation with automatic rollback on error), and how does smart Query Invalidation (`queryClient.invalidateQueries`) keep UI feeds fresh?

## Expected Answer

1. **Server State Management**: Separates Client State (UI modal toggles, active tabs) from Server State (asynchronous remote data fetching, caching, deduplication, and stale-time invalidation).
2. **Optimistic Updates Pattern**:
   - `onMutate`: Fires immediately when mutation triggers. Cancel outgoing refetches (`cancelQueries`), snapshot previous cache state (`getQueryData`), and optimistically inject predicted mutation payload into cache (`setQueryData`).
   - `onError`: Rollback cache state using the snapshot context captured in `onMutate`.
   - `onSettled`: Always invalidate target queries (`invalidateQueries`) to refetch authentic server state.

## Deep Explanation

### Optimistic Mutation Lifecycle

```
User Clicks 'Like Post' Button
              │
              ▼
[ onMutate ] ──► 1. queryClient.cancelQueries({ queryKey: ['post', id] })
              ──► 2. Snapshot Previous Cache: context.previousPost
              ──► 3. Instantly Update UI Cache: likeCount + 1 (0ms Latency!)
              │
     ┌────────┴────────┐
  SUCCESS           ERROR
     │                 │
     ▼                 ▼
[ onSettled ]     [ onError ] ──► Rollback to context.previousPost!
     │
Refetches Latest Server Data
```

## Production Example

```javascript
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useLikePostMutation(postId) {
  const queryClient = useQueryClient();
  const queryKey = ['post', postId];

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/posts/${postId}/like`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to like post');
      return res.json();
    },

    // 1. Optimistic Execution Step
    onMutate: async () => {
      // Cancel outgoing refetches to prevent overwriting optimistic state
      await queryClient.cancelQueries({ queryKey });

      // Snapshot previous cache
      const previousPost = queryClient.getQueryData(queryKey);

      // Optimistically update cache state immediately
      queryClient.setQueryData(queryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          likeCount: old.likeCount + 1,
          isLiked: true,
        };
      });

      // Return context containing previous snapshot for potential rollback
      return { previousPost };
    },

    // 2. Rollback on Error Step
    onError: (err, newVariables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(queryKey, context.previousPost);
      }
    },

    // 3. Always refetch authentic server state on completion
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
```

## Best Practices

- Always return the snapshot context from `onMutate` to enable instant rollback during network disconnections or server validation errors.
- Use `staleTime: 1000 * 60 * 5` (5 minutes) for semi-static data to prevent unnecessary background refetches on window focus.

## Common Mistakes

- Forgetting to call `await queryClient.cancelQueries()` inside `onMutate`, causing active background GET fetches to overwrite optimistic cache states mid-transition.

## Follow-up Questions

1. What is the difference between `staleTime` and `gcTime` (formerly `cacheTime`) in TanStack Query v5?

## Related Topics

- TanStack Query Caching & Integration Patterns
- GraphQL Architecture vs REST & Apollo Client
