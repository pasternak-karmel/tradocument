"use client";

import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
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

import { useReCaptcha } from "next-recaptcha-v3";

import { useCurrentUser } from "@/hooks/use-current-user";

import { demandeDevis } from "@/schemas";

import { calculateDistance } from "@/actions/calculate_distance";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { devisSent, devisSentAdmin } from "@/lib/mail";
import { languages } from "@/type";
import { Mail, User } from "lucide-react";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";
import { CountrySelector } from "../karmel/select-country-list";

const DevisAccueil = () => {
  const [resetKey, setResetKey] = useState(0);

  const user = useCurrentUser();
  const { executeRecaptcha } = useReCaptcha();
  const router = useRouter();

  const [showDeliveryAddress, setShowDeliveryAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const form = useForm<z.infer<typeof demandeDevis>>({
    resolver: zodResolver(demandeDevis),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: undefined,
      customDocumentType: "",
      // documentType: "",
      // sourceLanguage: "",
      // targetLanguage: "",
      additionalInfo: "",
      termsAccepted: false,
      // deliveryAddress: {
      //   departureAddress: "",
      // },
    },
  });
  const watchDocumentType = form.watch("documentType");

  useEffect(() => {
    if (distance !== null) {
      setTotalAmount(distance);
    }
  }, [distance]);

  async function onSubmit(values: z.infer<typeof demandeDevis>) {
    if (!user) return router.push(`/devis`);

    if (!values.deliveryAddress?.departureAddress) {
      showError("Adresse de récupération non renseignée");
      return;
    }

    const token = await executeRecaptcha("form_submit_demande_devis");
    if (token) {
      try {
        setLoading(true);
        let calculatedDistance = 0;

        const tempDistance = await calculateDistance(
          values.deliveryAddress.departureAddress!
        );

        if (tempDistance === null)
          return showError(
            "Une erreur s'est produite lors du calcul de la distance, veuillez réessayer plus tard."
          );

        calculatedDistance = tempDistance;

        if (showDeliveryAddress && calculatedDistance === null)
          return showError("Distance non existante");

        setDistance(calculatedDistance);
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

    if (showDeliveryAddress && !distance)
      return showError("Distance non calculée");
    setLoading(true);

    try {
      setLoading(true);
      const response = await fetch("/api/demande_devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formValues,
          montant: distance,
        }),
      });

      const result = await response.json();
      if (!response.ok)
        return showError(result.message || `Internal Server Error`);

      if (result.success) {
        await devisSent(values as z.infer<typeof demandeDevis>);
        await devisSentAdmin(values, result.info);
        form.reset();
        router.push(`/devis/payment?id=${result.message}`);
      } else {
        showError(result.message);
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

  const annuler = () => {
    form.reset({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      customDocumentType: "",
      country: undefined,
      documentType: undefined,
      sourceLanguage: undefined,
      targetLanguage: undefined,
      additionalInfo: "",
      termsAccepted: false,
      deliveryAddress: {
        departureAddress: "",
      },
    });
    setResetKey((prev) => prev + 1);
    setDistance(null);
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
                Devis de Livraison
              </CardTitle>
              <CardDescription className="text-center">
                Remplissez ce formulaire pour obtenir un devis personnalisé pour
                nos services de livraison.
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
                                disabled={distance !== null || loading}
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
                                disabled={distance !== null || loading}
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
                                disabled={distance !== null || loading}
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
                              disabled={distance !== null || loading}
                              country={"fr"}
                              value={field.value}
                              onChange={field.onChange}
                              inputStyle={{ width: "100%" }}
                              // style={{ borderWidth: 3, borderColor: "black" }}
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
                                disabled={distance !== null || loading}
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
                          key={`documentType-${resetKey}`}
                          disabled={
                            distance !== null || distance !== null || loading
                          }
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
                            <SelectItem value=" Affaires & Business">
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

                  {watchDocumentType === "Autre" && (
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
                          disabled={distance !== null || loading}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger style={inputStyle}>
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
                          disabled={distance !== null || loading}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger style={inputStyle}>
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
                            disabled={distance !== null || loading}
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
                    <FormField
                      control={form.control}
                      name="deliveryAddress.departureAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Adresse de récupération du document
                          </FormLabel>
                          <FormControl>
                            <CountrySelector
                              disabled={distance !== null || loading}
                              resetKey={resetKey}
                              onChange={(address: any) => {
                                form.setValue(
                                  "deliveryAddress.departureAddress",
                                  address
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
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
                              disabled={distance !== null || loading}
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
                  {distance !== null && (
                    <div className="mt-4">
                      <h3>Montant total à payer:</h3>
                      {showDeliveryAddress && distance !== null && (
                        <pre>
                          {distance.toFixed(2)}€ pour le transport (0.35€/km)
                        </pre>
                      )}
                      <pre>{distance.toFixed(2)}€ (0.35€/Km)</pre>
                    </div>
                  )}
                  {distance !== null ? (
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
                      {loading ? <BeatLoader /> : "Soumettre demande devis"}
                    </Button>
                  )}

                  {distance !== null && (
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
            <CardFooter></CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DevisAccueil;

{
  /* <Input
                              disabled={distance !== null || loading}
                              placeholder="eg: Pays, commune"
                              style={inputStyle}
                              {...field}
                              required
                            /> */
}
