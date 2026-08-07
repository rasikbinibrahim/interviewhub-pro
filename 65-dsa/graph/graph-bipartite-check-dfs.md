# Q6602 · Graph Bipartite Check via DFS

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft  
**Interview Frequency:** ★★★★☆  
**Category:** Graph  
**Concepts:** graph, dfs, 2-coloring, bipartite  

## Problem Statement

Check if an undirected graph represented as an adjacency list is **bipartite** using Depth-First Search (DFS) 2-Coloring.

## Input

- `graph`: `number[][]` — 2D adjacency list

## Output

- `boolean` — `true` if bipartite, `false` otherwise

## Algorithm

**Pattern:** Recursive DFS 2-Coloring  
**Core Insight:** Recursively paint adjacent vertices with alternating colors `1` and `-1`. If an adjacent vertex has the same color as the current vertex, a conflict is detected.

```javascript
function isBipartiteDFS(graph) {
  const n = graph.length;
  const colors = new Array(n).fill(0);

  function dfs(node, color) {
    colors[node] = color;

    for (const neighbor of graph[node]) {
      if (colors[neighbor] === color) return false;
      if (colors[neighbor] === 0 && !dfs(neighbor, -color)) return false;
    }

    return true;
  }

  for (let i = 0; i < n; i++) {
    if (colors[i] === 0 && !dfs(i, 1)) return false;
  }

  return true;
}
```

## Time & Space Complexity

- **Time Complexity:** `O(V + E)` — visits every vertex and edge.
- **Space Complexity:** `O(V)` — colors array and DFS call stack.
