import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm, useWatch } from "react-hook-form";
import { calculateTotalCents, formatMoney } from "@/lib/pricing";
import { createOrderSchema, type Order } from "@/schema/order";
import type { ExtraCode, Product } from "@/schema/product";

type OrderFormProps = {
  product: Product;
  onSubmit: (order: Order) => void;
};

// Whole row is the <label>, so clicking anywhere toggles the input.
const optionRow =
  "flex min-h-11 cursor-pointer items-center gap-3 rounded-md border border-border px-4 py-2 " +
  "has-checked:border-primary has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary " +
  "has-disabled:cursor-not-allowed has-disabled:opacity-50";

const noExtras = (product: Product) =>
  Object.fromEntries(
    product.extras.map((extra) => [extra.code, false]),
  ) as Record<ExtraCode, boolean>;

const OrderForm = ({ product, onSubmit }: OrderFormProps) => {
  const errorId = useId();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createOrderSchema(product)),
    defaultValues: { extras: noExtras(product) },
  });

  const selection = useWatch({ control });
  const total = calculateTotalCents(product, selection);

  const fulfillmentField = register("fulfillment", {
    // Switching fulfillment unchecks any extra that requires a different one - Pickup unchecks Assembly
    onChange: (event) => {
      for (const extra of product.extras) {
        if (extra.requires && extra.requires !== event.target.value) {
          setValue(`extras.${extra.code}`, false);
        }
      }
    },
  });

  const fulfillmentErrorId = `${errorId}-fulfillment`;
  const fulfillmentError = errors.fulfillment?.message;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <div className="flex justify-between gap-4">
        <span>{product.name}</span>
        <span>{formatMoney(product.priceCents)}</span>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 font-semibold">Fulfillment</legend>
        {product.fulfillment.map((option) => (
          <label key={option.code} className={optionRow}>
            <input
              type="radio"
              value={option.code}
              aria-invalid={fulfillmentError ? true : undefined}
              aria-describedby={
                fulfillmentError ? fulfillmentErrorId : undefined
              }
              className="size-4 accent-primary"
              {...fulfillmentField}
            />
            <span className="flex-1">{option.label}</span>
            <span className="text-muted">
              {option.priceCents === 0
                ? "Free"
                : `+${formatMoney(option.priceCents)}`}
            </span>
          </label>
        ))}
        {fulfillmentError && (
          <p id={fulfillmentErrorId} className="text-sm text-error">
            {fulfillmentError}
          </p>
        )}
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 font-semibold">Extras</legend>
        {product.extras.map((extra) => {
          const requiredOption = product.fulfillment.find(
            (option) => option.code === extra.requires,
          );
          const unavailable =
            extra.requires !== null && selection.fulfillment !== extra.requires;
          const extraError = errors.extras?.[extra.code]?.message;
          const extraErrorId = `${errorId}-${extra.code}`;

          return (
            <div key={extra.code} className="flex flex-col gap-1">
              <label className={optionRow}>
                <input
                  type="checkbox"
                  disabled={unavailable}
                  aria-invalid={extraError ? true : undefined}
                  aria-describedby={extraError ? extraErrorId : undefined}
                  className="size-4 accent-primary"
                  {...register(`extras.${extra.code}`)}
                />
                <span className="flex-1">
                  {extra.label}
                  {requiredOption && (
                    <span className="block text-sm text-muted">
                      {requiredOption.label} only
                    </span>
                  )}
                </span>
                <span className="text-muted">
                  +{formatMoney(extra.priceCents)}
                </span>
              </label>
              {extraError && (
                <p id={extraErrorId} className="text-sm text-error">
                  {extraError}
                </p>
              )}
            </div>
          );
        })}
      </fieldset>

      <div className="flex items-center justify-between gap-4 border-t border-border pt-4 text-lg font-bold">
        <span>Total</span>
        <output aria-live="polite">{formatMoney(total)}</output>
      </div>

      <button
        type="submit"
        className="min-h-11 w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary-hover"
      >
        Add to order
      </button>
    </form>
  );
};

export default OrderForm;
