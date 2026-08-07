# QCSS004 · CSS Grid Subgrid and Complex Layout Alignment

**Difficulty:** Medium  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Google, Meta, Airbnb  
**Interview Frequency:** ★★★★☆  
**Category:** CSS  
**Concepts:** Grid Subgrid, Track inheritance, Alignment, Named grid lines  

## Expected Answer

CSS Grid Subgrid (grid-template-columns: subgrid) allows nested grid items to inherit the track definition and line alignment of their parent grid container. This solves the long-standing layout issue of aligning card headers, body text, and footers across independent card components.

## Deep Explanation

Before subgrid, nested elements established their own independent grid contexts. With subgrid, children participate directly in the parent grid layout. Track sizing, line numbers, and named grid lines flow down to child elements, maintaining precise multi-column alignment regardless of child content height variations.

## Production Example

A multi-column product card layout where product titles vary in line count causing unequal row heights across card containers is cleanly solved using subgrid on card body rows.

## Best Practices

- Use subgrid when child elements across sibling containers must maintain shared horizontal or vertical alignment
- Provide Flexbox fallbacks for legacy browsers

## Trade-offs

- Subgrid requires child components to be direct descendants of the grid layout tree
- Slightly higher layout computation complexity for deep grids

## Common Mistakes

- Forgetting to specify grid-template-columns or grid-template-rows on the subgrid container
- Conflating Flexbox gap distribution with Grid track definitions

## Follow-up Questions

1. How does subgrid handle named grid area boundaries inherited from the parent grid?
2. What is the browser support status for CSS Grid Level 2 Subgrid?

## Related Topics

- Responsive Design
- CSS Architecture
