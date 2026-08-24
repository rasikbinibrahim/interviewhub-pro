// Auto-generated from frontend/src/document/Part_2_CSS_Master_Handbook_All_200_Questions.md.
// Question-specific revision: answers, examples, production guidance, coding snippets, edge cases and follow-ups have been individualized per question.
// Mirrors the MockTechnicalQuestion shape defined in @/mocks/questions —
// regenerate with scripts kept alongside the handbook rather than hand-editing.

import type { MockTechnicalQuestion } from '@/mocks/questions';

export const MOCK_CSS_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = [
  {
    "detail": {
      "id": "css1",
      "questionNumber": "CSS-001",
      "title": "What is CSS?",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "What is CSS?"
    },
    "answer": {
  "expectedAnswer": "CSS (Cascading Style Sheets) controls presentation, layout, responsive behavior and visual states for structured web content. The browser matches rules to DOM nodes, resolves the cascade/inheritance, computes styles, performs layout/paint/compositing, and presents pixels.",
  "deepExplanation": "CSS (Cascading Style Sheets) controls presentation, layout, responsive behavior and visual states for structured web content. The browser matches rules to DOM nodes, resolves the cascade/inheritance, computes styles, performs layout/paint/compositing, and presents pixels. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for What is CSS?:\\n```css\\n<div class=\"card\">...</div>\\n<style>.card{display:grid;gap:1rem}</style>\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for What is CSS? is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating CSS as only visual decoration.",
    "Ignoring the cascade and inheritance.",
    "Using !important as a default override.",
    "Ignoring accessibility and responsive behavior."
  ],
  "followUpQuestions": [
    "How does What is CSS? interact with the cascade and inheritance?",
    "What is a real production use case for What is CSS??",
    "Can What is CSS? affect layout, paint or compositing?",
    "How would you debug What is CSS? in DevTools?",
    "What accessibility or responsive edge cases matter for What is CSS??",
    "How would you test What is CSS? across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css2",
      "questionNumber": "CSS-002",
      "title": "History of CSS",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "History of CSS"
    },
    "answer": {
  "expectedAnswer": "CSS evolved from simple document styling into a modular family of specifications, with stronger selectors, media queries, Flexbox, Grid, custom properties, container queries and many other layout/visual capabilities. Modern CSS is developed as a set of modules rather than one monolithic version.",
  "deepExplanation": "CSS evolved from simple document styling into a modular family of specifications, with stronger selectors, media queries, Flexbox, Grid, custom properties, container queries and many other layout/visual capabilities. Modern CSS is developed as a set of modules rather than one monolithic version. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for History of CSS:\\n```css\\n/* Modern modular CSS */\\n.card{display:grid;container-type:inline-size}\\n@container (min-width:40rem){.card{grid-template-columns:2fr 1fr}}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for History of CSS is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating History of CSS as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does History of CSS interact with the cascade and inheritance?",
    "What is a real production use case for History of CSS?",
    "Can History of CSS affect layout, paint or compositing?",
    "How would you debug History of CSS in DevTools?",
    "What accessibility or responsive edge cases matter for History of CSS?",
    "How would you test History of CSS across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css3",
      "questionNumber": "CSS-003",
      "title": "CSS Versions",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "CSS Versions"
    },
    "answer": {
  "expectedAnswer": "There is not one single modern 'CSS3/CSS4' release that defines all CSS features. CSS is developed as independent modules at different maturity levels, so production support should be based on the exact feature and browser support matrix.",
  "deepExplanation": "There is not one single modern 'CSS3/CSS4' release that defines all CSS features. CSS is developed as independent modules at different maturity levels, so production support should be based on the exact feature and browser support matrix. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for CSS Versions:\\n```css\\n@supports (container-type:inline-size){.card{container-type:inline-size}}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for CSS Versions is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating CSS Versions as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does CSS Versions interact with the cascade and inheritance?",
    "What is a real production use case for CSS Versions?",
    "Can CSS Versions affect layout, paint or compositing?",
    "How would you debug CSS Versions in DevTools?",
    "What accessibility or responsive edge cases matter for CSS Versions?",
    "How would you test CSS Versions across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css4",
      "questionNumber": "CSS-004",
      "title": "Types of CSS",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Types of CSS"
    },
    "answer": {
  "expectedAnswer": "The traditional delivery styles are inline styles, internal `<style>` blocks and external stylesheets. In component systems, CSS Modules, CSS-in-JS and utility classes are additional authoring/encapsulation strategies; the browser still ultimately consumes CSS rules.",
  "deepExplanation": "The traditional delivery styles are inline styles, internal `<style>` blocks and external stylesheets. In component systems, CSS Modules, CSS-in-JS and utility classes are additional authoring/encapsulation strategies; the browser still ultimately consumes CSS rules. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Types of CSS:\\n```css\\n<link rel=\"stylesheet\" href=\"app.css\">\\n<style>.page{color:var(--text)}</style>\\n<div style=\"color:tomato\">...</div>\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Types of CSS is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Types of CSS as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Types of CSS interact with the cascade and inheritance?",
    "What is a real production use case for Types of CSS?",
    "Can Types of CSS affect layout, paint or compositing?",
    "How would you debug Types of CSS in DevTools?",
    "What accessibility or responsive edge cases matter for Types of CSS?",
    "How would you test Types of CSS across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css5",
      "questionNumber": "CSS-005",
      "title": "Inline CSS",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Inline CSS"
    },
    "answer": {
  "expectedAnswer": "Inline CSS places declarations in an element's `style` attribute. It is useful for small dynamic values or truly local one-off presentation, but it has high specificity relative to ordinary author styles, is harder to theme/reuse, and can complicate CSP and maintenance.",
  "deepExplanation": "Inline CSS places declarations in an element's `style` attribute. It is useful for small dynamic values or truly local one-off presentation, but it has high specificity relative to ordinary author styles, is harder to theme/reuse, and can complicate CSP and maintenance. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Inline CSS:\\n```css\\n<button style=\"--progress:1024%\">Save</button>\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Inline CSS is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Inline CSS as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Inline CSS interact with the cascade and inheritance?",
    "What is a real production use case for Inline CSS?",
    "Can Inline CSS affect layout, paint or compositing?",
    "How would you debug Inline CSS in DevTools?",
    "What accessibility or responsive edge cases matter for Inline CSS?",
    "How would you test Inline CSS across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css6",
      "questionNumber": "CSS-006",
      "title": "Internal CSS",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Internal CSS"
    },
    "answer": {
  "expectedAnswer": "Internal CSS is a `<style>` block inside a document, suitable for page-scoped or critical styles when appropriate. It avoids extra stylesheet requests but can duplicate rules and cannot be shared efficiently across many pages.",
  "deepExplanation": "Internal CSS is a `<style>` block inside a document, suitable for page-scoped or critical styles when appropriate. It avoids extra stylesheet requests but can duplicate rules and cannot be shared efficiently across many pages. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Internal CSS:\\n```css\\n<style>\\n  .login-page{max-width:28rem;margin:auto}\\n</style>\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Internal CSS is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Internal CSS as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Internal CSS interact with the cascade and inheritance?",
    "What is a real production use case for Internal CSS?",
    "Can Internal CSS affect layout, paint or compositing?",
    "How would you debug Internal CSS in DevTools?",
    "What accessibility or responsive edge cases matter for Internal CSS?",
    "How would you test Internal CSS across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css7",
      "questionNumber": "CSS-007",
      "title": "External CSS",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "External CSS"
    },
    "answer": {
  "expectedAnswer": "External CSS is delivered through a stylesheet resource such as `<link rel=\"stylesheet\">`. It is usually the default for reusable production styling because it supports caching, separation of concerns, tooling, reuse and predictable architecture.",
  "deepExplanation": "External CSS is delivered through a stylesheet resource such as `<link rel=\"stylesheet\">`. It is usually the default for reusable production styling because it supports caching, separation of concerns, tooling, reuse and predictable architecture. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for External CSS:\\n```css\\n<link rel=\"stylesheet\" href=\"app.css\">\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for External CSS is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating External CSS as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does External CSS interact with the cascade and inheritance?",
    "What is a real production use case for External CSS?",
    "Can External CSS affect layout, paint or compositing?",
    "How would you debug External CSS in DevTools?",
    "What accessibility or responsive edge cases matter for External CSS?",
    "How would you test External CSS across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css8",
      "questionNumber": "CSS-008",
      "title": "CSS Syntax",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "CSS Syntax"
    },
    "answer": {
  "expectedAnswer": "A CSS rule consists of a selector and a declaration block containing property/value pairs, with optional at-rules such as `@media` and `@supports`. Correct syntax and value grammar determine whether a declaration participates in the cascade.",
  "deepExplanation": "A CSS rule consists of a selector and a declaration block containing property/value pairs, with optional at-rules such as `@media` and `@supports`. Correct syntax and value grammar determine whether a declaration participates in the cascade. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for CSS Syntax:\\n```css\\n.button{color:white;background:blue}\\n@media (min-width:48rem){.button{padding:1rem 1.5rem}}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for CSS Syntax is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating CSS Syntax as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does CSS Syntax interact with the cascade and inheritance?",
    "What is a real production use case for CSS Syntax?",
    "Can CSS Syntax affect layout, paint or compositing?",
    "How would you debug CSS Syntax in DevTools?",
    "What accessibility or responsive edge cases matter for CSS Syntax?",
    "How would you test CSS Syntax across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css9",
      "questionNumber": "CSS-009",
      "title": "CSS Comments",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "CSS Comments"
    },
    "answer": {
  "expectedAnswer": "CSS comments use `/* ... */` and are ignored for styling semantics. They are useful for explaining non-obvious decisions, tokens, browser workarounds and architecture boundaries, but comments should not substitute for clear naming.",
  "deepExplanation": "CSS comments use `/* ... */` and are ignored for styling semantics. They are useful for explaining non-obvious decisions, tokens, browser workarounds and architecture boundaries, but comments should not substitute for clear naming. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for CSS Comments:\\n```css\\n/* Keep this z-index below the modal layer. */\\n.modal{z-index:100}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for CSS Comments is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating CSS Comments as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does CSS Comments interact with the cascade and inheritance?",
    "What is a real production use case for CSS Comments?",
    "Can CSS Comments affect layout, paint or compositing?",
    "How would you debug CSS Comments in DevTools?",
    "What accessibility or responsive edge cases matter for CSS Comments?",
    "How would you test CSS Comments across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css10",
      "questionNumber": "CSS-010",
      "title": "CSS Selectors",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "CSS Selectors"
    },
    "answer": {
  "expectedAnswer": "Selectors identify the elements to which a rule applies. They range from simple type/class/ID selectors to combinators, attribute selectors, pseudo-classes and pseudo-elements; maintainable systems generally favor semantic, low-specificity selectors.",
  "deepExplanation": "Selectors identify the elements to which a rule applies. They range from simple type/class/ID selectors to combinators, attribute selectors, pseudo-classes and pseudo-elements; maintainable systems generally favor semantic, low-specificity selectors. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for CSS Selectors:\\n```css\\n.card > .title:is(h2,h3){color:var(--text)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for CSS Selectors is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating CSS Selectors as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does CSS Selectors interact with the cascade and inheritance?",
    "What is a real production use case for CSS Selectors?",
    "Can CSS Selectors affect layout, paint or compositing?",
    "How would you debug CSS Selectors in DevTools?",
    "What accessibility or responsive edge cases matter for CSS Selectors?",
    "How would you test CSS Selectors across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css11",
      "questionNumber": "CSS-011",
      "title": "Universal Selector",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Universal Selector"
    },
    "answer": {
  "expectedAnswer": "The universal selector `*` matches every element in the relevant tree scope. It is commonly used in resets or broad defaults, but deep universal combinations can increase selector work and make ownership unclear.",
  "deepExplanation": "The universal selector `*` matches every element in the relevant tree scope. It is commonly used in resets or broad defaults, but deep universal combinations can increase selector work and make ownership unclear. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Universal Selector:\\n```css\\n*,*::before,*::after{box-sizing:border-box}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Universal Selector is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Universal Selector as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Universal Selector interact with the cascade and inheritance?",
    "What is a real production use case for Universal Selector?",
    "Can Universal Selector affect layout, paint or compositing?",
    "How would you debug Universal Selector in DevTools?",
    "What accessibility or responsive edge cases matter for Universal Selector?",
    "How would you test Universal Selector across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css12",
      "questionNumber": "CSS-012",
      "title": "Element Selector",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Element Selector"
    },
    "answer": {
  "expectedAnswer": "An element/type selector such as `button` or `p` targets all matching elements in its scope. It is low-specificity and useful for global element defaults, especially when combined with semantic HTML.",
  "deepExplanation": "An element/type selector such as `button` or `p` targets all matching elements in its scope. It is low-specificity and useful for global element defaults, especially when combined with semantic HTML. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Element Selector:\\n```css\\nbutton{font:inherit}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Element Selector is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Element Selector as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Element Selector interact with the cascade and inheritance?",
    "What is a real production use case for Element Selector?",
    "Can Element Selector affect layout, paint or compositing?",
    "How would you debug Element Selector in DevTools?",
    "What accessibility or responsive edge cases matter for Element Selector?",
    "How would you test Element Selector across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css13",
      "questionNumber": "CSS-013",
      "title": "Class Selector",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Class Selector"
    },
    "answer": {
  "expectedAnswer": "A class selector such as `.button` targets elements carrying that class. Classes are the common foundation for reusable component styles because they have predictable specificity and can express states and variants.",
  "deepExplanation": "A class selector such as `.button` targets elements carrying that class. Classes are the common foundation for reusable component styles because they have predictable specificity and can express states and variants. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Class Selector:\\n```css\\n.button{border-radius:.5rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Class Selector is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Class Selector as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Class Selector interact with the cascade and inheritance?",
    "What is a real production use case for Class Selector?",
    "Can Class Selector affect layout, paint or compositing?",
    "How would you debug Class Selector in DevTools?",
    "What accessibility or responsive edge cases matter for Class Selector?",
    "How would you test Class Selector across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css14",
      "questionNumber": "CSS-014",
      "title": "ID Selector",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "ID Selector"
    },
    "answer": {
  "expectedAnswer": "An ID selector such as `#app` targets an element with that ID and has high specificity. IDs are appropriate for unique anchors and structural targets, but classes are usually better for reusable styling because high specificity is harder to override.",
  "deepExplanation": "An ID selector such as `#app` targets an element with that ID and has high specificity. IDs are appropriate for unique anchors and structural targets, but classes are usually better for reusable styling because high specificity is harder to override. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for ID Selector:\\n```css\\n#app{min-height:100dvh}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for ID Selector is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating ID Selector as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does ID Selector interact with the cascade and inheritance?",
    "What is a real production use case for ID Selector?",
    "Can ID Selector affect layout, paint or compositing?",
    "How would you debug ID Selector in DevTools?",
    "What accessibility or responsive edge cases matter for ID Selector?",
    "How would you test ID Selector across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css15",
      "questionNumber": "CSS-015",
      "title": "Group Selector",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Group Selector"
    },
    "answer": {
  "expectedAnswer": "A group selector combines selectors with commas, such as `h1, h2, h3 { ... }`, so multiple targets share declarations. It reduces duplication but should still keep semantic ownership clear.",
  "deepExplanation": "A group selector combines selectors with commas, such as `h1, h2, h3 { ... }`, so multiple targets share declarations. It reduces duplication but should still keep semantic ownership clear. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Group Selector:\\n```css\\nh1,h2,h3{line-height:1.2}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Group Selector is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Group Selector as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Group Selector interact with the cascade and inheritance?",
    "What is a real production use case for Group Selector?",
    "Can Group Selector affect layout, paint or compositing?",
    "How would you debug Group Selector in DevTools?",
    "What accessibility or responsive edge cases matter for Group Selector?",
    "How would you test Group Selector across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css16",
      "questionNumber": "CSS-016",
      "title": "Attribute Selector",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Attribute Selector"
    },
    "answer": {
  "expectedAnswer": "Attribute selectors target elements based on attributes or attribute values, such as `[disabled]`, `[type=\"email\"]` or `[data-state=\"open\"]`. They are useful for semantic state, form controls and testable data attributes when class names are not the right abstraction.",
  "deepExplanation": "Attribute selectors target elements based on attributes or attribute values, such as `[disabled]`, `[type=\"email\"]` or `[data-state=\"open\"]`. They are useful for semantic state, form controls and testable data attributes when class names are not the right abstraction. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Attribute Selector:\\n```css\\ninput[aria-invalid=\"true\"]{border-color:red}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Attribute Selector is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Attribute Selector as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Attribute Selector interact with the cascade and inheritance?",
    "What is a real production use case for Attribute Selector?",
    "Can Attribute Selector affect layout, paint or compositing?",
    "How would you debug Attribute Selector in DevTools?",
    "What accessibility or responsive edge cases matter for Attribute Selector?",
    "How would you test Attribute Selector across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css17",
      "questionNumber": "CSS-017",
      "title": "Specificity",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Specificity"
    },
    "answer": {
  "expectedAnswer": "Specificity is one part of the cascade's precedence calculation. It compares selector components lexicographically rather than treating specificity as one simple decimal score in real CSS; origin, importance, layers and source order also participate.",
  "deepExplanation": "Specificity is one part of the cascade's precedence calculation. It compares selector components lexicographically rather than treating specificity as one simple decimal score in real CSS; origin, importance, layers and source order also participate. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Specificity:\\n```css\\n:where(.card .title){color:var(--text)}\\n.card .title{color:blue}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Specificity is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating specificity as the only cascade factor.",
    "Using arbitrary high-specificity selectors.",
    "Fixing every cascade issue with !important."
  ],
  "followUpQuestions": [
    "How does Specificity interact with the cascade and inheritance?",
    "What is a real production use case for Specificity?",
    "Can Specificity affect layout, paint or compositing?",
    "How would you debug Specificity in DevTools?",
    "What accessibility or responsive edge cases matter for Specificity?",
    "How would you test Specificity across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css18",
      "questionNumber": "CSS-018",
      "title": "Cascade",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Cascade"
    },
    "answer": {
  "expectedAnswer": "The cascade determines which applicable declaration wins when multiple rules target the same property. Modern cascade ordering includes origin/importance, cascade layers, specificity, scoping/encapsulation context and source order.",
  "deepExplanation": "The cascade determines which applicable declaration wins when multiple rules target the same property. Modern cascade ordering includes origin/importance, cascade layers, specificity, scoping/encapsulation context and source order. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Cascade:\\n```css\\n@layer reset,base,components,utilities;\\n@layer components{.button{padding:.75rem 1rem}}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Cascade is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Cascade as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Cascade interact with the cascade and inheritance?",
    "What is a real production use case for Cascade?",
    "Can Cascade affect layout, paint or compositing?",
    "How would you debug Cascade in DevTools?",
    "What accessibility or responsive edge cases matter for Cascade?",
    "How would you test Cascade across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css19",
      "questionNumber": "CSS-019",
      "title": "Inheritance",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Inheritance"
    },
    "answer": {
  "expectedAnswer": "Inheritance allows certain properties on an element to derive their value from an ancestor when no winning declaration sets the property directly. Text-related properties commonly inherit; layout properties often do not.",
  "deepExplanation": "Inheritance allows certain properties on an element to derive their value from an ancestor when no winning declaration sets the property directly. Text-related properties commonly inherit; layout properties often do not. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Inheritance:\\n```css\\nbody{color:#222}\\narticle{font-family:system-ui}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Inheritance is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Inheritance as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Inheritance interact with the cascade and inheritance?",
    "What is a real production use case for Inheritance?",
    "Can Inheritance affect layout, paint or compositing?",
    "How would you debug Inheritance in DevTools?",
    "What accessibility or responsive edge cases matter for Inheritance?",
    "How would you test Inheritance across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css20",
      "questionNumber": "CSS-020",
      "title": "initial vs inherit vs unset vs revert",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Fundamentals",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "initial vs inherit vs unset vs revert"
    },
    "answer": {
  "expectedAnswer": "`initial` resets to the property's initial value, `inherit` explicitly takes the parent value, `unset` behaves as inherit for inheritable properties and initial otherwise, and `revert` rolls the cascade back toward a previous origin/user-agent value. They are useful for predictable resets without inventing ad-hoc defaults.",
  "deepExplanation": "`initial` resets to the property's initial value, `inherit` explicitly takes the parent value, `unset` behaves as inherit for inheritable properties and initial otherwise, and `revert` rolls the cascade back toward a previous origin/user-agent value. They are useful for predictable resets without inventing ad-hoc defaults. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for initial vs inherit vs unset vs revert:\\n```css\\n.button{all:unset}\\n.title{color:inherit}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer semantic HTML and low-specificity selectors.",
    "Use the cascade intentionally.",
    "Validate behavior in DevTools.",
    "Keep styles reusable and maintainable.",
    "Consider accessibility and responsive behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for initial vs inherit vs unset vs revert is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating initial vs inherit vs unset vs revert as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does initial vs inherit vs unset vs revert interact with the cascade and inheritance?",
    "What is a real production use case for initial vs inherit vs unset vs revert?",
    "Can initial vs inherit vs unset vs revert affect layout, paint or compositing?",
    "How would you debug initial vs inherit vs unset vs revert in DevTools?",
    "What accessibility or responsive edge cases matter for initial vs inherit vs unset vs revert?",
    "How would you test initial vs inherit vs unset vs revert across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Fundamentals",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css21",
      "questionNumber": "CSS-021",
      "title": "px vs em vs rem",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Units & Colors",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "px vs em vs rem"
    },
    "answer": {
  "expectedAnswer": "`px` is a CSS pixel unit; `em` is relative to the current element's font size for font-size and can compound through nesting; `rem` is relative to the root element's font size. `rem` is often a stable design-system unit while `em` is useful for component-relative scaling.",
  "deepExplanation": "`px` is a CSS pixel unit; `em` is relative to the current element's font size for font-size and can compound through nesting; `rem` is relative to the root element's font size. `rem` is often a stable design-system unit while `em` is useful for component-relative scaling. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for px vs em vs rem:\\n```css\\n:root{font-size:16px}.card{font-size:1rem;padding:1em 1.5rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer relative units for scalable UI.",
    "Centralize colors as semantic tokens.",
    "Test zoom and localization.",
    "Avoid unnecessary hard-coded values.",
    "Verify contrast and visual consistency."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for px vs em vs rem is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating px vs em vs rem as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does px vs em vs rem interact with the cascade and inheritance?",
    "What is a real production use case for px vs em vs rem?",
    "Can px vs em vs rem affect layout, paint or compositing?",
    "How would you debug px vs em vs rem in DevTools?",
    "What accessibility or responsive edge cases matter for px vs em vs rem?",
    "How would you test px vs em vs rem across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Units & Colors",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css22",
      "questionNumber": "CSS-022",
      "title": "Percentage Units",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Units & Colors",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Percentage Units"
    },
    "answer": {
  "expectedAnswer": "Percentages are relative to a context defined by the property—for example, width percentages usually reference a containing block while vertical percentage behavior depends on the property's sizing context. Always check the property-specific percentage reference.",
  "deepExplanation": "Percentages are relative to a context defined by the property—for example, width percentages usually reference a containing block while vertical percentage behavior depends on the property's sizing context. Always check the property-specific percentage reference. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Percentage Units:\\n```css\\n.panel{width:80%;padding-inline:5%}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer relative units for scalable UI.",
    "Centralize colors as semantic tokens.",
    "Test zoom and localization.",
    "Avoid unnecessary hard-coded values.",
    "Verify contrast and visual consistency."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Percentage Units is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Percentage Units as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Percentage Units interact with the cascade and inheritance?",
    "What is a real production use case for Percentage Units?",
    "Can Percentage Units affect layout, paint or compositing?",
    "How would you debug Percentage Units in DevTools?",
    "What accessibility or responsive edge cases matter for Percentage Units?",
    "How would you test Percentage Units across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Units & Colors",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css23",
      "questionNumber": "CSS-023",
      "title": "vw and vh",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Units & Colors",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "vw and vh"
    },
    "answer": {
  "expectedAnswer": "`vw` and `vh` represent 1% of the viewport width/height respectively. They are useful for fluid sizing and hero layouts, but mobile browser UI can make classic `vh` behavior surprising; modern viewport units such as `dvh`, `svh` and `lvh` can express different viewport states.",
  "deepExplanation": "`vw` and `vh` represent 1% of the viewport width/height respectively. They are useful for fluid sizing and hero layouts, but mobile browser UI can make classic `vh` behavior surprising; modern viewport units such as `dvh`, `svh` and `lvh` can express different viewport states. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for vw and vh:\\n```css\\n.hero{min-height:100dvh;font-size:clamp(2rem,6vw,5rem)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer relative units for scalable UI.",
    "Centralize colors as semantic tokens.",
    "Test zoom and localization.",
    "Avoid unnecessary hard-coded values.",
    "Verify contrast and visual consistency."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for vw and vh is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating vw and vh as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does vw and vh interact with the cascade and inheritance?",
    "What is a real production use case for vw and vh?",
    "Can vw and vh affect layout, paint or compositing?",
    "How would you debug vw and vh in DevTools?",
    "What accessibility or responsive edge cases matter for vw and vh?",
    "How would you test vw and vh across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Units & Colors",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css24",
      "questionNumber": "CSS-024",
      "title": "vmin and vmax",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Units & Colors",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "vmin and vmax"
    },
    "answer": {
  "expectedAnswer": "`vmin` is 1% of the smaller viewport dimension and `vmax` is 1% of the larger. They are useful for shapes, responsive typography and layouts that should adapt to orientation.",
  "deepExplanation": "`vmin` is 1% of the smaller viewport dimension and `vmax` is 1% of the larger. They are useful for shapes, responsive typography and layouts that should adapt to orientation. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for vmin and vmax:\\n```css\\n.avatar{width:20vmin;height:20vmin}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer relative units for scalable UI.",
    "Centralize colors as semantic tokens.",
    "Test zoom and localization.",
    "Avoid unnecessary hard-coded values.",
    "Verify contrast and visual consistency."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for vmin and vmax is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating vmin and vmax as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does vmin and vmax interact with the cascade and inheritance?",
    "What is a real production use case for vmin and vmax?",
    "Can vmin and vmax affect layout, paint or compositing?",
    "How would you debug vmin and vmax in DevTools?",
    "What accessibility or responsive edge cases matter for vmin and vmax?",
    "How would you test vmin and vmax across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Units & Colors",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css25",
      "questionNumber": "CSS-025",
      "title": "Absolute vs Relative Units",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Units & Colors",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Absolute vs Relative Units"
    },
    "answer": {
  "expectedAnswer": "Absolute-ish CSS units such as `px` provide predictable lengths, while relative units such as `%`, `em`, `rem`, viewport and container units adapt to context. Production systems usually mix them according to content, accessibility and responsive behavior.",
  "deepExplanation": "Absolute-ish CSS units such as `px` provide predictable lengths, while relative units such as `%`, `em`, `rem`, viewport and container units adapt to context. Production systems usually mix them according to content, accessibility and responsive behavior. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Absolute vs Relative Units:\\n```css\\n.container{width:min(90%,70rem);padding:2rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer relative units for scalable UI.",
    "Centralize colors as semantic tokens.",
    "Test zoom and localization.",
    "Avoid unnecessary hard-coded values.",
    "Verify contrast and visual consistency."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Absolute vs Relative Units is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Absolute vs Relative Units as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Absolute vs Relative Units interact with the cascade and inheritance?",
    "What is a real production use case for Absolute vs Relative Units?",
    "Can Absolute vs Relative Units affect layout, paint or compositing?",
    "How would you debug Absolute vs Relative Units in DevTools?",
    "What accessibility or responsive edge cases matter for Absolute vs Relative Units?",
    "How would you test Absolute vs Relative Units across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Units & Colors",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css26",
      "questionNumber": "CSS-026",
      "title": "Named Colors",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Units & Colors",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Named Colors"
    },
    "answer": {
  "expectedAnswer": "Named colors such as `red`, `rebeccapurple` and `transparent` are predefined CSS color keywords. They are readable but less precise than tokens or modern color functions for design-system work.",
  "deepExplanation": "Named colors such as `red`, `rebeccapurple` and `transparent` are predefined CSS color keywords. They are readable but less precise than tokens or modern color functions for design-system work. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Named Colors:\\n```css\\n.error{color:crimson}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer relative units for scalable UI.",
    "Centralize colors as semantic tokens.",
    "Test zoom and localization.",
    "Avoid unnecessary hard-coded values.",
    "Verify contrast and visual consistency."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Named Colors is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Named Colors as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Named Colors interact with the cascade and inheritance?",
    "What is a real production use case for Named Colors?",
    "Can Named Colors affect layout, paint or compositing?",
    "How would you debug Named Colors in DevTools?",
    "What accessibility or responsive edge cases matter for Named Colors?",
    "How would you test Named Colors across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Units & Colors",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css27",
      "questionNumber": "CSS-027",
      "title": "HEX",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Units & Colors",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "HEX"
    },
    "answer": {
  "expectedAnswer": "Hex colors encode RGB channels as hexadecimal digits, commonly `#rgb`, `#rrggbb` and, when alpha is included, `#rgba`/`#rrggbbaa`. They are compact and deterministic but less expressive than modern perceptual color spaces for advanced design work.",
  "deepExplanation": "Hex colors encode RGB channels as hexadecimal digits, commonly `#rgb`, `#rrggbb` and, when alpha is included, `#rgba`/`#rrggbbaa`. They are compact and deterministic but less expressive than modern perceptual color spaces for advanced design work. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for HEX:\\n```css\\n.brand{color:#2563eb}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer relative units for scalable UI.",
    "Centralize colors as semantic tokens.",
    "Test zoom and localization.",
    "Avoid unnecessary hard-coded values.",
    "Verify contrast and visual consistency."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for HEX is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating HEX as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does HEX interact with the cascade and inheritance?",
    "What is a real production use case for HEX?",
    "Can HEX affect layout, paint or compositing?",
    "How would you debug HEX in DevTools?",
    "What accessibility or responsive edge cases matter for HEX?",
    "How would you test HEX across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Units & Colors",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css28",
      "questionNumber": "CSS-028",
      "title": "RGB",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Units & Colors",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "RGB"
    },
    "answer": {
  "expectedAnswer": "`rgb()` expresses red, green and blue channels. Modern syntax can use space-separated channels and optional alpha, making it more flexible than older comma-based syntax.",
  "deepExplanation": "`rgb()` expresses red, green and blue channels. Modern syntax can use space-separated channels and optional alpha, making it more flexible than older comma-based syntax. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for RGB:\\n```css\\n.brand{color:rgb(37 99 235)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer relative units for scalable UI.",
    "Centralize colors as semantic tokens.",
    "Test zoom and localization.",
    "Avoid unnecessary hard-coded values.",
    "Verify contrast and visual consistency."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for RGB is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating RGB as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does RGB interact with the cascade and inheritance?",
    "What is a real production use case for RGB?",
    "Can RGB affect layout, paint or compositing?",
    "How would you debug RGB in DevTools?",
    "What accessibility or responsive edge cases matter for RGB?",
    "How would you test RGB across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Units & Colors",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css29",
      "questionNumber": "CSS-029",
      "title": "RGBA",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Units & Colors",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "RGBA"
    },
    "answer": {
  "expectedAnswer": "`rgba()` is the older familiar form for RGB plus an alpha component. Modern CSS treats alpha as part of the `rgb()` function as well, so `rgb(0 0 0 / 0.5)` is often clearer in new code.",
  "deepExplanation": "`rgba()` is the older familiar form for RGB plus an alpha component. Modern CSS treats alpha as part of the `rgb()` function as well, so `rgb(0 0 0 / 0.5)` is often clearer in new code. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for RGBA:\\n```css\\n.overlay{background:rgb(0 0 0 / .5)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer relative units for scalable UI.",
    "Centralize colors as semantic tokens.",
    "Test zoom and localization.",
    "Avoid unnecessary hard-coded values.",
    "Verify contrast and visual consistency."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for RGBA is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating RGBA as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does RGBA interact with the cascade and inheritance?",
    "What is a real production use case for RGBA?",
    "Can RGBA affect layout, paint or compositing?",
    "How would you debug RGBA in DevTools?",
    "What accessibility or responsive edge cases matter for RGBA?",
    "How would you test RGBA across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Units & Colors",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css30",
      "questionNumber": "CSS-030",
      "title": "HSL",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Units & Colors",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "HSL"
    },
    "answer": {
  "expectedAnswer": "`hsl()` describes a color with hue, saturation and lightness. It can be convenient for theme adjustments, though perceptual uniformity is not guaranteed.",
  "deepExplanation": "`hsl()` describes a color with hue, saturation and lightness. It can be convenient for theme adjustments, though perceptual uniformity is not guaranteed. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for HSL:\\n```css\\n.accent{color:hsl(220 83% 53%)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer relative units for scalable UI.",
    "Centralize colors as semantic tokens.",
    "Test zoom and localization.",
    "Avoid unnecessary hard-coded values.",
    "Verify contrast and visual consistency."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for HSL is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating HSL as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does HSL interact with the cascade and inheritance?",
    "What is a real production use case for HSL?",
    "Can HSL affect layout, paint or compositing?",
    "How would you debug HSL in DevTools?",
    "What accessibility or responsive edge cases matter for HSL?",
    "How would you test HSL across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Units & Colors",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css31",
      "questionNumber": "CSS-031",
      "title": "HSLA",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Units & Colors",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "HSLA"
    },
    "answer": {
  "expectedAnswer": "`hsla()` is the older HSL-plus-alpha spelling. Modern CSS can express the same concept with `hsl()` and an alpha component.",
  "deepExplanation": "`hsla()` is the older HSL-plus-alpha spelling. Modern CSS can express the same concept with `hsl()` and an alpha component. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for HSLA:\\n```css\\n.overlay{background:hsl(220 80% 20% / .7)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer relative units for scalable UI.",
    "Centralize colors as semantic tokens.",
    "Test zoom and localization.",
    "Avoid unnecessary hard-coded values.",
    "Verify contrast and visual consistency."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for HSLA is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating HSLA as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does HSLA interact with the cascade and inheritance?",
    "What is a real production use case for HSLA?",
    "Can HSLA affect layout, paint or compositing?",
    "How would you debug HSLA in DevTools?",
    "What accessibility or responsive edge cases matter for HSLA?",
    "How would you test HSLA across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Units & Colors",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css32",
      "questionNumber": "CSS-032",
      "title": "Opacity",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Units & Colors",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Opacity"
    },
    "answer": {
  "expectedAnswer": "The `opacity` property controls an element's overall compositing opacity, including its descendants. It is different from an alpha color because lowering an ancestor's opacity affects the whole subtree and can create a stacking context.",
  "deepExplanation": "The `opacity` property controls an element's overall compositing opacity, including its descendants. It is different from an alpha color because lowering an ancestor's opacity affects the whole subtree and can create a stacking context. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Opacity:\\n```css\\n.disabled{opacity:.5}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer relative units for scalable UI.",
    "Centralize colors as semantic tokens.",
    "Test zoom and localization.",
    "Avoid unnecessary hard-coded values.",
    "Verify contrast and visual consistency."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Opacity is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Opacity as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Opacity interact with the cascade and inheritance?",
    "What is a real production use case for Opacity?",
    "Can Opacity affect layout, paint or compositing?",
    "How would you debug Opacity in DevTools?",
    "What accessibility or responsive edge cases matter for Opacity?",
    "How would you test Opacity across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Units & Colors",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css33",
      "questionNumber": "CSS-033",
      "title": "currentColor",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Units & Colors",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "currentColor"
    },
    "answer": {
  "expectedAnswer": "`currentColor` resolves to the element's computed `color` value. It is useful for automatically tying borders, SVG strokes, icons and other visuals to the text color without duplicating tokens.",
  "deepExplanation": "`currentColor` resolves to the element's computed `color` value. It is useful for automatically tying borders, SVG strokes, icons and other visuals to the text color without duplicating tokens. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for currentColor:\\n```css\\n.icon{color:var(--brand)}.icon svg{stroke:currentColor}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer relative units for scalable UI.",
    "Centralize colors as semantic tokens.",
    "Test zoom and localization.",
    "Avoid unnecessary hard-coded values.",
    "Verify contrast and visual consistency."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for currentColor is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating currentColor as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does currentColor interact with the cascade and inheritance?",
    "What is a real production use case for currentColor?",
    "Can currentColor affect layout, paint or compositing?",
    "How would you debug currentColor in DevTools?",
    "What accessibility or responsive edge cases matter for currentColor?",
    "How would you test currentColor across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Units & Colors",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css34",
      "questionNumber": "CSS-034",
      "title": "CSS Variables",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Units & Colors",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "CSS Variables"
    },
    "answer": {
  "expectedAnswer": "CSS custom properties provide cascade-aware variables that can be inherited, overridden and consumed by `var()`. They are a core mechanism for theme tokens and runtime styling.",
  "deepExplanation": "CSS custom properties provide cascade-aware variables that can be inherited, overridden and consumed by `var()`. They are a core mechanism for theme tokens and runtime styling. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for CSS Variables:\\n```css\\n:root{--space-2:.5rem;--color-primary:#2563eb}.button{gap:var(--space-2)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer relative units for scalable UI.",
    "Centralize colors as semantic tokens.",
    "Test zoom and localization.",
    "Avoid unnecessary hard-coded values.",
    "Verify contrast and visual consistency."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for CSS Variables is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating CSS Variables as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does CSS Variables interact with the cascade and inheritance?",
    "What is a real production use case for CSS Variables?",
    "Can CSS Variables affect layout, paint or compositing?",
    "How would you debug CSS Variables in DevTools?",
    "What accessibility or responsive edge cases matter for CSS Variables?",
    "How would you test CSS Variables across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Units & Colors",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css35",
      "questionNumber": "CSS-035",
      "title": "Color Best Practices",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "CSS Units & Colors",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Color Best Practices"
    },
    "answer": {
  "expectedAnswer": "Production color systems should centralize semantic tokens, meet contrast requirements, support dark/forced-color modes where needed, avoid color as the only signal, and use modern color functions deliberately rather than scattering literal colors across components.",
  "deepExplanation": "Production color systems should centralize semantic tokens, meet contrast requirements, support dark/forced-color modes where needed, avoid color as the only signal, and use modern color functions deliberately rather than scattering literal colors across components. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Color Best Practices:\\n```css\\n:root{--focus:#1d4ed8;--surface:#fff;--text:#111827}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer relative units for scalable UI.",
    "Centralize colors as semantic tokens.",
    "Test zoom and localization.",
    "Avoid unnecessary hard-coded values.",
    "Verify contrast and visual consistency."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Color Best Practices is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Color Best Practices as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Color Best Practices interact with the cascade and inheritance?",
    "What is a real production use case for Color Best Practices?",
    "Can Color Best Practices affect layout, paint or compositing?",
    "How would you debug Color Best Practices in DevTools?",
    "What accessibility or responsive edge cases matter for Color Best Practices?",
    "How would you test Color Best Practices across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Units & Colors",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css36",
      "questionNumber": "CSS-036",
      "title": "Box Model",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Box Model",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Box Model"
    },
    "answer": {
  "expectedAnswer": "Every normal element is laid out with a content box, padding, border and margin. The `box-sizing` property determines whether declared width/height measure content or include padding and border.",
  "deepExplanation": "Every normal element is laid out with a content box, padding, border and margin. The `box-sizing` property determines whether declared width/height measure content or include padding and border. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Box Model:\\n```css\\n.card{box-sizing:border-box;width:20rem;padding:1rem;border:1px solid}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use border-box consistently.",
    "Prefer logical properties.",
    "Avoid fixed heights for variable content.",
    "Test overflow and localization.",
    "Measure layout instead of guessing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Box Model is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Box Model as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Box Model interact with the cascade and inheritance?",
    "What is a real production use case for Box Model?",
    "Can Box Model affect layout, paint or compositing?",
    "How would you debug Box Model in DevTools?",
    "What accessibility or responsive edge cases matter for Box Model?",
    "How would you test Box Model across supported browsers?"
  ],
  "relatedTopics": [
    "Box Model",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css37",
      "questionNumber": "CSS-037",
      "title": "Content Box",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Box Model",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Content Box"
    },
    "answer": {
  "expectedAnswer": "With `box-sizing: content-box`, the declared width/height apply to content only, while padding and border add to the outer size.",
  "deepExplanation": "With `box-sizing: content-box`, the declared width/height apply to content only, while padding and border add to the outer size. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Content Box:\\n```css\\n.content{box-sizing:content-box;width:200px;padding:20px}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use border-box consistently.",
    "Prefer logical properties.",
    "Avoid fixed heights for variable content.",
    "Test overflow and localization.",
    "Measure layout instead of guessing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Content Box is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Content Box as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Content Box interact with the cascade and inheritance?",
    "What is a real production use case for Content Box?",
    "Can Content Box affect layout, paint or compositing?",
    "How would you debug Content Box in DevTools?",
    "What accessibility or responsive edge cases matter for Content Box?",
    "How would you test Content Box across supported browsers?"
  ],
  "relatedTopics": [
    "Box Model",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css38",
      "questionNumber": "CSS-038",
      "title": "Border Box",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Box Model",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Border Box"
    },
    "answer": {
  "expectedAnswer": "`box-sizing: border-box` makes the declared width/height include content, padding and border. It is a common reset choice because component dimensions become easier to reason about.",
  "deepExplanation": "`box-sizing: border-box` makes the declared width/height include content, padding and border. It is a common reset choice because component dimensions become easier to reason about. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Border Box:\\n```css\\n*{box-sizing:border-box}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use border-box consistently.",
    "Prefer logical properties.",
    "Avoid fixed heights for variable content.",
    "Test overflow and localization.",
    "Measure layout instead of guessing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Border Box is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Border Box as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Border Box interact with the cascade and inheritance?",
    "What is a real production use case for Border Box?",
    "Can Border Box affect layout, paint or compositing?",
    "How would you debug Border Box in DevTools?",
    "What accessibility or responsive edge cases matter for Border Box?",
    "How would you test Border Box across supported browsers?"
  ],
  "relatedTopics": [
    "Box Model",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css39",
      "questionNumber": "CSS-039",
      "title": "Width",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Box Model",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Width"
    },
    "answer": {
  "expectedAnswer": "The `width` property sets an element's preferred content or border-box inline size depending on `box-sizing` and constraints. Modern responsive layouts often pair width with `max-width`, min/max sizing and intrinsic-content rules.",
  "deepExplanation": "The `width` property sets an element's preferred content or border-box inline size depending on `box-sizing` and constraints. Modern responsive layouts often pair width with `max-width`, min/max sizing and intrinsic-content rules. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Width:\\n```css\\n.container{width:100%;max-width:70rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use border-box consistently.",
    "Prefer logical properties.",
    "Avoid fixed heights for variable content.",
    "Test overflow and localization.",
    "Measure layout instead of guessing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Width is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Width as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Width interact with the cascade and inheritance?",
    "What is a real production use case for Width?",
    "Can Width affect layout, paint or compositing?",
    "How would you debug Width in DevTools?",
    "What accessibility or responsive edge cases matter for Width?",
    "How would you test Width across supported browsers?"
  ],
  "relatedTopics": [
    "Box Model",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css40",
      "questionNumber": "CSS-040",
      "title": "Height",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Box Model",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Height"
    },
    "answer": {
  "expectedAnswer": "`height` controls the preferred block size, subject to min/max constraints and the sizing context. Fixed heights can cause clipping when content, font size or localization changes.",
  "deepExplanation": "`height` controls the preferred block size, subject to min/max constraints and the sizing context. Fixed heights can cause clipping when content, font size or localization changes. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Height:\\n```css\\n.panel{min-height:20rem;max-height:60vh;overflow:auto}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use border-box consistently.",
    "Prefer logical properties.",
    "Avoid fixed heights for variable content.",
    "Test overflow and localization.",
    "Measure layout instead of guessing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Height is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Height as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Height interact with the cascade and inheritance?",
    "What is a real production use case for Height?",
    "Can Height affect layout, paint or compositing?",
    "How would you debug Height in DevTools?",
    "What accessibility or responsive edge cases matter for Height?",
    "How would you test Height across supported browsers?"
  ],
  "relatedTopics": [
    "Box Model",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css41",
      "questionNumber": "CSS-041",
      "title": "Margin",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Box Model",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Margin"
    },
    "answer": {
  "expectedAnswer": "Margin creates outer space around a box. Vertical margins between normal-flow block boxes can collapse under specific conditions, while flex/grid containers have different margin behavior.",
  "deepExplanation": "Margin creates outer space around a box. Vertical margins between normal-flow block boxes can collapse under specific conditions, while flex/grid containers have different margin behavior. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Margin:\\n```css\\n.stack > * + *{margin-block-start:1rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use border-box consistently.",
    "Prefer logical properties.",
    "Avoid fixed heights for variable content.",
    "Test overflow and localization.",
    "Measure layout instead of guessing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Margin is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Margin as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Margin interact with the cascade and inheritance?",
    "What is a real production use case for Margin?",
    "Can Margin affect layout, paint or compositing?",
    "How would you debug Margin in DevTools?",
    "What accessibility or responsive edge cases matter for Margin?",
    "How would you test Margin across supported browsers?"
  ],
  "relatedTopics": [
    "Box Model",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css1024",
      "questionNumber": "CSS-042",
      "title": "Padding",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Box Model",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Padding"
    },
    "answer": {
  "expectedAnswer": "Padding creates inner space between content and the border. It contributes to the element's box size according to `box-sizing` and can influence background painting and hit targets.",
  "deepExplanation": "Padding creates inner space between content and the border. It contributes to the element's box size according to `box-sizing` and can influence background painting and hit targets. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Padding:\\n```css\\n.button{padding:.75rem 1rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use border-box consistently.",
    "Prefer logical properties.",
    "Avoid fixed heights for variable content.",
    "Test overflow and localization.",
    "Measure layout instead of guessing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Padding is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Padding as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Padding interact with the cascade and inheritance?",
    "What is a real production use case for Padding?",
    "Can Padding affect layout, paint or compositing?",
    "How would you debug Padding in DevTools?",
    "What accessibility or responsive edge cases matter for Padding?",
    "How would you test Padding across supported browsers?"
  ],
  "relatedTopics": [
    "Box Model",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css43",
      "questionNumber": "CSS-043",
      "title": "Border",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Box Model",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Border"
    },
    "answer": {
  "expectedAnswer": "Borders are painted around the padding box and have width, style and color. Borders contribute to box dimensions under `content-box` but are included under `border-box`.",
  "deepExplanation": "Borders are painted around the padding box and have width, style and color. Borders contribute to box dimensions under `content-box` but are included under `border-box`. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Border:\\n```css\\n.input{border:1px solid #cbd5e1}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use border-box consistently.",
    "Prefer logical properties.",
    "Avoid fixed heights for variable content.",
    "Test overflow and localization.",
    "Measure layout instead of guessing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Border is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Border as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Border interact with the cascade and inheritance?",
    "What is a real production use case for Border?",
    "Can Border affect layout, paint or compositing?",
    "How would you debug Border in DevTools?",
    "What accessibility or responsive edge cases matter for Border?",
    "How would you test Border across supported browsers?"
  ],
  "relatedTopics": [
    "Box Model",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css44",
      "questionNumber": "CSS-044",
      "title": "Outline",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Box Model",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Outline"
    },
    "answer": {
  "expectedAnswer": "An outline is a visual line outside the border and does not normally participate in layout. It is especially important for focus indication because it can highlight an element without changing geometry.",
  "deepExplanation": "An outline is a visual line outside the border and does not normally participate in layout. It is especially important for focus indication because it can highlight an element without changing geometry. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Outline:\\n```css\\n:focus-visible{outline:3px solid #2563eb;outline-offset:2px}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use border-box consistently.",
    "Prefer logical properties.",
    "Avoid fixed heights for variable content.",
    "Test overflow and localization.",
    "Measure layout instead of guessing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Outline is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Outline as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Outline interact with the cascade and inheritance?",
    "What is a real production use case for Outline?",
    "Can Outline affect layout, paint or compositing?",
    "How would you debug Outline in DevTools?",
    "What accessibility or responsive edge cases matter for Outline?",
    "How would you test Outline across supported browsers?"
  ],
  "relatedTopics": [
    "Box Model",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css45",
      "questionNumber": "CSS-045",
      "title": "box-sizing",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Box Model",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "box-sizing"
    },
    "answer": {
  "expectedAnswer": "`box-sizing` controls how declared width/height are interpreted. `border-box` is commonly used globally to make padding and borders part of the declared size.",
  "deepExplanation": "`box-sizing` controls how declared width/height are interpreted. `border-box` is commonly used globally to make padding and borders part of the declared size. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for box-sizing:\\n```css\\n*,*::before,*::after{box-sizing:border-box}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use border-box consistently.",
    "Prefer logical properties.",
    "Avoid fixed heights for variable content.",
    "Test overflow and localization.",
    "Measure layout instead of guessing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for box-sizing is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating box-sizing as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does box-sizing interact with the cascade and inheritance?",
    "What is a real production use case for box-sizing?",
    "Can box-sizing affect layout, paint or compositing?",
    "How would you debug box-sizing in DevTools?",
    "What accessibility or responsive edge cases matter for box-sizing?",
    "How would you test box-sizing across supported browsers?"
  ],
  "relatedTopics": [
    "Box Model",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css46",
      "questionNumber": "CSS-046",
      "title": "Overflow",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Box Model",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Overflow"
    },
    "answer": {
  "expectedAnswer": "Overflow determines what happens when content exceeds a box's available space, using values such as `visible`, `hidden`, `clip`, `scroll` and `auto`. Overflow can create scrolling containers and affect containing/stacking behavior.",
  "deepExplanation": "Overflow determines what happens when content exceeds a box's available space, using values such as `visible`, `hidden`, `clip`, `scroll` and `auto`. Overflow can create scrolling containers and affect containing/stacking behavior. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Overflow:\\n```css\\n.code{overflow:auto;max-inline-size:100%}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use border-box consistently.",
    "Prefer logical properties.",
    "Avoid fixed heights for variable content.",
    "Test overflow and localization.",
    "Measure layout instead of guessing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Overflow is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Overflow as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Overflow interact with the cascade and inheritance?",
    "What is a real production use case for Overflow?",
    "Can Overflow affect layout, paint or compositing?",
    "How would you debug Overflow in DevTools?",
    "What accessibility or responsive edge cases matter for Overflow?",
    "How would you test Overflow across supported browsers?"
  ],
  "relatedTopics": [
    "Box Model",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css47",
      "questionNumber": "CSS-047",
      "title": "Margin Collapse",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Box Model",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Margin Collapse"
    },
    "answer": {
  "expectedAnswer": "Margin collapse occurs for certain block-flow margins, commonly between adjacent siblings or parent/first-child boundaries. It does not behave the same way inside flex/grid containers, and establishing a new formatting context can prevent some collapses.",
  "deepExplanation": "Margin collapse occurs for certain block-flow margins, commonly between adjacent siblings or parent/first-child boundaries. It does not behave the same way inside flex/grid containers, and establishing a new formatting context can prevent some collapses. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Margin Collapse:\\n```css\\n.section{display:flow-root}.section h2{margin-block-start:2rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use border-box consistently.",
    "Prefer logical properties.",
    "Avoid fixed heights for variable content.",
    "Test overflow and localization.",
    "Measure layout instead of guessing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Margin Collapse is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Margin Collapse as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Margin Collapse interact with the cascade and inheritance?",
    "What is a real production use case for Margin Collapse?",
    "Can Margin Collapse affect layout, paint or compositing?",
    "How would you debug Margin Collapse in DevTools?",
    "What accessibility or responsive edge cases matter for Margin Collapse?",
    "How would you test Margin Collapse across supported browsers?"
  ],
  "relatedTopics": [
    "Box Model",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css48",
      "questionNumber": "CSS-048",
      "title": "Display Property",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Box Model",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Display Property"
    },
    "answer": {
  "expectedAnswer": "The `display` property controls an element's outer/inner display types, such as block, inline, flex, grid, table or none. Modern two-value display concepts help explain how an element participates externally and lays out its children internally.",
  "deepExplanation": "The `display` property controls an element's outer/inner display types, such as block, inline, flex, grid, table or none. Modern two-value display concepts help explain how an element participates externally and lays out its children internally. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Display Property:\\n```css\\n.layout{display:grid}.hidden{display:none}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use border-box consistently.",
    "Prefer logical properties.",
    "Avoid fixed heights for variable content.",
    "Test overflow and localization.",
    "Measure layout instead of guessing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Display Property is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Display Property as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Display Property interact with the cascade and inheritance?",
    "What is a real production use case for Display Property?",
    "Can Display Property affect layout, paint or compositing?",
    "How would you debug Display Property in DevTools?",
    "What accessibility or responsive edge cases matter for Display Property?",
    "How would you test Display Property across supported browsers?"
  ],
  "relatedTopics": [
    "Box Model",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css49",
      "questionNumber": "CSS-049",
      "title": "Visibility",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Box Model",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Visibility"
    },
    "answer": {
  "expectedAnswer": "`visibility: hidden` hides an element visually while generally preserving its layout box; descendants can override visibility in some cases. It differs from `display: none`, which removes the box from normal layout.",
  "deepExplanation": "`visibility: hidden` hides an element visually while generally preserving its layout box; descendants can override visibility in some cases. It differs from `display: none`, which removes the box from normal layout. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Visibility:\\n```css\\n.visuallyHidden?{visibility:hidden}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use border-box consistently.",
    "Prefer logical properties.",
    "Avoid fixed heights for variable content.",
    "Test overflow and localization.",
    "Measure layout instead of guessing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Visibility is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Visibility as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Visibility interact with the cascade and inheritance?",
    "What is a real production use case for Visibility?",
    "Can Visibility affect layout, paint or compositing?",
    "How would you debug Visibility in DevTools?",
    "What accessibility or responsive edge cases matter for Visibility?",
    "How would you test Visibility across supported browsers?"
  ],
  "relatedTopics": [
    "Box Model",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css50",
      "questionNumber": "CSS-050",
      "title": "Box Model Interview Questions",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Box Model",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0–2 Years",
      "question": "Box Model Interview Questions"
    },
    "answer": {
  "expectedAnswer": "Box-model questions test whether you can reason about declared size, padding, border, margin, `box-sizing`, overflow and layout context rather than memorizing isolated definitions.",
  "deepExplanation": "Box-model questions test whether you can reason about declared size, padding, border, margin, `box-sizing`, overflow and layout context rather than memorizing isolated definitions. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Box Model Interview Questions:\\n```css\\n.card{box-sizing:border-box;padding:1rem;border:2px solid}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use border-box consistently.",
    "Prefer logical properties.",
    "Avoid fixed heights for variable content.",
    "Test overflow and localization.",
    "Measure layout instead of guessing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Box Model Interview Questions is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Box Model Interview Questions as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Box Model Interview Questions interact with the cascade and inheritance?",
    "What is a real production use case for Box Model Interview Questions?",
    "Can Box Model Interview Questions affect layout, paint or compositing?",
    "How would you debug Box Model Interview Questions in DevTools?",
    "What accessibility or responsive edge cases matter for Box Model Interview Questions?",
    "How would you test Box Model Interview Questions across supported browsers?"
  ],
  "relatedTopics": [
    "Box Model",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css51",
      "questionNumber": "CSS-051",
      "title": "Static",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Static"
    },
    "answer": {
  "expectedAnswer": "`position: static` is the normal positioning mode. Offset properties such as top/right/bottom/left do not apply to a statically positioned box.",
  "deepExplanation": "`position: static` is the normal positioning mode. Offset properties such as top/right/bottom/left do not apply to a statically positioned box. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Static:\\n```css\\n.item{position:static}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Static is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Static as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Static interact with the cascade and inheritance?",
    "What is a real production use case for Static?",
    "Can Static affect layout, paint or compositing?",
    "How would you debug Static in DevTools?",
    "What accessibility or responsive edge cases matter for Static?",
    "How would you test Static across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css52",
      "questionNumber": "CSS-052",
      "title": "Relative",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Relative"
    },
    "answer": {
  "expectedAnswer": "`position: relative` keeps the element in normal flow while allowing offsets from its normal position and establishing a positioning context for absolutely positioned descendants.",
  "deepExplanation": "`position: relative` keeps the element in normal flow while allowing offsets from its normal position and establishing a positioning context for absolutely positioned descendants. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Relative:\\n```css\\n.badge{position:relative;top:-2px}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Relative is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Relative as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Relative interact with the cascade and inheritance?",
    "What is a real production use case for Relative?",
    "Can Relative affect layout, paint or compositing?",
    "How would you debug Relative in DevTools?",
    "What accessibility or responsive edge cases matter for Relative?",
    "How would you test Relative across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css53",
      "questionNumber": "CSS-053",
      "title": "Absolute",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Absolute"
    },
    "answer": {
  "expectedAnswer": "`position: absolute` removes the element from normal flow and positions it relative to its containing block, often established by a positioned ancestor or another containing-block mechanism.",
  "deepExplanation": "`position: absolute` removes the element from normal flow and positions it relative to its containing block, often established by a positioned ancestor or another containing-block mechanism. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Absolute:\\n```css\\n.menu{position:absolute;inset-block-start:100%;inset-inline-end:0}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Absolute is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Absolute as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Absolute interact with the cascade and inheritance?",
    "What is a real production use case for Absolute?",
    "Can Absolute affect layout, paint or compositing?",
    "How would you debug Absolute in DevTools?",
    "What accessibility or responsive edge cases matter for Absolute?",
    "How would you test Absolute across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css54",
      "questionNumber": "CSS-054",
      "title": "Fixed",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Fixed"
    },
    "answer": {
  "expectedAnswer": "`position: fixed` positions a box relative to a viewport-like containing block in common cases and removes it from normal flow. Certain transforms/containment can affect its containing-block behavior.",
  "deepExplanation": "`position: fixed` positions a box relative to a viewport-like containing block in common cases and removes it from normal flow. Certain transforms/containment can affect its containing-block behavior. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Fixed:\\n```css\\n.toast{position:fixed;inset-inline-end:1rem;inset-block-end:1rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Fixed is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Fixed as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Fixed interact with the cascade and inheritance?",
    "What is a real production use case for Fixed?",
    "Can Fixed affect layout, paint or compositing?",
    "How would you debug Fixed in DevTools?",
    "What accessibility or responsive edge cases matter for Fixed?",
    "How would you test Fixed across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css55",
      "questionNumber": "CSS-055",
      "title": "Sticky",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Sticky"
    },
    "answer": {
  "expectedAnswer": "`position: sticky` behaves like relatively positioned content until a scroll threshold is reached, then sticks within its scroll/containing boundaries. It depends on an appropriate scroll container and inset constraint.",
  "deepExplanation": "`position: sticky` behaves like relatively positioned content until a scroll threshold is reached, then sticks within its scroll/containing boundaries. It depends on an appropriate scroll container and inset constraint. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Sticky:\\n```css\\n.header{position:sticky;top:0}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Sticky is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Sticky as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Sticky interact with the cascade and inheritance?",
    "What is a real production use case for Sticky?",
    "Can Sticky affect layout, paint or compositing?",
    "How would you debug Sticky in DevTools?",
    "What accessibility or responsive edge cases matter for Sticky?",
    "How would you test Sticky across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css56",
      "questionNumber": "CSS-056",
      "title": "z-index",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "z-index"
    },
    "answer": {
  "expectedAnswer": "`z-index` controls stacking order within applicable stacking contexts. A large z-index cannot escape a parent stacking context that is below another sibling stacking context.",
  "deepExplanation": "`z-index` controls stacking order within applicable stacking contexts. A large z-index cannot escape a parent stacking context that is below another sibling stacking context. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for z-index:\\n```css\\n.modal{position:fixed;z-index:1000}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for z-index is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating z-index as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does z-index interact with the cascade and inheritance?",
    "What is a real production use case for z-index?",
    "Can z-index affect layout, paint or compositing?",
    "How would you debug z-index in DevTools?",
    "What accessibility or responsive edge cases matter for z-index?",
    "How would you test z-index across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css57",
      "questionNumber": "CSS-057",
      "title": "Stacking Context",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Stacking Context"
    },
    "answer": {
  "expectedAnswer": "A stacking context is an independent painting/compositing order boundary created by conditions such as positioned elements with z-index, opacity below 1, transforms, isolation and several other features. z-index comparisons happen within the relevant context.",
  "deepExplanation": "A stacking context is an independent painting/compositing order boundary created by conditions such as positioned elements with z-index, opacity below 1, transforms, isolation and several other features. z-index comparisons happen within the relevant context. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Stacking Context:\\n```css\\n.card{isolation:isolate}.badge{position:absolute;z-index:1}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Stacking Context is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Stacking Context as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Stacking Context interact with the cascade and inheritance?",
    "What is a real production use case for Stacking Context?",
    "Can Stacking Context affect layout, paint or compositing?",
    "How would you debug Stacking Context in DevTools?",
    "What accessibility or responsive edge cases matter for Stacking Context?",
    "How would you test Stacking Context across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css58",
      "questionNumber": "CSS-058",
      "title": "Top",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Top"
    },
    "answer": {
  "expectedAnswer": "`top` offsets a positioned element from the relevant containing-block edge; it has no effect on `position: static`.",
  "deepExplanation": "`top` offsets a positioned element from the relevant containing-block edge; it has no effect on `position: static`. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Top:\\n```css\\n.badge{position:absolute;top:.5rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Top is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Top as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Top interact with the cascade and inheritance?",
    "What is a real production use case for Top?",
    "Can Top affect layout, paint or compositing?",
    "How would you debug Top in DevTools?",
    "What accessibility or responsive edge cases matter for Top?",
    "How would you test Top across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css59",
      "questionNumber": "CSS-059",
      "title": "Bottom",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Bottom"
    },
    "answer": {
  "expectedAnswer": "`bottom` offsets a positioned element from the relevant containing-block edge when its positioning mode supports offsets.",
  "deepExplanation": "`bottom` offsets a positioned element from the relevant containing-block edge when its positioning mode supports offsets. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Bottom:\\n```css\\n.footer{position:absolute;bottom:0}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Bottom is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Bottom as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Bottom interact with the cascade and inheritance?",
    "What is a real production use case for Bottom?",
    "Can Bottom affect layout, paint or compositing?",
    "How would you debug Bottom in DevTools?",
    "What accessibility or responsive edge cases matter for Bottom?",
    "How would you test Bottom across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css60",
      "questionNumber": "CSS-060",
      "title": "Left",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Left"
    },
    "answer": {
  "expectedAnswer": "`left` offsets a positioned element from the relevant containing-block edge. Logical properties such as `inset-inline-start` are preferable for writing-mode-aware layouts.",
  "deepExplanation": "`left` offsets a positioned element from the relevant containing-block edge. Logical properties such as `inset-inline-start` are preferable for writing-mode-aware layouts. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Left:\\n```css\\n.badge{position:absolute;inset-inline-start:0}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Left is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Left as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Left interact with the cascade and inheritance?",
    "What is a real production use case for Left?",
    "Can Left affect layout, paint or compositing?",
    "How would you debug Left in DevTools?",
    "What accessibility or responsive edge cases matter for Left?",
    "How would you test Left across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css61",
      "questionNumber": "CSS-061",
      "title": "Right",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Right"
    },
    "answer": {
  "expectedAnswer": "`right` offsets a positioned element from the relevant containing-block edge. Logical properties can express direction-aware intent.",
  "deepExplanation": "`right` offsets a positioned element from the relevant containing-block edge. Logical properties can express direction-aware intent. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Right:\\n```css\\n.badge{position:absolute;inset-inline-end:0}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Right is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Right as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Right interact with the cascade and inheritance?",
    "What is a real production use case for Right?",
    "Can Right affect layout, paint or compositing?",
    "How would you debug Right in DevTools?",
    "What accessibility or responsive edge cases matter for Right?",
    "How would you test Right across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css62",
      "questionNumber": "CSS-062",
      "title": "Positioning Best Practices",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Positioning Best Practices"
    },
    "answer": {
  "expectedAnswer": "Prefer normal flow, Flexbox and Grid for layout; use positioned layout for overlays, anchored UI and deliberate exceptions. Define containing blocks intentionally, use logical insets where appropriate, and debug stacking contexts instead of adding arbitrary z-index values.",
  "deepExplanation": "Prefer normal flow, Flexbox and Grid for layout; use positioned layout for overlays, anchored UI and deliberate exceptions. Define containing blocks intentionally, use logical insets where appropriate, and debug stacking contexts instead of adding arbitrary z-index values. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Positioning Best Practices:\\n```css\\n.popover{position:absolute;inset-block-start:100%;inset-inline-start:0}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Positioning Best Practices is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Positioning Best Practices as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Positioning Best Practices interact with the cascade and inheritance?",
    "What is a real production use case for Positioning Best Practices?",
    "Can Positioning Best Practices affect layout, paint or compositing?",
    "How would you debug Positioning Best Practices in DevTools?",
    "What accessibility or responsive edge cases matter for Positioning Best Practices?",
    "How would you test Positioning Best Practices across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css63",
      "questionNumber": "CSS-063",
      "title": "Centering Techniques",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Centering Techniques"
    },
    "answer": {
  "expectedAnswer": "Centering can be achieved with Flexbox/Grid alignment, auto margins, or carefully calculated positioning depending on whether the goal is one-dimensional, two-dimensional, or overlay centering. Prefer layout primitives over transform hacks for ordinary layout.",
  "deepExplanation": "Centering can be achieved with Flexbox/Grid alignment, auto margins, or carefully calculated positioning depending on whether the goal is one-dimensional, two-dimensional, or overlay centering. Prefer layout primitives over transform hacks for ordinary layout. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Centering Techniques:\\n```css\\n.center{display:grid;place-items:center;min-height:100%}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Centering Techniques is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Centering Techniques as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Centering Techniques interact with the cascade and inheritance?",
    "What is a real production use case for Centering Techniques?",
    "Can Centering Techniques affect layout, paint or compositing?",
    "How would you debug Centering Techniques in DevTools?",
    "What accessibility or responsive edge cases matter for Centering Techniques?",
    "How would you test Centering Techniques across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css64",
      "questionNumber": "CSS-064",
      "title": "Layering",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Layering"
    },
    "answer": {
  "expectedAnswer": "Layering combines stacking contexts, z-index and painting order. Reliable layering requires understanding the parent stacking contexts and avoiding arbitrary z-index scales that mask architecture problems.",
  "deepExplanation": "Layering combines stacking contexts, z-index and painting order. Reliable layering requires understanding the parent stacking contexts and avoiding arbitrary z-index scales that mask architecture problems. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Layering:\\n```css\\n.backdrop{position:fixed;z-index:900}.modal{position:fixed;z-index:1000}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Layering is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Layering as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Layering interact with the cascade and inheritance?",
    "What is a real production use case for Layering?",
    "Can Layering affect layout, paint or compositing?",
    "How would you debug Layering in DevTools?",
    "What accessibility or responsive edge cases matter for Layering?",
    "How would you test Layering across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css65",
      "questionNumber": "CSS-065",
      "title": "Float",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Float"
    },
    "answer": {
  "expectedAnswer": "Floats take an element out of ordinary inline flow so surrounding inline content can wrap around it. They remain useful for text wrapping around media, but modern page/component layout should generally use Flexbox/Grid.",
  "deepExplanation": "Floats take an element out of ordinary inline flow so surrounding inline content can wrap around it. They remain useful for text wrapping around media, but modern page/component layout should generally use Flexbox/Grid. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Float:\\n```css\\n.article img{float:inline-start;margin-inline-end:1rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Float is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Float as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Float interact with the cascade and inheritance?",
    "What is a real production use case for Float?",
    "Can Float affect layout, paint or compositing?",
    "How would you debug Float in DevTools?",
    "What accessibility or responsive edge cases matter for Float?",
    "How would you test Float across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css66",
      "questionNumber": "CSS-066",
      "title": "Clear",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Clear"
    },
    "answer": {
  "expectedAnswer": "`clear` prevents an element from being placed beside floated content on the specified side(s). It is mainly relevant to legacy float-based layouts.",
  "deepExplanation": "`clear` prevents an element from being placed beside floated content on the specified side(s). It is mainly relevant to legacy float-based layouts. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Clear:\\n```css\\n.footer{clear:both}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Clear is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Clear as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Clear interact with the cascade and inheritance?",
    "What is a real production use case for Clear?",
    "Can Clear affect layout, paint or compositing?",
    "How would you debug Clear in DevTools?",
    "What accessibility or responsive edge cases matter for Clear?",
    "How would you test Clear across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css67",
      "questionNumber": "CSS-067",
      "title": "Containing Block",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Containing Block"
    },
    "answer": {
  "expectedAnswer": "A containing block is the reference rectangle used by many sizing and positioning calculations. Its origin depends on the formatting/positioning context, so absolutely/fixed positioned elements are not always relative to the viewport.",
  "deepExplanation": "A containing block is the reference rectangle used by many sizing and positioning calculations. Its origin depends on the formatting/positioning context, so absolutely/fixed positioned elements are not always relative to the viewport. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Containing Block:\\n```css\\n.parent{position:relative}.child{position:absolute;inset:0}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Containing Block is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Containing Block as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Containing Block interact with the cascade and inheritance?",
    "What is a real production use case for Containing Block?",
    "Can Containing Block affect layout, paint or compositing?",
    "How would you debug Containing Block in DevTools?",
    "What accessibility or responsive edge cases matter for Containing Block?",
    "How would you test Containing Block across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css68",
      "questionNumber": "CSS-068",
      "title": "Offset Parent",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Offset Parent"
    },
    "answer": {
  "expectedAnswer": "The `offsetParent` DOM property exposes the ancestor used for `offsetTop/offsetLeft` calculations in the legacy layout coordinate system. It is useful for measurements/debugging but is not identical to the full CSS containing-block model.",
  "deepExplanation": "The `offsetParent` DOM property exposes the ancestor used for `offsetTop/offsetLeft` calculations in the legacy layout coordinate system. It is useful for measurements/debugging but is not identical to the full CSS containing-block model. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Offset Parent:\\n```css\\nconst box = el.offsetParent;\\nconst x = el.offsetLeft;\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Offset Parent is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Offset Parent as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Offset Parent interact with the cascade and inheritance?",
    "What is a real production use case for Offset Parent?",
    "Can Offset Parent affect layout, paint or compositing?",
    "How would you debug Offset Parent in DevTools?",
    "What accessibility or responsive edge cases matter for Offset Parent?",
    "How would you test Offset Parent across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css69",
      "questionNumber": "CSS-069",
      "title": "Common Position Bugs",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Common Position Bugs"
    },
    "answer": {
  "expectedAnswer": "Common positioning bugs include the wrong containing block, clipped overflow, unexpected stacking contexts, sticky elements inside the wrong scroll container, and fixed elements affected by transforms/containment.",
  "deepExplanation": "Common positioning bugs include the wrong containing block, clipped overflow, unexpected stacking contexts, sticky elements inside the wrong scroll container, and fixed elements affected by transforms/containment. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Common Position Bugs:\\n```css\\n.modal{position:fixed;z-index:1000;inset:0}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Common Position Bugs is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Common Position Bugs as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Common Position Bugs interact with the cascade and inheritance?",
    "What is a real production use case for Common Position Bugs?",
    "Can Common Position Bugs affect layout, paint or compositing?",
    "How would you debug Common Position Bugs in DevTools?",
    "What accessibility or responsive edge cases matter for Common Position Bugs?",
    "How would you test Common Position Bugs across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css70",
      "questionNumber": "CSS-070",
      "title": "Position Interview Questions",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Positioning",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Position Interview Questions"
    },
    "answer": {
  "expectedAnswer": "Positioning interviews test containing blocks, normal flow, stacking contexts, offsets, sticky/fixed behavior, and why Flexbox/Grid are usually better for primary layout.",
  "deepExplanation": "Positioning interviews test containing blocks, normal flow, stacking contexts, offsets, sticky/fixed behavior, and why Flexbox/Grid are usually better for primary layout. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Position Interview Questions:\\n```css\\n.overlay{position:fixed;inset:0;display:grid;place-items:center}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer normal flow/Flexbox/Grid for primary layout.",
    "Define containing blocks intentionally.",
    "Use logical inset properties.",
    "Keep z-index scales small and documented.",
    "Test sticky/overflow/stacking behavior."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Position Interview Questions is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Position Interview Questions as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Position Interview Questions interact with the cascade and inheritance?",
    "What is a real production use case for Position Interview Questions?",
    "Can Position Interview Questions affect layout, paint or compositing?",
    "How would you debug Position Interview Questions in DevTools?",
    "What accessibility or responsive edge cases matter for Position Interview Questions?",
    "How would you test Position Interview Questions across supported browsers?"
  ],
  "relatedTopics": [
    "Positioning",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css71",
      "questionNumber": "CSS-071",
      "title": "Introduction to Flexbox",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Introduction to Flexbox"
    },
    "answer": {
  "expectedAnswer": "Flexbox is a one-dimensional layout model for arranging items along a main axis while controlling alignment and distribution on the cross axis. It is ideal for rows/columns, toolbars, cards, navigation and component internals.",
  "deepExplanation": "Flexbox is a one-dimensional layout model for arranging items along a main axis while controlling alignment and distribution on the cross axis. It is ideal for rows/columns, toolbars, cards, navigation and component internals. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Introduction to Flexbox:\\n```css\\n.toolbar{display:flex;align-items:center;gap:.75rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Introduction to Flexbox is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Introduction to Flexbox as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Introduction to Flexbox interact with the cascade and inheritance?",
    "What is a real production use case for Introduction to Flexbox?",
    "Can Introduction to Flexbox affect layout, paint or compositing?",
    "How would you debug Introduction to Flexbox in DevTools?",
    "What accessibility or responsive edge cases matter for Introduction to Flexbox?",
    "How would you test Introduction to Flexbox across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css72",
      "questionNumber": "CSS-072",
      "title": "Main Axis",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Main Axis"
    },
    "answer": {
  "expectedAnswer": "The flex main axis is determined by `flex-direction` and is the axis along which flex items are laid out and where `justify-content` operates.",
  "deepExplanation": "The flex main axis is determined by `flex-direction` and is the axis along which flex items are laid out and where `justify-content` operates. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Main Axis:\\n```css\\n.row{display:flex;flex-direction:row;justify-content:space-between}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Main Axis is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Main Axis as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Main Axis interact with the cascade and inheritance?",
    "What is a real production use case for Main Axis?",
    "Can Main Axis affect layout, paint or compositing?",
    "How would you debug Main Axis in DevTools?",
    "What accessibility or responsive edge cases matter for Main Axis?",
    "How would you test Main Axis across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css73",
      "questionNumber": "CSS-073",
      "title": "Cross Axis",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Cross Axis"
    },
    "answer": {
  "expectedAnswer": "The cross axis is perpendicular to the main axis. `align-items` and related properties primarily control alignment along this axis.",
  "deepExplanation": "The cross axis is perpendicular to the main axis. `align-items` and related properties primarily control alignment along this axis. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Cross Axis:\\n```css\\n.row{display:flex;align-items:center}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Cross Axis is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Cross Axis as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Cross Axis interact with the cascade and inheritance?",
    "What is a real production use case for Cross Axis?",
    "Can Cross Axis affect layout, paint or compositing?",
    "How would you debug Cross Axis in DevTools?",
    "What accessibility or responsive edge cases matter for Cross Axis?",
    "How would you test Cross Axis across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css74",
      "questionNumber": "CSS-074",
      "title": "display:flex",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "display:flex"
    },
    "answer": {
  "expectedAnswer": "`display: flex` creates a flex formatting context and makes direct children flex items. It is a layout primitive, not merely a visual styling switch.",
  "deepExplanation": "`display: flex` creates a flex formatting context and makes direct children flex items. It is a layout primitive, not merely a visual styling switch. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for display:flex:\\n```css\\n.nav{display:flex}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for display:flex is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating display:flex as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does display:flex interact with the cascade and inheritance?",
    "What is a real production use case for display:flex?",
    "Can display:flex affect layout, paint or compositing?",
    "How would you debug display:flex in DevTools?",
    "What accessibility or responsive edge cases matter for display:flex?",
    "How would you test display:flex across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css75",
      "questionNumber": "CSS-075",
      "title": "flex-direction",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "flex-direction"
    },
    "answer": {
  "expectedAnswer": "`flex-direction` chooses the main-axis direction: row, row-reverse, column or column-reverse. Changing it also changes what main/cross-axis alignment means.",
  "deepExplanation": "`flex-direction` chooses the main-axis direction: row, row-reverse, column or column-reverse. Changing it also changes what main/cross-axis alignment means. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for flex-direction:\\n```css\\n.stack{display:flex;flex-direction:column}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for flex-direction is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating flex-direction as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does flex-direction interact with the cascade and inheritance?",
    "What is a real production use case for flex-direction?",
    "Can flex-direction affect layout, paint or compositing?",
    "How would you debug flex-direction in DevTools?",
    "What accessibility or responsive edge cases matter for flex-direction?",
    "How would you test flex-direction across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css76",
      "questionNumber": "CSS-076",
      "title": "flex-wrap",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "flex-wrap"
    },
    "answer": {
  "expectedAnswer": "`flex-wrap` determines whether flex items stay on one line or can wrap onto multiple lines. Wrapping creates flex lines that can be distributed using `align-content`.",
  "deepExplanation": "`flex-wrap` determines whether flex items stay on one line or can wrap onto multiple lines. Wrapping creates flex lines that can be distributed using `align-content`. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for flex-wrap:\\n```css\\n.chips{display:flex;flex-wrap:wrap;gap:.5rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for flex-wrap is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating flex-wrap as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does flex-wrap interact with the cascade and inheritance?",
    "What is a real production use case for flex-wrap?",
    "Can flex-wrap affect layout, paint or compositing?",
    "How would you debug flex-wrap in DevTools?",
    "What accessibility or responsive edge cases matter for flex-wrap?",
    "How would you test flex-wrap across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css77",
      "questionNumber": "CSS-077",
      "title": "flex-flow",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "flex-flow"
    },
    "answer": {
  "expectedAnswer": "`flex-flow` is the shorthand for `flex-direction` and `flex-wrap`.",
  "deepExplanation": "`flex-flow` is the shorthand for `flex-direction` and `flex-wrap`. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for flex-flow:\\n```css\\n.chips{display:flex;flex-flow:row wrap;gap:.5rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for flex-flow is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating flex-flow as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does flex-flow interact with the cascade and inheritance?",
    "What is a real production use case for flex-flow?",
    "Can flex-flow affect layout, paint or compositing?",
    "How would you debug flex-flow in DevTools?",
    "What accessibility or responsive edge cases matter for flex-flow?",
    "How would you test flex-flow across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css78",
      "questionNumber": "CSS-078",
      "title": "justify-content",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "justify-content"
    },
    "answer": {
  "expectedAnswer": "`justify-content` distributes free space along the flex main axis. Its effect depends on the available free space after flex sizing/min-max constraints.",
  "deepExplanation": "`justify-content` distributes free space along the flex main axis. Its effect depends on the available free space after flex sizing/min-max constraints. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for justify-content:\\n```css\\n.toolbar{display:flex;justify-content:space-between}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for justify-content is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating justify-content as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does justify-content interact with the cascade and inheritance?",
    "What is a real production use case for justify-content?",
    "Can justify-content affect layout, paint or compositing?",
    "How would you debug justify-content in DevTools?",
    "What accessibility or responsive edge cases matter for justify-content?",
    "How would you test justify-content across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css79",
      "questionNumber": "CSS-079",
      "title": "align-items",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "align-items"
    },
    "answer": {
  "expectedAnswer": "`align-items` sets the default block/cross-axis alignment of grid items within their grid areas.",
  "deepExplanation": "`align-items` sets the default block/cross-axis alignment of grid items within their grid areas. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for align-items:\\n```css\\n.grid{align-items:center}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for align-items is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating align-items as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does align-items interact with the cascade and inheritance?",
    "What is a real production use case for align-items?",
    "Can align-items affect layout, paint or compositing?",
    "How would you debug align-items in DevTools?",
    "What accessibility or responsive edge cases matter for align-items?",
    "How would you test align-items across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css80",
      "questionNumber": "CSS-080",
      "title": "align-content",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "align-content"
    },
    "answer": {
  "expectedAnswer": "`align-content` distributes free space between flex lines when a flex container wraps and has extra cross-axis space. It does not align items on a single line.",
  "deepExplanation": "`align-content` distributes free space between flex lines when a flex container wraps and has extra cross-axis space. It does not align items on a single line. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for align-content:\\n```css\\n.gridLike{display:flex;flex-wrap:wrap;align-content:space-between}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for align-content is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating align-content as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does align-content interact with the cascade and inheritance?",
    "What is a real production use case for align-content?",
    "Can align-content affect layout, paint or compositing?",
    "How would you debug align-content in DevTools?",
    "What accessibility or responsive edge cases matter for align-content?",
    "How would you test align-content across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css81",
      "questionNumber": "CSS-081",
      "title": "align-self",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "align-self"
    },
    "answer": {
  "expectedAnswer": "`align-self` overrides the container's `align-items` setting for one flex item.",
  "deepExplanation": "`align-self` overrides the container's `align-items` setting for one flex item. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for align-self:\\n```css\\n.cta{align-self:flex-end}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for align-self is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating align-self as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does align-self interact with the cascade and inheritance?",
    "What is a real production use case for align-self?",
    "Can align-self affect layout, paint or compositing?",
    "How would you debug align-self in DevTools?",
    "What accessibility or responsive edge cases matter for align-self?",
    "How would you test align-self across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css82",
      "questionNumber": "CSS-082",
      "title": "order",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "order"
    },
    "answer": {
  "expectedAnswer": "`order` changes the visual ordering of flex/grid items without changing DOM order. It should not be used to fix semantic source order because assistive technologies and keyboard navigation follow the DOM.",
  "deepExplanation": "`order` changes the visual ordering of flex/grid items without changing DOM order. It should not be used to fix semantic source order because assistive technologies and keyboard navigation follow the DOM. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for order:\\n```css\\n.item{order:2}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for order is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating order as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does order interact with the cascade and inheritance?",
    "What is a real production use case for order?",
    "Can order affect layout, paint or compositing?",
    "How would you debug order in DevTools?",
    "What accessibility or responsive edge cases matter for order?",
    "How would you test order across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css83",
      "questionNumber": "CSS-083",
      "title": "flex-grow",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "flex-grow"
    },
    "answer": {
  "expectedAnswer": "`flex-grow` defines how a flex item participates in distributing positive free space. Larger grow factors receive more of the available remaining space.",
  "deepExplanation": "`flex-grow` defines how a flex item participates in distributing positive free space. Larger grow factors receive more of the available remaining space. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for flex-grow:\\n```css\\n.main{flex-grow:1}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for flex-grow is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating flex-grow as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does flex-grow interact with the cascade and inheritance?",
    "What is a real production use case for flex-grow?",
    "Can flex-grow affect layout, paint or compositing?",
    "How would you debug flex-grow in DevTools?",
    "What accessibility or responsive edge cases matter for flex-grow?",
    "How would you test flex-grow across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css84",
      "questionNumber": "CSS-084",
      "title": "flex-shrink",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "flex-shrink"
    },
    "answer": {
  "expectedAnswer": "`flex-shrink` defines how a flex item participates when the flex line has insufficient space. Flex items can also be constrained by min-size rules.",
  "deepExplanation": "`flex-shrink` defines how a flex item participates when the flex line has insufficient space. Flex items can also be constrained by min-size rules. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for flex-shrink:\\n```css\\n.label{flex-shrink:0}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for flex-shrink is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating flex-shrink as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does flex-shrink interact with the cascade and inheritance?",
    "What is a real production use case for flex-shrink?",
    "Can flex-shrink affect layout, paint or compositing?",
    "How would you debug flex-shrink in DevTools?",
    "What accessibility or responsive edge cases matter for flex-shrink?",
    "How would you test flex-shrink across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css85",
      "questionNumber": "CSS-085",
      "title": "flex-basis",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "flex-basis"
    },
    "answer": {
  "expectedAnswer": "`flex-basis` sets the initial main-size contribution before grow/shrink distribution. `auto` can use the item's main-size property; explicit values are often more predictable in component layouts.",
  "deepExplanation": "`flex-basis` sets the initial main-size contribution before grow/shrink distribution. `auto` can use the item's main-size property; explicit values are often more predictable in component layouts. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for flex-basis:\\n```css\\n.sidebar{flex:0 1 18rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for flex-basis is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating flex-basis as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does flex-basis interact with the cascade and inheritance?",
    "What is a real production use case for flex-basis?",
    "Can flex-basis affect layout, paint or compositing?",
    "How would you debug flex-basis in DevTools?",
    "What accessibility or responsive edge cases matter for flex-basis?",
    "How would you test flex-basis across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css86",
      "questionNumber": "CSS-086",
      "title": "gap",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "gap"
    },
    "answer": {
  "expectedAnswer": "The `gap` property creates consistent spacing between flex/grid items without margin-collapsing or edge-trim logic.",
  "deepExplanation": "The `gap` property creates consistent spacing between flex/grid items without margin-collapsing or edge-trim logic. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for gap:\\n```css\\n.toolbar{display:flex;gap:1rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for gap is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating gap as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does gap interact with the cascade and inheritance?",
    "What is a real production use case for gap?",
    "Can gap affect layout, paint or compositing?",
    "How would you debug gap in DevTools?",
    "What accessibility or responsive edge cases matter for gap?",
    "How would you test gap across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css87",
      "questionNumber": "CSS-087",
      "title": "Nested Flexbox",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Nested Flexbox"
    },
    "answer": {
  "expectedAnswer": "Nested flex containers let one component control internal layout while its parent controls external placement. Keep responsibilities local and be aware that min-content sizing/min-width behavior can cause overflow in deeply nested flex layouts.",
  "deepExplanation": "Nested flex containers let one component control internal layout while its parent controls external placement. Keep responsibilities local and be aware that min-content sizing/min-width behavior can cause overflow in deeply nested flex layouts. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Nested Flexbox:\\n```css\\n.card{display:flex}.card__meta{display:flex;gap:.5rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Nested Flexbox is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Nested Flexbox as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Nested Flexbox interact with the cascade and inheritance?",
    "What is a real production use case for Nested Flexbox?",
    "Can Nested Flexbox affect layout, paint or compositing?",
    "How would you debug Nested Flexbox in DevTools?",
    "What accessibility or responsive edge cases matter for Nested Flexbox?",
    "How would you test Nested Flexbox across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css88",
      "questionNumber": "CSS-088",
      "title": "Common Layouts",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Common Layouts"
    },
    "answer": {
  "expectedAnswer": "Flexbox handles common patterns such as centered content, nav bars, button groups, equal/variable-width columns, and rows that wrap on smaller screens.",
  "deepExplanation": "Flexbox handles common patterns such as centered content, nav bars, button groups, equal/variable-width columns, and rows that wrap on smaller screens. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Common Layouts:\\n```css\\n.layout{display:flex;gap:1rem}.content{flex:1}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Common Layouts is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Common Layouts as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Common Layouts interact with the cascade and inheritance?",
    "What is a real production use case for Common Layouts?",
    "Can Common Layouts affect layout, paint or compositing?",
    "How would you debug Common Layouts in DevTools?",
    "What accessibility or responsive edge cases matter for Common Layouts?",
    "How would you test Common Layouts across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css89",
      "questionNumber": "CSS-089",
      "title": "Flexbox Performance",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Flexbox Performance"
    },
    "answer": {
  "expectedAnswer": "Flexbox is usually efficient, but large DOM trees, repeated layout invalidation, min-content constraints and excessive nested containers can increase style/layout cost. Measure before optimizing.",
  "deepExplanation": "Flexbox is usually efficient, but large DOM trees, repeated layout invalidation, min-content constraints and excessive nested containers can increase style/layout cost. Measure before optimizing. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Flexbox Performance:\\n```css\\n.list{display:flex;flex-wrap:wrap;gap:.5rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Flexbox Performance is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Optimizing without a trace.",
    "Assuming every change triggers every rendering stage.",
    "Ignoring low-end devices."
  ],
  "followUpQuestions": [
    "How does Flexbox Performance interact with the cascade and inheritance?",
    "What is a real production use case for Flexbox Performance?",
    "Can Flexbox Performance affect layout, paint or compositing?",
    "How would you debug Flexbox Performance in DevTools?",
    "What accessibility or responsive edge cases matter for Flexbox Performance?",
    "How would you test Flexbox Performance across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css90",
      "questionNumber": "CSS-090",
      "title": "Flexbox Interview Questions",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Flexbox",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Flexbox Interview Questions"
    },
    "answer": {
  "expectedAnswer": "Strong Flexbox answers explain axes, sizing, min/max constraints, wrapping, alignment, source order and why Flexbox is one-dimensional rather than treating every property as an isolated memorization item.",
  "deepExplanation": "Strong Flexbox answers explain axes, sizing, min/max constraints, wrapping, alignment, source order and why Flexbox is one-dimensional rather than treating every property as an isolated memorization item. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Flexbox Interview Questions:\\n```css\\n.row{display:flex;min-width:0;gap:1rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Understand main/cross axes.",
    "Set min-width:0 for shrinking content when needed.",
    "Use gap for spacing.",
    "Keep DOM order semantic.",
    "Measure large layouts before optimizing."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Flexbox Interview Questions is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Flexbox Interview Questions as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Flexbox Interview Questions interact with the cascade and inheritance?",
    "What is a real production use case for Flexbox Interview Questions?",
    "Can Flexbox Interview Questions affect layout, paint or compositing?",
    "How would you debug Flexbox Interview Questions in DevTools?",
    "What accessibility or responsive edge cases matter for Flexbox Interview Questions?",
    "How would you test Flexbox Interview Questions across supported browsers?"
  ],
  "relatedTopics": [
    "Flexbox",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css91",
      "questionNumber": "CSS-091",
      "title": "Grid Introduction",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Grid Introduction"
    },
    "answer": {
  "expectedAnswer": "CSS Grid is a two-dimensional layout system for rows and columns. It can define explicit tracks, implicit tracks, named areas and responsive track sizing while letting items span multiple rows/columns.",
  "deepExplanation": "CSS Grid is a two-dimensional layout system for rows and columns. It can define explicit tracks, implicit tracks, named areas and responsive track sizing while letting items span multiple rows/columns. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Grid Introduction:\\n```css\\n.gallery{display:grid;grid-template-columns:repeat(3,1fr)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Grid Introduction is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Grid Introduction as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Grid Introduction interact with the cascade and inheritance?",
    "What is a real production use case for Grid Introduction?",
    "Can Grid Introduction affect layout, paint or compositing?",
    "How would you debug Grid Introduction in DevTools?",
    "What accessibility or responsive edge cases matter for Grid Introduction?",
    "How would you test Grid Introduction across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css92",
      "questionNumber": "CSS-092",
      "title": "Grid Container",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Grid Container"
    },
    "answer": {
  "expectedAnswer": "`display: grid` creates a grid formatting context. Tracks, gaps, alignment and placement rules apply to direct grid items.",
  "deepExplanation": "`display: grid` creates a grid formatting context. Tracks, gaps, alignment and placement rules apply to direct grid items. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Grid Container:\\n```css\\n.layout{display:grid}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Grid Container is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Grid Container as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Grid Container interact with the cascade and inheritance?",
    "What is a real production use case for Grid Container?",
    "Can Grid Container affect layout, paint or compositing?",
    "How would you debug Grid Container in DevTools?",
    "What accessibility or responsive edge cases matter for Grid Container?",
    "How would you test Grid Container across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css93",
      "questionNumber": "CSS-093",
      "title": "Grid Items",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Grid Items"
    },
    "answer": {
  "expectedAnswer": "Grid items are the direct children of a grid container. Their placement can be controlled with line numbers, named areas, spans and auto-placement.",
  "deepExplanation": "Grid items are the direct children of a grid container. Their placement can be controlled with line numbers, named areas, spans and auto-placement. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Grid Items:\\n```css\\n.card{grid-column:span 2}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Grid Items is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Grid Items as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Grid Items interact with the cascade and inheritance?",
    "What is a real production use case for Grid Items?",
    "Can Grid Items affect layout, paint or compositing?",
    "How would you debug Grid Items in DevTools?",
    "What accessibility or responsive edge cases matter for Grid Items?",
    "How would you test Grid Items across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css94",
      "questionNumber": "CSS-094",
      "title": "grid-template-columns",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "grid-template-columns"
    },
    "answer": {
  "expectedAnswer": "`grid-template-columns` defines the explicit column tracks. It can combine fixed units, flexible `fr` tracks, `minmax()`, `repeat()` and intrinsic sizing.",
  "deepExplanation": "`grid-template-columns` defines the explicit column tracks. It can combine fixed units, flexible `fr` tracks, `minmax()`, `repeat()` and intrinsic sizing. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for grid-template-columns:\\n```css\\n.gallery{grid-template-columns:repeat(3,minmax(0,1fr))}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for grid-template-columns is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating grid-template-columns as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does grid-template-columns interact with the cascade and inheritance?",
    "What is a real production use case for grid-template-columns?",
    "Can grid-template-columns affect layout, paint or compositing?",
    "How would you debug grid-template-columns in DevTools?",
    "What accessibility or responsive edge cases matter for grid-template-columns?",
    "How would you test grid-template-columns across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css95",
      "questionNumber": "CSS-095",
      "title": "grid-template-rows",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "grid-template-rows"
    },
    "answer": {
  "expectedAnswer": "`grid-template-rows` defines explicit row tracks and can use fixed, flexible, intrinsic and constrained sizing.",
  "deepExplanation": "`grid-template-rows` defines explicit row tracks and can use fixed, flexible, intrinsic and constrained sizing. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for grid-template-rows:\\n```css\\n.hero{grid-template-rows:auto 1fr auto}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for grid-template-rows is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating grid-template-rows as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does grid-template-rows interact with the cascade and inheritance?",
    "What is a real production use case for grid-template-rows?",
    "Can grid-template-rows affect layout, paint or compositing?",
    "How would you debug grid-template-rows in DevTools?",
    "What accessibility or responsive edge cases matter for grid-template-rows?",
    "How would you test grid-template-rows across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css96",
      "questionNumber": "CSS-096",
      "title": "grid-area",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "grid-area"
    },
    "answer": {
  "expectedAnswer": "`grid-area` can assign a named grid area or use the row/column start/end shorthand. Named areas are valuable for readable responsive layouts.",
  "deepExplanation": "`grid-area` can assign a named grid area or use the row/column start/end shorthand. Named areas are valuable for readable responsive layouts. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for grid-area:\\n```css\\n.header{grid-area:header}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for grid-area is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating grid-area as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does grid-area interact with the cascade and inheritance?",
    "What is a real production use case for grid-area?",
    "Can grid-area affect layout, paint or compositing?",
    "How would you debug grid-area in DevTools?",
    "What accessibility or responsive edge cases matter for grid-area?",
    "How would you test grid-area across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css97",
      "questionNumber": "CSS-097",
      "title": "grid-column",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "grid-column"
    },
    "answer": {
  "expectedAnswer": "`grid-column` controls a grid item's column start/end lines or span.",
  "deepExplanation": "`grid-column` controls a grid item's column start/end lines or span. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for grid-column:\\n```css\\n.featured{grid-column:1 / -1}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for grid-column is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating grid-column as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does grid-column interact with the cascade and inheritance?",
    "What is a real production use case for grid-column?",
    "Can grid-column affect layout, paint or compositing?",
    "How would you debug grid-column in DevTools?",
    "What accessibility or responsive edge cases matter for grid-column?",
    "How would you test grid-column across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css98",
      "questionNumber": "CSS-098",
      "title": "grid-row",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "grid-row"
    },
    "answer": {
  "expectedAnswer": "`grid-row` controls a grid item's row start/end lines or span.",
  "deepExplanation": "`grid-row` controls a grid item's row start/end lines or span. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for grid-row:\\n```css\\n.sidebar{grid-row:1 / span 2}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for grid-row is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating grid-row as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does grid-row interact with the cascade and inheritance?",
    "What is a real production use case for grid-row?",
    "Can grid-row affect layout, paint or compositing?",
    "How would you debug grid-row in DevTools?",
    "What accessibility or responsive edge cases matter for grid-row?",
    "How would you test grid-row across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css99",
      "questionNumber": "CSS-099",
      "title": "auto-fit",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "auto-fit"
    },
    "answer": {
  "expectedAnswer": "`auto-fit` in `repeat()` collapses empty repeated tracks and can let existing items stretch across available space. It is useful for responsive card grids.",
  "deepExplanation": "`auto-fit` in `repeat()` collapses empty repeated tracks and can let existing items stretch across available space. It is useful for responsive card grids. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for auto-fit:\\n```css\\n.cards{grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for auto-fit is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating auto-fit as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does auto-fit interact with the cascade and inheritance?",
    "What is a real production use case for auto-fit?",
    "Can auto-fit affect layout, paint or compositing?",
    "How would you debug auto-fit in DevTools?",
    "What accessibility or responsive edge cases matter for auto-fit?",
    "How would you test auto-fit across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css100",
      "questionNumber": "CSS-100",
      "title": "auto-fill",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "auto-fill"
    },
    "answer": {
  "expectedAnswer": "`auto-fill` creates as many tracks as fit even if some remain empty, preserving the track structure. It can differ visually from `auto-fit` when spare space exists.",
  "deepExplanation": "`auto-fill` creates as many tracks as fit even if some remain empty, preserving the track structure. It can differ visually from `auto-fit` when spare space exists. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for auto-fill:\\n```css\\n.cards{grid-template-columns:repeat(auto-fill,minmax(16rem,1fr))}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for auto-fill is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating auto-fill as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does auto-fill interact with the cascade and inheritance?",
    "What is a real production use case for auto-fill?",
    "Can auto-fill affect layout, paint or compositing?",
    "How would you debug auto-fill in DevTools?",
    "What accessibility or responsive edge cases matter for auto-fill?",
    "How would you test auto-fill across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css101",
      "questionNumber": "CSS-101",
      "title": "minmax()",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "minmax()"
    },
    "answer": {
  "expectedAnswer": "`minmax(min, max)` constrains a track between a minimum and maximum size. It is a core tool for robust responsive grids such as `repeat(auto-fit, minmax(16rem, 1fr))`.",
  "deepExplanation": "`minmax(min, max)` constrains a track between a minimum and maximum size. It is a core tool for robust responsive grids such as `repeat(auto-fit, minmax(16rem, 1fr))`. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for minmax():\\n```css\\n.cards{grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for minmax() is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating minmax() as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does minmax() interact with the cascade and inheritance?",
    "What is a real production use case for minmax()?",
    "Can minmax() affect layout, paint or compositing?",
    "How would you debug minmax() in DevTools?",
    "What accessibility or responsive edge cases matter for minmax()?",
    "How would you test minmax() across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css102",
      "questionNumber": "CSS-102",
      "title": "repeat()",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "repeat()"
    },
    "answer": {
  "expectedAnswer": "`repeat()` generates repeated grid tracks, reducing duplication and making responsive track definitions more readable.",
  "deepExplanation": "`repeat()` generates repeated grid tracks, reducing duplication and making responsive track definitions more readable. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for repeat():\\n```css\\n.grid{grid-template-columns:repeat(12,minmax(0,1fr))}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for repeat() is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating repeat() as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does repeat() interact with the cascade and inheritance?",
    "What is a real production use case for repeat()?",
    "Can repeat() affect layout, paint or compositing?",
    "How would you debug repeat() in DevTools?",
    "What accessibility or responsive edge cases matter for repeat()?",
    "How would you test repeat() across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css103",
      "questionNumber": "CSS-103",
      "title": "fr Unit",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "fr Unit"
    },
    "answer": {
  "expectedAnswer": "The `fr` unit represents a fraction of the grid container's distributable free space after fixed/intrinsic constraints are resolved.",
  "deepExplanation": "The `fr` unit represents a fraction of the grid container's distributable free space after fixed/intrinsic constraints are resolved. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for fr Unit:\\n```css\\n.layout{grid-template-columns:240px 1fr}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for fr Unit is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating fr Unit as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does fr Unit interact with the cascade and inheritance?",
    "What is a real production use case for fr Unit?",
    "Can fr Unit affect layout, paint or compositing?",
    "How would you debug fr Unit in DevTools?",
    "What accessibility or responsive edge cases matter for fr Unit?",
    "How would you test fr Unit across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css104",
      "questionNumber": "CSS-104",
      "title": "justify-items",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "justify-items"
    },
    "answer": {
  "expectedAnswer": "`justify-items` sets the default inline-axis alignment of grid items within their grid areas.",
  "deepExplanation": "`justify-items` sets the default inline-axis alignment of grid items within their grid areas. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for justify-items:\\n```css\\n.grid{justify-items:center}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for justify-items is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating justify-items as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does justify-items interact with the cascade and inheritance?",
    "What is a real production use case for justify-items?",
    "Can justify-items affect layout, paint or compositing?",
    "How would you debug justify-items in DevTools?",
    "What accessibility or responsive edge cases matter for justify-items?",
    "How would you test justify-items across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css105",
      "questionNumber": "CSS-105",
      "title": "align-items",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "align-items"
    },
    "answer": {
  "expectedAnswer": "`align-items` sets the default block/cross-axis alignment of grid items within their grid areas.",
  "deepExplanation": "`align-items` sets the default block/cross-axis alignment of grid items within their grid areas. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for align-items:\\n```css\\n.grid{align-items:center}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for align-items is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating align-items as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does align-items interact with the cascade and inheritance?",
    "What is a real production use case for align-items?",
    "Can align-items affect layout, paint or compositing?",
    "How would you debug align-items in DevTools?",
    "What accessibility or responsive edge cases matter for align-items?",
    "How would you test align-items across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css106",
      "questionNumber": "CSS-106",
      "title": "place-items",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "place-items"
    },
    "answer": {
  "expectedAnswer": "`place-items` is the shorthand for `align-items` and `justify-items`.",
  "deepExplanation": "`place-items` is the shorthand for `align-items` and `justify-items`. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for place-items:\\n```css\\n.grid{place-items:center}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for place-items is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating place-items as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does place-items interact with the cascade and inheritance?",
    "What is a real production use case for place-items?",
    "Can place-items affect layout, paint or compositing?",
    "How would you debug place-items in DevTools?",
    "What accessibility or responsive edge cases matter for place-items?",
    "How would you test place-items across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css107",
      "questionNumber": "CSS-107",
      "title": "Grid Gap",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Grid Gap"
    },
    "answer": {
  "expectedAnswer": "Grid `gap`, `row-gap` and `column-gap` create gutters between tracks without affecting the outer edges of the grid container.",
  "deepExplanation": "Grid `gap`, `row-gap` and `column-gap` create gutters between tracks without affecting the outer edges of the grid container. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Grid Gap:\\n```css\\n.grid{display:grid;gap:1rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Grid Gap is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Grid Gap as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Grid Gap interact with the cascade and inheritance?",
    "What is a real production use case for Grid Gap?",
    "Can Grid Gap affect layout, paint or compositing?",
    "How would you debug Grid Gap in DevTools?",
    "What accessibility or responsive edge cases matter for Grid Gap?",
    "How would you test Grid Gap across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css108",
      "questionNumber": "CSS-108",
      "title": "Nested Grid",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Nested Grid"
    },
    "answer": {
  "expectedAnswer": "Nested grids let a component create its own row/column system inside a grid item. Subgrid can sometimes preserve alignment with a parent's tracks when browser support allows.",
  "deepExplanation": "Nested grids let a component create its own row/column system inside a grid item. Subgrid can sometimes preserve alignment with a parent's tracks when browser support allows. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Nested Grid:\\n```css\\n.card{display:grid;grid-template-columns:subgrid}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Nested Grid is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Nested Grid as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Nested Grid interact with the cascade and inheritance?",
    "What is a real production use case for Nested Grid?",
    "Can Nested Grid affect layout, paint or compositing?",
    "How would you debug Nested Grid in DevTools?",
    "What accessibility or responsive edge cases matter for Nested Grid?",
    "How would you test Nested Grid across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css109",
      "questionNumber": "CSS-109",
      "title": "Responsive Grid",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Responsive Grid"
    },
    "answer": {
  "expectedAnswer": "Responsive Grid combines `minmax()`, `repeat()`, auto-placement and media/container queries to let layouts adapt without hard-coding every breakpoint.",
  "deepExplanation": "Responsive Grid combines `minmax()`, `repeat()`, auto-placement and media/container queries to let layouts adapt without hard-coding every breakpoint. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Responsive Grid:\\n```css\\n.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Responsive Grid is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Targeting device names instead of content failures.",
    "Ignoring zoom/localization.",
    "Using fixed widths/heights that clip content."
  ],
  "followUpQuestions": [
    "How does Responsive Grid interact with the cascade and inheritance?",
    "What is a real production use case for Responsive Grid?",
    "Can Responsive Grid affect layout, paint or compositing?",
    "How would you debug Responsive Grid in DevTools?",
    "What accessibility or responsive edge cases matter for Responsive Grid?",
    "How would you test Responsive Grid across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css110",
      "questionNumber": "CSS-110",
      "title": "Grid Interview Questions",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "CSS Grid",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Grid Interview Questions"
    },
    "answer": {
  "expectedAnswer": "Grid interviews test two-dimensional placement, track sizing, intrinsic sizing, `fr`, `minmax`, auto-placement, named areas, auto-fit/auto-fill and responsive architecture.",
  "deepExplanation": "Grid interviews test two-dimensional placement, track sizing, intrinsic sizing, `fr`, `minmax`, auto-placement, named areas, auto-fit/auto-fill and responsive architecture. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Grid Interview Questions:\\n```css\\n.layout{display:grid;grid-template-columns:minmax(0,2fr) minmax(16rem,1fr)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use explicit track intent.",
    "Use minmax() for robust responsive sizing.",
    "Prefer gap over margin gutters.",
    "Keep placement readable.",
    "Test intrinsic/min-content edge cases."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Grid Interview Questions is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Grid Interview Questions as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Grid Interview Questions interact with the cascade and inheritance?",
    "What is a real production use case for Grid Interview Questions?",
    "Can Grid Interview Questions affect layout, paint or compositing?",
    "How would you debug Grid Interview Questions in DevTools?",
    "What accessibility or responsive edge cases matter for Grid Interview Questions?",
    "How would you test Grid Interview Questions across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Grid",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css111",
      "questionNumber": "CSS-111",
      "title": "Fonts",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Typography",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Fonts"
    },
    "answer": {
  "expectedAnswer": "CSS font selection uses a prioritized family list and font descriptors such as weight, style and stretch. Reliable typography requires fallbacks, correct metrics and consideration of loading behavior.",
  "deepExplanation": "CSS font selection uses a prioritized family list and font descriptors such as weight, style and stretch. Reliable typography requires fallbacks, correct metrics and consideration of loading behavior. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Fonts:\\n```css\\nbody{font-family:Inter,system-ui,sans-serif;font-weight:400}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use robust font stacks.",
    "Use unitless line-height where practical.",
    "Optimize font loading.",
    "Test localization and zoom.",
    "Preserve readable line lengths."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Fonts is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Fonts as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Fonts interact with the cascade and inheritance?",
    "What is a real production use case for Fonts?",
    "Can Fonts affect layout, paint or compositing?",
    "How would you debug Fonts in DevTools?",
    "What accessibility or responsive edge cases matter for Fonts?",
    "How would you test Fonts across supported browsers?"
  ],
  "relatedTopics": [
    "Typography",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css112",
      "questionNumber": "CSS-112",
      "title": "Web Fonts",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Typography",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Web Fonts"
    },
    "answer": {
  "expectedAnswer": "Web fonts are font resources downloaded by the browser. They improve brand fidelity but introduce loading, subset, format, caching and layout-shift concerns.",
  "deepExplanation": "Web fonts are font resources downloaded by the browser. They improve brand fidelity but introduce loading, subset, format, caching and layout-shift concerns. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Web Fonts:\\n```css\\n@font-face{font-family:Inter;src:url('/fonts/inter.woff2') format('woff2');font-display:swap}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use robust font stacks.",
    "Use unitless line-height where practical.",
    "Optimize font loading.",
    "Test localization and zoom.",
    "Preserve readable line lengths."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Web Fonts is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Web Fonts as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Web Fonts interact with the cascade and inheritance?",
    "What is a real production use case for Web Fonts?",
    "Can Web Fonts affect layout, paint or compositing?",
    "How would you debug Web Fonts in DevTools?",
    "What accessibility or responsive edge cases matter for Web Fonts?",
    "How would you test Web Fonts across supported browsers?"
  ],
  "relatedTopics": [
    "Typography",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css113",
      "questionNumber": "CSS-113",
      "title": "Google Fonts",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Typography",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Google Fonts"
    },
    "answer": {
  "expectedAnswer": "Google Fonts is a hosted font service. Using third-party fonts can simplify delivery, but teams should consider privacy, CSP, latency, caching, licensing and self-hosting trade-offs.",
  "deepExplanation": "Google Fonts is a hosted font service. Using third-party fonts can simplify delivery, but teams should consider privacy, CSP, latency, caching, licensing and self-hosting trade-offs. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Google Fonts:\\n```css\\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use robust font stacks.",
    "Use unitless line-height where practical.",
    "Optimize font loading.",
    "Test localization and zoom.",
    "Preserve readable line lengths."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Google Fonts is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Google Fonts as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Google Fonts interact with the cascade and inheritance?",
    "What is a real production use case for Google Fonts?",
    "Can Google Fonts affect layout, paint or compositing?",
    "How would you debug Google Fonts in DevTools?",
    "What accessibility or responsive edge cases matter for Google Fonts?",
    "How would you test Google Fonts across supported browsers?"
  ],
  "relatedTopics": [
    "Typography",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css114",
      "questionNumber": "CSS-114",
      "title": "Font Loading",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Typography",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "Font Loading"
    },
    "answer": {
  "expectedAnswer": "Font loading affects text rendering and layout stability. `font-display`, preload, appropriate subsets/formats and metric-compatible fallbacks can reduce visible text delays and layout shifts.",
  "deepExplanation": "Font loading affects text rendering and layout stability. `font-display`, preload, appropriate subsets/formats and metric-compatible fallbacks can reduce visible text delays and layout shifts. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Font Loading:\\n```css\\n@font-face{font-family:Inter;src:url('/fonts/inter.woff2') format('woff2');font-display:swap}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use robust font stacks.",
    "Use unitless line-height where practical.",
    "Optimize font loading.",
    "Test localization and zoom.",
    "Preserve readable line lengths."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Font Loading is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Font Loading as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Font Loading interact with the cascade and inheritance?",
    "What is a real production use case for Font Loading?",
    "Can Font Loading affect layout, paint or compositing?",
    "How would you debug Font Loading in DevTools?",
    "What accessibility or responsive edge cases matter for Font Loading?",
    "How would you test Font Loading across supported browsers?"
  ],
  "relatedTopics": [
    "Typography",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css115",
      "questionNumber": "CSS-115",
      "title": "line-height",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Typography",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "line-height"
    },
    "answer": {
  "expectedAnswer": "`line-height` controls the height of text line boxes. Unitless values are generally robust because they scale with the element's computed font size.",
  "deepExplanation": "`line-height` controls the height of text line boxes. Unitless values are generally robust because they scale with the element's computed font size. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for line-height:\\n```css\\nbody{line-height:1.5}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use robust font stacks.",
    "Use unitless line-height where practical.",
    "Optimize font loading.",
    "Test localization and zoom.",
    "Preserve readable line lengths."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for line-height is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating line-height as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does line-height interact with the cascade and inheritance?",
    "What is a real production use case for line-height?",
    "Can line-height affect layout, paint or compositing?",
    "How would you debug line-height in DevTools?",
    "What accessibility or responsive edge cases matter for line-height?",
    "How would you test line-height across supported browsers?"
  ],
  "relatedTopics": [
    "Typography",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css116",
      "questionNumber": "CSS-116",
      "title": "letter-spacing",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Typography",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "letter-spacing"
    },
    "answer": {
  "expectedAnswer": "`letter-spacing` adjusts spacing between glyphs. Small changes can affect readability, wrapping and localization, so use it primarily for intentional typographic treatment.",
  "deepExplanation": "`letter-spacing` adjusts spacing between glyphs. Small changes can affect readability, wrapping and localization, so use it primarily for intentional typographic treatment. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for letter-spacing:\\n```css\\n.eyebrow{letter-spacing:.08em;text-transform:uppercase}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use robust font stacks.",
    "Use unitless line-height where practical.",
    "Optimize font loading.",
    "Test localization and zoom.",
    "Preserve readable line lengths."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for letter-spacing is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating letter-spacing as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does letter-spacing interact with the cascade and inheritance?",
    "What is a real production use case for letter-spacing?",
    "Can letter-spacing affect layout, paint or compositing?",
    "How would you debug letter-spacing in DevTools?",
    "What accessibility or responsive edge cases matter for letter-spacing?",
    "How would you test letter-spacing across supported browsers?"
  ],
  "relatedTopics": [
    "Typography",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css117",
      "questionNumber": "CSS-117",
      "title": "word-spacing",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Typography",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "word-spacing"
    },
    "answer": {
  "expectedAnswer": "`word-spacing` adjusts space between words. It should be used carefully because excessive values can reduce readability and interact with wrapping.",
  "deepExplanation": "`word-spacing` adjusts space between words. It should be used carefully because excessive values can reduce readability and interact with wrapping. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for word-spacing:\\n```css\\n.copy{word-spacing:.08em}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use robust font stacks.",
    "Use unitless line-height where practical.",
    "Optimize font loading.",
    "Test localization and zoom.",
    "Preserve readable line lengths."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for word-spacing is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating word-spacing as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does word-spacing interact with the cascade and inheritance?",
    "What is a real production use case for word-spacing?",
    "Can word-spacing affect layout, paint or compositing?",
    "How would you debug word-spacing in DevTools?",
    "What accessibility or responsive edge cases matter for word-spacing?",
    "How would you test word-spacing across supported browsers?"
  ],
  "relatedTopics": [
    "Typography",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css118",
      "questionNumber": "CSS-118",
      "title": "text-align",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Typography",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "text-align"
    },
    "answer": {
  "expectedAnswer": "`text-align` controls inline content alignment such as start, end, center and justify. Logical values such as `start` and `end` are useful for RTL/localization.",
  "deepExplanation": "`text-align` controls inline content alignment such as start, end, center and justify. Logical values such as `start` and `end` are useful for RTL/localization. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for text-align:\\n```css\\n.title{text-align:start}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use robust font stacks.",
    "Use unitless line-height where practical.",
    "Optimize font loading.",
    "Test localization and zoom.",
    "Preserve readable line lengths."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for text-align is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating text-align as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does text-align interact with the cascade and inheritance?",
    "What is a real production use case for text-align?",
    "Can text-align affect layout, paint or compositing?",
    "How would you debug text-align in DevTools?",
    "What accessibility or responsive edge cases matter for text-align?",
    "How would you test text-align across supported browsers?"
  ],
  "relatedTopics": [
    "Typography",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css119",
      "questionNumber": "CSS-119",
      "title": "text-overflow",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Typography",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "text-overflow"
    },
    "answer": {
  "expectedAnswer": "`text-overflow` controls how overflowing inline content is visually indicated, commonly with ellipsis, when paired with an overflow/clipping context and constrained inline size.",
  "deepExplanation": "`text-overflow` controls how overflowing inline content is visually indicated, commonly with ellipsis, when paired with an overflow/clipping context and constrained inline size. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for text-overflow:\\n```css\\n.title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use robust font stacks.",
    "Use unitless line-height where practical.",
    "Optimize font loading.",
    "Test localization and zoom.",
    "Preserve readable line lengths."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for text-overflow is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating text-overflow as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does text-overflow interact with the cascade and inheritance?",
    "What is a real production use case for text-overflow?",
    "Can text-overflow affect layout, paint or compositing?",
    "How would you debug text-overflow in DevTools?",
    "What accessibility or responsive edge cases matter for text-overflow?",
    "How would you test text-overflow across supported browsers?"
  ],
  "relatedTopics": [
    "Typography",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css120",
      "questionNumber": "CSS-120",
      "title": "white-space",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Typography",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2–5 Years",
      "question": "white-space"
    },
    "answer": {
  "expectedAnswer": "`white-space` controls wrapping, collapsing and preservation of whitespace/newlines. It is useful for code blocks, labels, single-line truncation and intentional non-wrapping content.",
  "deepExplanation": "`white-space` controls wrapping, collapsing and preservation of whitespace/newlines. It is useful for code blocks, labels, single-line truncation and intentional non-wrapping content. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for white-space:\\n```css\\n.code{white-space:pre-wrap}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use robust font stacks.",
    "Use unitless line-height where practical.",
    "Optimize font loading.",
    "Test localization and zoom.",
    "Preserve readable line lengths."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for white-space is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating white-space as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does white-space interact with the cascade and inheritance?",
    "What is a real production use case for white-space?",
    "Can white-space affect layout, paint or compositing?",
    "How would you debug white-space in DevTools?",
    "What accessibility or responsive edge cases matter for white-space?",
    "How would you test white-space across supported browsers?"
  ],
  "relatedTopics": [
    "Typography",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css121",
      "questionNumber": "CSS-121",
      "title": "Responsive Design",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Responsive Design",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Responsive Design"
    },
    "answer": {
  "expectedAnswer": "Responsive design adapts layout, typography and interaction to available space and device capabilities rather than targeting a fixed device list. Fluid constraints, Grid/Flexbox, media/container queries and accessible resizing form the foundation.",
  "deepExplanation": "Responsive design adapts layout, typography and interaction to available space and device capabilities rather than targeting a fixed device list. Fluid constraints, Grid/Flexbox, media/container queries and accessible resizing form the foundation. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Responsive Design:\\n```css\\n.container{width:min(100% - 2rem,70rem);margin-inline:auto}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Design from content constraints.",
    "Prefer fluid sizing and container queries.",
    "Use accessible minimum font sizes.",
    "Test zoom/orientation/localization.",
    "Avoid device-specific breakpoint assumptions."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Responsive Design is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Targeting device names instead of content failures.",
    "Ignoring zoom/localization.",
    "Using fixed widths/heights that clip content."
  ],
  "followUpQuestions": [
    "How does Responsive Design interact with the cascade and inheritance?",
    "What is a real production use case for Responsive Design?",
    "Can Responsive Design affect layout, paint or compositing?",
    "How would you debug Responsive Design in DevTools?",
    "What accessibility or responsive edge cases matter for Responsive Design?",
    "How would you test Responsive Design across supported browsers?"
  ],
  "relatedTopics": [
    "Responsive Design",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css122",
      "questionNumber": "CSS-122",
      "title": "Mobile First",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Responsive Design",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Mobile First"
    },
    "answer": {
  "expectedAnswer": "Mobile-first design starts with the smallest practical layout and progressively enhances for larger contexts. It usually leads to simpler baseline CSS and reduces assumptions about wide screens.",
  "deepExplanation": "Mobile-first design starts with the smallest practical layout and progressively enhances for larger contexts. It usually leads to simpler baseline CSS and reduces assumptions about wide screens. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Mobile First:\\n```css\\n.card{padding:1rem}@media (min-width:48rem){.card{padding:2rem}}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Design from content constraints.",
    "Prefer fluid sizing and container queries.",
    "Use accessible minimum font sizes.",
    "Test zoom/orientation/localization.",
    "Avoid device-specific breakpoint assumptions."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Mobile First is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Mobile First as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Mobile First interact with the cascade and inheritance?",
    "What is a real production use case for Mobile First?",
    "Can Mobile First affect layout, paint or compositing?",
    "How would you debug Mobile First in DevTools?",
    "What accessibility or responsive edge cases matter for Mobile First?",
    "How would you test Mobile First across supported browsers?"
  ],
  "relatedTopics": [
    "Responsive Design",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css123",
      "questionNumber": "CSS-123",
      "title": "Desktop First",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Responsive Design",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Desktop First"
    },
    "answer": {
  "expectedAnswer": "Desktop-first design starts with the wide layout and adds reductions for smaller widths. It can work for desktop-heavy products but often risks larger override layers and excessive initial CSS.",
  "deepExplanation": "Desktop-first design starts with the wide layout and adds reductions for smaller widths. It can work for desktop-heavy products but often risks larger override layers and excessive initial CSS. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Desktop First:\\n```css\\n.nav{padding:2rem}@media (max-width:48rem){.nav{padding:1rem}}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Design from content constraints.",
    "Prefer fluid sizing and container queries.",
    "Use accessible minimum font sizes.",
    "Test zoom/orientation/localization.",
    "Avoid device-specific breakpoint assumptions."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Desktop First is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Desktop First as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Desktop First interact with the cascade and inheritance?",
    "What is a real production use case for Desktop First?",
    "Can Desktop First affect layout, paint or compositing?",
    "How would you debug Desktop First in DevTools?",
    "What accessibility or responsive edge cases matter for Desktop First?",
    "How would you test Desktop First across supported browsers?"
  ],
  "relatedTopics": [
    "Responsive Design",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css124",
      "questionNumber": "CSS-124",
      "title": "Media Queries",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Responsive Design",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Media Queries"
    },
    "answer": {
  "expectedAnswer": "Media queries apply CSS conditionally based on viewport, container or user/device characteristics such as width, resolution, color scheme or motion preference.",
  "deepExplanation": "Media queries apply CSS conditionally based on viewport, container or user/device characteristics such as width, resolution, color scheme or motion preference. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Media Queries:\\n```css\\n@media (prefers-reduced-motion:reduce){*{scroll-behavior:auto}}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Design from content constraints.",
    "Prefer fluid sizing and container queries.",
    "Use accessible minimum font sizes.",
    "Test zoom/orientation/localization.",
    "Avoid device-specific breakpoint assumptions."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Media Queries is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Media Queries as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Media Queries interact with the cascade and inheritance?",
    "What is a real production use case for Media Queries?",
    "Can Media Queries affect layout, paint or compositing?",
    "How would you debug Media Queries in DevTools?",
    "What accessibility or responsive edge cases matter for Media Queries?",
    "How would you test Media Queries across supported browsers?"
  ],
  "relatedTopics": [
    "Responsive Design",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css125",
      "questionNumber": "CSS-125",
      "title": "Breakpoints",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Responsive Design",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Breakpoints"
    },
    "answer": {
  "expectedAnswer": "Breakpoints are thresholds where layout rules change. Good breakpoints come from content and component failure points rather than a list copied from device dimensions.",
  "deepExplanation": "Breakpoints are thresholds where layout rules change. Good breakpoints come from content and component failure points rather than a list copied from device dimensions. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Breakpoints:\\n```css\\n@media (min-width:48rem){.layout{grid-template-columns:1fr 1fr}}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Design from content constraints.",
    "Prefer fluid sizing and container queries.",
    "Use accessible minimum font sizes.",
    "Test zoom/orientation/localization.",
    "Avoid device-specific breakpoint assumptions."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Breakpoints is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Targeting device names instead of content failures.",
    "Ignoring zoom/localization.",
    "Using fixed widths/heights that clip content."
  ],
  "followUpQuestions": [
    "How does Breakpoints interact with the cascade and inheritance?",
    "What is a real production use case for Breakpoints?",
    "Can Breakpoints affect layout, paint or compositing?",
    "How would you debug Breakpoints in DevTools?",
    "What accessibility or responsive edge cases matter for Breakpoints?",
    "How would you test Breakpoints across supported browsers?"
  ],
  "relatedTopics": [
    "Responsive Design",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css126",
      "questionNumber": "CSS-126",
      "title": "Container Queries",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Responsive Design",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Container Queries"
    },
    "answer": {
  "expectedAnswer": "Container queries allow a component to respond to the size or properties of its containing context rather than the global viewport. They improve reusable component behavior in varied layouts.",
  "deepExplanation": "Container queries allow a component to respond to the size or properties of its containing context rather than the global viewport. They improve reusable component behavior in varied layouts. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Container Queries:\\n```css\\n.card-list{container-type:inline-size}@container (min-width:40rem){.card{grid-template-columns:1fr 1fr}}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Design from content constraints.",
    "Prefer fluid sizing and container queries.",
    "Use accessible minimum font sizes.",
    "Test zoom/orientation/localization.",
    "Avoid device-specific breakpoint assumptions."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Container Queries is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Container Queries as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Container Queries interact with the cascade and inheritance?",
    "What is a real production use case for Container Queries?",
    "Can Container Queries affect layout, paint or compositing?",
    "How would you debug Container Queries in DevTools?",
    "What accessibility or responsive edge cases matter for Container Queries?",
    "How would you test Container Queries across supported browsers?"
  ],
  "relatedTopics": [
    "Responsive Design",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css127",
      "questionNumber": "CSS-127",
      "title": "Responsive Images",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Responsive Design",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Responsive Images"
    },
    "answer": {
  "expectedAnswer": "Responsive images use mechanisms such as `srcset`, `sizes`, `<picture>`, appropriate formats and intrinsic dimensions to deliver suitable resources while preserving layout stability.",
  "deepExplanation": "Responsive images use mechanisms such as `srcset`, `sizes`, `<picture>`, appropriate formats and intrinsic dimensions to deliver suitable resources while preserving layout stability. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Responsive Images:\\n```css\\n<img src=\"hero-800.webp\" srcset=\"hero-400.webp 400w, hero-800.webp 800w\" sizes=\"100vw\" alt=\"\">\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Design from content constraints.",
    "Prefer fluid sizing and container queries.",
    "Use accessible minimum font sizes.",
    "Test zoom/orientation/localization.",
    "Avoid device-specific breakpoint assumptions."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Responsive Images is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Targeting device names instead of content failures.",
    "Ignoring zoom/localization.",
    "Using fixed widths/heights that clip content."
  ],
  "followUpQuestions": [
    "How does Responsive Images interact with the cascade and inheritance?",
    "What is a real production use case for Responsive Images?",
    "Can Responsive Images affect layout, paint or compositing?",
    "How would you debug Responsive Images in DevTools?",
    "What accessibility or responsive edge cases matter for Responsive Images?",
    "How would you test Responsive Images across supported browsers?"
  ],
  "relatedTopics": [
    "Responsive Design",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css128",
      "questionNumber": "CSS-128",
      "title": "Responsive Typography",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Responsive Design",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Responsive Typography"
    },
    "answer": {
  "expectedAnswer": "Responsive typography combines relative units, `clamp()`, fluid constraints and accessible minimums so text scales across contexts without becoming too small or excessively large.",
  "deepExplanation": "Responsive typography combines relative units, `clamp()`, fluid constraints and accessible minimums so text scales across contexts without becoming too small or excessively large. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Responsive Typography:\\n```css\\n.title{font-size:clamp(1.75rem,4vw,3rem)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Design from content constraints.",
    "Prefer fluid sizing and container queries.",
    "Use accessible minimum font sizes.",
    "Test zoom/orientation/localization.",
    "Avoid device-specific breakpoint assumptions."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Responsive Typography is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Targeting device names instead of content failures.",
    "Ignoring zoom/localization.",
    "Using fixed widths/heights that clip content."
  ],
  "followUpQuestions": [
    "How does Responsive Typography interact with the cascade and inheritance?",
    "What is a real production use case for Responsive Typography?",
    "Can Responsive Typography affect layout, paint or compositing?",
    "How would you debug Responsive Typography in DevTools?",
    "What accessibility or responsive edge cases matter for Responsive Typography?",
    "How would you test Responsive Typography across supported browsers?"
  ],
  "relatedTopics": [
    "Responsive Design",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css129",
      "questionNumber": "CSS-129",
      "title": "Responsive Tables",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Responsive Design",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Responsive Tables"
    },
    "answer": {
  "expectedAnswer": "Responsive tables need a strategy based on information priority: horizontal scrolling, column collapsing, alternative card/list presentation or selective hiding. Do not destroy semantic table relationships merely to fit a viewport.",
  "deepExplanation": "Responsive tables need a strategy based on information priority: horizontal scrolling, column collapsing, alternative card/list presentation or selective hiding. Do not destroy semantic table relationships merely to fit a viewport. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Responsive Tables:\\n```css\\n.table-wrap{overflow:auto}.table{min-width:40rem}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Design from content constraints.",
    "Prefer fluid sizing and container queries.",
    "Use accessible minimum font sizes.",
    "Test zoom/orientation/localization.",
    "Avoid device-specific breakpoint assumptions."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Responsive Tables is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Targeting device names instead of content failures.",
    "Ignoring zoom/localization.",
    "Using fixed widths/heights that clip content."
  ],
  "followUpQuestions": [
    "How does Responsive Tables interact with the cascade and inheritance?",
    "What is a real production use case for Responsive Tables?",
    "Can Responsive Tables affect layout, paint or compositing?",
    "How would you debug Responsive Tables in DevTools?",
    "What accessibility or responsive edge cases matter for Responsive Tables?",
    "How would you test Responsive Tables across supported browsers?"
  ],
  "relatedTopics": [
    "Responsive Design",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css130",
      "questionNumber": "CSS-130",
      "title": "Responsive Navigation",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Responsive Design",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Responsive Navigation"
    },
    "answer": {
  "expectedAnswer": "Responsive navigation changes layout and interaction patterns as available space changes. The DOM should remain accessible and keyboard-friendly; visual hide/show should not remove discoverability or semantics unintentionally.",
  "deepExplanation": "Responsive navigation changes layout and interaction patterns as available space changes. The DOM should remain accessible and keyboard-friendly; visual hide/show should not remove discoverability or semantics unintentionally. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Responsive Navigation:\\n```css\\n<nav aria-label=\"Primary\">... </nav>\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Design from content constraints.",
    "Prefer fluid sizing and container queries.",
    "Use accessible minimum font sizes.",
    "Test zoom/orientation/localization.",
    "Avoid device-specific breakpoint assumptions."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Responsive Navigation is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Targeting device names instead of content failures.",
    "Ignoring zoom/localization.",
    "Using fixed widths/heights that clip content."
  ],
  "followUpQuestions": [
    "How does Responsive Navigation interact with the cascade and inheritance?",
    "What is a real production use case for Responsive Navigation?",
    "Can Responsive Navigation affect layout, paint or compositing?",
    "How would you debug Responsive Navigation in DevTools?",
    "What accessibility or responsive edge cases matter for Responsive Navigation?",
    "How would you test Responsive Navigation across supported browsers?"
  ],
  "relatedTopics": [
    "Responsive Design",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css131",
      "questionNumber": "CSS-131",
      "title": "clamp()",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Responsive Design",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "clamp()"
    },
    "answer": {
  "expectedAnswer": "`clamp()` bounds a preferred fluid value between a minimum and maximum. It is especially useful for type, spacing and sizing that should scale smoothly.",
  "deepExplanation": "`clamp()` bounds a preferred fluid value between a minimum and maximum. It is especially useful for type, spacing and sizing that should scale smoothly. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for clamp():\\n```css\\nh1{font-size:clamp(2rem,5vw,4rem)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Design from content constraints.",
    "Prefer fluid sizing and container queries.",
    "Use accessible minimum font sizes.",
    "Test zoom/orientation/localization.",
    "Avoid device-specific breakpoint assumptions."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for clamp() is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating clamp() as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does clamp() interact with the cascade and inheritance?",
    "What is a real production use case for clamp()?",
    "Can clamp() affect layout, paint or compositing?",
    "How would you debug clamp() in DevTools?",
    "What accessibility or responsive edge cases matter for clamp()?",
    "How would you test clamp() across supported browsers?"
  ],
  "relatedTopics": [
    "Responsive Design",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css132",
      "questionNumber": "CSS-132",
      "title": "min-width",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Responsive Design",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "min-width"
    },
    "answer": {
  "expectedAnswer": "`min-width` sets the smallest allowed used width. In flex/grid layouts it also interacts with the item's automatic minimum size, so `min-width: 0` is a common fix for overflowing flex children.",
  "deepExplanation": "`min-width` sets the smallest allowed used width. In flex/grid layouts it also interacts with the item's automatic minimum size, so `min-width: 0` is a common fix for overflowing flex children. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for min-width:\\n```css\\n.item{min-width:0}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Design from content constraints.",
    "Prefer fluid sizing and container queries.",
    "Use accessible minimum font sizes.",
    "Test zoom/orientation/localization.",
    "Avoid device-specific breakpoint assumptions."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for min-width is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating min-width as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does min-width interact with the cascade and inheritance?",
    "What is a real production use case for min-width?",
    "Can min-width affect layout, paint or compositing?",
    "How would you debug min-width in DevTools?",
    "What accessibility or responsive edge cases matter for min-width?",
    "How would you test min-width across supported browsers?"
  ],
  "relatedTopics": [
    "Responsive Design",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css133",
      "questionNumber": "CSS-133",
      "title": "max-width",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Responsive Design",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "max-width"
    },
    "answer": {
  "expectedAnswer": "`max-width` caps the used width, commonly improving readability and responsive text lines. It is a core tool for fluid containers such as `max-width: 70rem; width: 100%`.",
  "deepExplanation": "`max-width` caps the used width, commonly improving readability and responsive text lines. It is a core tool for fluid containers such as `max-width: 70rem; width: 100%`. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for max-width:\\n```css\\n.prose{max-width:70ch;margin-inline:auto}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Design from content constraints.",
    "Prefer fluid sizing and container queries.",
    "Use accessible minimum font sizes.",
    "Test zoom/orientation/localization.",
    "Avoid device-specific breakpoint assumptions."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for max-width is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating max-width as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does max-width interact with the cascade and inheritance?",
    "What is a real production use case for max-width?",
    "Can max-width affect layout, paint or compositing?",
    "How would you debug max-width in DevTools?",
    "What accessibility or responsive edge cases matter for max-width?",
    "How would you test max-width across supported browsers?"
  ],
  "relatedTopics": [
    "Responsive Design",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css134",
      "questionNumber": "CSS-134",
      "title": "Responsive Best Practices",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Responsive Design",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Responsive Best Practices"
    },
    "answer": {
  "expectedAnswer": "Use content-driven breakpoints, fluid sizing, accessible minimums, logical properties, responsive images, and component-level constraints. Test zoom, orientation, long text and localization.",
  "deepExplanation": "Use content-driven breakpoints, fluid sizing, accessible minimums, logical properties, responsive images, and component-level constraints. Test zoom, orientation, long text and localization. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Responsive Best Practices:\\n```css\\n.shell{width:min(100% - 2rem,72rem);margin-inline:auto}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Design from content constraints.",
    "Prefer fluid sizing and container queries.",
    "Use accessible minimum font sizes.",
    "Test zoom/orientation/localization.",
    "Avoid device-specific breakpoint assumptions."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Responsive Best Practices is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Targeting device names instead of content failures.",
    "Ignoring zoom/localization.",
    "Using fixed widths/heights that clip content."
  ],
  "followUpQuestions": [
    "How does Responsive Best Practices interact with the cascade and inheritance?",
    "What is a real production use case for Responsive Best Practices?",
    "Can Responsive Best Practices affect layout, paint or compositing?",
    "How would you debug Responsive Best Practices in DevTools?",
    "What accessibility or responsive edge cases matter for Responsive Best Practices?",
    "How would you test Responsive Best Practices across supported browsers?"
  ],
  "relatedTopics": [
    "Responsive Design",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css135",
      "questionNumber": "CSS-135",
      "title": "Responsive Interview Questions",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Responsive Design",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Responsive Interview Questions"
    },
    "answer": {
  "expectedAnswer": "Responsive interviews test fluid sizing, media/container queries, breakpoints from content, intrinsic sizing, accessible resizing, responsive media and strategies for data-heavy components.",
  "deepExplanation": "Responsive interviews test fluid sizing, media/container queries, breakpoints from content, intrinsic sizing, accessible resizing, responsive media and strategies for data-heavy components. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Responsive Interview Questions:\\n```css\\n.layout{display:grid;grid-template-columns:1fr}@media(min-width:48rem){.layout{grid-template-columns:2fr 1fr}}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Design from content constraints.",
    "Prefer fluid sizing and container queries.",
    "Use accessible minimum font sizes.",
    "Test zoom/orientation/localization.",
    "Avoid device-specific breakpoint assumptions."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Responsive Interview Questions is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Targeting device names instead of content failures.",
    "Ignoring zoom/localization.",
    "Using fixed widths/heights that clip content."
  ],
  "followUpQuestions": [
    "How does Responsive Interview Questions interact with the cascade and inheritance?",
    "What is a real production use case for Responsive Interview Questions?",
    "Can Responsive Interview Questions affect layout, paint or compositing?",
    "How would you debug Responsive Interview Questions in DevTools?",
    "What accessibility or responsive edge cases matter for Responsive Interview Questions?",
    "How would you test Responsive Interview Questions across supported browsers?"
  ],
  "relatedTopics": [
    "Responsive Design",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css136",
      "questionNumber": "CSS-136",
      "title": "Transition",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Animations & Transitions",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Transition"
    },
    "answer": {
  "expectedAnswer": "CSS transitions animate changes between computed property values over time. They are best for state changes such as hover, focus, expansion and simple UI feedback.",
  "deepExplanation": "CSS transitions animate changes between computed property values over time. They are best for state changes such as hover, focus, expansion and simple UI feedback. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Transition:\\n```css\\n.button{transition:background-color .2s ease,transform .2s ease}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer transform/opacity for frequent motion.",
    "Respect prefers-reduced-motion.",
    "Keep frame work small.",
    "Avoid layout-triggering animation when unnecessary.",
    "Profile real devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Transition is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Transition as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Transition interact with the cascade and inheritance?",
    "What is a real production use case for Transition?",
    "Can Transition affect layout, paint or compositing?",
    "How would you debug Transition in DevTools?",
    "What accessibility or responsive edge cases matter for Transition?",
    "How would you test Transition across supported browsers?"
  ],
  "relatedTopics": [
    "Animations & Transitions",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css137",
      "questionNumber": "CSS-137",
      "title": "Animation",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Animations & Transitions",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Animation"
    },
    "answer": {
  "expectedAnswer": "CSS animations use keyframes plus animation properties to define a reusable timeline. They are useful for autonomous sequences or multi-step motion.",
  "deepExplanation": "CSS animations use keyframes plus animation properties to define a reusable timeline. They are useful for autonomous sequences or multi-step motion. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Animation:\\n```css\\n.spinner{animation:spin 1s linear infinite}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer transform/opacity for frequent motion.",
    "Respect prefers-reduced-motion.",
    "Keep frame work small.",
    "Avoid layout-triggering animation when unnecessary.",
    "Profile real devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Animation is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Animation as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Animation interact with the cascade and inheritance?",
    "What is a real production use case for Animation?",
    "Can Animation affect layout, paint or compositing?",
    "How would you debug Animation in DevTools?",
    "What accessibility or responsive edge cases matter for Animation?",
    "How would you test Animation across supported browsers?"
  ],
  "relatedTopics": [
    "Animations & Transitions",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css138",
      "questionNumber": "CSS-138",
      "title": "Keyframes",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Animations & Transitions",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Keyframes"
    },
    "answer": {
  "expectedAnswer": "`@keyframes` defines one or more intermediate states in a CSS animation timeline.",
  "deepExplanation": "`@keyframes` defines one or more intermediate states in a CSS animation timeline. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Keyframes:\\n```css\\n@keyframes spin{to{transform:rotate(360deg)}}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer transform/opacity for frequent motion.",
    "Respect prefers-reduced-motion.",
    "Keep frame work small.",
    "Avoid layout-triggering animation when unnecessary.",
    "Profile real devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Keyframes is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Keyframes as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Keyframes interact with the cascade and inheritance?",
    "What is a real production use case for Keyframes?",
    "Can Keyframes affect layout, paint or compositing?",
    "How would you debug Keyframes in DevTools?",
    "What accessibility or responsive edge cases matter for Keyframes?",
    "How would you test Keyframes across supported browsers?"
  ],
  "relatedTopics": [
    "Animations & Transitions",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css139",
      "questionNumber": "CSS-139",
      "title": "Timing Functions",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Animations & Transitions",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Timing Functions"
    },
    "answer": {
  "expectedAnswer": "Timing functions such as `ease`, `linear`, `steps()` and cubic-bezier curves control how animated values change over time.",
  "deepExplanation": "Timing functions such as `ease`, `linear`, `steps()` and cubic-bezier curves control how animated values change over time. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Timing Functions:\\n```css\\n.panel{transition:transform .25s cubic-bezier(.2,.8,.2,1)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer transform/opacity for frequent motion.",
    "Respect prefers-reduced-motion.",
    "Keep frame work small.",
    "Avoid layout-triggering animation when unnecessary.",
    "Profile real devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Timing Functions is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Timing Functions as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Timing Functions interact with the cascade and inheritance?",
    "What is a real production use case for Timing Functions?",
    "Can Timing Functions affect layout, paint or compositing?",
    "How would you debug Timing Functions in DevTools?",
    "What accessibility or responsive edge cases matter for Timing Functions?",
    "How would you test Timing Functions across supported browsers?"
  ],
  "relatedTopics": [
    "Animations & Transitions",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css140",
      "questionNumber": "CSS-140",
      "title": "Transform",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Animations & Transitions",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Transform"
    },
    "answer": {
  "expectedAnswer": "`transform` changes an element's coordinate space without directly changing normal-flow geometry. It is widely used for motion and scaling because many transforms can be handled efficiently in compositing.",
  "deepExplanation": "`transform` changes an element's coordinate space without directly changing normal-flow geometry. It is widely used for motion and scaling because many transforms can be handled efficiently in compositing. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Transform:\\n```css\\n.card{transform:translateY(0)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer transform/opacity for frequent motion.",
    "Respect prefers-reduced-motion.",
    "Keep frame work small.",
    "Avoid layout-triggering animation when unnecessary.",
    "Profile real devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Transform is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Transform as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Transform interact with the cascade and inheritance?",
    "What is a real production use case for Transform?",
    "Can Transform affect layout, paint or compositing?",
    "How would you debug Transform in DevTools?",
    "What accessibility or responsive edge cases matter for Transform?",
    "How would you test Transform across supported browsers?"
  ],
  "relatedTopics": [
    "Animations & Transitions",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css141",
      "questionNumber": "CSS-141",
      "title": "Translate",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Animations & Transitions",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Translate"
    },
    "answer": {
  "expectedAnswer": "`translate` moves an element along one or more axes. It is generally preferable to animating `top/left` for frequent motion when layout does not need to change.",
  "deepExplanation": "`translate` moves an element along one or more axes. It is generally preferable to animating `top/left` for frequent motion when layout does not need to change. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Translate:\\n```css\\n.card:hover{transform:translateY(-2px)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer transform/opacity for frequent motion.",
    "Respect prefers-reduced-motion.",
    "Keep frame work small.",
    "Avoid layout-triggering animation when unnecessary.",
    "Profile real devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Translate is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Translate as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Translate interact with the cascade and inheritance?",
    "What is a real production use case for Translate?",
    "Can Translate affect layout, paint or compositing?",
    "How would you debug Translate in DevTools?",
    "What accessibility or responsive edge cases matter for Translate?",
    "How would you test Translate across supported browsers?"
  ],
  "relatedTopics": [
    "Animations & Transitions",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css142",
      "questionNumber": "CSS-142",
      "title": "Rotate",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Animations & Transitions",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Rotate"
    },
    "answer": {
  "expectedAnswer": "`rotate` changes orientation around the transform origin. It is useful for icons, loaders and motion feedback.",
  "deepExplanation": "`rotate` changes orientation around the transform origin. It is useful for icons, loaders and motion feedback. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Rotate:\\n```css\\n.icon{transform:rotate(90deg)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer transform/opacity for frequent motion.",
    "Respect prefers-reduced-motion.",
    "Keep frame work small.",
    "Avoid layout-triggering animation when unnecessary.",
    "Profile real devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Rotate is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Rotate as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Rotate interact with the cascade and inheritance?",
    "What is a real production use case for Rotate?",
    "Can Rotate affect layout, paint or compositing?",
    "How would you debug Rotate in DevTools?",
    "What accessibility or responsive edge cases matter for Rotate?",
    "How would you test Rotate across supported browsers?"
  ],
  "relatedTopics": [
    "Animations & Transitions",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css143",
      "questionNumber": "CSS-143",
      "title": "Scale",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Animations & Transitions",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Scale"
    },
    "answer": {
  "expectedAnswer": "`scale` changes visual size without changing normal-flow layout. It can create clipping/blur and should be paired with suitable transform origins.",
  "deepExplanation": "`scale` changes visual size without changing normal-flow layout. It can create clipping/blur and should be paired with suitable transform origins. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Scale:\\n```css\\n.button:hover{transform:scale(1.02)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer transform/opacity for frequent motion.",
    "Respect prefers-reduced-motion.",
    "Keep frame work small.",
    "Avoid layout-triggering animation when unnecessary.",
    "Profile real devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Scale is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Scale as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Scale interact with the cascade and inheritance?",
    "What is a real production use case for Scale?",
    "Can Scale affect layout, paint or compositing?",
    "How would you debug Scale in DevTools?",
    "What accessibility or responsive edge cases matter for Scale?",
    "How would you test Scale across supported browsers?"
  ],
  "relatedTopics": [
    "Animations & Transitions",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css144",
      "questionNumber": "CSS-144",
      "title": "Skew",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Animations & Transitions",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Skew"
    },
    "answer": {
  "expectedAnswer": "`skew` shears an element visually. It is more niche and can distort text/controls, so use it intentionally.",
  "deepExplanation": "`skew` shears an element visually. It is more niche and can distort text/controls, so use it intentionally. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Skew:\\n```css\\n.banner{transform:skewX(-8deg)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer transform/opacity for frequent motion.",
    "Respect prefers-reduced-motion.",
    "Keep frame work small.",
    "Avoid layout-triggering animation when unnecessary.",
    "Profile real devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Skew is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Skew as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Skew interact with the cascade and inheritance?",
    "What is a real production use case for Skew?",
    "Can Skew affect layout, paint or compositing?",
    "How would you debug Skew in DevTools?",
    "What accessibility or responsive edge cases matter for Skew?",
    "How would you test Skew across supported browsers?"
  ],
  "relatedTopics": [
    "Animations & Transitions",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css145",
      "questionNumber": "CSS-145",
      "title": "3D Transform",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Animations & Transitions",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "3D Transform"
    },
    "answer": {
  "expectedAnswer": "3D transforms add perspective and depth effects. They can influence compositing and introduce GPU/memory costs, so use them for actual visual needs rather than forcing acceleration.",
  "deepExplanation": "3D transforms add perspective and depth effects. They can influence compositing and introduce GPU/memory costs, so use them for actual visual needs rather than forcing acceleration. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for 3D Transform:\\n```css\\n.card{transform:perspective(800px) rotateY(8deg)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer transform/opacity for frequent motion.",
    "Respect prefers-reduced-motion.",
    "Keep frame work small.",
    "Avoid layout-triggering animation when unnecessary.",
    "Profile real devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for 3D Transform is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating 3D Transform as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does 3D Transform interact with the cascade and inheritance?",
    "What is a real production use case for 3D Transform?",
    "Can 3D Transform affect layout, paint or compositing?",
    "How would you debug 3D Transform in DevTools?",
    "What accessibility or responsive edge cases matter for 3D Transform?",
    "How would you test 3D Transform across supported browsers?"
  ],
  "relatedTopics": [
    "Animations & Transitions",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css146",
      "questionNumber": "CSS-146",
      "title": "Animation Performance",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Animations & Transitions",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Animation Performance"
    },
    "answer": {
  "expectedAnswer": "Prefer transform/opacity for frequent motion, avoid layout-heavy animated properties, reduce work per frame, honor reduced-motion preferences and profile frame time on real devices.",
  "deepExplanation": "Prefer transform/opacity for frequent motion, avoid layout-heavy animated properties, reduce work per frame, honor reduced-motion preferences and profile frame time on real devices. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Animation Performance:\\n```css\\n.item{transition:transform .2s ease,opacity .2s ease}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer transform/opacity for frequent motion.",
    "Respect prefers-reduced-motion.",
    "Keep frame work small.",
    "Avoid layout-triggering animation when unnecessary.",
    "Profile real devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Animation Performance is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Optimizing without a trace.",
    "Assuming every change triggers every rendering stage.",
    "Ignoring low-end devices."
  ],
  "followUpQuestions": [
    "How does Animation Performance interact with the cascade and inheritance?",
    "What is a real production use case for Animation Performance?",
    "Can Animation Performance affect layout, paint or compositing?",
    "How would you debug Animation Performance in DevTools?",
    "What accessibility or responsive edge cases matter for Animation Performance?",
    "How would you test Animation Performance across supported browsers?"
  ],
  "relatedTopics": [
    "Animations & Transitions",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css147",
      "questionNumber": "CSS-147",
      "title": "Hardware Acceleration",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Animations & Transitions",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Hardware Acceleration"
    },
    "answer": {
  "expectedAnswer": "Browsers may use GPU acceleration for suitable operations, but developers should not treat `translateZ(0)` or similar tricks as universally beneficial. Layer creation consumes memory and GPU resources.",
  "deepExplanation": "Browsers may use GPU acceleration for suitable operations, but developers should not treat `translateZ(0)` or similar tricks as universally beneficial. Layer creation consumes memory and GPU resources. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Hardware Acceleration:\\n```css\\n.layer{transform:translate3d(0,0,0)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer transform/opacity for frequent motion.",
    "Respect prefers-reduced-motion.",
    "Keep frame work small.",
    "Avoid layout-triggering animation when unnecessary.",
    "Profile real devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Hardware Acceleration is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Hardware Acceleration as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Hardware Acceleration interact with the cascade and inheritance?",
    "What is a real production use case for Hardware Acceleration?",
    "Can Hardware Acceleration affect layout, paint or compositing?",
    "How would you debug Hardware Acceleration in DevTools?",
    "What accessibility or responsive edge cases matter for Hardware Acceleration?",
    "How would you test Hardware Acceleration across supported browsers?"
  ],
  "relatedTopics": [
    "Animations & Transitions",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css148",
      "questionNumber": "CSS-148",
      "title": "GPU Rendering",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Animations & Transitions",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "GPU Rendering"
    },
    "answer": {
  "expectedAnswer": "GPU rendering can accelerate graphics, compositing and Canvas/WebGL workloads, but ordinary JavaScript still runs on CPU-side execution contexts and style/layout can remain main-thread work.",
  "deepExplanation": "GPU rendering can accelerate graphics, compositing and Canvas/WebGL workloads, but ordinary JavaScript still runs on CPU-side execution contexts and style/layout can remain main-thread work. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for GPU Rendering:\\n```css\\ncanvas{display:block}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer transform/opacity for frequent motion.",
    "Respect prefers-reduced-motion.",
    "Keep frame work small.",
    "Avoid layout-triggering animation when unnecessary.",
    "Profile real devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for GPU Rendering is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Optimizing without a trace.",
    "Assuming every change triggers every rendering stage.",
    "Ignoring low-end devices."
  ],
  "followUpQuestions": [
    "How does GPU Rendering interact with the cascade and inheritance?",
    "What is a real production use case for GPU Rendering?",
    "Can GPU Rendering affect layout, paint or compositing?",
    "How would you debug GPU Rendering in DevTools?",
    "What accessibility or responsive edge cases matter for GPU Rendering?",
    "How would you test GPU Rendering across supported browsers?"
  ],
  "relatedTopics": [
    "Animations & Transitions",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css149",
      "questionNumber": "CSS-149",
      "title": "Transition vs Animation",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Animations & Transitions",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Transition vs Animation"
    },
    "answer": {
  "expectedAnswer": "Transitions interpolate between state changes, while animations define a timeline with keyframes and can run independently of a single state change.",
  "deepExplanation": "Transitions interpolate between state changes, while animations define a timeline with keyframes and can run independently of a single state change. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Transition vs Animation:\\n```css\\n.button{transition:opacity .2s}.loader{animation:spin 1s linear infinite}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer transform/opacity for frequent motion.",
    "Respect prefers-reduced-motion.",
    "Keep frame work small.",
    "Avoid layout-triggering animation when unnecessary.",
    "Profile real devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Transition vs Animation is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Transition vs Animation as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Transition vs Animation interact with the cascade and inheritance?",
    "What is a real production use case for Transition vs Animation?",
    "Can Transition vs Animation affect layout, paint or compositing?",
    "How would you debug Transition vs Animation in DevTools?",
    "What accessibility or responsive edge cases matter for Transition vs Animation?",
    "How would you test Transition vs Animation across supported browsers?"
  ],
  "relatedTopics": [
    "Animations & Transitions",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css150",
      "questionNumber": "CSS-150",
      "title": "Animation Interview Questions",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 4,
      "category": "Animations & Transitions",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Animation Interview Questions"
    },
    "answer": {
  "expectedAnswer": "Animation interviews test timeline semantics, easing, transform/compositing performance, stacking/context effects, accessibility and the difference between transitions and keyframe animations.",
  "deepExplanation": "Animation interviews test timeline semantics, easing, transform/compositing performance, stacking/context effects, accessibility and the difference between transitions and keyframe animations. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Animation Interview Questions:\\n```css\\n@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.001ms!important;transition-duration:.001ms!important}}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Prefer transform/opacity for frequent motion.",
    "Respect prefers-reduced-motion.",
    "Keep frame work small.",
    "Avoid layout-triggering animation when unnecessary.",
    "Profile real devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Animation Interview Questions is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Animation Interview Questions as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Animation Interview Questions interact with the cascade and inheritance?",
    "What is a real production use case for Animation Interview Questions?",
    "Can Animation Interview Questions affect layout, paint or compositing?",
    "How would you debug Animation Interview Questions in DevTools?",
    "What accessibility or responsive edge cases matter for Animation Interview Questions?",
    "How would you test Animation Interview Questions across supported browsers?"
  ],
  "relatedTopics": [
    "Animations & Transitions",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css151",
      "questionNumber": "CSS-151",
      "title": "Pseudo Classes",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Advanced CSS",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Pseudo Classes"
    },
    "answer": {
  "expectedAnswer": "Pseudo-classes such as `:hover`, `:focus-visible`, `:disabled`, `:checked`, `:has()` and `:nth-child()` describe element states or structural conditions without adding extra markup.",
  "deepExplanation": "Pseudo-classes such as `:hover`, `:focus-visible`, `:disabled`, `:checked`, `:has()` and `:nth-child()` describe element states or structural conditions without adding extra markup. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Pseudo Classes:\\n```css\\n.button:hover{...}.button:focus-visible{...}.field:invalid{...}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use modern features when they simplify the system.",
    "Feature-detect or progressively enhance.",
    "Watch specificity and rendering cost.",
    "Keep fallback behavior deliberate.",
    "Test browser support."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Pseudo Classes is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Pseudo Classes as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Pseudo Classes interact with the cascade and inheritance?",
    "What is a real production use case for Pseudo Classes?",
    "Can Pseudo Classes affect layout, paint or compositing?",
    "How would you debug Pseudo Classes in DevTools?",
    "What accessibility or responsive edge cases matter for Pseudo Classes?",
    "How would you test Pseudo Classes across supported browsers?"
  ],
  "relatedTopics": [
    "Advanced CSS",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css152",
      "questionNumber": "CSS-152",
      "title": "Pseudo Elements",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Advanced CSS",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Pseudo Elements"
    },
    "answer": {
  "expectedAnswer": "Pseudo-elements such as `::before`, `::after`, `::marker`, `::placeholder` and `::selection` style generated or special parts of an element. They should not replace semantic content.",
  "deepExplanation": "Pseudo-elements such as `::before`, `::after`, `::marker`, `::placeholder` and `::selection` style generated or special parts of an element. They should not replace semantic content. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Pseudo Elements:\\n```css\\n.badge::before{content:\"\";display:inline-block}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use modern features when they simplify the system.",
    "Feature-detect or progressively enhance.",
    "Watch specificity and rendering cost.",
    "Keep fallback behavior deliberate.",
    "Test browser support."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Pseudo Elements is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Pseudo Elements as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Pseudo Elements interact with the cascade and inheritance?",
    "What is a real production use case for Pseudo Elements?",
    "Can Pseudo Elements affect layout, paint or compositing?",
    "How would you debug Pseudo Elements in DevTools?",
    "What accessibility or responsive edge cases matter for Pseudo Elements?",
    "How would you test Pseudo Elements across supported browsers?"
  ],
  "relatedTopics": [
    "Advanced CSS",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css153",
      "questionNumber": "CSS-153",
      "title": "CSS Variables",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Advanced CSS",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "CSS Variables"
    },
    "answer": {
  "expectedAnswer": "CSS custom properties provide cascade-aware variables that can be inherited, overridden and consumed by `var()`. They are a core mechanism for theme tokens and runtime styling.",
  "deepExplanation": "CSS custom properties provide cascade-aware variables that can be inherited, overridden and consumed by `var()`. They are a core mechanism for theme tokens and runtime styling. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for CSS Variables:\\n```css\\n:root{--space-2:.5rem;--color-primary:#2563eb}.button{gap:var(--space-2)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use modern features when they simplify the system.",
    "Feature-detect or progressively enhance.",
    "Watch specificity and rendering cost.",
    "Keep fallback behavior deliberate.",
    "Test browser support."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for CSS Variables is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating CSS Variables as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does CSS Variables interact with the cascade and inheritance?",
    "What is a real production use case for CSS Variables?",
    "Can CSS Variables affect layout, paint or compositing?",
    "How would you debug CSS Variables in DevTools?",
    "What accessibility or responsive edge cases matter for CSS Variables?",
    "How would you test CSS Variables across supported browsers?"
  ],
  "relatedTopics": [
    "Advanced CSS",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css154",
      "questionNumber": "CSS-154",
      "title": "calc()",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Advanced CSS",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "calc()"
    },
    "answer": {
  "expectedAnswer": "`calc()` combines CSS values with arithmetic, allowing expressions such as `width: calc(100% - 2rem)` and making responsive constraints easier to express.",
  "deepExplanation": "`calc()` combines CSS values with arithmetic, allowing expressions such as `width: calc(100% - 2rem)` and making responsive constraints easier to express. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for calc():\\n```css\\n.content{width:calc(100% - 2rem)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use modern features when they simplify the system.",
    "Feature-detect or progressively enhance.",
    "Watch specificity and rendering cost.",
    "Keep fallback behavior deliberate.",
    "Test browser support."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for calc() is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating calc() as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does calc() interact with the cascade and inheritance?",
    "What is a real production use case for calc()?",
    "Can calc() affect layout, paint or compositing?",
    "How would you debug calc() in DevTools?",
    "What accessibility or responsive edge cases matter for calc()?",
    "How would you test calc() across supported browsers?"
  ],
  "relatedTopics": [
    "Advanced CSS",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css155",
      "questionNumber": "CSS-155",
      "title": "clamp()",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Advanced CSS",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "clamp()"
    },
    "answer": {
  "expectedAnswer": "`clamp()` bounds a preferred fluid value between a minimum and maximum. It is especially useful for type, spacing and sizing that should scale smoothly.",
  "deepExplanation": "`clamp()` bounds a preferred fluid value between a minimum and maximum. It is especially useful for type, spacing and sizing that should scale smoothly. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for clamp():\\n```css\\nh1{font-size:clamp(2rem,5vw,4rem)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use modern features when they simplify the system.",
    "Feature-detect or progressively enhance.",
    "Watch specificity and rendering cost.",
    "Keep fallback behavior deliberate.",
    "Test browser support."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for clamp() is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating clamp() as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does clamp() interact with the cascade and inheritance?",
    "What is a real production use case for clamp()?",
    "Can clamp() affect layout, paint or compositing?",
    "How would you debug clamp() in DevTools?",
    "What accessibility or responsive edge cases matter for clamp()?",
    "How would you test clamp() across supported browsers?"
  ],
  "relatedTopics": [
    "Advanced CSS",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css156",
      "questionNumber": "CSS-156",
      "title": "aspect-ratio",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Advanced CSS",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "aspect-ratio"
    },
    "answer": {
  "expectedAnswer": "`aspect-ratio` establishes a preferred width/height ratio and helps reserve predictable media/component geometry before content loads.",
  "deepExplanation": "`aspect-ratio` establishes a preferred width/height ratio and helps reserve predictable media/component geometry before content loads. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for aspect-ratio:\\n```css\\n.thumb{aspect-ratio:16/9}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use modern features when they simplify the system.",
    "Feature-detect or progressively enhance.",
    "Watch specificity and rendering cost.",
    "Keep fallback behavior deliberate.",
    "Test browser support."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for aspect-ratio is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating aspect-ratio as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does aspect-ratio interact with the cascade and inheritance?",
    "What is a real production use case for aspect-ratio?",
    "Can aspect-ratio affect layout, paint or compositing?",
    "How would you debug aspect-ratio in DevTools?",
    "What accessibility or responsive edge cases matter for aspect-ratio?",
    "How would you test aspect-ratio across supported browsers?"
  ],
  "relatedTopics": [
    "Advanced CSS",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css157",
      "questionNumber": "CSS-157",
      "title": "object-fit",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Advanced CSS",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "object-fit"
    },
    "answer": {
  "expectedAnswer": "`object-fit` controls how replaced content such as images/videos fits inside its replaced element's content box, with values like `cover` and `contain`.",
  "deepExplanation": "`object-fit` controls how replaced content such as images/videos fits inside its replaced element's content box, with values like `cover` and `contain`. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for object-fit:\\n```css\\n.thumb img{width:100%;height:100%;object-fit:cover}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use modern features when they simplify the system.",
    "Feature-detect or progressively enhance.",
    "Watch specificity and rendering cost.",
    "Keep fallback behavior deliberate.",
    "Test browser support."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for object-fit is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating object-fit as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does object-fit interact with the cascade and inheritance?",
    "What is a real production use case for object-fit?",
    "Can object-fit affect layout, paint or compositing?",
    "How would you debug object-fit in DevTools?",
    "What accessibility or responsive edge cases matter for object-fit?",
    "How would you test object-fit across supported browsers?"
  ],
  "relatedTopics": [
    "Advanced CSS",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css158",
      "questionNumber": "CSS-158",
      "title": "object-position",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Advanced CSS",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "object-position"
    },
    "answer": {
  "expectedAnswer": "`object-position` controls the alignment point of replaced content when `object-fit` is used.",
  "deepExplanation": "`object-position` controls the alignment point of replaced content when `object-fit` is used. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for object-position:\\n```css\\n.hero img{object-fit:cover;object-position:center 30%}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use modern features when they simplify the system.",
    "Feature-detect or progressively enhance.",
    "Watch specificity and rendering cost.",
    "Keep fallback behavior deliberate.",
    "Test browser support."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for object-position is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating object-position as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does object-position interact with the cascade and inheritance?",
    "What is a real production use case for object-position?",
    "Can object-position affect layout, paint or compositing?",
    "How would you debug object-position in DevTools?",
    "What accessibility or responsive edge cases matter for object-position?",
    "How would you test object-position across supported browsers?"
  ],
  "relatedTopics": [
    "Advanced CSS",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css159",
      "questionNumber": "CSS-159",
      "title": "clip-path",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Advanced CSS",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "clip-path"
    },
    "answer": {
  "expectedAnswer": "`clip-path` clips the visible painting of an element to a shape. It is useful for visual effects but can increase paint cost depending on complexity.",
  "deepExplanation": "`clip-path` clips the visible painting of an element to a shape. It is useful for visual effects but can increase paint cost depending on complexity. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for clip-path:\\n```css\\n.avatar{clip-path:circle(50%)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use modern features when they simplify the system.",
    "Feature-detect or progressively enhance.",
    "Watch specificity and rendering cost.",
    "Keep fallback behavior deliberate.",
    "Test browser support."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for clip-path is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating clip-path as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does clip-path interact with the cascade and inheritance?",
    "What is a real production use case for clip-path?",
    "Can clip-path affect layout, paint or compositing?",
    "How would you debug clip-path in DevTools?",
    "What accessibility or responsive edge cases matter for clip-path?",
    "How would you test clip-path across supported browsers?"
  ],
  "relatedTopics": [
    "Advanced CSS",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css160",
      "questionNumber": "CSS-160",
      "title": "mask",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Advanced CSS",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "mask"
    },
    "answer": {
  "expectedAnswer": "CSS masking controls which parts of an element are visible using alpha/luminance masks. It is powerful for visual effects but has compatibility and rendering-cost considerations.",
  "deepExplanation": "CSS masking controls which parts of an element are visible using alpha/luminance masks. It is powerful for visual effects but has compatibility and rendering-cost considerations. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for mask:\\n```css\\n.fade{mask-image:linear-gradient(to bottom,#000,transparent)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use modern features when they simplify the system.",
    "Feature-detect or progressively enhance.",
    "Watch specificity and rendering cost.",
    "Keep fallback behavior deliberate.",
    "Test browser support."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for mask is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating mask as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does mask interact with the cascade and inheritance?",
    "What is a real production use case for mask?",
    "Can mask affect layout, paint or compositing?",
    "How would you debug mask in DevTools?",
    "What accessibility or responsive edge cases matter for mask?",
    "How would you test mask across supported browsers?"
  ],
  "relatedTopics": [
    "Advanced CSS",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css161",
      "questionNumber": "CSS-161",
      "title": "Filters",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Advanced CSS",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Filters"
    },
    "answer": {
  "expectedAnswer": "CSS filters apply visual operations such as blur, brightness and contrast. Expensive filters over large areas can increase paint/raster cost.",
  "deepExplanation": "CSS filters apply visual operations such as blur, brightness and contrast. Expensive filters over large areas can increase paint/raster cost. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Filters:\\n```css\\n.photo{filter:brightness(.9) contrast(1.05)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use modern features when they simplify the system.",
    "Feature-detect or progressively enhance.",
    "Watch specificity and rendering cost.",
    "Keep fallback behavior deliberate.",
    "Test browser support."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Filters is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Filters as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Filters interact with the cascade and inheritance?",
    "What is a real production use case for Filters?",
    "Can Filters affect layout, paint or compositing?",
    "How would you debug Filters in DevTools?",
    "What accessibility or responsive edge cases matter for Filters?",
    "How would you test Filters across supported browsers?"
  ],
  "relatedTopics": [
    "Advanced CSS",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css162",
      "questionNumber": "CSS-162",
      "title": "Blend Modes",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Advanced CSS",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Blend Modes"
    },
    "answer": {
  "expectedAnswer": "Blend modes change how an element's pixels combine with content behind it. They are useful for image overlays and art direction but can create complex compositing behavior.",
  "deepExplanation": "Blend modes change how an element's pixels combine with content behind it. They are useful for image overlays and art direction but can create complex compositing behavior. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Blend Modes:\\n```css\\n.hero::before{mix-blend-mode:multiply}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use modern features when they simplify the system.",
    "Feature-detect or progressively enhance.",
    "Watch specificity and rendering cost.",
    "Keep fallback behavior deliberate.",
    "Test browser support."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Blend Modes is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Blend Modes as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Blend Modes interact with the cascade and inheritance?",
    "What is a real production use case for Blend Modes?",
    "Can Blend Modes affect layout, paint or compositing?",
    "How would you debug Blend Modes in DevTools?",
    "What accessibility or responsive edge cases matter for Blend Modes?",
    "How would you test Blend Modes across supported browsers?"
  ],
  "relatedTopics": [
    "Advanced CSS",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css163",
      "questionNumber": "CSS-163",
      "title": "backdrop-filter",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Advanced CSS",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "backdrop-filter"
    },
    "answer": {
  "expectedAnswer": "`backdrop-filter` applies effects to content behind an element, enabling frosted-glass designs. It can be expensive because the browser must sample and process background content.",
  "deepExplanation": "`backdrop-filter` applies effects to content behind an element, enabling frosted-glass designs. It can be expensive because the browser must sample and process background content. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for backdrop-filter:\\n```css\\n.glass{backdrop-filter:blur(12px);background:rgb(255 255 255/.6)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use modern features when they simplify the system.",
    "Feature-detect or progressively enhance.",
    "Watch specificity and rendering cost.",
    "Keep fallback behavior deliberate.",
    "Test browser support."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for backdrop-filter is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating backdrop-filter as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does backdrop-filter interact with the cascade and inheritance?",
    "What is a real production use case for backdrop-filter?",
    "Can backdrop-filter affect layout, paint or compositing?",
    "How would you debug backdrop-filter in DevTools?",
    "What accessibility or responsive edge cases matter for backdrop-filter?",
    "How would you test backdrop-filter across supported browsers?"
  ],
  "relatedTopics": [
    "Advanced CSS",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css164",
      "questionNumber": "CSS-164",
      "title": "CSS Nesting",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Advanced CSS",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "CSS Nesting"
    },
    "answer": {
  "expectedAnswer": "Native CSS nesting lets related rules be written inside another rule, improving locality. Teams should avoid accidentally increasing specificity and should align syntax with supported targets/build tooling.",
  "deepExplanation": "Native CSS nesting lets related rules be written inside another rule, improving locality. Teams should avoid accidentally increasing specificity and should align syntax with supported targets/build tooling. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for CSS Nesting:\\n```css\\n.card{color:var(--text);& .title{font-weight:700}}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use modern features when they simplify the system.",
    "Feature-detect or progressively enhance.",
    "Watch specificity and rendering cost.",
    "Keep fallback behavior deliberate.",
    "Test browser support."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for CSS Nesting is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating CSS Nesting as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does CSS Nesting interact with the cascade and inheritance?",
    "What is a real production use case for CSS Nesting?",
    "Can CSS Nesting affect layout, paint or compositing?",
    "How would you debug CSS Nesting in DevTools?",
    "What accessibility or responsive edge cases matter for CSS Nesting?",
    "How would you test CSS Nesting across supported browsers?"
  ],
  "relatedTopics": [
    "Advanced CSS",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css165",
      "questionNumber": "CSS-165",
      "title": "Advanced CSS Interview Questions",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Advanced CSS",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Advanced CSS Interview Questions"
    },
    "answer": {
  "expectedAnswer": "Advanced CSS questions test modern selectors, custom properties, calculations, replaced-element behavior, visual effects, nesting, containment and performance—not just syntax.",
  "deepExplanation": "Advanced CSS questions test modern selectors, custom properties, calculations, replaced-element behavior, visual effects, nesting, containment and performance—not just syntax. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Advanced CSS Interview Questions:\\n```css\\n/* Advanced CSS Interview Questions */\\n.example{/* apply advanced css interview questions deliberately */}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use modern features when they simplify the system.",
    "Feature-detect or progressively enhance.",
    "Watch specificity and rendering cost.",
    "Keep fallback behavior deliberate.",
    "Test browser support."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Advanced CSS Interview Questions is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Advanced CSS Interview Questions as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Advanced CSS Interview Questions interact with the cascade and inheritance?",
    "What is a real production use case for Advanced CSS Interview Questions?",
    "Can Advanced CSS Interview Questions affect layout, paint or compositing?",
    "How would you debug Advanced CSS Interview Questions in DevTools?",
    "What accessibility or responsive edge cases matter for Advanced CSS Interview Questions?",
    "How would you test Advanced CSS Interview Questions across supported browsers?"
  ],
  "relatedTopics": [
    "Advanced CSS",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css166",
      "questionNumber": "CSS-166",
      "title": "BEM",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "CSS Architecture",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "BEM"
    },
    "answer": {
  "expectedAnswer": "BEM structures classes as Block, Element and Modifier, creating explicit naming and ownership boundaries. It reduces accidental selector coupling but can produce verbose markup.",
  "deepExplanation": "BEM structures classes as Block, Element and Modifier, creating explicit naming and ownership boundaries. It reduces accidental selector coupling but can produce verbose markup. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for BEM:\\n```css\\n.card{}.card__title{}.card--featured{}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Define ownership and naming.",
    "Keep specificity predictable.",
    "Centralize tokens.",
    "Automate lint/build checks.",
    "Document migration and exception patterns."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for BEM is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating BEM as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does BEM interact with the cascade and inheritance?",
    "What is a real production use case for BEM?",
    "Can BEM affect layout, paint or compositing?",
    "How would you debug BEM in DevTools?",
    "What accessibility or responsive edge cases matter for BEM?",
    "How would you test BEM across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Architecture",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css167",
      "questionNumber": "CSS-167",
      "title": "OOCSS",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "CSS Architecture",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "OOCSS"
    },
    "answer": {
  "expectedAnswer": "Object-Oriented CSS separates structure from skin, encouraging reusable layout and visual objects. It can increase reuse but requires discipline to avoid abstraction that hides semantics.",
  "deepExplanation": "Object-Oriented CSS separates structure from skin, encouraging reusable layout and visual objects. It can increase reuse but requires discipline to avoid abstraction that hides semantics. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for OOCSS:\\n```css\\n.media{display:flex}.theme-accent{color:var(--accent)}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Define ownership and naming.",
    "Keep specificity predictable.",
    "Centralize tokens.",
    "Automate lint/build checks.",
    "Document migration and exception patterns."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for OOCSS is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating OOCSS as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does OOCSS interact with the cascade and inheritance?",
    "What is a real production use case for OOCSS?",
    "Can OOCSS affect layout, paint or compositing?",
    "How would you debug OOCSS in DevTools?",
    "What accessibility or responsive edge cases matter for OOCSS?",
    "How would you test OOCSS across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Architecture",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css168",
      "questionNumber": "CSS-168",
      "title": "SMACSS",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "CSS Architecture",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "SMACSS"
    },
    "answer": {
  "expectedAnswer": "SMACSS categorizes styles into base, layout, module, state and theme concerns. It is an organizational strategy rather than a browser feature.",
  "deepExplanation": "SMACSS categorizes styles into base, layout, module, state and theme concerns. It is an organizational strategy rather than a browser feature. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for SMACSS:\\n```css\\n.is-active{...}.layout-sidebar{...}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Define ownership and naming.",
    "Keep specificity predictable.",
    "Centralize tokens.",
    "Automate lint/build checks.",
    "Document migration and exception patterns."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for SMACSS is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating SMACSS as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does SMACSS interact with the cascade and inheritance?",
    "What is a real production use case for SMACSS?",
    "Can SMACSS affect layout, paint or compositing?",
    "How would you debug SMACSS in DevTools?",
    "What accessibility or responsive edge cases matter for SMACSS?",
    "How would you test SMACSS across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Architecture",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css169",
      "questionNumber": "CSS-169",
      "title": "Atomic CSS",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "CSS Architecture",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Atomic CSS"
    },
    "answer": {
  "expectedAnswer": "Atomic CSS uses small single-purpose classes that map closely to individual declarations or design tokens. It can maximize reuse but may move complexity into markup and tooling.",
  "deepExplanation": "Atomic CSS uses small single-purpose classes that map closely to individual declarations or design tokens. It can maximize reuse but may move complexity into markup and tooling. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Atomic CSS:\\n```css\\n<div class=\"p-4 md:grid md:grid-cols-3\">...</div>\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Define ownership and naming.",
    "Keep specificity predictable.",
    "Centralize tokens.",
    "Automate lint/build checks.",
    "Document migration and exception patterns."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Atomic CSS is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Atomic CSS as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Atomic CSS interact with the cascade and inheritance?",
    "What is a real production use case for Atomic CSS?",
    "Can Atomic CSS affect layout, paint or compositing?",
    "How would you debug Atomic CSS in DevTools?",
    "What accessibility or responsive edge cases matter for Atomic CSS?",
    "How would you test Atomic CSS across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Architecture",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css170",
      "questionNumber": "CSS-170",
      "title": "Utility-first CSS",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "CSS Architecture",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Utility-first CSS"
    },
    "answer": {
  "expectedAnswer": "Utility-first CSS expresses most styling through composable single-purpose utility classes. It reduces bespoke selector growth but depends on a coherent token system and tooling.",
  "deepExplanation": "Utility-first CSS expresses most styling through composable single-purpose utility classes. It reduces bespoke selector growth but depends on a coherent token system and tooling. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Utility-first CSS:\\n```css\\n<button class=\"px-4 py-2 rounded bg-blue-600 text-white\">Save</button>\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Define ownership and naming.",
    "Keep specificity predictable.",
    "Centralize tokens.",
    "Automate lint/build checks.",
    "Document migration and exception patterns."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Utility-first CSS is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Utility-first CSS as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Utility-first CSS interact with the cascade and inheritance?",
    "What is a real production use case for Utility-first CSS?",
    "Can Utility-first CSS affect layout, paint or compositing?",
    "How would you debug Utility-first CSS in DevTools?",
    "What accessibility or responsive edge cases matter for Utility-first CSS?",
    "How would you test Utility-first CSS across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Architecture",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css171",
      "questionNumber": "CSS-171",
      "title": "SCSS",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "CSS Architecture",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "SCSS"
    },
    "answer": {
  "expectedAnswer": "SCSS is a Sass syntax that adds variables, nesting, mixins, functions and other preprocessor features, compiling to standard CSS. Its abstractions should be used carefully because the browser only sees the generated CSS.",
  "deepExplanation": "SCSS is a Sass syntax that adds variables, nesting, mixins, functions and other preprocessor features, compiling to standard CSS. Its abstractions should be used carefully because the browser only sees the generated CSS. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for SCSS:\\n```css\\n$space:1rem;.card{padding:$space;&__title{font-weight:700}}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Define ownership and naming.",
    "Keep specificity predictable.",
    "Centralize tokens.",
    "Automate lint/build checks.",
    "Document migration and exception patterns."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for SCSS is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating SCSS as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does SCSS interact with the cascade and inheritance?",
    "What is a real production use case for SCSS?",
    "Can SCSS affect layout, paint or compositing?",
    "How would you debug SCSS in DevTools?",
    "What accessibility or responsive edge cases matter for SCSS?",
    "How would you test SCSS across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Architecture",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css172",
      "questionNumber": "CSS-172",
      "title": "LESS",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "CSS Architecture",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "LESS"
    },
    "answer": {
  "expectedAnswer": "LESS is a CSS preprocessor with variables, mixins, functions and nesting. It solves similar authoring problems to Sass but is a different toolchain.",
  "deepExplanation": "LESS is a CSS preprocessor with variables, mixins, functions and nesting. It solves similar authoring problems to Sass but is a different toolchain. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for LESS:\\n```css\\n@space:1rem;.card{padding:@space;}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Define ownership and naming.",
    "Keep specificity predictable.",
    "Centralize tokens.",
    "Automate lint/build checks.",
    "Document migration and exception patterns."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for LESS is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating LESS as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does LESS interact with the cascade and inheritance?",
    "What is a real production use case for LESS?",
    "Can LESS affect layout, paint or compositing?",
    "How would you debug LESS in DevTools?",
    "What accessibility or responsive edge cases matter for LESS?",
    "How would you test LESS across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Architecture",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css173",
      "questionNumber": "CSS-173",
      "title": "PostCSS",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "CSS Architecture",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "PostCSS"
    },
    "answer": {
  "expectedAnswer": "PostCSS transforms CSS through a plugin pipeline. Common uses include Autoprefixer, syntax transforms, linting and custom build-time processing.",
  "deepExplanation": "PostCSS transforms CSS through a plugin pipeline. Common uses include Autoprefixer, syntax transforms, linting and custom build-time processing. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for PostCSS:\\n```css\\n/* source */\\n.button{user-select:none}\\n/* build tools may add prefixes */\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Define ownership and naming.",
    "Keep specificity predictable.",
    "Centralize tokens.",
    "Automate lint/build checks.",
    "Document migration and exception patterns."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for PostCSS is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating PostCSS as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does PostCSS interact with the cascade and inheritance?",
    "What is a real production use case for PostCSS?",
    "Can PostCSS affect layout, paint or compositing?",
    "How would you debug PostCSS in DevTools?",
    "What accessibility or responsive edge cases matter for PostCSS?",
    "How would you test PostCSS across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Architecture",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css174",
      "questionNumber": "CSS-174",
      "title": "CSS Modules",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "CSS Architecture",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "CSS Modules"
    },
    "answer": {
  "expectedAnswer": "CSS Modules compile local class names into scoped identifiers, reducing accidental global collisions while keeping CSS as a separate styling language.",
  "deepExplanation": "CSS Modules compile local class names into scoped identifiers, reducing accidental global collisions while keeping CSS as a separate styling language. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for CSS Modules:\\n```css\\nimport styles from './Card.module.css';\\n<div className={styles.card}>...</div>\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Define ownership and naming.",
    "Keep specificity predictable.",
    "Centralize tokens.",
    "Automate lint/build checks.",
    "Document migration and exception patterns."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for CSS Modules is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating CSS Modules as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does CSS Modules interact with the cascade and inheritance?",
    "What is a real production use case for CSS Modules?",
    "Can CSS Modules affect layout, paint or compositing?",
    "How would you debug CSS Modules in DevTools?",
    "What accessibility or responsive edge cases matter for CSS Modules?",
    "How would you test CSS Modules across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Architecture",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css175",
      "questionNumber": "CSS-175",
      "title": "Architecture Interview Questions",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "CSS Architecture",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years",
      "question": "Architecture Interview Questions"
    },
    "answer": {
  "expectedAnswer": "CSS architecture interviews test naming, ownership, encapsulation, theming, reuse, specificity, build tooling, migration strategy and how the system behaves across many teams.",
  "deepExplanation": "CSS architecture interviews test naming, ownership, encapsulation, theming, reuse, specificity, build tooling, migration strategy and how the system behaves across many teams. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Architecture Interview Questions:\\n```css\\n/* Architecture Interview Questions */\\n.example{/* apply architecture interview questions deliberately */}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Define ownership and naming.",
    "Keep specificity predictable.",
    "Centralize tokens.",
    "Automate lint/build checks.",
    "Document migration and exception patterns."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Architecture Interview Questions is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Architecture Interview Questions as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Architecture Interview Questions interact with the cascade and inheritance?",
    "What is a real production use case for Architecture Interview Questions?",
    "Can Architecture Interview Questions affect layout, paint or compositing?",
    "How would you debug Architecture Interview Questions in DevTools?",
    "What accessibility or responsive edge cases matter for Architecture Interview Questions?",
    "How would you test Architecture Interview Questions across supported browsers?"
  ],
  "relatedTopics": [
    "CSS Architecture",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css176",
      "questionNumber": "CSS-176",
      "title": "Critical CSS",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Performance",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Critical CSS"
    },
    "answer": {
  "expectedAnswer": "Critical CSS is the minimum CSS needed to render the initial viewport. Inlining or prioritizing it can improve initial rendering, but over-inlining increases HTML size and cache fragmentation.",
  "deepExplanation": "Critical CSS is the minimum CSS needed to render the initial viewport. Inlining or prioritizing it can improve initial rendering, but over-inlining increases HTML size and cache fragmentation. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Critical CSS:\\n```css\\n<style>.hero{min-height:50vh}.hero__title{font-size:clamp(2rem,5vw,4rem)}</style>\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Measure before optimizing.",
    "Keep critical CSS small.",
    "Use caching/compression.",
    "Avoid render-blocking work.",
    "Validate with RUM and Core Web Vitals."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Critical CSS is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Critical CSS as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Critical CSS interact with the cascade and inheritance?",
    "What is a real production use case for Critical CSS?",
    "Can Critical CSS affect layout, paint or compositing?",
    "How would you debug Critical CSS in DevTools?",
    "What accessibility or responsive edge cases matter for Critical CSS?",
    "How would you test Critical CSS across supported browsers?"
  ],
  "relatedTopics": [
    "Performance",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css177",
      "questionNumber": "CSS-177",
      "title": "Unused CSS",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Performance",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Unused CSS"
    },
    "answer": {
  "expectedAnswer": "Unused CSS is stylesheet code that is not required for a particular page/flow. Coverage and build analysis can reveal candidates, but deletion should be validated across routes, states and dynamic loading.",
  "deepExplanation": "Unused CSS is stylesheet code that is not required for a particular page/flow. Coverage and build analysis can reveal candidates, but deletion should be validated across routes, states and dynamic loading. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Unused CSS:\\n```css\\n/* candidate after coverage */\\n@supports(display:grid){.legacy-layout{...}}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Measure before optimizing.",
    "Keep critical CSS small.",
    "Use caching/compression.",
    "Avoid render-blocking work.",
    "Validate with RUM and Core Web Vitals."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Unused CSS is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Unused CSS as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Unused CSS interact with the cascade and inheritance?",
    "What is a real production use case for Unused CSS?",
    "Can Unused CSS affect layout, paint or compositing?",
    "How would you debug Unused CSS in DevTools?",
    "What accessibility or responsive edge cases matter for Unused CSS?",
    "How would you test Unused CSS across supported browsers?"
  ],
  "relatedTopics": [
    "Performance",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css178",
      "questionNumber": "CSS-178",
      "title": "Minification",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Performance",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Minification"
    },
    "answer": {
  "expectedAnswer": "CSS minification removes unnecessary whitespace, comments and syntax where safe, reducing transfer size without changing semantics.",
  "deepExplanation": "CSS minification removes unnecessary whitespace, comments and syntax where safe, reducing transfer size without changing semantics. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Minification:\\n```css\\n.button{padding:.5rem 1rem;color:#fff;background:#2563eb}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Measure before optimizing.",
    "Keep critical CSS small.",
    "Use caching/compression.",
    "Avoid render-blocking work.",
    "Validate with RUM and Core Web Vitals."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Minification is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Minification as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Minification interact with the cascade and inheritance?",
    "What is a real production use case for Minification?",
    "Can Minification affect layout, paint or compositing?",
    "How would you debug Minification in DevTools?",
    "What accessibility or responsive edge cases matter for Minification?",
    "How would you test Minification across supported browsers?"
  ],
  "relatedTopics": [
    "Performance",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css179",
      "questionNumber": "CSS-179",
      "title": "CSS Compression",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Performance",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "CSS Compression"
    },
    "answer": {
  "expectedAnswer": "Compression such as Brotli or gzip reduces transferred bytes after minification. Compression and minification solve different layers of the delivery problem and are normally used together.",
  "deepExplanation": "Compression such as Brotli or gzip reduces transferred bytes after minification. Compression and minification solve different layers of the delivery problem and are normally used together. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for CSS Compression:\\n```css\\nCache-Control:public,max-age=31536000,immutable\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Measure before optimizing.",
    "Keep critical CSS small.",
    "Use caching/compression.",
    "Avoid render-blocking work.",
    "Validate with RUM and Core Web Vitals."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for CSS Compression is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating CSS Compression as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does CSS Compression interact with the cascade and inheritance?",
    "What is a real production use case for CSS Compression?",
    "Can CSS Compression affect layout, paint or compositing?",
    "How would you debug CSS Compression in DevTools?",
    "What accessibility or responsive edge cases matter for CSS Compression?",
    "How would you test CSS Compression across supported browsers?"
  ],
  "relatedTopics": [
    "Performance",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css180",
      "questionNumber": "CSS-180",
      "title": "Render Blocking CSS",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Performance",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Render Blocking CSS"
    },
    "answer": {
  "expectedAnswer": "Stylesheets needed for initial rendering can delay construction of the final style state. The goal is not to eliminate CSS from the critical path, but to keep critical CSS small and defer non-critical work safely.",
  "deepExplanation": "Stylesheets needed for initial rendering can delay construction of the final style state. The goal is not to eliminate CSS from the critical path, but to keep critical CSS small and defer non-critical work safely. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Render Blocking CSS:\\n```css\\n<link rel=\"preload\" href=\"critical.css\" as=\"style\" onload=\"this.onload=null;this.rel='stylesheet'\">\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Measure before optimizing.",
    "Keep critical CSS small.",
    "Use caching/compression.",
    "Avoid render-blocking work.",
    "Validate with RUM and Core Web Vitals."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Render Blocking CSS is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Optimizing without a trace.",
    "Assuming every change triggers every rendering stage.",
    "Ignoring low-end devices."
  ],
  "followUpQuestions": [
    "How does Render Blocking CSS interact with the cascade and inheritance?",
    "What is a real production use case for Render Blocking CSS?",
    "Can Render Blocking CSS affect layout, paint or compositing?",
    "How would you debug Render Blocking CSS in DevTools?",
    "What accessibility or responsive edge cases matter for Render Blocking CSS?",
    "How would you test Render Blocking CSS across supported browsers?"
  ],
  "relatedTopics": [
    "Performance",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css181",
      "questionNumber": "CSS-181",
      "title": "Code Splitting",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Performance",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Code Splitting"
    },
    "answer": {
  "expectedAnswer": "CSS code splitting delivers styles closer to the routes/components that need them. It can reduce initial bytes but may introduce more requests/chunks and ordering concerns.",
  "deepExplanation": "CSS code splitting delivers styles closer to the routes/components that need them. It can reduce initial bytes but may introduce more requests/chunks and ordering concerns. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Code Splitting:\\n```css\\nimport('./reports.css');\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Measure before optimizing.",
    "Keep critical CSS small.",
    "Use caching/compression.",
    "Avoid render-blocking work.",
    "Validate with RUM and Core Web Vitals."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Code Splitting is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Code Splitting as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Code Splitting interact with the cascade and inheritance?",
    "What is a real production use case for Code Splitting?",
    "Can Code Splitting affect layout, paint or compositing?",
    "How would you debug Code Splitting in DevTools?",
    "What accessibility or responsive edge cases matter for Code Splitting?",
    "How would you test Code Splitting across supported browsers?"
  ],
  "relatedTopics": [
    "Performance",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css182",
      "questionNumber": "CSS-182",
      "title": "Lazy Loading CSS",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Performance",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Lazy Loading CSS"
    },
    "answer": {
  "expectedAnswer": "Lazy loading CSS defers non-critical styles until they are needed. It must avoid flash of unstyled content and must not delay accessibility-critical or above-the-fold UI.",
  "deepExplanation": "Lazy loading CSS defers non-critical styles until they are needed. It must avoid flash of unstyled content and must not delay accessibility-critical or above-the-fold UI. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Lazy Loading CSS:\\n```css\\nconst loadTheme=()=>import('./dark.css');\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Measure before optimizing.",
    "Keep critical CSS small.",
    "Use caching/compression.",
    "Avoid render-blocking work.",
    "Validate with RUM and Core Web Vitals."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Lazy Loading CSS is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Lazy Loading CSS as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Lazy Loading CSS interact with the cascade and inheritance?",
    "What is a real production use case for Lazy Loading CSS?",
    "Can Lazy Loading CSS affect layout, paint or compositing?",
    "How would you debug Lazy Loading CSS in DevTools?",
    "What accessibility or responsive edge cases matter for Lazy Loading CSS?",
    "How would you test Lazy Loading CSS across supported browsers?"
  ],
  "relatedTopics": [
    "Performance",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css183",
      "questionNumber": "CSS-183",
      "title": "CSS Performance",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Performance",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "CSS Performance"
    },
    "answer": {
  "expectedAnswer": "CSS performance covers style matching, recalculation, layout, paint, rasterization and transfer. Optimize measured bottlenecks rather than assuming selector length alone is the dominant cost.",
  "deepExplanation": "CSS performance covers style matching, recalculation, layout, paint, rasterization and transfer. Optimize measured bottlenecks rather than assuming selector length alone is the dominant cost. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for CSS Performance:\\n```css\\n.list-item{content-visibility:auto;contain-intrinsic-size:200px}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Measure before optimizing.",
    "Keep critical CSS small.",
    "Use caching/compression.",
    "Avoid render-blocking work.",
    "Validate with RUM and Core Web Vitals."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for CSS Performance is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Optimizing without a trace.",
    "Assuming every change triggers every rendering stage.",
    "Ignoring low-end devices."
  ],
  "followUpQuestions": [
    "How does CSS Performance interact with the cascade and inheritance?",
    "What is a real production use case for CSS Performance?",
    "Can CSS Performance affect layout, paint or compositing?",
    "How would you debug CSS Performance in DevTools?",
    "What accessibility or responsive edge cases matter for CSS Performance?",
    "How would you test CSS Performance across supported browsers?"
  ],
  "relatedTopics": [
    "Performance",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css184",
      "questionNumber": "CSS-184",
      "title": "Browser Rendering",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Performance",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Browser Rendering"
    },
    "answer": {
  "expectedAnswer": "Browser rendering turns DOM/CSS inputs into computed styles, layout geometry, painted pixels and composited frames. Not every style change causes all stages, so diagnosis should follow actual invalidation and trace evidence.",
  "deepExplanation": "Browser rendering turns DOM/CSS inputs into computed styles, layout geometry, painted pixels and composited frames. Not every style change causes all stages, so diagnosis should follow actual invalidation and trace evidence. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Browser Rendering:\\n```css\\nstyle → layout → paint → composite\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Measure before optimizing.",
    "Keep critical CSS small.",
    "Use caching/compression.",
    "Avoid render-blocking work.",
    "Validate with RUM and Core Web Vitals."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Browser Rendering is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Optimizing without a trace.",
    "Assuming every change triggers every rendering stage.",
    "Ignoring low-end devices."
  ],
  "followUpQuestions": [
    "How does Browser Rendering interact with the cascade and inheritance?",
    "What is a real production use case for Browser Rendering?",
    "Can Browser Rendering affect layout, paint or compositing?",
    "How would you debug Browser Rendering in DevTools?",
    "What accessibility or responsive edge cases matter for Browser Rendering?",
    "How would you test Browser Rendering across supported browsers?"
  ],
  "relatedTopics": [
    "Performance",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css185",
      "questionNumber": "CSS-185",
      "title": "Performance Interview Questions",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Performance",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Performance Interview Questions"
    },
    "answer": {
  "expectedAnswer": "Performance interviews test critical rendering, CSS delivery, style/layout cost, paint/compositing, animation strategy, Core Web Vitals and how to measure before/after.",
  "deepExplanation": "Performance interviews test critical rendering, CSS delivery, style/layout cost, paint/compositing, animation strategy, Core Web Vitals and how to measure before/after. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Performance Interview Questions:\\n```css\\nUse DevTools Performance to locate long style/layout/paint work before changing CSS.\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Measure before optimizing.",
    "Keep critical CSS small.",
    "Use caching/compression.",
    "Avoid render-blocking work.",
    "Validate with RUM and Core Web Vitals."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Performance Interview Questions is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Optimizing without a trace.",
    "Assuming every change triggers every rendering stage.",
    "Ignoring low-end devices."
  ],
  "followUpQuestions": [
    "How does Performance Interview Questions interact with the cascade and inheritance?",
    "What is a real production use case for Performance Interview Questions?",
    "Can Performance Interview Questions affect layout, paint or compositing?",
    "How would you debug Performance Interview Questions in DevTools?",
    "What accessibility or responsive edge cases matter for Performance Interview Questions?",
    "How would you test Performance Interview Questions across supported browsers?"
  ],
  "relatedTopics": [
    "Performance",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css186",
      "questionNumber": "CSS-186",
      "title": "Accessible Colors",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Accessibility",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Accessible Colors"
    },
    "answer": {
  "expectedAnswer": "Accessible color choices maintain sufficient contrast and avoid using color as the only semantic signal. Design systems should combine color tokens with text/icons/borders or other cues.",
  "deepExplanation": "Accessible color choices maintain sufficient contrast and avoid using color as the only semantic signal. Design systems should combine color tokens with text/icons/borders or other cues. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Accessible Colors:\\n```css\\n:root{--text:#111827;--surface:#fff;--focus:#1d4ed8}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Preserve semantics.",
    "Keep focus visible.",
    "Meet contrast requirements.",
    "Support keyboard/zoom/reduced motion.",
    "Test with assistive technologies."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Accessible Colors is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Relying on color alone.",
    "Removing visible focus.",
    "Testing only with a mouse."
  ],
  "followUpQuestions": [
    "How does Accessible Colors interact with the cascade and inheritance?",
    "What is a real production use case for Accessible Colors?",
    "Can Accessible Colors affect layout, paint or compositing?",
    "How would you debug Accessible Colors in DevTools?",
    "What accessibility or responsive edge cases matter for Accessible Colors?",
    "How would you test Accessible Colors across supported browsers?"
  ],
  "relatedTopics": [
    "Accessibility",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css187",
      "questionNumber": "CSS-187",
      "title": "Contrast Ratio",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Accessibility",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Contrast Ratio"
    },
    "answer": {
  "expectedAnswer": "Contrast ratio compares relative luminance between foreground and background. Production work should target the applicable WCAG contrast thresholds for text and non-text UI, accounting for font size/weight and component purpose.",
  "deepExplanation": "Contrast ratio compares relative luminance between foreground and background. Production work should target the applicable WCAG contrast thresholds for text and non-text UI, accounting for font size/weight and component purpose. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Contrast Ratio:\\n```css\\n.text{color:#111827;background:#fff}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Preserve semantics.",
    "Keep focus visible.",
    "Meet contrast requirements.",
    "Support keyboard/zoom/reduced motion.",
    "Test with assistive technologies."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Contrast Ratio is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Relying on color alone.",
    "Removing visible focus.",
    "Testing only with a mouse."
  ],
  "followUpQuestions": [
    "How does Contrast Ratio interact with the cascade and inheritance?",
    "What is a real production use case for Contrast Ratio?",
    "Can Contrast Ratio affect layout, paint or compositing?",
    "How would you debug Contrast Ratio in DevTools?",
    "What accessibility or responsive edge cases matter for Contrast Ratio?",
    "How would you test Contrast Ratio across supported browsers?"
  ],
  "relatedTopics": [
    "Accessibility",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css188",
      "questionNumber": "CSS-188",
      "title": "Focus Styles",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Accessibility",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Focus Styles"
    },
    "answer": {
  "expectedAnswer": "Focus styles communicate keyboard focus and must remain visibly distinct. Use `:focus-visible` to avoid unnecessarily showing keyboard indicators for every pointer interaction while preserving strong focus visibility.",
  "deepExplanation": "Focus styles communicate keyboard focus and must remain visibly distinct. Use `:focus-visible` to avoid unnecessarily showing keyboard indicators for every pointer interaction while preserving strong focus visibility. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Focus Styles:\\n```css\\n:focus-visible{outline:3px solid currentColor;outline-offset:2px}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Preserve semantics.",
    "Keep focus visible.",
    "Meet contrast requirements.",
    "Support keyboard/zoom/reduced motion.",
    "Test with assistive technologies."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Focus Styles is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Relying on color alone.",
    "Removing visible focus.",
    "Testing only with a mouse."
  ],
  "followUpQuestions": [
    "How does Focus Styles interact with the cascade and inheritance?",
    "What is a real production use case for Focus Styles?",
    "Can Focus Styles affect layout, paint or compositing?",
    "How would you debug Focus Styles in DevTools?",
    "What accessibility or responsive edge cases matter for Focus Styles?",
    "How would you test Focus Styles across supported browsers?"
  ],
  "relatedTopics": [
    "Accessibility",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css189",
      "questionNumber": "CSS-189",
      "title": "Keyboard Navigation",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Accessibility",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Keyboard Navigation"
    },
    "answer": {
  "expectedAnswer": "Keyboard navigation requires a logical focus order, reachable interactive controls, visible focus, appropriate semantics and no keyboard traps. CSS should not visually reorder content in a way that conflicts with the DOM's logical order.",
  "deepExplanation": "Keyboard navigation requires a logical focus order, reachable interactive controls, visible focus, appropriate semantics and no keyboard traps. CSS should not visually reorder content in a way that conflicts with the DOM's logical order. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Keyboard Navigation:\\n```css\\nbutton,a,input{outline-offset:2px}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Preserve semantics.",
    "Keep focus visible.",
    "Meet contrast requirements.",
    "Support keyboard/zoom/reduced motion.",
    "Test with assistive technologies."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Keyboard Navigation is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Relying on color alone.",
    "Removing visible focus.",
    "Testing only with a mouse."
  ],
  "followUpQuestions": [
    "How does Keyboard Navigation interact with the cascade and inheritance?",
    "What is a real production use case for Keyboard Navigation?",
    "Can Keyboard Navigation affect layout, paint or compositing?",
    "How would you debug Keyboard Navigation in DevTools?",
    "What accessibility or responsive edge cases matter for Keyboard Navigation?",
    "How would you test Keyboard Navigation across supported browsers?"
  ],
  "relatedTopics": [
    "Accessibility",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css190",
      "questionNumber": "CSS-190",
      "title": "Reduced Motion",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Accessibility",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Reduced Motion"
    },
    "answer": {
  "expectedAnswer": "`prefers-reduced-motion` lets users request less non-essential motion. Respect it by reducing duration, removing parallax/large transitions and preserving functional state changes.",
  "deepExplanation": "`prefers-reduced-motion` lets users request less non-essential motion. Respect it by reducing duration, removing parallax/large transitions and preserving functional state changes. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Reduced Motion:\\n```css\\n@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;animation:none!important}}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Preserve semantics.",
    "Keep focus visible.",
    "Meet contrast requirements.",
    "Support keyboard/zoom/reduced motion.",
    "Test with assistive technologies."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Reduced Motion is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Reduced Motion as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Reduced Motion interact with the cascade and inheritance?",
    "What is a real production use case for Reduced Motion?",
    "Can Reduced Motion affect layout, paint or compositing?",
    "How would you debug Reduced Motion in DevTools?",
    "What accessibility or responsive edge cases matter for Reduced Motion?",
    "How would you test Reduced Motion across supported browsers?"
  ],
  "relatedTopics": [
    "Accessibility",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css191",
      "questionNumber": "CSS-191",
      "title": "Screen Reader Support",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Accessibility",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Screen Reader Support"
    },
    "answer": {
  "expectedAnswer": "Screen-reader support depends primarily on semantic HTML, accessible names, correct relationships and appropriate ARIA. CSS should not hide semantic content accidentally or use visual tricks that remove accessible information.",
  "deepExplanation": "Screen-reader support depends primarily on semantic HTML, accessible names, correct relationships and appropriate ARIA. CSS should not hide semantic content accidentally or use visual tricks that remove accessible information. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Screen Reader Support:\\n```css\\n<button class=\"icon\" aria-label=\"Close\"></button>\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Preserve semantics.",
    "Keep focus visible.",
    "Meet contrast requirements.",
    "Support keyboard/zoom/reduced motion.",
    "Test with assistive technologies."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Screen Reader Support is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Screen Reader Support as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Screen Reader Support interact with the cascade and inheritance?",
    "What is a real production use case for Screen Reader Support?",
    "Can Screen Reader Support affect layout, paint or compositing?",
    "How would you debug Screen Reader Support in DevTools?",
    "What accessibility or responsive edge cases matter for Screen Reader Support?",
    "How would you test Screen Reader Support across supported browsers?"
  ],
  "relatedTopics": [
    "Accessibility",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css192",
      "questionNumber": "CSS-192",
      "title": "Accessible Forms",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Accessibility",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Accessible Forms"
    },
    "answer": {
  "expectedAnswer": "Accessible forms need associated labels, clear instructions, grouped controls, useful error messaging, sufficient focus styles and programmatic relationships. CSS should enhance rather than replace semantic labeling.",
  "deepExplanation": "Accessible forms need associated labels, clear instructions, grouped controls, useful error messaging, sufficient focus styles and programmatic relationships. CSS should enhance rather than replace semantic labeling. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Accessible Forms:\\n```css\\n<label for=\"email\">Email</label><input id=\"email\" aria-describedby=\"email-help\">\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Preserve semantics.",
    "Keep focus visible.",
    "Meet contrast requirements.",
    "Support keyboard/zoom/reduced motion.",
    "Test with assistive technologies."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Accessible Forms is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Relying on color alone.",
    "Removing visible focus.",
    "Testing only with a mouse."
  ],
  "followUpQuestions": [
    "How does Accessible Forms interact with the cascade and inheritance?",
    "What is a real production use case for Accessible Forms?",
    "Can Accessible Forms affect layout, paint or compositing?",
    "How would you debug Accessible Forms in DevTools?",
    "What accessibility or responsive edge cases matter for Accessible Forms?",
    "How would you test Accessible Forms across supported browsers?"
  ],
  "relatedTopics": [
    "Accessibility",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css193",
      "questionNumber": "CSS-193",
      "title": "Accessible Buttons",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Accessibility",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Accessible Buttons"
    },
    "answer": {
  "expectedAnswer": "Buttons should use the native `<button>` element when performing an action, preserve focus/disabled states and remain visually understandable without color alone.",
  "deepExplanation": "Buttons should use the native `<button>` element when performing an action, preserve focus/disabled states and remain visually understandable without color alone. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Accessible Buttons:\\n```css\\n<button type=\"button\" class=\"button\">Save</button>\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Preserve semantics.",
    "Keep focus visible.",
    "Meet contrast requirements.",
    "Support keyboard/zoom/reduced motion.",
    "Test with assistive technologies."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Accessible Buttons is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Relying on color alone.",
    "Removing visible focus.",
    "Testing only with a mouse."
  ],
  "followUpQuestions": [
    "How does Accessible Buttons interact with the cascade and inheritance?",
    "What is a real production use case for Accessible Buttons?",
    "Can Accessible Buttons affect layout, paint or compositing?",
    "How would you debug Accessible Buttons in DevTools?",
    "What accessibility or responsive edge cases matter for Accessible Buttons?",
    "How would you test Accessible Buttons across supported browsers?"
  ],
  "relatedTopics": [
    "Accessibility",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css194",
      "questionNumber": "CSS-194",
      "title": "Accessible Navigation",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Accessibility",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Accessible Navigation"
    },
    "answer": {
  "expectedAnswer": "Accessible navigation uses semantic landmarks/links, logical DOM order, keyboard support, visible focus and responsive behavior that does not trap or hide navigation semantics.",
  "deepExplanation": "Accessible navigation uses semantic landmarks/links, logical DOM order, keyboard support, visible focus and responsive behavior that does not trap or hide navigation semantics. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Accessible Navigation:\\n```css\\n<nav aria-label=\"Primary\"><a href=\"/\">Home</a></nav>\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Preserve semantics.",
    "Keep focus visible.",
    "Meet contrast requirements.",
    "Support keyboard/zoom/reduced motion.",
    "Test with assistive technologies."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Accessible Navigation is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Relying on color alone.",
    "Removing visible focus.",
    "Testing only with a mouse."
  ],
  "followUpQuestions": [
    "How does Accessible Navigation interact with the cascade and inheritance?",
    "What is a real production use case for Accessible Navigation?",
    "Can Accessible Navigation affect layout, paint or compositing?",
    "How would you debug Accessible Navigation in DevTools?",
    "What accessibility or responsive edge cases matter for Accessible Navigation?",
    "How would you test Accessible Navigation across supported browsers?"
  ],
  "relatedTopics": [
    "Accessibility",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css195",
      "questionNumber": "CSS-195",
      "title": "Accessibility Interview Questions",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Accessibility",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Accessibility Interview Questions"
    },
    "answer": {
  "expectedAnswer": "Accessibility interviews test semantics, focus, keyboard operation, contrast, responsive behavior, reduced motion, forms, screen readers and how CSS can help or harm assistive-technology usability.",
  "deepExplanation": "Accessibility interviews test semantics, focus, keyboard operation, contrast, responsive behavior, reduced motion, forms, screen readers and how CSS can help or harm assistive-technology usability. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Accessibility Interview Questions:\\n```css\\n:focus-visible{outline:3px solid #1d4ed8}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Preserve semantics.",
    "Keep focus visible.",
    "Meet contrast requirements.",
    "Support keyboard/zoom/reduced motion.",
    "Test with assistive technologies."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Accessibility Interview Questions is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Relying on color alone.",
    "Removing visible focus.",
    "Testing only with a mouse."
  ],
  "followUpQuestions": [
    "How does Accessibility Interview Questions interact with the cascade and inheritance?",
    "What is a real production use case for Accessibility Interview Questions?",
    "Can Accessibility Interview Questions affect layout, paint or compositing?",
    "How would you debug Accessibility Interview Questions in DevTools?",
    "What accessibility or responsive edge cases matter for Accessibility Interview Questions?",
    "How would you test Accessibility Interview Questions across supported browsers?"
  ],
  "relatedTopics": [
    "Accessibility",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css196",
      "questionNumber": "CSS-196",
      "title": "CSSOM",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Browser Rendering",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "CSSOM"
    },
    "answer": {
  "expectedAnswer": "The CSSOM is the browser's object representation of parsed CSS rules and computed style information. Together with the DOM it contributes to the data the rendering engine uses to determine styles and layout.",
  "deepExplanation": "The CSSOM is the browser's object representation of parsed CSS rules and computed style information. Together with the DOM it contributes to the data the rendering engine uses to determine styles and layout. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for CSSOM:\\n```css\\nconst styles=getComputedStyle(element);\\nconsole.log(styles.display)\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use DevTools traces.",
    "Distinguish layout/paint/composite.",
    "Avoid forced synchronous layout.",
    "Prefer stable geometry.",
    "Validate on low-end devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for CSSOM is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating CSSOM as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does CSSOM interact with the cascade and inheritance?",
    "What is a real production use case for CSSOM?",
    "Can CSSOM affect layout, paint or compositing?",
    "How would you debug CSSOM in DevTools?",
    "What accessibility or responsive edge cases matter for CSSOM?",
    "How would you test CSSOM across supported browsers?"
  ],
  "relatedTopics": [
    "Browser Rendering",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css197",
      "questionNumber": "CSS-197",
      "title": "Render Tree",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Browser Rendering",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Render Tree"
    },
    "answer": {
  "expectedAnswer": "The render tree is a conceptual representation of renderable content with style information, used to calculate layout and paint. It is not identical to the DOM: nodes such as `display:none` content do not participate in normal rendering.",
  "deepExplanation": "The render tree is a conceptual representation of renderable content with style information, used to calculate layout and paint. It is not identical to the DOM: nodes such as `display:none` content do not participate in normal rendering. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Render Tree:\\n```css\\n/* display:none removes an element from normal rendering */\\n.hidden{display:none}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use DevTools traces.",
    "Distinguish layout/paint/composite.",
    "Avoid forced synchronous layout.",
    "Prefer stable geometry.",
    "Validate on low-end devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Render Tree is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Optimizing without a trace.",
    "Assuming every change triggers every rendering stage.",
    "Ignoring low-end devices."
  ],
  "followUpQuestions": [
    "How does Render Tree interact with the cascade and inheritance?",
    "What is a real production use case for Render Tree?",
    "Can Render Tree affect layout, paint or compositing?",
    "How would you debug Render Tree in DevTools?",
    "What accessibility or responsive edge cases matter for Render Tree?",
    "How would you test Render Tree across supported browsers?"
  ],
  "relatedTopics": [
    "Browser Rendering",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css198",
      "questionNumber": "CSS-198",
      "title": "Reflow",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Browser Rendering",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Reflow"
    },
    "answer": {
  "expectedAnswer": "Reflow, often discussed as layout, recalculates geometry after changes that affect element size or position. Forced synchronous layout can occur when JavaScript writes styles and then immediately reads geometry.",
  "deepExplanation": "Reflow, often discussed as layout, recalculates geometry after changes that affect element size or position. Forced synchronous layout can occur when JavaScript writes styles and then immediately reads geometry. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Reflow:\\n```css\\nel.style.width='200px';\\nvoid el.offsetWidth; // forces layout in some cases\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use DevTools traces.",
    "Distinguish layout/paint/composite.",
    "Avoid forced synchronous layout.",
    "Prefer stable geometry.",
    "Validate on low-end devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Reflow is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Optimizing without a trace.",
    "Assuming every change triggers every rendering stage.",
    "Ignoring low-end devices."
  ],
  "followUpQuestions": [
    "How does Reflow interact with the cascade and inheritance?",
    "What is a real production use case for Reflow?",
    "Can Reflow affect layout, paint or compositing?",
    "How would you debug Reflow in DevTools?",
    "What accessibility or responsive edge cases matter for Reflow?",
    "How would you test Reflow across supported browsers?"
  ],
  "relatedTopics": [
    "Browser Rendering",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css199",
      "questionNumber": "CSS-199",
      "title": "Repaint",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Browser Rendering",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Repaint"
    },
    "answer": {
  "expectedAnswer": "Repaint redraws pixels when visual properties change without necessarily changing geometry, such as color or certain shadows. Paint work can still be expensive for large/complex areas.",
  "deepExplanation": "Repaint redraws pixels when visual properties change without necessarily changing geometry, such as color or certain shadows. Paint work can still be expensive for large/complex areas. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Repaint:\\n```css\\nel.style.backgroundColor='red';\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use DevTools traces.",
    "Distinguish layout/paint/composite.",
    "Avoid forced synchronous layout.",
    "Prefer stable geometry.",
    "Validate on low-end devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Repaint is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Optimizing without a trace.",
    "Assuming every change triggers every rendering stage.",
    "Ignoring low-end devices."
  ],
  "followUpQuestions": [
    "How does Repaint interact with the cascade and inheritance?",
    "What is a real production use case for Repaint?",
    "Can Repaint affect layout, paint or compositing?",
    "How would you debug Repaint in DevTools?",
    "What accessibility or responsive edge cases matter for Repaint?",
    "How would you test Repaint across supported browsers?"
  ],
  "relatedTopics": [
    "Browser Rendering",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  },
  {
    "detail": {
      "id": "css200",
      "questionNumber": "CSS-200",
      "title": "Composite",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Netflix",
        "Adobe",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 3,
      "category": "Browser Rendering",
      "part": "CSS",
      "concepts": [
        "Selectors",
        "cascade layers",
        "specificity",
        "box model",
        "Flexbox",
        "Grid"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5–8 Years / 8+ Years",
      "question": "Composite"
    },
    "answer": {
  "expectedAnswer": "Compositing combines separately rendered layers/surfaces into a final frame. Transform and opacity animations can often be handled here, but actual layer creation and pipeline details remain browser-dependent.",
  "deepExplanation": "Compositing combines separately rendered layers/surfaces into a final frame. Transform and opacity animations can often be handled here, but actual layer creation and pipeline details remain browser-dependent. In a production codebase, explain the rule, its browser behavior, the constraints it creates, and why this approach is preferable to common alternatives. Distinguish CSS language semantics from framework conventions and browser-specific implementation details.",
  "productionExample": "Production example for Composite:\\n```css\\n.move{transform:translateX(20px);opacity:.9}\\n```\\nUse this in a component/design-system context, then validate behavior in DevTools and across responsive/accessibility states.",
  "bestPractices": [
    "Use DevTools traces.",
    "Distinguish layout/paint/composite.",
    "Avoid forced synchronous layout.",
    "Prefer stable geometry.",
    "Validate on low-end devices."
  ],
  "tradeOffs": "Best when applied for its intended CSS role. The main trade-off for Composite is the balance between simplicity, maintainability, browser behavior, accessibility and rendering cost. Prefer standards-based behavior and verify the result in the supported browser matrix.",
  "commonMistakes": [
    "Treating Composite as an isolated syntax fact.",
    "Ignoring the cascade/layout context.",
    "Using a workaround without measuring its effect."
  ],
  "followUpQuestions": [
    "How does Composite interact with the cascade and inheritance?",
    "What is a real production use case for Composite?",
    "Can Composite affect layout, paint or compositing?",
    "How would you debug Composite in DevTools?",
    "What accessibility or responsive edge cases matter for Composite?",
    "How would you test Composite across supported browsers?"
  ],
  "relatedTopics": [
    "Browser Rendering",
    "Cascade",
    "Responsive Design",
    "Accessibility",
    "Browser Rendering"
  ]
}
  }
];
