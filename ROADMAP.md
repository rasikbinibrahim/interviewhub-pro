# Roadmap

A sequenced study path through this repo's content, not just a category
list — each phase states *why it comes where it does* and which existing
section to go to. For the status of what's actually written yet (as
opposed to what order to study it in), see [PROGRESS.md](PROGRESS.md).

## How to use this file

Pick your starting phase based on experience, not just "start at Phase
1" — a 7+ YOE candidate refreshing for interviews should start at Phase
3 or 4 and only dip into Phase 1/2 for specific gaps, not work through
Programming Fundamentals from scratch.

| Your level | Start at |
|---|---|
| 0-2 YOE, early career | Phase 1 |
| 3-5 YOE | Phase 2, with Phase 1 as a gap-check |
| 5-7 YOE (Senior) | Phase 3, referencing back into Phase 2 for specific weak topics |
| 7-10+ YOE, Staff | Phase 4, with Phase 3's Staff-level discussion sections as the main study material |
| Principal | Phase 4's system design + the Principal-level discussion section of every topic you touch |

## Phase 1 — Programming Fundamentals & Logic

**Why first:** every later phase assumes you can translate a problem
into working code without the *language* being the obstacle. This phase
is language-agnostic reasoning: given a problem, can you decompose it.

- Logic Building
- Math (for coding interviews specifically — modular arithmetic, GCD/LCM,
  prime sieve, combinatorics basics)
- Patterns (recognizing "this is a two-pointer problem" before knowing
  what a two-pointer is *called*)

→ [01-programming-fundamentals](01-programming-fundamentals)

## Phase 2 — Data Structures & Algorithms

**Why second:** DSA is the shared vocabulary every later phase (React
performance discussions, system design, even some browser-internals
questions) assumes you already have. Study in this order — each builds
on the previous:

0. Logic Building, Math, Patterns — the language-agnostic problem-solving
   habits everything below assumes (see also
   [01-programming-fundamentals](01-programming-fundamentals))
1. Arrays, Strings, Matrix — the data structures almost everything else
   is built from
2. Two Pointers, Sliding Window, Prefix Sum — the first tier of array/
   string *techniques*, not data structures — they turn an O(n²) scan
   into O(n) by exploiting structure in the input, not by adding a new
   data structure
3. Hashing — the single highest-leverage general technique for turning
   O(n²) into O(n)
4. Recursion — required before Trees, Backtracking, or DP make sense
5. Searching, Sorting, Binary Search — including "binary search on the
   answer," not just classic array search
6. Linked List, Stack, Queue, Deque, Monotonic Stack, Monotonic Queue —
   the foundational linear structures, plus the monotonic variants that
   solve a specific recurring "next greater/smaller element" shape of
   problem
7. Heap — priority-based problems
8. Binary Tree, Binary Search Tree, Trie — hierarchical structures
9. Graph, Topological Sort, Shortest Path, Minimum Spanning Tree — graph
   traversal first, then the classic named algorithms built on top of it
10. Greedy, Backtracking — algorithmic strategies, not data structures
11. Dynamic Programming, then Advanced DP — hardest for most candidates;
    deliberately placed after Recursion + Greedy so the "why not greedy"
    contrast is available; Advanced DP (bitmask DP, digit DP, DP on
    trees/graphs) only after standard DP is genuinely solid
12. Bit Manipulation — narrow but high-frequency-when-relevant
13. Segment Tree, Fenwick Tree, Union Find (Disjoint Set) — advanced
    structures, genuinely optional below Staff level; include only if
    targeting companies known for a harder DSA bar
14. Game Theory, Competitive Programming — capstone/mixed categories that
    combine techniques from everything above; last on purpose, not a
    beginner starting point despite sometimes being asked early at
    companies with a very DSA-heavy bar

→ [65-dsa](65-dsa)

## Phase 3 — Frontend Language & Framework Depth

**Why third:** this is where "can code" becomes "can do this job" — the
actual frontend-specific knowledge every real interview loop tests
alongside DSA.

1. **JavaScript** — fundamentals first, then advanced (closures,
   prototypes, event loop, async internals, meta-programming) →
   [02-javascript-fundamentals](02-javascript-fundamentals),
   [03-advanced-javascript](03-advanced-javascript)
2. **TypeScript** — after JS is solid, not in parallel; TS's value only
   clicks once you already know what JS is doing underneath →
   [04-typescript](04-typescript)
3. **React** — core model, then hooks, then patterns, then performance,
   then internals (Fiber, concurrent rendering) — in that order →
   [10-react](10-react) through [14-react-internals](14-react-internals)
4. **Redux / Redux Toolkit** — after React state is solid; Redux only
   makes sense once you've felt the pain it solves →
   [16-redux](16-redux), [17-redux-toolkit](17-redux-toolkit)
5. **React Native** — after web React is solid, since it assumes the
   same mental model plus platform-specific deltas →
   [23-react-native](23-react-native)
6. **Browser Internals** — can be studied in parallel with any of the
   above; it's foundational context, not a dependency chain →
   [05-browser-internals](05-browser-internals)

## Phase 4 — Applied Interview Practice

**Why last:** this phase assumes Phases 1-3 are solid and shifts from
"do I know this" to "can I perform this under interview conditions."

1. **Frontend Technical Questions** — the non-coding "explain X" round
   → [each language/framework section's own technical questions]
2. **Frontend System Design** → [60-frontend-system-design](60-frontend-system-design)
3. **Machine Coding** → [59-machine-coding](59-machine-coding)
4. **Company-wise Questions** — once general prep is solid, narrow to
   your actual target companies' known patterns →
   [85-company-wise-questions](85-company-wise-questions)
5. **Mock Interviews** — the final rehearsal step, timed, under real
   conditions → [79-mock-interviews](79-mock-interviews), generated via
   [docs/prompts/mock-interview-generator.md](docs/prompts/mock-interview-generator.md)

## Revision loop

Once through all four phases, this repo isn't meant to be read start to
finish again — use [83-cheat-sheets](83-cheat-sheets) and
[84-revision-notes](84-revision-notes) for spaced repetition, and
Revision mode (bookmarked + "revision needed"-tagged questions) for
targeted review of specific weak spots, not a full re-read.

---
[← Back to root index](README.md)
