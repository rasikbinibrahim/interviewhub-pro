# Q6585 · Pacific Atlantic Water Flow (Multi-Source Reverse BFS/DFS)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Graph  
**Concepts:** graph, bfs, dfs, matrix, multi-source-search  

## Problem Statement

There is an `m x n` rectangular island that borders both the **Pacific Ocean** and **Atlantic Ocean**. The Pacific Ocean touches the island's **left** and **top** edges, and the Atlantic Ocean touches the island's **right** and **bottom** edges.

The island is partitioned into a grid of square cells. You are given an `m x n` integer matrix `heights` where `heights[r][c]` represents the height above sea level of the cell at coordinate `(r, c)`.

Rainwater can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is **less than or equal to** the current cell's height. Water can flow into an ocean from any cell adjacent to that ocean.

Return a 2D list of grid coordinates `[r, c]` where rainwater can flow to **both** the Pacific and Atlantic oceans.

## Input

- `heights`: `number[][]` — 2D array of grid elevation heights

## Output

- `number[][]` — list of `[r, c]` coordinates flowing to both oceans

## Constraints

- `m == heights.length`
- `n == heights[i].length`
- `1 <= m, n <= 200`
- `0 <= heights[i][j] <= 10^5`

## Examples

| Input | Output | Why |
|---|---|---|
| `heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]` | `[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]` | Grid coordinates flowing to both oceans |

## Edge Cases

- `1x1` grid `[[1]]` -> returns `[[0, 0]]`

## Hints

1. **Reverse Flow from Ocean Shorelines**:
   - Instead of starting DFS/BFS from every cell and flowing *downward* toward oceans, start DFS **upward** from ocean shoreline borders!
2. Create 2 boolean matrices: `pacificReachable[m][n]` and `atlanticReachable[m][n]`.
3. Launch DFS from **top and left borders** into `pacificReachable`.
4. Launch DFS from **bottom and right borders** into `atlanticReachable`.
5. DFS condition: Recurse to neighbor if `heights[nr][nc] >= heights[r][c]` (water flows uphill in reverse search!).
6. Result is all `(r, c)` where `pacificReachable[r][c] && atlanticReachable[r][c]` are both true.

## Algorithm

**Pattern:** Multi-Source Reverse Flow Reachability Sets  
**Core Insight:** Reversing the flow search from ocean boundaries upward reduces $O((M \times N)^2)$ forward searches to two $O(M \times N)$ boundary traversals.

## Dry Run

`heights = [[1,2],[2,1]]`:
- Pacific shorelines: `(0,0), (0,1), (1,0)`. Reverse flow marks all 4 cells.
- Atlantic shorelines: `(1,1), (0,1), (1,0)`. Reverse flow marks all 4 cells.
- Intersection: `[[0,0],[0,1],[1,0],[1,1]]`.

## JavaScript Solution

```js
function pacificAtlantic(heights) {
  const m = heights.length;
  const n = heights[0].length;

  const pacific = Array.from({ length: m }, () => new Array(n).fill(false));
  const atlantic = Array.from({ length: m }, () => new Array(n).fill(false));

  function dfs(r, c, reachable) {
    reachable[r][c] = true;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr >= 0 && nr < m &&
        nc >= 0 && nc < n &&
        !reachable[nr][nc] &&
        heights[nr][nc] >= heights[r][c] // Water flows uphill in reverse!
      ) {
        dfs(nr, nc, reachable);
      }
    }
  }

  // Top and Bottom borders
  for (let c = 0; c < n; c++) {
    dfs(0, c, pacific);        // Top border -> Pacific
    dfs(m - 1, c, atlantic);    // Bottom border -> Atlantic
  }

  // Left and Right borders
  for (let r = 0; r < m; r++) {
    dfs(r, 0, pacific);        // Left border -> Pacific
    dfs(r, n - 1, atlantic);    // Right border -> Atlantic
  }

  const result = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (pacific[r][c] && atlantic[r][c]) {
        result.push([r, c]);
      }
    }
  }

  return result;
}
```

## TypeScript Solution

```ts
function pacificAtlantic(heights: number[][]): number[][] {
  const m = heights.length;
  const n = heights[0].length;

  const pacific: boolean[][] = Array.from({ length: m }, () => new Array(n).fill(false));
  const atlantic: boolean[][] = Array.from({ length: m }, () => new Array(n).fill(false));

  function dfs(r: number, c: number, reachable: boolean[][]): void {
    reachable[r][c] = true;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr >= 0 && nr < m &&
        nc >= 0 && nc < n &&
        !reachable[nr][nc] &&
        heights[nr][nc] >= heights[r][c]
      ) {
        dfs(nr, nc, reachable);
      }
    }
  }

  for (let c = 0; c < n; c++) {
    dfs(0, c, pacific);
    dfs(m - 1, c, atlantic);
  }

  for (let r = 0; r < m; r++) {
    dfs(r, 0, pacific);
    dfs(r, n - 1, atlantic);
  }

  const result: number[][] = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (pacific[r][c] && atlantic[r][c]) {
        result.push([r, c]);
      }
    }
  }

  return result;
}
```

## Time Complexity

`O(M * N)` — visits each cell a constant number of times.

## Space Complexity

`O(M * N)` — space for boolean matrices and DFS stack.

## Common Mistakes

- Reversing traversal condition to `heights[nr][nc] <= heights[r][c]`, which simulates downward flow instead of upward reverse shoreline reachability.

## Follow-Up Questions

1. How would you solve Number of Islands using similar matrix DFS traversal?

## Similar Questions

- Number of Islands
- Surrounded Regions
