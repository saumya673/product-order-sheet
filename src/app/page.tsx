import Product from "@/components/Product";
import { productData } from "@/lib/product";

export default function Home() {
  return (
    <main className="mx-auto max-w-[960px] px-4 py-16 sm:py-24 lg:px-0">
      <Product {...productData} />
    </main>
  );
}
