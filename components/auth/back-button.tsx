"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";


import { Button } from "@/components/ui/button";
import { RegisterForm } from "./register-form";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  mode?: "modal" | "redirect";
  href: string;
  label: string;
  asChild?: boolean;
}

export const BackButton = ({
  href,
  label,
  mode = "redirect",
  asChild,
}: BackButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(href);
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>
          <Button variant="link">{label}</Button>
        </DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <RegisterForm />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {label}
    </span>
  );
};
