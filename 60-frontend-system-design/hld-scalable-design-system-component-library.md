# T6007 · High-Level System Design: Scalable Enterprise Design System & Component Library Architecture

**Difficulty:** Hard  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Uber, Stripe, Airbnb  
**Interview Frequency:** ★★★★★  
**Category:** Frontend System Design  
**Concepts:** hld, system-design, design-system, component-library, design-tokens, accessibility  

## Question

How do you design a scalable **Enterprise Design System & Component Library** architecture across multiple engineering teams and web/mobile platforms, how do **Design Tokens** (W3C format) synchronize CSS variables across Figma and React/React Native, and how do you enforce strict WAI-ARIA accessibility compliance, semantic versioning, and zero-runtime CSS optimization?

## Expected Answer

1. **System Architecture Overview**:
   - **Design Tokens Layer**: JSON-based single source of truth (`color.primary.500`, `spacing.md`) transformed via Style Dictionary into CSS Variables, Tailwind Config, and React Native JS tokens.
   - **Primitive Component Layer**: Un-styled headless primitives (`Radix UI`, `Headless UI`, `React Aria`) managing complex state, focus traps, and ARIA roles.
   - **Styled Component Layer**: Tokenized UI components (`Button`, `Modal`, `Table`, `Select`) styled via CSS Modules or zero-runtime CSS-in-JS (StyleX / Panda CSS).
   - **Documentation & Testing Layer**: Storybook, Chromatic Visual Regression Testing, and Axe Accessibility Audits.

## Deep Explanation

### Design System Layered Architecture

```
Figma Design Specs ──► [ W3C Design Tokens JSON ] ──(Style Dictionary Transpiler)
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
CSS Custom Properties    Tailwind Config      React Native TS Tokens
        │                       │                       │
        └───────────────────────┴───────────────────────┘
                                │
                                ▼
       Headless Primitives (Focus Trap, WAI-ARIA Roles)
                                │
                                ▼
    Enterprise Component Library (<Button />, <Modal />, <Select />)
```

## Production Example

```json
// 1. W3C Design Tokens Definition (tokens/color.json)
{
  "color": {
    "brand": {
      "primary": {
        "value": "#0066ff",
        "type": "color"
      }
    }
  },
  "spacing": {
    "md": {
      "value": "16px",
      "type": "dimension"
    }
  }
}
```

```tsx
// 2. Tokenized Polymorphic Accessible Button Component
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={`ds-button ds-button--${variant} ds-button--${size} ${className}`}
      {...props}
    >
      {isLoading ? <span className="ds-spinner" aria-hidden="true" /> : null}
      <span className="ds-button-label">{children}</span>
    </button>
  );
};
```

## Best Practices

- Use Headless UI primitives (`React Aria` / `Radix`) to avoid re-inventing complex accessibility focus management and keyboard interactions.
- Enforce strict semantic versioning (`semver`) with Changesets to publish independent package updates across monorepo packages.

## Common Mistakes

- Tight-coupling component styling with specific CSS-in-JS runtime engines (e.g. styled-components), introducing runtime JS evaluation overhead and breaking SSR/RSC streaming performance.

## Follow-up Questions

1. How do zero-runtime CSS-in-JS libraries (StyleX, Linaria, Vanilla Extract) extract CSS at build time while preserving dynamic type safety?

## Related Topics

- High-Level System Design: Real-Time Notification System
- WAI-ARIA Semantics, Focus Traps & Screen Reader Accessibility
