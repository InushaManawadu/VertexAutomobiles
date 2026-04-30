# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server (default `http://localhost:5173`)
- `npm run build` — production build into `dist/`
- `npm run preview` — serve the built bundle locally
- `npm run lint` — ESLint (flat config, `eslint.config.js`)
- `npm run deploy` — builds then publishes `dist/` to GitHub Pages via `gh-pages`

No test runner is configured. There is no TypeScript; the project is plain JSX.

## Stack

React 19 + Vite 7, React Router 7 (HashRouter), Firebase Firestore, `lucide-react` for icons, vanilla CSS with CSS custom properties. No CSS framework, no state library — components use `useState`/`useEffect` and call the Firestore wrapper directly.

## Architecture

**Routing** lives in [src/App.jsx](src/App.jsx). It uses `HashRouter` (not `BrowserRouter`) deliberately so the site works on GitHub Pages without server-side rewrites. Routes: `/`, `/stock`, `/car/:id`, `/admin`, `/about`, `/contact`, `/import-process`.

**Data layer** is centralized in [src/utils/storage.js](src/utils/storage.js). Every page that reads or writes cars imports from here — there is no other data path. The module wraps Firestore CRUD against a single `cars` collection and also owns client-side filtering (`filterCars`), filter-option derivation (`getFilterOptions`), and the LKR `formatPrice` / `formatMileage` formatters. All functions are async and return `[]` / `null` on error rather than throwing (except the explicit write paths, which rethrow).

**Firebase config** is hardcoded in [src/config/firebase.js](src/config/firebase.js) and committed. Only Firestore is initialized (`db`). Access is governed by Firestore security rules (not in this repo) — the API key in source is expected.

**Admin gate** in [src/pages/Admin.jsx](src/pages/Admin.jsx#L16) is client-side only: password `admin123` compared in-browser, with `sessionStorage.admin_auth` as the session flag. This is obfuscation, not security — anyone with network access to Firestore can bypass it. Treat it that way when making changes.

**Car schema** (the shape every page expects from Firestore) is authoritative in [src/components/AdminCarForm.jsx](src/components/AdminCarForm.jsx#L7): `name, brand, model, year, price, mileage, fuelType, transmission, grade, engineCapacity, color, location, description, features[], images[]`. Add fields here and in `storage.js`/`filterCars` together.

**Styling** is per-component CSS files co-located with their JSX (`Navbar.jsx` + `Navbar.css`, etc.). The design system lives in [src/index.css](src/index.css) as CSS variables: dark theme, royal blue accent (`--color-accent-primary: #1e40af`), glassmorphism tokens. Change the design globally there rather than per-component.

## Deployment Notes

- [vite.config.js](vite.config.js) sets `base: '/VertexAutomobiles/'` for the GitHub Pages URL. Combined with `HashRouter`, this is what makes deep links work on GH Pages — don't change either in isolation.
- `npm run deploy` pushes `dist/` to the `gh-pages` branch.

## Watch Out

- **[README.md](README.md) is stale.** It documents a localStorage implementation and a different brand name ("AutoLanka"). The real storage is Firestore and the brand is "Vertex Automobiles". Don't take the README's "Managing Car Data" or "Changing Brand Name" sections at face value.
- **[src/data/sampleCars.js](src/data/sampleCars.js) is empty** and nothing imports it. The app has no local fallback — an empty Firestore collection means an empty UI.
- ESLint rule: `no-unused-vars` ignores identifiers starting with a capital letter or underscore (`varsIgnorePattern: '^[A-Z_]'`).
