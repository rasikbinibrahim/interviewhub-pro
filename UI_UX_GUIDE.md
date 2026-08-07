# UI/UX Guide — Design System

> **Status: partially implemented.** The color system, typography
> (Inter/JetBrains Mono), and core components (`Badge`, `Button`,
> `Modal`, `ProgressBar`) below are real, in `frontend/src/index.css`
> and `frontend/src/components/ui/` — verified to match this document's
> values exactly. **Not yet implemented:** keyboard shortcuts, the
> `Tabs`/`CodeBlock`/`Toast`/`DiffViewer` components as reusable
> primitives (tab switching exists today, just inline in
> `CodingScreen.tsx` rather than extracted), and light-theme testing
> beyond the token values themselves. See
> [ARCHITECTURE.md](ARCHITECTURE.md) for the app structure this design
> system styles.

## Design principles

1. **The editor is the center of gravity.** Users spend most of their
   time writing code, not reading documentation — layout, contrast, and
   information density should all serve the coding screen first; every
   other screen is secondary.
2. **VS Code-inspired, not VS Code-copied.** Familiar dark-editor
   conventions (monospace where code appears, a recognizable dark
   palette, minimal chrome) without literally reskinning VS Code —
   this is a study tool, not an IDE clone.
3. **Hide complexity until asked for.** Hints, algorithm, dry run, and
   solution are hidden by default — the UI's default state is always
   the least revealing one; every reveal is an explicit user action,
   never automatic.
4. **Focus mode is a first-class state, not an afterthought.** A user
   mid-problem should be able to collapse everything except the
   problem and the editor with one action.
5. **Fast, not flashy.** No decorative animation on the coding screen —
   animation budget is spent on state transitions that communicate
   something (a test passing, a panel resizing), never on ambient
   motion.

## Color system

Two themes, dark as default and primary (light is supported, not
primary — this platform is used for extended focused coding sessions,
where dark reduces eye strain over the session lengths this product
targets).

| Token | Dark value | Light value | Usage |
|---|---|---|---|
| `--bg-canvas` | `#0d1117` | `#ffffff` | App background |
| `--bg-surface` | `#161b22` | `#f6f8fa` | Panels, cards |
| `--bg-surface-raised` | `#1c2128` | `#ffffff` (with shadow) | Modals, dropdowns |
| `--border` | `#30363d` | `#d0d7de` | Dividers, panel borders |
| `--text-primary` | `#e6edf3` | `#1f2328` | Body text |
| `--text-secondary` | `#8b949e` | `#59636e` | Metadata, labels |
| `--accent-brand` | `#58a6ff` | `#0969da` | Links, primary actions, active nav |
| `--status-success` | `#3fb950` | `#1a7f37` | Passed tests, Solved |
| `--status-warning` | `#d29922` | `#9a6700` | Attempted, Medium difficulty |
| `--status-danger` | `#f85149` | `#cf222e` | Failed tests, Hard difficulty |
| `--status-info` | `#58a6ff` | `#0969da` | Neutral badges |

Contrast requirement: every text/background pairing above meets WCAG AA
(4.5:1 for body text, 3:1 for large text/UI components) in both themes —
verify any token change against this before shipping it, not after.

## Typography

| Role | Font | Size | Weight |
|---|---|---|---|
| Code (editor, inline code, dry-run tables) | JetBrains Mono / Fira Code | 14px (editor, user-adjustable) | 400/500 |
| UI body text | Inter / system-ui stack | 14px | 400 |
| Headings (question title, section headers) | Inter | 18-24px | 600-700 |
| Metadata (difficulty, company tags, timestamps) | Inter | 12px | 500 |

Line height: 1.6 for prose (problem statements, explanations), 1.5 for
code.

## Spacing & layout grid

- Base unit: 4px. All spacing values are multiples of it (4/8/12/16/24/32).
- Sidebar: fixed 260px, collapsible to icon-only 64px.
- Coding screen: resizable split (default 40/60 problem/editor on
  desktop), draggable divider, remembered per-user.
- Content max-width outside the coding screen: 1200px, centered — question
  lists, dashboards, and technical-question pages shouldn't stretch edge
  to edge on wide monitors.

## Responsive breakpoints

| Breakpoint | Width | Behavior |
|---|---|---|
| Mobile | < 640px | Sidebar becomes a bottom sheet / hamburger; coding screen stacks Problem above Editor (no side-by-side split); Monaco still usable but Run/Submit become sticky-bottom buttons |
| Tablet | 640-1024px | Sidebar collapses to icon-only by default; split view retained but narrower |
| Desktop | > 1024px | Full sidebar + split view as designed |

## Component inventory

Each component below needs, at minimum, default/hover/active/focus/
disabled states specified before implementation — "the button" isn't a
complete spec.

- **Button** — primary (brand-filled), secondary (outlined), danger
  (Reset/destructive actions), icon-only (toolbar actions)
- **Badge** — difficulty (Easy/Medium/Hard, color per status tokens
  above), company tag, status (Solved/Attempted/Bookmarked)
- **ProgressBar** — linear (dashboard overall %), per-topic (progress
  tracking page)
- **Panel** — the base container for Problem/Editor/Console — resizable,
  collapsible, with a consistent header (title + action icons)
- **Tabs** — Problem/Code/Console/Explanation/Notes on the coding
  screen; Algorithm/Dry Run/JS/TS/Complexity inside the revealed
  solution
- **CodeBlock** — read-only syntax-highlighted code (dry runs, solution
  reveal) — distinct from the live Monaco editor component
- **Modal** — confirmation dialogs (Reset code, Submit mock interview),
  never used for the primary coding flow itself
- **Toast** — transient feedback (autosave confirmation, submit result
  summary) — auto-dismiss, non-blocking, never used for anything the
  user must acknowledge before continuing
- **DiffViewer** — Review Mode's your-code-vs-reference-code comparison

## Iconography

A single icon set throughout (recommend Lucide, given its existing use
in the previously-built app shell) — never mix icon libraries, since
inconsistent stroke width/style is one of the fastest ways a UI reads as
unpolished.

## Accessibility standards

- Every interactive element reachable and operable by keyboard alone —
  the coding screen especially, since power users will want to Run/
  Submit/navigate without leaving the keyboard (see keyboard shortcuts
  below).
- Focus states are visible and consistent (a 2px `--accent-brand`
  outline, never `outline: none` without a replacement).
- Monaco's own accessibility mode (screen-reader support) must be
  reachable, not disabled by a custom keybinding that conflicts with it.
- Color is never the only signal — difficulty badges and pass/fail
  states pair color with text/icon, for colorblind users and for the
  reveal-progression flow being scannable at a glance either way.
- All of the above is normative for [09-accessibility](09-accessibility)'s
  own content too — this app should demonstrably follow the same
  standards it teaches.

## Keyboard shortcuts (coding screen)

| Shortcut | Action |
|---|---|
| `Cmd/Ctrl + Enter` | Run |
| `Cmd/Ctrl + Shift + Enter` | Submit |
| `Cmd/Ctrl + S` | Save draft (also autosaves; this forces it) |
| `Cmd/Ctrl + K` | Command palette / search |
| `Cmd/Ctrl + \` | Toggle focus mode |
| `Cmd/Ctrl + [` / `]` | Previous / Next question |

## Theming implementation note

Tokens above should ship as CSS custom properties (matching the pattern
already used in this repo's earlier prototype —
`--bg-*`/`--text-*`/`--accent-*` naming), switched via a `data-theme`
attribute on the root element, so both the eventual app and any
Artifact-style preview can theme consistently without a JS-side
re-render.

---
[← Back to root index](README.md)
