"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AddTraductionForm } from "./traduction-form";

interface TraductionProps {
  children?: React.ReactNode;
  asChild?: boolean;
}

export const AddTraduction = ({ children, asChild }: TraductionProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nouvelle Traduction</SheetTitle>
          <SheetDescription>Entrez les infos de la traduction</SheetDescription>
        </SheetHeader>
        <AddTraductionForm />
      </SheetContent>
    </Sheet>
  );
};
export default AddTraduction;
