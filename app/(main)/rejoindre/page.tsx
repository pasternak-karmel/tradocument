"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Briefcase, GraduationCap, Globe, Send } from "lucide-react";
import { RejoindreFormValues, RejoindreSchema } from "@/schemas";
import { UserRejoindre } from "@/actions/rejoindre";
import { toast } from "sonner";

// Validation schema using Zod

export default function RejoignezNous() {
  const form = useForm<RejoindreFormValues>({
    resolver: zodResolver(RejoindreSchema),
  });

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
        "Bénéficiez d'une traduction optimale de l'Arabe au Français et du Français en Arabe",
    },
    {
      icon: <Globe className="h-6 w-6 text-pink-500" />,
      title: "Impact Global",
      description: "Contribuez à des projets d'envergure internationale.",
    },
  ];

  const specialties = ["Traducteur/Traductrice agréé(e)", "Transport Coursier"];

  async function onSubmit(data: RejoindreFormValues) {
    const result = await UserRejoindre(data);
    if (result.error)
      return toast("Erreur!!!", {
        description: result.error,
        action: {
          label: "Fermer",
          onClick: () => console.log("Toast fermé"),
        },
      });
    return toast("Succès", {
      description: "Votre demande a été envoyé avec succès",
      action: {
        label: "Fermer",
        onClick: () => console.log("Toast fermé"),
      },
    });
  }

  const inputStyle = {
    borderWidth: "2 px",
    borderColor: "black",
    borderRadius: "0.375rem",
    padding: "0.5rem",
    width: "100%",
  };
 
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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Nom" style={inputStyle} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prenom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Prénom" style={inputStyle} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Email" type="email" style={inputStyle} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pays</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Pays" style={inputStyle}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ville"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ville</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Ville" style={inputStyle}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="adresse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Adresse" style={inputStyle}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="specialite"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel >Spécialité</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Choisissez votre spécialité" style={inputStyle} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {specialties.map((specialty, index) => (
                              <SelectItem
                                key={index}
                                value={specialty
                                  .toLowerCase()
                                  .replace(/ /g, "-")}
                              >
                                {specialty}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="commentaire"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Commentaires</FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            rows={4}
                            placeholder="Avez-vous un commentaire ?"
                            className="block w-full p-2 border rounded"
                            style={inputStyle}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-full"
                  >
                    <Send className="mr-2 h-4 w-4" /> Envoyer ma candidature
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
