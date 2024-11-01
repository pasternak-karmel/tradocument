import type { Metadata } from "next";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import localFont from "next/font/local";
import "./globals.css";

import { SessionProvider } from "next-auth/react";
import { QueryProviders } from "@/providers/query-providers";
import { EdgeStoreProvider } from "@/lib/edgestore";

import { auth } from "@/auth";

import { Toaster } from "sonner";

import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TraDocument ",
  description: "Le site de rérérence vos traductions en toute simplicité",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <ReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      >
        <html lang="en">
          <body
            className={`${font.className} ${geistMono.variable} antialiased`}
          >
            <QueryProviders>
              <EdgeStoreProvider>{children}</EdgeStoreProvider>
            </QueryProviders>
            <Toaster />
          </body>
        </html>
      </ReCaptchaProvider>
    </SessionProvider>
  );
}
