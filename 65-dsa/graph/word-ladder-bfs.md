# Q6556 · Word Ladder Shortest Transformation (Bidirectional BFS)

**Difficulty:** Hard  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Graph  
**Concepts:** graph, bfs, shortest-path, bidirectional-bfs, hash-set  

## Problem Statement

A **transformation sequence** from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:
- Every adjacent pair of words differs by exactly single letter.
- Every `si` for `1 <= i <= k` is in `wordList`. Note that `beginWord` does not need to be in `wordList`.
- `sk == endWord`

Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return the **number of words** in the **shortest transformation sequence** from `beginWord` to `endWord`, or `0` if no such sequence exists.

## Input

- `beginWord`: `string` — starting word
- `endWord`: `string` — target word
- `wordList`: `string[]` — list of valid dictionary words

## Output

- `number` — length of shortest transformation sequence, or `0` if impossible

## Constraints

- `1 <= beginWord.length <= 10`
- `endWord.length == beginWord.length`
- `1 <= wordList.length <= 5000`
- `wordList[i].length == beginWord.length`
- `beginWord`, `endWord`, and `wordList[i]` consist of lowercase English letters.
- `beginWord != endWord`
- All strings in `wordList` are **unique**.

## Examples

| Input | Output | Why |
|---|---|---|
| `beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]` | `5` | Shortest path `"hit" -> "hot" -> "dot" -> "dog" -> "cog"` (length 5) |
| `beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]` | `0` | `endWord` "cog" is not in `wordList` |

## Edge Cases

- `endWord` not in `wordList` -> returns `0`

## Hints

1. **BFS for Shortest Unweighted Path**: Unweighted graph shortest paths are solved using Breadth-First Search (BFS).
2. **Wildcard Character Intermediate Pattern**: Generate wildcard patterns for each word (e.g. `*ot`, `h*t`, `ho*`) to group one-letter transform neighbors into an adjacency list in $O(N \times L^2)$ time.
3. Queue stores `[currentWord, level]`. Maintain `visited` set to avoid infinite loops.

## Algorithm

**Pattern:** Pattern Adjacency Grouping BFS  
**Core Insight:** Pre-building wildcard string lookup patterns (e.g. `h*t`) allows instant $O(L \times 26)$ single-letter mutation checks during BFS expansion.

## Dry Run

`beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]`:
- Queue: `[("hit", 1)]`, `visited = {"hit"}`.
- Pop `"hit"`: Mutate letter 1 -> `"hot"`. Enqueue `("hot", 2)`.
- Pop `"hot"`: Mutates -> `"dot"`, `"lot"`. Enqueue `("dot", 3)`, `("lot", 3)`.
- Pop `"dot"`: Mutates -> `"dog"`. Enqueue `("dog", 4)`.
- Pop `"dog"`: Mutates -> `"cog"`. Match found! Return level 5 (`5`).

## JavaScript Solution

```js
function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  const queue = [[beginWord, 1]];
  const visited = new Set([beginWord]);

  const L = beginWord.length;

  while (queue.length > 0) {
    const [word, step] = queue.shift();

    if (word === endWord) return step;

    for (let i = 0; i < L; i++) {
      for (let c = 97; c <= 122; c++) { // 'a' to 'z'
        const char = String.fromCharCode(c);
        if (char === word[i]) continue;

        const nextWord = word.slice(0, i) + char + word.slice(i + 1);

        if (wordSet.has(nextWord) && !visited.has(nextWord)) {
          visited.add(nextWord);
          queue.push([nextWord, step + 1]);
        }
      }
    }
  }

  return 0;
}
```

## TypeScript Solution

```ts
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const wordSet = new Set<string>(wordList);
  if (!wordSet.has(endWord)) return 0;

  const queue: Array<[string, number]> = [[beginWord, 1]];
  const visited = new Set<string>([beginWord]);

  const L = beginWord.length;

  while (queue.length > 0) {
    const [word, step] = queue.shift()!;

    if (word === endWord) return step;

    for (let i = 0; i < L; i++) {
      for (let c = 97; c <= 122; c++) {
        const char = String.fromCharCode(c);
        if (char === word[i]) continue;

        const nextWord = word.slice(0, i) + char + word.slice(i + 1);

        if (wordSet.has(nextWord) && !visited.has(nextWord)) {
          visited.add(nextWord);
          queue.push([nextWord, step + 1]);
        }
      }
    }
  }

  return 0;
}
```

## Time Complexity

`O(N * L * 26)` — where $N$ is `wordList.length` and $L$ is `wordLength`.

## Space Complexity

`O(N * L)` — to store `wordSet`, `visited` set, and BFS Queue.

## Common Mistakes

- Using nested loops comparing string difference count for every pair ($O(N^2 \times L)$), causing TLE on large word lists.

## Follow-Up Questions

1. How would you solve Word Ladder II, which asks for all shortest path sequence arrays (`[["hit","hot","dot","dog","cog"]]`)?

## Similar Questions

- Word Ladder II
- Minimum Genetic Mutation
