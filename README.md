# Expense-TrackerPractice

A Expense-Tracker app built with Vite for Razorpay Interview Practice.

## Tech stack

- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org) 7
- [Vite](https://vite.dev) 8
- [oxlint](https://oxc.rs/docs/guide/usage/linter)
- [Vitest](https://vitest.dev) 5
- [Playwright](https://playwright.dev) 1.65

## Prerequisites

- Node.js 22.18+
- npm

## Setup

```bash
git clone <repo-url>
cd Practice-1
npm install
```

## Running

```bash
npm run dev
```

The app runs at http://localhost:5173.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run type-check` | Type-check all TypeScript (app, configs and lint rules) |
| `npm run lint` | Lint with oxlint |
| `npm run lint:fix` | Lint and auto-fix what can be fixed |
| `npm test` | Run tests with Vitest |
| `npm run test:e2e` | Run browser tests with Playwright (first time: `npx playwright install chromium`) |
| `npm run verify` | Run type-check, lint and tests in one go |
