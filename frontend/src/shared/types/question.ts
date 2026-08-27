// Shape mirrors DATABASE.md's `questions` collection and API_GUIDE.md's
// GET /questions/:id response. Kept in one place so the mock API layer
// and a future real backend both satisfy the exact same contract.
//
// Two distinct question shapes exist, matching CLAUDE.md's rule that
// coding and technical (concept) content are never blended: `coding`
// questions follow QUESTION_TEMPLATE.md's 23 fields (problem statement,
// examples, a runnable solution); `technical` questions follow
// TECHNICAL_QUESTION_TEMPLATE.md's 13 fields (expected answer, deep
// explanation, no code to run). `questionType` is the discriminant.

import type { CompanyType } from '@/shared/constants/companies';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type QuestionType = 'coding' | 'technical';

// The 18-part top-level curriculum grouping. Coarser than `category`
// (e.g. "Prototypes", "Arrays" are `category` values within the "Advanced
// JS" / "DSA" parts respectively) — `part` is what the top-level track
// filter groups by; `category` stays as the finer-grained topic label
// within a part. React Native content is grouped under "Advanced React"
// rather than getting its own 19th part.
export type QuestionPart =
  | 'HTML'
  | 'CSS'
  | 'JS Fundamentals'
  | 'Advanced JS'
  | 'JS Output'
  | 'Browser/Web APIs'
  | 'TypeScript'
  | 'React Fundamentals'
  | 'Advanced React'
  | 'Redux/State'
  | 'Performance'
  | 'Security'
  | 'Machine Coding'
  | 'System Design'
  | 'DSA'
  | 'Testing'
  | 'Architecture'
  | 'DevOps/Cloud'
  | 'AI/LLM'
  | 'Python';

export interface QuestionExample {
  input: string;
  output: string;
  explanation: string;
}

export interface QuestionEdgeCase {
  case: string;
  expected: string;
}

export interface TestCase {
  /** Positional arguments passed to the candidate's function. */
  input: unknown[];
  expectedOutput: unknown;
  description: string;
}

interface QuestionSummaryBase {
  id: string;
  questionNumber: string;
  title: string;
  difficulty: Difficulty;
  companies: string[];
  frequency: number; // 1-5
  part: QuestionPart;
  category: string;
  concepts: string[];
  solved: boolean;
  attempted: boolean;
  bookmarked: boolean;
}

export interface CodingQuestionSummary extends QuestionSummaryBase {
  questionType: 'coding';
}

export interface TechnicalQuestionSummary extends QuestionSummaryBase {
  questionType: 'technical';
  experienceLevel: string;
}

export type QuestionSummary = CodingQuestionSummary | TechnicalQuestionSummary;

export interface CodingQuestionDetail extends CodingQuestionSummary {
  problemStatement: string;
  input: string;
  output: string;
  constraints: string[];
  examples: QuestionExample[];
  edgeCases: QuestionEdgeCase[];
  functionName: string;
  /**
   * True only when the reference solution actually declares
   * `functionName` as a `class` (e.g. FenwickTree, MinStack) — never
   * inferred from naming convention. PascalCase alone doesn't imply a
   * class: React component questions (e.g. `StarRating`) are
   * PascalCase *functions*. The editor stub (CodingScreen.tsx) and the
   * Run harness both key off this, not a name-shape guess.
   */
  isClassBased: boolean;
  sampleTests: TestCase[];
}

export interface TechnicalQuestionDetail extends TechnicalQuestionSummary {
  /** The question phrased the way an interviewer would actually ask it. */
  question: string;
}

export type QuestionDetail = CodingQuestionDetail | TechnicalQuestionDetail;

// Returned only by GET /questions/:id/hint — never bundled into
// QuestionDetail, per API_GUIDE.md's reveal-integrity requirement.
// Coding questions only — technical questions reveal straight to the
// answer (see TechnicalQuestionAnswer) since there's no algorithm hint
// to give short of the answer itself.
export interface QuestionHints {
  hints: [string, string, string];
}

// Returned only by GET /questions/:id/solution — same reveal-integrity
// requirement as hints. Coding questions only.
export interface CodingQuestionSolution {
  algorithm: string;
  dryRun: string;
  javascriptSolution: string;
  typescriptSolution: string;
  builtInSolution?: string;
  timeComplexity: string;
  spaceComplexity: string;
  commonMistakes: string[];
  followUpQuestions: string[];
  similarQuestions: string[];
}

// Returned only by GET /questions/:id/answer — the technical-question
// equivalent of CodingQuestionSolution, same reveal-integrity intent:
// none of this ships in QuestionDetail up front.
export interface TechnicalQuestionExample {
  code: string;
  output: string;
  explanation: string;
}

export interface TechnicalQuestionAnswer {
  expectedAnswer: string;
  deepExplanation: string;
  productionExample: string;
  /** Short runnable snippet paired with its exact output — a quick "read the code, predict the output" check distinct from the longer productionExample. */
  example?: TechnicalQuestionExample;
  bestPractices: string[];
  tradeOffs: string;
  commonMistakes: string[];
  followUpQuestions: string[];
  relatedTopics: string[];
}

export interface QuestionFilters {
  search?: string;
  difficulty?: Difficulty;
  part?: QuestionPart;
  category?: string;
  company?: string;
  companyType?: CompanyType;
  questionType?: QuestionType;
  minFrequency?: number;
  status?: 'solved' | 'attempted' | 'unsolved' | 'bookmarked';
}
