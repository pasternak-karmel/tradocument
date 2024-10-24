"use client"

import React from "react"
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Mail, Phone, User, Calendar, Languages, FileUp } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  serviceType: z.string({ required_error: "Veuillez sélectionner un type de service" }),
  documentType: z.string({ required_error: "Veuillez sélectionner un type de document" }),
  sourceLanguage: z.string({ required_error: "Veuillez sélectionner la langue source" }),
  targetLanguage: z.string({ required_error: "Veuillez sélectionner la langue cible" }),
  deadline: z.string().optional(),
  wordCount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Veuillez entrer un nombre valide",
  }),
  additionalInfo: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les termes et conditions",
  }),
})

export default function DemandeDevis() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      documentType: "",
      sourceLanguage: "",
      targetLanguage: "",
      deadline: "",
      wordCount: "",
      additionalInfo: "",
      termsAccepted: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Ici, vous pouvez ajouter la logique pour envoyer les données du formulaire
  }

  return (
    <div className="mt-10  bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Demande de Devis</CardTitle>
              <CardDescription className="text-center">
                Remplissez ce formulaire pour obtenir un devis personnalisé pour nos services de traduction.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-gray-500" />
                            <Input placeholder="Votre nom" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-2 text-gray-500" />
                              <Input type="email" placeholder="votre@email.com" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-gray-500" />
                              <Input placeholder="Votre numéro" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de service</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un type de service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="standard">Traduction standard</SelectItem>
                            <SelectItem value="certified">Traduction certifiée</SelectItem>
                            <SelectItem value="urgent">Traduction urgente</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="documentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de document</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un type de document" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="legal">Actes d'état civile</SelectItem>
                            <SelectItem value="medical">Affaires & Business</SelectItem>
                            <SelectItem value="technical">Diplomes & Bulletins</SelectItem>
                            <SelectItem value="financial">Finance & Commerciale</SelectItem>
                            <SelectItem value="Juridique">Juridique</SelectItem>
                            <SelectItem value="Permis">Permis de Conduire</SelectItem>
                            <SelectItem value="Technique">Technique</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="sourceLanguage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Langue source</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez la langue source" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="en">Anglais</SelectItem>
                              <SelectItem value="es">Espagnol</SelectItem>
                              <SelectItem value="it">Arabe</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="targetLanguage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Langue cible</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez la langue cible" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="en">Anglais</SelectItem>
                              <SelectItem value="es">Espagnol</SelectItem>
                              <SelectItem value="it">Arabe</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="deadline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date limite souhaitée</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                              <Input type="date" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="wordCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre de page</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 mr-2 text-gray-500" />
                              <Input type="number" placeholder="Nombre de page" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Informations supplémentaires</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ajoutez toute information supplémentaire pertinente ici"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col items-center space-y-2">
  <label
    htmlFor="certificate"
    className="cursor-pointer flex flex-col items-center justify-center w-full p-4 border border-dashed border-blue-400 rounded-lg bg-blue-50 hover:bg-blue-100 transition duration-300 ease-in-out"
  > Téléchargez votre fichier
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
  <input
    id="certificate"
    type="file"
    className="hidden"
  />
</div>
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            J'accepte les termes et conditions
                          </FormLabel>
                          <FormDescription>
                            En soumettant ce formulaire, vous acceptez nos termes et conditions.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                
                  <Button type="submit" className="w-full">
                    Demander un devis
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}