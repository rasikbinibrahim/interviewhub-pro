import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, X, FilterX, RotateCcw } from 'lucide-react';
import { useGetQuestionsQuery, matchCategory, matchPart } from '@/store/api/questionsApi';
import { useAppSelector } from '@/shared/hooks/redux';
import { selectSolvedIds, selectBookmarkedIds } from '@/shared/selectors/progressSelectors';
import { Button } from '@/components/ui/Button';
import { QuestionListItem } from './QuestionListItem';
import type { Difficulty, QuestionFilters, QuestionPart, QuestionType } from '@/shared/types/question';

const PAGE_SIZE = 8;

type StatusFilter = 'All' | 'solved' | 'attempted' | 'unsolved' | 'bookmarked';

const DIFFICULTY_OPTIONS: Array<Difficulty | 'All'> = ['All', 'Easy', 'Medium', 'Hard'];
const QUESTION_TYPE_OPTIONS: Array<{ label: string; value: QuestionType | 'All' }> = [
  { label: 'All Types', value: 'All' },
  { label: 'Coding Practice', value: 'coding' },
  { label: 'Technical Concepts', value: 'technical' },
];

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

const PRESET_CATEGORY_OPTIONS: Array<{ label: string; value: string }> = [
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

  function clearAllFilters() {
    setSearchParams(new URLSearchParams(), { replace: true });
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
  const { data: allQuestions } = useGetQuestionsQuery({});
  const solvedIds = useAppSelector(selectSolvedIds);
  const bookmarkedIds = useAppSelector(selectBookmarkedIds);

  // Fast O(N) single-pass counts
  const partCounts = useMemo(() => {
    const counts = new Map<string, number>();
    if (!allQuestions) return counts;
    for (const item of allQuestions) {
      if (item?.part) {
        counts.set(item.part, (counts.get(item.part) ?? 0) + 1);
      }
    }
    return counts;
  }, [allQuestions]);

  const { categoryCounts, dynamicCategoryOptions } = useMemo(() => {
    const counts = new Map<string, number>();
    const labelMap = new Map<string, string>();

    for (const opt of PRESET_CATEGORY_OPTIONS) {
      if (opt.value !== 'All') {
        labelMap.set(opt.value, opt.label);
      }
    }

    if (allQuestions) {
      const scopeQuestions = part !== 'All' 
        ? allQuestions.filter((q) => q && matchPart(q.part, part)) 
        : allQuestions;

      for (const item of scopeQuestions) {
        if (!item?.category) continue;
        const qCat = item.category;
        const normKey = qCat.toLowerCase().trim();

        if (!labelMap.has(normKey)) {
          labelMap.set(normKey, qCat);
        }
        counts.set(normKey, (counts.get(normKey) ?? 0) + 1);
      }

      // Also count preset matches using matchCategory logic for preset options
      for (const [key] of labelMap.entries()) {
        if (!counts.has(key)) {
          let c = 0;
          for (const item of scopeQuestions) {
            if (item?.category && matchCategory(item.category, key)) {
              c++;
            }
          }
          counts.set(key, c);
        }
      }
    }

    const list: Array<{ label: string; value: string }> = [];
    for (const [value, label] of labelMap.entries()) {
      list.push({ label, value });
    }

    list.sort((a, b) => a.label.localeCompare(b.label));
    return {
      categoryCounts: counts,
      dynamicCategoryOptions: [{ label: 'All Categories', value: 'All' }, ...list],
    };
  }, [allQuestions, part]);

  const difficultyCounts = useMemo(() => {
    const counts = new Map<string, number>();
    if (!allQuestions) return counts;
    for (const item of allQuestions) {
      if (item?.difficulty) {
        const key = item.difficulty.toLowerCase();
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
    return counts;
  }, [allQuestions]);

  const typeCounts = useMemo(() => {
    const counts = new Map<string, number>();
    if (!allQuestions) return counts;
    for (const item of allQuestions) {
      if (item?.questionType) {
        counts.set(item.questionType, (counts.get(item.questionType) ?? 0) + 1);
      }
    }
    return counts;
  }, [allQuestions]);

  const hasActiveFilters = Boolean(
    search || difficulty !== 'All' || questionType !== 'All' || part !== 'All' || category !== 'All' || status !== 'All'
  );

  const totalCount = questions?.length ?? 0;
  const pageCount = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const page = Math.min(requestedPage, pageCount);
  const pageItems = questions?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) ?? [];

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
      {/* Header Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-text-primary">Interview Question Bank</h1>
        <p className="text-sm text-text-secondary">
          Explore DSA coding challenges, technical framework depth, and company interview prep.
        </p>
      </div>

      {/* Professional Filters Bar */}
      <div className="mt-6 flex flex-col gap-3">
        <div className="flex flex-wrap gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px]">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              value={search}
              onChange={(e) => updateFilter('search', e.target.value)}
              placeholder="Search problems, concepts, or companies…"
              aria-label="Search questions"
              className="w-full rounded-md border border-border bg-surface py-2 pl-9 pr-8 text-sm text-text-primary outline-none focus:border-brand transition-colors"
            />
            {search && (
              <button
                onClick={() => updateFilter('search', '')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary p-0.5 rounded-full"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Question Type Filter */}
          <select
            value={questionType}
            onChange={(e) => updateFilter('type', e.target.value)}
            aria-label="Filter by question type"
            className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-brand cursor-pointer"
          >
            {QUESTION_TYPE_OPTIONS.map((opt) => {
              const count = opt.value === 'All' ? (allQuestions?.length ?? 0) : (typeCounts.get(opt.value) ?? 0);
              return (
                <option key={opt.value} value={opt.value}>
                  {opt.label} ({count})
                </option>
              );
            })}
          </select>

          {/* Part Track Filter */}
          <select
            value={part}
            onChange={(e) => updateFilter('part', e.target.value)}
            aria-label="Filter by part"
            className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-brand cursor-pointer"
          >
            {PART_OPTIONS.map((opt) => {
              const count = opt.value === 'All' ? (allQuestions?.length ?? 0) : (partCounts.get(opt.value) ?? 0);
              return (
                <option key={opt.value} value={opt.value}>
                  {opt.label} ({count})
                </option>
              );
            })}
          </select>

          {/* Category / Topic Filter */}
          <select
            value={category}
            onChange={(e) => updateFilter('category', e.target.value)}
            aria-label="Filter by topic"
            className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-brand cursor-pointer"
          >
            {dynamicCategoryOptions.map((opt) => {
              const count = opt.value === 'All' ? (allQuestions?.length ?? 0) : (categoryCounts.get(opt.value) ?? 0);
              return (
                <option key={opt.value} value={opt.value}>
                  {opt.label} ({count})
                </option>
              );
            })}
          </select>

          {/* Difficulty Filter */}
          <select
            value={difficulty}
            onChange={(e) => updateFilter('difficulty', e.target.value)}
            aria-label="Filter by difficulty"
            className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-brand cursor-pointer"
          >
            {DIFFICULTY_OPTIONS.map((option) => {
              const count = option === 'All' ? (allQuestions?.length ?? 0) : (difficultyCounts.get(option.toLowerCase()) ?? 0);
              return (
                <option key={option} value={option}>
                  {option === 'All' ? 'All difficulties' : option} ({count})
                </option>
              );
            })}
          </select>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => updateFilter('status', e.target.value)}
            aria-label="Filter by status"
            className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-brand cursor-pointer"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* One-Click Reset All Button */}
          {hasActiveFilters && (
            <Button
              variant="secondary"
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-text-secondary hover:text-text-primary"
              aria-label="Reset all filters"
            >
              <RotateCcw size={13} /> Reset Filters
            </Button>
          )}
        </div>

        {/* Active Filter Badges Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Active:</span>
            {search && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-0.5 text-xs text-brand font-medium border border-brand/20">
                Search: "{search}"
                <button onClick={() => updateFilter('search', '')} className="hover:opacity-75"><X size={12} /></button>
              </span>
            )}
            {questionType !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-0.5 text-xs text-brand font-medium border border-brand/20">
                Type: {questionType}
                <button onClick={() => updateFilter('type', 'All')} className="hover:opacity-75"><X size={12} /></button>
              </span>
            )}
            {part !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-0.5 text-xs text-brand font-medium border border-brand/20">
                Part: {part}
                <button onClick={() => updateFilter('part', 'All')} className="hover:opacity-75"><X size={12} /></button>
              </span>
            )}
            {category !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-0.5 text-xs text-brand font-medium border border-brand/20">
                Topic: {category}
                <button onClick={() => updateFilter('category', 'All')} className="hover:opacity-75"><X size={12} /></button>
              </span>
            )}
            {difficulty !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-0.5 text-xs text-brand font-medium border border-brand/20">
                Difficulty: {difficulty}
                <button onClick={() => updateFilter('difficulty', 'All')} className="hover:opacity-75"><X size={12} /></button>
              </span>
            )}
            {status !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-0.5 text-xs text-brand font-medium border border-brand/20">
                Status: {status}
                <button onClick={() => updateFilter('status', 'All')} className="hover:opacity-75"><X size={12} /></button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Result Count Summary */}
      {!isLoading && (
        <div className="mt-4 text-xs font-medium text-text-secondary flex items-center justify-between">
          <span>
            {totalCount === 0
              ? 'No questions match these filters.'
              : `Showing ${rangeStart}–${rangeEnd} of ${totalCount} question${totalCount === 1 ? '' : 's'}`}
            {totalCount !== (allQuestions?.length ?? totalCount) && ` (out of ${allQuestions?.length ?? 0} total in the bank)`}
          </span>
        </div>
      )}

      {/* Question List Items & Empty State */}
      <div className="mt-3 flex flex-col gap-2">
        {isLoading && <div className="p-8 text-center text-sm text-text-secondary animate-pulse">Loading questions…</div>}

        {!isLoading && totalCount === 0 && (
          <div className="flex flex-col items-center justify-center p-10 rounded-lg border border-dashed border-border bg-surface text-center gap-3">
            <FilterX size={32} className="text-text-secondary" />
            <h3 className="font-bold text-base text-text-primary">No matching questions found</h3>
            <p className="text-xs text-text-secondary max-w-sm">
              We couldn't find any questions matching your current search and filter combination.
            </p>
            <Button variant="secondary" onClick={clearAllFilters} className="mt-1 flex items-center gap-1.5 text-xs">
              <RotateCcw size={13} /> Clear All Filters
            </Button>
          </div>
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

      {/* Pagination Controls */}
      {!isLoading && pageCount > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
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
