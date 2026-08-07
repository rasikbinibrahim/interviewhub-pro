# T3415 · HTTP/3 QUIC Protocol: UDP Transport & Zero-RTT Connection Migration

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Cloudflare, Fastly  
**Category:** Networking  
**Concepts:** http3, quic, udp, zero-rtt, networking  

## Question

Why does **HTTP/3** replace TCP with **QUIC (UDP-based)** transport to solve TCP-level packet loss Head-of-Line blocking and support seamless mobile network switching via Connection IDs?

## Expected Answer

- **TCP Problem in HTTP/2**: If 1 packet drops, TCP pauses ALL HTTP/2 streams on that connection until the lost packet is retransmitted.
- **QUIC Solution**: Each stream is independently managed over UDP. Packet loss in Stream A does NOT block Stream B!
