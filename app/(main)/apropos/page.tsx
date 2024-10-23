"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Target, Lightbulb } from "lucide-react";
import { NavBar } from "@/app/_components/navigation";
import Footer from "@/app/_components/footer";

const teamMembers = [
  {
    name: "Sophie Martin",
    role: "Fondatrice & PDG",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Thomas Dubois",
    role: "Directeur Technique",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Emma Leroy",
    role: "Responsable des Opérations",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Lucas Petit",
    role: "Chef de Projet",
    image: "/placeholder.svg?height=100&width=100",
  },
];

const values = [
  {
    icon: CheckCircle,
    title: "Qualité",
    description:
      "Nous nous engageons à fournir des traductions de la plus haute qualité.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Nous travaillons en étroite collaboration avec nos clients et nos traducteurs.",
  },
  {
    icon: Target,
    title: "Précision",
    description:
      "Nous visons la précision dans chaque mot que nous traduisons.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Nous adoptons les dernières technologies pour améliorer nos services.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="mt-3 text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          À propos de TraDocument
        </motion.h1>

        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Notre Histoire</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600 dark:text-gray-300">
                Fondée en 2015, TraDocument est née de la vision de Sophie
                Martin, une linguiste passionnée qui a reconnu le besoin de
                services de traduction de haute qualité dans un monde de plus en
                plus connecté. Depuis nos humbles débuts dans un petit bureau
                parisien, nous avons grandi pour devenir un leader de
                l&apos;industrie, servant des clients dans le monde entier.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Au fil des années, nous avons constamment innové, intégrant les
                dernières technologies de traduction assistée par ordinateur et
                d&apos;intelligence artificielle pour améliorer notre efficacité
                tout en maintenant la touche humaine essentielle à des
                traductions de qualité.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Notre Mission</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600 dark:text-gray-300">
                Chez TraDocument, notre mission est de briser les barrières
                linguistiques et de faciliter la communication mondiale. Nous
                nous efforçons de fournir des traductions précises,
                culturellement appropriées et rapides, permettant à nos clients
                de se connecter efficacement avec leur public international.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <value.icon className="w-6 h-6 mr-2 text-primary" />
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Notre Équipe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{member.name}</h3>
                  <Badge variant="secondary" className="mt-2">
                    {member.role}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
