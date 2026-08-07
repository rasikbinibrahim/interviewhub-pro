# T107 · Frontend System Design: Realtime Chat & WebSockets

**Difficulty:** Hard  
**Companies Asked:** Meta, Slack, WhatsApp, Atlassian  
**Interview Frequency:** ★★★★★  
**Category:** Frontend System Design  
**Concepts:** WebSockets, SSE, optimistic updates, offline storage, virtualization  

## Question

Architect a scalable Realtime Messaging Client (like Slack or WhatsApp Web) supporting offline persistence, optimistic message sends, reconnect handling, and virtualized message lists.

## Expected Answer

A production realtime chat architecture consists of 5 core layers:
1. **Transport Layer**: WebSocket connection manager with exponential backoff reconnection and heartbeat ping/pong.
2. **Local Persistence Layer**: IndexedDB (using idb or Dexie) for offline storage and instant cold-boot startup.
3. **State & Sync Layer**: Redux/Zustand store with optimistic update pipeline for message dispatch.
4. **View Layer**: Virtualized windowed list (`react-window`) rendering 10,000+ messages without DOM degradation.
5. **Media & Asset Pipeline**: Chunked file upload worker with progress notifications.

## Deep Explanation

Optimistic Send Flow:
1. User clicks Send -> Generate temporary client UUID.
2. Instantly append message to local state with `status: "pending"`.
3. Save to IndexedDB queue and send over WebSocket.
4. When server ACKs message -> update local ID to server ID and status to `"sent"`.
5. If socket fails -> mark `status: "failed"` with Retry button, keeping payload in IndexedDB queue.

## Production Example

WhatsApp Web uses IndexedDB as single source of truth. Incoming WebSocket messages update IndexedDB first; reactive DB listeners then update the UI tree. This guarantees zero message loss even if the browser tab crashes unexpectedly.

## Best Practices

- Use virtualized lists so only visible messages (~30 nodes) remain in the DOM tree.
- Implement binary protocol (Protobuf) over WebSockets for reduced payload footprint compared to raw JSON.
- Gracefully fall back to Server-Sent Events (SSE) or HTTP Long Polling if WebSocket ports are blocked by enterprise proxies.

## Trade-offs

IndexedDB local persistence enables instant load and offline capability, but introduces complex multi-tab synchronization challenges (resolved via BroadcastChannel API).

## Common Mistakes

- Storing 5,000 message DOM nodes directly in the unvirtualized DOM, causing severe scrolling lag.
- Relying on server responses before displaying sent messages in UI (causes perceived latency).

## Follow-up Questions

1. How do you synchronize unread message counters across multiple open browser tabs?
2. What strategies handle out-of-order message arrival during reconnect sync?

## Related Topics

- IndexedDB
- WebSockets
- BroadcastChannel
