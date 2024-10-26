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

  //autorise the public route
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
  // console.log(userRole);
  const roleRedirect = roleRedirects[userRole] || DEFAULT_LOGIN_REDIRECT;

  // 5. Handle role-based access
  if (isAdminRoute && token.role !== "ADMIN") {
    // Redirect non-admin users away from admin routes
    return NextResponse.redirect(new URL(roleRedirect, nextUrl));
  }

  if (isAgentRoute && token.role !== "AGENT") {
    return NextResponse.redirect(new URL(roleRedirect, request.url));
  }

  console.log("Token on Vercel:", token);
  console.log("Pathname:", pathname);
  console.log("Is Public Route:", isPublicRoute);
  console.log("Is Authenticated:", !!token);
  if (
    pathname === DEFAULT_LOGIN_REDIRECT &&
    roleRedirect !== DEFAULT_LOGIN_REDIRECT
  ) {
    return NextResponse.redirect(new URL(roleRedirect, nextUrl));
  }
  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

// import NextAuth from 'next-auth'
// import { authConfig } from './auth.config'

// export default NextAuth(authConfig).auth

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
// }
