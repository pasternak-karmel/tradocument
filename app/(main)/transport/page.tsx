"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Clock, ShieldCheck, MapPin, Package } from "lucide-react";
import Link from "next/link";

const ServiceCard = ({
  title,
  description,
  features,
}: {
  title: string;
  description: string;
  features: { icon: React.ReactNode; text: string }[];
}) => (
  <Card className="h-full flex flex-col shadow-lg rounded-lg bg-white border">
    <CardHeader>
      <div className="text-center mb-4">
        <Mail className="h-12 w-12 text-indigo-500 mx-auto" />
      </div>
      <CardTitle className="text-3xl font-bold text-center text-gray-900">
        {title}
      </CardTitle>
      <CardDescription className="text-center text-gray-600 text-lg">
        {description}
      </CardDescription>
    </CardHeader>
    <CardContent className="flex-grow mt-6">
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center space-x-4 border-b last:border-none pb-2"
          >
            {feature.icon}
            <span className="text-gray-700 text-lg">{feature.text}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default function SimplifiedCourierService() {
  const courierService = {
    title: "Livraison Numérique Sécurisée",
    description:
      "Transférez vos documents en toute sérénité depuis n'importe où vers l'email de vos destinataires.",
    features: [
      {
        icon: <Clock className="h-6 w-6 text-indigo-500" />,
        text: "Livraison rapide et efficace",
      },
      {
        icon: <ShieldCheck className="h-6 w-6 text-indigo-500" />,
        text: "Sécurité garantie des documents",
      },
      {
        icon: <MapPin className="h-6 w-6 text-indigo-500" />,
        text: "Suivi en temps réel",
      },
      {
        icon: <Package className="h-6 w-6 text-indigo-500" />,
        text: "Compatibilité avec divers formats",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto text-center">
        {/* Titre principal */}
        <motion.h1
          className="text-4xl m-3 font-extrabold text-gray-900 tracking-tight mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Livraison Numérique Simplifiée
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Envoyez vos documents en toute simplicité grâce à notre service
          numérique sécurisé. Que ce soit pour un usage personnel ou
          professionnel, profitez d&apos;une livraison rapide, fiable et suivie en
          temps réel.
        </motion.p>

        {/* Carte de service */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <ServiceCard {...courierService} />
        </motion.div>

        {/* Boutons d'appel à l'action */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/nouvelle_devis" passHref>
            <Button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 w-full sm:w-auto shadow-md">
              Demander un devis
            </Button>
          </Link>
          <Link href="/rejoindre" passHref>
            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 w-full sm:w-auto shadow-md">
              Rejoindre notre équipe
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
