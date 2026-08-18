// Hand-authored coding questions for the HTML part. These are real
// CodingQuestionDetail problems built around string/markup/DOM-tree
// manipulation logic — the kind of coding exercise HTML interview rounds
// actually ask, expressed as plain-data JS functions so they're testable
// without a real DOM. Every sampleTests entry has been checked against the
// reference solution below.

import type { MockCodingQuestion } from '@/mocks/questions';

const COMPANIES = ['Google', 'Meta', 'Amazon', 'Microsoft', 'Adobe', 'Flipkart', 'Zomato'];

export const MOCK_HTML_CODING_QUESTIONS: MockCodingQuestion[] = [
  {
    detail: {
      id: 'html-coding-1',
      questionNumber: 'HTMLCODE-1',
      title: 'Escape HTML Special Characters',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 5,
      category: 'Security',
      part: 'HTML',
      concepts: ['XSS Prevention', 'String Manipulation'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Write a function that escapes HTML special characters (&, <, >, ", \') in a string so it can be safely inserted into a page as text without being interpreted as markup.',
      input: 'str: string',
      output: 'string — the escaped string',
      constraints: ['0 <= str.length <= 10^4'],
      examples: [{ input: '\'<div>"hi"</div>\'', output: "'&lt;div&gt;&quot;hi&quot;&lt;/div&gt;'", explanation: 'Angle brackets and quotes are escaped.' }],
      edgeCases: [
        { case: 'String with no special characters', expected: 'Returned unchanged' },
        { case: 'Empty string', expected: "Returns ''" },
      ],
      functionName: 'escapeHtml',
      isClassBased: false,
      sampleTests: [
        { input: ['<div>"hi" & \'bye\'</div>'], expectedOutput: '&lt;div&gt;&quot;hi&quot; &amp; &#39;bye&#39;&lt;/div&gt;', description: 'escapes all five special characters' },
        { input: ['safe text'], expectedOutput: 'safe text', description: 'no special characters, unchanged' },
        { input: [''], expectedOutput: '', description: 'empty string' },
      ],
    },
    hints: {
      hints: [
        'Use `String.prototype.replace` with a regex character class matching all five characters at once: `/[&<>"\']/g`.',
        'A lookup map from character to its entity keeps the replacer function simple.',
        'Escape `&` conceptually first in your head even though the regex handles it in one pass — otherwise you would double-escape entities.',
      ],
    },
    solution: {
      algorithm: 'Replace every occurrence of &, <, >, ", and \' in one regex pass using a lookup table mapping each character to its HTML entity.',
      dryRun: '\'<b>\' -> "<" -> "&lt;", "b" unchanged, ">" -> "&gt;" -> result "&lt;b&gt;"',
      javascriptSolution: `function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return str.replace(/[&<>"']/g, (ch) => map[ch]);
}`,
      typescriptSolution: `function escapeHtml(str: string): string {
  const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return str.replace(/[&<>"']/g, (ch) => map[ch]!);
}`,
      timeComplexity: 'O(n) — one pass over the string.',
      spaceComplexity: 'O(n) for the resulting string.',
      commonMistakes: [
        'Escaping `&` in a separate later pass, which double-escapes entities produced by the first pass (e.g. `&lt;` becomes `&amp;lt;`).',
        'Missing single quotes, which matters when the escaped value is later placed inside a single-quoted HTML attribute.',
        'Relying on `innerText`/`textContent` assignment instead when the actual requirement is to produce an escaped string, not touch the DOM.',
      ],
      followUpQuestions: [
        'Why is this insufficient protection when inserting into an HTML attribute value versus a text node?',
        'How would you write the inverse `unescapeHtml` function?',
        'How does this relate to how React escapes JSX expressions automatically?',
      ],
      similarQuestions: ['Sanitize a URL', 'Strip HTML Tags'],
    },
  },
  {
    detail: {
      id: 'html-coding-2',
      questionNumber: 'HTMLCODE-2',
      title: 'Strip HTML Tags from a String',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: 'Parsing',
      part: 'HTML',
      concepts: ['Regex', 'String Manipulation'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given an HTML string, return the plain text with all tags removed, leaving only the text content.',
      input: 'html: string',
      output: 'string — the tag-free text content',
      constraints: ['Tags are well-formed (no malformed or unclosed angle brackets)'],
      examples: [{ input: "'<p>Hello <b>World</b>!</p>'", output: "'Hello World!'", explanation: 'All tags are removed, text content is preserved.' }],
      edgeCases: [
        { case: 'No tags present', expected: 'Returned unchanged' },
        { case: 'Only tags, no text', expected: "Returns ''" },
      ],
      functionName: 'stripHtmlTags',
      isClassBased: false,
      sampleTests: [
        { input: ['<p>Hello <b>World</b>!</p>'], expectedOutput: 'Hello World!', description: 'nested tags removed, text kept' },
        { input: ['no tags here'], expectedOutput: 'no tags here', description: 'no tags to strip' },
        { input: ['<div><span></span></div>'], expectedOutput: '', description: 'only tags, no text content' },
      ],
    },
    hints: {
      hints: [
        'A regex like `/<[^>]*>/g` matches any tag: `<`, any run of non-`>` characters, then `>`.',
        'Replacing every match with an empty string leaves only text nodes behind.',
        'This is a lossy heuristic — it assumes well-formed tags, not arbitrary malformed markup.',
      ],
    },
    solution: {
      algorithm: 'Replace every substring matching `<[^>]*>` (an opening `<`, any non-`>` characters, a closing `>`) with an empty string.',
      dryRun: "'<p>Hi</p>' -> match '<p>' -> remove -> 'Hi</p>' -> match '</p>' -> remove -> 'Hi'",
      javascriptSolution: `function stripHtmlTags(html) {
  return html.replace(/<[^>]*>/g, '');
}`,
      typescriptSolution: `function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}`,
      timeComplexity: 'O(n) — a single regex pass over the string.',
      spaceComplexity: 'O(n) for the resulting string.',
      commonMistakes: [
        'Using a greedy `.*` instead of `[^>]*`, which can span across multiple tags on malformed input.',
        'Not handling self-closing tags like `<br/>`, though the same regex actually covers them since it just matches up to the next `>`.',
        'Assuming this is a safe sanitizer against XSS — regex tag-stripping is not equivalent to a real sanitizer for untrusted input.',
      ],
      followUpQuestions: [
        'Why is a real HTML parser (like `DOMParser`) safer than a regex for untrusted input?',
        'How would you preserve line breaks by converting `<br>` and block tags to `\\n` before stripping?',
        'How would this behave on malformed HTML with an unclosed tag?',
      ],
      similarQuestions: ['Escape HTML Special Characters', 'Valid HTML Tag Nesting'],
    },
  },
  {
    detail: {
      id: 'html-coding-3',
      questionNumber: 'HTMLCODE-3',
      title: 'Validate Balanced HTML Tags',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 4,
      category: 'Parsing',
      part: 'HTML',
      concepts: ['Stack', 'Parsing', 'Nesting Validation'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given a stream of tag tokens (e.g. "<div>", "</div>"), determine whether every opening tag has a matching closing tag in the correct nested order.',
      input: 'tags: string[]',
      output: 'boolean — true if the tags are properly balanced and nested',
      constraints: ['Each token is either "<name>" or "</name>"'],
      examples: [{ input: "['<div>', '<span>', '</span>', '</div>']", output: 'true', explanation: 'Properly nested and closed.' }],
      edgeCases: [
        { case: 'Closing tag with no matching open tag', expected: 'Returns false' },
        { case: 'Empty stream', expected: 'Returns true (vacuously balanced)' },
      ],
      functionName: 'isBalancedTags',
      isClassBased: false,
      sampleTests: [
        { input: [['<div>', '<span>', '</span>', '</div>']], expectedOutput: true, description: 'properly nested tags' },
        { input: [['<div>', '<span>', '</div>']], expectedOutput: false, description: 'closed in the wrong order' },
        { input: [['<p>']], expectedOutput: false, description: 'unclosed tag' },
        { input: [[]], expectedOutput: true, description: 'empty stream is trivially balanced' },
      ],
    },
    hints: {
      hints: [
        'This is a classic stack problem, just like balanced parentheses.',
        'On an opening tag, push its name. On a closing tag, pop and check the popped name matches.',
        'At the end, the stack must be empty for the tags to be balanced.',
      ],
    },
    solution: {
      algorithm:
        'Use a stack of tag names. For each token: if it opens a tag, push the name; if it closes a tag, pop the stack and return false immediately if the popped name does not match or the stack was empty. After processing all tokens, the tags are balanced only if the stack is empty.',
      dryRun: "['<div>','<span>','</span>','</div>']\n<div> -> push div -> [div]\n<span> -> push span -> [div,span]\n</span> -> pop span, matches -> [div]\n</div> -> pop div, matches -> []\nstack empty -> true",
      javascriptSolution: `function isBalancedTags(tags) {
  const stack = [];
  for (const t of tags) {
    if (t.startsWith('</')) {
      const name = t.slice(2, -1);
      if (stack.pop() !== name) return false;
    } else {
      const name = t.slice(1, -1);
      stack.push(name);
    }
  }
  return stack.length === 0;
}`,
      typescriptSolution: `function isBalancedTags(tags: string[]): boolean {
  const stack: string[] = [];
  for (const t of tags) {
    if (t.startsWith('</')) {
      const name = t.slice(2, -1);
      if (stack.pop() !== name) return false;
    } else {
      const name = t.slice(1, -1);
      stack.push(name);
    }
  }
  return stack.length === 0;
}`,
      timeComplexity: 'O(n) — each token is pushed or popped at most once.',
      spaceComplexity: 'O(n) worst case for the stack, when tags are deeply nested without closing.',
      commonMistakes: [
        'Popping without checking for an empty stack first — `stack.pop()` on an empty array returns `undefined`, which happens to compare unequal safely here, but relying on that is fragile.',
        'Forgetting to check the final stack is empty, missing the case of unclosed trailing tags.',
        'Comparing the full token (e.g. "<div>" vs "</div>") instead of extracting just the tag name.',
      ],
      followUpQuestions: [
        'How would you extend this to also validate self-closing tags like `<br/>`?',
        'How does this relate to the classic "Valid Parentheses" problem?',
        'How would you report *where* the imbalance occurred, not just whether one exists?',
      ],
      similarQuestions: ['Valid Parentheses', 'Remove Invalid Parentheses'],
    },
  },
  {
    detail: {
      id: 'html-coding-4',
      questionNumber: 'HTMLCODE-4',
      title: 'Build a Tree from a Flat List',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 5,
      category: 'DOM Structures',
      part: 'HTML',
      concepts: ['Tree Construction', 'Hashing', 'Nested Menus'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given a flat list of items with id and parentId fields (as used for nested menus or comment threads), build the nested tree of root items, each carrying a children array.',
      input: 'items: { id: number, parentId: number | null, name: string }[]',
      output: 'array of root nodes, each with a children array of nested nodes',
      constraints: ['Every parentId (if not null) refers to an id present in items'],
      examples: [{ input: "[{id:1,parentId:null,name:'root'},{id:2,parentId:1,name:'child'}]", output: "[{id:1,parentId:null,name:'root',children:[{id:2,parentId:1,name:'child',children:[]}]}]", explanation: 'child is nested under root.' }],
      edgeCases: [
        { case: 'All items are roots', expected: 'Every item appears at the top level with an empty children array' },
        { case: 'Empty list', expected: 'Returns []' },
      ],
      functionName: 'buildTreeFromFlatList',
      isClassBased: false,
      sampleTests: [
        {
          input: [
            [
              { id: 1, parentId: null, name: 'root' },
              { id: 2, parentId: 1, name: 'child' },
            ],
          ],
          expectedOutput: [{ id: 1, parentId: null, name: 'root', children: [{ id: 2, parentId: 1, name: 'child', children: [] }] }],
          description: 'single parent-child pair',
        },
        {
          input: [
            [
              { id: 1, parentId: null, name: 'a' },
              { id: 2, parentId: null, name: 'b' },
            ],
          ],
          expectedOutput: [
            { id: 1, parentId: null, name: 'a', children: [] },
            { id: 2, parentId: null, name: 'b', children: [] },
          ],
          description: 'two independent roots',
        },
        { input: [[]], expectedOutput: [], description: 'empty list' },
      ],
    },
    hints: {
      hints: [
        'First pass: build a `Map` from id to a shallow-cloned node with an empty `children` array.',
        'Second pass: for each item, if parentId is null it is a root; otherwise look up the parent in the map and push the node onto its children.',
        'Doing this in two passes avoids depending on parents appearing before children in the input order.',
      ],
    },
    solution: {
      algorithm:
        'Build a Map from id to a cloned node (spread of the item plus an empty children array). Walk the items again: push each node to its parent\'s children array via the map, or to the roots array if parentId is null.',
      dryRun: "[{id:1,parentId:null},{id:2,parentId:1}]\nmap={1:{...,children:[]}, 2:{...,children:[]}}\nitem1: parentId null -> roots=[node1]\nitem2: parentId 1 -> map.get(1).children.push(node2)\nresult=roots with node1.children=[node2]",
      javascriptSolution: `function buildTreeFromFlatList(items) {
  const map = new Map();
  items.forEach((item) => map.set(item.id, { ...item, children: [] }));
  const roots = [];
  items.forEach((item) => {
    const node = map.get(item.id);
    if (item.parentId === null || item.parentId === undefined) {
      roots.push(node);
    } else {
      const parent = map.get(item.parentId);
      if (parent) parent.children.push(node);
    }
  });
  return roots;
}`,
      typescriptSolution: `interface FlatItem {
  id: number;
  parentId: number | null;
  name: string;
}
interface TreeNode extends FlatItem {
  children: TreeNode[];
}
function buildTreeFromFlatList(items: FlatItem[]): TreeNode[] {
  const map = new Map<number, TreeNode>();
  items.forEach((item) => map.set(item.id, { ...item, children: [] }));
  const roots: TreeNode[] = [];
  items.forEach((item) => {
    const node = map.get(item.id)!;
    if (item.parentId === null || item.parentId === undefined) {
      roots.push(node);
    } else {
      const parent = map.get(item.parentId);
      if (parent) parent.children.push(node);
    }
  });
  return roots;
}`,
      timeComplexity: 'O(n) — two linear passes over the items.',
      spaceComplexity: 'O(n) for the map and the resulting tree.',
      commonMistakes: [
        'Trying to build the tree in a single pass assuming parents always appear before their children in the input.',
        'Mutating the original items instead of cloning them before adding a `children` array.',
        'Forgetting to guard against a missing parent (dangling parentId), which would throw on `parent.children.push`.',
      ],
      followUpQuestions: [
        'How would you detect and report cycles in the parentId references?',
        'How would you flatten the tree back into the original list (the inverse operation)?',
        'How is this pattern used for rendering nested comment threads or category menus?',
      ],
      similarQuestions: ['Flatten Nested List Iterator', 'Clone N-ary Tree'],
    },
  },
  {
    detail: {
      id: 'html-coding-5',
      questionNumber: 'HTMLCODE-5',
      title: 'Render a List of Strings to HTML',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 3,
      category: 'Templating',
      part: 'HTML',
      concepts: ['Template Strings', 'Array.map'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given an array of strings, return an HTML unordered list string with one <li> per item.',
      input: 'items: string[]',
      output: "string — an '<ul>...</ul>' string with an <li> for each item",
      constraints: ['0 <= items.length <= 1000'],
      examples: [{ input: "['Apple', 'Banana']", output: "'<ul><li>Apple</li><li>Banana</li></ul>'", explanation: 'One <li> per item, no separators.' }],
      edgeCases: [{ case: 'Empty array', expected: "Returns '<ul></ul>'" }],
      functionName: 'renderListToHtml',
      isClassBased: false,
      sampleTests: [
        { input: [['Apple', 'Banana']], expectedOutput: '<ul><li>Apple</li><li>Banana</li></ul>', description: 'two items' },
        { input: [[]], expectedOutput: '<ul></ul>', description: 'empty list' },
        { input: [['One']], expectedOutput: '<ul><li>One</li></ul>', description: 'single item' },
      ],
    },
    hints: {
      hints: [
        'Map each string to `<li>${item}</li>` and join the results with no separator.',
        'Wrap the joined string in `<ul>...</ul>`.',
        'This intentionally does not escape the item text — assume trusted input for this exercise (see the related escapeHtml problem for untrusted input).',
      ],
    },
    solution: {
      algorithm: 'Map every item to an `<li>` element string, join them with no separator, and wrap the result in `<ul>` tags.',
      dryRun: "['Apple','Banana'] -> ['<li>Apple</li>','<li>Banana</li>'] -> join -> '<li>Apple</li><li>Banana</li>' -> wrap -> '<ul>...</ul>'",
      javascriptSolution: `function renderListToHtml(items) {
  return \`<ul>\${items.map((item) => \`<li>\${item}</li>\`).join('')}</ul>\`;
}`,
      typescriptSolution: `function renderListToHtml(items: string[]): string {
  return \`<ul>\${items.map((item) => \`<li>\${item}</li>\`).join('')}</ul>\`;
}`,
      timeComplexity: 'O(n) — one pass to build each <li>, one join.',
      spaceComplexity: 'O(n) for the resulting HTML string.',
      commonMistakes: [
        'Adding a separator (like a comma) between `<li>` elements, which is not valid or expected here.',
        'Not escaping user-provided item text in a real application, opening an XSS hole — call out that this exercise assumes trusted input.',
        'Using string concatenation in a loop instead of `map` + `join`, which works but is less idiomatic.',
      ],
      followUpQuestions: [
        'How would you make this XSS-safe for untrusted item text?',
        'How would you support nested lists from a tree of items?',
        'How does this compare to how a framework like React renders a list with `.map()`?',
      ],
      similarQuestions: ['Escape HTML Special Characters', 'Build a Tree from a Flat List'],
    },
  },
  {
    detail: {
      id: 'html-coding-6',
      questionNumber: 'HTMLCODE-6',
      title: 'Count Tag Occurrences in a DOM Tree',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 3,
      category: 'DOM Structures',
      part: 'HTML',
      concepts: ['Tree Traversal', 'Recursion'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given a DOM-like tree represented as { tag: string, children: node[] }, count how many nodes have a given tag name.',
      input: 'tree: { tag: string, children: node[] } | null, tagName: string',
      output: 'number — count of nodes with tag === tagName',
      constraints: ['Tree depth up to 1000'],
      examples: [{ input: "{tag:'div',children:[{tag:'span',children:[]}]}, 'span'", output: '1', explanation: 'One span node found.' }],
      edgeCases: [
        { case: 'tree is null', expected: 'Returns 0' },
        { case: 'No matches', expected: 'Returns 0' },
      ],
      functionName: 'countElementOccurrences',
      isClassBased: false,
      sampleTests: [
        {
          input: [
            { tag: 'div', children: [{ tag: 'span', children: [] }, { tag: 'div', children: [{ tag: 'span', children: [] }] }] },
            'span',
          ],
          expectedOutput: 2,
          description: 'two span nodes at different depths',
        },
        {
          input: [
            { tag: 'div', children: [{ tag: 'span', children: [] }, { tag: 'div', children: [{ tag: 'span', children: [] }] }] },
            'div',
          ],
          expectedOutput: 2,
          description: 'root plus one nested div',
        },
        { input: [null, 'p'], expectedOutput: 0, description: 'null tree' },
      ],
    },
    hints: {
      hints: [
        'This is a straightforward pre-order DFS: check the current node, then recurse into every child.',
        'Base case: a null/undefined tree contributes 0.',
        'Sum 1 (if the current tag matches) plus the counts recursively returned from every child.',
      ],
    },
    solution: {
      algorithm: 'If tree is falsy, return 0. Otherwise count 1 if tree.tag matches tagName, then add the recursive counts from every child in tree.children.',
      dryRun: "tree=div>[span, div>[span]], tagName='span'\ndiv: no match, recurse children\n  span: match -> 1\n  div: no match, recurse children\n    span: match -> 1\n  subtotal for inner div: 0+1=1\ntotal: 0+1+1=2",
      javascriptSolution: `function countElementOccurrences(tree, tagName) {
  if (!tree) return 0;
  let count = tree.tag === tagName ? 1 : 0;
  for (const child of tree.children || []) {
    count += countElementOccurrences(child, tagName);
  }
  return count;
}`,
      typescriptSolution: `interface DomNode {
  tag: string;
  children: DomNode[];
}
function countElementOccurrences(tree: DomNode | null, tagName: string): number {
  if (!tree) return 0;
  let count = tree.tag === tagName ? 1 : 0;
  for (const child of tree.children || []) {
    count += countElementOccurrences(child, tagName);
  }
  return count;
}`,
      timeComplexity: 'O(n) where n is the number of nodes in the tree.',
      spaceComplexity: 'O(h) recursion stack, where h is the tree height.',
      commonMistakes: [
        'Forgetting the null-tree base case, causing a TypeError on `tree.tag`.',
        'Not defaulting `tree.children` to an empty array, breaking on leaf nodes without a children field.',
        'Returning early on the first match instead of continuing to count every occurrence in the subtree.',
      ],
      followUpQuestions: [
        'How would you return the matching nodes themselves instead of just a count?',
        'How would you convert this recursive DFS to an iterative one using an explicit stack?',
        'How would you count occurrences across multiple tag names in a single traversal?',
      ],
      similarQuestions: ['Flatten a DOM Tree', 'Count Nodes Equal to Average of Subtree'],
    },
  },
  {
    detail: {
      id: 'html-coding-7',
      questionNumber: 'HTMLCODE-7',
      title: 'Flatten a DOM Tree to Tag Order',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 3,
      category: 'DOM Structures',
      part: 'HTML',
      concepts: ['Tree Traversal', 'DFS', 'Recursion'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given a DOM-like tree { tag: string, children: node[] }, return an array of tag names in the order a depth-first, pre-order traversal would visit them.',
      input: 'tree: { tag: string, children: node[] } | null',
      output: 'string[] — tag names in pre-order DFS visit order',
      constraints: ['Tree depth up to 1000'],
      examples: [{ input: "{tag:'html',children:[]}", output: "['html']", explanation: 'Single node with no children.' }],
      edgeCases: [{ case: 'tree is null', expected: 'Returns []' }],
      functionName: 'flattenDomTree',
      isClassBased: false,
      sampleTests: [
        {
          input: [{ tag: 'div', children: [{ tag: 'span', children: [] }, { tag: 'div', children: [{ tag: 'span', children: [] }] }] }],
          expectedOutput: ['div', 'span', 'div', 'span'],
          description: 'pre-order traversal of a nested tree',
        },
        { input: [{ tag: 'html', children: [] }], expectedOutput: ['html'], description: 'single node' },
        { input: [null], expectedOutput: [], description: 'null tree' },
      ],
    },
    hints: {
      hints: [
        'Pre-order means: visit the current node first, then recurse into each child left to right.',
        'Base case: a null tree contributes an empty array.',
        'Use `result.push(...flattenDomTree(child))` per child, or concat, to merge nested results in order.',
      ],
    },
    solution: {
      algorithm: 'If tree is null, return []. Otherwise start with [tree.tag] and append the flattened result of every child in order.',
      dryRun: "tree=div>[span, div>[span]]\nresult=['div']\nchild span -> flatten -> ['span'] -> result=['div','span']\nchild div -> flatten -> ['div','span'] -> result=['div','span','div','span']",
      javascriptSolution: `function flattenDomTree(tree) {
  if (!tree) return [];
  const result = [tree.tag];
  for (const child of tree.children || []) {
    result.push(...flattenDomTree(child));
  }
  return result;
}`,
      typescriptSolution: `interface DomNode {
  tag: string;
  children: DomNode[];
}
function flattenDomTree(tree: DomNode | null): string[] {
  if (!tree) return [];
  const result: string[] = [tree.tag];
  for (const child of tree.children || []) {
    result.push(...flattenDomTree(child));
  }
  return result;
}`,
      timeComplexity: 'O(n) where n is the number of nodes.',
      spaceComplexity: 'O(n) for the output array plus O(h) recursion stack.',
      commonMistakes: [
        'Visiting children before the current node, which produces a post-order result instead of the required pre-order.',
        'Using `concat` in a way that accidentally flattens by one level too many or too few.',
        'Not handling the null base case, throwing on `tree.tag` for a null input.',
      ],
      followUpQuestions: [
        'How would you produce a post-order or level-order (BFS) traversal instead?',
        'How would you flatten to full paths (e.g. "div > span") rather than just tag names?',
        'How would you make this iterative to avoid stack overflow on very deep trees?',
      ],
      similarQuestions: ['Count Tag Occurrences in a DOM Tree', 'Binary Tree Preorder Traversal'],
    },
  },
  {
    detail: {
      id: 'html-coding-8',
      questionNumber: 'HTMLCODE-8',
      title: 'Compute DOM Tree Depth',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 3,
      category: 'DOM Structures',
      part: 'HTML',
      concepts: ['Tree Traversal', 'Recursion'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given a DOM-like tree { tag: string, children: node[] }, compute its maximum depth (a single node with no children has depth 1).',
      input: 'tree: { tag: string, children: node[] }',
      output: 'number — the maximum depth of the tree',
      constraints: ['Tree has at least one node'],
      examples: [{ input: "{tag:'div',children:[]}", output: '1', explanation: 'A single node has depth 1.' }],
      edgeCases: [{ case: 'Node has no children field or an empty array', expected: 'Treated as a leaf, depth 1' }],
      functionName: 'domTreeDepth',
      isClassBased: false,
      sampleTests: [
        { input: [{ tag: 'div', children: [] }], expectedOutput: 1, description: 'single leaf node' },
        {
          input: [{ tag: 'div', children: [{ tag: 'span', children: [] }, { tag: 'div', children: [{ tag: 'span', children: [] }] }] }],
          expectedOutput: 3,
          description: 'deepest path is div > div > span',
        },
        { input: [{ tag: 'a', children: [{ tag: 'b', children: [{ tag: 'c', children: [] }] }] }], expectedOutput: 3, description: 'straight chain of three nodes' },
      ],
    },
    hints: {
      hints: [
        'A node with no children (or an empty children array) has depth 1 — this is the base case.',
        'Otherwise, the depth is 1 plus the maximum depth among all children.',
        '`Math.max(...tree.children.map(domTreeDepth))` computes the deepest child branch in one line.',
      ],
    },
    solution: {
      algorithm: 'If the node has no children, its depth is 1. Otherwise, recursively compute the depth of every child and return 1 plus the maximum of those depths.',
      dryRun: "div>[span(leaf,d1), div>[span(leaf,d1)](d2)]\nmax(1,2)=2\nroot depth = 1+2 = 3",
      javascriptSolution: `function domTreeDepth(tree) {
  if (!tree.children || tree.children.length === 0) return 1;
  return 1 + Math.max(...tree.children.map(domTreeDepth));
}`,
      typescriptSolution: `interface DomNode {
  tag: string;
  children: DomNode[];
}
function domTreeDepth(tree: DomNode): number {
  if (!tree.children || tree.children.length === 0) return 1;
  return 1 + Math.max(...tree.children.map(domTreeDepth));
}`,
      timeComplexity: 'O(n) where n is the number of nodes — every node is visited once.',
      spaceComplexity: 'O(h) recursion stack, where h is the tree height.',
      commonMistakes: [
        'Returning 0 for a leaf node instead of 1, off-by-one against the stated depth definition.',
        'Using `Math.max` on an empty children array without the guard, which returns `-Infinity` and corrupts the result.',
        'Computing depth via a sum of children depths instead of their maximum.',
      ],
      followUpQuestions: [
        'How would you compute the depth iteratively with a BFS level-by-level approach?',
        'How would you find not just the depth but also the path to the deepest node?',
        'How does this relate to computing the height of a binary tree?',
      ],
      similarQuestions: ['Maximum Depth of Binary Tree', 'Maximum Depth of N-ary Tree'],
    },
  },
];
