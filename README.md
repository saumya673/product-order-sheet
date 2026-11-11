# Product order sheet

A single product page for the **Linden shelf** with an order sheet dialog. Built with Next.js (App Router), React, TypeScript, Tailwind CSS, react-hook-form and Zod. Product data and prices are served by a mock API route inside the app; there is no external backend.

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
  schema/       Zod schemas and inferred types (API response, order form)
```

## Data fetching

The product is fetched **on the server**. `src/app/page.tsx` is a server component that requests `/api/product` and validates the response with the Zod schema. While it loads, `src/app/loading.tsx` shows `Loading product…`. If the request fails, `src/app/error.tsx` shows `Could not load the product` and a **Try again** button that requests it again.

## Order sheet

**Add to order** opens a native `<dialog>` (opened with `showModal()`) holding the order form. The form uses [react-hook-form](https://react-hook-form.com) and is validated by the Zod schema in `src/schema/order.ts`.

- Fulfillment is required. Pickup and Delivery are radio buttons, so only one can be chosen.
- Assembly is enabled only while Delivery is selected. Choosing Pickup unchecks and disables it. Hardware kit keeps its state when fulfillment changes.
- The total updates as the selection changes (`calculateTotalCents` in `src/lib/pricing.ts`). All names, labels and prices come from the API response.

### Validation

The schema is built from the product (`createOrderSchema(product)`), so the "Assembly needs Delivery" rule comes from the API's `requires` field. It is not hardcoded. The schema rejects Assembly + Pickup even though the UI already disables that combination, so the rule still holds if the UI is bypassed.

Submitting without a fulfillment shows **Choose pickup or delivery** under the Fulfillment group and keeps the form open. Each error is shown next to its own field and linked to the input with `aria-describedby` and `aria-invalid`.

## Keyboard and accessibility

The dialog and form use native elements (`<dialog>`, `<button>`, radio and checkbox `<input>`s inside `<label>`s). Keyboard behaviour therefore comes from the browser, and there is no custom key handling.

| Key                | Action                                                      |
| ------------------ | ----------------------------------------------------------- |
| Tab / Shift+Tab    | Move between controls. Focus stays inside the open dialog.  |
| Arrow keys         | Move between Pickup and Delivery, selecting as they move    |
| Space              | Tick or untick a checkbox                                   |
| Enter              | Activate the focused button                                 |
| Escape             | Close the dialog without adding the item                    |

- The dialog is named by its title (`aria-labelledby`, with an id from `useId()`). The × button has `aria-label="Close"`.
- Each option row is its `<label>`, at least 44px tall, so clicking anywhere on the row toggles the input. The focus outline is drawn on the whole row (`has-focus-visible:`) so it is easy to see.
- While Assembly is disabled, Tab skips it. A "Delivery only" hint under its label says why.
- On a failed submit, focus moves to the first invalid field (react-hook-form's default `shouldFocusError`).
- When the dialog closes, the browser returns focus to the **Add to order** button.

Checkboxes toggle with Space, the standard key for checkboxes. I chose not to remap Enter to toggle them. Doing so would make them behave differently from checkboxes everywhere else and would clash with Enter submitting the form.

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
- The order form (`src/components/OrderForm.tsx`), the order schema (`src/schema/order.ts`) and the total calculation (`calculateTotalCents`)
- The **Total** test (`src/components/OrderForm.test.tsx`)
- This README

_TODO: keep this list up to date._
