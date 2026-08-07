# T8302 · High-Frequency DSA Patterns Cheat Sheet: Two Pointers, Sliding Window, Fast/Slow, Subsets & Topological Sort

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Revision & Cheat Sheets  
**Concepts:** cheat-sheet, dsa-patterns, two-pointers, sliding-window, fast-slow-pointers, topological-sort  

## Quick Reference Summary

This cheat sheet summarizes the **Top 8 Core DSA Problem-Solving Patterns** that account for >80% of technical interview questions at FAANG and tier-1 tech companies.

---

## 1. Two Pointers Pattern

- **When to Use**: Sorted arrays, pair sums, palindrome verification, reversing data in-place.
- **Key Mechanics**: Place `left = 0` and `right = arr.length - 1`. Shrink boundaries based on target comparisons.
- **Time Complexity**: $O(N)$
- **Classic Problems**: Two Sum II, Container With Most Water, 3Sum, Valid Palindrome.

```javascript
let left = 0, right = arr.length - 1;
while (left < right) {
  if (arr[left] + arr[right] === target) return [left, right];
  else if (arr[left] + arr[right] < target) left++;
  else right--;
}
```

---

## 2. Sliding Window Pattern

- **When to Use**: Subarrays or substrings meeting a specific constraint (length, maximum sum, unique characters).
- **Key Mechanics**: Expand `right` pointer to grow window; shrink `left` pointer when constraint is violated.
- **Time Complexity**: $O(N)$
- **Classic Problems**: Longest Substring Without Repeating Characters, Minimum Window Substring, Max Consecutive Ones.

```javascript
let left = 0, maxLen = 0;
for (let right = 0; right < s.length; right++) {
  // 1. Expand & update window state
  windowMap.set(s[right], (windowMap.get(s[right]) || 0) + 1);
  // 2. Shrink window while invalid
  while (isInvalid()) {
    windowMap.set(s[left], windowMap.get(s[left]) - 1);
    left++;
  }
  maxLen = Math.max(maxLen, right - left + 1);
}
```

---

## 3. Fast & Slow Pointers (Floyd's Cycle Detection)

- **When to Use**: Linked list cycles, middle node of linked list, circular array traversal.
- **Key Mechanics**: `slow` moves 1 step; `fast` moves 2 steps. If pointers meet, a cycle exists.
- **Time Complexity**: $O(N)$
- **Classic Problems**: Linked List Cycle, Middle of Linked List, Happy Number.

```javascript
let slow = head, fast = head;
while (fast !== null && fast.next !== null) {
  slow = slow.next;
  fast = fast.next.next;
  if (slow === fast) return true; // Cycle detected!
}
```

---

## 4. Subsets / Backtracking Pattern

- **When to Use**: Generating all permutations, combinations, or decision paths.
- **Key Mechanics**: Recursive DFS decision tree with `choose`, `recurse`, and `un-choose` (backtrack).
- **Time Complexity**: $O(2^N)$ or $O(N!)$
- **Classic Problems**: Subsets, Permutations, Combination Sum, Word Search.

```javascript
function backtrack(start, path) {
  result.push([...path]);
  for (let i = start; i < nums.length; i++) {
    path.push(nums[i]);
    backtrack(i + 1, path);
    path.pop(); // Backtrack
  }
}
```

---

## 5. Topological Sort (Kahn's Algorithm)

- **When to Use**: Directed dependency graphs (course prerequisites, build dependencies).
- **Key Mechanics**: Calculate in-degrees for all nodes. Queue nodes with `inDegree === 0`. Dequeue and decrement neighbors.
- **Time Complexity**: $O(V + E)$
- **Classic Problems**: Course Schedule I & II, Alien Dictionary.

---

## 6. Monotonic Stack Pattern

- **When to Use**: Next Greater Element, Next Smaller Element, Stock Span, Largest Rectangle in Histogram.
- **Key Mechanics**: Maintain stack elements in monotonic increasing/decreasing order. Pop elements when violated.
- **Time Complexity**: $O(N)$

---

## 7. Two Heaps Strategy

- **When to Use**: Dynamic data streams requiring real-time median or percentile tracking.
- **Key Mechanics**: `maxHeap` stores smaller half; `minHeap` stores larger half. Balance heap sizes.
- **Time Complexity**: Insert $O(\log N)$, Find Median $O(1)$.
- **Classic Problems**: Find Median from Data Stream.

---

## 8. Disjoint Set Union (DSU / Union-Find)

- **When to Use**: Connected component count, dynamic graph connectivity, cycle detection in undirected graphs.
- **Key Mechanics**: Implement `find(i)` with Path Compression and `union(i, j)` with Rank Optimization.
- **Time Complexity**: $O(\alpha(N)) \approx O(1)$
- **Classic Problems**: Number of Connected Components, Graph Valid Tree, Redundant Connection.

---

## Related Topics

- Frontend System Design Cheat Sheet
- Senior Frontend Mock Script & Assessment Rubric
