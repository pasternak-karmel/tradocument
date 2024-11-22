"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import SignaturePad from "react-signature-canvas";

import { CreateProcuration } from "@/actions/users";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { FileState, MultiFileDropzone } from "@/components/multi-file";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ProcurationUser } from "@/lib/mail";
import { ProcurationFormData, ProcurationFormSchema } from "@/schemas";
import { toast } from "sonner";

export default function ProcurationForm() {
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState(false);
  const signaturePadRef = useRef<SignaturePad>(null);
  const today = format(new Date(), "dd/MM/yyyy");
  const { edgestore } = useEdgeStore();
  const [loading, setLoading] = useState(false);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [, setUrls] = useState<{ url: string; thumbnailUrl: string | null }[]>(
    []
  );
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    trigger,
    setValue,
  } = useForm<ProcurationFormData>({
    resolver: zodResolver(ProcurationFormSchema),
    mode: "onSubmit",
  });

  const formData = watch();

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

  const onSubmit = async (data: ProcurationFormData) => {
    console.log("Form submitted", data);

    if (!signaturePadRef.current?.isEmpty()) {
      const signatureData = signaturePadRef.current?.toDataURL();
      // data.signature = signatureData;
    } else {
      showError("Veuillez signer le document");
      return;
    }

    if (fileStates.length === 0) {
      showError("Veuillez importer votre pièce d'identité");
      return;
    }

    setLoading(true);
    setError(undefined);
    setSuccess(undefined);

    try {
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
                description: `Erreur de connexion`,
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

      data.piece = validImageUrls.map((urlObj) => urlObj.url);

      const result = await CreateProcuration(data);

      if (result?.error) {
        if (!data.piece) return showError("Une erreur est survenue");
        for (const url of data.piece) {
          await edgestore.document.delete({ url });
        }
        setError(result.error);
      } else if (result?.success) {
        if (!data.piece) return showError("Une erreur est survenue");

        for (const url of data.piece) {
          await edgestore.document.confirmUpload({ url });
        }
        await ProcurationUser(data);
        setSuccess(result.message);
      } else if (result?.maj) {
        setSuccess(result.message);
      }
    } catch (err) {
      setError("Une erreur s'est produite lors de la soumission du formulaire");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    const fieldsToValidate =
      step === 1
        ? [
            "nomMandant",
            "prenomMandant",
            "dateNaissanceMandant",
            "lieuNaissanceMandant",
            "nationaliteMandant",
            "adresseMandant",
          ]
        : step === 2
        ? ["typeProcuration"]
        : [];

    const isStepValid = await trigger(fieldsToValidate as any);
    if (isStepValid) {
      setStep(step + 1);
    } else {
      showError("Veuillez remplir tous les champs obligatoires");
    }
  };

  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-4">
              Informations personnelles
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nomMandant">Nom</Label>
                <Input id="nomMandant" {...register("nomMandant")} />
                {errors.nomMandant && (
                  <p className="text-red-500 text-sm">
                    {errors.nomMandant.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="prenomMandant">Prénom</Label>
                <Input id="prenomMandant" {...register("prenomMandant")} />
                {errors.prenomMandant && (
                  <p className="text-red-500 text-sm">
                    {errors.prenomMandant.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="dateNaissanceMandant">Date de naissance</Label>
              <Input
                type="date"
                id="dateNaissanceMandant"
                {...register("dateNaissanceMandant")}
              />
              {errors.dateNaissanceMandant && (
                <p className="text-red-500 text-sm">
                  {errors.dateNaissanceMandant.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="lieuNaissanceMandant">Lieu de naissance</Label>
              <Input
                id="lieuNaissanceMandant"
                {...register("lieuNaissanceMandant")}
              />
              {errors.lieuNaissanceMandant && (
                <p className="text-red-500 text-sm">
                  {errors.lieuNaissanceMandant.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="nationaliteMandant">Nationalité</Label>
              <Input
                id="nationaliteMandant"
                {...register("nationaliteMandant")}
              />
              {errors.nationaliteMandant && (
                <p className="text-red-500 text-sm">
                  {errors.nationaliteMandant.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="adresseMandant">Adresse</Label>
              <Input id="adresseMandant" {...register("adresseMandant")} />
              {errors.adresseMandant && (
                <p className="text-red-500 text-sm">
                  {errors.adresseMandant.message}
                </p>
              )}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-4">
              Détails de la procuration
            </h2>
            <div>
              <Label htmlFor="typeProcuration">Type de procuration</Label>
              <Controller
                name="typeProcuration"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez le type du document" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Documents courants */}
                      <SelectItem value="Carte d'identité">
                        Carte d'identité
                      </SelectItem>
                      <SelectItem value="Passeport">Passeport</SelectItem>
                      <SelectItem value="Acte de naissance">
                        Acte de naissance
                      </SelectItem>
                      <SelectItem value="Acte de mariage">
                        Acte de mariage
                      </SelectItem>
                      <SelectItem value="Permis de conduire">
                        Permis de conduire
                      </SelectItem>
                      <SelectItem value="Document notarié">
                        Document notarié
                      </SelectItem>

                      {/* Types de procuration */}
                      <SelectItem value="Procuration bancaire">
                        Procuration bancaire
                      </SelectItem>
                      <SelectItem value="Procuration administrative">
                        Procuration administrative
                      </SelectItem>
                      <SelectItem value="Procuration médicale">
                        Procuration médicale
                      </SelectItem>
                      <SelectItem value="Procuration immobilière">
                        Procuration immobilière
                      </SelectItem>
                      <SelectItem value="Procuration pour actes juridiques">
                        Procuration pour actes juridiques
                      </SelectItem>

                      {/* Option générique */}
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.typeProcuration && (
                <p className="text-red-500 text-sm">
                  {errors.typeProcuration.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateDebut">Date de début (optionnel)</Label>
                <Input type="date" id="dateDebut" {...register("dateDebut")} />
                {errors.dateDebut && (
                  <p className="text-red-500 text-sm">
                    {errors.dateDebut.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="dateFin">Date de fin (optionnel)</Label>
                <Input type="date" id="dateFin" {...register("dateFin")} />
                {errors.dateFin && (
                  <p className="text-red-500 text-sm">
                    {errors.dateFin.message}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-4">
              Pièce d'identité et signature
            </h2>
            <div className="space-y-4">
              <Label>Télécharger votre pièce d'identité</Label>
              <MultiFileDropzone
                disabled={loading}
                value={fileStates}
                dropzoneOptions={{
                  maxFiles: 2,
                  accept: {
                    "image/*": [".png", ".jpg", ".jpeg", ".gif"],
                    "application/pdf": [".pdf"],
                  },
                }}
                onChange={(files) => {
                  setFileStates(files);
                }}
                onFilesAdded={async (addedFiles) => {
                  setFileStates([...fileStates, ...addedFiles]);
                }}
              />
            </div>
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
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-16 mx-auto p-4 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-indigo-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Création de Procuration
      </motion.h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 shadow-lg bg-white">
          <CardHeader>
            <CardTitle>Formulaire de Procuration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <Button type="button" onClick={prevStep} variant="outline">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Précédent
                  </Button>
                )}
                {step < 3 ? (
                  <Button type="button" onClick={nextStep} className="ml-auto">
                    Suivant
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto" disabled={loading}>
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Traitement...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Soumettre
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
            <FormError message={error || ""} />
            <FormSuccess message={success} />
          </CardContent>
        </Card>

        <Card className="p-6 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Aperçu</span>
              <Button
                type="button"
                onClick={() => setPreview(!preview)}
                variant="outline"
                size="sm"
              >
                {preview ? "Masquer" : "Afficher"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence>
              {preview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 text-gray-700 bg-white p-8 rounded-lg overflow-hidden"
                >
                  <div className="text-center mb-8">
                    <h2 className="font-bold">Objet : Procuration</h2>
                  </div>
                  <div className="space-y-6 text-justify">
                    <p>
                      Je, soussigné(e) {formData.prenomMandant || "___"}{" "}
                      {formData.nomMandant || "___"}, né(e) le{" "}
                      {formData.dateNaissanceMandant
                        ? format(
                            new Date(formData.dateNaissanceMandant),
                            "dd/MM/yyyy",
                            { locale: fr }
                          )
                        : "___"}{" "}
                      à {formData.lieuNaissanceMandant || "___"}, donne par la
                      présente pouvoir à l'entité{" "}
                      <span className="font-semibold">Tradocument</span>,
                    </p>
                    <p>
                      afin qu'elle puisse récupérer le document suivant en mon
                      nom:
                    </p>
                    <li>{formData.typeProcuration || "___"}</li>
                    <p>
                      Cette procuration est confiée à{" "}
                      <span className="font-semibold">Tradocument</span> pour
                      une durée
                      {formData.dateDebut && formData.dateFin
                        ? ` du ${format(
                            new Date(formData.dateDebut),
                            "dd/MM/yyyy",
                            { locale: fr }
                          )} au ${format(
                            new Date(formData.dateFin),
                            "dd/MM/yyyy",
                            { locale: fr }
                          )}`
                        : " indéterminée"}
                      . Je me réserve la possibilité d'y mettre fin à tout
                      moment.
                    </p>
                    <p>
                      Je conserve la responsabilité de toutes les actions
                      effectuées par le mandataire en vertu de la présente
                      procuration.
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
                      <p>
                        Pièce jointe: Copie de la pièce d'identité du mandant
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
