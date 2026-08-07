# Q5913 · Custom Drag-and-Drop Kanban Board Component (HTML5 Drag and Drop API)

**Difficulty:** Hard
**Companies Asked:** Atlassian (Jira), Trello, Asana, Meta, Google
**Interview Frequency:** ★★★★☆
**Category:** Machine Coding
**Concepts:** machine-coding, kanban-board, drag-and-drop, state-management

## Problem Statement

Implement a `KanbanBoard` component with three fixed columns
(`todo`, `in-progress`, `done`) that lets the user drag a task card from
one column and drop it into another, updating that task's status to
match the column it was dropped in, using the native HTML5 Drag and Drop
API (no external drag-and-drop library).

## Input

None — `KanbanBoard` manages its own internal task list.

## Output

Renders three columns of task cards; dragging a card into a different
column moves it there and updates its status.

## Constraints

Exactly three fixed columns: `todo`, `in-progress`, `done`

## Examples

```tsx
<KanbanBoard />
// Renders three columns, each showing tasks whose status matches that
// column. Dragging "Task 1" (status: todo) from the "Todo" column and
// dropping it onto the "Done" column updates it to status: "done" —
// it now renders under "Done" instead of "Todo".
```

## Edge Cases

- Dropping a task into the *same* column it's already in → status is
  reassigned to the same value it already had, a harmless no-op update
- Dropping outside any column (e.g. on the page background) → the
  native browser default (which might try to navigate or open the
  dragged data as a link/text) must be prevented on every column's
  `dragover`, or the drop won't register at all
- A column with no tasks → renders correctly as an empty drop target,
  still fully able to receive a dropped task
- Rapid drags between multiple columns → each `onDrop` reads the
  dragged task's `id` from the drop event's own data transfer, not from
  any shared mutable state, so out-of-order drops aren't a concern

## Hints

1. The HTML5 Drag and Drop API works through a sequence of events: the
   dragged element needs `draggable` and an `onDragStart` handler; the
   drop target needs `onDragOver` (to explicitly opt in to *accepting* a
   drop) and `onDrop` (to handle it). What data needs to travel from the
   drag source to the drop target, given they're different DOM
   elements entirely?
2. `event.dataTransfer.setData(key, value)` in `onDragStart` and
   `event.dataTransfer.getData(key)` in `onDrop` is how data crosses
   from the dragged element to wherever it's dropped — storing just the
   task's `id` is enough, since the drop handler can look up the rest
   from state.
3. By default, browsers don't allow *dropping* on most elements at
   all — `onDragOver` must call `event.preventDefault()` to explicitly
   signal "this element accepts drops," or `onDrop` will simply never
   fire.

## Algorithm

**Pattern:** native HTML5 Drag and Drop with `dataTransfer`-carried task
id, single flat task list filtered per column.
**Core insight:** rather than maintaining three separate arrays (one per
column) and manually moving items between them, keeping one flat
`tasks` array with a `status` field per task means "moving" a task
between columns is just updating that one field — each column simply
renders `tasks.filter(t => t.status === thisColumn)`. The drag-and-drop
mechanics only need to carry the dragged task's `id` across from
`onDragStart` to `onDrop` (via the browser's own `dataTransfer`
object, since the two handlers run on entirely different DOM elements
with no shared closure), so the drop handler can find and update the
right task.
**Invariant:** at all times, every task in `tasks` belongs to exactly
one of the three rendered columns — the one matching its current
`status` — so the three `.filter()` calls always partition the full
task list with no overlap and no omission.

## Dry Run

**Input:** drag "Task 1" (id `'1'`, status `todo`) and drop it on the
"Done" column

| Step | Event | dataTransfer | tasks after |
|---|---|---|---|
| 1 | `onDragStart` on Task 1's card | `setData('taskId', '1')` | unchanged |
| 2 | `onDragOver` on the "Done" column | `preventDefault()` called (opts into accepting the drop) | unchanged |
| 3 | `onDrop` on the "Done" column | `getData('taskId')` returns `'1'` | task `'1'`'s `status` becomes `'done'`, every other task unchanged |

**Result:** "Task 1" now renders under the "Done" column — matches
expected drag-and-drop behavior.

## JavaScript Solution

```jsx
import React, { useState } from 'react';

const COLUMNS = ['todo', 'in-progress', 'done'];

export function KanbanBoard() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Task 1', status: 'todo' },
    { id: '2', title: 'Task 2', status: 'in-progress' },
  ]);

  const onDragStart = (e, id) => {
    e.dataTransfer.setData('taskId', id);
  };

  const onDrop = (e, status) => {
    const id = e.dataTransfer.getData('taskId');
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {COLUMNS.map((col) => (
        <div
          key={col}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, col)}
          style={{ flex: 1, minHeight: 300, background: '#f4f5f7', padding: 12, borderRadius: 4 }}
        >
          <h3 style={{ textTransform: 'capitalize' }}>{col}</h3>
          {tasks.filter((t) => t.status === col).map((t) => (
            <div
              key={t.id}
              draggable
              onDragStart={(e) => onDragStart(e, t.id)}
              style={{ padding: 12, background: 'white', marginBottom: 8, borderRadius: 4, cursor: 'grab' }}
            >
              {t.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

## TypeScript Solution

```tsx
import React, { useState } from 'react';

export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
}

const COLUMNS = ['todo', 'in-progress', 'done'] as const;

export const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Task 1', status: 'todo' },
    { id: '2', title: 'Task 2', status: 'in-progress' },
  ]);

  const onDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('taskId', id);
  };

  const onDrop = (e: React.DragEvent, status: Task['status']) => {
    const id = e.dataTransfer.getData('taskId');
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {COLUMNS.map((col) => (
        <div
          key={col}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, col)}
          style={{ flex: 1, minHeight: 300, background: '#f4f5f7', padding: 12, borderRadius: 4 }}
        >
          <h3 style={{ textTransform: 'capitalize' }}>{col}</h3>
          {tasks.filter((t) => t.status === col).map((t) => (
            <div
              key={t.id}
              draggable
              onDragStart={(e) => onDragStart(e, t.id)}
              style={{ padding: 12, background: 'white', marginBottom: 8, borderRadius: 4, cursor: 'grab' }}
            >
              {t.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
```

## Time Complexity

O(n) per drop, where n is the total number of tasks — `.map()` scans
every task to find and update the one matching the dropped id.
Rendering is O(n) total across all three columns' `.filter()` calls.

## Space Complexity

O(n) — the flat `tasks` array, where n is the total number of tasks
across all columns.

## Common Mistakes

- Maintaining three separate arrays (one per column) instead of one
  flat list with a `status` field — makes "moving" a task between
  columns require removing it from one array and inserting into
  another (two mutations instead of one), and makes it easy to
  accidentally duplicate or lose a task if those two steps aren't kept
  perfectly in sync.
- Forgetting `event.preventDefault()` in `onDragOver` — without it, the
  browser's default behavior (which does *not* include allowing a drop)
  takes over, and `onDrop` never fires at all.
- Building this as purely mouse-driven drag-and-drop with no keyboard
  equivalent — the native HTML5 Drag and Drop API itself has real
  accessibility limitations (it's not operable by keyboard at all out
  of the box); a production implementation would need a
  keyboard-operable alternative (e.g. a "move to..." menu on each card)
  alongside drag-and-drop, not as a full replacement for it here, but as
  a noted limitation worth raising explicitly in an interview.

## Interview Follow-up Questions

1. How would you persist column order *within* a column (not just which
   column a task belongs to), supporting reordering via drag-and-drop
   too?
2. How would you add a keyboard-accessible way to move a task between
   columns, given the native Drag and Drop API's keyboard
   accessibility gap?
3. How would you handle optimistic UI updates if moving a task required
   a network request that could fail?

## Similar Questions

- Custom Infinite Scroll Feed Component (see [custom-infinite-scroll-feed-component.md](custom-infinite-scroll-feed-component.md))
- Custom Virtualized Windowed List Component (see [custom-virtualized-list-component.md](custom-virtualized-list-component.md))
