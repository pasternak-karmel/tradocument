"use client";

import { useEffect, useState } from "react";
import z from "zod";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { FileState, MultiFileDropzone } from "@/components/multi-file";
import { useEdgeStore } from "@/lib/edgestore";

import { useReCaptcha } from "next-recaptcha-v3";

import { useCurrentUser } from "@/hooks/use-current-user";

import { demandeDevis, DemandeDevisFormData } from "@/schemas";

import { calculateMontantPage } from "@/actions/calculate_montant_page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Textarea } from "@/components/ui/textarea";
import { showError } from "@/function/notification-toast";
import { amountPerPage } from "@/lib/constant";
import { devisSent, devisSentAdmin } from "@/lib/mail";
import { cn } from "@/lib/utils";
import { acceptedFileTypes, languages } from "@/type";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon, Mail, User } from "lucide-react";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";

const DevisForm = () => {
  const [resetKey, setResetKey] = useState(0);
  const user = useCurrentUser();
  const { executeRecaptcha } = useReCaptcha();
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const [loading, setLoading] = useState(false);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [, setUrls] = useState<{ url: string; thumbnailUrl: string | null }[]>(
    []
  );
  const [montant, setMontant] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const numberOfPages = montant ? Math.floor(totalAmount! / amountPerPage) : 0;

  const form = useForm<DemandeDevisFormData>({
    resolver: zodResolver(demandeDevis),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: undefined,
      documentType: undefined,
      customDocumentType: "",
      institution: "",
      sourceLanguage: undefined,
      targetLanguage: undefined,
      additionalInfo: "",
      termsAccepted: false,
      deliveryAddress: {
        departureAddress: "",
      },
    },
  });

  useEffect(() => {
    if (montant !== null && montant !== 0) {
      setTotalAmount(montant);
    }
  }, [montant]);

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

  const annuler = () => {
    form.reset({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: undefined,
      documentType: undefined,
      customDocumentType: "",
      sourceLanguage: undefined,
      targetLanguage: undefined,
      additionalInfo: "",
      termsAccepted: false,
      deliveryAddress: {
        departureAddress: "",
      },
    });
    setResetKey((prev) => prev + 1);
    setMontant(null);
    setFileStates([]);
    setUrls([]);
  };

  async function onSubmit(values: z.infer<typeof demandeDevis>) {
    if (!user) return router.push(`/devis`);

    if (fileStates.length === 0)
      return showError("Veuillez sélectionner le fichier à traduire");

    const token = await executeRecaptcha("form_submit_demande_devis");
    if (token) {
      try {
        setLoading(true);
        let calculatedMontant = 0;

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

        for (const urlObj of validImageUrls) {
          const pageCount = await calculateMontantPage(urlObj.url);
          if (pageCount) {
            calculatedMontant += pageCount;
          }
        }

        form.setValue(
          "url",
          validImageUrls.map((urlObj) => urlObj.url)
        );

        if (calculatedMontant === null)
          return showError("Montant non existant");

        setMontant(calculatedMontant);
      } catch (error) {
        showError("Erreur lors de la soumission");
      } finally {
        setLoading(false);
      }
      return;
    }
    return showError("Validation reCAPTCHA échouée.");
  }

  const validate = async (values: z.infer<typeof demandeDevis>) => {
    const formValues = form.getValues();

    try {
      setLoading(true);
      const response = await fetch("/api/demande_devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formValues,
          montant: montant,
        }),
      });

      const result = await response.json();
      if (!response.ok)
        return showError(result.message || `Internal Server Error`);

      if (result.success) {
        try {
          if (!values.url) return showError("Une erreur est survenue");

          for (const url of values.url) {
            await edgestore.document.confirmUpload({ url });
          }
        } catch (err) {
          return showError(
            "Erreur lors de la validation, Réessayez plus tard ou contactez le support"
          );
        }

        form.reset();
        setFileStates([]);
        setUrls([]);
        await devisSent(formValues);
        await devisSentAdmin(formValues, result.info);
        router.push(`/devis/payment?id=${result.message}`);
      } else {
        showError(result.message);
        if (!values.url) return showError("Une erreur est survenue");
        for (const url of values.url) {
          await edgestore.document.delete({ url });
        }
      }
    } catch (error) {
      console.error("Erreur lors de la validation:", error);
      toast.error("Une erreur inattendue s'est produite", {
        description: "Veuillez réessayer plus tard.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    borderWidth: "2 px",
    borderColor: "black",
    borderRadius: "0.375rem",
    padding: "0.5rem",
    width: "100%",
  };

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
                Devis de traduction
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
                              <Input
                                disabled={montant !== null || loading}
                                placeholder="Votre prénom"
                                style={inputStyle}
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
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-2 text-gray-500" />
                              <Input
                                disabled={montant !== null || loading}
                                placeholder="Votre nom"
                                style={inputStyle}
                                {...field}
                              />
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
                                disabled={montant !== null || loading}
                                style={inputStyle}
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
                              disabled={montant !== null || loading}
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
                        <FormLabel>Pays: </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={montant !== null || loading}
                                style={{ borderWidth: 1, borderColor: "black" }}
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-[200px] justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? languages.find(
                                      (language) =>
                                        language.value === field.value
                                    )?.label
                                  : "Selectionnez votre pays"}

                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search country..."
                                className="h-9"
                                style={inputStyle}
                              />
                              <CommandList>
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup>
                                  {languages.map((language) => (
                                    <CommandItem
                                      value={language.label}
                                      key={language.value}
                                      onSelect={() => {
                                        form.setValue(
                                          "country",
                                          language.value
                                        );
                                      }}
                                    >
                                      {language.label}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          language.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
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
                        <Select
                          disabled={montant !== null || loading}
                          onValueChange={(value) => {
                            field.onChange(value);
                            if (value !== "Autre") {
                              form.setValue("customDocumentType", "");
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un document" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Actes d'état civil">
                              Actes d'état civil
                            </SelectItem>
                            <SelectItem value="Affaires & Business">
                              Affaires & Business
                            </SelectItem>
                            <SelectItem value="Diplômes & Bulletins">
                              Diplômes & Bulletins
                            </SelectItem>
                            <SelectItem value="Finance & Commerciale">
                              Finance & Commerciale
                            </SelectItem>
                            <SelectItem value="juridique">Juridique</SelectItem>
                            <SelectItem value="Permis de Conduire">
                              Permis de Conduire
                            </SelectItem>
                            <SelectItem value="Technique">Technique</SelectItem>
                            <SelectItem value="Autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("documentType") === "Autre" && (
                    <FormField
                      control={form.control}
                      name="customDocumentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Précisez le type de document</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Entrez le type de document"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="sourceLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Langue du document</FormLabel>
                        <Select
                          key={`sourceLanguage-${resetKey}`}
                          disabled={montant !== null || loading}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            style={inputStyle}
                            data-placeholder="Sélectionnez la langue source"
                          >
                            <SelectValue placeholder="Sélectionnez la langue source" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Français">Français</SelectItem>
                            <SelectItem value="Arabe">Arabe</SelectItem>
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
                        <Select
                          key={`targetLanguage-${resetKey}`}
                          disabled={montant !== null || loading}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            style={inputStyle}
                            data-placeholder="Sélectionnez la langue cible"
                          >
                            <SelectValue placeholder="Sélectionnez la langue cible" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Français">Français</SelectItem>
                            <SelectItem value="Arabe">Arabe</SelectItem>
                          </SelectContent>
                        </Select>
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
                            disabled={montant !== null || loading}
                            placeholder="Ajoutez des détails supplémentaires sur votre demande."
                            {...field}
                            style={inputStyle}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <FormLabel>Téléchargez le document à traduire</FormLabel>
                    <MultiFileDropzone
                      disabled={montant !== null || loading}
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

                  <div className="flex items-center space-x-2">
                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Checkbox
                              disabled={montant !== null || loading}
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
                  {montant !== null && (
                    <div className="mt-4">
                      <pre>
                        <h3>
                          Nombre total de page{numberOfPages > 1 ? "s" : ""}:{" "}
                          {numberOfPages}
                        </h3>
                      </pre>
                      <h3>
                        Montant total à payer: {totalAmount?.toFixed(2)}€ (
                        {amountPerPage.toFixed(2)}€ par page)
                      </h3>
                    </div>
                  )}
                  {montant !== null ? (
                    <Button
                      type="button"
                      disabled={loading}
                      onClick={() => validate(form.getValues())}
                    >
                      {loading ? <BeatLoader /> : "Valider la demande"}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      disabled={loading}
                      onClick={form.handleSubmit(onSubmit)}
                    >
                      {loading ? <BeatLoader /> : "Envoyez demande devis"}
                    </Button>
                  )}

                  {montant !== null && (
                    <div>
                      <Button
                        variant={"destructive"}
                        onClick={annuler}
                        className="btn-primary"
                      >
                        Annuler
                      </Button>
                    </div>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DevisForm;
