@AGENTS.md

# PetCare+ — veterinary clinic landing page

Engineering standard: [STANDARD_FRONTEND_PLAN_GUIDE.md](STANDARD_FRONTEND_PLAN_GUIDE.md). Product truth: [PRODUCT.md](PRODUCT.md). Design system: [DESIGN.md](DESIGN.md).

## Stack

Next 16 (App Router, `cacheComponents` on) · React 19 · Tailwind v4 · react-hook-form + zod · lucide-react · vitest.

Deliberately **not** installed (guide §8.1 deviations, add when the need appears):
- TanStack Query / axios / zustand: one POST, no server state to cache. Add with the second endpoint.
- framer-motion: all motion is CSS.
- cva / Radix: no multi-variant badges or dialogs yet.

## Commands

`npm run dev` · `npm run build` · `npm run lint` · `npx tsc --noEmit` · `npx vitest run`

## Folder tree

```
src/app/                    routes only: layout, page (renders HomeView), api/appointments
src/components/ui/          L1 primitives: Button, Field controls
src/features/clinic/        clinic domain: services, vets, stats, testimonials (+ HomeView, the L4 View)
src/features/appointments/  appointment requests: schema, api, form
src/lib/utils.ts            cn()
src/app/globals.css         tokens + utilities: shell, scallop-top/bottom/y (band edges), .reveal (scroll fade)
```

## Domain map

| Domain | Owns | Endpoint |
|---|---|---|
| clinic | services, vets, stats, testimonials, contact info (static content in `clinic.constants.ts`, SAMPLE) | none |
| appointments | appointment request schema, submit, form | `POST /api/appointments` |

## Gotchas

- Next 16 images: use `preload` (not `priority`); `images.qualities` is `[75]` by default; remote hosts are allowlisted in `next.config.ts`.
- With `cacheComponents`, avoid `new Date()` during render; compute dates in handlers/validation.
