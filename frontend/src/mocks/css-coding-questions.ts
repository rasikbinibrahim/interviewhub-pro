// Hand-authored coding questions for the CSS part. These are real
// CodingQuestionDetail problems built around CSS logic that is actually
// asked as a coding exercise (specificity calculation, color parsing,
// shorthand parsing, class-name merging) expressed as testable JS
// functions. Every sampleTests entry has been checked against the
// reference solution below.

import type { MockCodingQuestion } from '@/mocks/questions';

const COMPANIES = ['Google', 'Meta', 'Amazon', 'Adobe', 'Airbnb', 'Flipkart', 'Myntra'];

export const MOCK_CSS_CODING_QUESTIONS: MockCodingQuestion[] = [
  {
    detail: {
      id: 'css-coding-1',
      // Answer focus: parse 3- or 6-digit hexadecimal safely, normalize shorthand, then extract the three RGB channels.
      questionNumber: 'CSSCODE-1',
      title: 'Convert Hex Color to RGB',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: 'Color',
      part: 'CSS',
      concepts: ['Bitwise Operations', 'Color Formats', 'Parsing'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Convert a hex color string (3-digit or 6-digit, with a leading #) into an { r, g, b } object of 0-255 integers.',
      input: 'hex: string',
      output: 'object — { r: number, g: number, b: number }',
      constraints: ['hex is a valid 3-digit or 6-digit hex color with a leading #'],
      examples: [{ input: "'#ffffff'", output: '{ r: 255, g: 255, b: 255 }', explanation: 'White is full intensity on every channel.' }],
      edgeCases: [{ case: 'Shorthand 3-digit hex like #f00', expected: 'Each digit is doubled before parsing (f0 0 -> ff0000 -> red)' }],
      functionName: 'hexToRgb',
      isClassBased: false,
      sampleTests: [
        { input: ['#ffffff'], expectedOutput: { r: 255, g: 255, b: 255 }, description: 'white' },
        { input: ['#000000'], expectedOutput: { r: 0, g: 0, b: 0 }, description: 'black' },
        { input: ['#f00'], expectedOutput: { r: 255, g: 0, b: 0 }, description: 'shorthand red' },
        { input: ['#1a2b3c'], expectedOutput: { r: 26, g: 43, b: 60 }, description: 'arbitrary 6-digit hex' },
      ],
    },
    hints: {
      hints: [
        'Strip the leading `#`, then if the remaining string has 3 characters, expand each to a doubled pair (e.g. "f0a" -> "ff00aa").',
        'Parse the 6-character hex string as a base-16 integer with `parseInt(full, 16)`.',
        'Extract each channel with bit shifting: red is bits 16-23, green is bits 8-15, blue is bits 0-7.',
      ],
    },
    solution: {
      algorithm: 'Strip the #, expand shorthand 3-digit hex to 6 digits, parse as a base-16 number, then extract r/g/b via bit shifts and masking.',
      dryRun: "'#f00' -> clean='f00' -> full='ff0000' -> num=0xff0000\nr=(num>>16)&255=255, g=(num>>8)&255=0, b=num&255=0",
      javascriptSolution: `function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}`,
      typescriptSolution: `function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}`,
      timeComplexity: 'O(1) — fixed-length string operations.',
      spaceComplexity: 'O(1).',
      commonMistakes: [
        'Not expanding 3-digit shorthand hex before parsing, which misreads "f00" as if it were a 6-digit value.',
        'Using `& 0xff` incorrectly on the wrong bit-shift amount, swapping channels.',
        'Forgetting to strip the leading `#` before calling `parseInt`.',
      ],
      followUpQuestions: [
        'How would you write the inverse `rgbToHex` function?',
        'How would you support an optional alpha channel (#rrggbbaa or #rgba)?',
        'How would you validate the input is actually a well-formed hex string first?',
      ],
      similarQuestions: ['Validate a Hex Color', 'Lighten or Darken a Hex Color'],
    },
  },
  {
    detail: {
      id: 'css-coding-2',
      // Answer focus: under the stated simplified selector grammar, count IDs, classes and element tokens independently; real CSS specificity is a tuple/cascade model, not a single decimal score.
      questionNumber: 'CSSCODE-2',
      title: 'Compute CSS Selector Specificity',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 5,
      category: 'Selectors',
      part: 'CSS',
      concepts: ['Specificity', 'Regex', 'Cascade'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given a simple CSS selector string (IDs, classes, and element/tag names, space-separated with no combinators like > or attribute/pseudo selectors), return its specificity as a [idCount, classCount, elementCount] tuple.',
      input: 'selector: string',
      output: 'number[] — [idCount, classCount, elementCount]',
      constraints: ['Selector contains only #id, .class, and bare tag-name tokens separated by whitespace'],
      examples: [{ input: "'#header .nav a'", output: '[1, 1, 1]', explanation: 'One id, one class, one element.' }],
      edgeCases: [{ case: 'Selector with only classes', expected: 'idCount and elementCount are 0' }],
      functionName: 'parseCssSpecificity',
      isClassBased: false,
      sampleTests: [
        { input: ['#header .nav a'], expectedOutput: [1, 1, 1], description: 'one id, one class, one element' },
        { input: ['div'], expectedOutput: [0, 0, 1], description: 'single element selector' },
        { input: ['.btn.primary'], expectedOutput: [0, 2, 0], description: 'two chained classes' },
        { input: ['div p'], expectedOutput: [0, 0, 2], description: 'two descendant elements' },
      ],
    },
    hints: {
      hints: [
        'Count IDs by matching `/#[\\w-]+/g` — each match is worth one ID point.',
        'Count classes by matching `/\\.[\\w-]+/g` — each match is worth one class point.',
        'Count elements by matching a bare word at the start of the string or right after whitespace: `/(^|[\\s])[a-zA-Z][\\w-]*/g` — this naturally skips over `#id` and `.class` tokens since they are not preceded by whitespace-or-start plus a letter.',
      ],
    },
    solution: {
      algorithm:
        'Run three independent regex matches over the selector string: one counting `#id` tokens, one counting `.class` tokens, and one counting bare element-name tokens that start the string or follow whitespace. Return the three counts as a tuple.',
      dryRun: "'#header .nav a'\nids: match '#header' -> 1\nclasses: match '.nav' -> 1\nelements: match ' a' (space+letter) -> 1 ('#header' and '.nav' are not letter-led) \nresult=[1,1,1]",
      javascriptSolution: `function parseCssSpecificity(selector) {
  const ids = (selector.match(/#[\\w-]+/g) || []).length;
  const classes = (selector.match(/\\.[\\w-]+/g) || []).length;
  const elements = (selector.match(/(^|[\\s])[a-zA-Z][\\w-]*/g) || []).length;
  return [ids, classes, elements];
}`,
      typescriptSolution: `function parseCssSpecificity(selector: string): [number, number, number] {
  const ids = (selector.match(/#[\\w-]+/g) || []).length;
  const classes = (selector.match(/\\.[\\w-]+/g) || []).length;
  const elements = (selector.match(/(^|[\\s])[a-zA-Z][\\w-]*/g) || []).length;
  return [ids, classes, elements];
}`,
      timeComplexity: 'O(n) where n is the selector string length.',
      spaceComplexity: 'O(n) for the intermediate match arrays.',
      commonMistakes: [
        'Counting the element regex against `.class` or `#id` tokens too, because the letter check does not exclude a preceding `.` or `#` correctly.',
        'Forgetting that this simplified version does not handle combinators (`>`, `+`, `~`), attribute selectors, or pseudo-classes/elements — real specificity calculators need more cases.',
        'Treating specificity as a single number instead of a tuple, which breaks comparisons since 10 classes should not "carry over" into IDs.',
      ],
      followUpQuestions: [
        'How would you extend this to handle pseudo-classes (:hover) and attribute selectors ([type="text"]) as class-level specificity?',
        'How would you compare two specificity tuples to determine cascade precedence?',
        'How do inline styles and `!important` fit into the specificity model?',
      ],
      similarQuestions: ['Sort Selectors by Specificity', 'CSS Cascade Order'],
    },
  },
  {
    detail: {
      id: 'css-coding-3',
      // Answer focus: preserve argument order, ignore falsy values, include only truthy own object keys, and join exactly once.
      questionNumber: 'CSSCODE-3',
      title: 'Merge Conditional Class Names',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 5,
      category: 'Class Utilities',
      part: 'CSS',
      concepts: ['Conditional Logic', 'String Building'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Implement a classNames utility (like the popular `classnames` package) that accepts any mix of strings and objects mapping class name to a boolean, and returns a single space-separated class string of the truthy ones.',
      input: '...args: (string | Record<string, boolean> | null | undefined | false)[]',
      output: 'string — space-separated class names',
      constraints: ['Falsy arguments (null, undefined, false, empty string) are ignored'],
      examples: [{ input: "'btn', { active: true, disabled: false }, 'large'", output: "'btn active large'", explanation: 'Only truthy object keys are included, in argument order.' }],
      edgeCases: [{ case: 'No arguments', expected: "Returns ''" }],
      functionName: 'classNames',
      isClassBased: false,
      sampleTests: [
        {
          input: ['btn', { active: true, disabled: false }, 'large'],
          expectedOutput: 'btn active large',
          description: 'strings mixed with a conditional object',
        },
        { input: ['a', null, undefined, '', 'b'], expectedOutput: 'a b', description: 'falsy values are skipped' },
        { input: [{ x: true, y: true, z: false }], expectedOutput: 'x y', description: 'object-only input' },
        { input: [], expectedOutput: '', description: 'no arguments' },
      ],
    },
    hints: {
      hints: [
        'Iterate `args` with a rest parameter; skip any falsy argument immediately.',
        'A string argument is pushed directly; an object argument contributes each key whose value is truthy.',
        'Join the collected class names with a single space at the end.',
      ],
    },
    solution: {
      algorithm:
        'Collect an output array. For each argument: skip if falsy; push directly if it is a string; otherwise (an object) push every own key whose value is truthy, in insertion order. Join the array with spaces.',
      dryRun: "['btn', {active:true,disabled:false}, 'large']\n'btn' -> push 'btn'\n{active:true,disabled:false} -> active truthy -> push 'active'; disabled falsy -> skip\n'large' -> push 'large'\nresult='btn active large'",
      javascriptSolution: `function classNames(...args) {
  const classes = [];
  for (const arg of args) {
    if (!arg) continue;
    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (typeof arg === 'object') {
      for (const key of Object.keys(arg)) {
        if (arg[key]) classes.push(key);
      }
    }
  }
  return classes.join(' ');
}`,
      typescriptSolution: `type ClassArg =
  | string
  | Record<string, boolean>
  | null
  | undefined
  | false;

function classNames(...args: ClassArg[]): string {
  const classes: string[] = [];

  for (const arg of args) {
    if (!arg) continue;

    if (typeof arg === 'string') {
      classes.push(arg);
    } else {
      for (const key of Object.keys(arg)) {
        if (arg[key]) classes.push(key);
      }
    }
  }

  return classes.join(' ');
}`,
      timeComplexity: 'O(n) where n is the total number of arguments and object keys.',
      spaceComplexity: 'O(n) for the collected class name array.',
      commonMistakes: [
        'Not skipping falsy arguments up front, causing a crash when `typeof null === "object"` falls into the object branch.',
        "Iterating with `for...in` without guarding against inherited enumerable properties; `Object.keys()` keeps the utility limited to the object's own keys.",
        'Joining with no separator instead of a space, producing an invalid combined class string.',
      ],
      followUpQuestions: [
        'How would you support arrays of class names as arguments too (e.g. `classNames(["a", "b"])`)?',
        'How does this relate to Tailwind\'s `clsx`/`cn` helper pattern used in component libraries?',
        'How would you dedupe class names if the same one appears from multiple arguments?',
      ],
      similarQuestions: ['Parse CSS Box Shorthand', 'Validate a Hex Color'],
    },
  },
  {
    detail: {
      id: 'css-coding-4',
      // Answer focus: CSS box shorthand maps 1→all, 2→vertical/horizontal, 3→top/horizontal/bottom, 4→top/right/bottom/left.
      questionNumber: 'CSSCODE-4',
      title: 'Parse CSS Box Shorthand',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: 'Box Model',
      part: 'CSS',
      concepts: ['Shorthand Properties', 'Box Model', 'Parsing'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given a CSS margin/padding shorthand value (1 to 4 space-separated values), expand it into an explicit { top, right, bottom, left } object following the standard CSS shorthand expansion rules.',
      input: 'value: string',
      output: 'object — { top: string, right: string, bottom: string, left: string }',
      constraints: ['value has between 1 and 4 space-separated tokens'],
      examples: [{ input: "'1px 2px 3px'", output: "{ top: '1px', right: '2px', bottom: '3px', left: '2px' }", explanation: 'Three values: top, left+right, bottom.' }],
      edgeCases: [{ case: 'Single value', expected: 'Applied to all four sides' }],
      functionName: 'parseBoxShorthand',
      isClassBased: false,
      sampleTests: [
        { input: ['10px'], expectedOutput: { top: '10px', right: '10px', bottom: '10px', left: '10px' }, description: 'one value applies to all sides' },
        { input: ['10px 20px'], expectedOutput: { top: '10px', right: '20px', bottom: '10px', left: '20px' }, description: 'two values: vertical, horizontal' },
        { input: ['1px 2px 3px'], expectedOutput: { top: '1px', right: '2px', bottom: '3px', left: '2px' }, description: 'three values: top, sides, bottom' },
        { input: ['1px 2px 3px 4px'], expectedOutput: { top: '1px', right: '2px', bottom: '3px', left: '4px' }, description: 'four explicit values' },
      ],
    },
    hints: {
      hints: [
        'Split the value on whitespace and branch on how many tokens you got: 1, 2, 3, or 4.',
        'The CSS shorthand rule: 1 value = all sides; 2 = vertical, horizontal; 3 = top, horizontal, bottom; 4 = top, right, bottom, left explicitly.',
        'Use array destructuring for the 4-value case to keep the mapping readable.',
      ],
    },
    solution: {
      algorithm:
        'Split the trimmed value on whitespace. Based on the token count (1-4), assign top/right/bottom/left following the standard CSS box shorthand expansion rules.',
      dryRun: "'1px 2px 3px' -> parts=['1px','2px','3px'] -> length 3 -> top='1px', right=left='2px', bottom='3px'",
      javascriptSolution: `function parseBoxShorthand(value) {
  const parts = value.trim().split(/\\s+/);
  let top, right, bottom, left;
  if (parts.length === 1) {
    top = right = bottom = left = parts[0];
  } else if (parts.length === 2) {
    top = bottom = parts[0];
    right = left = parts[1];
  } else if (parts.length === 3) {
    top = parts[0];
    right = left = parts[1];
    bottom = parts[2];
  } else {
    [top, right, bottom, left] = parts;
  }
  return { top, right, bottom, left };
}`,
      typescriptSolution: `function parseBoxShorthand(value: string): { top: string; right: string; bottom: string; left: string } {
  const parts = value.trim().split(/\\s+/);
  let top: string, right: string, bottom: string, left: string;
  if (parts.length === 1) {
    top = right = bottom = left = parts[0]!;
  } else if (parts.length === 2) {
    top = bottom = parts[0]!;
    right = left = parts[1]!;
  } else if (parts.length === 3) {
    top = parts[0]!;
    right = left = parts[1]!;
    bottom = parts[2]!;
  } else {
    [top, right, bottom, left] = parts as [string, string, string, string];
  }
  return { top, right, bottom, left };
}`,
      timeComplexity: 'O(1) — a fixed, small number of tokens.',
      spaceComplexity: 'O(1).',
      commonMistakes: [
        'Mixing up the 3-value case, assigning left/right independently instead of both to the single horizontal value.',
        'Not trimming/normalizing multiple spaces between tokens before splitting.',
        'Assuming exactly 4 tokens always and destructuring blindly, breaking on the 1-3 value shorthand forms.',
      ],
      followUpQuestions: [
        'How would you validate that each token is a well-formed CSS length (e.g. "10px", "1rem", "0")?',
        'How would you write the inverse function that collapses an explicit box object back into the shortest valid shorthand?',
        'How does `border-radius` shorthand expansion differ from margin/padding?',
      ],
      similarQuestions: ['Merge Conditional Class Names', 'Convert Hex Color to RGB'],
    },
  },
  {
    detail: {
      id: 'css-coding-5',
      // Answer focus: rem = px / root font size; default to 16 only when the optional base is absent.
      questionNumber: 'CSSCODE-5',
      title: 'Convert Pixels to Rem',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 3,
      category: 'Units',
      part: 'CSS',
      concepts: ['Units', 'Responsive Design'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Convert a pixel value to rem given a base font size (defaulting to 16px when not provided).',
      input: 'px: number, baseFontSize?: number',
      output: 'number — the equivalent value in rem',
      constraints: ['px >= 0', 'baseFontSize > 0 when provided'],
      examples: [{ input: '32, 16', output: '2', explanation: '32px is 2x the 16px base, so 2rem.' }],
      edgeCases: [{ case: 'baseFontSize omitted', expected: 'Defaults to 16' }],
      functionName: 'pxToRem',
      isClassBased: false,
      sampleTests: [
        { input: [32, 16], expectedOutput: 2, description: 'double the base size' },
        { input: [24, 16], expectedOutput: 1.5, description: 'one and a half times the base size' },
        { input: [16], expectedOutput: 1, description: 'default base font size of 16' },
        { input: [8, 16], expectedOutput: 0.5, description: 'half the base size' },
      ],
    },
    hints: {
      hints: [
        'rem is simply the pixel value divided by the root font size.',
        'Default the base font size to 16 when the second argument is not passed (`undefined`).',
        'No rounding is needed for the given test cases, but consider it for a production version to avoid long floating point tails.',
      ],
    },
    solution: {
      algorithm: 'Default baseFontSize to 16 if not provided, then return px divided by baseFontSize.',
      dryRun: 'pxToRem(24, 16) -> 24/16 = 1.5',
      javascriptSolution: `function pxToRem(px, baseFontSize) {
  const base = baseFontSize ?? 16;
  return px / base;
}`,
      typescriptSolution: `function pxToRem(px: number, baseFontSize?: number): number {
  const base = baseFontSize ?? 16;
  return px / base;
}`,
      timeComplexity: 'O(1).',
      spaceComplexity: 'O(1).',
      commonMistakes: [
        'Using `baseFontSize ?? 16` versus `|| 16` — for this problem they behave the same since a valid base font size is never 0, but the distinction matters in general (`||` treats 0 as falsy).',
        'Multiplying instead of dividing, inverting the conversion direction.',
        'Not defaulting the base font size at all, causing `NaN` when only one argument is passed.',
      ],
      followUpQuestions: [
        'How would you write the inverse `remToPx` function?',
        'Why is rem generally preferred over px for font sizing in responsive design?',
        'How would you round the result to a sensible number of decimal places for output?',
      ],
      similarQuestions: ['Parse CSS Box Shorthand', 'Compute CSS Selector Specificity'],
    },
  },
  {
    detail: {
      id: 'css-coding-6',
      // Answer focus: for this simplified selector grammar, compute id*100 + class*10 + element and sort a copy of the input.
      questionNumber: 'CSSCODE-6',
      title: 'Sort Selectors by Specificity',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 3,
      category: 'Selectors',
      part: 'CSS',
      concepts: ['Specificity', 'Sorting', 'Cascade'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given an array of simple CSS selectors (IDs, classes, and elements only, no combinators), sort them from lowest to highest specificity, using id-weight 100, class-weight 10, and element-weight 1.',
      input: 'selectors: string[]',
      output: 'string[] — selectors sorted ascending by computed specificity weight',
      constraints: ['Each selector contains only #id, .class, and bare tag-name tokens'],
      examples: [{ input: "['div', '.btn', '#header']", output: "['div', '.btn', '#header']", explanation: 'Element < class < id in specificity weight.' }],
      edgeCases: [{ case: 'Selectors with equal specificity', expected: 'Relative order between them may vary but each individually keeps its computed weight' }],
      functionName: 'sortSelectorsBySpecificity',
      isClassBased: false,
      sampleTests: [
        { input: [['div', '.btn', '#header']], expectedOutput: ['div', '.btn', '#header'], description: 'already-ascending specificity' },
        { input: [['#a', 'div', '.b']], expectedOutput: ['div', '.b', '#a'], description: 'needs reordering by weight' },
      ],
    },
    hints: {
      hints: [
        'Compute a numeric weight per selector: `idCount * 100 + classCount * 10 + elementCount`.',
        'Reuse the same counting approach as the specificity-tuple problem, just collapsed into one weighted number for comparison.',
        'Sort a copy of the array (`[...selectors]`) so the input is not mutated, using the weight as the comparator key.',
      ],
    },
    solution: {
      algorithm:
        'Define a local weight function that counts ids (#), classes (.), and elements via regex, combining them into one number (ids*100 + classes*10 + elements). Sort a shallow copy of the selectors array ascending by that weight.',
      dryRun: "['#a','div','.b']\nweight('#a')=100, weight('div')=1, weight('.b')=10\nsorted ascending -> ['div','.b','#a']",
      javascriptSolution: `function sortSelectorsBySpecificity(selectors) {
  const weight = (s) => {
    const ids = (s.match(/#[\\w-]+/g) || []).length;
    const classes = (s.match(/\\.[\\w-]+/g) || []).length;
    const elements = (s.match(/(^|[\\s])[a-zA-Z][\\w-]*/g) || []).length;
    return ids * 100 + classes * 10 + elements;
  };
  return [...selectors].sort((a, b) => weight(a) - weight(b));
}`,
      typescriptSolution: `function sortSelectorsBySpecificity(selectors: string[]): string[] {
  const weight = (s: string): number => {
    const ids = (s.match(/#[\\w-]+/g) || []).length;
    const classes = (s.match(/\\.[\\w-]+/g) || []).length;
    const elements = (s.match(/(^|[\\s])[a-zA-Z][\\w-]*/g) || []).length;
    return ids * 100 + classes * 10 + elements;
  };
  return [...selectors].sort((a, b) => weight(a) - weight(b));
}`,
      timeComplexity: 'O(n log n) for the sort, with O(m) weight computation per selector of length m.',
      spaceComplexity: 'O(n) for the copied array.',
      commonMistakes: [
        'Sorting the original array in place with `.sort()`, mutating a value the caller may not expect to change.',
        'Using unweighted counts (just comparing tuples lexicographically) instead of collapsing to a single comparable number, which can misorder classes vs many elements.',
        'Not making the comparator stable/deterministic for equal weights, though `Array.prototype.sort` is stable in modern engines so equal-weight order is preserved from the input.',
      ],
      followUpQuestions: [
        'How would this need to change to correctly rank selectors with combinators or pseudo-elements?',
        'How would you group selectors into specificity "tiers" instead of a total order?',
        'How does source order break ties between selectors of equal specificity in the real CSS cascade?',
      ],
      similarQuestions: ['Compute CSS Selector Specificity', 'CSS Cascade Order'],
    },
  },
  {
    detail: {
      id: 'css-coding-7',
      // Answer focus: validate the entire string against exactly #rgb or #rrggbb; do not accidentally accept substrings.
      questionNumber: 'CSSCODE-7',
      title: 'Validate a Hex Color String',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 3,
      category: 'Color',
      part: 'CSS',
      concepts: ['Regex', 'Validation'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Determine whether a string is a valid 3-digit or 6-digit hex color code, including the leading #.',
      input: 'str: string',
      output: 'boolean — true if str is a valid #rgb or #rrggbb hex color',
      constraints: ['0 <= str.length <= 20'],
      examples: [
        { input: "'#fff'", output: 'true', explanation: 'Valid 3-digit shorthand.' },
        { input: "'123456'", output: 'false', explanation: 'Missing the leading #.' },
      ],
      edgeCases: [{ case: 'Wrong digit count, e.g. "#12"', expected: 'Returns false' }],
      functionName: 'isValidHexColor',
      isClassBased: false,
      sampleTests: [
        { input: ['#fff'], expectedOutput: true, description: 'valid 3-digit hex' },
        { input: ['#1a2b3c'], expectedOutput: true, description: 'valid 6-digit hex' },
        { input: ['123456'], expectedOutput: false, description: 'missing leading #' },
        { input: ['#12'], expectedOutput: false, description: 'wrong digit count' },
      ],
    },
    hints: {
      hints: [
        'Anchor a regex with `^` and `$` so the whole string must match, not just a substring.',
        'A valid hex color is `#` followed by exactly 3 or exactly 6 hex digits: `/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/`.',
        'Use `.test()` to get a boolean directly from the regex.',
      ],
    },
    solution: {
      algorithm: 'Test the string against an anchored regex requiring a leading # followed by exactly 3 or exactly 6 hexadecimal digits.',
      dryRun: "'#fff' -> matches #([0-9a-fA-F]{3}) branch -> true",
      javascriptSolution: `function isValidHexColor(str) {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(str);
}`,
      typescriptSolution: `function isValidHexColor(str: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(str);
}`,
      timeComplexity: 'O(n) for the regex scan over the string length.',
      spaceComplexity: 'O(1).',
      commonMistakes: [
        'Forgetting the `^` and `$` anchors, allowing a valid hex substring inside a longer invalid string to pass.',
        'Not supporting the 3-digit shorthand form, rejecting valid short hex colors.',
        'Allowing 4-digit or 8-digit hex (with alpha) without intending to — decide explicitly whether alpha variants are in scope.',
      ],
      followUpQuestions: [
        'How would you extend this to also accept 4-digit and 8-digit hex-with-alpha forms (#rgba, #rrggbbaa)?',
        'How would you validate `rgb()`/`rgba()` and `hsl()` color strings instead?',
        'How would you normalize a valid 3-digit hex into its 6-digit equivalent?',
      ],
      similarQuestions: ['Convert Hex Color to RGB', 'Lighten or Darken a Hex Color'],
    },
  },
  {
    detail: {
      id: 'css-coding-8',
      // Answer focus: convert channels to RGB, shift each channel by round(2.55 * percent), clamp to [0,255], then rebuild a zero-padded 6-digit hex color.
      questionNumber: 'CSSCODE-8',
      title: 'Lighten or Darken a Hex Color',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 3,
      category: 'Color',
      part: 'CSS',
      concepts: ['Bitwise Operations', 'Color Formats', 'Clamping'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given a 6-digit hex color and a percent (-100 to 100), return a new hex color with each RGB channel shifted toward white (positive percent) or black (negative percent), clamped to the valid 0-255 range.',
      input: 'hex: string, percent: number',
      output: 'string — the adjusted 6-digit hex color, with a leading #',
      constraints: ['hex is a valid 6-digit hex color with a leading #', '-100 <= percent <= 100'],
      examples: [{ input: "'#000000', 50", output: "'#7f7f7f'", explanation: 'Each channel is shifted up by roughly half of 255.' }],
      edgeCases: [{ case: 'Result channel would exceed 255 or go below 0', expected: 'Clamped to 255 or 0 respectively' }],
      functionName: 'lightenDarkenColor',
      isClassBased: false,
      sampleTests: [
        { input: ['#000000', 50], expectedOutput: '#808080', description: 'lighten black by 50%' },
        { input: ['#808080', -20], expectedOutput: '#4d4d4d', description: 'darken mid-gray by 20%' },
        { input: ['#ffffff', -50], expectedOutput: '#808080', description: 'darken white, clamped within range' },
      ],
    },
    hints: {
      hints: [
        'Convert the percent to an additive amount per channel: `Math.round((255 * percent) / 100)` (2.55 = 255 / 100).',
        'Extract each channel with bit shifting, add the amount, then clamp with `Math.max(Math.min(255, value), 0)`.',
        'Reassemble the channels into a hex string; the `(0x1000000 + r*0x10000 + g*0x100 + b).toString(16).slice(1)` trick guarantees zero-padding.',
      ],
    },
    solution: {
      algorithm:
        'Parse the hex into a number. Compute an additive amount from the percent. Add it to each of the three channels extracted via bit shifting, clamp each to [0, 255], then reassemble into a zero-padded hex string using the leading-1 trick.',
      dryRun: "'#000000', 50 -> num=0, amt=round((255*50)/100)=128\nr=128, g=128, b=128 -> #808080\nresult hex from (0x1000000+128*0x10000+128*0x100+128).toString(16).slice(1)",
      javascriptSolution: `function lightenDarkenColor(hex, percent) {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  const amt = Math.round((255 * percent) / 100);
  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0x00ff) + amt;
  let b = (num & 0x0000ff) + amt;
  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);
  return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
}`,
      typescriptSolution: `function lightenDarkenColor(hex: string, percent: number): string {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  const amt = Math.round((255 * percent) / 100);
  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0x00ff) + amt;
  let b = (num & 0x0000ff) + amt;
  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);
  return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
}`,
      timeComplexity: 'O(1) — fixed-size bitwise arithmetic.',
      spaceComplexity: 'O(1).',
      commonMistakes: [
        'Forgetting to clamp each channel, producing an out-of-range or negative value that corrupts the reassembled hex string.',
        'Getting the bit masks wrong when extracting the green channel, bleeding bits from red or blue into it.',
        'Not zero-padding the final hex string for channels below 0x10, producing a string shorter than 6 hex digits.',
      ],
      followUpQuestions: [
        'How would you implement this by converting to HSL, adjusting lightness, and converting back, instead of a linear RGB shift?',
        'How would you support 3-digit shorthand hex input as well?',
        'What perceptual issues does a naive linear RGB lighten/darken have compared to adjusting in HSL space?',
      ],
      similarQuestions: ['Convert Hex Color to RGB', 'Validate a Hex Color'],
    },
  },
];