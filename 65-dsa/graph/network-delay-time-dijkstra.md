# Q6618 · Network Delay Time (Dijkstra Shortest Path)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft  
**Interview Frequency:** ★★★★★  
**Category:** Graph  
**Concepts:** graph, dijkstra, shortest-path, min-heap  

## Problem Statement

You are given a network of `n` nodes, labeled from `1` to `n`. You are also given `times`, a list of travel times as directed edges `times[i] = (u_i, v_i, w_i)`, where `u_i` is the source node, `v_i` is the target node, and `w_i` is the time it takes for a signal to travel from source to target.

We will send a signal from a given node `k`. Return the **minimum time** it takes for all the `n` nodes to receive the signal. If it is impossible for all the `n` nodes to receive the signal, return `-1`.

## Algorithm

**Pattern:** Dijkstra Shortest Path Distance Relaxation  

```javascript
function networkDelayTime(times, n, k) {
  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;

  for (let i = 1; i <= n - 1; i++) {
    let updated = false;
    for (const [u, v, w] of times) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        updated = true;
      }
    }
    if (!updated) break;
  }

  let maxTime = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    maxTime = Math.max(maxTime, dist[i]);
  }

  return maxTime;
}
```

## Time & Space Complexity

- **Time Complexity:** `O(V \cdot E)` (or $O((E + V) \log V)$ with Priority Queue).
- **Space Complexity:** `O(V + E)` distance array and graph space.
