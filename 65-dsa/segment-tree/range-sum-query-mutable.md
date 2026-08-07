# Q6509 · Range Sum Query - Mutable (Segment Tree)

**Difficulty:** Medium  
**Companies Asked:** Google, Amazon, Meta, Microsoft  
**Interview Frequency:** ★★★★☆  
**Category:** Segment Tree  
**Concepts:** segment-tree, range-query, point-update, data-structures  

## Problem Statement

Given an integer array `nums`, handle multiple queries of the following types:
1. **Update** the value of an element in `nums`.
2. Calculate the **sum** of elements of `nums` between indices `left` and `right` inclusive.

Implement the `NumArray` class:
- `NumArray(int[] nums)` Initializes the object with the integer array `nums`.
- `void update(int index, int val)` Updates the value of `nums[index]` to be `val`.
- `int sumRange(int left, int right)` Returns the sum of the elements of `nums` between indices `left` and `right` inclusive (`nums[left] + nums[left + 1] + ... + nums[right]`).

## Input

- Array constructor `NumArray(nums)`
- Methods: `update(index, val)`, `sumRange(left, right)`

## Output

- `sumRange`: `number`

## Constraints

- `1 <= nums.length <= 3 * 10^4`
- `-100 <= nums[i] <= 100`
- `0 <= index < nums.length`
- `-100 <= val <= 100`
- `0 <= left <= right < nums.length`
- At most `3 * 10^4` calls total to `update` and `sumRange`.

## Examples

```javascript
const numArray = new NumArray([1, 3, 5]);
numArray.sumRange(0, 2); // return 1 + 3 + 5 = 9
numArray.update(1, 2);   // nums becomes [1, 2, 5]
numArray.sumRange(0, 2); // return 1 + 2 + 5 = 8
```

## Edge Cases

- `left === right` (single element query)
- Updating same index multiple times
- Querying entire array range `[0, N-1]`

## Hints

1. Prefix sum array gives `O(1)` query, but `O(N)` point update.
2. Direct array gives `O(1)` point update, but `O(N)` range query.
3. **Segment Tree** achieves both `O(log N)` point updates and `O(log N)` range queries.
4. Tree size: Array of size `4 * N` is sufficient to hold the binary Segment Tree.

## Algorithm

**Pattern:** Binary Segment Tree Tree-Array Representation  
**Core Insight:** Each node at index `treeIdx` covers range `[start, end]`. Left child is `2 * treeIdx + 1` (`[start, mid]`), Right child is `2 * treeIdx + 2` (`[mid + 1, end]`). Internal nodes store the sum of their left and right children.

## Dry Run

`nums = [1, 3, 5]`:
- Tree Root (idx 0, range 0..2) = 9
- Left child (idx 1, range 0..1) = 4 (1 + 3)
- Right child (idx 2, range 2..2) = 5
- `update(1, 2)` -> update index 1 to 2 -> updates leaf `3` to `2` -> cascades up to parent `4` -> `3`, root `9` -> `8`.

## JavaScript Solution

```js
class NumArray {
  constructor(nums) {
    this.n = nums.length;
    this.tree = new Array(4 * this.n).fill(0);
    if (this.n > 0) {
      this._build(nums, 0, 0, this.n - 1);
    }
  }

  _build(nums, node, start, end) {
    if (start === end) {
      this.tree[node] = nums[start];
      return;
    }
    const mid = Math.floor((start + end) / 2);
    this._build(nums, 2 * node + 1, start, mid);
    this._build(nums, 2 * node + 2, mid + 1, end);
    this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
  }

  update(index, val) {
    this._updateTree(0, 0, this.n - 1, index, val);
  }

  _updateTree(node, start, end, idx, val) {
    if (start === end) {
      this.tree[node] = val;
      return;
    }
    const mid = Math.floor((start + end) / 2);
    if (idx <= mid) {
      this._updateTree(2 * node + 1, start, mid, idx, val);
    } else {
      this._updateTree(2 * node + 2, mid + 1, end, idx, val);
    }
    this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
  }

  sumRange(left, right) {
    return this._query(0, 0, this.n - 1, left, right);
  }

  _query(node, start, end, l, r) {
    if (r < start || end < l) return 0; // Completely outside
    if (l <= start && end <= r) return this.tree[node]; // Completely inside

    const mid = Math.floor((start + end) / 2);
    const leftSum = this._query(2 * node + 1, start, mid, l, r);
    const rightSum = this._query(2 * node + 2, mid + 1, end, l, r);
    return leftSum + rightSum;
  }
}
```

## TypeScript Solution

```ts
class NumArray {
  private n: number;
  private tree: number[];

  constructor(nums: number[]) {
    this.n = nums.length;
    this.tree = new Array(4 * this.n).fill(0);
    if (this.n > 0) {
      this._build(nums, 0, 0, this.n - 1);
    }
  }

  private _build(nums: number[], node: number, start: number, end: number): void {
    if (start === end) {
      this.tree[node] = nums[start];
      return;
    }
    const mid = Math.floor((start + end) / 2);
    this._build(nums, 2 * node + 1, start, mid);
    this._build(nums, 2 * node + 2, mid + 1, end);
    this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
  }

  update(index: number, val: number): void {
    this._updateTree(0, 0, this.n - 1, index, val);
  }

  private _updateTree(node: number, start: number, end: number, idx: number, val: number): void {
    if (start === end) {
      this.tree[node] = val;
      return;
    }
    const mid = Math.floor((start + end) / 2);
    if (idx <= mid) {
      this._updateTree(2 * node + 1, start, mid, idx, val);
    } else {
      this._updateTree(2 * node + 2, mid + 1, end, idx, val);
    }
    this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
  }

  sumRange(left: number, right: number): number {
    return this._query(0, 0, this.n - 1, left, right);
  }

  private _query(node: number, start: number, end: number, l: number, r: number): number {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return this.tree[node];

    const mid = Math.floor((start + end) / 2);
    const leftSum = this._query(2 * node + 1, start, mid, l, r);
    const rightSum = this._query(2 * node + 2, mid + 1, end, l, r);
    return leftSum + rightSum;
  }
}
```

## Time Complexity

- `Constructor`: `O(N)`
- `update(index, val)`: `O(log N)`
- `sumRange(left, right)`: `O(log N)`

## Space Complexity

`O(N)` — tree array of size `4 * N`.

## Common Mistakes

- Setting tree array size to `2 * N` instead of `4 * N`, causing out-of-bounds index exceptions on non-power-of-2 input array lengths.

## Follow-Up Questions

1. How would you handle Lazy Propagation for Range Updates in Segment Tree (`updateRange(left, right, val)`)?

## Similar Questions

- Binary Indexed Tree (Fenwick Tree) Implementation
- Range Minimum Query
