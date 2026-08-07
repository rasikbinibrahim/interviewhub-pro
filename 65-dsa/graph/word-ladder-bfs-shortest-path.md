# Q6654 · Word Ladder I (Shortest Transformation Sequence via BFS)

**Difficulty:** Hard
**Companies Asked:** Amazon, Meta, Google, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Graph
**Concepts:** graph, bfs, shortest-path, string-transformation

## Problem Statement

Write a function `ladderLength(beginWord, endWord, wordList)` that
returns the number of words in the shortest transformation sequence from
`beginWord` to `endWord`, where each step changes exactly one letter and
every intermediate word must exist in `wordList`. Return `0` if no such
sequence exists.

## Input

`beginWord`, `endWord`: strings of equal length. `wordList`: an array of
candidate words (all the same length as `beginWord`).

## Output

The number of words in the shortest valid transformation sequence
(counting both `beginWord` and `endWord`), or `0` if `endWord` is
unreachable.

## Constraints

`1 <= beginWord.length <= 10`, `1 <= wordList.length <= 5000`, all words
consist of lowercase English letters and are the same length

## Examples

| Input | Output | Why |
|---|---|---|
| `beginWord="hit", endWord="cog", wordList=["hot","dot","dog","lot","log","cog"]` | `5` | `hit→hot→dot→dog→cog` uses 5 words |
| `beginWord="hit", endWord="cog", wordList=["hot","dot","dog","lot","log"]` | `0` | `endWord` ("cog") isn't in `wordList`, so it can never be reached |
| `beginWord="a", endWord="c", wordList=["a","b","c"]` | `2` | `a→c` — a single-letter word changes directly in one step |

## Edge Cases

- `endWord` not present in `wordList` → `0` immediately, since it can
  never be reached regardless of any path
- `beginWord` already equals `endWord` — not a case this problem's
  constraints produce, but worth noting the BFS would trivially return
  `1` at the very first dequeue if it did
- No valid transformation path exists at all (words too dissimilar) →
  `0`, once the BFS exhausts every reachable word without finding
  `endWord`
- Multiple equally-short paths exist → any one of them is fine, since
  only the *length* of the shortest path is returned, not the path
  itself

## Hints

1. Each word is a "node," and an edge connects two words that differ by
   exactly one letter — finding the *shortest* transformation sequence
   is then just finding the shortest path in that graph. What classic
   traversal finds shortest paths in an unweighted graph?
2. Rather than precomputing every single-letter-different pair (which is
   expensive for a large word list), generate all possible one-letter
   variations of the *current* word directly (26 choices at each of its
   positions) and check whether each variation exists in the word set —
   this is usually cheaper than comparing against every other word.
3. Remove a word from the candidate set the moment it's discovered
   (enqueued) — this both prevents revisiting it later (which BFS
   correctness for shortest paths depends on) and keeps the search
   efficient as the candidate set shrinks.

## Algorithm

**Pattern:** breadth-first search over an implicit graph of one-letter
word transformations.
**Core insight:** because BFS explores nodes in increasing order of
distance from the start, the first time `endWord` is dequeued, the
"level" it was enqueued with is guaranteed to be the shortest possible
transformation-sequence length — no shorter path could exist, since BFS
would have found it first. Rather than building the transformation graph
explicitly upfront, each word's neighbors are generated on the fly by
trying every possible single-letter substitution at every position and
checking membership in the (shrinking) set of remaining candidate words.
**Invariant:** whenever a word is enqueued with a given `level`, that
level is guaranteed to be the shortest number of transformation steps
(including the starting word) needed to reach it from `beginWord` — this
holds because BFS processes words in strictly non-decreasing level
order, and a word is only ever enqueued (and immediately removed from
the candidate set) the first time it's reached.

## Dry Run

**Input:** `beginWord="hit", endWord="cog", wordList=["hot","dot","dog","lot","log","cog"]`

| Dequeued (word, level) | one-letter variations found in set | newly enqueued |
|---|---|---|
| `("hit", 1)` | `"hot"` (position 1: i→o) | `("hot", 2)` |
| `("hot", 2)` | `"dot"`, `"lot"` (position 0: h→d, h→l) | `("dot", 3)`, `("lot", 3)` |
| `("dot", 3)` | `"dog"` (position 2: t→g) | `("dog", 4)` |
| `("lot", 3)` | `"log"` (position 2: t→g) | `("log", 4)` |
| `("dog", 4)` | `"cog"` (position 0: d→c) | `("cog", 5)` |
| `("log", 4)` | (`"cog"` already removed from the set) | — |
| `("cog", 5)` | `word === endWord` | **return `5`** |

**Result:** `5` — matches expected output.

## JavaScript Solution

```js
function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  const queue = [[beginWord, 1]];

  while (queue.length > 0) {
    const [word, level] = queue.shift();
    if (word === endWord) return level;

    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const nextWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (wordSet.has(nextWord)) {
          wordSet.delete(nextWord);
          queue.push([nextWord, level + 1]);
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

  const queue: [string, number][] = [[beginWord, 1]];

  while (queue.length > 0) {
    const [word, level] = queue.shift()!;
    if (word === endWord) return level;

    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const nextWord: string = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (wordSet.has(nextWord)) {
          wordSet.delete(nextWord);
          queue.push([nextWord, level + 1]);
        }
      }
    }
  }

  return 0;
}
```

## Time Complexity

O(N × L × 26), where N is the word list size and L is the word length —
each dequeued word generates `L × 26` candidate variations, each checked
against the set in O(L) (for the set lookup's string hashing/comparison),
and each real word is dequeued at most once.

## Space Complexity

O(N × L) — the word set and queue, each holding up to N words of length
L.

## Common Mistakes

- Precomputing an explicit adjacency list by comparing every pair of
  words in `wordList` — O(N² × L), far more expensive than generating
  variations on the fly, especially for large word lists.
- Forgetting to remove a word from `wordSet` immediately upon
  enqueueing it — without this, the same word can be enqueued multiple
  times via different paths, breaking the shortest-path guarantee (or at
  minimum wasting significant work re-exploring it).
- Checking `word === endWord` only *after* generating variations instead
  of immediately upon dequeue — functionally still correct here since
  the check happens before any variation work, but structuring it after
  would do unnecessary work before recognizing the goal has already been
  reached.

## Interview Follow-up Questions

1. How would you adapt this to return the *actual* shortest
   transformation sequence(s), not just its length (Word Ladder II)?
2. How would bidirectional BFS (searching simultaneously from both
   `beginWord` and `endWord`) improve performance, and why does it help?
3. How would the algorithm need to change if word lengths in `wordList`
   could vary (currently all words are guaranteed the same length)?

## Similar Questions

- Course Schedule I (Cycle Detection) (see [course-schedule-cycle-detection.md](course-schedule-cycle-detection.md))
- Cheapest Flights Within K Stops (see [cheapest-flights-k-stops.md](cheapest-flights-k-stops.md))
