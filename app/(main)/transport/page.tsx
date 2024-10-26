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
import {
  Truck,
  Bike,
  Plane,
  Clock,
  ShieldCheck,
  MapPin,
  Package,
  Zap,
  Briefcase,
  FileText,
} from "lucide-react";
import Link from "next/link";

const ServiceCard = ({
  title,
  description,
  icon,
  features,
}: {
  title: string;
  description: string;
  icon: React.JSX.Element;
  // features: {
  //   icon: React.JSX.Element;
  //   text: string;
  // };
  features: any;
}) => (
  <Card className="h-full flex flex-col">
    <CardHeader>
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
        {icon}
      </div>
      <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <ul className="space-y-2">
        {features.map((feature: any, index: number) => (
          <li key={index} className="flex items-center space-x-2">
            {feature.icon}
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default function ServiceTransportCoursier() {
  const courierServices = [
    {
      title: "Livraison Express",
      description: "Service de livraison rapide pour vos envois urgents",
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      features: [
        {
          icon: <MapPin className="h-5 w-5 text-blue-500" />,
          text: "Suivi en temps réel",
        },
        {
          icon: <ShieldCheck className="h-5 w-5 text-blue-500" />,
          text: "Assurance incluse",
        },
      ],
    },
    {
      title: "Livraison Standard",
      description: "Service de livraison fiable pour vos envois réguliers",
      icon: <Package className="h-8 w-8 text-green-500" />,
      features: [
        {
          icon: <Briefcase className="h-5 w-5 text-green-500" />,
          text: "Adapté aux entreprises",
        },
        {
          icon: <FileText className="h-5 w-5 text-green-500" />,
          text: "Rapport de livraison",
        },
      ],
    },
  ];

  const transportTypes = [
    {
      title: "Coursier",
      description: "Livraison écologique et rapide en milieu urbain",
      icon: <Bike className="h-8 w-8 text-yellow-500" />,
      features: [
        {
          icon: <Zap className="h-5 w-5 text-yellow-500" />,
          text: "Idéal pour les courtes distances",
        },
        {
          icon: <Clock className="h-5 w-5 text-yellow-500" />,
          text: "Évite les embouteillages",
        },
        {
          icon: <ShieldCheck className="h-5 w-5 text-yellow-500" />,
          text: "Écologique",
        },
      ],
    },

    {
      title: "DHL",
      description: "Solution pour vos livraisons volumineuses",
      icon: <Plane className="h-8 w-8 text-purple-500" />,
      features: [
        {
          icon: <Package className="h-5 w-5 text-purple-500" />,
          text: "Pour colis volumineux",
        },
        {
          icon: <Briefcase className="h-5 w-5 text-purple-500" />,
          text: "Idéal pour les déménagements",
        },
        {
          icon: <ShieldCheck className="h-5 w-5 text-purple-500" />,
          text: "Équipement de manutention",
        },
      ],
    },
  ];

  return (
    <div className="mt-10 min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center text-gray-900 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Service Transport Coursier
        </motion.h1>

        <motion.p
          className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Des solutions de transport sur mesure pour répondre à tous vos besoins
          de livraison.
        </motion.p>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Services de Coursier
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {courierServices?.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Types de Transport
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {transportTypes?.map((type, index) => (
              <ServiceCard key={index} {...type} />
            ))}
          </div>
        </motion.section>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link href="/services" passHref>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300">
              Voir tous nos services
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
