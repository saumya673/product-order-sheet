# Product order sheet

A single product page for the **Linden shelf** with an order sheet dialog. Built with Next.js (App Router), React, TypeScript and Tailwind CSS. Prices live in the app; there is no backend.

## Requirements

- Node.js **v24.20.0**
- pnpm **v12.18.0**

## Install

```bash
pnpm install
```

This also installs the git pre-commit hook (via the `prepare` script).

## Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Test

```bash
pnpm test
```

Tests use [Vitest](https://vitest.dev) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) in a jsdom environment.

## Lint and format

```bash
pnpm lint     # Biome lint + format check
pnpm format   # Biome format, writes changes
```

A [husky](https://typicode.github.io/husky/) pre-commit hook runs, in order: `biome check` on staged files, `tsc --noEmit`, `pnpm test` and `pnpm build`. A commit is blocked if any step fails.

## Project structure

```
src/
  app/          Next.js routes, layout and global styles
  components/   UI components
  lib/          Product data and shared logic
```

## Time spent

_TODO_

## Use of AI assistance

Parts written by a coding assistant (Claude Code):

- Husky pre-commit hook setup
- This README

_TODO: keep this list up to date._
