# Technical Question Template

The canonical, authoritative field list for every technical (non-coding)
question in this repo. [docs/prompts/technical-question-generator.md](docs/prompts/technical-question-generator.md)
generates questions against this exact template — if the two ever
disagree, this file wins and the prompt file should be corrected.

Use this for concept/architecture questions ("explain React Fiber," "how
does HTTP caching work"). Use [QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md)
instead for algorithmic coding problems — the two content types stay in
separate sections of the repo and are never mixed in one file (see
[CLAUDE.md](CLAUDE.md#ai-generation-rules)).

## Fields, in required order

| # | Field | Notes |
|---|---|---|
| 1 | Question | Phrased the way an interviewer would actually ask it |
| 2 | Difficulty | Easy / Medium / Hard |
| 3 | Experience Level | The YOE/level this version of the question targets (a "explain Fiber" question is asked very differently at 3 YOE vs. Staff) |
| 4 | Companies | From [CLAUDE.md's Company Tags](CLAUDE.md#company-tags) — same no-fabrication rule as coding questions |
| 5 | Interview Frequency | ★☆☆☆☆–★★★★★ |
| 6 | Expected Answer | A tight, correct 60-90 second verbal answer |
| 7 | Deep Explanation | The full mechanism behind the expected answer |
| 8 | Production Example | How this shows up at real scale — a bug class, an architecture decision, an incident |
| 9 | Best Practices | Specific, reasoned — not generic advice |
| 10 | Trade-offs | Every real choice has a cost; state it |
| 11 | Common Mistakes | The actual wrong answer candidates give for this question |
| 12 | Follow-up Questions | 3-5, the probing questions an interviewer asks next |
| 13 | Related Topics | Links to related technical questions/topic pages in this repo |

## Worked example

````markdown
### Explain React Fiber

**Difficulty:** Medium
**Experience Level:** Senior (5-7 YOE) — at Staff level, this question
extends into concurrent rendering trade-offs and the React Compiler; see
the Related Topics note below.
**Companies:** Google, Meta, Microsoft
**Interview Frequency:** ★★★★☆

#### Expected Answer
Fiber is React's internal reconciliation engine, introduced in React 16,
that represents each component instance as a linked-list-like tree of
"fiber" units of work. Unlike the pre-Fiber stack reconciler — which
recursed synchronously through the whole tree and couldn't be paused —
Fiber's architecture lets React break rendering into small units of work
that can be paused, resumed, aborted, or prioritized, which is what
makes concurrent features (like `useTransition`, Suspense, and
time-slicing) possible.

#### Deep Explanation
Each Fiber node corresponds to a component instance (or a host DOM node)
and holds: the component's type and props, its state, pointers to its
`child`, `sibling`, and `return` (parent) fibers, and an "effect" list
describing what DOM work needs to happen. Because fibers form an
explicit data structure (not implicit call-stack frames), React can walk
this tree incrementally — processing one fiber, yielding control back to
the browser to check if there's higher-priority work (like handling a
keystroke), and resuming later from where it left off. This is the
"work loop" — render work happens in an interruptible loop rather than a
single uninterruptible synchronous pass.

Rendering happens in two phases: the **render phase** (building the new
fiber tree, interruptible, can be thrown away without visible effect)
and the **commit phase** (applying the computed changes to the real DOM,
synchronous and never interrupted, since a half-applied DOM update would
be visibly broken).

#### Production Example
Fiber's interruptibility is why a large, expensive re-render (e.g. a
big data-table update) no longer blocks a user's typing in an unrelated
input on the same page when `useTransition`/`startTransition` is used to
mark that update as lower-priority — the render phase for the table can
be paused while React handles the higher-priority keystroke, then
resumed. Under the pre-Fiber stack reconciler, this kind of interruption
was architecturally impossible.

#### Best Practices
- Understand the render/commit split when reasoning about side effects:
  code that must run exactly once per real DOM commit belongs in
  `useEffect`/`useLayoutEffect`, not in the render body, because the
  render phase itself may run more than once per commit (or be thrown
  away) under concurrent rendering.
- Use `useTransition`/`startTransition` to explicitly mark updates that
  are safe to deprioritize, rather than assuming React will always
  guess correctly which updates are urgent.

#### Trade-offs
Fiber's incremental architecture adds real engine complexity (a
persistent, mutable-ish tree structure with double-buffering between
"current" and "work-in-progress" trees) in exchange for interruptibility
— a trade-off React's team made explicitly to unlock features that were
otherwise architecturally impossible, at real implementation cost that
shows up if you're debugging React internals directly (rare for app
developers, common for library authors integrating deeply with React's
scheduler).

#### Common Mistakes
- Describing Fiber as "just a rewrite of the diffing algorithm" — the
  diffing heuristics themselves (keys, element type comparison) didn't
  fundamentally change; what changed is the *execution model* around
  that diffing.
- Confusing the render phase with the commit phase, e.g. claiming DOM
  mutations can be interrupted (they can't — only the render phase can).

#### Follow-up Questions
1. Why must the commit phase be synchronous while the render phase
   isn't?
2. What problem does `useTransition` solve that plain `setState` doesn't?
3. How does Fiber's double-buffered tree (`current` vs. `work-in-
   progress`) relate to how React recovers cleanly if a render is
   aborted?

#### Related Topics
- React Concurrent Rendering (Staff-level extension of this question)
- React Compiler
- Suspense and streaming SSR
````

---
[← Back to root index](README.md)
