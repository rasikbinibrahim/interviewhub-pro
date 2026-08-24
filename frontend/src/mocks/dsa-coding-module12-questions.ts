// Hand-authored coding questions derived from
// frontend/src/document/DSA_Master_Handbook_Senior_Frontend_Engineers.md
// (Module 12 — Graphs & Matrices: BFS/DFS on grids). Unlike the
// auto-generated MockTechnicalQuestion files, these are real
// CodingQuestionDetail problems: every sampleTests entry has been checked
// against the reference solution below by running it in Node, and both
// the JavaScript and TypeScript solutions are genuine, working code (no
// placeholder solution stubs).

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
const CONCEPTS = [
  'Graphs',
  'Matrices',
  'DFS',
  'BFS',
  'Connected Components',
  'Time Complexity',
  'Space Complexity',
];

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
      algorithm: `Step 1: Scan every cell.
Step 2: When you find land that has not been visited, increment the island count.
Step 3: Flood-fill only in the four allowed directions and mark visited land as water.
Step 4: Continue the scan; every new discovery is exactly one new island.

Core idea from source:
Iterate over every cell in the grid. Whenever a cell is land ("1") that has not yet been visited, that is a new island — increment the count and run a DFS (or BFS) from that cell, flipping every reachable land cell to "0" so it is never revisited. Because the DFS sinks the entire connected component on each discovery, no island is ever counted twice.`,
      dryRun: `grid=[["1","1","0"],["1","1","0"],["0","0","1"]]
Start at (0,0) → island count becomes 1.
DFS visits the connected cells (0,0),(0,1),(1,0),(1,1).
Later (2,2) is still land and starts island 2.
Answer = 2.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
/* ==================== WITH BUILT-IN HELPERS ==================== */
function numIslandsUsingBuiltIns(grid) {
  const rows = grid.length;
  if (rows === 0)
  return 0;
  const cols = grid[0].length;
  let count = 0;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const queue = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] !== "1")
      continue;
      count++;
      queue.push([row, col]);
      let front = 0;
      grid[row][col] = "0";
      while (front < queue.length) {
        const [currentRow, currentCol] = queue[front++];
        for (const [dr, dc] of directions) {
          const nextRow = currentRow + dr;
          const nextCol = currentCol + dc;
          if (nextRow < 0 ||
          nextCol < 0 ||
          nextRow >= rows ||
          nextCol >= cols ||
          grid[nextRow][nextCol] !== "1") {
            continue;
          }
          grid[nextRow][nextCol] = "0";
          queue.push([nextRow, nextCol]);
        }
      }
      queue.length = 0;
    }
  }
  return count;
}\`,
typescriptSolution: \`/* ==================== WITH BUILT-IN HELPERS ==================== */
function numIslandsUsingBuiltIns(grid: string[][]): number {
  const rows = grid.length;
  if (rows === 0) return 0;

  const cols = grid[0]!.length;
  let count = 0;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const queue: Array<[number, number]> = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row]![col] !== "1") continue;

      count++;
      queue.push([row, col]);

      let front = 0;
      grid[row]![col] = "0";

      while (front < queue.length) {
        const [currentRow, currentCol] = queue[front++]!;

        for (const [dr, dc] of directions) {
          const nextRow = currentRow + dr;
          const nextCol = currentCol + dc;

          if (
          nextRow < 0 ||
          nextCol < 0 ||
          nextRow >= rows ||
          nextCol >= cols ||
          grid[nextRow]![nextCol] !== "1"
          ) {
            continue;
          }

          grid[nextRow]![nextCol] = "0";
          queue.push([nextRow, nextCol]);
        }
      }

      queue.length = 0;
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
      typescriptSolution: ''
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
      algorithm: `Step 1: Save the original color of the starting pixel.
Step 2: If the original color already equals newColor, return immediately.
Step 3: Flood-fill only neighboring cells that still have the original color.
Step 4: Return the modified image after the connected region has been recolored.

Core idea from source:
Read the color at the starting pixel. If it already equals newColor, return the image unchanged (this guard is what prevents infinite recursion when the two colors match). Otherwise, DFS from (sr, sc): recolor the current cell to newColor, then recurse into the four neighbors, continuing only into cells whose color still equals the original starting color.`,
      dryRun: `image=[[1,1,1],[1,1,0],[1,0,1]], start=(1,1), newColor=2
Original color = 1.
Recolor (1,1), then connected 1s spread to (0,1),(1,0),(0,0),(0,2).
The 0s block further travel and (2,2) is disconnected.
Result=[[2,2,2],[2,2,0],[2,0,1]].`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
/* ==================== WITH BUILT-IN HELPERS ==================== */
function floodFillUsingBuiltIns(image, sr, sc, newColor) {
  const startColor = image[sr][sc];
  if (startColor === newColor)
  return image;
  const queue = [[sr, sc]];
  let front = 0;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  while (front < queue.length) {
    const [row, col] = queue[front++];
    if (row < 0 ||
    col < 0 ||
    row >= image.length ||
    col >= image[0].length ||
    image[row][col] !== startColor) {
      continue;
    }
    image[row][col] = newColor;
    for (const [dr, dc] of directions) {
      queue.push([row + dr, col + dc]);
    }
  }
  return image;
}\`,
typescriptSolution: \`/* ==================== WITH BUILT-IN HELPERS ==================== */
function floodFillUsingBuiltIns(
image: number[][],
sr: number,
sc: number,
newColor: number,
): number[][] {
  const startColor = image[sr]![sc]!;
  if (startColor === newColor) return image;

  const queue: Array<[number, number]> = [[sr, sc]];
  let front = 0;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (front < queue.length) {
    const [row, col] = queue[front++]!;

    if (
    row < 0 ||
    col < 0 ||
    row >= image.length ||
    col >= image[0]!.length ||
    image[row]![col] !== startColor
    ) {
      continue;
    }

    image[row]![col] = newColor;

    for (const [dr, dc] of directions) {
      queue.push([row + dr, col + dc]);
    }
  }

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
      typescriptSolution: ''
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
      algorithm: `Step 1: Scan for an unvisited land cell.
Step 2: Start DFS/BFS from that cell and count every connected land cell.
Step 3: Mark each visited cell as water so it is not counted again.
Step 4: Keep the largest component size seen across all islands.

Core idea from source:
Scan every cell. On finding unvisited land, run a DFS that sinks the cell (sets it to 0) and returns 1 plus the sum of the DFS results of its four neighbors — this yields the exact size of that connected component. Track the maximum size seen across all islands discovered during the scan.`,
      dryRun: `grid=[[1,1],[1,1]]
Start at (0,0).
DFS visits all four cells exactly once.
Area = 4.
No other land remains.
Answer = 4.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
/* ==================== WITH BUILT-IN HELPERS ==================== */
function maxAreaOfIslandUsingBuiltIns(grid) {
  const rows = grid.length;
  if (rows === 0)
  return 0;
  const cols = grid[0].length;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let best = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] !== 1)
      continue;
      let area = 0;
      const queue = [[row, col]];
      let front = 0;
      grid[row][col] = 0;
      while (front < queue.length) {
        const [currentRow, currentCol] = queue[front++];
        area++;
        for (const [dr, dc] of directions) {
          const nextRow = currentRow + dr;
          const nextCol = currentCol + dc;
          if (nextRow < 0 ||
          nextCol < 0 ||
          nextRow >= rows ||
          nextCol >= cols ||
          grid[nextRow][nextCol] !== 1) {
            continue;
          }
          grid[nextRow][nextCol] = 0;
          queue.push([nextRow, nextCol]);
        }
      }
      best = Math.max(best, area);
    }
  }
  return best;
}\`,
typescriptSolution: \`/* ==================== WITH BUILT-IN HELPERS ==================== */
function maxAreaOfIslandUsingBuiltIns(
grid: number[][],
): number {
  const rows = grid.length;
  if (rows === 0) return 0;

  const cols = grid[0]!.length;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let best = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row]![col] !== 1) continue;

      let area = 0;
      const queue: Array<[number, number]> = [[row, col]];
      let front = 0;
      grid[row]![col] = 0;

      while (front < queue.length) {
        const [currentRow, currentCol] = queue[front++]!;
        area++;

        for (const [dr, dc] of directions) {
          const nextRow = currentRow + dr;
          const nextCol = currentCol + dc;

          if (
          nextRow < 0 ||
          nextCol < 0 ||
          nextRow >= rows ||
          nextCol >= cols ||
          grid[nextRow]![nextCol] !== 1
          ) {
            continue;
          }

          grid[nextRow]![nextCol] = 0;
          queue.push([nextRow, nextCol]);
        }
      }

      best = Math.max(best, area);
    }
  }

  return best;
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
      typescriptSolution: ''
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
      algorithm: `Step 1: Do not search for enclosed regions directly; start from border \`O\` cells.
Step 2: Mark every \`O\` connected to a border as safe.
Step 3: Convert every remaining \`O\` to \`X\`.
Step 4: Convert the temporary safe marker back to \`O\`.

Core idea from source:
DFS from every O cell on the border, marking each one reachable this way with a temporary marker character (so it will not be captured). This correctly protects entire border-connected regions, not just the border cells themselves. Then do a single final pass over the whole board: any remaining "O" (never reached from a border) gets flipped to "X" (captured), and every temporary marker gets restored to "O".`,
      dryRun: `Board contains an interior O region and one border O.
Border DFS marks the border-connected O as "#".
Interior O cells remain plain "O".
Final pass:
plain O → X,
# → O.
Only the enclosed region is captured.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
/* ==================== WITH BUILT-IN HELPERS ==================== */
function solveSurroundedRegionsUsingBuiltIns(board) {
  const rows = board.length;
  if (rows === 0)
  return [];
  const cols = board[0].length;
  const queue = [];
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  function enqueueSafe(row, col) {
    if (row < 0 ||
    col < 0 ||
    row >= rows ||
    col >= cols ||
    board[row][col] !== "O") {
      return;
    }
    board[row][col] = "#";
    queue.push([row, col]);
  }
  for (let row = 0; row < rows; row++) {
    enqueueSafe(row, 0);
    enqueueSafe(row, cols - 1);
  }
  for (let col = 0; col < cols; col++) {
    enqueueSafe(0, col);
    enqueueSafe(rows - 1, col);
  }
  let front = 0;
  while (front < queue.length) {
    const [row, col] = queue[front++];
    for (const [dr, dc] of directions) {
      enqueueSafe(row + dr, col + dc);
    }
  }
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col] === "O") {
        board[row][col] = "X";
      }
      else if (board[row][col] === "#") {
        board[row][col] = "O";
      }
    }
  }
  return board;
}\`,
typescriptSolution: \`/* ==================== WITH BUILT-IN HELPERS ==================== */
function solveSurroundedRegionsUsingBuiltIns(
board: string[][],
): string[][] {
  const rows = board.length;
  if (rows === 0) return [];

  const cols = board[0]!.length;
  const queue: Array<[number, number]> = [];
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function enqueueSafe(row: number, col: number): void {
    if (
    row < 0 ||
    col < 0 ||
    row >= rows ||
    col >= cols ||
    board[row]![col] !== "O"
    ) {
      return;
    }

    board[row]![col] = "#";
    queue.push([row, col]);
  }

  for (let row = 0; row < rows; row++) {
    enqueueSafe(row, 0);
    enqueueSafe(row, cols - 1);
  }

  for (let col = 0; col < cols; col++) {
    enqueueSafe(0, col);
    enqueueSafe(rows - 1, col);
  }

  let front = 0;

  while (front < queue.length) {
    const [row, col] = queue[front++]!;

    for (const [dr, dc] of directions) {
      enqueueSafe(row + dr, col + dc);
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row]![col] === "O") {
        board[row]![col] = "X";
      } else if (board[row]![col] === "#") {
        board[row]![col] = "O";
      }
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
      typescriptSolution: ''
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
      algorithm: `Step 1: Reverse the problem and start from each ocean\'s border.
Step 2: From the ocean, move to a neighbor only when the neighbor height is >= the current height.
Step 3: Build one reachability matrix for the Pacific and one for the Atlantic.
Step 4: The answer is the intersection of the two reachable sets, scanned row-by-row for the required order.

Core idea from source:
Run two independent reachability searches. From every cell on the Pacific-adjacent border (row 0 and column 0), DFS inland, moving to a neighbor only if its height is >= the current height (this is the reverse of "water flows downhill", so walking uphill from the ocean traces exactly the cells water could have flowed down from). Mark every cell reached this way as pacific-reachable. Do the same from the Atlantic-adjacent border (last row and last column) to get atlantic-reachable. The answer is every cell marked reachable by both searches, sorted by row then column for determinism.`,
      dryRun: `heights=[[1]]
Pacific border contains (0,0).
Atlantic border also contains (0,0).
Both reachability matrices contain (0,0).
Intersection = [[0,0]].

For the classic 5x5 example, the expected intersection is:
[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]].`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
/* ==================== WITH BUILT-IN HELPERS ==================== */
function pacificAtlanticUsingBuiltIns(heights) {
  const rows = heights.length;
  if (rows === 0)
  return [];
  const cols = heights[0].length;
  const pacific = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const atlantic = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  function bfs(starts, visited) {
    const queue = starts;
    let front = 0;
    for (const [row, col] of queue) {
      visited[row][col] = true;
    }
    while (front < queue.length) {
      const [row, col] = queue[front++];
      const currentHeight = heights[row][col];
      for (const [dr, dc] of directions) {
        const nextRow = row + dr;
        const nextCol = col + dc;
        if (nextRow < 0 ||
        nextCol < 0 ||
        nextRow >= rows ||
        nextCol >= cols ||
        visited[nextRow][nextCol] ||
        heights[nextRow][nextCol] < currentHeight) {
          continue;
        }
        visited[nextRow][nextCol] = true;
        queue.push([nextRow, nextCol]);
      }
    }
  }
  const pacificStarts = [];
  const atlanticStarts = [];
  for (let col = 0; col < cols; col++) {
    pacificStarts.push([0, col]);
    atlanticStarts.push([rows - 1, col]);
  }
  for (let row = 0; row < rows; row++) {
    pacificStarts.push([row, 0]);
    atlanticStarts.push([row, cols - 1]);
  }
  bfs(pacificStarts, pacific);
  bfs(atlanticStarts, atlantic);
  const result = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (pacific[row][col] && atlantic[row][col]) {
        result.push([row, col]);
      }
    }
  }
  return result;
}\`,
typescriptSolution: \`/* ==================== WITH BUILT-IN HELPERS ==================== */
function pacificAtlanticUsingBuiltIns(
heights: number[][],
): number[][] {
  const rows = heights.length;
  if (rows === 0) return [];

  const cols = heights[0]!.length;
  const pacific = Array.from(
  { length: rows },
  () => new Array(cols).fill(false),
  );
  const atlantic = Array.from(
  { length: rows },
  () => new Array(cols).fill(false),
  );

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function bfs(
  starts: Array<[number, number]>,
  visited: boolean[][],
  ): void {
    const queue = starts;
    let front = 0;

    for (const [row, col] of queue) {
      visited[row]![col] = true;
    }

    while (front < queue.length) {
      const [row, col] = queue[front++]!;
      const currentHeight = heights[row]![col]!;

      for (const [dr, dc] of directions) {
        const nextRow = row + dr;
        const nextCol = col + dc;

        if (
        nextRow < 0 ||
        nextCol < 0 ||
        nextRow >= rows ||
        nextCol >= cols ||
        visited[nextRow]![nextCol] ||
        heights[nextRow]![nextCol]! < currentHeight
        ) {
          continue;
        }

        visited[nextRow]![nextCol] = true;
        queue.push([nextRow, nextCol]);
      }
    }
  }

  const pacificStarts: Array<[number, number]> = [];
  const atlanticStarts: Array<[number, number]> = [];

  for (let col = 0; col < cols; col++) {
    pacificStarts.push([0, col]);
    atlanticStarts.push([rows - 1, col]);
  }

  for (let row = 0; row < rows; row++) {
    pacificStarts.push([row, 0]);
    atlanticStarts.push([row, cols - 1]);
  }

  bfs(pacificStarts, pacific);
  bfs(atlanticStarts, atlantic);

  const result: number[][] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (pacific[row]![col] && atlantic[row]![col]) {
        result.push([row, col]);
      }
    }
  }

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
      typescriptSolution: ''
    },
  },
];