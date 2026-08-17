// Hand-authored coding questions derived from
// frontend/src/document/DSA_Master_Handbook_Senior_Frontend_Engineers.md
// (Module 12 — Graphs & Matrices: BFS/DFS on grids). Unlike the
// auto-generated MockTechnicalQuestion files, these are real
// CodingQuestionDetail problems: every sampleTests entry has been checked
// against the reference solution below by running it in Node, and both
// the JavaScript and TypeScript solutions are genuine, working code (no
// placeholder "solve(input)" stubs).

import type { MockCodingQuestion } from '@/mocks/questions';

const COMPANIES = [
  'Google',
  'Meta',
  'Amazon',
  'Microsoft',
  'Apple',
  'Netflix',
  'Uber',
  'Airbnb',
  'Atlassian',
  'Adobe',
  'Flipkart',
];

const CATEGORY = 'Graphs & Matrices';
const CONCEPTS = ['Graphs', 'Matrices', 'DFS', 'BFS', 'Connected Components', 'Time Complexity', 'Space Complexity'];

export const MOCK_DSA_CODING_MODULE12_QUESTIONS: MockCodingQuestion[] = [
  {
    detail: {
      id: 'dsa-coding-m12-1',
      questionNumber: 'DSACODE-M12-1',
      title: 'Number of Islands',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 5,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given an `m x n` 2D grid of `"1"` (land) and `"0"` (water), return the number of islands. An island is formed by connecting adjacent lands horizontally or vertically (not diagonally) and is surrounded by water.',
      input: 'grid: string[][] — a grid of "1" (land) and "0" (water) characters',
      output: 'number — the count of distinct islands',
      constraints: ['1 <= grid.length, grid[0].length <= 300', 'grid[i][j] is either "1" or "0"'],
      examples: [
        {
          input: '[["1","1","0"],["1","1","0"],["0","0","1"]]',
          output: '2',
          explanation: 'The top-left 2x2 block of land forms one island; the isolated "1" at the bottom-right forms a second.',
        },
        { input: '[["0","0"],["0","0"]]', output: '0', explanation: 'No land at all means no islands.' },
        {
          input: '[["1","0","1"],["0","1","0"],["1","0","1"]]',
          output: '5',
          explanation: 'Every "1" is isolated diagonally only, and diagonal adjacency does not connect land.',
        },
      ],
      edgeCases: [
        { case: 'Grid is entirely water', expected: 'Returns 0' },
        { case: 'Grid is entirely land', expected: 'Returns 1 (all connected)' },
        { case: 'Diagonally-adjacent land cells', expected: 'Counted as separate islands — diagonals do not connect' },
      ],
      functionName: 'numIslands',
      isClassBased: false,
      sampleTests: [
        {
          input: [
            [
              ['1', '1', '1', '1', '0'],
              ['1', '1', '0', '1', '0'],
              ['1', '1', '0', '0', '0'],
              ['0', '0', '0', '0', '0'],
            ],
          ],
          expectedOutput: 1,
          description: 'one large connected landmass',
        },
        {
          input: [
            [
              ['1', '1', '0', '0', '0'],
              ['1', '1', '0', '0', '0'],
              ['0', '0', '1', '0', '0'],
              ['0', '0', '0', '1', '1'],
            ],
          ],
          expectedOutput: 3,
          description: 'three separate islands',
        },
        { input: [[['0']]], expectedOutput: 0, description: 'single water cell' },
        { input: [[['1']]], expectedOutput: 1, description: 'single land cell' },
      ],
    },
    hints: {
      hints: [
        'Scan every cell; whenever you find unvisited land, that is the start of a brand-new island — increment your counter once per such discovery.',
        'From that starting cell, flood-fill outward (DFS or BFS) through all horizontally/vertically adjacent land, marking each visited cell so it is never counted again.',
        'The simplest way to "mark visited" without a separate visited matrix is to mutate the grid in place, flipping visited land to water as you go.',
      ],
    },
    solution: {
      algorithm:
        'Iterate over every cell in the grid. Whenever a cell is land ("1") that has not yet been visited, that is a new island — increment the count and run a DFS (or BFS) from that cell, flipping every reachable land cell to "0" so it is never revisited. Because the DFS sinks the entire connected component on each discovery, no island is ever counted twice.',
      dryRun:
        'grid=[["1","1","0"],["1","1","0"],["0","0","1"]]\n(0,0) is "1" → count=1, DFS sinks (0,0),(0,1),(1,0),(1,1)\n(0,2) is "0" → skip\n(2,2) is "1" → count=2, DFS sinks (2,2)\nresult=2',
      javascriptSolution: `function numIslands(grid) {
  const rows = grid.length;
  if (rows === 0) return 0;
  const cols = grid[0].length;
  let count = 0;

  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}`,
      typescriptSolution: `function numIslands(grid: string[][]): number {
  const rows = grid.length;
  if (rows === 0) return 0;
  const cols = grid[0]!.length;
  let count = 0;

  const dfs = (r: number, c: number): void => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r]![c] !== '1') return;
    grid[r]![c] = '0';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r]![c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}`,
      timeComplexity: 'O(m × n) — every cell is visited at most a constant number of times across all DFS calls.',
      spaceComplexity: 'O(m × n) worst case for the DFS call stack (a grid that is entirely land).',
      commonMistakes: [
        'Allowing diagonal neighbors to count as connected — only up/down/left/right adjacency forms an island.',
        'Using a separate `visited` matrix and forgetting to check it, causing infinite recursion or double-counting; mutating the grid in place sidesteps this entirely.',
        'Not guarding grid boundaries in the DFS, causing an out-of-bounds read/crash.',
      ],
      followUpQuestions: [
        'How would you solve this with BFS and an explicit queue instead of recursive DFS, to avoid stack overflow on huge grids?',
        'How would you count islands in a grid that streams in as a sequence of land-additions ("Number of Islands II", using Union-Find)?',
        'How would you handle a grid too large to fit in memory, spread across multiple machines?',
      ],
      similarQuestions: ['Max Area of Island', 'Number of Islands II', 'Number of Distinct Islands'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m12-2',
      questionNumber: 'DSACODE-M12-2',
      title: 'Flood Fill',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given an image represented as an `m x n` grid of integers, a starting pixel `(sr, sc)`, and a `newColor`, perform a flood fill: change the starting pixel\'s color to `newColor`, then repeat for every pixel connected to it (horizontally or vertically) that has the same original color. Return the modified image.',
      input: 'image: number[][], sr: number, sc: number, newColor: number',
      output: 'number[][] — the image after the flood fill is applied',
      constraints: ['1 <= image.length, image[0].length <= 50', '0 <= image[i][j], newColor < 2^16', '0 <= sr < image.length, 0 <= sc < image[0].length'],
      examples: [
        {
          input: 'image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, newColor = 2',
          output: '[[2,2,2],[2,2,0],[2,0,1]]',
          explanation: 'The connected region of 1s reachable from (1,1) becomes 2; the (1,2)=0 and (2,1)=0 pixels are untouched, as is the disconnected (2,2)=1.',
        },
        {
          input: 'image = [[0,0,0]], sr = 0, sc = 0, newColor = 0',
          output: '[[0,0,0]]',
          explanation: 'newColor equals the starting color, so nothing changes (and no infinite loop occurs).',
        },
      ],
      edgeCases: [
        { case: 'newColor equals the starting pixel color', expected: 'Return the image unchanged without recursing (prevents infinite loop)' },
        { case: 'Single-cell image', expected: 'That one cell is recolored if it differs from newColor' },
        { case: 'Entire image is one connected color', expected: 'The whole image is recolored' },
      ],
      functionName: 'floodFill',
      isClassBased: false,
      sampleTests: [
        {
          input: [
            [
              [1, 1, 1],
              [1, 1, 0],
              [1, 0, 1],
            ],
            1,
            1,
            2,
          ],
          expectedOutput: [
            [2, 2, 2],
            [2, 2, 0],
            [2, 0, 1],
          ],
          description: 'connected region recolored, disconnected same-color pixel untouched',
        },
        {
          input: [
            [
              [0, 0, 0],
              [0, 0, 0],
            ],
            0,
            0,
            0,
          ],
          expectedOutput: [
            [0, 0, 0],
            [0, 0, 0],
          ],
          description: 'newColor equals starting color — no-op, must not infinite loop',
        },
        {
          input: [
            [
              [0, 0, 0],
              [0, 1, 1],
            ],
            1,
            1,
            1,
          ],
          expectedOutput: [
            [0, 0, 0],
            [0, 1, 1],
          ],
          description: 'newColor equals starting color inside a larger region',
        },
        { input: [[[5]], 0, 0, 7], expectedOutput: [[7]], description: 'single-cell image' },
      ],
    },
    hints: {
      hints: [
        'Record the starting pixel\'s original color before changing anything, and stop immediately if newColor is already that color — otherwise the flood-fill recursion never terminates.',
        'DFS (or BFS) outward from (sr, sc), recoloring each cell whose current color still matches the original starting color.',
        'Bound the recursion with the four grid edges and the "still matches original color" check, exactly like Number of Islands.',
      ],
    },
    solution: {
      algorithm:
        'Read the color at the starting pixel. If it already equals newColor, return the image unchanged (this guard is what prevents infinite recursion when the two colors match). Otherwise, DFS from (sr, sc): recolor the current cell to newColor, then recurse into the four neighbors, continuing only into cells whose color still equals the original starting color.',
      dryRun:
        'image=[[1,1,1],[1,1,0],[1,0,1]], sr=1,sc=1,newColor=2\nstartColor=1, newColor(2) != 1 → proceed\n(1,1): 1→2, recurse\n(0,1): 1→2, recurse... eventually (0,0),(0,1),(0,2),(1,0),(1,1) all become 2\n(1,2)=0 and (2,1)=0 are not startColor → skipped\n(2,2)=1 is not adjacent to the filled region → untouched\nresult=[[2,2,2],[2,2,0],[2,0,1]]',
      javascriptSolution: `function floodFill(image, sr, sc, newColor) {
  const rows = image.length;
  const cols = image[0].length;
  const startColor = image[sr][sc];

  if (startColor === newColor) return image;

  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || image[r][c] !== startColor) return;
    image[r][c] = newColor;
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };

  dfs(sr, sc);
  return image;
}`,
      typescriptSolution: `function floodFill(image: number[][], sr: number, sc: number, newColor: number): number[][] {
  const rows = image.length;
  const cols = image[0]!.length;
  const startColor = image[sr]![sc]!;

  if (startColor === newColor) return image;

  const dfs = (r: number, c: number): void => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || image[r]![c] !== startColor) return;
    image[r]![c] = newColor;
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };

  dfs(sr, sc);
  return image;
}`,
      timeComplexity: 'O(m × n) worst case — every pixel may be visited once.',
      spaceComplexity: 'O(m × n) worst case for the recursion stack.',
      commonMistakes: [
        'Forgetting the `startColor === newColor` guard, causing infinite recursion (the recolored cell still matches the color it was just set to, so the "still matches original color" check never terminates).',
        'Comparing against `newColor` instead of the saved `startColor` when deciding whether to recurse into a neighbor.',
        'Not handling a 1x1 image correctly (should still work — the guard and DFS base case both apply naturally).',
      ],
      followUpQuestions: [
        'How would you implement this iteratively with an explicit stack or queue instead of recursion?',
        'How would you support 8-directional (including diagonal) flood fill?',
        'How is this related to "Number of Islands" and "Max Area of Island" — could you reuse the same helper?',
      ],
      similarQuestions: ['Number of Islands', 'Max Area of Island', 'Surrounded Regions'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m12-3',
      questionNumber: 'DSACODE-M12-3',
      title: 'Max Area of Island',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given an `m x n` grid of `0`s (water) and `1`s (land), return the area of the largest island (a connected group of `1`s, connected horizontally/vertically). Return 0 if there is no island.',
      input: 'grid: number[][] — a grid of 0 (water) and 1 (land)',
      output: 'number — the area (cell count) of the largest connected island',
      constraints: ['1 <= grid.length, grid[0].length <= 50', 'grid[i][j] is 0 or 1'],
      examples: [
        {
          input: '[[0,0,1,0],[0,1,1,0],[0,0,0,1]]',
          output: '3',
          explanation: 'The connected block of three 1s in the middle is the largest island; the lone 1 at (2,3) has area 1.',
        },
        { input: '[[0,0,0],[0,0,0]]', output: '0', explanation: 'No land at all.' },
        { input: '[[1,1],[1,1]]', output: '4', explanation: 'The entire grid is one connected island.' },
      ],
      edgeCases: [
        { case: 'Grid is entirely water', expected: 'Returns 0' },
        { case: 'Grid is entirely land', expected: 'Returns the total cell count' },
        { case: 'Multiple islands of different sizes', expected: 'Returns the area of the biggest one, not the sum of all' },
      ],
      functionName: 'maxAreaOfIsland',
      isClassBased: false,
      sampleTests: [
        {
          input: [
            [
              [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
              [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
              [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            ],
          ],
          expectedOutput: 6,
          description: 'classic LeetCode example — largest island has area 6',
        },
        {
          input: [
            [
              [0, 0, 0],
              [0, 0, 0],
            ],
          ],
          expectedOutput: 0,
          description: 'no land at all',
        },
        { input: [[[1]]], expectedOutput: 1, description: 'single land cell' },
        {
          input: [
            [
              [1, 1],
              [1, 1],
            ],
          ],
          expectedOutput: 4,
          description: 'entire grid is one island',
        },
      ],
    },
    hints: {
      hints: [
        'This is Number of Islands, but instead of just counting islands, each DFS call should return how many cells it visited.',
        'Have the DFS return `1 + sum of the four neighboring DFS results`, sinking each visited cell to 0 so it is never recounted.',
        'Track a running maximum across every island discovered while scanning the grid.',
      ],
    },
    solution: {
      algorithm:
        'Scan every cell. On finding unvisited land, run a DFS that sinks the cell (sets it to 0) and returns 1 plus the sum of the DFS results of its four neighbors — this yields the exact size of that connected component. Track the maximum size seen across all islands discovered during the scan.',
      dryRun:
        'grid=[[1,1],[1,1]]\n(0,0)=1 → dfs(0,0): sink, 1 + dfs(1,0) + dfs(-1,0) + dfs(0,1) + dfs(0,-1)\n  dfs(1,0): sink, 1 + dfs(2,0)[oob=0] + dfs(0,0)[sunk=0] + dfs(1,1) + dfs(1,-1)[oob=0]\n    dfs(1,1): sink, 1 + neighbors already sunk/oob = 1\n  dfs(1,0) = 1 + 0 + 0 + 1 + 0 = 2\n  dfs(0,1): sink, neighbors already sunk = 1\ndfs(0,0) = 1 + 2 + 0 + 1 + 0 = 4\nmax = 4',
      javascriptSolution: `function maxAreaOfIsland(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let max = 0;

  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== 1) return 0;
    grid[r][c] = 0;
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        max = Math.max(max, dfs(r, c));
      }
    }
  }

  return max;
}`,
      typescriptSolution: `function maxAreaOfIsland(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0]!.length;
  let max = 0;

  const dfs = (r: number, c: number): number => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r]![c] !== 1) return 0;
    grid[r]![c] = 0;
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r]![c] === 1) {
        max = Math.max(max, dfs(r, c));
      }
    }
  }

  return max;
}`,
      timeComplexity: 'O(m × n) — every cell is visited a constant number of times.',
      spaceComplexity: 'O(m × n) worst case for the DFS call stack.',
      commonMistakes: [
        'Returning a boolean or void from the DFS instead of the accumulated area, losing the size information needed for the comparison.',
        'Forgetting to sink visited cells, causing infinite recursion and wildly wrong (or crashing) area counts.',
        'Comparing area sums across islands additively instead of tracking a running maximum.',
      ],
      followUpQuestions: [
        'How would you also return the coordinates of the largest island, not just its area?',
        'How would you solve this iteratively with BFS to avoid deep recursion on huge islands?',
        'How would you find the second-largest island efficiently?',
      ],
      similarQuestions: ['Number of Islands', 'Island Perimeter', 'Making A Large Island'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m12-4',
      questionNumber: 'DSACODE-M12-4',
      title: 'Surrounded Regions',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given an `m x n` board containing `\'X\'` and `\'O\'`, capture all regions of `\'O\'` that are 4-directionally surrounded by `\'X\'` by flipping them to `\'X\'`. An `\'O\'` (and any `\'O\'` connected to it) that touches the border is not surrounded and must remain `\'O\'`.',
      input: "board: string[][] — a grid of 'X'/'O' characters",
      output: "string[][] — the board with fully-surrounded 'O' regions flipped to 'X'",
      constraints: ['1 <= board.length, board[0].length <= 200', "board[i][j] is 'X' or 'O'"],
      examples: [
        {
          input: "[['X','X','X','X'],['X','O','O','X'],['X','X','O','X'],['X','O','X','X']]",
          output: "[['X','X','X','X'],['X','X','X','X'],['X','X','X','X'],['X','O','X','X']]",
          explanation:
            'The O region at (1,1),(1,2),(2,2) is fully enclosed and gets captured; the O at (3,1) sits on the border row itself, so it survives untouched.',
        },
        { input: "[['X']]", output: "[['X']]", explanation: 'No O present, nothing changes.' },
        { input: "[['O','O'],['O','O']]", output: "[['O','O'],['O','O']]", explanation: 'Every O touches the border, so none are captured.' },
      ],
      edgeCases: [
        { case: "O region touching the border", expected: 'Never flipped, even if most of it is surrounded' },
        { case: 'Board with no O at all', expected: 'Returned unchanged' },
        { case: "Every cell is O", expected: 'All touch the border (directly or via connectivity) — none are flipped' },
      ],
      functionName: 'solveSurroundedRegions',
      isClassBased: false,
      sampleTests: [
        {
          input: [
            [
              ['X', 'X', 'X', 'X'],
              ['X', 'O', 'O', 'X'],
              ['X', 'X', 'O', 'X'],
              ['X', 'O', 'X', 'X'],
            ],
          ],
          expectedOutput: [
            ['X', 'X', 'X', 'X'],
            ['X', 'X', 'X', 'X'],
            ['X', 'X', 'X', 'X'],
            ['X', 'O', 'X', 'X'],
          ],
          description: 'interior region captured, border-touching O survives',
        },
        { input: [[['X']]], expectedOutput: [['X']], description: 'no O present' },
        {
          input: [
            [
              ['O', 'O'],
              ['O', 'O'],
            ],
          ],
          expectedOutput: [
            ['O', 'O'],
            ['O', 'O'],
          ],
          description: 'entire board is O, all border-connected, none captured',
        },
        {
          input: [
            [
              ['X', 'O', 'X'],
              ['O', 'X', 'O'],
              ['X', 'O', 'X'],
            ],
          ],
          expectedOutput: [
            ['X', 'O', 'X'],
            ['O', 'X', 'O'],
            ['X', 'O', 'X'],
          ],
          description: 'every O individually touches the border, none captured',
        },
      ],
    },
    hints: {
      hints: [
        'Think in reverse: instead of trying to detect "surrounded" regions directly, first find every O that is safe — connected (directly or transitively) to a border O.',
        'DFS from every O on the four edges of the board, marking each reachable O with a temporary marker (e.g. "#") so it is protected from capture.',
        'After marking all safe regions, one final pass flips every remaining plain "O" to "X" (captured) and every "#" back to "O" (safe).',
      ],
    },
    solution: {
      algorithm:
        'DFS from every O cell on the border, marking each one reachable this way with a temporary marker character (so it will not be captured). This correctly protects entire border-connected regions, not just the border cells themselves. Then do a single final pass over the whole board: any remaining "O" (never reached from a border) gets flipped to "X" (captured), and every temporary marker gets restored to "O".',
      dryRun:
        "board=[['X','X','X','X'],['X','O','O','X'],['X','X','O','X'],['X','O','X','X']]\nborder DFS: row0 all X, row3: (3,1)='O' → dfs marks it '#'; its only neighbor (2,1)='X' → stops there\ncol0/col3: no O on those columns\nafter border pass: only (3,1) is marked '#'\nfinal pass: (1,1),(1,2),(2,2) are still 'O' (never reached from border) → flipped to 'X'; (3,1) '#' → restored to 'O'\nresult matches expected output",
      javascriptSolution: `function solveSurroundedRegions(board) {
  const rows = board.length;
  const cols = board[0].length;

  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] !== 'O') return;
    board[r][c] = '#';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };

  for (let r = 0; r < rows; r++) {
    dfs(r, 0);
    dfs(r, cols - 1);
  }
  for (let c = 0; c < cols; c++) {
    dfs(0, c);
    dfs(rows - 1, c);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 'O') board[r][c] = 'X';
      else if (board[r][c] === '#') board[r][c] = 'O';
    }
  }

  return board;
}`,
      typescriptSolution: `function solveSurroundedRegions(board: string[][]): string[][] {
  const rows = board.length;
  const cols = board[0]!.length;

  const dfs = (r: number, c: number): void => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || board[r]![c] !== 'O') return;
    board[r]![c] = '#';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };

  for (let r = 0; r < rows; r++) {
    dfs(r, 0);
    dfs(r, cols - 1);
  }
  for (let c = 0; c < cols; c++) {
    dfs(0, c);
    dfs(rows - 1, c);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r]![c] === 'O') board[r]![c] = 'X';
      else if (board[r]![c] === '#') board[r]![c] = 'O';
    }
  }

  return board;
}`,
      timeComplexity: 'O(m × n) — the border DFS visits each safe cell once, and the final pass is a single scan.',
      spaceComplexity: 'O(m × n) worst case for the DFS call stack (e.g. a board that is entirely O).',
      commonMistakes: [
        'Trying to flip "surrounded" regions directly with a single forward pass, which cannot correctly distinguish an interior O from one connected to the border through a winding path.',
        'Forgetting to run the border DFS from all four edges (both row 0/last-row and col 0/last-col), missing border-connected regions.',
        'Using a plain "visited" flag instead of a temporary marker character, making it hard to distinguish "safe, restore to O" from "never visited, capture to X" in the final pass.',
      ],
      followUpQuestions: [
        'How would you solve this with BFS from the border instead of DFS, to avoid recursion depth issues on large boards?',
        'How does this "mark from the boundary inward" technique generalize to other enclosed-region problems?',
        'How would you count the number of captured regions, not just flip them?',
      ],
      similarQuestions: ['Number of Islands', 'Number of Enclaves', 'Pacific Atlantic Water Flow'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m12-5',
      questionNumber: 'DSACODE-M12-5',
      title: 'Pacific Atlantic Water Flow',
      difficulty: 'Hard',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given an `m x n` matrix `heights` representing a continent, where the Pacific Ocean touches the left and top edges and the Atlantic Ocean touches the right and bottom edges, find every cell from which water can flow to both oceans. Water can flow from a cell to a 4-directionally adjacent cell with height less than or equal to the current cell\'s height. Return the list of `[row, col]` coordinates that can reach both oceans, sorted by row then column.',
      input: 'heights: number[][] — an m x n matrix of non-negative heights',
      output: 'number[][] — [row, col] pairs that can reach both oceans, sorted by row then column',
      constraints: ['1 <= heights.length, heights[0].length <= 200', '0 <= heights[i][j] <= 10^5'],
      examples: [
        {
          input:
            '[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]',
          output:
            '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]',
          explanation: 'These are the classic LeetCode "Pacific Atlantic Water Flow" coordinates that can reach both oceans.',
        },
        { input: '[[1]]', output: '[[0,0]]', explanation: 'A single cell touches every edge, so it reaches both oceans trivially.' },
      ],
      edgeCases: [
        { case: 'Single-cell grid', expected: 'That cell trivially touches both oceans' },
        { case: 'Flat grid (all equal heights)', expected: 'Every cell can flow to every neighbor, so every cell reaches both oceans' },
        { case: '1-row or 1-column grid', expected: 'Handled the same as any other grid — every cell touches both the Pacific-adjacent edge and the Atlantic-adjacent edge' },
      ],
      functionName: 'pacificAtlantic',
      isClassBased: false,
      sampleTests: [
        {
          input: [
            [
              [1, 2, 2, 3, 5],
              [3, 2, 3, 4, 4],
              [2, 4, 5, 3, 1],
              [6, 7, 1, 4, 5],
              [5, 1, 1, 2, 4],
            ],
          ],
          expectedOutput: [
            [0, 4],
            [1, 3],
            [1, 4],
            [2, 2],
            [3, 0],
            [3, 1],
            [4, 0],
          ],
          description: 'classic LeetCode example',
        },
        { input: [[[1]]], expectedOutput: [[0, 0]], description: 'single cell reaches both oceans trivially' },
        {
          input: [
            [
              [1, 1],
              [1, 1],
            ],
          ],
          expectedOutput: [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
          ],
          description: 'flat grid — every cell reaches both oceans',
        },
      ],
    },
    hints: {
      hints: [
        'Working forward from every interior cell to check whether it can reach both oceans is expensive — instead, work backward from the oceans.',
        'DFS/BFS inland from every Pacific-adjacent border cell (top row + left column) using the *reverse* flow condition (move to a neighbor whose height is >= the current cell\'s height, since we are walking uphill from the ocean instead of downhill toward it). Do the same from every Atlantic-adjacent border cell (bottom row + right column).',
        'A cell that was reached by both the Pacific search and the Atlantic search is exactly a cell that can flow to both oceans — intersect the two reachability sets.',
      ],
    },
    solution: {
      algorithm:
        'Run two independent reachability searches. From every cell on the Pacific-adjacent border (row 0 and column 0), DFS inland, moving to a neighbor only if its height is >= the current height (this is the reverse of "water flows downhill", so walking uphill from the ocean traces exactly the cells water could have flowed down from). Mark every cell reached this way as pacific-reachable. Do the same from the Atlantic-adjacent border (last row and last column) to get atlantic-reachable. The answer is every cell marked reachable by both searches, sorted by row then column for determinism.',
      dryRun:
        'heights=[[1]]\nPacific DFS from (0,0) [top row + left col, same cell here]: marks (0,0)\nAtlantic DFS from (0,0) [bottom row + right col, same cell here]: marks (0,0)\nintersection = [(0,0)]\nresult=[[0,0]]',
      javascriptSolution: `function pacificAtlantic(heights) {
  const rows = heights.length;
  const cols = heights[0].length;
  const pacific = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const atlantic = Array.from({ length: rows }, () => new Array(cols).fill(false));

  const dfs = (r, c, visited, prevHeight) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || visited[r][c] || heights[r][c] < prevHeight) return;
    visited[r][c] = true;
    dfs(r + 1, c, visited, heights[r][c]);
    dfs(r - 1, c, visited, heights[r][c]);
    dfs(r, c + 1, visited, heights[r][c]);
    dfs(r, c - 1, visited, heights[r][c]);
  };

  for (let c = 0; c < cols; c++) {
    dfs(0, c, pacific, heights[0][c]);
    dfs(rows - 1, c, atlantic, heights[rows - 1][c]);
  }
  for (let r = 0; r < rows; r++) {
    dfs(r, 0, pacific, heights[r][0]);
    dfs(r, cols - 1, atlantic, heights[r][cols - 1]);
  }

  const result = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pacific[r][c] && atlantic[r][c]) result.push([r, c]);
    }
  }

  result.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return result;
}`,
      typescriptSolution: `function pacificAtlantic(heights: number[][]): number[][] {
  const rows = heights.length;
  const cols = heights[0]!.length;
  const pacific: boolean[][] = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const atlantic: boolean[][] = Array.from({ length: rows }, () => new Array(cols).fill(false));

  const dfs = (r: number, c: number, visited: boolean[][], prevHeight: number): void => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || visited[r]![c] || heights[r]![c]! < prevHeight) return;
    visited[r]![c] = true;
    dfs(r + 1, c, visited, heights[r]![c]!);
    dfs(r - 1, c, visited, heights[r]![c]!);
    dfs(r, c + 1, visited, heights[r]![c]!);
    dfs(r, c - 1, visited, heights[r]![c]!);
  };

  for (let c = 0; c < cols; c++) {
    dfs(0, c, pacific, heights[0]![c]!);
    dfs(rows - 1, c, atlantic, heights[rows - 1]![c]!);
  }
  for (let r = 0; r < rows; r++) {
    dfs(r, 0, pacific, heights[r]![0]!);
    dfs(r, cols - 1, atlantic, heights[r]![cols - 1]!);
  }

  const result: number[][] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pacific[r]![c] && atlantic[r]![c]) result.push([r, c]);
    }
  }

  result.sort((a, b) => a[0]! - b[0]! || a[1]! - b[1]!);
  return result;
}`,
      timeComplexity: 'O(m × n) — each of the two border-DFS searches visits every cell at most once.',
      spaceComplexity: 'O(m × n) for the two visited matrices plus the DFS call stack.',
      commonMistakes: [
        'Running the DFS forward from every interior cell to check both-ocean reachability, which is O((m·n)²) instead of the O(m·n) border-first approach.',
        'Getting the flow-direction inequality backward: since the search runs uphill from the ocean, the condition must be "neighbor height >= current height", not "<=" (which is the actual downhill water-flow rule from the *forward* perspective).',
        'Forgetting to sort the final result, making the sampleTests flaky since object/array iteration order is not guaranteed to match a particular row/column scan order in all engines once combined with two separate DFS passes.',
      ],
      followUpQuestions: [
        'How would you extend this to three or more "oceans" touching different combinations of edges?',
        'How would you solve this with BFS from all border cells simultaneously (multi-source BFS) instead of per-cell DFS?',
        'How would this change if diagonal flow were also allowed?',
      ],
      similarQuestions: ['Number of Islands', 'Surrounded Regions', 'Trapping Rain Water II'],
    },
  },
];
