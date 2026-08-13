# QJS324 · Currying and Partial Application Utility Design

**Difficulty:** Medium  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Google, Meta, Uber  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** Currying, Partial application, Arity, Closure retention

## Expected Answer

Currying transforms a function that takes N arguments into a sequence of unary (single-argument) functions — each call returns a new function until all N arguments have been collected, at which point the original function runs. Partial application is the more general technique of fixing some of a function's arguments up front, producing a new function that takes only the remaining ones; it doesn't have to happen one argument at a time, and the result isn't required to be a chain of unary functions. Curried functions are a special case of partial application where exactly one argument is fixed per call, using closures to remember the arguments collected so far until the full arity is satisfied.

## Deep Explanation

Both techniques rely on closures: each intermediate function returned during currying or partial application closes over the arguments already supplied, keeping them alive in scope until the final call actually invokes the original function with the complete argument list. A generic `curry()` utility typically inspects the target function's declared arity (`fn.length`) to know how many arguments to wait for before invoking it, accumulating arguments across calls until that count is reached. Partial application, by contrast, is usually expressed directly — `fn.bind(null, arg1, arg2)` is partial application (fixing `arg1`/`arg2`, returning a function awaiting the rest), not currying, because it doesn't force one-argument-at-a-time calls and doesn't need to know the function's full arity ahead of time. The distinction matters in interviews specifically because candidates often use the two terms interchangeably when they are related but not the same technique.

## Production Example

Redux middleware is written in curried form: `store => next => action => { ... }` — three chained unary functions — specifically so `applyMiddleware` can supply `store` first (when the store is created), `next` second (when middleware is composed), and `action` last (on every dispatch), without the three call sites needing to know about each other's timing. React-Redux's `connect(mapStateToProps)(Component)` is the same pattern in a two-step form. Partial application shows up as configuration injection: a logging utility curried/partially applied with a fixed prefix (`createLogger('[API]')`) or an HTTP client partially applied with a base URL, so call sites downstream only supply the parts that vary per call instead of repeating the fixed configuration everywhere.

## Best Practices

- Reach for currying when an API is genuinely used in a partially-applied, staged way across different parts of a codebase (middleware signatures, composable configuration) — not as a default style for every function.
- Reach for partial application (`bind`, or a dedicated `partial()` helper) when you just need to fix some arguments once and reuse the rest — it's simpler and doesn't force single-argument chaining.
- Avoid curry-by-default on simple two-argument utility functions; the extra indirection isn't worth it unless the staged-call shape is actually exploited somewhere.

## Trade-offs

Currying adds one function-call layer per argument, which is a real (if usually small) cost in a hot loop, and produces many small intermediate closures that make stack traces and debugger step-throughs harder to follow than a direct call. In exchange, it composes cleanly with `pipe`/`compose` utilities, since every curried function becomes a single-argument transformer that can be chained. Partial application gets most of the reuse benefit (fixing known arguments once) without paying the full multi-step indirection cost when the staged, one-at-a-time call pattern isn't actually needed.

## Common Mistakes

- Treating "curry" and "partial application" as synonyms in an interview answer, rather than naming the actual distinction (arity-driven, one-at-a-time chaining vs. general argument-fixing).
- Assuming ordinary JavaScript functions are curried by default — they are not; currying is an opt-in transformation applied via a utility or manual implementation.
- Implementing a curry utility that relies on `fn.length` without accounting for default parameters or rest parameters, both of which are excluded from `fn.length` and silently break arity detection.

## Follow-up Questions

1. How would you implement a `curry()` utility that handles variable arity and works correctly with rest parameters?
2. What's the actual difference between `curry(add)(1)(2)(3)` and `add.bind(null, 1, 2)`?
3. Why does relying on `Function.prototype.length` break for functions with default or rest parameters?
4. How does currying interact with function composition utilities like `pipe`/`compose`?
5. Give a concrete example where currying makes a codebase harder to debug in production.

## Related Topics

- Closures and lexical scope (02-javascript-fundamentals)
- Redux middleware architecture (63-react-coding)
- Higher-order functions and function composition
