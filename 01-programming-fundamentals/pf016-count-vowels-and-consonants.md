# PF016 · Count Vowels and Consonants in a String

**Difficulty:** Easy  
**Companies Asked:** Amazon, Microsoft, TCS, Infosys, Wipro  
**Interview Frequency:** ★★★★★  
**Category:** Programming Fundamentals  
**Concepts:** strings, vowels, consonants, loops, character-checking  

## Problem Statement

Write a function that takes a string `str` and returns an object containing the counts of **Vowels** (`a, e, i, o, u` case-insensitive) and **Consonants** (all other English letters). Ignore spaces, digits, and punctuation symbols.

## Input

- `str`: `string` — input string

## Output

- `{ vowels: number, consonants: number }`

## Constraints

- `0 <= str.length <= 10^4`
- `str` contains ASCII characters.

## Examples

| Input | Output | Explanation |
|---|---|---|
| `str = "Hello World!"` | `{ vowels: 3, consonants: 7 }` | Vowels: e, o, o (3). Consonants: H, l, l, W, r, l, d (7) |
| `str = "123 JavaScript"` | `{ vowels: 3, consonants: 7 }` | Vowels: a, a, i (3). Consonants: J, v, S, c, r, p, t (7) |

## Edge Cases

- Empty string `""` -> returns `{ vowels: 0, consonants: 0 }`

## Hints

1. Maintain `vowels = 0` and `consonants = 0`.
2. Convert string to lowercase `char.toLowerCase()`.
3. Check if character is an English letter (`char >= 'a' && char <= 'z'`).
4. If it's in `'aeiou'`: `vowels++`. Else: `consonants++`.

## Algorithm

**Pattern:** ASCII Character Categorization Iteration  
**Core Insight:** Filtering character codes for English alphabet ranges before testing vowel inclusion ensures digits and punctuation are ignored cleanly in $O(N)$ time.

## Dry Run

`str = "Hello"`:
- 'h': Consonant -> `consonants = 1`.
- 'e': Vowel -> `vowels = 1`.
- 'l': Consonant -> `consonants = 2`.
- 'l': Consonant -> `consonants = 3`.
- 'o': Vowel -> `vowels = 2`.
- Return `{ vowels: 2, consonants: 3 }`.

## JavaScript Solution

```js
function countVowelsAndConsonants(str) {
  let vowels = 0;
  let consonants = 0;

  const vowelSet = new Set(['a', 'e', 'i', 'o', 'u']);

  for (let i = 0; i < str.length; i++) {
    const char = str[i].toLowerCase();

    // Check if character is an English letter
    if (char >= 'a' && char <= 'z') {
      if (vowelSet.has(char)) {
        vowels++;
      } else {
        consonants++;
      }
    }
  }

  return { vowels, consonants };
}
```

## TypeScript Solution

```ts
interface CharacterCount {
  vowels: number;
  consonants: number;
}

function countVowelsAndConsonants(str: string): CharacterCount {
  let vowels = 0;
  let consonants = 0;

  const vowelSet = new Set<string>(['a', 'e', 'i', 'o', 'u']);

  for (let i = 0; i < str.length; i++) {
    const char = str[i].toLowerCase();

    if (char >= 'a' && char <= 'z') {
      if (vowelSet.has(char)) {
        vowels++;
      } else {
        consonants++;
      }
    }
  }

  return { vowels, consonants };
}
```

## Time Complexity

`O(N)` — single linear pass through string.

## Space Complexity

`O(1)` — fixed 5-element Vowel Set.

## Common Mistakes

- Treating spaces and numbers as consonants by simply using `else` without checking if `char >= 'a' && char <= 'z'`.

## Follow-Up Questions

1. How would you handle accented unicode vowels (`é`, `ü`) using JavaScript `String.prototype.normalize('NFD')`?

## Similar Questions

- Check if a String is a Palindrome
- Reverse Words in a String
