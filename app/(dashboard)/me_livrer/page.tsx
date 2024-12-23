"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, User, Calendar, FileText, MapPin } from "lucide-react";
import { meLivrer } from "@/schemas";

export default function MeLivrer() {
  const [showDeliveryAddress, setShowDeliveryAddress] = useState(false);
  const form = useForm<z.infer<typeof meLivrer>>({
    resolver: zodResolver(meLivrer),
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
      deliveryAddress: {
        departureAddress: "",
        shippingAddress: "",
      },
    },
  });

  function onSubmit(values: z.infer<typeof meLivrer>) {
    console.log(values);
    // Ici, vous pouvez ajouter la logique pour envoyer les données du formulaire
  }

  return (
    <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Me faire livrer
              </CardTitle>
              <CardDescription className="text-center">
                Remplissez ce formulaire
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
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
                              <Input
                                type="email"
                                placeholder="votre@email.com"
                                {...field}
                              />
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
                            <PhoneInput
                              country={"fr"}
                              value={field.value}
                              onChange={field.onChange}
                              inputStyle={{ width: "100%" }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="documentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de document</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un document" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="legal">
                              Actes d'état civil
                            </SelectItem>
                            <SelectItem value="medical">
                              Affaires & Business
                            </SelectItem>
                            <SelectItem value="technical">
                              Diplômes & Bulletins
                            </SelectItem>
                            <SelectItem value="financial">
                              Finance & Commerciale
                            </SelectItem>
                            <SelectItem value="juridique">Juridique</SelectItem>
                            <SelectItem value="permis">
                              Permis de Conduire
                            </SelectItem>
                            <SelectItem value="technique">Technique</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <FormField
                    control={form.control}
                    name="sourceLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Langue source</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez la langue source" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="ar">Arabe</SelectItem>
                            <SelectItem value="en">Anglais</SelectItem>
                            <SelectItem value="es">Espagnol</SelectItem>
                            <SelectItem value="it">Italien</SelectItem>
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
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez la langue cible" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="en">Anglais</SelectItem>
                            <SelectItem value="es">Espagnol</SelectItem>
                            <SelectItem value="it">Italien</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="deliveryAddress.departureAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse de départ</FormLabel>
                          <FormControl>
                            <Input placeholder="Adresse de départ" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deliveryAddress.shippingAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse d'expédition</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Adresse d'expédition"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date limite</FormLabel>
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
                          <Input placeholder="Ex :" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Informations supplémentaires</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ajoutez des détails supplémentaires sur votre demande."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={showDeliveryAddress}
                      onCheckedChange={(checked) =>
                        setShowDeliveryAddress(!showDeliveryAddress)
                      }
                    />
                    <span>Est un document à traduire ?</span>
                  </div>

                  {showDeliveryAddress && (
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="sourceLanguage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Langue source</FormLabel>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez la langue source" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fr">Français</SelectItem>
                                <SelectItem value="ar">Arabe</SelectItem>
                                <SelectItem value="en">Anglais</SelectItem>
                                <SelectItem value="es">Espagnol</SelectItem>
                                <SelectItem value="it">Italien</SelectItem>
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
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez la langue cible" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fr">Français</SelectItem>
                                <SelectItem value="en">Anglais</SelectItem>
                                <SelectItem value="es">Espagnol</SelectItem>
                                <SelectItem value="it">Italien</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Checkbox
                              defaultChecked={false}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <span>J'accepte les termes et conditions</span>
                  </div>
                  <FormMessage />

                  <Button type="submit" className="w-full">
                    Soumettre
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
