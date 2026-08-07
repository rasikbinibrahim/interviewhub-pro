# T3213 · Tree Shaking & Dead Code Elimination (`sideEffects: false`)

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Vercel  
**Category:** Performance  
**Concepts:** performance, tree-shaking, dead-code-elimination, es-modules, webpack  

## Question

How do static ES6 Modules (`import/export`) enable bundler **Tree Shaking**, and why is `"sideEffects": false` in `package.json` essential for dead-code removal?

## Expected Answer

- **Static Imports**: ES6 imports are statically analyzable at compile time. CommonJS `require()` is dynamic, breaking tree shaking.
- **`sideEffects: false`**: Tells bundlers like Webpack/Vite that unused exports contain no side effects and can be safely purged from final bundles.
