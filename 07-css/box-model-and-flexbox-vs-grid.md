# T701 · CSS Box Model, Specificity, Flexbox & 2D Grid Layouts

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Uber, Netflix  
**Interview Frequency:** ★★★★★  
**Category:** CSS  
**Concepts:** css-box-model, specificity, flexbox, grid, layout-systems  

## Question

How does `box-sizing: border-box` alter the traditional CSS box model calculation, how is selector specificity computed, and what are the exact criteria for choosing between 1D Flexbox layouts and 2D CSS Grid layouts?

## Expected Answer

1. **Box Model**: In default `content-box`, an element's rendered width is `width + padding + border`. Under `border-box`, declared `width` includes content, padding, and border, preventing layout overflow bugs when adding padding.
2. **Specificity**: Calculated using a 4-part weight system: `(Inline, ID, Class/Attribute/Pseudo-class, Element/Pseudo-element)`. `!important` overrides specificity regardless of weight.
3. **Flexbox vs Grid**:
   - **Flexbox**: Content-driven, 1-dimensional (row OR column) alignment. Ideal for component-level UI items, toolbars, and dynamic wrap lists.
   - **Grid**: Layout-driven, 2-dimensional (rows AND columns simultaneously) strict grid templates. Ideal for page-level layouts, dashboard widgets, and multi-axis alignment.

## Deep Explanation

### 1. Specificity Weight Formula
Specificity is evaluated left-to-right as a 4-tuple `(a, b, c, d)`:
- `a`: Inline styles (`style="..."`) -> `(1, 0, 0, 0)`
- `b`: ID selectors (`#header`) -> `(0, 1, 0, 0)`
- `c`: Classes (`.btn`), attributes (`[type="text"]`), pseudo-classes (`:hover`, `:nth-child`) -> `(0, 0, 1, 0)`
- `d`: Element names (`div`, `p`), pseudo-elements (`::before`) -> `(0, 0, 0, 1)`

*Note*: Universal selector (`*`), combinators (`>`, `+`, `~`), and `:where()` add `(0,0,0,0)` specificity. `:is()`, `:has()`, and `:not()` take the specificity of their most specific argument.

### 2. Flexbox vs CSS Grid Comparison Matrix

| Feature | Flexbox | CSS Grid |
|---|---|---|
| **Dimension** | 1D (Row or Column) | 2D (Rows & Columns) |
| **Approach** | Content-first (items push container) | Layout-first (container places items) |
| **Overlapping** | Requires absolute positioning | Native via `grid-area` / explicit coordinates |
| **Track Sizing** | `flex-grow`, `flex-shrink`, `flex-basis` | `fr` units, `minmax()`, `repeat()`, `auto-fill` |

## Production Example

```css
/* Universal Border-Box Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 2D Page Layout using CSS Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";
  min-height: 100vh;
}

.sidebar { grid-area: sidebar; }
.header  { grid-area: header; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }

/* Responsive Card Sub-Grid using Auto-Fit & Minmax */
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* 1D Component Toolbar using Flexbox */
.card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
```

## Best Practices

- Always apply a global `border-box` reset at the top of your design system CSS.
- Avoid over-using `!important`; refactor selectors using BEM or CSS Cascade Layers (`@layer`).
- Use CSS Grid for overall page shell and multi-column card grids; use Flexbox for internal component alignment.

## Common Mistakes

- Setting fixed heights on Flexbox containers, causing content overflow on mobile screen widths.
- Confusing `auto-fill` (keeps empty grid tracks) with `auto-fit` (collapses empty tracks and expands filled items).
- Assuming `#id .class` has less specificity than 20 grouped classes (`.class1.class2...` never overrides an ID selector because specificity categories do not overflow into higher columns).

## Follow-up Questions

1. How do CSS Cascade Layers (`@layer`) affect specificity resolution?
2. What is the difference between Container Queries (`@container`) and Media Queries (`@media`)?

## Related Topics

- Responsive Design & Viewport Strategy
- CSS Architecture: BEM, CSS Modules & Tailwind
