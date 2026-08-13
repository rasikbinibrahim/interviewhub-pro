import { useMemo, useState, type ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { Play, RotateCcw, Bookmark } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { markAttempted, markSolved, toggleBookmark } from '@/store/slices/progressSlice';
import { selectBookmarkedIds } from '@/shared/selectors/progressSelectors';
import { DifficultyBadge, Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CodeEditor, type EditorLanguage } from '@/features/editor/CodeEditor';
import { RunConsole } from '@/features/editor/RunConsole';
import { RevealPanel } from './RevealPanel';
import { BackToListButton } from './BackToListButton';
import { runAgainstTests, type RunResult } from '@/shared/services/codeRunner';
import { useGetQuestionByIdQuery } from '@/store/api/questionsApi';
import { TechnicalScreen } from './TechnicalScreen';
import type { CodingQuestionDetail, TechnicalQuestionDetail, QuestionDetail } from '@/shared/types/question';

type LeftTab = 'problem' | 'explanation';

interface CodingScreenProps {
  question?: QuestionDetail;
}

// A handful of DSA questions (e.g. FenwickTree) ask for a class with
// multiple methods rather than a single function. `isClassBased` comes
// from the generator actually parsing the reference solution's `class`
// vs `function`/arrow declaration (see scripts/sync_mock_questions.js)
// — never inferred from naming. PascalCase alone doesn't imply a class:
// React component questions (e.g. `StarRating`) are PascalCase
// *functions*, and would get the wrong stub shape from a naming guess.
function starterCode(functionName: string, isClassBased: boolean, language: EditorLanguage): string {
  if (isClassBased) {
    return `class ${functionName} {\n  constructor() {\n    // Write your solution here\n  }\n}\n`;
  }
  if (language === 'typescript') {
    return `function ${functionName}(...args: unknown[]): unknown {\n  // Write your solution here\n}\n`;
  }
  return `function ${functionName}(...args) {\n  // Write your solution here\n}\n`;
}

export function CodingScreen({ question: propQuestion }: CodingScreenProps = {}) {
  const { questionId } = useParams<{ questionId: string }>();
  const { data: fetchedQuestion, isLoading } = useGetQuestionByIdQuery(questionId ?? '', {
    skip: !!propQuestion || !questionId,
  });

  const question = propQuestion ?? fetchedQuestion;

  if (isLoading || !question) {
    return <div className="p-6 text-center text-sm text-text-secondary">Loading question…</div>;
  }

  if (question.questionType === 'technical') {
    return <TechnicalScreen question={question as TechnicalQuestionDetail} />;
  }

  return <CodingScreenContent question={question as CodingQuestionDetail} />;
}

function CodingScreenContent({ question }: { question: CodingQuestionDetail }) {
  const dispatch = useAppDispatch();
  const bookmarkedIds = useAppSelector(selectBookmarkedIds);

  const [leftTab, setLeftTab] = useState<LeftTab>('problem');
  const [language, setLanguage] = useState<EditorLanguage>('javascript');
  const [code, setCode] = useState<string | null>(null);
  const [runResult, setRunResult] = useState<RunResult | null>(null);

  const effectiveCode = useMemo(() => {
    if (code !== null) return code;
    return starterCode(question.functionName, question.isClassBased, language);
  }, [code, question.functionName, question.isClassBased, language]);

  const bookmarked = bookmarkedIds.includes(question.id);

  function handleRun() {
    const result = runAgainstTests(effectiveCode, question.functionName, question.sampleTests);
    setRunResult(result);
    dispatch(markAttempted(question.id));
    if (result.allPassed) {
      dispatch(markSolved(question.id));
    }
  }

  function handleReset() {
    setCode(null);
    setRunResult(null);
  }

  function handleLanguageChange(next: EditorLanguage) {
    setLanguage(next);
    setCode(null); // fresh starter code for the new language
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-2">
        <BackToListButton />
        <span className="text-sm font-mono text-text-secondary">{question.questionNumber}</span>
        <span className="text-sm font-bold">{question.title}</span>
        <DifficultyBadge difficulty={question.difficulty} />
        <button
          onClick={() => dispatch(toggleBookmark(question.id))}
          className="ml-auto flex items-center gap-1 text-sm text-text-secondary hover:text-warning"
          aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
          aria-pressed={bookmarked}
        >
          <Bookmark size={14} className={bookmarked ? 'fill-warning text-warning' : ''} />
        </button>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-2">
        {/* Left pane: Problem / Explanation */}
        <div className="flex min-h-0 flex-col border-r border-border">
          <div className="flex gap-1 border-b border-border px-3 pt-2">
            <TabButton active={leftTab === 'problem'} onClick={() => setLeftTab('problem')}>
              Problem
            </TabButton>
            <TabButton active={leftTab === 'explanation'} onClick={() => setLeftTab('explanation')}>
              Explanation
            </TabButton>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {leftTab === 'problem' ? <ProblemView question={question} /> : <RevealPanel questionId={question.id} />}
          </div>
        </div>

        {/* Right pane: Editor + Console */}
        <div className="flex min-h-0 flex-col">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value as EditorLanguage)}
              className="rounded-md border border-border bg-surface-raised px-2 py-1 text-xs font-mono outline-none"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
            </select>
            <div className="ml-auto flex gap-2">
              <Button variant="secondary" onClick={handleReset}>
                <RotateCcw size={14} /> Reset
              </Button>
              <Button variant="primary" onClick={handleRun}>
                <Play size={14} /> Run
              </Button>
            </div>
          </div>

          <div className="h-[55%] min-h-0 border-b border-border">
            <CodeEditor value={effectiveCode} language={language} onChange={setCode} />
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">
            <RunConsole result={runResult} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      onClick={onClick}
      className={`border-b-2 px-3 py-2 text-sm font-semibold transition-colors ${
        active ? 'border-brand text-text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'
      }`}
    >
      {children}
    </button>
  );
}

function ProblemView({ question }: { question: CodingQuestionDetail }) {
  return (
    <div className="flex flex-col gap-4 p-4 text-sm">
      <p className="text-text-primary">{question.problemStatement}</p>

      <Section title="Constraints">
        <ul className="list-disc space-y-0.5 pl-5 font-mono text-xs text-text-secondary">
          {question.constraints.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Section>

      <Section title="Examples">
        <div className="flex flex-col gap-2">
          {question.examples.map((example, i) => (
            <div key={i} className="rounded-md border border-border bg-surface-raised p-2.5 font-mono text-xs">
              <div>
                <span className="text-text-secondary">Input: </span>
                {example.input}
              </div>
              <div>
                <span className="text-text-secondary">Output: </span>
                {example.output}
              </div>
              <div className="mt-1 font-sans text-text-secondary">{example.explanation}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Companies">
        <div className="flex flex-wrap gap-1.5">
          {question.companies.map((company) => (
            <Badge key={company} tone="info">
              {company}
            </Badge>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-bold uppercase tracking-wide text-text-secondary">{title}</div>
      {children}
    </div>
  );
}
