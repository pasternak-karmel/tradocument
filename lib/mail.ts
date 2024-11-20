"use server";

import DemandeDevisEmail from "@/emails/devis-client";
import DemandeDevisEmailAdmin from "@/emails/devis_admin...";
import VerificationEmail from "@/emails/verification";
import { demandeDevis } from "@/schemas";
import { render } from "@react-email/render";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.DOMAIN;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const htmlContent = await render(
    VerificationEmail({ validationCode: token })
  );
  await resend.emails.send({
    from: "Acme <noreply@glaceandconfort.com>",
    to: email,
    subject: "2FA Code",
    html: htmlContent,
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
  try {
    const htmlContent = await render(DemandeDevisEmail(values));

    const { data, error } = await resend.emails.send({
      from: "Acme <noreply@glaceandconfort.com>",
      to: values.email,
      subject: "Confirmation de votre demande de devis",
      html: htmlContent,
    });

    if (error) {
      console.error("Failed to send email:", error);
      throw new Error("Email sending failed");
    }

    console.log("Email sent successfully:", data);
    return data;
  } catch (err) {
    console.error("Error in devisSent:", err);
    throw err;
  }
};

export const devisSentAdmin = async (values: z.infer<typeof demandeDevis>) => {
  const htmlContent = await render(DemandeDevisEmailAdmin(values));

  await resend.emails.send({
    from: "Acme <noreply@glaceandconfort.com>",
    to: ["djossoucarmel0@gmail.com", "haddadolivier14@gmail.com"],
    subject: `Nouvelle demande de devis de la part de ${values.firstName} ${values.lastName}`,
    html: htmlContent,
  });
};
