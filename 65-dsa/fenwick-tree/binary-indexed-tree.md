# Q6510 · Binary Indexed Tree (Fenwick Tree) Implementation

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Interview Frequency:** ★★★★☆  
**Category:** Fenwick Tree  
**Concepts:** fenwick-tree, binary-indexed-tree, bit-manipulation, range-query  

## Problem Statement

Implement a **Binary Indexed Tree (Fenwick Tree)** data structure that supports efficient 1D array prefix sum queries and point updates in `O(log N)` time complexity using bitwise least significant bit (`LSB = i & (-i)`) indexing.

Implement `FenwickTree` class:
- `constructor(size: number)`: Initializes tree of given size.
- `update(index: number, delta: number)`: Adds `delta` to element at 1-based `index`.
- `query(index: number)`: Returns prefix sum of elements from index 1 to `index`.
- `rangeSum(left: number, right: number)`: Returns sum of elements in range `[left, right]`.

## Input

- `size`: `number`
- `update(index, delta)`
- `query(index)`
- `rangeSum(left, right)`

## Output

- `query`: `number`
- `rangeSum`: `number`

## Constraints

- `1 <= size <= 10^5`
- 1-based indexing for `update` and `query`

## Examples

```javascript
const bit = new FenwickTree(5);
bit.update(1, 3);
bit.update(2, 2);
bit.update(3, 5);
bit.query(3);         // returns 3 + 2 + 5 = 10
bit.rangeSum(2, 3);   // returns query(3) - query(1) = 10 - 3 = 7
```

## Edge Cases

- `left === right`
- `index = 1` or `index = size`

## Hints

1. Fenwick Tree uses 1-based indexing.
2. `LSB(i) = i & (-i)` gives the lowest set bit value of integer `i`.
3. To update index `i`: add `delta` to `tree[i]`, then step forward `i += i & (-i)` until `i > size`.
4. To query prefix sum up to `i`: add `tree[i]` to total sum, then step backward `i -= i & (-i)` until `i == 0`.

## Algorithm

**Pattern:** Bitwise LSB Navigation  
**Core Insight:** Each index `i` in the Fenwick Tree array stores the sum of elements in a range of length `LSB(i)`. Moving forward (`i += i & -i`) updates all responsible parent ranges. Moving backward (`i -= i & -i`) accumulates sub-range sums.

## Dry Run

`size = 4`, `update(3, 5)`:
- `i = 3` (binary `0011`), `LSB(3) = 1` -> `tree[3] += 5`, next `i = 3 + 1 = 4`.
- `i = 4` (binary `0100`), `LSB(4) = 4` -> `tree[4] += 5`, next `i = 4 + 4 = 8 > 4` -> Done.

`query(3)`:
- `i = 3` -> sum += `tree[3]`, next `i = 3 - 1 = 2`.
- `i = 2` -> sum += `tree[2]`, next `i = 2 - 2 = 0` -> Done.

## JavaScript Solution

```js
class FenwickTree {
  constructor(size) {
    this.size = size;
    this.tree = new Array(size + 1).fill(0);
  }

  update(index, delta) {
    for (let i = index; i <= this.size; i += i & -i) {
      this.tree[i] += delta;
    }
  }

  query(index) {
    let sum = 0;
    for (let i = index; i > 0; i -= i & -i) {
      sum += this.tree[i];
    }
    return sum;
  }

  rangeSum(left, right) {
    return this.query(right) - this.query(left - 1);
  }
}
```

## TypeScript Solution

```ts
class FenwickTree {
  private size: number;
  private tree: number[];

  constructor(size: number) {
    this.size = size;
    this.tree = new Array(size + 1).fill(0);
  }

  update(index: number, delta: number): void {
    for (let i = index; i <= this.size; i += i & -i) {
      this.tree[i] += delta;
    }
  }

  query(index: number): number {
    let sum = 0;
    for (let i = index; i > 0; i -= i & -i) {
      sum += this.tree[i];
    }
    return sum;
  }

  rangeSum(left: number, right: number): number {
    return this.query(right) - this.query(left - 1);
  }
}
```

## Time Complexity

- `update(index, delta)`: `O(log N)`
- `query(index)`: `O(log N)`
- `rangeSum(left, right)`: `O(log N)`

## Space Complexity

`O(N)` — tree array of size `N + 1`.

## Common Mistakes

- Using 0-based indexing for bit navigation, which leads to infinite loops (`0 & -0 === 0`).
- Mixing up update increment (`i += i & -i`) with query decrement (`i -= i & -i`).

## Follow-Up Questions

1. How does Fenwick Tree compare to Segment Tree in code complexity, memory usage, and constant factors? (Fenwick Tree requires 1x memory vs 4x memory for Segment Tree and has lower constant factors).

## Similar Questions

- Range Sum Query - Mutable
- Count of Smaller Numbers After Self
