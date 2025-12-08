/**
 * ============================================
 * SCORING WEIGHT CONSTANTS
 * ============================================
 *
 * These constants control how products are ranked in different sections.
 * Adjust these values to tune the ranking algorithm.
 *
 * Higher values = that factor matters more in the final score
 */

// ============================================
// TOP PRODUCTS SCORING WEIGHTS
// ============================================
/**
 * Formula: score = (RATING_WEIGHT × rating) + (ORDERS_WEIGHT × log(orders + 1)) + (DISCOUNT_WEIGHT × discount%)
 *
 * This scoring prioritizes:
 * 1. High ratings (trusted products)
 * 2. Popular products (many orders, logarithmic to prevent huge order counts from dominating)
 * 3. Good discounts (value for money)
 */

/** Weight for product rating (0-5 scale). Higher = ratings matter more */
export const TOP_RATING_WEIGHT = 2.0;

/** Weight for order count (logarithmic). Higher = popularity matters more */
export const TOP_ORDERS_WEIGHT = 1.5;

/** Weight for discount percentage. Higher = bigger discounts rank higher */
export const TOP_DISCOUNT_WEIGHT = 0.5;

// ============================================
// TRENDING PRODUCTS SCORING WEIGHTS
// ============================================
/**
 * Formula: score = (CLICKS_WEIGHT × recent_clicks) + (SAVES_WEIGHT × saves)
 *                + (DISCOUNT_WEIGHT × discount%) + (FRESH_WEIGHT × freshness_factor)
 *
 * This scoring prioritizes:
 * 1. User engagement (clicks from Cozy Cove)
 * 2. User interest (saves to favorites)
 * 3. Good deals (discount percentage)
 * 4. New products (freshness factor)
 */

/** Weight for recent click count. Higher = clicks matter more */
export const TRENDING_CLICKS_WEIGHT = 3.0;

/** Weight for save/favorite count. Higher = saves matter more */
export const TRENDING_SAVES_WEIGHT = 2.0;

/** Weight for discount percentage in trending. Higher = discounts boost trending */
export const TRENDING_DISCOUNT_WEIGHT = 0.3;

/** Weight for freshness factor. Higher = newer products rank higher */
export const TRENDING_FRESH_WEIGHT = 1.5;

// ============================================
// FRESHNESS CONFIGURATION
// ============================================

/** Products older than this many days start losing freshness score */
export const FRESHNESS_DECAY_DAYS = 7;

/** Maximum freshness factor value (for brand new products) */
export const MAX_FRESHNESS_SCORE = 10;

// ============================================
// BADGE THRESHOLDS
// ============================================

/** Minimum discount percentage to show "Biggest Savings" badge */
export const BIGGEST_SAVINGS_THRESHOLD = 50;

/** Minimum rating to show "Top Rated" badge */
export const TOP_RATED_THRESHOLD = 4.5;

/** Maximum price to show "Under $20" badge */
export const UNDER_20_THRESHOLD = 20;

/** Minimum trending score to show "Trending" badge */
export const TRENDING_BADGE_THRESHOLD = 10;
