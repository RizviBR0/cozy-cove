import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Get user if authenticated (clicks can be anonymous)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("product_clicks").insert({
      product_id: productId,
      user_id: user?.id || null,
    });

    if (error) {
      // Log but don't fail - analytics should not break the user experience
      console.error("Error tracking click:", error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // Log but return success - analytics failure shouldn't block the user
    console.error("Error tracking click:", error);
    return NextResponse.json({ success: true });
  }
}
