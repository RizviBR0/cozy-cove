/**
 * AliExpress API Types
 * ====================
 *
 * These types represent the raw response structure from AliExpress Affiliate API
 */

/**
 * Raw product data from AliExpress API
 * Based on aliexpress.affiliate.product.query response
 */
export interface AliExpressProductRaw {
  product_id: string;
  product_title: string;
  product_main_image_url: string;
  product_small_image_urls?: {
    string: string[];
  };
  promotion_link: string;
  target_sale_price: string;
  target_sale_price_currency: string;
  target_original_price: string;
  target_original_price_currency: string;
  discount?: string;
  evaluate_rate?: string;
  lastest_volume?: string;
  first_level_category_id?: number;
  first_level_category_name?: string;
  second_level_category_id?: number;
  second_level_category_name?: string;
  shop_id?: number;
  shop_url?: string;
}

/**
 * AliExpress API response wrapper
 */
export interface AliExpressApiResponse<T> {
  aliexpress_affiliate_product_query_response?: {
    resp_result: {
      resp_code: number;
      resp_msg: string;
      result: {
        current_page_no: number;
        current_record_count: number;
        total_page_no: number;
        total_record_count: number;
        products?: {
          product: T[];
        };
      };
    };
  };
  aliexpress_affiliate_productdetail_get_response?: {
    resp_result: {
      resp_code: number;
      resp_msg: string;
      result: {
        current_record_count: number;
        products?: {
          product: T[];
        };
      };
    };
  };
  error_response?: {
    code: string;
    msg: string;
    request_id: string;
  };
}

/**
 * Search parameters for product query
 */
export interface AliExpressSearchParams {
  keywords?: string;
  category_ids?: string;
  min_sale_price?: number;
  max_sale_price?: number;
  page_no?: number;
  page_size?: number;
  sort?:
    | "SALE_PRICE_ASC"
    | "SALE_PRICE_DESC"
    | "LAST_VOLUME_DESC"
    | "DISCOUNT_DESC";
  ship_to_country?: string;
  target_currency?: string;
  target_language?: string;
}

/**
 * Cozy Cove category mapping
 * Maps our categories to AliExpress category IDs
 */
export const COZY_CATEGORIES = {
  "home-decor": {
    name: "Cozy Home & Decor",
    keywords: "home decor cozy blanket pillow candle",
    aliCategoryIds: "13", // Home & Garden
  },
  loungewear: {
    name: "Soft Loungewear & Sleepwear",
    keywords: "loungewear pajamas sleepwear cozy soft",
    aliCategoryIds: "3,1501", // Apparel categories
  },
  "desk-comfort": {
    name: "Desk & Tech Comfort",
    keywords: "desk organizer mouse pad wrist rest monitor stand",
    aliCategoryIds: "7,44", // Electronics, Office
  },
  "self-care": {
    name: "Self Care & Wellness",
    keywords: "self care wellness spa skincare massage",
    aliCategoryIds: "66", // Beauty & Health
  },
  "gifts-under-20": {
    name: "Gifts Under $20",
    keywords: "gift cozy home decor cute",
    maxPrice: 20,
  },
} as const;

export type CozyCategoryKey = keyof typeof COZY_CATEGORIES;
