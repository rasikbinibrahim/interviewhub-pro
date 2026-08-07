# Q1302 · Course Schedule

**Difficulty:** Medium
**Companies Asked:** Amazon, Google, Meta, Microsoft, Bloomberg
**Interview Frequency:** ★★★★★
**Category:** Data Structures & Algorithms → Graph
**Concepts:** directed graph, cycle detection via DFS, three-state node coloring

## Problem Statement

There are `numCourses` courses, labeled `0` to `numCourses - 1`. Some
courses have prerequisites, given as an array of pairs
`prerequisites[i] = [course, prerequisite]`, meaning `prerequisite` must
be completed before `course`. Return `true` if it's possible to finish
all courses (i.e., no cyclic dependency exists), or `false` otherwise.

## Input

- `numCourses`: an integer
- `prerequisites`: an array of `[course, prerequisite]` pairs

## Output

Boolean — `true` if all courses can be completed, `false` if a cyclic
dependency makes that impossible.

## Constraints

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= 5000`
- `prerequisites[i].length === 2`
- All pairs are distinct.

## Examples

| Input | Output | Why |
|---|---|---|
| `numCourses = 2, prerequisites = [[1,0]]` | `true` | Take course 0, then course 1 — no cycle |
| `numCourses = 2, prerequisites = [[1,0],[0,1]]` | `false` | Course 1 needs 0, and 0 needs 1 — a cycle, impossible to satisfy |
| `numCourses = 3, prerequisites = []` | `true` | No prerequisites at all — any order works |

## Edge Cases

- No prerequisites at all → always `true`
- A self-loop (`[0,0]`, a course requiring itself) → always `false`,
  the simplest possible cycle
- A cycle not involving every course (some courses are cycle-free,
  others form a cycle among themselves) → still `false`, since *any*
  cycle makes the whole schedule infeasible
- Disconnected groups of courses (independent prerequisite chains) →
  must all be checked, not just one connected component

## Hints

1. This is really a question about a directed graph's structure — model
   each course as a node and each prerequisite relationship as a
   directed edge. What graph property exactly corresponds to "no valid
   order exists"?
2. A valid course order is possible exactly when the prerequisite graph
   has no cycle — this is the definition of whether a topological sort
   exists. How would you detect a cycle in a directed graph using DFS?
3. A plain "visited" set isn't enough for directed cycle detection —
   revisiting a node already fully processed and popped off the current
   path is fine, but revisiting a node that's still *on the current DFS
   path* means a cycle. Track three states per node: unvisited, "in
   progress" (currently on the active DFS path), and "fully processed" —
   a cycle is found exactly when DFS reaches a node that's currently "in
   progress."

## Algorithm

**Pattern:** directed graph cycle detection via DFS with three-state
node coloring.
**Core insight:** all courses can be completed exactly when the
prerequisite graph (courses as nodes, prerequisite relationships as
directed edges) contains no cycle. A plain visited/unvisited boolean
isn't sufficient for *directed* cycle detection, because a node can be
legitimately revisited via a different path after it's been fully
explored — what actually signals a cycle is revisiting a node that's
still on the *current* DFS recursion path (state "in progress"), not
one that's already been fully explored and popped off ("done"). Marking
each node "in progress" on entry and "done" on exit correctly
distinguishes a true cycle from a harmless re-convergence.
**Invariant:** at any point during the DFS, a node in the "in progress"
state means it's an ancestor of the current node in the recursion —
reaching it again means the current node can (transitively) reach one
of its own ancestors, which is exactly a cycle.

## Dry Run

**Input:** `numCourses = 2`, `prerequisites = [[1,0],[0,1]]` (build
adjacency: `0 -> 1` and `1 -> 0`, meaning course 0 requires 1, and
course 1 requires 0)

| Step | Node visited | State transitions | Cycle detected? |
|---|---|---|---|
| 1 | DFS(0) | mark 0 "in progress" | — |
| 2 | DFS(0)'s neighbor 1 | mark 1 "in progress" | — |
| 3 | DFS(1)'s neighbor 0 | 0 is already "in progress" | yes — cycle! return `false` |

**Result:** `false` — matches expected output.

## JavaScript Solution

```js
function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  for (const [course, prerequisite] of prerequisites) {
    graph[course].push(prerequisite);
  }

  const UNVISITED = 0;
  const IN_PROGRESS = 1;
  const DONE = 2;
  const state = new Array(numCourses).fill(UNVISITED);

  function hasCycle(course) {
    if (state[course] === IN_PROGRESS) return true;
    if (state[course] === DONE) return false;

    state[course] = IN_PROGRESS;

    for (const prerequisite of graph[course]) {
      if (hasCycle(prerequisite)) return true;
    }

    state[course] = DONE;
    return false;
  }

  for (let course = 0; course < numCourses; course++) {
    if (hasCycle(course)) return false;
  }

  return true;
}
```

## TypeScript Solution

```ts
function canFinish(numCourses: number, prerequisites: readonly (readonly [number, number])[]): boolean {
  const graph: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [course, prerequisite] of prerequisites) {
    graph[course]!.push(prerequisite);
  }

  const enum State {
    Unvisited = 0,
    InProgress = 1,
    Done = 2,
  }
  const state: State[] = new Array(numCourses).fill(State.Unvisited);

  function hasCycle(course: number): boolean {
    if (state[course] === State.InProgress) return true;
    if (state[course] === State.Done) return false;

    state[course] = State.InProgress;

    for (const prerequisite of graph[course]!) {
      if (hasCycle(prerequisite)) return true;
    }

    state[course] = State.Done;
    return false;
  }

  for (let course = 0; course < numCourses; course++) {
    if (hasCycle(course)) return false;
  }

  return true;
}
```

## Time Complexity

O(V + E) — where `V` is `numCourses` and `E` is `prerequisites.length`;
each node and edge is visited a constant number of times thanks to the
`DONE` state preventing re-exploration.

## Space Complexity

O(V + E) — the adjacency list is O(E), the state array and recursion
stack are O(V).

## Common Mistakes

- Using a single `visited` boolean set instead of three states — this
  either misses real cycles (if revisiting any visited node is ignored)
  or incorrectly flags harmless re-convergence as a cycle (if any
  revisit is treated as a cycle).
- Forgetting to reset/check state across multiple disconnected
  components — a cycle could exist in a part of the graph not reachable
  from node `0`, so every node needs its own DFS started if not already
  processed.
- Building the adjacency list in the wrong direction (edges pointing
  prerequisite → course instead of course → prerequisite, or vice versa)
  — doesn't change whether a cycle exists, but can make the DFS harder
  to reason about if inconsistent with the write-up.

## Interview Follow-up Questions

1. How would you return a *valid course order* itself (a topological
   sort), not just whether one exists? (Course Schedule II.)
2. How would you solve this using Kahn's algorithm (BFS-based
   topological sort with in-degree tracking) instead of DFS?
3. How would you detect a cycle in an *undirected* graph — why doesn't
   this same three-state technique directly apply there?

## Similar Questions

- Number of Islands (see [number-of-islands.md](number-of-islands.md))
- Clone Graph (see [clone-graph.md](clone-graph.md))
- Course Schedule II

---
[← Back to Graph](README.md) · [← Back to 65-dsa](../README.md)
