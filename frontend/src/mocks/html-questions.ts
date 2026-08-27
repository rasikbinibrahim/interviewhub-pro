// Auto-generated from frontend/src/document/Part_1_HTML_Master_Handbook.md.
// Mirrors the MockTechnicalQuestion shape defined in @/mocks/questions —
// regenerate with scripts kept alongside the handbook rather than hand-editing.

import type { MockTechnicalQuestion } from '@/mocks/questions';

export const MOCK_HTML_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = [
  {
    "detail": {
      "id": "h1",
      "questionNumber": "H-001",
      "title": "What is HTML?",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "What is HTML?"
    },
    "answer": {
      "expectedAnswer": "**What is HTML?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**What is HTML?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h2",
      "questionNumber": "H-002",
      "title": "What is HTML5?",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "What is HTML5?"
    },
    "answer": {
      "expectedAnswer": "**What is HTML5?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**What is HTML5?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h3",
      "questionNumber": "H-003",
      "title": "What is the history of HTML?",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "What is the history of HTML?"
    },
    "answer": {
      "expectedAnswer": "**What is the history of HTML?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**What is the history of HTML?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h4",
      "questionNumber": "H-004",
      "title": "What is the purpose of HTML?",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "What is the purpose of HTML?"
    },
    "answer": {
      "expectedAnswer": "**What is the purpose of HTML?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**What is the purpose of HTML?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h5",
      "questionNumber": "H-005",
      "title": "What is the structure of an HTML document?",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "What is the structure of an HTML document?"
    },
    "answer": {
      "expectedAnswer": "**What is the structure of an HTML document?** should be answered by explaining the document structure, why the element/order matters to the browser, accessibility/SEO implications, and the production rule that keeps the markup valid and maintainable.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**What is the structure of an HTML document?** should be answered by explaining the document structure, why the element/order matters to the browser, accessibility/SEO implications, and the production rule that keeps the markup valid and maintainable.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface HtmlParts {\n  lang: string;\n  title: string;\n}\n\nfunction buildHead(parts: HtmlParts): string {\n  let html = \"<html lang=\\\"\" + parts.lang + \"\\\">\";\n  html += \"<head><title>\" + parts.title + \"</title></head>\";\n  html += \"<body>\";\n  return html;\n}\n\nconst html = buildHead({\n  lang: \"en\",\n  title: \"Home\",\n});\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst parts = {\n  lang: \"en\",\n  title: \"Home\",\n};\n\nconst html =\n  `<html lang=\"${parts.lang}\">` +\n  `<head><title>${parts.title}</title></head>` +\n  \"<body>\";\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h6",
      "questionNumber": "H-006",
      "title": "What is \\<!DOCTYPE html\\>?",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "What is \\<!DOCTYPE html\\>?"
    },
    "answer": {
      "expectedAnswer": "**What is \\\\<!DOCTYPE html\\\\>?** should be answered by explaining the document structure, why the element/order matters to the browser, accessibility/SEO implications, and the production rule that keeps the markup valid and maintainable.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**What is \\\\<!DOCTYPE html\\\\>?** should be answered by explaining the document structure, why the element/order matters to the browser, accessibility/SEO implications, and the production rule that keeps the markup valid and maintainable.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface HtmlParts {\n  lang: string;\n  title: string;\n}\n\nfunction buildHead(parts: HtmlParts): string {\n  let html = \"<html lang=\\\"\" + parts.lang + \"\\\">\";\n  html += \"<head><title>\" + parts.title + \"</title></head>\";\n  html += \"<body>\";\n  return html;\n}\n\nconst html = buildHead({\n  lang: \"en\",\n  title: \"Home\",\n});\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst parts = {\n  lang: \"en\",\n  title: \"Home\",\n};\n\nconst html =\n  `<html lang=\"${parts.lang}\">` +\n  `<head><title>${parts.title}</title></head>` +\n  \"<body>\";\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h7",
      "questionNumber": "H-007",
      "title": "\\*\\*What is the {=html} <html> tag?\\*\\*",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "\\*\\*What is the {=html} <html> tag?\\*\\*"
    },
    "answer": {
      "expectedAnswer": "**\\\\*\\\\*What is the {=html} <html> tag?\\\\*\\\\*** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**\\\\*\\\\*What is the {=html} <html> tag?\\\\*\\\\*** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h8",
      "questionNumber": "H-008",
      "title": "\\*\\*What is the {=html} <head> tag?\\*\\*",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "\\*\\*What is the {=html} <head> tag?\\*\\*"
    },
    "answer": {
      "expectedAnswer": "**\\\\*\\\\*What is the {=html} <head> tag?\\\\*\\\\*** should cover what browser/search/social clients consume from document metadata and how incorrect values affect rendering, SEO, privacy, or sharing.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**\\\\*\\\\*What is the {=html} <head> tag?\\\\*\\\\*** should cover what browser/search/social clients consume from document metadata and how incorrect values affect rendering, SEO, privacy, or sharing.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface Meta {\n  name: string;\n  content: string;\n}\n\nfunction findMeta(\n  tags: readonly Meta[],\n  name: string,\n): string | null {\n  for (let i = 0; i < tags.length; i += 1) {\n    if (tags[i].name === name) return tags[i].content;\n  }\n\n  return null;\n}\n\nconst description = findMeta(\n  [{ name: \"description\", content: \"Home\" }],\n  \"description\",\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst meta = new Map([\n  [\"description\", \"Home\"],\n]);\n\nconst description =\n  meta.get(\"description\") ?? null;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h9",
      "questionNumber": "H-009",
      "title": "\\*\\*What is the {=html} <body> tag?\\*\\*",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "\\*\\*What is the {=html} <body> tag?\\*\\*"
    },
    "answer": {
      "expectedAnswer": "**\\\\*\\\\*What is the {=html} <body> tag?\\\\*\\\\*** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**\\\\*\\\\*What is the {=html} <body> tag?\\\\*\\\\*** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h10",
      "questionNumber": "H-010",
      "title": "What are HTML elements?",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "What are HTML elements?"
    },
    "answer": {
      "expectedAnswer": "**What are HTML elements?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**What are HTML elements?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h11",
      "questionNumber": "H-011",
      "title": "What are HTML tags?",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "What are HTML tags?"
    },
    "answer": {
      "expectedAnswer": "**What are HTML tags?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**What are HTML tags?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h12",
      "questionNumber": "H-012",
      "title": "What are HTML attributes?",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "What are HTML attributes?"
    },
    "answer": {
      "expectedAnswer": "**What are HTML attributes?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**What are HTML attributes?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h13",
      "questionNumber": "H-013",
      "title": "What are global attributes?",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "What are global attributes?"
    },
    "answer": {
      "expectedAnswer": "**What are global attributes?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**What are global attributes?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h14",
      "questionNumber": "H-014",
      "title": "Difference between elements and tags?",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Difference between elements and tags?"
    },
    "answer": {
      "expectedAnswer": "**Difference between elements and tags?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Difference between elements and tags?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h15",
      "questionNumber": "H-015",
      "title": "What are void elements?",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "What are void elements?"
    },
    "answer": {
      "expectedAnswer": "**What are void elements?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**What are void elements?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h16",
      "questionNumber": "H-016",
      "title": "What are container elements?",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "What are container elements?"
    },
    "answer": {
      "expectedAnswer": "**What are container elements?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**What are container elements?** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h17",
      "questionNumber": "H-017",
      "title": "HTML comments",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "HTML comments"
    },
    "answer": {
      "expectedAnswer": "**HTML comments** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**HTML comments** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h18",
      "questionNumber": "H-018",
      "title": "Browser parsing HTML",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "Browser parsing HTML"
    },
    "answer": {
      "expectedAnswer": "**Browser parsing HTML** should be answered in terms of supported browser behavior, standards-based fallbacks, progressive enhancement, and a targeted compatibility matrix.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Browser parsing HTML** should be answered in terms of supported browser behavior, standards-based fallbacks, progressive enhancement, and a targeted compatibility matrix.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface Feature {\n  name: string;\n  supported: boolean;\n}\n\nfunction supportedFeatures(\n  features: readonly Feature[],\n): string[] {\n  const result: string[] = [];\n\n  for (let i = 0; i < features.length; i += 1) {\n    if (features[i].supported) result.push(features[i].name);\n  }\n\n  return result;\n}\n\nconst supported = supportedFeatures([\n  { name: \"dialog\", supported: true },\n]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst features = [\n  { name: \"dialog\", supported: true },\n];\n\nconst supported = features\n  .filter((feature) => feature.supported)\n  .map((feature) => feature.name);\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h19",
      "questionNumber": "H-019",
      "title": "Metadata tags",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Metadata tags"
    },
    "answer": {
      "expectedAnswer": "**Metadata tags** should cover what browser/search/social clients consume from document metadata and how incorrect values affect rendering, SEO, privacy, or sharing.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Metadata tags** should cover what browser/search/social clients consume from document metadata and how incorrect values affect rendering, SEO, privacy, or sharing.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface Meta {\n  name: string;\n  content: string;\n}\n\nfunction findMeta(\n  tags: readonly Meta[],\n  name: string,\n): string | null {\n  for (let i = 0; i < tags.length; i += 1) {\n    if (tags[i].name === name) return tags[i].content;\n  }\n\n  return null;\n}\n\nconst description = findMeta(\n  [{ name: \"description\", content: \"Home\" }],\n  \"description\",\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst meta = new Map([\n  [\"description\", \"Home\"],\n]);\n\nconst description =\n  meta.get(\"description\") ?? null;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h20",
      "questionNumber": "H-020",
      "title": "Favicon and Manifest",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Fundamentals",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Favicon and Manifest"
    },
    "answer": {
      "expectedAnswer": "**Favicon and Manifest** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Favicon and Manifest** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h21",
      "questionNumber": "H-021",
      "title": "Heading tags",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Heading tags"
    },
    "answer": {
      "expectedAnswer": "**Heading tags** should cover what browser/search/social clients consume from document metadata and how incorrect values affect rendering, SEO, privacy, or sharing.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Heading tags** should cover what browser/search/social clients consume from document metadata and how incorrect values affect rendering, SEO, privacy, or sharing.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface Meta {\n  name: string;\n  content: string;\n}\n\nfunction findMeta(\n  tags: readonly Meta[],\n  name: string,\n): string | null {\n  for (let i = 0; i < tags.length; i += 1) {\n    if (tags[i].name === name) return tags[i].content;\n  }\n\n  return null;\n}\n\nconst description = findMeta(\n  [{ name: \"description\", content: \"Home\" }],\n  \"description\",\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst meta = new Map([\n  [\"description\", \"Home\"],\n]);\n\nconst description =\n  meta.get(\"description\") ?? null;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h22",
      "questionNumber": "H-022",
      "title": "Paragraph tag",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Paragraph tag"
    },
    "answer": {
      "expectedAnswer": "**Paragraph tag** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Paragraph tag** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h23",
      "questionNumber": "H-023",
      "title": "b vs strong",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "b vs strong"
    },
    "answer": {
      "expectedAnswer": "**b vs strong** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**b vs strong** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h24",
      "questionNumber": "H-024",
      "title": "i vs em",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "i vs em"
    },
    "answer": {
      "expectedAnswer": "**i vs em** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**i vs em** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h25",
      "questionNumber": "H-025",
      "title": "mark",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "mark"
    },
    "answer": {
      "expectedAnswer": "**mark** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**mark** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h26",
      "questionNumber": "H-026",
      "title": "small",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "small"
    },
    "answer": {
      "expectedAnswer": "**small** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**small** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h27",
      "questionNumber": "H-027",
      "title": "sup",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "sup"
    },
    "answer": {
      "expectedAnswer": "**sup** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**sup** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h28",
      "questionNumber": "H-028",
      "title": "sub",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "sub"
    },
    "answer": {
      "expectedAnswer": "**sub** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**sub** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h29",
      "questionNumber": "H-029",
      "title": "blockquote",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "blockquote"
    },
    "answer": {
      "expectedAnswer": "**blockquote** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**blockquote** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h30",
      "questionNumber": "H-030",
      "title": "q",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "q"
    },
    "answer": {
      "expectedAnswer": "**q** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**q** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h31",
      "questionNumber": "H-031",
      "title": "code",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "code"
    },
    "answer": {
      "expectedAnswer": "**code** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**code** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h32",
      "questionNumber": "H-032",
      "title": "pre",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "pre"
    },
    "answer": {
      "expectedAnswer": "**pre** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**pre** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h33",
      "questionNumber": "H-033",
      "title": "Ordered list",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Ordered list"
    },
    "answer": {
      "expectedAnswer": "**Ordered list** should use list semantics when the content is conceptually a collection of related items, preserving meaningful ordering and accessibility.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Ordered list** should use list semantics when the content is conceptually a collection of related items, preserving meaningful ordering and accessibility.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction renderList(items: readonly string[]): string {\n  let html = \"<ul>\";\n\n  for (let i = 0; i < items.length; i += 1) {\n    html += \"<li>\" + items[i] + \"</li>\";\n  }\n\n  return html + \"</ul>\";\n}\n\nconst html = renderList([\n  \"React\",\n  \"TypeScript\",\n]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst items = [\"React\", \"TypeScript\"];\n\nconst html = `<ul>${items\n  .map((item) => `<li>${item}</li>`)\n  .join(\"\")}</ul>`;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h34",
      "questionNumber": "H-034",
      "title": "Unordered list",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Unordered list"
    },
    "answer": {
      "expectedAnswer": "**Unordered list** should use list semantics when the content is conceptually a collection of related items, preserving meaningful ordering and accessibility.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Unordered list** should use list semantics when the content is conceptually a collection of related items, preserving meaningful ordering and accessibility.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction renderList(items: readonly string[]): string {\n  let html = \"<ul>\";\n\n  for (let i = 0; i < items.length; i += 1) {\n    html += \"<li>\" + items[i] + \"</li>\";\n  }\n\n  return html + \"</ul>\";\n}\n\nconst html = renderList([\n  \"React\",\n  \"TypeScript\",\n]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst items = [\"React\", \"TypeScript\"];\n\nconst html = `<ul>${items\n  .map((item) => `<li>${item}</li>`)\n  .join(\"\")}</ul>`;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h35",
      "questionNumber": "H-035",
      "title": "Description list",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Description list"
    },
    "answer": {
      "expectedAnswer": "**Description list** should use list semantics when the content is conceptually a collection of related items, preserving meaningful ordering and accessibility.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Description list** should use list semantics when the content is conceptually a collection of related items, preserving meaningful ordering and accessibility.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction renderList(items: readonly string[]): string {\n  let html = \"<ul>\";\n\n  for (let i = 0; i < items.length; i += 1) {\n    html += \"<li>\" + items[i] + \"</li>\";\n  }\n\n  return html + \"</ul>\";\n}\n\nconst html = renderList([\n  \"React\",\n  \"TypeScript\",\n]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst items = [\"React\", \"TypeScript\"];\n\nconst html = `<ul>${items\n  .map((item) => `<li>${item}</li>`)\n  .join(\"\")}</ul>`;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h36",
      "questionNumber": "H-036",
      "title": "Hyperlinks",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Hyperlinks"
    },
    "answer": {
      "expectedAnswer": "**Hyperlinks** should explain navigation semantics, accessible link names, safe URL handling, target behavior, and why links and buttons are not interchangeable.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Hyperlinks** should explain navigation semantics, accessible link names, safe URL handling, target behavior, and why links and buttons are not interchangeable.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction isSafeHttpUrl(url: string): boolean {\n  return (\n    url.startsWith(\"https://\") ||\n    url.startsWith(\"http://\")\n  );\n}\n\nconst safe = isSafeHttpUrl(\n  \"https://example.com\",\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst url = \"https://example.com\";\n\nconst parsed = new URL(url);\n\nconst safe =\n  parsed.protocol === \"http:\" ||\n  parsed.protocol === \"https:\";\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h37",
      "questionNumber": "H-037",
      "title": "Absolute vs Relative URL",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Absolute vs Relative URL"
    },
    "answer": {
      "expectedAnswer": "**Absolute vs Relative URL** should explain navigation semantics, accessible link names, safe URL handling, target behavior, and why links and buttons are not interchangeable.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Absolute vs Relative URL** should explain navigation semantics, accessible link names, safe URL handling, target behavior, and why links and buttons are not interchangeable.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction isSafeHttpUrl(url: string): boolean {\n  return (\n    url.startsWith(\"https://\") ||\n    url.startsWith(\"http://\")\n  );\n}\n\nconst safe = isSafeHttpUrl(\n  \"https://example.com\",\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst url = \"https://example.com\";\n\nconst parsed = new URL(url);\n\nconst safe =\n  parsed.protocol === \"http:\" ||\n  parsed.protocol === \"https:\";\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h38",
      "questionNumber": "H-038",
      "title": "target attribute",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "target attribute"
    },
    "answer": {
      "expectedAnswer": "**target attribute** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**target attribute** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h39",
      "questionNumber": "H-039",
      "title": "download attribute",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "download attribute"
    },
    "answer": {
      "expectedAnswer": "**download attribute** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**download attribute** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h40",
      "questionNumber": "H-040",
      "title": "Link Best Practices",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML Text & Content",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Link Best Practices"
    },
    "answer": {
      "expectedAnswer": "**Link Best Practices** should explain navigation semantics, accessible link names, safe URL handling, target behavior, and why links and buttons are not interchangeable.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Link Best Practices** should explain navigation semantics, accessible link names, safe URL handling, target behavior, and why links and buttons are not interchangeable.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction isSafeHttpUrl(url: string): boolean {\n  return (\n    url.startsWith(\"https://\") ||\n    url.startsWith(\"http://\")\n  );\n}\n\nconst safe = isSafeHttpUrl(\n  \"https://example.com\",\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst url = \"https://example.com\";\n\nconst parsed = new URL(url);\n\nconst safe =\n  parsed.protocol === \"http:\" ||\n  parsed.protocol === \"https:\";\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h41",
      "questionNumber": "H-041",
      "title": "Images",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Images, Audio & Video",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Images"
    },
    "answer": {
      "expectedAnswer": "**Images** should cover intrinsic dimensions, alternatives/captions where appropriate, loading behavior, responsive sources, and progressive enhancement.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Images** should cover intrinsic dimensions, alternatives/captions where appropriate, loading behavior, responsive sources, and progressive enhancement.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface ImageSource {\n  src: string;\n  width: number;\n}\n\nfunction chooseImage(\n  sources: readonly ImageSource[],\n  requiredWidth: number,\n): ImageSource | null {\n  for (let i = 0; i < sources.length; i += 1) {\n    if (sources[i].width >= requiredWidth) {\n      return sources[i];\n    }\n  }\n\n  return sources.length > 0\n    ? sources[sources.length - 1]\n    : null;\n}\n\nconst image = chooseImage(\n  [\n    { src: \"small.webp\", width: 480 },\n    { src: \"large.webp\", width: 1200 },\n  ],\n  800,\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst sources = [\n  { src: \"small.webp\", width: 480 },\n  { src: \"large.webp\", width: 1200 },\n];\n\nconst image =\n  sources.find((item) => item.width >= 800) ??\n  sources.at(-1) ??\n  null;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h42",
      "questionNumber": "H-042",
      "title": "alt",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Images, Audio & Video",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "alt"
    },
    "answer": {
      "expectedAnswer": "**alt** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**alt** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h43",
      "questionNumber": "H-043",
      "title": "Importance of alt",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Images, Audio & Video",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Importance of alt"
    },
    "answer": {
      "expectedAnswer": "**Importance of alt** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Importance of alt** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h44",
      "questionNumber": "H-044",
      "title": "picture vs img",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Images, Audio & Video",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "picture vs img"
    },
    "answer": {
      "expectedAnswer": "**picture vs img** should cover intrinsic dimensions, alternatives/captions where appropriate, loading behavior, responsive sources, and progressive enhancement.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**picture vs img** should cover intrinsic dimensions, alternatives/captions where appropriate, loading behavior, responsive sources, and progressive enhancement.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface ImageSource {\n  src: string;\n  width: number;\n}\n\nfunction chooseImage(\n  sources: readonly ImageSource[],\n  requiredWidth: number,\n): ImageSource | null {\n  for (let i = 0; i < sources.length; i += 1) {\n    if (sources[i].width >= requiredWidth) {\n      return sources[i];\n    }\n  }\n\n  return sources.length > 0\n    ? sources[sources.length - 1]\n    : null;\n}\n\nconst image = chooseImage(\n  [\n    { src: \"small.webp\", width: 480 },\n    { src: \"large.webp\", width: 1200 },\n  ],\n  800,\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst sources = [\n  { src: \"small.webp\", width: 480 },\n  { src: \"large.webp\", width: 1200 },\n];\n\nconst image =\n  sources.find((item) => item.width >= 800) ??\n  sources.at(-1) ??\n  null;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h45",
      "questionNumber": "H-045",
      "title": "srcset",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Images, Audio & Video",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "srcset"
    },
    "answer": {
      "expectedAnswer": "**srcset** should cover intrinsic dimensions, alternatives/captions where appropriate, loading behavior, responsive sources, and progressive enhancement.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**srcset** should cover intrinsic dimensions, alternatives/captions where appropriate, loading behavior, responsive sources, and progressive enhancement.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface ImageSource {\n  src: string;\n  width: number;\n}\n\nfunction chooseImage(\n  sources: readonly ImageSource[],\n  requiredWidth: number,\n): ImageSource | null {\n  for (let i = 0; i < sources.length; i += 1) {\n    if (sources[i].width >= requiredWidth) {\n      return sources[i];\n    }\n  }\n\n  return sources.length > 0\n    ? sources[sources.length - 1]\n    : null;\n}\n\nconst image = chooseImage(\n  [\n    { src: \"small.webp\", width: 480 },\n    { src: \"large.webp\", width: 1200 },\n  ],\n  800,\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst sources = [\n  { src: \"small.webp\", width: 480 },\n  { src: \"large.webp\", width: 1200 },\n];\n\nconst image =\n  sources.find((item) => item.width >= 800) ??\n  sources.at(-1) ??\n  null;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h46",
      "questionNumber": "H-046",
      "title": "Responsive Images",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Images, Audio & Video",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Responsive Images"
    },
    "answer": {
      "expectedAnswer": "**Responsive Images** should cover intrinsic dimensions, alternatives/captions where appropriate, loading behavior, responsive sources, and progressive enhancement.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Responsive Images** should cover intrinsic dimensions, alternatives/captions where appropriate, loading behavior, responsive sources, and progressive enhancement.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface ImageSource {\n  src: string;\n  width: number;\n}\n\nfunction chooseImage(\n  sources: readonly ImageSource[],\n  requiredWidth: number,\n): ImageSource | null {\n  for (let i = 0; i < sources.length; i += 1) {\n    if (sources[i].width >= requiredWidth) {\n      return sources[i];\n    }\n  }\n\n  return sources.length > 0\n    ? sources[sources.length - 1]\n    : null;\n}\n\nconst image = chooseImage(\n  [\n    { src: \"small.webp\", width: 480 },\n    { src: \"large.webp\", width: 1200 },\n  ],\n  800,\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst sources = [\n  { src: \"small.webp\", width: 480 },\n  { src: \"large.webp\", width: 1200 },\n];\n\nconst image =\n  sources.find((item) => item.width >= 800) ??\n  sources.at(-1) ??\n  null;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h47",
      "questionNumber": "H-047",
      "title": "Lazy Loading",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Images, Audio & Video",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Lazy Loading"
    },
    "answer": {
      "expectedAnswer": "**Lazy Loading** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Lazy Loading** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h48",
      "questionNumber": "H-048",
      "title": "audio",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Images, Audio & Video",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "audio"
    },
    "answer": {
      "expectedAnswer": "**audio** should cover intrinsic dimensions, alternatives/captions where appropriate, loading behavior, responsive sources, and progressive enhancement.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**audio** should cover intrinsic dimensions, alternatives/captions where appropriate, loading behavior, responsive sources, and progressive enhancement.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface ImageSource {\n  src: string;\n  width: number;\n}\n\nfunction chooseImage(\n  sources: readonly ImageSource[],\n  requiredWidth: number,\n): ImageSource | null {\n  for (let i = 0; i < sources.length; i += 1) {\n    if (sources[i].width >= requiredWidth) {\n      return sources[i];\n    }\n  }\n\n  return sources.length > 0\n    ? sources[sources.length - 1]\n    : null;\n}\n\nconst image = chooseImage(\n  [\n    { src: \"small.webp\", width: 480 },\n    { src: \"large.webp\", width: 1200 },\n  ],\n  800,\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst sources = [\n  { src: \"small.webp\", width: 480 },\n  { src: \"large.webp\", width: 1200 },\n];\n\nconst image =\n  sources.find((item) => item.width >= 800) ??\n  sources.at(-1) ??\n  null;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h49",
      "questionNumber": "H-049",
      "title": "video",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Images, Audio & Video",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "video"
    },
    "answer": {
      "expectedAnswer": "**video** should cover intrinsic dimensions, alternatives/captions where appropriate, loading behavior, responsive sources, and progressive enhancement.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**video** should cover intrinsic dimensions, alternatives/captions where appropriate, loading behavior, responsive sources, and progressive enhancement.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface ImageSource {\n  src: string;\n  width: number;\n}\n\nfunction chooseImage(\n  sources: readonly ImageSource[],\n  requiredWidth: number,\n): ImageSource | null {\n  for (let i = 0; i < sources.length; i += 1) {\n    if (sources[i].width >= requiredWidth) {\n      return sources[i];\n    }\n  }\n\n  return sources.length > 0\n    ? sources[sources.length - 1]\n    : null;\n}\n\nconst image = chooseImage(\n  [\n    { src: \"small.webp\", width: 480 },\n    { src: \"large.webp\", width: 1200 },\n  ],\n  800,\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst sources = [\n  { src: \"small.webp\", width: 480 },\n  { src: \"large.webp\", width: 1200 },\n];\n\nconst image =\n  sources.find((item) => item.width >= 800) ??\n  sources.at(-1) ??\n  null;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h50",
      "questionNumber": "H-050",
      "title": "Multiple Sources",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Images, Audio & Video",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Multiple Sources"
    },
    "answer": {
      "expectedAnswer": "**Multiple Sources** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Multiple Sources** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h51",
      "questionNumber": "H-051",
      "title": "track",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Images, Audio & Video",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "track"
    },
    "answer": {
      "expectedAnswer": "**track** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**track** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h52",
      "questionNumber": "H-052",
      "title": "figure",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Images, Audio & Video",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "figure"
    },
    "answer": {
      "expectedAnswer": "**figure** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**figure** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h53",
      "questionNumber": "H-053",
      "title": "SVG vs Canvas",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Images, Audio & Video",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "SVG vs Canvas"
    },
    "answer": {
      "expectedAnswer": "**SVG vs Canvas** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**SVG vs Canvas** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h54",
      "questionNumber": "H-054",
      "title": "When to use SVG",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Images, Audio & Video",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "When to use SVG"
    },
    "answer": {
      "expectedAnswer": "**When to use SVG** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**When to use SVG** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h55",
      "questionNumber": "H-055",
      "title": "Image Optimization",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Images, Audio & Video",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "Image Optimization"
    },
    "answer": {
      "expectedAnswer": "**Image Optimization** should cover intrinsic dimensions, alternatives/captions where appropriate, loading behavior, responsive sources, and progressive enhancement.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Image Optimization** should cover intrinsic dimensions, alternatives/captions where appropriate, loading behavior, responsive sources, and progressive enhancement.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface ImageSource {\n  src: string;\n  width: number;\n}\n\nfunction chooseImage(\n  sources: readonly ImageSource[],\n  requiredWidth: number,\n): ImageSource | null {\n  for (let i = 0; i < sources.length; i += 1) {\n    if (sources[i].width >= requiredWidth) {\n      return sources[i];\n    }\n  }\n\n  return sources.length > 0\n    ? sources[sources.length - 1]\n    : null;\n}\n\nconst image = chooseImage(\n  [\n    { src: \"small.webp\", width: 480 },\n    { src: \"large.webp\", width: 1200 },\n  ],\n  800,\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst sources = [\n  { src: \"small.webp\", width: 480 },\n  { src: \"large.webp\", width: 1200 },\n];\n\nconst image =\n  sources.find((item) => item.width >= 800) ??\n  sources.at(-1) ??\n  null;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h56",
      "questionNumber": "H-056",
      "title": "Tables",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Tables",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Tables"
    },
    "answer": {
      "expectedAnswer": "**Tables** should distinguish tabular data from layout and use table semantics (`table`, `thead`, `tbody`, `th`, `td`, captions/relationships) so assistive technology can understand the structure.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Tables** should distinguish tabular data from layout and use table semantics (`table`, `thead`, `tbody`, `th`, `td`, captions/relationships) so assistive technology can understand the structure.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface Row {\n  name: string;\n  value: string;\n}\n\nfunction renderRows(rows: readonly Row[]): string {\n  let html = \"\";\n\n  for (let i = 0; i < rows.length; i += 1) {\n    html +=\n      \"<tr><th scope=\\\"row\\\">\" +\n      rows[i].name +\n      \"</th><td>\" +\n      rows[i].value +\n      \"</td></tr>\";\n  }\n\n  return html;\n}\n\nconst html = renderRows([\n  { name: \"Status\", value: \"Ready\" },\n]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst rows = [\n  { name: \"Status\", value: \"Ready\" },\n];\n\nconst html = rows\n  .map(\n    (row) =>\n      `<tr><th scope=\"row\">${row.name}</th><td>${row.value}</td></tr>`,\n  )\n  .join(\"\");\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h57",
      "questionNumber": "H-057",
      "title": "thead",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Tables",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "thead"
    },
    "answer": {
      "expectedAnswer": "**thead** should cover what browser/search/social clients consume from document metadata and how incorrect values affect rendering, SEO, privacy, or sharing.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**thead** should cover what browser/search/social clients consume from document metadata and how incorrect values affect rendering, SEO, privacy, or sharing.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface Meta {\n  name: string;\n  content: string;\n}\n\nfunction findMeta(\n  tags: readonly Meta[],\n  name: string,\n): string | null {\n  for (let i = 0; i < tags.length; i += 1) {\n    if (tags[i].name === name) return tags[i].content;\n  }\n\n  return null;\n}\n\nconst description = findMeta(\n  [{ name: \"description\", content: \"Home\" }],\n  \"description\",\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst meta = new Map([\n  [\"description\", \"Home\"],\n]);\n\nconst description =\n  meta.get(\"description\") ?? null;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h58",
      "questionNumber": "H-058",
      "title": "tbody",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Tables",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "tbody"
    },
    "answer": {
      "expectedAnswer": "**tbody** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**tbody** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h59",
      "questionNumber": "H-059",
      "title": "tfoot",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Tables",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "tfoot"
    },
    "answer": {
      "expectedAnswer": "**tfoot** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**tfoot** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h60",
      "questionNumber": "H-060",
      "title": "caption",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Tables",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "caption"
    },
    "answer": {
      "expectedAnswer": "**caption** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**caption** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h61",
      "questionNumber": "H-061",
      "title": "colspan",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Tables",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "colspan"
    },
    "answer": {
      "expectedAnswer": "**colspan** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**colspan** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h62",
      "questionNumber": "H-062",
      "title": "rowspan",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Tables",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "rowspan"
    },
    "answer": {
      "expectedAnswer": "**rowspan** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**rowspan** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h63",
      "questionNumber": "H-063",
      "title": "colgroup",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Tables",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "colgroup"
    },
    "answer": {
      "expectedAnswer": "**colgroup** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**colgroup** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h64",
      "questionNumber": "H-064",
      "title": "scope",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Tables",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "scope"
    },
    "answer": {
      "expectedAnswer": "**scope** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**scope** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h65",
      "questionNumber": "H-065",
      "title": "Responsive Tables",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Tables",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Responsive Tables"
    },
    "answer": {
      "expectedAnswer": "**Responsive Tables** should distinguish tabular data from layout and use table semantics (`table`, `thead`, `tbody`, `th`, `td`, captions/relationships) so assistive technology can understand the structure.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Responsive Tables** should distinguish tabular data from layout and use table semantics (`table`, `thead`, `tbody`, `th`, `td`, captions/relationships) so assistive technology can understand the structure.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface Row {\n  name: string;\n  value: string;\n}\n\nfunction renderRows(rows: readonly Row[]): string {\n  let html = \"\";\n\n  for (let i = 0; i < rows.length; i += 1) {\n    html +=\n      \"<tr><th scope=\\\"row\\\">\" +\n      rows[i].name +\n      \"</th><td>\" +\n      rows[i].value +\n      \"</td></tr>\";\n  }\n\n  return html;\n}\n\nconst html = renderRows([\n  { name: \"Status\", value: \"Ready\" },\n]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst rows = [\n  { name: \"Status\", value: \"Ready\" },\n];\n\nconst html = rows\n  .map(\n    (row) =>\n      `<tr><th scope=\"row\">${row.name}</th><td>${row.value}</td></tr>`,\n  )\n  .join(\"\");\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h66",
      "questionNumber": "H-066",
      "title": "Accessibility",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Tables",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Accessibility"
    },
    "answer": {
      "expectedAnswer": "**Accessibility** is a semantic HTML decision. Prefer the native element whose meaning matches the UI instead of replacing it with generic containers, then verify the resulting accessibility tree and keyboard behavior.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Accessibility** is a semantic HTML decision. Prefer the native element whose meaning matches the UI instead of replacing it with generic containers, then verify the resulting accessibility tree and keyboard behavior.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface NavItem {\n  label: string;\n  href: string;\n}\n\nfunction renderNav(items: readonly NavItem[]): string {\n  let html = \"<nav><ul>\";\n\n  for (let i = 0; i < items.length; i += 1) {\n    html +=\n      \"<li><a href=\\\"\" +\n      items[i].href +\n      \"\\\">\" +\n      items[i].label +\n      \"</a></li>\";\n  }\n\n  return html + \"</ul></nav>\";\n}\n\nconst html = renderNav([\n  { label: \"Home\", href: \"/\" },\n]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst items = [\n  { label: \"Home\", href: \"/\" },\n];\n\nconst html =\n  \"<nav><ul>\" +\n  items\n    .map(\n      (item) =>\n        `<li><a href=\"${item.href}\">${item.label}</a></li>`,\n    )\n    .join(\"\") +\n  \"</ul></nav>\";\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h67",
      "questionNumber": "H-067",
      "title": "Nested Tables",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Tables",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Nested Tables"
    },
    "answer": {
      "expectedAnswer": "**Nested Tables** should distinguish tabular data from layout and use table semantics (`table`, `thead`, `tbody`, `th`, `td`, captions/relationships) so assistive technology can understand the structure.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Nested Tables** should distinguish tabular data from layout and use table semantics (`table`, `thead`, `tbody`, `th`, `td`, captions/relationships) so assistive technology can understand the structure.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface Row {\n  name: string;\n  value: string;\n}\n\nfunction renderRows(rows: readonly Row[]): string {\n  let html = \"\";\n\n  for (let i = 0; i < rows.length; i += 1) {\n    html +=\n      \"<tr><th scope=\\\"row\\\">\" +\n      rows[i].name +\n      \"</th><td>\" +\n      rows[i].value +\n      \"</td></tr>\";\n  }\n\n  return html;\n}\n\nconst html = renderRows([\n  { name: \"Status\", value: \"Ready\" },\n]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst rows = [\n  { name: \"Status\", value: \"Ready\" },\n];\n\nconst html = rows\n  .map(\n    (row) =>\n      `<tr><th scope=\"row\">${row.name}</th><td>${row.value}</td></tr>`,\n  )\n  .join(\"\");\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h68",
      "questionNumber": "H-068",
      "title": "Styling",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Tables",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Styling"
    },
    "answer": {
      "expectedAnswer": "**Styling** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Styling** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h69",
      "questionNumber": "H-069",
      "title": "Common Mistakes",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Tables",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Common Mistakes"
    },
    "answer": {
      "expectedAnswer": "**Common Mistakes** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Common Mistakes** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h70",
      "questionNumber": "H-070",
      "title": "Interview Scenarios",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Tables",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Interview Scenarios"
    },
    "answer": {
      "expectedAnswer": "**Interview Scenarios** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Interview Scenarios** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h71",
      "questionNumber": "H-071",
      "title": "Form",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Form"
    },
    "answer": {
      "expectedAnswer": "**Form** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Form** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface FormState {\n  email: string;\n  valid: boolean;\n}\n\nfunction validateEmail(state: FormState): boolean {\n  if (state.email.length === 0) return false;\n\n  for (let i = 0; i < state.email.length; i += 1) {\n    if (state.email[i] === \"@\") return true;\n  }\n\n  return false;\n}\n\nconst valid = validateEmail({\n  email: \"user@example.com\",\n  valid: false,\n});\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst state = {\n  email: \"user@example.com\",\n  valid: false,\n};\n\nconst valid =\n  state.email.includes(\"@\");\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h72",
      "questionNumber": "H-072",
      "title": "GET vs POST",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "GET vs POST"
    },
    "answer": {
      "expectedAnswer": "**GET vs POST** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**GET vs POST** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h73",
      "questionNumber": "H-073",
      "title": "Action",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Action"
    },
    "answer": {
      "expectedAnswer": "**Action** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Action** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h74",
      "questionNumber": "H-074",
      "title": "Method",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Method"
    },
    "answer": {
      "expectedAnswer": "**Method** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Method** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h75",
      "questionNumber": "H-075",
      "title": "Input",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Input"
    },
    "answer": {
      "expectedAnswer": "**Input** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Input** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface FormState {\n  email: string;\n  valid: boolean;\n}\n\nfunction validateEmail(state: FormState): boolean {\n  if (state.email.length === 0) return false;\n\n  for (let i = 0; i < state.email.length; i += 1) {\n    if (state.email[i] === \"@\") return true;\n  }\n\n  return false;\n}\n\nconst valid = validateEmail({\n  email: \"user@example.com\",\n  valid: false,\n});\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst state = {\n  email: \"user@example.com\",\n  valid: false,\n};\n\nconst valid =\n  state.email.includes(\"@\");\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h76",
      "questionNumber": "H-076",
      "title": "Input Types",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Input Types"
    },
    "answer": {
      "expectedAnswer": "**Input Types** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Input Types** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface FormState {\n  email: string;\n  valid: boolean;\n}\n\nfunction validateEmail(state: FormState): boolean {\n  if (state.email.length === 0) return false;\n\n  for (let i = 0; i < state.email.length; i += 1) {\n    if (state.email[i] === \"@\") return true;\n  }\n\n  return false;\n}\n\nconst valid = validateEmail({\n  email: \"user@example.com\",\n  valid: false,\n});\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst state = {\n  email: \"user@example.com\",\n  valid: false,\n};\n\nconst valid =\n  state.email.includes(\"@\");\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h77",
      "questionNumber": "H-077",
      "title": "Label",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Label"
    },
    "answer": {
      "expectedAnswer": "**Label** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Label** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h78",
      "questionNumber": "H-078",
      "title": "Placeholder",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Placeholder"
    },
    "answer": {
      "expectedAnswer": "**Placeholder** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Placeholder** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h79",
      "questionNumber": "H-079",
      "title": "Name",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Name"
    },
    "answer": {
      "expectedAnswer": "**Name** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Name** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h80",
      "questionNumber": "H-080",
      "title": "Required",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Required"
    },
    "answer": {
      "expectedAnswer": "**Required** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Required** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h81",
      "questionNumber": "H-081",
      "title": "Pattern",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Pattern"
    },
    "answer": {
      "expectedAnswer": "**Pattern** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Pattern** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h82",
      "questionNumber": "H-082",
      "title": "Min & Max",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Min & Max"
    },
    "answer": {
      "expectedAnswer": "**Min & Max** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Min & Max** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h83",
      "questionNumber": "H-083",
      "title": "Checkbox",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Checkbox"
    },
    "answer": {
      "expectedAnswer": "**Checkbox** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Checkbox** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h84",
      "questionNumber": "H-084",
      "title": "Radio",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Radio"
    },
    "answer": {
      "expectedAnswer": "**Radio** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Radio** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h85",
      "questionNumber": "H-085",
      "title": "Select",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Select"
    },
    "answer": {
      "expectedAnswer": "**Select** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Select** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface FormState {\n  email: string;\n  valid: boolean;\n}\n\nfunction validateEmail(state: FormState): boolean {\n  if (state.email.length === 0) return false;\n\n  for (let i = 0; i < state.email.length; i += 1) {\n    if (state.email[i] === \"@\") return true;\n  }\n\n  return false;\n}\n\nconst valid = validateEmail({\n  email: \"user@example.com\",\n  valid: false,\n});\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst state = {\n  email: \"user@example.com\",\n  valid: false,\n};\n\nconst valid =\n  state.email.includes(\"@\");\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h86",
      "questionNumber": "H-086",
      "title": "Option",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Option"
    },
    "answer": {
      "expectedAnswer": "**Option** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Option** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h87",
      "questionNumber": "H-087",
      "title": "Textarea",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Textarea"
    },
    "answer": {
      "expectedAnswer": "**Textarea** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Textarea** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface FormState {\n  email: string;\n  valid: boolean;\n}\n\nfunction validateEmail(state: FormState): boolean {\n  if (state.email.length === 0) return false;\n\n  for (let i = 0; i < state.email.length; i += 1) {\n    if (state.email[i] === \"@\") return true;\n  }\n\n  return false;\n}\n\nconst valid = validateEmail({\n  email: \"user@example.com\",\n  valid: false,\n});\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst state = {\n  email: \"user@example.com\",\n  valid: false,\n};\n\nconst valid =\n  state.email.includes(\"@\");\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h88",
      "questionNumber": "H-088",
      "title": "Button Types",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Button Types"
    },
    "answer": {
      "expectedAnswer": "**Button Types** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Button Types** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface FormState {\n  email: string;\n  valid: boolean;\n}\n\nfunction validateEmail(state: FormState): boolean {\n  if (state.email.length === 0) return false;\n\n  for (let i = 0; i < state.email.length; i += 1) {\n    if (state.email[i] === \"@\") return true;\n  }\n\n  return false;\n}\n\nconst valid = validateEmail({\n  email: \"user@example.com\",\n  valid: false,\n});\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst state = {\n  email: \"user@example.com\",\n  valid: false,\n};\n\nconst valid =\n  state.email.includes(\"@\");\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h89",
      "questionNumber": "H-089",
      "title": "Datalist",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Datalist"
    },
    "answer": {
      "expectedAnswer": "**Datalist** should use list semantics when the content is conceptually a collection of related items, preserving meaningful ordering and accessibility.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Datalist** should use list semantics when the content is conceptually a collection of related items, preserving meaningful ordering and accessibility.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction renderList(items: readonly string[]): string {\n  let html = \"<ul>\";\n\n  for (let i = 0; i < items.length; i += 1) {\n    html += \"<li>\" + items[i] + \"</li>\";\n  }\n\n  return html + \"</ul>\";\n}\n\nconst html = renderList([\n  \"React\",\n  \"TypeScript\",\n]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst items = [\"React\", \"TypeScript\"];\n\nconst html = `<ul>${items\n  .map((item) => `<li>${item}</li>`)\n  .join(\"\")}</ul>`;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h90",
      "questionNumber": "H-090",
      "title": "Fieldset",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Fieldset"
    },
    "answer": {
      "expectedAnswer": "**Fieldset** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Fieldset** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h91",
      "questionNumber": "H-091",
      "title": "Legend",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Legend"
    },
    "answer": {
      "expectedAnswer": "**Legend** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Legend** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h92",
      "questionNumber": "H-092",
      "title": "Validation",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Validation"
    },
    "answer": {
      "expectedAnswer": "**Validation** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Validation** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h93",
      "questionNumber": "H-093",
      "title": "Constraint Validation API",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Constraint Validation API"
    },
    "answer": {
      "expectedAnswer": "**Constraint Validation API** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Constraint Validation API** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h94",
      "questionNumber": "H-094",
      "title": "FormData API",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "FormData API"
    },
    "answer": {
      "expectedAnswer": "**FormData API** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**FormData API** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface FormState {\n  email: string;\n  valid: boolean;\n}\n\nfunction validateEmail(state: FormState): boolean {\n  if (state.email.length === 0) return false;\n\n  for (let i = 0; i < state.email.length; i += 1) {\n    if (state.email[i] === \"@\") return true;\n  }\n\n  return false;\n}\n\nconst valid = validateEmail({\n  email: \"user@example.com\",\n  valid: false,\n});\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst state = {\n  email: \"user@example.com\",\n  valid: false,\n};\n\nconst valid =\n  state.email.includes(\"@\");\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h95",
      "questionNumber": "H-095",
      "title": "Form Best Practices",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Forms",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Form Best Practices"
    },
    "answer": {
      "expectedAnswer": "**Form Best Practices** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Form Best Practices** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface FormState {\n  email: string;\n  valid: boolean;\n}\n\nfunction validateEmail(state: FormState): boolean {\n  if (state.email.length === 0) return false;\n\n  for (let i = 0; i < state.email.length; i += 1) {\n    if (state.email[i] === \"@\") return true;\n  }\n\n  return false;\n}\n\nconst valid = validateEmail({\n  email: \"user@example.com\",\n  valid: false,\n});\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst state = {\n  email: \"user@example.com\",\n  valid: false,\n};\n\nconst valid =\n  state.email.includes(\"@\");\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h96",
      "questionNumber": "H-096",
      "title": "Semantic HTML",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Semantic HTML"
    },
    "answer": {
      "expectedAnswer": "**Semantic HTML** is a semantic HTML decision. Prefer the native element whose meaning matches the UI instead of replacing it with generic containers, then verify the resulting accessibility tree and keyboard behavior.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Semantic HTML** is a semantic HTML decision. Prefer the native element whose meaning matches the UI instead of replacing it with generic containers, then verify the resulting accessibility tree and keyboard behavior.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface NavItem {\n  label: string;\n  href: string;\n}\n\nfunction renderNav(items: readonly NavItem[]): string {\n  let html = \"<nav><ul>\";\n\n  for (let i = 0; i < items.length; i += 1) {\n    html +=\n      \"<li><a href=\\\"\" +\n      items[i].href +\n      \"\\\">\" +\n      items[i].label +\n      \"</a></li>\";\n  }\n\n  return html + \"</ul></nav>\";\n}\n\nconst html = renderNav([\n  { label: \"Home\", href: \"/\" },\n]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst items = [\n  { label: \"Home\", href: \"/\" },\n];\n\nconst html =\n  \"<nav><ul>\" +\n  items\n    .map(\n      (item) =>\n        `<li><a href=\"${item.href}\">${item.label}</a></li>`,\n    )\n    .join(\"\") +\n  \"</ul></nav>\";\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h97",
      "questionNumber": "H-097",
      "title": "Why Semantic HTML",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Why Semantic HTML"
    },
    "answer": {
      "expectedAnswer": "**Why Semantic HTML** is a semantic HTML decision. Prefer the native element whose meaning matches the UI instead of replacing it with generic containers, then verify the resulting accessibility tree and keyboard behavior.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Why Semantic HTML** is a semantic HTML decision. Prefer the native element whose meaning matches the UI instead of replacing it with generic containers, then verify the resulting accessibility tree and keyboard behavior.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface NavItem {\n  label: string;\n  href: string;\n}\n\nfunction renderNav(items: readonly NavItem[]): string {\n  let html = \"<nav><ul>\";\n\n  for (let i = 0; i < items.length; i += 1) {\n    html +=\n      \"<li><a href=\\\"\" +\n      items[i].href +\n      \"\\\">\" +\n      items[i].label +\n      \"</a></li>\";\n  }\n\n  return html + \"</ul></nav>\";\n}\n\nconst html = renderNav([\n  { label: \"Home\", href: \"/\" },\n]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst items = [\n  { label: \"Home\", href: \"/\" },\n];\n\nconst html =\n  \"<nav><ul>\" +\n  items\n    .map(\n      (item) =>\n        `<li><a href=\"${item.href}\">${item.label}</a></li>`,\n    )\n    .join(\"\") +\n  \"</ul></nav>\";\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h98",
      "questionNumber": "H-098",
      "title": "Header",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Header"
    },
    "answer": {
      "expectedAnswer": "**Header** should cover what browser/search/social clients consume from document metadata and how incorrect values affect rendering, SEO, privacy, or sharing.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Header** should cover what browser/search/social clients consume from document metadata and how incorrect values affect rendering, SEO, privacy, or sharing.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface Meta {\n  name: string;\n  content: string;\n}\n\nfunction findMeta(\n  tags: readonly Meta[],\n  name: string,\n): string | null {\n  for (let i = 0; i < tags.length; i += 1) {\n    if (tags[i].name === name) return tags[i].content;\n  }\n\n  return null;\n}\n\nconst description = findMeta(\n  [{ name: \"description\", content: \"Home\" }],\n  \"description\",\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst meta = new Map([\n  [\"description\", \"Home\"],\n]);\n\nconst description =\n  meta.get(\"description\") ?? null;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h99",
      "questionNumber": "H-099",
      "title": "Footer",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Footer"
    },
    "answer": {
      "expectedAnswer": "**Footer** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Footer** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h100",
      "questionNumber": "H-100",
      "title": "Main",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Main"
    },
    "answer": {
      "expectedAnswer": "**Main** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Main** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h101",
      "questionNumber": "H-101",
      "title": "Section",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Section"
    },
    "answer": {
      "expectedAnswer": "**Section** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Section** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h102",
      "questionNumber": "H-102",
      "title": "Article",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Article"
    },
    "answer": {
      "expectedAnswer": "**Article** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Article** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h103",
      "questionNumber": "H-103",
      "title": "Aside",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Aside"
    },
    "answer": {
      "expectedAnswer": "**Aside** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Aside** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h104",
      "questionNumber": "H-104",
      "title": "Nav",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Nav"
    },
    "answer": {
      "expectedAnswer": "**Nav** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Nav** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h105",
      "questionNumber": "H-105",
      "title": "Address",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Address"
    },
    "answer": {
      "expectedAnswer": "**Address** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Address** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h106",
      "questionNumber": "H-106",
      "title": "Time",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Time"
    },
    "answer": {
      "expectedAnswer": "**Time** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Time** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h107",
      "questionNumber": "H-107",
      "title": "Details",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Details"
    },
    "answer": {
      "expectedAnswer": "**Details** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Details** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h108",
      "questionNumber": "H-108",
      "title": "Summary",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Summary"
    },
    "answer": {
      "expectedAnswer": "**Summary** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Summary** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h109",
      "questionNumber": "H-109",
      "title": "Dialog",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Dialog"
    },
    "answer": {
      "expectedAnswer": "**Dialog** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Dialog** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h110",
      "questionNumber": "H-110",
      "title": "Figure",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Figure"
    },
    "answer": {
      "expectedAnswer": "**Figure** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Figure** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h111",
      "questionNumber": "H-111",
      "title": "Figcaption",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Figcaption"
    },
    "answer": {
      "expectedAnswer": "**Figcaption** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Figcaption** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h112",
      "questionNumber": "H-112",
      "title": "div vs section",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "div vs section"
    },
    "answer": {
      "expectedAnswer": "**div vs section** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**div vs section** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h113",
      "questionNumber": "H-113",
      "title": "section vs article",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "section vs article"
    },
    "answer": {
      "expectedAnswer": "**section vs article** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**section vs article** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h114",
      "questionNumber": "H-114",
      "title": "main vs section",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "main vs section"
    },
    "answer": {
      "expectedAnswer": "**main vs section** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**main vs section** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h115",
      "questionNumber": "H-115",
      "title": "Semantic Interview Questions",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Semantic HTML",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Semantic Interview Questions"
    },
    "answer": {
      "expectedAnswer": "**Semantic Interview Questions** is a semantic HTML decision. Prefer the native element whose meaning matches the UI instead of replacing it with generic containers, then verify the resulting accessibility tree and keyboard behavior.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Semantic Interview Questions** is a semantic HTML decision. Prefer the native element whose meaning matches the UI instead of replacing it with generic containers, then verify the resulting accessibility tree and keyboard behavior.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface NavItem {\n  label: string;\n  href: string;\n}\n\nfunction renderNav(items: readonly NavItem[]): string {\n  let html = \"<nav><ul>\";\n\n  for (let i = 0; i < items.length; i += 1) {\n    html +=\n      \"<li><a href=\\\"\" +\n      items[i].href +\n      \"\\\">\" +\n      items[i].label +\n      \"</a></li>\";\n  }\n\n  return html + \"</ul></nav>\";\n}\n\nconst html = renderNav([\n  { label: \"Home\", href: \"/\" },\n]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst items = [\n  { label: \"Home\", href: \"/\" },\n];\n\nconst html =\n  \"<nav><ul>\" +\n  items\n    .map(\n      (item) =>\n        `<li><a href=\"${item.href}\">${item.label}</a></li>`,\n    )\n    .join(\"\") +\n  \"</ul></nav>\";\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h116",
      "questionNumber": "H-116",
      "title": "Accessibility",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Accessibility",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Accessibility"
    },
    "answer": {
      "expectedAnswer": "**Accessibility** is a semantic HTML decision. Prefer the native element whose meaning matches the UI instead of replacing it with generic containers, then verify the resulting accessibility tree and keyboard behavior.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Accessibility** is a semantic HTML decision. Prefer the native element whose meaning matches the UI instead of replacing it with generic containers, then verify the resulting accessibility tree and keyboard behavior.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface NavItem {\n  label: string;\n  href: string;\n}\n\nfunction renderNav(items: readonly NavItem[]): string {\n  let html = \"<nav><ul>\";\n\n  for (let i = 0; i < items.length; i += 1) {\n    html +=\n      \"<li><a href=\\\"\" +\n      items[i].href +\n      \"\\\">\" +\n      items[i].label +\n      \"</a></li>\";\n  }\n\n  return html + \"</ul></nav>\";\n}\n\nconst html = renderNav([\n  { label: \"Home\", href: \"/\" },\n]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst items = [\n  { label: \"Home\", href: \"/\" },\n];\n\nconst html =\n  \"<nav><ul>\" +\n  items\n    .map(\n      (item) =>\n        `<li><a href=\"${item.href}\">${item.label}</a></li>`,\n    )\n    .join(\"\") +\n  \"</ul></nav>\";\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h117",
      "questionNumber": "H-117",
      "title": "Importance",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Accessibility",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Importance"
    },
    "answer": {
      "expectedAnswer": "**Importance** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Importance** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h118",
      "questionNumber": "H-118",
      "title": "Screen Readers",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Accessibility",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Screen Readers"
    },
    "answer": {
      "expectedAnswer": "**Screen Readers** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Screen Readers** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h119",
      "questionNumber": "H-119",
      "title": "ARIA",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Accessibility",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "ARIA"
    },
    "answer": {
      "expectedAnswer": "**ARIA** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**ARIA** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h120",
      "questionNumber": "H-120",
      "title": "aria-label",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Accessibility",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "aria-label"
    },
    "answer": {
      "expectedAnswer": "**aria-label** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**aria-label** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h121",
      "questionNumber": "H-121",
      "title": "aria-labelledby",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Accessibility",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "aria-labelledby"
    },
    "answer": {
      "expectedAnswer": "**aria-labelledby** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**aria-labelledby** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h122",
      "questionNumber": "H-122",
      "title": "aria-describedby",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Accessibility",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "aria-describedby"
    },
    "answer": {
      "expectedAnswer": "**aria-describedby** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**aria-describedby** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h123",
      "questionNumber": "H-123",
      "title": "Role",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Accessibility",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Role"
    },
    "answer": {
      "expectedAnswer": "**Role** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Role** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h124",
      "questionNumber": "H-124",
      "title": "tabindex",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Accessibility",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "tabindex"
    },
    "answer": {
      "expectedAnswer": "**tabindex** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**tabindex** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h125",
      "questionNumber": "H-125",
      "title": "Keyboard Navigation",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Accessibility",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Keyboard Navigation"
    },
    "answer": {
      "expectedAnswer": "**Keyboard Navigation** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Keyboard Navigation** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h126",
      "questionNumber": "H-126",
      "title": "Focus Management",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Accessibility",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Focus Management"
    },
    "answer": {
      "expectedAnswer": "**Focus Management** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Focus Management** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h127",
      "questionNumber": "H-127",
      "title": "Skip Links",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Accessibility",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Skip Links"
    },
    "answer": {
      "expectedAnswer": "**Skip Links** should explain navigation semantics, accessible link names, safe URL handling, target behavior, and why links and buttons are not interchangeable.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Skip Links** should explain navigation semantics, accessible link names, safe URL handling, target behavior, and why links and buttons are not interchangeable.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction isSafeHttpUrl(url: string): boolean {\n  return (\n    url.startsWith(\"https://\") ||\n    url.startsWith(\"http://\")\n  );\n}\n\nconst safe = isSafeHttpUrl(\n  \"https://example.com\",\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst url = \"https://example.com\";\n\nconst parsed = new URL(url);\n\nconst safe =\n  parsed.protocol === \"http:\" ||\n  parsed.protocol === \"https:\";\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h128",
      "questionNumber": "H-128",
      "title": "Color Contrast",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Accessibility",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Color Contrast"
    },
    "answer": {
      "expectedAnswer": "**Color Contrast** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Color Contrast** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h129",
      "questionNumber": "H-129",
      "title": "Accessible Forms",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Accessibility",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Accessible Forms"
    },
    "answer": {
      "expectedAnswer": "**Accessible Forms** is a semantic HTML decision. Prefer the native element whose meaning matches the UI instead of replacing it with generic containers, then verify the resulting accessibility tree and keyboard behavior.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Accessible Forms** is a semantic HTML decision. Prefer the native element whose meaning matches the UI instead of replacing it with generic containers, then verify the resulting accessibility tree and keyboard behavior.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface NavItem {\n  label: string;\n  href: string;\n}\n\nfunction renderNav(items: readonly NavItem[]): string {\n  let html = \"<nav><ul>\";\n\n  for (let i = 0; i < items.length; i += 1) {\n    html +=\n      \"<li><a href=\\\"\" +\n      items[i].href +\n      \"\\\">\" +\n      items[i].label +\n      \"</a></li>\";\n  }\n\n  return html + \"</ul></nav>\";\n}\n\nconst html = renderNav([\n  { label: \"Home\", href: \"/\" },\n]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst items = [\n  { label: \"Home\", href: \"/\" },\n];\n\nconst html =\n  \"<nav><ul>\" +\n  items\n    .map(\n      (item) =>\n        `<li><a href=\"${item.href}\">${item.label}</a></li>`,\n    )\n    .join(\"\") +\n  \"</ul></nav>\";\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h130",
      "questionNumber": "H-130",
      "title": "Best Practices",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Accessibility",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Best Practices"
    },
    "answer": {
      "expectedAnswer": "**Best Practices** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Best Practices** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h131",
      "questionNumber": "H-131",
      "title": "SEO",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "SEO",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "SEO"
    },
    "answer": {
      "expectedAnswer": "**SEO** should cover what browser/search/social clients consume from document metadata and how incorrect values affect rendering, SEO, privacy, or sharing.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**SEO** should cover what browser/search/social clients consume from document metadata and how incorrect values affect rendering, SEO, privacy, or sharing.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface Meta {\n  name: string;\n  content: string;\n}\n\nfunction findMeta(\n  tags: readonly Meta[],\n  name: string,\n): string | null {\n  for (let i = 0; i < tags.length; i += 1) {\n    if (tags[i].name === name) return tags[i].content;\n  }\n\n  return null;\n}\n\nconst description = findMeta(\n  [{ name: \"description\", content: \"Home\" }],\n  \"description\",\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst meta = new Map([\n  [\"description\", \"Home\"],\n]);\n\nconst description =\n  meta.get(\"description\") ?? null;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h132",
      "questionNumber": "H-132",
      "title": "Title",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "SEO",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Title"
    },
    "answer": {
      "expectedAnswer": "**Title** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Title** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h133",
      "questionNumber": "H-133",
      "title": "Meta Description",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "SEO",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Meta Description"
    },
    "answer": {
      "expectedAnswer": "**Meta Description** should explain parser blocking, module/defer/async behavior, execution order, dependency constraints, and the impact on startup performance.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Meta Description** should explain parser blocking, module/defer/async behavior, execution order, dependency constraints, and the impact on startup performance.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface ScriptPlan {\n  defer: boolean;\n  async: boolean;\n}\n\nfunction executionMode(\n  plan: ScriptPlan,\n): string {\n  if (plan.async) return \"async\";\n  if (plan.defer) return \"defer\";\n  return \"parser-blocking\";\n}\n\nconst mode = executionMode({\n  defer: true,\n  async: false,\n});\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst plan = {\n  defer: true,\n  async: false,\n};\n\nconst mode = plan.async\n  ? \"async\"\n  : plan.defer\n    ? \"defer\"\n    : \"parser-blocking\";\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h134",
      "questionNumber": "H-134",
      "title": "Robots",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "SEO",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Robots"
    },
    "answer": {
      "expectedAnswer": "**Robots** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Robots** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h135",
      "questionNumber": "H-135",
      "title": "Canonical",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "SEO",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Canonical"
    },
    "answer": {
      "expectedAnswer": "**Canonical** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Canonical** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h136",
      "questionNumber": "H-136",
      "title": "Open Graph",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "SEO",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Open Graph"
    },
    "answer": {
      "expectedAnswer": "**Open Graph** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Open Graph** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h137",
      "questionNumber": "H-137",
      "title": "Twitter Cards",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "SEO",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Twitter Cards"
    },
    "answer": {
      "expectedAnswer": "**Twitter Cards** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Twitter Cards** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h138",
      "questionNumber": "H-138",
      "title": "Structured Data",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "SEO",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Structured Data"
    },
    "answer": {
      "expectedAnswer": "**Structured Data** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Structured Data** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h139",
      "questionNumber": "H-139",
      "title": "JSON-LD",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "SEO",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "JSON-LD"
    },
    "answer": {
      "expectedAnswer": "**JSON-LD** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**JSON-LD** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h140",
      "questionNumber": "H-140",
      "title": "SEO Best Practices",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "SEO",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "SEO Best Practices"
    },
    "answer": {
      "expectedAnswer": "**SEO Best Practices** should cover what browser/search/social clients consume from document metadata and how incorrect values affect rendering, SEO, privacy, or sharing.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**SEO Best Practices** should cover what browser/search/social clients consume from document metadata and how incorrect values affect rendering, SEO, privacy, or sharing.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface Meta {\n  name: string;\n  content: string;\n}\n\nfunction findMeta(\n  tags: readonly Meta[],\n  name: string,\n): string | null {\n  for (let i = 0; i < tags.length; i += 1) {\n    if (tags[i].name === name) return tags[i].content;\n  }\n\n  return null;\n}\n\nconst description = findMeta(\n  [{ name: \"description\", content: \"Home\" }],\n  \"description\",\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst meta = new Map([\n  [\"description\", \"Home\"],\n]);\n\nconst description =\n  meta.get(\"description\") ?? null;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h141",
      "questionNumber": "H-141",
      "title": "localStorage",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML5 APIs",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "localStorage"
    },
    "answer": {
      "expectedAnswer": "**localStorage** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**localStorage** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h142",
      "questionNumber": "H-142",
      "title": "sessionStorage",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML5 APIs",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "sessionStorage"
    },
    "answer": {
      "expectedAnswer": "**sessionStorage** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**sessionStorage** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h143",
      "questionNumber": "H-143",
      "title": "Cookies",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML5 APIs",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Cookies"
    },
    "answer": {
      "expectedAnswer": "**Cookies** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Cookies** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h144",
      "questionNumber": "H-144",
      "title": "IndexedDB",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML5 APIs",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "IndexedDB"
    },
    "answer": {
      "expectedAnswer": "**IndexedDB** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**IndexedDB** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h145",
      "questionNumber": "H-145",
      "title": "Geolocation",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML5 APIs",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Geolocation"
    },
    "answer": {
      "expectedAnswer": "**Geolocation** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Geolocation** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h146",
      "questionNumber": "H-146",
      "title": "Drag & Drop",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML5 APIs",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Drag & Drop"
    },
    "answer": {
      "expectedAnswer": "**Drag & Drop** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Drag & Drop** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h147",
      "questionNumber": "H-147",
      "title": "Clipboard API",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML5 APIs",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Clipboard API"
    },
    "answer": {
      "expectedAnswer": "**Clipboard API** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Clipboard API** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h148",
      "questionNumber": "H-148",
      "title": "File API",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML5 APIs",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "File API"
    },
    "answer": {
      "expectedAnswer": "**File API** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**File API** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h149",
      "questionNumber": "H-149",
      "title": "History API",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML5 APIs",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "History API"
    },
    "answer": {
      "expectedAnswer": "**History API** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**History API** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h150",
      "questionNumber": "H-150",
      "title": "Fullscreen API",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML5 APIs",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Fullscreen API"
    },
    "answer": {
      "expectedAnswer": "**Fullscreen API** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Fullscreen API** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h151",
      "questionNumber": "H-151",
      "title": "Notification API",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML5 APIs",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Notification API"
    },
    "answer": {
      "expectedAnswer": "**Notification API** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Notification API** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h152",
      "questionNumber": "H-152",
      "title": "Web Workers",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML5 APIs",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "Web Workers"
    },
    "answer": {
      "expectedAnswer": "**Web Workers** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Web Workers** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h153",
      "questionNumber": "H-153",
      "title": "data-\\* attributes",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML5 APIs",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "data-\\* attributes"
    },
    "answer": {
      "expectedAnswer": "**data-\\\\* attributes** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**data-\\\\* attributes** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h154",
      "questionNumber": "H-154",
      "title": "dataset API",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML5 APIs",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "dataset API"
    },
    "answer": {
      "expectedAnswer": "**dataset API** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**dataset API** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h155",
      "questionNumber": "H-155",
      "title": "Browser Support",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "HTML5 APIs",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Browser Support"
    },
    "answer": {
      "expectedAnswer": "**Browser Support** should be answered in terms of supported browser behavior, standards-based fallbacks, progressive enhancement, and a targeted compatibility matrix.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Browser Support** should be answered in terms of supported browser behavior, standards-based fallbacks, progressive enhancement, and a targeted compatibility matrix.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface Feature {\n  name: string;\n  supported: boolean;\n}\n\nfunction supportedFeatures(\n  features: readonly Feature[],\n): string[] {\n  const result: string[] = [];\n\n  for (let i = 0; i < features.length; i += 1) {\n    if (features[i].supported) result.push(features[i].name);\n  }\n\n  return result;\n}\n\nconst supported = supportedFeatures([\n  { name: \"dialog\", supported: true },\n]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst features = [\n  { name: \"dialog\", supported: true },\n];\n\nconst supported = features\n  .filter((feature) => feature.supported)\n  .map((feature) => feature.name);\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h156",
      "questionNumber": "H-156",
      "title": "Lazy Loading",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Performance",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Lazy Loading"
    },
    "answer": {
      "expectedAnswer": "**Lazy Loading** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Lazy Loading** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h157",
      "questionNumber": "H-157",
      "title": "preload",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Performance",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "preload"
    },
    "answer": {
      "expectedAnswer": "**preload** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**preload** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h158",
      "questionNumber": "H-158",
      "title": "prefetch",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Performance",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "prefetch"
    },
    "answer": {
      "expectedAnswer": "**prefetch** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**prefetch** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h159",
      "questionNumber": "H-159",
      "title": "preconnect",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Performance",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "preconnect"
    },
    "answer": {
      "expectedAnswer": "**preconnect** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**preconnect** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h160",
      "questionNumber": "H-160",
      "title": "dns-prefetch",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Performance",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "dns-prefetch"
    },
    "answer": {
      "expectedAnswer": "**dns-prefetch** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**dns-prefetch** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h161",
      "questionNumber": "H-161",
      "title": "Resource Hints",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Performance",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Resource Hints"
    },
    "answer": {
      "expectedAnswer": "**Resource Hints** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Resource Hints** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h162",
      "questionNumber": "H-162",
      "title": "Image Optimization",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Performance",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "Image Optimization"
    },
    "answer": {
      "expectedAnswer": "**Image Optimization** should cover intrinsic dimensions, alternatives/captions where appropriate, loading behavior, responsive sources, and progressive enhancement.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Image Optimization** should cover intrinsic dimensions, alternatives/captions where appropriate, loading behavior, responsive sources, and progressive enhancement.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface ImageSource {\n  src: string;\n  width: number;\n}\n\nfunction chooseImage(\n  sources: readonly ImageSource[],\n  requiredWidth: number,\n): ImageSource | null {\n  for (let i = 0; i < sources.length; i += 1) {\n    if (sources[i].width >= requiredWidth) {\n      return sources[i];\n    }\n  }\n\n  return sources.length > 0\n    ? sources[sources.length - 1]\n    : null;\n}\n\nconst image = chooseImage(\n  [\n    { src: \"small.webp\", width: 480 },\n    { src: \"large.webp\", width: 1200 },\n  ],\n  800,\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst sources = [\n  { src: \"small.webp\", width: 480 },\n  { src: \"large.webp\", width: 1200 },\n];\n\nconst image =\n  sources.find((item) => item.width >= 800) ??\n  sources.at(-1) ??\n  null;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h163",
      "questionNumber": "H-163",
      "title": "Render Blocking",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Performance",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Render Blocking"
    },
    "answer": {
      "expectedAnswer": "**Render Blocking** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Render Blocking** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h164",
      "questionNumber": "H-164",
      "title": "Critical Rendering Path",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Performance",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "Critical Rendering Path"
    },
    "answer": {
      "expectedAnswer": "**Critical Rendering Path** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Critical Rendering Path** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h165",
      "questionNumber": "H-165",
      "title": "Performance Best Practices",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Performance",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Performance Best Practices"
    },
    "answer": {
      "expectedAnswer": "**Performance Best Practices** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Performance Best Practices** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface FormState {\n  email: string;\n  valid: boolean;\n}\n\nfunction validateEmail(state: FormState): boolean {\n  if (state.email.length === 0) return false;\n\n  for (let i = 0; i < state.email.length; i += 1) {\n    if (state.email[i] === \"@\") return true;\n  }\n\n  return false;\n}\n\nconst valid = validateEmail({\n  email: \"user@example.com\",\n  valid: false,\n});\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst state = {\n  email: \"user@example.com\",\n  valid: false,\n};\n\nconst valid =\n  state.email.includes(\"@\");\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h166",
      "questionNumber": "H-166",
      "title": "XSS",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Security",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "XSS"
    },
    "answer": {
      "expectedAnswer": "**XSS** should explain the trust boundary, the browser/server control involved, safe handling of untrusted content, and what should be tested in both allowed and denied cases.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**XSS** should explain the trust boundary, the browser/server control involved, safe handling of untrusted content, and what should be tested in both allowed and denied cases.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction containsUnsafeHtml(value: string): boolean {\n  for (let i = 0; i < value.length - 1; i += 1) {\n    if (value[i] === \"<\" && value[i + 1] === \"s\") {\n      return true;\n    }\n  }\n\n  return false;\n}\n\nconst unsafe = containsUnsafeHtml(\n  \"<script>alert(1)</script>\",\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst input = \"<script>alert(1)</script>\";\n\nconst unsafe = input.includes(\"<script\");\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h167",
      "questionNumber": "H-167",
      "title": "CSP",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Security",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "CSP"
    },
    "answer": {
      "expectedAnswer": "**CSP** should explain the trust boundary, the browser/server control involved, safe handling of untrusted content, and what should be tested in both allowed and denied cases.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**CSP** should explain the trust boundary, the browser/server control involved, safe handling of untrusted content, and what should be tested in both allowed and denied cases.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction containsUnsafeHtml(value: string): boolean {\n  for (let i = 0; i < value.length - 1; i += 1) {\n    if (value[i] === \"<\" && value[i + 1] === \"s\") {\n      return true;\n    }\n  }\n\n  return false;\n}\n\nconst unsafe = containsUnsafeHtml(\n  \"<script>alert(1)</script>\",\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst input = \"<script>alert(1)</script>\";\n\nconst unsafe = input.includes(\"<script\");\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h168",
      "questionNumber": "H-168",
      "title": "iframe Security",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Security",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "iframe Security"
    },
    "answer": {
      "expectedAnswer": "**iframe Security** should explain the trust boundary, the browser/server control involved, safe handling of untrusted content, and what should be tested in both allowed and denied cases.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**iframe Security** should explain the trust boundary, the browser/server control involved, safe handling of untrusted content, and what should be tested in both allowed and denied cases.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction containsUnsafeHtml(value: string): boolean {\n  for (let i = 0; i < value.length - 1; i += 1) {\n    if (value[i] === \"<\" && value[i + 1] === \"s\") {\n      return true;\n    }\n  }\n\n  return false;\n}\n\nconst unsafe = containsUnsafeHtml(\n  \"<script>alert(1)</script>\",\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst input = \"<script>alert(1)</script>\";\n\nconst unsafe = input.includes(\"<script\");\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h169",
      "questionNumber": "H-169",
      "title": "sandbox",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Security",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "sandbox"
    },
    "answer": {
      "expectedAnswer": "**sandbox** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**sandbox** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h170",
      "questionNumber": "H-170",
      "title": "Same-Origin Policy",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Security",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "Same-Origin Policy"
    },
    "answer": {
      "expectedAnswer": "**Same-Origin Policy** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Same-Origin Policy** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h171",
      "questionNumber": "H-171",
      "title": "Secure Forms",
      "difficulty": "Easy",
      "companies": [
        "Google",
        "Amazon",
        "Microsoft",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Security",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "0-2 Years",
      "question": "Secure Forms"
    },
    "answer": {
      "expectedAnswer": "**Secure Forms** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Secure Forms** should cover semantic controls, labels, names/values, validation, submit behavior, keyboard interaction, and the fact that server-side validation remains authoritative.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface FormState {\n  email: string;\n  valid: boolean;\n}\n\nfunction validateEmail(state: FormState): boolean {\n  if (state.email.length === 0) return false;\n\n  for (let i = 0; i < state.email.length; i += 1) {\n    if (state.email[i] === \"@\") return true;\n  }\n\n  return false;\n}\n\nconst valid = validateEmail({\n  email: \"user@example.com\",\n  valid: false,\n});\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst state = {\n  email: \"user@example.com\",\n  valid: false,\n};\n\nconst valid =\n  state.email.includes(\"@\");\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h172",
      "questionNumber": "H-172",
      "title": "Secure Uploads",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Security",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Secure Uploads"
    },
    "answer": {
      "expectedAnswer": "**Secure Uploads** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Secure Uploads** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h173",
      "questionNumber": "H-173",
      "title": "HTML Injection",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Security",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "HTML Injection"
    },
    "answer": {
      "expectedAnswer": "**HTML Injection** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**HTML Injection** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h174",
      "questionNumber": "H-174",
      "title": "Security Headers",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Security",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "Security Headers"
    },
    "answer": {
      "expectedAnswer": "**Security Headers** should cover what browser/search/social clients consume from document metadata and how incorrect values affect rendering, SEO, privacy, or sharing.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Security Headers** should cover what browser/search/social clients consume from document metadata and how incorrect values affect rendering, SEO, privacy, or sharing.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface Meta {\n  name: string;\n  content: string;\n}\n\nfunction findMeta(\n  tags: readonly Meta[],\n  name: string,\n): string | null {\n  for (let i = 0; i < tags.length; i += 1) {\n    if (tags[i].name === name) return tags[i].content;\n  }\n\n  return null;\n}\n\nconst description = findMeta(\n  [{ name: \"description\", content: \"Home\" }],\n  \"description\",\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst meta = new Map([\n  [\"description\", \"Home\"],\n]);\n\nconst description =\n  meta.get(\"description\") ?? null;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h175",
      "questionNumber": "H-175",
      "title": "Security Best Practices",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Security",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "Security Best Practices"
    },
    "answer": {
      "expectedAnswer": "**Security Best Practices** should explain the trust boundary, the browser/server control involved, safe handling of untrusted content, and what should be tested in both allowed and denied cases.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Security Best Practices** should explain the trust boundary, the browser/server control involved, safe handling of untrusted content, and what should be tested in both allowed and denied cases.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction containsUnsafeHtml(value: string): boolean {\n  for (let i = 0; i < value.length - 1; i += 1) {\n    if (value[i] === \"<\" && value[i + 1] === \"s\") {\n      return true;\n    }\n  }\n\n  return false;\n}\n\nconst unsafe = containsUnsafeHtml(\n  \"<script>alert(1)</script>\",\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst input = \"<script>alert(1)</script>\";\n\nconst unsafe = input.includes(\"<script\");\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h176",
      "questionNumber": "H-176",
      "title": "Browser Parsing",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "Browser Parsing"
    },
    "answer": {
      "expectedAnswer": "**Browser Parsing** should be answered in terms of supported browser behavior, standards-based fallbacks, progressive enhancement, and a targeted compatibility matrix.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Browser Parsing** should be answered in terms of supported browser behavior, standards-based fallbacks, progressive enhancement, and a targeted compatibility matrix.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface Feature {\n  name: string;\n  supported: boolean;\n}\n\nfunction supportedFeatures(\n  features: readonly Feature[],\n): string[] {\n  const result: string[] = [];\n\n  for (let i = 0; i < features.length; i += 1) {\n    if (features[i].supported) result.push(features[i].name);\n  }\n\n  return result;\n}\n\nconst supported = supportedFeatures([\n  { name: \"dialog\", supported: true },\n]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst features = [\n  { name: \"dialog\", supported: true },\n];\n\nconst supported = features\n  .filter((feature) => feature.supported)\n  .map((feature) => feature.name);\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h177",
      "questionNumber": "H-177",
      "title": "DOM",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "DOM"
    },
    "answer": {
      "expectedAnswer": "**DOM** should explain how the browser turns markup into a DOM tree, how nodes/properties are traversed, and how DOM shape affects scriptability and rendering.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**DOM** should explain how the browser turns markup into a DOM tree, how nodes/properties are traversed, and how DOM shape affects scriptability and rendering.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface Node {\n  tag: string;\n  children: Node[];\n}\n\nfunction countNodes(node: Node): number {\n  let total = 1;\n\n  for (let i = 0; i < node.children.length; i += 1) {\n    total += countNodes(node.children[i]);\n  }\n\n  return total;\n}\n\nconst count = countNodes({\n  tag: \"div\",\n  children: [\n    { tag: \"span\", children: [] },\n  ],\n});\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst tree = {\n  tag: \"div\",\n  children: [\n    { tag: \"span\", children: [] },\n  ],\n};\n\nconst countNodes = (node: typeof tree): number =>\n  1 +\n  node.children.reduce(\n    (sum, child) => sum + countNodes(child),\n    0,\n  );\n\nconst count = countNodes(tree);\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h178",
      "questionNumber": "H-178",
      "title": "DOM vs HTML",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "DOM vs HTML"
    },
    "answer": {
      "expectedAnswer": "**DOM vs HTML** should explain how the browser turns markup into a DOM tree, how nodes/properties are traversed, and how DOM shape affects scriptability and rendering.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**DOM vs HTML** should explain how the browser turns markup into a DOM tree, how nodes/properties are traversed, and how DOM shape affects scriptability and rendering.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface Node {\n  tag: string;\n  children: Node[];\n}\n\nfunction countNodes(node: Node): number {\n  let total = 1;\n\n  for (let i = 0; i < node.children.length; i += 1) {\n    total += countNodes(node.children[i]);\n  }\n\n  return total;\n}\n\nconst count = countNodes({\n  tag: \"div\",\n  children: [\n    { tag: \"span\", children: [] },\n  ],\n});\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst tree = {\n  tag: \"div\",\n  children: [\n    { tag: \"span\", children: [] },\n  ],\n};\n\nconst countNodes = (node: typeof tree): number =>\n  1 +\n  node.children.reduce(\n    (sum, child) => sum + countNodes(child),\n    0,\n  );\n\nconst count = countNodes(tree);\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h179",
      "questionNumber": "H-179",
      "title": "Render Tree",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "Render Tree"
    },
    "answer": {
      "expectedAnswer": "**Render Tree** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Render Tree** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h180",
      "questionNumber": "H-180",
      "title": "CSSOM",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "CSSOM"
    },
    "answer": {
      "expectedAnswer": "**CSSOM** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**CSSOM** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h181",
      "questionNumber": "H-181",
      "title": "Critical Rendering Path",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "Critical Rendering Path"
    },
    "answer": {
      "expectedAnswer": "**Critical Rendering Path** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Critical Rendering Path** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h182",
      "questionNumber": "H-182",
      "title": "async vs defer",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "async vs defer"
    },
    "answer": {
      "expectedAnswer": "**async vs defer** should explain parser blocking, module/defer/async behavior, execution order, dependency constraints, and the impact on startup performance.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**async vs defer** should explain parser blocking, module/defer/async behavior, execution order, dependency constraints, and the impact on startup performance.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface ScriptPlan {\n  defer: boolean;\n  async: boolean;\n}\n\nfunction executionMode(\n  plan: ScriptPlan,\n): string {\n  if (plan.async) return \"async\";\n  if (plan.defer) return \"defer\";\n  return \"parser-blocking\";\n}\n\nconst mode = executionMode({\n  defer: true,\n  async: false,\n});\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst plan = {\n  defer: true,\n  async: false,\n};\n\nconst mode = plan.async\n  ? \"async\"\n  : plan.defer\n    ? \"defer\"\n    : \"parser-blocking\";\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h183",
      "questionNumber": "H-183",
      "title": "preload vs prefetch",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "preload vs prefetch"
    },
    "answer": {
      "expectedAnswer": "**preload vs prefetch** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**preload vs prefetch** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h184",
      "questionNumber": "H-184",
      "title": "Script Loading Strategies",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "Script Loading Strategies"
    },
    "answer": {
      "expectedAnswer": "**Script Loading Strategies** should explain parser blocking, module/defer/async behavior, execution order, dependency constraints, and the impact on startup performance.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Script Loading Strategies** should explain parser blocking, module/defer/async behavior, execution order, dependency constraints, and the impact on startup performance.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface ScriptPlan {\n  defer: boolean;\n  async: boolean;\n}\n\nfunction executionMode(\n  plan: ScriptPlan,\n): string {\n  if (plan.async) return \"async\";\n  if (plan.defer) return \"defer\";\n  return \"parser-blocking\";\n}\n\nconst mode = executionMode({\n  defer: true,\n  async: false,\n});\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst plan = {\n  defer: true,\n  async: false,\n};\n\nconst mode = plan.async\n  ? \"async\"\n  : plan.defer\n    ? \"defer\"\n    : \"parser-blocking\";\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h185",
      "questionNumber": "H-185",
      "title": "Resource Prioritization",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "Resource Prioritization"
    },
    "answer": {
      "expectedAnswer": "**Resource Prioritization** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Resource Prioritization** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h186",
      "questionNumber": "H-186",
      "title": "Progressive Enhancement",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Progressive Enhancement"
    },
    "answer": {
      "expectedAnswer": "**Progressive Enhancement** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Progressive Enhancement** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h187",
      "questionNumber": "H-187",
      "title": "Graceful Degradation",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Graceful Degradation"
    },
    "answer": {
      "expectedAnswer": "**Graceful Degradation** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Graceful Degradation** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h188",
      "questionNumber": "H-188",
      "title": "Responsive HTML",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Responsive HTML"
    },
    "answer": {
      "expectedAnswer": "**Responsive HTML** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Responsive HTML** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h189",
      "questionNumber": "H-189",
      "title": "HTML for PWAs",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "HTML for PWAs"
    },
    "answer": {
      "expectedAnswer": "**HTML for PWAs** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**HTML for PWAs** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h190",
      "questionNumber": "H-190",
      "title": "HTML for SSR",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "HTML for SSR"
    },
    "answer": {
      "expectedAnswer": "**HTML for SSR** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**HTML for SSR** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h191",
      "questionNumber": "H-191",
      "title": "Production Best Practices",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "Production Best Practices"
    },
    "answer": {
      "expectedAnswer": "**Production Best Practices** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Production Best Practices** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h192",
      "questionNumber": "H-192",
      "title": "HTML Code Review Checklist",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "HTML Code Review Checklist"
    },
    "answer": {
      "expectedAnswer": "**HTML Code Review Checklist** should use list semantics when the content is conceptually a collection of related items, preserving meaningful ordering and accessibility.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**HTML Code Review Checklist** should use list semantics when the content is conceptually a collection of related items, preserving meaningful ordering and accessibility.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction renderList(items: readonly string[]): string {\n  let html = \"<ul>\";\n\n  for (let i = 0; i < items.length; i += 1) {\n    html += \"<li>\" + items[i] + \"</li>\";\n  }\n\n  return html + \"</ul>\";\n}\n\nconst html = renderList([\n  \"React\",\n  \"TypeScript\",\n]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst items = [\"React\", \"TypeScript\"];\n\nconst html = `<ul>${items\n  .map((item) => `<li>${item}</li>`)\n  .join(\"\")}</ul>`;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h193",
      "questionNumber": "H-193",
      "title": "Accessibility Audit",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "Accessibility Audit"
    },
    "answer": {
      "expectedAnswer": "**Accessibility Audit** is a semantic HTML decision. Prefer the native element whose meaning matches the UI instead of replacing it with generic containers, then verify the resulting accessibility tree and keyboard behavior.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Accessibility Audit** is a semantic HTML decision. Prefer the native element whose meaning matches the UI instead of replacing it with generic containers, then verify the resulting accessibility tree and keyboard behavior.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface NavItem {\n  label: string;\n  href: string;\n}\n\nfunction renderNav(items: readonly NavItem[]): string {\n  let html = \"<nav><ul>\";\n\n  for (let i = 0; i < items.length; i += 1) {\n    html +=\n      \"<li><a href=\\\"\" +\n      items[i].href +\n      \"\\\">\" +\n      items[i].label +\n      \"</a></li>\";\n  }\n\n  return html + \"</ul></nav>\";\n}\n\nconst html = renderNav([\n  { label: \"Home\", href: \"/\" },\n]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst items = [\n  { label: \"Home\", href: \"/\" },\n];\n\nconst html =\n  \"<nav><ul>\" +\n  items\n    .map(\n      (item) =>\n        `<li><a href=\"${item.href}\">${item.label}</a></li>`,\n    )\n    .join(\"\") +\n  \"</ul></nav>\";\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h194",
      "questionNumber": "H-194",
      "title": "SEO Audit",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "SEO Audit"
    },
    "answer": {
      "expectedAnswer": "**SEO Audit** should cover what browser/search/social clients consume from document metadata and how incorrect values affect rendering, SEO, privacy, or sharing.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**SEO Audit** should cover what browser/search/social clients consume from document metadata and how incorrect values affect rendering, SEO, privacy, or sharing.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface Meta {\n  name: string;\n  content: string;\n}\n\nfunction findMeta(\n  tags: readonly Meta[],\n  name: string,\n): string | null {\n  for (let i = 0; i < tags.length; i += 1) {\n    if (tags[i].name === name) return tags[i].content;\n  }\n\n  return null;\n}\n\nconst description = findMeta(\n  [{ name: \"description\", content: \"Home\" }],\n  \"description\",\n);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst meta = new Map([\n  [\"description\", \"Home\"],\n]);\n\nconst description =\n  meta.get(\"description\") ?? null;\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h195",
      "questionNumber": "H-195",
      "title": "Enterprise HTML Architecture",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "8+ Years",
      "question": "Enterprise HTML Architecture"
    },
    "answer": {
      "expectedAnswer": "**Enterprise HTML Architecture** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Enterprise HTML Architecture** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h196",
      "questionNumber": "H-196",
      "title": "Enterprise Optimization",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "8+ Years",
      "question": "Enterprise Optimization"
    },
    "answer": {
      "expectedAnswer": "**Enterprise Optimization** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Enterprise Optimization** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h197",
      "questionNumber": "H-197",
      "title": "Production Issues",
      "difficulty": "Hard",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Atlassian",
        "Stripe",
        "Airbnb",
        "Uber",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "5-8 Years",
      "question": "Production Issues"
    },
    "answer": {
      "expectedAnswer": "**Production Issues** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Production Issues** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h198",
      "questionNumber": "H-198",
      "title": "Browser Compatibility",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Browser Compatibility"
    },
    "answer": {
      "expectedAnswer": "**Browser Compatibility** should be answered in terms of supported browser behavior, standards-based fallbacks, progressive enhancement, and a targeted compatibility matrix.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Browser Compatibility** should be answered in terms of supported browser behavior, standards-based fallbacks, progressive enhancement, and a targeted compatibility matrix.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\ninterface Feature {\n  name: string;\n  supported: boolean;\n}\n\nfunction supportedFeatures(\n  features: readonly Feature[],\n): string[] {\n  const result: string[] = [];\n\n  for (let i = 0; i < features.length; i += 1) {\n    if (features[i].supported) result.push(features[i].name);\n  }\n\n  return result;\n}\n\nconst supported = supportedFeatures([\n  { name: \"dialog\", supported: true },\n]);\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst features = [\n  { name: \"dialog\", supported: true },\n];\n\nconst supported = features\n  .filter((feature) => feature.supported)\n  .map((feature) => feature.name);\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h199",
      "questionNumber": "H-199",
      "title": "Interview Tips",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Interview Tips"
    },
    "answer": {
      "expectedAnswer": "**Interview Tips** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Interview Tips** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools"
      ]
    }
  },
  {
    "detail": {
      "id": "h200",
      "questionNumber": "H-200",
      "title": "Final Revision Questions",
      "difficulty": "Medium",
      "companies": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft",
        "Adobe",
        "Netflix",
        "Flipkart",
        "Zoho"
      ],
      "frequency": 5,
      "category": "Senior Frontend Interview",
      "part": "HTML",
      "concepts": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms"
      ],
      "solved": false,
      "attempted": false,
      "bookmarked": false,
      "questionType": "technical",
      "experienceLevel": "2-5 Years",
      "question": "Final Revision Questions"
    },
    "answer": {
      "expectedAnswer": "**Final Revision Questions** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.",
      "deepExplanation": "Step 1 — Understand the concept.\n\n**Final Revision Questions** should define the HTML concept, show the browser-visible result, explain the semantic/DOM implications, and state the production best practice.\n\nStep 2 — Easy method:\nIdentify the browser-visible result, the semantic contract, the important edge cases, and the accessibility/SEO/security implication.\n\nStep 3 — WITHOUT BUILT-IN / CORE TypeScript:\n```ts\nfunction normalizeText(value: string): string {\n  let result = \"\";\n\n  for (let i = 0; i < value.length; i += 1) {\n    result += value[i];\n  }\n\n  return result.trim();\n}\n\nconst result = normalizeText(\"  HTML  \");\n```\n\nStep 4 — WITH BUILT-IN / practical TypeScript:\n```ts\nconst result = \"  HTML  \".trim();\n```\n\nStep 5 — Production example:\nUse the native HTML primitive first, validate the resulting DOM/accessibility behavior, and keep client-side checks as enhancement rather than the only source of truth.\n\nStep 6 — Edge cases:\nEmpty values, malformed input, keyboard-only use, slow network, unsupported browser features, and untrusted content should be considered where applicable.\n\nStep 7 — Senior takeaway:\nExplain the browser behavior, semantic/accessibility impact, performance/security trade-off, and why the chosen primitive is preferable.",
      "productionExample": "Use native HTML semantics and validate the browser-visible DOM/accessibility result.",
      "bestPractices": [
        "Prefer native semantic elements.",
        "Use valid, meaningful attributes.",
        "Keep labels and accessible names explicit.",
        "Validate user input on the server as well as the client.",
        "Measure performance before optimizing.",
        "Test keyboard, screen-reader and responsive behavior.",
        "Use progressive enhancement."
      ],
      "tradeOffs": "Advantages: Standards-based, Accessible by default when native elements are used correctly, Search-engine friendly, Interoperable with browser tooling, Maintainable. Disadvantages: Browser behavior can be subtle, Some advanced UI patterns need additional JavaScript, Cross-browser differences still require testing.",
      "commonMistakes": [
        "Using div/span for every control",
        "Missing labels or alternative text",
        "Using placeholder as a label",
        "Shipping unnecessary DOM",
        "Assuming client-side validation is security",
        "Putting secrets in source HTML"
      ],
      "followUpQuestions": [
        "How does this choice affect the accessibility tree?",
        "What browser algorithm is responsible for the behavior?",
        "What happens under slow CPU/network conditions?",
        "What would you measure in production?",
        "What trade-off would you document in an architecture/code review?"
      ],
      "relatedTopics": [
        "HTML5",
        "DOM",
        "CSSOM",
        "accessibility tree",
        "forms",
        "SEO",
        "Core Web Vitals",
        "CSP",
        "browser DevTools. # Global Practical Assignments 1. Assignment 1: Build a valid HTML5 page with landmarks",
        "metadata and a semantic heading hierarchy. 2. Assignment 2: Create an accessible navigation system with skip link",
        "keyboard support and multiple nav landmarks. 3. Assignment 3: Build a responsive image gallery using picture",
        "srcset and sizes. 4. Assignment 4: Create an accessible data table with caption",
        "thead",
        "tbody",
        "scope and a summary row. 5. Assignment 5: Build a registration form using native validation",
        "autocomplete",
        "labels",
        "fieldset and legend. 6. Assignment 6: Create a multi-section product page using header",
        "main",
        "section",
        "article",
        "aside and footer. 7. Assignment 7: Build a dialog using the native dialog element and test keyboard/focus behavior. 8. Assignment 8: Implement a search form that works without JavaScript and enhance it with client-side behavior. 9. Assignment 9: Create an SEO-ready article page with title",
        "description",
        "canonical",
        "Open Graph and JSON-LD. 10. Assignment 10: Build an offline-capable content shell using a manifest and a documented service-worker strategy. 11. Assignment 11: Audit an existing page for missing labels",
        "headings",
        "landmarks and image alternatives. 12. Assignment 12: Measure and improve a page's critical resource discovery using preload",
        "preconnect and defer. 13. Assignment 13: Create a secure upload form with accept constraints",
        "size/type messaging and server-side validation notes. 14. Assignment 14: Build a responsive table strategy that works on mobile without destroying semantic relationships. 15. Assignment 15: Create a progressive-enhancement checkout form with native submission as the baseline. 16. Assignment 16: Perform a DOM-size and render-blocking audit using browser DevTools. 17. Assignment 17: Build an accessible disclosure FAQ using details/summary. 18. Assignment 18: Create a media page with captions",
        "poster",
        "preload strategy and keyboard-accessible controls. 19. Assignment 19: Create a browser compatibility matrix for five HTML APIs and document fallback behavior. 20. Assignment 20: Conduct a full HTML code review using the production checklist below. 21. Assignment 21: Perform an accessibility audit and record at least ten remediation items. 22. Assignment 22: Perform an SEO audit and produce a prioritized remediation plan. # Mini Projects"
      ]
    }
  }
];