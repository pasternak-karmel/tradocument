import { Resend } from "resend";

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
