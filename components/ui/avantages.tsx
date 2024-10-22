"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Shield, Clock, CheckCircle, ThumbsUp, Zap } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Garantie de qualité",
    description: "Nous collaborons avec les meilleurs traducteurs du monde et appliquons des processus d'assurance qualité avancés.",
    details: "Révision complète et gratuite si vous n'êtes pas satisfait(e).",
    color: "text-blue-500",
  },
  {
    icon: Shield,
    title: "Paiement sécurisé",
    description: "Réglez en toute sécurité avant la livraison par carte de crédit ou PayPal.",
    details: "Vos informations de paiement sont toujours protégées.",
    color: "text-green-500",
  },
  {
    icon: Clock,
    title: "Livraison ponctuelle",
    description: "Plus de 100% des traductions livrées dans les délais grâce à notre flux de travail optimisé.",
    details: "Remboursement jusqu'au coût total en cas de retard.",
    color: "text-purple-500",
  },
  {
    icon: CheckCircle,
    title: "Précision garantie",
    description: "Nos traducteurs experts assurent une précision inégalée dans chaque projet.",
    details: "Révisions illimitées pour une satisfaction totale.",
    color: "text-red-500",
  },
  {
    icon: ThumbsUp,
    title: "Service client exceptionnel",
    description: "Une équipe dédiée à votre disposition 24/7 pour répondre à vos questions.",
    details: "Support multilingue pour une communication fluide.",
    color: "text-yellow-500",
  },
  {
    icon: Zap,
    title: "Technologie de pointe",
    description: "Utilisation d'outils de traduction assistée par ordinateur pour une cohérence optimale.",
    details: "Intégration d'IA pour des suggestions intelligentes.",
    color: "text-indigo-500",
  },
]

export default function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">Nos avantages</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Pourquoi choisir TraDocument?
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-[700px] mx-auto">
            Découvrez comment nous révolutionnons le monde de la traduction avec notre approche innovante et centrée sur le client.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-500 dark:text-gray-400">
                    {feature.description}
                  </CardDescription>
                  <motion.div
                    className="mt-4 text-sm text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0, height: hoveredIndex === index ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.details}
                  </motion.div>
                </CardContent>
                <div className={`absolute bottom-0 left-0 w-full h-1 ${feature.color.replace('text', 'bg')}`} />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}