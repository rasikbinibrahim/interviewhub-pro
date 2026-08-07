# Q5906 · Accessible Custom Toast Notification System Component with React Portals

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Airbnb, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** Machine Coding  
**Concepts:** machine-coding, toast-notifications, react-portals, accessibility, auto-dismiss  

## Problem Statement

Build a production-grade **Toast Notification System** component in React/TypeScript.

### Key Requirements
1. Render toasts out-of-flow at document root using **React Portals** (`createPortal`).
2. Support notification types: `success`, `error`, `info`, `warning`.
3. Auto-dismiss timer (e.g. 4000ms) with **pause on hover** capability.
4. Support manual dismiss close button (`✕`).
5. Ensure WAI-ARIA accessibility (`role="status"`, `aria-live="polite"` for info/success, `role="alert"`, `aria-live="assertive"` for errors).

## Code Solution

```tsx
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = 'info', duration = 4000) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setToasts((prev) => [...prev, { id, type, message, duration }]);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <ToastContainer toasts={toasts} onRemove={removeToast} />,
          document.body
        )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

// Toast Container Component
const ToastContainer: React.FC<{ toasts: ToastMessage[]; onRemove: (id: string) => void }> = ({
  toasts,
  onRemove,
}) => {
  return (
    <div
      className="toast-container"
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        zIndex: 9999,
        maxWidth: 360,
      }}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

// Individual Toast Item Component with Auto-Dismiss & Pause on Hover
const ToastItem: React.FC<{ toast: ToastMessage; onRemove: (id: string) => void }> = ({
  toast,
  onRemove,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!toast.duration || isPaused) return;

    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, isPaused, onRemove]);

  const bgColors: Record<ToastType, string> = {
    success: '#4caf50',
    error: '#f44336',
    info: '#2196f3',
    warning: '#ff9800',
  };

  return (
    <div
      role={toast.type === 'error' ? 'alert' : 'status'}
      aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        background: bgColors[toast.type],
        color: '#fff',
        borderRadius: 6,
        boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
        fontSize: 14,
      }}
    >
      <span>{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          marginLeft: 12,
          fontWeight: 'bold',
        }}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};
```

## Best Practices

- Use `aria-live="polite"` for informational toasts and `aria-live="assertive"` for critical error alerts.
- Pause auto-dismiss timers when users hover over notifications (`onMouseEnter`) to prevent toasts from disappearing while users read them.

## Common Mistakes

- Rendering Toast containers inline inside deep component trees without Portals, causing CSS `overflow: hidden` or `z-index` stacking context clipping bugs.

## Related Topics

- React Portals & WAI-ARIA Modal Accessibility
- High-Level System Design: Real-Time Notification System
