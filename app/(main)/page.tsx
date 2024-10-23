"use client";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/global/navbar";
import FeaturesSection from "@/components/ui/avantages";
import Link from "next/link";
import { ContainerScroll } from "@/components/global/container-scroll-animation";
import ElegantSection from "../_components/ElegantSection";

export default function TraDocumentLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link className="flex items-center space-x-2" href="#">
              <FileText className="h-6 w-6" />
              <span className="inline-block font-bold">TraDocument</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Link className=" text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="#">
                Features
              </Link>
              <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="#">
                Pricing
              </Link>
              <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="#">
                About
              </Link>
              <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="#">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header> */}

      <section className="h-screen w-full  bg-neutral-950 rounded-md  !overflow-visible relative flex flex-col items-center  antialiased">
        <div className="absolute inset-0  h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
        <div className="flex flex-col mt-[-100px] md:mt-[-50px]">
          <ContainerScroll
            titleComponent={
              <div className="flex items-center justify-center flex-col">
                <Button
                  size={"lg"}
                  className="p-8 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
                    <Link href="/apropos">A propos</Link>
                  </span>
                </Button>
                <h1 className="text-5xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                  Traduction rapides et de qualité optimale
                </h1>
              </div>
            }
          />
        </div>
      </section>

      {/* <div  className="flex justify-between items-center  ">
        <Image src="/logo.png" alt="Logo" width={150} height={150} className="m-2"/>
        <NavBar/>
        <Button className="m-2">Sign in</Button>
        </div> */}

      <main className="flex-grow">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 "></section>
        <FeaturesSection />
        <ElegantSection />
      </main>
    </div>
  );
}
