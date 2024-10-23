import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";

import { Button } from "@/components/ui/button";

import Footer from "@/app/_components/footer";
import { NavBar } from "@/app/_components/navigation";
import { LoginButton } from "@/components/auth/login-button";
const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <div className="h-full ">
      <div className="flex h-auto justify-between items-center sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={150}
            className="m-2"
          />
        </Link>
        <NavBar />
        {session ? (
          <Link href="/dashboard">
            <Button variant="secondary" size="lg">
              Tableau de board
            </Button>
          </Link>
        ) : (
          <LoginButton asChild>
            <Button variant="secondary" size="lg">
              Se connecter
            </Button>
          </LoginButton>
        )}
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
