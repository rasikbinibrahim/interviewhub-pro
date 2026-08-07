# T8501 · FAANG Frontend Interview Playbook: Google vs Meta vs Amazon Rubrics

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Apple, Netflix  
**Interview Frequency:** ★★★★★  
**Category:** Company-wise  
**Concepts:** company-wise, faang, interview-rubric, google, meta, amazon  

## Question

How do interview loops and evaluation rubrics differ across top tech companies (Google vs Meta vs Amazon), and what specific problem types (DSA vs JS Utilities vs Machine Coding vs Frontend System Design) dominate each company's loop?

## Expected Answer

1. **Google (Googliness & DSA Focus)**:
   - 2 Coding Rounds: General DSA (Arrays, Graphs, Binary Search, DP) or Advanced JS Utilities (Polyfills, Async queue).
   - 2 Frontend System Design Rounds: Deep focus on browser internals, caching, networking protocols (HTTP/3), and DOM performance.
   - 1 Leadership/Behavioral ("Googliness").
2. **Meta (Speed & Machine Coding Focus)**:
   - 1 Screening Round: 2 JS utility problems in 45 mins (Debounce, Deep Clone, EventEmitter).
   - 1 Machine Coding Round: Build a full UI component from scratch in 45 mins without libraries (Autocomplete, Virtualized List, Carousel).
   - 1 Frontend System Design: Architecture of large Meta apps (News Feed, Messenger, Instagram Web).
   - 1 Behavioral.
3. **Amazon (Leadership Principles & LLD Focus)**:
   - 1 DSA/Coding Round.
   - 1 Frontend LLD / Machine Coding Round.
   - 1 System Design Round.
   - Every round devotes 20 mins to **Amazon Leadership Principles** (Customer Obsession, Ownership, Bias for Action, Dive Deep) via STAR stories.

## Deep Explanation

### 1. FAANG Round Comparison Matrix

| Evaluation Stage | Google | Meta | Amazon |
|---|---|---|---|
| **DSA Depth** | High (Graphs, DP, Trees) | Medium (Arrays, Strings, Stacks) | Medium |
| **JS Utilities** | High | Extreme (Fast 45-min speed) | Medium |
| **Machine Coding** | Medium | Extreme (Pure JS/React UI) | High (SOLID Principles) |
| **System Design** | Web Protocols & Architecture | Large Scale UI Architecture | Scale & Operational Operational Excellence |
| **Behavioral** | Googliness & Collaboration | Culture Fit | 16 Leadership Principles (STAR) |

## Production Example Framework

```markdown
### Strategy Checklist for Meta Front End Loop

1. **JavaScript Speed Round**:
   - Master 30 core JS polyfills (debounce, throttle, deepClone, memoize, bind, Promise.all, EventEmitter).
   - Target speed: Complete 2 full coding problems in 45 minutes with 100% working code and complexity analysis.

2. **Machine Coding UI Round**:
   - Practice building UI components from zero without external packages (`npm install` is forbidden).
   - Handle accessibility (ARIA, keyboard navigation), edge cases (loading, error, empty state), and debounce/throttle inputs.

3. **Frontend System Design Round**:
   - Structure presentation: Requirements -> Data Model -> API Design -> Component Architecture -> Performance & Optimization.
   - Detail rendering strategies (RSC, SSR, Client), state management, caching, and network protocol selection.
```

## Best Practices

- For Meta: Practice coding without IDE autocompletion (CoderPad environment).
- For Amazon: Prepare 2 STAR stories per Leadership Principle with quantitative metrics.
- For Google: Focus heavily on browser engine internals (V8, Layout, Paint, HTTP/3).

## Common Mistakes

- Treating Frontend System Design as traditional Backend System Design (focusing on databases/sharding instead of client state, rendering pipelines, and network optimization).
- Failing to write runnable, syntactically correct JS code in Meta speed rounds.

## Follow-up Questions

1. How do Staff/Principal interview loops differ from Senior Engineer loops at FAANG?
2. What are the key differences between B2B SaaS (Stripe/Salesforce) vs B2C (Meta/Netflix) frontend interviews?

## Related Topics

- Full Senior Frontend Mock Interview Script & Scoring Rubric
- STAR Method for Technical Leadership & Handling Ambiguity
