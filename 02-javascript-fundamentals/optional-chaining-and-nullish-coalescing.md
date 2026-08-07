# T202 · Optional Chaining (`?.`) and Nullish Coalescing (`??`) Operators

**Difficulty:** Easy  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Airbnb  
**Interview Frequency:** ★★★★★  
**Category:** JavaScript  
**Concepts:** optional-chaining, nullish-coalescing, short-circuiting, operators  

## Question

How do the Optional Chaining operator (`?.`) and Nullish Coalescing operator (`??`) work under the hood, how does `??` differ structurally from the logical OR operator (`||`), and how do they prevent runtime `TypeError: Cannot read properties of undefined` exceptions?

## Expected Answer

1. **Optional Chaining (`?.`)**: Short-circuits property access, method calls, or array indexing if the left-hand operand evaluates to `null` or `undefined`, returning `undefined` immediately without throwing a `TypeError`.
2. **Nullish Coalescing (`??`)**: A logical operator that returns its right-hand operand ONLY when its left-hand operand is **nullish** (`null` or `undefined`).
3. **Difference from Logical OR (`||`)**:
   - `||` returns right-hand operand for **ANY falsy value** (`0`, `""`, `false`, `NaN`, `null`, `undefined`).
   - `??` returns right-hand operand **ONLY for nullish values** (`null`, `undefined`). This prevents accidental overwriting of valid falsy values like `0` or `""`.

## Deep Explanation

### 1. Short-Circuiting Mechanics
```javascript
// Optional Chaining Transpilation Equivalent
const zip = user?.address?.zip;

// Equivalent ES5 logic:
var _user$address;
var zip = (user === null || user === void 0) ? void 0 :
          ((_user$address = user.address) === null || _user$address === void 0) ? void 0 :
          _user$address.zip;
```

### 2. Operator Truth Table Comparison

| Left-Hand Value | `value || 'default'` | `value ?? 'default'` |
|---|---|---|
| `null` | `'default'` | `'default'` |
| `undefined` | `'default'` | `'default'` |
| `0` | `'default'` (Bug risk!) | `0` (Preserved) |
| `""` (empty string) | `'default'` (Bug risk!) | `""` (Preserved) |
| `false` | `'default'` (Bug risk!) | `false` (Preserved) |

## Production Example

```javascript
// Config Normalization in Production API Response
function processUserSettings(apiResponse) {
  // Safe Deep Access with Optional Chaining
  const avatarUrl = apiResponse?.data?.user?.profile?.avatarUrl;
  const notifyCount = apiResponse?.data?.user?.unreadCount ?? 0;
  const isDarkMode = apiResponse?.data?.user?.preferences?.darkMode ?? false;

  // Optional Function Invocation
  apiResponse?.callbacks?.onSuccess?.(apiResponse.data);

  // Optional Array Indexing
  const firstRole = apiResponse?.data?.user?.roles?.[0] ?? 'guest';

  return {
    avatarUrl: avatarUrl ?? '/default-avatar.png',
    notifyCount, // Correctly preserves 0 unread messages
    isDarkMode,  // Correctly preserves false preference
    firstRole,
  };
}

console.log(processUserSettings({ data: { user: { unreadCount: 0, preferences: { darkMode: false } } } }));
// Output: { avatarUrl: '/default-avatar.png', notifyCount: 0, isDarkMode: false, firstRole: 'guest' }
```

## Best Practices

- Use `??` instead of `||` when assigning fallback values for numeric quantities, boolean flags, or string inputs where `0`, `false`, or `""` are valid values.
- Combine `?.` with `??` (`user?.age ?? 18`) for clean defensive programming against incomplete API responses.

## Common Mistakes

- Over-using optional chaining everywhere (`a?.b?.c?.d`), masking upstream data contract bugs or broken state initialization.
- Combining `??` directly with `&&` or `||` without explicit parentheses (`a && b ?? c` is a `SyntaxError`).

## Follow-up Questions

1. What happens when optional chaining is used with delete operator (`delete user?.address`)?
2. How does optional chaining interact with optional method calls `obj?.method?.()`?

## Related Topics

- Truthy vs Falsy Values & Coercion Rules
- Destructuring & Default Values
