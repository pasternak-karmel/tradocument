export type ApiResponse<T> = {
  data?: T;
  error?: string;
};

export type ServerActionResponse<T> = {
  data?: T;
  error?: string;
};

export type TranslatedDocument = {
  id: string;
  title: string;
  translator: string;
  status: "En attente" | "Approuvé" | "Refusé";
};

export type UserRejoindre = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  pays: string;
  ville: string;
  specialite: string;
  commentaire: string;
  cv: string | null;
  status: string;
};
