import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Product Order Sheet",
  description:
    "An app displaying a product page with an order sheet. The product is a shelf called as 'Linden Shelf' ",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
