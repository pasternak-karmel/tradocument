import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
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

export const AddArticleSchema = z.object({
  nom: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
    .max(50, { message: "Le nom ne peut pas dépasser 50 caractères" }),
  prix: z.coerce.number().min(0, "Price must be greater than or equal to 0"),
  quantite: z.coerce.number().min(1, "Quantity be greater than or equal to 0"),
  usage: z.boolean().default(false).optional(),
  description: z.string().max(1500, "max caracters allowed is 1500"),
  categories: z.enum([
    "outils",
    "meubles",
    "jardin",
    "Electroménager",
    "pour la maison",
    "jeux videos",
    "livre films et musique",
    "bijoux et accessoires",
    "sac et bagages",
    "vetements et chaussures pour hommes",
    "vetements et chaussures pour femmes",
    "jouer et jeux",
    "puericulture et enfants",
    "sante et beaute",
    "telephones mobiles",
    "electroniques et ordinateurs",
    "sports et activites exterieures",
    "instruments de musique",
    "artisanat d'art",
    "antiquites et objects de collection",
    "pieces automobiles",
    "velos",
    "vide-grenier",
    "divers",
  ]),
  image: z.array(z.string()).optional(),
});
