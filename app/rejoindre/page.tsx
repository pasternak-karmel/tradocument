'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, User, MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react"

const jobTypes = [
  { value: "avocat", label: "Avocat", icon: "⚖️" },
  { value: "traducteur", label: "Traducteur", icon: "🌐" },
  { value: "notaire", label: "Notaire", icon: "📜" },
  { value: "huissier", label: "Huissier de justice", icon: "🏛️" },
  { value: "coursier-taxi", label: "Coursier taxi", icon: "🚕" },
  { value: "coursier-prive", label: "Coursier privé", icon: "🚚" },
]

export default function JoinOurTeamEnhanced() {
  const [selectedJob, setSelectedJob] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici, vous ajouteriez la logique pour envoyer le formulaire
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl font-bold text-center mb-8 black dark:text-blue-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Briefcase className="inline-block mr-2 h-10 w-10" />
          Rejoignez notre équipe
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">Formulaire de candidature</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="jobType" className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 blackblack" />
                    Choisissez votre domaine
                  </Label>
                  <Select onValueChange={setSelectedJob} required>
                    <SelectTrigger id="jobType">
                      <SelectValue placeholder="Sélectionnez un poste" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((job) => (
                        <SelectItem key={job.value} value={job.value}>
                          <span className="mr-2">{job.icon}</span> {job.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="flex items-center">
                      <User className="mr-2 h-5 w-5 black" />
                      Nom
                    </Label>
                    <Input id="lastName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="flex items-center">
                      <User className="mr-2 h-5 w-5 black" />
                      Prénom
                    </Label>
                    <Input id="firstName" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    <User className="mr-2 h-5 w-5 black" />
                    Civilité
                  </Label>
                  <RadioGroup defaultValue="mr" className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mr" id="mr" />
                      <Label htmlFor="mr">Mr</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mme" id="mme" />
                      <Label htmlFor="mme">Mme</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 black" />
                    Adresse
                  </Label>
                  <Input id="address" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5 black" />
                      Ville
                    </Label>
                    <Input id="city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country" className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5 black" />
                      Pays
                    </Label>
                    <Input id="country" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 black" />
                    Téléphone mobile (WhatsApp, Telegram, Viber, Imo)
                  </Label>
                  <Input id="phone" type="tel" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 black" />
                    Email
                  </Label>
                  <Input id="email" type="email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center">
                    <Send className="mr-2 h-5 w-5 black" />
                    Parlez-nous de vous
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Décrivez votre expérience, vos compétences et vos motivations..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  {isSubmitted ? (
                    <span className="flex items-center justify-center">
                      <CheckCircle className="mr-2" /> Candidature envoyée !
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="mr-2" /> Envoyer ma candidature
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mt-12 text-center text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>
            Rejoignez TraDocument et faites partie d&apos;une équipe dynamique et passionnée.
            Ensemble, nous révolutionnons le monde de la traduction et des services juridiques.
          </p>
        </motion.div>
      </div>
    </div>
  )
}