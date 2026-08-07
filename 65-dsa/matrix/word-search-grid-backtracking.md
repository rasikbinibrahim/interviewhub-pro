# Q6621 · Word Search (2D Board Backtracking)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Matrix  
**Concepts:** matrix, backtracking, dfs, recursion  

## Problem Statement

Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

## Algorithm

**Pattern:** 2D In-Place Cell Marking DFS Backtracking  

```javascript
function exist(board, word) {
  const m = board.length;
  const n = board[0].length;

  function dfs(r, c, idx) {
    if (idx === word.length) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[idx]) {
      return false;
    }

    const temp = board[r][c];
    board[r][c] = '#'; // Mark visited in-place

    const found =
      dfs(r + 1, c, idx + 1) ||
      dfs(r - 1, c, idx + 1) ||
      dfs(r, c + 1, idx + 1) ||
      dfs(r, c - 1, idx + 1);

    board[r][c] = temp; // Backtrack
    return found;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }

  return false;
}
```

## Time & Space Complexity

- **Time Complexity:** `O(M \cdot N \cdot 3^L)` where $L = \text{word.length}$.
- **Space Complexity:** `O(L)` call stack depth space.
