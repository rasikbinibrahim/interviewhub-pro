# T3401 · HTTP/1.1 vs HTTP/2 vs HTTP/3, WebSockets & Transport Optimization

**Difficulty:** Medium  
**Companies Asked:** Cloudflare, Google, Meta, Amazon, Netflix  
**Interview Frequency:** ★★★★☆  
**Category:** Networking  
**Concepts:** http2, http3, quic, websockets, multiplexing, networking-protocols  

## Question

How does HTTP/2 multiplexing eliminate HTTP/1.1 line-of-head (HOL) blocking, why did HTTP/3 transition from TCP to QUIC (UDP), and what criteria determine when to choose WebSockets versus Server-Sent Events (SSE) versus HTTP polling for real-time applications?

## Expected Answer

1. **HTTP/2 Multiplexing**: Replaces multiple TCP connections with a single TCP connection carrying binary frames across independent streams, allowing concurrent request/response interleaving over one connection.
2. **HTTP/3 & QUIC**: Eliminates **TCP-level Head-of-Line Blocking** (where a single dropped packet stalls all HTTP/2 streams on that TCP connection). QUIC runs over UDP with native TLS 1.3 encryption and stream-level loss recovery.
3. **Transport Selection Matrix**:
   - **HTTP Polling / Long Polling**: Simple, works everywhere, high header overhead. Ideal for low-frequency status checks.
   - **Server-Sent Events (SSE)**: Unidirectional (server-to-client) streaming over standard HTTP. Native browser auto-reconnect (`EventSource`). Ideal for live feeds, stock tickers, and AI text streaming.
   - **WebSockets**: Full-duplex bidirectional persistent TCP socket connection. Ideal for collaborative editors, chat apps, and real-time multiplayer games.

## Deep Explanation

### 1. Architectural Evolution of HTTP Transports

```
HTTP/1.1:  [Req1] -> [Resp1] | [Req2] -> [Resp2]  (HOL Blocking / 6 TCP Conn Max)
HTTP/2:    [Binary Frame Stream 1][Stream 3][Stream 1][Stream 5] over 1 TCP Conn
HTTP/3:    [QUIC UDP Packet 1 (Stream 1)][QUIC UDP Packet 2 (Stream 3)] (0-RTT TLS 1.3)
```

### 2. Comparison Matrix

| Protocol | Transport | Duplex | Auto Reconnect | Header Compression |
|---|---|---|---|---|
| **HTTP/1.1** | TCP | Half | Manual | None |
| **HTTP/2** | TCP | Full (Streams) | N/A | HPACK |
| **HTTP/3** | QUIC (UDP) | Full (Streams) | Native Connection Migration | QPACK |
| **SSE** | HTTP/1.1 or H2 | Server -> Client | Native (`EventSource`) | HTTP Standard |
| **WebSockets**| Upgraded TCP | Full Duplex | Manual Implementation | Custom / PerMessage-Deflate |

## Production Example

```typescript
// Production-grade EventSource (SSE) client for streaming AI responses
export function streamAiResponse(
  prompt: string,
  onChunk: (chunk: string) => void,
  onComplete: () => void,
  onError: (err: Error) => void
) {
  const encodedPrompt = encodeURIComponent(prompt);
  const eventSource = new EventSource(`/api/v1/ai/stream?prompt=${encodedPrompt}`);

  eventSource.onmessage = (event) => {
    if (event.data === '[DONE]') {
      eventSource.close();
      onComplete();
      return;
    }

    try {
      const parsed = JSON.parse(event.data);
      onChunk(parsed.text || '');
    } catch (e) {
      onError(new Error('Invalid SSE JSON payload'));
    }
  };

  eventSource.onerror = (err) => {
    eventSource.close();
    onError(new Error('SSE Stream Connection Error'));
  };

  return () => eventSource.close();
}
```

## Best Practices

- Prefer Server-Sent Events (SSE) over WebSockets if data flow is strictly unidirectional (e.g. LLM token streaming, notifications).
- Leverage HTTP/2 Server Push sparingly (or prefer `<link rel="preload">` instead) due to cache race conditions.
- Enable TLS 1.3 0-RTT session resumption for mobile clients under unstable network conditions.

## Common Mistakes

- Using WebSockets without implementing heartbeat ping/pong mechanisms, resulting in silent connection drops by intermediate proxies and CDNs.
- Opening separate WebSocket connections per component instead of multiplexing messages over a single shared WS instance.

## Follow-up Questions

1. How does QUIC handle IP Address roaming when a mobile device switches from Wi-Fi to cellular data?
2. What are the security risks of WebSocket cross-site hijacking (CSWSH) and how do origin headers prevent it?

## Related Topics

- Realtime Chat & WebSockets Frontend System Design
- Browser Networking Stack & Resource Hints
