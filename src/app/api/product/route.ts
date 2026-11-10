import { connection } from "next/server";
import { productData } from "@/lib/product";
import { type ProductError, productSchema } from "@/schema/product";

const SLOW_DELAY_MS = 2000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const errorResponse = (error: string) =>
  Response.json({ error } satisfies ProductError, { status: 500 });

export async function GET() {
  await connection();
  const mode = process.env.PRODUCT_API_MODE;

  if (mode === "error") {
    return errorResponse("unavailable");
  }

  if (mode === "slow") {
    await sleep(SLOW_DELAY_MS);
  }

  const result = productSchema.safeParse(productData);

  if (!result.success) {
    return errorResponse("invalid product data");
  }

  return Response.json(result.data);
}
