import { FileState, MultiFileDropzone } from "@/components/multi-file";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProcurationFormData } from "@/schemas";
import { motion } from "framer-motion";
import { Check, RefreshCw } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface FormStep3Props {
  form: UseFormReturn<ProcurationFormData>;
  loading: boolean;
  fileStates: FileState[];
  setFileStates: React.Dispatch<React.SetStateAction<FileState[]>>;
  onSubmit: () => Promise<void>;
}

export const FormStep3: React.FC<FormStep3Props> = ({
  form,
  loading,
  fileStates,
  setFileStates,
  onSubmit,
}) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">Objet et validité</h2>

      <div>
        <Label htmlFor="dateLimite">Date limite de validité</Label>
        <Input
          type="date"
          id="dateLimite"
          {...register("dateLimite")}
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="lieuSignature">Lieu de signature</Label>
        <Input
          id="lieuSignature"
          {...register("lieuSignature")}
          disabled={loading}
        />
        {errors.lieuSignature && (
          <p className="text-red-500 text-sm">{errors.lieuSignature.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="dateSignature">Date de signature</Label>
        <Input
          type="date"
          id="dateSignature"
          {...register("dateSignature")}
          disabled={loading}
        />
        {errors.dateSignature && (
          <p className="text-red-500 text-sm">{errors.dateSignature.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <Label>Pièce d'identité ou passport</Label>
        <MultiFileDropzone
          disabled={loading}
          value={fileStates}
          dropzoneOptions={{
            maxFiles: 2,
            accept: {
              "image/*": [".png", ".jpg", ".jpeg", ".gif"],
              "application/pdf": [".pdf"],
            },
          }}
          onChange={setFileStates}
          onFilesAdded={(addedFiles) =>
            setFileStates([...fileStates, ...addedFiles])
          }
        />
      </div>

      <Button onClick={onSubmit} className="w-full" disabled={loading}>
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
    </motion.div>
  );
};
