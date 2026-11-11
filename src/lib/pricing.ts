import type { ExtraCode, FulfillmentCode, Product } from "@/schema/product";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Formats integer cents as whole US dollars, e.g. 27500 -> "$275". */
export const formatMoney = (cents: number): string => usd.format(cents / 100);

type Selection = {
  fulfillment?: FulfillmentCode;
  extras?: Partial<Record<ExtraCode, boolean>>;
};

/** Shelf + selected fulfillment + each selected extra. Works on a partial (in-progress) selection. */
export const calculateTotalCents = (
  product: Product,
  selection: Selection,
): number => {
  const fulfillmentCents =
    product.fulfillment.find((option) => option.code === selection.fulfillment)
      ?.priceCents ?? 0;

  const extrasCents = product.extras
    .filter((extra) => selection.extras?.[extra.code])
    .reduce((sum, extra) => sum + extra.priceCents, 0);

  return product.priceCents + fulfillmentCents + extrasCents;
};
