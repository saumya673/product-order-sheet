const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Formats integer cents as whole US dollars, e.g. 27500 -> "$275". */
export const formatMoney = (cents: number): string => usd.format(cents / 100);
