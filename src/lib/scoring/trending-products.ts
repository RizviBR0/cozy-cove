import { Product, ScoredProduct, ProductStats } from "@/lib/types";
import {
  TRENDING_CLICKS_WEIGHT,
  TRENDING_SAVES_WEIGHT,
  TRENDING_DISCOUNT_WEIGHT,
  TRENDING_FRESH_WEIGHT,
  FRESHNESS_DECAY_DAYS,
  MAX_FRESHNESS_SCORE,
} from "./constants";

/**
 * FRESHNESS FACTOR CALCULATION
 * ============================
 *
 * Products seen more recently get higher freshness scores.
 * Score decays linearly from MAX_FRESHNESS_SCORE to 0 over FRESHNESS_DECAY_DAYS.
 *
 * This rewards new products in the trending section while still allowing
 * older products with high engagement to rank well.
 *
 * @example
 * - Product seen today: freshness = 10
 * - Product seen 3.5 days ago: freshness = 5
 * - Product seen 7+ days ago: freshness = 0
 *
 * @param firstSeenAt - When the product was first seen
 * @returns Freshness factor (0 to MAX_FRESHNESS_SCORE)
 */
export function calculateFreshnessFactor(firstSeenAt?: Date): number {
  if (!firstSeenAt) return 0;

  const now = new Date();
  const daysSinceSeen =
    (now.getTime() - firstSeenAt.getTime()) / (1000 * 60 * 60 * 24);

  // Products older than decay period get no freshness bonus
  if (daysSinceSeen >= FRESHNESS_DECAY_DAYS) return 0;

  // Linear decay from max to 0
  return MAX_FRESHNESS_SCORE * (1 - daysSinceSeen / FRESHNESS_DECAY_DAYS);
}

/**
 * TRENDING PRODUCTS SCORING FORMULA
 * ==================================
 *
 * Calculates a trending score based on user engagement and recency:
 * - Recent clicks from Cozy Cove users (primary engagement signal)
 * - Number of times saved to favorites (strong interest signal)
 * - Discount percentage (value incentive)
 * - Freshness (boost for new products)
 *
 * Formula:
 * score = (clicks_weight × recent_clicks) + (saves_weight × saves)
 *       + (discount_weight × discount%) + (fresh_weight × freshness_factor)
 *
 * @example
 * Product with 50 recent clicks, 20 saves, 40% discount, seen 2 days ago:
 * Score = (3.0 × 50) + (2.0 × 20) + (0.3 × 40) + (1.5 × 7.14)
 *       = 150 + 40 + 12 + 10.71
 *       = 212.71
 *
 * @param product - The product to score
 * @param stats - Click and save statistics from our database
 * @returns Numeric score (higher = more trending)
 */
export function calculateTrendingScore(
  product: Product,
  stats?: ProductStats
): number {
  const recentClicks = stats?.recentClicks ?? 0;
  const saves = stats?.totalSaves ?? 0;
  const discount = product.discountPercent ?? 0;
  const freshness = calculateFreshnessFactor(product.firstSeenAt);

  // Click engagement contribution
  const clicksScore = TRENDING_CLICKS_WEIGHT * recentClicks;

  // Saves/favorites contribution (strong intent signal)
  const savesScore = TRENDING_SAVES_WEIGHT * saves;

  // Discount contribution
  const discountScore = TRENDING_DISCOUNT_WEIGHT * discount;

  // Freshness contribution (rewards new products)
  const freshnessScore = TRENDING_FRESH_WEIGHT * freshness;

  return clicksScore + savesScore + discountScore + freshnessScore;
}

/**
 * Sorts products by trending score (highest first)
 * Returns a new array, does not mutate the original
 *
 * @param products - Array of products to sort
 * @param statsMap - Map of product ID to stats
 * @returns New array sorted by trending score descending
 */
export function sortByTrendingScore(
  products: Product[],
  statsMap: Map<string, ProductStats>
): Product[] {
  return [...products].sort((a, b) => {
    const scoreA = calculateTrendingScore(a, statsMap.get(a.id));
    const scoreB = calculateTrendingScore(b, statsMap.get(b.id));
    return scoreB - scoreA;
  });
}

/**
 * Adds trending scores to products for display
 *
 * @param products - Array of products to score
 * @param statsMap - Map of product ID to stats
 * @returns Array of scored products with trendingScore property
 */
export function addTrendingScores(
  products: Product[],
  statsMap: Map<string, ProductStats>
): ScoredProduct[] {
  return products.map((product) => ({
    ...product,
    trendingScore: calculateTrendingScore(product, statsMap.get(product.id)),
  }));
}

/**
 * Gets top N trending products
 *
 * @param products - Array of products to process
 * @param statsMap - Map of product ID to stats
 * @param limit - Maximum number of products to return
 * @returns Top N trending products
 */
export function getTrendingProducts(
  products: Product[],
  statsMap: Map<string, ProductStats>,
  limit: number = 10
): Product[] {
  return sortByTrendingScore(products, statsMap).slice(0, limit);
}
