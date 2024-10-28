// "use client";

// import z from "zod";
// import React, { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { motion } from "framer-motion";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// import { FileState, MultiFileDropzone } from "@/components/multi-file";
// import { useEdgeStore } from "@/lib/edgestore";

// import { useReCaptcha } from "next-recaptcha-v3";

// import { useCurrentUser } from "@/hooks/use-current-user";

// import { demandeDevis } from "@/schemas";
// import { calculateDistance } from "@/actions/calculate_distance";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Mail, User } from "lucide-react";
// import { getPDFPageCount } from "@/actions/calculate_montant_page";
// import { showError } from "@/function/notification-toast";
// import { acceptedFileTypes } from "@/type";
// import { toast } from "sonner";
// import { BeatLoader } from "react-spinners";

// const DevisForm = () => {
//   const user = useCurrentUser();
//   const { executeRecaptcha } = useReCaptcha();
//   const router = useRouter();
//   const { edgestore } = useEdgeStore();

//   const [showDeliveryAddress, setShowDeliveryAddress] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [fileStates, setFileStates] = useState<FileState[]>([]);
//   const [url, setUrl] = useState("");
//   const [montant, setMontant] = useState<number | null>(null);
//   const [distance, setDistance] = useState<number | null>(null);

//   const personne = user?.name?.split(" ").map((item: any) => item.trim()) || [];

//   const form = useForm<z.infer<typeof demandeDevis>>({
//     resolver: zodResolver(demandeDevis),
//     defaultValues: {
//       firstName: personne[0] || undefined,
//       lastName: personne[1] || undefined,
//       email: user?.email || undefined,
//       phone: "",
//       country: undefined,
//       serviceType: "",
//       documentType: "",
//       sourceLanguage: "",
//       targetLanguage: "",
//       deadline: "",
//       wordCount: "",
//       additionalInfo: "",
//       termsAccepted: false,
//       deliveryAddress: {
//         departureAddress: "",
//         shippingAddress: "",
//       },
//     },
//   });

//   function updateFileProgress(key: string, progress: FileState["progress"]) {
//     setFileStates((fileStates) => {
//       const newFileStates = structuredClone(fileStates);
//       const fileState = newFileStates.find(
//         (fileState) => fileState.key === key
//       );
//       if (fileState) {
//         fileState.progress = progress;
//       }
//       return newFileStates;
//     });
//   }

//   async function onSubmit(values: z.infer<typeof demandeDevis>) {
//     if (!user) return router.push(`/devis`);

//     if (fileStates.length === 0)
//       return showError("Veuillez sélectionner le fichier à traduire");
//     if (!values.termsAccepted)
//       return showError("Veuillez accepter les termes et conditions");

//     const token = await executeRecaptcha("form_submit_demande_devis");
//     if (token) {
//       try {
//         setLoading(true);
//         let calculatedDistance = null;
//         let calculatedMontant = null;
//         // let fileUrl = null;

//         if (values.deliveryAddress) {
//           calculatedDistance = await calculateDistance({
//             departLocation: values.deliveryAddress.departureAddress!,
//             arriverLocation: values.deliveryAddress.shippingAddress!,
//           });
//         }

//         await Promise.all(
//           fileStates.map(async (fileState) => {
//             const res = await edgestore.document.upload({
//               options: { temporary: true },
//               file: fileState.file,
//               input: { type: "profile" },
//               onProgressChange: (progress) =>
//                 updateFileProgress(fileState.key, progress),
//             });
//             if (res?.url) {
//               const pageCount = await getPDFPageCount(res.url);
//               if (pageCount) {
//                 calculatedMontant = pageCount;
//                 // fileUrl = res.url;
//                 setUrl(res.url);
//               }
//             }
//           })
//         );

//         if (calculatedDistance === null)
//           return showError("Distance non existante");
//         if (calculatedMontant === null)
//           return showError("Montant non existant");

//         setMontant(calculatedMontant);
//         setDistance(calculatedDistance);
//       } catch (error) {
//         showError("Erreur lors de la soumission");
//       } finally {
//         setLoading(false);
//       }
//       return;
//     }
//     return showError("Validation reCAPTCHA échouée.");
//   }

//   const validate = async (values: z.infer<typeof demandeDevis>) => {
//     if (!montant) return showError("Montant non calculé");
//     if (!distance) return showError("Distance non calculé");
//     setLoading(true);

//     try {
//       const response = await fetch("/api/demande_devis", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...values,
//           montant: values.deliveryAddress ? distance + montant : montant,
//           distance,
//           url,
//         }),
//       });

//       const result = await response.json();
//       if (!response.ok)
//         return showError(result.message || `Erreur HTTP: ${response.status}`);

//       if (result.success) {
//         try {
//           await edgestore.document.confirmUpload({ url });
//         } catch (err) {
//           return showError(
//             "Erreur lors de la confirmation d'upload, Réessayez plus tard ou contactez le support"
//           );
//         }

//         form.reset();
//         setFileStates([]);
//         setUrl("");
//         router.push(`/devis/payment?id=${result.message}`);
//       } else {
//         showError(result.message);
//         await edgestore.myArrowImages.delete({ url });
//         return;
//       }
//     } catch (error) {
//       console.error("Erreur lors de la validation:", error);
//       toast.error("Une erreur inattendue s'est produite", {
//         description: "Veuillez réessayer plus tard.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="mt-10 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Card className="w-full">
//             <CardHeader>
//               <CardTitle className="text-2xl font-bold text-center">
//                 Demande de Devis
//               </CardTitle>
//               <CardDescription className="text-center">
//                 Remplissez ce formulaire pour obtenir un devis personnalisé pour
//                 nos services de traduction.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Form {...form}>
//                 <form
//                   onSubmit={form.handleSubmit(onSubmit)}
//                   className="space-y-6"
//                 >
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <FormField
//                       control={form.control}
//                       name="firstName"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Prénom</FormLabel>
//                           <FormControl>
//                             <div className="flex items-center">
//                               <User className="w-4 h-4 mr-2 text-gray-500" />
//                               <Input
//                                 disabled={
//                                   distance !== null ||
//                                   montant !== null ||
//                                   loading
//                                 }
//                                 placeholder="Votre prénom"
//                                 {...field}
//                               />
//                             </div>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="lastName"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Nom</FormLabel>
//                           <FormControl>
//                             <div className="flex items-center">
//                               <User className="w-4 h-4 mr-2 text-gray-500" />
//                               <Input
//                                 disabled={
//                                   distance !== null ||
//                                   montant !== null ||
//                                   loading
//                                 }
//                                 placeholder="Votre nom"
//                                 {...field}
//                               />
//                             </div>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <FormField
//                       control={form.control}
//                       name="email"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Email</FormLabel>
//                           <FormControl>
//                             <div className="flex items-center">
//                               <Mail className="w-4 h-4 mr-2 text-gray-500" />
//                               <Input
//                                 type="email"
//                                 placeholder="votre@email.com"
//                                 {...field}
//                                 disabled={
//                                   distance !== null ||
//                                   montant !== null ||
//                                   loading
//                                 }
//                               />
//                             </div>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="phone"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>
//                             Téléphone Mobile (Whatsapp, Telegram,Imo...)
//                           </FormLabel>
//                           <FormControl>
//                             <PhoneInput
//                               disabled={
//                                 distance !== null || montant !== null || loading
//                               }
//                               country={"fr"}
//                               value={field.value}
//                               onChange={field.onChange}
//                               inputStyle={{ width: "100%" }}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>

//                   <FormField
//                     control={form.control}
//                     name="country"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Pays</FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                           disabled={
//                             distance !== null || montant !== null || loading
//                           }
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder="Sélectionnez votre pays" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="Algérie">Algérie</SelectItem>
//                             <SelectItem value="Maroc">Maroc</SelectItem>
//                             <SelectItem value="Tunisie">Tunisie</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="documentType"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Type de document</FormLabel>
//                         <Select
//                           disabled={
//                             distance !== null || montant !== null || loading
//                           }
//                           onValueChange={field.onChange}
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder="Sélectionnez un document" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="legal">
//                               Actes d'état civil
//                             </SelectItem>
//                             <SelectItem value="medical">
//                               Affaires & Business
//                             </SelectItem>
//                             <SelectItem value="technical">
//                               Diplômes & Bulletins
//                             </SelectItem>
//                             <SelectItem value="financial">
//                               Finance & Commerciale
//                             </SelectItem>
//                             <SelectItem value="juridique">Juridique</SelectItem>
//                             <SelectItem value="permis">
//                               Permis de Conduire
//                             </SelectItem>
//                             <SelectItem value="technique">Technique</SelectItem>
//                             <SelectItem value="other">Autre</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="sourceLanguage"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Langue du document</FormLabel>
//                         <Select
//                           disabled={
//                             distance !== null || montant !== null || loading
//                           }
//                           onValueChange={field.onChange}
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder="Sélectionnez la langue source" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="fr">Français</SelectItem>
//                             <SelectItem value="ar">Arabe</SelectItem>
//                             <SelectItem value="en">Anglais</SelectItem>
//                             <SelectItem value="es">Espagnol</SelectItem>
//                             <SelectItem value="it">Italien</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="targetLanguage"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Le document sera traduit en :</FormLabel>
//                         <Select
//                           disabled={
//                             distance !== null || montant !== null || loading
//                           }
//                           onValueChange={field.onChange}
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder="Sélectionnez la langue cible" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="fr">Français</SelectItem>
//                             <SelectItem value="ar">Arabe</SelectItem>
//                             <SelectItem value="en">Anglais</SelectItem>
//                             <SelectItem value="es">Espagnol</SelectItem>
//                             <SelectItem value="it">Italien</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="wordCount"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Nombre de pages</FormLabel>
//                         <FormControl>
//                           <Input
//                             disabled={
//                               distance !== null || montant !== null || loading
//                             }
//                             placeholder="Ex : 5"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="additionalInfo"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Informations supplémentaires</FormLabel>
//                         <FormControl>
//                           <Textarea
//                             disabled={
//                               distance !== null || montant !== null || loading
//                             }
//                             placeholder="Ajoutez des détails supplémentaires sur votre demande."
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <div className="space-y-4">
//                     <FormLabel>Télécharger le document à traduire</FormLabel>
//                     <MultiFileDropzone
//                       disabled={
//                         distance !== null || montant !== null || loading
//                       }
//                       value={fileStates}
//                       dropzoneOptions={{
//                         maxFiles: 1,
//                         accept: acceptedFileTypes,
//                       }}
//                       onChange={(files) => {
//                         setFileStates(files);
//                       }}
//                       onFilesAdded={async (addedFiles) => {
//                         const updatedFiles = [...fileStates, ...addedFiles];
//                         setFileStates(updatedFiles);
//                       }}
//                     />
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <Checkbox
//                       id="delivery"
//                       checked={showDeliveryAddress}
//                       onCheckedChange={(checked) =>
//                         setShowDeliveryAddress(checked as boolean)
//                       }
//                       disabled={
//                         distance !== null || montant !== null || loading
//                       }
//                     />
//                     <label htmlFor="delivery">
//                       Obtenir un document administratif à faire traduire par
//                       procuration
//                     </label>
//                   </div>

//                   {showDeliveryAddress && (
//                     <div className="space-y-4">
//                       <FormField
//                         control={form.control}
//                         name="deliveryAddress.departureAddress"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Adresse de départ</FormLabel>
//                             <FormControl>
//                               <Input
//                                 disabled={
//                                   distance !== null ||
//                                   montant !== null ||
//                                   loading
//                                 }
//                                 placeholder="eg: France, Paris"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name="deliveryAddress.shippingAddress"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Adresse d'expédition</FormLabel>
//                             <FormControl>
//                               <Input
//                                 disabled={
//                                   distance !== null ||
//                                   montant !== null ||
//                                   loading
//                                 }
//                                 placeholder="eg: Maroc, rabat"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                   )}
//                   <div className="flex items-center space-x-2">
//                     <FormField
//                       control={form.control}
//                       name="termsAccepted"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormControl>
//                             <Checkbox
//                               disabled={
//                                 distance !== null || montant !== null || loading
//                               }
//                               id="terms"
//                               checked={field.value}
//                               onCheckedChange={field.onChange}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <label htmlFor="terms">
//                       J'accepte les termes et conditions
//                     </label>
//                   </div>
//                   {distance !== null && montant !== null && (
//                     <div className="mt-4">
//                       <h3>Montant total a payer:</h3>
//                       <pre>{(distance + montant).toFixed(2)}€ soit:</pre>
//                       <pre>
//                         {distance.toFixed(2)}€ pour le transport (0.25€/km)
//                       </pre>
//                       <pre>
//                         {montant.toFixed(2)}€ (40€/page) du document importé{" "}
//                       </pre>
//                     </div>
//                   )}
//                   {distance !== null && montant !== null ? (
//                     <Button
//                       type="button"
//                       disabled={loading}
//                       onClick={() => validate(form.getValues())}
//                     >
//                       {loading ? <BeatLoader /> : "Valider la demande"}
//                     </Button>                     
//                   ) : (
//                     <Button
//                       type="button"
//                       disabled={loading}
//                       onClick={form.handleSubmit(onSubmit)}
//                     >
//                       {loading ? <BeatLoader /> : "Nouvelle demande de devis"}
//                     </Button>
//                   )}
//                 </form>
//               </Form>
//             </CardContent>
//             <CardFooter></CardFooter>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   );
// };
// export default DevisForm;


"use client";

import z from "zod";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { FileState, MultiFileDropzone } from "@/components/multi-file";
import { useEdgeStore } from "@/lib/edgestore";

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
import { getPDFPageCount } from "@/actions/calculate_montant_page";
import { showError } from "@/function/notification-toast";
import { acceptedFileTypes } from "@/type";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";

const DevisForm = () => {
  const user = useCurrentUser();
  const { executeRecaptcha } = useReCaptcha();
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const [showDeliveryAddress, setShowDeliveryAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [url, setUrl] = useState("");
  const [montant, setMontant] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const personne = user?.name?.split(" ").map((item: any) => item.trim()) || [];

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

  useEffect(() => {
    if (montant !== null) {
      setTotalAmount(showDeliveryAddress && distance !== null ? distance + montant : montant);
    }
  }, [montant, distance, showDeliveryAddress]);

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
    if (!user) return router.push(`/devis`);

    if (fileStates.length === 0)
      return showError("Veuillez sélectionner le fichier à traduire");
    if (!values.termsAccepted)
      return showError("Veuillez accepter les termes et conditions");

    const token = await executeRecaptcha("form_submit_demande_devis");
    if (token) {
      try {
        setLoading(true);
        let calculatedDistance = null;
        let calculatedMontant = null;

        if (showDeliveryAddress && values.deliveryAddress) {
          calculatedDistance = await calculateDistance({
            departLocation: values.deliveryAddress.departureAddress!,
            arriverLocation: values.deliveryAddress.shippingAddress!,
          });
        }

        await Promise.all(
          fileStates.map(async (fileState) => {
            const res = await edgestore.document.upload({
              options: { temporary: true },
              file: fileState.file,
              input: { type: "profile" },
              onProgressChange: (progress) =>
                updateFileProgress(fileState.key, progress),
            });
            if (res?.url) {
              const pageCount = await getPDFPageCount(res.url);
              if (pageCount) {
                calculatedMontant = pageCount;
                setUrl(res.url);
              }
            }
          })
        );

        if (showDeliveryAddress && calculatedDistance === null)
          return showError("Distance non existante");
        if (calculatedMontant === null)
          return showError("Montant non existant");

        setMontant(calculatedMontant);
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
    if (!montant) return showError("Montant non calculé");
    if (showDeliveryAddress && !distance) return showError("Distance non calculée");
    setLoading(true);

    try {
      const response = await fetch("/api/demande_devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          montant: totalAmount,
          distance: showDeliveryAddress ? distance : null,
          url,
        }),
      });

      const result = await response.json();
      if (!response.ok)
        return showError(result.message || `Erreur HTTP: ${response.status}`);

      if (result.success) {
        try {
          await edgestore.document.confirmUpload({ url });
        } catch (err) {
          return showError(
            "Erreur lors de la confirmation d'upload, Réessayez plus tard ou contactez le support"
          );
        }

        form.reset();
        setFileStates([]);
        setUrl("");
        router.push(`/devis/payment?id=${result.message}`);
      } else {
        showError(result.message);
        await edgestore.myArrowImages.delete({ url });
        return;
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
                              <Input
                                disabled={montant !== null || loading}
                                placeholder="Votre prénom"
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
                        <FormLabel>Pays</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={montant !== null || loading}
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
                        <Select
                          disabled={montant !== null || loading}
                          onValueChange={field.onChange}
                        >
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
                        <Select
                          disabled={montant !== null || loading}
                          onValueChange={field.onChange}
                        >
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
                        <FormLabel>Le document sera traduit en  :</FormLabel>
                        <Select
                          disabled={montant !== null || loading}
                          onValueChange={field.onChange}
                        >
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
                          <Input
                            disabled={montant !== null || loading}
                            placeholder="Ex : 5"
                            {...field}
                          />
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
                            disabled={montant !== null || loading}
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
                      disabled={montant !== null || loading}
                      value={fileStates}
                      dropzoneOptions={{
                        maxFiles: 1,
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
                    <Checkbox
                      id="delivery"
                      checked={showDeliveryAddress}
                      onCheckedChange={(checked) => {
                        setShowDeliveryAddress(checked as boolean);
                        if (!checked) {
                          setDistance(null);
                        }
                      }}
                      disabled={montant !== null || loading}
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
                                disabled={montant !== null || loading}
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
                                disabled={montant !== null || loading}
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
                      <h3>Montant total à payer:</h3>
                      <pre>{totalAmount?.toFixed(2)}€ soit:</pre>
                      {showDeliveryAddress && distance !== null && (
                        <pre>
                          {distance.toFixed(2)}€ pour le transport (0.25€/km)
                        </pre>
                      )}
                      <pre>
                        {montant.toFixed(2)}€ (40€/page) du document importé
                      </pre>
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
                      {loading ? <BeatLoader /> : "Nouvelle demande de devis"}
                    </Button>
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

export default DevisForm;