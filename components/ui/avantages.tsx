"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Globe, Shield, ThumbsUp, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./button";

const features = [
  {
    icon: Globe,
    title: "Garantie de qualité",
    description:
      "Nous collaborons avec les meilleurs traducteurs du monde et appliquons des processus d'assurance qualité avancés.",
    details: "Révision complète et gratuite si vous n'êtes pas satisfait(e).",
    color: "text-blue-500",
  },
  {
    icon: Shield,
    title: "Paiement sécurisé",
    description:
      "Réglez en toute sécurité avant la livraison par carte de crédit ou PayPal.",
    details: "Vos informations de paiement sont toujours protégées.",
    color: "text-green-500",
  },
  {
    icon: Clock,
    title: "Livraison ponctuelle",
    description:
      "Plus de 100% des traductions livrées dans les délais grâce à notre flux de travail optimisé.",
    details: "Remboursement jusqu'au coût total en cas de retard.",
    color: "text-purple-500",
  },
  {
    icon: CheckCircle,
    title: "Précision garantie",
    description:
      "Nos traducteurs experts assurent une précision inégalée dans chaque projet.",
    details: "Révisions illimitées pour une satisfaction totale.",
    color: "text-red-500",
  },
  {
    icon: ThumbsUp,
    title: "Service client exceptionnel",
    description:
      "Une équipe dédiée à votre disposition 24/7 pour répondre à vos questions.",
    details: "Support multilingue pour une communication fluide.",
    color: "text-yellow-500",
  },
  {
    icon: Zap,
    title: "Technologie de pointe",
    description:
      "Utilisation d'outils de traduction assistée par ordinateur pour une cohérence optimale.",
    details: "Intégration d'IA pour des suggestions intelligentes.",
    color: "text-indigo-500",
  },
];

export default function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="container px-4 md:px-6 mt-8">
      {/* Section du texte */}
      <div className="flex flex-col lg:flex-row justify-between items-center px-4 md:px-8 py-12 bg-white">
      <div className="lg:w-1/2 mb-8 lg:mb-0">
        <h2 className="text-3xl font-bold text-black mb-6 lg:text-4xl">
          QUI SOMMES-NOUS ?
        </h2>
        <p className="text-lg leading-relaxed text-gray-800 mb-6">
          Si vous recherchez des services de traduction rapides et de qualité
          optimale, Tradocument.com vous propose des solutions linguistiques
          harmonisées et d&apos;une fiabilité absolue. Nous sommes en mesure de
          vous proposer des traductions pertinentes adaptées à un domaine
          particulier. Tradocument.com travaille avec des traducteurs
          assermentés en langues maternelles, très expérimentés dans leurs
          domaines de spécialisation respectifs. Nous traduisons et certifions
          vos documents officiels, tels que :
        </p>
        <Link href="/apropos">
          <Button className="bg-blue-900 text-white px-6 py-5 rounded-md hover:bg-blue-700 transition-all duration-300">
            En savoir plus
          </Button>
        </Link>
      </div>

      {/* Section Image */}
      <div className="lg:w-1/2 relative">
        <img
          src="./accueil1.jpg"
          alt="Illustration d'un traducteur"
          className="w-full h-auto rounded-lg shadow-lg"
        />
        <div className="absolute bottom-0 left-4 bg-blue-900 text-white p-6 rounded-md shadow-lg transform translate-y-1/2">
          <h3 className="text-3xl font-bold mb-1">
            25<span className="text-xl">+</span>
          </h3>
          <p className="text-sm uppercase tracking-wider">
            Années d&apos;expériences
          </p>
        </div>
      </div>
      </div>
      {/* Section des cartes centrées */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-16 justify-center">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-700/30">
              <CardHeader>
                <feature.icon className={`h-12 w-12 ${feature.color}`} />
                <CardTitle className="text-xl font-bold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  {feature.description}
                </CardDescription>
                <motion.div
                  className="mt-4 text-sm text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    height: hoveredIndex === index ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.details}
                </motion.div>
              </CardContent>
              <div
                className={`absolute bottom-0 left-0 w-full h-1 ${feature.color.replace(
                  "text",
                  "bg"
                )}`}
              ></div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
