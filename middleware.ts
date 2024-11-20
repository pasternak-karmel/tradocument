import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import {
  DEFAULT_LOGIN_REDIRECT,
  adminRoutes,
  agentRoutes,
  apiAuthPrefix,
  apiPrefix,
  authRoutes,
  dashboardRoutes,
  devisRoutes,
  publicRoutes,
} from "@/routes";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);
  const isAdminRoute = adminRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isAgentRoute = agentRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isDashboardRoute = dashboardRoutes.includes(nextUrl.pathname);
  const isDevisRoute = devisRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute || isPublicRoute) {
    return NextResponse.next();
  }

  if (isApiRoute) {
    if (!isLoggedIn) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    const callbackUrl = `${nextUrl.pathname}${nextUrl.search}`;
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  const userRole = req.auth?.user?.role;

  if (isAdminRoute && userRole !== "admin") {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (isAgentRoute && userRole !== "traducteur") {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (isDashboardRoute) {
    if (userRole === "user") {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (isDevisRoute) {
    if (userRole !== "user") {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
