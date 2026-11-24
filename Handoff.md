# Handoff

## Current work

The user is implementing the customer booking onboarding UI one step at a time, using Figma as the visual source of truth. The routes `/dashboard/book/drop-off` and `/dashboard/book/pick-up` share all five UI steps: Trip, Flight, Travellers, Vehicle, and Pay. The pickup card on the dashboard links to the pickup route. The shared `BookingPage` currently lives in `apps/web/src/features/dashboard/components/booking/dropoff-booking-page.tsx`; pricing, eligibility, and booking validation helpers are in `apps/web/src/features/dashboard/lib/dropoff-booking.ts`. Continue with the next change only when the user gives direction or a design.

Figma references:

- [Trip](https://www.figma.com/design/bAvZHUtn7mf7lFCIIse6TD/The-Transporter-PWA?node-id=158-9848), including the [pickup card](https://www.figma.com/design/bAvZHUtn7mf7lFCIIse6TD/The-Transporter-PWA?node-id=158-10233).
- [Flight initial](https://www.figma.com/design/bAvZHUtn7mf7lFCIIse6TD/The-Transporter-PWA?node-id=149-779) and [populated](https://www.figma.com/design/bAvZHUtn7mf7lFCIIse6TD/The-Transporter-PWA?node-id=150-1331).
- [Travellers](https://www.figma.com/design/bAvZHUtn7mf7lFCIIse6TD/The-Transporter-PWA?node-id=150-3029), [Vehicle](https://www.figma.com/design/bAvZHUtn7mf7lFCIIse6TD/The-Transporter-PWA?node-id=151-4139), and [Pay](https://www.figma.com/design/bAvZHUtn7mf7lFCIIse6TD/The-Transporter-PWA?node-id=156-5274).
- The progress indicator intentionally uses [node 153:4917](https://www.figma.com/design/bAvZHUtn7mf7lFCIIse6TD/The-Transporter-PWA?node-id=153-4917), with five steps and motion informed by `tmp-prompt.txt`.

The user expects exact Figma typography, spacing, colors, copy, control states, and exported icons; compare the actual nodes rather than approximating. Their explicit variations include a short mobile heading ("Book a drop-off"), the existing button gradient on active switches, Geist Mono price figures, and animated price changes. The estimate stays visible as a dash until the flight details have been entered.

The user corrected the Flight step distinction: [drop-off Flight](https://www.figma.com/design/bAvZHUtn7mf7lFCIIse6TD/The-Transporter-PWA?node-id=158-11090) uses departing-flight wording and a pickup-time panel. Pickup uses arriving-flight wording and the driver-waiting panel. The shared booking page and `FlightStep` use a trip type; the pickup Pay review runs from terminal to destination, while drop-off runs in the opposite direction. The pickup screens were supplied as screenshots. The estimate remains a dash until flight details are complete, per the user's earlier instruction.

The drop-off pickup time and summary use an illustrative allowance of three hours plus 70 minutes, derived from the explanation in the Figma sample. This is the same journey allowance for every area, not real travel-time data. The Figma's displayed departure and pickup times do not match that explanation, so the implementation calculates from the explanation. At the user's request, the visible sentence follows Figma without an example disclaimer. It shows a dash until a date and time are entered and handles a pickup on the previous date. Any nonblank flight entry shows the Enugu Air image and "To Enugu · scheduled 15:20" for drop-off, or the Emirates image and "From Dubai (DXB) · scheduled 14:05" for pickup. These are design examples, not flight lookup results.

The price digit animation styles live in `packages/ui/src/styles/globals.css` under booking-specific class and keyframe names; `NumberPopIn` no longer imports a CSS module. The flight-date label now uses the 19.5px line height from the Figma reference. Browser and responsive fidelity for both booking flows remain unverified.

This remains a demo: fare calculations, points, cancellation copy, and the example flight details are not live provider-backed data. Payment, booking creation, actual uploads, and flight tracking are not connected. Review `dropoff-booking.ts` and the component call sites before changing those behaviors. Zod is used in booking, auth/account forms, and the file uploader; HTML/React Aria constraints also remain.

## Latest change and working tree

Individual trip details now have a shared `/dashboard/trips/[reference]` UI for two demo examples: pickup `TR-1001` and drop-off `TR-1002`. The corresponding My Trips cards and dashboard upcoming trip link to them; other example trips still show a coming-soon notification. The sample booking, driver, points and payment details are not backed by live services. The Pay button still does not create a booking. Receipt, cancellation and support actions show demo notifications. The ride phrase is hidden initially and can be revealed or copied. The status display reuses the onboarding stepper, and the phrase card uses the app's button gradient, as requested. Figma references are [pickup](https://www.figma.com/design/bAvZHUtn7mf7lFCIIse6TD/The-Transporter-PWA?node-id=158-13333) and [drop-off](https://www.figma.com/design/bAvZHUtn7mf7lFCIIse6TD/The-Transporter-PWA?node-id=158-14791). Workspace typecheck, targeted Oxlint, and diff whitespace checks passed; browser, mobile, and visual fidelity are unverified.

The user requested a spacing correction to the Trip pickup card at node `158:10233`. The preceding pass adjusted the heading-to-fields gap, field label spacing, first-row reserve, and desktop card bottom spacing in `dropoff-booking-page.tsx`. Figma showed a 36 px heading-to-fields gap, 16 px grid gap, and a 26 px reserve below the first row. The user must judge visual fidelity when browser verification is authorized.

After that pass, the file was modified again: its current diff includes formatting and a heading change to "Where are you going?". Treat the current file and all of its changes as user work; do not revert them. At handoff, `git status --short --branch` showed `main...origin/main` and one modified file, `apps/web/src/features/dashboard/components/booking/dropoff-booking-page.tsx`; this handoff will also become modified. Recheck status and history before editing. The latest commit shown was `89460db feat: accounts UI fix; onboarding ui; minor fixes`.

## Unit testing preference

The user explicitly requested removal of all project unit tests and that unit testing not be done again, including for components and other files. Do not add or run unit tests. The existing 17 project test files were removed; no dedicated test script or test framework dependency was configured. Use appropriate non-test checks while respecting the verification restrictions below. Await the user's next booking onboarding direction.

## Working rules and verification

All app toasts use BoardUI's shared `base/toast/toast`, which renders BoardUI Notification cards; the root provider places them at the top center. Preserve this convention for new notifications.

Read `AGENTS.md`, `apps/web/AGENTS.md`, and the documentation under `docs/` before work. Follow the installed Next.js documentation and the BoardUI rules in `apps/web/AGENTS.md`. Prefer existing source-owned BoardUI components and semantic tokens; save design assets in `apps/web/public/assets/`. Respect the user's instruction to use Zod for application validation.

The user requested **no full builds and no live/browser verification for now**. The pickup implementation passed the workspace typecheck, targeted Oxlint, and a scoped diff whitespace check. No unit tests, full build, browser, mobile, or visual verification were performed; Figma fidelity and runtime navigation remain unverified in a rendered browser.

The current shell's Node version-manager shim reported no active version. The checks ran successfully with the installed Node `v24.21.0` directory prepended to `PATH` for the individual process; avoid changing global settings. The root `bun run check` also formats files, so avoid using it casually on a dirty tree. No commit or push was requested for the latest change.

## Suggested skills

Select applicable skills for each task, as required by `AGENTS.md`: `figma:figma-design-to-code` for Figma implementation; `boardui` for BoardUI components and tokens; `vercel-react-best-practices` for React/Next.js work; `emil-design-eng`, `apple-design`, `animate`, and `animation-vocabulary` for relevant interaction or motion changes; and `stageshow` or `design-taste-frontend` only when they help the specific task. Use `figma:figma-implement-motion` for Figma motion and Context7 for applicable library questions. The user's instructions take priority over skill defaults.
