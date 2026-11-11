"use client";

import { useRef, useState } from "react";
import Dialog from "@/components/Dialog";
import { OrderConfirmation } from "@/components/OrderConfirmation";
import OrderForm from "@/components/OrderForm";
import type { Order } from "@/schema/order";
import type { Product } from "@/schema/product";

type AddToOrderProps = {
  product: Product;
};

const AddToOrder = ({ product }: AddToOrderProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [order, setOrder] = useState<Order | null>(null);

  const openDialog = () => {
    setOrder(null);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="rounded-md px-4 py-2 mt-5 self-center min-h-11 w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary-hover"
      >
        Add to order
      </button>
      <Dialog ref={dialogRef} title="Your order">
        {order ? (
          <OrderConfirmation />
        ) : (
          <OrderForm product={product} onSubmit={setOrder} />
        )}
      </Dialog>
    </>
  );
};

export default AddToOrder;
