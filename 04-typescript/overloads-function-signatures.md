# T428 · Function Overloads & Signature Matching

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Microsoft  
**Category:** TypeScript  
**Concepts:** function-overloads, typescript, signatures  

## Question

How do **Function Overloads** define multiple caller-facing parameter/return signatures backed by a single unified implementation function?

```typescript
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
```
