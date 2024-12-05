import { InferModel } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { createInsertSchema } from "drizzle-zod";
import type { AdapterAccountType } from "next-auth/adapters";

export const UserRoleEnum = {
  ADMIN: "admin",
  USER: "user",
  TRADUCTEUR: "traducteur",
};

export type UserRole = (typeof UserRoleEnum)[keyof typeof UserRoleEnum];

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  salt: text("salt"),
  role: text("role").notNull().default("user"),
  two_factor_secret: text("two_factor_secret"),
  two_factor_enabled: boolean("two_factor_enabled").default(false),
});
export type USERS = typeof users.$inferSelect;

export const InsertUserSchema = createInsertSchema(users);

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.email, verificationToken.token],
    }),
  })
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

export const passwordResetTokens = pgTable(
  "password_reset_tokens",
  {
    id: text("id").primaryKey().default("cuid()"),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (table) => ({
    uniqueEmailToken: uniqueIndex("unique_email_token").on(
      table.email,
      table.token
    ),
  })
);

// TwoFactorToken Table
export const twoFactorTokens = pgTable(
  "two_factor_tokens",
  {
    id: text("id")
      .$defaultFn(() => crypto.randomUUID())
      .notNull(),
    email: text("email").notNull(),
    token: text("token").notNull(),
    // expires: integer("expires").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (table) => ({
    compositePK: primaryKey({
      columns: [table.email, table.token],
    }),
  })
);

// TwoFactorConfirmation Table
export const twoFactorConfirmations = pgTable(
  "two_factor_confirmations",
  {
    id: text("id").primaryKey().default("cuid()"),
    userId: text("user_id").notNull(),
  },
  (table) => ({
    uniqueUser: uniqueIndex("unique_user").on(table.userId),
  })
);

export const traduction = pgTable("traduction", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  nom: text("nom").notNull(),
  prenom: text("prenom").notNull(),
  email: text("email").notNull(),
  fichier: text("fichier").notNull(),
  fichierTraduis: text("fichier_traduis").unique(),
  traducteur: text("traducteur").references(() => users.id),
  montant: integer("montant").notNull(),
  created_at: timestamp("createdAT", { mode: "date" }).notNull().defaultNow(),
  delivered_at: timestamp("deliveredAT", { mode: "date" }),
  status: text("status").default("pending").notNull(),
  traduction_from: text("traduction_from").notNull(),
  traduction_to: text("traduction_to").notNull(),
  payer: boolean("payer").default(false),
});

export type TRADUCTION = typeof traduction.$inferSelect;

export const InsertTraduction = createInsertSchema(traduction);

export const DemandeDevis = pgTable("demande_devis", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  nom: text("nom").notNull(),
  prenom: text("prenom").notNull(),
  numero: text("numero").notNull(),
  email: text("email").notNull(),
  pays: text("pays").notNull(),
  type: boolean("type").notNull().default(false),
  typeDocument: text("type_document").notNull(),
  langueSource: text("langue_source").notNull(),
  langueTraduit: text("langue_traduit").notNull(),
  infoSupl: text("information_supplementaire"),
  fichier: text("fichier").array(),
  fichierTraduis: text("fichier_traduis").unique(),
  traducteur: text("traducteur").references(() => users.id),
  adresseDepart: text("adresse_depart"),
  adresseArriver: text("adresse_arriver"),
  montant: integer("montant").notNull(),
  created_at: timestamp("createdAT", { mode: "date" }).notNull().defaultNow(),
  delivered_at: timestamp("deliveredAT", { mode: "date" }),
  status: text("status").default("pending").notNull(),
  payer: boolean("payer").default(false),
});
export type DEMANDEDEVIS = typeof DemandeDevis.$inferSelect;

export const rejoindrEquipe = pgTable("rejoindreEquipe", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    // .notNull()
    .references(() => users.id),
  nom: text("nom").notNull(),
  nomSociete: text("nomSociete").notNull(),
  adresseSociete: text("adresseSociete").notNull(),
  telephoneSociete: text("telephoneSociete").notNull(),
  whatsapp: text("whatsapp").notNull(),
  prenom: text("prenom").notNull(),
  email: text("email").notNull().unique(),
  pays: text("pays").notNull(),
  ville: text("ville").notNull(),
  specialite: text("specialite").notNull(),
  commentaire: text("commentaire"),
  cv: text("cv"),
  created_at: timestamp("createdAT", { mode: "date" }).notNull().defaultNow(),
  approved_at: timestamp("approved_at", { mode: "date" }),
  status: text("status").default("attente").notNull(),
  isAccepter: boolean("isAccepter").default(false),
  url: text("url").array().notNull(),
});

export const contact = pgTable("contact", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  nom: text("nom").notNull(),
  email: text("email").notNull(),
  sujet: text("sujet").notNull(),
  message: text("message").notNull(),
});

export const procurations = pgTable("procurations", {
  //identifiant unique
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  created_at: timestamp("createdAT", { mode: "date" }).notNull().defaultNow(),
  // Mandator's information
  nom: text("nom").notNull(),
  prenom: text("prenom").notNull(),
  dateNaissance: text("date_naissance").notNull(), // Utiliser `date()` si le champ est une date
  lieuNaissance: text("lieu_naissance").notNull(),
  nationalite: text("nationalite").notNull(),
  adresse: text("adresse").notNull(),
  numeroIdentite: text("numero_identite").notNull(),

  // Purpose and validity
  institution: text("institution").notNull(),
  documents: text("documents").array().notNull(),
  dateLimite: text("date_limite"),

  // Signature information
  lieuSignature: text("lieu_signature").notNull(),
  dateSignature: text("date_signature").notNull(),

  // File uploads
  pieceIdentite: text("piece_identite").array().notNull(),
});
export type ProcurationType = typeof procurations.$inferSelect;


export const codeVerification = pgTable("codeVerification", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  code: text("code").notNull(),
  created_at: timestamp("createdAT", { mode: "date" }).notNull().defaultNow(),
  type: text("type").notNull(),
});

// export type TRADUCTIONS = typeof traductions.$inferSelect;
