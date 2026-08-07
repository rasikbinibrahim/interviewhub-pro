# Q6605 · Game of Life (In-Place Bit State Encoding)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Matrix  
**Concepts:** matrix, bit-manipulation, cellular-automata, in-place  

## Problem Statement

According to Wikipedia's article: "The **Game of Life**, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."

The board is made up of an `m x n` grid of cells, where each cell has an initial state: **live** (represented by a `1`) or **dead** (represented by a `0`). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules:

1. Any live cell with fewer than two live neighbors dies (underpopulation).
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies (overpopulation).
4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction).

Update the `board` **in-place** to its next state.

## Input

- `board`: `number[][]` — 2D binary grid

## Output

- Modifies `board` in-place (void return)

## Algorithm

**Pattern:** 2-Bit State Encoding In-Place Mutation  
**Core Insight:** Encode state transitions in 2 bits: `[NextState, CurrentState]`.
- `00` (0): Dead ➔ Dead
- `01` (1): Live ➔ Dead
- `10` (2): Dead ➔ Live
- `11` (3): Live ➔ Live

Read current state via `board[r][c] & 1`. Shift right `board[r][c] >>= 1` in final pass to update in-place.

```javascript
function gameOfLife(board) {
  const m = board.length;
  const n = board[0].length;

  const dirs = [
    [-1,-1],[-1,0],[-1,1],
    [0,-1],       [0,1],
    [1,-1], [1,0], [1,1]
  ];

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      let liveNeighbors = 0;

      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
          // Bitwise AND to check original state
          if ((board[nr][nc] & 1) === 1) {
            liveNeighbors++;
          }
        }
      }

      // Apply Conway's rules
      if ((board[r][c] & 1) === 1) {
        if (liveNeighbors === 2 || liveNeighbors === 3) {
          board[r][c] = 3; // 11 in binary: Live -> Live
        } // Otherwise stays 1 (01 in binary: Live -> Dead)
      } else {
        if (liveNeighbors === 3) {
          board[r][c] = 2; // 10 in binary: Dead -> Live
        }
      }
    }
  }

  // Pass 2: Shift bits to finalize next state
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      board[r][c] >>= 1;
    }
  }
}
```

## Time & Space Complexity

- **Time Complexity:** `O(M * N)` — two passes over $M \times N$ cells.
- **Space Complexity:** `O(1)` — constant extra space.
