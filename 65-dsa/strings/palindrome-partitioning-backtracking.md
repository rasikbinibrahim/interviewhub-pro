# Q6544 · Palindrome Partitioning (Backtracking + DP Expansion)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Strings  
**Concepts:** strings, backtracking, recursion, palindrome, dynamic-programming  

## Problem Statement

Given a string `s`, partition `s` such that every substring of the partition is a **palindrome**. Return all possible palindrome partitioning of `s`.

## Input

- `s`: `string` — input string

## Output

- `string[][]` — 2D array of palindrome partitions

## Constraints

- `1 <= s.length <= 16`
- `s` contains only lowercase English letters.

## Examples

| Input | Output | Why |
|---|---|---|
| `s = "aab"` | `[["a","a","b"],["aa","b"]]` | Valid partitions where every substring is a palindrome |
| `s = "a"` | `[["a"]]` | Single character |

## Edge Cases

- Single character `"a"` -> `[["a"]]`
- All identical characters `"aaa"` -> returns all combinations of length 1, 2, and 3 substrings

## Hints

1. **Backtracking Decision Tree**: Explore all possible prefix splits starting at index `start`.
2. Loop `end` from `start` to `s.length - 1`.
3. Check if substring `s[start...end]` is a palindrome.
4. If `true`, push `s[start...end]` into `currentPath`, recurse `backtrack(end + 1, currentPath)`, then backtrack by popping the last element.
5. Base Case: When `start === s.length`, push a copy of `currentPath` into `result`.

## Algorithm

**Pattern:** Substring Partitioning Backtracking  
**Core Insight:** Recursively partitioning string prefixes while checking palindrome validity prunes non-palindrome search branches early in the state tree.

## Dry Run

`s = "aab"`:
- `start = 0`:
  - `end = 0 ("a")`: Palindrome! `path = ["a"]`. Recurse `start = 1`:
    - `end = 1 ("a")`: Palindrome! `path = ["a", "a"]`. Recurse `start = 2`:
      - `end = 2 ("b")`: Palindrome! `path = ["a", "a", "b"]`. `start = 3` -> Add `["a", "a", "b"]` to result.
    - `end = 2 ("ab")`: Not palindrome -> Skip.
  - `end = 1 ("aa")`: Palindrome! `path = ["aa"]`. Recurse `start = 2`:
    - `end = 2 ("b")`: Palindrome! `path = ["aa", "b"]`. `start = 3` -> Add `["aa", "b"]` to result.
  - `end = 2 ("aab")`: Not palindrome -> Skip.
- Result: `[["a", "a", "b"], ["aa", "b"]]`.

## JavaScript Solution

```js
function partition(s) {
  const result = [];

  function isPalindrome(str, left, right) {
    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }
    return true;
  }

  function backtrack(start, currentPath) {
    if (start === s.length) {
      result.push([...currentPath]);
      return;
    }

    for (let end = start; end < s.length; end++) {
      if (isPalindrome(s, start, end)) {
        currentPath.push(s.substring(start, end + 1));
        backtrack(end + 1, currentPath);
        currentPath.pop(); // Backtrack
      }
    }
  }

  backtrack(0, []);
  return result;
}
```

## TypeScript Solution

```ts
function partition(s: string): string[][] {
  const result: string[][] = [];

  function isPalindrome(str: string, left: number, right: number): boolean {
    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }
    return true;
  }

  function backtrack(start: number, currentPath: string[]): void {
    if (start === s.length) {
      result.push([...currentPath]);
      return;
    }

    for (let end = start; end < s.length; end++) {
      if (isPalindrome(s, start, end)) {
        currentPath.push(s.substring(start, end + 1));
        backtrack(end + 1, currentPath);
        currentPath.pop();
      }
    }
  }

  backtrack(0, []);
  return result;
}
```

## Time Complexity

`O(N * 2^N)` — worst case for string of identical characters (`"aaaa"`).

## Space Complexity

`O(N)` — call stack depth and path array space.

## Common Mistakes

- Forgetting to push a shallow copy `[...currentPath]` into `result`, storing mutated array references.

## Follow-Up Questions

1. How would you solve Palindrome Partitioning II (minimum cuts required to partition string into palindromes)? (Use 1D DP).

## Similar Questions

- Palindrome Partitioning II
- Subsets
