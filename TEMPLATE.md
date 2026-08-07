# Topic Authoring Template

Every topic page (a `.md` file inside a numbered section folder) should work
toward covering the sections below, in this order. Not every section applies
to every topic with equal weight — a topic like "Git" doesn't need a
"Rendering" diagram, and a topic like "Closures" doesn't need a "Full
project." Use judgment, but don't silently skip a section that *does* apply
just because it's more work. If a section genuinely doesn't apply, say so in
one line rather than omitting it — that tells a reader "considered and
skipped," not "forgotten."

Diagrams should be [Mermaid](https://mermaid.js.org/) code blocks — GitHub
renders these natively, no image files to maintain.

---

## 1. Theory

The concept explained precisely enough that a candidate could explain it back
in an interview without hand-waving. Assume the reader is smart but may not
have touched this topic in years.

## 2. Visual Diagram

A diagram of the *shape* of the concept (a data structure, a type hierarchy,
a state machine). Mermaid `graph`/`classDiagram`/`stateDiagram-v2`.

## 3. Architecture Diagram

Where this concept sits relative to the rest of the system — process
boundaries, layers, data flow between components/services.

## 4. Flow Diagram

Step-by-step sequence over time (a request lifecycle, a render pass, an
event's path through the system). Mermaid `sequenceDiagram`/`flowchart`.

## 5. Real-world Example

A concrete, minimal code example showing the concept doing something a
reader would actually write.

## 6. Production Example

How this shows up in a real, larger codebase — not a toy snippet. What
changes when the stakes are a production app with real users and real scale.

## 7. Interview Questions — Basic

3-5 questions a 2-4 YOE candidate should be able to answer.

## 8. Interview Questions — Medium

3-5 questions that separate "knows the definition" from "has used this
under pressure."

## 9. Interview Questions — Advanced

3-5 questions for 7+ YOE / Staff-level candidates — internals, trade-offs,
"why does the spec/engine do it this way."

## 10. Frequently Asked Questions

Questions candidates actually ask *about the topic itself* while studying —
not interview questions, clarifying questions.

## 11. Coding Problems

Problems to implement, with constraints and expected complexity, linked to
the relevant `NN-*-coding` or `65-dsa` section where appropriate rather than
duplicated.

## 12. Hands-on Exercises

Small, scoped tasks a reader does themselves (not full problems) — "modify
this snippet so that X."

## 13. Mini Project

A small buildable artifact (a few hours) that forces applying the concept.

## 14. Full Project

Where this concept would appear in one of the [94-projects](94-projects)
reference apps — a pointer, not a duplicate.

## 15. Common Mistakes

Specific, named mistakes engineers actually make with this concept.

## 16. Best Practices

What a senior engineer actually does, and why — not generic advice.

## 17. Anti-patterns

Named patterns that look reasonable but cause real problems, with the
mechanism of *why* they fail.

## 18. Debugging Guide

How to diagnose a problem involving this concept when something's gone
wrong in a running system.

## 19. Performance Tips

Where this concept intersects with performance, with the actual mechanism
(not just "this is faster").

## 20. Security Considerations

Where this concept intersects with security. State plainly "not applicable"
if it genuinely doesn't.

## 21. Accessibility Notes

Where this concept intersects with accessibility. State plainly "not
applicable" if it genuinely doesn't.

## 22. Unit Tests

An example unit test exercising the concept.

## 23. Integration Tests

An example integration-level test, where meaningfully different from #22.

## 24. Interview Tips

How to *present* an answer on this topic — structure, what to lead with,
what interviewers are actually listening for.

## 25. Senior-level Discussion

What changes about this topic's treatment at the 5-7 YOE bar.

## 26. Staff-level Discussion

What changes at the Staff bar — cross-team/system implications, trade-off
framing, "how would you decide."

## 27. Principal-level Discussion

What changes at the Principal bar — org-level, multi-year, build-vs-buy,
influence without authority.

## 28. Company-specific Notes

Where a particular company's stack/interview style treats this topic
differently, with a pointer into
[85-company-wise-questions](85-company-wise-questions).

## 29. References

Primary sources: spec links, official docs, canonical blog posts/talks.
No SEO-farm links.

## 30. Revision Checklist

A tight, scannable checklist for reviewing this topic the night before an
interview.
