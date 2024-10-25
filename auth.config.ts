import type { NextAuthConfig } from "next-auth";

import bcrypt from "bcryptjs";

import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUserByEmail, getUserById } from "./data/user";
import { getAccountByUserId } from "./data/account";

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

          if (passwordsMatch) return user;
          else {
            return null;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith("/auth/login");
      const isOnSignupPage = nextUrl.pathname.startsWith("/auth/register");

      if (isLoggedIn) {
        if (isOnLoginPage || isOnSignupPage) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
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

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      session.user.id = token.id ? (token.id as string) : "";

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
    };
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken?: string;
//   }
// }
