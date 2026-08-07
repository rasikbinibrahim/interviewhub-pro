# Q6615 · Path Sum III (Prefix Sum Hash Map Binary Tree DFS)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft  
**Interview Frequency:** ★★★★★  
**Category:** Binary Tree  
**Concepts:** binary-tree, dfs, prefix-sum, hash-map  

## Problem Statement

Given the `root` of a binary tree and an integer `targetSum`, return the number of paths where the sum of the values along the path equals `targetSum`.

The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).

## Algorithm

**Pattern:** Prefix Sum Map Subtree Backtracking  
Maintain Hash Map storing prefix sum frequencies along current root-to-leaf path. If `prefixSum - targetSum` exists in map, add its frequency to total count.

```javascript
function pathSum(root, targetSum) {
  const prefixMap = new Map();
  prefixMap.set(0, 1); // Base case: 1 path with sum 0

  function dfs(node, currSum) {
    if (node === null) return 0;

    currSum += node.val;
    let count = prefixMap.get(currSum - targetSum) || 0;

    prefixMap.set(currSum, (prefixMap.get(currSum) || 0) + 1);

    count += dfs(node.left, currSum);
    count += dfs(node.right, currSum);

    // Backtrack prefix map for parallel branches
    prefixMap.set(currSum, prefixMap.get(currSum) - 1);

    return count;
  }

  return dfs(root, 0);
}
```

## Time & Space Complexity

- **Time Complexity:** `O(N)` — single linear pass through tree.
- **Space Complexity:** `O(H)` — map and stack space.
