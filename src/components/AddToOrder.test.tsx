import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import AddToOrder from "@/components/AddToOrder";
import { productData } from "@/lib/product";
import { productSchema } from "@/schema/product";

// Same data the API returns, so the tests have no price numbers of their own
const product = productSchema.parse(productData);

// Renders the product's Add to order button and clicks it to open the dialog
const openOrderDialog = async () => {
  const user = userEvent.setup();
  render(<AddToOrder product={product} />);
  await user.click(screen.getByRole("button", { name: "Add to order" }));
  return { user, dialog: within(screen.getByRole("dialog")) };
};

describe("AddToOrder", () => {
  it("shows $275 for Delivery + Assembly + Hardware kit", async () => {
    const { user, dialog } = await openOrderDialog();

    await user.click(dialog.getByRole("radio", { name: /delivery/i }));
    await user.click(dialog.getByRole("checkbox", { name: /assembly/i }));
    await user.click(dialog.getByRole("checkbox", { name: /hardware kit/i }));

    expect(dialog.getByRole("status").textContent).toBe("$275");
  });

  it("clears Assembly when Pickup is chosen and leaves it out of the confirmation", async () => {
    const { user, dialog } = await openOrderDialog();
    const assembly = dialog.getByRole("checkbox", { name: /assembly/i });

    await user.click(dialog.getByRole("radio", { name: /delivery/i }));
    await user.click(assembly);
    await user.click(dialog.getByRole("radio", { name: /pickup/i }));

    expect(assembly).toHaveProperty("checked", false);
    expect(assembly).toHaveProperty("disabled", true);
    expect(dialog.getByRole("status").textContent).toBe("$180");

    await user.click(dialog.getByRole("checkbox", { name: /hardware kit/i }));
    await user.click(dialog.getByRole("button", { name: "Add to order" }));

    expect(
      dialog.getByRole("heading", { name: "Added to your order" }),
    ).toBeDefined();
    expect(dialog.getByText("Pickup")).toBeDefined();
    expect(dialog.getByText("Hardware kit")).toBeDefined();
    expect(dialog.queryByText(/assembly/i)).toBeNull();
  });

  it("shows a field error and keeps the form open when no fulfillment is chosen", async () => {
    const { user, dialog } = await openOrderDialog();

    await user.click(dialog.getByRole("button", { name: "Add to order" }));

    expect(dialog.getByText("Choose pickup or delivery")).toBeDefined();
    expect(
      dialog.queryByRole("heading", { name: "Added to your order" }),
    ).toBeNull();
  });
});
