import NextAuth from "next-auth";

// declare module "next-auth/jwt" {
//   interface JWT {
//     role?: string;
//   }
// }

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }
}
