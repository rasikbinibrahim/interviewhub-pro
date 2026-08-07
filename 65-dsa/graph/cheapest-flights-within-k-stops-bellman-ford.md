# Q6578 · Cheapest Flights Within K Stops (Bellman-Ford / BFS Layer Traversal)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Graph  
**Concepts:** graph, bellman-ford, bfs, shortest-path, k-stops  

## Problem Statement

There are `n` cities connected by some number of flights. You are given an array `flights` where `flights[i] = [from_i, to_i, price_i]` indicates that there is a flight from city `from_i` to city `to_i` with cost `price_i`.

You are also given three integers `src`, `dst`, and `k`, return the **cheapest price** from `src` to `dst` with at most `k` stops. If there is no such route, return `-1`.

## Input

- `n`: `number` — total city count
- `flights`: `number[][]` — 2D array of `[u, v, price]`
- `src`: `number` — source city ID
- `dst`: `number` — destination city ID
- `k`: `number` — maximum allowed intermediate stops

## Output

- `number` — cheapest total price, or `-1` if impossible

## Constraints

- `1 <= n <= 100`
- `0 <= flights.length <= (n * (n - 1) / 2)`
- `0 <= from_i, to_i < n`
- `from_i != to_i`
- `1 <= price_i <= 10^4`
- `0 <= src, dst, k < n`
- `src != dst`

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1` | `700` | Path `0 -> 1 -> 3` costs 700 with 1 stop |
| `n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1` | `200` | Path `0 -> 1 -> 2` costs 200 with 1 stop |

## Edge Cases

- No path exists within `k` stops -> returns `-1`

## Hints

1. **Bellman-Ford Algorithm with $K + 1$ Iterations**:
   - $K$ stops means at most $K + 1$ flight edges can be traversed!
2. Maintain `prices` array initialized to `Infinity`, with `prices[src] = 0`.
3. Run loop $K + 1$ times:
   - Create copy `tempPrices = [...prices]`.
   - For each flight `[u, v, price]`:
     - If `prices[u] !== Infinity`: `tempPrices[v] = Math.min(tempPrices[v], prices[u] + price)`.
   - Update `prices = tempPrices`.
4. Return `prices[dst] === Infinity ? -1 : prices[dst]`.

## Algorithm

**Pattern:** Bellman-Ford Edge Relaxation with Snapshot Copy  
**Core Insight:** Copying `prices` to `tempPrices` before relaxing edges on each step ensures that each outer loop iteration processes at most one extra flight edge.

## Dry Run

`n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1`:
- `prices = [0, Inf, Inf]`.
- Iteration 1 (0 stops / 1 edge):
  - Flight `0->1 (100)`: `tempPrices[1] = 100`.
  - Flight `0->2 (500)`: `tempPrices[2] = 500`.
  - `prices = [0, 100, 500]`.
- Iteration 2 (1 stop / 2 edges):
  - Flight `1->2 (100)`: `tempPrices[2] = min(500, 100 + 100) = 200`.
  - `prices = [0, 100, 200]`.
- Return `prices[2] = 200`.

## JavaScript Solution

```js
function findCheapestPrice(n, flights, src, dst, k) {
  let prices = new Array(n).fill(Infinity);
  prices[src] = 0;

  // Run at most K + 1 flight steps
  for (let i = 0; i <= k; i++) {
    const tempPrices = [...prices];

    for (const [u, v, price] of flights) {
      if (prices[u] === Infinity) continue;

      if (prices[u] + price < tempPrices[v]) {
        tempPrices[v] = prices[u] + price;
      }
    }

    prices = tempPrices;
  }

  return prices[dst] === Infinity ? -1 : prices[dst];
}
```

## TypeScript Solution

```ts
function findCheapestPrice(
  n: number,
  flights: number[][],
  src: number,
  dst: number,
  k: number
): number {
  let prices: number[] = new Array(n).fill(Infinity);
  prices[src] = 0;

  for (let i = 0; i <= k; i++) {
    const tempPrices = [...prices];

    for (const [u, v, price] of flights) {
      if (prices[u] === Infinity) continue;

      if (prices[u] + price < tempPrices[v]) {
        tempPrices[v] = prices[u] + price;
      }
    }

    prices = tempPrices;
  }

  return prices[dst] === Infinity ? -1 : prices[dst];
}
```

## Time Complexity

`O(K * E)` — where $E = \text{flights.length}$ and $K$ is maximum stops.

## Space Complexity

`O(V)` — space for `prices` array of size $N$.

## Common Mistakes

- Updating `prices` array directly in-place during flight relaxation instead of modifying a `tempPrices` snapshot, causing multiple flight steps to chain in a single loop iteration.

## Follow-Up Questions

1. How can you solve this using Dijkstra's Algorithm with a Priority Queue storing `[cost, node, stops]`?

## Similar Questions

- Network Delay Time
- Path with Maximum Probability
