"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const professionals = {
  Algeria: [
    { id: 1, name: "Amina Benali", specialty: "Traducteur Juridique", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Karim Hadj", specialty: "Interprète de Conférence", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Leila Mansouri", specialty: "Traducteur Technique", image: "/placeholder.svg?height=100&width=100" },
    { id: 4, name: "Omar Bouaziz", specialty: "Traducteur Médical", image: "/placeholder.svg?height=100&width=100" },
    { id: 5, name: "Samira Ziani", specialty: "Traducteur Littéraire", image: "/placeholder.svg?height=100&width=100" },
    { id: 6, name: "Yacine Belkacem", specialty: "Interprète Judiciaire", image: "/placeholder.svg?height=100&width=100" },
    { id: 7, name: "Fatima Larbi", specialty: "Traducteur Financier", image: "/placeholder.svg?height=100&width=100" },
    { id: 8, name: "Rachid Meziane", specialty: "Traducteur Marketing", image: "/placeholder.svg?height=100&width=100" },
    { id: 9, name: "Nadia Hamidi", specialty: "Interprète Médical", image: "/placeholder.svg?height=100&width=100" },
    { id: 10, name: "Mehdi Cherif", specialty: "Traducteur Audiovisuel", image: "/placeholder.svg?height=100&width=100" },
  ],
  Morocco: [
    { id: 1, name: "Hassan El Fassi", specialty: "Traducteur Juridique", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Fatima Zahra Bennis", specialty: "Interprète de Conférence", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Youssef Tahiri", specialty: "Traducteur Technique", image: "/placeholder.svg?height=100&width=100" },
    { id: 4, name: "Laila Benjelloun", specialty: "Traducteur Médical", image: "/placeholder.svg?height=100&width=100" },
    { id: 5, name: "Karim Alaoui", specialty: "Traducteur Littéraire", image: "/placeholder.svg?height=100&width=100" },
    { id: 6, name: "Amina Cherkaoui", specialty: "Interprète Judiciaire", image: "/placeholder.svg?height=100&width=100" },
    { id: 7, name: "Rachid El Idrissi", specialty: "Traducteur Financier", image: "/placeholder.svg?height=100&width=100" },
    { id: 8, name: "Nadia Berrada", specialty: "Traducteur Marketing", image: "/placeholder.svg?height=100&width=100" },
    { id: 9, name: "Omar Benjelloun", specialty: "Interprète Médical", image: "/placeholder.svg?height=100&width=100" },
    { id: 10, name: "Samira Tazi", specialty: "Traducteur Audiovisuel", image: "/placeholder.svg?height=100&width=100" },
  ],
  Tunisia: [
    { id: 1, name: "Sami Ben Salah", specialty: "Traducteur Juridique", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Leila Trabelsi", specialty: "Interprète de Conférence", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Mehdi Chahed", specialty: "Traducteur Technique", image: "/placeholder.svg?height=100&width=100" },
    { id: 4, name: "Amira Mejri", specialty: "Traducteur Médical", image: "/placeholder.svg?height=100&width=100" },
    { id: 5, name: "Yassine Gharbi", specialty: "Traducteur Littéraire", image: "/placeholder.svg?height=100&width=100" },
    { id: 6, name: "Fatma Ben Amor", specialty: "Interprète Judiciaire", image: "/placeholder.svg?height=100&width=100" },
    { id: 7, name: "Karim Jendoubi", specialty: "Traducteur Financier", image: "/placeholder.svg?height=100&width=100" },
    { id: 8, name: "Rania Belhadj", specialty: "Traducteur Marketing", image: "/placeholder.svg?height=100&width=100" },
    { id: 9, name: "Nizar Lahmar", specialty: "Interprète Médical", image: "/placeholder.svg?height=100&width=100" },
    { id: 10, name: "Ines Sfar", specialty: "Traducteur Audiovisuel", image: "/placeholder.svg?height=100&width=100" },
  ],
}

export default function ConsultationPage() {
  const [selectedCountry, setSelectedCountry] = useState("Algeria")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center text-gray-900 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Consultation des Professionnels
        </motion.h1>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Prix de la Consultation</h2>
          <p className="text-3xl font-bold text-[#F49C60]">9,99 €</p>
          <p className="text-gray-600">pour 5 cartes de visite</p>
        </motion.div>

        <Tabs defaultValue="Algeria" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="Algeria" onClick={() => setSelectedCountry("Algeria")}>Algérie</TabsTrigger>
            <TabsTrigger value="Morocco" onClick={() => setSelectedCountry("Morocco")}>Maroc</TabsTrigger>
            <TabsTrigger value="Tunisia" onClick={() => setSelectedCountry("Tunisia")}>Tunisie</TabsTrigger>
          </TabsList>
          {Object.entries(professionals).map(([country, pros]) => (
            <TabsContent key={country} value={country}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pros.map((pro) => (
                  <Card key={pro.id} className="flex flex-col">
                    <CardHeader>
                      <Avatar className="w-24 h-24 mx-auto mb-4">
                        <AvatarImage src={pro.image} alt={pro.name} />
                        <AvatarFallback>{pro.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-center">{pro.name}</CardTitle>
                      <CardDescription className="text-center">
                        <Badge variant="secondary" className="mt-2">
                          {pro.specialty}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-center text-gray-600">
                        Professionnel certifié avec une expérience étendue dans son domaine.
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button variant="outline">Consulter</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          
        </motion.div>
      </div>
    </div>
  )
}