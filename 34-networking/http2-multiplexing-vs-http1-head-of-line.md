# T3414 · HTTP/2 Multiplexing & Head-of-Line (HOL) Blocking Elimination

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Cloudflare, Amazon  
**Category:** Networking  
**Concepts:** http2, multiplexing, head-of-line-blocking, networking  

## Question

How does **HTTP/2 Binary Framing & Multiplexing** allow hundreds of parallel request/response streams over a single TCP connection, eliminating HTTP/1.1 domain sharding workarounds?

```
HTTP/1.1: Request 1 ───> Response 1 ───> Request 2 ───> Response 2 (HOL Blocking!)
HTTP/2:   TCP Connection [ Stream 1 Frame | Stream 2 Frame | Stream 1 Frame ] (Multiplexed!)
```
