# PSD001 · Input and Output Basics

**Difficulty:** Easy  
**Experience Level:** Fresher (0–1 YOE)  
**Companies Asked:** TCS, Infosys, Wipro, Cognizant, Accenture, HCL  
**Interview Frequency:** ★★★★★  
**Category:** Problem Solving & Debugging  
**Subcategory:** Basic Problem Solving  
**Concepts Tested:** I/O parsing, type coercion, string to number conversion, `prompt` / `readline` input streams  

## Problem Statement

A candidate wrote a program `calculateTotal(priceInput, taxInput)` meant to read a price and tax percentage from user input strings, calculate the total cost including tax, and return the formatted output string `"Total: $<amount>"`.

However, the current implementation produces incorrect string concatenations like `"Total: $10010"` instead of `"Total: $110"`. Debug the function and fix the root cause.

## Input

- `priceInput`: `string` — string representation of price number
- `taxInput`: `string` — string representation of tax percentage number

## Output

- `string` — formatted total string `"Total: $<amount>"`

## Constraints

- `priceInput` and `taxInput` are valid numerical strings

## Examples

| Input | Output | Why |
|---|---|---|
| `priceInput = "100", taxInput = "10"` | `"Total: $110"` | `100 + 10% = 110` |

## Algorithm

**Pattern:** Explicit Type Casting & Input Parsing  
**Core insight:** Use `parseFloat()` or `Number()` to explicitly convert string input streams to numeric primitives before using the `+` operator.

## Dry Run

| `priceInput` | `taxInput` | `price` (number) | `taxPercent` (number) | `taxAmount` | `total` | Result |
|---|---|---|---|---|---|---|
| `"100"` | `"10"` | `100` | `10` | `10` | `110` | `"Total: $110"` |

## Buggy Code

```js
function calculateTotal(priceInput, taxInput) {
  // Bug: Direct string addition causes string concatenation instead of numeric addition!
  const taxAmount = priceInput * (taxInput / 100);
  const total = priceInput + taxAmount; // e.g. "100" + 10 => "10010"

  return "Total: $" + total;
}
```

## Expected Output

For `priceInput = "100"` and `taxInput = "10"`:
`"Total: $110"`

For `priceInput = "50.5"` and `taxInput = "20"`:
`"Total: $60.6"`

## Root Cause Analysis

In JavaScript, the `+` operator performs string concatenation if either operand is a string. Although `priceInput * (taxInput / 100)` uses multiplication (`*`) and division (`/`), which implicitly coerce `taxInput` to a number producing numeric `taxAmount = 10`, the expression `priceInput + taxAmount` evaluates `"100" + 10`. Because `priceInput` is a string `"100"`, JS coerces `10` to `"10"` and concatenates them to form `"10010"`.

## Step-by-Step Debugging Process

1. **Step 1:** Trace variable types: `typeof priceInput` is `"string"`. `typeof taxAmount` is `"number"`.
2. **Step 2:** Identify the operator overload bug: `"100" + 10` triggers string concatenation instead of arithmetic addition.
3. **Step 3:** Explicitly parse `priceInput` into a float using `parseFloat(priceInput)` or `Number(priceInput)`.
4. **Step 4:** Validate that `Number("100") + 10` equals `110`.
5. **Step 5:** Handle invalid string inputs by checking for `Number.isNaN()` before computing the final total string.



## JavaScript Solution

```js
function calculateTotal(priceInput, taxInput) {
  const price = Number(priceInput);
  const taxPercent = Number(taxInput);

  if (Number.isNaN(price) || Number.isNaN(taxPercent)) {
    return "Total: $0";
  }

  const taxAmount = price * (taxPercent / 100);
  const total = price + taxAmount;

  return `Total: $${total}`;
}
```

## TypeScript Solution

```ts
function calculateTotal(priceInput: string, taxInput: string): string {
  const price: number = parseFloat(priceInput);
  const taxPercent: number = parseFloat(taxInput);

  if (Number.isNaN(price) || Number.isNaN(taxPercent)) {
    return "Total: $0";
  }

  const taxAmount: number = price * (taxPercent / 100);
  const total: number = price + taxAmount;

  return `Total: $${total}`;
}
```

## Time Complexity

O(1) — Primitive string parsing and floating point arithmetic take constant time.

## Space Complexity

O(1) — Allocates a few scalar number variables.

## Common Mistakes

- Using `parseInt()` instead of `parseFloat()`, truncating decimal places in prices like `"50.5"`.
- Relying on implicit coercion (`+priceInput`) without checking if the string contains invalid non-numeric characters.
- Forgetting to handle `NaN` inputs.

## Edge Cases

| Edge Case | Expected Output |
|---|---|
| Floating point values (`"50.5"`, `"10"`) | `"Total: $55.55"` |
| Zero tax (`"100"`, `"0"`) | `"Total: $100"` |
| Non-numeric input (`"abc"`, `"10"`) | `"Total: $0"` (or throws Error) |

## Interview Follow-up Questions

1. How would you handle precision issues with currency addition in JS (e.g. `0.1 + 0.2 === 0.30000000000000004`)?
2. How does `Number(str)` differ from `parseFloat(str)` when parsing `"100px"`?
3. How would you format the output currency using `Intl.NumberFormat`?

## Related Problems

- `PSD002` Variable Tracing
- `PSD003` Expression Evaluation
- `PF025` Type Conversion

## Revision Notes

- `+` operator is dual-purpose: addition for numbers, concatenation if any operand is a string.
- Always convert string inputs to numbers explicitly using `Number()` or `parseFloat()` before arithmetic addition.

---
[← Back to Debugging](README.md)
