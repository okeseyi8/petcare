# Standard Frontend Plan Guide

> Portable engineering standard for our React / Next frontends. Framework-agnostic.
>
> Each project carries its own `CLAUDE.md` with that project's stack, folder tree, and domain map.
> Everything conceptual lives here. Amend by PR.

**Contents**

| § | Section |
|---|---|
| 0 | [Design Quality Bar](#0-design-quality-bar) |
| 1 | [Finding Domains](#1-finding-domains) |
| 2 | [The Layering Law](#2-the-layering-law) |
| 3 | [Folder Architecture](#3-folder-architecture) |
| 4 | [Naming](#4-naming) |
| 5 | [Where Logic Lives](#5-where-logic-lives) |
| 6 | [Redundancy — Necessary vs. Not](#6-redundancy--necessary-vs-not) |
| 7 | [Data, State, Forms, Async](#7-data-state-forms-async) |
| 8 | [Packages](#8-packages) |
| 9 | [Performance at Scale](#9-performance-at-scale) |
| 10 | [Anti-Over-Engineering](#10-anti-over-engineering) |
| 11 | [Review Checklist](#11-review-checklist) |

---

## 0. Design Quality Bar

Any task that designs, builds, restyles, or polishes a frontend surface — page, component, layout,
form, modal, empty state, table, motion, responsive behavior — is held to a senior standard, not
"it renders."

- **Match the surrounding code.** Mirror the existing naming, spacing, class ordering, and
  composition before introducing anything new.
- **Reuse before you build.** Check `components/ui/` then `components/shared/` first. Never
  hand-roll a button, input, select, dialog, or table that already exists.
- **Every async surface handles loading, empty, and error** (§7.4). A blank screen while data loads
  is a defect.
- **No decorative noise.** Animation, color, and shadow must communicate state or hierarchy, not
  ornament it.
- **Invoke design skills before writing UI code, not after.** If skills such as `emil-design-eng`
  (component polish, motion) or `impeccable` (hierarchy, IA, accessibility) are available in the
  session, load them first — their guidance overrides generic LLM design instincts. Load whichever
  are present; they are complementary. Do not hard-code a skill name into a workflow: verify what
  is installed rather than assuming.
- Skip this bar only for pure non-UI work (API modules, types, store logic, build config).

**Tailwind class order:** layout → spacing → sizing → typography → color → border/radius → state
variants. Compose conditionals with `cn()`.

---

## 1. Finding Domains

> The question this section answers: **you look at a product — how do you decide "this is a domain",
> and how do domains relate to pages?**

### 1.1 What a domain is

A domain is a **noun the business says out loud, that owns its own lifecycle or identity.**

It is not a page. It is not a database table. It is not a screen.

The sharpest test: **domains survive a redesign; pages don't.** Redesign the entire product —
`bookings` still exists. `BookingsTable`, `BookingsPage`, and `BookingsToolbar` do not.

### 1.2 The exercise — six steps

**Step 1 — Write the product as sentences the business would say.**

> "A hotel owner lists rooms. A guest books a room. A guest pays for a booking. Staff check the
> guest in. A guest reviews the hotel afterwards."

**Step 2 — Circle the nouns.** hotel, owner, room, guest, booking, payment, staff, review.

**Step 3 — Delete the UI nouns.** If the noun only appeared because you pictured a screen —
toolbar, tab, card, modal, sidebar, "dashboard" as a layout — it is not a domain. Domain nouns
predate your software.

**Step 4 — Keep nouns with a lifecycle *or* an independent identity.**

- *Lifecycle:* Booking moves pending → confirmed → checked-in → completed → cancelled. Domain.
- *Identity:* Guest has no state machine but has its own record, history, and endpoints. Domain.
- Neither? Not a domain.

**Step 5 — Merge nouns that always change together.** If you cannot change A without changing B in
the same commit, they are one domain. (`Booking` + `BookingPayment` → one. `Booking` + `Room` → two.)

**Step 6 — Check the backend, then apply the delete test.**

One endpoint group ≈ one domain. If your model and the API's model disagree, resolve it *before*
writing code — a frontend that disagrees with its API duplicates translation logic forever.

Then: **could you delete this folder and still have a coherent, smaller product?** If deleting
`reviews` breaks `bookings`, the boundary is in the wrong place.

### 1.3 Three signals it is NOT a domain

| Signal | Example | What it actually is |
|---|---|---|
| It's a layout or a viewport | `dashboard`, `sidebar`, `landing-page` | A page that composes domains |
| It's a verb, not a noun | `checkout`, `onboarding` | A flow *across* domains |
| It only lives inside one domain's flow and has no endpoints | `cart` in store, `room-type` in rooms | A sub-part of that domain |

**The aggregate exception.** A cross-domain view *is* a domain when the backend gives it its own
endpoint (`/dashboard/summary`) — it's an aggregate read model with its own shape. With no endpoint,
it is a page that composes.

### 1.4 Domains ↔ pages is many-to-many

This is the whole reason you organize by domain and not by page.

```
One domain  → serves   → 1..N pages
One page    → composes → 1..N domains
```

**One domain, four pages:** a `fees` domain can serve Bank Collection, Fee Collection, Collect Fees,
and Fee Defaulters — four routes, one folder. File by *page* and that domain's logic smears across
four folders, so every fee change becomes a four-folder change.

**One page, four domains:** an owner dashboard composes bookings + rooms + payments + wallet. It
owns none of them.

**A domain with no page at all** is normal — `support` and `notifications` often live entirely in
sheets. Further proof domains aren't pages.

### 1.5 The mapping rule

```
route  →  renders exactly ONE View
feature/<domain>/  →  owns that domain's data, types, and components

A View may compose several domains.  A domain never imports a page.
```

### 1.6 Role scoping

When one domain serves two roles with different endpoints and permissions, split at the role level
and **share the interfaces**: `features/hotel-owner/bookings/` and `features/user/bookings/` both
import one `IBooking`. See §6.

---

## 2. The Layering Law

Five levels. **A level may only import from levels below it.** Never sideways at L1–L2, never upward.

| L | Name | Lives in | Knows about | Never |
|---|---|---|---|---|
| **1** | Primitives | `components/ui/` | Nothing. Props in, JSX out. | Domain types, fetching, business rules |
| **2** | Patterns | `components/shared/` | L1 only | Domain types, `.api.ts`, feature imports |
| **3** | Feature components | `features/<…>/components/` | Its own domain + L1/L2 | Direct HTTP, other features' internals |
| **4** | Views | `features/<…>/components/<X>View.tsx` | Its feature's hooks + L1–L3 | Being imported by anything but a route |
| **5** | Routes / Pages | `app/**/page.tsx` or route element | Routing, params, metadata | Business logic, JSX beyond View + shell |

**Why it works:** L1 and L2 are domain-blind, so they are reusable forever and never churn when
business rules change. All churn lands in L3–L4. One requirement change = one feature folder.

**The L2 test:** a component belongs in `components/shared/` **only if you can describe it without
naming a domain noun.** "A table with sorting and pagination" → L2. "A table of bookings" → L3. If
you cannot describe it domain-free, it is a feature component in the wrong folder.

**Enforce it** with `import/no-restricted-paths` in ESLint:

```
components/ui      ✗ components/shared, features, app
components/shared  ✗ features, app
features/*         ✗ app, other features' internals
```

Until that lands, it is a review-blocking rule.

---

## 3. Folder Architecture

Feature-first. A domain's API, hooks, types, constants, and components live in **one folder**.

```
src/
├── app/                          # ROUTES ONLY. No component is defined here.
├── features/
│   └── [<role>/]<domain>/
│       ├── components/           # flat PascalCase.tsx
│       ├── <domain>.api.ts
│       ├── <domain>.hooks.ts
│       ├── <domain>.interfaces.ts
│       ├── <domain>.constants.ts
│       ├── <domain>.schema.ts
│       └── <domain>.utils.ts
├── components/
│   ├── ui/                       # L1 — flat files
│   └── shared/                   # L2
└── lib/
    ├── http.client.ts
    ├── query-keys.ts
    ├── env.ts
    ├── utils.ts                  # cn() only
    └── store/                    # global client state only
```

**Rules**

- A feature folder is deletable in one commit. If deleting it breaks an unrelated feature, the
  dependency is wrong — hoist the shared piece to `features/shared/` or L2.
- Feature→feature imports go through the other feature's public surface (`.api.ts`,
  `.interfaces.ts`) — never into its `components/`.
- Domain-local shared pieces live in `features/<role>/_shared/`. Promote to L2 only when a **second
  role** needs it.

---

## 4. Naming

### 4.1 Types — `I` and `T`

**The prefix mirrors the TypeScript keyword.** Mechanical, zero judgment:

```ts
interface IBooking { … }          // interface → I
interface IBookingRowProps { … }  // props are interfaces
type TBookingStatus = "pending" | "confirmed" | "cancelled";  // type → T
type TCreateBooking = z.infer<typeof createBookingSchema>;    // inferred → T
```

Reading `IFoo` you know it is an object shape you can extend. Reading `TFoo` you know it is a union,
alias, or inferred type. Never `IFooType`, never a bare name.

Avoid `enum` — use an `as const` object plus a `T` union (smaller output, no runtime cost).

### 4.2 Files — dotted suffixes

The suffix says what kind of module it is before you open it, and it clusters by domain in the file
tree (`bookings.api.ts` and `bookings.hooks.ts` sort together; `useBookingService.ts` sorts under
"u", away from everything it belongs with).

| Kind | Pattern | Example |
|---|---|---|
| Component | `PascalCase.tsx` | `BookingsTable.tsx` |
| API module | `<domain>.api.ts` | `bookings.api.ts` |
| Hooks | `<domain>.hooks.ts` | `bookings.hooks.ts` |
| Types | `<domain>.interfaces.ts` | `booking.interfaces.ts` |
| Store | `<domain>.store.ts` | `auth.store.ts` |
| Constants | `<domain>.constants.ts` | `bookings.constants.ts` |
| Pure helpers | `<domain>.utils.ts` | `booking.utils.ts` |
| Zod schemas | `<domain>.schema.ts` | `booking.schema.ts` |
| Clients | `<name>.client.ts` | `http.client.ts` |

One convention per folder. A `helpers/` directory running `api.helpers.ts`, `booking-display.ts`,
and `phone.ts` side by side is three conventions and zero discoverability.

### 4.3 Components are flat files

A component is `PascalCase.tsx`, **not** `PascalCase/index.tsx`. It becomes a folder only when it
earns a **second file** (sub-parts, styles, tests).

Folder-per-component costs, all of them daily:

- Twenty editor tabs all named `index.tsx`.
- `Cmd+P BookingsTable` finds `index.tsx` — you navigate by directory, not by name.
- Stack traces and React DevTools show `index`.
- Barrel-shaped imports defeat tree-shaking.

### 4.4 Don't repeat the path in the name

`features/user/your-hotel-list/components/BookingRow.tsx` — not `YourHotelBookingRow.tsx`. The
folder already said it. The import site reads `your-hotel-list/BookingRow`, which is clearer.

### 4.5 Code

| Entity | Convention |
|---|---|
| Query hooks | `useGet<Entity>` — `useGetRooms`, `useGetBooking` |
| Mutation hooks | `use<Verb><Entity>` — `useCreateRoom` |
| Orchestration hooks | `use<Thing>` — `useHotelSetup` |
| Store hooks | `use<Domain>Store` |
| Components | PascalCase, named export matching the filename |
| Handlers | `handle<Action>` |
| Booleans | `is` / `has` / `should` |
| Constants | `UPPER_SNAKE_CASE` |

---

## 5. Where Logic Lives

> **Is putting logic in the component good or bad?** It depends on exactly one thing: whether the
> logic can outlive the component.

### The decision test — first "yes" wins

1. **Does it touch the network?** → `<domain>.api.ts`. Always. No exceptions.
2. **Is it pure (input → output, no React)?** → `<domain>.utils.ts`.
3. **Would I have to render a component to test it?** No → `.utils.ts`. Yes, but it renders nothing
   itself → `.hooks.ts`.
4. **If I delete this component tomorrow, does the logic die with it?**
   Yes → **leave it in the component.** No → extract to `.hooks.ts`.

### Keep it in the component when

- It is UI state only: open/closed, active tab, hover, focus, local step index.
- It is derived from props with no I/O.
- Exactly one component uses it and always will.
- It is under ~20 lines.

```tsx
// Correct. Do not extract this.
export function BookingsToolbar({ onSearch }: IBookingsToolbarProps) {
  const [query, setQuery] = useState("");
  const handleChange = (v: string) => { setQuery(v); onSearch(v); };
  return <SearchInput value={query} onChange={handleChange} />;
}
```

Extracting that into `use-bookings-toolbar.ts` buys nothing and costs a file, an import, and a
context switch. **A `useState` is not a hook candidate.** Premature hook extraction is the most
common form of over-engineering in React codebases.

### Extract to `.hooks.ts` when

- It **orchestrates**: server call + form state + navigation + toast + optimistic update.
- Two or more components need it. *Two* — not one that "might later".
- It owns an effect or subscription: geolocation, clipboard, interval, intersection observer.
- The component would exceed ~150 lines with it inline.
- You want to test it without rendering.

### Extraction is right; distance is the bug

Splitting logic out of its UI is good. Filing it in a different neighbourhood is not.

> **Extract by responsibility. Colocate by feature.**

A hook in `lib/hooks/<role>/` whose only consumers live in `components/<role>/<domain>/` makes every
change a two-folder edit across opposite sides of the tree. Under §3 they sit together — same
extraction, one folder.

---

## 6. Redundancy — Necessary vs. Not

> **Duplicate the binding, share the shape.**
>
> **If two components differ only by a constant, they are one component and a constant.**

### Necessary — keep these duplicated

| Duplication | Why it stays |
|---|---|
| Per-role API modules for one domain | Different endpoints, permissions, and response shapes. Merging produces a god-module with `if (role)` inside every function. Duplicate the *binding* — both import one shared interface. |
| Per-role layouts and shells | They genuinely diverge and will keep diverging. |
| Shape-specific skeletons | A skeleton's entire job is to match *one* layout. A "generic" skeleton mismatches and causes layout shift — that is CLS, a real user-facing metric. Duplication here is the feature. |
| Route shell + View (RSC frameworks) | Not redundancy — it is the server/client boundary. Collapsing it forces the whole route client-side. |
| Per-domain Zod schemas | Shared "base" schemas couple unrelated forms and break independently. |

### Unnecessary — collapse these

| Smell | Fix |
|---|---|
| N status badges differing only by colour | **1** `<StatusBadge tone>` in L2 + a `STATUS_TONE` map per domain in constants |
| N KPI / stat cards | **1** `<KpiCard>` in L2 |
| N toolbars | **1** `<Toolbar>` shell + per-domain filter config from constants |
| N tables | Column definitions per domain feeding one `<DataTable>`. The table is L2; the columns are data. |
| Names repeating their path | Drop the prefix (§4.4) |
| Two libraries doing one job | Pick one, delete the other (§8.3) |

### The rule of three

Do not abstract on the second occurrence. Wait for the third — by then you can see which parts
actually vary. Abstracting at two produces a component with a boolean prop that nobody understands
six months later.

---

## 7. Data, State, Forms, Async

### 7.1 Data

- **One HTTP client** (`lib/http.client.ts`). Never a second `axios.create()`. Token attachment,
  `FormData` handling, 401 behavior, and error normalization live here and only here.
- **Query keys come from `lib/query-keys.ts`.** Freehand strings are prohibited — a typo fails
  silently and produces stale UI, the hardest class of bug to notice.

```ts
export const QUERY_KEYS = {
  bookings: {
    all: ["bookings"] as const,
    detail: (id: string) => ["bookings", id] as const,
    byHotel: (hotelId: string) => ["bookings", "hotel", hotelId] as const,
  },
} as const;
```

  Hierarchical arrays give prefix invalidation free: invalidating `["bookings"]` clears every
  booking query.

- **`<domain>.api.ts` is the only place HTTP happens.**
- Mutations `invalidateQueries` on success. Never call `refetch()` manually.
- **Toasts fire in the hook, with an opt-out:**

```ts
export function useCreateRoom(opts?: { silent?: boolean }) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: TCreateRoom) => httpClient.post("/rooms", payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.rooms.all });
      if (!opts?.silent) toast.success("Room created");
    },
    onError: (err) => { if (!opts?.silent) toast.error(err.message); },
  });
}
```

  Default feedback keeps call sites clean. `silent` exists because background refetches, bulk
  operations, and retry loops must not stack fifty toasts — a mandatory toast makes the hook
  unusable in exactly the cases that matter at scale.

- One toast module is the only toast API. Nothing imports the toast library directly except the
  provider that mounts it.

### 7.2 State

| State | Owner |
|---|---|
| Server data | TanStack Query cache |
| Global client state (auth session, sidebar, theme) | Zustand in `lib/store/` |
| Feature-scoped client state | Zustand in the feature folder |
| Ephemeral UI state | `useState` in the component |

Never put server data in Zustand. Never reach for Zustand when Query already caches it. Never add
Context for state one component owns.

### 7.3 Forms

React Hook Form + Zod via `zodResolver`. The schema is the single source of truth; the type is
**inferred** (`TCreateBooking`), never hand-written alongside it.

- Every field renders its error below the input.
- Submit disabled while `isPending`, with a loading label.
- File uploads keep the `File` in form state; convert to `FormData` only at the API boundary.
- Money inputs validate as positive and format on blur.

### 7.4 Async states — all three, always

| State | Mechanism |
|---|---|
| Loading | Shape-matched skeleton. A blank screen is a defect; a spinner where a skeleton fits is lazy. |
| Empty | A message **and a next-step CTA** |
| Error | Surfaced message + a retry path |
| Destructive action | Confirmation dialog before delete/cancel |
| Action in flight | Trigger disabled + loading label |

---

## 8. Packages

### 8.1 The standard stack

| Concern | Package | Notes |
|---|---|---|
| Server state | `@tanstack/react-query` v5 | All fetching, caching, invalidation |
| Client state | `zustand` v5 | `persist` for auth |
| Transport | `axios` | One instance |
| Validation | `zod` v4 | Schema is the source of truth |
| Forms | `react-hook-form` v7 + `@hookform/resolvers` | Resolved by Zod |
| Styling | `tailwindcss` v4 | Tokens as CSS variables |
| Class merge | `clsx` + `tailwind-merge` | The `cn()` helper |
| Variants | `class-variance-authority` | **The tool for collapsing N badges into 1** (§6) |
| Primitives | `@radix-ui/*` via shadcn | Never import Radix directly outside `components/ui/` |
| Tables | `@tanstack/react-table` v8 | Powers the shared DataTable |
| Icons | `lucide-react` | One icon set per project |
| Animation | `framer-motion` | Targeted micro-interactions only |
| Toasts | one library + one wrapper module | Never imported directly outside the provider |
| Dates | `date-fns` | Tree-shakeable; never Moment |

### 8.2 Per-project inventory

**Lunar SMS** — React 19 · Vite 7 · React Router 7

`@tanstack/react-query` `@tanstack/react-table` `zustand` `axios` `js-cookie` `zod`
`react-hook-form` `@hookform/resolvers` `tailwindcss` v4 + `@tailwindcss/vite` `clsx`
`tailwind-merge` `class-variance-authority` `tw-animate-css` · 12 × `@radix-ui/*` · `lucide-react`
`react-icons` `framer-motion` `react-hot-toast` `recharts` `date-fns` `react-day-picker`
`@tiptap/*` (react, starter-kit, pm, heading, underline) `xlsx` `jspdf` `jspdf-autotable`
`file-saver` `html2canvas` `html-to-image` `rc-progress` `react-circular-progressbar`

**Hospitality** — React 19 · Next 16 (App Router)

`@tanstack/react-query` `zustand` `axios` `next` `tailwindcss` v4 + `@tailwindcss/postcss`
`@radix-ui/react-dialog` `@radix-ui/react-select` `lucide-react` `react-icons` `framer-motion`
`sonner` `geist` `html-to-image` `tap-payment-popupjs`

**Shared by both:** `@tanstack/react-query` `zustand` `axios` `tailwindcss` `framer-motion`
`lucide-react` `react-icons` `html-to-image` `@radix-ui/react-dialog` `@radix-ui/react-select`

### 8.3 Gaps and duplicates — act on these

**Hospitality is missing packages its architecture assumes:**

| Missing | Needed for |
|---|---|
| `zod` + `react-hook-form` + `@hookform/resolvers` | §7.3 — forms currently hand-roll validation |
| `clsx` + `tailwind-merge` | `cn()` — referenced everywhere, installed nowhere |
| `class-variance-authority` | Collapsing the 5 status badges — precisely its job |
| `@tanstack/react-table` | A real DataTable instead of ~10 bespoke tables |

**Lunar is carrying duplicate libraries:**

| Duplicate | Keep |
|---|---|
| `react-circular-progressbar` — zero imports | Delete. (`rc-progress` draws circular, `@radix-ui/react-progress` backs the linear shadcn primitive — different shapes, both in use.) |
| `html2canvas` — never imported directly | Delete. jspdf pulls it in itself and `jspdf.html()` is unused. |
| `lucide-react` + `react-icons` — two icon sets | `lucide-react`; `react-icons` only for brand glyphs it lacks |

**Both are missing, in priority order:**

1. **Error monitoring** (Sentry). Without it, frontend failures at scale are invisible. Largest gap.
2. **Test runner** (Vitest + React Testing Library). Start with `.utils.ts` and `.api.ts` — pure
   functions and cache invalidation, where bugs are silent and expensive. This outranks every
   naming convention in this document.
3. **`.env.example`** committed.

### 8.4 Adding a dependency

Before installing, check the stack above doesn't already cover it. A new dependency needs: a job
nothing installed already does, active maintenance, and a bundle cost worth paying. Record it in
§8.2.

---

## 9. Performance at Scale

- Push the client boundary as low as possible; keep shells server-rendered where the framework
  allows.
- Lazy-load heavy leaves: charts, lightboxes, rich-text editors, maps.
- Images with explicit dimensions and a tight remote allowlist.
- **Server-side pagination above 100 rows.** Client-side sort/filter only below that.
- Import narrowly: `lodash/debounce`, never the barrel.
- `React.memo` only on list items with stable props that measurably re-render. Do not memo by
  default — it costs more than it saves on cheap components.
- **Budgets: LCP < 2.5s, CLS < 0.1, INP < 200ms.** Enforce in CI, or they are decoration.

---

## 10. Anti-Over-Engineering

Rules that exist to stop the codebase getting clever.

- **No barrel `index.ts` re-export files** — circular imports, defeats tree-shaking.
- **No `Component/index.tsx` for a single component.** (§4.3)
- **No hook for a single `useState`.** (§5)
- **No abstraction before the third occurrence.** (§6)
- **No Context for state one component owns.**
- **No generic wrapper with more than two boolean props** — four states means these are different
  components.
- **No `any`.** Use `unknown` and narrow. Exception: third-party ambient declarations.
- **No new dependency** where the stack already covers it.

---

## 11. Review Checklist

- [ ] Layering law respected? (§2)
- [ ] Any HTTP outside a `.api.ts`?
- [ ] Registry query key, not freehand? (§7.1)
- [ ] A hook extracted that should be inline — or inline logic 2+ components need? (§5)
- [ ] Is this the third occurrence, or the second? (§6)
- [ ] Does it differ from an existing component only by a constant? (§6)
- [ ] Loading, empty, and error all handled? (§7.4)
- [ ] Any new `any`, barrel file, or single-file `index.tsx` folder? (§10)
- [ ] Does the build pass?
