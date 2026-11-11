import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import OrderForm from "@/components/OrderForm";
import { productData } from "@/lib/product";
import { productSchema } from "@/schema/product";

// Same data the API returns, so the test has no price numbers of its own
const product = productSchema.parse(productData);

// Remove the rendered form after each test so tests don't see each other's HTML
afterEach(cleanup);

describe("OrderForm", () => {
  it("shows $275 for Delivery + Assembly + Hardware kit", async () => {
    const user = userEvent.setup();
    render(<OrderForm product={product} onSubmit={() => {}} />);

    await user.click(screen.getByRole("radio", { name: /delivery/i }));
    await user.click(screen.getByRole("checkbox", { name: /assembly/i }));
    await user.click(screen.getByRole("checkbox", { name: /hardware kit/i }));

    expect(screen.getByText("$275")).toBeDefined();
  });
});
