import { useState, type ReactNode } from 'react';
import { Lightbulb, ListTree, Footprints, Code, ChevronDown } from 'lucide-react';
import { useLazyGetQuestionHintsQuery, useLazyGetQuestionSolutionQuery } from '@/store/api/questionsApi';

// Reveal order per CLAUDE.md's Solution Visibility rule: Hint -> Algorithm
// -> Dry Run -> Code -> Complexity -> Follow-up. Hints and the solution
// are fetched from SEPARATE endpoints (see API_GUIDE.md's reveal-
// integrity note) rather than being present in the question payload
// from the start — enforced here client-side by simply never requesting
// them until asked; real reveal-integrity (the payload never containing
// them at all) is a backend guarantee that lands with Phase 3 (API).

type RevealStage = 'none' | 'hint1' | 'hint2' | 'hint3' | 'solution';

interface RevealPanelProps {
  questionId: string;
}

export function RevealPanel({ questionId }: RevealPanelProps) {
  const [stage, setStage] = useState<RevealStage>('none');
  const [fetchHints, hintsResult] = useLazyGetQuestionHintsQuery();
  const [fetchSolution, solutionResult] = useLazyGetQuestionSolutionQuery();

  const hintLevel = stage === 'hint1' ? 1 : stage === 'hint2' ? 2 : stage === 'hint3' ? 3 : 0;

  function advanceTo(next: RevealStage) {
    setStage(next);
    if (next.startsWith('hint') && !hintsResult.data) {
      void fetchHints(questionId);
    }
    if (next === 'solution' && !solutionResult.data) {
      void fetchSolution(questionId);
    }
  }

  return (
    <div className="flex flex-col gap-3 p-4">
      {hintLevel === 0 && (
        <RevealButton icon={Lightbulb} label="Show Hint" onClick={() => advanceTo('hint1')} />
      )}
      {hintLevel >= 1 && hintsResult.data && (
        <RevealCard title="Hint 1">{hintsResult.data.hints[0]}</RevealCard>
      )}

      {hintLevel === 1 && (
        <RevealButton icon={Lightbulb} label="Show Next Hint" onClick={() => advanceTo('hint2')} />
      )}
      {hintLevel >= 2 && hintsResult.data && <RevealCard title="Hint 2">{hintsResult.data.hints[1]}</RevealCard>}

      {hintLevel === 2 && (
        <RevealButton icon={Lightbulb} label="Show Final Hint" onClick={() => advanceTo('hint3')} />
      )}
      {hintLevel >= 3 && hintsResult.data && <RevealCard title="Hint 3">{hintsResult.data.hints[2]}</RevealCard>}

      {stage !== 'solution' && (
        <RevealButton icon={Code} label="Show Answer" onClick={() => advanceTo('solution')} />
      )}

      {stage === 'solution' && solutionResult.data && <SolutionView solution={solutionResult.data} />}
    </div>
  );
}

function RevealButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Lightbulb;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 self-start rounded-md border border-border bg-surface-raised px-3 py-1.5 text-sm font-semibold text-text-secondary transition-colors hover:border-brand hover:text-text-primary"
    >
      <Icon size={14} />
      {label}
      <ChevronDown size={14} />
    </button>
  );
}

function RevealCard({ title, children }: { title: string; children: string }) {
  return (
    <div className="rounded-md border border-border bg-surface p-3 text-sm">
      <div className="mb-1 text-xs font-bold uppercase tracking-wide text-brand">{title}</div>
      <p className="text-text-primary">{children}</p>
    </div>
  );
}

function SolutionView({
  solution,
}: {
  solution: {
    algorithm: string;
    dryRun: string;
    javascriptSolution: string;
    typescriptSolution: string;
    timeComplexity: string;
    spaceComplexity: string;
    commonMistakes: string[];
    followUpQuestions: string[];
  };
}) {
  return (
    <div className="flex flex-col gap-4 rounded-md border border-border bg-surface p-4">
      <Section icon={ListTree} title="Algorithm">
        <pre className="whitespace-pre-wrap font-sans text-sm text-text-primary">{solution.algorithm}</pre>
      </Section>
      <Section icon={Footprints} title="Dry Run">
        <pre className="overflow-x-auto whitespace-pre font-mono text-xs text-text-primary">{solution.dryRun}</pre>
      </Section>
      <Section icon={Code} title="JavaScript Solution">
        <pre className="overflow-x-auto rounded bg-canvas p-3 font-mono text-xs text-text-primary">
          {solution.javascriptSolution}
        </pre>
      </Section>
      <Section icon={Code} title="TypeScript Solution">
        <pre className="overflow-x-auto rounded bg-canvas p-3 font-mono text-xs text-text-primary">
          {solution.typescriptSolution}
        </pre>
      </Section>
      <div className="flex gap-4 text-sm">
        <div>
          <span className="text-text-secondary">Time: </span>
          <span className="font-mono">{solution.timeComplexity}</span>
        </div>
        <div>
          <span className="text-text-secondary">Space: </span>
          <span className="font-mono">{solution.spaceComplexity}</span>
        </div>
      </div>
      <Section title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5 text-sm text-text-primary">
          {solution.commonMistakes.map((mistake) => (
            <li key={mistake}>{mistake}</li>
          ))}
        </ul>
      </Section>
      <Section title="Follow-up Questions">
        <ul className="list-disc space-y-1 pl-5 text-sm text-text-primary">
          {solution.followUpQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon?: typeof Lightbulb;
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-text-secondary">
        {Icon && <Icon size={12} />}
        {title}
      </div>
      {children}
    </div>
  );
}
