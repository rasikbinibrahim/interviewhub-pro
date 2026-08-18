import type { TechnicalQuestionAnswer } from '@/shared/types/question';

export interface DerivedTechnicalExample {
  code: string;
  /** Absent when no line in the snippet had a trailing `// comment` to read the output from. */
  output?: string;
  explanation: string;
}

const FENCE_RE = /```(?:js|jsx|ts|tsx)?\n([\s\S]*?)```/;
const OUTPUT_COMMENT_RE = /console\.log\([^)]*\)\s*;?\s*\/\/\s*(.+)\s*$/m;

function extractFence(text: string | undefined): string | null {
  if (!text) return null;
  const match = FENCE_RE.exec(text);
  return match ? (match[1] ?? '').trim() : null;
}

function extractOutputComment(code: string): string | undefined {
  const match = OUTPUT_COMMENT_RE.exec(code);
  if (!match) return undefined;
  return (match[1] ?? '').trim().replace(/^[✅❌]\s*/, '');
}

function truncate(text: string, max: number): string {
  const trimmed = text.trim();
  return trimmed.length > max ? `${trimmed.slice(0, max).trim()}…` : trimmed;
}

/**
 * A hand-written `answer.example` always wins. Otherwise this pulls the first
 * fenced code snippet out of `productionExample`/`deepExplanation` — whichever
 * has one — so the "Code Example & Output" panel can render something concrete
 * for questions that were never given a dedicated `example` field, without
 * inventing an output value nothing in the source actually states.
 */
export function deriveTechnicalExample(answer: TechnicalQuestionAnswer): DerivedTechnicalExample | null {
  if (answer.example) return answer.example;

  for (const source of [answer.productionExample, answer.deepExplanation]) {
    const code = extractFence(source);
    if (!code) continue;

    const output = extractOutputComment(code);
    const explanation = answer.expectedAnswer
      ? truncate(answer.expectedAnswer, 500)
      : truncate(answer.deepExplanation.replace(FENCE_RE, '').trim(), 500);

    return { code, explanation, ...(output ? { output } : {}) };
  }

  return null;
}
