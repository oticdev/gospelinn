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
- **Conferences** — highlights STRASODA, MELEC, FELISO, and the Alabaster Women Convention, with an info modal containing registration details and the ministry phone number.
- **Encounter Service** — dedicated feature for the Thursday Encounter Service.
- **Sermons & Media Hub** — searchable, filterable archive of sermons with embedded video playback and audio/download actions.
- **Giving Modal** — displays the ministry's UBA account (name, bank, account number) with a copy-to-clipboard button for direct bank transfer.
- **Pastor Connect Modal** — social links for Pastor Ameh Amana plus a preaching-engagement request form (posts to a Google Apps Script endpoint, falling back to a mailto link).
- **Social Links** — colourful brand icons (Telegram, Facebook, Instagram, YouTube) for Gospel Inn Ministry in the footer.
- **Accessible modals** — all dialogs close on Escape/backdrop click and expose `role="dialog"` + `aria-modal`.
- **Responsive design** — mobile-first Tailwind layout with glass-panel cards and gradient glows.

## Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | Next.js 16 (App Router)             |
| UI          | React 19, Tailwind CSS 4            |
| Animation   | framer-motion                       |
| Icons       | lucide-react                        |
| Extras      | canvas-confetti, clsx, tailwind-merge |
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
│   ├── globals.css        # Global styles, theme tokens, glass-panel utilities
│   ├── layout.tsx         # Root layout & metadata
│   └── page.tsx           # Single-page composition of all sections
└── components/
    ├── Navbar.tsx
    ├── Hero.tsx
    ├── PastorSpotlight.tsx
    ├── WeeklySchedule.tsx
    ├── Conferences.tsx
    ├── EncounterService.tsx
    ├── SermonsHub.tsx
    ├── GivingModal.tsx
    ├── PastorConnectModal.tsx
    ├── Footer.tsx
    └── Logo.tsx
```

## Configuration

- **Preaching form endpoint** — `PastorConnectModal` posts invitations to a Google Apps Script webhook. Override it with an environment variable:

  ```bash
  NEXT_PUBLIC_PREACHING_FORM_ENDPOINT=https://your-script.googleapps.com/exec
  ```

  If unset, the form falls back to a `mailto:office@gospelinnministries.com` email.

## Customization

- Brand colors are defined as theme tokens in `src/app/globals.css` (`@theme`): `gim-oxblood`, `gim-skyblue-bright`, `gim-dark`, etc. Components reference them as Tailwind classes (e.g. `bg-gim-oxblood`, `text-gim-skyblue-bright`), so re-theming is a one-file change.
- Social handles live in `src/components/SocialLinks.tsx`; the ministry phone number appears in `Footer.tsx` and `Conferences.tsx`.
- Sermon catalog lives in the `sermons` array in `src/components/SermonsHub.tsx`; service listings (with recurrence data for `.ics` reminders) live in `src/components/WeeklySchedule.tsx`; bank details live in `src/components/GivingModal.tsx`.
- Metadata (title, description, keywords) is defined in `src/app/layout.tsx`.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) — learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) — an interactive Next.js tutorial.
