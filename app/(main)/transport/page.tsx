"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, FileText, Lock, Truck } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <FileText className="h-12 w-12 text-indigo-500" />,
    title: "Gestion Simplifiée",
    description:
      "Récupération des documents auprès des institutions en toute simplicité.",
  },
  {
    icon: <Truck className="h-12 w-12 text-teal-500" />,
    title: "Livraison Sécurisée",
    description:
      "Vos documents sont livrés en toute sécurité, à l’adresse de votre choix.",
  },
  {
    icon: <Lock className="h-12 w-12 text-purple-500" />,
    title: "Confidentialité Garantie",
    description:
      "Une gestion discrète et fiable pour votre tranquillité d’esprit.",
  },
  {
    icon: <Clock className="h-12 w-12 text-yellow-500" />,
    title: "Respect des Délais",
    description: "Livraison rapide et conforme à vos attentes, sans compromis.",
  },
];

export default function CourierServicePage() {
  return (
    <div className="bg-gradient-to-b from-indigo-100 via-white to-blue-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section
        className="relative text-white py-20 px-6 md:px-12 flex flex-col justify-center items-center"
        style={{
          backgroundImage: "url('/transport2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%", // L'image s'ajuste à la largeur du conteneur
          height: "auto",
          objectFit: "cover", // Cela permet de remplir l'espace sans déformer l'image
        }}
      >
        {/* Overlay pour noircir l'image */}
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        {/* Contenu de la Hero Section */}
        <motion.div
          className="max-w-5xl mx-auto text-center z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Service Premium de Récupération et Livraison de Documents
          </h1>
          <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto">
            Simplifiez la gestion de vos démarches administratives et
            professionnelles grâce à notre service clé en main, avec procuration
            sécurisée.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/nouvelle_devis" passHref>
              <Button className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all">
                Demander un devis
              </Button>
            </Link>
            <Link href="/rejoindre" passHref>
              <Button className="bg-blue-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all">
                Rejoindre notre équipe
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {feature.icon}
            <h3 className="text-xl font-bold text-gray-800 mt-4">
              {feature.title}
            </h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
