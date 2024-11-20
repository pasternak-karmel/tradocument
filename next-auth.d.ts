import "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string;
    role?: string;
  }
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      role?: string;
      isOAuth: boolean;
      two_factor_enabled: boolean;
      name: string;
      email: string;
      image: string;
    } & DefaultSession["user"];
  }
}
