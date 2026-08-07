# T6003 · High-Level System Design: Real-Time Notification System (WebSockets vs SSE vs Push Notifications)

**Difficulty:** Hard  
**Companies Asked:** Uber, Meta, Amazon, Netflix, Twitter/X, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** High-Level Design  
**Concepts:** system-design, hld, real-time, websockets, sse, push-notifications, web-push  

## Question

How do you design a resilient, low-latency **Real-Time Notification System** capable of delivering notifications to 10 million concurrent web and mobile clients, what are the architectural trade-offs between WebSockets, Server-Sent Events (SSE), and Web Push (FCM/APNs), and how do you handle reconnection backoff, message deduplication, and offline queues?

## Expected Answer

1. **Transport Protocol Selection Matrix**:
   - **WebSockets**: Bi-directional full-duplex TCP persistent connection. Ideal for interactive chat or collaborative editing. High infrastructure connection overhead.
   - **Server-Sent Events (SSE)**: Mono-directional (Server -> Client) HTTP stream. Built-in browser reconnection, lightweight text framing, works natively over HTTP/2. Ideal for notification feeds and live ticker updates.
   - **Web Push API (FCM / APNs)**: Asynchronous push via OS background service workers. Works even when the web application tab is completely closed.
2. **Core System Architecture**:
   - **Notification Service**: Accepts events from microservices, persists notifications into Database (PostgreSQL / Cassandra), and pushes jobs into Redis Pub/Sub / Kafka.
   - **Connection Gateway Cluster**: Stateful WebSocket/SSE edge servers holding open client connections, subscribed to user-specific Redis Pub/Sub channels.
   - **Web Push Gateway**: Dispatches push payloads to Apple APNs or Google FCM for offline clients.

## Deep Explanation

### System Architecture Diagram

```
[ Microservices ] ──(Events)──► [ Kafka Topic: Notifications ]
                                         │
                                         ▼
                               [ Notification Service ]
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼ (Online Client)                               ▼ (Offline Client)
     [ Redis Pub/Sub Channel ]                     [ Web Push Service (FCM/APNs) ]
                 │                                               │
                 ▼                                               ▼
[ Edge SSE / WS Gateways ]                            [ OS Service Worker ]
                 │                                               │
                 ▼                                               ▼
       [ Active Web App ]                             [ System Banner Toast ]
```

## Production Example

```javascript
// Client-Side Resilient SSE (Server-Sent Events) Manager with Exponential Backoff
export class RealtimeNotificationClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.eventSource = null;
    this.retryDelay = 1000;
    this.maxRetryDelay = 30000;
    this.listeners = new Set();
  }

  connect() {
    this.eventSource = new EventSource(this.endpoint, { withCredentials: true });

    this.eventSource.onopen = () => {
      console.log('[SSE Connected] Notification channel active');
      this.retryDelay = 1000; // Reset backoff delay on successful handshake
    };

    this.eventSource.onmessage = (event) => {
      try {
        const notification = JSON.parse(event.data);
        this.notifyListeners(notification);
      } catch (err) {
        console.error('Failed to parse notification payload', err);
      }
    };

    this.eventSource.onerror = () => {
      console.warn(`[SSE Error] Reconnecting in ${this.retryDelay}ms...`);
      this.eventSource.close();
      
      setTimeout(() => {
        this.retryDelay = Math.min(this.retryDelay * 2, this.maxRetryDelay);
        this.connect();
      }, this.retryDelay);
    };
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners(data) {
    this.listeners.forEach((fn) => fn(data));
  }
}
```

## Best Practices

- Use `Last-Event-ID` header in SSE connections to allow clients to request missed notifications automatically after temporary network disconnections.
- Prefer Server-Sent Events (SSE) over WebSockets for notification feeds because SSE operates over standard HTTP/2 multiplexed streams without WebSocket proxy firewall blocking issues.

## Common Mistakes

- Maintaining active WebSocket connections for idle users without ping/pong heartbeats, leading to silent connection drops by intermediate NAT firewalls and load balancers.

## Follow-up Questions

1. How do stateful WebSocket Edge Connection Gateway nodes scale horizontally across Kubernetes clusters using Redis Pub/Sub or Hash Ring routing?

## Related Topics

- High-Level System Design: Collaborative Document Editor
- Browser Caching, Service Workers & Progressive Web Apps (PWA)
