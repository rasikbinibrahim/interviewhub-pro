# QHTML002 · Semantic HTML5 Architecture and Landmark Regions

**Difficulty:** Easy  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Google, Meta, Microsoft, Accessibility-focused firms  
**Interview Frequency:** ★★★★★  
**Category:** HTML  
**Concepts:** Semantic tags, ARIA landmarks, Accessibility Tree, Document Outline  

## Expected Answer

Semantic HTML uses tags that convey exact structural meaning (<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>) rather than generic generic containers like <div>. This automatically populates the accessibility tree with appropriate ARIA landmark roles, providing screen reader users with structural navigation.

## Deep Explanation

Screen readers parse HTML semantics to build a contextual Accessibility Tree alongside the DOM tree. Landmark elements allow assistive technology users to jump directly to primary page sections (e.g. main content, primary navigation). Replacing semantic elements with non-semantic <div> tags strips this metadata unless explicitly polyfilled with role attributes.

## Production Example

Building a complex web dashboard entirely out of nested <div> elements makes keyboard and screen-reader navigation impossible, violating accessibility standards (WCAG 2.2 AA).

## Best Practices

- Use <main> exactly once per visible document
- Use <article> for self-contained syndicable content and <section> for thematic groupings with headings

## Trade-offs

- Semantic HTML requires strict adherence to HTML specifications
- Improper tag nesting (e.g. <section> without heading) produces validation warnings

## Common Mistakes

- Overusing <div> for interactive buttons and navigation links
- Using multiple visible <main> tags on a single rendered DOM page

## Follow-up Questions

1. How do semantic HTML elements map to implicit ARIA roles?
2. What is the impact of semantic markup on Search Engine Optimization (SEO)?

## Related Topics

- WCAG Standards
- Accessibility Overview
