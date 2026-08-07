# Q6511 · Union Find (Disjoint Set Union) Implementation

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Meta, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Disjoint Set  
**Concepts:** disjoint-set-union, dsu, path-compression, union-by-rank, graph  

## Problem Statement

Implement a **Disjoint Set Union (DSU)** data structure with **Path Compression** and **Union by Rank** optimizations.

Implement `UnionFind` class:
- `constructor(n: number)`: Initializes `n` elements (from `0` to `n-1`), each initially in its own set.
- `find(i: number)`: Returns the representative parent root of element `i` with path compression.
- `union(i: number, j: number)`: Unites the set containing `i` and the set containing `j`. Returns `true` if a new union was formed, or `false` if `i` and `j` were already in the same set.
- `isConnected(i: number, j: number)`: Returns `true` if `i` and `j` belong to the same set.

## Input

- `n`: `number` — number of elements `[0..n-1]`
- `union(i, j)`, `find(i)`, `isConnected(i, j)`

## Output

- `union`: `boolean`
- `find`: `number` (root index)
- `isConnected`: `boolean`

## Constraints

- `1 <= n <= 10^5`
- At most `10^5` operations

## Examples

```javascript
const dsu = new UnionFind(5);
dsu.union(0, 1); // returns true
dsu.union(1, 2); // returns true
dsu.isConnected(0, 2); // returns true
dsu.union(0, 2); // returns false (already connected)
```

## Edge Cases

- Self-union `dsu.union(i, i)` -> returns `false`
- Disconnected graph components

## Hints

1. Maintain `parent` array where `parent[i]` points to parent of `i`. Initially `parent[i] = i`.
2. Maintain `rank` array to attach smaller height tree under root of larger height tree during `union`.
3. **Path Compression**: In `find(i)`, recursively update `parent[i] = find(parent[i])` so every node along the path points directly to root.

## Algorithm

**Pattern:** Path Compression + Union by Rank  
**Core Insight:** Path compression flattens the tree structure during `find()` queries, while Union by Rank ensures tree depth remains minimal during `union()`, yielding nearly `O(1)` amortized time complexity `O(α(N))` per operation.

## Dry Run

`dsu = new UnionFind(4)`:
- `parent = [0, 1, 2, 3]`, `rank = [0, 0, 0, 0]`
- `union(0, 1)`: root(0)=0, root(1)=1 -> parent[1] = 0, rank[0] = 1 -> `parent = [0, 0, 2, 3]`
- `union(2, 3)`: root(2)=2, root(3)=3 -> parent[3] = 2, rank[2] = 1 -> `parent = [0, 0, 2, 2]`
- `union(1, 3)`: root(1)=0, root(3)=2 -> rank[0] == rank[2] -> parent[2] = 0, rank[0] = 2 -> `parent = [0, 0, 0, 2]`
- `find(3)`: parent[3] is 2, parent[2] is 0 -> path compression updates `parent[3] = 0` directly. Return 0.

## JavaScript Solution

```js
class UnionFind {
  constructor(n) {
    this.parent = new Array(n);
    this.rank = new Array(n).fill(0);
    this.count = n;
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
    }
  }

  find(i) {
    if (this.parent[i] === i) {
      return i;
    }
    // Path compression
    this.parent[i] = this.find(this.parent[i]);
    return this.parent[i];
  }

  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);

    if (rootI === rootJ) {
      return false; // Already connected
    }

    // Union by rank
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

  isConnected(i, j) {
    return this.find(i) === this.find(j);
  }

  getComponentCount() {
    return this.count;
  }
}
```

## TypeScript Solution

```ts
class UnionFind {
  private parent: number[];
  private rank: number[];
  private count: number;

  constructor(n: number) {
    this.parent = new Array(n);
    this.rank = new Array(n).fill(0);
    this.count = n;
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
    }
  }

  find(i: number): number {
    if (this.parent[i] === i) {
      return i;
    }
    this.parent[i] = this.find(this.parent[i]);
    return this.parent[i];
  }

  union(i: number, j: number): boolean {
    const rootI = this.find(i);
    const rootJ = this.find(j);

    if (rootI === rootJ) {
      return false;
    }

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

  isConnected(i: number, j: number): boolean {
    return this.find(i) === this.find(j);
  }

  getComponentCount(): number {
    return this.count;
  }
}
```

## Time Complexity

- `find(i)`: `O(α(N))` amortized, where `α` is the inverse Ackermann function (`< 5` for all practical values of `N`).
- `union(i, j)`: `O(α(N))`
- `isConnected(i, j)`: `O(α(N))`

## Space Complexity

`O(N)` — parent and rank arrays.

## Common Mistakes

- Omitting Path Compression in `find()`, causing tree height to degrade to `O(N)` linear chains.
- Updating `parent[i] = rootJ` without finding root representatives `find(i)` and `find(j)` first.

## Follow-Up Questions

1. How is DSU used in Kruskal's Minimum Spanning Tree (MST) algorithm?
2. How do you detect cycles in an undirected graph using DSU?

## Similar Questions

- Redundant Connection
- Number of Islands (Alternative DSU approach)
