import { z } from "zod";

const cents = z.number().int().nonnegative();

export const fulfillmentCodeSchema = z.enum(["pickup", "delivery"]);

export const extraCodeSchema = z.enum(["assembly", "hardware"]);

export const fulfillmentOptionSchema = z.object({
  code: fulfillmentCodeSchema,
  label: z.string().min(1),
  priceCents: cents,
});

export const extraSchema = z.object({
  code: extraCodeSchema,
  label: z.string().min(1),
  priceCents: cents,
  requires: fulfillmentCodeSchema.nullable(),
});

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  priceCents: cents,
  fulfillment: z.array(fulfillmentOptionSchema).min(1),
  extras: z.array(extraSchema),
});

export const productErrorSchema = z.object({
  error: z.string(),
});

export type FulfillmentCode = z.infer<typeof fulfillmentCodeSchema>;
export type ExtraCode = z.infer<typeof extraCodeSchema>;
export type FulfillmentOption = z.infer<typeof fulfillmentOptionSchema>;
export type Extra = z.infer<typeof extraSchema>;
export type Product = z.infer<typeof productSchema>;
export type ProductError = z.infer<typeof productErrorSchema>;
