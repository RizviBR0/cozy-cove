import { NextResponse } from "next/server";
import { searchProducts } from "@/lib/aliexpress";
import { ProductFilters } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: ProductFilters = {
      category: searchParams.get("category") || undefined,
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      minRating: searchParams.get("minRating")
        ? Number(searchParams.get("minRating"))
        : undefined,
      minDiscount: searchParams.get("minDiscount")
        ? Number(searchParams.get("minDiscount"))
        : undefined,
      search: searchParams.get("search") || undefined,
    };

    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Math.min(Number(searchParams.get("pageSize")) || 20, 50);
    const keywords = searchParams.get("keywords") || "cozy home";

    const { products, total } = await searchProducts(
      {
        keywords,
        page_no: page,
        page_size: pageSize,
        min_sale_price: filters.minPrice,
        max_sale_price: filters.maxPrice,
      },
      filters
    );

    return NextResponse.json({
      products,
      pagination: {
        page,
        pageSize,
        totalItems: total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
