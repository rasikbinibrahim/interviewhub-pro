# T6002 · High-Level Design (HLD): Realtime Collaborative Document Editor (CRDT vs OT)

**Difficulty:** Hard  
**Companies Asked:** Google (Docs), Figma, Notion, Meta, Microsoft  
**Interview Frequency:** ★★★★★  
**Category:** Frontend System Design  
**Concepts:** system-design, hld, collaborative-editing, crdt, operational-transformation, websockets  

## Question

Design a real-time collaborative rich-text document editor (e.g. Google Docs / Notion). Explain how you resolve concurrent edit conflicts across thousands of simultaneous users using Conflict-free Replicated Data Types (CRDTs) versus Operational Transformation (OT), and detail the client-side architecture for offline storage, presence indicators, and delta synchronization.

## Expected Answer

1. **High-Level System Architecture**:
   - **Client App**: Rich Text Editor Core (ProseMirror / Slate), CRDT State Engine (Yjs / Automerge), IndexedDB offline cache, WebSocket sync worker.
   - **Realtime Gateway**: Scalable WebSocket Cluster (Socket.io / WS) backed by Redis PubSub.
   - **Collaboration Server**: Centralized ordering authority, snapshot persistence worker, and Document Storage (PostgreSQL + S3).
2. **CRDT vs OT Conflict Resolution**:
   - **Operational Transformation (OT)**: Server acts as a central authority. Operations (`insert(pos, char)`) sent by clients are transformed against concurrently executed operations on the server. Requires strict central server sequence ordering.
   - **Conflict-free Replicated Data Types (CRDT)**: Assigns globally unique immutable IDs (e.g., Logical Clock + Client ID) to characters/nodes. Edges converge deterministically on every client peer without requiring a central server transformation loop. Highly resilient to offline editing and P2P networks.

## Deep Explanation

### 1. High-Level Architecture Diagram

```
+-----------------------------------------------------------------------+
|                              CLIENT BROWSER                           |
|  +---------------------+   +---------------------+  +--------------+  |
|  | ProseMirror / Slate | <-> | Yjs / Automerge   | <->| IndexedDB   |  |
|  | (DOM Editor View)   |   | (CRDT State Engine) |  | (Offline)    |  |
|  +---------------------+   +----------+----------+  +--------------+  |
+---------------------------------------|-------------------------------+
                                        | Binary Delta Packets (WebSockets)
                                        v
+-----------------------------------------------------------------------+
|                          REALTIME COLLAB BACKEND                      |
|  +-----------------------------------------------------------------+  |
|  | Node.js / Go WebSocket Gateway Cluster                          |  |
|  +--------------------------------+--------------------------------+  |
|                                   |                                   |
|                                   v                                   |
|                          +-----------------+                          |
|                          | Redis PubSub    |                          |
|                          +--------+--------+                          |
|                                   |                                   |
|              +--------------------+--------------------+              |
|              |                                         |              |
|              v                                         v              |
|     +------------------+                      +------------------+    |
|     | Doc State DB     |                      | S3 Document      |    |
|     | (PostgreSQL)     |                      | Snapshots        |    |
|     +------------------+                      +------------------+    |
+-----------------------------------------------------------------------+
```

### 2. Client-Side Offline & Presence Architecture
- **Offline Editing**: Local edits update IndexedDB immediately. When network reconnects, Yjs computes a minimal diff update (`Y.encodeStateAsUpdate`) and streams it over WebSocket. CRDT deterministic merging guarantees zero data loss.
- **Awareness / Presence**: User cursors and selection ranges are ephemeral; they use lightweight Awareness Broadcast protocols (`Y.awareness`) transmitted via WebSockets without persisting into document history snapshots.

## Production Example

```typescript
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';

export class CollaborativeEditorSession {
  public doc: Y.Doc;
  public provider: WebsocketProvider;
  public persistence: IndexeddbPersistence;
  public textType: Y.Text;

  constructor(documentId: string, wsUrl: string) {
    // 1. Initialize Yjs CRDT Document
    this.doc = new Y.Doc();

    // 2. Initialize Offline IndexedDB Cache
    this.persistence = new IndexeddbPersistence(documentId, this.doc);

    // 3. Connect Realtime WebSocket Stream
    this.provider = new WebsocketProvider(wsUrl, documentId, this.doc);

    // 4. Bind Shared Text Data Structure
    this.textType = this.doc.getText('codemirror');

    // Setup Awareness (User Presence Cursors)
    this.provider.awareness.setLocalStateField('user', {
      name: 'Alice',
      color: '#ff5722',
    });
  }

  public destroy() {
    this.provider.destroy();
    this.persistence.destroy();
    this.doc.destroy();
  }
}
```

## Best Practices

- Store document snapshots in S3/Object Storage periodically (e.g. every 1,000 edits or 5 minutes) to prevent Yjs binary log bloat during cold document loading.
- Separate ephemeral presence updates (mouse cursors, selections) from durable document delta operations.

## Common Mistakes

- Relying on naive Operational Transformation algorithms without a central server authority, causing state divergence on client peers.
- Attempting to serialize full JSON documents over WebSockets on every keypress instead of streaming binary CRDT byte deltas.

## Follow-up Questions

1. How do Yjs Fractional Indexing algorithms ensure deterministic text insertion between any two character nodes?
2. How do you implement Time Travel / Revision History viewing in CRDT-based editors?

## Related Topics

- Realtime Chat & WebSockets Frontend System Design
- DOM MutationObserver & IntersectionObserver Web APIs
