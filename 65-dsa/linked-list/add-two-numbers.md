# Q604 · Add Two Numbers

**Difficulty:** Medium
**Companies Asked:** Amazon, Microsoft, Google, Meta, Adobe, Bloomberg
**Interview Frequency:** ★★★★★
**Category:** Data Structures & Algorithms → Linked List
**Concepts:** linked list traversal, digit-by-digit arithmetic, carry propagation, dummy head

## Problem Statement

Two non-negative integers are stored as singly linked lists, where each
node holds a single digit and the digits are stored in **reverse order**
— the head node holds the ones digit, the next node the tens digit, and
so on. Add the two numbers together and return the sum as a new linked
list, in the same reversed-digit format.

## Input

- `l1`: the head of a singly linked list (`{ value, next }` nodes), each
  node's `value` a single digit `0-9`
- `l2`: the head of a second such list

## Output

The head node of a new linked list representing the sum, digits stored
least-significant-first (same convention as the input).

## Constraints

- `1 <= number of nodes in each list <= 100`
- `0 <= node.value <= 9`
- Neither input list has leading zeros, except the single-node list
  representing the number `0` itself.

## Examples

| Input | Output | Why |
|---|---|---|
| `l1 = 2->4->3` (342), `l2 = 5->6->4` (465) | `7->0->8` (807) | 342 + 465 = 807, no cross-digit surprises |
| `l1 = 9->9->9`, `l2 = 9->9->9->9` (999 + 9999) | `8->9->9->0->1` (10998) | Different lengths, and the final carry creates an extra node beyond either input's length |
| `l1 = 0`, `l2 = 0` | `0` | Both inputs are the single-node representation of zero |

## Edge Cases

- Lists of different lengths → the shorter list runs out first; treat
  its missing digits as `0` for the remaining additions.
- A carry out of the most significant digit (e.g. `999 + 1 = 1000`) →
  produces one extra node beyond the length of either input list.
- Both lists are the single-node value `0` → result is a single node
  `0`, not an empty list.

## Hints

1. Think about how you add two numbers on paper, digit by digit from the
   *rightmost* digit — the reversed storage order here means the head of
   each list already lines up with where you'd start adding by hand.
2. At each step you're combining three things: the current digit from
   `l1` (or `0` if that list has run out), the current digit from `l2`
   (or `0`), and the carry from the previous step.
3. Use a dummy head node for the result list so you don't need a special
   case for attaching the very first digit — build the list off
   `dummy.next` and return that at the end. Keep looping as long as
   *either* list still has nodes, or a carry is still pending.

## Algorithm

**Pattern:** simulated elementary-school addition with a dummy head.
**Core insight:** because both lists store digits least-significant-first,
walking them head-to-tail in lockstep visits digits in exactly the order
you'd add them by hand — no reversal or digit-extraction math needed. At
each step, sum the two current digits (treating a missing digit as `0`
once one list is exhausted) plus any carry from the previous step; the
new digit is `sum % 10` and the new carry is `Math.floor(sum / 10)`. The
loop must continue for one extra step beyond both lists if a final carry
remains, since that carry becomes a new most-significant digit.
**Invariant:** after processing position `i`, the result list built so
far correctly represents the sum of the first `i+1` digits of `l1` and
`l2` (least-significant-first), and `carry` holds exactly the amount to
add into position `i+1`.

## Dry Run

**Input:** `l1 = 2->4->3` (342), `l2 = 5->6->4` (465)

| Step | l1 digit | l2 digit | carry (in) | sum | new digit (sum % 10) | carry (out, sum / 10) | Result list so far |
|---|---|---|---|---|---|---|---|
| 1 | 2 | 5 | 0 | 7 | 7 | 0 | `7` |
| 2 | 4 | 6 | 0 | 10 | 0 | 1 | `7 -> 0` |
| 3 | 3 | 4 | 1 | 8 | 8 | 0 | `7 -> 0 -> 8` |

Both lists and the carry are exhausted after step 3 — loop ends.
**Result:** `7 -> 0 -> 8`, representing 807, matching 342 + 465.

## JavaScript Solution

```js
function addTwoNumbers(l1, l2) {
  const dummyHead = { value: 0, next: null };
  let current = dummyHead;
  let carry = 0;

  while (l1 !== null || l2 !== null || carry !== 0) {
    const firstDigit = l1 !== null ? l1.value : 0; // treat exhausted list as digit 0
    const secondDigit = l2 !== null ? l2.value : 0;
    const sum = firstDigit + secondDigit + carry;

    carry = Math.floor(sum / 10);
    current.next = { value: sum % 10, next: null };
    current = current.next;

    l1 = l1 !== null ? l1.next : null;
    l2 = l2 !== null ? l2.next : null;
  }

  return dummyHead.next; // skip the dummy node itself
}
```

## TypeScript Solution

```ts
interface ListNode {
  value: number;
  next: ListNode | null;
}

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  const dummyHead: ListNode = { value: 0, next: null };
  let current: ListNode = dummyHead;
  let carry = 0;

  while (l1 !== null || l2 !== null || carry !== 0) {
    const firstDigit: number = l1 !== null ? l1.value : 0;
    const secondDigit: number = l2 !== null ? l2.value : 0;
    const sum: number = firstDigit + secondDigit + carry;

    carry = Math.floor(sum / 10);
    current.next = { value: sum % 10, next: null };
    current = current.next;

    l1 = l1 !== null ? l1.next : null;
    l2 = l2 !== null ? l2.next : null;
  }

  return dummyHead.next;
}
```

## Time Complexity

O(max(m, n)), where `m` and `n` are the lengths of `l1` and `l2` — the
loop runs once per digit position up to the longer list (plus at most one
extra step for a final carry), doing O(1) work each time.

## Space Complexity

O(max(m, n)) for the output list, which has at most `max(m, n) + 1`
nodes (the `+1` only when a final carry produces an extra digit). Excluding
the output, the algorithm itself only uses O(1) auxiliary variables
(`carry`, `current`, and the two traversal pointers).

## Common Mistakes

- Stopping the loop when the *shorter* list runs out instead of
  continuing until *both* lists are exhausted — silently drops the
  longer list's remaining digits.
- Forgetting to emit a final node when a carry remains after both lists
  are exhausted (e.g. `9->9 + 1` needs a result of `0->0->1`, not
  `0->0`).
- Not using a dummy head — without it, attaching the first result node
  needs an awkward special case to distinguish "list is empty, create
  the head" from "append to the existing tail."
- Mutating `l1`/`l2` values directly instead of building new result
  nodes — works for this problem's stated output but destroys the input
  lists, which is usually not what an interviewer wants unless explicitly
  allowed.

## Interview Follow-up Questions

1. How would this change if the digits were stored in *forward* order
   (most significant digit at the head) instead of reversed?
2. How would you solve this without creating any new nodes, reusing the
   longer of the two input lists to store the result in place?
3. What happens if the numbers can be arbitrarily large — how would
   using `BigInt` per node change (or not change) this approach?
4. How would you adapt this to *subtract* one number from another
   instead of adding?
5. Can you do this recursively instead of iteratively — what would the
   carry look like as it's threaded through recursive calls?

## Similar Questions

- Reverse a Linked List (see [reverse-a-linked-list.md](reverse-a-linked-list.md))
- Multiply Strings (same digit-by-digit carry propagation, on strings
  instead of lists)
- Plus One (single-number version of the same carry logic)

---
[← Back to Linked List](README.md) · [← Back to 65-dsa](../README.md)
