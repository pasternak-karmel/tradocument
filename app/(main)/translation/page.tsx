"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Briefcase,
  CreditCard,
  FileText,
  GraduationCap,
  Scale,
  Truck,
} from "lucide-react";
import { useRouter } from "next/navigation";

// const translationCategories = [
//   {
//     title: "Autres",
//     icon: <FileSignature className="h-6 w-6 text-blue-500" />,
//     color: "bg-blue-100",
//     items: ["Autres"],
//   },
// ];

const translationCategories = [
  {
    title: "Actes d'état civil",
    icon: <FileText className="h-6 w-6 text-white" />,
    gradient: "bg-gradient-to-br from-blue-400 to-blue-600",
    items: [
      "Acte de naissance",
      "Acte de mariage",
      "Acte de décès",
      "Acte de Naturalisation/Nationalité",
      "Acte de reconnaissance",
      "Carte d'identité",
      "Certificat de célibat",
      "Certificat de changement de nom",
      "Déclaration sur l'honneur",
      "Livret de famille",
      "Passeport",
      "Permis de séjour",
      "Procuration",
    ],
  },
  {
    title: "Affaires et Business",
    icon: <Briefcase className="h-6 w-6 text-white" />,
    gradient: "bg-gradient-to-br from-green-400 to-green-600",
    items: ["Bilan", "Contrat", "Convention"],
  },
  {
    title: "Juridique",
    icon: <Scale className="h-6 w-6 text-white" />,
    gradient: "bg-gradient-to-br from-red-400 to-red-600",
    items: [
      "Acte de divorce",
      "Acte notarié",
      "Assignations et Jugements",
      "Casier Judiciaire",
      "Exequatur",
      "Procuration Juridique",
      "Testament",
    ],
  },
  {
    title: "Diplômes et Bulletins",
    icon: <GraduationCap className="h-6 w-6 text-white" />,
    gradient: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    items: [
      "Attestation de scolarité",
      "Attestation de stage",
      "Attestation d'études",
      "Diplôme (Licence, Ingénieurat, Master, Doctorat...)",
      "Relevé de notes Bac/Relevé de notes universitaires avec appréciations",
    ],
  },
  {
    title: "Finance et Commercial",
    icon: <CreditCard className="h-6 w-6 text-white" />,
    gradient: "bg-gradient-to-br from-purple-400 to-purple-600",
    items: ["Avis d'imposition", "Bulletin de salaire", "Relevé de compte"],
  },
  {
    title: "Technique",
    icon: <Truck className="h-6 w-6 text-white" />,
    gradient: "bg-gradient-to-br from-indigo-400 to-indigo-600",
    items: [
      "Appels d'offre",
      "Brevets",
      "Brochures",
      "Cahier des charges",
      "Catalogues Produits",
      "Journaux d'entreprise",
      "Manuels et notices techniques",
      "Newsletters spécialisées",
      "Normes",
      "Rapport d'expertise",
      "Rapport technique",
    ],
  },
];

export default function PageTraduction() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/demandeDevis");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.h1
          className="text-5xl font-extrabold text-gray-800 text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Nos Services de Traduction
        </motion.h1>

        {/* Grid Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {translationCategories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-xl">
                {/* Header */}
                <CardHeader
                  className={`p-6 flex items-center justify-center ${category.gradient}`}
                >
                  {category.icon}
                  <span className="ml-3 text-white text-lg font-semibold">
                    {category.title}
                  </span>
                </CardHeader>

                {/* Content */}
                <CardContent className="p-6 bg-white">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-sm font-medium text-gray-700">
                        Voir les documents
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2">
                          {category.items.map((item, itemIndex) => (
                            <motion.li
                              key={itemIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: itemIndex * 0.1 }}
                              className="text-sm text-gray-600 cursor-pointer hover:text-blue-600 hover:underline"
                              onClick={() => handleClick()}
                            >
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
