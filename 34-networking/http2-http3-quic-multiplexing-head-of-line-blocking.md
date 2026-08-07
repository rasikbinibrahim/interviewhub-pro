# T3405 · Networking Protocol Evolution: HTTP/1.1 Pipelining vs HTTP/2 Multiplexing vs HTTP/3 QUIC

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Cloudflare, Amazon, Fastly, Netflix  
**Interview Frequency:** ★★★★★  
**Category:** Networking  
**Concepts:** networking, http2, http3, quic, multiplexing, head-of-line-blocking  

## Question

How does **HTTP/2 Multiplexing** solve HTTP/1.1 application-layer Head-of-Line (HOL) blocking, why did **TCP Head-of-Line blocking** persist in HTTP/2, and how does **HTTP/3 over UDP using QUIC** eliminate transport-layer HOL blocking while accelerating TLS 1.3 handshake connection setups?

## Expected Answer

1. **HTTP/1.1 Limitations**:
   - Suffered from **Application-Level Head-of-Line (HOL) Blocking**: Requests over a single TCP connection had to be answered sequentially in FIFO order. If request 1 stalled, requests 2 and 3 were blocked.
   - Workaround: Browsers opened 6 parallel TCP connections per domain.
2. **HTTP/2 Breakthroughs**:
   - Replaced text protocol with a **Binary Framing Layer**.
   - Introduced **Multiplexing**: Multiple HTTP request/response streams interleaved concurrently over a **single TCP connection**.
   - Added HPACK Header Compression and Server Push.
3. **HTTP/3 over QUIC (UDP)**:
   - **Problem in HTTP/2**: If a single TCP packet dropped in transport, TCP stopped processing ALL multiplexed streams until that lost packet was re-transmitted (**Transport-Level HOL Blocking**).
   - **HTTP/3 Solution**: Replaces TCP with **QUIC over UDP**. Streams are independent at the transport layer! A dropped packet in Stream A does NOT block Stream B!
   - 0-RTT Connection Establishment: Combines transport and TLS 1.3 encryption handshakes into a single round trip.

## Deep Explanation

### Protocol Evolution Comparison

```
HTTP/1.1 (6 Parallel TCP Connections, FIFO Blocking):
Conn 1: [ Req 1 ] ──► [ Res 1 ] ──► [ Req 2 ] ──► [ Res 2 ]

HTTP/2 (1 Single TCP Connection, Multiplexed Streams):
Conn 1: [ Frame A1 ][ Frame B1 ][ Frame A2 ][ Frame B2 ] (Single TCP Packet Drop Stops ALL Streams!)

HTTP/3 QUIC (UDP-Based Independent Streams):
UDP:    [ Stream A (Packet 1) ][ Stream B (Packet 1) ] (Packet Loss in Stream A DOES NOT Block Stream B!)
```

## Production Example

```http
<!-- HTTP/2 Server Push vs Preload Performance Headers -->
Link: </css/app.css>; rel=preload; as=style, </js/app.js>; rel=preload; as=script

<!-- HTTP/3 Alt-Svc Protocol Upgrade Header (Cloudflare / Nginx) -->
Alt-Svc: h3=":443"; ma=86400, h3-29=":443"; ma=86400
```

```javascript
// Demonstrating Server-Sent Events (SSE) Multiplexing over HTTP/2
export function setupSSEConnection(url) {
  const eventSource = new EventSource(url, { withCredentials: true });

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('[Real-Time SSE Event]:', data);
  };

  eventSource.onerror = (err) => {
    console.error('[SSE Connection Error]:', err);
    eventSource.close();
  };

  return () => eventSource.close(); // Cleanup unbind
}
```

## Best Practices

- Eliminate obsolete HTTP/1.1 hacks (domain sharding, CSS sprite sheets, bundling into single massive JS files) when serving assets over HTTP/2 or HTTP/3.
- Set `Alt-Svc` headers on servers to inform client browsers that HTTP/3 over QUIC is available on port 443.

## Common Mistakes

- Assuming HTTP/2 eliminates all connection latency — packet loss on high-latency mobile networks degraded HTTP/2 performance worse than HTTP/1.1 due to TCP transport-layer HOL blocking.

## Follow-up Questions

1. How does QUIC's Connection ID feature preserve active connections when a mobile device switches from Wi-Fi to 5G cellular networks?

## Related Topics

- CORS Architecture: Preflight OPTIONS & Credentials
- GraphQL Architecture vs REST & Apollo Client
