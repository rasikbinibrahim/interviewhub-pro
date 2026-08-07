# T3402 · GraphQL Architecture vs REST: Queries, Mutations, Schema & Normalized Cache

**Difficulty:** Medium  
**Companies Asked:** Meta, Netflix, Twitter/X, Shopify, GitHub  
**Interview Frequency:** ★★★★☆  
**Category:** Networking  
**Concepts:** graphql, rest-api, apollo-client, schema, over-fetching, normalized-cache  

## Question

How does GraphQL architecture solve the Over-fetching and Under-fetching problems inherent in traditional REST APIs, how do Type System Schemas, Queries, and Mutations work, and how does client-side Normalized Caching (Apollo Client / Relay) maintain consistency across UI components?

## Expected Answer

1. **Over-fetching & Under-fetching in REST**:
   - **Over-fetching**: REST endpoints return fixed JSON payloads containing fields the client component does not need, wasting mobile bandwidth.
   - **Under-fetching**: A client requires data from multiple resources (`/users/1`, `/users/1/posts`, `/users/1/followers`), forcing multiple sequential network round-trips (waterfall requests).
2. **GraphQL Solution**: A declarative query language operating over a single POST endpoint (`/graphql`). The client specifies the **EXACT shape of data** it requires in the request body, and the server returns matching JSON.
3. **Normalized Client Caching**: Client libraries like Apollo Client or Relay decompose incoming GraphQL nested JSON responses into flat normalized entities indexed by `__typename:id` (e.g. `User:123`). When a mutation updates `User:123`, **ALL UI components** reading that entity re-render instantly without manual refetching.

## Deep Explanation

### REST Waterfall vs GraphQL Single Query Architecture

```
REST Architecture (Under-fetching Waterfall):
Client -> GET /users/1 -----------> Server (200 OK User)
Client -> GET /users/1/posts -----> Server (200 OK Posts)
Client -> GET /users/1/followers --> Server (200 OK Followers)

GraphQL Architecture (Declarative Single Request):
Client -> POST /graphql (Query { user(id: 1) { name posts { title } } }) -> Server (200 OK)
```

## Production Example

```graphql
# 1. GraphQL Query Definition
query GetUserProfile($userId: ID!) {
  user(id: $userId) {
    id
    name
    avatarUrl
    posts(limit: 5) {
      id
      title
      likeCount
    }
  }
}

# 2. GraphQL Mutation Definition
mutation LikePost($postId: ID!) {
  likePost(id: $postId) {
    id
    likeCount
    isLiked
  }
}
```

```javascript
// 3. Apollo Client React Integration
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      unreadCount
    }
  }
`;

export function UserProfileHeader({ userId }) {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
    fetchPolicy: 'cache-first', // Uses normalized cache first
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>Welcome, {data.user.name}! ({data.user.unreadCount} unread)</div>;
}
```

## Best Practices

- Always request `id` and `__typename` fields in GraphQL queries to enable automatic normalized cache indexing in Apollo Client / Relay.
- Use `fetchPolicy: 'cache-and-network'` for live dashboards requiring background freshness.

## Common Mistakes

- Using GraphQL as a thin wrapper over slow, un-indexed N+1 database queries on the server side without DataLoader batching.

## Follow-up Questions

1. What is the N+1 problem in GraphQL resolvers and how does DataLoader solve it via batching and caching?
2. How do GraphQL Subscriptions over WebSockets enable real-time data streaming?

## Related Topics

- HTTP/2, HTTP/3, WebSockets & REST Architecture
- TanStack Query Caching & Optimistic Mutations
