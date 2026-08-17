// Endpoint shapes mirror API_GUIDE.md's Questions section exactly
// (GET /questions, GET /questions/:id, GET /questions/:id/hint,
// GET /questions/:id/solution, GET /questions/:id/answer). The
// `mockBaseQuery` below stands in for a real HTTP call until Phase 2/3
// (Database, API) are implemented — see PROGRESS.md's Implementation
// Phases table. Swapping to a real backend later means replacing
// `baseQuery: mockBaseQuery` with RTK Query's
// `fetchBaseQuery({ baseUrl: '/api/v1' })`; no endpoint or component
// code needs to change, because the endpoint definitions below already
// match the real API contract.

import { createApi, type BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { getCompanyType } from '@/shared/constants/companies';
import { MOCK_QUESTIONS } from '@/mocks/questions';
import type {
  CodingQuestionSolution,
  QuestionDetail,
  QuestionFilters,
  QuestionHints,
  QuestionSummary,
  TechnicalQuestionAnswer,
} from '@/shared/types/question';

const MOCK_LATENCY_MS = 200;

function simulateNetwork<T>(data: T): Promise<{ data: T }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data }), MOCK_LATENCY_MS);
  });
}

interface MockRequest {
  path: string;
  params?: QuestionFilters;
}

export function matchCategory(qCategory: string, targetCategory: string): boolean {
  if (!targetCategory || targetCategory === 'All') return true;
  if (qCategory === targetCategory) return true;

  const normQ = qCategory.toLowerCase().trim();
  const normTarget = targetCategory.toLowerCase().trim();
  if (normQ === normTarget) return true;

  const alphaQ = normQ.replace(/[^a-z0-9]/g, '');
  const alphaTarget = normTarget.replace(/[^a-z0-9]/g, '');
  return alphaQ === alphaTarget;
}

export function matchPart(qPart: string, targetPart: string): boolean {
  if (!targetPart || targetPart === 'All') return true;
  if (qPart === targetPart) return true;

  const normQ = qPart.toLowerCase().trim();
  const normTarget = targetPart.toLowerCase().trim();
  if (normQ === normTarget) return true;

  const alphaQ = normQ.replace(/[^a-z0-9]/g, '');
  const alphaTarget = normTarget.replace(/[^a-z0-9]/g, '');
  return alphaQ === alphaTarget;
}

const mockBaseQuery: BaseQueryFn<MockRequest, unknown, { message: string }> = async ({ path, params }) => {
  const listMatch = path === '/questions';
  const detailMatch = /^\/questions\/([^/]+)$/.exec(path);
  const hintMatch = /^\/questions\/([^/]+)\/hint$/.exec(path);
  const solutionMatch = /^\/questions\/([^/]+)\/solution$/.exec(path);
  const answerMatch = /^\/questions\/([^/]+)\/answer$/.exec(path);

  if (listMatch) {
    let summaries: QuestionSummary[] = MOCK_QUESTIONS.map(({ detail }) => toSummary(detail));

    if (params?.search) {
      const term = params.search.toLowerCase();
      summaries = summaries.filter(
        (q) => q.title.toLowerCase().includes(term) || q.concepts.some((c) => c.toLowerCase().includes(term))
      );
    }
    if (params?.difficulty) {
      summaries = summaries.filter((q) => q.difficulty.toLowerCase() === params.difficulty!.toLowerCase());
    }
    if (params?.part) {
      summaries = summaries.filter((q) => matchPart(q.part, params.part!));
    }
    if (params?.category) {
      summaries = summaries.filter((q) => matchCategory(q.category, params.category!));
    }
    if (params?.company) {
      summaries = summaries.filter((q) => q.companies.includes(params.company!));
    }
    if (params?.companyType) {
      summaries = summaries.filter((q) => q.companies.some((c) => getCompanyType(c) === params.companyType));
    }
    if (params?.questionType) {
      summaries = summaries.filter((q) => q.questionType === params.questionType);
    }
    if (params?.minFrequency) {
      summaries = summaries.filter((q) => q.frequency >= params.minFrequency!);
    }
    if (params?.status === 'solved') {
      summaries = summaries.filter((q) => q.solved);
    } else if (params?.status === 'attempted') {
      summaries = summaries.filter((q) => q.attempted && !q.solved);
    } else if (params?.status === 'unsolved') {
      summaries = summaries.filter((q) => !q.solved);
    } else if (params?.status === 'bookmarked') {
      summaries = summaries.filter((q) => q.bookmarked);
    }

    return simulateNetwork(summaries);
  }

  if (detailMatch) {
    const id = detailMatch[1];
    const found = MOCK_QUESTIONS.find((q) => q.detail.id === id);
    if (!found) return { error: { message: `Question ${id} not found` } };
    return simulateNetwork(found.detail);
  }

  if (hintMatch) {
    const id = hintMatch[1];
    const found = MOCK_QUESTIONS.find((q) => q.detail.id === id);
    if (!found || !('hints' in found)) return { error: { message: `No hints for question ${id}` } };
    return simulateNetwork(found.hints);
  }

  if (solutionMatch) {
    const id = solutionMatch[1];
    const found = MOCK_QUESTIONS.find((q) => q.detail.id === id);
    if (!found || !('solution' in found)) return { error: { message: `No solution for question ${id}` } };
    return simulateNetwork(found.solution);
  }

  if (answerMatch) {
    const id = answerMatch[1];
    const found = MOCK_QUESTIONS.find((q) => q.detail.id === id);
    if (!found || !('answer' in found)) return { error: { message: `No answer for question ${id}` } };
    return simulateNetwork(found.answer);
  }

  return { error: { message: `Unhandled mock route: ${path}` } };
};

function toSummary(detail: QuestionDetail): QuestionSummary {
  const {
    id,
    questionNumber,
    title,
    difficulty,
    companies,
    frequency,
    part,
    category,
    concepts,
    solved,
    attempted,
    bookmarked,
  } = detail;
  const base = { id, questionNumber, title, difficulty, companies, frequency, part, category, concepts, solved, attempted, bookmarked };
  return detail.questionType === 'technical'
    ? { ...base, questionType: 'technical', experienceLevel: detail.experienceLevel }
    : { ...base, questionType: 'coding' };
}

export const questionsApi = createApi({
  reducerPath: 'questionsApi',
  baseQuery: mockBaseQuery,
  tagTypes: ['Question'],
  endpoints: (builder) => ({
    getQuestions: builder.query<QuestionSummary[], QuestionFilters | void>({
      query: (filters) => (filters ? { path: '/questions', params: filters } : { path: '/questions' }),
      providesTags: ['Question'],
    }),
    getQuestionById: builder.query<QuestionDetail, string>({
      query: (id) => ({ path: `/questions/${id}` }),
      providesTags: (_result, _error, id) => [{ type: 'Question', id }],
    }),
    getQuestionHints: builder.query<QuestionHints, string>({
      query: (id) => ({ path: `/questions/${id}/hint` }),
    }),
    getQuestionSolution: builder.query<CodingQuestionSolution, string>({
      query: (id) => ({ path: `/questions/${id}/solution` }),
    }),
    getQuestionAnswer: builder.query<TechnicalQuestionAnswer, string>({
      query: (id) => ({ path: `/questions/${id}/answer` }),
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetQuestionByIdQuery,
  useLazyGetQuestionHintsQuery,
  useLazyGetQuestionSolutionQuery,
  useLazyGetQuestionAnswerQuery,
} = questionsApi;
