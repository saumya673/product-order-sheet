export const productData = {
  name: "Linden Shelf",
  description:
    "A clean, minimalist wall shelf that adds simple, functional storage to any room.",
  price: 180,
};

type ProductProps = {
  name: string;
  description: string;
  price: number;
};

const Product = ({ name, description, price }: ProductProps) => {
  return (
    <div className="m-4 p-8 flex flex-col items-start border">
      <div className="flex justify-between gap-4 w-full">
        <div>
          <h2 className="text-3xl font-bold">{name}</h2>
          <p className="text-muted">{description}</p>
        </div>
        <div>${price}</div>
      </div>
      <button
        type="button"
        className="border rounded-md px-4 py-2 mt-5 self-end hover:bg-gray-100"
      >
        Add to order
      </button>
    </div>
  );
};

export default Product;
