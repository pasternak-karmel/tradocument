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
import { FileState, MultiFileDropzone } from "@/components/multi-file";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";
import { getPDFPageCount } from "@/actions/calculate_montant_page";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  country: z.enum(["Maroc", "Tunisie", "Algérie"], {
    required_error: "Veuillez sélectionner un pays",
  }),
  serviceType: z.string({
    required_error: "Veuillez sélectionner un type de service",
  }),
  documentType: z.string({
    required_error: "Veuillez sélectionner un type de document",
  }),
  sourceLanguage: z.string({
    required_error: "Veuillez sélectionner la langue source",
  }),
  targetLanguage: z.string({
    required_error: "Veuillez sélectionner la langue cible",
  }),
  deadline: z.string().optional(),
  wordCount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Veuillez entrer un nombre valide",
  }),
  additionalInfo: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les termes et conditions",
  }),
  deliveryAddress: z
    .object({
      departureAddress: z.string().optional(),
      shippingAddress: z.string().optional(),
    })
    .optional(),
});

export default function DemandeDevis() {
  const [showDeliveryAddress, setShowDeliveryAddress] = useState(false);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [url, setUrl] = useState("");
  const [montant, setMontant] = useState<number | null>(null);
  const { edgestore } = useEdgeStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would handle form submission, including the file URL
    if (fileStates.length === 0) {
      toast.error("Erreur!", {
        description: "Veuillez sélectionner le fichier à traduire",
      });
      return;
    }

    if (!montant) {
      toast.error("Erreur!", {
        description: "Montant non calculé",
      });
      return;
    }

    // Add your form submission logic here
    console.log("Form data:", values);
    console.log("File URL:", url);
    console.log("Montant:", montant);

    // Reset form and file states after submission
    form.reset();
    setFileStates([]);
    setUrl("");
    setMontant(null);
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
                          <FormLabel>Téléphone Mobile (Whatsapp, Telegram,Imo...)</FormLabel>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    <FormLabel>Document à traduire</FormLabel>
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
                        await Promise.all(
                          addedFiles.map(async (addedFileState) => {
                            try {
                              const res = await edgestore.document.upload({
                                options: { temporary: true },
                                file: addedFileState.file,
                                input: { type: "profile" },
                                onProgressChange: async (progress) => {
                                  updateFileProgress(addedFileState.key, progress);
                                  if (progress === 100) {
                                    await new Promise((resolve) =>
                                      setTimeout(resolve, 1000)
                                    );
                                    updateFileProgress(addedFileState.key, "COMPLETE");
                                  }
                                },
                              });

                              const pageCount = await getPDFPageCount(res.url);
                              if (!pageCount) {
                                toast.error("Impossible de calculer le nombre de pages", {
                                  description:
                                    "Veuillez réessayer avec un autre fichier...",
                                });
                              }

                              setMontant(pageCount);
                              setUrl(res.url);
                            } catch (err) {
                              updateFileProgress(addedFileState.key, "ERROR");
                            }
                          })
                        );
                      }}
                    />
                  </div>

                  {montant !== null && (
                    <div className="mt-4">
                      <p className="text-lg font-bold">Montant à payer : {montant} €</p>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={showDeliveryAddress}
                      onCheckedChange={(checked) =>
                        setShowDeliveryAddress(checked as boolean)
                      }
                    />
                    <span>Obtenir un document administratif à faire traduire par procuration</span>
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
                  )}

                  <div className="flex items-center space-x-2">
                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <span>J'accepte les termes et conditions</span>
                  </div>

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