"use client";
import { Button } from "@/components/ui/button";
import FeaturesSection from "@/components/ui/avantages";
import Link from "next/link";
import ElegantSection from "../_components/ElegantSection";

export default function TraDocumentLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Section principale */}
      <section className="min-h-screen w-full bg-neutral-950 rounded-md relative flex flex-col items-center antialiased">
        <div className="absolute inset-0 h-full w-full flex items-center justify-center px-4 sm:px-8 py-16 sm:py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]">
          <div className="text-center text-white m-4 sm:m-10 space-y-8 sm:space-y-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mt-16">
              Traduction rapide réalisée par des professionnels qualifiés
            </h2>
            <div className="flex flex-col items-center space-y-4 sm:space-y-6">
              <div className="flex items-center justify-center w-full max-w-md">
                <span className="w-1/3 text-right text-xl sm:text-2xl md:text-3xl pr-2 sm:pr-4">Arabe</span>
                <span className="w-12 sm:w-16 text-center text-2xl sm:text-3xl md:text-4xl">→</span>
                <span className="w-1/3 text-left text-xl sm:text-2xl md:text-3xl pl-2 sm:pl-4">Français</span>
              </div>
              <div className="flex items-center justify-center w-full max-w-md">
                <span className="w-1/3 text-right text-xl sm:text-2xl md:text-3xl pr-2 sm:pr-4">Français</span>
                <span className="w-12 sm:w-16 text-center text-2xl sm:text-3xl md:text-4xl">→</span>
                <span className="w-1/3 text-left text-xl sm:text-2xl md:text-3xl pl-2 sm:pl-4">Arabe</span>
              </div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl max-w-[300px] sm:max-w-[500px] md:max-w-[700px] mx-auto">
              Tradocument.com vous propose une traduction harmonisée et une fiabilité absolue
            </p>
            <Button
              size={"lg"}
              className="p-4 sm:p-6 md:p-8 text-lg sm:text-xl md:text-2xl w-full sm:w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-[#F49C60] group transition-all gap-4 hover:shadow-3xl hover:shadow-neutral-500 duration-500"
            >
              <span className="bg-clip-text text-white bg-gradient-to-r from-neutral-500 to-neutral-600 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                <Link href="/apropos">A propos de nous</Link>
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Sections secondaires */}
      <main className="flex-grow w-full flex flex-col items-center justify-center px-4 sm:px-8">
        {/* Centrage du FeaturesSection */}
        <div className="w-full flex flex-col items-center justify-center">
          <FeaturesSection />
        </div>

        <div className="w-full flex flex-col items-center justify-center mt-10">
          <ElegantSection />
        </div>
      </main>
    </div>
  );
}