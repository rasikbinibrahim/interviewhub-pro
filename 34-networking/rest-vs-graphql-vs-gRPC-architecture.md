# T3406 · API Architecture Design: REST vs GraphQL vs gRPC Protocol Buffers

**Difficulty:** Hard  
**Companies Asked:** Amazon, Meta, Google, Uber, Netflix, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** Networking  
**Concepts:** networking, rest, graphql, grpc, protobuf, api-design  

## Question

How do **REST**, **GraphQL**, and **gRPC** compare across transport protocols (HTTP/1.1 vs HTTP/2), payload serialization formats (JSON vs Protocol Buffers), over-fetching/under-fetching data mitigation, schema type safety, and streaming performance?

## Expected Answer

1. **Protocol Architecture Comparison Matrix**:
   - **REST (Representational State Transfer)**: Standard resource-based HTTP GET/POST endpoints returning JSON. Prone to **over-fetching** (returning unneeded fields) or **under-fetching** (requiring multiple waterfall N+1 requests).
   - **GraphQL**: Single HTTP POST endpoint (`/graphql`). Allows clients to declare exact query shapes, eliminating over-fetching and under-fetching. Schema-first type system (`schema.graphql`).
   - **gRPC (Google Remote Procedure Call)**: High-performance RPC framework built natively on **HTTP/2**. Uses strongly-typed binary **Protocol Buffers (.proto)** instead of text JSON, reducing payload sizes by ~60–80% with microsecond serialization speeds.

## Deep Explanation

### Protocol Feature Matrix

| Property | REST | GraphQL | gRPC |
|---|---|---|---|
| **Transport** | HTTP/1.1 or HTTP/2 | HTTP/1.1 or HTTP/2 | Native HTTP/2 (Multiplexed) |
| **Payload Format** | Text JSON / XML | Text JSON | Binary Protocol Buffers (`.proto`) |
| **Data Fetching** | Fixed Endpoints | Exact Query Declarations | Strongly-typed RPC Methods |
| **Browser Support** | Native | Native | Requires `grpc-web` proxy |
| **Streaming** | SSE / WebSockets | Subscriptions (WebSockets) | Native Bi-Directional Streaming |

## Production Example

```protobuf
// 1. gRPC Protocol Buffer Definition (user_service.proto)
syntax = "proto3";

package user;

message UserRequest {
  string user_id = 1;
}

message UserResponse {
  string user_id = 1;
  string name = 2;
  string email = 3;
  int32 age = 4;
}

service UserService {
  rpc GetUserProfile (UserRequest) returns (UserResponse);
  rpc StreamUserData (UserRequest) returns (stream UserResponse);
}
```

```graphql
# 2. GraphQL Schema Declaration (schema.graphql)
type User {
  id: ID!
  name: String!
  email: String!
  age: Int!
}

type Query {
  user(id: ID!): User
}
```

## Best Practices

- Use REST for public-facing third-party API integrations where standard HTTP caching and URL routing are required.
- Use GraphQL for web and mobile frontends serving complex relational data models to eliminate network over-fetching.
- Use gRPC for high-throughput microservice-to-microservice backend communications and low-latency IoT/mobile streaming.

## Common Mistakes

- Using GraphQL for high-frequency binary file uploads or media streaming, which causes unnecessary base64 encoding overhead and CPU spikes compared to dedicated HTTP endpoints.

## Follow-up Questions

1. How does GraphQL DataLoader resolve the N+1 database query problem using batching and caching microtask queues?

## Related Topics

- Networking Protocol Evolution: HTTP/1.1 vs HTTP/2 vs HTTP/3 QUIC
- CORS Architecture: Preflight OPTIONS & Credentials
