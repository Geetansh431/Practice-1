# CLAUDE.md

Rules for working in this repo. Follow them for every task.

## Stack

- React 19 + TypeScript 7 (strict) + Vite 8
- oxlint for linting (type-aware), with custom rules in `lint/`
- Vitest for unit tests, Playwright for browser tests
- npm, Node.js 22.18+

## Commands

- `npm run dev`: start the app at http://localhost:5173
- `npm run verify`: type-check, lint and tests. **Run this after every change.**
- `npm run lint:fix`: auto-fix lint problems that can be fixed
- `npm test`: unit tests only (Vitest)
- `npm run test:e2e`: browser tests (Playwright). Run before calling a feature done.

## Folder layout

- `src/`: app code. Each component gets its own folder, with its tests inside:
  ```
  src/PayButton/
    PayButton.tsx
    UnitTests/PayButton.test.tsx
    E2E/PayButton.e2e.ts
  ```
- `src/hooks/`: custom hooks that hold state and behaviour (`useExpenses.ts`). Components only render. Hooks are tested through the components that use them, not with `renderHook`.
- `src/helpers/`: plain functions with no React, one file per topic (`money.ts`), with tests in `src/helpers/UnitTests/`.
- Exception: `src/App.tsx` and `src/main.tsx` are the entry point. They stay in `src/` and have no tests.
- Exception: `src/testSetup.ts` is the Vitest setup file (jest-dom matchers, cleanup after each test).
- `lint/`: lint config (`rules.ts`), custom rules (`custom-rules/`) and their tests (`test/`)

## Code rules

Lint enforces most of these. Fix the code; never work around the rule.

- **Named exports only.** No `export default`, no `import * as`, no `export *`.
- **No barrel files.** Import from the file that defines the code, not an `index.ts` that re-exports it.
- **One component per file**, and the file is named after it: `PayButton.tsx` exports `PayButton`.
- **Constants with plain values are UPPER_SNAKE_CASE**: `const MAX_AMOUNT = 500`.
- **No `any`.** Use real types, or `unknown` and narrow it.
- **Handle errors.** No empty `catch`. Every promise is awaited or has a `.catch`.
- **Keep it simple.** Small functions, plain names, no clever code. Prefer string methods over regex.

## React

- Follow the hooks rules, and list every `useEffect` dependency.
- Keep state as local as possible. Lift it only when two components need it. Don't add a state library without asking.
- Give list items a stable `key`, not the array index.
- Never use `dangerouslySetInnerHTML`.

## Accessibility

- Use real elements: `<button>` for actions, `<a href>` for navigation. Not clickable `<div>`s.
- Every image has `alt`. Every input has a linked `<label>`.
- Everything must work with the keyboard alone.

## Testing

- Test behaviour a user can see, not implementation details.
- Cover the edge cases: empty, invalid and error states.
- Don't mock what you're testing. Mock only the network.

## How to work

1. Before coding: restate the task, list open questions, and write acceptance criteria.
2. Share a short plan and wait for approval.
3. Work in small steps. After each step run `npm run verify` and show the result.
4. When requirements change, update the plan and tests first, then the code.
5. Never commit or push. The developer reviews every diff and commits.
6. Don't add dependencies without asking.

## Definition of done

- `npm run verify` passes
- The feature was checked in the browser
- Tests cover the new behaviour, including edge cases
- No `any`, `@ts-ignore`, empty `catch` or lint-disable comments
- No lint rule or test was disabled, skipped or weakened to make things pass


## Current task: Expense Tracker

A single-user expense tracker. No backend.

### Decisions
- Amounts are stored in **paise** (whole numbers): ₹1,250.50 is stored as 125050.
  Never use floats for money. Convert only when reading input and when displaying.
- Display money with `Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" })`, e.g. ₹1,250.50
- Categories are a fixed list: Food, Transport, Shopping, Bills, Other
- Data is saved in localStorage under the key `expenses`
- Each expense: `id`, `description`, `amountInPaise`, `category`, `date` (YYYY-MM-DD), `createdAt`
- Order: newest `date` first; if dates match, newest `createdAt` first

### Acceptance criteria
Adding
1. Valid form + Add → expense appears at the top of the list
2. After adding, the form clears and the date resets to today
3. The date field defaults to today

Validation (error next to the field, nothing added)
4. Empty or blank description → "Description is required"
5. Amount 0 or negative → "Amount must be greater than 0"
5a. Non-numeric amount (e.g. "abc") → "Enter a valid amount"
6. More than 2 decimals → "Use up to 2 decimal places"
7. Future date → "Date can't be in the future"
8. No category → "Category is required"

List, total, filter, delete
9. Each row shows description, category, date and amount
10. Newest date first; same date → added last comes first
11. Amounts show as ₹1,250.50
12. ₹1,250.50 + ₹100 → total ₹1,350.50
13. Filter "Food" → only Food rows, and the total is the Food total
14. Filter "All" → all rows and the full total
15. Delete → row disappears immediately and the total goes down

Persistence and empty states
16. Add, then reload → the expense is still there
17. No expenses → "No expenses yet"
18. Filter with no matches → "No expenses in this category"

### Out of scope
Editing, custom categories, multiple currencies, other filters, delete confirmation.
Don't build any of these unless asked.
