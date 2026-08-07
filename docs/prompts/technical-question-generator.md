# Technical Question Generator

**Purpose:** produce one complete technical (non-coding) Q&A entry —
concept explanations, not algorithm problems — matching the Technical
Question Template in [CLAUDE.md](../../CLAUDE.md).

Use this for topics like "explain the event loop," "what is the virtual
DOM," "how does React's reconciliation work" — not for DSA/coding
problems (use [coding-question-generator.md](coding-question-generator.md)
for those).

## Required inputs

- **Topic** (e.g. "React reconciliation", "HTTP caching headers")
- **Target seniority** (what depth of answer: 2-4 YOE screening question
  vs. Staff-level discussion question)

## Process

1. **Question** — phrase it the way an interviewer would actually ask it,
   not as a textbook heading.
2. **Expected Answer** — a tight, correct answer a strong candidate would
   give out loud in 60-90 seconds. This is the thing being tested, so it
   must be precise, not padded.
3. **Detailed Explanation** — the full mechanism behind the expected
   answer, written for someone studying, not performing. This is where
   depth belongs.
4. **Real-world Example** — a minimal, concrete code or scenario example.
5. **Production Scenario** — how this shows up at a scale beyond a
   tutorial: a real bug class, a real architecture decision, a real
   incident this concept relates to.
6. **Best Practices** — what a senior engineer actually does, with the
   reason, not generic advice ("use caching" is not a best practice;
   "cache-control: no-cache does NOT mean don't cache — it means
   revalidate before use, which is why you'd reach for it over
   no-store for an HTML shell you still want served fast" is).
7. **Trade-offs** — every real technical choice has a cost; state it
   plainly instead of presenting one option as strictly superior when
   it isn't.
8. **Common Mistakes** — the specific wrong answer candidates actually
   give for this exact question.
9. **Follow-up Questions** — 3-5 questions an interviewer would ask next
   to probe depth after hearing the expected answer.

## Hard constraints

- Never answer with only a definition — Detailed Explanation and
  Production Scenario are not optional, per the Answer Rules in
  CLAUDE.md.
- If the topic has a Senior/Staff/Principal distinction worth making
  (most architecture and trade-off topics do), make it explicit rather
  than writing one answer that vaguely gestures at "senior-level."
- Cite a real source (spec, official docs, a named engineering blog) in
  the Detailed Explanation where a claim is checkable — don't assert
  browser/engine behavior without being sure it's current and correct.

## Output skeleton

```markdown
### [Topic] — Technical Question

**Question:** ...

**Expected Answer:** ...

**Detailed Explanation:** ...

**Real-world Example:**
```js
...
```

**Production Scenario:** ...

**Best Practices:** ...

**Trade-offs:** ...

**Common Mistakes:** ...

**Follow-up Questions:**
1. ...
2. ...
```
