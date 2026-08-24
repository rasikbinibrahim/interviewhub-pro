import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetQuestionsQuery, matchCategory, matchPart } from '@/store/api/questionsApi';
import { useAppSelector } from '@/shared/hooks/redux';
import { selectSolvedIds, selectBookmarkedIds } from '@/shared/selectors/progressSelectors';
import { Button } from '@/components/ui/Button';
import { QuestionListItem } from './QuestionListItem';
import type { Difficulty, QuestionFilters, QuestionPart, QuestionType } from '@/shared/types/question';

// Every filter + the current page lives in the URL (via useSearchParams)
// rather than local component state. /practice and /practice/:questionId
// are separate top-level routes, so navigating from a question detail
// back to the list fully remounts QuestionList — if filters/page lived in
// local useState, they'd silently reset to defaults on every remount.
// Sourcing them from the URL instead means the browser's own history
// (back button, or the in-app Back link's navigate(-1)) restores the
// exact prior URL, and this component reconstructs identical UI state
// from it automatically — no manual state restoration needed.

const PAGE_SIZE = 8;

type StatusFilter = 'All' | 'solved' | 'attempted' | 'unsolved' | 'bookmarked';

const DIFFICULTY_OPTIONS: Array<Difficulty | 'All'> = ['All', 'Easy', 'Medium', 'Hard'];
const QUESTION_TYPE_OPTIONS: Array<{ label: string; value: QuestionType | 'All' }> = [
  { label: 'All Types', value: 'All' },
  { label: 'Coding Practice', value: 'coding' },
  { label: 'Technical Concepts', value: 'technical' },
];
// The 18-part top-level curriculum track — coarser than CATEGORY_OPTIONS
// below, which is the finer-grained per-topic breakdown within a part.
const PART_OPTIONS: Array<{ label: string; value: QuestionPart | 'All' }> = [
  { label: 'All Parts', value: 'All' },
  { label: 'HTML', value: 'HTML' },
  { label: 'CSS', value: 'CSS' },
  { label: 'JS Fundamentals', value: 'JS Fundamentals' },
  { label: 'Advanced JS', value: 'Advanced JS' },
  { label: 'JS Output', value: 'JS Output' },
  { label: 'Browser/Web APIs', value: 'Browser/Web APIs' },
  { label: 'TypeScript', value: 'TypeScript' },
  { label: 'React Fundamentals', value: 'React Fundamentals' },
  { label: 'Advanced React', value: 'Advanced React' },
  { label: 'Redux/State', value: 'Redux/State' },
  { label: 'Performance', value: 'Performance' },
  { label: 'Security', value: 'Security' },
  { label: 'Machine Coding', value: 'Machine Coding' },
  { label: 'System Design', value: 'System Design' },
  { label: 'DSA', value: 'DSA' },
  { label: 'Testing', value: 'Testing' },
  { label: 'Architecture', value: 'Architecture' },
  { label: 'DevOps/Cloud', value: 'DevOps/Cloud' },
  { label: 'AI/LLM', value: 'AI/LLM' },
  { label: 'Python', value: 'Python' },
];
const CATEGORY_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'All Categories', value: 'All' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'React Internals', value: 'react-internals' },
  { label: 'React Hooks', value: 'react-hooks' },
  { label: 'Browser Internals', value: 'browser-internals' },
  { label: 'Web Security', value: 'security' },
  { label: 'Web Performance', value: 'performance' },
  { label: 'Frontend System Design', value: 'system-design' },
  { label: 'Machine Coding', value: 'machine-coding' },
  { label: 'Behavioral & Leadership', value: 'behavioral' },
  { label: 'Company-Wise Prep', value: 'company-wise' },
  { label: 'CSS & Responsive Design', value: 'css' },
  { label: 'Arrays (DSA)', value: 'arrays' },
  { label: 'Strings (DSA)', value: 'strings' },
  { label: 'Hashing (DSA)', value: 'hashing' },
  { label: 'Logic Building (DSA)', value: 'logic-building' },
  { label: 'Programming Fundamentals', value: 'programming-fundamentals' },
  { label: 'Debugging', value: 'debugging' },
  { label: 'Linked List (DSA)', value: 'linked-list' },
  { label: 'Stack (DSA)', value: 'stack' },
  { label: 'Queue (DSA)', value: 'queue' },
  { label: 'Binary Search (DSA)', value: 'binary-search' },
  { label: 'Binary Tree (DSA)', value: 'binary-tree' },
  { label: 'Binary Search Tree (DSA)', value: 'binary-search-tree' },
  { label: 'Backtracking (DSA)', value: 'backtracking' },
  { label: 'Graph (DSA)', value: 'graph' },
  { label: 'Recursion (DSA)', value: 'recursion' },
  { label: 'Sorting (DSA)', value: 'sorting' },
  { label: 'Bit Manipulation (DSA)', value: 'bit-manipulation' },
];
const STATUS_OPTIONS: Array<{ label: string; value: StatusFilter }> = [
  { label: 'All Statuses', value: 'All' },
  { label: 'Solved', value: 'solved' },
  { label: 'Attempted', value: 'attempted' },
  { label: 'Unsolved', value: 'unsolved' },
  { label: 'Bookmarked', value: 'bookmarked' },
];

export function QuestionList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const difficulty = (searchParams.get('difficulty') as Difficulty | null) ?? 'All';
  const questionType = (searchParams.get('type') as QuestionType | null) ?? 'All';
  const part = (searchParams.get('part') as QuestionPart | null) ?? 'All';
  const category = searchParams.get('category') ?? 'All';
  const status = (searchParams.get('status') as StatusFilter | null) ?? 'All';
  const requestedPage = Math.max(1, Number(searchParams.get('page')) || 1);

  // Every filter change (including a fresh search term) jumps back to
  // page 1 — an old page number left over from a wider result set could
  // otherwise point past the end of a newly-narrowed one.
  function updateFilter(key: string, value: string) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value === '' || value === 'All') next.delete(key);
        else next.set(key, value);
        next.delete('page');
        return next;
      },
      { replace: true }
    );
  }

  function setPage(nextPage: number) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (nextPage <= 1) next.delete('page');
        else next.set('page', String(nextPage));
        return next;
      },
      { replace: true }
    );
  }

  const activeFilters: QuestionFilters = {};
  if (search) activeFilters.search = search;
  if (difficulty !== 'All') activeFilters.difficulty = difficulty;
  if (questionType !== 'All') activeFilters.questionType = questionType;
  if (part !== 'All') activeFilters.part = part;
  if (category !== 'All') activeFilters.category = category;
  if (status !== 'All') activeFilters.status = status;

  const { data: questions, isLoading } = useGetQuestionsQuery(activeFilters);
  // Unfiltered, so option labels can show how many questions exist in
  // each bucket regardless of whatever filters are currently applied.
  const { data: allQuestions } = useGetQuestionsQuery({});
  const solvedIds = useAppSelector(selectSolvedIds);
  const bookmarkedIds = useAppSelector(selectBookmarkedIds);

  const partCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const opt of PART_OPTIONS) {
      if (opt.value === 'All') {
        counts.set('All', allQuestions?.length ?? 0);
      } else {
        counts.set(opt.value, allQuestions?.filter((q) => matchPart(q.part, opt.value))?.length ?? 0);
      }
    }
    return counts;
  }, [allQuestions]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const opt of CATEGORY_OPTIONS) {
      if (opt.value === 'All') {
        counts.set('All', allQuestions?.length ?? 0);
      } else {
        counts.set(opt.value, allQuestions?.filter((q) => matchCategory(q.category, opt.value))?.length ?? 0);
      }
    }
    return counts;
  }, [allQuestions]);

  const difficultyCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const diff of DIFFICULTY_OPTIONS) {
      if (diff === 'All') {
        counts.set('All', allQuestions?.length ?? 0);
      } else {
        counts.set(diff, allQuestions?.filter((q) => q.difficulty.toLowerCase() === diff.toLowerCase())?.length ?? 0);
      }
    }
    return counts;
  }, [allQuestions]);

  const typeCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const opt of QUESTION_TYPE_OPTIONS) {
      if (opt.value === 'All') {
        counts.set('All', allQuestions?.length ?? 0);
      } else {
        counts.set(opt.value, allQuestions?.filter((q) => q.questionType === opt.value)?.length ?? 0);
      }
    }
    return counts;
  }, [allQuestions]);

  const totalCount = questions?.length ?? 0;
  const pageCount = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const page = Math.min(requestedPage, pageCount);
  const pageItems = questions?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) ?? [];

  // If a filter change (or a hand-edited URL) leaves `page` pointing past
  // the end of the now-smaller result set, snap it back onto the URL so
  // what's displayed and what's in the address bar never disagree.
  useEffect(() => {
    if (!isLoading && requestedPage > pageCount) {
      setPage(pageCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, requestedPage, pageCount]);

  const rangeStart = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, totalCount);

  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Interview Question Bank</h1>
        <p className="text-sm text-text-secondary">
          Explore DSA coding challenges, technical framework depth, and company interview prep.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="mt-6 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            value={search}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder="Search problems, concepts, or companies…"
            aria-label="Search questions"
            className="w-full rounded-md border border-border bg-surface py-2 pl-9 pr-3 text-sm outline-none focus:border-brand"
          />
        </div>

        {/* Question Type Filter */}
        <select
          value={questionType}
          onChange={(e) => updateFilter('type', e.target.value)}
          aria-label="Filter by question type"
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
        >
          {QUESTION_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label} ({opt.value === 'All' ? (allQuestions?.length ?? 0) : (typeCounts.get(opt.value) ?? 0)})
            </option>
          ))}
        </select>

        {/* Part Filter — the top-level 18-track curriculum grouping (HTML,
            CSS, Advanced JS, DSA, ...). Coarser than the Category filter
            below, which breaks a part down into its finer-grained topics. */}
        <select
          value={part}
          onChange={(e) => updateFilter('part', e.target.value)}
          aria-label="Filter by part"
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
        >
          {PART_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label} ({opt.value === 'All' ? (allQuestions?.length ?? 0) : (partCounts.get(opt.value) ?? 0)})
            </option>
          ))}
        </select>

        {/* Category Filter — the "topic" breakdown: each option shows how
            many questions exist under that topic across the whole bank. */}
        <select
          value={category}
          onChange={(e) => updateFilter('category', e.target.value)}
          aria-label="Filter by topic"
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label} ({opt.value === 'All' ? (allQuestions?.length ?? 0) : (categoryCounts.get(opt.value) ?? 0)})
            </option>
          ))}
        </select>

        {/* Difficulty Filter */}
        <select
          value={difficulty}
          onChange={(e) => updateFilter('difficulty', e.target.value)}
          aria-label="Filter by difficulty"
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
        >
          {DIFFICULTY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option === 'All' ? 'All difficulties' : option} ({option === 'All' ? (allQuestions?.length ?? 0) : (difficultyCounts.get(option) ?? 0)})
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => updateFilter('status', e.target.value)}
          aria-label="Filter by status"
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Result count summary — how many questions match, out of how many total */}
      {!isLoading && (
        <div className="mt-4 text-xs text-text-secondary">
          {totalCount === 0
            ? 'No questions match these filters.'
            : `Showing ${rangeStart}–${rangeEnd} of ${totalCount} question${totalCount === 1 ? '' : 's'}`}
          {totalCount !== (allQuestions?.length ?? totalCount) && ` (out of ${allQuestions?.length ?? 0} total in the bank)`}
        </div>
      )}

      <div className="mt-3 flex flex-col gap-2">
        {isLoading && <div className="p-6 text-center text-sm text-text-secondary">Loading…</div>}

        {!isLoading && totalCount === 0 && (
          <div className="p-6 text-center text-sm text-text-secondary">No questions match these filters.</div>
        )}

        {pageItems.map((q) => (
          <QuestionListItem
            key={q.id}
            question={q}
            solved={solvedIds.includes(q.id)}
            bookmarked={bookmarkedIds.includes(q.id)}
          />
        ))}
      </div>

      {!isLoading && pageCount > 1 && (
        <div className="mt-5 flex items-center justify-center gap-3">
          <Button variant="secondary" onClick={() => setPage(page - 1)} disabled={page <= 1} aria-label="Previous page">
            <ChevronLeft size={14} /> Prev
          </Button>
          <span className="text-xs font-medium text-text-secondary">
            Page {page} of {pageCount}
          </span>
          <Button variant="secondary" onClick={() => setPage(page + 1)} disabled={page >= pageCount} aria-label="Next page">
            Next <ChevronRight size={14} />
          </Button>
        </div>
      )}
    </div>
  );
}
