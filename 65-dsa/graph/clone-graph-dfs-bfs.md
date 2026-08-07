# Q6648 · Clone Graph (Graph Deep Copy DFS / Hash Map)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Graph
**Concepts:** graph, dfs, hash-map, deep-copy

## Problem Statement

Write a function `cloneGraph(node)` that returns a deep copy of a
connected, undirected graph, given a reference to one of its nodes. Each
node has a `val` and a `neighbors` array of references to adjacent
nodes; the graph may contain cycles.

## Input

`node`: a reference to a starting node of the graph (`null` for an empty
graph), each node shaped `{ val: number, neighbors: Node[] }`.

## Output

A reference to the corresponding node in a fully independent deep copy
of the graph — every node and every neighbor edge duplicated, sharing no
object references with the original.

## Constraints

`0 <= number of nodes <= 100`, each node's value is unique, the graph is
connected (if non-empty)

## Examples

```javascript
// Graph as an adjacency list (node i+1 connects to the listed values):
// 1 -- 2
// |    |
// 4 -- 3
const adjList = [[2, 4], [1, 3], [2, 4], [1, 3]];
const original = buildGraph(adjList); // helper that wires up Node objects
const cloned = cloneGraph(original);
// cloned has the same val/neighbor structure as original, but every
// node is a distinct object — mutating `cloned` never affects `original`.
```

## Edge Cases

- `node === null` (empty graph) → `null`
- Single node with no neighbors → a single cloned node with an empty
  `neighbors` array
- Graph containing a cycle → must not infinite-loop; each node can only
  be cloned once
- Node connected to itself is not possible for a simple graph like this,
  but nodes cross-referencing each other (a cycle of length 2 or more)
  must still terminate correctly

## Hints

1. A naive recursive clone that doesn't track what's already been
   visited will recurse forever on any graph containing a cycle — what
   do you need to remember as you go?
2. Keep a map from *original* node references to their *already-created*
   clones. Before cloning a node, check whether it's already in the map
   — if so, reuse that clone instead of creating a new one and
   recursing again.
3. Clone the current node and register it in the map *before* recursing
   into its neighbors — this way, if a neighbor's traversal leads back
   to the current node (a cycle), the map lookup finds the
   already-in-progress clone instead of recursing infinitely.

## Algorithm

**Pattern:** DFS with a visited-node map to handle cycles.
**Core insight:** cloning a graph is really just cloning every node once
and rewiring every edge to point at the *cloned* neighbors instead of
the original ones — the only real difficulty is that the graph may
contain cycles, which would make naive recursion loop forever. A hash
map from original node → clone solves this: it acts as both a
"visited" check (preventing infinite recursion) and the lookup needed
to correctly wire cloned neighbor references, since a neighbor might
already have been cloned by a different path through the graph.
**Invariant:** whenever `dfs(curr)` is called, either `curr` is already
in `visited` (in which case its existing clone is returned immediately,
with no further recursion) or it's cloned and registered *before* its
neighbors are recursed into, guaranteeing every node is visited and
cloned exactly once regardless of how many cycles the graph contains.

## Dry Run

**Input graph:** node `1` connects to `2` and `4`; node `2` connects to
`1` and `3`; node `3` connects to `2` and `4`; node `4` connects to `1`
and `3` (a 4-cycle).

| Call | visited before | action | visited after |
|---|---|---|---|
| `dfs(1)` | `{}` | not visited: create clone `1'`, register it | `{1: 1'}` |
| ↳ `dfs(2)` | `{1: 1'}` | not visited: create clone `2'`, register it | `{1: 1', 2: 2'}` |
| ↳ ↳ `dfs(1)` | `{1: 1', 2: 2'}` | already visited: return `1'` directly | unchanged |
| ↳ ↳ `dfs(3)` | `{1: 1', 2: 2'}` | not visited: create clone `3'` | `{1: 1', 2: 2', 3: 3'}` |
| ↳ ↳ ↳ `dfs(2)` | (as above) | already visited: return `2'` | unchanged |
| ↳ ↳ ↳ `dfs(4)` | (as above) | not visited: create clone `4'` | `{..., 4: 4'}` |
| ↳ ↳ ↳ ↳ `dfs(1)`, `dfs(3)` | (as above) | both already visited: return existing clones | unchanged |
| ↳ `dfs(4)` | (as above) | already visited: return `4'` | unchanged |

**Result:** a fully cloned 4-cycle graph, structurally identical to the
original but sharing no object references with it.

## JavaScript Solution

```js
class Node {
  constructor(val, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

function cloneGraph(node) {
  if (!node) return null;
  const visited = new Map();

  function dfs(curr) {
    if (visited.has(curr)) return visited.get(curr);

    const clone = new Node(curr.val);
    visited.set(curr, clone);

    for (const neighbor of curr.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }

    return clone;
  }

  return dfs(node);
}
```

## TypeScript Solution

```ts
class GraphNode {
  val: number;
  neighbors: GraphNode[];
  constructor(val: number, neighbors: GraphNode[] = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

function cloneGraph(node: GraphNode | null): GraphNode | null {
  if (!node) return null;
  const visited = new Map<GraphNode, GraphNode>();

  function dfs(curr: GraphNode): GraphNode {
    const existing = visited.get(curr);
    if (existing) return existing;

    const clone = new GraphNode(curr.val);
    visited.set(curr, clone);

    for (const neighbor of curr.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }

    return clone;
  }

  return dfs(node);
}
```

## Time Complexity

O(V + E) — every node (V) is cloned exactly once, and every edge (E) is
traversed exactly once (once from each direction, since the graph is
undirected).

## Space Complexity

O(V) — the `visited` map holds one entry per node, plus recursion stack
depth up to O(V) in the worst case (a long path-like graph).

## Common Mistakes

- Not tracking visited nodes at all — recurses infinitely the moment the
  graph contains any cycle.
- Registering the clone in `visited` *after* recursing into neighbors
  instead of before — reintroduces infinite recursion on a cycle, since
  a neighbor's path back to the current node won't find it in the map
  yet.
- Cloning node *values* correctly but forgetting to rewire `neighbors`
  to point at the cloned nodes — accidentally leaves the clone's
  neighbor references pointing at the *original* graph's nodes, so it
  isn't a true independent deep copy.

## Interview Follow-up Questions

1. How would you implement this iteratively with an explicit stack or
   queue (BFS) instead of recursion, and why might that matter for very
   large graphs?
2. How would this change for a *directed* graph, where edges aren't
   automatically bidirectional?
3. How would you verify, given the original and cloned graphs, that they
   truly share no object references (a real "deep" copy)?

## Similar Questions

- Copy List with Random Pointer (see [../linked-list/copy-list-with-random-pointer.md](../linked-list/copy-list-with-random-pointer.md))
- Course Schedule I (Cycle Detection) (see [course-schedule-cycle-detection.md](course-schedule-cycle-detection.md))
