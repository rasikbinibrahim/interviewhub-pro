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
      "expectedAnswer": "HTML is the standard markup language used to describe the structure and meaning of web documents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "HTML provides structure; CSS controls presentation; JavaScript controls behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML5 is the modern HTML specification family that added semantic elements, media, form capabilities and browser APIs. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It improves document semantics, native controls, media support and interoperability without requiring plugins. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The History API changes session history entries without a full navigation. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It underpins SPA routing patterns but must preserve real URLs and back/forward semantics. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML is the standard markup language used to describe the structure and meaning of web documents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "HTML provides structure; CSS controls presentation; JavaScript controls behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML is the standard markup language used to describe the structure and meaning of web documents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "HTML provides structure; CSS controls presentation; JavaScript controls behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The HTML doctype triggers standards mode in browsers. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Without the modern doctype, browsers may enter quirks mode and apply legacy layout behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML is the standard markup language used to describe the structure and meaning of web documents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "HTML provides structure; CSS controls presentation; JavaScript controls behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The head contains document metadata and resources that are not normally rendered as page content. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It is where titles, charset, viewport, SEO metadata, icons, stylesheets and resource hints are declared. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The body contains the document's visible and interactive content. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Browsers parse body content into DOM nodes and use it as input to layout, paint and interaction. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML is the standard markup language used to describe the structure and meaning of web documents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "HTML provides structure; CSS controls presentation; JavaScript controls behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML is the standard markup language used to describe the structure and meaning of web documents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "HTML provides structure; CSS controls presentation; JavaScript controls behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "An attribute supplies additional information or configuration to an HTML element. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Attributes can affect semantics, behavior, resource selection, accessibility and browser processing. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Global attributes are attributes broadly applicable to HTML elements, such as id, class, lang, title, hidden and data-\\*. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "They allow reusable metadata and behavior without inventing non-standard markup. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML is the standard markup language used to describe the structure and meaning of web documents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "HTML provides structure; CSS controls presentation; JavaScript controls behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Void elements cannot contain child content and do not have an end tag. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Examples include img, input, br, hr, meta and link. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML is the standard markup language used to describe the structure and meaning of web documents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "HTML provides structure; CSS controls presentation; JavaScript controls behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML comments are authoring notes ignored as rendered document content. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "They are still delivered to the client unless removed by the build pipeline, so secrets must never be placed in them. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The Critical Rendering Path describes the browser work required to turn HTML, CSS and resources into pixels. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Reducing critical bytes and blocking work can improve first render and LCP. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Metadata describes the document or controls how browsers, crawlers and sharing systems interpret it. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Important metadata includes charset, viewport, title, description, robots, canonical and social cards. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML is the standard markup language used to describe the structure and meaning of web documents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "HTML provides structure; CSS controls presentation; JavaScript controls behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The head contains document metadata and resources that are not normally rendered as page content. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It is where titles, charset, viewport, SEO metadata, icons, stylesheets and resource hints are declared. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The p element represents a paragraph of text. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It creates semantic grouping for prose and gives assistive technologies meaningful text structure. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "strong indicates strong importance; b is a stylistic offset without that semantic importance. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use strong when the meaning is important, not merely when bold text is desired. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "em indicates stress emphasis; i represents text offset from surrounding prose without necessarily implying emphasis. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Semantic emphasis helps assistive technologies and preserves meaning independently of CSS. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "mark represents text highlighted because it is relevant in the current context. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It is useful for search-result matches or contextual highlighting, not as a generic yellow highlighter. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "small represents side comments, fine print or secondary text. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Do not use it only to make arbitrary text smaller; CSS handles presentation. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "sup represents superscript text, such as exponents or footnote markers. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It preserves semantic relationships that CSS-only positioning would not express. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "sub represents subscript text, commonly used in formulas. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It is semantic and preferable to visually positioning text with CSS. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "blockquote represents an extended quotation from another source. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use cite or supporting source information when attribution matters. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML is the standard markup language used to describe the structure and meaning of web documents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "HTML provides structure; CSS controls presentation; JavaScript controls behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "code represents a fragment of computer code. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It gives technical content semantic meaning and works well with accessible documentation. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "pre preserves whitespace and line breaks, commonly for code or preformatted text. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Combine pre with code for source examples and ensure long lines remain usable on small screens. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Lists express ordered, unordered or term-description relationships. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Choose ol, ul or dl based on meaning rather than appearance. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Lists express ordered, unordered or term-description relationships. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Choose ol, ul or dl based on meaning rather than appearance. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Lists express ordered, unordered or term-description relationships. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Choose ol, ul or dl based on meaning rather than appearance. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The a element creates a hyperlink when it has an href. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Links are a core navigation primitive and should have meaningful accessible names and valid destinations. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The a element creates a hyperlink when it has an href. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Links are a core navigation primitive and should have meaningful accessible names and valid destinations. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "An attribute supplies additional information or configuration to an HTML element. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Attributes can affect semantics, behavior, resource selection, accessibility and browser processing. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "An attribute supplies additional information or configuration to an HTML element. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Attributes can affect semantics, behavior, resource selection, accessibility and browser processing. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML is the standard markup language used to describe the structure and meaning of web documents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "HTML provides structure; CSS controls presentation; JavaScript controls behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "img embeds an external image resource into the document. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Correct dimensions, format, loading behavior and alternative text affect accessibility and performance. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "alt provides a text alternative for an image when it conveys information. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Meaningful images need useful alternatives; decorative images should generally use alt=\"\". In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "alt provides a text alternative for an image when it conveys information. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Meaningful images need useful alternatives; decorative images should generally use alt=\"\". In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "picture provides art direction by allowing different image sources for different conditions. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It is useful when a crop or format should change rather than merely selecting a different resolution. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "srcset lets the browser choose among image candidates based on resolution or width descriptors. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "The browser combines srcset with sizes and device characteristics to select an appropriate resource. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "img embeds an external image resource into the document. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Correct dimensions, format, loading behavior and alternative text affect accessibility and performance. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "img embeds an external image resource into the document. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Correct dimensions, format, loading behavior and alternative text affect accessibility and performance. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "audio embeds sound content without requiring a plugin. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Provide controls when users need control and consider captions/transcripts for meaningful audio. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "video embeds audiovisual content. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Native controls, captions, poster images and appropriate preload behavior provide a solid baseline. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "video embeds audiovisual content. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Native controls, captions, poster images and appropriate preload behavior provide a solid baseline. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "track adds timed text such as captions or subtitles to audio/video. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Captions are essential for many users and improve accessibility and comprehension. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "figure represents self-contained content such as an illustration, diagram, photo or code sample. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "figcaption provides the associated caption. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "SVG is a vector graphics format represented as XML and can be embedded in HTML. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "SVG is ideal for scalable icons, diagrams and illustrations; canvas is better suited to pixel-oriented drawing workloads. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "SVG is a vector graphics format represented as XML and can be embedded in HTML. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "SVG is ideal for scalable icons, diagrams and illustrations; canvas is better suited to pixel-oriented drawing workloads. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "img embeds an external image resource into the document. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Correct dimensions, format, loading behavior and alternative text affect accessibility and performance. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "table represents tabular data where rows and columns have meaningful relationships. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use table markup for data, not for page layout. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The head contains document metadata and resources that are not normally rendered as page content. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It is where titles, charset, viewport, SEO metadata, icons, stylesheets and resource hints are declared. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The body contains the document's visible and interactive content. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Browsers parse body content into DOM nodes and use it as input to layout, paint and interaction. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "tfoot groups summary or footer rows in a table. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use it for totals or other table-level summaries. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "caption provides a table's title or concise description. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It is useful for orientation and can be styled independently. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "colspan makes a table cell span multiple columns. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use it to express a genuine relationship, such as a group heading or total. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "rowspan makes a cell span multiple rows. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It is useful for grouped categories but should not be used merely for visual layout. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "table represents tabular data where rows and columns have meaningful relationships. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use table markup for data, not for page layout. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "scope identifies whether a table header applies to a column, row, rowgroup or colgroup. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It improves header associations for assistive technology, especially in complex tables. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "table represents tabular data where rows and columns have meaningful relationships. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use table markup for data, not for page layout. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Web accessibility means designing content and interaction so people with diverse abilities can perceive, operate and understand it. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Semantic HTML is the foundation; ARIA supplements semantics only where native HTML is insufficient. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "table represents tabular data where rows and columns have meaningful relationships. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use table markup for data, not for page layout. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML is the standard markup language used to describe the structure and meaning of web documents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "HTML provides structure; CSS controls presentation; JavaScript controls behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML is the standard markup language used to describe the structure and meaning of web documents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "HTML provides structure; CSS controls presentation; JavaScript controls behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML is the standard markup language used to describe the structure and meaning of web documents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "HTML provides structure; CSS controls presentation; JavaScript controls behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "form groups interactive controls that submit user-entered data. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "A well-structured form uses labels, names, validation, appropriate input types and accessible error feedback. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "GET submits data as part of the request URL; POST sends data in the request body. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "GET is appropriate for safe, shareable retrieval/search operations; POST is commonly used for state-changing submissions. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "form groups interactive controls that submit user-entered data. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "A well-structured form uses labels, names, validation, appropriate input types and accessible error feedback. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "GET submits data as part of the request URL; POST sends data in the request body. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "GET is appropriate for safe, shareable retrieval/search operations; POST is commonly used for state-changing submissions. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "input is a versatile form control whose type determines expected data and browser behavior. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use the most specific supported type because it improves validation, mobile keyboards and accessibility. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "input is a versatile form control whose type determines expected data and browser behavior. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use the most specific supported type because it improves validation, mobile keyboards and accessibility. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "label associates human-readable text with a form control. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Explicit for/id association is robust and improves click targets and screen-reader output. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "placeholder provides an example or hint inside an empty control. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It must not replace a visible label because it disappears when users type and can have contrast issues. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "name identifies a successful form control in submitted form data. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Without an appropriate name, many controls do not contribute their value to native form submission. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "required marks a form control as needing a value before native constraint validation can succeed. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It provides browser-level validation but does not replace server-side validation. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "pattern applies a regular-expression constraint to suitable text-like inputs. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use it for format constraints, but keep patterns understandable and validate again on the server. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "min and max constrain numeric/date/time values and participate in constraint validation. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "They express data constraints close to the control and can improve native UX. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "A checkbox represents an independent boolean or multi-select option. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use a group of checkboxes when multiple values may be selected. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Radio buttons represent mutually exclusive choices sharing the same name. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Provide a visible group label, commonly using fieldset and legend. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "select provides a native list of options. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It is compact, keyboard accessible and often preferable to recreating native behavior from divs. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "select provides a native list of options. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It is compact, keyboard accessible and often preferable to recreating native behavior from divs. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "textarea accepts multi-line text. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use it for comments, descriptions and other free-form content, with a visible label and sensible constraints. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "button creates an interactive action control. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Always choose an explicit type inside forms to prevent accidental submission. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "datalist provides suggested values for an input without forcing a fixed selection. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It is useful for autocomplete-like hints where arbitrary input remains valid. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "fieldset groups related form controls. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It gives structure and can create an accessible group, especially when paired with legend. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "fieldset groups related form controls. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It gives structure and can create an accessible group, especially when paired with legend. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML constraint validation provides native checks based on attributes such as required, type, pattern, min and max. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It improves basic UX while server validation remains mandatory for security and integrity. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML constraint validation provides native checks based on attributes such as required, type, pattern, min and max. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It improves basic UX while server validation remains mandatory for security and integrity. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "form groups interactive controls that submit user-entered data. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "A well-structured form uses labels, names, validation, appropriate input types and accessible error feedback. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "form groups interactive controls that submit user-entered data. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "A well-structured form uses labels, names, validation, appropriate input types and accessible error feedback. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Semantic HTML uses elements according to their meaning rather than their visual appearance. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It improves accessibility, maintainability, SEO and interoperability with browser tooling. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Semantic HTML uses elements according to their meaning rather than their visual appearance. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It improves accessibility, maintainability, SEO and interoperability with browser tooling. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The head contains document metadata and resources that are not normally rendered as page content. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It is where titles, charset, viewport, SEO metadata, icons, stylesheets and resource hints are declared. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "footer represents footer information for a page or section. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It can contain copyright, related links, author information or contact details. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "main represents the dominant content of the document. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "A page should normally have one visible main landmark, excluding hidden variants. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "section represents a thematic grouping, normally with a heading. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Do not replace every div with section; use it when the content forms a meaningful region. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "article represents a self-contained composition that could be distributed or understood independently. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Common examples include posts, news items, reviews and comments. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "aside represents content tangentially related to the surrounding content. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Typical examples include related links, sidebars and callouts. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "nav represents a major navigation block. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use an accessible label when a page contains multiple navigation landmarks. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "address represents contact information for the nearest article or body. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It is not a generic container for arbitrary addresses or postal text. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "time represents a machine-readable date or time. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "The datetime attribute helps software interpret human-readable dates. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "details creates a native disclosure widget, with summary as its visible label. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It provides keyboard and semantics without custom JavaScript for basic disclosure. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "details creates a native disclosure widget, with summary as its visible label. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It provides keyboard and semantics without custom JavaScript for basic disclosure. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "dialog represents a dialog box or interactive subwindow. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use showModal() for modal behavior and manage focus and accessible naming. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "figure represents self-contained content such as an illustration, diagram, photo or code sample. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "figcaption provides the associated caption. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "caption provides a table's title or concise description. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It is useful for orientation and can be styled independently. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "section represents a thematic grouping, normally with a heading. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Do not replace every div with section; use it when the content forms a meaningful region. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "section represents a thematic grouping, normally with a heading. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Do not replace every div with section; use it when the content forms a meaningful region. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "main represents the dominant content of the document. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "A page should normally have one visible main landmark, excluding hidden variants. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "q represents a short inline quotation. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Browsers can provide quotation marks according to language and user-agent conventions. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Web accessibility means designing content and interaction so people with diverse abilities can perceive, operate and understand it. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Semantic HTML is the foundation; ARIA supplements semantics only where native HTML is insufficient. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML is the standard markup language used to describe the structure and meaning of web documents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "HTML provides structure; CSS controls presentation; JavaScript controls behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Web accessibility means designing content and interaction so people with diverse abilities can perceive, operate and understand it. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Semantic HTML is the foundation; ARIA supplements semantics only where native HTML is insufficient. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "ARIA adds accessibility semantics when native HTML cannot express a required widget or state. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Prefer native elements first; incorrect ARIA can make an interface less accessible. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "label associates human-readable text with a form control. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Explicit for/id association is robust and improves click targets and screen-reader output. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "label associates human-readable text with a form control. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Explicit for/id association is robust and improves click targets and screen-reader output. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "ARIA adds accessibility semantics when native HTML cannot express a required widget or state. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Prefer native elements first; incorrect ARIA can make an interface less accessible. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "ARIA adds accessibility semantics when native HTML cannot express a required widget or state. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Prefer native elements first; incorrect ARIA can make an interface less accessible. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "tabindex controls whether an element participates in sequential focus navigation and its focus order. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use tabindex=\"0\" for custom interactive elements only when necessary and avoid positive values. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "nav represents a major navigation block. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use an accessible label when a page contains multiple navigation landmarks. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Focus management determines where keyboard focus moves during interaction and UI changes. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Dialogs, route changes and dynamic content should preserve a logical focus sequence. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Focus management determines where keyboard focus moves during interaction and UI changes. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Dialogs, route changes and dynamic content should preserve a logical focus sequence. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Web accessibility means designing content and interaction so people with diverse abilities can perceive, operate and understand it. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Semantic HTML is the foundation; ARIA supplements semantics only where native HTML is insufficient. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "form groups interactive controls that submit user-entered data. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "A well-structured form uses labels, names, validation, appropriate input types and accessible error feedback. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML is the standard markup language used to describe the structure and meaning of web documents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "HTML provides structure; CSS controls presentation; JavaScript controls behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "SEO is the practice of making content understandable and discoverable by search engines and users. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Semantic structure, crawlable links, useful metadata, performance and content quality all contribute. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "title supplies the document title shown in browser UI and commonly used in search results. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Make it unique, descriptive and concise for each page. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "A meta description summarizes a page for search engines and sharing contexts. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It is not a direct ranking guarantee, but a useful snippet and click-through signal. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The robots meta element communicates crawler directives for a page. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use it intentionally; it does not replace access control or authentication. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "A canonical link identifies the preferred URL for substantially duplicate content. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It helps consolidate indexing signals but should point to a valid canonical URL. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Open Graph metadata controls how pages are represented when shared on compatible platforms. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Set an accurate title, description, URL and preview image for important pages. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Open Graph metadata controls how pages are represented when shared on compatible platforms. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Set an accurate title, description, URL and preview image for important pages. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Structured data expresses page entities in a machine-readable vocabulary such as Schema.org. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It can help eligible pages qualify for enhanced search features when implemented accurately. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Structured data expresses page entities in a machine-readable vocabulary such as Schema.org. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It can help eligible pages qualify for enhanced search features when implemented accurately. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "SEO is the practice of making content understandable and discoverable by search engines and users. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Semantic structure, crawlable links, useful metadata, performance and content quality all contribute. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Web Storage provides origin-scoped key/value storage in the browser. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "localStorage persists across browser sessions; sessionStorage is scoped to a page session. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Web Storage provides origin-scoped key/value storage in the browser. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "localStorage persists across browser sessions; sessionStorage is scoped to a page session. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Cookies are small pieces of state sent with matching HTTP requests according to cookie attributes. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use Secure, HttpOnly and SameSite appropriately; avoid storing sensitive data in client-readable storage. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "IndexedDB is a browser database for structured client-side data. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It is appropriate for larger offline datasets and asynchronous persistence. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The Geolocation API can request the user's location with permission. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It requires a secure context in modern browsers and should explain why location is needed. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The File API lets web applications inspect user-selected files and read their contents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "File access is user-mediated; browsers do not grant arbitrary filesystem access through ordinary file inputs. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The Clipboard API provides programmatic read/write access to clipboard data under permission and security rules. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Prefer user-initiated actions and HTTPS. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The File API lets web applications inspect user-selected files and read their contents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "File access is user-mediated; browsers do not grant arbitrary filesystem access through ordinary file inputs. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The History API changes session history entries without a full navigation. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It underpins SPA routing patterns but must preserve real URLs and back/forward semantics. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The Fullscreen API requests an element to occupy the browser's fullscreen display area. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Fullscreen requires user activation and should provide a clear exit path. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Frontend security reduces browser-side attack surface and protects users and application integrity. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use output encoding, safe DOM APIs, CSP, secure transport, secure cookies and server-side validation. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Web Workers execute JavaScript in a separate worker context to keep heavy work off the main thread. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Workers communicate using message passing and cannot directly manipulate the DOM. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "An attribute supplies additional information or configuration to an HTML element. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Attributes can affect semantics, behavior, resource selection, accessibility and browser processing. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "data-\\* attributes store custom, non-visual metadata on HTML elements. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "They are useful for small declarative hooks, testing selectors and metadata; avoid putting secrets in them. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "sup represents superscript text, such as exponents or footnote markers. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It preserves semantic relationships that CSS-only positioning would not express. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "img embeds an external image resource into the document. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Correct dimensions, format, loading behavior and alternative text affect accessibility and performance. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "pre preserves whitespace and line breaks, commonly for code or preformatted text. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Combine pre with code for source examples and ensure long lines remain usable on small screens. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "pre preserves whitespace and line breaks, commonly for code or preformatted text. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Combine pre with code for source examples and ensure long lines remain usable on small screens. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "pre preserves whitespace and line breaks, commonly for code or preformatted text. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Combine pre with code for source examples and ensure long lines remain usable on small screens. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "pre preserves whitespace and line breaks, commonly for code or preformatted text. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Combine pre with code for source examples and ensure long lines remain usable on small screens. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "preload tells the browser a resource will be needed soon and can influence fetch priority. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use it sparingly for critical resources such as the LCP image or required font. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "img embeds an external image resource into the document. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Correct dimensions, format, loading behavior and alternative text affect accessibility and performance. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Render-blocking resources delay stages of the rendering pipeline. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Critical CSS and blocking scripts can delay first render; script loading strategy and CSS delivery matter. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The Critical Rendering Path describes the browser work required to turn HTML, CSS and resources into pixels. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Reducing critical bytes and blocking work can improve first render and LCP. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "form groups interactive controls that submit user-entered data. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "A well-structured form uses labels, names, validation, appropriate input types and accessible error feedback. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Frontend security reduces browser-side attack surface and protects users and application integrity. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use output encoding, safe DOM APIs, CSP, secure transport, secure cookies and server-side validation. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Content Security Policy is a browser-enforced policy that restricts where executable and other resources may load from. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "A strong CSP can significantly reduce the impact of XSS, especially when combined with nonces or hashes. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "iframes embed another browsing context inside a page. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use sandbox, restrictive permissions and frame-ancestors policies when embedding untrusted or sensitive content. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "iframes embed another browsing context inside a page. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use sandbox, restrictive permissions and frame-ancestors policies when embedding untrusted or sensitive content. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The same-origin policy isolates documents and many browser resources by scheme, host and port. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Cross-origin access is selectively enabled through mechanisms such as CORS, postMessage and specific browser APIs. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "form groups interactive controls that submit user-entered data. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "A well-structured form uses labels, names, validation, appropriate input types and accessible error feedback. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Frontend security reduces browser-side attack surface and protects users and application integrity. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use output encoding, safe DOM APIs, CSP, secure transport, secure cookies and server-side validation. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Frontend security reduces browser-side attack surface and protects users and application integrity. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use output encoding, safe DOM APIs, CSP, secure transport, secure cookies and server-side validation. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The head contains document metadata and resources that are not normally rendered as page content. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It is where titles, charset, viewport, SEO metadata, icons, stylesheets and resource hints are declared. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML is the standard markup language used to describe the structure and meaning of web documents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "HTML provides structure; CSS controls presentation; JavaScript controls behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The Critical Rendering Path describes the browser work required to turn HTML, CSS and resources into pixels. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Reducing critical bytes and blocking work can improve first render and LCP. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML is the standard markup language used to describe the structure and meaning of web documents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "HTML provides structure; CSS controls presentation; JavaScript controls behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The Critical Rendering Path describes the browser work required to turn HTML, CSS and resources into pixels. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Reducing critical bytes and blocking work can improve first render and LCP. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Render-blocking resources delay stages of the rendering pipeline. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Critical CSS and blocking scripts can delay first render; script loading strategy and CSS delivery matter. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The Critical Rendering Path describes the browser work required to turn HTML, CSS and resources into pixels. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Reducing critical bytes and blocking work can improve first render and LCP. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "The Critical Rendering Path describes the browser work required to turn HTML, CSS and resources into pixels. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Reducing critical bytes and blocking work can improve first render and LCP. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "async and defer change when external classic scripts execute relative to HTML parsing. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "async executes as soon as available and can run out of order; defer preserves document order and executes after parsing. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "pre preserves whitespace and line breaks, commonly for code or preformatted text. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Combine pre with code for source examples and ensure long lines remain usable on small screens. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "async and defer change when external classic scripts execute relative to HTML parsing. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "async executes as soon as available and can run out of order; defer preserves document order and executes after parsing. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "preload tells the browser a resource will be needed soon and can influence fetch priority. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use it sparingly for critical resources such as the LCP image or required font. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Progressive enhancement starts with accessible, functional HTML and layers CSS and JavaScript enhancements on top. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It improves resilience across devices, browsers, network conditions and assistive technologies. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Progressive enhancement starts with accessible, functional HTML and layers CSS and JavaScript enhancements on top. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It improves resilience across devices, browsers, network conditions and assistive technologies. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Responsive HTML uses semantic structure and resource selection that works across viewport sizes and input modes. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use the viewport meta tag, responsive images, flexible content and progressive enhancement rather than device-specific markup. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML participates in Progressive Web Apps through installable manifests, responsive UX and integration with service workers. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "A PWA should still provide useful content and navigation when advanced capabilities are unavailable. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Server-side rendering sends HTML generated from application state before client JavaScript hydrates or enhances it. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Good SSR markup improves initial content availability, SEO for crawlable pages and perceived performance. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Semantic HTML uses elements according to their meaning rather than their visual appearance. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It improves accessibility, maintainability, SEO and interoperability with browser tooling. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "code represents a fragment of computer code. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It gives technical content semantic meaning and works well with accessible documentation. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Web accessibility means designing content and interaction so people with diverse abilities can perceive, operate and understand it. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Semantic HTML is the foundation; ARIA supplements semantics only where native HTML is insufficient. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "SEO is the practice of making content understandable and discoverable by search engines and users. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Semantic structure, crawlable links, useful metadata, performance and content quality all contribute. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Semantic HTML uses elements according to their meaning rather than their visual appearance. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "It improves accessibility, maintainability, SEO and interoperability with browser tooling. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "preload tells the browser a resource will be needed soon and can influence fetch priority. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use it sparingly for critical resources such as the LCP image or required font. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Frontend security reduces browser-side attack surface and protects users and application integrity. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use output encoding, safe DOM APIs, CSP, secure transport, secure cookies and server-side validation. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "Browser compatibility means the page behaves acceptably across supported engines and versions. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Use standards-based features, feature detection, progressive enhancement and targeted compatibility testing. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "HTML is the standard markup language used to describe the structure and meaning of web documents. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "HTML provides structure; CSS controls presentation; JavaScript controls behavior. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
      "expectedAnswer": "q represents a short inline quotation. The key is to use the native HTML primitive that expresses the intended meaning, then enhance it without breaking accessibility, SEO or performance.",
      "deepExplanation": "Browsers can provide quotation marks according to language and user-agent conventions. In production I would validate the resulting DOM, accessibility tree and network/rendering behavior rather than judging the markup only by how it looks. The important senior-level point is understanding the trade-offs and browser behavior. A strong answer connects authoring syntax to browser internals: HTML is parsed into a DOM, semantic relationships are exposed to accessibility APIs, resources may be fetched, and the resulting document participates in style, layout, paint and compositing. The best implementation minimizes custom behavior, preserves native browser capabilities and remains robust when JavaScript, bandwidth or device capabilities are constrained.",
      "productionExample": "Use native HTML semantics first, progressively enhance with CSS/JavaScript, and validate the final document with automated and manual accessibility checks. Real-world use cases: Enterprise application shells and navigation; Forms and transactional workflows; Documentation and content pages; Accessible product interfaces; SEO-sensitive landing pages",
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
