# Q6564 · Graph Valid Tree (Cycle Detection & Disjoint Set Union)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Graph  
**Concepts:** graph, dsu, union-find, cycle-detection, tree-definition  

## Problem Statement

You have a graph of `n` nodes labeled from `0` to `n - 1`. You are given an integer `n` and a list of `edges` where `edges[i] = [a_i, b_i]` indicates that there is an undirected edge between nodes `a_i` and `b_i` in the graph.

Return `true` if the edges of the given graph make up a **valid tree**, and `false` otherwise.

## Input

- `n`: `number` — number of vertices
- `edges`: `number[][]` — 2D array of undirected edges

## Output

- `boolean` — `true` if graph is a valid tree, `false` otherwise

## Constraints

- `1 <= n <= 2000`
- `0 <= edges.length <= 5000`
- `edges[i].length == 2`
- `0 <= a_i, b_i < n`

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]` | `true` | Single connected graph with no cycles (valid tree) |
| `n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]` | `false` | Edge `[1,3]` creates a cycle `{1,2,3}` |

## Edge Cases

- `edges.length !== n - 1` -> **MUST BE FALSE immediately!** A valid tree with `n` nodes MUST have exactly `n - 1` edges.

## Hints

1. **Tree Formal Definition**: A graph of $N$ nodes is a valid tree IF AND ONLY IF:
   - It contains **no cycles**.
   - It is **fully connected** (single component).
   - Exactly $N - 1$ edges exist.
2. Fast Fail Check: If `edges.length !== n - 1`, return `false`.
3. Use Disjoint Set Union (DSU). Initialize `parent` array.
4. For each edge `[u, v]`:
   - If `find(u) === find(v)`, a **cycle is detected!** Return `false`.
   - Perform `union(u, v)`.
5. If no cycle is detected and `edges.length === n - 1`, return `true`.

## Algorithm

**Pattern:** Disjoint Set Union Cycle Detection  
**Core Insight:** Enforcing `edges.length === n - 1` guarantees connectivity if cycle detection using DSU passes without finding an already-connected node pair.

## Dry Run

`n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]`:
- `edges.length (4) === n - 1 (4)` -> Pass edge count check.
- Union `(0, 1)` -> OK.
- Union `(0, 2)` -> OK.
- Union `(0, 3)` -> OK.
- Union `(1, 4)` -> OK.
- No cycle detected -> Return `true`.

## JavaScript Solution

```js
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }

  find(i) {
    if (this.parent[i] === i) return i;
    return (this.parent[i] = this.find(this.parent[i]));
  }

  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);

    if (rootI === rootJ) {
      return false; // Cycle detected!
    }

    this.parent[rootI] = rootJ;
    return true;
  }
}

function validTree(n, edges) {
  // A tree with n nodes MUST have exactly n - 1 edges!
  if (edges.length !== n - 1) return false;

  const uf = new UnionFind(n);

  for (const [u, v] of edges) {
    if (!uf.union(u, v)) {
      return false; // Cycle found
    }
  }

  return true;
}
```

## TypeScript Solution

```ts
class UnionFind {
  parent: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }

  find(i: number): number {
    if (this.parent[i] === i) return i;
    return (this.parent[i] = this.find(this.parent[i]));
  }

  union(i: number, j: number): boolean {
    const rootI = this.find(i);
    const rootJ = this.find(j);

    if (rootI === rootJ) {
      return false;
    }

    this.parent[rootI] = rootJ;
    return true;
  }
}

function validTree(n: number, edges: number[][]): boolean {
  if (edges.length !== n - 1) return false;

  const uf = new UnionFind(n);

  for (const [u, v] of edges) {
    if (!uf.union(u, v)) {
      return false;
    }
  }

  return true;
}
```

## Time Complexity

`O(V + E * alpha(V))` — near $O(1)$ amortized Union-Find operations.

## Space Complexity

`O(V)` — `parent` array space.

## Common Mistakes

- Forgetting to check `edges.length === n - 1`, reporting a disconnected graph like `n = 4, edges = [[0,1],[2,3]]` as a valid tree.

## Follow-Up Questions

1. How would you solve this problem using BFS/DFS traversal instead of Disjoint Set Union?

## Similar Questions

- Number of Connected Components in an Undirected Graph
- Redundant Connection
