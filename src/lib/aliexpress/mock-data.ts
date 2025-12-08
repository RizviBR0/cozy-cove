import { Product } from "@/lib/types";

/**
 * MOCK PRODUCTS DATA
 * ==================
 *
 * Sample cozy products for development and testing when AliExpress API is unavailable.
 * These represent typical products that would appear on Cozy Cove.
 */
export const MOCK_PRODUCTS: Product[] = [
  // Home & Decor
  {
    id: "mock-1",
    title: "Ultra Soft Fleece Throw Blanket - Cozy Living Room Decor",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    url: "https://aliexpress.com/item/mock-1.html",
    price: 24.99,
    oldPrice: 49.99,
    discountPercent: 50,
    rating: 4.8,
    orders: 15420,
    category: "Home & Garden",
    tags: ["biggest-savings", "top-rated", "popular"],
    firstSeenAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(),
  },
  {
    id: "mock-2",
    title: "Scented Soy Candle Set - Lavender & Vanilla - Relaxation Gift",
    image:
      "https://images.unsplash.com/photo-1602607713075-d38f6c72c33b?w=400&h=400&fit=crop",
    url: "https://aliexpress.com/item/mock-2.html",
    price: 18.5,
    oldPrice: 32.0,
    discountPercent: 42,
    rating: 4.6,
    orders: 8934,
    category: "Home & Garden",
    tags: ["under-20", "popular"],
    firstSeenAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(),
  },
  {
    id: "mock-3",
    title: "Minimalist Ceramic Vase Set - Nordic Style Home Decor",
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop",
    url: "https://aliexpress.com/item/mock-3.html",
    price: 29.99,
    oldPrice: 45.0,
    discountPercent: 33,
    rating: 4.7,
    orders: 5621,
    category: "Home & Garden",
    tags: ["popular"],
    firstSeenAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },

  // Loungewear
  {
    id: "mock-4",
    title: "Womens Cozy Fleece Pajama Set - Soft Winter Sleepwear",
    image:
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&h=400&fit=crop",
    url: "https://aliexpress.com/item/mock-4.html",
    price: 32.99,
    oldPrice: 59.99,
    discountPercent: 45,
    rating: 4.9,
    orders: 23156,
    category: "Womens Clothing",
    tags: ["top-rated", "popular"],
    firstSeenAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
  {
    id: "mock-5",
    title: "Mens Soft Cotton Lounge Pants - Comfortable Home Wear",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
    url: "https://aliexpress.com/item/mock-5.html",
    price: 19.99,
    oldPrice: 35.0,
    discountPercent: 43,
    rating: 4.5,
    orders: 12890,
    category: "Mens Clothing",
    tags: ["under-20", "top-rated", "popular"],
    firstSeenAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },

  // Desk & Tech
  {
    id: "mock-6",
    title: "Ergonomic Memory Foam Wrist Rest - Office Desk Comfort",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    url: "https://aliexpress.com/item/mock-6.html",
    price: 14.99,
    oldPrice: 28.0,
    discountPercent: 46,
    rating: 4.4,
    orders: 7823,
    category: "Office & School Supplies",
    tags: ["under-20", "popular"],
    firstSeenAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
  {
    id: "mock-7",
    title: "LED Desk Lamp with Wireless Charger - Modern Office Accessory",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    url: "https://aliexpress.com/item/mock-7.html",
    price: 45.99,
    oldPrice: 89.99,
    discountPercent: 49,
    rating: 4.6,
    orders: 4521,
    category: "Lights & Lighting",
    tags: ["popular"],
    firstSeenAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },

  // Self Care
  {
    id: "mock-8",
    title: "Jade Facial Roller & Gua Sha Set - Natural Skincare Tool",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
    url: "https://aliexpress.com/item/mock-8.html",
    price: 12.99,
    oldPrice: 29.99,
    discountPercent: 57,
    rating: 4.7,
    orders: 34521,
    category: "Beauty & Health",
    tags: ["biggest-savings", "under-20", "popular"],
    firstSeenAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
  {
    id: "mock-9",
    title: "Electric Neck Massager - Deep Tissue Relaxation Device",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop",
    url: "https://aliexpress.com/item/mock-9.html",
    price: 39.99,
    oldPrice: 79.99,
    discountPercent: 50,
    rating: 4.5,
    orders: 11234,
    category: "Beauty & Health",
    tags: ["biggest-savings", "top-rated", "popular"],
    firstSeenAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },

  // Gifts Under $20
  {
    id: "mock-10",
    title: "Cute Cat Shaped Night Light - Kids Room Decor",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop",
    url: "https://aliexpress.com/item/mock-10.html",
    price: 9.99,
    oldPrice: 19.99,
    discountPercent: 50,
    rating: 4.8,
    orders: 18923,
    category: "Lights & Lighting",
    tags: ["biggest-savings", "under-20", "top-rated", "popular"],
    firstSeenAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "mock-11",
    title: "Bamboo Tea Coaster Set - Eco Friendly Kitchen Accessory",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
    url: "https://aliexpress.com/item/mock-11.html",
    price: 8.49,
    oldPrice: 15.99,
    discountPercent: 47,
    rating: 4.3,
    orders: 6234,
    category: "Home & Garden",
    tags: ["under-20", "popular"],
    firstSeenAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
  {
    id: "mock-12",
    title: "Plush Cloud Pillow - Soft Decorative Cushion",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop",
    url: "https://aliexpress.com/item/mock-12.html",
    price: 16.99,
    oldPrice: 32.0,
    discountPercent: 47,
    rating: 4.6,
    orders: 9876,
    category: "Home & Garden",
    tags: ["under-20", "popular"],
    firstSeenAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
];

/**
 * Mock product stats for trending calculation
 */
export const MOCK_PRODUCT_STATS = new Map([
  [
    "mock-1",
    { productId: "mock-1", totalClicks: 234, recentClicks: 89, totalSaves: 45 },
  ],
  [
    "mock-2",
    { productId: "mock-2", totalClicks: 156, recentClicks: 67, totalSaves: 32 },
  ],
  [
    "mock-3",
    { productId: "mock-3", totalClicks: 89, recentClicks: 23, totalSaves: 12 },
  ],
  [
    "mock-4",
    {
      productId: "mock-4",
      totalClicks: 345,
      recentClicks: 134,
      totalSaves: 78,
    },
  ],
  [
    "mock-5",
    { productId: "mock-5", totalClicks: 198, recentClicks: 56, totalSaves: 34 },
  ],
  [
    "mock-6",
    { productId: "mock-6", totalClicks: 123, recentClicks: 45, totalSaves: 23 },
  ],
  [
    "mock-7",
    {
      productId: "mock-7",
      totalClicks: 267,
      recentClicks: 112,
      totalSaves: 56,
    },
  ],
  [
    "mock-8",
    {
      productId: "mock-8",
      totalClicks: 456,
      recentClicks: 189,
      totalSaves: 98,
    },
  ],
  [
    "mock-9",
    { productId: "mock-9", totalClicks: 234, recentClicks: 78, totalSaves: 45 },
  ],
  [
    "mock-10",
    {
      productId: "mock-10",
      totalClicks: 567,
      recentClicks: 234,
      totalSaves: 123,
    },
  ],
  [
    "mock-11",
    { productId: "mock-11", totalClicks: 78, recentClicks: 12, totalSaves: 8 },
  ],
  [
    "mock-12",
    {
      productId: "mock-12",
      totalClicks: 189,
      recentClicks: 67,
      totalSaves: 34,
    },
  ],
]);
