import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import type { AdapterAccountType } from "next-auth/adapters";
import { createInsertSchema } from "drizzle-zod";

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
  fichier: text("fichier").unique().notNull(),
  fichierTraduis: text("fichier_traduis").unique(),
  traducteur: text("traducteur")
    .unique()
    .references(() => users.id),
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
  typeDocument: text("type_document").notNull(),
  langueSource: text("langue_source").notNull(),
  langueTraduit: text("langue_traduit").notNull(),
  page: text("page").notNull(),
  infoSupl: text("information_supplementaire"),
  fichier: text("fichier").unique().notNull(), //
  fichierTraduis: text("fichier_traduis").unique(),
  traducteur: text("traducteur")
    // .unique()
    .references(() => users.id),
  adresseDepart: text("adresse_depart"),
  adresseArriver: text("adresse_arriver"),
  montant: integer("montant").notNull(), //
  created_at: timestamp("createdAT", { mode: "date" }).notNull().defaultNow(),
  delivered_at: timestamp("deliveredAT", { mode: "date" }),
  status: text("status").default("traitement").notNull(),
  payer: boolean("payer").default(false),
});
