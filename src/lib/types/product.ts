/**
 * Normalized Product type used across the application
 * This is the internal representation of products from AliExpress
 */
export interface Product {
  id: string;
  title: string;
  image: string;
  url: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  rating?: number;
  orders: number;
  category?: string;
  tags: string[];
  firstSeenAt?: Date;
  updatedAt?: Date;
}

/**
 * Product with calculated scores for display
 */
export interface ScoredProduct extends Product {
  topScore?: number;
  trendingScore?: number;
}

/**
 * Product statistics from our database
 */
export interface ProductStats {
  productId: string;
  totalClicks: number;
  recentClicks: number;
  totalSaves: number;
  lastClickAt?: Date;
  lastSaveAt?: Date;
  updatedAt?: Date;
}

/**
 * Product filter options for the shop page
 */
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  minDiscount?: number;
  search?: string;
}

/**
 * Sort options for products
 */
export type ProductSortOption =
  | "trending"
  | "top-rated"
  | "biggest-savings"
  | "price-low"
  | "price-high"
  | "newest";

/**
 * Pagination info
 */
export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

/**
 * API response for product listings
 */
export interface ProductListResponse {
  products: Product[];
  pagination: PaginationInfo;
}
