# Q6630 · Reconstruct Itinerary (Eulerian Path via Hierholzer's Algorithm)

**Difficulty:** Hard
**Companies Asked:** Amazon, Meta, Google, Uber
**Interview Frequency:** ★★★☆☆
**Category:** Graph
**Concepts:** graph, eulerian-path, dfs, hierholzers-algorithm

## Problem Statement

Write a function `findItinerary(tickets)` that, given an array of
`[from, to]` airport tickets, reconstructs the itinerary that uses every
single ticket exactly once, starting from `"JFK"`. If multiple valid
itineraries exist, return the lexicographically smallest one (compared
airport-by-airport in order).

## Input

`tickets`: an array of `[from, to]` airport-code pairs. Every ticket
must be used exactly once, and a valid itinerary starting at `"JFK"` is
guaranteed to exist.

## Output

An array of airport codes representing the itinerary, in visit order.

## Constraints

`1 <= tickets.length <= 300`, all airport codes are 3 uppercase letters

## Examples

| Input | Output | Why |
|---|---|---|
| `[["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]` | `["JFK","MUC","LHR","SFO","SJC"]` | The only itinerary using every ticket exactly once |
| `[["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]` | `["JFK","ATL","JFK","SFO","ATL","SFO"]` | Multiple valid itineraries exist; this is the lexicographically smallest |

## Edge Cases

- Only one ticket → the trivial two-airport itinerary
- Multiple valid itineraries exist → the lexicographically smallest one
  must be chosen, not just any valid one
- A destination airport with multiple outgoing tickets that must all
  eventually be used → the algorithm must not get "stuck" prematurely at
  a dead end before other tickets from that airport are used
- Duplicate ticket pairs (the same `[from, to]` appearing more than
  once) → each occurrence is a separate ticket that must be used

## Hints

1. This is really asking for an Eulerian path — a route that uses every
   edge of a graph exactly once — starting from a fixed node. Greedily
   picking the lexicographically smallest next destination at each step
   can lead to a dead end where tickets remain unused elsewhere. What
   classic algorithm correctly finds an Eulerian path even when greedy
   choices could otherwise strand you?
2. Hierholzer's algorithm handles this by doing a DFS that only "commits"
   an airport to the final itinerary once none of its outgoing tickets
   remain unused (post-order) — dead ends get resolved and appended
   *last*, which turns out to be exactly correct once the whole
   traversal is reversed.
3. Sort each airport's destination list up front so that greedily
   consuming tickets in sorted order naturally produces the
   lexicographically smallest valid itinerary among all Eulerian paths.

## Algorithm

**Pattern:** Hierholzer's algorithm for Eulerian path reconstruction
(post-order DFS, then reverse).
**Core insight:** greedily choosing the smallest available destination
at each airport can strand you at a dead end with unused tickets
remaining elsewhere in the graph — but if you instead keep recursing
until an airport genuinely has no tickets left, and only *then* append
it to the result, every airport ends up appended in the reverse order of
a valid Eulerian path. This works because any "detour" needed to use up
tickets that a greedy-only approach would have missed gets fully
explored and appended before the algorithm backs out to continue the
main path — reversing the whole result at the end restores the correct
forward visiting order. Sorting each airport's destinations ensures that
among all valid Eulerian paths, the lexicographically smallest one is
the one actually constructed.
**Invariant:** an airport is only pushed onto `result` once every ticket
originating from it has been consumed, guaranteeing that when the final
array is reversed, every airport appears in a position consistent with
a complete, valid use of every ticket.

## Dry Run

**Input:** `tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]`

After sorting tickets by destination and building the adjacency map:
`JFK → [MUC]`, `MUC → [LHR]`, `LHR → [SFO]`, `SFO → [SJC]`

| Call | destinations remaining | action | result after |
|---|---|---|---|
| `dfs(JFK)` | `[MUC]` | recurse into `MUC` | – |
| `dfs(MUC)` | `[LHR]` | recurse into `LHR` | – |
| `dfs(LHR)` | `[SFO]` | recurse into `SFO` | – |
| `dfs(SFO)` | `[SJC]` | recurse into `SJC` | – |
| `dfs(SJC)` | `[]` (no entry) | no tickets left, push `SJC` | `[SJC]` |
| back in `dfs(SFO)` | `[]` | no tickets left, push `SFO` | `[SJC, SFO]` |
| back in `dfs(LHR)` | `[]` | push `LHR` | `[SJC, SFO, LHR]` |
| back in `dfs(MUC)` | `[]` | push `MUC` | `[SJC, SFO, LHR, MUC]` |
| back in `dfs(JFK)` | `[]` | push `JFK` | `[SJC, SFO, LHR, MUC, JFK]` |

**Result:** reversed → `["JFK","MUC","LHR","SFO","SJC"]` — matches
expected output.

## JavaScript Solution

```js
function findItinerary(tickets) {
  const adj = new Map();
  tickets.sort((a, b) => a[1].localeCompare(b[1]));

  for (const [from, to] of tickets) {
    if (!adj.has(from)) adj.set(from, []);
    adj.get(from).push(to);
  }

  const result = [];
  function dfs(node) {
    const destinations = adj.get(node);
    while (destinations && destinations.length > 0) {
      const next = destinations.shift();
      dfs(next);
    }
    result.push(node);
  }

  dfs('JFK');
  return result.reverse();
}
```

## TypeScript Solution

```ts
function findItinerary(tickets: string[][]): string[] {
  const adj = new Map<string, string[]>();
  const sorted: string[][] = [...tickets].sort((a, b) => a[1].localeCompare(b[1]));

  for (const [from, to] of sorted) {
    if (!adj.has(from)) adj.set(from, []);
    adj.get(from)!.push(to);
  }

  const result: string[] = [];
  function dfs(node: string): void {
    const destinations = adj.get(node);
    while (destinations && destinations.length > 0) {
      const next = destinations.shift()!;
      dfs(next);
    }
    result.push(node);
  }

  dfs('JFK');
  return result.reverse();
}
```

## Time Complexity

O(E log E), where E is the number of tickets — dominated by sorting the
tickets; the DFS itself visits each edge exactly once, O(E).

## Space Complexity

O(E) — the adjacency map holds every ticket, plus recursion stack depth
up to O(E) in the worst case.

## Common Mistakes

- Greedily picking the smallest next destination without the
  post-order "commit last" structure — can produce an itinerary that
  strands unused tickets at a dead end, since a locally smallest choice
  isn't always globally consistent with using every ticket.
- Forgetting to sort destinations before greedily consuming them —
  without sorting, the algorithm still finds *a* valid Eulerian path,
  but not necessarily the lexicographically smallest one required by
  the problem.
- Using `Array.prototype.shift()` in a hot path for very large ticket
  counts — correct, but O(n) per call; an index-based pointer or a
  proper deque avoids that overhead at scale (a performance concern, not
  a correctness one, at this problem's constraints).

## Interview Follow-up Questions

1. How would you detect upfront whether a valid Eulerian path exists at
   all, before attempting to construct one?
2. How does an Eulerian *path* (start and end at different nodes) differ
   from an Eulerian *circuit* (starts and ends at the same node), and
   how would the algorithm change for the latter?
3. Why does reversing the post-order result correctly restore the
   forward itinerary order — what invariant makes that always valid?

## Similar Questions

- Course Schedule I (Cycle Detection) (see [course-schedule-cycle-detection.md](course-schedule-cycle-detection.md))
- Clone Graph (see [clone-graph-dfs-bfs.md](clone-graph-dfs-bfs.md))
