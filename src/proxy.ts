import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyJWT } from "./utils/verifyJWT";
import { User } from "./types";


// Public auth routes
const AuthRoutes = ["/auth/sign-in", "/auth/sign-up"] as const;

// Role-based allowed routes
const roleBasedRoutes = {
  USER: [
    "/",
    "/dashboard",
    "/dashboard/help-support",
    "/dashboard/messages",
    "/dashboard/my-products",
    "/dashboard/categories",
    "/dashboard/profile",
    "/dashboard/transaction-history",
    "/messages",
    "/profile",
    "/checkout",
    "/checkout/complete",
    "/checkout/cancel",
  ],
  SUPERADMIN: [
    "/",
    "/dashboard",
    "/dashboard/help-support",
    "/dashboard/users",
    "/dashboard/products",
    "/dashboard/categories",
    "/dashboard/profile",
    "/dashboard/transaction-history",
    "/dashboard/category",
    "/messages",
    "/profile",
  ],
} as const;

type Role = keyof typeof roleBasedRoutes;
type AllowedRoute = typeof roleBasedRoutes[Role][number];

// Protected routes (any route starting with these requires auth)
const protectedRoutes: AllowedRoute[] = ["/dashboard", "/messages", "/profile", '/checkout/cancel', '/checkout/complete'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  // If user has no token
  if (!token) {
    const isAuthRoute = (AuthRoutes as readonly string[]).includes(pathname);
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isAuthRoute || !isProtectedRoute) {
      return NextResponse.next();
    }

    return NextResponse.redirect(
      new URL(`/auth/sign-in?redirect=${pathname}`, request.url)
    );
  }

  try {
    const user = verifyJWT(token) as User;

    // Prevent logged-in user from accessing auth pages
    if ((AuthRoutes as readonly string[]).includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Check if the user role allows access to this route
    if (user?.role && roleBasedRoutes[user.role as Role]) {
      const allowedRoutes = roleBasedRoutes[user.role as Role] as readonly string[];
      if (allowedRoutes.some((route) => pathname === route)) {
        return NextResponse.next();
      }
    }
  } catch {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // Default redirect if no access
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/dashboard/:page*",
    "/checkout/:page*",
    "/auth/:page*",
    "/messages",
    "/profile",
    "/checkout"
  ],
};