// Python + DSA Interview Handbook — Module 8: Python DSA and Coding
// Interview Patterns. Hand-authored technical questions covering the core
// interview patterns (two pointers, sliding window, prefix sum, stack,
// queue, linked list, binary search, trees, graphs, heap, dynamic
// programming) with genuine Python implementations, dry runs, and
// complexity analysis. Mirrors the MockTechnicalQuestion shape defined in
// @/mocks/questions.

import type { MockTechnicalQuestion } from '@/mocks/questions';

const COMPANIES = [
  'Google',
  'Meta',
  'Amazon',
  'Microsoft',
  'Netflix',
  'Adobe',
  'Atlassian',
  'Stripe',
  'Uber',
  'Flipkart',
  'Zoho',
];

interface QuestionSeed {
  id: string;
  number: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  experienceLevel: string;
  category: string;
  expectedAnswer: string;
  deepExplanation: string;
  productionExample: string;
  bestPractices: string[];
  tradeOffs: string;
  commonMistakes: string[];
  followUpQuestions: string[];
  relatedTopics: string[];
}

const FREQUENCY_BY_DIFFICULTY: Record<QuestionSeed['difficulty'], number> = {
  Easy: 5,
  Medium: 4,
  Hard: 3,
};

const QUESTION_SEEDS: QuestionSeed[] = [
  {
    id: 'python-m8-1',
    number: 'PY-M8-1',
    title: 'Coding: Container With Most Water and Three Sum (two pointers)',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Two Pointers',
    expectedAnswer:
      'The two-pointer pattern applies when an array is sorted (or can usefully be sorted) and you need to consider pairs/triples from both ends inward — it turns an O(n²) brute-force pair search into O(n) (after any needed O(n log n) sort).',
    deepExplanation:
      '```python\ndef max_area(heights: list[int]) -> int:\n    left, right = 0, len(heights) - 1\n    best = 0\n    while left < right:\n        width = right - left\n        height = min(heights[left], heights[right])\n        best = max(best, width * height)\n        # move the pointer at the SHORTER wall — moving the taller one can only\n        # decrease width without any chance of increasing the limiting height\n        if heights[left] < heights[right]:\n            left += 1\n        else:\n            right -= 1\n    return best\n```\nDry run max_area([1,8,6,2,5,4,8,3,7]): left=0(1)/right=8(7): width=8,height=1,area=8, move left (shorter); left=1(8)/right=8(7): width=7,height=7,area=49, move right (shorter, 7<8); ... continues, best ends up 49.\n\nWhy moving the SHORTER pointer is correct (and the key insight interviewers probe for): the current area is bounded by `min(left_height, right_height)`. If you move the TALLER wall inward, the width shrinks AND the limiting height can only stay the same or get smaller (since the other, shorter wall is still the constraint, or the new wall is even shorter) — so that move can never produce a better answer. Moving the shorter wall is the only move that has any CHANCE of increasing the limiting height and thus the area.\n\nStep 1 — Understand the topic.\nTopic: Coding: Container With Most Water and Three Sum (two pointers)\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef max_area(heights: list[int]) -> int:\n    left, right = 0, len(heights) - 1\n    best = 0\n\n    while left < right:\n        width = right - left\n        height = min(\n            heights[left],\n            heights[right],\n        )\n        best = max(best, width * height)\n\n        if heights[left] < heights[right]:\n            left += 1\n        else:\n            right -= 1\n\n    return best\n\nprint(max_area([1,8,6,2,5,4,8,3,7]))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nheights = [1,8,6,2,5,4,8,3,7]\nbest = max(\n    (j - i) * min(heights[i], heights[j])\n    for i in range(len(heights))\n    for j in range(i + 1, len(heights))\n)\nprint(best)\n```\n\nStep 5 — Example result:\n```text\n49\n```\n\nStep 6 — Complexity / trade-off:\nTwo pointers: O(n) time and O(1) extra space.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'The general "two pointers converging from both ends" pattern (here, and in Module 3\\\n\nCoding practice: first explain the core/manual approach for **Coding: Container With Most Water and Three Sum (two pointers)**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Recognize the two-pointer pattern specifically when the problem involves pairs/triples from a SORTED (or sortable) sequence and a monotonic relationship between pointer movement and the answer.',
      'Always justify WHY moving a specific pointer is safe (as with the shorter-wall argument above) rather than just presenting the code — this is exactly what distinguishes memorization from genuine understanding in an interview.',
      'Combine two pointers with an outer loop (as in Three Sum) to extend a two-pointer O(n) technique into an O(n²) solution for a THREE-element variant, and recognize this generalizes further (with diminishing efficiency) to Four Sum and beyond.',
    ],
    tradeOffs:
      'Two pointers achieve O(n) (or O(n²) for the fixed-plus-two-pointer combination) with O(1) extra space, versus a brute-force nested-loop approach at O(n²) (or O(n³)) — the trade-off is that the array often needs to be sorted first (O(n log n), and only valid if the ORIGINAL order/indices are not needed in the answer).',
    commonMistakes: [
      'Moving the TALLER pointer instead of the shorter one in Container With Most Water, which can skip over the actual optimal answer.',
      'Forgetting that sorting the array (needed for the two-pointer technique) destroys original index information, which matters if the problem asks for INDICES rather than values.',
      'Off-by-one errors in the `while left < right:` loop condition, either double-counting a middle element or missing the final valid pair.',
    ],
    followUpQuestions: [
      'Why is moving the pointer at the shorter wall always at least as good as moving the taller one, never worse?',
      'How would you extend the two-pointer technique to find ALL pairs summing to a target, not just whether one exists?',
      'How would you adapt this pattern if the array could not be sorted (e.g. indices matter and must be preserved in the output)?',
    ],
    relatedTopics: ['Two Pointers', 'Sorting', 'Container With Most Water', 'Three Sum'],
  },
  {
    id: 'python-m8-2',
    number: 'PY-M8-2',
    title: 'Coding: Longest Substring Without Repeating Characters (sliding window)',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Sliding Window',
    expectedAnswer:
      'The sliding window pattern maintains a variable-size window [left, right] over the string, expanding `right` each step and shrinking from `left` only when the window violates a constraint (here: a repeated character) — this gives O(n) time versus the O(n²)/O(n³) brute force of checking every substring.',
    deepExplanation:
      '```python\ndef length_of_longest_substring(s: str) -> int:\n    last_seen = {}   # char -> most recent index seen at\n    left = 0\n    best = 0\n    for right, ch in enumerate(s):\n        if ch in last_seen and last_seen[ch] >= left:\n            left = last_seen[ch] + 1   # jump left past the previous occurrence\n        last_seen[ch] = right\n        best = max(best, right - left + 1)\n    return best\n```\nDry run length_of_longest_substring("abcabcbb"): right=0 \\\n\nStep 1 — Understand the topic.\nTopic: Coding: Longest Substring Without Repeating Characters (sliding window)\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef longest_unique(text: str) -> int:\n    seen: dict[str, int] = {}\n    left = 0\n    best = 0\n\n    for right, char in enumerate(text):\n        if char in seen and seen[char] >= left:\n            left = seen[char] + 1\n\n        seen[char] = right\n        best = max(best, right - left + 1)\n\n    return best\n\nprint(longest_unique("abcabcbb"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\ntext = "abcabcbb"\nbest = max(\n    len(set(text[i:j]))\n    for i in range(len(text))\n    for j in range(i + 1, len(text) + 1)\n    if len(set(text[i:j])) == j - i\n)\nprint(best)\n```\n\nStep 5 — Example result:\n```text\n3\n```\n\nStep 6 — Complexity / trade-off:\nSliding window: O(n) time and O(k) space.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'The sliding-window technique generalizes directly to real streaming/monitoring problems like "find the longest window of time with no duplicate error codes in a log stream" or "find the largest contiguous batch of unique user actions" — same shrink/expand-on-violation structure, applied to a domain constraint instead of character repetition.\n\nCoding practice: first explain the core/manual approach for **Coding: Longest Substring Without Repeating Characters (sliding window)**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Use a hash map of "last seen index" (not just a set) so you can jump `left` directly to the right position in O(1) amortized, rather than shrinking one character at a time.',
      'Always guard stale-occurrence checks with `last_seen[ch] >= left`, not just `ch in last_seen`, to avoid incorrectly shrinking the window based on an occurrence already outside it.',
      'Recognize the sliding-window pattern whenever a problem asks for the longest/shortest/optimal CONTIGUOUS substring or subarray satisfying a constraint.',
    ],
    tradeOffs:
      'The hash-map sliding window is O(n) time / O(min(n, alphabet size)) space, versus a naive O(n²) approach checking every substring with an O(n) uniqueness check each — an enormous practical speedup for long strings, at the modest cost of the extra hash map.',
    commonMistakes: [
      'Only checking `ch in last_seen` without the `>= left` guard, causing incorrect window shrinkage for characters that repeated outside the current window.',
      'Shrinking the window one character at a time from `left` instead of jumping directly via the stored index, turning an O(n) solution back into O(n²) in the worst case.',
      'Forgetting to update `best` on every iteration (not just when the window shrinks), missing the case where the longest substring is the ENTIRE remaining string.',
    ],
    followUpQuestions: [
      'How would this change to find the longest substring with AT MOST k repeating characters instead of zero?',
      'How would you adapt this to return the actual longest substring, not just its length?',
      'How would you solve the analogous "minimum window substring containing all characters of a target string" problem (a fixed-target variant of sliding window)?',
    ],
    relatedTopics: ['Sliding Window', 'Hash Map', 'Two Pointers', 'String Algorithms'],
  },
  {
    id: 'python-m8-3',
    number: 'PY-M8-3',
    title: 'Coding: prefix sums for range-sum queries and the equilibrium index',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Prefix Sum',
    expectedAnswer:
      'Precomputing a prefix-sum array (`prefix[i]` = sum of the first `i` elements) lets you answer ANY range-sum query `sum(arr[i:j])` in O(1) after an O(n) one-time preprocessing step, instead of O(n) per query — essential when many range queries hit the same static array.',
    deepExplanation:
      '```python\ndef build_prefix_sums(nums: list[int]) -> list[int]:\n    prefix = [0] * (len(nums) + 1)   # prefix[i] = sum(nums[0:i])\n    for i, num in enumerate(nums):\n        prefix[i + 1] = prefix[i] + num\n    return prefix\n\ndef range_sum(prefix: list[int], left: int, right: int) -> int:\n    # inclusive range [left, right] over the ORIGINAL array\n    return prefix[right + 1] - prefix[left]\n\ndef equilibrium_index(nums: list[int]) -> int:\n    total = sum(nums)\n    left_sum = 0\n    for i, num in enumerate(nums):\n        right_sum = total - left_sum - num\n        if left_sum == right_sum:\n            return i\n        left_sum += num\n    return -1\n\ndef subarray_sum_equals_k(nums: list[int], k: int) -> int:\n    # count of CONTIGUOUS subarrays summing to exactly k, using a running prefix\n    # sum + a hash map of "how many times have I seen this prefix sum before"\n    count = 0\n    running_sum = 0\n    seen = {0: 1}   # empty prefix (sum 0) has been "seen" once, before the array starts\n    for num in nums:\n        running_sum += num\n        count += seen.get(running_sum - k, 0)\n        seen[running_sum] = seen.get(running_sum, 0) + 1\n    return count\n```\nWhy `subarray_sum_equals_k` works: if `running_sum[j] - running_sum[i] == k` for some `i < j`, then the subarray between those two points sums to exactly `k`. So for each `j`, counting how many PRIOR prefix sums equal `running_sum[j] - k` directly counts how many valid subarrays END at `j` — accumulating this over the whole array in one O(n) pass, using the hash map for O(1) average lookups, versus an O(n²) brute-force check of every subarray.\n\nThe `seen = {0: 1}` initialization handles subarrays that start at INDEX 0 — without it, a subarray from the very beginning summing exactly to `k` would be missed, since there is no "prefix sum before the array" entry to match against otherwise.\n\nStep 1 — Understand the topic.\nTopic: Coding: prefix sums for range-sum queries and the equilibrium index\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef range_sums(values: list[int], queries):\n    prefix = [0] * (len(values) + 1)\n\n    for index, value in enumerate(values):\n        prefix[index + 1] = prefix[index] + value\n\n    result = []\n    for left, right in queries:\n        result.append(\n            prefix[right + 1] - prefix[left]\n        )\n\n    return result\n\nprint(range_sums(\n    [1,2,3,4,5],\n    [(1,3), (0,2)],\n))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nvalues = [1,2,3,4,5]\nprint([\n    sum(values[left:right + 1])\n    for left, right in [(1,3), (0,2)]\n])\n```\n\nStep 5 — Example result:\n```text\n[9, 6]\n```\n\nStep 6 — Complexity / trade-off:\nPrefix preprocessing is O(n); each range query becomes O(1).\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'Prefix sums power real-world "cumulative metrics over a time range" dashboards — e.g. precomputing cumulative daily revenue once lets any "total revenue between date A and date B" query answer in O(1) instead of re-summing the raw daily records every time, which matters enormously once a dashboard serves many such range queries against the same dataset.\n\nCoding practice: first explain the core/manual approach for **Coding: prefix sums for range-sum queries and the equilibrium index**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Build the prefix-sum array ONCE (O(n)) whenever you anticipate MULTIPLE range-sum queries against the same static array — never recompute a fresh sum per query.',
      'Use a 1-indexed-style prefix array (`prefix[0] = 0`) to avoid special-casing range queries that start at index 0.',
      'For "count subarrays summing to k" style problems, reach for the running-sum + hash-map-of-seen-sums pattern rather than a brute-force nested loop.',
    ],
    tradeOffs:
      'Prefix sums trade O(n) preprocessing time and O(n) extra space for O(1) per-query range sums — a clear win when the array is static and queried repeatedly, but pure overhead if you only need a single range sum once (a direct O(range length) sum is simpler and just as fast for a one-off query).',
    commonMistakes: [
      'Recomputing `sum(nums[i:j])` fresh for every query in a loop of many queries, silently making the whole operation O(n·q) instead of O(n + q).',
      'Off-by-one errors converting between prefix-array indices and original-array indices (forgetting the prefix array is one element LONGER).',
      'Forgetting the `{0: 1}` initialization in the subarray-sum-equals-k pattern, undercounting subarrays that start at index 0.',
    ],
    followUpQuestions: [
      'How would you extend prefix sums to a 2D matrix, to answer arbitrary rectangular-region sum queries in O(1)?',
      'How does the running-sum + hash-map technique for "count subarrays summing to k" change if the array can contain negative numbers (hint: it already handles them correctly — explain why)?',
      'How would you support UPDATES to individual elements while still answering range-sum queries efficiently (hint: this motivates a Fenwick tree/segment tree)?',
    ],
    relatedTopics: ['Prefix Sum', 'Range Queries', 'Hash Map', 'Subarray Problems'],
  },
  {
    id: 'python-m8-4',
    number: 'PY-M8-4',
    title: 'Coding: valid parentheses, min stack, and daily temperatures (stack)',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Stack',
    expectedAnswer:
      'A stack (Python\'s `list` used with `.append`/`.pop` from the end, both O(1)) is the natural structure for "most recent unmatched thing" problems: bracket matching, tracking a running minimum, and the "next greater element" family (monotonic stack) all reduce cleanly to stack operations.',
    deepExplanation:
      '```python\ndef is_valid_parentheses(s: str) -> bool:\n    pairs = {")": "(", "]": "[", "}": "{"}\n    stack = []\n    for ch in s:\n        if ch in pairs.values():          # an opening bracket\n            stack.append(ch)\n        elif ch in pairs:                  # a closing bracket\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n        # else: ignore non-bracket characters, if any\n    return not stack   # must be empty — every opener was matched\n\nclass MinStack:\n    def __init__(self):\n        self._stack = []            # (value, min_so_far) pairs — O(1) get_min\n    def push(self, val):\n        current_min = min(val, self._stack[-1][1]) if self._stack else val\n        self._stack.append((val, current_min))\n    def pop(self):\n        self._stack.pop()\n    def top(self):\n        return self._stack[-1][0]\n    def get_min(self):\n        return self._stack[-1][1]\n\ndef daily_temperatures(temps: list[int]) -> list[int]:\n    answer = [0] * len(temps)\n    stack = []   # indices of temperatures waiting for a WARMER day\n    for i, temp in enumerate(temps):\n        while stack and temps[stack[-1]] < temp:\n            prev_index = stack.pop()\n            answer[prev_index] = i - prev_index\n        stack.append(i)\n    return answer\n```\nDry run daily_temperatures([73,74,75,71,69,72,76,73]): i=0(73) stack=[0]; i=1(74)>73 pop0 answer[0]=1, stack=[1]; i=2(75)>74 pop1 answer[1]=1, stack=[2]; i=3(71) not>75 stack=[2,3]; i=4(69) not>71 stack=[2,3,4]; i=5(72)>69 pop4 answer[4]=1, 72>71 pop3 answer[3]=2, not>75 stack=[2,5]; i=6(76)>72 pop5 answer[5]=1, >75 pop2 answer[2]=4, stack=[6]; i=7(73) not>76 stack=[6,7] -> answer=[1,1,4,2,1,1,0,0].\n\nWhy `daily_temperatures` is a MONOTONIC stack: the stack always holds indices with STRICTLY DECREASING temperatures (top to bottom is smallest to largest going down the stack, or equivalently the values are non-increasing from bottom to top... concretely: we only push, or pop-then-push, such that we never leave a smaller-or-equal value below a larger one waiting) — each element is pushed once and popped at most once, giving O(n) total despite the nested-looking while loop (amortized analysis).\n\nStep 1 — Understand the topic.\nTopic: Coding: valid parentheses, min stack, and daily temperatures (stack)\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef valid_parentheses(text: str) -> bool:\n    pairs = {")": "(", "]": "[", "}": "{"}\n    stack: list[str] = []\n\n    for char in text:\n        if char in "([{":\n            stack.append(char)\n        elif not stack or stack.pop() != pairs[char]:\n            return False\n\n    return not stack\n\nprint(valid_parentheses("([])"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\ntext = "([])"\nstack = []\npairs = {")": "(", "]": "[", "}": "{"}\n\nfor char in text:\n    if char in pairs.values():\n        stack.append(char)\n    elif not stack or stack.pop() != pairs[char]:\n        print(False)\n        break\nelse:\n    print(not stack)\n```\n\nStep 5 — Example result:\n```text\nTrue\n```\n\nStep 6 — Complexity / trade-off:\nStack validation is O(n) time and O(n) worst-case space.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A monotonic stack is the standard technique behind "stock span" problems (how many consecutive prior days had a price <= today\\\n\nCoding practice: first explain the core/manual approach for **Coding: valid parentheses, min stack, and daily temperatures (stack)**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Use a `list` as a stack via `.append()`/`.pop()` (both O(1) at the end) — never `.pop(0)`/`.insert(0, ...)`, which are O(n) and defeat the point.',
      'For "next greater/smaller element" style problems, default to a monotonic stack of INDICES (not values) so you can compute distances/positions directly, as in `daily_temperatures`.',
      'For `MinStack`, store the running minimum ALONGSIDE each value (not recomputed) to guarantee true O(1) `get_min()` rather than an O(n) scan.',
    ],
    tradeOffs:
      'The monotonic-stack approach to `daily_temperatures` is O(n) time (amortized, each index pushed/popped once) versus an O(n²) brute-force nested loop checking every future day for each day — a large practical win for long sequences, at the cost of the less immediately obvious amortized-complexity argument needing to be understood and explained.',
    commonMistakes: [
      'Using `list.pop(0)`/`insert(0, x)` to implement a stack from the wrong end, silently making operations O(n) instead of O(1).',
      'In `MinStack`, recomputing the minimum by scanning the whole stack on each `get_min()` call instead of tracking it incrementally, making it O(n) instead of O(1).',
      'In bracket matching, forgetting to check `not stack` before popping on a closing bracket, causing an `IndexError` on malformed input like ")(" or a lone ")".',
    ],
    followUpQuestions: [
      'Why is the `daily_temperatures` while loop still O(n) overall despite looking like a nested loop?',
      'How would you extend `is_valid_parentheses` to also validate a specific nesting DEPTH limit?',
      'How would you implement `MinStack` if you could not afford the extra O(n) space for storing a running minimum alongside every value (hint: store only the DIFFERENCE from the current min)?',
    ],
    relatedTopics: ['Stack', 'Monotonic Stack', 'Amortized Analysis', 'Valid Parentheses', 'Next Greater Element'],
  },
  {
    id: 'python-m8-5',
    number: 'PY-M8-5',
    title: 'Coding: linked list traversal, reversal, and cycle detection',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Linked List',
    expectedAnswer:
      'A singly linked list is a chain of nodes (`value` + `next` pointer); core operations (reverse, find middle, detect a cycle) rely on careful pointer manipulation and, for cycle detection specifically, the classic two-pointer "Floyd\'s cycle detection" (slow/fast pointers) technique.',
    deepExplanation:
      '```python\nclass ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef reverse_list(head: ListNode | None) -> ListNode | None:\n    prev = None\n    current = head\n    while current:\n        next_node = current.next   # save before overwriting\n        current.next = prev         # reverse the link\n        prev = current\n        current = next_node\n    return prev   # prev is the new head\n\ndef find_middle(head: ListNode | None) -> ListNode | None:\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next          # moves 1 step\n        fast = fast.next.next      # moves 2 steps\n    return slow   # when fast reaches the end, slow is at the middle\n\ndef has_cycle(head: ListNode | None) -> bool:\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow is fast:            # they meet -> there IS a cycle\n            return True\n    return False   # fast reached the end -> no cycle\n\ndef merge_two_sorted(a: ListNode | None, b: ListNode | None) -> ListNode | None:\n    dummy = ListNode()\n    tail = dummy\n    while a and b:\n        if a.value <= b.value:\n            tail.next, a = a, a.next\n        else:\n            tail.next, b = b, b.next\n        tail = tail.next\n    tail.next = a or b   # attach whichever list still has remaining nodes\n    return dummy.next\n```\nWhy the slow/fast pointer meets INSIDE a cycle (Floyd\\\n\nStep 1 — Understand the topic.\nTopic: Coding: linked list traversal, reversal, and cycle detection\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nclass Node:\n    def __init__(self, value: int, next_node=None):\n        self.value = value\n        self.next = next_node\n\ndef reverse(head: Node | None) -> Node | None:\n    previous = None\n    current = head\n\n    while current:\n        next_node = current.next\n        current.next = previous\n        previous = current\n        current = next_node\n\n    return previous\n\nhead = Node(1, Node(2, Node(3)))\nprint(reverse(head).value)\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nvalues = [1,2,3]\nprint(list(reversed(values)))\n```\n\nStep 5 — Example result:\n```text\n3\n```\n\nStep 6 — Complexity / trade-off:\nPointer reversal is O(n) time and O(1) auxiliary space.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'Cycle detection (Floyd\\\n\nCoding practice: first explain the core/manual approach for **Coding: linked list traversal, reversal, and cycle detection**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Use the "dummy head" node pattern for any linked-list-building/merging problem to avoid special-casing the first node.',
      'Use slow/fast (Floyd\'s) pointers for O(1)-extra-space cycle detection and middle-finding, rather than an O(n)-space visited-set approach, when memory efficiency is asked for.',
      'When reversing/relinking a list, always save `next_node` BEFORE overwriting `current.next` — overwriting first loses the rest of the list irrecoverably.',
    ],
    tradeOffs:
      'Floyd\'s slow/fast pointer technique detects a cycle in O(n) time / O(1) space, versus a hash-set-of-visited-nodes approach that is also O(n) time but O(n) space — the two-pointer trick is strictly better on space whenever it applies, which is the entire reason it is the expected "senior" answer to this classic problem.',
    commonMistakes: [
      'Overwriting `current.next = prev` BEFORE saving the original `current.next` into a temporary variable, losing the rest of the list mid-reversal.',
      'Checking `slow == fast` with `==` when node equality is meant to be IDENTITY (`is`) — usually harmless if `__eq__` is not overridden, but conceptually the correct check is identity, not value equality.',
      'Forgetting the `fast and fast.next` (not just `fast`) loop condition in slow/fast traversal, causing an `AttributeError` when `fast` lands on `None` mid-step for an even-length, cycle-free list.',
    ],
    followUpQuestions: [
      'Once a cycle is detected (slow meets fast), how would you find the exact NODE where the cycle begins, in O(1) extra space?',
      'How would you reverse only a SUBLIST between positions m and n, not the entire list?',
      'How would you detect a cycle in a DOUBLY linked list, and would the same technique still be the best approach?',
    ],
    relatedTopics: ['Linked List', 'Floyd\'s Cycle Detection', 'Two Pointers', 'Pointer Manipulation'],
  },
  {
    id: 'python-m8-6',
    number: 'PY-M8-6',
    title: 'Coding: binary search and its variants (first/last occurrence, rotated array)',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Binary Search',
    expectedAnswer:
      'Binary search halves the search space each step by comparing the middle element against the target, giving O(log n) — but it applies far beyond a plain sorted-array lookup: it works on ANY monotonic (sorted-like) SEARCH SPACE, including "first/last position satisfying a condition" and searching a rotated sorted array by determining which half is still properly ordered.',
    deepExplanation:
      '```python\ndef binary_search(nums: list[int], target: int) -> int:\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\ndef first_occurrence(nums: list[int], target: int) -> int:\n    left, right = 0, len(nums) - 1\n    result = -1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            result = mid\n            right = mid - 1   # keep searching LEFT for an earlier occurrence\n        elif nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return result\n\ndef search_rotated(nums: list[int], target: int) -> int:\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[left] <= nums[mid]:            # LEFT half is properly sorted\n            if nums[left] <= target < nums[mid]:\n                right = mid - 1\n            else:\n                left = mid + 1\n        else:                                    # RIGHT half is properly sorted instead\n            if nums[mid] < target <= nums[right]:\n                left = mid + 1\n            else:\n                right = mid - 1\n    return -1\n```\nWhy `(left + right) // 2` can be a subtle bug in OTHER languages (not Python): in fixed-width-integer languages, `left + right` can overflow for very large indices — the safer form is `left + (right - left) // 2`. Python\\\n\nStep 1 — Understand the topic.\nTopic: Coding: binary search and its variants (first/last occurrence, rotated array)\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef binary_search(values: list[int], target: int) -> int:\n    left, right = 0, len(values) - 1\n\n    while left <= right:\n        middle = (left + right) // 2\n\n        if values[middle] == target:\n            return middle\n        if values[middle] < target:\n            left = middle + 1\n        else:\n            right = middle - 1\n\n    return -1\n\nprint(binary_search([1,3,5,7,9], 7))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nimport bisect\n\nvalues = [1,3,5,7,9]\nindex = bisect.bisect_left(values, 7)\n\nprint(index if index < len(values)\n      and values[index] == 7 else -1)\n```\n\nStep 5 — Example result:\n```text\n3\n```\n\nStep 6 — Complexity / trade-off:\nBinary search is O(log n) after the collection is sorted.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      '"First/last occurrence" binary search is exactly the technique behind efficiently finding the boundaries of a date range in a sorted, indexed time-series log (e.g. "find the first log entry at or after timestamp T") — O(log n) instead of a linear scan, which matters enormously on a large sorted index.\n\nCoding practice: first explain the core/manual approach for **Coding: binary search and its variants (first/last occurrence, rotated array)**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Always use `left <= right` (not `<`) as the loop condition for standard binary search, and be deliberate/consistent about whether `right` starts at `len(nums)` or `len(nums) - 1` — mixing conventions is the #1 source of off-by-one bugs.',
      'For "first/last occurrence" variants, do NOT return immediately on a match — record the candidate and keep narrowing toward the boundary you need.',
      'For rotated-array search, always identify WHICH half is properly sorted first, then apply a normal range check only within that established sorted half.',
    ],
    tradeOffs:
      'Binary search is O(log n) versus O(n) linear scan, but strictly requires the search space to be sorted or otherwise monotonic in some verifiable sense — it is not applicable to genuinely unsorted, unstructured data without that structural guarantee.',
    commonMistakes: [
      'Off-by-one errors from inconsistent `left <= right` vs `left < right` loop conditions combined with the wrong initial `right` value.',
      'Returning immediately upon finding a match in the first/last-occurrence variants, missing an even-earlier/later occurrence.',
      'In rotated-array search, checking `nums[left] < nums[mid]` instead of `<=`, mishandling the edge case where `left == mid` (a single-element remaining range).',
    ],
    followUpQuestions: [
      'How would you find the minimum element in a rotated sorted array using binary search?',
      'How would you use binary search to find the square root of a number without using `math.sqrt`?',
      'How does "binary search on the answer" work for a problem like "minimum capacity to ship packages within D days" — what makes a problem space "binary-searchable" even when it is not literally a sorted array?',
    ],
    relatedTopics: ['Binary Search', 'Rotated Array', 'Search Space', 'Binary Search on Answer'],
  },
  {
    id: 'python-m8-7',
    number: 'PY-M8-7',
    title: 'Coding: binary tree traversals (DFS pre/in/post-order, BFS level-order)',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Trees',
    expectedAnswer:
      'DFS traversals (preorder, inorder, postorder) visit a tree depth-first using recursion (or an explicit stack), differing only in WHEN the current node is processed relative to its children; BFS (level-order) visits the tree breadth-first using a queue, processing one whole level before the next. Inorder traversal of a Binary Search Tree specifically yields values in SORTED order — a very commonly tested fact.',
    deepExplanation:
      '```python\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef preorder(root):    # root, then left, then right\n    if root is None:\n        return []\n    return [root.val] + preorder(root.left) + preorder(root.right)\n\ndef inorder(root):      # left, then root, then right — SORTED order for a valid BST\n    if root is None:\n        return []\n    return inorder(root.left) + [root.val] + inorder(root.right)\n\ndef postorder(root):    # left, then right, then root — useful for safe deletion/cleanup order\n    if root is None:\n        return []\n    return postorder(root.left) + postorder(root.right) + [root.val]\n\nfrom collections import deque\n\ndef level_order(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        level_size = len(queue)\n        level_values = []\n        for _ in range(level_size):     # process exactly ONE full level at a time\n            node = queue.popleft()\n            level_values.append(node.val)\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n        result.append(level_values)\n    return result\n\ndef height(root):\n    if root is None:\n        return 0\n    return 1 + max(height(root.left), height(root.right))\n\ndef is_balanced(root) -> bool:\n    def check(node):   # returns -1 as a sentinel for "already unbalanced", else the height\n        if node is None:\n            return 0\n        left_height = check(node.left)\n        if left_height == -1:\n            return -1\n        right_height = check(node.right)\n        if right_height == -1:\n            return -1\n        if abs(left_height - right_height) > 1:\n            return -1\n        return 1 + max(left_height, right_height)\n    return check(root) != -1\n```\nWhy `is_balanced` uses a `-1` sentinel instead of a separate helper checking balance at every node: a naive approach recomputes `height()` for every node from scratch at every level, giving O(n²) in the worst case (a skewed tree); folding the balance CHECK into the same recursive pass that computes height achieves O(n) — computing each subtree\\\n\nStep 1 — Understand the topic.\nTopic: Coding: binary tree traversals (DFS pre/in/post-order, BFS level-order)\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nclass Node:\n    def __init__(self, value, left=None, right=None):\n        self.value = value\n        self.left = left\n        self.right = right\n\ndef preorder(node):\n    if not node:\n        return []\n    return (\n        [node.value]\n        + preorder(node.left)\n        + preorder(node.right)\n    )\n\nroot = Node(\n    1,\n    Node(2),\n    Node(3),\n)\n\nprint(preorder(root))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\ntree = {\n    "value": 1,\n    "left": {"value": 2, "left": None, "right": None},\n    "right": {"value": 3, "left": None, "right": None},\n}\n\nprint([\n    tree["value"],\n    tree["left"]["value"],\n    tree["right"]["value"],\n])\n```\n\nStep 5 — Example result:\n```text\n[1, 2, 3]\n```\n\nStep 6 — Complexity / trade-off:\nTree traversal is O(n) time.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'Level-order (BFS) traversal is the standard technique for "render an org chart / file-system tree level by level" UI features, and for shortest-path-in-unweighted-graph problems (Module 8\\\n\nCoding practice: first explain the core/manual approach for **Coding: binary tree traversals (DFS pre/in/post-order, BFS level-order)**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Fold multi-property recursive tree checks (like balance + height) into a SINGLE recursive pass with a sentinel value, rather than recomputing a helper (like height) redundantly at every node — turns O(n²) into O(n).',
      'Use `collections.deque` (not a plain `list`) for BFS queues — `popleft()` is O(1) versus a list\'s O(n) `pop(0)`.',
      'Remember inorder traversal of a BST yields sorted order — this fact alone solves several "is this a valid BST" / "kth smallest element" style problems elegantly.',
    ],
    tradeOffs:
      'Recursive DFS is concise and mirrors the tree\'s natural structure but risks `RecursionError` on a very deep/unbalanced tree (proportional to tree height, which can be O(n) for a degenerate skewed tree); an iterative DFS using an explicit stack avoids that recursion-depth limit at the cost of more verbose bookkeeping code.',
    commonMistakes: [
      'Confusing preorder/inorder/postorder ordering, especially under interview time pressure — anchoring on "where does ROOT appear relative to left/right" (first/middle/last) is the reliable way to keep them straight.',
      'Recomputing `height()` freshly inside a separate `is_balanced` check at every node, silently making it O(n²) instead of O(n).',
      'Using a plain `list` with `.pop(0)` for the BFS queue instead of `deque.popleft()`, silently making level-order traversal O(n²) instead of O(n).',
    ],
    followUpQuestions: [
      'Why does inorder traversal of a valid Binary Search Tree always produce values in sorted order?',
      'How would you convert the recursive traversals into iterative versions using an explicit stack?',
      'How would you find the Lowest Common Ancestor of two nodes in a binary tree (not necessarily a BST)?',
    ],
    relatedTopics: ['Binary Trees', 'DFS', 'BFS', 'Tree Traversal', 'Binary Search Tree', 'Recursion'],
  },
  {
    id: 'python-m8-8',
    number: 'PY-M8-8',
    title: 'Coding: graph BFS/DFS, cycle detection, and connected components',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Graphs',
    expectedAnswer:
      'Graphs are typically represented as an adjacency list (`dict[node, list[neighbor]]`) for sparse graphs. BFS (queue-based) finds shortest paths in an UNWEIGHTED graph and explores level by level; DFS (stack-based or recursive) explores as deep as possible before backtracking and is natural for cycle detection and connected-component counting. Cycle detection differs between undirected graphs (track the parent to avoid false positives from the edge you just came from) and directed graphs (track the current recursion stack, since a "back edge" to an ancestor STILL on the stack indicates a cycle).',
    deepExplanation:
      '```python\nfrom collections import deque, defaultdict\n\ndef bfs_shortest_path(graph: dict, start, target) -> int:\n    if start == target:\n        return 0\n    visited = {start}\n    queue = deque([(start, 0)])\n    while queue:\n        node, dist = queue.popleft()\n        for neighbor in graph[node]:\n            if neighbor == target:\n                return dist + 1\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append((neighbor, dist + 1))\n    return -1   # unreachable\n\ndef count_connected_components(n: int, edges: list[tuple[int, int]]) -> int:\n    graph = defaultdict(list)\n    for a, b in edges:\n        graph[a].append(b)\n        graph[b].append(a)\n    visited = set()\n    components = 0\n    for node in range(n):\n        if node not in visited:\n            components += 1\n            stack = [node]                # iterative DFS avoids recursion-depth limits\n            while stack:\n                current = stack.pop()\n                if current in visited:\n                    continue\n                visited.add(current)\n                stack.extend(graph[current])\n    return components\n\ndef has_cycle_directed(graph: dict) -> bool:\n    WHITE, GRAY, BLACK = 0, 1, 2   # unvisited, in-progress (on current DFS path), fully done\n    color = defaultdict(int)\n    def dfs(node):\n        color[node] = GRAY\n        for neighbor in graph[node]:\n            if color[neighbor] == GRAY:      # a back edge to an ancestor still on the stack -> cycle\n                return True\n            if color[neighbor] == WHITE and dfs(neighbor):\n                return True\n        color[node] = BLACK\n        return False\n    return any(color[node] == WHITE and dfs(node) for node in graph)\n\ndef topological_sort(graph: dict, n: int) -> list[int]:\n    in_degree = {i: 0 for i in range(n)}\n    for node in graph:\n        for neighbor in graph[node]:\n            in_degree[neighbor] += 1\n    queue = deque([node for node in range(n) if in_degree[node] == 0])\n    order = []\n    while queue:\n        node = queue.popleft()\n        order.append(node)\n        for neighbor in graph[node]:\n            in_degree[neighbor] -= 1\n            if in_degree[neighbor] == 0:\n                queue.append(neighbor)\n    return order if len(order) == n else []   # empty result signals a cycle (not a DAG)\n```\nWhy directed-graph cycle detection needs THREE colors, not just a visited set: a plain "visited" set alone cannot distinguish "already fully explored, safe" from "currently being explored on THIS path" — a DAG can legitimately have two different paths converge on the same already-visited node (not a cycle), while a true cycle specifically means you have looped back to a node still GRAY (actively on the current DFS recursion stack). This three-color (white/gray/black) scheme is the standard, precise way to reason about and implement this correctly.\n\nKahn\\\n\nStep 1 — Understand the topic.\nTopic: Coding: graph BFS/DFS, cycle detection, and connected components\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nfrom collections import deque\n\ndef bfs(graph, start):\n    queue = deque([start])\n    visited = {start}\n    order = []\n\n    while queue:\n        node = queue.popleft()\n        order.append(node)\n\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n\n    return order\n\ngraph = {\n    "A": ["B", "C"],\n    "B": ["D"],\n    "C": [],\n    "D": [],\n}\n\nprint(bfs(graph, "A"))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nfrom collections import deque\n\ngraph = {\n    "A": ["B", "C"],\n    "B": ["D"],\n    "C": [],\n    "D": [],\n}\n\nqueue = deque(["A"])\nseen = {"A"}\n\nwhile queue:\n    node = queue.popleft()\n    for neighbor in graph[node]:\n        if neighbor not in seen:\n            seen.add(neighbor)\n            queue.append(neighbor)\n\nprint(seen)\n```\n\nStep 5 — Example result:\n```text\n[\'A\', \'B\', \'C\', \'D\']\n```\n\nStep 6 — Complexity / trade-off:\nBFS/DFS are O(V + E) for adjacency-list graphs.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'Topological sort (via Kahn\\\n\nCoding practice: first explain the core/manual approach for **Coding: graph BFS/DFS, cycle detection, and connected components**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Use BFS specifically when you need SHORTEST PATH in an unweighted graph — DFS does not guarantee shortest path even though it also visits every reachable node.',
      'Use iterative DFS (explicit stack) instead of recursive DFS for graphs that could be large/deep, to avoid Python\'s recursion-depth limit.',
      'For directed-graph cycle detection, use the three-color (white/gray/black) technique — a plain visited set is insufficient and will produce false positives on legitimate DAG convergence.',
    ],
    tradeOffs:
      'An adjacency LIST is O(V + E) space and efficient for sparse graphs (most real-world graphs); an adjacency MATRIX is O(V²) space but gives O(1) edge-existence checks — appropriate mainly for dense graphs or when edge-existence queries dominate over neighbor-iteration.',
    commonMistakes: [
      'Using a plain visited set for DIRECTED-graph cycle detection, incorrectly flagging a DAG with converging paths as cyclic (the classic "visited but not currently on the path" false positive).',
      'Using recursive DFS on a graph that could be very large/deep, hitting Python\'s default recursion limit (`RecursionError`) in production on unexpectedly large input.',
      'Forgetting to mark a node visited BEFORE (or atomically with) enqueueing it in BFS, causing the same node to be enqueued multiple times and processed redundantly.',
    ],
    followUpQuestions: [
      'Why does undirected-graph cycle detection only need to track the "parent" node, while directed-graph cycle detection needs the full gray/black distinction?',
      'How would you find the shortest path in a WEIGHTED graph (hint: Dijkstra\'s algorithm, using a heap — a preview of the next question)?',
      'How would you detect a cycle in a directed graph using Kahn\'s algorithm (BFS/in-degree) instead of DFS coloring?',
    ],
    relatedTopics: ['Graphs', 'BFS', 'DFS', 'Cycle Detection', 'Topological Sort', 'Connected Components'],
  },
  {
    id: 'python-m8-9',
    number: 'PY-M8-9',
    title: 'Coding: Kth largest element and top-K frequent elements (heap)',
    difficulty: 'Medium',
    experienceLevel: '2–4 Years',
    category: 'Heap',
    expectedAnswer:
      'Python\'s `heapq` module implements a MIN-heap only — finding the Kth LARGEST element (or top-K largest) efficiently uses a min-heap of size K (push everything, but pop the smallest whenever the heap exceeds size K), giving O(n log k), far better than sorting the entire array (O(n log n)) when k is small relative to n.',
    deepExplanation:
      '```python\nimport heapq\nfrom collections import Counter\n\ndef kth_largest(nums: list[int], k: int) -> int:\n    heap = []\n    for num in nums:\n        heapq.heappush(heap, num)\n        if len(heap) > k:\n            heapq.heappop(heap)   # discard the current smallest, keeping only the top k largest\n    return heap[0]   # the smallest of the k largest IS the kth largest overall\n\ndef top_k_frequent(nums: list[int], k: int) -> list[int]:\n    counts = Counter(nums)\n    return [item for item, _ in heapq.nlargest(k, counts.items(), key=lambda pair: pair[1])]\n\ndef simulate_max_heap(nums: list[int]) -> list[int]:\n    # heapq is min-heap ONLY — negate values to simulate a max-heap when needed\n    max_heap = [-n for n in nums]\n    heapq.heapify(max_heap)      # O(n) — faster than n individual heappush calls (O(n log n))\n    heapq.heappush(max_heap, -25)\n    largest = -heapq.heappop(max_heap)\n    return [largest]\n```\nDry run kth_largest([3,2,1,5,6,4], k=2): push 3 heap=[3]; push2 heap=[2,3]; push1 heap=[1,3,2] size3>2 pop1 heap=[2,3]; push5 heap=[2,3,5] size3>2 pop2 heap=[3,5]; push6 heap=[3,5,6] size3>2 pop3 heap=[5,6]; push4 heap=[4,6,5] size3>2 pop4 heap=[5,6] -> heap[0]=5, the 2nd largest (sorted desc: 6,5,4,3,2,1 -> 2nd largest is 5). Correct.\n\nWhy `heapq.heapify()` (O(n)) beats building the heap via repeated `heappush()` calls (O(n log n) total): heapify uses a bottom-up "sift down" process that does less total work than inserting elements one at a time from an initially-empty heap — an important complexity distinction to be able to state precisely in a senior interview.\n\n`heapq.nlargest(k, iterable, key=...)` internally uses this same size-bounded-heap technique and is the idiomatic, already-optimized standard-library call for "give me the top k" — worth knowing both the manual technique (to demonstrate understanding) and the built-in shortcut (for actual production code).\n\nStep 1 — Understand the topic.\nTopic: Coding: Kth largest element and top-K frequent elements (heap)\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\nimport heapq\n\ndef kth_largest(values: list[int], k: int) -> int:\n    heap: list[int] = []\n\n    for value in values:\n        heapq.heappush(heap, value)\n        if len(heap) > k:\n            heapq.heappop(heap)\n\n    return heap[0]\n\nprint(kth_largest([3,2,1,5,6,4], 2))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nimport heapq\n\nprint(heapq.nlargest(\n    2,\n    [3,2,1,5,6,4],\n)[-1])\n```\n\nStep 5 — Example result:\n```text\n5\n```\n\nStep 6 — Complexity / trade-off:\nHeap solution is O(n log k) time and O(k) space.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'A "trending topics" or "top-10 most-viewed products right now" feature over a continuously updating stream of events is a direct real-world application of the size-bounded min-heap pattern — it maintains the current top-K in O(log k) per new event, without ever re-sorting the full historical dataset.\n\nCoding practice: first explain the core/manual approach for **Coding: Kth largest element and top-K frequent elements (heap)**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Use a min-heap bounded to size K to find the top-K largest elements in O(n log k) — much better than a full O(n log n) sort when k is small relative to n.',
      'Use `heapq.heapify()` (O(n)) to build a heap from an existing list, rather than looping `heappush()` calls (O(n log n)) when you already have all the initial data upfront.',
      'Remember `heapq` is min-heap-only — negate values (or use `heapq.nlargest`) when you conceptually need a max-heap.',
    ],
    tradeOffs:
      'The bounded-heap approach is O(n log k) time / O(k) space, strictly better than full sorting (O(n log n) time / O(n) space) when k << n; for k close to n, the advantage shrinks and a full sort becomes simpler to reason about with comparable performance.',
    commonMistakes: [
      'Sorting the ENTIRE array (O(n log n)) to find just the top-k when k is small, when a bounded min-heap (O(n log k)) would be significantly faster for large n.',
      'Forgetting `heapq` is a min-heap and pushing raw values expecting max-heap behavior, then reading the wrong end of the heap for the "largest" element.',
      'Rebuilding the heap from scratch (`heapq.heapify()`) on every new streaming element instead of incrementally maintaining the bounded heap with push/pop.',
    ],
    followUpQuestions: [
      'How would you maintain a running top-K over a continuous, unbounded STREAM of numbers, rather than a fixed input array?',
      'How does `heapq.heapify()` achieve O(n) construction, and why is that faster than n individual O(log n) pushes?',
      'How would you implement a max-heap cleanly without manually negating every value, using a small wrapper class with a custom `__lt__`?',
    ],
    relatedTopics: ['Heap', 'Priority Queue', 'heapq', 'Top-K Problems', 'Kth Largest Element'],
  },
  {
    id: 'python-m8-10',
    number: 'PY-M8-10',
    title: 'Coding: dynamic programming — climbing stairs, coin change, and longest increasing subsequence',
    difficulty: 'Hard',
    experienceLevel: '4+ Years',
    category: 'Dynamic Programming',
    expectedAnswer:
      'Dynamic programming solves problems with OVERLAPPING SUBPROBLEMS and OPTIMAL SUBSTRUCTURE by caching (memoizing) subproblem results instead of recomputing them — either top-down (recursion + a cache, via `functools.lru_cache` or a manual dict) or bottom-up (an iterative table, usually more space-efficient and avoiding recursion-depth limits).',
    deepExplanation:
      '```python\nfrom functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef climbing_stairs(n: int) -> int:   # ways to reach step n taking 1 or 2 steps at a time\n    if n <= 2:\n        return n\n    return climbing_stairs(n - 1) + climbing_stairs(n - 2)   # same recurrence shape as Fibonacci\n\ndef coin_change(coins: list[int], amount: int) -> int:\n    INF = float("inf")\n    dp = [0] + [INF] * amount   # dp[i] = fewest coins to make amount i\n    for i in range(1, amount + 1):\n        for coin in coins:\n            if coin <= i:\n                dp[i] = min(dp[i], dp[i - coin] + 1)\n    return dp[amount] if dp[amount] != INF else -1\n\ndef longest_increasing_subsequence(nums: list[int]) -> int:\n    if not nums:\n        return 0\n    dp = [1] * len(nums)   # dp[i] = length of the longest increasing subsequence ENDING at i\n    for i in range(1, len(nums)):\n        for j in range(i):\n            if nums[j] < nums[i]:\n                dp[i] = max(dp[i], dp[j] + 1)\n    return max(dp)\n\ndef house_robber(nums: list[int]) -> int:\n    rob_prev, skip_prev = 0, 0   # rolling variables — O(1) space instead of a full dp array\n    for num in nums:\n        rob_prev, skip_prev = skip_prev + num, max(rob_prev, skip_prev)\n    return max(rob_prev, skip_prev)\n```\nDry run coin_change([1,2,5], amount=11): dp=[0,INF*11]; i=1: coin1<=1 dp[1]=min(INF,dp[0]+1)=1; i=2: coin1 dp[2]=min(INF,dp[1]+1)=2, coin2 dp[2]=min(2,dp[0]+1)=1; ... continuing this fills dp up to dp[11]=3 (5+5+1).\n\nWhy `coin_change` is O(amount · len(coins)) rather than exponential brute force: the brute-force recursive "try every coin at every remaining amount" approach recomputes the SAME sub-amount over and over (e.g. reaching remaining amount 3 via many different coin sequences) — the `dp` array caches "fewest coins for THIS amount" exactly once, so each (amount, coin) pair is considered exactly once total.\n\n`house_robber`\\\n\nStep 1 — Understand the topic.\nTopic: Coding: dynamic programming — climbing stairs, coin change, and longest increasing subsequence\n\nStep 2 — Easy method.\nIdentify the core Python rule or algorithm pattern, trace a small example, and only then optimize.\n\nStep 3 — WITHOUT BUILT-IN / CORE Python:\n```python\ndef climb_stairs(n: int) -> int:\n    if n <= 2:\n        return n\n\n    previous, current = 1, 2\n    for _ in range(3, n + 1):\n        previous, current = (\n            current,\n            previous + current,\n        )\n\n    return current\n\nprint(climb_stairs(5))\n```\n\nStep 4 — WITH BUILT-IN / PYTHONIC / STANDARD-LIBRARY Python:\n```python\nfrom functools import reduce\n\nprint(reduce(\n    lambda pair, _: (pair[1], pair[0] + pair[1]),\n    range(2, 5),\n    (1, 2),\n)[1])\n```\n\nStep 5 — Example result:\n```text\n8\n```\n\nStep 6 — Complexity / trade-off:\nIterative DP is O(n) time and O(1) extra space for climbing stairs.\n\nStep 7 — Edge cases:\nCheck empty input, None, invalid types, boundaries, duplicates, mutation/aliasing, exceptions, large input, and concurrency/lifecycle behavior where applicable.\n\nStep 8 — Interview takeaway:\nExplain the rule first, demonstrate the core implementation, compare the Pythonic/standard-library option, then give complexity, failure modes, and production trade-offs.',
    productionExample:
      'Coin-change-style DP (minimum resources to reach a target, given a fixed set of "denominations") shows up directly in real inventory/packing problems — e.g. "what is the minimum number of shipping boxes (from a fixed set of box sizes) needed to ship exactly N items" is structurally the identical DP recurrence.\n\nCoding practice: first explain the core/manual approach for **Coding: dynamic programming — climbing stairs, coin change, and longest increasing subsequence**, then compare it with the Pythonic or standard-library form where appropriate.',
    bestPractices: [
      'Start by clearly defining the DP state (`dp[i]` = "the answer to the subproblem of size i") in words BEFORE writing the recurrence — this is what interviewers are actually listening for, more than the final code.',
      'Prefer bottom-up (iterative, table-filling) DP over top-down (recursive + memoized) for production code — it avoids Python\'s recursion-depth limit entirely and is usually easier to further optimize to O(1) space.',
      'After a working O(n)-space DP solution, always check whether the recurrence only depends on a FIXED small window of previous states (like `house_robber`\'s last two) — if so, collapse it to rolling variables for O(1) space.',
    ],
    tradeOffs:
      'Top-down memoized recursion is often easier to derive directly from the natural recursive problem definition, but risks `RecursionError` on large inputs and carries call-stack overhead; bottom-up iterative DP avoids both, at the cost of needing to think through the correct FILL ORDER of the table upfront (which top-down recursion handles automatically via the call graph).',
    commonMistakes: [
      'Writing the naive exponential recursive solution (no memoization) for a problem with clear overlapping subproblems, missing the DP opportunity entirely.',
      'Off-by-one errors in DP array sizing/indexing — a very common source of bugs, e.g. forgetting `coin_change`\'s `dp` array needs `amount + 1` slots (indices 0 through amount, inclusive).',
      'Missing that a solution can be optimized from O(n) space to O(1) once the recurrence is shown to depend only on a small fixed window of prior states.',
    ],
    followUpQuestions: [
      'How would you modify `coin_change` to also return the ACTUAL set of coins used, not just the count?',
      'How would you find the Longest Increasing Subsequence in O(n log n) instead of the O(n²) shown here (hint: binary search on a "tails" array)?',
      'How does `house_robber` change if the houses are arranged in a CIRCLE (the first and last house are now adjacent)?',
    ],
    relatedTopics: ['Dynamic Programming', 'Memoization', 'Coin Change', 'Longest Increasing Subsequence', 'Space Optimization'],
  },
];

export const MOCK_PYTHON_MODULE8_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = QUESTION_SEEDS.map((seed) => ({
  detail: {
    id: seed.id,
    questionNumber: seed.number,
    title: seed.title,
    difficulty: seed.difficulty,
    companies: COMPANIES,
    frequency: FREQUENCY_BY_DIFFICULTY[seed.difficulty],
    category: seed.category,
    part: 'Python',
    concepts: seed.relatedTopics,
    solved: false,
    attempted: false,
    bookmarked: false,
    questionType: 'technical',
    experienceLevel: seed.experienceLevel,
    question: seed.title,
  },
  answer: {
    expectedAnswer: seed.expectedAnswer,
    deepExplanation: seed.deepExplanation,
    productionExample: seed.productionExample,
    bestPractices: seed.bestPractices,
    tradeOffs: seed.tradeOffs,
    commonMistakes: seed.commonMistakes,
    followUpQuestions: seed.followUpQuestions,
    relatedTopics: seed.relatedTopics,
  },
}));