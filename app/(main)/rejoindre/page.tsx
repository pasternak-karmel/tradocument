"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Briefcase,
  GraduationCap,
  Globe,
  Send,
  Upload,
} from "lucide-react";

export default function RejoignezNous() {
  const benefits = [
    {
      icon: <Users className="h-6 w-6 text-blue-500" />,
      title: "Équipe Dynamique",
      description: "Rejoignez une équipe passionnée et collaborative.",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-green-500" />,
      title: "Projets Variés",
      description: "Travaillez sur une diversité de projets stimulants.",
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-purple-500" />,
      title: "Traduction de qualité",
      description:
        "Bénéficiez d'une traduction optimale de l'Arabe au Francais et du Francais en Arabe",
    },
    {
      icon: <Globe className="h-6 w-6 text-pink-500" />,
      title: "Impact Global",
      description: "Contribuez à des projets d'envergure internationale.",
    },
  ];

  const specialties = [
    "Traducteur/trice agréé",
    "Avocat/e agréé",
    "Notaire agréé",
    "Huissier de Justice agréé",
    "Coursier Taxi",
    "Coursier Privé",
  ];

  return (
    <div className="mt-10 min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center text-gray-900 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Rejoignez Notre Équipe
        </motion.h1>

        <motion.p
          className="text-xl text-center text-gray-700 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Vous êtes passionné par les langues et la communication
          interculturelle ? Nous recherchons des talents comme vous !
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <div className="bg-gray-100 p-2 rounded-full">
                  {benefit.icon}
                </div>
                <CardTitle className="text-xl font-semibold">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Intéressé(e) ? Contactez-nous !
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Nom" />
                  <Input placeholder="Prénom" />
                  <Input placeholder="Pays" />
                  <Input placeholder="Ville" />
                  <Input placeholder="Adresse" />
                  <Input placeholder="Numéero de téléphone" />
                </div>
                <Input type="email" placeholder="E mail:" />
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisissez votre spécialité" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty, index) => (
                      <SelectItem
                        key={index}
                        value={specialty.toLowerCase().replace(/ /g, "-")}
                      >
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-col items-center space-y-2">
                  <label
                    htmlFor="certificate"
                    className="cursor-pointer flex flex-col items-center justify-center w-full p-4 border border-dashed border-blue-400 rounded-lg bg-blue-50 hover:bg-blue-100 transition duration-300 ease-in-out"
                  >
                    {" "}
                    Téléchargez votre certificat
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-10 w-10 text-blue-700 mb-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v4.5h4.5m-4.5-4.5L20.25 3m0 0h-6.75M20.25 3v6.75"
                      />
                    </svg>
                    <span className="text-sm text-blue-700 font-medium">
                      Cliquez pour télécharger un fichier
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Formats acceptés : PDF, JPG, PNG (max 5MB)
                    </span>
                  </label>
                  <input id="certificate" type="file" className="hidden" />
                </div>
                <Button className="w-500 ml-5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                  <Send className="mr-2 h-4 w-4" /> Envoyer ma candidature
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
