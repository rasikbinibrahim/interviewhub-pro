# Q1303 · Clone Graph

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Graph
**Concepts:** DFS/BFS traversal, hash map for visited-node-to-clone mapping

## Problem Statement

Given a reference to a node in a connected, undirected graph, return a
deep copy (clone) of the entire graph. Each node is represented as `{
val, neighbors }`, where `neighbors` is an array of references to
adjacent nodes.

## Input

`node`: a reference to any node in the graph (or `null` for an empty
graph), each node shaped `{ val: number, neighbors: Node[] }`.

## Output

A reference to the corresponding node in a fully independent deep copy
of the graph — same structure and connectivity, but no shared node
references with the original.

## Constraints

- The number of nodes is in `[0, 100]`.
- Each node's value is unique.
- The graph has no repeated (multi-) edges and no self-loops.
- The graph is connected — every node reachable from every other.

## Examples

| Input | Output | Why |
|---|---|---|
| Graph `1 -- 2 -- 3 -- 1` (triangle, all mutually connected) | An independently-allocated triangle graph with the same values and connectivity | Every node and edge is duplicated, but no object identity is shared with the original |
| `null` (empty graph) | `null` | Nothing to clone |
| Single node with no neighbors | A single cloned node with an empty neighbors array | Trivial case, still needs its own new object |

## Edge Cases

- Empty graph (`node = null`) → return `null` immediately
- A single, isolated node → clone just that one node, `neighbors: []`
- A cyclic graph (which, since it's undirected and connected with more
  than one node, always has at least one cycle back to an ancestor) →
  naive recursion without tracking visited nodes would loop forever

## Hints

1. A graph can contain cycles (unlike a tree) — what happens if you
   naively recurse into every neighbor without remembering which nodes
   you've already started cloning?
2. Every original node needs to map to exactly one corresponding cloned
   node, and that mapping needs to be checked *before* deciding whether
   to create a new clone or reuse an existing one.
3. A hash map from original node references to their corresponding
   cloned node references solves both problems at once: it prevents
   infinite recursion on cycles (a node already being cloned is detected
   immediately), and it ensures multiple paths back to the same original
   node all correctly point to the *same* cloned node, not separate
   duplicate clones.

## Algorithm

**Pattern:** DFS traversal with a hash map tracking original-to-clone
correspondence.
**Core insight:** the graph may contain cycles, so a traversal that
doesn't remember which nodes it has already started cloning would
recurse forever. A hash map keyed by original node reference, storing
each node's corresponding clone, solves this: before cloning a node's
neighbors, check whether that node has already been cloned — if so,
reuse the existing clone reference immediately instead of recursing
again. This both terminates on cycles and guarantees the resulting
clone has correct shared structure (two different original nodes both
pointing to a third node will, after cloning, both point to the *same*
cloned third node, not two separate copies of it).
**Invariant:** once a node's entry is created in the map, it's
guaranteed to eventually be returned for every subsequent reference to
that same original node, anywhere else in the traversal.

## Dry Run

**Input:** graph `1 -- 2`, `2 -- 3`, `3 -- 1` (a triangle: nodes 1, 2, 3
all mutually connected), starting from node `1`

| Step | Node processed | cloneMap before | Action |
|---|---|---|---|
| 1 | `clone(1)` | `{}` | not in map — create `clone1 = {val:1, neighbors:[]}`, map `1 -> clone1` |
| 2 | processing 1's neighbors: `clone(2)` | `{1: clone1}` | not in map — create `clone2`, map `2 -> clone2`; `clone1.neighbors.push(clone2)` |
| 3 | processing 2's neighbors: `clone(3)` | `{1: clone1, 2: clone2}` | not in map — create `clone3`, map `3 -> clone3`; `clone2.neighbors.push(clone3)` |
| 4 | processing 3's neighbors: `clone(1)` | `{1: clone1, 2: clone2, 3: clone3}` | already in map! reuse `clone1`; `clone3.neighbors.push(clone1)` |
| 5 | processing 2's neighbors continues: `clone(1)` | (same map) | already in map — reuse `clone1`; `clone2.neighbors.push(clone1)` |
| 6 | processing 1's neighbors continues: `clone(3)` | (same map) | already in map — reuse `clone3`; `clone1.neighbors.push(clone3)` |

**Result:** a fully connected clone triangle `clone1 -- clone2 --
clone3 -- clone1`, structurally identical to the original but with
entirely independent node objects.

## JavaScript Solution

```js
function cloneGraph(node) {
  if (node === null) return null;

  const cloneMap = new Map(); // original node -> its clone

  function clone(original) {
    if (cloneMap.has(original)) {
      return cloneMap.get(original);
    }

    const copy = { val: original.val, neighbors: [] };
    cloneMap.set(original, copy);

    for (const neighbor of original.neighbors) {
      copy.neighbors.push(clone(neighbor));
    }

    return copy;
  }

  return clone(node);
}
```

## TypeScript Solution

```ts
interface GraphNode {
  val: number;
  neighbors: GraphNode[];
}

function cloneGraph(node: GraphNode | null): GraphNode | null {
  if (node === null) return null;

  const cloneMap = new Map<GraphNode, GraphNode>();

  function clone(original: GraphNode): GraphNode {
    const existing = cloneMap.get(original);
    if (existing !== undefined) {
      return existing;
    }

    const copy: GraphNode = { val: original.val, neighbors: [] };
    cloneMap.set(original, copy);

    for (const neighbor of original.neighbors) {
      copy.neighbors.push(clone(neighbor));
    }

    return copy;
  }

  return clone(node);
}
```

## Time Complexity

O(V + E) — every node is cloned exactly once (V), and every edge is
processed exactly once per direction it's traversed (E, since the graph
is undirected each edge is seen from both endpoints).

## Space Complexity

O(V) — the `cloneMap` holds one entry per original node, plus O(V) for
the recursion call stack in the worst case (a graph shaped like a long
chain).

## Common Mistakes

- Not checking the map *before* recursing into a node's neighbors —
  without an early check, a cycle causes infinite recursion.
- Creating a new clone every time a node is encountered instead of
  reusing the map's existing entry — produces a "tree-shaped" copy that
  duplicates nodes instead of preserving the original graph's actual
  shared structure.
- Registering the new clone in the map *after* recursing into its
  neighbors instead of before — if a neighbor's traversal cycles back to
  this node before it's registered, infinite recursion happens anyway.

## Interview Follow-up Questions

1. How would you solve this iteratively with an explicit stack or queue
   (BFS) instead of recursion?
2. How would this change if the graph could be disconnected (multiple
   separate components), and you needed to clone starting from an
   arbitrary node but were given references to all components?
3. How would you detect whether two different original graphs are
   structurally identical (isomorphic), building on this cloning
   technique?

## Similar Questions

- Course Schedule (see [course-schedule.md](course-schedule.md))
- Number of Islands (see [number-of-islands.md](number-of-islands.md))
- Copy List with Random Pointer (the linked-list analog of this same
  "hash map original-to-clone" technique)

---
[← Back to Graph](README.md) · [← Back to 65-dsa](../README.md)
