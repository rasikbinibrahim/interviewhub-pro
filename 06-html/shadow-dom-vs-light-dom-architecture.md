# QHTML003 · Shadow DOM vs Light DOM Architecture

**Difficulty:** Hard  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Google, Salesforce, Adobe  
**Interview Frequency:** ★★★★☆  
**Category:** HTML  
**Concepts:** Web Components, Shadow Root, Encapsulation, Slot element, CSS scoping  

## Expected Answer

The Shadow DOM provides DOM and CSS encapsulation for Web Components. Unlike the Light DOM (the standard page DOM tree), Shadow DOM trees are isolated from global document styling and JavaScript scoping, preventing external styles from bleeding into the component and vice versa.

## Deep Explanation

Shadow DOM attaches a hidden shadow root (open or closed mode) to an element. Styles defined inside a shadow root affect only its shadow tree. Light DOM nodes can be projected into the Shadow DOM using <slot> elements, allowing host applications to inject content while preserving encapsulated component styling.

## Production Example

Enterprise UI widget libraries built with global CSS suffer from style collision bugs when embedded into third-party customer websites; Shadow DOM solves this cleanly.

## Best Practices

- Use open mode shadow roots to allow accessibility auditing tools access to shadow DOM trees
- Utilize CSS Shadow Parts (::part) to expose explicit styling hooks to consumers

## Trade-offs

- Shadow DOM blocks global CSS inheritance, requiring design tokens to be shared via CSS custom properties
- Form participation requires custom element form-associated APIs

## Common Mistakes

- Expecting global CSS framework classes (like Bootstrap/Tailwind) to style Shadow DOM contents
- Using closed mode shadow roots under the assumption of absolute security

## Follow-up Questions

1. How do CSS Custom Properties penetrate Shadow DOM boundaries?
2. What is Declarative Shadow DOM and how does it support Server-Side Rendering?

## Related Topics

- Web Components
- CSS Specificity
