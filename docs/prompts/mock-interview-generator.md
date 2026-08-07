# Mock Interview Generator

**Purpose:** generate a complete, timed mock interview script for
[79-mock-interviews](../../79-mock-interviews) — something a candidate
can run through solo or with a practice partner end-to-end.

## Required inputs

- Round type (phone screen / onsite coding / system design / behavioral)
- Target level (the bar changes what's asked and what "pass" looks like)
- Optional: company style, if generating a company-flavored mock (see
  [company-question-generator.md](company-question-generator.md)'s
  no-fabrication rule — the same honesty standard applies here)

## Process

1. **Set the frame.** State the round type, duration, and what's being
   evaluated — a candidate should know what "good" looks like for this
   specific round before starting, exactly as a real interview
   invitation would tell them.
2. **Warm-up (2-3 min).** A short icebreaker/intro prompt, if realistic
   for this round type — skip it for pure coding screens where real
   companies don't do this.
3. **Main content**, matched to round type:
   - *Coding round:* 1-2 problems from the existing bank
     ([61](../../61-javascript-coding)–[65](../../65-dsa)), each with a
     realistic time budget and the interviewer's likely follow-ups
     inline (pulled from that question's Follow-up Questions field).
   - *System design round:* one prompt from
     [60-frontend-system-design](../../60-frontend-system-design), with
     a suggested time allocation per sub-area (requirements, high-level
     design, deep dive, trade-offs) and the specific things an
     interviewer is listening for at this stage.
   - *Behavioral round:* 3-5 prompts from
     [77-behavioral](../../77-behavioral)/[78-leadership](../../78-leadership),
     matched to the target level.
4. **Interviewer probes.** For each main prompt, write 2-3 realistic
   follow-up/pushback questions an interviewer would actually ask if the
   candidate's first answer was good-but-shallow — this is what makes it
   a *mock* interview rather than a static problem list.
5. **Self-evaluation rubric.** A short checklist the candidate uses
   afterward to grade their own performance, tied to what this
   round/level actually evaluates (not a generic "did you solve it"
   checklist).
6. **Timing.** State a total duration and per-section time budget that
   matches how this round actually runs in practice.

## Hard constraints

- Never write a mock interview that's just a bare list of questions with
  no framing, timing, or follow-ups — that's not meaningfully different
  from browsing the question bank directly, and defeats the purpose of
  this file existing.
- If company-flavored, apply the no-fabrication rule from
  [company-question-generator.md](company-question-generator.md) — base
  the *style* (round structure, emphasis) on real, statable patterns; do
  not invent specific "leaked" questions.

## Output skeleton

```markdown
# Mock Interview — [Round Type], [Level]

**Duration:** ... min · **Evaluates:** ...

## Warm-up
...

## Main Round
### Problem 1 — [time budget]
[link to question]
**If they solve it quickly, push on:** ...

## Self-evaluation
- [ ] ...
```
