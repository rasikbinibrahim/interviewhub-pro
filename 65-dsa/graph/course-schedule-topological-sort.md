# Q6532 · Course Schedule (Topological Sort / Kahn's BFS & Cycle Detection)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Google, Meta, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Graph  
**Concepts:** graph, topological-sort, bfs, dfs, cycle-detection, kahns-algorithm  

## Problem Statement

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that you **must** take course `b` first if you want to take course `a`.

- For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.

Return `true` if you can finish all courses. Otherwise, return `false`.

## Input

- `numCourses`: `number` — total course count
- `prerequisites`: `number[][]` — 2D array of prerequisite pairs `[course, prereq]`

## Output

- `boolean` — `true` if valid ordering exists (DAG), `false` if cycle exists

## Constraints

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= 5000`
- `prerequisites[i].length == 2`
- `0 <= a, b < numCourses`
- All pairs `prerequisites[i]` are **unique**.

## Examples

| Input | Output | Why |
|---|---|---|
| `numCourses = 2, prerequisites = [[1,0]]` | `true` | Course 0 -> Course 1 (valid linear order) |
| `numCourses = 2, prerequisites = [[1,0],[0,1]]` | `false` | Course 0 needs 1, 1 needs 0 (circular dependency cycle) |

## Edge Cases

- `prerequisites` is empty `[]` -> return `true` (no constraints)
- Disconnected graph components

## Hints

1. **Topological Sort via Kahn's BFS Algorithm**:
2. Build an adjacency list `graph` and calculate the `inDegree` array for every node.
3. For each pair `[a, b]`: `graph[b].push(a)`, `inDegree[a]++`.
4. Initialize a Queue with all courses having `inDegree[i] === 0` (no prerequisites required).
5. Pop from Queue, increment `processedCount`, and decrement `inDegree` for all neighbors. If neighbor `inDegree === 0`, push into Queue.
6. Return `processedCount === numCourses`.

## Algorithm

**Pattern:** Directed Acyclic Graph (DAG) Kahn's BFS Topological Sort  
**Core Insight:** If a directed graph contains a cycle, no node in that cycle can ever reach an `inDegree` of 0, leaving `processedCount < numCourses`.

## Dry Run

`numCourses = 2, prerequisites = [[1, 0]]`:
- `graph[0] = [1]`, `inDegree = [0, 1]`.
- Queue initially: `[0]` (since `inDegree[0] === 0`).
- Pop `0`: `processedCount = 1`. Neighbor `1`: `inDegree[1] = 0` -> push `1`.
- Pop `1`: `processedCount = 2`.
- Queue empty. `processedCount (2) === numCourses (2)` -> Return `true`.

## JavaScript Solution

```js
function canFinish(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const graph = Array.from({ length: numCourses }, () => []);

  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  let processedCount = 0;

  while (queue.length > 0) {
    const curr = queue.shift();
    processedCount++;

    for (const neighbor of graph[curr]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return processedCount === numCourses;
}
```

## TypeScript Solution

```ts
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const inDegree: number[] = new Array(numCourses).fill(0);
  const graph: number[][] = Array.from({ length: numCourses }, () => []);

  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }

  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  let processedCount = 0;

  while (queue.length > 0) {
    const curr = queue.shift()!;
    processedCount++;

    for (const neighbor of graph[curr]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return processedCount === numCourses;
}
```

## Time Complexity

`O(V + E)` — where `V` is `numCourses` and `E` is `prerequisites.length`.

## Space Complexity

`O(V + E)` — space for adjacency list and Queue.

## Common Mistakes

- Reversing directed edge direction (`[a, b]` means $b \to a$, not $a \to b$).

## Follow-Up Questions

1. How would you modify this to return the actual ordered array of courses? (Course Schedule II).

## Similar Questions

- Course Schedule II
- Alien Dictionary
