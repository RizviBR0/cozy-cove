import { NextResponse } from "next/server";
import { MOCK_PRODUCTS, MOCK_PRODUCT_STATS } from "@/lib/aliexpress";
import { sortByTrendingScore } from "@/lib/scoring";
import { ProductStats } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 10, 50);

    // In production, this would fetch stats from Supabase
    // For now, using mock stats
    const statsMap = new Map<string, ProductStats>();
    MOCK_PRODUCT_STATS.forEach((stats, key) => {
      statsMap.set(key, {
        productId: stats.productId,
        totalClicks: stats.totalClicks,
        recentClicks: stats.recentClicks,
        totalSaves: stats.totalSaves,
      });
    });

    const trendingProducts = sortByTrendingScore(MOCK_PRODUCTS, statsMap).slice(
      0,
      limit
    );

    return NextResponse.json({
      products: trendingProducts,
      algorithm: "trending",
      limit,
    });
  } catch (error) {
    console.error("Error fetching trending products:", error);
    return NextResponse.json(
      { error: "Failed to fetch trending products" },
      { status: 500 }
    );
  }
}
