import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Update last login
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("users").upsert(
          {
            id: user.id,
            email: user.email,
            last_login_at: new Date().toISOString(),
          },
          {
            onConflict: "id",
          }
        );
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/error`);
}
