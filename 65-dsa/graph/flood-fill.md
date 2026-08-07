# Q1304 · Flood Fill

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, Google
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Graph
**Concepts:** grid traversal as implicit graph, DFS, connected-region recoloring

## Problem Statement

Given an `m x n` grid of integers `image` representing pixel colors, a
starting pixel `(sr, sc)`, and a new color `color`, perform a flood
fill: change the color of the starting pixel and every pixel connected
to it (via up/down/left/right adjacency) that shares the *starting
pixel's original color* to `color`. Return the modified grid.

## Input

- `image`: an `m x n` array of arrays of integers
- `sr`, `sc`: the starting row and column
- `color`: the new color to apply

## Output

The modified `image` grid, with the connected region repainted.

## Constraints

- `1 <= image.length, image[0].length <= 50`
- `0 <= image[i][j], color <= 65535`
- `0 <= sr < image.length`, `0 <= sc < image[0].length`

## Examples

| Input | Output | Why |
|---|---|---|
| `image=[[1,1,1],[1,1,0],[1,0,1]], sr=1, sc=1, color=2` | `[[2,2,2],[2,2,0],[2,0,1]]` | All pixels connected to (1,1) sharing its original color 1 become 2 |
| `image=[[0,0,0],[0,0,0]], sr=0, sc=0, color=0` | `[[0,0,0],[0,0,0]]` | New color matches the starting pixel's existing color — nothing visibly changes |

## Edge Cases

- New color equals the starting pixel's original color → must not
  recolor (and critically must not recurse infinitely re-visiting the
  same-colored region if not handled correctly)
- Starting pixel is completely isolated (all neighbors are a different
  color) → only that single pixel changes
- Entire grid is one connected color → the whole grid gets repainted

## Hints

1. Treat the grid as an implicit graph, where each cell is a node
   connected to its up/down/left/right neighbors — what traversal
   explores an entire connected region from a starting point?
2. A depth-first search starting at `(sr, sc)`, only continuing into
   neighbors that share the *original* starting color, naturally covers
   exactly the connected region that needs repainting.
3. Before doing anything else, check whether the new color already
   equals the pixel's current color — if so, return immediately without
   any recoloring or recursion. Without this check, if you recolor a
   pixel and then check "does this neighbor still match the original
   color?" against the *now-changed* color, the DFS can never terminate
   when old and new colors are the same.

## Algorithm

**Pattern:** grid DFS treated as an implicit graph, recoloring a
connected region in place.
**Core insight:** the grid is an implicit graph where adjacency is
defined by shared edges (up/down/left/right), and "connected pixels of
the same original color" is exactly a connected component in that
graph. A DFS starting from `(sr, sc)`, which only continues into a
neighbor if that neighbor's *current* color still matches the
*original* starting color (captured before any recoloring begins),
correctly visits and repaints the whole component exactly once. The
critical edge case — new color equals old color — must be checked
before starting the DFS at all, since otherwise the "does this neighbor
match the original color" check would always be trivially true after
the first recolor, and the DFS would never terminate.
**Invariant:** every pixel that gets recolored is connected to `(sr,
sc)` via a path of pixels that all originally shared the same color as
the starting pixel — and every such pixel is eventually visited exactly
once.

## Dry Run

**Input:** `image = [[1,1,1],[1,1,0],[1,0,1]]`, `sr=1, sc=1, color=2`

Original color at `(1,1)` is `1`. `color (2) !== originalColor (1)`, so
proceed.

| Step | Pixel visited | Original color match? | Action |
|---|---|---|---|
| 1 | `(1,1)` | — (start) | recolor to 2, recurse into 4 neighbors |
| 2 | `(0,1)` | `1 === 1` | recolor to 2, recurse |
| 3 | `(0,0)` (via (0,1)) | `1 === 1` | recolor to 2, recurse |
| 4 | `(0,2)` (via (0,1)) | `1 === 1` | recolor to 2, recurse |
| 5 | `(1,0)` (via (1,1) or (0,0)) | `1 === 1` | recolor to 2 |
| 6 | `(2,1)` | `0 !== 1` | skip, different color |
| 7 | `(1,2)` | `0 !== 1` | skip, different color |

**Result:** `[[2,2,2],[2,2,0],[2,0,1]]` — matches expected output; the
connected region of `1`s reachable from `(1,1)` is repainted, the `0`s
and the isolated `1` at `(2,2)` are untouched.

## JavaScript Solution

```js
function floodFill(image, sr, sc, color) {
  const originalColor = image[sr][sc];

  // Critical guard: without this, if color === originalColor, the DFS
  // below would never terminate (every visited pixel still "matches").
  if (originalColor === color) return image;

  const rows = image.length;
  const cols = image[0].length;

  function fill(row, col) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) return;
    if (image[row][col] !== originalColor) return;

    image[row][col] = color;

    fill(row + 1, col);
    fill(row - 1, col);
    fill(row, col + 1);
    fill(row, col - 1);
  }

  fill(sr, sc);
  return image;
}
```

## TypeScript Solution

```ts
function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
  const originalColor = image[sr]![sc]!;

  if (originalColor === color) return image;

  const rows = image.length;
  const cols = image[0]!.length;

  function fill(row: number, col: number): void {
    if (row < 0 || row >= rows || col < 0 || col >= cols) return;
    if (image[row]![col] !== originalColor) return;

    image[row]![col] = color;

    fill(row + 1, col);
    fill(row - 1, col);
    fill(row, col + 1);
    fill(row, col - 1);
  }

  fill(sr, sc);
  return image;
}
```

## Time Complexity

O(m * n) — in the worst case (the entire grid is one connected region),
every pixel is visited exactly once.

## Space Complexity

O(m * n) — the recursion call stack in the worst case (a snake-like
connected region visiting every cell).

## Common Mistakes

- Forgetting the `originalColor === color` guard — causes infinite
  recursion whenever the new color matches the existing one, since every
  neighbor still "matches" after being (no-op) recolored.
- Capturing `originalColor` *after* starting to recolor pixels, or
  re-reading `image[sr][sc]` mid-traversal instead of caching it once
  upfront — since the starting pixel itself gets overwritten, later
  comparisons would be against the *new* color instead of the original
  one.
- Missing boundary checks before accessing `image[row][col]` — reading
  out of bounds either throws or (in JS) silently returns `undefined`,
  which would never equal `originalColor` but wastes a recursive call
  reaching that point.

## Interview Follow-up Questions

1. How would you solve this iteratively with an explicit stack or queue
   (BFS) instead of recursion, to avoid deep call stacks on very large
   grids?
2. How does this relate to Number of Islands — what's the same, and
   what's different, about the traversal? (See [number-of-islands.md](number-of-islands.md).)
3. How would you support 8-directional adjacency (including diagonals)
   instead of just 4?

## Similar Questions

- Number of Islands (see [number-of-islands.md](number-of-islands.md))
- Course Schedule (see [course-schedule.md](course-schedule.md))
- Surrounded Regions

---
[← Back to Graph](README.md) · [← Back to 65-dsa](../README.md)
