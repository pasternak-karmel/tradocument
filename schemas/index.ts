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

export const demandeDevis = z.object({
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
  // serviceType: z.string({
  //   required_error: "Veuillez sélectionner un type de service",
  // }),
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
  url: z.array(z.string()).optional(),
}).refine((data) => data.sourceLanguage !== data.targetLanguage, {
  message: "Les langues d'origine et de traduction doivent être différentes",
  path: ["targetLanguage"],
});


export const RejoindreSchema = z.object({
  nom: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  prenom: z
    .string()
    .min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  pays: z.string().min(1, { message: "Entrez votre pays." }),
  ville: z.string().min(1, { message: "Entrez votre ville." }),
  adresse: z.string().min(1, { message: "Entrez votre adresse." }),
  specialite: z.string().min(1, { message: "Sélectionnez votre spécialité." }),
  commentaire: z.string().optional(),
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
