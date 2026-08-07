# T7901 · Full Senior Frontend Mock Interview Script & Scoring Rubric

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Stripe, Netflix  
**Interview Frequency:** ★★★★★  
**Category:** Mock Interviews  
**Concepts:** mock-interviews, interview-rubric, evaluation-criteria, senior-engineer  

## Question

What is a complete end-to-end Senior Frontend Engineer mock interview script, what scoring rubric criteria (Coding Quality, System Design, Communication, Problem Solving) are used by interviewers to grade candidates, and how do you calibrate Strong Hire vs Hire vs No Hire decisions?

## Expected Answer

1. **Mock Interview Script Structure (60 Minutes)**:
   - **00-05m**: Introductions & Candidate Pitch.
   - **05-30m**: Problem Coding (JS Utility / Algorithmic Coding / Machine Coding).
   - **30-55m**: Frontend System Design or Deep Architectural Discussion.
   - **55-60m**: Q&A and Candidate Wrap-up.
2. **Scoring Rubric Dimensions**:
   - **Problem Solving & Algorithms**: Correctness, optimal time/space complexity, edge case identification.
   - **Coding & JS Mastery**: Idiomatic TypeScript/JS, modularity, clean naming, modern API usage.
   - **Frontend System Design & Architecture**: State management, rendering strategies, caching, performance, accessibility, security.
   - **Communication & Leadership**: Articulating trade-offs, structured presentation, driving consensus under ambiguity.

## Deep Explanation

### 1. Calibration Matrix: Candidate Signal Evaluation

| Dimension | Strong Hire | Hire | Needs Improvement / No Hire |
|---|---|---|---|
| **Coding Quality** | Production-ready, clean TS types, handles all edge cases, proactive unit tests | Working solution, minor edge case oversight, good readability | Messy code, syntax errors, fails basic test cases |
| **System Design** | Clear multi-tier diagram, addresses LCP/INP, caching, a11y, and security upfront | Good overall architecture, needs interviewer prompts for edge cases | Focuses only on UI/backend, misses client state/caching |
| **Communication** | Explains trade-offs before writing code, actively checks alignment | Communicates clearly, answers direct questions | Speaks silently while coding, gets defensive on feedback |

## Production Example Interview Script

```markdown
### 60-Minute Senior Frontend Mock Interview Script

#### Phase 1: Candidate Introduction (5 Mins)
Interviewer: "Welcome! Let's start with a brief 2-minute overview of your background and recent architectural work."
Target Signal: Concise elevator pitch highlighting technical scale and leadership impact.

#### Phase 2: Technical Coding (25 Mins)
Prompt: "Implement a type-safe `useDebounce` hook and a `useDebouncedCallback` hook in React with cancel and flush capabilities."
Evaluation Rubric:
- Did the candidate handle unmount cleanup (`clearTimeout`)?
- Are TypeScript generic types (`T`, `Args`) properly inferred?
- Did they handle `this` binding and memoization (`useCallback`/`useRef`)?

#### Phase 3: System Design (25 Mins)
Prompt: "Design an Enterprise Rich Text Collaborative Editor like Notion."
Evaluation Rubric:
- Did candidate define client vs server data model?
- Did candidate address CRDT vs OT for real-time collaboration?
- How did candidate handle offline caching (IndexedDB) and presence cursors?

#### Phase 4: Feedback & Calibration (5 Mins)
Interviewer synthesizes signals across Coding, Architecture, and Communication to render a Hire/No Hire decision.
```

## Best Practices

- Always talk out loud while coding: state your assumptions, outline candidate approaches (naive vs optimal), and agree on the approach before writing code.
- Write down edge cases in comments at the top of your code buffer before implementing logic.

## Common Mistakes

- Diving directly into writing code without clarifying ambiguous requirements or discussing trade-offs first.
- Ignoring interviewer hints or getting defensive when an edge case flaw is pointed out.

## Follow-up Questions

1. How do you recover during an interview when you get stuck on a hard algorithmic or system design step?
2. What are the key differences between interviewing for an IC role vs a Managerial role?

## Related Topics

- FAANG Frontend Interview Playbook: Google vs Meta vs Amazon
- STAR Method for Technical Leadership & Handling Ambiguity
