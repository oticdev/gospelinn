# Gospel Inn Ministry

A sanctuary of **Prayer, Discipleship, Encounter, and Spiritual Transformation** — the official website for Gospel Inn Ministry, led by Lead Pastor Ameh Amana.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=flat&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)

## Overview

This is a single-page marketing site that introduces visitors to the ministry, communicates the service schedule, highlights upcoming conferences, and surfaces past sermons. It is designed as a dark, elegant, cinematic landing page with a deep-navy (`#0B1120`) base, oxblood (`#6E0A1A`) accents, and sky-blue (`#38BDF8`) highlights.

Built with the Next.js App Router and deployed as a static-friendly React app.

## Features

- **Hero** — cinematic intro with ministry tagline and primary CTAs.
- **Pastor Spotlight** — profile of Lead Pastor Ameh Amana.
- **Weekly & Monthly Schedule** — Prayer School, Discipleship Class, Encounter Service, and the monthly Night of Encounter vigil, filterable by Weekly/Monthly, with "Set Reminder" buttons that download a real recurring `.ics` calendar file for import into Google, Apple, or Outlook.
- **Conferences** — seven flagship gatherings (Strategic Leadership, STRASODA, Alabaster Women, MELEC, FELISO, PPC, Children on Fire) with an info modal containing registration links or the ministry phone/WhatsApp.
- **Encounter Service** — dedicated feature for the Thursday Encounter Service.
- **Sermons & Media Hub** — the latest uploads from the ministry's YouTube channel, fetched server-side (cached 3 days) and searchable by title/description, with an embedded player.
- **Giving Modal** — displays the ministry's UBA account (name, bank, account number) with a copy-to-clipboard button for direct bank transfer.
- **Pastor Connect Modal** — social links for Pastor Ameh Amana plus a preaching-engagement request form. Flyers upload straight from the browser to Cloudinary using a server-issued signature; the request itself posts to a Google Apps Script endpoint, falling back to a mailto link if that is unconfigured or unreachable.
- **Social Links** — colourful brand icons (Telegram, Facebook, Instagram, YouTube) for Gospel Inn Ministry in the footer.
- **Accessible modals** — one shared `Modal` built on the native `<dialog>` element: top-layer rendering, focus trap, inert background, Escape/backdrop close, scroll lock and focus restore.
- **Timezone-correct schedule** — the countdown and `.ics` reminders are anchored to Africa/Lagos, so they are right for members abroad.
- **Responsive design** — mobile-first Tailwind layout with glass-panel cards and gradient glows.

## Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | Next.js 16 (App Router)             |
| UI          | React 19, Tailwind CSS 4            |
| Icons       | lucide-react                        |
| Language    | TypeScript 5                        |
| Package Mgr | pnpm 11                             |

## Getting Started

### Prerequisites

- Node.js 20+ and pnpm 11

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit the source.

### Production build

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── preaching-invitation/route.ts  # Validates + forwards the form to Apps Script
│   │   └── upload/sign/route.ts           # Issues Cloudinary upload signatures
│   ├── globals.css        # Global styles, theme tokens, glass-panel utilities
│   ├── layout.tsx         # Root layout & metadata
│   └── page.tsx           # Server component: fetches sermons, composes sections
├── components/
│   ├── Modal.tsx          # Shared <dialog>-based modal
│   ├── Navbar.tsx         # Owns the Giving modal
│   ├── Hero.tsx
│   ├── PastorSpotlight.tsx
│   ├── WeeklySchedule.tsx
│   ├── Conferences.tsx
│   ├── EncounterService.tsx
│   ├── SermonsHub.tsx
│   ├── YouTubePlayer.tsx
│   ├── GivingModal.tsx
│   ├── PastorConnectModal.tsx
│   ├── Footer.tsx
│   ├── SocialLinks.tsx
│   └── Logo.tsx
└── lib/
    ├── schedule.ts        # Service data + Africa/Lagos occurrence helpers
    ├── ics.ts             # RFC 5545 calendar file writer
    ├── youtube.ts         # Server-only YouTube Data API fetcher
    ├── contact.ts         # Office phone/email/WhatsApp/maps constants
    ├── rate-limit.ts      # Best-effort per-IP limiter for the form endpoints
    └── request-guards.ts  # Same-origin check + rate limit helper
```

## Configuration

Set these in `.env` locally and in the Vercel project settings for deployments. None of them need the `NEXT_PUBLIC_` prefix — they are only read on the server.

```bash
# Sermons (YouTube Data API v3)
YOUTUBE_API_KEY=...
YOUTUBE_CHANNEL_HANDLE=@gospelinnministries

# Preaching-invitation form → Google Apps Script web app
PREACHING_FORM_ENDPOINT=https://script.google.com/macros/s/.../exec

# Event-flyer uploads (signed, browser → Cloudinary)
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

- If `PREACHING_FORM_ENDPOINT` is unset the form falls back to a `mailto:office@gospelinnministries.com` email.
- If the Cloudinary variables are unset the form still works; flyers are skipped with a warning.
- Uploads land in the `preaching-invitations` folder and are restricted to images/PDFs by the signed `allowed_formats` parameter.
- The form endpoints have a same-origin check and a best-effort in-memory rate limit. For real abuse protection add a **Vercel WAF rate-limit rule** for `/api/*` in the project's Firewall settings.

## Customization

- Brand colors are defined as theme tokens in `src/app/globals.css` (`@theme`): `gim-oxblood`, `gim-skyblue-bright`, `gim-dark`, etc. Components reference them as Tailwind classes (e.g. `bg-gim-oxblood`, `text-gim-skyblue-bright`), so re-theming is a one-file change.
- Social handles live in `src/components/SocialLinks.tsx` (ministry) and `src/components/PastorConnectModal.tsx` (pastor); office phone, email, WhatsApp and map link live in `src/lib/contact.ts`.
- Service listings (days, times, recurrence for `.ics` reminders) live in `src/lib/schedule.ts`; conference listings in `src/components/Conferences.tsx`; bank details in `src/components/GivingModal.tsx`.
- Metadata (title, description, keywords) is defined in `src/app/layout.tsx`.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) — learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) — an interactive Next.js tutorial.
