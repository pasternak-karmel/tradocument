import type { NextAuthConfig } from "next-auth";

import bcrypt from "bcryptjs";

import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUserByEmail, getUserById } from "./data/user";
import { getAccountByUserId } from "./data/account";
import { db } from "./db/drizzle";

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  providers: [
    Google,
    Github,
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          return passwordsMatch ? user : null;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      // const existingUser = await getUserById(user?.id!);

      // if (!existingUser?.emailVerified) return false;

      // Delete two factor confirmation for next sign in
      // await db.twoFactorConfirmation.delete({
      //   where: { id: twoFactorConfirmation.id },
      // });

      return true;
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith("/auth/login");
      const isOnSignupPage = nextUrl.pathname.startsWith("/auth/register");

      if (isLoggedIn && (isOnLoginPage || isOnSignupPage)) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    async jwt({ token, trigger, session, account }) {
      if (trigger === "update") {
        token.name = session.user.name;
      }

      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token };
      }

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.id = existingUser.id;

      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      // if (session.user) {
      //   session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      // }

      if (session.user) {
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      role: string;
      isOAuth: boolean;
    };
  }
}
