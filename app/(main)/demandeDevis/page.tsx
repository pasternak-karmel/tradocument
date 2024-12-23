import { Test } from "@/app/(dashboard)/_components/test";
import { LuxuryButton } from "@/components/ui/luxury-button";

export default function DemandeDevis() {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex flex-col justify-center items-center p-4 space-y-8"
      style={{
        backgroundImage: "url('/devisbackground.jpeg')",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black opacity-70"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Traductions Professionnelles
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Obtenez des traductions de haute qualité pour vos documents importants
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <Test mode="modal">
            <LuxuryButton>Demander un Devis</LuxuryButton>
          </Test>
        </div>
      </div>
    </div>
  );
}
