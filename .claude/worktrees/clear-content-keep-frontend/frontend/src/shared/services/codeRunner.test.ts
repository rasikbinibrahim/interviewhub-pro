import { describe, it, expect } from 'vitest';
import { runAgainstTests } from './codeRunner';
import { MOCK_CODING_QUESTIONS } from '@/mocks/questions';

describe('runAgainstTests', () => {
  it('passes a correct solution against a single test case', () => {
    const source = `function add(a, b) { return a + b; }`;
    const result = runAgainstTests(source, 'add', [
      { input: [2, 3], expectedOutput: 5, description: 'basic addition' },
    ]);

    expect(result.allPassed).toBe(true);
    expect(result.results[0]).toMatchObject({ passed: true, actualOutput: 5 });
  });

  it('reports a failing test with the actual vs expected output', () => {
    const source = `function add(a, b) { return a - b; }`; // deliberately wrong
    const result = runAgainstTests(source, 'add', [
      { input: [2, 3], expectedOutput: 5, description: 'basic addition' },
    ]);

    expect(result.allPassed).toBe(false);
    expect(result.results[0]).toMatchObject({ passed: false, actualOutput: -1, expectedOutput: 5 });
  });

  it('reports a clear error when the expected function name is missing', () => {
    const source = `function wrongName() { return 1; }`;
    const result = runAgainstTests(source, 'add', [{ input: [], expectedOutput: 1, description: 'n/a' }]);

    expect(result.allPassed).toBe(false);
    expect(result.results[0]?.error).toContain('No function named "add"');
  });

  it('catches a runtime error thrown by the candidate code without crashing the runner', () => {
    const source = `function boom() { throw new Error('deliberate failure'); }`;
    const result = runAgainstTests(source, 'boom', [{ input: [], expectedOutput: 1, description: 'n/a' }]);

    expect(result.allPassed).toBe(false);
    expect(result.results[0]?.error).toBe('deliberate failure');
  });

  it('continues running remaining tests after one throws', () => {
    const source = `function maybeThrow(x) { if (x === 0) throw new Error('div by zero'); return 10 / x; }`;
    const result = runAgainstTests(source, 'maybeThrow', [
      { input: [0], expectedOutput: 0, description: 'throws' },
      { input: [2], expectedOutput: 5, description: 'succeeds' },
    ]);

    expect(result.results).toHaveLength(2);
    expect(result.results[0]?.passed).toBe(false);
    expect(result.results[1]).toMatchObject({ passed: true, actualOutput: 5 });
  });

  it('deep-compares array outputs, not just reference equality', () => {
    const source = `function pair() { return [1, 2]; }`;
    const result = runAgainstTests(source, 'pair', [{ input: [], expectedOutput: [1, 2], description: 'array' }]);

    expect(result.allPassed).toBe(true);
  });

  // Regression coverage: every real reference solution in the question
  // bank must actually pass its own documented sample tests. This
  // catches drift between a question's `sampleTests` and its
  // `javascriptSolution` if either is ever edited independently.
  describe('reference solutions against their own sample tests', () => {
    for (const { detail, solution } of MOCK_CODING_QUESTIONS) {
      if (
        solution.javascriptSolution &&
        detail.sampleTests &&
        detail.sampleTests.length > 0 &&
        detail.sampleTests[0]!.description !== 'Sample test case'
      ) {
        it(`${detail.questionNumber} ${detail.title}`, () => {
          const result = runAgainstTests(solution.javascriptSolution, detail.functionName, detail.sampleTests);
          expect(result.allPassed, JSON.stringify(result.results, null, 2)).toBe(true);
        });
      }
    }
  });
});
