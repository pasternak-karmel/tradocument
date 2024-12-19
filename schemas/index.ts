import { z } from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    // role: z.enum(["user", "admin"]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const CreateLivreurSchema = z.object({
  name: z.string().min(3, {
    message: "Nom is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
});

export const CreateTraductionSchema = z
  .object({
    nom: z.string({
      message: "Veuillez entrez votre nom",
    }),
    prenom: z.string({
      message: "Veuillez entrez votre prenom",
    }),
    email: z
      .string({
        message: "email required",
      })
      .email({
        message: "Entrez un mail valide",
      }),
    fichier: z.string().optional(),
    montant: z.number().optional(),
    traduire_de: z.enum(["français", "anglais", "arabe", "espagnol"], {
      message: "Veuillez sélectionnez la langue d'origine",
    }),
    traduire_pour: z.enum(["français", "anglais", "arabe", "espagnol"], {
      message: "Veuillez sélectionnez la langue traduction",
    }),
  })
  .refine((data) => data.traduire_de !== data.traduire_pour, {
    message: "Les langues d'origine et de traduction doivent être différentes",
    path: ["traduire_pour"],
  });

export const meLivrer = z.object({
  name: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
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

export const demandeDevis = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
    lastName: z
      .string()
      .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    email: z.string().email({ message: "Adresse email invalide" }),
    phone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
    country: z.string({
      required_error: "Please select a country.",
    }),
    documentType: z.string({
      required_error: "Veuillez sélectionner un type de document",
    }),
    customDocumentType: z.string().optional(),
    sourceLanguage: z.string({
      required_error: "Veuillez sélectionner la langue source",
    }),
    targetLanguage: z.string({
      required_error: "Veuillez sélectionner la langue cible",
    }),
    additionalInfo: z.string().optional(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter les termes et conditions",
    }),
    deliveryAddress: z.object({
      departureAddress: z.string({
        required_error: "L'adresse de récupération est nécessaire",
      }),
    }),
    url: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data.documentType === "Autre") {
        return (
          data.customDocumentType && data.customDocumentType.trim().length > 0
        );
      }
      return true;
    },
    {
      message: "Veuillez spécifier le type de document",
      path: ["customDocumentType"],
    }
  )
  .refine((data) => data.sourceLanguage !== data.targetLanguage, {
    message: "Les langues d'origine et de traduction doivent être différentes",
    path: ["targetLanguage"],
  });
export type DemandeDevisFormData = z.infer<typeof demandeDevis>;

export const RejoindreSchema = z.object({
  nom: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  nomSociete: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  prenom: z
    .string()
    .min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  pays: z.string().min(1, { message: "Entrez votre pays." }),
  ville: z.string().min(1, { message: "Entrez votre ville." }),
  adresse: z.string().min(1, { message: "Entrez votre adresse." }),
  adresseSociete: z.string().min(1, { message: "Entrez votre adresse." }),
  telephoneSociete: z.string().min(10, {
    message: "Numéro invalide. Vérifiez le format: eg: +33XXXXXXXXXX",
  }),
  whatsapp: z.string().min(10, {
    message: "Numéro invalide. Vérifiez le format: eg: +33XXXXXXXXXX",
  }),
  specialite: z.string().min(1, { message: "Sélectionnez votre spécialité." }),
  commentaire: z.string().min(1, {
    message: "Veuillez entrer la langue de traduction ou la zone de livraison.",
  }),
  url: z.array(z.string()).optional(),
  verificationCode: z
    .string()
    .length(6, { message: "Le code doit contenir 6 chiffres" })
    .optional(),
});

export type RejoindreFormValues = z.infer<typeof RejoindreSchema>;

export const AddTraducteur = z.object({
  nom: z.string().min(3, "3 caractères minimun réquis"),
  email: z.string().email({ message: "Adresse email invalide" }),
  role: z.string({
    message: "Veuillez sélectionnez un rôle",
  }),
  password: z.string().optional(),
});

const validateDate = (date: string) => {
  const [day, month, year] = date.split("-").map(Number);
  const isValidDate = !isNaN(new Date(year, month - 1, day).getTime());
  return isValidDate && day <= 31 && month <= 12 && year > 1900;
};

// export const ProcurationFormSchema = z
//   .object({
//     typeProcuration: z.string().min(1, "Le type de procuration est requis"),
//     nomMandant: z.string().min(1, "Le nom du mandant est requis"),
//     prenomMandant: z.string().min(1, "Le prénom du mandant est requis"),
//     dateNaissanceMandant: z
//       .string()
//       .min(1, "La date de naissance est requise")
//       .regex(
//         /^\d{4}-\d{2}-\d{2}$/,
//         "La date de naissance doit être au format AAAA-MM-JJ"
//       ),
//     lieuNaissanceMandant: z.string().min(1, "Le lieu de naissance est requis"),
//     nationaliteMandant: z.string().min(1, "La nationalité est requise"),
//     adresseMandant: z.string().min(1, "L'adresse est requise"),
//     customDocumentType: z
//       .string()
//       .optional()
//       .refine(
//         (val) => {
//           if (val === "Autre") {
//             return val && val.trim().length > 0;
//           }
//           return true;
//         },
//         {
//           message: "Veuillez spécifier le type de document",
//         }
//       ),

//     dateDebut: z.string().optional(),
//     dateFin: z.string().optional(),
//     piece: z.array(z.string()).optional(),
//     signature: z.array(z.string()).optional(),
//     lieuSignature: z.string().min(1, "Le lieu de singature est requis"),
//     lieuResidant: z.string().min(1, "Le lieu de résidence est requis"),
//   })
//   .refine(
//     (data) => {
//       if (data.dateDebut && !data.dateFin) {
//         return false;
//       }
//       return true;
//     },
//     {
//       message: "La date de fin est requise si une date de début est spécifiée",
//       path: ["dateFin"],
//     }
//   )
//   .refine(
//     (data) => {
//       if (data.typeProcuration === "Autre") {
//         return (
//           data.customDocumentType && data.customDocumentType.trim().length > 0
//         );
//       }
//       return true;
//     },
//     {
//       message: "Veuillez spécifier le type de document",
//       path: ["customDocumentType"],
//     }
//   );

// export type ProcurationFormData = z.infer<typeof ProcurationFormSchema>;

export const ProcurationFormSchema = z.object({
  // Mandator's information
  nom: z.string().min(1, { message: "Le nom est requis" }),
  prenom: z.string().min(1, { message: "Le prénom est requis" }),
  dateNaissance: z
    .string()
    .min(1, { message: "La date de naissance est requise" }),
  lieuNaissance: z
    .string()
    .min(1, { message: "Le lieu de naissance est requis" }),
  nationalite: z.string().min(1, { message: "La nationalité est requise" }),
  adresse: z.string().min(1, { message: "L'adresse est requise" }),
  numeroIdentite: z
    .string()
    .min(1, { message: "Le numéro d'identité est requis" }),

  // Purpose and validity
  institution: z.string().min(1, { message: "L'institution est requise" }),
  documents: z
    .array(z.string())
    .min(1, { message: "Au moins un document doit être spécifié" }),
  dateLimite: z.string().optional(),

  // Signature information
  lieuSignature: z
    .string()
    .min(1, { message: "Le lieu de signature est requis" }),
  dateSignature: z
    .string()
    .min(1, { message: "La date de signature est requise" }),

  // File uploads
  pieceIdentite: z
    .array(z.string())
    .min(1, { message: "La pièce d'identité est requise" })
    .optional(),
});

export type ProcurationFormData = z.infer<typeof ProcurationFormSchema>;

export const VerificationCodeSchema = z.object({
  code: z.string().email({
    message: "Email is required",
  }),
  type: z.string().min(1, {
    message: "Minimum 1 characters required",
  }),
});

export type ContactFormData = z.infer<typeof ContactSchema>;

export const ContactSchema = z.object({
  nom: z.string().min(1, { message: "Le nom est requis" }),
  prenom: z.string().min(1, { message: "Le prénom est requis" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  pays: z.string().min(1, { message: "Entrez votre pays." }),
  ville: z.string().min(1, { message: "Entrez votre ville." }),
  phoneNumber: z.string().min(10, {
    message: "Numéro invalide. Vérifiez le format: eg: +33XXXXXXXXXX",
  }),
  objet: z.string().min(1, { message: "Veuillez entrer le sujet de votre message." }),
  message: z.string().min(1, { message: "Veuillez entrer votre message." }),
});