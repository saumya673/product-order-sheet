import { z } from "zod";
import {
  extraCodeSchema,
  fulfillmentCodeSchema,
  type Product,
} from "@/schema/product";

export const createOrderSchema = (product: Product) =>
  z
    .object({
      fulfillment: z.enum(fulfillmentCodeSchema.options, {
        error: "Choose pickup or delivery",
      }),
      extras: z.record(extraCodeSchema, z.boolean()),
    })
    .superRefine((order, ctx) => {
      for (const extra of product.extras) {
        const selected = order.extras[extra.code];
        if (!selected || !extra.requires) continue;
        if (order.fulfillment === extra.requires) continue;

        const required = product.fulfillment.find(
          (option) => option.code === extra.requires,
        );
        ctx.addIssue({
          code: "custom",
          path: ["extras", extra.code],
          message: `${extra.label} is only available with ${required?.label ?? extra.requires}`,
        });
      }
    });

export type Order = z.infer<ReturnType<typeof createOrderSchema>>;
