# Q6582 · Gas Station (Greedy Circuit Traversal)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Arrays  
**Concepts:** arrays, greedy, circuit-traversal, simulation  

## Problem Statement

There are `n` gas stations along a circular route, where the amount of gas at the `i-th` station is `gas[i]`.

You have a car with an unlimited gas tank and it costs `cost[i]` of gas to travel from the `i-th` station to its next `(i + 1)-th` station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays `gas` and `cost`, return the **starting gas station's index** if you can travel around the circuit once in the clockwise direction, otherwise return `-1`. If there exists a solution, it is **guaranteed to be unique**.

## Input

- `gas`: `number[]` — gas available at each station
- `cost`: `number[]` — gas cost to travel to next station

## Output

- `number` — 0-based starting station index, or `-1` if impossible

## Constraints

- `n == gas.length == cost.length`
- `1 <= n <= 10^5`
- `0 <= gas[i], cost[i] <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `gas = [1,2,3,4,5], cost = [3,4,5,1,2]` | `3` | Start at station 3 (index 3). Total gas 15 >= total cost 15 |
| `gas = [2,3,4], cost = [3,4,3]` | `-1` | Total gas 9 < total cost 10 (impossible) |

## Edge Cases

- Total sum of `gas` < total sum of `cost` -> **IMPOSSIBLE!** Return `-1` immediately.

## Hints

1. **Global Feasibility Check**:
   - If `sum(gas) < sum(cost)`, it is mathematically impossible to complete the circuit from ANY station. Return `-1`.
2. **Greedy Start Reset**:
   - Maintain `totalTank` and `currentTank`.
   - For station `i`: `currentTank += gas[i] - cost[i]`.
   - If `currentTank < 0`:
     - Stations from `start` to `i` CANNOT be valid starting stations!
     - Reset `start = i + 1` and `currentTank = 0`.
3. If `totalTank >= 0`, return `start`.

## Algorithm

**Pattern:** Greedy Failure Point Reset  
**Core Insight:** If traveling from station $A$ to station $B$ causes `currentTank < 0`, no station between $A$ and $B$ can reach $B$ either; the next candidate start index must be $B + 1$.

## Dry Run

`gas = [1,2,3,4,5], cost = [3,4,5,1,2]`:
- `i = 0`: `curr = 1 - 3 = -2 < 0`. `start = 1, curr = 0`.
- `i = 1`: `curr = 2 - 4 = -2 < 0`. `start = 2, curr = 0`.
- `i = 2`: `curr = 3 - 5 = -2 < 0`. `start = 3, curr = 0`.
- `i = 3`: `curr = 4 - 1 = 3 >= 0`. `start = 3`.
- `i = 4`: `curr = 3 + (5 - 2) = 6 >= 0`.
- `totalTank = 0 >= 0`. Return `3`.

## JavaScript Solution

```js
function canCompleteCircuit(gas, cost) {
  let totalTank = 0;
  let currentTank = 0;
  let startStation = 0;

  for (let i = 0; i < gas.length; i++) {
    const netGas = gas[i] - cost[i];
    totalTank += netGas;
    currentTank += netGas;

    // If current tank drops below zero, reset starting candidate
    if (currentTank < 0) {
      startStation = i + 1;
      currentTank = 0;
    }
  }

  return totalTank >= 0 ? startStation : -1;
}
```

## TypeScript Solution

```ts
function canCompleteCircuit(gas: number[], cost: number[]): number {
  let totalTank = 0;
  let currentTank = 0;
  let startStation = 0;

  for (let i = 0; i < gas.length; i++) {
    const netGas = gas[i] - cost[i];
    totalTank += netGas;
    currentTank += netGas;

    if (currentTank < 0) {
      startStation = i + 1;
      currentTank = 0;
    }
  }

  return totalTank >= 0 ? startStation : -1;
}
```

## Time Complexity

`O(N)` — single linear pass through arrays of length $N$.

## Space Complexity

`O(1)` — constant extra space.

## Common Mistakes

- Using nested $O(N^2)$ loops attempting simulation from every station, triggering TLE on $N = 100,000$.

## Follow-Up Questions

1. Why does `totalTank >= 0` guarantee that `startStation` can complete the full circular loop without running out of gas on the remaining wrap-around path?

## Similar Questions

- Jump Game I & II
- Task Scheduler
