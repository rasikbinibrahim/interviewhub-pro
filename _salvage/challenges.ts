export interface TestCase {
  id: number;
  input: unknown[];
  expected?: unknown;
  description: string;
  isAsync?: boolean;
}

export interface CodeChallenge {
  subTopic?: string;
  questionId: number;
  title: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Coding';
  description: string;
  constraints: string[];
  forbidden: string[];
  forbiddenErrorMessage: string;
  boilerplate: string;
  tests: TestCase[];
  functionName?: string;
}

export const CODE_CHALLENGES: CodeChallenge[] = [
  {
    "questionId": 58,
    "title": "Two Sum Problem",
    "topic": "JavaScript",
    "subTopic": "Array Problems",
    "difficulty": "Coding",
    "description": "Given an array of integers `nums` and an integer `target`, write a function `twoSum(nums, target)` that returns the indices of the two numbers such that they add up to the `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    "constraints": [
      "Can assume exactly one valid solution exists",
      "Indices returned must be 0-indexed",
      "You cannot reuse the element at the same index twice",
      "An optimal O(N) time complexity using a HashMap/Object is preferred over O(N^2) brute force"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function twoSum(nums, target) {\n    // Write your code here\n    \n  }",
    "tests": [
      {
        "id": 1,
        "input": [
          [
            2,
            7,
            11,
            15
          ],
          9
        ],
        "expected": [
          0,
          1
        ],
        "description": "Finds two sum at start of array"
      },
      {
        "id": 2,
        "input": [
          [
            3,
            2,
            4
          ],
          6
        ],
        "expected": [
          1,
          2
        ],
        "description": "Finds two sum with non-sorted numbers"
      },
      {
        "id": 3,
        "input": [
          [
            3,
            3
          ],
          6
        ],
        "expected": [
          0,
          1
        ],
        "description": "Finds two sum with identical numbers"
      },
      {
        "id": 4,
        "input": [
          [
            -1,
            -2,
            -3,
            -4,
            -5
          ],
          -8
        ],
        "expected": [
          2,
          4
        ],
        "description": "Finds two sum with negative integers"
      }
    ]
  },
  {
    "questionId": 59,
    "title": "Product of Array Except Self",
    "topic": "JavaScript",
    "subTopic": "Array Problems",
    "difficulty": "Coding",
    "description": "Write a function `productExceptSelf(nums)` that takes an array of integers and returns an output array where each element `output[i]` is the product of all elements in `nums` except `nums[i]`.\n\nYou are NOT allowed to use the division operator (`/`). The solution must run in O(N) time and use O(N) space for the output.",
    "constraints": [
      "Must not use the division operator '/'",
      "Time complexity must be O(N)",
      "Space complexity O(N) for the output array is acceptable",
      "Use prefix and suffix product arrays or a single pass approach",
      "Input array will have at least 2 elements"
    ],
    "forbidden": [
      "\\/ "
    ],
    "forbiddenErrorMessage": "Forbidden: You cannot use the division operator '/' in your solution!",
    "boilerplate": "function productExceptSelf(nums) {\n    // Write your code here (No division operator!)\n    // Hint: Use prefix products and suffix products\n    \n  }",
    "tests": [
      {
        "id": 1,
        "input": [
          [
            1,
            2,
            3,
            4
          ]
        ],
        "expected": [
          24,
          12,
          8,
          6
        ],
        "description": "Standard 4-element array"
      },
      {
        "id": 2,
        "input": [
          [
            -1,
            1,
            0,
            -3,
            3
          ]
        ],
        "expected": [
          0,
          0,
          9,
          0,
          0
        ],
        "description": "Array containing zero"
      },
      {
        "id": 3,
        "input": [
          [
            2,
            3
          ]
        ],
        "expected": [
          3,
          2
        ],
        "description": "Minimal 2-element array"
      },
      {
        "id": 4,
        "input": [
          [
            1,
            1,
            1,
            1
          ]
        ],
        "expected": [
          1,
          1,
          1,
          1
        ],
        "description": "Array of all ones"
      },
      {
        "id": 5,
        "input": [
          [
            -2,
            -3,
            4
          ]
        ],
        "expected": [
          -12,
          -8,
          6
        ],
        "description": "Array with negative numbers"
      }
    ]
  },
  {
    "questionId": 1015,
    "title": "Three Sum",
    "topic": "JavaScript",
    "subTopic": "Array Problems",
    "difficulty": "Coding",
    "description": "Write a function `threeSum(nums)` that finds all unique triplets summing to zero.",
    "constraints": [
      "No duplicate triplets",
      "Each triplet sorted ascending"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function threeSum(nums) {\n  // Find all unique triplets that sum to 0\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          [
            -1,
            0,
            1,
            2,
            -1,
            -4
          ]
        ],
        "expected": [
          [
            -1,
            -1,
            2
          ],
          [
            -1,
            0,
            1
          ]
        ],
        "description": "Two unique triplets"
      },
      {
        "id": 2,
        "input": [
          [
            0,
            1,
            1
          ]
        ],
        "expected": [],
        "description": "No valid triplet"
      },
      {
        "id": 3,
        "input": [
          [
            0,
            0,
            0
          ]
        ],
        "expected": [
          [
            0,
            0,
            0
          ]
        ],
        "description": "Triple zero"
      }
    ]
  },
  {
    "questionId": 1020,
    "title": "Rotate Array",
    "topic": "JavaScript",
    "subTopic": "Array Problems",
    "difficulty": "Coding",
    "description": "Write a function `rotateArray(nums, k)` that rotates array right by k steps. [1,2,3,4,5], k=2 -> [4,5,1,2,3].",
    "constraints": [
      "Right rotation",
      "k can exceed length: use k % length"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function rotateArray(nums, k) {\n  // Rotate right by k steps\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          [
            1,
            2,
            3,
            4,
            5,
            6,
            7
          ],
          3
        ],
        "expected": [
          5,
          6,
          7,
          1,
          2,
          3,
          4
        ],
        "description": "Rotate by 3"
      },
      {
        "id": 2,
        "input": [
          [
            -1,
            -100,
            3,
            99
          ],
          2
        ],
        "expected": [
          3,
          99,
          -1,
          -100
        ],
        "description": "Negatives by 2"
      },
      {
        "id": 3,
        "input": [
          [
            1,
            2,
            3
          ],
          0
        ],
        "expected": [
          1,
          2,
          3
        ],
        "description": "k=0"
      },
      {
        "id": 4,
        "input": [
          [
            1,
            2,
            3
          ],
          3
        ],
        "expected": [
          1,
          2,
          3
        ],
        "description": "Full rotation"
      }
    ]
  },
  {
    "questionId": 1046,
    "title": "Sum of Nested Array",
    "topic": "JavaScript",
    "subTopic": "Nested Array Problems",
    "difficulty": "Coding",
    "description": "Write a function `sumNestedArray(arr)` that recursively sums all values in a deeply nested array.",
    "constraints": [
      "Any depth",
      "Sum all leaf values",
      "No .flat()"
    ],
    "forbidden": [
      "\\.flat\\("
    ],
    "forbiddenErrorMessage": "Forbidden: Do not use .flat()! Implement recursion.",
    "boilerplate": "function sumNestedArray(arr) {\n  // Sum all values in nested array\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          [
            1,
            [
              2,
              [
                3,
                [
                  100
                ]
              ]
            ]
          ]
        ],
        "expected": 106,
        "description": "1+2+3+100 = 106"
      },
      {
        "id": 2,
        "input": [
          [
            1,
            2,
            3,
            4
          ]
        ],
        "expected": 10,
        "description": "Flat sum"
      },
      {
        "id": 3,
        "input": [
          [
            1,
            [
              2,
              [
                3
              ]
            ]
          ]
        ],
        "expected": 6,
        "description": "1+2+3 = 6"
      },
      {
        "id": 4,
        "input": [
          []
        ],
        "expected": 0,
        "description": "Empty = 0"
      }
    ]
  },
  {
    "questionId": 1050,
    "title": "Flatten Object",
    "topic": "JavaScript",
    "subTopic": "Object Problems",
    "difficulty": "Coding",
    "description": "Write a function `flattenObject(obj)` that flattens nested object using dot-notation. { a: { b: 1 } } -> { 'a.b': 1 }.",
    "constraints": [
      "Dot notation for nested keys",
      "Return single-level object"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function flattenObject(obj) {\n  // Flatten: { a: { b: 1 } } -> { 'a.b': 1 }\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          {
            "a": {
              "b": {
                "c": 1
              }
            }
          }
        ],
        "expected": {
          "a.b.c": 1
        },
        "description": "Deep key flattened"
      },
      {
        "id": 2,
        "input": [
          {
            "a": 1,
            "b": 2
          }
        ],
        "expected": {
          "a": 1,
          "b": 2
        },
        "description": "Already flat"
      },
      {
        "id": 3,
        "input": [
          {
            "x": {
              "y": 1
            },
            "z": 2
          }
        ],
        "expected": {
          "x.y": 1,
          "z": 2
        },
        "description": "Mixed depth"
      },
      {
        "id": 4,
        "input": [
          {
            "a": {
              "b": 1,
              "c": 2
            }
          }
        ],
        "expected": {
          "a.b": 1,
          "a.c": 2
        },
        "description": "Sibling keys"
      }
    ]
  },
  {
    "questionId": 1084,
    "title": "Remove Duplicates (Array)",
    "topic": "JavaScript",
    "subTopic": "Array Problems",
    "difficulty": "Coding",
    "description": "Write a function `removeDuplicates(arr)` that returns a new array with duplicate values removed without using the native `Set` class.",
    "constraints": [
      "No Set allowed",
      "Time Complexity O(N)",
      "Preserve order of first appearances"
    ],
    "forbidden": [
      "new\\s+Set"
    ],
    "forbiddenErrorMessage": "Forbidden: You cannot use the Set class!",
    "boilerplate": "function removeDuplicates(arr) {\n  // Write your code here (No Set allowed)\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          [
            1,
            2,
            2,
            3,
            4,
            4,
            5
          ]
        ],
        "expected": [
          1,
          2,
          3,
          4,
          5
        ],
        "description": "Deduplicates numbers"
      },
      {
        "id": 2,
        "input": [
          [
            "a",
            "b",
            "a",
            "c"
          ]
        ],
        "expected": [
          "a",
          "b",
          "c"
        ],
        "description": "Deduplicates strings"
      },
      {
        "id": 3,
        "input": [
          []
        ],
        "expected": [],
        "description": "Empty array"
      }
    ]
  },
  {
    "questionId": 56,
    "title": "Reverse a String (Polyfill)",
    "topic": "JavaScript",
    "subTopic": "String Problems",
    "difficulty": "Coding",
    "description": "Write a function `reverseString(str)` that takes a string and returns it reversed. You are NOT allowed to use the built-in `.reverse()`, `.split()`, or `Array.from()` methods. Implement a purely algorithmic, character-by-character approach.",
    "constraints": [
      "Must not use Array.prototype.reverse()",
      "Must not use String.prototype.split()",
      "Must not use Array.from()",
      "Time complexity should be O(n) where n is string length.",
      "Space complexity should be O(n) to store the reversed string."
    ],
    "forbidden": [
      "\\.reverse\\(",
      "\\.split\\(",
      "Array\\.from\\("
    ],
    "forbiddenErrorMessage": "Forbidden: You cannot use .reverse(), .split(), or Array.from() built-in helpers!",
    "boilerplate": "function reverseString(str) {\n    // Write your code here (No .reverse(), .split(), or Array.from())\n    \n  }",
    "tests": [
      {
        "id": 1,
        "input": [
          "hello"
        ],
        "expected": "olleh",
        "description": "Reverses a simple lowercase word"
      },
      {
        "id": 2,
        "input": [
          "React"
        ],
        "expected": "tcaeR",
        "description": "Reverses a word with mixed case"
      },
      {
        "id": 3,
        "input": [
          "a"
        ],
        "expected": "a",
        "description": "Handles single character strings"
      },
      {
        "id": 4,
        "input": [
          "type script"
        ],
        "expected": "tpircs epyt",
        "description": "Handles strings with spaces"
      },
      {
        "id": 5,
        "input": [
          "2026"
        ],
        "expected": "6202",
        "description": "Handles digits in a string"
      },
      {
        "id": 6,
        "input": [
          "?"
        ],
        "expected": "?",
        "description": "Handles special characters"
      },
      {
        "id": 7,
        "input": [
          ""
        ],
        "expected": "",
        "description": "Handles empty strings"
      }
    ]
  },
  {
    "questionId": 57,
    "title": "Palindrome Check (Polyfill)",
    "topic": "JavaScript",
    "subTopic": "String Problems",
    "difficulty": "Coding",
    "description": "Write a function `isPalindrome(str)` that returns `true` if the given string reads the same forward and backward, and `false` otherwise. You are NOT allowed to use `.reverse()`, `.split()`, or `Array.from()` methods. Implement a two-pointer algorithmic approach.",
    "constraints": [
      "Must not use Array.prototype.reverse()",
      "Must not use String.prototype.split()",
      "Must not use Array.from()",
      "Use a two-pointer technique: compare characters from both ends",
      "Must be case-sensitive (e.g. 'Aba' is NOT a palindrome)",
      "Time complexity: O(n). Space complexity: O(1)."
    ],
    "forbidden": [
      "\\.reverse\\(",
      "\\.split\\(",
      "Array\\.from\\("
    ],
    "forbiddenErrorMessage": "Forbidden: You cannot use .reverse(), .split(), or Array.from() built-in helpers!",
    "boilerplate": "function isPalindrome(str) {\n    // Write your code here (No .reverse(), .split(), or Array.from())\n    // Hint: Two-pointer approach — compare str[left] === str[right]\n    \n  }",
    "tests": [
      {
        "id": 1,
        "input": [
          "racecar"
        ],
        "expected": true,
        "description": "Classic palindrome word"
      },
      {
        "id": 2,
        "input": [
          "hello"
        ],
        "expected": false,
        "description": "Non-palindrome word"
      },
      {
        "id": 3,
        "input": [
          "a"
        ],
        "expected": true,
        "description": "Single character is always a palindrome"
      },
      {
        "id": 4,
        "input": [
          ""
        ],
        "expected": true,
        "description": "Empty string is considered a palindrome"
      },
      {
        "id": 5,
        "input": [
          "madam"
        ],
        "expected": true,
        "description": "Another classic palindrome"
      },
      {
        "id": 6,
        "input": [
          "Racecar"
        ],
        "expected": false,
        "description": "Case-sensitive: capital R makes it false"
      },
      {
        "id": 7,
        "input": [
          "12321"
        ],
        "expected": true,
        "description": "Numeric palindrome string"
      },
      {
        "id": 8,
        "input": [
          "abcba"
        ],
        "expected": true,
        "description": "Five-character palindrome"
      }
    ]
  },
  {
    "questionId": 60,
    "title": "Longest Substring Without Repeating Characters",
    "topic": "JavaScript",
    "subTopic": "String Problems",
    "difficulty": "Coding",
    "description": "Write a function `lengthOfLongestSubstring(s)` that, given a string `s`, returns the length of the longest substring without any repeating characters.\n\nUse the Sliding Window technique with a Set or Map for O(N) performance.",
    "constraints": [
      "Must return the length (a number), not the substring itself",
      "Time complexity should be O(N) using sliding window",
      "Space complexity is O(min(N, M)) where M is the charset size",
      "The string can contain letters, digits, symbols and spaces",
      "An empty string should return 0"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function lengthOfLongestSubstring(s) {\n    // Write your code here\n    // Hint: Sliding window with a Set to track characters in current window\n    \n  }",
    "tests": [
      {
        "id": 1,
        "input": [
          "abcabcbb"
        ],
        "expected": 3,
        "description": "abc is the longest unique substring"
      },
      {
        "id": 2,
        "input": [
          "bbbbb"
        ],
        "expected": 1,
        "description": "All same characters, length is 1"
      },
      {
        "id": 3,
        "input": [
          "pwwkew"
        ],
        "expected": 3,
        "description": "wke is the longest unique substring"
      },
      {
        "id": 4,
        "input": [
          ""
        ],
        "expected": 0,
        "description": "Empty string returns 0"
      },
      {
        "id": 5,
        "input": [
          "abcdef"
        ],
        "expected": 6,
        "description": "All unique characters, full length"
      },
      {
        "id": 6,
        "input": [
          " "
        ],
        "expected": 1,
        "description": "Single space character"
      },
      {
        "id": 7,
        "input": [
          "dvdf"
        ],
        "expected": 3,
        "description": "vdf is the longest unique substring"
      }
    ]
  },
  {
    "questionId": 61,
    "title": "Valid Parentheses Checker",
    "topic": "JavaScript",
    "subTopic": "String Problems",
    "difficulty": "Coding",
    "description": "Write a function `isValid(s)` that takes a string containing just the characters '(', ')', '{', '}', '[' and ']', and determines if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    "constraints": [
      "Must handle only brackets: '(', ')', '[', ']', '{', '}'",
      "Should return a boolean (true/false)",
      "An empty string is considered valid",
      "Use of a Stack data structure is recommended"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function isValid(s) {\n    // Write your code here (recommended: stack approach)\n    \n  }",
    "tests": [
      {
        "id": 1,
        "input": [
          "()"
        ],
        "expected": true,
        "description": "Simple matching parentheses"
      },
      {
        "id": 2,
        "input": [
          "()[]{}"
        ],
        "expected": true,
        "description": "Multiple adjacent matching parentheses"
      },
      {
        "id": 3,
        "input": [
          "(]"
        ],
        "expected": false,
        "description": "Mismatch parentheses"
      },
      {
        "id": 4,
        "input": [
          "([)]"
        ],
        "expected": false,
        "description": "Correct matching but incorrect order"
      },
      {
        "id": 5,
        "input": [
          "{[]}"
        ],
        "expected": true,
        "description": "Nested matching parentheses"
      },
      {
        "id": 6,
        "input": [
          "["
        ],
        "expected": false,
        "description": "Unclosed bracket"
      },
      {
        "id": 7,
        "input": [
          ""
        ],
        "expected": true,
        "description": "Empty string"
      }
    ]
  },
  {
    "questionId": 62,
    "title": "Group Anagrams",
    "topic": "JavaScript",
    "subTopic": "String Problems",
    "difficulty": "Coding",
    "description": "Write a function `groupAnagrams(strs)` that takes an array of strings and groups all anagrams together. An anagram is a word formed by rearranging the letters of another word (e.g. 'eat' and 'tea' are anagrams).\n\nReturn an array of groups where each group contains strings that are anagrams of each other. The order of groups and order within each group does not matter.",
    "constraints": [
      "Input is an array of lowercase English strings",
      "An empty string is its own group",
      "Time complexity: O(N * K log K) where K is the max string length",
      "Use a HashMap where the key is the sorted string characters"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function groupAnagrams(strs) {\n    // Write your code here\n    // Hint: Sort each string to create a canonical key, then group by key\n    \n  }",
    "tests": [
      {
        "id": 1,
        "input": [
          [
            "eat",
            "tea",
            "tan",
            "ate",
            "nat",
            "bat"
          ]
        ],
        "expected": [
          [
            "eat",
            "tea",
            "ate"
          ],
          [
            "tan",
            "nat"
          ],
          [
            "bat"
          ]
        ],
        "description": "Groups classic anagram sets"
      },
      {
        "id": 2,
        "input": [
          [
            ""
          ]
        ],
        "expected": [
          [
            ""
          ]
        ],
        "description": "Single empty string in its own group"
      },
      {
        "id": 3,
        "input": [
          [
            "a"
          ]
        ],
        "expected": [
          [
            "a"
          ]
        ],
        "description": "Single character in its own group"
      },
      {
        "id": 4,
        "input": [
          [
            "abc",
            "bca",
            "cab",
            "xyz",
            "zyx"
          ]
        ],
        "expected": [
          [
            "abc",
            "bca",
            "cab"
          ],
          [
            "xyz",
            "zyx"
          ]
        ],
        "description": "Two separate anagram groups"
      }
    ]
  },
  {
    "questionId": 1001,
    "title": "Character Frequency Count",
    "topic": "JavaScript",
    "subTopic": "String Problems",
    "difficulty": "Coding",
    "description": "Write a function `charFrequency(str)` that returns an object where keys are characters and values are their occurrence counts.",
    "constraints": [
      "Return plain object { char: count }",
      "Case-sensitive"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function charFrequency(str) {\n  // Return { char: count } object\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          "hello"
        ],
        "expected": {
          "h": 1,
          "e": 1,
          "l": 2,
          "o": 1
        },
        "description": "Counts each character"
      },
      {
        "id": 2,
        "input": [
          "aabbcc"
        ],
        "expected": {
          "a": 2,
          "b": 2,
          "c": 2
        },
        "description": "Handles repeated characters"
      },
      {
        "id": 3,
        "input": [
          "a"
        ],
        "expected": {
          "a": 1
        },
        "description": "Single character"
      },
      {
        "id": 4,
        "input": [
          ""
        ],
        "expected": {},
        "description": "Empty string"
      }
    ]
  },
  {
    "questionId": 1005,
    "title": "String Compression",
    "topic": "JavaScript",
    "subTopic": "String Problems",
    "difficulty": "Coding",
    "description": "Write a function `compressString(str)` using run-length encoding: 'aabbbcc' → 'a2b3c2'. Return original if compressed is not shorter.",
    "constraints": [
      "Only compress consecutive duplicates",
      "Return original if no benefit"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function compressString(str) {\n  // Run-length encoding: 'aabbbcc' -> 'a2b3c2'\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          "aabbbcc"
        ],
        "expected": "a2b3c2",
        "description": "Standard compression"
      },
      {
        "id": 2,
        "input": [
          "abc"
        ],
        "expected": "abc",
        "description": "No compression benefit"
      },
      {
        "id": 3,
        "input": [
          "aaaa"
        ],
        "expected": "a4",
        "description": "All same characters"
      },
      {
        "id": 4,
        "input": [
          "aaabbbccc"
        ],
        "expected": "a3b3c3",
        "description": "Triple groups"
      }
    ]
  },
  {
    "questionId": 1079,
    "title": "Anagram Check",
    "topic": "JavaScript",
    "subTopic": "String Problems",
    "difficulty": "Coding",
    "description": "Write a function `areAnagrams(str1, str2)` that returns true if the two strings are anagrams of each other (contain the same characters in any order). You are NOT allowed to use `.sort()`.",
    "constraints": [
      "No Array.prototype.sort()",
      "Time Complexity O(N) where N is length of strings",
      "Space Complexity O(1) if character set is fixed"
    ],
    "forbidden": [
      "\\.sort\\("
    ],
    "forbiddenErrorMessage": "Forbidden: You cannot use .sort()!",
    "boilerplate": "function areAnagrams(str1, str2) {\n  // Write your code here (No .sort())\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          "listen",
          "silent"
        ],
        "expected": true,
        "description": "Classic anagram pair"
      },
      {
        "id": 2,
        "input": [
          "hello",
          "bello"
        ],
        "expected": false,
        "description": "Different letters"
      },
      {
        "id": 3,
        "input": [
          "rat",
          "car"
        ],
        "expected": false,
        "description": "Different characters"
      },
      {
        "id": 4,
        "input": [
          "",
          ""
        ],
        "expected": true,
        "description": "Empty strings are anagrams"
      },
      {
        "id": 5,
        "input": [
          "aabb",
          "bbaa"
        ],
        "expected": true,
        "description": "Duplicated characters anagram"
      }
    ]
  },
  {
    "questionId": 63,
    "title": "Deep Clone Implementation",
    "topic": "JavaScript",
    "subTopic": "Object Problems",
    "difficulty": "Coding",
    "description": "Write a function `deepClone(obj)` that returns a completely deep-copied clone of the provided object. You are NOT allowed to use `JSON.stringify` / `JSON.parse` or the modern native `structuredClone()` function. \n\nYour solution must recursively copy nested objects and arrays.",
    "constraints": [
      "Must not use JSON.stringify() / JSON.parse()",
      "Must not use structuredClone()",
      "Must correctly duplicate nested objects",
      "Must correctly duplicate nested arrays",
      "Should handle null values"
    ],
    "forbidden": [
      "structuredClone",
      "JSON\\.stringify",
      "JSON\\.parse"
    ],
    "forbiddenErrorMessage": "Forbidden: You cannot use structuredClone() or JSON serialization helpers!",
    "boilerplate": "function deepClone(obj) {\n    // Write your code here (No structuredClone or JSON serialize)\n    \n  }",
    "tests": [
      {
        "id": 1,
        "input": [
          {
            "a": 1,
            "b": {
              "c": 2
            }
          }
        ],
        "expected": {
          "a": 1,
          "b": {
            "c": 2
          }
        },
        "description": "Clones object with nested keys"
      },
      {
        "id": 2,
        "input": [
          [
            1,
            [
              2,
              3
            ],
            {
              "x": 4
            }
          ]
        ],
        "expected": [
          1,
          [
            2,
            3
          ],
          {
            "x": 4
          }
        ],
        "description": "Clones arrays with mixed nested structures"
      },
      {
        "id": 3,
        "input": [
          null
        ],
        "expected": null,
        "description": "Handles null values correctly"
      },
      {
        "id": 4,
        "input": [
          {
            "name": "antigravity",
            "roles": [
              "coder",
              "helper"
            ]
          }
        ],
        "expected": {
          "name": "antigravity",
          "roles": [
            "coder",
            "helper"
          ]
        },
        "description": "Clones complex developer profile structure"
      }
    ]
  },
  {
    "questionId": 64,
    "title": "Debounce Implementation",
    "topic": "JavaScript",
    "subTopic": "Function Problems",
    "difficulty": "Coding",
    "description": "Implement a `debounce(fn, delay)` function that returns a debounced version of `fn`. The debounced function delays invoking `fn` until `delay` milliseconds have elapsed since the last time the debounced function was invoked.\n\nYou are NOT allowed to use `_.debounce` or any library debounce utility.",
    "constraints": [
      "Must return a new wrapper function",
      "The wrapped function must only execute after 'delay' ms since the last call",
      "Each new call before delay expires must reset the timer",
      "Must not use any external debounce library",
      "Use setTimeout and clearTimeout internally"
    ],
    "forbidden": [
      "_\\.debounce",
      "lodash"
    ],
    "forbiddenErrorMessage": "Forbidden: You cannot use _.debounce or any library utility!",
    "boilerplate": "function debounce(fn, delay) {\n    // Write your code here\n    // Hint: Use a timer variable, clearTimeout on each call, setTimeout to schedule\n    \n  }",
    "tests": [
      {
        "id": 1,
        "input": [
          null,
          100
        ],
        "expected": "function",
        "description": "Returns a function when called with fn and delay"
      },
      {
        "id": 2,
        "input": [
          null,
          200
        ],
        "expected": "delayed",
        "description": "Delays the function call correctly"
      },
      {
        "id": 3,
        "input": [
          null,
          50
        ],
        "expected": "reset",
        "description": "Resets timer on repeated calls"
      }
    ]
  },
  {
    "questionId": 65,
    "title": "Throttle Implementation",
    "topic": "JavaScript",
    "subTopic": "Function Problems",
    "difficulty": "Coding",
    "description": "Implement a `throttle(fn, limit)` function that returns a throttled version of `fn`. The throttled function ensures `fn` is called at most once every `limit` milliseconds, no matter how many times the throttled function is invoked.\n\nYou are NOT allowed to use `_.throttle` or any library throttle utility.",
    "constraints": [
      "Must return a new wrapper function",
      "The wrapped function must execute at most once per 'limit' ms interval",
      "Calls during the throttle window should be silently ignored",
      "Must not use any external throttle library",
      "Use Date.now() or setTimeout internally to track timing"
    ],
    "forbidden": [
      "_\\.throttle",
      "lodash"
    ],
    "forbiddenErrorMessage": "Forbidden: You cannot use _.throttle or any library utility!",
    "boilerplate": "function throttle(fn, limit) {\n    // Write your code here\n    // Hint: Track lastCallTime, compare with Date.now()\n    \n  }",
    "tests": [
      {
        "id": 1,
        "input": [
          null,
          100
        ],
        "expected": "function",
        "description": "Returns a function when called with fn and limit"
      },
      {
        "id": 2,
        "input": [
          null,
          200
        ],
        "expected": "throttled",
        "description": "Executes function only once in the time window"
      },
      {
        "id": 3,
        "input": [
          null,
          50
        ],
        "expected": "immediate",
        "description": "First call executes immediately"
      }
    ]
  },
  {
    "questionId": 66,
    "title": "Promise.all Polyfill",
    "topic": "JavaScript",
    "subTopic": "Polyfill Questions",
    "difficulty": "Coding",
    "description": "Implement a function `promiseAll(promises)` that behaves exactly like the native `Promise.all()`. Do NOT use native `Promise.all()` in your implementation.\n\nThe function takes an array of promises and returns a single Promise. This returned promise resolves when all input promises have resolved, returning an array of resolved values in the same order. If any of the input promises reject, the returned promise immediately rejects with the reason of the first rejected promise.",
    "constraints": [
      "Must not use native Promise.all()",
      "Must return a new Promise object",
      "Must resolve promises in parallel but maintain chronological input order in resolved array",
      "Must reject immediately upon the first failure",
      "Should support passing non-promise direct values in the array (they resolve immediately)"
    ],
    "forbidden": [
      "Promise\\.all"
    ],
    "forbiddenErrorMessage": "Forbidden: You cannot use the native Promise.all() polyfill!",
    "boilerplate": "function promiseAll(promises) {\n    return new Promise((resolve, reject) => {\n      // Write your code here (No Promise.all())\n      \n    });\n  }",
    "tests": [
      {
        "id": 1,
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": [
          1,
          2,
          3
        ],
        "description": "Resolves an array of direct resolved promises",
        "isAsync": true
      },
      {
        "id": 2,
        "input": [
          [
            10,
            "Rejected Reason",
            20
          ]
        ],
        "expected": "Rejected Reason",
        "description": "Rejects with the first encountered rejection reason",
        "isAsync": true
      },
      {
        "id": 3,
        "input": [
          [
            42,
            "Hello",
            99
          ]
        ],
        "expected": [
          42,
          "Hello",
          99
        ],
        "description": "Handles arrays with a mix of raw values and promises",
        "isAsync": true
      }
    ]
  },
  {
    "questionId": 67,
    "title": "EventEmitter Implementation",
    "topic": "JavaScript",
    "subTopic": "System Design / Frontend Machine Coding",
    "difficulty": "Coding",
    "description": "Implement an `EventEmitter` class that supports the following methods:\n- `on(event, listener)` — Register a listener for an event\n- `off(event, listener)` — Remove a registered listener\n- `emit(event, ...args)` — Trigger all listeners for an event\n- `once(event, listener)` — Register a one-time listener that auto-removes after first call",
    "constraints": [
      "All four methods must be implemented: on, off, emit, once",
      "emit() should pass all additional arguments to each listener",
      "once() listeners must be removed automatically after first invocation",
      "off() must only remove the specific listener, not all listeners for an event",
      "Multiple listeners for the same event must all be called"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "class EventEmitter {\n    constructor() {\n      // Initialize your listeners storage here\n      \n    }\n  \n    on(event, listener) {\n      // Register listener for event\n      \n    }\n  \n    off(event, listener) {\n      // Remove specific listener from event\n      \n    }\n  \n    emit(event, ...args) {\n      // Call all listeners for event with args\n      \n    }\n  \n    once(event, listener) {\n      // Register a listener that auto-removes after first call\n      \n    }\n  }",
    "tests": [
      {
        "id": 1,
        "input": [
          [
            "on_test",
            "hello"
          ]
        ],
        "expected": "hello",
        "description": "on() registers and emit() calls listener with arg"
      },
      {
        "id": 2,
        "input": [
          [
            "off_test"
          ]
        ],
        "expected": 0,
        "description": "off() removes listener so it is never called"
      },
      {
        "id": 3,
        "input": [
          [
            "once_test"
          ]
        ],
        "expected": 1,
        "description": "once() listener fires exactly once"
      },
      {
        "id": 4,
        "input": [
          [
            "multi_test"
          ]
        ],
        "expected": 3,
        "description": "Multiple listeners for same event all fire"
      }
    ]
  },
  {
    "questionId": 1017,
    "title": "Move Zeros to End",
    "topic": "JavaScript",
    "subTopic": "Array Problems",
    "difficulty": "Coding",
    "description": "Write a function `moveZerosToEnd(nums)` that moves zeros to the end while maintaining relative order of non-zero elements. Modify in-place, return array.",
    "constraints": [
      "Maintain non-zero element order",
      "O(N) time, O(1) space"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function moveZerosToEnd(nums) {\n  // Move zeros to end, maintain non-zero order\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          [
            0,
            1,
            0,
            3,
            12
          ]
        ],
        "expected": [
          1,
          3,
          12,
          0,
          0
        ],
        "description": "Zeros moved"
      },
      {
        "id": 2,
        "input": [
          [
            0
          ]
        ],
        "expected": [
          0
        ],
        "description": "Single zero"
      },
      {
        "id": 3,
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": [
          1,
          2,
          3
        ],
        "description": "No zeros"
      },
      {
        "id": 4,
        "input": [
          [
            0,
            0,
            1
          ]
        ],
        "expected": [
          1,
          0,
          0
        ],
        "description": "Leading zeros"
      }
    ]
  },
  {
    "questionId": 1018,
    "title": "Find Missing Number",
    "topic": "JavaScript",
    "subTopic": "Array Problems",
    "difficulty": "Coding",
    "description": "Write a function `findMissingNumber(nums)` that finds the missing number in [0,n] using sum formula: n*(n+1)/2.",
    "constraints": [
      "One number missing from [0,n]",
      "O(N) time O(1) space"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function findMissingNumber(nums) {\n  // Sum formula: expected - actual = missing\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          [
            3,
            0,
            1
          ]
        ],
        "expected": 2,
        "description": "Missing 2"
      },
      {
        "id": 2,
        "input": [
          [
            0,
            1
          ]
        ],
        "expected": 2,
        "description": "Missing at end"
      },
      {
        "id": 3,
        "input": [
          [
            9,
            6,
            4,
            2,
            3,
            5,
            7,
            0,
            1
          ]
        ],
        "expected": 8,
        "description": "Missing 8 from 0-9"
      },
      {
        "id": 4,
        "input": [
          [
            0
          ]
        ],
        "expected": 1,
        "description": "Missing 1"
      }
    ]
  },
  {
    "questionId": 1023,
    "title": "Second Largest Number",
    "topic": "JavaScript",
    "subTopic": "Array Problems",
    "difficulty": "Coding",
    "description": "Write a function `secondLargest(nums)` that returns the second largest unique number, or null if none exists.",
    "constraints": [
      "Return null if no second largest",
      "O(N) preferred"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function secondLargest(nums) {\n  // Return second largest unique number or null\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          [
            3,
            1,
            4,
            1,
            5,
            9,
            2,
            6
          ]
        ],
        "expected": 6,
        "description": "6 is second largest"
      },
      {
        "id": 2,
        "input": [
          [
            1,
            1,
            1
          ]
        ],
        "expected": null,
        "description": "All same"
      },
      {
        "id": 3,
        "input": [
          [
            5,
            3
          ]
        ],
        "expected": 3,
        "description": "Two elements"
      },
      {
        "id": 4,
        "input": [
          [
            1
          ]
        ],
        "expected": null,
        "description": "Single element"
      }
    ]
  },
  {
    "questionId": 1032,
    "title": "Fibonacci Number",
    "topic": "JavaScript",
    "subTopic": "Number Problems",
    "difficulty": "Coding",
    "description": "Write a function `fibonacci(n)` that returns the nth Fibonacci number (0-indexed). F(0)=0, F(1)=1. Use iterative approach.",
    "constraints": [
      "0-indexed",
      "Iterative O(N) time O(1) space"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function fibonacci(n) {\n  // Return nth Fibonacci (iterative)\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          0
        ],
        "expected": 0,
        "description": "F(0) = 0"
      },
      {
        "id": 2,
        "input": [
          1
        ],
        "expected": 1,
        "description": "F(1) = 1"
      },
      {
        "id": 3,
        "input": [
          6
        ],
        "expected": 8,
        "description": "F(6) = 8"
      },
      {
        "id": 4,
        "input": [
          10
        ],
        "expected": 55,
        "description": "F(10) = 55"
      }
    ]
  },
  {
    "questionId": 1033,
    "title": "Factorial",
    "topic": "JavaScript",
    "subTopic": "Number Problems",
    "difficulty": "Coding",
    "description": "Write a function `factorial(n)` that computes n! iteratively. 0! = 1.",
    "constraints": [
      "0! = 1",
      "n >= 0",
      "Iterative approach"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function factorial(n) {\n  // Return n! iteratively\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          0
        ],
        "expected": 1,
        "description": "0! = 1"
      },
      {
        "id": 2,
        "input": [
          1
        ],
        "expected": 1,
        "description": "1! = 1"
      },
      {
        "id": 3,
        "input": [
          5
        ],
        "expected": 120,
        "description": "5! = 120"
      },
      {
        "id": 4,
        "input": [
          10
        ],
        "expected": 3628800,
        "description": "10! = 3628800"
      }
    ]
  },
  {
    "questionId": 1034,
    "title": "Prime Number Check",
    "topic": "JavaScript",
    "subTopic": "Number Problems",
    "difficulty": "Coding",
    "description": "Write a function `isPrime(n)` that returns true if n is prime. Check divisors only up to Math.sqrt(n).",
    "constraints": [
      "1 is NOT prime",
      "Check up to sqrt(n)",
      "Return boolean"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function isPrime(n) {\n  // Return true if n is prime\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          2
        ],
        "expected": true,
        "description": "2 is prime"
      },
      {
        "id": 2,
        "input": [
          1
        ],
        "expected": false,
        "description": "1 is not prime"
      },
      {
        "id": 3,
        "input": [
          17
        ],
        "expected": true,
        "description": "17 is prime"
      },
      {
        "id": 4,
        "input": [
          15
        ],
        "expected": false,
        "description": "15 = 3x5 not prime"
      }
    ]
  },
  {
    "questionId": 1036,
    "title": "Reverse a Number",
    "topic": "JavaScript",
    "subTopic": "Number Problems",
    "difficulty": "Coding",
    "description": "Write a function `reverseNumber(n)` that reverses digits using arithmetic only (no string conversion). Return 0 if result overflows 32-bit int.",
    "constraints": [
      "No string conversion",
      "Preserve sign",
      "Return 0 on overflow"
    ],
    "forbidden": [
      "\\.toString\\(",
      "String\\("
    ],
    "forbiddenErrorMessage": "Forbidden: No string conversion! Use modulo (% 10) and Math.floor.",
    "boilerplate": "function reverseNumber(n) {\n  // Reverse digits using arithmetic only\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          123
        ],
        "expected": 321,
        "description": "123 -> 321"
      },
      {
        "id": 2,
        "input": [
          -123
        ],
        "expected": -321,
        "description": "-123 -> -321"
      },
      {
        "id": 3,
        "input": [
          120
        ],
        "expected": 21,
        "description": "Trailing zero dropped"
      },
      {
        "id": 4,
        "input": [
          0
        ],
        "expected": 0,
        "description": "Zero stays zero"
      }
    ]
  },
  {
    "questionId": 1049,
    "title": "Deep Compare Objects",
    "topic": "JavaScript",
    "subTopic": "Object Problems",
    "difficulty": "Coding",
    "description": "Write a function `deepCompare(obj1, obj2)` that returns true if two values are deeply equal. Cannot use JSON.stringify.",
    "constraints": [
      "Recursive comparison",
      "No JSON.stringify"
    ],
    "forbidden": [
      "JSON\\.stringify"
    ],
    "forbiddenErrorMessage": "Forbidden: Cannot use JSON.stringify! Implement recursive comparison.",
    "boilerplate": "function deepCompare(obj1, obj2) {\n  // Recursively compare two values\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          {
            "a": 1,
            "b": {
              "c": 2
            }
          },
          {
            "a": 1,
            "b": {
              "c": 2
            }
          }
        ],
        "expected": true,
        "description": "Deeply equal"
      },
      {
        "id": 2,
        "input": [
          {
            "a": 1
          },
          {
            "a": 2
          }
        ],
        "expected": false,
        "description": "Different values"
      },
      {
        "id": 3,
        "input": [
          [
            1,
            2,
            3
          ],
          [
            1,
            2,
            3
          ]
        ],
        "expected": true,
        "description": "Equal arrays"
      },
      {
        "id": 4,
        "input": [
          null,
          null
        ],
        "expected": true,
        "description": "Both null"
      },
      {
        "id": 5,
        "input": [
          {
            "a": 1
          },
          {
            "a": 1,
            "b": 2
          }
        ],
        "expected": false,
        "description": "Different key count"
      }
    ]
  },
  {
    "questionId": 1053,
    "title": "Merge Objects (Deep)",
    "topic": "JavaScript",
    "subTopic": "Object Problems",
    "difficulty": "Coding",
    "description": "Write a function `mergeObjects(...objs)` that deeply merges multiple objects. Nested objects merged recursively, later primitives override.",
    "constraints": [
      "Deep merge",
      "Return new object",
      "Arrays replaced not merged"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function mergeObjects(...objs) {\n  // Deep merge multiple objects\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          {
            "a": 1
          },
          {
            "b": 2
          }
        ],
        "expected": {
          "a": 1,
          "b": 2
        },
        "description": "Simple merge"
      },
      {
        "id": 2,
        "input": [
          {
            "a": {
              "x": 1
            }
          },
          {
            "a": {
              "y": 2
            }
          }
        ],
        "expected": {
          "a": {
            "x": 1,
            "y": 2
          }
        },
        "description": "Deep merge"
      },
      {
        "id": 3,
        "input": [
          {
            "a": 1
          },
          {
            "a": 2
          }
        ],
        "expected": {
          "a": 2
        },
        "description": "Later overrides"
      },
      {
        "id": 4,
        "input": [
          {
            "a": 1
          },
          {
            "b": 2
          },
          {
            "c": 3
          }
        ],
        "expected": {
          "a": 1,
          "b": 2,
          "c": 3
        },
        "description": "Three objects"
      }
    ]
  },
  {
    "questionId": 1056,
    "title": "Currying",
    "topic": "JavaScript",
    "subTopic": "Function Problems",
    "difficulty": "Coding",
    "description": "Write a function `curry(fn)` that transforms fn into sequence of unary functions. curry(add)(1)(2)(3) = add(1,2,3).",
    "constraints": [
      "Collect args one at a time",
      "Invoke fn when all args collected (use fn.length)"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function curry(fn) {\n  // Return curried version of fn\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          null
        ],
        "expected": "function",
        "description": "curry(fn) returns function"
      },
      {
        "id": 2,
        "input": [
          null
        ],
        "expected": 6,
        "description": "curry(add)(1)(2)(3) = 6"
      },
      {
        "id": 3,
        "input": [
          null
        ],
        "expected": 10,
        "description": "curry(multiply)(2)(5) = 10"
      },
      {
        "id": 4,
        "input": [
          null
        ],
        "expected": 3,
        "description": "curry(sum2)(1)(2) = 3"
      }
    ]
  },
  {
    "questionId": 1057,
    "title": "Memoization",
    "topic": "JavaScript",
    "subTopic": "Function Problems",
    "difficulty": "Coding",
    "description": "Write a function `memoize(fn)` that returns memoized version. Cache results, return cached on repeated same-args calls.",
    "constraints": [
      "Cache by stringified args",
      "Return cached on hit"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function memoize(fn) {\n  // Return memoized version of fn\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          null
        ],
        "expected": "function",
        "description": "memoize(fn) returns function"
      },
      {
        "id": 2,
        "input": [
          null
        ],
        "expected": 25,
        "description": "First call: square(5) = 25"
      },
      {
        "id": 3,
        "input": [
          null
        ],
        "expected": true,
        "description": "Second call returns cached"
      },
      {
        "id": 4,
        "input": [
          null
        ],
        "expected": 36,
        "description": "New arg: square(6) = 36"
      }
    ]
  },
  {
    "questionId": 1058,
    "title": "Pipe Function",
    "topic": "JavaScript",
    "subTopic": "Function Problems",
    "difficulty": "Coding",
    "description": "Write a function `pipe(...fns)` that applies functions left-to-right. pipe(f,g,h)(x) = h(g(f(x))).",
    "constraints": [
      "Left-to-right application",
      "Each output is next input"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function pipe(...fns) {\n  // Apply functions left to right\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          null
        ],
        "expected": "function",
        "description": "pipe() returns function"
      },
      {
        "id": 2,
        "input": [
          null
        ],
        "expected": 6,
        "description": "pipe(add1, double)(2) = 6"
      },
      {
        "id": 3,
        "input": [
          null
        ],
        "expected": 5,
        "description": "pipe(add1)(4) = 5"
      },
      {
        "id": 4,
        "input": [
          null
        ],
        "expected": 7,
        "description": "pipe(double, add1, add2)(2) = 7"
      }
    ]
  },
  {
    "questionId": 1059,
    "title": "Compose Function",
    "topic": "JavaScript",
    "subTopic": "Function Problems",
    "difficulty": "Coding",
    "description": "Write a function `compose(...fns)` that applies functions right-to-left. compose(f,g,h)(x) = f(g(h(x))).",
    "constraints": [
      "Right-to-left application"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function compose(...fns) {\n  // Apply functions right to left\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          null
        ],
        "expected": "function",
        "description": "compose() returns function"
      },
      {
        "id": 2,
        "input": [
          null
        ],
        "expected": 6,
        "description": "compose(double, add1)(2) = 6"
      },
      {
        "id": 3,
        "input": [
          null
        ],
        "expected": 5,
        "description": "compose(add1)(4) = 5"
      },
      {
        "id": 4,
        "input": [
          null
        ],
        "expected": 10,
        "description": "compose(double, add1, add2)(2) = 10"
      }
    ]
  },
  {
    "questionId": 1060,
    "title": "Once Function",
    "topic": "JavaScript",
    "subTopic": "Function Problems",
    "difficulty": "Coding",
    "description": "Write a function `once(fn)` that returns wrapper ensuring fn is called at most once. Subsequent calls return first result.",
    "constraints": [
      "fn called at most once",
      "Subsequent calls return cached first result"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function once(fn) {\n  // Return function that calls fn only once\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          null
        ],
        "expected": "function",
        "description": "once(fn) returns function"
      },
      {
        "id": 2,
        "input": [
          null
        ],
        "expected": 5,
        "description": "First call returns 5"
      },
      {
        "id": 3,
        "input": [
          null
        ],
        "expected": 5,
        "description": "Second call still 5"
      },
      {
        "id": 4,
        "input": [
          null
        ],
        "expected": 1,
        "description": "fn called exactly once"
      }
    ]
  },
  {
    "questionId": 1069,
    "title": "Function.call Polyfill",
    "topic": "JavaScript",
    "subTopic": "Polyfill Questions",
    "difficulty": "Coding",
    "description": "Implement `myCall(fn, context, ...args)` mimicking Function.prototype.call(). Cannot use .call()/.apply()/.bind().",
    "constraints": [
      "No .call()/.apply()/.bind()",
      "Temporarily assign fn to context",
      "Clean up after"
    ],
    "forbidden": [
      "\\.call\\(",
      "\\.apply\\(",
      "\\.bind\\("
    ],
    "forbiddenErrorMessage": "Forbidden: Cannot use .call(), .apply(), or .bind()!",
    "boilerplate": "function myCall(fn, context, ...args) {\n  // Invoke fn with context as 'this'\n  // Hint: assign fn to context with unique key, call, then delete\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          null,
          {
            "name": "Alice"
          }
        ],
        "expected": "Hello, Alice!",
        "description": "Greet with context.name"
      },
      {
        "id": 2,
        "input": [
          null,
          {
            "x": 10,
            "y": 20
          }
        ],
        "expected": 30,
        "description": "Sum x + y"
      },
      {
        "id": 3,
        "input": [
          null,
          {},
          5,
          3
        ],
        "expected": 8,
        "description": "Add 5+3=8"
      }
    ]
  },
  {
    "questionId": 1070,
    "title": "Function.apply Polyfill",
    "topic": "JavaScript",
    "subTopic": "Polyfill Questions",
    "difficulty": "Coding",
    "description": "Implement `myApply(fn, context, argsArray)` mimicking Function.prototype.apply(). Cannot use .call()/.apply()/.bind().",
    "constraints": [
      "No .call()/.apply()/.bind()",
      "Spread argsArray as args",
      "Handle null argsArray"
    ],
    "forbidden": [
      "\\.call\\(",
      "\\.apply\\(",
      "\\.bind\\("
    ],
    "forbiddenErrorMessage": "Forbidden: Cannot use .call(), .apply(), or .bind()!",
    "boilerplate": "function myApply(fn, context, argsArray) {\n  // Invoke fn with context and spread argsArray\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          null,
          {
            "name": "Bob"
          },
          []
        ],
        "expected": "Hello, Bob!",
        "description": "Greet"
      },
      {
        "id": 2,
        "input": [
          null,
          {},
          [
            5,
            3
          ]
        ],
        "expected": 8,
        "description": "Add [5,3]"
      },
      {
        "id": 3,
        "input": [
          null,
          {},
          null
        ],
        "expected": 0,
        "description": "null args = 0"
      }
    ]
  },
  {
    "questionId": 1071,
    "title": "Function.bind Polyfill",
    "topic": "JavaScript",
    "subTopic": "Polyfill Questions",
    "difficulty": "Coding",
    "description": "Implement `myBind(fn, context, ...partialArgs)` mimicking Function.prototype.bind(). Returns new function. Cannot use .bind().",
    "constraints": [
      "Returns new function",
      "Supports partial application",
      "No .bind()"
    ],
    "forbidden": [
      "\\.bind\\("
    ],
    "forbiddenErrorMessage": "Forbidden: Cannot use .bind()!",
    "boilerplate": "function myBind(fn, context, ...partialArgs) {\n  // Return new function with bound context + partial args\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          null,
          {
            "name": "Carol"
          }
        ],
        "expected": "function",
        "description": "Returns function"
      },
      {
        "id": 2,
        "input": [
          null,
          {
            "name": "Carol"
          }
        ],
        "expected": "Hello, Carol!",
        "description": "Bound context"
      },
      {
        "id": 3,
        "input": [
          null,
          {},
          5
        ],
        "expected": 8,
        "description": "Partial: add(5)(3) = 8"
      }
    ]
  },
  {
    "questionId": 1072,
    "title": "Promise.race Polyfill",
    "topic": "JavaScript",
    "subTopic": "Polyfill Questions",
    "difficulty": "Coding",
    "description": "Implement `promiseRace(promises)` mimicking Promise.race(). First settled (resolve or reject) wins. Cannot use native Promise.race().",
    "constraints": [
      "No native Promise.race()",
      "First settled wins"
    ],
    "forbidden": [
      "Promise\\.race"
    ],
    "forbiddenErrorMessage": "Forbidden: Cannot use native Promise.race()!",
    "boilerplate": "function promiseRace(promises) {\n  return new Promise((resolve, reject) => {\n    // First settled wins\n    \n  });\n}",
    "tests": [
      {
        "id": 1,
        "input": [
          []
        ],
        "expected": 1,
        "description": "Immediately resolved wins",
        "isAsync": true
      },
      {
        "id": 2,
        "input": [
          []
        ],
        "expected": "raceError",
        "description": "Rejection wins if first",
        "isAsync": true
      }
    ]
  },
  {
    "questionId": 1073,
    "title": "Promise.any Polyfill",
    "topic": "JavaScript",
    "subTopic": "Polyfill Questions",
    "difficulty": "Coding",
    "description": "Implement `promiseAny(promises)` mimicking Promise.any(). Resolves with first resolved. Rejects only if all fail. Cannot use native Promise.any().",
    "constraints": [
      "No native Promise.any()",
      "First resolution wins",
      "Reject only if all fail"
    ],
    "forbidden": [
      "Promise\\.any"
    ],
    "forbiddenErrorMessage": "Forbidden: Cannot use native Promise.any()!",
    "boilerplate": "function promiseAny(promises) {\n  return new Promise((resolve, reject) => {\n    // Resolve on first success, reject only if all fail\n    \n  });\n}",
    "tests": [
      {
        "id": 1,
        "input": [
          []
        ],
        "expected": 2,
        "description": "First non-rejected resolves",
        "isAsync": true
      },
      {
        "id": 2,
        "input": [
          []
        ],
        "expected": 1,
        "description": "First resolution wins",
        "isAsync": true
      }
    ]
  },
  {
    "questionId": 1074,
    "title": "Promise.allSettled Polyfill",
    "topic": "JavaScript",
    "subTopic": "Polyfill Questions",
    "difficulty": "Coding",
    "description": "Implement `promiseAllSettled(promises)` mimicking Promise.allSettled(). Always resolves with {status, value/reason} objects. Cannot use native Promise.allSettled().",
    "constraints": [
      "No native Promise.allSettled()",
      "Always resolves",
      "Returns {status, value/reason}"
    ],
    "forbidden": [
      "Promise\\.allSettled"
    ],
    "forbiddenErrorMessage": "Forbidden: Cannot use native Promise.allSettled()!",
    "boilerplate": "function promiseAllSettled(promises) {\n  return new Promise((resolve) => {\n    // Always resolve with outcome objects\n    \n  });\n}",
    "tests": [
      {
        "id": 1,
        "input": [
          []
        ],
        "expected": [
          {
            "status": "fulfilled",
            "value": 1
          },
          {
            "status": "rejected",
            "reason": "err"
          },
          {
            "status": "fulfilled",
            "value": 3
          }
        ],
        "description": "Mixed outcomes",
        "isAsync": true
      }
    ]
  },
  {
    "questionId": 1080,
    "title": "Largest Number",
    "topic": "JavaScript",
    "subTopic": "Array Problems",
    "difficulty": "Coding",
    "description": "Write a function `findMax(arr)` that finds the maximum number in an array without using `Math.max()` or sorting.",
    "constraints": [
      "No Math.max()",
      "No Array.prototype.sort()",
      "Time Complexity O(N)",
      "Space Complexity O(1)"
    ],
    "forbidden": [
      "Math\\.max",
      "\\.sort\\("
    ],
    "forbiddenErrorMessage": "Forbidden: Do not use Math.max() or .sort()!",
    "boilerplate": "function findMax(arr) {\n  // Write your code here (No Math.max or .sort)\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          [
            1,
            5,
            3,
            9,
            2
          ]
        ],
        "expected": 9,
        "description": "Finds max in positive integers"
      },
      {
        "id": 2,
        "input": [
          [
            -10,
            -5,
            -3,
            -9
          ]
        ],
        "expected": -3,
        "description": "Finds max in negative numbers"
      },
      {
        "id": 3,
        "input": [
          [
            42
          ]
        ],
        "expected": 42,
        "description": "Single element array"
      }
    ]
  },
  {
    "questionId": 1081,
    "title": "Smallest Number",
    "topic": "JavaScript",
    "subTopic": "Array Problems",
    "difficulty": "Coding",
    "description": "Write a function `findMin(arr)` that finds the minimum number in an array without using `Math.min()` or sorting.",
    "constraints": [
      "No Math.min()",
      "No Array.prototype.sort()",
      "Time Complexity O(N)",
      "Space Complexity O(1)"
    ],
    "forbidden": [
      "Math\\.min",
      "\\.sort\\("
    ],
    "forbiddenErrorMessage": "Forbidden: Do not use Math.min() or .sort()!",
    "boilerplate": "function findMin(arr) {\n  // Write your code here (No Math.min or .sort)\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          [
            1,
            5,
            3,
            9,
            2
          ]
        ],
        "expected": 1,
        "description": "Finds min in positive integers"
      },
      {
        "id": 2,
        "input": [
          [
            -10,
            -5,
            -3,
            -9
          ]
        ],
        "expected": -10,
        "description": "Finds min in negative numbers"
      },
      {
        "id": 3,
        "input": [
          [
            42
          ]
        ],
        "expected": 42,
        "description": "Single element array"
      }
    ]
  },
  {
    "questionId": 1083,
    "title": "Odd/Even Count",
    "topic": "JavaScript",
    "subTopic": "Array Problems",
    "difficulty": "Coding",
    "description": "Write a function `countOddEven(arr)` that returns an object containing the counts of odd and even numbers in an array.",
    "constraints": [
      "Return object format: { odd: number, even: number }"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function countOddEven(arr) {\n  // Write your code here\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          [
            1,
            2,
            3,
            4,
            5,
            6
          ]
        ],
        "expected": {
          "odd": 3,
          "even": 3
        },
        "description": "Standard count"
      },
      {
        "id": 2,
        "input": [
          [
            1,
            3,
            5
          ]
        ],
        "expected": {
          "odd": 3,
          "even": 0
        },
        "description": "All odd numbers"
      },
      {
        "id": 3,
        "input": [
          []
        ],
        "expected": {
          "odd": 0,
          "even": 0
        },
        "description": "Empty count"
      }
    ]
  },
  {
    "questionId": 1097,
    "title": "Nested Property Access",
    "topic": "JavaScript",
    "subTopic": "Object Problems",
    "difficulty": "Coding",
    "description": "Write a function `getNestedProperty(obj, path)` that retrieves a nested property from an object using a string path that can contain both dot notation and array index brackets, e.g. `'a.b[0].c'`.",
    "constraints": [
      "Support dots and bracket indices",
      "Return undefined if path doesn't exist"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function getNestedProperty(obj, path) {\n  // path can have dots or brackets like 'a.b[0].c' or 'a.b.0.c'\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          {
            "a": {
              "b": [
                {
                  "c": 42
                }
              ]
            }
          },
          "a.b[0].c"
        ],
        "expected": 42,
        "description": "Nested bracket notation"
      },
      {
        "id": 2,
        "input": [
          {
            "a": {
              "b": [
                {
                  "c": 42
                }
              ]
            }
          },
          "a.b.0.c"
        ],
        "expected": 42,
        "description": "Nested dot index notation"
      },
      {
        "id": 3,
        "input": [
          {
            "a": 1
          },
          "a.b.c"
        ],
        "description": "Invalid path"
      }
    ]
  },
  {
    "questionId": 1100,
    "title": "Sequential API Calls",
    "topic": "JavaScript",
    "subTopic": "Promise & Async Questions",
    "difficulty": "Coding",
    "description": "Write a function `runSequentially(tasks)` that executes an array of async functions sequentially (each task starting only after the previous resolves) and returns a promise resolving to an array of results.",
    "constraints": [
      "Executes sequentially",
      "Returns array of results in order"
    ],
    "forbidden": [
      "Promise\\.all"
    ],
    "forbiddenErrorMessage": "Forbidden: Do not use Promise.all!",
    "boilerplate": "function runSequentially(tasks) {\n  // tasks is array of promise-returning functions\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          []
        ],
        "expected": [
          1,
          2,
          3
        ],
        "description": "Executes 3 tasks in order",
        "isAsync": true
      }
    ]
  },
  {
    "questionId": 1101,
    "title": "Parallel API Calls",
    "topic": "JavaScript",
    "subTopic": "Promise & Async Questions",
    "difficulty": "Coding",
    "description": "Write a function `runInParallel(tasks)` that executes an array of async tasks in parallel (similar to Promise.all) without using native `Promise.all()`.",
    "constraints": [
      "Run in parallel",
      "No Promise.all()",
      "Reject immediately if any task rejects"
    ],
    "forbidden": [
      "Promise\\.all"
    ],
    "forbiddenErrorMessage": "Forbidden: Do not use Promise.all!",
    "boilerplate": "function runInParallel(tasks) {\n  // run tasks in parallel and return results array\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          []
        ],
        "expected": [
          1,
          2,
          3
        ],
        "description": "Resolves when all succeed",
        "isAsync": true
      },
      {
        "id": 2,
        "input": [
          []
        ],
        "expected": "err",
        "description": "Rejects if any fails",
        "isAsync": true
      }
    ]
  },
  {
    "questionId": 1102,
    "title": "Async Queue",
    "topic": "JavaScript",
    "subTopic": "Promise & Async Questions",
    "difficulty": "Coding",
    "description": "Implement a class `AsyncQueue` that manages queue operations. Tasks added to the queue via `enqueue(task)` (where task returns a promise) must run sequentially with a maximum concurrency of 1.",
    "constraints": [
      "Tasks run sequentially",
      "Returns promise from enqueue resolving to task result"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "class AsyncQueue {\n  constructor() {\n    \n  }\n  \n  enqueue(task) {\n    \n  }\n}",
    "tests": [
      {
        "id": 1,
        "input": [
          [
            1,
            2
          ]
        ],
        "expected": [
          1,
          2
        ],
        "description": "Sequential execution order",
        "isAsync": true
      }
    ]
  },
  {
    "questionId": 1103,
    "title": "Pub/Sub System",
    "topic": "JavaScript",
    "subTopic": "System Design / Frontend Machine Coding",
    "difficulty": "Coding",
    "description": "Implement a class `PubSub` supporting standard publish-subscribe. It must expose `subscribe(event, callback)` which returns a function with an `unsubscribe()` method (or returns unsubscribe directly), and `publish(event, data)`.",
    "constraints": [
      "Support multiple subscribers per event",
      "Unsubscribe prevents future calls"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "class PubSub {\n  subscribe(event, callback) {\n    \n  }\n  \n  publish(event, data) {\n    \n  }\n}",
    "tests": [
      {
        "id": 1,
        "input": [
          [
            1,
            2
          ]
        ],
        "expected": [
          "hello",
          0
        ],
        "description": "Registers, publishes, and unsubscribes"
      }
    ]
  },
  {
    "questionId": 1105,
    "title": "Task Scheduler",
    "topic": "JavaScript",
    "subTopic": "System Design / Frontend Machine Coding",
    "difficulty": "Coding",
    "description": "Implement a `TaskScheduler` class with a `schedule(task, delay)` method that schedules a callback task after a specified delay in ms, returning a unique task ID that can be cancelled with `cancel(taskId)`.",
    "constraints": [
      "Correct scheduling delay",
      "Tasks cancelled before running should not run"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "class TaskScheduler {\n  schedule(task, delay) {\n    \n  }\n  \n  cancel(taskId) {\n    \n  }\n}",
    "tests": [
      {
        "id": 1,
        "input": [
          [
            1,
            2
          ]
        ],
        "expected": [
          true,
          false
        ],
        "description": "Schedules and cancels task",
        "isAsync": true
      }
    ]
  },
  {
    "questionId": 1109,
    "title": "Retry API Requests",
    "topic": "JavaScript",
    "subTopic": "System Design / Frontend Machine Coding",
    "difficulty": "Coding",
    "description": "Write a function `retryApiRequest(url, options, retries, delay)` that uses `fetch` to make an API call, automatically retrying on failure up to `retries` times with a `delay` in ms.",
    "constraints": [
      "Retry on failure",
      "Respect options object"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function retryApiRequest(url, options, retries, delay) {\n  // returns fetch promise\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          "/api/test",
          {},
          2,
          10
        ],
        "expected": "data",
        "description": "API request retries and resolves",
        "isAsync": true
      }
    ]
  },
  {
    "questionId": 1116,
    "title": "Object Key Frequency",
    "topic": "JavaScript",
    "subTopic": "Object Problems",
    "difficulty": "Coding",
    "description": "Write a function `getObjectKeyFrequency(obj)` that counts the occurrences of all keys in a nested object or nested objects within arrays.",
    "constraints": [
      "Recursive key scan",
      "Return counts object { keyName: frequencyCount }"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function getObjectKeyFrequency(obj) {\n  // Write your code here\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          {
            "a": 1,
            "b": {
              "a": 2,
              "c": {
                "a": 3
              }
            }
          }
        ],
        "expected": {
          "a": 3,
          "b": 1,
          "c": 1
        },
        "description": "Nested object keys"
      },
      {
        "id": 2,
        "input": [
          [
            {
              "a": 1
            },
            {
              "b": 2,
              "a": 3
            }
          ]
        ],
        "expected": {
          "a": 2,
          "b": 1
        },
        "description": "Objects inside array"
      }
    ]
  },
  {
    "questionId": 1119,
    "title": "Concurrency Limiter",
    "topic": "JavaScript",
    "subTopic": "Promise & Async Questions",
    "difficulty": "Coding",
    "description": "Write a function `limitConcurrency(tasks, limit)` that executes an array of asynchronous tasks (functions returning promises) concurrently, with a maximum of `limit` tasks running in parallel. It should return a promise resolving to an array of results in the original order.",
    "constraints": [
      "At most `limit` running concurrently",
      "Preserves initial index ordering"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function limitConcurrency(tasks, limit) {\n  // returns promise resolving to all results\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          [],
          2
        ],
        "expected": [
          1,
          2,
          3
        ],
        "description": "Limits concurrency to 2 for 3 tasks",
        "isAsync": true
      }
    ]
  },
  {
    "questionId": 106,
    "title": "Implement MyPartial<T> (Type Coding)",
    "topic": "TypeScript",
    "difficulty": "Coding",
    "description": "In TypeScript, the `Partial<T>` utility type makes all properties of a type `T` optional. Implement your own custom utility type `MyPartial<T>` that accomplishes this exact behavior without using the built-in `Partial` type.",
    "constraints": [
      "Must not use the built-in Partial utility",
      "Must return a mapped type where each property has an optional descriptor '?'",
      "Must maintain correct types of original values"
    ],
    "forbidden": [
      "type MyPartial<T>\\s*=\\s*Partial<T>"
    ],
    "forbiddenErrorMessage": "Forbidden: You cannot alias the built-in Partial<T> type directly!",
    "boilerplate": "// Implement MyPartial<T> here\n  type MyPartial<T> = {\n    // Write your code here\n    \n  };",
    "tests": [
      {
        "id": 1,
        "input": [
          "type User = { name: string; age: number; };\nconst u: MyPartial<User> = { name: 'Alice' };"
        ],
        "expected": true,
        "description": "Allows keys to be optional in MyPartial<User>"
      }
    ]
  },
  {
    "questionId": 107,
    "title": "Implement MyOmit<T, K> (Type Coding)",
    "topic": "TypeScript",
    "difficulty": "Coding",
    "description": "In TypeScript, the `Omit<T, K>` utility type constructs a type by picking all properties from `T` and then removing `K`. Implement your own `MyOmit<T, K>` without using the built-in `Omit` or `Pick` types.",
    "constraints": [
      "Must not use the built-in Omit or Pick utility types",
      "Must constrain K to be a subset of keyof T",
      "Use a mapped type combined with the Exclude type for key filtering",
      "Must maintain the correct types of remaining properties"
    ],
    "forbidden": [
      "type MyOmit<T, K>\\s*=\\s*Omit<T, K>"
    ],
    "forbiddenErrorMessage": "Forbidden: You cannot alias the built-in Omit<T, K> type directly!",
    "boilerplate": "// Implement MyOmit<T, K> here\n  type MyOmit<T, K extends keyof T> = {\n    // Write your code here\n    // Hint: [P in Exclude<keyof T, K>]: T[P]\n    \n  };",
    "tests": [
      {
        "id": 1,
        "input": [
          "type User = { name: string; age: number; email: string; };\nconst u: MyOmit<User, 'age'> = { name: 'Alice', email: 'alice@example.com' };"
        ],
        "expected": true,
        "description": "Omits 'age' and only keeps 'name' and 'email'"
      }
    ]
  },
  {
    "questionId": 108,
    "title": "Implement MyPick<T, K> (Type Coding)",
    "topic": "TypeScript",
    "difficulty": "Coding",
    "description": "In TypeScript, the `Pick<T, K>` utility type allows you to construct a type by picking a set of properties `K` (which must be a union of string literals representing keys of `T`) from `T`. Implement your own custom utility type `MyPick<T, K>` that accomplishes this without using the built-in `Pick` type.",
    "constraints": [
      "Must not use the built-in Pick utility",
      "Must constrain the picked keys K to be a subset of keyof T using 'K extends keyof T'",
      "Must use a mapped type to pick properties"
    ],
    "forbidden": [
      "type MyPick<T, K>\\s*=\\s*Pick<T, K>"
    ],
    "forbiddenErrorMessage": "Forbidden: You cannot alias the built-in Pick<T, K> type directly!",
    "boilerplate": "// Implement MyPick<T, K> here\n  type MyPick<T, K extends keyof T> = {\n    // Write your code here\n    \n  };",
    "tests": [
      {
        "id": 1,
        "input": [
          "type User = { name: string; age: number; email: string; };\nconst u: MyPick<User, 'name' | 'email'> = { name: 'Alice', email: 'alice@gmail.com' };"
        ],
        "expected": true,
        "description": "Successfully picks 'name' and 'email' from User type"
      }
    ]
  },
  {
    "questionId": 109,
    "title": "Implement MyReturnType<T> (Type Coding)",
    "topic": "TypeScript",
    "difficulty": "Coding",
    "description": "In TypeScript, the `ReturnType<T>` utility type extracts the return type of a function type `T`. Implement your own `MyReturnType<T>` without using the built-in `ReturnType` type.\n\nYou must use TypeScript's `infer` keyword inside a conditional type.",
    "constraints": [
      "Must not use the built-in ReturnType utility",
      "Must use the 'infer' keyword in a conditional type",
      "Must work for any function signature",
      "Must constrain T to be a function type using 'T extends (...args: any[]) => any'"
    ],
    "forbidden": [
      "type MyReturnType<T>\\s*=\\s*ReturnType<T>"
    ],
    "forbiddenErrorMessage": "Forbidden: You cannot alias the built-in ReturnType<T> type directly!",
    "boilerplate": "// Implement MyReturnType<T> here\n  type MyReturnType<T extends (...args: any[]) => any> = \n    // Write your code here\n    // Hint: T extends (...args: any[]) => infer R ? R : never\n    never;",
    "tests": [
      {
        "id": 1,
        "input": [
          "type Fn = () => string;\ntype Result = MyReturnType<Fn>;\nconst r: Result = 'hello';"
        ],
        "expected": true,
        "description": "Extracts string return type from () => string"
      }
    ]
  },
  {
    "questionId": 110,
    "title": "DeepReadonly<T> Implementation (Type Coding)",
    "topic": "TypeScript",
    "difficulty": "Coding",
    "description": "Implement a utility type `DeepReadonly<T>` that makes all properties of an object (and all nested objects) recursively readonly. The built-in `Readonly<T>` only makes the top-level properties readonly — your implementation must go deeper.",
    "constraints": [
      "Must not use the built-in Readonly<T> alone (it only handles one level)",
      "Must recursively apply readonly to nested objects",
      "Must use conditional types and mapped types",
      "Non-object values should remain as-is (primitives, arrays are fine as readonly)",
      "Use 'T[P] extends object ?' to check for nested objects"
    ],
    "forbidden": [
      "type DeepReadonly<T>\\s*=\\s*Readonly<T>"
    ],
    "forbiddenErrorMessage": "Forbidden: Cannot use top-level Readonly<T> alone — must implement recursive deep version!",
    "boilerplate": "// Implement DeepReadonly<T> here\n  type DeepReadonly<T> = {\n    // Write your code here\n    // Hint: readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]\n    \n  };",
    "tests": [
      {
        "id": 1,
        "input": [
          "type Config = { db: { host: string; port: number }; env: string };\nconst c: DeepReadonly<Config> = { db: { host: 'localhost', port: 5432 }, env: 'prod' };"
        ],
        "expected": true,
        "description": "Makes nested object properties deeply readonly"
      }
    ]
  },
  {
    "questionId": 1130,
    "title": "Redux Store Implementation",
    "topic": "React & Redux",
    "subTopic": "Redux Store",
    "difficulty": "Coding",
    "description": "Implement a simple Redux store function `createStore(reducer, preloadedState)`. It must return an object with three methods: `getState()`, `dispatch(action)`, and `subscribe(listener)` (which returns an unsubscribe function).",
    "constraints": [
      "State updates trigger listeners",
      "Subscribe returns unsubscribe function"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function createStore(reducer, preloadedState) {\n  // returns { getState, dispatch, subscribe }\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          0
        ],
        "expected": [
          1,
          2
        ],
        "description": "Subscribes, dispatches state increments"
      }
    ]
  },
  {
    "questionId": 1132,
    "title": "Custom useState Hook",
    "topic": "React & Redux",
    "subTopic": "React Hooks",
    "difficulty": "Coding",
    "description": "Write a simulator function `useStateSimulator(actions)` that simulates React's `useState` hook. It receives an array of state setter callback operations. Internally, implement a state tracker function that allows multiple consecutive setter updates (supporting both direct values and functional state setters, e.g. `prev => prev + 1`) and returns the final state value.",
    "constraints": [
      "useState mock hook support state updates",
      "Evaluate action setter queue in sequence"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function useStateSimulator(actions) {\n  // actions: [0, 5, prev => prev + 2]\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          [
            0,
            5,
            "prev => prev + 2"
          ]
        ],
        "expected": 7,
        "description": "Consecutive and functional updates"
      }
    ]
  },
  {
    "questionId": 289,
    "title": "Retry Utility",
    "topic": "Node.js",
    "difficulty": "Coding",
    "description": "Retry async task with retries.",
    "constraints": [
      "Implement: nodeRetry function/class.",
      "Validate outputs match standard parameters."
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "async function nodeRetry(fn, limit) {\n  let lastErr;\n  for (let i = 0; i < limit; i++) {\n    try { return await fn(); } catch (err) { lastErr = err; }\n  }\n  throw lastErr;\n}",
    "tests": [
      {
        "id": 1,
        "input": [],
        "expected": "resolvedValue",
        "description": "Retries api calls",
        "isAsync": true
      }
    ],
    "functionName": "nodeRetry"
  },
  {
    "questionId": 4001,
    "title": "Count Vowels",
    "topic": "JavaScript",
    "difficulty": "Coding",
    "description": "Write a function `countVowels(str)` that takes a string and returns the number of vowels (a, e, i, o, u, case-insensitive) present in the string.",
    "constraints": [
      "Must handle empty strings",
      "Must be case-insensitive",
      "Must handle strings with only consonants",
      "Must handle strings with only vowels"
    ],
    "forbidden": [],
    "forbiddenErrorMessage": "",
    "boilerplate": "function countVowels(str) {\n  // Write your code here\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          "hello"
        ],
        "expected": 2,
        "description": "Simple string"
      },
      {
        "id": 2,
        "input": [
          "xyz"
        ],
        "expected": 0,
        "description": "No vowels"
      },
      {
        "id": 3,
        "input": [
          "AEIOUaeiou"
        ],
        "expected": 10,
        "description": "All vowels mixed case"
      },
      {
        "id": 4,
        "input": [
          ""
        ],
        "expected": 0,
        "description": "Empty string"
      }
    ]
  },
  {
    "questionId": 4002,
    "title": "Object Values",
    "topic": "JavaScript",
    "difficulty": "Coding",
    "description": "Write a function `getObjectValues(obj)` that returns an array of a given object's own enumerable string-keyed property values (polyfill for `Object.values`).",
    "constraints": [
      "Do not use Object.values() in your solution",
      "Should only return own properties (not inherited)",
      "Should return values in same order as Object.keys()"
    ],
    "forbidden": [
      "Object.values"
    ],
    "forbiddenErrorMessage": "Forbidden: Do not use Object.values() in your solution!",
    "boilerplate": "function getObjectValues(obj) {\n  // Write your code here\n  \n}",
    "tests": [
      {
        "id": 1,
        "input": [
          {
            "a": 1,
            "b": 2,
            "c": 3
          }
        ],
        "expected": [
          1,
          2,
          3
        ],
        "description": "Simple object"
      },
      {
        "id": 2,
        "input": [
          {}
        ],
        "expected": [],
        "description": "Empty object"
      },
      {
        "id": 3,
        "input": [
          {
            "name": "Alice",
            "age": 30
          }
        ],
        "expected": [
          "Alice",
          30
        ],
        "description": "Mixed type values"
      }
    ]
  }
];
