# T1028 · React Context API Performance: Context Splitting & Memoization

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Netflix  
**Category:** React  
**Concepts:** react, context-api, performance, context-splitting  

## Question

Why does updating a React Context value force ALL consuming components to re-render regardless of whether they consume the updated property, and how do **Context Splitting** and `useMemo()` prevent performance degradation?

```jsx
// Context Splitting Strategy: Separate State and Dispatch Contexts!
const StateContext = createContext();
const DispatchContext = createContext();

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
```
