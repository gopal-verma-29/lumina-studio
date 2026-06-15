# LUMINA — Interior Design Studio · v3

Multi-page, production-ready interior design website.

## Quick Start
```bash
npm install
npm run dev      # localhost:5173
npm run build
npm run preview
```

## Pages
| Route | Contents |
|-------|---------|
| `/` | Hero → Marquee → Services → Featured Project → Work (3 cards) → Process → Testimonials → Enquiry → CTA |
| `/projects` | Full portfolio (filtered) → Before/After → Press & Awards → CTA |
| `/about` | Studio story + team → Stats → Materials → Enquiry |

## Key Features
- React Router v7 — SPA with 3 pages
- GSAP ScrollTrigger pins rebuild on resize (no stale widths)
- Testimonials auto-carousel — 5s interval, pauses on hover, progress bar
- Work grid — `preview` prop for home (3 cards), full + filters on /projects
- Horizontal process scroll collapses to vertical stack on mobile
- WhatsApp FAB + footer + CTA banner
- 4-step enquiry form with validation + success state
- AI style quiz (demo, production API hook ready)

## To wire the enquiry form
EmailJS (quickest): `npm i @emailjs/browser` then call `emailjs.send()` in Enquiry.jsx on submit.

## To activate AI
Add `VITE_ANTHROPIC_API_KEY=...` to `.env`, uncomment `callAnthropicAPI` in `src/services/aiService.js`.
