import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Product Order Sheet",
  description: "A product page for the Linden shelf with an order sheet.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
