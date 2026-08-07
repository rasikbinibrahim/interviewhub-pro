# Redux Generator

**Purpose:** generate Redux/Redux Toolkit coding questions and solutions
matching the Coding Question Template.

## Required inputs

- Topic (e.g. "write a normalized entity reducer", "implement a custom
  middleware — logger", "implement optimistic update with rollback")
- Target difficulty

## Rules

- **Default to Redux Toolkit** (`createSlice`, `createAsyncThunk`,
  `createEntityAdapter`) unless the question is specifically testing
  understanding of raw Redux internals (writing a reducer/store from
  scratch, implementing `combineReducers` or `applyMiddleware` by hand)
  — in that case, say explicitly that this is testing internals, not
  idiomatic day-to-day Redux usage.
- **Reducers must be pure.** Any generated reducer that mutates state
  directly (outside of RTK's Immer-powered `createSlice`, where
  "mutation" is safe by design) is a bug, and should be flagged as a
  Common Mistake if shown as a wrong example.
- **Normalize relational data.** Questions involving lists of entities
  with relationships should default to normalized state shape (`{ ids:
  [], entities: {} }`) rather than nested arrays, and the solution should
  explain why (O(1) lookup/update vs. O(n) array scans).
- **Selectors should be memoized** (`createSelector`) when they derive
  computed data from state, with an explanation of why unmemoized
  selectors cause unnecessary re-renders in connected components.
- **Async logic** (thunks, `createAsyncThunk`) must handle all three
  states — pending, fulfilled, rejected — explicitly; a solution that
  only handles the happy path is incomplete per the Repository Rules.

## Question categories this covers

- Slice design and normalization
- Custom middleware (logging, analytics, auth token refresh)
- `createAsyncThunk` with proper pending/fulfilled/rejected handling
- Optimistic updates with rollback on failure
- Memoized selectors (`createSelector`) and their performance rationale
- Implementing core Redux primitives from scratch (`createStore`,
  `combineReducers`) for internals-focused questions

## Output

Follow [coding-question-generator.md](coding-question-generator.md)'s
full template. Include, inside Common Mistakes, at least one mistake
specific to Redux's mental model (e.g. mutating state directly in a
plain reducer, forgetting to handle the rejected case of a thunk, an
unmemoized selector causing cascading re-renders).
