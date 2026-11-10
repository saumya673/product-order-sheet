"use client";

import { useRef } from "react";
import Dialog from "@/components/Dialog";
import type { Product } from "@/schema/product";

type AddToOrderProps = {
  product: Product;
};

const AddToOrder = ({ product }: AddToOrderProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="rounded-md px-4 py-2 mt-5 self-center min-h-11 w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary-hover"
      >
        Add to order
      </button>
      <Dialog ref={dialogRef} title="Your order">
        <p className="text-muted">{product.name}</p>
      </Dialog>
    </>
  );
};

export default AddToOrder;
