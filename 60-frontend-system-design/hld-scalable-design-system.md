# T6016 · High-Level System Design: Enterprise Design System Component Library

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Airbnb  
**Category:** Frontend System Design  
**Concepts:** hld, system-design, design-system, design-tokens, storybook  

## Question

How do you architect an enterprise **Design System Component Library** supporting multi-brand Design Tokens (CSS Variables / Style Dictionary), WCAG 2.1 AA accessibility, Storybook documentation, and automated visual regression testing?

## Key Architectural Pillars

1. **Design Tokens Architecture**: Tiered JSON variables (Option Tokens ➔ Alias Tokens ➔ Component Tokens) compiled into CSS variables.
2. **Accessible Base Primitives**: Radix UI / Headless UI unstyled accessible component foundations.
3. **Automated Visual Regression Testing**: Chromatic / Playwright screenshot diffing on CI pull requests.
