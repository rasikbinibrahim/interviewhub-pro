# T2302 · React Native Architecture: Legacy Bridge vs New Architecture (JSI, TurboModules, Fabric Renderer)

**Difficulty:** Hard  
**Companies Asked:** Meta, Uber, Amazon, Shopify, Coinbase  
**Interview Frequency:** ★★★★★  
**Category:** React Native  
**Concepts:** react-native, jsi, turbomodules, fabric, bridge, new-architecture  

## Question

How does the React Native **New Architecture** replace the asynchronous, JSON-serialized C++ **Legacy Bridge** using JavaScript Interface (JSI), TurboModules, and the Fabric Renderer, and why does JSI enable zero-copy synchronous C++ to JS communication?

## Expected Answer

1. **Legacy Bridge Bottleneck**:
   - The old architecture communicated between the JS thread and Native iOS/Android threads asynchronously via JSON serialization over a single C++ Bridge.
   - Serialization overhead caused frame drops, slow scroll events, and impossible synchronous native calls.
2. **New Architecture Core Components**:
   - **JSI (JavaScript Interface)**: Replaces the C++ Bridge. Gives JavaScript direct access to C++ Host Objects via shared memory pointers. Calls native C++ methods **synchronously** without JSON stringification overhead!
   - **TurboModules**: Lazy-loads native modules on demand (instead of initializing all native modules on app launch), dramatically reducing app startup TTI (Time to Interactive).
   - **Fabric Renderer**: New UI rendering engine that operates directly over C++ C++ shadow trees, enabling synchronous layout calculations and multithreaded rendering.

## Deep Explanation

### Legacy Bridge vs New Architecture (JSI)

```
Legacy Bridge Architecture (Asynchronous Serialization Bottleneck):
JS Thread ──(JSON Stringify)──► [ C++ Asynchronous Bridge ] ──(JSON Parse)──► Native Thread

New Architecture (JSI Shared Memory Pointers):
JS Thread ─────────────────────► [ JSI (JavaScript Interface) ] ──────────────────► Native Thread
                  (Direct Synchronous C++ Method Calls!)
```

## Production Example

```cpp
// Native C++ JSI Module Implementation Example (Zero-Copy Shared Memory)
#include <jsi/jsi.h>

using namespace facebook;

class NativeCalculatorJSI : public jsi::HostObject {
public:
  jsi::Value get(jsi::Runtime& runtime, const jsi::PropNameID& name) override {
    auto methodName = name.utf8(runtime);

    if (methodName == "addSync") {
      // Synchronous Native Execution exposed to JavaScript runtime!
      return jsi::Function::createFromHostFunction(
        runtime,
        name,
        2, // Number of arguments
        [](jsi::Runtime& rt, const jsi::Value& thisVal, const jsi::Value* args, size_t count) -> jsi::Value {
          double a = args[0].asNumber();
          double b = args[1].asNumber();
          return jsi::Value(a + b); // Direct Return! No JSON Serialization!
        }
      );
    }
    return jsi::Value::undefined();
  }
};
```

```javascript
// React Native JS Usage (Synchronous Native Calls!)
// In New Architecture, native methods return values INSTANTLY like native JS functions!
const sum = global.NativeCalculatorJSI.addSync(10, 20);
console.log('Synchronous C++ Sum Result:', sum); // Output: 30 (0ms latency!)
```

## Best Practices

- Enable `"newArchEnabled": true` in `app.json` (Expo SDK 51+ / React Native 0.74+) to benefit from Fabric rendering and TurboModules.
- Use JSI host objects when building high-frequency native modules like Bluetooth BLE byte streaming, image processing, or audio synthesis.

## Common Mistakes

- Assuming JSI calls should always replace async promises — heavy computational tasks should still run off the main JS thread using background C++ threads to avoid blocking UI rendering.

## Follow-up Questions

1. How does the CodeGen tool automatically generate C++ C++ bindings from TypeScript / Flow interface definitions in the New Architecture?

## Related Topics

- React Native Performance & FlatList Optimization
- Bridge Architecture & Native Modules
