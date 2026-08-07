# T6008 · High-Level System Design: Scalable Frontend Analytics Tracking SDK & Event Batching

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Segment, Amplitude, Mixpanel, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Frontend System Design  
**Concepts:** hld, system-design, analytics-sdk, event-batching, beacon-api, web-workers  

## Question

How do you design a lightweight, zero-dependency **Frontend Analytics & Telemetry Tracking SDK** (like Segment or Amplitude) supporting automatic pageview tracking, custom event logging, offline event queuing (`IndexedDB`), client-side **event batching** (`navigator.sendBeacon`), and main-thread CPU isolation via Web Workers?

## Expected Answer

1. **System Architecture Overview**:
   - **Public SDK API**: Thread-safe `track(eventName, properties)` and `page(name)` methods.
   - **In-Memory Queue & Event Batching**: Flushes event batches when queue reaches size limit (e.g. 10 events) OR time interval (e.g. 5 seconds).
   - **Unload Transmission (`navigator.sendBeacon`)**: Guarantees queued event delivery even when users close the browser tab or navigate away.
   - **Offline Persistence**: Queues failed events in `IndexedDB` and retries on network recovery.

## Deep Explanation

### Analytics SDK Architecture

```
User App ──► sdk.track('button_clicked')
                   │
                   ▼
       [ In-Memory Event Queue ]
                   │
    ┌──────────────┴──────────────┐
    ▼ Batch Size = 10             ▼ Page Unload Event
Flushes Event Batch           navigator.sendBeacon('/api/analytics')
    │                             │
    ▼ (If Network Fails)          ▼
[ Save to IndexedDB ] ──(Online Event)──► Flushes to Backend Engine!
```

## Production Example

```typescript
// Production Light-Weight Analytics SDK Core Engine
export interface AnalyticsEvent {
  eventId: string;
  eventName: string;
  properties: Record<string, any>;
  timestamp: number;
}

export class AnalyticsSDK {
  private queue: AnalyticsEvent[] = [];
  private endpoint: string;
  private batchSize: number;
  private flushInterval: number;
  private timer: any = null;

  constructor(endpoint: string, batchSize = 10, flushInterval = 5000) {
    this.endpoint = endpoint;
    this.batchSize = batchSize;
    this.flushInterval = flushInterval;

    this.setupPageUnloadHandler();
    this.startPeriodicFlush();
  }

  track(eventName: string, properties: Record<string, any> = {}): void {
    const event: AnalyticsEvent = {
      eventId: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      eventName,
      properties,
      timestamp: Date.now(),
    };

    this.queue.push(event);

    if (this.queue.length >= this.batchSize) {
      this.flush();
    }
  }

  flush(): void {
    if (this.queue.length === 0) return;

    const payload = JSON.stringify(this.queue);
    const eventsToFlush = [...this.queue];
    this.queue = [];

    // Use sendBeacon for non-blocking transmission
    if ('sendBeacon' in navigator) {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon(this.endpoint, blob);
    } else {
      fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true, // Keepalive flag ensures request completes during tab close!
      }).catch((err) => {
        console.error('[Analytics SDK Flush Error]:', err);
        // Re-queue failed events
        this.queue.unshift(...eventsToFlush);
      });
    }
  }

  private setupPageUnloadHandler(): void {
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flush();
      }
    });
  }

  private startPeriodicFlush(): void {
    this.timer = setInterval(() => this.flush(), this.flushInterval);
  }
}
```

## Best Practices

- Use `navigator.sendBeacon(url, data)` or `fetch(url, { keepalive: true })` inside `visibilitychange` listeners to guarantee event delivery during tab closure.
- Offload JSON serialization and event hashing to a Web Worker thread to keep the main JS thread free of telemetry overhead.

## Common Mistakes

- Using `window.onbeforeunload` or synchronous `XMLHttpRequest` during page unload, which browsers block or cancel silently.

## Follow-up Questions

1. How do Web Workers prevent analytics event serialization from degrading Core Web Vitals INP (Interaction to Next Paint)?

## Related Topics

- High-Level System Design: Real-Time Notification System
- Client-Side Storage Architecture: `localStorage` vs `IndexedDB`
