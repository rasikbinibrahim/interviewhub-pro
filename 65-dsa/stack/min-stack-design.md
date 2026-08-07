# Q6535 · Min Stack (O(1) Auxiliary Min Tracking)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Bloomberg  
**Interview Frequency:** ★★★★★  
**Category:** Stack  
**Concepts:** stack, design, min-stack, O1-lookup  

## Problem Statement

Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum element in **constant time `O(1)`**.

Implement the `MinStack` class:
- `MinStack()` initializes the stack object.
- `void push(int val)` pushes the element `val` onto the stack.
- `void pop()` removes the element on the top of the stack.
- `int top()` gets the top element of the stack.
- `int getMin()` retrieves the minimum element in the stack.

You must implement a solution with `O(1)` time complexity for each function.

## Input

- System calls: `push(val)`, `pop()`, `top()`, `getMin()`

## Output

- Integer values for `top()` and `getMin()` calls

## Constraints

- `-2^31 <= val <= 2^31 - 1`
- Methods `pop`, `top` and `getMin` will always be called on **non-empty** stacks.
- At most `3 * 10^4` calls will be made to `push`, `pop`, `top`, and `getMin`.

## Examples

```javascript
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
```

## Edge Cases

- Pushing duplicate minimum values (`push(-2)`, `push(-2)`) -> popping one minimum must retain `-2` as current minimum.

## Hints

1. **Dual Stack Architecture**: Maintain two parallel stacks: `mainStack` for values and `minStack` for tracking historical minimums.
2. When pushing `val`:
   - Push `val` to `mainStack`.
   - Push `Math.min(val, currentMin)` to `minStack`.
3. When popping:
   - Pop from both `mainStack` and `minStack`.
4. `getMin()` simply returns the top element of `minStack` in $O(1)$ time.

## Algorithm

**Pattern:** Parallel Auxiliary Min Tracking Stack  
**Core Insight:** Pairing every value in `mainStack` with the minimum value present at that exact stack height in `minStack` ensures $O(1)$ instant minimum retrieval during pushes and pops.

## Dry Run

- `push(-2)`: `mainStack = [-2]`, `minStack = [-2]`. `getMin() = -2`.
- `push(0)`: `mainStack = [-2, 0]`, `minStack = [-2, -2]`. `getMin() = -2`.
- `push(-3)`: `mainStack = [-2, 0, -3]`, `minStack = [-2, -2, -3]`. `getMin() = -3`.
- `pop()`: pop from both -> `mainStack = [-2, 0]`, `minStack = [-2, -2]`. `getMin() = -2`.

## JavaScript Solution

```js
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);
    const currentMin = this.minStack.length === 0 
      ? val 
      : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(currentMin);
  }

  pop() {
    this.stack.pop();
    this.minStack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}
```

## TypeScript Solution

```ts
class MinStack {
  private stack: number[];
  private minStack: number[];

  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val: number): void {
    this.stack.push(val);
    const currentMin = this.minStack.length === 0 
      ? val 
      : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(currentMin);
  }

  pop(): void {
    this.stack.pop();
    this.minStack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}
```

## Time Complexity

`O(1)` — for `push`, `pop`, `top`, and `getMin`.

## Space Complexity

`O(N)` — for auxiliary `minStack`.

## Common Mistakes

- Searching linearly `Math.min(...stack)` inside `getMin()`, taking $O(N)$ time instead of required $O(1)$.

## Follow-Up Questions

1. How can you optimize space so that `minStack` only stores values when a NEW minimum is encountered? (Push value + frequency count tuple).

## Similar Questions

- Max Stack
- Implement Queue using Stacks
