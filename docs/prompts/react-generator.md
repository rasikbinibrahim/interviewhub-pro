# React Generator

**Purpose:** generate React coding questions and solutions (component
implementation, hooks, patterns) matching the Coding Question Template.

## Required inputs

- Topic (e.g. "custom hook — useDebounce", "compound component — Tabs",
  "list virtualization from scratch")
- Target difficulty

## Rules

- **Function components + hooks only** — no class-component solutions
  unless the question is specifically about lifecycle methods'
  historical behavior or migrating class → hooks.
- **No unnecessary dependencies.** A question testing "build a debounced
  input" should not solve it by importing lodash's `debounce` — that's
  exactly the "avoid unnecessary built-ins" rule, applied to the React
  ecosystem: implement the actual hook logic (`useRef` for the timer,
  `useEffect` cleanup) so the mechanism is visible.
- **Correct dependency arrays.** Every `useEffect`/`useMemo`/`useCallback`
  in a generated solution must have a dependency array that's actually
  correct — if omitting a dependency is intentional (a documented,
  narrow exception), say so explicitly; never silently omit one to make
  an example look cleaner.
- **State the re-render implications.** Every solution involving state
  should note what triggers a re-render and what doesn't — this is a
  standing interview expectation for React questions, not an optional
  extra.
- **Accessibility isn't optional** for component-implementation
  questions (a custom `Tabs`, `Modal`, `Autocomplete`, etc.) — keyboard
  interaction and ARIA attributes are part of a *correct* solution, not
  a bonus round.

## Question categories this covers

- Custom hooks (useDebounce, useThrottle, useLocalStorage, useFetch,
  usePrevious, useIntersectionObserver, etc.)
- Compound components (Tabs, Accordion, Select)
- Render props / headless component patterns
- Performance questions (memoization boundaries, virtualization,
  avoiding unnecessary re-renders)
- Context-based state sharing vs. prop drilling trade-offs
- Suspense/error boundary usage

## Output

Follow [coding-question-generator.md](coding-question-generator.md)'s
full template. React questions specifically should include, inside the
Algorithm section, an explicit note on **why this needs to be a hook /
component pattern** rather than plain JS — i.e. what about React's
render model makes the naive imperative approach wrong (e.g. manually
mutating the DOM instead of letting React reconcile it).
