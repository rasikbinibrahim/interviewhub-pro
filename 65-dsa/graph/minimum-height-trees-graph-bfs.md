# Q6603 · Minimum Height Trees (Topological Leaf Trimming BFS)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft  
**Interview Frequency:** ★★★★★  
**Category:** Graph  
**Concepts:** graph, bfs, topological-sort, tree-centroid  

## Problem Statement

A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.

Given a tree of `n` nodes labeled from `0` to `n - 1`, and an array of `n - 1` `edges`, return a list of all **Minimum Height Trees (MHTs)** root labels.

## Input

- `n`: `number` — node count
- `edges`: `number[][]` — undirected edge array

## Output

- `number[]` — list of root labels for minimum height trees

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 4, edges = [[1,0],[1,2],[1,3]]` | `[1]` | Rooting tree at node 1 yields min height 1 |
| `n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]` | `[3,4]` | Roots 3 and 4 both yield min height 2 |

## Algorithm

**Pattern:** Multi-Source BFS Leaf Trimming  
**Core Insight:** The centroid(s) of a tree (at most 2 nodes) form the roots of Minimum Height Trees. Repeatedly trim degree-1 leaf nodes inward layer by layer until $\le 2$ nodes remain.

```javascript
function findMinHeightTrees(n, edges) {
  if (n <= 2) {
    const result = [];
    for (let i = 0; i < n; i++) result.push(i);
    return result;
  }

  const adj = Array.from({ length: n }, () => new Set());
  for (const [u, v] of edges) {
    adj[u].add(v);
    adj[v].add(u);
  }

  // Initialize leaves (degree 1 nodes)
  let leaves = [];
  for (let i = 0; i < n; i++) {
    if (adj[i].size === 1) leaves.push(i);
  }

  let remainingNodes = n;
  while (remainingNodes > 2) {
    remainingNodes -= leaves.length;
    const newLeaves = [];

    for (const leaf of leaves) {
      const neighbor = adj[leaf].values().next().value;
      adj[neighbor].delete(leaf);
      if (adj[neighbor].size === 1) {
        newLeaves.push(neighbor);
      }
    }

    leaves = newLeaves;
  }

  return leaves;
}
```

## Time & Space Complexity

- **Time Complexity:** `O(V)` — trims each node and edge once.
- **Space Complexity:** `O(V)` — adjacency list and leaf queues.
