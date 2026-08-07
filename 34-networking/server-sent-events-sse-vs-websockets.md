# T3413 · SSE vs WebSockets: Choosing the Right Real-Time Transport Protocol

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, OpenAI, Microsoft, Netflix  
**Category:** Networking  
**Concepts:** networking, sse, websockets, real-time, streaming  

## Question

Why is **Server-Sent Events (SSE)** preferred over WebSockets for AI LLM chat streaming (like ChatGPT) and live notification feeds?

## Expected Answer

- **SSE Advantages**: Unidirectional server push over standard HTTP/1.1 or HTTP/2. Automatic reconnection built into browser `EventSource` API. Bypasses firewall blocks natively.
- **WebSockets Use Case**: Full-duplex 2-way real-time communication (e.g. collaborative multiplayer games, canvas whiteboards).
