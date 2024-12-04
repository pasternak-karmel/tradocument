import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check, RefreshCw } from 'lucide-react';
import { ProcurationFormData } from "@/schemas";

interface StepNavigationProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  form: UseFormReturn<ProcurationFormData>;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  step,
  setStep,
  loading,
  form,
}) => {
  const { trigger } = form;

  const nextStep = async () => {
    const fieldsToValidate =
      step === 1
        ? [
            "nomMandant",
            "prenomMandant",
            "dateNaissanceMandant",
            "lieuNaissanceMandant",
            "nationaliteMandant",
            "adresseMandant",
            "lieuResidant",
          ]
        : step === 2
        ? ["typeProcuration"]
        : ["lieuSignature"];

    const isStepValid = await trigger(fieldsToValidate as any);
    if (isStepValid) {
      setStep(step + 1);
    } else {
      // Show error message
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
        <Button type="submit" className="ml-auto" disabled={loading}>
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

