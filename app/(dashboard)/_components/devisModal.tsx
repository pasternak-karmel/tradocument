"use client";

import { motion } from "framer-motion";
import { FileSignature, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface OptionCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  onClick: () => void;
  color: string;
}

const DevisModal = () => {
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  const handleButtonClick = (route: string) => {
    setShowModal(false);
    router.push(route);
  };

  if (!showModal) {
    return <div className="min-h-screen flex justify-center items-center">Chargement...</div>
  }
  
  return (
    <div className="fixed inset-0  flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-2xl"
      >
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Demande de Devis
          </h2>
          <p className="text-gray-600 mb-8">
            Sélectionnez le type de devis qui correspond à votre situation.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <OptionCard
              icon={<FileText className="w-12 h-12 text-blue-500" />}
              title="J'ai le document"
              description="Téléchargez votre document et obtenez un devis immédiat pour la traduction."
              onClick={() => handleButtonClick("/devis/nouvelle_devis")}
              color="blue"
            />
            <OptionCard
              icon={<FileSignature className="w-12 h-12 text-green-500" />}
              title="Je n'ai pas le document en ma possession"
              description="Nous récupérerons le document via une procuration avant de le traduire."
              onClick={() => handleButtonClick("devis/nouvelleDevis")}
              color="green"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DevisModal;

function OptionCard({
  icon,
  title,
  description,
  onClick,
  color,
}: OptionCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer border-2 border-${color}-100 hover:border-${color}-300 transition-colors duration-300`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        {icon}
        <h3 className={`mt-4 text-xl font-semibold text-${color}-600`}>
          {title}
        </h3>
        <p className="mt-2 text-gray-500 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}
