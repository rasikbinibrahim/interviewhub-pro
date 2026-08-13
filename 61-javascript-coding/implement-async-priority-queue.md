# QADVJS074 · Implement an Async Priority Queue

**Difficulty:** Hard
**Companies Asked:** Google, Meta, Uber, Amazon
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Promises / Async Control Flow
**Concepts:** priority queue (binary heap), async task scheduling, single-worker dispatch loop, stable ordering for equal priorities

## Problem Statement

Implement an `AsyncPriorityQueue` class for scheduling async work by
priority instead of arrival order. It must support:

- `enqueue(taskFn, priority)` — accepts a zero-argument function
  `taskFn` that returns a `Promise` when called, along with a numeric
  `priority` (higher number = runs sooner); returns a `Promise` that
  resolves/rejects with `taskFn`'s own eventual result.
- Internally, the queue processes tasks **one at a time** (concurrency
  = 1, stated explicitly): whenever the queue is idle and has at least
  one pending task, it must always start the highest-priority pending
  task next — never simply the oldest one, which is what a plain FIFO
  queue would do.

This models a real scheduling problem: e.g. a background sync queue
where a user-triggered "save now" should jump ahead of a low-priority
"prefetch next page" task that was enqueued earlier but hasn't started
yet.

## Input

A sequence of `enqueue(taskFn, priority)` calls, made at arbitrary
times (including while other tasks are already running or pending).
`taskFn: () => Promise<T>`, `priority: number`.

## Output

Each `enqueue` call returns its own `Promise<T>` — resolving or
rejecting exactly as `taskFn()`'s returned promise eventually does, once
the queue actually runs that task. The queue's *internal* execution
order is priority-first (highest priority runs next among whatever is
currently pending), but each caller only observes their own task's
individual outcome.

## Constraints

- Concurrency is fixed at 1 — at most one task's `taskFn` is ever
  running at a time (stated explicitly per the prompt; a concurrency-
  limited variant is a natural follow-up, not required here).
- Among pending tasks, the one with the numerically highest `priority`
  must always be selected next once a worker slot frees up.
- Tasks enqueued with equal priority must run in the order they were
  enqueued (FIFO among ties) — priority alone doesn't fully determine
  order.
- `enqueue` must be safe to call at any time, including from inside a
  task's own resolution (e.g. a running task enqueueing a follow-up
  task).
- A rejecting task must not stop the queue from continuing to process
  the remaining pending tasks (unlike the fail-fast runners elsewhere in
  this repo, a scheduler generally must keep draining its queue).

## Examples

| Calls | Behavior | Why |
|---|---|---|
| `enqueue(taskLow, 1)`, then immediately `enqueue(taskHigh, 5)` (queue was idle, so `taskLow` already started) | `taskLow` runs first anyway (already in flight, concurrency 1), `taskHigh` runs next once `taskLow` settles | Priority only affects the *pending* queue — a task already running can't be preempted with concurrency 1 |
| Queue idle; `enqueue(taskA, 3)`, `enqueue(taskB, 5)`, `enqueue(taskC, 5)` all enqueued before anything starts | Order actually run: `taskB`, `taskC`, `taskA` | `taskB`/`taskC` share the highest priority (5) and run in FIFO order relative to each other; `taskA` (priority 3) runs last despite being enqueued first |
| `enqueue(failingTask, 5)`, `enqueue(taskAfter, 3)` | `failingTask` runs and rejects; `taskAfter` still runs afterward | The queue keeps draining after a rejection — only the failing task's own returned promise reflects the rejection |

## Edge Cases

- Queue is empty and idle when `enqueue` is called → the task starts
  immediately (nothing to prioritize against).
- All enqueued tasks share the same priority → behaves like a plain
  FIFO queue (stability requirement).
- A task enqueues another task from inside its own `taskFn` (recursive
  scheduling) → the newly enqueued task is correctly inserted by
  priority among whatever else is pending at that moment, not just
  appended.
- Negative priorities → must still compare correctly (a queue that only
  handles positive numbers via truthiness checks, for instance, would
  silently mishandle `0` or negative values).
- Two tasks with equal priority, one enqueued from within the other's
  callback → the newly-enqueued one is logically "later," so it goes
  after any already-pending same-priority tasks, preserving FIFO-among-
  ties.

## Hints

1. You need two decisions handled by two different mechanisms: *what
   runs next* (a priority-ordered data structure) and *when something
   is allowed to run* (a simple "is a task currently in flight" flag,
   since concurrency is fixed at 1) — don't conflate them into one
   structure.
2. A naive `pending.sort(...)` before picking the next task works
   correctly but re-sorts the whole array on every dispatch; a binary
   heap (min/max-heap) gets you O(log k) insert and O(log k) extract-
   highest instead of O(k log k) per dispatch — mention this as the
   optimization even if you implement the simpler sorted-insert version
   first.
3. To keep ties FIFO despite a heap not naturally preserving insertion
   order for equal keys, attach a monotonically increasing `sequence`
   number to each enqueued item at insert time, and break priority ties
   by comparing `sequence` (lower sequence = enqueued earlier = wins the
   tie) instead of comparing priority alone.

## Algorithm

**Pattern:** a priority queue (binary heap keyed by `[priority,
sequence]`) driving a single-worker dispatch loop.
**Core insight:** every `enqueue` call does two things — wraps the
caller's `taskFn` in a promise-returning entry (recording `resolve`/
`reject` so the *caller's* promise can be settled once the task
actually runs) and pushes that entry into a max-heap ordered first by
`priority` (descending) and, for ties, by `sequence` (ascending, so
earlier enqueues win ties). A separate `isRunning` flag gates dispatch:
whenever the queue is idle and the heap is non-empty, it pops the
highest-priority entry, runs it, and — regardless of whether it
resolves or rejects — settles that entry's own promise and immediately
tries to dispatch the next highest-priority entry. This keeps exactly
one task in flight at a time while always honoring priority order among
whatever's currently waiting.
**Invariant:** whenever the queue transitions from busy to idle, if the
heap is non-empty, the next task started is always the one with the
highest `priority` (ties broken by earliest `sequence`) among every
task that had been enqueued and not yet started at that moment.

## Dry Run

**Input:**
```js
const queue = new AsyncPriorityQueue();
queue.enqueue(taskA, 3); // starts immediately — queue was idle
queue.enqueue(taskB, 5); // pending
queue.enqueue(taskC, 5); // pending
queue.enqueue(taskD, 8); // pending
```
(`taskA` takes 20ms; assume `taskB`/`taskC`/`taskD` are enqueued at
t=0, before `taskA` finishes.)

| Step | Event | Heap (pending, by priority) | isRunning | Action |
|---|---|---|---|---|
| 1 | `enqueue(taskA, 3)` at t=0 | `[]` | false → true | Queue was idle; `taskA` starts immediately, `isRunning = true` |
| 2 | `enqueue(taskB, 5)` at t=0 | `[B(5)]` | true | Queue busy; B just inserted into the heap, not started |
| 3 | `enqueue(taskC, 5)` at t=0 | `[B(5), C(5)]` | true | Inserted; ties with B, but B has an earlier sequence number |
| 4 | `enqueue(taskD, 8)` at t=0 | `[D(8), B(5), C(5)]` | true | Inserted; D has the highest priority of the three pending |
| 5 | `taskA` settles at t=20 | `[D(8), B(5), C(5)]` | true → pop D | Dispatch loop pops the max: D (priority 8) |
| 6 | `taskD` settles | `[B(5), C(5)]` | pop B | B and C tie at priority 5; B has the earlier sequence, so it's popped first |
| 7 | `taskB` settles | `[C(5)]` | pop C | Last one left |
| 8 | `taskC` settles | `[]` | idle | Queue drains to empty |

**Result:** actual run order is `A, D, B, C` — `A` ran first only
because it started before anything else was enqueued (concurrency 1);
among everything that was actually *pending* at once, priority (with
FIFO tie-breaking) fully determined the order.

## JavaScript Solution

```js
class AsyncPriorityQueue {
  #heap = [];        // binary max-heap of { taskFn, priority, sequence, resolve, reject }
  #isRunning = false;
  #nextSequence = 0;  // monotonically increasing, used to break priority ties FIFO

  enqueue(taskFn, priority) {
    return new Promise((resolve, reject) => {
      const entry = {
        taskFn,
        priority,
        sequence: this.#nextSequence++,
        resolve,
        reject,
      };
      this.#heapPush(entry);
      this.#dispatchNext();
    });
  }

  // Higher priority first; equal priority breaks ties by earlier sequence.
  #isHigherPriority(a, b) {
    if (a.priority !== b.priority) return a.priority > b.priority;
    return a.sequence < b.sequence;
  }

  #heapPush(entry) {
    this.#heap.push(entry);
    let index = this.#heap.length - 1;
    while (index > 0) {
      const parentIndex = (index - 1) >> 1;
      if (this.#isHigherPriority(this.#heap[index], this.#heap[parentIndex])) {
        [this.#heap[index], this.#heap[parentIndex]] =
          [this.#heap[parentIndex], this.#heap[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  #heapPopMax() {
    const top = this.#heap[0];
    const last = this.#heap.pop();
    if (this.#heap.length > 0) {
      this.#heap[0] = last;
      let index = 0;
      const size = this.#heap.length;
      while (true) {
        const left = index * 2 + 1;
        const right = index * 2 + 2;
        let largest = index;
        if (left < size && this.#isHigherPriority(this.#heap[left], this.#heap[largest])) {
          largest = left;
        }
        if (right < size && this.#isHigherPriority(this.#heap[right], this.#heap[largest])) {
          largest = right;
        }
        if (largest === index) break;
        [this.#heap[index], this.#heap[largest]] =
          [this.#heap[largest], this.#heap[index]];
        index = largest;
      }
    }
    return top;
  }

  #dispatchNext() {
    if (this.#isRunning || this.#heap.length === 0) {
      return; // either a task is already running, or nothing is pending
    }

    const entry = this.#heapPopMax();
    this.#isRunning = true;

    Promise.resolve()
      .then(() => entry.taskFn())
      .then(
        (value) => entry.resolve(value),
        (reason) => entry.reject(reason),
      )
      .finally(() => {
        this.#isRunning = false;
        this.#dispatchNext(); // pull the next-highest-priority pending task
      });
  }
}
```

## TypeScript Solution

```ts
interface QueueEntry<T> {
  taskFn: () => Promise<T>;
  priority: number;
  sequence: number;
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
}

class AsyncPriorityQueue {
  #heap: QueueEntry<unknown>[] = [];
  #isRunning = false;
  #nextSequence = 0;

  enqueue<T>(taskFn: () => Promise<T>, priority: number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const entry: QueueEntry<unknown> = {
        taskFn: taskFn as () => Promise<unknown>,
        priority,
        sequence: this.#nextSequence++,
        resolve: resolve as (value: unknown) => void,
        reject,
      };
      this.#heapPush(entry);
      this.#dispatchNext();
    });
  }

  #isHigherPriority(a: QueueEntry<unknown>, b: QueueEntry<unknown>): boolean {
    if (a.priority !== b.priority) return a.priority > b.priority;
    return a.sequence < b.sequence;
  }

  #heapPush(entry: QueueEntry<unknown>): void {
    this.#heap.push(entry);
    let index = this.#heap.length - 1;
    while (index > 0) {
      const parentIndex = (index - 1) >> 1;
      if (this.#isHigherPriority(this.#heap[index], this.#heap[parentIndex])) {
        [this.#heap[index], this.#heap[parentIndex]] =
          [this.#heap[parentIndex], this.#heap[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  #heapPopMax(): QueueEntry<unknown> {
    const top = this.#heap[0];
    const last = this.#heap.pop() as QueueEntry<unknown>;
    if (this.#heap.length > 0) {
      this.#heap[0] = last;
      let index = 0;
      const size = this.#heap.length;
      while (true) {
        const left = index * 2 + 1;
        const right = index * 2 + 2;
        let largest = index;
        if (left < size && this.#isHigherPriority(this.#heap[left], this.#heap[largest])) {
          largest = left;
        }
        if (right < size && this.#isHigherPriority(this.#heap[right], this.#heap[largest])) {
          largest = right;
        }
        if (largest === index) break;
        [this.#heap[index], this.#heap[largest]] =
          [this.#heap[largest], this.#heap[index]];
        index = largest;
      }
    }
    return top;
  }

  #dispatchNext(): void {
    if (this.#isRunning || this.#heap.length === 0) {
      return;
    }

    const entry = this.#heapPopMax();
    this.#isRunning = true;

    Promise.resolve()
      .then(() => entry.taskFn())
      .then(
        (value) => entry.resolve(value),
        (reason: unknown) => entry.reject(reason),
      )
      .finally(() => {
        this.#isRunning = false;
        this.#dispatchNext();
      });
  }
}
```

## Time Complexity

O(log k) per `enqueue`/dispatch, where k is the number of currently
pending tasks — both the heap push (sift-up) and pop-max (sift-down)
touch at most the height of the heap. Draining a full batch of n tasks
costs O(n log n) overall.

## Space Complexity

O(n) — the heap holds one entry per currently-pending task, each a
small fixed-size record; no additional structure grows with the number
of *completed* tasks.

## Common Mistakes

- Re-sorting the entire pending array on every dispatch (`pending.sort((a,
  b) => b.priority - a.priority)` then `.shift()`) instead of using a
  heap — functionally correct but O(k log k) per dispatch instead of
  O(log k), which matters once the queue gets deep.
- Comparing only `priority` and ignoring `sequence` for ties — makes tie
  order effectively arbitrary (depends on the sort/heap implementation's
  stability, which isn't guaranteed), breaking the FIFO-among-equal-
  priority requirement.
- Letting a rejected task stop the dispatch loop (e.g. not wrapping the
  `.finally` cleanup, or letting an uncaught rejection propagate out of
  `#dispatchNext`) — silently stalls the entire queue after the first
  failure, unlike a scheduler, which should keep draining.
- Forgetting that `enqueue` itself must be safe to call while a task is
  running (including recursively, from inside a task) — a design that
  assumes all tasks are enqueued before the queue starts running breaks
  the moment a task schedules follow-up work.
- Conflating "priority queue" with "concurrency limit" — this queue's
  concurrency is fixed at 1 by the problem statement; a natural but
  distinct follow-up is combining priority ordering with a concurrency
  limit greater than 1 (see follow-up questions).

## Interview Follow-up Questions

1. How would you extend this to support a concurrency limit greater
   than 1, so multiple high-priority tasks can run at once?
2. How would you support cancelling a still-pending (not yet started)
   task by some handle returned from `enqueue`?
3. Why is a binary heap the right structure here instead of, say, a
   sorted linked list or a balanced BST — what's the actual complexity
   trade-off?
4. How would you support dynamically changing a pending task's priority
   after it's already been enqueued (priority "promotion")?
5. How does this compare to Node.js's own internal task/microtask
   prioritization, or to browser scheduling APIs like
   `scheduler.postTask` with `priority` hints?

## Similar Questions

- [Implement an Async Task Runner with a Concurrency Limit](implement-async-task-runner-with-concurrency-limit.md)
- Implement a Min-Heap / Max-Heap class from scratch
- Implement a debounced job scheduler with cancellable pending jobs
- Implement `Promise.race` (Polyfill)

---
[← Back to 61-javascript-coding](README.md)
