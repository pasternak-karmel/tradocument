"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ClipboardList,
  Clock,
  FileText,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import { useRouter } from "next/navigation"; // Utilisé pour naviguer

export default function NosServices() {
  const router = useRouter(); // Initialiser le routeur

  const services = [
    {
      title: "Aide Administrative",
      icon: <FileText className="h-12 w-12 text-blue-500" />,
      description:
        "Assistance pour vos démarches administratives et traductions de documents officiels.",
      features: [
        {
          icon: <ClipboardList className="h-5 w-5" />,
          text: "Traduction de documents officiels",
        },
        {
          icon: <FileText className="h-5 w-5" />,
          text: "Assistance pour les formulaires administratifs",
        },
        {
          icon: <Clock className="h-5 w-5" />,
          text: "Service rapide et efficace",
        },
      ],
      cta: "Demander une traduction",
      color: "from-[#F49C60]",
      href: "/nouvelleDevis", // Lien pour ce bouton
    },
    {
      title: "Service récupération et livraison de documents avec procuration",
      icon: <Truck className="h-12 w-12 text-green-500" />,
      description: "Livraison rapide et sécurisée de vos documents important.",
      features: [
        {
          icon: <Package className="h-5 w-5" />,
          text: "Livraison de documents",
        },
        { icon: <Clock className="h-5 w-5" />, text: "Livraison rapide" },
        {
          icon: <MapPin className="h-5 w-5" />,
          text: "Envoi des documents par boite mail",
        },
      ],
      cta: "Organiser une livraison",
      color: "from-green-500 to-emerald-500",
      href: "/nouvelle_devis", // Lien pour ce bouton
    },
  ];

  return (
    <div className="mt-10 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center text-gray-900 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nos Services
        </motion.h1>

        <motion.p
          className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Découvrez notre gamme de services conçus pour simplifier vos démarches
          et faciliter vos envois.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center space-x-2">
                        {feature.icon}
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full bg-gradient-to-r ${service.color} text-white`}
                    onClick={() => router.push(service.href)} // Redirection au clic
                  >
                    {service.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
