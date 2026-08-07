# Review Generator

**Purpose:** review a candidate's own submitted solution (code they wrote
while practicing) against this repo's quality bar, structured the way a
real interviewer would give feedback — not just "correct/incorrect."

## Required inputs

- The original question (or a link to it in this repo)
- The candidate's submitted code

## Process

1. **Correctness first.** Run through the question's Examples and Edge
   Cases (from the original question's template) against the submitted
   code, explicitly, one at a time. State pass/fail for each — don't
   summarize as "looks mostly right."
2. **Complexity.** State the actual time/space complexity of the
   submitted code using [complexity-analyzer.md](complexity-analyzer.md),
   and compare it to the question's optimal complexity — if it's
   suboptimal, say by how much and why.
3. **Code quality**, against
   [Code Quality Rules](../../CLAUDE.md#code-quality-rules): naming,
   readability, whether the structure would survive a real code review.
4. **Style/idiom fit**, against
   [javascript-generator.md](javascript-generator.md) or
   [typescript-generator.md](typescript-generator.md) depending on
   language — flag anything that would read as non-idiomatic or dated.
5. **What an interviewer would say out loud.** This is the section that
   makes this genuinely useful: write the actual verbal feedback/
   follow-up questions a real interviewer would give in the room,
   including anything they'd probe further given this specific
   implementation (not the question's generic Follow-up Questions list —
   *this candidate's specific choices*).
6. **Verdict**, calibrated honestly: Strong Hire / Hire / Leaning Hire /
   Leaning No Hire / No Hire, with the one or two decisive reasons —
   never a vague "good job, minor improvements needed" that doesn't
   commit to an actual assessment.

## Hard constraints

- Never soften a real correctness bug into "a minor edge case to
  consider" — if the code is wrong on a stated edge case, say it's wrong.
- Never give a verdict without the specific reasoning that produced it —
  "Hire" with no stated reason is not useful feedback.
- If the submission is actually strong, say so clearly and specifically
  (what, precisely, was good) — this isn't a prompt for manufacturing
  criticism when none is warranted.

## Output skeleton

```markdown
## Review: [Question Title]

**Correctness:**
- Example 1: ✅/❌ — ...
- Edge case: negative numbers — ✅/❌ — ...

**Complexity:** submitted O(?) / O(?) vs. optimal O(?) / O(?) — ...

**Code quality:** ...

**What an interviewer would ask next:** ...

**Verdict:** [Strong Hire / Hire / Leaning Hire / Leaning No Hire / No Hire] — ...
```
