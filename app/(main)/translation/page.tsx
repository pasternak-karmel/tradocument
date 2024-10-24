"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Briefcase, Scale, GraduationCap, CreditCard, Truck, FileSignature } from "lucide-react"

const translationCategories = [
  {
    title: "Actes d'état civil",
    icon: <FileText className="h-6 w-6 text-blue-500" />,
    color: "bg-blue-100",
    items: ["Acte de naissance", "Acte de mariage", "Acte de décès", "Carte d'identité", "Passeport"]
  },
  {
    title: "Affaires et Business",
    icon: <Briefcase className="h-6 w-6 text-green-500" />,
    color: "bg-green-100",
    items: ["Bilan", "Contrat", "Convention", "Rapport annuel", "Plan d'affaires"]
  },
  {
    title: "Juridique",
    icon: <Scale className="h-6 w-6 text-red-500" />,
    color: "bg-red-100",
    items: ["Acte de divorce", "Acte notarié", "Jugements", "Testament", "Contrat de travail"]
  },
  {
    title: "Diplômes et Bulletins",
    icon: <GraduationCap className="h-6 w-6 text-yellow-500" />,
    color: "bg-yellow-100",
    items: ["Diplôme", "Relevé de notes", "Attestation d'études", "Attestation de stage"]
  },
  {
    title: "Finance et Commercial",
    icon: <CreditCard className="h-6 w-6 text-purple-500" />,
    color: "bg-purple-100",
    items: ["Relevé bancaire", "Fiche de paie", "Facture", "Rapport financier"]
  },
  {
    title: "Technique",
    icon: <Truck className="h-6 w-6 text-indigo-500" />,
    color: "bg-indigo-100",
    items: ["Manuel technique", "Brevet", "Cahier des charges", "Rapport technique"]
  },
  {
    title: "Autres",
    icon: <FileSignature className="h-6 w-6 text-pink-500" />,
    color: "bg-pink-100",
    items: ["Permis de conduire", "Documents médicaux", "Traductions littéraires"]
  }
]

export default function PageTraduction() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-4xl font-bold text-gray-900 text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Services de Traduction
        </motion.h1>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {translationCategories.map((category, index) => (
            <Card key={index} className="overflow-hidden shadow-lg">
              <CardHeader className={`${category.color} p-4`}>
                <CardTitle className="flex items-center text-lg font-semibold">
                  {category.icon}
                  <span className="ml-2">{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-sm">Voir les documents</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {category.items.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: itemIndex * 0.1 }}
                            className="text-sm text-gray-600"
                          >
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </motion.div>
        
        <motion.footer 
          className="mt-12 text-center text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          © 2023 Votre Entreprise de Traduction. Tous droits réservés.
        </motion.footer>
      </div>
    </div>
  )
}