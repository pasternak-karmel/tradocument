import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { db } from "./db/drizzle";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { User } from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }: { user: User }) {
      // Add any necessary logic here
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
