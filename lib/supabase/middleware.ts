import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // If the env vars are not set, skip middleware check. You can remove this once you setup the project.
  if (!hasEnvVars) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Define public routes that don't need authentication
  const isPublicRoute = pathname === "/" || pathname === "/auth/login" || pathname === "/auth/sign-up";
  
  // Define protected route patterns
  const isPassengerRoute = pathname.startsWith("/passenger");
  const isDriverRoute = pathname.startsWith("/driver");
  const isProtectedRoute = isPassengerRoute || isDriverRoute || pathname === "/dashboard";

  // If no user and trying to access protected routes, redirect to login
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // If user exists, check role-based access
  if (user && (isPassengerRoute || isDriverRoute || pathname === "/dashboard")) {
    // Fetch user profile to check role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile) {
      const userRole = profile.role;
      
      // Redirect if user tries to access wrong role's routes
      if (isPassengerRoute && userRole === "DRIVER") {
        const url = request.nextUrl.clone();
        url.pathname = "/driver/dashboard";
        return NextResponse.redirect(url);
      }
      
      if (isDriverRoute && userRole === "PASSENGER") {
        const url = request.nextUrl.clone();
        url.pathname = "/passenger/dashboard";
        return NextResponse.redirect(url);
      }
      
      // Handle generic /dashboard route
      if (pathname === "/dashboard") {
        const url = request.nextUrl.clone();
        url.pathname = userRole === "DRIVER" ? "/driver/dashboard" : "/passenger/dashboard";
        return NextResponse.redirect(url);
      }
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
