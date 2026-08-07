# Q6506 · Implement Trie (Prefix Tree)

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Meta, Microsoft, Twitter  
**Interview Frequency:** ★★★★★  
**Category:** Trie  
**Concepts:** trie, prefix-tree, data-structures, string-search  

## Problem Statement

A **Trie** (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellcheckers.

Implement the `Trie` class:
- `Trie()` Initializes the trie object.
- `void insert(String word)` Inserts the string `word` into the trie.
- `boolean search(String word)` Returns `true` if the string `word` is in the trie (i.e., was inserted before), and `false` otherwise.
- `boolean startsWith(String prefix)` Returns `true` if there is a previously inserted string `word` that has the prefix `prefix`, and `false` otherwise.

## Input

- Method calls: `insert(word)`, `search(word)`, `startsWith(prefix)`
- `word` and `prefix` consist only of lowercase English letters `a-z`.

## Output

- `search`: `boolean`
- `startsWith`: `boolean`

## Constraints

- `1 <= word.length, prefix.length <= 2000`
- At most `3 * 10^4` calls in total will be made to `insert`, `search`, and `startsWith`.

## Examples

```javascript
const trie = new Trie();
trie.insert("apple");
trie.search("apple");   // returns true
trie.search("app");     // returns false
trie.startsWith("app"); // returns true
trie.insert("app");
trie.search("app");     // returns true
```

## Edge Cases

- Searching for a prefix that equals a full word
- Searching for a word that is a prefix of an inserted word but wasn't explicitly inserted as a full word (`isEnd = false`)

## Hints

1. Represent each node in the Trie with a map/hash or fixed array of 26 children pointers (`children`) and a boolean flag `isEnd`.
2. To `insert(word)`: traverse character by character; if a child character doesn't exist, create a new TrieNode. Mark `isEnd = true` on the final character node.
3. To `search(word)`: traverse character by character. If any character node is missing, return `false`. Return `node.isEnd` at the end.
4. To `startsWith(prefix)`: traverse character by character. If all characters exist in path, return `true`.

## Algorithm

**Pattern:** Trie Node Traversal  
**Core Insight:** Shared prefixes share common ancestors in the tree hierarchy, yielding `O(L)` lookup and insertion time where `L` is string length, independent of total words stored.

## Dry Run

`insert("apple")`:
- Root -> `a` -> `p` -> `p` -> `l` -> `e` (set `isEnd = true` on `e`).
`search("app")`:
- Root -> `a` -> `p` -> `p` (node exists, but `isEnd === false`). Return `false`.
`startsWith("app")`:
- Root -> `a` -> `p` -> `p` (node exists). Return `true`.

## JavaScript Solution

```js
class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) {
        node.children[ch] = new TrieNode();
      }
      node = node.children[ch];
    }
    node.isEnd = true;
  }

  search(word) {
    const node = this._findNode(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix) {
    return this._findNode(prefix) !== null;
  }

  _findNode(str) {
    let node = this.root;
    for (const ch of str) {
      if (!node.children[ch]) {
        return null;
      }
      node = node.children[ch];
    }
    return node;
  }
}
```

## TypeScript Solution

```ts
class TrieNode {
  children: Record<string, TrieNode> = {};
  isEnd: boolean = false;
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) {
        node.children[ch] = new TrieNode();
      }
      node = node.children[ch];
    }
    node.isEnd = true;
  }

  search(word: string): boolean {
    const node = this._findNode(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix: string): boolean {
    return this._findNode(prefix) !== null;
  }

  private _findNode(str: string): TrieNode | null {
    let node = this.root;
    for (const ch of str) {
      if (!node.children[ch]) {
        return null;
      }
      node = node.children[ch];
    }
    return node;
  }
}
```

## Time Complexity

- `insert(word)`: `O(L)` where `L` is word length.
- `search(word)`: `O(L)`
- `startsWith(prefix)`: `O(P)` where `P` is prefix length.

## Space Complexity

`O(N * L)` in worst case for `N` words of length `L` with no shared prefixes.

## Common Mistakes

- Forgetting to mark `isEnd = true` on insertion, breaking exact word `search()`.
- Returning `true` in `search()` when a prefix matches, ignoring `isEnd`.

## Follow-Up Questions

1. How would you design a wildcard search in Trie matching `.` characters? (Word Search II / Depth First Search).

## Similar Questions

- Design Add and Search Words Data Structure
- Word Search II
