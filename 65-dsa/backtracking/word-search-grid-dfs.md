# Q6561 · Word Search (2D Board DFS Backtracking)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Bloomberg  
**Interview Frequency:** ★★★★★  
**Category:** Backtracking  
**Concepts:** backtracking, dfs, matrix, grid-search  

## Problem Statement

Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may **not be used more than once**.

## Input

- `board`: `string[][]` — 2D character grid
- `word`: `string` — search target string

## Output

- `boolean` — `true` if word is found, `false` otherwise

## Constraints

- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 6`
- `1 <= word.length <= 15`
- `board` and `word` consist of lowercase and uppercase English letters.

## Examples

| Input | Output | Why |
|---|---|---|
| `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"` | `true` | Sequential path A -> B -> C -> C -> E -> D exists |
| `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"` | `true` | S -> E -> E path exists |
| `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"` | `false` | Cell 'B' cannot be reused twice |

## Edge Cases

- Word length 1 `word = "A"` -> returns `true` if `'A'` exists
- Word longer than total grid cells -> returns `false`

## Hints

1. **2D Grid DFS Backtracking**:
   - Iterate over every cell `(r, c)` in the grid.
   - If `board[r][c] === word[0]`, initiate `dfs(r, c, 0)`.
2. `dfs(r, c, index)`:
   - Base Case: If `index === word.length`, return `true`.
   - Out of bounds or `board[r][c] !== word[index]`: return `false`.
3. Mark visited cell in-place: `temp = board[r][c]; board[r][c] = '#'`.
4. Recurse 4 directions: `(r+1, c)`, `(r-1, c)`, `(r, c+1)`, `(r, c-1)`.
5. Restore cell (Backtrack): `board[r][c] = temp`.

## Algorithm

**Pattern:** In-Place Cell Mutation Grid Backtracking  
**Core Insight:** Temporarily replacing visited grid characters with a sentinel symbol `'#'` prevents node reuse without allocating extra $O(M \times N)$ boolean visited matrices.

## Dry Run

`board = [["A","B"],["C","D"]], word = "ABDC"`:
- Start at `(0, 0) ('A')`: `index = 0`. Match! Mark `board[0][0] = '#'`.
- Recurse right `(0, 1) ('B')`: `index = 1`. Match! Mark `board[0][1] = '#'`.
- Recurse down `(1, 1) ('D')`: `index = 2`. Match! Mark `board[1][1] = '#'`.
- Recurse left `(1, 0) ('C')`: `index = 3`. `3 === word.length - 1`. Match! Return `true`.

## JavaScript Solution

```js
function exist(board, word) {
  const m = board.length;
  const n = board[0].length;

  function dfs(r, c, index) {
    if (index === word.length) return true;

    if (
      r < 0 || r >= m ||
      c < 0 || c >= n ||
      board[r][c] !== word[index]
    ) {
      return false;
    }

    // Step 1: Mark visited in-place
    const temp = board[r][c];
    board[r][c] = '#';

    // Step 2: Explore 4 directions
    const found =
      dfs(r + 1, c, index + 1) ||
      dfs(r - 1, c, index + 1) ||
      dfs(r, c + 1, index + 1) ||
      dfs(r, c - 1, index + 1);

    // Step 3: Backtrack (Restore original char)
    board[r][c] = temp;

    return found;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === word[0] && dfs(r, c, 0)) {
        return true;
      }
    }
  }

  return false;
}
```

## TypeScript Solution

```ts
function exist(board: string[][], word: string): boolean {
  const m = board.length;
  const n = board[0].length;

  function dfs(r: number, c: number, index: number): boolean {
    if (index === word.length) return true;

    if (
      r < 0 || r >= m ||
      c < 0 || c >= n ||
      board[r][c] !== word[index]
    ) {
      return false;
    }

    const temp = board[r][c];
    board[r][c] = '#';

    const found =
      dfs(r + 1, c, index + 1) ||
      dfs(r - 1, c, index + 1) ||
      dfs(r, c + 1, index + 1) ||
      dfs(r, c - 1, index + 1);

    board[r][c] = temp;

    return found;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === word[0] && dfs(r, c, 0)) {
        return true;
      }
    }
  }

  return false;
}
```

## Time Complexity

`O(M * N * 3^L)` — where $L = \text{word.length}$ (3 branch options per step since we don't go backwards).

## Space Complexity

`O(L)` — call stack depth for string length $L$.

## Common Mistakes

- Forgetting to restore `board[r][c] = temp` during the backtracking step, corrupting grid state for subsequent search paths.

## Follow-Up Questions

1. How would you solve Word Search II (searching for thousands of words simultaneously in a grid)? (Build a Trie prefix tree of words).

## Similar Questions

- Word Search II
- Number of Islands
