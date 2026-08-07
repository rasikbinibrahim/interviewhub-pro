# T1601 · Redux Toolkit (RTK) Architecture & RTK Query Caching Layer

**Difficulty:** Hard  
**Companies Asked:** Meta, Amazon, Uber, DoorDash, Stripe  
**Interview Frequency:** ★★★★☆  
**Category:** Redux  
**Concepts:** redux-toolkit, rtk-query, state-management, cache-invalidation, normalization  

## Question

Why does modern Redux mandate Redux Toolkit (RTK) over legacy boilerplate, how does RTK Query manage server-state caching and cache invalidation via tags, and how does RTK maintain immutability using Immer under the hood?

## Expected Answer

1. **Redux Toolkit (RTK)** solves legacy Redux pain points (excessive boilerplate, manual immutability spread operators, manual action/reducer string pairing) by unifying store setup (`configureStore`), slice creation (`createSlice`), and immutable mutations via **Immer** draft objects.
2. **RTK Query** is an integrated data fetching and caching tool built on RTK. It automatically eliminates manual loading/error state management by caching endpoint results using auto-generated query hooks and managing cache invalidation via declarative **Tags** (`providesTags` and `invalidatesTags`).

## Deep Explanation

### 1. How Immer Enables Direct Mutation Syntax
Inside RTK `createSlice` reducers, developers write mutating code (e.g. `state.user.name = 'Alice'`). Under the hood, RTK wraps reducers with Immer's `produce` function. Immer uses ES6 `Proxy` objects to record all mutations against a temporary draft state and automatically outputs a new structurally-shared immutable state tree.

### 2. RTK Query Cache Lifecycle & Tag Invalidation
RTK Query maintains a centralized normalized cache slice in the Redux store:
- **Query Hook Invocation**: Subscribes component to endpoint data. If cached data exists and is fresh (within `keepUnusedDataFor`), RTK Query skips the network call.
- **`providesTags`**: Tells RTK Query which cache tags are associated with the fetched data (e.g., `[{ type: 'Post', id: '1' }]`).
- **`invalidatesTags`**: When a mutation runs (e.g., `updatePost`), it declares `invalidatesTags: ['Post']`. RTK Query immediately flags cached queries tagged with `'Post'` as stale and automatically triggers background re-fetching for active component subscribers.

## Production Example

```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: string;
  title: string;
  body: string;
}

// 1. RTK Query Service Definition
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Post' as const, id })), { type: 'Post', id: 'LIST' }]
          : [{ type: 'Post', id: 'LIST' }],
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = postsApi;

// 2. Client UI Slice Definition
interface UIState {
  theme: 'light' | 'dark';
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: { theme: 'light' } as UIState,
  reducers: {
    toggleTheme(state) {
      // Direct mutation enabled by Immer Proxy draft
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = uiSlice.actions;

// 3. Centralized Store Setup
export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## Best Practices

- Store only global UI state in client slices; manage server data entirely through RTK Query.
- Provide granular entity tags (`{ type: 'Post', id }`) rather than blanket general tags to avoid unnecessary over-fetching on single item updates.
- Always include `postsApi.middleware` in `configureStore` to enable cache lifetime management, polling, and subscription garbage collection.

## Common Mistakes

- Returning a value while also mutating `state` inside an Immer reducer, causing conflicting state return errors.
- Storing server API responses inside custom Redux slices instead of leveraging RTK Query hooks.

## Follow-up Questions

1. How do Optimistic Updates work in RTK Query (`onQueryStarted` with `dispatch(api.util.updateQueryData)`)?
2. When should an engineering team choose Zustand or React Query over Redux Toolkit?

## Related Topics

- React Query / TanStack Query Server State Management
- Global State Management & Unidirectional Data Flow
