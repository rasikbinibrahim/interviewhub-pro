# T3407 · Real-Time Communication Protocols: WebSockets vs Server-Sent Events (SSE) vs Long Polling

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix, Slack  
**Interview Frequency:** ★★★★★  
**Category:** Networking  
**Concepts:** networking, websockets, sse, server-sent-events, long-polling, real-time  

## Question

How do **WebSockets**, **Server-Sent Events (SSE)**, and **HTTP Long Polling** compare across directionality (full-duplex vs unidirectional), underlying transport layer, connection overhead, reconnection mechanics, and corporate firewall/proxy traversal?

## Expected Answer

1. **Protocol Comparison**:
   - **HTTP Long Polling**: Client sends HTTP request; server holds request open until new data is available. Upon response, client immediately opens a new HTTP request. High HTTP header overhead and server connection churn.
   - **Server-Sent Events (SSE)**: Unidirectional stream (**Server to Client**) over standard HTTP (`text/event-stream`). Built-in automatic reconnection, event IDs, and native browser `EventSource` API. Bypasses firewall issues easily.
   - **WebSockets**: Full-Duplex bi-directional TCP channel (`ws://` / `wss://`). Starts with an HTTP 101 Upgrade handshake. Low-latency framing ideal for 2-way real-time apps (chat, gaming, collaborative whiteboards).

## Deep Explanation

### Real-Time Communication Comparison Matrix

| Property | Long Polling | Server-Sent Events (SSE) | WebSockets |
|---|---|---|---|
| **Directionality** | Half-Duplex (Request/Response) | Unidirectional (Server ➔ Client) | Full-Duplex (Client ⇄ Server) |
| **Protocol** | Standard HTTP/1.1 | Standard HTTP/1.1 or HTTP/2 | `ws://` / `wss://` (TCP Upgrade) |
| **API** | `fetch()` / `XMLHttpRequest` | `EventSource` API | `WebSocket` API |
| **Header Overhead** | High (Every Poll) | Low (Single Handshake) | Extremely Low (2-14 byte frames) |
| **Auto Reconnect** | Manual Code | Native Browser Built-In | Manual Code / Library |
| **Firewall / Proxy** | Excellent | Excellent | Requires WSS / Port 443 |

## Production Example

```javascript
// 1. Server-Sent Events (SSE) Native Browser Implementation
export function subscribeToStockTicker(symbol, onUpdate) {
  const eventSource = new EventSource(`/api/stocks/stream?symbol=${symbol}`);

  // Listen to custom named events sent by server!
  eventSource.addEventListener('price_change', (event) => {
    const data = JSON.parse(event.data);
    onUpdate(data);
  });

  eventSource.onerror = (err) => {
    console.error('[SSE Error]: Browser automatically retrying connection...', err);
  };

  // Return cleanup function
  return () => eventSource.close();
}

// 2. Full-Duplex WebSocket Implementation with Heartbeat & Auto-Reconnect
export class ReconnectingWebSocket {
  private ws: WebSocket | null = null;
  private url: string;

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log('[WebSocket Connected]');
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('[WebSocket Message Received]:', message);
    };

    this.ws.onclose = () => {
      console.log('[WebSocket Closed]: Attempting reconnect in 3s...');
      setTimeout(() => this.connect(), 3000);
    };
  }

  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
}
```

## Best Practices

- Use **Server-Sent Events (SSE)** for unidirectional server push features (notifications, news feeds, AI LLM text generation streaming).
- Use **WebSockets** for 2-way real-time interactions (chat apps, collaborative document editing, multiplayer gaming).

## Common Mistakes

- Choosing WebSockets for simple unidirectional notification feeds, adding unnecessary connection heartbeat management and scaling complexity when SSE handles automatic reconnection natively over standard HTTP.

## Follow-up Questions

1. How does HTTP/2 Multiplexing eliminate the 6-connection domain limit for SSE streams?

## Related Topics

- High-Level System Design: Real-Time Notification System
- Networking Protocol Evolution: HTTP/1.1 vs HTTP/2 vs HTTP/3 QUIC
