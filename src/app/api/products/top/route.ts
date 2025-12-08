import { NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/lib/aliexpress";
import { getTopProducts } from "@/lib/scoring";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 10, 50);

    // In production, this would fetch from cache/database
    // For now, using mock data with our scoring algorithm
    const topProducts = getTopProducts(MOCK_PRODUCTS, limit);

    return NextResponse.json({
      products: topProducts,
      algorithm: "top",
      limit,
    });
  } catch (error) {
    console.error("Error fetching top products:", error);
    return NextResponse.json(
      { error: "Failed to fetch top products" },
      { status: 500 }
    );
  }
}
