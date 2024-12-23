"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Truck } from 'lucide-react';
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NosServices() {
  const router = useRouter();

  const services = [
    {
      title: "Aide Administrative",
      icon: <FileText className="h-12 w-12 text-blue-500" />,
      description:
        "Assistance pour vos démarches administratives et traductions de documents officiels.",
      features: [
        "Traduction de documents officiels",
        "Assistance pour les formulaires administratifs",
        "Service rapide et efficace",
      ],
      cta: "Demander une traduction",
      color: "from-blue-500 to-indigo-600",
      href: "/nouvelleDevis",
      image: "/aide.png",
    },
    {
      title: "Service récupération et livraison de documents",
      icon: <Truck className="h-12 w-12 text-green-500" />,
      description: "Livraison rapide et sécurisée de vos documents importants.",
      features: [
        "Livraison de documents",
        "Livraison rapide",
        "Envoi des documents par boite mail",
      ],
      cta: "Organiser une livraison",
      color: "from-green-500 to-emerald-600",
      href: "/nouvelle_devis",
      image: "/recuperation.jpg",	
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Nos Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme de services conçus pour simplifier vos démarches
            et faciliter vos envois.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={service.image}
                  alt={service.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{service.title}</h2>
                  <p className="text-gray-200">{service.description}</p>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center space-x-3">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full bg-gradient-to-r ${service.color} text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                  onClick={() => router.push(service.href)}
                >
                  {service.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

