import { ShowError } from "@/components/sonner-component";
import { Button } from "@/components/ui/button";
import { ProcurationFormData } from "@/schemas";
import { Check, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface StepNavigationProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  form: UseFormReturn<ProcurationFormData>;
  onSubmit: () => void;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  step,
  setStep,
  loading,
  form,
  onSubmit,
}) => {
  const { trigger } = form;

  const nextStep = async () => {
    const fieldsToValidate =
      step === 1
        ? [
            "nom",
            "prenom",
            "dateNaissance",
            "lieuNaissance",
            "nationalite",
            "adresse",
            "numeroIdentite",
          ]
        : ["documents", "institution"];

    const isStepValid = await trigger(fieldsToValidate as any);
    if (isStepValid) {
      setStep(step + 1);
    } else {
      ShowError("Veuillez vérifier les champs invalides");
    }
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="flex justify-between mt-6">
      {step > 1 && (
        <Button
          type="button"
          onClick={prevStep}
          variant="outline"
          disabled={loading}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Précédent
        </Button>
      )}
      {step < 3 ? (
        <Button
          type="button"
          onClick={nextStep}
          className="ml-auto"
          disabled={loading}
        >
          Suivant
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button
          type="button"
          className="ml-auto"
          disabled={loading}
          onClick={onSubmit}
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Traitement...
            </>
          ) : (
            <>
              <Check className="w-4 h-4 mr-2" />
              Soumettre
            </>
          )}
        </Button>
      )}
    </div>
  );
};
