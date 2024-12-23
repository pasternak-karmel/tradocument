import { Test } from "@/app/(dashboard)/_components/test";
import { Button } from "@/components/ui/button";

export default function DemandeDevis() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex justify-center items-center p-4 md:p-8">
      <Test mode="redirect">
        <Button 
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg px-8 py-4 rounded-full
                     hover:from-blue-700 hover:to-blue-800 transition-all duration-300
                     shadow-lg hover:shadow-xl hover:shadow-blue-200"
        >
          Demander un Devis
        </Button>
      </Test>
    </div>
  );
}

