# T6015 · High-Level System Design: Real-Time Collaborative Document Editor (Google Docs / Notion)

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Notion, Microsoft  
**Category:** Frontend System Design  
**Concepts:** hld, system-design, collaborative-editor, crdt, ot, websockets  

## Question

How do you design a real-time **Collaborative Document Editor** using **Conflict-Free Replicated Data Types (CRDTs / Yjs)** or **Operational Transformation (OT)** over WebSockets with offline syncing and presence cursors?

## Key Architectural Layers

1. **CRDT Data Structure (Yjs / Automerge)**: Enables decentralized concurrent state convergence without server locks.
2. **WebSocket Synchronization Layer**: Broadcast delta state operations across connected clients.
3. **Presence Manager**: Transmit remote cursor locations and selection ranges.
