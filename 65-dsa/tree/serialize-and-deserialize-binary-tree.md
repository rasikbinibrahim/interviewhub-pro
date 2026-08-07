# Q6657 · Serialize and Deserialize Binary Tree (Preorder DFS Serialization)

**Difficulty:** Hard
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple
**Interview Frequency:** ★★★★☆
**Category:** Tree
**Concepts:** binary-tree, serialization, dfs, string-parsing

## Problem Statement

Write a function `serialize(root)` that converts a binary tree into a
single string, and a complementary function `deserialize(data)` that
reconstructs the exact original tree structure from that string.

## Input

`serialize`: `root`, the root of a binary tree (`null` for an empty
tree). `deserialize`: `data`, a string previously produced by
`serialize`.

## Output

`serialize` returns a string encoding of the tree.
`deserialize` returns the root of a tree structurally identical to the
one originally serialized.

## Constraints

`0 <= number of nodes <= 10^4`, node values fit in a 32-bit integer

## Examples

| Input | Output | Why |
|---|---|---|
| `{"val":1,"left":null,"right":{"val":2,"left":null,"right":null}}` | `"1,null,2,null,null"` | Preorder: node, then left subtree, then right subtree |
| `null` | `"null"` | An empty tree serializes to a single `"null"` token |

## Edge Cases

- Empty tree (`root === null`) → serializes to `"null"`; deserializing
  `"null"` back produces `null`
- Single-node tree → serializes to `"<val>,null,null"`
- Skewed tree (every node has only a left or only a right child) → still
  round-trips correctly, since every `null` child is explicitly recorded
- Negative node values → handled correctly, since `parseInt` and
  `toString` both work the same way for negative numbers

## Hints

1. To reconstruct a tree exactly, the serialized format needs to
   preserve not just which values exist, but the *shape* of the tree —
   including where children are missing. What traversal order visits a
   node before its children, matching how you'd naturally rebuild a tree
   top-down?
2. A preorder traversal (node, then left subtree, then right subtree)
   that explicitly records a placeholder (like `"null"`) for every
   missing child gives deserialization enough information to know
   exactly when to stop recursing — no length prefixes or extra
   structure needed.
3. Deserialization mirrors serialization exactly: read one token: if
   it's the null placeholder, that subtree is empty; otherwise, it's a
   node's value — create the node, then recursively deserialize its left
   subtree, then its right, consuming tokens from a shared, moving index
   as you go.

## Algorithm

**Pattern:** preorder DFS serialization with explicit null markers.
**Core insight:** a tree's shape can be fully reconstructed from a
preorder sequence *only if* missing children are explicitly recorded —
without null markers, `"1,2"` would be ambiguous (is `2` the left or
right child of `1`?). Recording `"null"` for every missing child removes
that ambiguity: deserialization reads tokens in the same order they were
written, and because every subtree (empty or not) contributes exactly
one token or one node-plus-its-two-subtrees, the same shared, advancing
index correctly reconstructs the exact original shape.
**Invariant:** at any point during deserialization, `tokens[index]` is
always the next token that would have been produced by the
*corresponding* point in the original serialization's preorder walk —
guaranteed because both functions traverse in exactly the same order
(node, then left, then right).

## Dry Run

**Serializing:** the tree `1` with `left = null`, `right = 2` (`2` a
leaf)

| dfs call | pushes | result so far |
|---|---|---|
| `dfs(1)` | `"1"` | `["1"]` |
| `dfs(1.left = null)` | `"null"` | `["1","null"]` |
| `dfs(1.right = 2)` | `"2"` | `["1","null","2"]` |
| `dfs(2.left = null)` | `"null"` | `["1","null","2","null"]` |
| `dfs(2.right = null)` | `"null"` | `["1","null","2","null","null"]` |

**Result:** `"1,null,2,null,null"` — matches expected output.

**Deserializing** that same string reverses the process exactly: read
`"1"` → create node `1`; recursively read `"null"` → node `1`'s left is
`null`; recursively read `"2"` → create node `2` as node `1`'s right;
read `"null"`, `"null"` → node `2`'s left and right are both `null`.
Reconstructs the identical original tree shape.

## JavaScript Solution

```js
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function serialize(root) {
  const result = [];
  function dfs(node) {
    if (!node) {
      result.push('null');
      return;
    }
    result.push(node.val.toString());
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return result.join(',');
}

function deserialize(data) {
  const tokens = data.split(',');
  let index = 0;

  function dfs() {
    if (tokens[index] === 'null') {
      index++;
      return null;
    }
    const node = new TreeNode(parseInt(tokens[index++], 10));
    node.left = dfs();
    node.right = dfs();
    return node;
  }

  return dfs();
}
```

## TypeScript Solution

```ts
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function serialize(root: TreeNode | null): string {
  const result: string[] = [];
  function dfs(node: TreeNode | null): void {
    if (!node) {
      result.push('null');
      return;
    }
    result.push(node.val.toString());
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return result.join(',');
}

function deserialize(data: string): TreeNode | null {
  const tokens: string[] = data.split(',');
  let index = 0;

  function dfs(): TreeNode | null {
    if (tokens[index] === 'null') {
      index++;
      return null;
    }
    const node = new TreeNode(parseInt(tokens[index++], 10));
    node.left = dfs();
    node.right = dfs();
    return node;
  }

  return dfs();
}
```

## Time Complexity

O(n) for both `serialize` and `deserialize` — each visits every node (and
every `null` child marker) exactly once.

## Space Complexity

O(n) — the serialized string/token array holds one entry per node plus
one per `null` child (at most `2n + 1` tokens); recursion stack depth up
to O(H) for tree height H.

## Common Mistakes

- Using a level-order (BFS) serialization without carefully handling
  `null` markers at every level — also valid, but easy to get subtly
  wrong (e.g. omitting `null` markers for children of already-null
  nodes) compared to the more directly recursive preorder approach.
- Forgetting explicit `null` markers entirely — makes the serialized
  string ambiguous, since a bare sequence of values can't distinguish
  where one subtree ends and a sibling's begins.
- Using a global/module-level mutable index for `deserialize`'s token
  position instead of a properly scoped one (e.g. accidentally shared
  across separate `deserialize` calls) — this specific solution scopes
  `index` correctly inside each `deserialize` call via closure, but it's
  an easy mistake to introduce during a rewrite.

## Interview Follow-up Questions

1. How would you serialize using level-order (BFS) traversal instead of
   preorder DFS, and what changes in `deserialize` as a result?
2. How would you make the serialized format more compact — for example,
   omitting redundant `null` markers where the tree's shape is otherwise
   inferable?
3. How would this need to change to serialize an N-ary tree (nodes with
   an arbitrary number of children) instead of a strictly binary one?

## Similar Questions

- Validate Binary Search Tree (see [validate-binary-search-tree.md](validate-binary-search-tree.md))
- Kth Smallest Element in a BST (see [kth-smallest-element-in-a-bst.md](kth-smallest-element-in-a-bst.md))
