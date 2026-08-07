# Q6575 · Capacity To Ship Packages Within D Days (Binary Search Answer Space)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Binary Search  
**Concepts:** binary-search, search-space, greedy, monotonic-predicate  

## Problem Statement

A conveyor belt has packages that must be shipped from one port to another within `days` days.

The `i-th` package on the conveyor belt has a weight of `weights[i]`. Each day, we load the ship with packages on the conveyor belt (in the order given by `weights`). We cannot load more weight than the maximum weight capacity of the ship.

Return the **least weight capacity** of the ship that will result in all the packages on the conveyor belt being shipped within `days` days.

## Input

- `weights`: `number[]` — package weights array
- `days`: `number` — target shipment days limit

## Output

- `number` — minimum ship weight capacity

## Constraints

- `1 <= days <= weights.length <= 5 * 10^4`
- `1 <= weights[i] <= 500`

## Examples

| Input | Output | Why |
|---|---|---|
| `weights = [1,2,3,4,5,6,7,8,9,10], days = 5` | `15` | Minimum capacity 15 ships packages in 5 days |
| `weights = [3,2,2,4,1,4], days = 3` | `6` | Minimum capacity 6 ships packages in 3 days |

## Edge Cases

- `days = 1` -> returns sum of all weights
- `days = weights.length` -> returns max weight package

## Hints

1. **Binary Search on Answer Space**:
   - Lower bound `left = Math.max(...weights)` (ship must at least carry the heaviest package).
   - Upper bound `right = sum(weights)` (carrying all packages in 1 day).
2. For candidate mid capacity `cap`:
   - Simulate greedy shipping days count `daysNeeded`.
   - If `daysNeeded <= days`: Capacity is sufficient! Try smaller capacity (`right = mid`).
   - If `daysNeeded > days`: Capacity too small! Increase capacity (`left = mid + 1`).

## Algorithm

**Pattern:** Binary Search on Monotonic Answer Space  
**Core Insight:** Feasibility of shipping packages within $D$ days is a monotonic boolean function — if capacity $C$ is valid, any capacity $> C$ is also valid.

## Dry Run

`weights = [1,2,3,4,5,6,7,8,9,10], days = 5`:
- `left = 10, right = 55`.
- Test `mid = 32`: daysNeeded = 2 (`2 <= 5`). `right = 32`.
- Test `mid = 21`: daysNeeded = 3 (`3 <= 5`). `right = 21`.
- Test `mid = 15`: daysNeeded = 5 (`5 <= 5`). `right = 15`.
- Test `mid = 14`: daysNeeded = 6 (`6 > 5`). `left = 15`.
- Return `left = 15`.

## JavaScript Solution

```js
function shipWithinDays(weights, days) {
  let left = Math.max(...weights);
  let right = weights.reduce((sum, w) => sum + w, 0);

  function canShip(capacity) {
    let daysNeeded = 1;
    let currentWeight = 0;

    for (const w of weights) {
      if (currentWeight + w > capacity) {
        daysNeeded++;
        currentWeight = 0;
      }
      currentWeight += w;
    }

    return daysNeeded <= days;
  }

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (canShip(mid)) {
      right = mid; // Try smaller capacity
    } else {
      left = mid + 1; // Capacity too small
    }
  }

  return left;
}
```

## TypeScript Solution

```ts
function shipWithinDays(weights: number[], days: number): number {
  let left = Math.max(...weights);
  let right = weights.reduce((sum, w) => sum + w, 0);

  function canShip(capacity: number): boolean {
    let daysNeeded = 1;
    let currentWeight = 0;

    for (const w of weights) {
      if (currentWeight + w > capacity) {
        daysNeeded++;
        currentWeight = 0;
      }
      currentWeight += w;
    }

    return daysNeeded <= days;
  }

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (canShip(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}
```

## Time Complexity

`O(N * log(Sum - Max))` — binary search on weight range running $O(N)$ greedy check per step.

## Space Complexity

`O(1)` — constant extra space.

## Common Mistakes

- Setting `left = 1` or `left = 0`, causing simulation failure when `capacity < Math.max(...weights)`.

## Follow-Up Questions

1. How does Koko Eating Bananas use identical binary search answer space logic?

## Similar Questions

- Koko Eating Bananas
- Split Array Largest Sum
