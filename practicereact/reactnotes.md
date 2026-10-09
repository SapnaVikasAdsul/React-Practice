# What is React and How Does the Virtual DOM Work?

## What is React?

React is a **JavaScript library** for building user interfaces, developed and maintained by Meta (Facebook). It is not a full framework — it focuses solely on the **view layer** (UI rendering).

### Key Characteristics

- **Component-based**: UI is broken into reusable, self-contained components (functions or classes)
- **Declarative**: You describe _what_ the UI should look like for a given state. React handles _how_ to update the DOM to match.
- **Unidirectional data flow**: Data flows down from parent to child via props, making debugging predictable.
- **Cross-platform**: Can render on native mobile (React Native), server (Next.js), or any display surface.

### Why React?

| Problem                                | React Solution                                              |
| -------------------------------------- | ----------------------------------------------------------- |
| Manual DOM manipulation                | Declarative components — describe UI, React handles updates |
| State drift across UI                  | Single source of truth (state) drives rendering             |
| Code complexity in large apps          | Components encapsulate logic + UI together                  |
| Slow performance with frequent updates | Virtual DOM batching minimizes real DOM writes              |

---

## What is the Virtual DOM?

The Virtual DOM (VDOM) is a **lightweight JavaScript representation** of the actual browser DOM. It is React's mechanism for efficiently updating the UI.

### The Problem: Real DOM is Slow

The browser DOM is expensive to manipulate:

- Every layout/paint/reflow operation triggers re-calculation
- Direct DOM mutations cause full page reflows
- Frequent updates = poor performance

### How the Virtual DOM Works

#### Step 1: Render to Virtual DOM

When state changes, React creates a **new Virtual DOM tree** — a JS object describing what the UI _should_ look like:

```javascript
// Real DOM (expensive):
document.getElementById("app").innerHTML = "<h1>Hello</h1><p>World</p>";

// Virtual DOM (cheap JS objects):
const vdom = {
  type: "div",
  props: {
    children: [
      { type: "h1", props: { children: ["Hello"] } },
      { type: "p", props: { children: ["World"] } },
    ],
  },
};
```

#### Step 2: Diffing (Reconciliation)

React compares the new VDOM tree with the previous VDOM tree using a **diffing algorithm**:

```
Previous VDOM          New VDOM           Changes Detected
─────────────          ──────────         ───────────────
<div>                  <div>              • text changed: "Hi" → "Hello"
  <h1>Hi</h1>    →      <h1>Hello</h1>     • nothing else changed
  <p>Hello</p>         <p>Hello</p>        • <p> unchanged → skip
</div>                 </div>
```

Key diffing rules:

- **Tree comparison algorithm**: O(n) instead of O(n³) by assuming cross-sibling element moves are rare
- **Type-based optimization**: If component type changes, tear down entire subtree
- **Key prop**: Helps React identify which list items changed, added, or removed

#### Step 3: Batch Updates to Real DOM

React applies **only the minimal set of changes** identified by diffing to the real DOM — all at once in a batch:

```javascript
// Only this line executes against the real DOM:
document.querySelector("h1").textContent = "Hello";
// <p>Hello</p> was NOT touched — no reflow triggered for it
```

### Complete Lifecycle

```
State Change
    │
    ▼
┌─────────────────────┐
│  Component renders   │  ← New VDOM tree created (JS objects)
│  → Virtual DOM       │     Cost: cheap memory allocation
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Reconciliation      │  ← Diff new VDOM vs old VDOM
│  (Diffing)           │     Cost: O(n) tree walk
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Commit Phase        │  ← Minimal real DOM updates applied
│  (Batched)           │     Cost: few reflows only where needed
└──────────┬──────────┘
           │
           ▼
         UI Updated
```

### Why This Is Fast

| Operation             | Real DOM              | Virtual DOM                |
| --------------------- | --------------------- | -------------------------- |
| Create representation | N/A (is the DOM)      | ~0.001ms (JS object)       |
| Compare trees         | Not possible          | ~0.01ms (diff algorithm)   |
| Apply changes         | Full reflow each time | Batched, minimal mutations |

The VDOM trades a small amount of CPU (diffing) for massive savings in expensive GPU/layout operations. For most apps, this trade-off is heavily favorable.

### Important Notes

- **VDOM is not always faster**: For trivial apps with rare updates, direct DOM manipulation can be faster (no diffing overhead)
- **React 18+ uses Concurrent Rendering**: The diffing phase can be paused/resumed, enabling prioritization of urgent updates
- **React Fiber**: The modern reconciliation algorithm (since React 16) that enables incremental rendering and better UX during heavy updates

---

---

# useState Hook in React

## What is useState?

`useState` is a React Hook that lets functional components **manage local state**. Before hooks, only class components could hold state via `this.state`. Hooks let function components be stateful.

## Syntax

```javascript
const [state, setState] = useState(initialValue);
```

Returns:

- **`state`** — current value
- **`setState`** — function to update value and trigger re-render

## How It Works

```
Initial Render              Subsequent Renders
───────────────             ────────────────
useState(0)                 useState(0)
    │                           │
    ▼                           ▼
state = 0                   state = current value
setState(5)                   │
    │                           ▼
    ▼                     React schedules re-render
Component re-renders          │
    │                           │
    └──────► state = 5 ◄───────┘
```

Key rules:

1. **Calling `setState` triggers a re-render** — React re-executes the component, gets new state values, updates VDOM, patches real DOM
2. **State is preserved across renders** — React stores it internally (per component instance)
3. **Updates may be batched** — React groups multiple setState calls into one re-render for performance
4. **Setter accepts value OR updater function** — use function when new state depends on previous: `setCount(prev => prev + 1)`

## State Updates Are Asynchronous & Merged

```javascript
// ❌ NOT guaranteed to be immediate:
console.log(count); // still old value!

// ✅ Updates are batched and applied after render completes:
setState(newValue);
// Re-render happens → component runs again → count reflects newValue
```

For objects/arrays, React does **shallow merge** — you must spread existing state:

```javascript
// Object — must spread to preserve other fields:
setUser((prev) => ({ ...prev, name: "New Name" }));

// Array — must spread or use array methods that return new arrays:
setItems((prev) => [...prev, newItem]);
setItems((prev) => prev.filter((item) => item.active));
```

## Common Patterns

### Counter (primitive)

```javascriptcreate a file
const [count, setCount] = useState(0);
<button onClick={() => setCount(count + 1)}>+1</button>
```

### Toggle (boolean)

```javascript
const [isOpen, setIsOpen] = useState(false);
<button onClick={() => setIsOpen((prev) => !prev)}>Toggle</button>;
```

### Form input (string)

```javascript
const [value, setValue] = useState("");
<input value={value} onChange={(e) => setValue(e.target.value)} />;
```

### List (array)

```javascript
const [items, setItems] = useState([]);
setItems((prev) => [...prev, newItem]); // add
setItems((prev) => prev.filter((_, i) => i !== index)); // remove
```

### Object state

```javascript
const [user, setUser] = useState({ name: "", email: "" });
setUser((prev) => ({ ...prev, name: e.target.value })); // spread + update field
```

## Rules of Hooks

1. **Only call hooks at the top level** — not inside loops, conditions, or nested functions
2. **Only call hooks from React functions** — functional components or custom hooks
3. **Hooks run every render** — order must be consistent across renders (React uses call order to track state)

```javascript
// ❌ WRONG — conditional hook call:
if (condition) {
  const [x, setX] = useState(0);
}

// ✅ CORRECT — always call at top level:
const [x, setX] = useState(0);
if (condition) {
  // use x here
}
```

## When to Use useState

| Scenario                                     | Use useState?                              |
| -------------------------------------------- | ------------------------------------------ |
| Simple primitive (number, string, boolean)   | ✅ Yes                                     |
| Form input values                            | ✅ Yes                                     |
| Toggle / modal open-close                    | ✅ Yes                                     |
| Small list of items                          | ✅ Yes                                     |
| Complex state logic with multiple sub-values | ❌ Use `useReducer` instead                |
| State depends on previous state deeply       | ❌ Consider `useReducer`                   |
| Cross-component shared state                 | ❌ Use Context or state management library |

## Summary

- **`useState(initial)`** → `[currentValue, setterFunction]`
- Calling setter triggers re-render with new value
- Setter can take value directly OR updater function `(prev => ...)`
- Objects/arrays need spread/new reference for proper updates
- Call at top level only, never inside conditions/loops

## useEffect hook

 ┌──────────────┬──────────────────────────────────────────────────────────────────────┐  
 │ Pattern      │ What It Does │  
 ├──────────────┼──────────────────────────────────────────────────────────────────────┤  
 │ Mount once   │ useEffect(fn, []) — runs once on mount │  
 ├──────────────┼──────────────────────────────────────────────────────────────────────┤  
 │ Every render │ useEffect(fn) — runs after every render │  
 ├──────────────┼──────────────────────────────────────────────────────────────────────┤  
 │ Value change │ useEffect(fn, [name]) — runs when name changes │  
 ├──────────────┼──────────────────────────────────────────────────────────────────────┤  
 │ Cleanup      │ Returns function — removes listeners, clears timers                  │  
 ├──────────────┼──────────────────────────────────────────────────────────────────────┤  
 │ API fetch    │ Fetches users from JSONPlaceholder with AbortController cancellation │  
 ├──────────────┼──────────────────────────────────────────────────────────────────────┤  
 │ Interval     │ Timer that increments counter every second, cleaned up on unmount │  
 └──────────────┴──────────────────────────────────────────────────────────────────┘

---

# useRef Hook in React

## What is useRef?

`useRef` returns a **mutable ref object** with a `.current` property that persists across renders. Changing `.current` does **NOT** trigger a re-render.

Two main use cases:

1. **Access DOM nodes directly** — focus, measure, scroll, play video
2. **Persist mutable values across renders** without causing re-renders

## Syntax

```javascript
const ref = useRef(initialValue);
// ref.current = initialValue
// Changing ref.current → NO re-render
```

## How It Works

```
Render 1              Render 2              Render 3
─────────────         ─────────────         ─────────────
const ref =           const ref =           const ref =
  useRef(0)             useRef(0)             useRef(0)
    │                     │                     │
    ▼                     ▼                     ▼
ref.current = 0       ref.current = 1       ref.current = 2
                      (no re-render)        (no re-render)
```

Key difference from useState:

- `useState(0)` → returns `[0, setter]`. Calling setter → re-render.
- `useRef(0)` → returns `{ current: 0 }`. Changing `.current` → no re-render.

## Use Cases

### 1. Access DOM Elements

```javascript
const inputRef = useRef(null);

useEffect(() => {
  inputRef.current?.focus(); // access real DOM node
}, []);

return <input ref={inputRef} />;
```

### 2. Persist Value Without Re-render

```javascript
const renderCountRef = useRef(0);
renderCountRef.current += 1; // tracks renders but doesn't trigger UI update
```

### 3. Store Previous Value

```javascript
const prevCountRef = useRef(null);

useEffect(() => {
  prevCountRef.current = count; // sync after render
}, [count]);

// Now compare: count vs prevCountRef.current
```

### 4. Store Timer/Interval ID

```javascript
const intervalRef = useRef(null);

const startTimer = () => {
  intervalRef.current = setInterval(() => {
    // do something every second
  }, 1000);
};

const stopTimer = () => {
  clearInterval(intervalRef.current); // clear from event handler, not just useEffect
};
```

## useRef vs useState Comparison

| Feature                    | useState                         | useRef                                           |
| -------------------------- | -------------------------------- | ------------------------------------------------ |
| Changes trigger re-render? | Yes                              | No                                               |
| Purpose                    | Track data affecting UI          | Mutate values / access DOM                       |
| Syntax                     | `[val, setVal] = useState(init)` | `const ref = useRef(init)`                       |
| Access value               | Direct (`val`)                   | Via `.current` (`ref.current`)                   |
| Example uses               | Input values, counters, toggles  | DOM refs, timers, previous values, external APIs |

## Rules of useRef

1. **Don't use refs for derived state** — if UI needs to reflect a value, use state or useMemo
2. **Always null-check DOM refs before first use** — `ref.current` is null until mount
3. **Refs survive re-renders** — same ref object returned every render, `.current` persists
4. **Only call at top level** — same hook rules as all hooks

## Common Pitfalls

### Pitfall 1 — Expecting ref change to trigger re-render

```javascript
// ❌ Won't update UI!
const countRef = useRef(0);
countRef.current += 1;
return <p>{countRef.current}</p>; // stale between renders

// ✅ Use state for UI-bound values
const [count, setCount] = useState(0);
```

### Pitfall 2 — Forgetting null check on DOM refs

```javascript
// ❌ TypeError on first render
inputRef.current.focus();

// ✅ Safe with optional chaining
inputRef.current?.focus();
```

### Pitfall 3 — Using ref for derived/computed state

```javascript
// ❌ Ref holds stale value between renders
function MyComponent({ items }) {
  const lenRef = useRef(items.length); // stale!
  return <p>{lenRef.current}</p>; // won't update when items change
}

// ✅ Use direct value or useMemo
const len = items.length; // always current
```

## Summary

- **`useRef(initial)`** → `{ current: initial }` — mutable object surviving all renders
- Changing `.current` does NOT trigger re-render
- Primary uses: DOM access, persisting values, storing timers/intervals, tracking previous values
- Rule of thumb: If React needs to know about it → useState. If you just need to store/mutate outside React's cycle → useRef

---

# useContext Hook in React

## What is useContext?

`useContext` is a React Hook that lets components **read values from a Context** without passing props through every level of the component tree. It solves **prop drilling**.

## What is Prop Drilling?

Prop drilling = passing data through intermediate components that **don't need it**, just to reach a deeply nested child.

```
<App theme="dark">\           ← has theme
  <Header theme={theme}>      ← passes it down (doesn't use it)
    <Main theme={theme}>      ← passes it down (doesn't use it)
      <Content theme={theme}> ← passes it down (doesn't use it)
        <Footer theme={theme}>← finally receives it ✅
        </Footer>
      </Content>
    </Main>
  </Header>
</App>
```

Components `Header`, `Main`, and `Content` are just **conduits** — they don't use `theme`, they just forward it.

## How Context Solves It

```
<ThemeProvider value="dark">
  <Header />              ← useContext(ThemeContext) → gets "dark" ✅
  <Main />
    <Content />
      <Footer />          ← useContext(ThemeContext) → gets "dark" ✅
      </Footer>
    </Content>
  </Main>
</Header>
```

No intermediate props needed. Any descendant can consume directly.

## The 3-Step Pattern

### Step 1: Create Context

```javascript
// Create at module level (NOT inside a component!)
const ThemeContext = createContext("light"); // 'light' = default value
```

### Step 2: Provide Value via Provider

```javascript
function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme((p) => (p === "light" ? "dark" : "light")) }}>
      <Header />
      <Content />
      <Footer />
    </ThemeContext.Provider>
  );
}
```

### Step 3: Consume with useContext Hook

```javascript
function Footer() {
  const { theme } = useContext(ThemeContext);
  return <footer style={{ background: theme }}>...</footer>;
}
```

## Complete Working Example

```javascript
import { createContext, useContext, useState } from "react";

// 1. Create contexts (module level)
const ThemeContext = createContext("light");
const UserContext = createContext(null);

// 2. Provider component
function AppProviders({ children }) {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme((p) => (p === "light" ? "dark" : "light")) }}>
      <UserContext.Provider value={{ user, login: setUser, logout: () => setUser(null) }}>{children}</UserContext.Provider>
    </ThemeContext.Provider>
  );
}

// 3. Consume in any nested component — no prop drilling!
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header style={{ background: theme }}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
}

function UserProfile() {
  const { user, logout } = useContext(UserContext);
  return user ? (
    <p>
      Welcome {user.name}! <button onClick={logout}>Logout</button>
    </p>
  ) : (
    <p>Please log in</p>
  );
}

function Content() {
  const { theme } = useContext(ThemeContext); // deep access, no props needed!
  return <main style={{ background: theme === "light" ? "#fff" : "#222", color: theme === "light" ? "#333" : "#fff" }}>Content</main>;
}

// Root app
function App() {
  return (
    <AppProviders>
      <Header />
      <UserProfile />
      <Content />
    </AppProviders>
  );
}
```

## Nested Providers (Override Behavior)

Inner providers override outer providers for the same context:

```javascript
const ColorContext = createContext("blue");

function App() {
  return (
    <ColorContext.Provider value="red">
      <div style={{ color: "red" }}> {/* red */}</div>
      <SpecialSection>
        <ColorContext.Provider value="green">
          <div style={{ color: "green" }}> {/* green — overrides parent */}</div>
        </ColorContext.Provider>
      </SpecialSection>
    </ColorContext.Provider>
  );
}
```

## useContext vs useState vs Props Comparison

| Feature                       | Props                 | useContext                           | useState              |
| ----------------------------- | --------------------- | ------------------------------------ | --------------------- |
| Data flow                     | Parent → Child        | Global (any descendant)              | Component-local       |
| Prop drilling needed?         | Yes                   | No                                   | N/A                   |
| Triggers re-render on change? | Yes (if ref changes)  | Yes (if value ref changes)           | Yes                   |
| Best for                      | 1-2 levels of nesting | Cross-cutting concerns (theme, auth) | Local component state |
| Testing                       | Easy (pass props)     | Easy (wrap in Provider)              | Easy                  |

## When to Use Context

| Scenario                                   | Use Context?                                    |
| ------------------------------------------ | ----------------------------------------------- |
| Theme / language / auth state              | ✅ Yes — needed by many components deep in tree |
| Form data passed 2-3 levels                | ❌ No — just pass props                         |
| Frequently changing data (scroll position) | ❌ No — causes unnecessary re-renders           |
| Global app state (simple app)              | ✅ Yes                                          |l
| Global app state (complex app)             | ⚠️ Consider Zustand/Redux Toolkit instead       |
| Only one or two components need it         | ❌ No — pass props or lift state up             |

## Rules of useContext

1. **Only call inside React components** — not in functions, loops, or conditions
2. **Create context at module level** — not inside components (creates new context each render)
3. **Value reference stability matters** — if you pass a new object `{}` every render, all consumers re-render. Stabilize with `useMemo` or split contexts.
4. **Can be called multiple times** — each consumer gets its own subscription to the context value

## Common Pitfalls

### Pitfall 1 — Creating context inside component

```javascript
// ❌ WRONG — new context each render breaks all consumers!
function MyComponent() {
  const ctx = createContext(); // recreated every render!
  return <ctx.Provider>...</ctx.Provider>;
}

// ✅ CORRECT — create at module level
const MyContext = createContext(); // created once, stable identity

function MyComponent() {
  return <MyContext.Provider>...</MyContext.Provider>;
}
```

### Pitfall 2 — Whole object as value causes all consumers to re-render

```javascript
// ❌ Changing ANY field re-renders ALL consumers
const [state, setState] = useState({ theme: 'light', user: null });
<MyContext.Provider value={state}> // new object each render → all consumers update

// ✅ Split into separate contexts by concern
<ThemeContext.Provider value={theme}>
<UserContext.Provider value={user}>

// ✅ Or stabilize the object with useMemo
const value = useMemo(() => ({ theme, user }), [theme, user]);
<MyContext.Provider value={value}>
```

### Pitfall 3 — Using context for everything

```javascript
// ❌ Don't use context for data that only needs to go 1-2 levels deep
// ✅ Just pass props — simpler and more performant

// ✅ DO use context for:
// - Themes, dark/light mode
// - Authentication / user info
// - Internationalization (i18n)
// - Feature flags
// - API client / base URL config
```

### Pitfall 4 — Forgetting default value causes issues during SSR/hydration mismatch

```javascript
// ❌ No default — undefined during SSR before provider wraps
const ThemeContext = createContext();

// ✅ Provide sensible default
const ThemeContext = createContext("light");
```

## Summary

- **Prop drilling** = passing props through unnecessary intermediate components
- **Context** = global state accessible by any descendant without prop drilling
- **3 steps:** `createContext()` → `<Provider value={...}>` → `useContext(MyContext)`
- Create context at **module level**, never inside components
- Split contexts by concern to avoid cascading re-renders
- Stabilize context values with `useMemo` if they're objects/arrays

---

# useReducer Hook in React

## What is useReducer?

`useReducer` is an alternative to `useState` for managing state that involves **complex logic**, **multiple sub-values**, or **nested updates**. It follows the Redux pattern: a pure reducer function receives `(state, action)` and returns new state.

## Syntax

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

Returns:

- **`state`** — current state object
- **`dispatch`** — function to send actions: `dispatch({ type: 'ACTION', payload: value })`

## The Reducer Pattern

```javascript
// Pure function — same input always produces same output. No side effects.
function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "TOGGLE_TODO":
      return { ...state, todos: state.todos.map((t) => (t.id === action.payload ? { ...t, completed: !t.completed } : t)) };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    default:
      return state; // unknown action — return unchanged
  }
}

// Usage
const [state, dispatch] = useReducer(reducer, { todos: [], filter: "all" });
dispatch({ type: "ADD_TODO", payload: "Buy milk" });
```

## How It Works

```
Initial State              
 Dispatched              New State
───────────────            ───────────────                ───────────
{ todos: [], filter:      dispatch({                    { todos: [
  'all' }                   type: 'ADD_TODO',               { id: 1,
                            payload: 'Milk' }              text: 'Milk',
                                                           completed: false }
                                                          ], filter: 'all' }
```

Key rules:

1. **Reducer is pure** — no API calls, no side effects, just compute new state from old state + action
2. **Always return new state** — never mutate `state` directly; spread/create new objects
3. **Default case returns current state** — safety net for unknown actions
4. **dispatch is stable** — React guarantees the same `dispatch` function across re-renders

## useState vs useReducer Comparison

| Feature        | useState                        | useReducer                                 |
| -------------- | ------------------------------- | ------------------------------------------ |
| Best for       | Simple, independent values      | Complex state logic, related values        |
| Update syntax  | `setState(newValue)`            | `dispatch({ type, payload })`              |
| Logic location | Scattered across event handlers | Centralized in reducer function            |
| Predictability | Depends on handler code         | Deterministic — same input → same output   |
| Testing        | Test handlers + state together  | Test reducer independently (pure function) |
| Bundles with   | N/A                             | `useContext` for global state              |
| Boilerplate    | Less                            | More (reducer + action types)              |

## When to Prefer useReducer Over useState

| Scenario                                 | Prefer     | Why                                           |
| ---------------------------------------- | ---------- | --------------------------------------------- |
| Counter, toggle, form input              | useState   | Simple, single value                          |
| Object with multiple fields              | useReducer | All fields updated together via actions       |
| Next state depends on previous complexly | useReducer | Logic centralized in reducer                  |
| Multiple sub-values change together      | useReducer | One action updates multiple fields atomically |
| Nested/deeply nested state objects       | useReducer | Cleaner than nested spread operators          |
| State logic needs independent testing    | useReducer | Pure reducer = easy unit tests                |
| Global state with Context                | useReducer | One dispatch from anywhere in tree            |
| Action-based updates (user clicked X)    | useReducer | Dispatch describes WHAT happened              |

## Code Comparison — Same Logic, Both Approaches

### ❌ With useState (scattered logic)

```javascript
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTodo = (text) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  // Each handler has its own logic — hard to trace all state changes
}
```

### ✅ With useReducer (centralized logic)

```javascript
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }] };
    case "TOGGLE_TODO":
      return { ...state, todos: state.todos.map((t) => (t.id === action.payload ? { ...t, completed: !t.completed } : t)) };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Clean handlers — just describe WHAT happened
  const addTodo = (text) => dispatch({ type: "ADD_TODO", payload: text });
  const toggleTodo = (id) => dispatch({ type: "TOGGLE_TODO", payload: id });

  // All state logic lives in one place — easy to read and test
}
```

## Action Creators Pattern (Optional Cleanup)

Avoid typing action objects everywhere by creating helper functions:

```javascript
// Action creators — just return the action object
const addTodo = (text) => ({ type: "ADD_TODO", payload: text });
const toggleTodo = (id) => ({ type: "TOGGLE_TODO", payload: id });
const removeTodo = (id) => ({ type: "REMOVE_TODO", payload: id });

// Usage — cleaner intent
dispatch(addTodo("Buy milk"));
dispatch(toggleTodo(42));
```

## Lazy Initialization (Defer Expensive Initial State)

Pass a function as the second argument to compute initial state lazily:

```javascript
// Computed once on mount — not on every render
const [state, dispatch] = useReducer(todoReducer, () => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : { todos: [], filter: "all" };
});
```

Useful when initial state requires expensive computation or reading from localStorage.

## Rules of useReducer

1. **Reducer must be pure** — no API calls, no random values, no mutations
2. **Always return new state** — never mutate `state` directly; spread/create new objects
3. **Include default case** — returns current state for unknown actions (safety net)
4. **Only call at top level** — same hook rules as all hooks
5. **Dispatch is stable** — safe to include in dependency arrays without causing infinite loops

## Common Pitfalls

### Pitfall 1 — Using useReducer when useState would suffice

```javascript
// ❌ Unnecessary boilerplate for a simple counter
const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    default:
      return state;
  }
};
const [count, dispatch] = useReducer(counterReducer, 0);
dispatch({ type: "INCREMENT" });

// ✅ Just use useState — less code, same result
const [count, setCount] = useState(0);
setCount((prev) => prev + 1);
```

### Pitfall 2 — Mutating state inside reducer (must be pure!)

```javascript
// ❌ WRONG — mutates state directly! React won't detect the change.
case 'TOGGLE':
  state.completed = !state.completed; // mutation!
  return state;

// ✅ CORRECT — always return NEW object/state
case 'TOGGLE':
  return { ...state, completed: !state.completed };
```

### Pitfall 3 — Forgetting default case returns current state

```javascript
// ❌ Missing default — returns undefined on unknown action!
function reducer(state, action) {
  switch (action.type) {
    case "A":
      return newState;
    // no default! → returns undefined → crash
  }
}

// ✅ Always include default case
function reducer(state, action) {
  switch (action.type) {
    case "A":
      return newState;
    default:
      return state; // safety net
  }
}
```

### Pitfall 4 — Including dispatch in useEffect dependencies (infinite loop)

```javascript
// ❌ This is actually FINE — dispatch is stable, but if you wrap it unnecessarily...
useEffect(() => {
  dispatch({ type: "LOAD" });
}, [dispatch]); // works but unnecessary — dispatch never changes

// ✅ Omit dispatch from deps — it's guaranteed stable by React
useEffect(() => {
  dispatch({ type: "LOAD" });
}, []); // runs once on mount
```

## Summary

- **`useReducer(reducer, initial)`** → `[state, dispatch]`
- **Reducer** = pure function `(state, action) => newState`
- **Dispatch** sends actions describing WHAT happened (not HOW)
- Use when state is complex, has multiple sub-values, or logic is scattered across handlers
- Bundles naturally with Context for global state management
- Don't overuse — simple values still work best with useState

---

# useMemo Hook in React

## What is useMemo?

`useMemo` **memoizes the result of a function call**. It caches the computed value and only re-computes when dependencies change. Think of it as a smart cache.

## Syntax

```javascript
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);
```

- **First arg**: function that returns the computed value
- **Second arg**: dependency array — re-run when these values change
- **Returns**: the cached computed value (not `[value, setter]`)

## How It Works

```
Render 1: a=1, b=2
  → useMemo calls computeExpensive(1, 2) → returns 42 → caches it

Render 2: a=1, b=2 (same deps)
  → useMemo returns CACHED value (42) — does NOT call function ✅

Render 3: a=3, b=2 (a changed!)
  → useMemo calls computeExpensive(3, 2) → returns new value → caches it

Render 4: a=3, b=2 (same deps again)
  → useMemo returns CACHED value — skips computation ✅
```

## Basic Example

```javascript
import { useState, useMemo } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build app", completed: true },
    // ... 1000 more items
  ]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // ❌ Without useMemo — recalculates on EVERY render (slow!)
  const filteredTodos = todos.filter((todo) => filter === "all" || todo.completed === (filter === "completed")).filter((todo) => todo.text.toLowerCase().includes(searchTerm.toLowerCase()));

  // ✅ With useMemo — only recalculates when todos/filter/searchTerm changes
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => filter === "all" || todo.completed === (filter === "completed")).filter((todo) => todo.text.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [todos, filter, searchTerm]);
}
```

## When to Use useMemo

| Scenario                                                | Use useMemo? | Why                                       |
| ------------------------------------------------------- | ------------ | ----------------------------------------- |
| Expensive calculation (sorting large arrays, filtering) | ✅ Yes       | Saves CPU time                            |
| Computed values passed to child components              | ✅ Yes       | Prevents unnecessary child re-renders     |
| Object/array reference stability needed                 | ✅ Yes       | Stable reference prevents useEffect loops |
| Simple addition/subtraction                             | ❌ No        | Overhead > benefit                        |
| Every render anyway                                     | ❌ No        | Defeats the purpose                       |

## Code Examples

### ✅ Good — Expensive array operation

```javascript
// Without memo — recalculates on EVERY render (bad if list is huge)
const sortedList = allItems.sort((a, b) => a.name.localeCompare(b.name));

// With memo — only recalculates when allItems changes
const sortedList = useMemo(() => allItems.sort((a, b) => a.name.localeCompare(b.name)), [allItems]);
```

### ✅ Good — Stable reference for child component

```javascript
// Without memo — new object each render → ChildComponent re-renders every time
function Parent() {
  const config = { theme: "dark", lang: "en" }; // NEW object every render!
  return <ChildComponent config={config} />;
}

// With memo — same object reference unless theme/lang changes
function Parent() {
  const config = useMemo(() => ({ theme: "dark", lang: "en" }), []); // stable ref
  return <ChildComponent config={config} />;
}
```

### ❌ Bad — Overuse on simple operations

```javascript
// ❌ Unnecessary — simple math doesn't need memoization
const total = useMemo(() => price * quantity, [price, quantity]);

// ✅ Just do the math directly
const total = price * quantity;
```

## useMemo vs useCallback vs useState Comparison

| Feature                    | useState                           | useMemo                                useCallback                                |
| -------------------------- | -----------------------------------| ---------------------------------| 

| Purpose                    | Store reactive state                   | Memoize computed **values**    | Memoize**functions**                |
| Returns                    | `[value, setter]`                      | The computed value directly       | A memoized function                     |
| Changes trigger re-render? | Yes                                    | No                                 | No                                |
| Example                    | `const [name, setName] = useState('')` | `const total = useMemo(() => items.reduce(...), [items])` | `const fn = useCallback(() => {}, [deps])` |
| Best for                   | Form inputs, toggles, counters         | Filtered lists, computed totals, derived data             | Event handlers passed to memoized children |

## useMemo vs useCallback

```javascript
// useMemo — memoizes a VALUE (result of computation)
const total = useMemo(() => prices.reduce((a, b) => a + b, 0), [prices]);
// Returns: number (the sum)

// useCallback — memoizes a FUNCTION (prevents recreating it)
const handleClick = useCallback(() => {
  console.log("Clicked!", count);
}, [count]);
// Returns: function (same reference across renders if count unchanged)
```

Rule: If you need to cache a **computed value** → useMemo. If you need to cache a **function reference** → useCallback.

## Common Pitfalls

### Pitfall 1 — Forgetting dependency array (always recomputes)

```javascript
// ❌ No deps array — runs on EVERY render (no caching benefit!)
const total = useMemo(() => price * quantity);

// ✅ Include all used variables in deps
const total = useMemo(() => price * quantity, [price, quantity]);
```

### Pitfall 2 — Mutating state inside useMemo

```javascript
// ❌ WRONG — don't mutate state inside useMemo
const data = useMemo(() => {
  items.push(newItem); // mutation!
  return items;
}, [items]);

// ✅ Return NEW data
const data = useMemo(() => [...items, newItem], [items]);
```

### Pitfall 3 — Using useMemo to prevent ALL child re-renders

```javascript
// ❌ useMemo alone won't stop child from re-rendering if parent passes new props
const config = useMemo(() => ({ theme }), [theme]);
return <Child config={config} />; // still re-renders if parent re-renders!

// ✅ Combine with React.memo on child component
const Child = React.memo(({ config }) => { ... });
return <Child config={config} />;
```

### Pitfall 4 — Over-memoizing (premature optimization)

```javascript
// ❌ Don't wrap everything in useMemo — adds overhead itself!
const name = useMemo(() => firstName + " " + lastName, [firstName, lastName]);
const greeting = useMemo(() => `Hello ${name}!`, [name]);
const message = useMemo(() => `${greeting}, welcome!`, [greeting]);
// Chain of memos for trivial string concatenation — wasteful!

// ✅ Just compute directly for simple operations
const message = `Hello ${firstName} ${lastName}, welcome!`;
```

## Summary

- **`useMemo(fn, deps)`** → caches fn's return value until deps change
- Saves CPU by skipping expensive recomputations
- Gives stable object/array references across renders (prevents unnecessary child re-renders)
- Use for expensive calculations, not for simple operations like `a + b`
- Always include all dependencies in the array — missing deps = stale cached value

# unnecessary rerenders of components

Unnecessary re-renders occur when React components render even though their displayed data hasn't changed. Common causes include parent component re-renders, unnecessary state updates, passing new object, array, or function references as props, context updates, and Redux state changes. To optimize performance, I use techniques like React.memo() for memoizing components, useMemo() for expensive computations or object references, useCallback() for function references, and structure components to minimize unnecessary renders.

# reacts fiber

React Fiber is React's reconciliation engine introduced in React 16. It improves rendering performance by breaking updates into smaller units of work and prioritizing them. Unlike the older synchronous rendering model, Fiber can pause, resume, and prioritize rendering, making applications more responsive. It works in two phases: the Render phase, where React calculates the changes, and the Commit phase, where those changes are applied to the real DOM.

If the interviewer asks, "What is reconciliation?"

You can answer:

Reconciliation is the process React uses to compare the previous Virtual DOM with the new Virtual DOM, identify the differences, and update only the changed parts of the real DOM. React Fiber is the engine that performs this reconciliation more efficiently.

# SSR

How SSR Works
Browser Request
│
▼
Server
│
Render React Components
│
Generate HTML
│
Send HTML to Browser
│
Browser Displays Page
│
React Hydrates
│
Page Becomes Interactive

Server-Side Rendering, or SSR, is a technique where React components are rendered into HTML on the server before being sent to the browser. This allows users to see the page content immediately, improves SEO, and provides a faster initial load. After the HTML is delivered, React hydrates the page on the client side, attaching event handlers and making it fully interactive. SSR is commonly implemented using frameworks like Next.js.
"Have you used SSR?"

Since your resume doesn't mention Next.js or SSR, answer honestly:

I haven't implemented SSR in a production project yet, as my projects were built using React with client-side rendering. However, I'm familiar with the SSR concept, its benefits for SEO and initial page load performance, and I understand that frameworks like Next.js provide built-in support for it.
Client-Side Rendering (CSR) Server-Side Rendering (SSR)
Rendering happens in the browser Rendering happens on the server
Initial load can be slower Initial load is faster
Less SEO-friendly Better SEO
Used by standard React apps Common in Next.js

Without SSR (CSR):

Browser
│
Downloads HTML
│
Downloads JS
│
React renders UI
│
User sees content

# how do you optimize react performance

I optimize React performance by minimizing unnecessary re-renders and reducing the amount of work React has to do. I use reusable components to avoid duplicate code, manage shared state efficiently with Redux Toolkit to prevent unnecessary prop drilling, and implement server-side pagination so only the required data is loaded instead of fetching everything. I also ensure components render only when needed, optimize API calls, and structure the application into modular components for better maintainability and performance.

React.memo() – Prevents unnecessary re-rendering of components when props haven't changed.
useMemo() – Memoizes expensive calculations or object references.
useCallback() – Memoizes function references passed as props.
Code Splitting & Lazy Loading – Load components only when required.
Server-side Pagination – Fetch only the required data.
Debouncing/Throttling – Optimize frequent events like search input.
Proper Key Usage – Use stable keys in lists for efficient reconciliation.

# strictmode

React.StrictMode is a development-only feature that helps identify potential issues in a React application. It checks for unsafe lifecycle methods, deprecated APIs, missing cleanup in effects, and unintended side effects. In React 18, it intentionally invokes certain lifecycle methods and effects twice during development to help developers detect bugs early. It has no impact on the production build.

In React 18, when an application is wrapped with React.StrictMode, React intentionally mounts, unmounts, and mounts components again in development. This causes useEffect to execute twice, helping developers identify side effects and verify that cleanup logic is implemented correctly. This behavior occurs only in development and does not happen in production.

# handle api calls in hook

In React, I typically fetch data inside the useEffect hook because it allows side effects like API calls to run after the component renders. I use an asynchronous function with async/await to call the REST API, store the response in state using useState, and handle loading and error states to provide a better user experience. In my projects, I used Axios to integrate React with backend REST APIs.

# stale closure

A stale closure happens when a function inside a Hook captures an outdated value of state or props because it was created during an earlier render. This commonly occurs in useEffect, setTimeout, or setInterval when dependencies are missing. To avoid stale closures, I include the correct dependencies in the dependency array, use functional state updates when appropriate, or use useRef to access the latest value inside long-lived callbacks
Closure = A function remembers variables from the render in which it was created.
Stale Closure = The function remembers old state instead of the latest state because it wasn't recreated when the state changed.

# lazy loading

Lazy loading is a performance optimization technique where components, images, or routes are loaded only when they are needed instead of loading everything during the initial page load. In React, we typically use React.lazy() with Suspense to lazily load components. This reduces the initial bundle size, improves page load performance, and enhances the user experience by downloading code only when the user navigates to that part of the application.
import Home from "./Home";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import Orders from "./Orders";

Use lazy loading

import { lazy } from "react";

const Home = lazy(() => import("./Home"));
const Profile = lazy(() => import("./Profile"));
const Dashboard = lazy(() => import("./Dashboard"));
const Orders = lazy(() => import("./Orders"));

React downloads these components only when they are rendered.

Why Suspense?

Since React is downloading the component,

there is a small delay.

During that delay we show a loading UI.

import { Suspense } from "react";

<Suspense fallback={<h2>Loading...</h2>}>
<Profile />
</Suspense>

Output

Loading...

↓

Profile Component
Route Lazy Loading

Very common in production.

const Dashboard = lazy(() => import("./Dashboard"));

<Routes>
    <Route
        path="/dashboard"
        element={
            <Suspense fallback={<Loader />}>
                <Dashboard />
            </Suspense>
        }
    />
</Routes>

The Dashboard code downloads only when the user navigates to /dashboard.

# How do you handle side effects with Redux?

In Redux, side effects such as API calls, asynchronous operations, or timers are typically handled using middleware because reducers must remain pure functions. In my projects, I used Redux Toolkit, where asynchronous operations were managed using createAsyncThunk. It allows API calls to be made outside the reducer, dispatches pending, fulfilled, and rejected actions automatically, and updates the Redux store based on the API response. This keeps reducers simple and makes state management more predictable.

UI
│
▼
dispatch(fetchUsers())
│
▼
createAsyncThunk
│
▼
API Call
│
▼
Pending
│
▼
Fulfilled / Rejected
│
▼
Reducer updates Store
│
▼
React UI re-renders

Redux                                       Redux Toolkit
More boilerplate code                     Minimal boilerplate
Manually create store                     configureStore()
Manually define action types and creators  createSlice() generates them automatically
Manually configure middleware              Built-in middleware configuration
Async handling requires middleware setup   createAsyncThunk() for async operations
More complex                               Simpler and recommended

# how to handle authentication in react
In React, I handle authentication using a token-based approach. After successful login, the backend returns a JWT token, which is stored securely. The token is included in the Authorization header for authenticated API requests. Protected routes ensure only logged-in users can access specific pages, and on logout, the token is removed and the user is redirected to the login page. In production applications, HTTP-only cookies are generally preferred over localStorage for better security.

User Login
      │
      ▼
React Login Form
      │
      ▼
POST /login API
      │
      ▼
Node.js Backend
      │
Validate Credentials
      │
      ▼
JWT Token
      │
      ▼
Store Token
(localStorage/sessionStorage)
      │
      ▼
API Requests
Authorization: Bearer <token>
      │
      ▼
Backend Validates Token
      │
      ▼
Protected Data Returned

#  breadcrumbs
Breadcrumbs are a navigation component that shows the user's current location within the application hierarchy and provides links to previous pages. In React, breadcrumbs are typically implemented using React Router. I use the current URL path from useLocation(), split it into segments, and dynamically generate breadcrumb links. This improves navigation, user experience, and makes it easier for users to move back to previous pages.


When debugging performance issues in React, I first identify whether the problem is caused by unnecessary re-renders, slow API responses, or large amounts of data being rendered. I use React Developer Tools and the Profiler to identify components that are re-rendering frequently, and Chrome DevTools to analyze network requests. Based on the findings, I optimize the application by reducing unnecessary state updates, using server-side pagination for large datasets, improving component reusability, and applying techniques like React.memo(), useMemo(), or useCallback() where they provide a measurable performance benefit. In one of my projects, implementing server-side pagination significantly reduced the amount of data loaded by the frontend and improved the application's responsiveness.
React Developer Tools – To inspect components and props.
React Profiler – To identify unnecessary re-renders and measure render times.
Chrome DevTools (Network tab) – To analyze API response times and payload sizes.
Chrome Performance tab – To investigate rendering and browser performance.

# What are Custom Hooks? Debounce
Interview Answer

A custom hook is a JavaScript function that starts with the word use and allows us to extract and reuse stateful logic across multiple React components. It helps avoid code duplication and improves code reusability and maintainability.

Examples:

useFetch()
useDebounce()
useLocalStorage()
useWindowSize()

User Types
      │
      ▼
search State Updates
      │
      ▼
useDebounce waits 500ms
      │
      ▼
No typing?
      │
      ▼
Update debouncedValue
      │
      ▼
API Call

Why do we clear the timeout?
return () => clearTimeout(timer);

Answer:

The cleanup function clears the previous timer whenever the input value changes or the component unmounts. This ensures that only the latest value is processed after the specified delay, preventing multiple pending timers and unnecessary API calls.

# throttling

Throttling is a performance optimization technique that limits how frequently a function executes. Instead of executing on every event, it allows the function to run only once within a specified time interval. This is useful for high-frequency events like scrolling, resizing, or mouse movement, where executing the function too often could affect application performance.

User Scrolls

↓

Event fires continuously

↓

Throttle checks time

↓

Has 1 second passed?

       ↓

      Yes

↓

Execute Function

↓

Ignore all other events

↓

Wait another second

Debounce	Throttle
Waits until the user stops triggering the event       	Executes at regular intervals while the event continues
Best for search inputs                                	Best for scrolling and resizing
Example: Search bar	                                    Example: Scroll event

I would use throttling when I need continuous updates at a controlled rate, such as tracking scroll position, window resizing, or infinite scrolling. For search inputs or autocomplete, I would use debouncing because I only want the API call after the user stops typing.

# keys in react
Keys are special props in React used to uniquely identify elements in a list. They help React determine which items have been added, removed, or updated during re-rendering. This allows React to efficiently update only the changed elements instead of re-rendering the entire list, improving performance and preserving component state.

Why not use array index as a key?
items.map((item, index) => (
  <li key={index}>{item.name}</li>
));

If items are added, deleted, or reordered, the indexes change.

# controlled vs uncontrolled components

A controlled component is a form element whose value is managed by React state using useState. React becomes the single source of truth, making it easier to validate input, control form behavior, and update the UI. An uncontrolled component, on the other hand, stores its value in the DOM and is accessed using a ref. It is generally used for simple forms or file inputs where React doesn't need to manage the input state.

Controlled Component	                Uncontrolled Component
Value stored in React state          	Value stored in the DOM
Uses useState                       	Uses useRef
React controls the input	            Browser controls the input
Easy validation                     	Less control
Re-renders on every change	          Doesn't re-render on every change
Best for most forms                 	Useful for simple forms or file uploads

<input
  type="file"
  ref={fileRef}
/>

This is uncontrolled because browsers don't allow React to control the value of a file input.

# Batching in react
Batching is a React optimization where multiple state updates are grouped together into a single re-render instead of triggering a re-render for each update. In React 18, automatic batching was introduced, which means state updates inside event handlers, promises, setTimeout, and other asynchronous callbacks are automatically batched. This reduces unnecessary renders and improves application performance.

Before React 18

Only updates inside React event handlers were batched.

function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const handleClick = () => {
    setCount(count + 1);
    setName("Sapna");
  };

  return <button onClick={handleClick}>Click</button>;
}

Both updates are batched, resulting in 1 re-render.

But inside setTimeout
setTimeout(() => {
  setCount(count + 1);
  setName("Sapna");
}, 1000);

Before React 18:

setCount() → Re-render
setName() → Re-render

➡️ 2 re-renders

React 18

React 18 automatically batches updates everywhere.

setTimeout(() => {
  setCount(count + 1);
  setName("Sapna");
}, 1000);

Now:

Both updates are grouped together.
Only 1 re-render occurs.

The same applies to:

Promise.then()
async/await
setTimeout
Native event handlers

# handle state in react without redux
Global state can be managed without Redux using React's Context API along with the useContext and useReducer or useState hooks. The Context API allows data to be shared across multiple components without prop drilling, making it suitable for managing application-wide data such as user information, themes, language preferences, or authentication state.
When to use Context API?

Good for:

Authentication
Theme (Dark/Light)
Language
Logged-in user
Application settings


Interview Cheat Sheet
Problem	Solution
Large list	react-window / virtualization
Child re-renders	React.memo
Expensive calculations	useMemo
Function prop changes	useCallback
Too much data	Pagination / Infinite Scroll
Too many API calls	Debounce / Cache
Images load slowly	Lazy loading
Unstable reconciliation	Use stable key (id)

# clent side pagination
Step 1: Store the current page
const [page, setPage] = useState(1);

Initially:

page = 1
Step 2: Decide how many items per page
const pageSize = 3;

This means:

Page 1 → 3 items
Page 2 → 3 items

Step 3: Calculate the starting index
const start = (page - 1) * pageSize;
Page 1
page = 1

start = (1 - 1) * 3
      = 0

Step 4: Get only the current page's items
const paginatedUsers = users.slice(
    start,
    start + pageSize
);

Step 5: Previous Button
<button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
>
    Prev
</button>

Step 6: Next Button
<button
    disabled={start + pageSize >= users.length}
    onClick={() => setPage(page + 1)}
>
    Next
</button>