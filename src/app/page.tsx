import Product from "@/components/Product";
import { productData } from "@/lib/product";

export default function Home() {
  return (
    <main className="px-4 py-16 sm:py-24">
      <Product {...productData} />
    </main>
  );
}
