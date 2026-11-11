import AddToOrder from "@/components/AddToOrder";
import { formatMoney } from "@/lib/pricing";
import type { Product as ProductData } from "@/schema/product";

const Product = (product: ProductData) => {
  const { name, description, priceCents } = product;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div
        role="img"
        aria-label={name}
        className="aspect-4/3 w-full md:w-1/2 bg-placeholder"
      />
      <div className="flex flex-col items-start md:flex-1">
        <div className="flex justify-between gap-4 w-full">
          <div>
            <h2 className="text-2xl md:text-[32px] font-bold">{name}</h2>
            <p className="text-muted">{description}</p>
          </div>
          <div className="text-xl md:text-2xl">{formatMoney(priceCents)}</div>
        </div>
        <AddToOrder product={product} />
      </div>
    </div>
  );
};

export default Product;
