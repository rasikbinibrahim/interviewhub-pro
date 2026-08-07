# Q6571 · Word Search II (Trie & 2D Grid Backtracking)

**Difficulty:** Hard  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Trie  
**Concepts:** trie, backtracking, dfs, matrix, grid-search  

## Problem Statement

Given an `m x n` `board` of characters and a list of strings `words`, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may **not be used more than once** in a word.

## Input

- `board`: `string[][]` — 2D character grid
- `words`: `string[]` — array of search words

## Output

- `string[]` — list of unique words present in grid

## Constraints

- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 12`
- `1 <= words.length <= 3 * 10^4`
- `1 <= words[i].length <= 10`
- `board` and `words[i]` consist of lowercase English letters.
- All strings in `words` are **unique**.

## Examples

| Input | Output | Why |
|---|---|---|
| `board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]` | `["eat","oath"]` | Words `"eat"` and `"oath"` exist in grid |
| `board = [["a","b"],["c","d"]], words = ["abcb"]` | `[]` | Cell 'b' cannot be reused |

## Edge Cases

- No words match -> returns `[]`
- Multiple words sharing common prefixes -> Trie handles prefix sharing automatically!

## Hints

1. **Prefix Tree (Trie) Optimization**:
   - Insert all target `words` into a Trie. Store `word` string directly at terminal Trie leaf nodes (`node.word = word`).
2. Iterate through every grid cell `(r, c)`. If `trieRoot.children[board[r][c]]` exists, launch `dfs(r, c, trieRoot.children[board[r][c]])`.
3. `dfs(r, c, currNode)`:
   - If `currNode.word` exists: push `currNode.word` into `result`, and set `currNode.word = null` (prevents duplicate entries).
   - Mark grid cell visited in-place `board[r][c] = '#'`.
   - Explore 4 directions `(r+1, c)`, `(r-1, c)`, `(r, c+1)`, `(r, c-1)`.
   - Backtrack `board[r][c] = temp`.

## Algorithm

**Pattern:** Trie-Guided Grid Backtracking  
**Core Insight:** Walking a Trie simultaneously with grid DFS prunes invalid prefix branches immediately, reducing $K$ separate Word Search calls to a single unified grid traversal.

## Dry Run

`board = [["o","a"],["e","t"]], words = ["oath"]`:
- Build Trie: `o -> a -> t -> h (word = "oath")`.
- Start grid `(0, 0) ('o')`: child `'o'` exists in Trie!
- Move `(0, 1) ('a')`: child `'a'` exists!
- Move `(1, 1) ('t')`: child `'t'` exists!
- Move down/right: no `'h'` neighbor -> Backtrack cleanly.

## JavaScript Solution

```js
class TrieNode {
  constructor() {
    this.children = {};
    this.word = null;
  }
}

function findWords(board, words) {
  // Step 1: Build Trie
  const root = new TrieNode();
  for (const word of words) {
    let curr = root;
    for (const char of word) {
      if (!curr.children[char]) {
        curr.children[char] = new TrieNode();
      }
      curr = curr.children[char];
    }
    curr.word = word;
  }

  const m = board.length;
  const n = board[0].length;
  const result = [];

  // Step 2: DFS Grid Traversal
  function dfs(r, c, node) {
    if (node.word) {
      result.push(node.word);
      node.word = null; // Prevent duplicate additions
    }

    if (r < 0 || r >= m || c < 0 || c >= n) return;

    const char = board[r][c];
    if (char === '#' || !node.children[char]) return;

    // Mark visited in-place
    board[r][c] = '#';

    const nextNode = node.children[char];
    dfs(r + 1, c, nextNode);
    dfs(r - 1, c, nextNode);
    dfs(r, c + 1, nextNode);
    dfs(r, c - 1, nextNode);

    // Backtrack
    board[r][c] = char;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (root.children[board[r][c]]) {
        dfs(r, c, root);
      }
    }
  }

  return result;
}
```

## TypeScript Solution

```ts
class TrieNode {
  children: Record<string, TrieNode> = {};
  word: string | null = null;
}

function findWords(board: string[][], words: string[]): string[] {
  const root = new TrieNode();
  for (const word of words) {
    let curr = root;
    for (const char of word) {
      if (!curr.children[char]) {
        curr.children[char] = new TrieNode();
      }
      curr = curr.children[char];
    }
    curr.word = word;
  }

  const m = board.length;
  const n = board[0].length;
  const result: string[] = [];

  function dfs(r: number, c: number, node: TrieNode): void {
    if (node.word) {
      result.push(node.word);
      node.word = null;
    }

    if (r < 0 || r >= m || c < 0 || c >= n) return;

    const char = board[r][c];
    if (char === '#' || !node.children[char]) return;

    board[r][c] = '#';

    const nextNode = node.children[char];
    dfs(r + 1, c, nextNode);
    dfs(r - 1, c, nextNode);
    dfs(r, c + 1, nextNode);
    dfs(r, c - 1, nextNode);

    board[r][c] = char;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (root.children[board[r][c]]) {
        dfs(r, c, root);
      }
    }
  }

  return result;
}
```

## Time Complexity

`O(M * N * 3^L)` — where $M \times N$ is grid size and $L$ is max word length.

## Space Complexity

`O(W * L)` — to store Trie nodes for $W$ words of length $L$.

## Common Mistakes

- Running standard Word Search I individually for every word in `words` array ($W$ full grid traversals), causing TLE on $30,000$ words.

## Follow-Up Questions

1. How can you prune empty Trie nodes (`delete node.children[char]`) after a word is found to optimize performance further?

## Similar Questions

- Word Search I
- Implement Trie (Prefix Tree)
