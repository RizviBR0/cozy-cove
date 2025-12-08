import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Cozy Deals",
  description:
    "Browse all AliExpress deals curated by Cozy Cove. Filter by price, rating, discount, and category to find your perfect cozy find.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
