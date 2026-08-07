# Q6570 · Serialize and Deserialize Binary Tree (Preorder BFS/DFS Framing)

**Difficulty:** Hard  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Binary Tree  
**Concepts:** binary-tree, serialization, dfs, bfs, design, recursion  

## Problem Statement

Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to **serialize** and **deserialize** a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

## Input

- `serialize(root)`: `TreeNode | null`
- `deserialize(data)`: `string`

## Output

- Reconstructed `TreeNode | null` identical to original tree

## Constraints

- The number of nodes in the tree is in the range `[0, 10^4]`.
- `-1000 <= Node.val <= 1000`

## Examples

| Input | Output | Why |
|---|---|---|
| `root = [1,2,3,null,null,4,5]` | `[1,2,3,null,null,4,5]` | Encodes to string `"1,2,N,N,3,4,N,N,5,N,N"`, decodes back |
| `root = []` | `[]` | Encodes to `"N"` |

## Edge Cases

- `root === null` -> encodes to `"N"`

## Hints

1. **Preorder DFS String Framing**:
   - `serialize`: Perform Preorder DFS traversal. Append node values separated by commas `,`. Represent null nodes with `'N'`.
2. **Deserialization Pointer**:
   - `deserialize`: Split string by `,` into array of values.
   - Maintain index pointer. Build tree recursively:
     - Shift next token `val = tokens.shift()`.
     - If `val === 'N'`, return `null`.
     - Create `node = new TreeNode(parseInt(val, 10))`.
     - `node.left = build()`.
     - `node.right = build()`.
     - Return `node`.

## Algorithm

**Pattern:** Preorder Null-Sentinel Structural Framing  
**Core Insight:** Explicitly recording `null` node terminals (`'N'`) during Preorder DFS traversal uniquely defines binary tree structure without requiring secondary Inorder arrays.

## Dry Run

`root = [1, 2, 3]`:
- `serialize`: `"1,2,N,N,3,N,N"`.
- `deserialize("1,2,N,N,3,N,N")`:
  - Token '1' -> Root 1.
  - Token '2' -> 1.left = Node 2.
  - Token 'N' -> 2.left = null. Token 'N' -> 2.right = null.
  - Token '3' -> 1.right = Node 3.
  - Token 'N' -> 3.left = null. Token 'N' -> 3.right = null.
- Return Root 1.

## JavaScript Solution

```js
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function serialize(root) {
  const result = [];

  function dfs(node) {
    if (node === null) {
      result.push('N');
      return;
    }
    result.push(node.val);
    dfs(node.left);
    dfs(node.right);
  }

  dfs(root);
  return result.join(',');
}

function deserialize(data) {
  const tokens = data.split(',');
  let i = 0;

  function build() {
    if (i >= tokens.length || tokens[i] === 'N') {
      i++;
      return null;
    }

    const node = new TreeNode(parseInt(tokens[i++], 10));
    node.left = build();
    node.right = build();

    return node;
  }

  return build();
}
```

## TypeScript Solution

```ts
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function serialize(root: TreeNode | null): string {
  const result: string[] = [];

  function dfs(node: TreeNode | null): void {
    if (node === null) {
      result.push('N');
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
  let i = 0;

  function build(): TreeNode | null {
    if (i >= tokens.length || tokens[i] === 'N') {
      i++;
      return null;
    }

    const node = new TreeNode(parseInt(tokens[i++], 10));
    node.left = build();
    node.right = build();

    return node;
  }

  return build();
}
```

## Time Complexity

`O(N)` — single linear pass during both serialization and deserialization.

## Space Complexity

`O(N)` — to store string tokens and recursive call stack.

## Common Mistakes

- Omitting `null` markers during serialization, making it impossible to reconstruct asymmetrical binary trees uniquely.

## Follow-Up Questions

1. How would you optimize string representation space using binary byte encoding instead of text CSV strings?

## Similar Questions

- Serialize and Deserialize BST
- Encode and Decode Strings
