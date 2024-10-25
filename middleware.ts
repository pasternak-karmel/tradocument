// import NextAuth from 'next-auth'
// import { authConfig } from './auth.config'

// export default NextAuth(authConfig).auth

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
// }

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import {
  publicRoutes,
  authRoutes,
  adminRoutes,
  agentRoutes,
  apiAuthPrefix,
  apiPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "./routes";

const roleRedirects: { [key: string]: string } = {
  ADMIN: "/admin/dashboard",
  AGENT: "/agent/dashboard",
  USER: "/dashboard",
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { nextUrl } = request;

  // Check if the pathname starts with any of the protected route prefixes
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isAgentRoute = agentRoutes.some((route) => pathname.startsWith(route));
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isApiRoute = pathname.startsWith(apiPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  // 1. Handle public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 2. Handle API routes
  if (isApiRoute) {
    if (isApiAuthRoute) {
      // Allow all API auth routes
      return NextResponse.next();
    }

    // For other API routes, ensure the user is authenticated
    if (!token) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    return NextResponse.next();
  }

  // 3. Handle auth routes
  if (isAuthRoute) {
    if (token) {
      // Redirect authenticated users away from auth routes
      const redirectUrl =
        roleRedirects[token.role as string] || DEFAULT_LOGIN_REDIRECT;
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    return NextResponse.next();
  }

  // 4. Handle protected routes
  if (!token) {
    // Redirect unauthenticated users to login
    // const redirectUrl = new URL("/auth/login", request.url);
    // redirectUrl.searchParams.set("callbackUrl", pathname);
    // return NextResponse.redirect(redirectUrl);
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  const userRole = token.role as string;
  const roleRedirect = roleRedirects[userRole] || DEFAULT_LOGIN_REDIRECT;

  // 5. Handle role-based access
  if (isAdminRoute && token.role !== "ADMIN") {
    // Redirect non-admin users away from admin routes
    return NextResponse.redirect(new URL(roleRedirect, request.url));
  }

  if (isAgentRoute && token.role !== "AGENT") {
    // Redirect non-agent users away from agent routes
    return NextResponse.redirect(new URL(roleRedirect, request.url));
  }

  if (
    pathname === DEFAULT_LOGIN_REDIRECT &&
    roleRedirect !== DEFAULT_LOGIN_REDIRECT
  ) {
    return NextResponse.redirect(new URL(roleRedirect, request.url));
  }
  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
