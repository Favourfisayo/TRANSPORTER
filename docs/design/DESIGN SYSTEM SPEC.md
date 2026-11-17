# THE TRANSPORTER — DESIGN SYSTEM SPEC

**Scope:** The Transporter PWA — public site, authentication, customer and business accounts, booking flow, and operations portal  
**Version:** 2.0 · 16 November 2026  
**Figma:** [The Transporter PWA — complete design file](https://www.figma.com/design/bAvZHUtn7mf7lFCIIse6TD/The-Transporter-PWA)  
**Component library:** [BoardUI](https://www.boardui.com/components) (selective use)

This is a concise, app-wide implementation specification derived from the **full Figma file**, including the `APP DARK MODE` and `APP LIGHT MODE` sections, their desktop and mobile artboards, and the public landing-page layouts. Values below are extracted from visible design frames; where a pattern appears in only one mode or one screen, treat it as a screen-specific example rather than a universal component rule. The file has not been verified as a published, named Figma token library.

## 1. Product visual direction

- **Identity:** premium, dependable airport transfers; clean, contemporary, globally credible.
- **Palette:** electric blue actions, deep navy structure, white/off-white surfaces, understated blue tints. Dark mode replaces pale surfaces with near-black navy and brighter foreground text.
- **Typography:** **Geist** drives the PWA's dashboard, booking, authentication and operations UI. **DM Sans** appears in the public marketing/landing design's larger headlines and controls; **Urbanist italic** appears as a landing-page accent. Use **Geist Mono** for selected codes, references or operational data when the design calls for it.
- **Visual treatments:** generous breathing room; rounded cards; strong form hierarchy; muted dividers; concise status chips; restrained gradients; authentic airport, vehicle and business-travel imagery on marketing surfaces.
- **Navigation:** desktop side navigation in account and admin views, compact bottom navigation in mobile customer views; both must reflect the active destination.

## 2. Design foundations

### 2.1 Colors

The table uses semantic token names proposed for implementation. Exact hex values come from colors observed in the Figma artwork (including the shared public site and application screens); the semantic names are not claimed to be pre-existing Figma variables.

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `brand.primary` | `#0B5CFF` | `#0B5CFF` | Main action/accent blue |
| `brand.primaryStrong` | `#0647D6` | `#2E70FF` | Darker light-mode / brighter dark-mode blue treatment |
| `brand.onPrimary` | `#FFFFFF` | `#FFFFFF` | Primary button text |
| `text.primary` | `#0A1424` | `#EEF2F8` | Headings and content |
| `text.secondary` | `#5E697C` | `#C3CBD8` | Secondary descriptions |
| `text.muted` | `#8E99AB` | `#8E99AB` | Helper and less prominent labels |
| `text.label` | `#364154` | `#C3CBD8` | Form labels and metadata |
| `surface.base` | `#FFFFFF` | `#0B111C` | Main surfaces/cards, as appropriate |
| `surface.page` | `#F6F8FB` | `#05080F` | Page background |
| `surface.subtle` | `#F3F5F9` | `#111826` | Secondary panels/sections |
| `surface.brandTint` | `#E9F1FF` | `#121A2C` | Selected/pale-blue supporting surfaces |
| `surface.segmented` | `#EBEFF5` | `#182132` | Segmented tracks / grouped controls |
| `border.subtle` | `#CBD3DE` | `#2B3548` | Dividers and outlines |
| `status.success` | `#007A55` | `#00D492` | Positive/confirmed indications |
| `status.danger` | `#C10007` | `#FF6467` | Critical/negative indications |
| `status.warning` | `#FFB900` | `#FFB900` | Cautions requiring attention |

Other observed colors may appear in illustrations or state treatments. Do not apply success/error colors indiscriminately; use them by meaning. For readability, test semantic combinations for sufficient contrast and adjust only where required.

**Marketing-specific treatments:** The landing-page CTA uses a `#0B5CFF → #073799` blue gradient with a `#1967DE` border; the airport hero uses a deep `#0B1222` overlay; fleet photography overlays fade into `#002374`. The landing booking inputs use `#E4EFFF`. These are *marketing-area treatments*, not defaults for all authenticated forms.

### 2.2 Typography

| Role | Family / weight | Typical sizes | Notes |
| --- | --- | --- | --- |
| App page title | Geist Medium 500 / SemiBold 600 | 22–32 px | Customer and admin headings |
| App section/card heading | Geist Medium 500 / SemiBold 600 | 17–22 px | Summary cards, forms, panels |
| App body and controls | Geist Regular 400 / Medium 500 | 13–15 px | Primary UI text |
| App label and metadata | Geist Regular 400 / Medium 500 | 11–13 px | Tables, field labels, captions |
| App identifiers | Geist Mono Regular/Medium | 11–14 px | Booking refs, codes, data labels where shown |
| Landing hero heading | DM Sans Medium 500 | ~78 px | Desktop marketing only; responsive scale required |
| Landing section heading | DM Sans or Geist Medium 500 | 48–60 px | Marketing headings |
| Landing fleet title | DM Sans Medium 500 | 24 px | Photo card titles |
| Landing small accent | Urbanist Italic | ~15 px | Hero support sentence |

Use comfortable body line height (roughly 1.45–1.6), intentional emphasis, and actual font files or supported webfont delivery. Do not carry the landing hero's compressed line height into app UI. Typical weights observed: 400/500/600.

### 2.3 Spacing, layout and shape

- **Base spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64 px. Use multiples consistently instead of isolated one-off values.
- **Desktop application artboards:** commonly **1250 px wide**. Marketing artboards also use **1250 px**. Use responsive containers rather than fixed-viewport widths.
- **Mobile application artboards:** **402 px**; a separate public marketing mobile artboard is **428 px**. Treat these as reference canvases, not rigid breakpoints.
- **Radii observed throughout app:** 8, 12, 16, 24, 28 and 30 px, plus full pills. Default shared input/card radius should follow the specific repeated component; do not make every element 30 px.
- **Controls:** full-width where needed, with consistent focus/error/disabled states and enough room for labels, currency, and passenger counts.
- **Layout:** sidebar + content on desktop; stacked content and bottom navigation on mobile customer screens; cards and tables respond without horizontal page overflow.
- **Elevation:** subtle borders and restrained shadows. The landing's large blue CTA uses a stronger blue-tinted drop shadow; application surfaces generally favor borders/panels over conspicuous shadows.
- **Iconography:** compact line icons; commonly ~16–20 px. Keep stroke language consistent and provide accessible labels for icon-only actions.

### 2.4 Component states and modes

Support default, hover (where applicable), focus-visible, active/selected, disabled, loading, success, warning, error, and empty states. Provide actual light and dark theme tokens, not a simple color inversion. The Figma file includes explicit light-mode and dark-mode application designs; use each mode's actual colors for common elements. On the mobile customer experience, preserve the persistent Home / My trips / Wallet / Account bottom-nav pattern when appropriate.

## 3. Reusable component patterns — across the PWA

| Component | Design/usage requirements |
| --- | --- |
| **Brand and app shell** | Consistent `TheTransporter.co` wordmark; desktop sidebar/top account controls for customer, business and operations views; compact mobile shell. |
| **Buttons** | Primary blue filled/gradient where shown; secondary neutral or outlined; danger for destructive actions; text/link and icon variants; loading/disabled states. |
| **Form inputs** | Explicit labels, helper/error text, optional fields, select/combobox, searchable location fields, flight number, date/time, file upload, phone and password input. |
| **Segmented controls / tabs** | Clearly highlighted selection for booking type, account type, trip lists, settings, and admin table filters. |
| **Steppers/counters** | Minus / quantity / plus for passengers and baggage, with constraints from booking rules; not decorative. |
| **Cards and panels** | Rounded information containers with title, optional icon, body, metadata, actions and consistent padding. Applied to wallet, rewards, trips, business billing and admin summary. |
| **Status badges** | Distinguish Confirmed, Driver assigned, Completed, Cancelled, Pending, and other operational statuses by text plus restrained semantic color; don't rely solely on color. |
| **Trip item / itinerary card** | Date/time, pickup/drop-off direction, locations, flight information, vehicle, amount, status and action; condensed on mobile. |
| **Booking progress stepper** | Five steps: Trip → Flight → Travellers → Vehicle → Pay. Show current/completed steps and a clear back/continue action. |
| **Vehicle selection** | Sedan, SUV and Bus cards with model examples, passenger and bag capacity, total price, fit and selected state; business and individual flows share visuals. |
| **Price summary** | Structured line items, optional extras/rewards, total, payment source and clear currency formatting (`₦` as shown). |
| **Payment method** | Card/other available method, wallet and business invoice alternatives where applicable; support selection and explanatory details. |
| **Wallet / rewards** | Balance/stat cards, activity rows, tier progress and redemption dialogs with clear amount/point breakdowns. |
| **Trip status timeline** | Booked → Assigned → En route → Arrived → Done (as represented in the mobile trip-detail view); status with timestamps and progress. |
| **Ride phrase disclosure** | Concealed by default, reveal/hide and copy actions, explanatory safety text; not shown as plain text in summary lists. |
| **Tables and filters** | Admin/customer datasets, sortable columns where appropriate, search, status filters, row actions and empty states. Mobile needs an adapted card/scrollable treatment. |
| **Modal/dialog** | Rounded overlay, clear title, supporting copy, fields as applicable, Cancel and confirm/destructive actions. Examples include refund/cancellation, redemption and admin add/edit forms. |
| **Toast / feedback** | Inline/overlay acknowledgements for save, copy, booking and payment outcomes; do not communicate success only with a color shift. |

Use the approved assets and visual treatment for marketing hero, fleet imagery, business banner and vehicles. The app's operational cards and tables do not need those photographic treatments.

## 4. Screen families and patterns

These screen families were identified across the Figma file, not inferred solely from the landing page. Screens are examples of how shared tokens/components are composed; this spec is **not** a screen-by-screen functional requirements document.

### 4.1 Public marketing and entry

- Desktop and mobile landing-page layouts; hero, header, booking entry, fleet cards, process steps, business marketing panel and footer.
- Public CTA buttons, blue-gradient treatments, high-contrast photographic overlays and simplified booking mode selection.
- **Auth screens:** individual/business account creation, log-in, password reset; labeled fields, validation help, alternate account types and testimonial/support panel on desktop.

### 4.2 Customer account (individual)

- **Home/dashboard:** upcoming ride summary, book-a-transfer action, wallet/points indicators and trip cards.
- **My trips:** upcoming/past/cancelled tabs, reference/flight search, list cards and empty state.
- **Trip details:** flight, terminal, pickup time/location, driver/vehicle, ride phrase, chronological status, receipt/payment and cancellation options when available.
- **Wallet:** available balance, top-up, spent/refunded totals and activity ledger.
- **Rewards:** tier, points balance/progression, earning rules and redeem confirmation.
- **Account/settings:** profile fields, appearance preference (Light / Dark / System), saved places and account-type options.

### 4.3 Booking and checkout

- **Step 1 — Trip:** pickup/drop-off/round-trip cards, area and full address, optional landmark, price estimate.
- **Step 2 — Flight:** flight number, auto-filled airline/terminal where available, date/time and optional e-ticket attachment.
- **Step 3 — Travellers:** lead traveller and phone, passenger/baggage steppers, optional meet-and-greet and other extras.
- **Step 4 — Vehicle:** selectable Sedan/SUV/Bus with capacities, pricing and selected-state summary.
- **Step 5 — Pay:** itinerary and party review, editable sections, rewards, fare breakdown, wallet or other payment options, confirmation.
- **Post-booking:** booking reference, confirmation status, ride phrase, flight/pickup details and available trip actions.

Keep the stepper, field treatments, total/estimate presentation and navigation consistent for both individual and business customers; change content/payment options according to account context.

### 4.4 Business account

- Business sign-up and business dashboard with company identity.
- Book a transfer for another traveller; company traveller choice and relevant company context.
- Business tab: company spend/statement, invoices, credit/wallet balance, team/cost-centre metadata and actions.
- Shared trip, account, wallet and rewards patterns, with business-specific language and billing options.
- Checkout supports **company invoice** and **wallet** selection where designed.

### 4.5 Operations/admin portal

- **Overview:** metric/stat cards, operational activity and key booking/refund totals.
- **Bookings:** searchable/filterable dense table, driver assignment and status workflows.
- **Refunds:** cancellation/refund queue, approval statuses, policy descriptions and confirmation dialogs.
- **Pricing:** zone × vehicle fare table and additional charge/rule controls.
- **Fleet:** vehicle types, counts/availability, drivers and add/edit vehicle/driver dialogs.
- **Customers:** individual/business customer table with spend, wallet, points and search/filter.
- **Airports & airlines:** terminal detail, airline mappings, flight schedule and add/edit dialogs.
- **Settings:** cancellation/refund, waiting/scheduling and program policy controls.

Use a compact **operations-specific sidebar**, consistent table/card density, and high-clarity data presentation. Keep large marketing gradients and photography out of dense admin tables.

### 4.6 Responsive behavior

- **Desktop:** sidebar navigation, multi-column sections, aligned information cards and full data tables.
- **Mobile (402 px reference):** customer bottom navigation, stacked booking steps, compact trip cards, one-column field flows and sticky/prioritized primary actions when appropriate.
- **Public marketing mobile (428 px reference):** reflow hero, booking form, fleet and business panels; keep readable text over imagery.
- **Mobile gaps:** the Figma `APP LIGHT MODE / MOBILE` section contains customer/mobile flows but not every business and admin screen. Use existing app components and semantics for missing widths; do not claim unshown screens were explicitly designed.

## 5. BoardUI usage

**BoardUI is an optional implementation library, not a replacement for the Transporter appearance.** Choose its accessible primitives when they match the required interaction and reskin them to these semantic tokens. Avoid copying default BoardUI brand colors, font scales or radii unchanged.

| Transporter need | Suggested BoardUI-style primitive |
| --- | --- |
| Primary/secondary/destructive actions | Button, icon button |
| Booking/account mode switches | Tabs or segmented-control pattern |
| Searchable destination, terminal, traveller | Combobox / Select |
| Flight dates and scheduled times | Date Picker + time field |
| Passenger and baggage controls | Number Field / composed stepper |
| Authentication, profile, pricing forms | Input, label, field-error, checkbox, switch |
| Refund, redemption and admin edit overlays | Dialog / Modal |
| Trips, rewards and operations filters | Tabs, Select, table/pagination components |

Implement the **branded application shell, five-step booking composition, trip timeline, ride-phrase disclosure, fleet imagery, pricing summary and operations dashboards** as Transporter-specific compositions over suitable primitives. Preserve keyboard/focus/label behavior and dark-mode support. Confirm the current BoardUI package/component names before installation: the table describes component *roles*, not guaranteed package exports.

BoardUI reference: https://www.boardui.com/components
