# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next 16 App Router, React 19, Tailwind CSS v4 (user's choice). Engineering standard: `STANDARD_FRONTEND_PLAN_GUIDE.md`.

## Users

Pet owners (mostly dog and cat owners) looking for a veterinary clinic they can trust: comparing clinics, checking services, and booking a first visit or routine care.

## Product Purpose

PetCare+ is a single veterinary clinic brand. The website makes the clinic's services, team and track record legible and gets owners to request an appointment. Success = appointment requests submitted.

## Positioning

One clinic, one team: preventive wellness through advanced treatment (surgery, dental, boarding) under one roof, delivered by the clinic's own vets. Not a marketplace or directory.

## Capabilities and Constraints

- Appointment requests are submitted through a form (name, email, phone, service, preferred date, message). There is no booking backend yet: `/api/appointments` validates and accepts the request; wiring it to a real system is open.
- No user accounts, pricing or online payments.
- Images are Unsplash stock photos (free licence), served via `next/image`.

## Brand Commitments

- Name: **PetCare+**. The visual direction is pinned to the user's supplied reference design (deep teal, scalloped edges, rounded display type, giant footer wordmark).

## Evidence on Hand

- **SAMPLE, replace before launch:** all statistics (15K+ pets treated, 20+ specialists, 10+ years, 4.9 rating, +32% growth), vet names and roles, testimonials, phone/email/address. They live in `src/features/clinic/clinic.constants.ts`.
- No real logo file; the wordmark is set in type.

## Product Principles

1. Trust before persuasion: show the people and the care, then ask for the booking.
2. Booking is never more than one click away.
3. Plain, warm language; no medical jargon without explanation.

## Accessibility & Inclusion

WCAG 2.2 AA: semantic landmarks, keyboard-operable interactions, visible focus, alt text on every photo, reduced-motion respected.
