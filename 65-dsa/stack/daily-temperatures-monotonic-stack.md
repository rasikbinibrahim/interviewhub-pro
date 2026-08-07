# Q6583 · Daily Temperatures (Monotonic Decreasing Stack)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Stack  
**Concepts:** stack, monotonic-stack, arrays, next-greater-element  

## Problem Statement

Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the **number of days** you have to wait after the `i-th` day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.

## Input

- `temperatures`: `number[]` — array of daily temperature values

## Output

- `number[]` — array of days to wait for a warmer temperature

## Constraints

- `1 <= temperatures.length <= 10^5`
- `30 <= temperatures[i] <= 100`

## Examples

| Input | Output | Why |
|---|---|---|
| `temperatures = [73,74,75,71,69,72,76,73]` | `[1,1,4,2,1,1,0,0]` | Day 0 (73) waits 1 day for 74; Day 2 (75) waits 4 days for 76 |
| `temperatures = [30,40,50,60]` | `[1,1,1,0]` | Strictly increasing temperatures |
| `temperatures = [30,60,90]` | `[1,1,0]` | 1 day waits |

## Edge Cases

- Strictly decreasing temperatures `[90, 80, 70]` -> returns `[0, 0, 0]`

## Hints

1. **Next Greater Element Pattern**:
   - We need the distance to the next element greater than `temperatures[i]`.
2. **Monotonic Stack**:
   - Maintain a stack storing **indices** of temperatures in monotonic decreasing order.
   - For each index `i`:
     - While `stack` is not empty AND `temperatures[i] > temperatures[stack.top]`:
       - `prevIndex = stack.pop()`.
       - `result[prevIndex] = i - prevIndex`.
     - Push `i` onto `stack`.

## Algorithm

**Pattern:** Monotonic Decreasing Stack Index Resolution  
**Core Insight:** Storing un-resolved indices on a monotonic stack allows resolving next-warmer days in $O(1)$ amortized pops per element.

## Dry Run

`temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`:
- `i = 0 (73)`: `stack = [0]`.
- `i = 1 (74)`: `74 > 73` -> pop 0! `res[0] = 1 - 0 = 1`. `stack = [1]`.
- `i = 2 (75)`: `75 > 74` -> pop 1! `res[1] = 2 - 1 = 1`. `stack = [2]`.
- `i = 3 (71)`: `stack = [2, 3]`.
- `i = 4 (69)`: `stack = [2, 3, 4]`.
- `i = 5 (72)`: `72 > 69` -> pop 4! `res[4] = 5 - 4 = 1`. `72 > 71` -> pop 3! `res[3] = 5 - 3 = 2`. `stack = [2, 5]`.
- Return `[1,1,4,2,1,1,0,0]`.

## JavaScript Solution

```js
function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const result = new Array(n).fill(0);
  const stack = []; // Stores indices

  for (let i = 0; i < n; i++) {
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const prevIndex = stack.pop();
      result[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }

  return result;
}
```

## TypeScript Solution

```ts
function dailyTemperatures(temperatures: number[]): number[] {
  const n = temperatures.length;
  const result: number[] = new Array(n).fill(0);
  const stack: number[] = [];

  for (let i = 0; i < n; i++) {
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const prevIndex = stack.pop()!;
      result[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }

  return result;
}
```

## Time Complexity

`O(N)` — each index is pushed and popped from the stack at most once.

## Space Complexity

`O(N)` — space for monotonic stack array.

## Common Mistakes

- Storing temperature values instead of indices on the stack, losing positional distance information needed to calculate `i - prevIndex`.

## Follow-Up Questions

1. How does Next Greater Element I solve array matching queries using a Hash Map + Monotonic Stack?

## Similar Questions

- Next Greater Element I
- Online Stock Span
