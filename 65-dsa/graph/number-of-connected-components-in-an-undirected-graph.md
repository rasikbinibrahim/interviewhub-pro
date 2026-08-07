# Q6550 · Number of Connected Components in an Undirected Graph (Disjoint Set Union DSU)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Google, Meta, Microsoft, LinkedIn  
**Interview Frequency:** ★★★★★  
**Category:** Graph  
**Concepts:** graph, dsu, union-find, bfs, dfs, connected-components  

## Problem Statement

You have a graph of `n` nodes labeled from `0` to `n - 1`. You are given an integer `n` and an array `edges` where `edges[i] = [a_i, b_i]` indicates that there is an edge between `a_i` and `b_i` in the graph.

Return the total number of **connected components** in the graph.

## Input

- `n`: `number` — number of vertices
- `edges`: `number[][]` — 2D array of undirected edges

## Output

- `number` — connected components count

## Constraints

- `1 <= n <= 2000`
- `0 <= edges.length <= 5000`
- `edges[i].length == 2`
- `0 <= a_i, b_i < n`
- `a_i != b_i`
- There are no duplicate edges.

## Examples

| Input | Output | Why |
|---|---|---|
| `n = 5, edges = [[0,1],[1,2],[3,4]]` | `2` | Component 1: {0,1,2}, Component 2: {3,4} |
| `n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]` | `1` | All nodes form a single connected component |

## Edge Cases

- `edges` is empty `[]` -> returns `n` (all nodes isolated)
- Fully connected component

## Hints

1. **Disjoint Set Union (DSU / Union-Find)**:
   - Initialize `count = n`.
   - `parent` array where `parent[i] = i`.
   - `rank` array where `rank[i] = 1`.
2. For each edge `[u, v]`:
   - Find roots `rootU = find(u)` and `rootV = find(v)`.
   - If `rootU !== rootV`, perform `union(rootU, rootV)` and decrement `count--`.
3. Return `count`.

## Algorithm

**Pattern:** Disjoint Set Union (Union-Find) with Path Compression & Rank Optimization  
**Core Insight:** Starting with $N$ isolated components, each successful union operation connecting two previously disconnected components decrements total component count by 1 in near $O(1)$ amortized time.

## Dry Run

`n = 5, edges = [[0,1],[1,2],[3,4]]`:
- `count = 5`, `parent = [0, 1, 2, 3, 4]`.
- Edge `[0, 1]`: `find(0) = 0`, `find(1) = 1`. `union(0, 1)` -> `count = 4`.
- Edge `[1, 2]`: `find(1) = 0`, `find(2) = 2`. `union(0, 2)` -> `count = 3`.
- Edge `[3, 4]`: `find(3) = 3`, `find(4) = 4`. `union(3, 4)` -> `count = 2`.
- Return `2`.

## JavaScript Solution

```js
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(1);
    this.count = n;
  }

  find(i) {
    if (this.parent[i] === i) {
      return i;
    }
    // Path Compression Optimization
    return (this.parent[i] = this.find(this.parent[i]));
  }

  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);

    if (rootI !== rootJ) {
      // Union by Rank Optimization
      if (this.rank[rootI] < this.rank[rootJ]) {
        this.parent[rootI] = rootJ;
      } else if (this.rank[rootI] > this.rank[rootJ]) {
        this.parent[rootJ] = rootI;
      } else {
        this.parent[rootJ] = rootI;
        this.rank[rootI]++;
      }
      this.count--;
      return true;
    }

    return false;
  }
}

function countComponents(n, edges) {
  const uf = new UnionFind(n);
  for (const [u, v] of edges) {
    uf.union(u, v);
  }
  return uf.count;
}
```

## TypeScript Solution

```ts
class UnionFind {
  parent: number[];
  rank: number[];
  count: number;

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(1);
    this.count = n;
  }

  find(i: number): number {
    if (this.parent[i] === i) {
      return i;
    }
    return (this.parent[i] = this.find(this.parent[i]));
  }

  union(i: number, j: number): boolean {
    const rootI = this.find(i);
    const rootJ = this.find(j);

    if (rootI !== rootJ) {
      if (this.rank[rootI] < this.rank[rootJ]) {
        this.parent[rootI] = rootJ;
      } else if (this.rank[rootI] > this.rank[rootJ]) {
        this.parent[rootJ] = rootI;
      } else {
        this.parent[rootJ] = rootI;
        this.rank[rootI]++;
      }
      this.count--;
      return true;
    }

    return false;
  }
}

function countComponents(n: number, edges: number[][]): number {
  const uf = new UnionFind(n);
  for (const [u, v] of edges) {
    uf.union(u, v);
  }
  return uf.count;
}
```

## Time Complexity

`O(V + E * alpha(V))` — where $\alpha$ is the Inverse Ackermann function (effectively constant $O(1)$).

## Space Complexity

`O(V)` — to store `parent` and `rank` arrays.

## Common Mistakes

- Omitting path compression `this.parent[i] = this.find(...)`, causing unbalanced tree degradation ($O(V)$ time per find).

## Follow-Up Questions

1. How would you solve Redundant Connection (finding an edge that can be removed to form a tree)?

## Similar Questions

- Number of Islands
- Redundant Connection
