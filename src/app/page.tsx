import { headers } from "next/headers";
import Product from "@/components/Product";
import { productSchema } from "@/schema/product";

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";

  const response = await fetch(`${protocol}://${host}/api/product`);

  if (!response.ok) {
    throw new Error(`Product request failed with status ${response.status}`);
  }

  const productData = productSchema.parse(await response.json());

  return (
    <main className="mx-auto max-w-240 px-4 py-16 sm:py-24 lg:px-0">
      <Product {...productData} />
    </main>
  );
}
