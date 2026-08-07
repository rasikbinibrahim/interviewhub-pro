# QCSS007 · CSS Specificity, Cascade Layers (@layer), and Scope

**Difficulty:** Hard  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Meta, Apple, Stripe  
**Interview Frequency:** ★★★★☆  
**Category:** CSS  
**Concepts:** Cascade layers (@layer), Specificity calculation, @scope, !important override rules  

## Expected Answer

CSS Cascade Layers (@layer) allow developers to explicitly control the precedence of style sheets regardless of selector specificity. Styles defined in a higher layer override styles in lower layers, solving long-standing specificity conflicts between third-party UI libraries and application code.

## Deep Explanation

Traditional CSS specificity is calculated based on Inline styles > IDs > Classes/Attributes/Pseudos > Elements. Cascade layers override selector specificity: an unlayered style beats a layered style, and styles in layer(utility) defeat layer(base) regardless of selector weights. Additionally, native @scope limits style applicability to a DOM subtree.

## Production Example

Integrating a legacy UI library whose heavy ID selectors (#nav .btn) override application utility classes is cleanly resolved by wrapping the library inside an explicit low-priority @layer library.

## Best Practices

- Structure stylesheets into logical layers (@layer reset, base, components, utilities)
- Avoid using !important to win specificity battles

## Trade-offs

- Unlayered styles automatically override all layered styles by design
- !important inside a lower layer flips cascade order to defeat higher layers

## Common Mistakes

- Misunderstanding layer precedence ordering declared at stylesheet entry points
- Overusing inline styles which bypass standard layer rules

## Follow-up Questions

1. How does !important behavior invert when applied within cascade layers?
2. What is the specificity score of the modern :where() pseudo-class vs :is()?

## Related Topics

- CSS Architecture
- Clean Code
