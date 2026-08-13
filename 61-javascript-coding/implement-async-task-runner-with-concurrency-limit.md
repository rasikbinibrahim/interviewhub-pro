# QADVJS051 · Implement an Async Task Runner with a Concurrency Limit

**Difficulty:** Hard
**Companies Asked:** Google, Meta, Amazon, Uber, Stripe
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Promises / Async Control Flow
**Concepts:** promise pool, concurrency limiting, order preservation under out-of-order completion, worker-loop scheduling

## Problem Statement

Implement `runWithConcurrencyLimit(taskFns, limit)`. Given an array of
"task functions" — each one a zero-argument function that, when called,
*starts* an async operation and returns a `Promise` — and a `limit`
(the maximum number of tasks allowed to be in flight at once), run every
task to completion while never letting more than `limit` run
concurrently. Return a single `Promise` that resolves with an array of
every task's result, **in the same order as the input array**, not in
the order the tasks happen to finish. This is the classic "promise
pool" problem, and the ordering requirement — results must land at
their original index even though tasks race and finish out of order —
is the part candidates most often get wrong.

## Input

- `taskFns`: an array of length `n`, where each element is a function
  `() => Promise<T>` (calling it starts the async work; it must not
  already be "started" before being called — that's what lets the
  runner control *when* each task begins).
- `limit`: a positive integer, the maximum number of task functions
  that may be running (i.e., have been called but not yet settled) at
  the same time.

## Output

A single `Promise<T[]>` that resolves with an array of length `n`,
where `results[i]` is the resolved value of `taskFns[i]()` — in input
order — once every task has completed successfully. If any task
rejects, the returned promise rejects with that reason (fail-fast,
matching `Promise.all`'s contract, since this runner is effectively a
concurrency-bounded `Promise.all`).

## Constraints

- `1 <= limit <= n` (if `limit >= n`, every task simply starts
  immediately — the runner should still behave correctly, just with no
  effective throttling).
- Never more than `limit` task functions may be *running* at once, at
  any point in time.
- Results must be returned in original input order, regardless of
  completion order.
- Must not call the real `Promise.all` on the full unthrottled task
  list (that would start everything immediately, defeating the point).
- A rejection from any task should cause the overall promise to reject;
  in-flight tasks are allowed to keep running to completion in the
  background (their results are simply not needed), but no *new* task
  should be started after a rejection has already been observed.

## Examples

| Input | Behavior | Why |
|---|---|---|
| `taskFns = [fetchA, fetchB, fetchC, fetchD, fetchE]`, `limit = 2` | At most 2 of the 5 fetches are in flight at any instant; as each finishes, the next queued one starts | Demonstrates the pool draining — a finished slot is immediately refilled from the remaining queue |
| Each task resolves after a different delay (`30ms`, `10ms`, `20ms`), `limit = 3` | Resolves to `[resultA, resultB, resultC]` in that order, even though B (10ms) and C (20ms) both finish before A (30ms) | Order preservation: index in the result array is fixed by input position, not by settlement time |
| `taskFns = [ok, failing, ok2]`, `limit = 1` | Rejects with `failing`'s rejection reason as soon as it settles; `ok2` never starts (still queued when the rejection is observed) | Fail-fast — once a rejection is seen, no further *new* tasks should be dispatched from the queue |

## Edge Cases

- `limit >= taskFns.length` → every task starts immediately, behaving
  like a plain `Promise.all(taskFns.map(fn => fn()))`.
- `taskFns.length === 0` → resolves immediately with `[]`, no workers
  ever spun up.
- `limit = 1` → tasks effectively run one at a time, sequentially (but
  still asynchronously) — a useful sanity check, since it degenerates
  to a simple queue.
- A task function throws *synchronously* (not returning a rejected
  promise, but throwing before returning anything) → must be caught and
  treated as a rejection, not allowed to crash the whole runner.
- All tasks reject → the runner rejects with whichever rejection is
  observed first; it should not wait for the rest.

## Hints

1. Don't think of this as "batches of `limit` tasks running together
   and waiting for the whole batch" (that under-utilizes the pool,
   since a batch is only as fast as its slowest member) — think of it
   as `limit` independent *workers*, each pulling the next task off a
   shared queue as soon as it finishes its current one.
2. You need a shared, mutable "next index to run" cursor (e.g. a
   `nextIndex` counter) that every worker reads from and increments —
   this is what lets `limit` concurrently-running workers coordinate
   without duplicating or skipping tasks, since JavaScript's
   single-threaded execution means incrementing a shared counter
   between `await` points is safe from race conditions.
3. Each result must be written to `results[taskFns.indexOf(...)]` — but
   since the same function could theoretically appear twice, capture
   the index at the moment a worker *claims* a task (`const index =
   nextIndex++`), not by searching for it afterward.

## Algorithm

**Pattern:** a fixed pool of `limit` async "worker" loops sharing one
cursor into the task list.
**Core insight:** rather than launching all `n` tasks and limiting how
many complete concurrently (impossible to control after the fact, since
once a promise is created its work has already started), the runner
must control *when each task function is called* — i.e., gate task
*creation*, not task completion. Spinning up exactly `limit` worker
loops, each of which repeatedly claims the next unclaimed index and
awaits that task before claiming another, guarantees at most `limit`
tasks are ever in flight, because there are only `limit` workers and
each worker only ever has one task in flight at a time. Order is
preserved the same way as in `Promise.all`: every worker writes its
result to `results[claimedIndex]`, a fixed slot determined by input
position, never by completion order.
**Invariant:** at any moment, the number of tasks currently running
equals the number of workers currently awaiting a task, which is capped
at `min(limit, n)`; `results[i]` is filled exactly once, by whichever
worker happens to claim index `i`.

## Dry Run

**Input:** `taskFns = [A, B, C, D]` where A takes 40ms, B takes 10ms, C
takes 20ms, D takes 10ms; `limit = 2`.

| Real time | Event | Worker 1 | Worker 2 | results |
|---|---|---|---|---|
| t=0 | Runner starts 2 workers; `nextIndex = 0` | claims index 0 (A), starts A (40ms) | claims index 1 (B), starts B (10ms) | `[empty, empty, empty, empty]` |
| t=10 | B finishes | still running A | writes `results[1]`, claims index 2 (C), starts C (20ms) | `[empty, B, empty, empty]` |
| t=30 | C finishes | still running A | writes `results[2]`, claims index 3 (D), starts D (10ms) | `[empty, B, C, empty]` |
| t=40 | A finishes, D finishes | writes `results[0]`, no more indices left, worker 1 exits | writes `results[3]`, no more indices left, worker 2 exits | `[A, B, C, D]` |
| t=40 | Both workers done → outer promise resolves | — | — | `[A, B, C, D]` |

**Result:** resolves to `[A, B, C, D]` — input order preserved even
though the real completion order was B, C, then A and D together. At no
point were more than 2 tasks running simultaneously.

## JavaScript Solution

```js
function runWithConcurrencyLimit(taskFns, limit) {
  return new Promise((resolve, reject) => {
    const n = taskFns.length;

    if (n === 0) {
      resolve([]);
      return;
    }

    const results = new Array(n);
    let nextIndex = 0;      // shared cursor: the next task index to claim
    let completedCount = 0;
    let hasRejected = false; // stop dispatching new tasks after a failure

    // Each "worker" repeatedly claims the next index and runs that
    // task, until the queue is empty. Starting exactly `limit` of
    // these workers is what caps concurrency at `limit`.
    function startWorker() {
      if (nextIndex >= n || hasRejected) {
        return Promise.resolve();
      }

      const currentIndex = nextIndex; // claim this index for this worker
      nextIndex += 1;

      return Promise.resolve()
        .then(() => taskFns[currentIndex]()) // catches synchronous throws too
        .then((value) => {
          results[currentIndex] = value; // fixed slot, not push
          completedCount += 1;

          if (completedCount === n) {
            resolve(results);
          }

          if (!hasRejected) {
            return startWorker(); // pull the next queued task into this slot
          }
        })
        .catch((reason) => {
          if (!hasRejected) {
            hasRejected = true;
            reject(reason); // fail-fast, mirrors Promise.all
          }
        });
    }

    const workerCount = Math.min(limit, n);
    const workers = [];
    for (let i = 0; i < workerCount; i += 1) {
      workers.push(startWorker());
    }
  });
}
```

## TypeScript Solution

```ts
function runWithConcurrencyLimit<T>(
  taskFns: Array<() => Promise<T>>,
  limit: number,
): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    const n = taskFns.length;

    if (n === 0) {
      resolve([]);
      return;
    }

    const results: T[] = new Array(n);
    let nextIndex = 0;
    let completedCount = 0;
    let hasRejected = false;

    function startWorker(): Promise<void> {
      if (nextIndex >= n || hasRejected) {
        return Promise.resolve();
      }

      const currentIndex = nextIndex;
      nextIndex += 1;

      return Promise.resolve()
        .then(() => taskFns[currentIndex]())
        .then((value) => {
          results[currentIndex] = value;
          completedCount += 1;

          if (completedCount === n) {
            resolve(results);
          }

          if (!hasRejected) {
            return startWorker();
          }
        })
        .catch((reason: unknown) => {
          if (!hasRejected) {
            hasRejected = true;
            reject(reason);
          }
        });
    }

    const workerCount = Math.min(limit, n);
    for (let i = 0; i < workerCount; i += 1) {
      void startWorker();
    }
  });
}
```

## Time Complexity

O(n) — every task function is called exactly once across all workers,
and each settlement does O(1) bookkeeping (an index write and a
counter increment); total work is linear in the number of tasks,
independent of `limit`.

## Space Complexity

O(n) — the `results` array holds one slot per task; the worker pool
itself only holds `O(limit)` in-flight promise chains at once, which is
dominated by O(n) for any realistic `limit <= n`.

## Common Mistakes

- Splitting `taskFns` into fixed-size *batches* of `limit` and awaiting
  each batch with `Promise.all` before starting the next — this works
  functionally but wastes concurrency: a batch only advances once its
  *slowest* member finishes, so a single slow task in an otherwise-fast
  batch stalls newly-available capacity that could have already started
  the next task.
- Calling every `taskFns[i]()` up front and only *awaiting* them with
  limited concurrency — this doesn't work at all, since calling the
  function is what starts the async operation; by the time you "limit"
  anything, all `n` tasks are already running.
- Pushing results in completion order instead of writing to a fixed
  `results[currentIndex]` slot — silently produces output in the wrong
  order the moment two tasks complete out of sequence.
- Forgetting to wrap the task call in something that catches a
  *synchronous* throw (e.g. `Promise.resolve().then(() => taskFns[i]())`
  instead of directly calling `taskFns[i]()` outside a promise chain) —
  a task that throws synchronously instead of returning a rejected
  promise would otherwise crash out of the worker loop instead of being
  reported as a normal rejection.
- Continuing to dispatch new tasks from the queue after a rejection has
  already been observed — wastes work and can make behavior
  nondeterministic across runs, since it's no longer purely fail-fast.

## Interview Follow-up Questions

1. How would you change this so a slow/hung task can be cancelled via
   an `AbortSignal`, freeing up its worker slot without waiting for it?
2. How would you support dynamically changing the concurrency `limit`
   while tasks are already in flight?
3. How would you report *progress* (e.g. "7 of 20 done") to a caller as
   tasks complete, rather than only resolving once at the very end?
4. How does this differ from implementing `Promise.allSettled` with a
   concurrency limit — what would need to change so that one rejected
   task doesn't abort the whole run?
5. How would you adapt this into a reusable `PromisePool` class that
   lets callers `add()` new tasks after the pool has already started
   draining, rather than requiring the full task list up front?

## Similar Questions

- [Implement Promise.all (Polyfill)](promise-all-polyfill.md) — same
  order-preservation trick, without the concurrency cap
- [Implement an Async Priority Queue](implement-async-priority-queue.md)
- [Implement Promise.allSettled (Polyfill)](implement-promise-allsettled-polyfill.md)
- Implement a rate limiter (token bucket) for outbound API calls

---
[← Back to 61-javascript-coding](README.md)
