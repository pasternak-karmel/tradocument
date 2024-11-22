"use client";

import { FileState, MultiFileDropzone } from "@/components/multi-file";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CreateProcuration } from "@/actions/users";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showError } from "@/function/notification-toast";
import { useEdgeStore } from "@/lib/edgestore";
import { ProcurationFormSchema } from "@/schemas";
import { acceptedFileTypes } from "@/type";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import SignaturePad from "react-signature-canvas";
import { toast } from "sonner";

export default function ProcurationPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email déjà utiliser avec un autre provider!"
      : "";
  const today = format(new Date(), "dd/MM/yyyy");
  const signaturePadRef = useRef<SignaturePad>(null);
  const { edgestore } = useEdgeStore();
  const [loading, setLoading] = useState(false);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [, setUrls] = useState<{ url: string; thumbnailUrl: string | null }[]>(
    []
  );
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof ProcurationFormSchema>>({
    resolver: zodResolver(ProcurationFormSchema),
    defaultValues: {
      typeProcuration: "",
      nomMandant: "",
      prenomMandant: "",
      dateNaissanceMandant: "",
      lieuNaissanceMandant: "",
      nationaliteMandant: "",
      adresseMandant: "",
      // dateDebut: "",
      // dateFin: "",
    },
  });

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

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

  async function onSubmit(data: z.infer<typeof ProcurationFormSchema>) {
    // console.log(data);
    if (fileStates.length === 0)
      return showError("Veuillez importé votre pièce");

    startTransition(async () => {
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
        (res): res is { url: string; thumbnailUrl: string | null } =>
          res !== null
      );

      form.setValue(
        "piece",
        validImageUrls.map((urlObj) => urlObj.url)
      );
      CreateProcuration(data)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            // setSuccess(data.success);
          }

          if (data?.new) {
            form.reset();
            setSuccess("Procuration crée");
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Création de Procuration
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            {/* nom mandant */}
            <FormField
              control={form.control}
              name="nomMandant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* prenom mandant */}
            <FormField
              control={form.control}
              name="prenomMandant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="votre prenom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* date de naissance mandant */}
            <FormField
              control={form.control}
              name="dateNaissanceMandant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de naissance</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="votre date de naissance"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* lieu de naissance mandant */}
            <FormField
              control={form.control}
              name="lieuNaissanceMandant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lieu de naissance</FormLabel>
                  <FormControl>
                    <Input placeholder="votre prenom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* nationalite mandant */}
            <FormField
              control={form.control}
              name="nationaliteMandant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationalité</FormLabel>
                  <FormControl>
                    <Input placeholder="votre prenom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* adresse mandant */}
            <FormField
              control={form.control}
              name="adresseMandant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input placeholder="votre prenom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* type de procuration */}
            <FormField
              control={form.control}
              name="typeProcuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de procuration</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le type du document" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Acte de naissance">
                        Acte de naissance
                      </SelectItem>
                      <SelectItem value="Permis de conduire">
                        Permis de conduire
                      </SelectItem>
                      <SelectItem value="Acte de mariage">
                        Acte de mariage
                      </SelectItem>
                      <SelectItem value="Autorisation pour ken">
                        Autorisation pour ken
                      </SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* date debut procuration */}
            <FormField
              control={form.control}
              name="dateDebut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de début</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="votre prenom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* date fin procuration */}
            <FormField
              control={form.control}
              name="dateFin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de fin</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="votre prenom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* piece d'identité mandant */}
            <div className="space-y-4">
              <FormLabel>Télécharger votre pièce d'identité</FormLabel>
              <MultiFileDropzone
                disabled={loading}
                value={fileStates}
                dropzoneOptions={{
                  maxFiles: 2,
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

            {/* signature mandant */}
            <div className="space-y-2">
              <Label>Votre signature</Label>
              <div className="border rounded-lg p-2 bg-white">
                <SignaturePad
                  ref={signaturePadRef}
                  canvasProps={{
                    className: "w-full h-40 border rounded",
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearSignature}
                  className="mt-2"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Effacer la signature
                </Button>
              </div>
            </div>

            <FormError message={error || ""} />
            <FormSuccess message={success} />
            <Button type="submit">Envoyer</Button>
          </form>
        </Form>
      </div>
      {/* partie de l'aperçu */}

      <Card className="p-6 shadow-lg bg-white">
        <CardHeader>
          <CardTitle>Aperçu</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-gray-700 bg-white p-8 rounded-lg min-h-[29.7cm] w-full max-w-[21cm] mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="font-bold">Objet : Procuration</h2>
            </div>
            <div className="space-y-6 text-justify">
              <p>
                Je, soussigné(e) {form.getValues("prenomMandant") || "___"}{" "}
                {form.getValues("nomMandant") || "___"}, né(e) le{" "}
                {form.getValues("dateNaissanceMandant") || "___"} à{" "}
                {form.getValues("lieuNaissanceMandant") || "___"}, donne par la
                présente pouvoir à l'entité{" "}
                <span className="font-semibold">Tradocument</span>,
              </p>
              <div className="w-full border-b border-black"></div>
              <p>
                afin qu'elle puisse récupérer le document suivant en mon nom:
              </p>
              <li>{form.getValues("typeProcuration") || "___"}</li>
              <div className="w-full border-b border-black"></div>
              <p>
                Cette procuration est confiée à{" "}
                <span className="font-semibold">Tradocument</span> pour une
                durée
                {form.getValues("dateFin")
                  ? ` du ${form.getValues("dateDebut")} au ${form.getValues(
                      "dateFin"
                    )}`
                  : " indéterminée"}
                . Je me réserve la possibilité d'y mettre fin à tout moment.
              </p>
              <div className="w-full border-b border-black my-4"></div>
              <p>
                Je conserve la responsabilité de toutes les actions effectuées
                par le mandataire en vertu de la présente procuration.
              </p>
              <div className="mt-12">
                <p>Fait le {today}, en 2 (deux) exemplaires originaux,</p>
              </div>
              <div className="space-y-8 mt-16">
                <div>
                  <p className="text-center font-bold mb-16">
                    SIGNATURE DU MANDANT
                  </p>
                  <div className="w-full text-center">
                    <div className="border-b border-black w-48 mx-auto"></div>
                    <div className="border-b border-black w-48 mx-auto mt-2"></div>
                  </div>
                </div>
                <div>
                  <p className="text-center font-bold mb-16">
                    SIGNATURE DU MANDATAIRE
                  </p>
                  <div className="w-full text-center">
                    <div className="border-b border-black w-48 mx-auto"></div>
                    <div className="border-b border-black w-48 mx-auto mt-2"></div>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <p>Pièce jointe: Copie de la pièce d'identité du mandant</p>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
