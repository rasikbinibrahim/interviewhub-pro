# Destructuring

> Technical question — follows [TECHNICAL_QUESTION_TEMPLATE.md](../TECHNICAL_QUESTION_TEMPLATE.md)'s
> 13-field format.

**Question:** What is destructuring assignment in JavaScript, and what
are the non-obvious features (defaults, renaming, nested patterns, rest)
that go beyond the basic "unpack a value" case?

**Difficulty:** Easy
**Experience Level:** Entry-Mid (0-3 YOE) — at Senior level this extends
into how destructuring interacts with function-parameter design and API
ergonomics; see Related Topics.
**Companies:** Google, Amazon, Microsoft, Meta, Flipkart, Swiggy, Zoho,
Infosys
**Interview Frequency:** ★★★★☆

## Expected Answer

Destructuring is syntax for unpacking values from arrays or properties
from objects directly into named variables, instead of accessing them
one at a time via index or dot notation. Array destructuring
(`const [a, b] = arr`) matches by *position*; object destructuring
(`const { x, y } = obj`) matches by *property name*. Beyond the basic
case, destructuring supports default values for missing properties,
renaming variables, arbitrarily nested patterns, and collecting
"everything else" into a new object/array via the rest pattern.

## Detailed Explanation

**Array destructuring** matches by position, so any position can be
skipped by leaving a gap:

```js
const [first, , third] = ['a', 'b', 'c'];
// first = 'a', third = 'c' — the second element is skipped entirely
```

**Object destructuring** matches by property name, and the variable name
can differ from the property name via a rename:

```js
const { name: userName, age = 18 } = { name: 'Rasik' };
// userName = 'Rasik' (renamed from `name`)
// age = 18 (default, since `age` wasn't present on the source object)
```

Defaults only apply when the source value is `undefined` — not `null`,
not `0`, not `''`. This is a frequent source of bugs: `const { count = 5
} = { count: 0 }` gives `count = 0`, not `5`, because `0` is a present
value, not `undefined`.

**Nested patterns** destructure arbitrarily deep, mirroring the shape of
the source:

```js
const {
  user: { profile: { email } },
} = response;
// pulls response.user.profile.email directly into `email`
```

If any intermediate level (`user` or `profile` here) is `undefined`,
this throws a `TypeError` — nested destructuring does not implicitly
guard against missing intermediate objects the way optional chaining
does.

**Rest in destructuring** (not to be confused with the spread operator,
its syntactic mirror image) collects whatever wasn't explicitly
destructured:

```js
const { id, ...rest } = { id: 1, name: 'A', role: 'admin' };
// id = 1, rest = { name: 'A', role: 'admin' }
```

Destructuring also works directly in function parameters, which is
extremely common for options objects:

```js
function createUser({ name, role = 'member' }) {
  // equivalent to reading name/role off the single argument object
}
```

## Production Example

Destructuring is the standard way React components accept props, and how
async code commonly unpacks structured API responses:

```jsx
// Function-parameter destructuring with a default — extremely common
// for React component props.
function UserCard({ name, avatarUrl, role = 'Member' }) {
  return (
    <div>
      <img src={avatarUrl} alt={name} />
      <p>{name} — {role}</p>
    </div>
  );
}

// Nested + renamed destructuring against a real API response shape.
async function loadCurrentUser() {
  const {
    data: { user: { id, email, profile: { displayName } } },
  } = await fetchCurrentUser();

  return { id, email, displayName };
}
```

## Best Practices

- Destructure function parameters for options-object APIs — it
  self-documents which properties a function actually uses, and lets
  callers pass an object without worrying about argument order.
- Provide defaults directly in the destructuring pattern
  (`{ role = 'member' }`) rather than a separate `role = role ||
  'member'` line afterward — it's more concise and colocated with the
  declaration.
- Prefer optional chaining (`response?.user?.profile?.email`) over deep
  nested destructuring when any intermediate level might legitimately be
  missing — nested destructuring throws on a missing intermediate,
  optional chaining short-circuits to `undefined`.

## Trade-offs

Destructuring trades a small amount of up-front readability cost (a
reader has to parse the pattern to know what's being extracted) for
significantly less repetitive access code and self-documenting function
signatures. The cost shows up mainly with deeply nested patterns, which
can become harder to scan than the equivalent sequence of `.` accesses,
especially when combined with renaming and defaults on the same line —
a good rule of thumb is to keep destructuring patterns to one or two
levels deep before falling back to intermediate variables for
readability.

## Common Mistakes

- Assuming defaults apply to any "falsy" value — they only apply to
  `undefined` specifically; `{ count = 5 } = { count: 0 }` still gives
  `count = 0`.
- Destructuring a nested path without checking that the intermediate
  object exists (`const { a: { b } } = obj` throws if `obj.a` is
  `undefined`) — this is a common source of runtime crashes on
  API responses with optional nested fields.
- Confusing destructuring rest (`const { id, ...rest } = obj`) with the
  spread operator (`{ ...obj, id: 2 }`) — they use identical `...`
  syntax but do opposite things (collecting vs. expanding), and mixing
  them up in explanations is a common interview slip.
- Renaming and forgetting the original property name is gone — after
  `const { name: userName } = obj`, there is no `name` variable in
  scope, only `userName`.

## Follow-up Questions

1. Why does `const { count = 5 } = { count: 0 }` result in `count = 0`
   instead of `5` — what exactly triggers a destructuring default?
2. What's the difference between the `...rest` you see in destructuring
   and the `...spread` you see in array/object literals, given they use
   the same syntax?
3. How would you safely destructure a deeply nested API response where
   some intermediate fields might be missing, without it throwing?
4. Can you destructure with computed property keys (`const { [key]: value
   } = obj`)? What's that useful for?

## Related Topics

- [var-let-const.md](var-let-const.md) — destructuring is most often
  paired with `const`/`let` declarations
- Spread Operator (planned — see
  [BACKLOG-JS.md](../BACKLOG-JS.md))
- [closures.md](closures.md) — function-parameter destructuring
  interacts with default-parameter scoping the same way closures do

---
[← Back to 02-javascript-fundamentals](README.md)
