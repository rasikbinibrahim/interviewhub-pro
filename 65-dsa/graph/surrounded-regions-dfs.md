# Q6592 · Surrounded Regions (Boundary Connected Graph DFS/BFS)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Graph  
**Concepts:** graph, dfs, bfs, matrix, boundary-flood-fill  

## Problem Statement

Given an `m x n` matrix `board` containing `'X'` and `'O'`, **capture all regions that are 4-directionally surrounded by `'X'`**.

A region is captured by flipping all `'O'`s into `'X'`s in that surrounded region.

Note:
- An `'O'` cell is on the **border** of the matrix if it is in the first row, last row, first column, or last column.
- Any `'O'` connected to a border `'O'` **cannot be surrounded** and will **never be flipped** into `'X'`.

## Input

- `board`: `string[][]` — 2D matrix of `'X'` and `'O'` characters

## Output

- Modifies `board` in-place (void return)

## Constraints

- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 200`
- `board[i][j]` is `'X'` or `'O'`.

## Examples

| Input | Output | Why |
|---|---|---|
| `board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]` | `[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]` | Inner `'O'`s captured; bottom `'O'` at border is preserved |
| `board = [["X"]]` | `[["X"]]` | 1x1 grid |

## Edge Cases

- Board with no border `'O'`s -> all inner `'O'`s are captured!

## Hints

1. **Reverse Boundary Flood-Fill Strategy**:
   - Any `'O'` connected to a border `'O'` CANNOT be captured.
   - Step 1: Traverse all 4 borders (top, bottom, left, right).
   - If `board[r][c] === 'O'`, launch DFS/BFS to mark it and all connected `'O'`s with a temporary sentinel `'E'` (Escaped/Uncaptured).
2. Step 2: Iterate full grid:
   - If `board[r][c] === 'O'`, flip to `'X'` (Captured!).
   - If `board[r][c] === 'E'`, restore to `'O'` (Preserved border region!).

## Algorithm

**Pattern:** Boundary-Connected Sentinel Flood-Fill  
**Core Insight:** Starting DFS flood-fill from border `'O'` nodes temporarily renames un-capturable regions to `'E'`, leaving true surrounded inner regions exposed for single-pass replacement.

## Dry Run

`board = [["X","X","X"],["X","O","X"],["X","X","X"]]`:
- Border check: No border `'O'`s exist.
- Grid pass: Inner `(1, 1) ('O')` is surrounded -> flipped to `'X'`.
- Result: `[["X","X","X"],["X","X","X"],["X","X","X"]]`.

## JavaScript Solution

```js
function solve(board) {
  const m = board.length;
  const n = board[0].length;

  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== 'O') {
      return;
    }

    board[r][c] = 'E'; // Mark as Escaped/Uncaptured

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  // 1. Mark border-connected 'O's with 'E'
  for (let c = 0; c < n; c++) {
    dfs(0, c);        // Top border
    dfs(m - 1, c);    // Bottom border
  }

  for (let r = 0; r < m; r++) {
    dfs(r, 0);        // Left border
    dfs(r, n - 1);    // Right border
  }

  // 2. Flip surrounded 'O's to 'X', restore 'E's back to 'O'
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === 'O') {
        board[r][c] = 'X';
      } else if (board[r][c] === 'E') {
        board[r][c] = 'O';
      }
    }
  }
}
```

## TypeScript Solution

```ts
function solve(board: string[][]): void {
  const m = board.length;
  const n = board[0].length;

  function dfs(r: number, c: number): void {
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== 'O') {
      return;
    }

    board[r][c] = 'E';

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let c = 0; c < n; c++) {
    dfs(0, c);
    dfs(m - 1, c);
  }

  for (let r = 0; r < m; r++) {
    dfs(r, 0);
    dfs(r, n - 1);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === 'O') {
        board[r][c] = 'X';
      } else if (board[r][c] === 'E') {
        board[r][c] = 'O';
      }
    }
  }
}
```

## Time Complexity

`O(M * N)` — constant number of passes over $M \times N$ cells.

## Space Complexity

`O(M * N)` — call stack space in worst-case grid flood-fill.

## Common Mistakes

- Initiating DFS from inner `'O'` cells forward, requiring complex tracking of whether any branch reaches a border before deciding to flip.

## Follow-Up Questions

1. How does Pacific Atlantic Water Flow compare in reverse shoreline boundary traversal logic?

## Similar Questions

- Number of Islands
- Pacific Atlantic Water Flow
