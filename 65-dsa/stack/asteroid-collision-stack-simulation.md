# Q6589 · Asteroid Collision (Stack Simulation)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Stack  
**Concepts:** stack, simulation, arrays, collision  

## Problem Statement

We are given an array `asteroids` of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the **smaller one will explode**. If both are the **same size**, **both will explode**. Two asteroids moving in the same direction will never meet.

## Input

- `asteroids`: `number[]` — array of non-zero integers

## Output

- `number[]` — state of surviving asteroids after all collisions

## Constraints

- `2 <= asteroids.length <= 10^4`
- `-1000 <= asteroids[i] <= 1000`
- `asteroids[i] != 0`

## Examples

| Input | Output | Why |
|---|---|---|
| `asteroids = [5,10,-5]` | `[5,10]` | 10 and -5 collide; 10 wins (absolute size 10 > 5). 5 and 10 move right |
| `asteroids = [8,-8]` | `[]` | 8 and -8 collide; both explode |
| `asteroids = [10,2,-5]` | `[10]` | -5 explodes 2, then 10 explodes -5 |

## Edge Cases

- Asteroids moving apart `[-2, -1, 1, 2]` -> no collision, returns `[-2, -1, 1, 2]`

## Hints

1. **Collision Condition**:
   - A collision ONLY occurs when `top > 0` (moving right) and `incoming < 0` (moving left).
2. Use a Stack to track surviving asteroids.
3. For each `ast` in `asteroids`:
   - While `stack` top is `> 0` AND `ast < 0`:
     - Calculate diff = `stack.top + ast`.
     - If `diff < 0`: Top asteroid explodes! Pop `stack`, continue loop.
     - If `diff === 0`: Both explode! Pop `stack`, mark `ast = 0`, break loop.
     - If `diff > 0`: Incoming asteroid explodes! Mark `ast = 0`, break loop.
   - If `ast !== 0`: Push `ast` onto `stack`.

## Algorithm

**Pattern:** Stack Opposite Direction Opponent Elimination  
**Core Insight:** Comparing right-bound asteroids on top of the Stack against incoming left-bound asteroids simulates sequential physical collisions cleanly in $O(N)$ time.

## Dry Run

`asteroids = [10, 2, -5]`:
- Push 10: `stack = [10]`.
- Push 2: `stack = [10, 2]`.
- Incoming -5:
  - Top 2 > 0: `diff = 2 + (-5) = -3 < 0`. Pop 2! `stack = [10]`.
  - Top 10 > 0: `diff = 10 + (-5) = 5 > 0`. Incoming -5 explodes! Break loop.
- Return `stack = [10]`.

## JavaScript Solution

```js
function asteroidCollision(asteroids) {
  const stack = [];

  for (let ast of asteroids) {
    let exploded = false;

    // Collision only happens if stack top > 0 and incoming ast < 0
    while (stack.length > 0 && stack[stack.length - 1] > 0 && ast < 0) {
      const top = stack[stack.length - 1];

      if (top < -ast) {
        stack.pop(); // Top asteroid explodes, loop continues
      } else if (top === -ast) {
        stack.pop(); // Both explode
        exploded = true;
        break;
      } else {
        exploded = true; // Incoming asteroid explodes
        break;
      }
    }

    if (!exploded) {
      stack.push(ast);
    }
  }

  return stack;
}
```

## TypeScript Solution

```ts
function asteroidCollision(asteroids: number[]): number[] {
  const stack: number[] = [];

  for (let ast of asteroids) {
    let exploded = false;

    while (stack.length > 0 && stack[stack.length - 1] > 0 && ast < 0) {
      const top = stack[stack.length - 1];

      if (top < -ast) {
        stack.pop();
      } else if (top === -ast) {
        stack.pop();
        exploded = true;
        break;
      } else {
        exploded = true;
        break;
      }
    }

    if (!exploded) {
      stack.push(ast);
    }
  }

  return stack;
}
```

## Time Complexity

`O(N)` — each asteroid is pushed and popped at most once.

## Space Complexity

`O(N)` — stack storing surviving asteroids.

## Common Mistakes

- Triggering collision checks when `stack.top < 0` and `ast > 0` — left-moving asteroids ahead of right-moving asteroids move apart and NEVER collide!

## Follow-Up Questions

1. How would you handle asteroids moving in 2D space at different velocities?

## Similar Questions

- Daily Temperatures
- Backspace String Compare
