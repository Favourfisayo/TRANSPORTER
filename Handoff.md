# Handoff

## Current work

The project is a Bun/Turborepo Next.js application. The user is implementing the customer booking onboarding UI one step at a time, using Figma as the visual source of truth. The current route is `/dashboard/book/drop-off`; its Trip and Flight steps are implemented in `apps/web/src/features/dashboard/components/booking/`. Continue with the next step only when the user provides direction or its design.

- Trip reference: [Figma node 158:9848](https://www.figma.com/design/bAvZHUtn7mf7lFCIIse6TD/The-Transporter-PWA?node-id=158-9848).
- Flight references: [initial state](https://www.figma.com/design/bAvZHUtn7mf7lFCIIse6TD/The-Transporter-PWA?node-id=149-779) and [populated state](https://www.figma.com/design/bAvZHUtn7mf7lFCIIse6TD/The-Transporter-PWA?node-id=150-1331).
- The progress indicator intentionally uses the appearance of [node 153:4917](https://www.figma.com/design/bAvZHUtn7mf7lFCIIse6TD/The-Transporter-PWA?node-id=153-4917), with five booking steps and spring settings informed by `tmp-prompt.txt`, instead of the indicator shown in the booking frames.

The Flight references depict an airport **pickup**, while the implemented route starts as a **drop-off**. At the user's explicit request, its latest copy follows the pickup Figma, including “arriving flight” and “scheduled landing”; reconcile the trip semantics with the user when relevant. The `EK 783` Dubai details and ₦27,500 estimate are design examples, not live lookup or calculated pricing. Flight tracking, actual uploads, pricing, and later steps are not connected. Continue to travellers currently displays a coming-soon message.

## Working rules and verification

Read `AGENTS.md`, `apps/web/AGENTS.md`, and `docs/` before tasks. Follow `docs/engineering/CODE.md`, `docs/engineering/CODEBASE.md`, and `docs/design/` for implementation. The user expects exact Figma typography, spacing, colors, copy, and exported SVG icons; use source-owned BoardUI components tailored to the design, shared Tailwind styles, and logical feature folders. Save design assets under `apps/web/public/assets/`. Dark mode should be plain black outside the landing page, with visible dashboard borders.

The user requested **no full builds and no live/browser verification for now**. The latest booking changes passed the web TypeScript check, targeted Oxlint, and focused booking tests. These do not establish visual fidelity or live behavior. Preserve existing changes: the `main` working tree has numerous modified and untracked files, including prior user changes; inspect `git status` before touching them. No commits or pushes were requested.

## Suggested skills

For each UI task inspect available workspace/environment skills and select those applicable, as required by `AGENTS.md`. Likely relevant: `stageshow`, `boardui`, `emil-design-eng`, `apple-design`, `animate`, `animation-vocabulary`, `design-taste-frontend-v1`, and `figma:figma-design-to-code` for Figma implementation. Use `figma:figma-implement-motion` for Figma motion, `vercel-react-best-practices` for React changes, and other skills only when relevant. Consult installed Next.js docs as required by `apps/web/AGENTS.md`; use Context7 for applicable library questions.
