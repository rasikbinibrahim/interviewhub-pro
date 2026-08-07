# Q6624 · Course Schedule II (Kahn's Topological Sort BFS)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Category:** Graph  
**Concepts:** graph, topological-sort, bfs, in-degree  

## Problem Statement

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that you must take course `b_i` first if you want to take course `a_i`.

Return the ordering of courses you should take to finish all courses. If it is impossible to finish all courses, return an empty array `[]`.

## Algorithm

```javascript
function findOrder(numCourses, prerequisites) {
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

  const order = [];
  while (queue.length > 0) {
    const curr = queue.shift();
    order.push(curr);

    for (const neighbor of adj[curr]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return order.length === numCourses ? order : [];
}
```

## Time & Space Complexity

- **Time Complexity:** `O(V + E)` — Kahn's BFS algorithm.
- **Space Complexity:** `O(V + E)` — in-degree array and queue.
