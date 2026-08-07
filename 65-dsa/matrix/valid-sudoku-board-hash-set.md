# Q6584 · Valid Sudoku (Hash Set Grid Validation)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Matrix  
**Concepts:** matrix, hash-set, grid-validation, string-encoding  

## Problem Statement

Determine if a `9 x 9` Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

1. Each row must contain the digits `1-9` without repetition.
2. Each column must contain the digits `1-9` without repetition.
3. Each of the nine `3 x 3` sub-boxes of the grid must contain the digits `1-9` without repetition.

Note:
- A Sudoku board (partially filled) could be valid, but is not necessarily solvable.
- Only the filled cells need to be validated according to the mentioned rules.

## Input

- `board`: `string[][]` — 9x9 2D grid containing digits `'1'-'9'` or empty dots `'.'`

## Output

- `boolean` — `true` if board rules are respected, `false` otherwise

## Constraints

- `board.length == 9`
- `board[i].length == 9`
- `board[i][j]` is a digit `'1'-'9'` or `'.'`.

## Examples

| Input | Output | Why |
|---|---|---|
| `board` with unique digits in all rows, cols, and 3x3 boxes | `true` | All Sudoku rules satisfied |
| `board` with duplicate `'8'` in first column | `false` | Column 0 contains two `'8'`s |

## Edge Cases

- Empty board filled with `'.'` -> returns `true`

## Hints

1. **Hash Set Encoding Technique**:
   - Single pass over $9 \times 9$ grid.
   - For cell `(r, c)` containing char `val`:
     - Calculate 3x3 sub-box index `boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3)`.
     - Encode string markers:
       - Row marker: `r_${r}_${val}`
       - Col marker: `c_${c}_${val}`
       - Box marker: `b_${boxIndex}_${val}`
   - If any marker already exists in `seen` Set, **return `false` immediately!**

## Algorithm

**Pattern:** String-Encoded Single Pass Hash Set Check  
**Core Insight:** Constructing unique string keys for row, column, and $3 \times 3$ box memberships allows single-pass $O(1)$ duplicate detection without multiple nested loop passes.

## Dry Run

`board` cell `(0, 7) = '8'`:
- `boxIndex = Math.floor(0/3)*3 + Math.floor(7/3) = 0 + 2 = 2`.
- Check Set for `"r_0_8"`, `"c_7_8"`, `"b_2_8"`. None found -> Add all 3 to `seen`.
- Later at `(3, 7) = '8'`: `"c_7_8"` exists in Set -> Return `false`!

## JavaScript Solution

```js
function isValidSudoku(board) {
  const seen = new Set();

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val === '.') continue;

      const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);

      const rowKey = `r_${r}_${val}`;
      const colKey = `c_${c}_${val}`;
      const boxKey = `b_${boxIndex}_${val}`;

      if (seen.has(rowKey) || seen.has(colKey) || seen.has(boxKey)) {
        return false;
      }

      seen.add(rowKey);
      seen.add(colKey);
      seen.add(boxKey);
    }
  }

  return true;
}
```

## TypeScript Solution

```ts
function isValidSudoku(board: string[][]): boolean {
  const seen = new Set<string>();

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val === '.') continue;

      const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);

      const rowKey = `r_${r}_${val}`;
      const colKey = `c_${c}_${val}`;
      const boxKey = `b_${boxIndex}_${val}`;

      if (seen.has(rowKey) || seen.has(colKey) || seen.has(boxKey)) {
        return false;
      }

      seen.add(rowKey);
      seen.add(colKey);
      seen.add(boxKey);
    }
  }

  return true;
}
```

## Time Complexity

`O(1)` — fixed $9 \times 9 = 81$ cells.

## Space Complexity

`O(1)` — maximum 243 string keys in Hash Set.

## Common Mistakes

- Incorrect $3 \times 3$ box index calculation `Math.floor(r/3) + Math.floor(c/3)`, which causes sub-box index overlap collisions across different grid rows.

## Follow-Up Questions

1. How would you solve Sudoku Solver to fill all empty cells with valid numbers using Backtracking?

## Similar Questions

- Sudoku Solver
- Valid Tic-Tac-Toe State
