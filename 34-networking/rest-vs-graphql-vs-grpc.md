# T3417 · API Architecture Choice: REST vs GraphQL vs gRPC

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Netflix  
**Category:** Networking  
**Concepts:** api-design, rest, graphql, grpc, networking  

## Question

When should an enterprise architecture choose **REST** (resource URLs), **GraphQL** (declarative client field queries), or **gRPC / Protocol Buffers** (binary HTTP/2 RPC)?

## Expected Answer

- **REST**: Standard public APIs, HTTP caching leverage, simple client setup.
- **GraphQL**: Complex client apps with nested relations (eliminates over-fetching/under-fetching).
- **gRPC**: Low-latency microservice-to-microservice communication using strongly-typed Protobuf schemas over HTTP/2.
