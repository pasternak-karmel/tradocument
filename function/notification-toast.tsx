"use client";
import { toast } from "sonner";

interface ToastProps {
  titre: string;
  description: string;
}

export function ToastRessuable({ titre, description }: ToastProps) {
  return toast(titre, {
    description,
    action: { label: "Fermer", onClick: () => console.log("Undo") },
  });
}
