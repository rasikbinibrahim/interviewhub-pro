# Coding Question Template

The canonical, authoritative field list for every coding question in this
repo. [docs/prompts/coding-question-generator.md](docs/prompts/coding-question-generator.md)
generates questions against this exact template — if the two ever
disagree, this file wins and the prompt file should be corrected.

## Fields, in required order

| # | Field | Notes |
|---|---|---|
| 1 | Question ID | Stable, never reused even if a question is later removed |
| 2 | Title | Short, specific — not "Array Problem 1" |
| 3 | Difficulty | Easy / Medium / Hard — see [difficulty-classifier.md](docs/prompts/difficulty-classifier.md) |
| 4 | Companies Asked | From [CLAUDE.md's Company Tags](CLAUDE.md#company-tags) — no-fabrication rule applies, see [company-question-generator.md](docs/prompts/company-question-generator.md) |
| 5 | Interview Frequency | ★☆☆☆☆–★★★★★, how often this *pattern* shows up, not a claim about a specific company/date |
| 6 | Category | One category from [ROADMAP.md](ROADMAP.md)'s topic list |
| 7 | Concepts | The specific techniques tested (e.g. "two pointers, in-place swap") |
| 8 | Problem Statement | In-repo original phrasing — see authoring note below |
| 9 | Input | Type and shape |
| 10 | Output | Type and shape |
| 11 | Constraints | Concrete bounds (`1 <= n <= 10^5`), never vague |
| 12 | Examples | 2-3 minimum, each with input, output, and a one-line why |
| 13 | Edge Cases | See [edge-case-generator.md](docs/prompts/edge-case-generator.md) |
| 14 | Hints | Exactly 3, progressive — see [hint-generator.md](docs/prompts/hint-generator.md) |
| 15 | Algorithm | The approach in prose, with reasoning — see [algorithm-explainer.md](docs/prompts/algorithm-explainer.md) |
| 16 | Dry Run | Step-by-step trace against one Example — see [dry-run-generator.md](docs/prompts/dry-run-generator.md) |
| 17 | JavaScript Solution | Manual implementation where the built-in would trivialize what's being tested; ES2025 — see [javascript-generator.md](docs/prompts/javascript-generator.md) |
| 18 | TypeScript Solution | Strict-mode clean — see [typescript-generator.md](docs/prompts/typescript-generator.md) |
| 19 | Time Complexity | With derivation — see [complexity-analyzer.md](docs/prompts/complexity-analyzer.md) |
| 20 | Space Complexity | With derivation, same file |
| 21 | Common Mistakes | Specific to this exact problem, not generic |
| 22 | Interview Follow-up Questions | 3-5, the kind a real interviewer asks after a correct solution |
| 23 | Similar Questions | 2-4, same pattern, linked if they exist in this repo |

## Authoring note: original phrasing

Never copy a well-known problem's statement verbatim. Paraphrase, and
where sensible, reframe with a frontend-relevant scenario — this repo
teaches the *pattern*, not a memorized statement that happens to match a
specific external question bank.

## Worked example

````markdown
### Q004 · Reverse a Number

**Difficulty:** Easy
**Companies Asked:** Google, Amazon, Microsoft, Adobe
**Interview Frequency:** ★★★★★
**Category:** Programming Fundamentals → Logic Building
**Concepts:** modulo/division digit extraction, integer overflow awareness

#### Problem Statement
Given an integer `n`, return its digits in reverse order as an integer.
Do not use a built-in string-reverse method — extract and rebuild the
number digit by digit.

#### Input
A single integer `n`.

#### Output
A single integer: `n`'s digits reversed.

#### Constraints
`1 <= n <= 2^31 - 1`

#### Examples
| Input | Output | Why |
|---|---|---|
| `123` | `321` | Digits read back to front |
| `12345` | `54321` | Same, more digits |
| `1200` | `21` | Trailing zeros in the input become leading zeros in the reversed digit sequence, which aren't written as leading zeros in the output integer |

#### Edge Cases
- `n = 0` → expected: `0`
- Single-digit `n` (e.g. `7`) → expected: `7` (reversal of one digit is itself)
- `n` with trailing zeros (`1200`) → expected: `21`, not `0021`
- `n` at the constraint boundary (`2^31 - 1`) → reversed value may need
  overflow awareness depending on target language/type (not in JS, whose
  numbers are floating point up to `Number.MAX_SAFE_INTEGER`, but worth
  stating explicitly since this is a classic overflow trap in typed
  languages)

#### Hints
1. Think about how you'd read the number's last digit without converting
   it to a string first.
2. `n % 10` gives you the last digit; `Math.floor(n / 10)` removes it —
   what loop, repeated until `n` is fully consumed, builds a new number
   from those digits in reverse order?
3. Each extracted digit becomes the *next* least-significant digit of
   the result — so the result should be multiplied by 10 before adding
   each new digit, not the other way around.

#### Algorithm
**Pattern:** digit extraction via modulo/division.
**Core insight:** the last digit of `n` (`n % 10`) is the *first* digit
of the reversed number; repeatedly peeling off the last digit and
appending it to a growing `reverse` accumulator naturally builds the
digits in reversed order without ever treating the number as a string.
**Invariant:** after each iteration, `reverse` holds the correctly-
ordered reversal of every digit consumed from `n` so far.

#### Dry Run
**Input:** `n = 1234`

| Step | n (before) | digit = n % 10 | reverse = reverse * 10 + digit | n = Math.floor(n / 10) |
|---|---|---|---|---|
| 1 | 1234 | 4 | 0 * 10 + 4 = 4 | 123 |
| 2 | 123 | 3 | 4 * 10 + 3 = 43 | 12 |
| 3 | 12 | 2 | 43 * 10 + 2 = 432 | 1 |
| 4 | 1 | 1 | 432 * 10 + 1 = 4321 | 0 |

Loop ends (`n = 0`). **Result:** `4321` — matches expected output for
input `1234`.

#### JavaScript Solution
```js
function reverseNumber(n) {
  let reverse = 0;
  let remaining = n;

  while (remaining > 0) {
    const digit = remaining % 10;       // peel off the last digit
    reverse = reverse * 10 + digit;     // shift existing digits left, append new one
    remaining = Math.floor(remaining / 10); // drop the digit we just consumed
  }

  return reverse;
}
```

#### TypeScript Solution
```ts
function reverseNumber(n: number): number {
  let reverse = 0;
  let remaining = n;

  while (remaining > 0) {
    const digit: number = remaining % 10;
    reverse = reverse * 10 + digit;
    remaining = Math.floor(remaining / 10);
  }

  return reverse;
}
```

#### Time Complexity
O(d), where d is the number of digits in `n` (each loop iteration
removes exactly one digit; the loop runs once per digit).

#### Space Complexity
O(1) — only a fixed number of scalar variables, regardless of input size.

#### Common Mistakes
- Converting to a string and reversing it (works, but violates the "no
  built-in reverse" constraint and doesn't demonstrate digit-level
  manipulation, which is what this question is actually testing).
- Building `reverse` in the wrong order (`reverse = digit * 10 +
  reverse`) — silently produces the digits in the wrong position.
- Forgetting `Math.floor` on the division (`remaining / 10` alone leaves
  a fractional remainder in JS, which breaks the `remaining > 0` loop
  condition).

#### Interview Follow-up Questions
1. What would you need to change to handle negative input?
2. How would this behave if `n` could exceed `Number.MAX_SAFE_INTEGER` —
   what would you use instead (BigInt)?
3. Can you do this without any arithmetic, using only string methods —
   and why might an interviewer still prefer the arithmetic version?

#### Similar Questions
- Palindrome Number (uses the same digit-extraction technique to compare
  against the original)
- Sum of Digits
- Armstrong Number check
````

---
[← Back to root index](README.md)
