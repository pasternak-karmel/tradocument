import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export type Task = z.infer<typeof taskSchema>;

export const traductionSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  nom: z.string().min(1),
  prenom: z.string().min(1),
  email: z.string().email(),
  fichier: z.string().min(1),
  fichierTraduis: z.string().nullable(),
  traducteur: z.string().nullable(),
  montant: z.number().int(),
  created_at: z.date(), // Assuming this is returned as a Date object.
  delivered_at: z.date().nullable().optional(),
  status: z.string(),
  traduction_from: z.string().min(1),
  traduction_to: z.string().min(1),
  payer: z.boolean().default(false).nullable(),
});

export type Traduction = z.infer<typeof traductionSchema>;

export const usersSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  nom: z.string().min(1),
  prenom: z.string().min(1),
  email: z.string().email(),
  fichier: z.string().min(1),
  fichierTraduis: z.string().nullable(),
  traducteur: z.string().nullable(),
  montant: z.number().int(),
  created_at: z.date(), // Assuming this is returned as a Date object.
  delivered_at: z.date().nullable().optional(),
  status: z.string(),
  traduction_from: z.string().min(1),
  traduction_to: z.string().min(1),
  payer: z.boolean().default(false).nullable(),
});

export type Users = z.infer<typeof usersSchema>;
