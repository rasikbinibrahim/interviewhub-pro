# T6009 · High-Level System Design: Real-Time Chat Application Architecture (Slack / Teams)

**Difficulty:** Hard  
**Companies Asked:** Meta, Slack, Microsoft, Google, Amazon  
**Category:** Frontend System Design  
**Concepts:** hld, system-design, chat-app, websockets, local-db-indexeddb  

## Question

How do you design a real-time collaborative chat application (like Slack or WhatsApp Web) supporting **WebSocket full-duplex communication**, offline messaging via **IndexedDB**, message virtualized infinite list rendering, typing indicators, and read receipts?

## Key Architectural Layers

1. **Transport Layer**: WebSockets for 2-way real-time messaging; fallback to HTTP Long Polling.
2. **Local Persistence (IndexedDB)**: Cache messages locally for instant load time and offline drafting.
3. **UI Virtualization**: Render visible chat message windows using `react-window` to handle 100,000+ channel message histories at 60 FPS.
4. **State Synchronizer**: Sequence message IDs (`seq_id`) to reconcile out-of-order message delivery across network reconnects.
