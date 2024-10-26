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
  const { pathname, search } = request.nextUrl;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isApiRoute = pathname.startsWith(apiPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  console.log("Token on Vercel:", token);
  console.log("Pathname:", pathname);
  console.log("Is Public Route:", isPublicRoute);
  console.log("Is Authenticated:", !!token);

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (isApiRoute) {
    if (isApiAuthRoute) {
      return NextResponse.next();
    }

    if (!token) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (token) {
      const redirectUrl =
        roleRedirects[token.role as string] || DEFAULT_LOGIN_REDIRECT;
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    const callbackUrl = `${pathname}${search}`;
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, request.url)
    );
  }

  const userRole = token.role as string;
  const roleRedirect = roleRedirects[userRole] || DEFAULT_LOGIN_REDIRECT;

  if (
    adminRoutes.some((route) => pathname.startsWith(route)) &&
    token.role !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL(roleRedirect, request.url));
  }

  if (
    agentRoutes.some((route) => pathname.startsWith(route)) &&
    token.role !== "TRADUCTEUR"
  ) {
    return NextResponse.redirect(new URL(roleRedirect, request.url));
  }

  if (
    pathname === DEFAULT_LOGIN_REDIRECT &&
    roleRedirect !== DEFAULT_LOGIN_REDIRECT
  ) {
    return NextResponse.redirect(new URL(roleRedirect, request.url));
  }

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
