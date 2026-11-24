# Repository Guidelines

## Project Structure

This Bun/Turborepo workspace contains the Next.js app in `apps/web`. Routes and layouts live in `apps/web/src/app`, app-specific components in `apps/web/src/components`, and static/PWA assets in `apps/web/public`. Shared components, utilities, and global styles live in `packages/ui/src`; shared TypeScript configuration is in `packages/config`. Engineering and design references are in `docs/`, and deployment environment tooling is in `scripts/`.

## Development and Checks

Run these commands from the repository root:

- `bun install` — install workspace dependencies and generate environment types.
- `bun run dev` — start development tasks; the web app runs at `http://localhost:3001`. Use `bun run dev:web` for the web app alone.
- `bun run build` — build workspace applications through Turbo.
- `bun run check-types` — run workspace TypeScript checks.
- `bun run check` — run Oxlint and apply Oxfmt formatting; this command changes files.
- `bun run env:generate` — regenerate environment types after editing an app schema.

## Style and Testing

Use TypeScript and follow the surrounding code: two-space indentation, double quotes, semicolons, PascalCase React components, and kebab-case component filenames such as `mode-toggle.tsx`. Put reusable primitives in `packages/ui` and import them through `@THE-TRANSPORTER/ui/components/...`. Use the existing Tailwind and shared style conventions.

Do not add or run unit tests for components or other project files. Use appropriate non-test verification for changes, respecting the user's current restriction on full builds and live/browser verification.

## Commits and Pull Requests

History currently contains only an `initial commit`, so no established commit format can be inferred. Use short, descriptive imperative subjects. Pull requests should explain the change and its purpose, list checks performed, link relevant issues, and include screenshots for visible UI changes.

## Configuration and Agent Notes

Before every task, read the documentation in `docs/`, including its subdirectories.

For every UI or frontend engineering task, check the AI skills available in the workspace and environment, select the skills relevant to the work, and invoke and follow them. Do this every time.

When implementing a Figma design, match its exact design tokens, typography (including font family and weight), spacing, colors, icon artwork, borders, and copy across all relevant states. Inspect the Figma source instead of approximating; preserve any explicit user-requested exceptions. State any aspects that could not be verified rather than claiming exact fidelity.

Use BoardUI's shared notification and toast components for all application toasts and notifications. Import toast and Toaster from `@THE-TRANSPORTER/ui/components/base/toast/toast` rather than adding another toast library.

Keep secrets out of Git; commit environment schemas and use ignored environment files or the deployment platform for values. Follow `apps/web/AGENTS.md` when working in the web app, including its instruction to consult the installed Next.js documentation.

Before implementing or answering questions about a library, framework, SDK, API, CLI, or cloud service, use Context7 to resolve the relevant library and query its current documentation. This includes React and Tailwind CSS, among others, even for familiar APIs. Check current best practices and deprecations, and use documentation appropriate to the version installed in this project so implementations do not rely on stale or deprecated features. Consult the latest documentation as well when relevant; do not upgrade dependencies without a reason and authorization. Prefer Context7 over web search for library documentation.
