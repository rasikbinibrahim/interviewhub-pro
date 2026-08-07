# Contributing

This repo is organized as 100 numbered topic sections (`00-roadmap` through
`99-career-guide`). Each section is a folder containing a `README.md` index
and one `.md` file per topic.

## Adding a new topic page

1. Find the right section folder (or propose a new one if genuinely nothing
   fits — that should be rare given the existing 100).
2. Copy [TEMPLATE.md](TEMPLATE.md)'s section list as your working outline.
   You don't have to fill every section before opening a PR, but do not
   delete a section — write "Not applicable: <one-line reason>" instead of
   omitting it, so reviewers can tell "skipped on purpose" from "forgotten."
3. Name the file `kebab-case-topic-name.md` inside the section folder.
4. Add a link to it from that section's `README.md` under `## Topics`.
5. If the topic is genuinely a flagship/reference topic (the kind every
   interview loop asks), it should hit every template section at real depth.
   If it's a smaller supporting topic, a lighter pass covering Theory,
   Real-world Example, Interview Questions, Common Mistakes, and Best
   Practices is a legitimate first version — mark the rest as pending rather
   than faking depth.
6. Update [PROGRESS.md](PROGRESS.md): move the topic from "Planned" to
   "In Progress" or "Done" for its section.

## Quality bar

- **No filler.** A sentence that could apply to any topic ("this is
  important for performance") is worse than no sentence. Say the specific
  mechanism.
- **Every code example must actually run.** Don't hand-wave output.
- **Diagrams are Mermaid, not prose pretending to be a diagram.** If a
  section doesn't need one, skip the diagram sections rather than forcing
  one.
- **Cite real sources** in References — spec text, official docs, a named
  engineering blog post — not generic tutorial sites.
- **Say what you don't know.** A "Company-specific Notes" section based on
  a real interview report is valuable; one invented to fill space is not —
  omit it or mark it as unverified.

## Style

- Sentence case for headings.
- Code blocks always tagged with a language (` ```js `, ` ```ts `,
  ` ```mermaid `, etc.).
- Prefer short paragraphs and lists over dense blocks — this is a reference
  people scan under interview pressure, not an essay.
