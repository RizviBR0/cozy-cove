"use client";

import { Product } from "@/lib/types";
import { ProductCard } from "./product-card";
import { ProductSkeleton } from "./product-skeleton";
import { ShoppingBag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  showBadges?: boolean;
  columns?: 2 | 3 | 4;
  emptyMessage?: string;
  emptyAction?: {
    label: string;
    href: string;
  };
}

export function ProductGrid({
  products,
  isLoading = false,
  showBadges = true,
  columns = 4,
  emptyMessage = "No products found",
  emptyAction,
}: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  if (isLoading) {
    return (
      <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
        <ProductSkeleton count={columns * 2} />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{emptyMessage}</h3>
        <p className="text-muted-foreground mb-4 max-w-sm">
          Try adjusting your filters or search query to find what you&apos;re
          looking for.
        </p>
        {emptyAction && (
          <Button asChild>
            <Link href={emptyAction.href}>
              <ShoppingBag className="mr-2 h-4 w-4" />
              {emptyAction.label}
            </Link>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < 4}
          showBadges={showBadges}
        />
      ))}
    </div>
  );
}
