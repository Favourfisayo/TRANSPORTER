# Codebase Structure Guide

## 1. Purpose

This document defines the canonical folder shape and layer responsibilities for a feature or domain module in this codebase, covering both backend and frontend. Every new module should be scaffolded into this shape from day one. Every existing module should match it.

It does **not** decide _how_ code inside those folders is written (naming, function size, error handling, SOLID and dependency injection). See the code writing handbook for that.

## 2. Target architecture: backend

```
[app-root]/src/features/<feature-name>/
├── controllers/
│   ├── db/
│   │   ├── queries.ts          # read operations
│   │   └── mutations.ts        # write operations
│   └── <resource>.controller.ts # request handling logic invoked by routes/: validates input, calls services/ and controllers/db/, shapes the response
├── services/
│   └── <name>.service.ts        # business logic and orchestration that is neither pure data access nor request handling
├── schemas/
│   └── <name>.schema.ts         # feature-local validation schemas the frontend never needs to import
├── routes/
│   └── <feature>.routes.ts      # route definitions and middleware wiring only, calls into controllers/
├── utils/
│   └── <name>.ts                 # small pure helpers local to this feature
└── workers/                       # only present when the feature owns a background job/queue
    └── <name>.worker.ts
```

**Layer responsibilities, explicitly:**

- `routes/` stays thin. It wires middleware (auth checks, rate limiters) and calls a named controller function. No business logic in route files.
- `controllers/` owns request validation, orchestration calls, and response shaping.
- `controllers/db/` owns data access. `queries.ts` handles reads, `mutations.ts` handles writes.
- `services/` owns business logic that is not pure data access.
- `schemas/` is for backend-only validation shapes that have no reason to leave the server. If you keep a shared schema package the frontend also imports, that package remains the source of truth for shared types. A feature's local `schemas/` is only for internal, server-only shapes.
- `workers/` holds background job setup and definitions together. Only create it for features that actually run background jobs. Do not scaffold an empty `workers/` folder for a feature that has no jobs.
- Some features legitimately need a layer outside this six-folder convention, for example an `auth` feature's `middleware/`, since middleware is not a controller, service, or route. Name the exception explicitly in that module rather than force-fitting it into an existing folder.

## 3. Target architecture: frontend

```
[app-root]/src/features/<feature-name>/
├── components/
│   ├── forms/                   # only when 2+ components share this grouping
│   ├── cards/
│   ├── modals/
│   ├── layout/
│   └── <Component>.tsx          # ungrouped components stay flat at this level
└── lib/
    ├── api/
    │   ├── client.ts             # raw fetch/API-client wrappers to the backend
    │   ├── queries.ts             # data-fetching hook definitions
    │   └── mutations.ts           # data-mutation hook definitions
    ├── actions/                    # only present on features that use server-side actions/mutations colocated with the domain
    │   └── <name>.actions.ts
    ├── schemas/
    │   └── <name>.schema.ts
    ├── utils/
    │   └── <name>.ts
    └── hooks/
        └── use-<name>.ts
```

**Layer responsibilities, explicitly:**

- `components/` subgrouping (`forms/`, `cards/`, `modals/`, `layout/`) is applied only where a feature has enough components to warrant it. A two-component feature stays flat.
- `lib/api/` groups everything that is talking to the backend, as a set: a raw client, queries, and mutations.
- `lib/actions/` is created only for features that genuinely use colocated server actions or mutations. Do not centralize these into one global folder if your framework supports colocation.
- `lib/hooks/` holds hooks specific to that feature; genuinely cross-feature hooks stay in a shared top-level `hooks/`. The same split applies to `components/` versus a shared top-level `components/`.

## 4. Shared vs. feature-local code

- Code used by exactly one feature stays local to that feature, even if it looks reusable in principle. Do not pre-emptively share something on the theory that another feature _might_ need it later.
- Code actually used by two or more features moves to the existing top-level shared location (shared `lib/`, shared `components/`, shared `hooks/`) once that is true, not before.
- This applies the same way on both backend and frontend: promote on actual reuse, not anticipated reuse.

## 5. Application Process Entry Points

The `apps/server/src/` root contains only `index.ts` (Express API bootstrap), `app.ts` (application assembly), and the separate `worker.ts` and `cleanup.ts` executable entry points. Environment accessors and service wiring live in `config/`; shared process startup validation/lifecycle lives in `lib/background-process.ts`. Neither background entry imports the API's `config/services.ts` or `config/env.server.ts`.

`apps/server/src/config/services.ts` wires the API's private database clients, authentication and email sender. `features/auth/services/owner-boundary.service.ts` connects fresh verified sessions to the shared owner transaction boundary. `lib/email.ts` owns Resend delivery; authentication message composition remains in `packages/auth/src/index.ts`. Product routes, controllers, domain services and durable handlers belong to their owning feature folders from Section 2.

`apps/server/processes/worker/` and `apps/server/processes/cleanup/` each own a Varlock schema and local/deployment environment. Their commands change into the owning directory before startup. Generated environment accessors target `src/config/env.ts`, `src/config/env.worker.ts` and `src/config/env.cleanup.ts`; the API's `config/env.server.ts` loads and re-exports its accessor. `WORKER_DATABASE_URL` and `CLEANUP_DATABASE_URL` are distinct, with no default API credential fallback. Turborepo scopes each background development task to its own database and provider settings.

The worker remains a bootstrap entry point. Cleanup owns a claimed deletion/retention handler under `features/deletions/workers/`, using `cleanup_runtime`, transaction-local owner/claim context and a separate assets-bucket delete credential. The API's auth-only lifecycle handler finalizes an account after cleanup records completion; cleanup itself has no auth-table grants. Durable analysis/email handlers still belong to their owning feature's `workers/` layer.

The notifications feature owns REST feed/count/read, better-sse session orchestration and push subscription controllers/services under the standard backend layers. Its workers own claimed Web Push delivery alongside independently retryable email delivery. Shared database code owns owner-scoped NotificationState, PushSubscription and PushDeliveryOutbox operations/role boundaries; a process-owned dedicated direct listener carries only content-free PostgreSQL wake-up hints. Never hold an owner transaction for the life of SSE. Exact lifecycle and transport contracts are in APISPEC Section 22 and DMD.

The web notifications feature owns native EventSource lifecycle, REST invalidation, this-browser permission/sound controls and push registration. The same-origin service worker and minimal web app manifest are web-owned public assets; the service worker validates safe push/click payloads only, with no authenticated response or image caching. Scope Client Components to the live/permission/audio lifecycle; initial private page data still follows the server-only cookie-forwarding rules. Logout/account switch cancels streams and clears the current local browser binding. Server-only VAPID/private subscription secrets never enter browser bundles.

## 6. Shared API Contracts

`packages/contracts` is the browser/server-safe `@CBHub/contracts` package. `src/dtos.ts` owns snake_case resource/input types and explicit nullable fields; `src/errors.ts` owns the strict application error envelope, stable code/status mapping and code-specific detail shapes. It imports no database, auth runtime or application environment.

`src/content.ts` owns runtime source/display text budgets, normalization, palette/price/crop schemas and catalog/template-aware schema constructors. `ProjectPatch` permits omission but requires non-null approved names when supplied; contact/logo remain explicitly nullable.

Catalog-aware business validators receive trusted supported font IDs. The composition validator receives a validated internal subset of the pinned template (requirements, allowed role IDs/color slots, photo region and crop limits) plus selected decoded image dimensions/logo presence. Its role arrays are an adapter projection of `TemplateDefinition.font_roles[role].allowed_font_ids`, not a new public template DTO. Callers derive this context from the trusted package and authorized immutable media, never browser-controlled metadata. Template artifact definitions/catalogs remain future work. Primitive schemas alone do not establish catalog membership, rendered fit or ownership. Wrapped-line/width/minimum-size validation must gate Save/export through the future shared renderer. Owned resulting-state validation and runtime handlers remain later backend work.

`src/common.ts` owns UUID/UTC timestamp/revision/request-key primitives reused by error details, receipt schemas and worker messages. `src/receipts.ts` owns minimal acknowledgement, deletion-intent/receipt and signed-out recovery projections with inferred types. `src/worker-commands.ts` owns transport-name validation and the three strict schema-v1 payloads. Queue dispatch/claims, replay storage, restricted recovery cookies and atomic compare-and-swap are not implemented by these contracts.

`src/requests.ts` owns strict core project/draft/promotion/analysis request-body shapes. Schemas reject nested extras and empty PATCHes and preserve omission/null/full-object replacement semantics. Stored draft kind, merged PATCH state, trusted template/font/media policy and ownership are enforced by the later feature handlers; the schemas do not create those endpoints.
