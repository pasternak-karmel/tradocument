"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AddTraductionForm } from "./traduction-form";
import { AddTraducteurForm } from "./addTraducteur";

interface TraductionProps {
  children?: React.ReactNode;
  asChild?: boolean;
  role?: string;
}

export const AddTraduction = ({ children, role }: TraductionProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nouvelle Traduction</SheetTitle>
          <SheetDescription>Entrez les infos de la traduction</SheetDescription>
        </SheetHeader>
        {role === "traducteur" ? <AddTraducteurForm /> : <AddTraductionForm />}
        {/* <AddTraductionForm /> */}
      </SheetContent>
    </Sheet>
  );
};
export default AddTraduction;
