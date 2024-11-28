"use client";

import { UserRejoindre } from "@/actions/rejoindre";
import { FileState, MultiFileDropzone } from "@/components/multi-file";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showError } from "@/function/notification-toast";
import { useEdgeStore } from "@/lib/edgestore";
import { RegisterAdmin } from "@/lib/mail";
import { RejoindreFormValues, RejoindreSchema } from "@/schemas";
import { acceptedFileTypes } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Briefcase, Globe, GraduationCap, Send, Users } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RejoignezNous() {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [, setUrls] = useState<{ url: string; thumbnailUrl: string | null }[]>(
    []
  );
  const { edgestore } = useEdgeStore();

  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<RejoindreFormValues>({
    resolver: zodResolver(RejoindreSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      nomSociete: "",
      adresseSociete: "",
      telephoneSociete:"",
      adresse: "",
      ville: "",
      pays: "",
      commentaire: "",
      specialite: "",
      url: [],

    },
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
      description: "Bénéficiez d'une traduction optimale",
    },
    {
      icon: <Globe className="h-6 w-6 text-pink-500" />,
      title: "Impact Global",
      description: "Contribuez à des projets d'envergure internationale.",
    },
  ];

  const specialties = ["Traducteur/Traductrice agréé(e)", "Transport Coursier"];

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

  async function onSubmit(data: RejoindreFormValues) {
    if (fileStates.length === 0)
      return showError("Veuillez sélectionner le fichier à traduire");
    setIsLoading(true);

    const imageUrls = await Promise.all(
      fileStates.map(async (fileState) => {
        if (fileState.file instanceof File) {
          try {
            const res = await edgestore.document.upload({
              options: { temporary: true },
              file: fileState.file,
              input: { type: "post" },
              onProgressChange: (progress) => {
                updateFileProgress(fileState.key, progress);
              },
            });
            return {
              url: res.url,
            };
          } catch (err) {
            toast.error(`Une erreur s'est produite`, {
              description: `Connexion erreur`,
            });
            return null;
          }
        } else {
          return null;
        }
      })
    );

    const validImageUrls = imageUrls.filter(
      (res): res is { url: string; thumbnailUrl: string | null } => res !== null
    );

    data.url = validImageUrls.map((urlObj) => urlObj.url);
    const result = await UserRejoindre(data);
    setIsLoading(false);
    if (result.error) {
      for (const url of data.url) {
        await edgestore.document.delete({ url });
      }

      return toast("Erreur!!!", {
        description: result.error,
        action: {
          label: "Fermer",
          onClick: () => console.log("Toast fermé"),
        },
      });
    }
    for (const url of data.url) {
      await edgestore.document.confirmUpload({ url });
    }
    form.reset();
    setFileStates([]);
    setUrls([]);

    await RegisterAdmin(data);
    
    return toast("Succès", {
      description: "Votre demande a été envoyée avec succès",
      action: {
        label: "Fermer",
        onClick: () => console.log("Toast fermé"),
      },
    });
  }

  const inputStyle =
    "w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
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
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Informations personnelles
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="nom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom*</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Nom"
                                className={inputStyle}
                                disabled={isLoading}
                              />
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
                            <FormLabel>Prénom*</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Prénom"
                                className={inputStyle}
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email*</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Email"
                              type="email"
                              className={inputStyle}
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="pays"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pays*</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Pays"
                                className={inputStyle}
                                disabled={isLoading}
                              />
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
                            <FormLabel>Ville*</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Ville"
                                className={inputStyle}
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="adresse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse*</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Adresse"
                              className={inputStyle}
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Informations de l'entreprise
                    </h3>
                    <FormField
                      control={form.control}
                      name="nomSociete"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom de la société*</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Nom de la société"
                              className={inputStyle}
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="adresseSociete"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse complète de la société*</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Adresse de la société"
                              className={inputStyle}
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="telephoneSociete"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone de la société*</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Téléphone de la société"
                              className={inputStyle}
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="specialite"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Spécialité*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger className={inputStyle}>
                              <SelectValue placeholder="Choisissez votre spécialité" />
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
                  <div className="space-y-4">
                    <FormLabel>
                      Justificatif légal ou administratif de l'entreprise*
                    </FormLabel>
                    <p className="text-sm text-gray-500">
                      Veuillez joindre un fichier prouvant l'existence ou
                      l'activité de votre société (exemple : extrait Kbis,
                      certificat de création, facture récente, etc.).
                    </p>
                    <MultiFileDropzone
                      disabled={isLoading}
                      value={fileStates}
                      dropzoneOptions={{
                        maxFiles: 5,
                        accept: acceptedFileTypes,
                      }}
                      onChange={(files) => {
                        setFileStates(files);
                      }}
                      onFilesAdded={async (addedFiles) => {
                        const updatedFiles = [...fileStates, ...addedFiles];
                        setFileStates(updatedFiles);
                      }}
                    />
                  </div>
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
                            className={`${inputStyle} resize-none`}
                            disabled={isLoading}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    {isLoading ? "Envoi en cours..." : "Envoyer ma candidature"}
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
