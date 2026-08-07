# Q1301 · Number of Islands

**Difficulty:** Medium
**Companies Asked:** Google, Amazon, Meta, Microsoft, Uber, Bloomberg
**Interview Frequency:** ★★★★★
**Category:** Data Structures & Algorithms → Graph
**Concepts:** grid traversal as an implicit graph, DFS/BFS, visited tracking, connected components

## Problem Statement

Given a 2D grid of `'1'` (land) and `'0'` (water), return the number of
islands. An island is formed by connecting adjacent land cells
horizontally or vertically (not diagonally) and is surrounded by water.
Assume all four edges of the grid are surrounded by water.

## Input

`grid`: a 2D array of single-character strings, each either `'1'` or
`'0'`.

## Output

A single integer: the number of distinct islands.

## Constraints

- `1 <= grid.length, grid[0].length <= 300`
- `grid[i][j]` is either `'1'` or `'0'`.

## Examples

| Input (grid) | Output | Why |
|---|---|---|
| `[["1","1","0"],["1","0","0"],["0","0","1"]]` | `2` | The top-left `1`s are one connected island; the bottom-right `1` is a separate, disconnected island |
| `[["1","1","1"],["0","1","0"],["1","1","1"]]` | `1` | All land cells connect through the center column into one island |
| `[["0","0"],["0","0"]]` | `0` | No land at all |

## Edge Cases

- All-water grid → `0` islands.
- All-land grid → `1` island (every cell connects to its neighbors).
- A single cell (`1x1` grid) → `0` or `1` depending on whether that one
  cell is land or water.
- Two land cells diagonally adjacent but not sharing an edge → count as
  *two separate* islands, since only horizontal/vertical adjacency
  connects cells, not diagonal.

## Hints

1. Treat the grid as an implicit graph: each land cell is a node,
   connected to its up/down/left/right land neighbors — what standard
   graph algorithm counts connected components?
2. Scan every cell; whenever you find land that hasn't been visited yet,
   that's the *start* of a brand new island — increment your island
   count once, then explore and mark every cell connected to it so you
   never count it again.
3. The exploration step (DFS or BFS from that starting cell) needs to
   "sink" every connected land cell as it visits them — either by
   marking them in a separate `visited` structure, or by mutating the
   grid in place (e.g. flipping visited `'1'`s to `'0'`s), so the outer
   scan never re-triggers on cells already claimed by an island it
   already counted.

## Algorithm

**Pattern:** grid traversal via DFS, counting connected components.
**Core insight:** a 2D grid with adjacency rules is just a graph with an
implicit edge structure (each cell connects to its ≤4 orthogonal
neighbors) rather than an explicit adjacency list. Counting islands is
exactly counting connected components: scan every cell in order, and
each time the scan encounters an unvisited land cell, that cell must be
the "first cell found" of an island the scan hasn't counted yet — so
increment the count once, then flood-fill (DFS) outward to mark every
cell reachable from it as visited, which guarantees the outer scan will
never trigger on any of that same island's cells again.
**Invariant:** every time the increment happens, the cell that
triggered it belongs to a connected component no earlier increment has
already claimed — guaranteed because the DFS from every previous
increment fully visited (and marked) its entire component before the
scan moved on.

## Dry Run

**Input:**
```
1 1 0
1 0 0
0 0 1
```

| Scan position | Cell | Already visited? | Action | Island count |
|---|---|---|---|---|
| (0,0) | `1` | no | new island found → DFS marks (0,0),(0,1),(1,0) as visited | 1 |
| (0,1) | `1` | yes (marked by the DFS just run) | skip | 1 |
| (0,2) | `0` | — | skip (water) | 1 |
| (1,0) | `1` | yes | skip | 1 |
| (1,1), (1,2) | `0` | — | skip | 1 |
| (2,0), (2,1) | `0` | — | skip | 1 |
| (2,2) | `1` | no | new island found → DFS marks (2,2) | 2 |

**Result:** `2` — matches expected output; the top-left connected blob
counted once, the isolated bottom-right cell counted separately.

## JavaScript Solution

```js
function numIslands(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let islandCount = 0;

  function sink(row, col) {
    // Out of bounds, or water, or already-visited land — nothing to do.
    if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] !== '1') {
      return;
    }

    grid[row][col] = '0'; // mark visited by "sinking" this land cell

    // Flood-fill outward to every orthogonally connected land cell.
    sink(row + 1, col);
    sink(row - 1, col);
    sink(row, col + 1);
    sink(row, col - 1);
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === '1') {
        islandCount++; // first cell of an island the scan hasn't seen yet
        sink(row, col); // claim every cell connected to it
      }
    }
  }

  return islandCount;
}
```

## TypeScript Solution

```ts
function numIslands(grid: string[][]): number {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  let islandCount = 0;

  function sink(row: number, col: number): void {
    if (row < 0 || row >= rows || col < 0 || col >= cols) return;
    if (grid[row]?.[col] !== '1') return;

    grid[row]![col] = '0';

    sink(row + 1, col);
    sink(row - 1, col);
    sink(row, col + 1);
    sink(row, col - 1);
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row]?.[col] === '1') {
        islandCount++;
        sink(row, col);
      }
    }
  }

  return islandCount;
}
```

## Time Complexity

O(rows * cols) — every cell is visited by the outer scan once, and each
cell is "sunk" by the DFS at most once total across the whole run (once
a cell becomes `'0'`, no later DFS call does any work on it beyond the
O(1) bounds/value check).

## Space Complexity

O(rows * cols) worst case for the recursion call stack, if the entire
grid is one giant connected island (a "snake" pattern would make the
DFS recurse as deep as the total cell count).

## Common Mistakes

- Forgetting to mark cells as visited (or forgetting to check the mark
  before recursing) — causes infinite recursion between two cells that
  keep re-visiting each other, or wildly overcounts.
- Checking diagonal neighbors in addition to orthogonal ones — the
  problem specifically defines adjacency as horizontal/vertical only;
  including diagonals would undercount separate islands as connected.
- Mutating the input grid without realizing it's a side effect the
  caller might not expect — using a separate `visited` Set/2D-array
  instead of mutating `grid` in place avoids this, at the cost of extra
  space; worth mentioning as a trade-off in an interview even if the
  in-place version is what you implement.

## Interview Follow-up Questions

1. How would you solve this using BFS with an explicit queue instead of
   recursive DFS — why might BFS be preferable for a very large grid?
2. How would you avoid mutating the input grid, and what's the space
   trade-off of using a separate visited structure instead?
3. How would you find the size of the *largest* island (Max Area of
   Island), reusing this same traversal structure?
4. How would this change if islands could also connect diagonally?

## Similar Questions

- Max Area of Island
- Surrounded Regions
- Number of Connected Components in an Undirected Graph

---
[← Back to Graph](README.md) · [← Back to 65-dsa](../README.md)
