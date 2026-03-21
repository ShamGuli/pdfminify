import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /admin/login is always public
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Blog API öz Bearer token autentifikasiyasını istifadə edir
  if (req.nextUrl.pathname.startsWith("/api/posts")) {
    return NextResponse.next();
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    return NextResponse.redirect(loginUrl);
  }

  let res = NextResponse.next({ request: req });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // Update request cookies so downstream middleware/routes see fresh tokens
        cookiesToSet.forEach(({ name, value }) =>
          req.cookies.set(name, value),
        );
        // Recreate response to carry updated request cookies
        res = NextResponse.next({ request: req });
        // Set cookies on the response so the browser stores them
        cookiesToSet.forEach(({ name, value, options }) =>
          res.cookies.set(name, value, options),
        );
      },
    },
  });

  // getUser() validates JWT with Supabase server
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("redirectTo", pathname);
    const redirectRes = NextResponse.redirect(loginUrl);
    // Copy any refreshed auth cookies to the redirect response
    res.cookies.getAll().forEach((cookie) => {
      redirectRes.cookies.set(cookie.name, cookie.value);
    });
    return redirectRes;
  }

  return res;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
