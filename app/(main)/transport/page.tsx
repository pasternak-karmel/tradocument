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
import { FileText, Truck, Lock, Clock } from "lucide-react";
import Link from "next/link";

const FeatureCard = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <motion.div
    className="bg-white rounded-xl p-6 shadow-md flex items-center space-x-4"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {icon}
    <span className="text-gray-800 text-lg font-medium">{text}</span>
  </motion.div>
);

export default function SimplifiedCourierService() {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      text: "Récupération des documents auprès des institutions(administrations, entreprises, etc.).",
    },
    {
      icon: <Truck className="h-8 w-8 text-green-500" />,
      text: "Livraison sécurisée des documents au client ou à l’adresse de son choix.",
    },
    {
      icon: <Lock className="h-8 w-8 text-purple-500" />,
      text: "Confidentialité et fiabilité garanties",
    },
    {
      icon: <Clock className="h-8 w-8 text-yellow-500" />,
      text: "Respect des délais et efficacité",
    },
  ];

  return (
    <div className="min-h-screen mt-12 bg-gray-50">
      <div className="relative z-10 max-w-6xl mx-auto py-16 px-4 sm:px-8 lg:px-16">
        {/* Titre principal */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-gray-900">
            Récupération et Livraison de Documents avec Procuration
          </h1>
          <p className="text-xl md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-2">
            Solution complète et simplifiée pour la gestion de vos documents administratifs et professionnels.
            </p>
            <p className="text-xl md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Grâce à une procuration, nous prenons en charge l'ensemble du processus pour vous.
          </p>
        </motion.div>

        {/* Caractéristiques */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>

        {/* Carte de service */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <Card className="bg-white border border-gray-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-gray-900">
                Pourquoi choisir notre service ?
              </CardTitle>
              <CardDescription className="text-center text-gray-600 text-lg">
                Idéal pour les clients ayant des contraintes de temps ou de déplacement
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-700">
                Notre solution pratique et efficace répond à vos besoins administratifs en toute sérénité,
                vous permettant de vous concentrer sur ce qui compte vraiment pour vous.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Boutons d'appel à l'action */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link href="/nouvelle_devis" passHref>
            <Button className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 w-full sm:w-auto shadow-lg hover:shadow-gray-400/50">
              Demander un devis
            </Button>
          </Link>
          <Link href="/rejoindre" passHref>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 w-full sm:w-auto shadow-lg hover:shadow-blue-400/50">
              Rejoindre notre équipe
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
