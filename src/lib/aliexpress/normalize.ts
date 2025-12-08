import { Product } from "@/lib/types";
import { AliExpressProductRaw } from "./types";

/**
 * Normalizes an AliExpress product to our internal Product type
 *
 * @param raw - Raw product data from AliExpress API
 * @returns Normalized Product object
 */
export function normalizeProduct(raw: AliExpressProductRaw): Product {
  // Parse prices (they come as strings like "19.99")
  const price = parseFloat(raw.target_sale_price) || 0;
  const oldPrice = parseFloat(raw.target_original_price) || undefined;

  // Calculate discount percentage if not provided
  let discountPercent: number | undefined;
  if (raw.discount) {
    discountPercent = parseInt(raw.discount.replace("%", ""), 10);
  } else if (oldPrice && oldPrice > price) {
    discountPercent = Math.round(((oldPrice - price) / oldPrice) * 100);
  }

  // Parse rating (comes as string like "4.8" or percentage like "95%")
  let rating: number | undefined;
  if (raw.evaluate_rate) {
    const rateStr = raw.evaluate_rate.replace("%", "");
    const rateNum = parseFloat(rateStr);
    // If it's a percentage (>5), convert to 5-star scale
    rating = rateNum > 5 ? (rateNum / 100) * 5 : rateNum;
  }

  // Parse orders
  const orders = parseInt(raw.lastest_volume || "0", 10) || 0;

  // Build tags based on product attributes
  const tags: string[] = [];
  if (discountPercent && discountPercent >= 50) tags.push("biggest-savings");
  if (rating && rating >= 4.5) tags.push("top-rated");
  if (price < 20) tags.push("under-20");
  if (orders > 1000) tags.push("popular");

  // Determine category
  const category =
    raw.second_level_category_name ||
    raw.first_level_category_name ||
    "General";

  return {
    id: raw.product_id,
    title: raw.product_title,
    image: raw.product_main_image_url,
    url: raw.promotion_link,
    price,
    oldPrice,
    discountPercent,
    rating,
    orders,
    category,
    tags,
    firstSeenAt: new Date(), // Will be overwritten if already in cache
    updatedAt: new Date(),
  };
}

/**
 * Normalizes an array of AliExpress products
 *
 * @param rawProducts - Array of raw products from API
 * @returns Array of normalized Product objects
 */
export function normalizeProducts(
  rawProducts: AliExpressProductRaw[]
): Product[] {
  return rawProducts.map(normalizeProduct);
}

/**
 * Merges new product data with existing cached product
 * Preserves firstSeenAt from cache while updating other fields
 *
 * @param newProduct - Newly fetched product data
 * @param cachedProduct - Existing cached product (if any)
 * @returns Merged product data
 */
export function mergeWithCached(
  newProduct: Product,
  cachedProduct?: Product
): Product {
  if (!cachedProduct) {
    return newProduct;
  }

  return {
    ...newProduct,
    firstSeenAt: cachedProduct.firstSeenAt, // Preserve original first seen date
    updatedAt: new Date(),
  };
}
