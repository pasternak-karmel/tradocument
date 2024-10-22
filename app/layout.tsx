import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
import { EdgeStoreProvider } from "@/lib/edgestore";

import { QueryProviders } from "@/providers/query-providers";
import { Toaster } from "sonner";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <QueryProviders>
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </QueryProviders>
          <Toaster/>
        </body>
      </html>
    // </ClerkProvider>
  );
}
