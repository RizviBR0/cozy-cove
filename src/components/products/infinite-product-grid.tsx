"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ProductGrid } from "./product-grid";
import { Product, ProductSortOption } from "@/lib/types";
import { getProducts } from "@/app/actions/products";
import { Loader2 } from "lucide-react";

interface InfiniteProductGridProps {
  initialProducts: Product[];
  initialTotal: number;
  searchParams: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    minDiscount?: number;
    sort?: ProductSortOption;
    countryCode?: string;
    freeShippingOnly?: boolean;
  };
}

export function InfiniteProductGrid({
  initialProducts,
  initialTotal,
  searchParams,
}: InfiniteProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialProducts.length < initialTotal);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView();

  // Reset state when search params change
  useEffect(() => {
    setProducts(initialProducts);
    setPage(1);
    setHasMore(initialProducts.length < initialTotal);
    setIsLoading(false);
  }, [initialProducts, initialTotal]);

  useEffect(() => {
    const loadMore = async () => {
      if (isLoading || !hasMore) return;

      setIsLoading(true);
      try {
        const nextPage = page + 1;
        const response = await getProducts({
          page: nextPage,
          limit: 12, // Consistent with server component
          ...searchParams,
        });

        if (response.products.length > 0) {
          setProducts((prev) => [...prev, ...response.products]);
          setPage(nextPage);
          setHasMore(response.hasMore);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Failed to load more products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (inView) {
      loadMore();
    }
  }, [inView, hasMore, isLoading, page, searchParams]);

  return (
    <>
      <ProductGrid
        products={products}
        columns={4}
        emptyMessage="No deals match your filters"
        emptyAction={{ label: "Clear filters", href: "/shop" }}
      />

      {hasMore && (
        <div ref={ref} className="flex justify-center items-center py-8 w-full">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>You&apos;ve viewed all {products.length} deals!</p>
        </div>
      )}
    </>
  );
}
