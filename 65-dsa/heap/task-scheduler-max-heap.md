# Q6570 · Task Scheduler (Max-Heap & Greedy Frequency Cooling)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Heap  
**Concepts:** heap, greedy, queue, simulation, task-scheduling  

## Problem Statement

You are given an array of CPU `tasks`, each represented by a character A to Z, and a cooling interval `n`. Each cycle or interval allows the completion of one task. Tasks can be completed in any order, but there's a constraint: **identical tasks must be separated by at least `n` intervals** due to cooling time.

Return the **minimum number of intervals** required to complete all given tasks.

## Input

- `tasks`: `string[]` — array of task characters `['A', 'A', 'A', 'B', 'B', 'B']`
- `n`: `number` — mandatory cooling period between identical tasks

## Output

- `number` — total execution CPU units integer count

## Constraints

- `1 <= tasks.length <= 10^4`
- `tasks[i]` is an uppercase English letter.
- `0 <= n <= 100`

## Examples

| Input | Output | Why |
|---|---|---|
| `tasks = ["A","A","A","B","B","B"], n = 2` | `8` | Execution sequence: A -> B -> idle -> A -> B -> idle -> A -> B (8 units) |
| `tasks = ["A","C","A","B","D","B"], n = 1` | `6` | Sequence: A -> B -> C -> D -> A -> B (6 units, zero idle time) |

## Edge Cases

- `n = 0` -> returns `tasks.length` (no cooling required)
- `tasks.length` is extremely large with high task diversity -> returns `tasks.length` (no idle slots needed)

## Hints

1. **Greedy Max Frequency Formula**:
   - Count frequencies of all tasks. Find max task frequency `maxFreq`.
   - Count how many tasks share this maximum frequency `maxCount`.
2. Total intervals needed by the bottleneck task = `(maxFreq - 1) * (n + 1) + maxCount`.
3. Total time is `Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount)`.

## Algorithm

**Pattern:** Greedy Frequency Idle Slot Mathematical Calculation  
**Core Insight:** The task with the highest frequency creates $maxFreq - 1$ empty frames of size $n + 1$. Filling these frames with other tasks minimizes or eliminates CPU idle slots.

## Dry Run

`tasks = ["A","A","A","B","B","B"], n = 2`:
- Frequency of A = 3, B = 3. `maxFreq = 3`.
- `maxCount = 2` (both A and B have frequency 3).
- `formula = (3 - 1) * (2 + 1) + 2 = 2 * 3 + 2 = 8`.
- `tasks.length = 6`. `Math.max(6, 8) = 8`.
- Return `8`.

## JavaScript Solution

```js
function leastInterval(tasks, n) {
  if (n === 0) return tasks.length;

  const freq = new Array(26).fill(0);
  for (const task of tasks) {
    freq[task.charCodeAt(0) - 65]++;
  }

  let maxFreq = 0;
  for (const count of freq) {
    maxFreq = Math.max(maxFreq, count);
  }

  let maxCount = 0;
  for (const count of freq) {
    if (count === maxFreq) {
      maxCount++;
    }
  }

  const partCount = maxFreq - 1;
  const partLength = n - (maxCount - 1);
  const emptySlots = partCount * partLength;
  const availableTasks = tasks.length - (maxFreq * maxCount);
  const idles = Math.max(0, emptySlots - availableTasks);

  return tasks.length + idles;
}
```

## TypeScript Solution

```ts
function leastInterval(tasks: string[], n: number): number {
  if (n === 0) return tasks.length;

  const freq: number[] = new Array(26).fill(0);
  for (const task of tasks) {
    freq[task.charCodeAt(0) - 65]++;
  }

  let maxFreq = 0;
  for (const count of freq) {
    maxFreq = Math.max(maxFreq, count);
  }

  let maxCount = 0;
  for (const count of freq) {
    if (count === maxFreq) {
      maxCount++;
    }
  }

  const partCount = maxFreq - 1;
  const partLength = n - (maxCount - 1);
  const emptySlots = partCount * partLength;
  const availableTasks = tasks.length - (maxFreq * maxCount);
  const idles = Math.max(0, emptySlots - availableTasks);

  return tasks.length + idles;
}
```

## Time Complexity

`O(N)` — single pass to count task frequencies.

## Space Complexity

`O(1)` — fixed 26-element array space.

## Common Mistakes

- Simulating step-by-step queue execution ($O(N \log K)$), which is far slower than the direct $O(N)$ frequency math formula.

## Follow-Up Questions

1. How would you return the actual ordered array sequence of executed task letters (e.g. `['A', 'B', 'idle', 'A', 'B']`)?

## Similar Questions

- Reorganize String
- Rearrange String k Distance Apart
