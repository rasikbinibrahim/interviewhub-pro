# T6017 · High-Level System Design: Scalable Web Analytics & Event Tracking SDK

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Segment, Mixpanel, Amplitude  
**Category:** Frontend System Design  
**Concepts:** hld, system-design, analytics-sdk, navigator-sendbeacon, event-batching  

## Question

How do you design a non-blocking **Web Analytics Tracking SDK** (<5KB footprint) supporting event batching, local retry storage, session stitching, and `navigator.sendBeacon` page unload delivery?

## Key Architectural Components

1. **Non-Blocking Execution**: Run in Web Worker or schedule during `requestIdleCallback`.
2. **`navigator.sendBeacon()` Payload Delivery**: Ensures telemetry events deliver reliably even during page unload/tab closes without blocking navigation.
3. **Event Batching & Compression**: Accumulate telemetry events in an in-memory queue, flushing every 5 seconds or when queue size reaches 10 events.
