# T2001 · TanStack Query (React Query) Cache Invalidation & Optimistic Mutations

**Difficulty:** Hard  
**Companies Asked:** Stripe, Airbnb, DoorDash, Uber, Coinbase  
**Interview Frequency:** ★★★★★  
**Category:** React Query  
**Concepts:** react-query, tanstack-query, server-state, cache-invalidation, optimistic-updates  

## Question

How does TanStack Query (React Query) separate server state from client state, how do `staleTime` and `gcTime` (formerly `cacheTime`) govern cache freshiness and garbage collection, and how do you implement optimistic mutations with rollback on network failure?

## Expected Answer

1. **Server vs Client State**: Server state is asynchronous, remotely owned, shared among users, and requires polling/invalidation to remain fresh. Client state is synchronous and local to component rendering trees (`useState`, `useReducer`). TanStack Query isolates server state into a dedicated global query cache.
2. **`staleTime` vs `gcTime`**:
   - **`staleTime`**: The duration (in milliseconds) data remains considered "fresh". While fresh, React Query satisfies component renders from cache without making network requests. Once stale, window focus or remounts trigger background re-fetching (`stale-while-revalidate`). Default = `0`.
   - **`gcTime`**: The duration inactive/unsubscribed query cache entries are retained in memory before garbage collection removes them. Default = 5 minutes (`300,000` ms).
3. **Optimistic Updates**: Update UI state immediately before network response returns. Use `onMutate` to cancel outgoing queries, snapshot previous cache state, and write optimistic data to cache. If mutation fails, `onError` restores the snapshot. `onSettled` invalidates query keys to guarantee final server consistency.

## Deep Explanation

### 1. Stale-While-Revalidate Lifecycle
When a component mounts calling `useQuery(['user', userId], fetchUser)`:
1. **Cache Hit + Fresh (`staleTime > 0`)**: Returns cached data immediately. No network request.
2. **Cache Hit + Stale (`staleTime === 0`)**: Returns cached data immediately (Fast Paint), while initiating background HTTP fetch. When HTTP completes, updates cache and re-renders component transparently.
3. **Cache Miss**: Shows loading state (`isLoading: true`) until network fetch completes.

### 2. Optimistic Mutation Pattern Flow

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedTodo: Todo) => {
      const res = await fetch(`/api/todos/${updatedTodo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });
      if (!res.ok) throw new Error('Update failed');
      return res.json();
    },
    // 1. Before mutation request starts
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // Snapshot previous value for rollback
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      // Optimistically update cache
      queryClient.setQueryData<Todo[]>(['todos'], (old = []) =>
        old.map((todo) => (todo.id === newTodo.id ? newTodo : todo))
      );

      return { previousTodos };
    },
    // 2. If mutation fails, rollback to snapshot
    onError: (err, newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },
    // 3. Always refetch after error or success to ensure server sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}
```

## Best Practices

- Define query keys as structured tuples (`['users', { status: 'active', page: 1 }]`) for predictable key matching and targeted invalidation.
- Set a sensible global `staleTime` (e.g. `10 * 1000` ms) in `QueryClient` defaults to prevent aggressive background refetching loops on window focus.
- Always return the context object from `onMutate` containing snapshot state for `onError` rollback.

## Common Mistakes

- Setting `gcTime` lower than `staleTime`, causing inactive queries to be garbage collected while still considered fresh.
- Mutating cached data directly in components instead of calling `queryClient.setQueryData()` or triggering mutations.

## Follow-up Questions

1. How do you implement infinite scrolling and pagination using `useInfiniteQuery` and `getNextPageParam`?
2. What are the key architectural differences between RTK Query and TanStack Query?

## Related Topics

- RTK Query Data Fetching & Caching Layer
- Optimistic UI Design & Server State Management
