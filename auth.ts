import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { db } from "./db/drizzle";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  // update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      // await db
      //   .update(users)
      //   .set({
      //     emailVerified: new Date(),
      //   })
      //   .where(eq(users.id, user.id));
      // await db.user.update({
      //   where: { id: user.id },
      //   data: { emailVerified: new Date() },
      // });
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
