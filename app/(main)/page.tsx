"use client";
import FeaturesSection from "@/components/ui/avantages";
import { Button } from "@/components/ui/button";
import FeatureAccueil from "@/components/user/accueil/feature";
import { Clock, FileText, Globe2, MoveHorizontal, Shield } from "lucide-react";
import Link from "next/link";
import ElegantSection from "../_components/ElegantSection";

export default function TraDocumentLanding() {
  const translationPairs = [
    { from: "Arabe", to: "Français" },
    { from: "Arabe", to: "Anglais" },
    { from: "Arabe", to: "Espagnol" },
    { from: "Anglais", to: "Français" },
    { from: "Espagnol", to: "Français" },
    { from: "Espagnol", to: "Anglais" },
  ];

  const features = [
    { icon: FileText, text: "Réception et Livraison de Documents" },
    { icon: Clock, text: "Service Express Disponible" },
    { icon: Shield, text: "Documents Certifiés" },
  ];
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Section principale */}
      <section
        className="min-h-screen w-full bg-neutral-950 rounded-md relative flex flex-col items-center antialiased"
        style={{
          backgroundImage: "url('/transport.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: 3,
        }}
      >
        {/* Image de fond */}
        <div className="absolute inset-0 bg-cover bg-center opacity-50"></div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 h-full w-full flex items-center justify-center px-4 sm:px-8 py-16 sm:py-24 text-center text-white z-10">
          <div className="text-center m-4 sm:m-10 space-y-8">
            <div className="flex items-center justify-center gap-2 text-blue-400">
              <Globe2 className="w-6 h-6" />
              <span className="text-sm font-medium">
                Service de Traduction Professionnel
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold tracking-tighter mt-8">
              Traduction Multi-langue <br />& <br /> Récupération de Documents
              par Procuration
              <br />
              <span className="text-blue-400">Simplifiez vos démarches !</span>
            </h2>

            <div className="flex flex-col items-center space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
                {translationPairs.map((pair, index) => (
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
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <feature.icon className="w-5 h-5 text-blue-400" />
                  <span>{feature.text}</span>
                </div>
              ))}
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
                className="w-full sm:w-auto rounded-full px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg border-blue-400 text-blue-400 hover:bg-blue-200 hover:text-blue-600"
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
        <div className="w-full flex flex-col mb-10 items-center justify-center">
          <FeaturesSection />

        </div>
        <div className="w-full flex flex-col items-center justify-center mb-10 ">
          <FeatureAccueil />
        </div>
        {/* <div className="w-full h-24 mt-10 flex flex-col items-center justify-center">
          <IconsSections />
        </div> */}
        <div className="w-full flex flex-col items-center justify-center ">
          <ElegantSection />
        </div>
      </main>
    </div>
  );
}
