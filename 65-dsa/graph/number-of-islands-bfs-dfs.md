# Q6515 · Number of Islands (Grid BFS / DFS)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Google, Meta, Microsoft, Bloomberg  
**Interview Frequency:** ★★★★★  
**Category:** Graph  
**Concepts:** graph, dfs, bfs, grid, matrix-traversal  

## Problem Statement

Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

## Input

- `grid`: `string[][]` — 2D array of `'1'` and `'0'` characters

## Output

- `number` — total count of distinct islands

## Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 300`
- `grid[i][j]` is `'0'` or `'1'`

## Examples

```javascript
const grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
];
// Output: 1
```

```javascript
const grid2 = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
];
// Output: 3
```

## Edge Cases

- All water grid (`grid[i][j] === '0'`) -> returns `0`
- Single cell grid `[["1"]]` -> returns `1`

## Hints

1. Iterate over every cell `(r, c)` in the grid.
2. If `grid[r][c] === '1'`, increment `islandCount` and trigger a Depth-First Search (DFS) or Breadth-First Search (BFS) starting at `(r, c)`.
3. Inside DFS/BFS, mark visited land cells by mutating `grid[r][c] = '0'` (sink the island) to avoid visiting them again.
4. Explore 4 orthogonal directions: up, down, left, right.

## Algorithm

**Pattern:** Connected Components DFS / Sink Island Strategy  
**Core Insight:** Each unvisited `'1'` represents a new connected component. Sinking connected land cells (`grid[r][c] = '0'`) during traversal prevents allocating a separate `visited` matrix.

## Dry Run

Grid:
```
1 1 0
0 1 0
0 0 1
```
- `(0,0)` is `'1'`: `islandCount = 1`. Trigger `dfs(0,0)`:
  - Sinks `(0,0)` -> `'0'`. Recurses `(0,1)` -> sinks `(0,1)`, recurses `(1,1)` -> sinks `(1,1)`.
- `(0,1)` is `'0'` (sunk). `(0,2)` is `'0'`.
- `(1,0)` is `'0'`. `(1,1)` is `'0'` (sunk). `(1,2)` is `'0'`.
- `(2,2)` is `'1'`: `islandCount = 2`. Trigger `dfs(2,2)` -> sinks `(2,2)`.
- Return `islandCount = 2`.

## JavaScript Solution

```js
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
      return;
    }

    grid[r][c] = '0'; // Sink land cell

    dfs(r + 1, c); // Down
    dfs(r - 1, c); // Up
    dfs(r, c + 1); // Right
    dfs(r, c - 1); // Left
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}
```

## TypeScript Solution

```ts
function numIslands(grid: string[][]): number {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(r: number, c: number): void {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
      return;
    }

    grid[r][c] = '0';

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}
```

## Time Complexity

`O(M * N)` — visits every cell in the grid a constant number of times.

## Space Complexity

`O(M * N)` — worst-case call stack depth for grid full of land cells.

## Common Mistakes

- Forgetting to check grid boundary limits (`r < 0`, `c < 0`, `r >= rows`, `c >= cols`) in DFS, causing array out-of-bounds errors.

## Follow-Up Questions

1. How would you solve this without mutating the input grid? (Use a separate boolean `visited[r][c]` matrix or DSU).

## Similar Questions

- Max Area of Island
- Rotting Oranges
