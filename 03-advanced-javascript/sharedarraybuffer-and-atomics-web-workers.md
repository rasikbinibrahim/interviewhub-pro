# T317 · Multi-Threading Memory Sharing: `SharedArrayBuffer` & `Atomics`

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Microsoft, Cloudflare  
**Category:** Advanced JavaScript  
**Concepts:** sharedarraybuffer, atomics, web-workers, multi-threading, concurrency  

## Question

How does `SharedArrayBuffer` share raw binary memory across main thread and Web Workers without copying overhead, and how does the `Atomics` API (`Atomics.add`, `Atomics.wait`, `Atomics.notify`) prevent race conditions and lock contention?

## Expected Answer

- **`SharedArrayBuffer`**: Allows multiple threads (main thread + Web Workers) to read and write to the same shared memory buffer simultaneously.
- **Race Condition Risk**: Un-synchronized concurrent memory writes cause data corruption.
- **`Atomics` API**: Provides atomic operations that execute without interruption:
  - `Atomics.add(ta, idx, val)`: Atomic addition.
  - `Atomics.wait(ta, idx, val)`: Pauses worker thread until notified.
  - `Atomics.notify(ta, idx, count)`: Wakes up waiting worker threads.
- **Security Requirement**: Requires COOP (`Cross-Origin-Opener-Policy`) and COEP (`Cross-Origin-Embedder-Policy`) headers due to Spectre vulnerability mitigations.

```javascript
// Worker thread atomic operation
const sab = new SharedArrayBuffer(1024);
const int32 = new Int32Array(sab);

// Safely increment index 0 atomically across threads
Atomics.add(int32, 0, 1);
```
