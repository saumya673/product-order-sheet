import { calculateTotalCents, formatMoney } from "@/lib/pricing";
import { Order } from "@/schema/order";
import { Product } from "@/schema/product";

type OrderConfirmationProps = {
  product: Product;
  order: Order;
  onBack: () => void;
};

export const OrderConfirmation = ({
  product,
  order,
  onBack,
}: OrderConfirmationProps) => {
  const total = calculateTotalCents(product, order);

  const fulfillment = product.fulfillment.find(
    (option) => option.code === order.fulfillment,
  );

  const selectedExtras = product.extras.filter(
    (extra) => order.extras[extra.code],
  );

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-bold">Added to your order</h3>

      {/* summary of fulfillment - selected extras and total money */}
      <ul className="flex flex-col gap-2">
        <li>{fulfillment?.label}</li>
        {selectedExtras.map((extra) => (
          <li key={extra.code}>{extra.label}</li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-4 border-t border-border pt-4 text-lg font-bold">
        <span>Total</span>
        <span>{formatMoney(total)}</span>
      </div>

      {/* back to product button that closes the dialog and resets the form */}
      <button
        type="button"
        onClick={onBack}
        className="min-h-11 w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary-hover"
      >
        Back to product
      </button>
    </div>
  );
};
