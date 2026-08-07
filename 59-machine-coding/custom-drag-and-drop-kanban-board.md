# Q5904 · Accessible Drag and Drop Kanban Board Component (HTML5 Drag & Drop API)

**Difficulty:** Hard  
**Companies Asked:** Atlassian (Jira), Trello, Notion, GitHub, Asana  
**Interview Frequency:** ★★★★★  
**Category:** Machine Coding  
**Concepts:** machine-coding, drag-and-drop, kanban, html5-dnd, accessibility  

## Problem Statement

Build a full-featured, accessible **Drag and Drop Kanban Board** component in React/TypeScript using native HTML5 Drag and Drop APIs (`draggable`, `onDragStart`, `onDragOver`, `onDrop`).

### Key Requirements
1. Render multiple status columns (`To Do`, `In Progress`, `Done`).
2. Allow dragging cards between columns or reordering cards within the same column.
3. Highlight active drop zones when dragging cards over target columns.
4. Support keyboard navigation accessibility (`Tab` to card, `Space` to pick up, `Arrow Keys` to move, `Enter` to drop).
5. Persist state updates cleanly via React props/state.

## Input Props

- `initialColumns`: `KanbanColumn[]` — array of column objects containing card arrays
- `onBoardChange`: `(columns: KanbanColumn[]) => void` — state update callback

## Code Solution

```tsx
import React, { useState } from 'react';

export interface KanbanCard {
  id: string;
  title: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

interface KanbanBoardProps {
  initialColumns?: KanbanColumn[];
  onBoardChange?: (columns: KanbanColumn[]) => void;
}

const DEFAULT_COLUMNS: KanbanColumn[] = [
  { id: 'todo', title: 'To Do', cards: [{ id: '1', title: 'Setup Vitest' }, { id: '2', title: 'Design System' }] },
  { id: 'in_progress', title: 'In Progress', cards: [{ id: '3', title: 'Auth API' }] },
  { id: 'done', title: 'Done', cards: [{ id: '4', title: 'Project Init' }] },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  initialColumns = DEFAULT_COLUMNS,
  onBoardChange,
}) => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [draggedFromColId, setDraggedFromColId] = useState<string | null>(null);
  const [activeDropColId, setActiveDropColId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, cardId: string, colId: string) => {
    e.dataTransfer.setData('text/plain', cardId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedCardId(cardId);
    setDraggedFromColId(colId);
  };

  const handleDragOver = (e: React.DragEvent, colId: string) => {
    e.preventDefault(); // Necessary to allow drop!
    e.dataTransfer.dropEffect = 'move';
    if (activeDropColId !== colId) {
      setActiveDropColId(colId);
    }
  };

  const handleDragLeave = (e: React.DragEvent, colId: string) => {
    if (activeDropColId === colId) {
      setActiveDropColId(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetColId: string) => {
    e.preventDefault();
    setActiveDropColId(null);

    if (!draggedCardId || !draggedFromColId) return;

    if (draggedFromColId === targetColId) return; // Same column drop

    setColumns((prevCols) => {
      let movedCard: KanbanCard | null = null;

      // 1. Remove card from source column
      const updatedCols = prevCols.map((col) => {
        if (col.id === draggedFromColId) {
          const cardToMove = col.cards.find((c) => c.id === draggedCardId);
          if (cardToMove) movedCard = cardToMove;
          return { ...col, cards: col.cards.filter((c) => c.id !== draggedCardId) };
        }
        return col;
      });

      // 2. Add card to target column
      if (movedCard) {
        const finalCols = updatedCols.map((col) => {
          if (col.id === targetColId) {
            return { ...col, cards: [...col.cards, movedCard!] };
          }
          return col;
        });

        if (onBoardChange) onBoardChange(finalCols);
        return finalCols;
      }

      return prevCols;
    });

    setDraggedCardId(null);
    setDraggedFromColId(null);
  };

  return (
    <div className="kanban-board" style={{ display: 'flex', gap: 16, padding: 16 }}>
      {columns.map((col) => (
        <div
          key={col.id}
          className={`kanban-column ${activeDropColId === col.id ? 'drop-active' : ''}`}
          onDragOver={(e) => handleDragOver(e, col.id)}
          onDragLeave={(e) => handleDragLeave(e, col.id)}
          onDrop={(e) => handleDrop(e, col.id)}
          style={{
            flex: 1,
            background: activeDropColId === col.id ? '#e3f2fd' : '#f5f5f5',
            borderRadius: 8,
            padding: 12,
            minHeight: 300,
            border: '2px dashed #ccc',
          }}
        >
          <h3 style={{ margin: '0 0 12px 0' }}>{col.title} ({col.cards.length})</h3>
          <div className="card-list" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {col.cards.map((card) => (
              <div
                key={card.id}
                draggable
                tabIndex={0}
                role="button"
                aria-grabbed={draggedCardId === card.id}
                onDragStart={(e) => handleDragStart(e, card.id, col.id)}
                style={{
                  padding: 12,
                  background: '#fff',
                  borderRadius: 6,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                  cursor: 'grab',
                  opacity: draggedCardId === card.id ? 0.5 : 1,
                }}
              >
                {card.title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
```

## Best Practices

- Always call `e.preventDefault()` inside `onDragOver` handlers — by default, browsers reject drop operations over standard DOM elements.
- Add `aria-grabbed` and visual drop target indicators (`drop-active`) to guide screen readers and pointer users.

## Common Mistakes

- Forgetting `e.dataTransfer.setData('text/plain', id)`, which causes HTML5 drag operations to abort or fail in Firefox and WebKit browsers.

## Related Topics

- Accessible Autocomplete Combobox Component
- Custom Rich Text Editor Component
