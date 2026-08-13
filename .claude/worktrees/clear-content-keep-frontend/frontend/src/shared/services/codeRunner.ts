/**
 * Client-side code execution for the Run button.
 *
 * SCOPE AND SAFETY NOTE — read before extending this file:
 * This executes the candidate's own code inside their own browser tab,
 * exactly like typing into the browser devtools console. That is safe:
 * it can only affect the user's own session, never another user or any
 * shared infrastructure.
 *
 * This is NOT the server-side "Run Engine" from PROGRESS.md's
 * Implementation Phases (Phase 7) or the open sandboxing question in
 * PRD.md. That engine would execute arbitrary submitted code on shared
 * backend infrastructure for hidden-test grading, which is a real
 * security-critical design problem requiring deliberate sandboxing
 * (isolated processes/containers, not this). Do not reuse this module's
 * approach for that — they solve different problems with different
 * trust boundaries.
 */

import React from 'react';
import type { TestCase } from '@/shared/types/question';

export interface TestResult {
  passed: boolean;
  input: unknown[];
  expectedOutput: unknown;
  actualOutput?: unknown;
  error?: string;
}

export interface RunResult {
  allPassed: boolean;
  results: TestResult[];
}

function deepEqual(a: unknown, b: unknown): boolean {
  // Sufficient for this app's test outputs (numbers, strings, booleans,
  // and nested arrays of those) — not a general-purpose deep-equal.
  return JSON.stringify(a) === JSON.stringify(b);
}

function mockUseState<T>(init: T | (() => T)): [T, (v: T | ((prev: T) => T)) => void] {
  const val = typeof init === 'function' ? (init as () => T)() : init;
  const setVal = () => {};
  return [val, setVal];
}

function mockUseEffect(cb: () => void | (() => void)) {
  const cleanup = cb();
  if (typeof cleanup === 'function') {
    cleanup();
  }
}

/**
 * Compiles the candidate's source (which must define a function named
 * `functionName`) and runs it against each test case, isolated per call
 * so one throwing test doesn't abort the rest.
 */
export function runAgainstTests(
  source: string,
  functionName: string,
  tests: readonly TestCase[]
): RunResult {
  const results: TestResult[] = tests.map((test) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-implied-eval -- see file-level safety note
      const factory = new Function(
        'React',
        'useState',
        'useEffect',
        `${source}\nreturn typeof ${functionName} === 'function' ? ${functionName} : undefined;`
      );
      const fn = factory(React, mockUseState, mockUseEffect) as ((...args: unknown[]) => unknown) | undefined;

      if (typeof fn !== 'function') {
        return {
          passed: false,
          input: test.input,
          expectedOutput: test.expectedOutput,
          error: `No function named "${functionName}" was found in your code.`,
        };
      }

      const actualOutput = fn(...test.input);
      const passed = deepEqual(actualOutput, test.expectedOutput);

      return { passed, input: test.input, expectedOutput: test.expectedOutput, actualOutput };
    } catch (err) {
      return {
        passed: false,
        input: test.input,
        expectedOutput: test.expectedOutput,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  });

  // `[].every()` is vacuously true — without the length guard, a question
  // with zero real sample tests would report "all passed" for any code.
  return { allPassed: results.length > 0 && results.every((r) => r.passed), results };
}
