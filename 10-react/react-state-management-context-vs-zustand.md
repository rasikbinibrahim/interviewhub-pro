# T1004 · React Context API vs Zustand / Redux for High-Frequency State

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Netflix, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** React  
**Concepts:** react, state-management, context-api, zustand, redux, re-renders  

## Question

Why is the native React Context API unsuitable for high-frequency global state updates (e.g. mouse position, input fields, active web socket streams), and how do atomic/external state management libraries like Zustand or Redux Toolkit prevent unnecessary component re-renders using selector subscriptions?

## Expected Answer

1. **React Context Limitation**: When a Context provider's `value` changes, **EVERY component consuming that context via `useContext(Context)` is forced to re-render**, regardless of whether the component uses the specific slice of state that updated. Context is a dependency injection system, not a fine-grained state subscription engine.
2. **External Selector Architecture (Zustand)**: Stores state outside the React component tree using a mutable JS store with pub/sub listener arrays.
3. **Selective Subscriptions**: Components subscribe to specific state slices via selector functions `const name = useStore(state => state.name)`. Components only re-render when their selected slice fails an `Object.is()` or custom equality check.

## Deep Explanation

### Component Re-render Comparison

```
React Context Update (ThemeContext updated)
Provider (value={theme, user})
  ├── Component A (uses theme) ---> Re-renders
  └── Component B (uses user)  ---> Re-renders (Unnecessary CPU work!)

Zustand Store Update (state.theme updated)
External Store { theme, user }
  ├── Component A (selects state.theme) ---> Re-renders
  └── Component B (selects state.user)  ---> NO Re-render! (Subscription skipped)
```

## Production Example

```jsx
import { create } from 'zustand';

// 1. External Zustand Store Definition
export const useUserStore = create((set) => ({
  user: { name: 'Alice', email: 'alice@example.com' },
  theme: 'dark',
  notifications: 5,
  updateName: (newName) =>
    set((state) => ({ user: { ...state.user, name: newName } })),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}));

// 2. Component A: Only subscribes to `theme`
export function ThemeToggle() {
  const theme = useUserStore((state) => state.theme);
  const toggleTheme = useUserStore((state) => state.toggleTheme);

  console.log('ThemeToggle Rendered');
  return <button onClick={toggleTheme}>Current Theme: {theme}</button>;
}

// 3. Component B: Only subscribes to `notifications`
// When `toggleTheme` is clicked, ThemeToggle re-renders, but NotificationBadge DOES NOT re-render!
export function NotificationBadge() {
  const notifications = useUserStore((state) => state.notifications);

  console.log('NotificationBadge Rendered');
  return <span className="badge">{notifications}</span>;
}
```

## Best Practices

- Use React Context for low-frequency, top-level static data (e.g. Current Locale, Theme Mode, Auth User identity).
- Use Zustand / Redux Toolkit / Jotai for dynamic, high-frequency, or complex multi-step application state.

## Common Mistakes

- Destructuring the entire Zustand store `const { user, theme } = useUserStore()` instead of using individual selector callbacks `useUserStore(s => s.user)`, disabling selector re-render optimizations.

## Follow-up Questions

1. How does `useSyncExternalStore` (React 18) eliminate tearing in concurrent rendering when subscribing to external stores?
2. What are the key differences between atomic state models (Jotai/Recoil) vs flux state models (Redux/Zustand)?

## Related Topics

- React Fiber Architecture & Diffing Algorithm
- Redux Toolkit & RTK Query Architecture
