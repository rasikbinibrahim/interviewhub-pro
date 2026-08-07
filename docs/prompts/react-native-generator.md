# React Native Generator

**Purpose:** generate React Native coding questions and solutions
matching the Coding Question Template.

## Required inputs

- Topic (e.g. "implement a FlatList with pull-to-refresh and pagination",
  "build a custom native-feeling gesture with Reanimated", "offline-first
  data sync")
- Target difficulty

## Rules

- **Distinguish platform-agnostic RN code from platform-specific code
  explicitly** — if a solution needs `Platform.OS` branching or separate
  `.ios.tsx`/`.android.tsx` files, say so and explain why the behavior
  genuinely differs per platform, not just as a formality.
- **Performance-aware by default** — list rendering must use
  `FlatList`/`FlashList` with correct `keyExtractor`, and avoid inline
  function/object props that defeat `React.memo` on list items, exactly
  as in [react-generator.md](react-generator.md) but with the added RN-
  specific cost: re-renders on a list of native views are more expensive
  than web DOM diffing, so this matters even more here.
- **Native module boundaries are explicit.** If a solution needs
  something outside pure JS (camera, biometrics, background tasks),
  name the specific native capability and note that it requires a native
  module / config plugin (for Expo) — never hand-wave a native
  capability as if it's just a JS API call.
- **Offline/network-aware questions must handle all three states**:
  online, offline, and the transition between them (queued writes,
  conflict resolution) — a solution that only works "while online" is
  incomplete for this category.

## Question categories this covers

- List performance (FlatList/FlashList, `getItemLayout`, windowing)
- Gestures and animations (Reanimated, Gesture Handler)
- Navigation patterns (React Navigation — deep linking, nested
  navigators, auth flow gating)
- Native module integration boundaries
- Offline storage and sync (AsyncStorage/MMKV, optimistic writes, sync
  queues)
- Platform-specific UI branching

## Output

Follow [coding-question-generator.md](coding-question-generator.md)'s
full template. Time/space complexity still applies where relevant
(algorithmic questions), but purely UI/architecture-shaped RN questions
should instead discuss **render cost** and **native bridge/JSI traffic**
in that section, explicitly noting when complexity analysis in the
classical sense doesn't apply.
