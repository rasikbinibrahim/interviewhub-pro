# Q6649 · Course Schedule I (Cycle Detection via Topological Sort)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft
**Interview Frequency:** ★★★★★
**Category:** Graph
**Concepts:** graph, topological-sort, cycle-detection, kahns-algorithm, bfs

## Problem Statement

Write a function `canFinish(numCourses, prerequisites)` that returns
`true` if it's possible to complete all `numCourses` courses given a
list of prerequisite pairs `[course, prerequisite]` (meaning
`prerequisite` must be taken before `course`), and `false` if the
prerequisites form a cycle that makes completion impossible.

## Input

`numCourses`: the number of courses, labeled `0` to `numCourses - 1`.
`prerequisites`: an array of `[course, prerequisite]` pairs.

## Output

A boolean: `true` if all courses can be completed, `false` if a
prerequisite cycle makes that impossible.

## Constraints

`1 <= numCourses <= 2000`, `0 <= prerequisites.length <= 5000`

## Examples

| Input | Output | Why |
|---|---|---|
| `numCourses=2, prerequisites=[[1,0]]` | `true` | Take course 0, then course 1 — no cycle |
| `numCourses=2, prerequisites=[[1,0],[0,1]]` | `false` | Course 0 needs course 1, and course 1 needs course 0 — a cycle |
| `numCourses=1, prerequisites=[]` | `true` | A single course with no prerequisites is always completable |

## Edge Cases

- No prerequisites at all → always `true`
- A course listed as its own prerequisite (`[0,0]`) → `false`, a
  self-cycle
- A longer cycle spanning several courses (`0→1→2→0`) → `false`,
  detected the same way as a direct 2-course cycle
- Disconnected groups of courses (some depend on each other, others are
  entirely independent) → each group is checked correctly regardless of
  the others

## Hints

1. This is really a question about whether a directed graph (courses as
   nodes, prerequisites as edges) contains a cycle — if it doesn't, a
   valid course order exists; if it does, completion is impossible. What
   graph technique determines whether every node can be included in a
   valid ordering?
2. Kahn's algorithm approaches this by repeatedly removing nodes that
   currently have *no remaining prerequisites* (in-degree zero) — each
   removed node's dependents have one fewer prerequisite to worry about,
   potentially freeing them up next.
3. If every node can eventually be removed this way, there's no cycle
   (count the removed nodes and compare to `numCourses`); if some nodes
   are never freed up (their in-degree never reaches zero), those nodes
   are part of a cycle.

## Algorithm

**Pattern:** Kahn's algorithm (BFS-based topological sort) for cycle
detection.
**Core insight:** a directed graph can be fully topologically sorted
(every node placed in a valid dependency order) if and only if it
contains no cycle. Kahn's algorithm builds this order by repeatedly
processing nodes whose in-degree (number of remaining unmet
prerequisites) has dropped to zero — each time a node is processed, its
outgoing edges are "removed" by decrementing its neighbors' in-degrees,
potentially unlocking them for processing next. If every node eventually
gets processed this way, the graph is acyclic (`count === numCourses`);
if any nodes are permanently stuck with unmet prerequisites (because
they're mutually dependent within a cycle), they're never processed, and
the final count falls short.
**Invariant:** at any point during the BFS, a course is enqueued if and
only if every one of its prerequisites has already been counted as
completed — so any course actually reached and counted is guaranteed to
be genuinely completable given the courses processed before it.

## Dry Run

**Input:** `numCourses=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]]`
(course 1 needs 0; course 2 needs 0; course 3 needs both 1 and 2)

Build graph: `adj[0]=[1,2]`, `adj[1]=[3]`, `adj[2]=[3]`,
`inDegree=[0,1,1,2]`

Initial queue (in-degree 0): `[0]`

| curr | count after | neighbors processed | inDegree after | queue after |
|---|---|---|---|---|
| 0 | 1 | 1: inDegree 1→0, enqueue; 2: inDegree 1→0, enqueue | `[0,0,0,2]` | `[1,2]` |
| 1 | 2 | 3: inDegree 2→1 (not yet 0) | `[0,0,0,1]` | `[2]` |
| 2 | 3 | 3: inDegree 1→0, enqueue | `[0,0,0,0]` | `[3]` |
| 3 | 4 | (no outgoing edges) | unchanged | `[]` |

Queue empty, `count = 4 === numCourses (4)`. **Result:** `true` —
matches expected output (a valid order exists: `0, 1, 2, 3` or `0, 2, 1, 3`).

## JavaScript Solution

```js
function canFinish(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);

  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
    inDegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let count = 0;
  while (queue.length > 0) {
    const curr = queue.shift();
    count++;

    for (const neighbor of adj[curr]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return count === numCourses;
}
```

## TypeScript Solution

```ts
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const inDegree: number[] = new Array(numCourses).fill(0);
  const adj: number[][] = Array.from({ length: numCourses }, () => []);

  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
    inDegree[course]++;
  }

  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let count = 0;
  while (queue.length > 0) {
    const curr: number = queue.shift()!;
    count++;

    for (const neighbor of adj[curr]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return count === numCourses;
}
```

## Time Complexity

O(V + E) — building the adjacency list and in-degree array is O(V + E),
and the BFS visits every node and edge exactly once.

## Space Complexity

O(V + E) — the adjacency list, in-degree array, and queue.

## Common Mistakes

- Using `Array.prototype.shift()` on a plain array as the queue in a
  hot loop for very large inputs — correct, but `shift()` is O(n) per
  call in the worst case; a real deque or index-based pointer avoids
  that overhead for large course counts (a minor optimization, not a
  correctness issue at this problem's constraints).
- Only detecting *direct* cycles (`A` needs `B`, `B` needs `A`) with
  ad-hoc pairwise checks — misses longer cycles spanning three or more
  courses; Kahn's algorithm (or DFS-based cycle detection) correctly
  handles cycles of any length.
- Forgetting that a *disconnected* course (no prerequisites, and nothing
  depends on it) still needs to be counted — it starts with in-degree
  `0` and is processed like any other node, but it's easy to
  accidentally special-case degree-zero nodes incorrectly.

## Interview Follow-up Questions

1. How would you return the actual valid course order (Course Schedule
   II), not just whether one exists?
2. How would you solve this with DFS-based cycle detection instead
   (tracking a node's recursion-stack membership), and what's the
   trade-off versus Kahn's algorithm?
3. How would you find the *minimum* number of semesters needed if
   multiple courses can be taken in parallel each semester?

## Similar Questions

- Course Schedule II (Kahn's Topological Sort) (see [course-schedule-ii-topological-sort.md](course-schedule-ii-topological-sort.md))
- Clone Graph (see [clone-graph-dfs-bfs.md](clone-graph-dfs-bfs.md))
