# WILLIAMIKANDA GROUP – Next.js + Tailwind (Dark/Light, EN/AR, Animations)

A premium, bilingual, dark/light website scaffold with separate components for each section and clean routing.

## Tech
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion (section animations)
- next-themes (dark/light)
- Simple client i18n (EN/AR) + RTL support

## Install & Run
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Structure
- `app/` pages: `/`, `/about`, `/services`, `/contact`
- `components/` sections: HeroSlider, SectionAbout, SectionWhy, SectionWho, SectionServices, SectionCTA, Navbar, Footer
- `i18n/` JSON dictionaries (English/Arabic)

## Notes
- Replace placeholder images in `/public` with your real assets (logos, PNGs).
- Contact form is a demo; connect to your backend or service to send emails.

## Theming & Language
- Theme toggle (☀️ / 🌙) in the navbar.
- Language toggle (EN / العربية) with automatic RTL on Arabic.
