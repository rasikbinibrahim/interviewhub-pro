import { Check, X } from 'lucide-react';
import type { RunResult } from '@/shared/services/codeRunner';

interface RunConsoleProps {
  result: RunResult | null;
}

function formatValue(value: unknown): string {
  return JSON.stringify(value);
}

export function RunConsole({ result }: RunConsoleProps) {
  if (!result) {
    return (
      <div className="flex h-full items-center justify-center p-4 text-sm text-text-secondary">
        Click <span className="mx-1 font-semibold">Run</span> to test your code against the sample cases.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-2 overflow-y-auto p-3 font-mono text-xs">
      <div
        className={`rounded-md px-3 py-2 font-sans text-sm font-bold ${
          result.allPassed ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
        }`}
      >
        {result.allPassed
          ? `All ${result.results.length} sample tests passed`
          : `${result.results.filter((r) => r.passed).length} / ${result.results.length} sample tests passed`}
      </div>

      {result.results.map((test, index) => (
        <div
          key={index}
          className={`rounded-md border p-3 ${
            test.passed ? 'border-success/20 bg-success/5' : 'border-danger/20 bg-danger/5'
          }`}
        >
          <div className="mb-1.5 flex items-center gap-1.5 font-sans font-semibold">
            {test.passed ? <Check size={14} className="text-success" /> : <X size={14} className="text-danger" />}
            Test case {index + 1}
          </div>
          <div>Input: {formatValue(test.input)}</div>
          <div>Expected: {formatValue(test.expectedOutput)}</div>
          {test.error ? (
            <div className="text-danger">Error: {test.error}</div>
          ) : (
            <div>Received: {formatValue(test.actualOutput)}</div>
          )}
        </div>
      ))}
    </div>
  );
}
