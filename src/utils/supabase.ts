import { NextResponse, type NextRequest } from "next/server";
import { createBrowserClient, createServerClient } from "@supabase/ssr";

/**
 * Creates a Supabase client.
 * - Uses `createBrowserClient` on the client side.
 * - Uses `createServerClient` on the server side with cookie handling.
 */
export async function createClient() {
  if (typeof window === "undefined") {
    // Server-side client
    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll: () => [], // Safe default, middleware handles real cookies
          setAll: () => {
            // Prevent crashes in Server Components
          },
        },
      }
    );
  }

  // Client-side client
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

/**
 * Middleware: Keeps Supabase auth session in sync with Next.js cookies.
 * Redirects users depending on auth state.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          // Sync cookies from Supabase into NextResponse
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // ⚠️ Do not add code between createServerClient and auth.getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthRoute =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");

  if (user && isAuthRoute) {
    // Logged-in users should not visit login/register
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (!user && !isAuthRoute) {
    // Guests should not access protected routes
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Always return supabaseResponse to keep cookies in sync
  return supabaseResponse;
}
