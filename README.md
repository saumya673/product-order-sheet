# Product order sheet

A single product page for the **Linden shelf** with an order sheet dialog. Built with Next.js (App Router), React, TypeScript and Tailwind CSS. Product data and prices are served by a mock API route inside the app; there is no external backend.

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

## Product API

`GET /api/product` returns the product as JSON. The response is validated against a [Zod](https://zod.dev) schema in `src/schema/product.ts` before it is sent:

- `200`: the product (name, description, price, fulfillment options and extras). All prices are integer cents.
- `500`: `{ "error": string }`. Returned when the API is in `error` mode, or when the product data fails validation (the details are logged on the server).

The same schema can be used on the client to validate the response, and the TypeScript types (`Product`, `FulfillmentOption`, `Extra`, …) are inferred from it.

### Simulating slow or failing responses

Copy `.env.local.example` to `.env.local` and set `PRODUCT_API_MODE`:

| Value   | Behaviour                             |
| ------- | ------------------------------------- |
| _empty_ | Normal response                       |
| `slow`  | Responds after a 2 second delay       |
| `error` | Responds with `500` and an error body |

Restart `pnpm dev` after changing it.

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
    api/        Route handlers (mock product API)
  components/   UI components
  lib/          Product data and shared logic
  schema/       Zod schemas and inferred types for API responses
```

## Data fetching

The product is fetched **on the server**. `src/app/page.tsx` is a server component that requests `/api/product` and validates the response with the Zod schema. While it loads, `src/app/loading.tsx` shows `Loading product…`. If the request fails, `src/app/error.tsx` shows `Could not load the product` and a **Try again** button that requests it again.

## Layout between 768px and 1023px

From 768px up the page uses the desktop layout: image placeholder beside the details, the **Add to order** button sized to its text, and the dialog as a centred modal (max 480px wide). At tablet width there is enough room for two columns, and stacking them left a very tall image with the details pushed below the fold.

## Time spent

_TODO_

## AI tools

I used **Claude Code** (Anthropic) as a coding assistant. It wrote these parts, which I reviewed:

- Husky pre-commit hook setup
- Zod schema for the product API response (`src/schema/product.ts`) and its use in the route handler
- Money formatting (`formatMoney` in `src/lib/pricing.ts`)
- The `AddToOrder` component and the `Dialog` open/close logic and responsive styling
- This README

_TODO: keep this list up to date._
