import { Product, ScoredProduct } from "@/lib/types/product";
import {
  TOP_RATING_WEIGHT,
  TOP_ORDERS_WEIGHT,
  TOP_DISCOUNT_WEIGHT,
} from "./constants";

/**
 * TOP PRODUCTS SCORING FORMULA
 * ============================
 *
 * Calculates a score for products based on quality and value metrics:
 * - Rating (0-5 scale): Indicates product quality and customer satisfaction
 * - Number of orders (logarithmic): Social proof of popularity
 * - Discount percentage (0-100): Value proposition
 *
 * Formula:
 * score = (rating_weight × rating) + (orders_weight × log(orders + 1)) + (discount_weight × discount%)
 *
 * The logarithmic scale for orders prevents products with millions of orders
 * from completely dominating the rankings while still rewarding popularity.
 *
 * @example
 * Product A: rating=4.8, orders=1000, discount=30%
 * Score = (2.0 × 4.8) + (1.5 × log(1001)) + (0.5 × 30)
 *       = 9.6 + 10.36 + 15
 *       = 34.96
 *
 * @param product - The product to score
 * @returns Numeric score (higher = better)
 */
export function calculateTopScore(product: Product): number {
  const rating = product.rating ?? 0;
  const orders = product.orders ?? 0;
  const discount = product.discountPercent ?? 0;

  // Rating contribution (0-5 scale * weight)
  const ratingScore = TOP_RATING_WEIGHT * rating;

  // Orders contribution (logarithmic scale to prevent huge counts from dominating)
  const ordersScore = TOP_ORDERS_WEIGHT * Math.log(orders + 1);

  // Discount contribution (0-100 scale * weight)
  const discountScore = TOP_DISCOUNT_WEIGHT * discount;

  return ratingScore + ordersScore + discountScore;
}

/**
 * Sorts products by top score (highest first)
 * Returns a new array, does not mutate the original
 *
 * @param products - Array of products to sort
 * @returns New array sorted by top score descending
 */
export function sortByTopScore(products: Product[]): Product[] {
  return [...products].sort(
    (a, b) => calculateTopScore(b) - calculateTopScore(a)
  );
}

/**
 * Adds top scores to products for display
 * Useful when you need to show the score alongside the product
 *
 * @param products - Array of products to score
 * @returns Array of scored products with topScore property
 */
export function addTopScores(products: Product[]): ScoredProduct[] {
  return products.map((product) => ({
    ...product,
    topScore: calculateTopScore(product),
  }));
}

/**
 * Gets top N products sorted by top score
 * Convenience function combining scoring and limiting
 *
 * @param products - Array of products to process
 * @param limit - Maximum number of products to return
 * @returns Top N products sorted by score
 */
export function getTopProducts(
  products: Product[],
  limit: number = 10
): Product[] {
  return sortByTopScore(products).slice(0, limit);
}
