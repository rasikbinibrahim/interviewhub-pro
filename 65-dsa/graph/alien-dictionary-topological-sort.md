# Q6572 · Alien Dictionary (Graph Construction & Topological Sort)

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Airbnb  
**Interview Frequency:** ★★★★★  
**Category:** Graph  
**Concepts:** graph, topological-sort, bfs, kahns-algorithm, string-ordering  

## Problem Statement

There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.

You are given a list of strings `words` from the alien language's dictionary, where the strings in `words` are **sorted lexicographically** by the rules of this new language.

Return a string of the unique letters in the new alien language sorted in **lexicographically increasing order** by the new language's rules. If there is no possible ordering, return `""`. If there are multiple valid orderings, return **any of them**.

## Input

- `words`: `string[]` — array of lexicographically sorted words

## Output

- `string` — ordering of unique characters, or `""` if invalid (cycle detected)

## Constraints

- `1 <= words.length <= 100`
- `1 <= words[i].length <= 100`
- `words[i]` consists of lowercase English letters.

## Examples

| Input | Output | Why |
|---|---|---|
| `words = ["wrt","wrf","er","ett","rftt"]` | `"wertf"` | Order: w -> e -> r -> t -> f |
| `words = ["z","x"]` | `"zx"` | Order: z -> x |
| `words = ["z","x","z"]` | `""` | Invalid ordering (cycle z -> x -> z) |

## Edge Cases

- Prefix order violation: `["abc", "ab"]` -> invalid dictionary (`"ab"` must come before `"abc"`), return `""`.

## Hints

1. **Build Directed Graph**:
   - Compare adjacent words `w1` and `w2`. Find the first character where `w1[j] !== w2[j]`.
   - Add directed edge `w1[j] -> w2[j]`. Increment `inDegree[w2[j]]`. Break inner comparison loop.
2. **Prefix Validation Check**:
   - If `w1.startsWith(w2)` AND `w1.length > w2.length`, dictionary is invalid! Return `""`.
3. **Kahn's BFS Topological Sort**:
   - Queue nodes with `inDegree[char] === 0`.
   - Dequeue, append to `result`, and decrement neighbor in-degrees.
4. Return `result.length === uniqueChars.size ? result.join('') : ""`.

## Algorithm

**Pattern:** First-Difference Graph Construction + Kahn's Topological Sort  
**Core Insight:** Comparing adjacent sorted words isolates pairwise character ordering rules, transforming alien alphabet deduction into a Directed Acyclic Graph (DAG) topological sort.

## Dry Run

`words = ["wrt", "wrf", "er", "ett", "rftt"]`:
- `wrt` vs `wrf`: 't' -> 'f' (edge `t -> f`).
- `wrf` vs `er`: 'w' -> 'e' (edge `w -> e`).
- `er` vs `ett`: 'r' -> 't' (edge `r -> t`).
- `ett` vs `rftt`: 'e' -> 'r' (edge `e -> r`).
- Edges: `w -> e -> r -> t -> f`. Topological sort output: `"wertf"`.

## JavaScript Solution

```js
function alienOrder(words) {
  const adj = new Map();
  const inDegree = new Map();

  // Initialize all unique characters
  for (const word of words) {
    for (const char of word) {
      if (!adj.has(char)) {
        adj.set(char, new Set());
        inDegree.set(char, 0);
      }
    }
  }

  // Build Graph Edges
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i];
    const w2 = words[i + 1];

    // Invalid prefix order check (e.g. "abc" before "ab")
    if (w1.length > w2.length && w1.startsWith(w2)) {
      return "";
    }

    const minLen = Math.min(w1.length, w2.length);
    for (let j = 0; j < minLen; j++) {
      if (w1[j] !== w2[j]) {
        if (!adj.get(w1[j]).has(w2[j])) {
          adj.get(w1[j]).add(w2[j]);
          inDegree.set(w2[j], inDegree.get(w2[j]) + 1);
        }
        break; // Only first differing character defines order!
      }
    }
  }

  // Kahn's BFS Topological Sort
  const queue = [];
  for (const [char, count] of inDegree.entries()) {
    if (count === 0) {
      queue.push(char);
    }
  }

  const result = [];
  while (queue.length > 0) {
    const curr = queue.shift();
    result.push(curr);

    for (const neighbor of adj.get(curr)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  return result.length === inDegree.size ? result.join('') : "";
}
```

## TypeScript Solution

```ts
function alienOrder(words: string[]): string {
  const adj = new Map<string, Set<string>>();
  const inDegree = new Map<string, number>();

  for (const word of words) {
    for (const char of word) {
      if (!adj.has(char)) {
        adj.set(char, new Set<string>());
        inDegree.set(char, 0);
      }
    }
  }

  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i];
    const w2 = words[i + 1];

    if (w1.length > w2.length && w1.startsWith(w2)) {
      return "";
    }

    const minLen = Math.min(w1.length, w2.length);
    for (let j = 0; j < minLen; j++) {
      if (w1[j] !== w2[j]) {
        if (!adj.get(w1[j])!.has(w2[j])) {
          adj.get(w1[j])!.add(w2[j]);
          inDegree.set(w2[j], inDegree.get(w2[j])! + 1);
        }
        break;
      }
    }
  }

  const queue: string[] = [];
  for (const [char, count] of inDegree.entries()) {
    if (count === 0) {
      queue.push(char);
    }
  }

  const result: string[] = [];
  while (queue.length > 0) {
    const curr = queue.shift()!;
    result.push(curr);

    for (const neighbor of adj.get(curr)!) {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  return result.length === inDegree.size ? result.join('') : "";
}
```

## Time Complexity

`O(C)` — where $C$ is the total character count across all words.

## Space Complexity

`O(1)` — bounded by 26 English lowercase characters ($O(U + E) \le O(26 + 26^2)$).

## Common Mistakes

- Forgetting to check if `w1` is a longer prefix of `w2` (`"abc"` vs `"ab"`), which is invalid in any lexicographical dictionary.

## Follow-Up Questions

1. How would you solve Course Schedule II using identical topological sorting logic?

## Similar Questions

- Course Schedule II
- Verifying an Alien Dictionary
