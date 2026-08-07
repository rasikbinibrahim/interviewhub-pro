# Q6629 · Cheapest Flights Within K Stops (Bellman-Ford / BFS)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Graph
**Concepts:** graph, bellman-ford, bfs, shortest-path

## Problem Statement

Write a function `findCheapestPrice(n, flights, src, dst, k)` that
returns the cheapest total price to fly from city `src` to city `dst`
using at most `k` intermediate stops, or `-1` if no such route exists.
`flights` is an array of `[from, to, price]` directed edges.

## Input

`n`: the number of cities (labeled `0` to `n-1`). `flights`: an array of
`[from, to, price]` triples. `src`, `dst`: source and destination city
indices. `k`: the maximum number of intermediate stops allowed.

## Output

The cheapest total price within `k` stops, or `-1` if unreachable within
that limit.

## Constraints

`1 <= n <= 100`, `0 <= flights.length <= n*(n-1)`, `0 <= k <= n - 1`

## Examples

| Input | Output | Why |
|---|---|---|
| `n=4, flights=[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src=0, dst=3, k=1` | `700` | `0→1→3` costs `100+600=700`, the cheapest route using at most 1 stop |
| `n=3, flights=[[0,1,100],[1,2,100],[0,2,500]], src=0, dst=2, k=1` | `200` | `0→1→2` costs `100+100=200`, cheaper than the direct `500` route |
| `n=3, flights=[[0,1,100],[1,2,100]], src=0, dst=2, k=0` | `-1` | Reaching city 2 needs one intermediate stop, but `k=0` allows none |

## Edge Cases

- No route exists at all → `-1`
- `src === dst` → `0` (no flight needed)
- A cheaper route exists but requires more than `k` stops → the cheaper
  route is ignored in favor of a pricier one within the stop limit, or
  `-1` if none qualifies
- `k = n - 1` → equivalent to unrestricted Dijkstra/Bellman-Ford, since
  no simple path can have more than `n - 1` edges

## Hints

1. Plain Dijkstra's algorithm finds the *globally* cheapest path, but
   doesn't respect a limit on the number of edges used — what classic
   shortest-path algorithm naturally works in limited "rounds," where
   each round represents allowing one more edge?
2. Bellman-Ford relaxes every edge once per round; running it for
   exactly `k + 1` rounds (one flight plus `k` intermediate stops) finds
   the cheapest price reachable using at most that many edges.
3. Within each round, relax edges using distances *from the previous
   round only* (not distances already updated within the current round)
   — otherwise a single round could effectively use more than one hop's
   worth of update, silently violating the stop limit.

## Algorithm

**Pattern:** Bellman-Ford, bounded to exactly `k + 1` relaxation rounds.
**Core insight:** a route using at most `k` intermediate stops has at
most `k + 1` edges, so running Bellman-Ford's edge-relaxation step for
exactly `k + 1` rounds naturally caps every discovered path at that edge
count — more rounds would allow longer (more-hop) paths to be
considered, which is exactly what the stop limit forbids. The key
implementation detail is relaxing each round's edges against a *snapshot*
of the previous round's distances (`dist`, read-only during the round)
while writing into a separate `temp` array, so a single round can't
accidentally chain multiple edge updates together and silently exceed
the allowed hop count.
**Invariant:** after round `i` completes, `dist[v]` holds the cheapest
price to reach city `v` using at most `i` edges (equivalently, at most
`i - 1` intermediate stops).

## Dry Run

**Input:** `n=4, flights=[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src=0, dst=3, k=1`

Initial: `dist = [0, ∞, ∞, ∞]`

**Round 1** (`i=0`, using only `dist` from before this round):

| edge (u→v, w) | dist[u] | dist[u]+w | temp[v] updated? |
|---|---|---|---|
| 0→1, 100 | 0 | 100 | yes: `temp[1]=100` |
| 1→2, 100 | ∞ | – | no (unreachable so far) |
| 2→0, 100 | ∞ | – | no |
| 1→3, 600 | ∞ | – | no |
| 2→3, 200 | ∞ | – | no |

`dist = [0, 100, ∞, ∞]`

**Round 2** (`i=1`, using `dist` from the end of round 1):

| edge (u→v, w) | dist[u] | dist[u]+w | temp[v] updated? |
|---|---|---|---|
| 0→1, 100 | 0 | 100 | no (not strictly less than existing 100) |
| 1→2, 100 | 100 | 200 | yes: `temp[2]=200` |
| 2→0, 100 | ∞ | – | no |
| 1→3, 600 | 100 | 700 | yes: `temp[3]=700` |
| 2→3, 200 | ∞ | – | no |

`dist = [0, 100, 200, 700]`

Loop ends (`k=1` means 2 rounds total). **Result:** `dist[3] = 700` —
matches expected output.

## JavaScript Solution

```js
function findCheapestPrice(n, flights, src, dst, k) {
  let dist = new Array(n).fill(Infinity);
  dist[src] = 0;

  for (let i = 0; i <= k; i++) {
    const temp = [...dist];
    for (const [u, v, w] of flights) {
      if (dist[u] !== Infinity && dist[u] + w < temp[v]) {
        temp[v] = dist[u] + w;
      }
    }
    dist = temp;
  }

  return dist[dst] === Infinity ? -1 : dist[dst];
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
  let dist: number[] = new Array(n).fill(Infinity);
  dist[src] = 0;

  for (let i = 0; i <= k; i++) {
    const temp: number[] = [...dist];
    for (const [u, v, w] of flights) {
      if (dist[u] !== Infinity && dist[u] + w < temp[v]) {
        temp[v] = dist[u] + w;
      }
    }
    dist = temp;
  }

  return dist[dst] === Infinity ? -1 : dist[dst];
}
```

## Time Complexity

O(k × E), where E is the number of flights — each of the `k + 1` rounds
relaxes every edge once.

## Space Complexity

O(n) — the `dist` and `temp` distance arrays.

## Common Mistakes

- Using plain Dijkstra's algorithm — finds the globally cheapest route
  without any regard for the stop limit, which can return a cheaper
  price than is actually allowed within `k` stops.
- Updating `dist` in place during a round instead of writing into a
  separate `temp` array — allows a single round to chain multiple edge
  relaxations together (using an update from earlier in the *same*
  round), effectively allowing more hops than the round count intends.
- Off-by-one in the round count — the number of rounds needed is `k + 1`
  (one for the flight itself, plus `k` intermediate stops), not `k`.

## Interview Follow-up Questions

1. How would you adapt this to also return the actual sequence of
   cities in the cheapest route, not just its price?
2. Why doesn't Dijkstra's algorithm directly generalize to respect a
   hop-count limit, while Bellman-Ford does?
3. How would the time complexity change if `k` could be as large as
   `n - 1`, and how does that compare to unrestricted Bellman-Ford?

## Similar Questions

- Network Delay Time (Dijkstra Shortest Path) (see [network-delay-time-dijkstra.md](network-delay-time-dijkstra.md))
- Course Schedule I (Cycle Detection) (see [course-schedule-cycle-detection.md](course-schedule-cycle-detection.md))
