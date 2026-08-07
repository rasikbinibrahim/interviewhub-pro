# QCSS006 · CSS Container Queries and Component-Driven Layouts

**Difficulty:** Medium  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Google, Meta, Salesforce  
**Interview Frequency:** ★★★★★  
**Category:** CSS  
**Concepts:** Container Queries (@container), Container Type, Size queries, Component-driven design  

## Expected Answer

CSS Container Queries (@container) allow components to apply styles based on the size of their parent container element, rather than the global browser viewport width (which standard @media queries target).

## Deep Explanation

Container queries enable true component-driven responsive design. An element declares container-type: inline-size (or normal/size). Descendants can then query the container width using @container (min-width: 400px) { ... }, allowing the exact same card component to render as a wide row in a main layout and as a narrow stacked card in a sidebar.

## Production Example

A reusable user profile widget rendered in both a narrow 300px sidebar and a 1200px main content area previously required fragile CSS modifier classes; container queries handle layout responsiveness automatically.

## Best Practices

- Apply container-type: inline-size on component wrapper elements
- Use container query length units (cqw, cqh, cqi) for fluid typography within containers

## Trade-offs

- Setting container-type: size prevents children from sizing the container vertically
- Requires modern browser engines

## Common Mistakes

- Attempting to query a container from within the container element itself instead of its descendants
- Forgetting to set a container-type on the parent element

## Follow-up Questions

1. How do container style queries differ from container size queries?
2. What performance optimizations do engines apply to container query layout trees?

## Related Topics

- Responsive Design
- CSS
