# Q6591 · Is Graph Bipartite? (Graph 2-Coloring BFS/DFS)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Graph  
**Concepts:** graph, bfs, dfs, bipartite, 2-coloring  

## Problem Statement

There is an undirected graph with `n` nodes, where each node is numbered between `0` and `n - 1`. You are given a 2D array `graph`, where `graph[u]` is an array of nodes that node `u` is adjacent to.

A graph is **bipartite** if the nodes can be partitioned into two independent sets $A$ and $B$ such that every edge in the graph connects a node in set $A$ and a node in set $B$.

Return `true` if and only if it is **bipartite**.

## Input

- `graph`: `number[][]` — adjacency list of undirected graph

## Output

- `boolean` — `true` if graph is bipartite (2-colorable), `false` otherwise

## Constraints

- `graph.length == n`
- `1 <= n <= 100`
- `0 <= graph[u].length < n`
- `0 <= graph[u][i] <= n - 1`
- `graph[u]` does not contain `u` (no self-loops).
- All values of `graph[u]` are **unique**.
- The graph may be disconnected.

## Examples

| Input | Output | Why |
|---|---|---|
| `graph = [[1,2,3],[0,2],[0,1,3],[0,2]]` | `false` | Nodes 0, 1, 2 form an odd cycle {0-1-2-0} (cannot be 2-colored) |
| `graph = [[1,3],[0,2],[1,3],[0,2]]` | `true` | Even cycle {0-1-2-3-0} can be partitioned into Set A {0, 2} and Set B {1, 3} |

## Edge Cases

- Disconnected graph components -> iterate unvisited nodes `0...n-1` to launch BFS/DFS on every component.

## Hints

1. **Graph 2-Coloring Theorem**:
   - A graph is bipartite IF AND ONLY IF it contains **NO odd-length cycles**.
2. Maintain `colors` array initialized to `0` (uncolored). Use colors `1` and `-1`.
3. For each uncolored node `i`:
   - Set `colors[i] = 1`. Launch BFS/DFS queue.
   - For neighbor `v` of `u`:
     - If `colors[v] === 0`: Set `colors[v] = -colors[u]` and push to queue.
     - If `colors[v] === colors[u]`: **Color conflict detected!** Return `false`.

## Algorithm

**Pattern:** Alternating 2-Coloring BFS/DFS  
**Core Insight:** Assigning alternating colors ($1$ and $-1$) to neighboring vertices detects odd-length cycle conflicts in $O(V + E)$ time.

## Dry Run

`graph = [[1,3],[0,2],[1,3],[0,2]]`:
- `colors = [0, 0, 0, 0]`.
- Start `node 0`: `color[0] = 1`.
- Neighbors of 0: `node 1`, `node 3` -> set `color[1] = -1`, `color[3] = -1`.
- Neighbor of 1: `node 2` -> set `color[2] = 1`.
- Neighbor of 2: `node 3` -> `color[3] (-1)` is opposite `color[2] (1)`. Match!
- Return `true`.

## JavaScript Solution

```js
function isBipartite(graph) {
  const n = graph.length;
  const colors = new Array(n).fill(0); // 0: uncolored, 1: red, -1: blue

  for (let i = 0; i < n; i++) {
    if (colors[i] !== 0) continue; // Already colored

    const queue = [i];
    colors[i] = 1;

    while (queue.length > 0) {
      const curr = queue.shift();

      for (const neighbor of graph[curr]) {
        if (colors[neighbor] === 0) {
          // Color neighbor with opposite color
          colors[neighbor] = -colors[curr];
          queue.push(neighbor);
        } else if (colors[neighbor] === colors[curr]) {
          return false; // Conflict! Graph is not 2-colorable.
        }
      }
    }
  }

  return true;
}
```

## TypeScript Solution

```ts
function isBipartite(graph: number[][]): boolean {
  const n = graph.length;
  const colors: number[] = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    if (colors[i] !== 0) continue;

    const queue: number[] = [i];
    colors[i] = 1;

    while (queue.length > 0) {
      const curr = queue.shift()!;

      for (const neighbor of graph[curr]) {
        if (colors[neighbor] === 0) {
          colors[neighbor] = -colors[curr];
          queue.push(neighbor);
        } else if (colors[neighbor] === colors[curr]) {
          return false;
        }
      }
    }
  }

  return true;
}
```

## Time Complexity

`O(V + E)` — visits every vertex and edge once.

## Space Complexity

`O(V)` — space for `colors` array and BFS queue.

## Common Mistakes

- Forgetting outer loop `for (let i = 0; i < n; i++)`, missing disconnected components in un-directed graphs.

## Follow-Up Questions

1. How does Possible Bipartition map to this problem by constructing graph edges from dislike pairs?

## Similar Questions

- Possible Bipartition
- Course Schedule I
