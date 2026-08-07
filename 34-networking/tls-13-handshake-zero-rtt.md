# T3410 · TLS 1.3 Handshake Protocol & 0-RTT Early Data Resumption

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Cloudflare, Amazon  
**Category:** Networking  
**Concepts:** networking, tls-13, security, handshake, zero-rtt  

## Question

How does **TLS 1.3** cut connection latency down to **1-RTT** for fresh connections and **0-RTT** for session resumptions compared to 2-RTT in TLS 1.2?

## Expected Answer

- **TLS 1.2 (2-RTT)**: Requires 2 round trips for key exchange and cipher negotiation before transmitting encrypted HTTP data.
- **TLS 1.3 (1-RTT)**: Combines ClientHello with key share guess in a single round trip!
- **0-RTT Resumption**: Re-connecting clients send encrypted data on the VERY FIRST packet using pre-shared keys (PSK).
