# Q6595 · Find the Duplicate Number (Floyd's Tortoise and Hare Cycle Detection)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Arrays  
**Concepts:** arrays, two-pointers, floyds-cycle-detection, fast-slow-pointers  

## Problem Statement

Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive.

There is **only one repeated number** in `nums`, return this **repeated number**.

You must solve the problem **without modifying** the array `nums` and use only **`O(1)` constant extra space**.

## Input

- `nums`: `number[]` — integer array of size $N + 1$ with values in $1...N$

## Output

- `number` — duplicate integer value

## Constraints

- `1 <= n <= 10^5`
- `nums.length == n + 1`
- `1 <= nums[i] <= n`
- All integers in `nums` appear only **once** except for **one integer** which appears **two or more times**.

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [1,3,4,2,2]` | `2` | Number 2 is repeated |
| `nums = [3,1,3,4,2]` | `3` | Number 3 is repeated |

## Edge Cases

- Duplicate appears 3 or more times `[2, 2, 2, 2]` -> returns `2`

## Hints

1. **Map Array Values as Linked List Pointers**:
   - Since values are in range `1...N`, treat `nums[i]` as pointing to index `nums[i]`.
   - Because a number is duplicated, **two indices point to the same value**, forming a **Linked List Cycle!**
   - The duplicate number is the **entrance to the cycle!**
2. **Floyd's Cycle Detection Algorithm**:
   - Step 1: `slow = nums[0], fast = nums[0]`. Move `slow = nums[slow]` (1 step) and `fast = nums[nums[fast]]` (2 steps) until `slow === fast`.
   - Step 2: Reset `slow = nums[0]`. Move both `slow` and `fast` 1 step at a time until `slow === fast`.
   - `slow` is the duplicate number!

## Algorithm

**Pattern:** Array Index Pointers Floyd's Cycle Detection  
**Core Insight:** Re-interpreting array index-to-value mappings as a implicit linked list transforms duplicate identification into finding the start node of a linked list cycle in $O(N)$ time with $O(1)$ space.

## Dry Run

`nums = [1, 3, 4, 2, 2]`:
- Step 1 (Find Meeting Point):
  - `slow = 1`, `fast = 1`.
  - `slow = nums[1]=3`, `fast = nums[nums[1]]=nums[3]=2`.
  - `slow = nums[3]=2`, `fast = nums[nums[2]]=nums[4]=2`. Meet at 2!
- Step 2 (Find Cycle Entrance):
  - Reset `slow = nums[0]=1`.
  - Move `slow = nums[1]=3`, `fast = nums[2]=4`.
  - Move `slow = nums[3]=2`, `fast = nums[4]=2`. Meet at 2!
- Return `2`.

## JavaScript Solution

```js
function findDuplicate(nums) {
  let slow = nums[0];
  let fast = nums[0];

  // Phase 1: Detect cycle meeting point
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  // Phase 2: Find cycle entrance (duplicate number)
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;
}
```

## TypeScript Solution

```ts
function findDuplicate(nums: number[]): number {
  let slow = nums[0];
  let fast = nums[0];

  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;
}
```

## Time Complexity

`O(N)` — two linear pointer passes.

## Space Complexity

`O(1)` — constant extra space without array mutation.

## Common Mistakes

- Using Hash Sets ($O(N)$ space) or sorting array ($O(N \log N)$ time + mutates input), violating interview constraints.

## Follow-Up Questions

1. How does Linked List Cycle II use identical math equations to locate cycle entrance nodes?

## Similar Questions

- Linked List Cycle II
- First Missing Positive
