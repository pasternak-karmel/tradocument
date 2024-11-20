"use server";

import { demandeDevis } from "@/schemas";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.DOMAIN;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "Acme <noreply@glaceandconfort.com>",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "Acme <noreply@glaceandconfort.com>",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "Acme <noreply@glaceandconfort.com>",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const AssignTraduction = async (email: string) => {
  await resend.emails.send({
    from: "Acme <noreply@glaceandconfort.com>",
    to: email,
    subject: "Nouvelle assignation",
    html: `<p>Une nouvelle traduction vous a été assigné. Veuillez consulter votre tableau de board</p>`,
  });
};

export const AcceptTraducteur = async (email: string, mdp: string) => {
  await resend.emails.send({
    from: "Acme <noreply@glaceandconfort.com>",
    to: email,
    subject: "Acceptation au poste de traducteur",
    html: `<>Vous avez été accepter pour le poste traducteur au sein de notre équipe<br/>Voici vos informations de connection pour accéder à la plateforme<br/>Email: ${email}<br/>Mot de passe: ${mdp}<br/>Cordialement<br/>L'équipe de Tradocument.com</p>`,
  });
};

export const AcceptTraduction = async (email: string, nom: string) => {
  await resend.emails.send({
    from: "Acme <noreply@glaceandconfort.com>",
    to: email,
    subject: "Traduction de document terminée",
    html: `<>Votre traduction "${nom}" a été terminée<br/>Veuillez vous connecter pour la télécharger<br/>Cordialement<br/>L'équipe de Tradocument.com</p>`,
  });
};

export const rejectedTraduction = async (email: string, nom: string) => {
  await resend.emails.send({
    from: "Acme <noreply@glaceandconfort.com>",
    to: email,
    subject: "Traduction rejetée",
    html: `<>Votre traduction "${nom}" a été rejetée<br/>Veuillez la reprendre ou la soumettre à nouveau<br/>Cordialement<br/>L'équipe de Tradocument.com</p>`,
  });
};

export const devisSent = async (values: z.infer<typeof demandeDevis>) => {
  const emailContent = `
    <p>Bonjour <strong>${values.firstName} ${values.lastName}</strong>,</p>

    <p>Nous vous remercions d’avoir soumis une demande de devis sur notre plateforme <strong>Tradocument.com</strong>. Voici un récapitulatif des informations que vous avez fournies :</p>

    <h3>Détails de la demande</h3>
    <ul>
      <li><strong>Type de document :</strong> ${values.documentType}</li>
      <li><strong>Langue source :</strong> ${values.sourceLanguage}</li>
      <li><strong>Langue cible :</strong> ${values.targetLanguage}</li>
      <li><strong>Date limite souhaitée :</strong> ${
        values.deadline || "Non précisée"
      }</li>
    </ul>

    <h3>Informations personnelles</h3>
    <ul>
      <li><strong>Prénom :</strong> ${values.firstName}</li>
      <li><strong>Nom :</strong> ${values.lastName}</li>
      <li><strong>Email :</strong> ${values.email}</li>
      <li><strong>Téléphone :</strong> ${values.phone}</li>
      <li><strong>Pays :</strong> ${values.country}</li>
    </ul>

    ${
      values.deliveryAddress
        ? `
      <h3>Adresse de livraison</h3>
      <ul>
        <li><strong>Adresse de départ :</strong> ${
          values.deliveryAddress.departureAddress || "Non spécifiée"
        }</li>
        <li><strong>Adresse de destination :</strong> ${
          values.deliveryAddress.shippingAddress || "Non spécifiée"
        }</li>
      </ul>
      `
        : ""
    }

    ${
      values.additionalInfo
        ? `
      <h3>Informations supplémentaires</h3>
      <p>${values.additionalInfo}</p>
      `
        : ""
    }

    <p>Nous traitons actuellement votre demande et reviendrons vers vous avec une estimation détaillée dans les plus brefs délais. Si vous avez des questions ou des précisions à apporter, n’hésitez pas à nous contacter par email ou par téléphone.</p>

    <p>Cordialement,</p>
    <p>L’équipe <strong>Tradocument.com</strong><br/>
    <a href="mailto:noreply@glaceandconfort.com">noreply@glaceandconfort.com</a></p>
  `;

  await resend.emails.send({
    from: "Acme <noreply@glaceandconfort.com>",
    to: values.email,
    subject: "Confirmation de votre demande de devis",
    html: emailContent,
  });
};

export const devisSentAdmin = async (values: z.infer<typeof demandeDevis>) => {
  // Contenu de l'email destiné à l'administrateur
  const adminEmailContent = `
    <p>Bonjour,</p>

<p>Une nouvelle demande de devis a été soumise par <strong>${
    values.firstName
  } ${values.lastName}}</strong>. Voici les détails de la demande :</p>

<table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;">
  <thead>
    <tr style="background-color: #f4f4f4;">
      <th style="text-align: left; padding: 10px; border: 1px solid #ddd;">Catégorie</th>
      <th style="text-align: left; padding: 10px; border: 1px solid #ddd;">Informations</th>
    </tr>
  </thead>
  <tbody>
    <!-- Informations client -->
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Nom complet</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">${values.firstName} ${
    values.lastName
  }</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Email</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">${values.email}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Téléphone</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">${values.phone}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Pays</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">+${values.country}</td>
    </tr>

    <!-- Détails de la demande -->
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;"><strong>Type de document</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">${
        values.documentType
      }</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;"><strong>Langue source</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">${
        values.sourceLanguage
      }</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;"><strong>Langue cible</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">${
        values.targetLanguage
      }</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;"><strong>Date limite</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">${
        values.deadline || "non spécifié"
      }</td>
    </tr>

    <!-- Adresse de livraison -->
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Adresse de départ</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">
      ${values.deliveryAddress?.departureAddress || "non spécifiée"}
      </td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Adresse de destination</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">
      ${values.deliveryAddress?.shippingAddress || "non spécifiée"}

      </td>
    </tr>

    <!-- Informations supplémentaires -->
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;"><strong>Informations supplémentaires</strong></td>
      <td style="padding: 10px; border: 1px solid #ddd;">
      ${values.additionalInfo || "Aucune"}
      </td>
    </tr>
  </tbody>
</table>

<p style="margin-top: 20px;">Merci de prendre en charge cette demande dans les plus brefs délais.</p>

<p>Cordialement,</p>
<p><strong>Système de gestion des devis</strong></p>;`;

  await resend.emails.send({
    from: "Acme <noreply@glaceandconfort.com>",
    to: ["djossoucarmel0@gmail.com"],
    subject: `Nouvelle demande de devis de la part de ${values.firstName} ${values.lastName}`,
    html: adminEmailContent,
  });
};
