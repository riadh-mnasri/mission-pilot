<div align="center">

<img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/shadcn%2Fui-latest-000000?style=flat-square" />
<img src="https://img.shields.io/badge/Claude_AI-Sonnet_4.6-8B5CF6?style=flat-square" />
<img src="https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel" />
<img src="https://img.shields.io/badge/License-MIT-22C55E?style=flat-square" />

# ⚡ MissionPilot

### AI-Powered Freelance Mission Prospecting

**Stop scrolling LinkedIn for hours. MissionPilot scans LinkedIn, Malt & Comet 24/7,
scores every opportunity against your stack, and drafts the perfect outreach message — in 5 minutes a day.**

[**🚀 Live Demo**](https://mission-pilot.vercel.app) &nbsp;·&nbsp; [**📊 Dashboard**](https://mission-pilot.vercel.app/dashboard) &nbsp;·&nbsp; [**🐛 Report a Bug**](https://github.com/riadh-mnasri/mission-pilot/issues)

</div>

---

## The Problem

As a Senior Freelance Tech Lead, you spend **8+ hours a week** doing this:

- 📜 Scrolling LinkedIn feeds full of irrelevant posts
- 🔍 Manually checking Malt, Comet, and WTTJ one by one
- ✍️ Writing the same prospecting messages over and over
- 😓 Missing opportunities because you found them 3 days too late

**MissionPilot eliminates all of that.**

---

## What It Does

| Feature | Description |
|---------|-------------|
| **24/7 Multi-Source Scan** | Monitors LinkedIn, Malt, Comet & Welcome to the Jungle around the clock |
| **AI Match Scoring** | Every opportunity gets a 0–100 score based on stack, TJM, duration & work mode |
| **Personalized Outreach** | Claude AI drafts a tailored message for each recruiter — sounds human, not templated |
| **Pipeline Kanban** | Track missions from _Detected_ → _Contacted_ → _Reply_ → _Interview_ → _Won_ |
| **TJM Analytics** | Real-time market rate insights for your specific stack |
| **Real-Time Alerts** | Get notified the instant a high-match mission is posted |
| **LinkedIn-Safe** | Runs locally in your real browser — no cloud proxies, no ban risk |

---

## Screenshots

### Landing Page
```
┌─────────────────────────────────────────────────────────────┐
│  ⚡ MissionPilot     Features  Pricing  FAQ    [Try free]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│         Your next mission,                                  │
│         found while you sleep.                              │
│                                                             │
│   ● 94% match  Tech Lead Java/Spark  BNP Paribas  900€/j   │
│   ● 87% match  Cloud Architect       SG           870€/j   │
│   ● 79% match  Senior Backend        Natixis      820€/j   │
└─────────────────────────────────────────────────────────────┘
```

### Dashboard
```
┌──────────┬──────────────────────────────────────────────────┐
│ ⚡        │  Today's Opportunities         Filter  Sort      │
│ Ops ●    ├──────────────────────────────────────────────────┤
│ Pipeline │  47 new · 94% best match · 32% response · 875€  │
│ History  ├──────────────────────────────────────────────────┤
│ Settings │  ⚡ 94%  Tech Lead Java/Spark · BNP · 900€/j     │
│          │  ◎ 87%  Cloud Architect · SG · 870€/j           │
│  Riadh M │  ◎ 82%  Backend Architect · Natixis · 820€/j    │
│  Pro ✓   │                                                  │
└──────────┴──────────────────────────────────────────────────┘
```

---

## Tech Stack

### Frontend

| Technology | Role |
|-----------|------|
| [Next.js 16](https://nextjs.org) | React framework with App Router |
| [TypeScript 5](https://typescriptlang.org) | Type safety everywhere |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling with OKLCh tokens |
| [shadcn/ui](https://ui.shadcn.com) | Accessible, unstyled component primitives |
| [Lucide React](https://lucide.dev) | Consistent icon set |
| [Geist Font](https://vercel.com/font) | Clean, modern typography |

### AI & Backend _(roadmap)_

| Technology | Role |
|-----------|------|
| [Claude API — Sonnet 4.6](https://anthropic.com) | Opportunity scoring + message generation |
| [Playwright](https://playwright.dev) | LinkedIn-safe local browser automation |
| [Neon Postgres](https://neon.tech) | Serverless database |
| [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs) | Scheduled scans (Malt, Comet, WTTJ) |

### Infrastructure

| Technology | Role |
|-----------|------|
| [Vercel](https://vercel.com) | Hosting, CI/CD, Edge Network |
| [GitHub](https://github.com/riadh-mnasri/mission-pilot) | Source control |

---

## Project Structure

```
mission-pilot/
├── app/
│   ├── page.tsx                    # Landing page (assembles all sections)
│   ├── layout.tsx                  # Root layout + SEO metadata
│   ├── globals.css                 # Dark navy theme + custom utilities
│   └── dashboard/
│       ├── layout.tsx              # Dashboard shell with persistent sidebar
│       ├── page.tsx                # Opportunities list + stats
│       ├── pipeline/page.tsx       # Kanban board (Detected → Won)
│       ├── history/page.tsx        # Past opportunities archive
│       └── settings/page.tsx       # Profile, stack & scan preferences
├── components/
│   ├── landing/
│   │   ├── Navbar.tsx              # Sticky top navigation + mobile menu
│   │   ├── Hero.tsx                # Hero section + stats + CTA
│   │   ├── DashboardPreview.tsx    # Animated product preview card
│   │   ├── Features.tsx            # 6-feature cards grid
│   │   ├── HowItWorks.tsx          # 4-step process with connector line
│   │   ├── Testimonials.tsx        # 3 testimonials with metrics
│   │   ├── Pricing.tsx             # Monthly/yearly toggle + 2 plans
│   │   └── Footer.tsx              # Links + copyright
│   ├── dashboard/
│   │   ├── Sidebar.tsx             # Active-aware navigation sidebar
│   │   ├── StatsBar.tsx            # 4 KPI cards row
│   │   ├── OpportunityCard.tsx     # Opportunity card with hover actions
│   │   └── KanbanBoard.tsx         # 5-column pipeline board
│   └── ui/                         # shadcn/ui base components
├── lib/
│   └── utils.ts                    # Tailwind merge (cn helper)
└── public/
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm / pnpm / yarn
- A [Vercel account](https://vercel.com) _(for deployment)_
- An [Anthropic API key](https://console.anthropic.com) _(for AI features)_

### Installation

```bash
# Clone the repo
git clone https://github.com/riadh-mnasri/mission-pilot.git
cd mission-pilot

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# → Fill in ANTHROPIC_API_KEY and DATABASE_URL
```

### Environment Variables

```env
# .env.local

# Anthropic — AI scoring & message generation
ANTHROPIC_API_KEY=sk-ant-...

# Database (Neon Postgres — coming in v2)
DATABASE_URL=postgresql://...

# Auth (coming in v4)
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```

### Run Locally

```bash
npm run dev
# → http://localhost:3000
```

### Build & Type-check

```bash
npm run build   # production build
npm run lint    # ESLint
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel          # preview deploy → unique URL
vercel --prod   # production deploy → mission-pilot.vercel.app
```

---

## Roadmap

### v1 — UI / MVP ✅ _(current)_
- [x] Landing page: Hero, Features, HowItWorks, Testimonials, Pricing, Footer
- [x] Dashboard: Opportunities list with AI scoring display
- [x] Kanban pipeline (5 columns)
- [x] Settings & profile page
- [x] Dark navy theme — glassmorphism, gradient text, custom scrollbar
- [x] Deployed on Vercel · Repo on GitHub

### v2 — Live Data 🔨 _(next)_
- [ ] Malt public scraper (Vercel cron — no auth required)
- [ ] Comet public scraper (Vercel cron)
- [ ] Welcome to the Jungle scraper
- [ ] Claude AI opportunity scoring (API route)
- [ ] Claude AI message generation (API route)
- [ ] Neon Postgres — persist opportunities & pipeline state

### v3 — LinkedIn Agent 🔒 _(planned)_
- [ ] Local Playwright agent (runs on user machine, not Vercel)
- [ ] `playwright-stealth` — patches `navigator.webdriver`
- [ ] Rate limiting: randomized delays 8–45s, max 20 actions/day
- [ ] Human behavior simulation: ±30% daily variation, 9am–6pm only
- [ ] LinkedIn opportunity extraction
- [ ] One-click message copy → paste in LinkedIn

### v4 — Analytics & Scale 📊 _(planned)_
- [ ] TJM market trend charts (Recharts)
- [ ] Source performance analytics (Malt vs Comet vs LinkedIn)
- [ ] Multi-user auth (NextAuth.js + Neon)
- [ ] Email digest (Resend) — daily top 5 matches
- [ ] Mobile-responsive dashboard
- [ ] PWA support

---

## LinkedIn Safety Architecture

MissionPilot uses a **local-first approach** — the scraping agent runs on your machine inside your real Chrome session.

| Risk Factor | How We Handle It |
|------------|-----------------|
| Cloud datacenter IP | Agent runs on **your machine** at your **home/office IP** |
| `navigator.webdriver = true` | Patched via `playwright-stealth` library |
| Predictable action timing | Randomized delays: 8–45s, never the same interval twice |
| Activity volume spikes | Gradual ramp-up: 5 → 10 → 20 actions/day over first week |
| Unusual hours | Actions only between 9am–6pm local time |
| Pattern detection | ±30% daily action count variation |
| Session authenticity | Reuses your existing LinkedIn auth cookie |

> LinkedIn's March 2026 Transparency Report flagged 23.5 million automated sessions in a single quarter — 99% were cloud-based tools. Local execution eliminates the primary detection vector.

**Safe daily limits (LinkedIn):**

| Account Type | Safe Limit | Hard Max |
|-------------|-----------|---------|
| Free | 15 messages/day | 50 |
| Premium | 25 messages/day | 75 |
| Sales Navigator | 80 messages/day | 250 |

---

## API Design _(v2 preview)_

```
POST /api/opportunities/score
{
  "title": "Tech Lead Java / Spark",
  "stack": ["Java 21", "Spark", "Azure"],
  "tjm": 900,
  "duration": 12,
  "remote": true
}
→ { "score": 94, "reasons": ["stack match", "remote", "TJM +5%"] }

POST /api/message/generate
{
  "opportunity": { ... },
  "profile": { "name": "Riadh MNASRI", "stack": [...], "tjm": 900 }
}
→ { "message": "Bonjour ...", "subject": "Candidature Tech Lead ..." }
```

---

## Contributing

Contributions, issues and feature requests are welcome.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature
git commit -m "feat: add your feature"
git push origin feature/your-feature
# → open a Pull Request on GitHub
```

Please follow the existing code style (TypeScript strict, no inline comments unless the WHY is non-obvious).

---

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

Made with precision by **[Riadh MNASRI](https://github.com/riadh-mnasri)**

_Senior Tech Lead & Architect · AI-Driven Solutions · Paris, France_

**Copyright © 2026 Riadh MNASRI — All rights reserved.**

---

If MissionPilot saves you time, [⭐ star the repo](https://github.com/riadh-mnasri/mission-pilot) — it helps others find it.

</div>
