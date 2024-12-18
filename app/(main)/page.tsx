"use client";
import FeaturesSection from "@/components/ui/avantages";
import { Button } from "@/components/ui/button";
import { Clock, FileText, Globe2, MoveHorizontal, Shield } from "lucide-react";
import Link from "next/link";
import ElegantSection from "../_components/ElegantSection";

export default function TraDocumentLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Section principale */}
      <section className="min-h-screen w-full bg-neutral-950 rounded-md relative flex flex-col items-center antialiased">
        <div className="absolute inset-0 h-full w-full flex items-center justify-center px-4 sm:px-8 py-16 sm:py-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black">
          {/* Motif de fond subtil */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

          <div className="text-center text-white m-4 sm:m-10 space-y-8 relative z-10">
            <div className="flex items-center justify-center gap-2 text-blue-400">
              <Globe2 className="w-6 h-6" />
              <span className="text-sm font-medium">
                Service de Traduction Professionnel
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold tracking-tighter mt-8">
              Traduction Multilingue <br />& <br /> Récuperation de Documents par Procuration
              <br />
              <span className="text-blue-400">
                Simplifiez vos démarches administratives !
              </span>
            </h2>

            <div className="flex flex-col items-center space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
                {[
                  { from: "Arabe", to: "Français" },
                  { from: "Arabe", to: "Anglais" },
                  { from: "Arabe", to: "Espagnol" },
                  { from: "Anglais", to: "Français" },
                  { from: "Espagnol", to: "Français" },
                  { from: "Espagnol", to: "Anglais" },
                ].map((pair, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center bg-white/5 rounded-lg p-3"
                  >
                    <span className="w-1/3 text-right text-sm">
                      {pair.from}
                    </span>
                    <MoveHorizontal className="mx-4 text-blue-400" />
                    <span className="w-1/3 text-left text-sm">{pair.to}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <span>Réception et Livraison de Documents</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>Service Express Disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span>Documents Certifiés</span>
              </div>
            </div>

            <p className="text-lg sm:text-xl max-w-[700px] mx-auto text-gray-300">
              Tradocument.com - Votre partenaire de confiance pour la traduction
              professionnelle et la gestion de vos documents administratifs en
              toute simplicité.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto px-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg transition-all"
              >
                <Link href="/demandeDevis" className="w-full text-center">
                  Demander un Devis
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg border-blue-400 text-blue-400 hover:bg-gray-200"
              >
                <Link href="/services" className="w-full text-center">
                  Découvrir nos Services
                </Link>
              </Button>
            </div>
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
