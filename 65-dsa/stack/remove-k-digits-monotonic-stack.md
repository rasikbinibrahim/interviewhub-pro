# Q6638 · Remove K Digits (Monotonic Increasing Stack Greedy)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Stack
**Concepts:** stack, greedy, monotonic-stack

## Problem Statement

Write a function `removeKdigits(num, k)` that removes exactly `k` digits
from the digit string `num` so that the remaining digits (kept in their
original order) form the smallest possible number, with no leading
zeros (unless the result is `"0"` itself).

## Input

`num`: a string of digits. `k`: the number of digits to remove
(`0 <= k <= num.length`).

## Output

The smallest possible number, as a string, after removing exactly `k`
digits.

## Constraints

`1 <= num.length <= 10^5`, `num` contains no leading zeros unless it's
exactly `"0"`

## Examples

| Input | Output | Why |
|---|---|---|
| `num="1432219", k=3` | `"1219"` | Removing `4`, `3`, `2` (the first) leaves the smallest arrangement |
| `num="10200", k=1` | `"200"` | Removing the leading `1` leaves `"0200"`, which strips to `"200"` |
| `num="10", k=2` | `"0"` | Removing both digits leaves nothing, so the result is `"0"` |

## Edge Cases

- `k === num.length` → every digit removed, result is `"0"`
- Result would have leading zeros after removal → they're stripped
  (e.g. `"0200"` becomes `"200"`)
- Stripping leaves nothing at all → return `"0"`, not an empty string
- Already-increasing digit string with `k` still `> 0` → no digit
  removal happens during the scan itself (nothing is ever "worse" than
  what follows), so the required removals come from trimming the tail

## Hints

1. To make the smallest possible number, a digit should be removed if a
   *smaller* digit immediately follows it — removing a larger digit in
   favor of a smaller one earlier in the number always helps, since
   earlier digits have more positional weight.
2. Process digits left to right, using a stack: whenever the current
   digit is smaller than the stack's top, and you still have removals
   left (`k > 0`), pop the stack (remove that larger, earlier digit) and
   decrement `k`. Otherwise, push the current digit.
3. If you reach the end of the string and `k` is still greater than
   zero, the remaining removals must come from the *end* of the stack
   (the string was non-decreasing the whole way, so the only way to
   shrink it further is trimming the largest, most recent digits off the
   tail).

## Algorithm

**Pattern:** greedy monotonic increasing stack.
**Core insight:** to minimize the resulting number, you want the
smallest possible digits to appear as early as possible — so whenever
the current digit is smaller than the most recently kept digit, that
more recent (and now clearly suboptimal) digit should be discarded, as
long as removals remain. Processing the string with a stack that only
ever keeps digits in non-decreasing order (popping larger digits when a
smaller one arrives, subject to the `k` budget) directly implements this
greedy rule. Any leftover `k` after the full scan means the string
never gave the chance to remove enough digits mid-scan (it was already
non-decreasing toward the end), so the remaining removals must come from
trimming the tail, which holds the largest, least significant digits.
**Invariant:** at every point during the scan, the stack holds a
non-decreasing sequence of digits representing the smallest arrangement
achievable so far, given the removals used up to that point.

## Dry Run

**Input:** `num = "1432219", k = 3`

| digit | pop while (top > digit && k > 0) | push | stack after | k after |
|---|---|---|---|---|
| `1` | – | `1` | `[1]` | 3 |
| `4` | – | `4` | `[1,4]` | 3 |
| `3` | pop `4` (4>3, k=3>0) | `3` | `[1,3]` | 2 |
| `2` | pop `3` (3>2, k=2>0) | `2` | `[1,2]` | 1 |
| `2` | – (top `2` not `>` `2`) | `2` | `[1,2,2]` | 1 |
| `1` | pop `2` (2>1, k=1>0) | `1` | `[1,2,1]` | 0 |
| `9` | – (k=0) | `9` | `[1,2,1,9]` | 0 |

`k = 0` after the scan, so no tail trimming needed.
`stack.join('') = "1219"`, no leading zeros to strip.

**Result:** `"1219"` — matches expected output.

## JavaScript Solution

```js
function removeKdigits(num, k) {
  const stack = [];

  for (const digit of num) {
    while (stack.length > 0 && k > 0 && stack[stack.length - 1] > digit) {
      stack.pop();
      k--;
    }
    stack.push(digit);
  }

  // Trim remaining k digits from tail
  while (k > 0) {
    stack.pop();
    k--;
  }

  // Strip leading zeroes
  let result = stack.join('').replace(/^0+/, '');
  return result === '' ? '0' : result;
}
```

## TypeScript Solution

```ts
function removeKdigits(num: string, k: number): string {
  const stack: string[] = [];
  let remaining = k;

  for (const digit of num) {
    while (stack.length > 0 && remaining > 0 && stack[stack.length - 1] > digit) {
      stack.pop();
      remaining--;
    }
    stack.push(digit);
  }

  while (remaining > 0) {
    stack.pop();
    remaining--;
  }

  const result: string = stack.join('').replace(/^0+/, '');
  return result === '' ? '0' : result;
}
```

## Time Complexity

O(n) — each digit is pushed onto the stack exactly once and popped at
most once across the entire scan, so total stack operations are bounded
by O(n).

## Space Complexity

O(n) — the stack holds up to `num.length - k` digits in the worst case.

## Common Mistakes

- Greedily removing the `k` largest individual digits found anywhere in
  the string — ignores position entirely; removing a large digit near
  the end helps far less than removing a large digit near the
  beginning, since leading digits carry more positional value.
- Forgetting the tail-trimming step for leftover `k` — a string that's
  already non-decreasing (like `"12345"`) never triggers a pop during
  the main scan, so all `k` removals must come from trimming the largest
  (rightmost) digits after the scan completes.
- Forgetting to strip leading zeros (or forgetting the special case
  where the entire result strips down to nothing) — both `"0200"` and a
  fully-emptied result need to become `"200"` and `"0"` respectively,
  not be returned as-is or as an empty string.

## Interview Follow-up Questions

1. How would you adapt this to instead produce the *largest* possible
   number after removing `k` digits?
2. How would you solve this if you needed to remove `k` digits to make
   the number divisible by a given value, rather than simply minimal?
3. How does this monotonic-stack greedy technique relate to "132
   Pattern" or other monotonic-stack problems you've seen?

## Similar Questions

- Evaluate Reverse Polish Notation (see [evaluate-reverse-polish-notation.md](evaluate-reverse-polish-notation.md))
- Online Stock Span (Monotonic Stack Class Design) (see [online-stock-span-monotonic-stack.md](online-stock-span-monotonic-stack.md))
