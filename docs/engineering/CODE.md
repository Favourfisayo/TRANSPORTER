# Code Writing Handbook

## 1. What this is, and what it is not

This document decides **how code is written** once it exists: naming, function size, dependency direction, error handling, and when to add an abstraction versus when not to.

It does **not** decide **where code lives**. Folder shape, layer boundaries, and any domain module structure are owned by a separate structure guide (see the codebase structure guide referenced in section 8, or wherever your project's version lives). If you are wondering whether a file belongs in `services/` or `lib/`, that document has the answer, not this one.

If you keep a deeper research document behind a handbook like this (sources, contrarian views, longer technical justification), link it here instead of folding that material in. This handbook is meant to stay the short, day-to-day version.

## 2. Naming and function size

**The test:** if you have to add a second sentence to explain what a function does, the function is doing too much, or its name is hiding what it does. Split it, or rename it.

Before and after, replace with a real example from this codebase the first time this rule catches something:

```typescript
// Before: name says "get X", but the catch block silently does
// something the name does not promise: a second, hidden
// responsibility living inside a function whose name only
// promises the first one.
function getX() {
  try {
    // ...
  } catch (error) {
    console.log(error); // swallowed, not surfaced anywhere
    return null;
  }
}

// After: same function, same name, but the failure path now does
// what this codebase's error-observability convention expects
// (see section 5), not a new responsibility but the existing one
// done right.
function getX() {
  try {
    // ...
  } catch (error) {
    errorTracker.captureException(error); // e.g. Sentry, Rollbar, structured logging
    return null;
  }
}
```

Names should answer "what does this do" without needing a comment. A well-named function should not need a docblock that only restates its name.

## 3. The five SOLID principles, with worked examples

The five definitions below are genuinely stack-agnostic. Keep them as is. Replace each "This codebase:" line with a real example the first time you apply the principle here.

### S. Single Responsibility: one reason to change

A function or class should have exactly one job. If a change to "how X is fetched" and a change to "how errors are reported" both touch the same function, it is doing two jobs.
**This codebase:** `[a function/class that does exactly one thing and delegates the rest]`

### O. Open/Closed: add new code, do not edit working code

When a new case shows up, prefer adding a new small unit over adding a branch to something that already works.
**This codebase:** `[a hierarchy or strategy pattern where new cases are new files, not new branches]`

### L. Liskov Substitution: a stand-in must behave like the real thing

If code can accept either the real dependency or a substitute, the substitute has to honor the same contract: not almost behave the same, not silently no-op on something the real one guarantees.
**This codebase:** `[a type/interface that defines the substitutability contract, plus a test fake that honors it]`

### I. Interface Segregation: depend on only what you use

Do not force code to depend on, or a test to mock, more surface than it actually calls.
**This codebase:** `[a function that asks for a narrow slice of a larger object/interface, not the whole thing]`

### D. Dependency Inversion: depend on abstractions, not concretions

This is usually the most consequential principle in a codebase. Business logic should ask for "a thing shaped like X," not `import` the concrete X directly. See section 4 for the full worked example.

## 4. Dependency injection without a framework

**The plain version:** if a piece of code reaches out and grabs a real, concrete dependency (a database client, a third-party SDK instance, an HTTP client) via a top-level import, nothing can substitute a fake for it in a test. The test has to spin up the real thing, or it cannot run at all. If that same code instead _receives_ its dependency as a parameter, a test can hand it a small fake object and run in milliseconds.

**No IoC container needed**, unless the project is genuinely large enough that manual parameter-passing has become unwieldy. Most projects never get there. Manual "pass it as a parameter" is enough, and reaching for a container (InversifyJS, tsyringe, and equivalents in other languages) before you actually need one is exactly the kind of premature abstraction section 6 warns against.

### Worked example template

**Before** (untestable without the real, fully configured dependency):

```typescript
import { thirdPartyClient } from "./config/third-party.config";

export async function getThing(id: string) {
  return thirdPartyClient.fetch(id);
}
```

The problem: `thirdPartyClient` is imported at module scope from a config file that likely throws at import time if required environment variables are not set. So importing this file for a test, even just to test its own logic, drags in real configuration. There is no way to unit-test this without live infrastructure.

**After:**

```typescript
type ThingClient = { fetch(id: string): Promise<unknown> };

export function createGetThing(client: ThingClient) {
  return async function getThing(id: string) {
    return client.fetch(id);
  };
}

let cached: ReturnType<typeof createGetThing> | undefined;

export async function getThing(id: string) {
  if (!cached) {
    const { thirdPartyClient } = await import("./config/third-party.config");
    cached = createGetThing(thirdPartyClient);
  }
  return cached(id);
}
```

What changed and why:

- The factory takes the dependency **as a parameter**, typed as "anything shaped like the real client," not the concrete singleton.
- The public function that callers already import keeps the exact same signature and behavior. It lazily imports the real config on first actual call, caches it, and delegates. **No existing caller needs to change.**
- A test can now hand the factory a two-line fake instead of the real client, with no environment variables, no live service, and no network call.

**When NOT to do this:** do not add this kind of parameter-injection seam to a function that has no test and no second implementation waiting. A config file's own environment-variable guards, for instance, are usually tested by actually importing it with different variables set, because that is what is being tested (the guards themselves), not something that needs a fake substituted in.

## 5. Error handling

**The plain version:** business logic should never build a response itself. It throws a typed error; exactly one place turns that error into what the caller actually receives.

**The pattern, once established, should be stated as a rule and not re-derived per pull request:**

- Throw a specific typed-error subclass (`UnauthorizedError`, `NotFoundError`, `BadRequestError`, and so on) from business logic.
- Wrap route or request handlers in a shared error-catching wrapper instead of manual try/catch in every handler.
- Let one centralized error-handling middleware or boundary be the only place that turns a thrown error into a response.

**Two ways this breaks in practice. Watch for both:**

1. A handler that builds a response directly (for example `res.status(500).json(...)`) instead of throwing. If you are reaching for response-building inside business logic rather than a route's final response-shaping step, stop. Throw a typed error instead.
2. A `catch (error)` block that uses `error` without narrowing it first. In TypeScript, a caught value is typed `unknown`, not `Error`. Check `instanceof` against a known error type before treating it as having any particular shape. (If your language does not have this problem, for example Python's `except SpecificError:`, drop this bullet, but keep the underlying discipline: do not assume the shape of a caught error.) Report it through your error-observability tool rather than a bare `console.error` or `print` that nothing ever sees.

## 6. DRY and YAGNI guardrails

**The plain version:** do not add an interface for something with only one implementation. Do not add a config option for a value that never changes. Do not merge two blocks of code that merely _look_ similar today if they actually encode different business rules. That creates a false coupling that breaks the moment the rules diverge, which is worse than the duplication it removed.

Apply the patterns in sections 3 and 4 when there is an **actual** second implementation or an **actual** test that needs a fake, not because "SOLID says so." A small amount of duplicated `if (!x) throw` environment-variable guards, for example, is a fine negative example: extracting a `requireEnv(name)` helper for three or four call sites is marginal at best, and DRY exists to reduce the cost of _changing_ something, not to eliminate every repeated line.

## 7. Frontend component splitting

Keep components and their files focused and easy to read. A component that grows to hundreds of lines is a signal to split it into smaller, clearly named subcomponents around meaningful parts of the interface or distinct responsibilities. Extract related state and behavior into a feature-specific hook or helper when that makes the flow clearer. Keep closely related pieces together; do not create wrappers, indirection or tiny files merely to meet a line count.

When touching an oversized component, decompose the relevant flow as part of the work rather than adding more unrelated responsibilities. Preserve state ownership, validation, error and loading states, accessibility, and user-visible behavior. Keep feature-specific pieces within their feature; move a component into a shared location only when multiple features actually use it, following `CODEBASE.md`.

Do not turn server-rendered data fetching into a client hook just to split a component. An async Server Component may fetch its own data and compose smaller components, with Suspense where appropriate. Use client hooks for genuinely interactive state and existing mutation/refetch flows. Keep reusable presentation components independent of a specific data source when practical.
