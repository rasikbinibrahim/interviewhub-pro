# T703 · CSS Grid vs Flexbox: Modern Subgrid & Container Queries (`@container`)

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Adobe  
**Interview Frequency:** ★★★★★  
**Category:** CSS  
**Concepts:** css, css-grid, flexbox, subgrid, container-queries, responsive-design  

## Question

What are the architectural layout differences between 1D Flexbox and 2D CSS Grid, how does CSS Subgrid (`grid-template-columns: subgrid`) align nested elements with parent grid tracks, and how do Container Queries (`@container`) replace traditional Viewport Media Queries (`@media`) for modular component responsive design?

## Expected Answer

1. **Flexbox (1D) vs CSS Grid (2D)**:
   - **Flexbox (1D)**: Content-driven, one-dimensional layout system (rows OR columns). Ideal for distribution of space along a single axis (navigation bars, button groups).
   - **CSS Grid (2D)**: Layout-driven, two-dimensional system (rows AND columns simultaneously). Ideal for page layouts, dashboards, and complex card grids.
2. **CSS Subgrid (`subgrid`)**:
   - Allows nested child grid items to inherit and align directly with the track definition of their parent grid container (`grid-template-rows: subgrid`), ensuring cards with variable-length titles or footers align perfectly across rows.
3. **Container Queries (`@container`)**:
   - Enables components to apply responsive styles based on the **width of their parent container** rather than the full browser viewport width (`@media (min-width: 768px)`). Enables truly modular micro-frontend components.

## Deep Explanation

### CSS Container Queries & Subgrid Code Pattern

```css
/* 1. Define Parent Component Container */
.card-container {
  container-type: inline-size;
  container-name: card-wrapper;
}

/* 2. Parent Grid with 2D Layout */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* 3. Child Card using Subgrid for perfect row alignment */
.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3; /* Spans 3 rows: Header, Body, Footer */
}

/* 4. Modular Container Query responding to container width! */
@container card-wrapper (min-width: 400px) {
  .card-content {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
```

## Production Example

```html
<div class="dashboard-grid">
  <!-- Independent Cards styled dynamically based on container size -->
  <div class="card-container">
    <article class="card">
      <header><h3>Dynamic Variable Card Title</h3></header>
      <div class="card-content">
        <p>Short body content.</p>
      </div>
      <footer><button>Action</button></footer>
    </article>
  </div>
</div>
```

## Best Practices

- Use Flexbox for small 1D UI components (badges, input buttons, tags).
- Use Container Queries (`@container`) for design system UI card components that must adapt seamlessly whether placed in a full-width main view or a narrow sidebar.

## Common Mistakes

- Forgetting to declare `container-type: inline-size` on the parent container, causing child `@container` queries to fail to evaluate.

## Follow-up Questions

1. How do `minmax()`, `auto-fit`, and `auto-fill` differ when creating fluid responsive CSS Grid columns without media queries?

## Related Topics

- Box Model, BFC, Flexbox & Grid Layouts
- Reflow, Repaint & Browser Rendering Pipeline
