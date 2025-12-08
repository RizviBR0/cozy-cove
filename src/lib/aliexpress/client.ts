import { Product, ProductFilters } from "@/lib/types";
import {
  AliExpressSearchParams,
  AliExpressApiResponse,
  AliExpressProductRaw,
  COZY_CATEGORIES,
  CozyCategoryKey,
} from "./types";
import { normalizeProducts } from "./normalize";
import { MOCK_PRODUCTS } from "./mock-data";

/**
 * AliExpress Affiliate API Client
 * ================================
 *
 * Handles all communication with the AliExpress Affiliate API.
 * Falls back to mock data when USE_MOCK_DATA is true or API is unavailable.
 */

const API_URL =
  process.env.ALIEXPRESS_API_URL || "https://api-sg.aliexpress.com/sync";
const APP_KEY = process.env.ALIEXPRESS_APP_KEY;
const APP_SECRET = process.env.ALIEXPRESS_APP_SECRET;
const TRACKING_ID = process.env.ALIEXPRESS_TRACKING_ID;
const USE_MOCK_DATA = process.env.USE_MOCK_DATA === "true";

/**
 * Generates the signature required for AliExpress API calls
 * Uses HMAC-SHA256 as per AliExpress documentation
 */
async function generateSignature(
  params: Record<string, string>
): Promise<string> {
  if (!APP_SECRET) return "";

  // Sort parameters alphabetically
  const sortedKeys = Object.keys(params).sort();
  const signStr = sortedKeys.map((key) => `${key}${params[key]}`).join("");

  // Create HMAC-SHA256 signature
  const encoder = new TextEncoder();
  const keyData = encoder.encode(APP_SECRET);
  const msgData = encoder.encode(APP_SECRET + signStr + APP_SECRET);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", cryptoKey, msgData);
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

/**
 * Makes a request to the AliExpress API
 */
async function makeApiRequest<T>(
  method: string,
  params: Record<string, string>
): Promise<AliExpressApiResponse<T>> {
  if (!APP_KEY || !APP_SECRET) {
    throw new Error("AliExpress API credentials not configured");
  }

  const timestamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);

  const baseParams = {
    app_key: APP_KEY,
    method,
    sign_method: "hmac-sha256",
    timestamp,
    format: "json",
    v: "2.0",
    ...params,
  };

  const signature = await generateSignature(baseParams);
  const finalParams = { ...baseParams, sign: signature };

  const queryString = Object.entries(finalParams)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");

  const response = await fetch(`${API_URL}?${queryString}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.ok) {
    throw new Error(`AliExpress API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Filters mock products based on criteria
 */
function filterMockProducts(
  products: Product[],
  filters: ProductFilters
): Product[] {
  return products.filter((product) => {
    if (
      filters.category &&
      !product.category?.toLowerCase().includes(filters.category.toLowerCase())
    ) {
      return false;
    }
    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false;
    }
    if (
      filters.minRating !== undefined &&
      (product.rating || 0) < filters.minRating
    ) {
      return false;
    }
    if (
      filters.minDiscount !== undefined &&
      (product.discountPercent || 0) < filters.minDiscount
    ) {
      return false;
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        product.title.toLowerCase().includes(searchLower) ||
        product.category?.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });
}

/**
 * Search for products using the AliExpress API
 * Falls back to mock data in development mode
 */
export async function searchProducts(
  searchParams: AliExpressSearchParams,
  filters?: ProductFilters
): Promise<{ products: Product[]; total: number }> {
  // Use mock data if configured or no API credentials
  if (USE_MOCK_DATA || !APP_KEY) {
    console.log("[AliExpress] Using mock data");
    let products = [...MOCK_PRODUCTS];

    if (filters) {
      products = filterMockProducts(products, filters);
    }

    const pageSize = searchParams.page_size || 20;
    const pageNo = searchParams.page_no || 1;
    const start = (pageNo - 1) * pageSize;

    return {
      products: products.slice(start, start + pageSize),
      total: products.length,
    };
  }

  try {
    const params: Record<string, string> = {
      tracking_id: TRACKING_ID || "",
      target_currency: searchParams.target_currency || "USD",
      target_language: searchParams.target_language || "EN",
      page_no: String(searchParams.page_no || 1),
      page_size: String(searchParams.page_size || 20),
    };

    if (searchParams.keywords) params.keywords = searchParams.keywords;
    if (searchParams.category_ids)
      params.category_ids = searchParams.category_ids;
    if (searchParams.min_sale_price)
      params.min_sale_price = String(searchParams.min_sale_price);
    if (searchParams.max_sale_price)
      params.max_sale_price = String(searchParams.max_sale_price);
    if (searchParams.sort) params.sort = searchParams.sort;
    if (searchParams.ship_to_country)
      params.ship_to_country = searchParams.ship_to_country;

    const response = await makeApiRequest<AliExpressProductRaw>(
      "aliexpress.affiliate.product.query",
      params
    );

    if (response.error_response) {
      throw new Error(response.error_response.msg);
    }

    const result =
      response.aliexpress_affiliate_product_query_response?.resp_result?.result;
    const rawProducts = result?.products?.product || [];
    const products = normalizeProducts(rawProducts);

    return {
      products,
      total: result?.total_record_count || products.length,
    };
  } catch (error) {
    console.error("[AliExpress] API error, falling back to mock data:", error);
    // Fallback to mock data on error
    return {
      products: MOCK_PRODUCTS.slice(0, searchParams.page_size || 20),
      total: MOCK_PRODUCTS.length,
    };
  }
}

/**
 * Get products for a specific Cozy Cove category
 */
export async function getProductsByCategory(
  categoryKey: CozyCategoryKey,
  page: number = 1,
  pageSize: number = 20
): Promise<{ products: Product[]; total: number }> {
  const category = COZY_CATEGORIES[categoryKey];

  return searchProducts({
    keywords: category.keywords,
    category_ids:
      "aliCategoryIds" in category ? category.aliCategoryIds : undefined,
    max_sale_price: "maxPrice" in category ? category.maxPrice : undefined,
    page_no: page,
    page_size: pageSize,
  });
}

/**
 * Get product details by ID
 */
export async function getProductDetails(
  productId: string
): Promise<Product | null> {
  if (USE_MOCK_DATA || !APP_KEY) {
    return MOCK_PRODUCTS.find((p) => p.id === productId) || null;
  }

  try {
    const response = await makeApiRequest<AliExpressProductRaw>(
      "aliexpress.affiliate.productdetail.get",
      {
        tracking_id: TRACKING_ID || "",
        product_ids: productId,
      }
    );

    const result =
      response.aliexpress_affiliate_productdetail_get_response?.resp_result
        ?.result;
    const rawProducts = result?.products?.product || [];

    if (rawProducts.length === 0) return null;

    return normalizeProducts(rawProducts)[0];
  } catch (error) {
    console.error("[AliExpress] Product details error:", error);
    return MOCK_PRODUCTS.find((p) => p.id === productId) || null;
  }
}
