"use client";

import z from "zod";
import React, { useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { FileState, MultiFileDropzone } from "@/components/multi-file";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";

import { useReCaptcha } from "next-recaptcha-v3";

import { useCurrentUser } from "@/hooks/use-current-user";

import { demandeDevis } from "@/schemas";
import { calculateDistance } from "@/actions/calculate_distance";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Mail, User } from "lucide-react";

export default function DemandeDevis() {
  const user = useCurrentUser();

  const [showDeliveryAddress, setShowDeliveryAddress] = useState(false);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [url, setUrl] = useState("");
  const [distance, setDistance] = useState<number | null>(null);

  const personne = user?.name?.split(" ").map((item: any) => item.trim()) || [];

  const { executeRecaptcha } = useReCaptcha();

  const form = useForm<z.infer<typeof demandeDevis>>({
    resolver: zodResolver(demandeDevis),
    defaultValues: {
      firstName: personne[0] || undefined,
      lastName: personne[1] || undefined,
      email: user?.email || undefined,
      phone: "",
      country: undefined,
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

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  async function onSubmit(values: z.infer<typeof demandeDevis>) {
    const token = await executeRecaptcha("form_submit_demande_devis");

    const response = await fetch("/api/recaptcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      if (values.deliveryAddress) {
        try {
          const cost = await calculateDistance({
            departLocation: values.deliveryAddress.departureAddress!,
            arriverLocation: values.deliveryAddress.shippingAddress!,
          });
          setDistance(cost);
        } catch (error) {
          console.error("Error calculating distance:", error);
          setDistance(null);
        }
      }
    } else {
      toast.error("Erreur!!!", {
        description: "reCAPTCHA validation failed. Please try again.",
      });
    }

    // if (fileStates.length === 0) {
    //   toast.error("Erreur!", {
    //     description: "Veuillez sélectionner le fichier à traduire",
    //   });
    //   return;
    // }

    // if (!montant) {
    //   toast.error("Erreur!", {
    //     description: "Montant non calculé",
    //   });
    //   return;
    // }

    form.reset();
    setFileStates([]);
    setUrl("");
  }

  return (
    <div className="mt-10 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Demande de Devis
              </CardTitle>
              <CardDescription className="text-center">
                Remplissez ce formulaire pour obtenir un devis personnalisé pour
                nos services de traduction.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prénom</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-2 text-gray-500" />
                              <Input placeholder="Votre prénom" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
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
                  </div>

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
                          <FormLabel>
                            Téléphone Mobile (Whatsapp, Telegram,Imo...)
                          </FormLabel>
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
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pays</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez votre pays" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Algérie">Algérie</SelectItem>
                            <SelectItem value="Maroc">Maroc</SelectItem>
                            <SelectItem value="Tunisie">Tunisie</SelectItem>
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

                  <FormField
                    control={form.control}
                    name="sourceLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Langue du document</FormLabel>
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
                        <FormLabel>Le document sera traduit en :</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez la langue cible" />
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
                    name="wordCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de pages</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex : 5" {...field} />
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

                  <div className="space-y-4">
                    <FormLabel>Télécharger le document à traduire</FormLabel>
                    <MultiFileDropzone
                      value={fileStates}
                      dropzoneOptions={{
                        maxFiles: 1,
                      }}
                      onChange={(files) => {
                        setFileStates(files);
                      }}
                      onFilesAdded={async (addedFiles) => {
                        setFileStates([...fileStates, ...addedFiles]);
                      }}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="delivery"
                      checked={showDeliveryAddress}
                      onCheckedChange={(checked) =>
                        setShowDeliveryAddress(checked as boolean)
                      }
                    />
                    <label htmlFor="delivery">
                      Obtenir un document administratif à faire traduire par
                      procuration
                    </label>
                  </div>

                  {showDeliveryAddress && (
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="deliveryAddress.departureAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Adresse de départ</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="eg: France, Paris"
                                {...field}
                              />
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
                                placeholder="eg: Maroc, rabat"
                                {...field}
                              />
                            </FormControl>
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
                              id="terms"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <label htmlFor="terms">
                      J'accepte les termes et conditions
                    </label>
                  </div>

                  <Button type="submit" className="w-full">
                    Soumettre
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              {distance !== null && (
                <div className="mt-4">
                  <h3>Coût du transport:</h3>
                  <pre>{distance.toFixed(2)}€ a payer</pre>
                </div>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
