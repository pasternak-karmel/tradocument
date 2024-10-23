"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Building2 } from "lucide-react"
import Image from "next/image"

export default function ElegantSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Nos Services de Traduction
        </motion.h2>
        
        <div className="grid gap-12 md:grid-cols-2">
          <motion.div {...fadeInUp}>
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/particul.jpg"
                  alt="Particulier"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white flex items-center">
                    <Users className="mr-3 h-8 w-8" />
                    Pour les Particuliers
                  </h3>
                </div>
              </div>
              <CardContent className="p-8">
                <p className="text-gray-600 leading-relaxed mb-6">
                  Il s&apos;agit d&apos;une traduction officielle de documents administratifs. Elle est revêtue du cachet officiel du traducteur assermenté, d'un numéro de Ne Varietur, de sa signature, ainsi que la date.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Les notaires, les préfectures, les tribunaux, les universités, les consulats ou toutes autres autorités peuvent vous réclamer dans le cadre de vos démarches administratives (équivalence de diplômes, demande de naturalisation, échange du permis de conduire, demande de visa etc.) la traduction assermentée de vos documents officiels.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/pourLes.jpeg"
                  alt="Entreprise"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white flex items-center">
                    <Building2 className="mr-3 h-8 w-8" />
                    Pour les entreprises
                  </h3>
                </div>
              </div>
              <CardContent className="p-8">
                <p className="text-gray-600 leading-relaxed mb-6">
                  Tous documents dont nous pouvons prendre connaissance à l&apos;occasion de l&apos;exécution de nos prestations sont considérés comme strictement confidentiels. Nous nous engageons à respecter le secret professionnel et veillons à ce que nos collaborateurs en fassent de même.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Notre réseau est constitué de traducteurs indépendants spécialisés dans un ou plusieurs domaines bien définis. Bien que maîtrisant plusieurs langues, nos traducteurs traduisent uniquement vers leur langue maternelle. Notre travail est 100% humain. Nous n&apos;avons jamais recours à la traduction automatique.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}