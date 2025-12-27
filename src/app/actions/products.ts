"use server";

import { MOCK_PRODUCTS } from "@/lib/aliexpress";
import { Product, ProductSortOption } from "@/lib/types";

interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  minDiscount?: number;
  sort?: ProductSortOption;
  countryCode?: string; // For shipping logic simulation
  freeShippingOnly?: boolean;
}

interface GetProductsResponse {
  products: Product[];
  hasMore: boolean;
  total: number;
}

export async function getProducts({
  page = 1,
  limit = 12,
  search = "",
  category = "all",
  minPrice = 0,
  maxPrice = 1000, // Default max high enough
  minRating = 0,
  minDiscount = 0,
  sort = "trending",
  freeShippingOnly = false,
}: GetProductsParams): Promise<GetProductsResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  let filtered = [...MOCK_PRODUCTS];

  // 1. Search
  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)
    );
  }

  // 2. Category
  if (category !== "all") {
    filtered = filtered.filter((p) =>
      p.category?.toLowerCase().includes(category.toLowerCase())
    );
  }

  // 3. Price
  filtered = filtered.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  // 4. Rating
  if (minRating > 0) {
    filtered = filtered.filter((p) => (p.rating || 0) >= minRating);
  }

  // 5. Discount
  if (minDiscount > 0) {
    filtered = filtered.filter((p) => (p.discountPercent || 0) >= minDiscount);
  }

  // 6. Free Shipping (Simulated based on mocked logic or data)
  if (freeShippingOnly) {
    // In mock data we might not have shipping info explicitly on all items,
    // assuming items with > $50 price have free shipping for simulation
    filtered = filtered.filter((p) => p.price > 50 || p.shipping?.free);
  }

  // 7. Sort
  switch (sort) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "top-rated":
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case "biggest-savings":
      filtered.sort(
        (a, b) => (b.discountPercent || 0) - (a.discountPercent || 0)
      );
      break;
    case "newest":
      filtered.sort(
        (a, b) =>
          (b.firstSeenAt?.getTime() || 0) - (a.firstSeenAt?.getTime() || 0)
      );
      break;
    // 'trending' is default, assume mock data is somewhat ordered or random
    case "trending":
    default:
      // Keep original order or shuffle slightly for feel
      break;
  }

  const total = filtered.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const pageProducts = filtered.slice(startIndex, endIndex);

  return {
    products: pageProducts,
    hasMore: endIndex < total,
    total,
  };
}
