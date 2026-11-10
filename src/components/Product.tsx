type ProductProps = {
  name: string;
  description: string;
  priceCents: number;
};

const Product = ({ name, description, priceCents }: ProductProps) => {
  return (
    <div className="p-8 flex flex-col lg:flex-row gap-6 border border-border">
      <div
        role="img"
        aria-label={name}
        className="aspect-4/3 w-full lg:w-1/2 bg-placeholder"
      />
      <div className="flex flex-col items-start lg:flex-1">
        <div className="flex justify-between gap-4 w-full">
          <div>
            <h2 className="text-2xl lg:text-[32px] font-bold">{name}</h2>
            <p className="text-muted">{description}</p>
          </div>
          <div className="text-xl lg:text-2xl">${priceCents}</div>
        </div>
        <button
          type="button"
          className="rounded-md px-4 py-2 mt-5 self-center min-h-11 w-full lg:w-auto bg-primary text-primary-foreground hover:bg-primary-hover"
        >
          Add to order
        </button>
      </div>
    </div>
  );
};

export default Product;
