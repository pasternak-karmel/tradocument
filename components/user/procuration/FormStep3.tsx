import { FileState, MultiFileDropzone } from "@/components/multi-file";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProcurationFormData } from "@/schemas";
import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";

interface FormStep3Props {
  form: UseFormReturn<ProcurationFormData>;
  loading: boolean;
  fileStates: FileState[];
  setFileStates: React.Dispatch<React.SetStateAction<FileState[]>>;
  fileSignature: FileState[];
  setFileSignature: React.Dispatch<React.SetStateAction<FileState[]>>;
}

export const FormStep3: React.FC<FormStep3Props> = ({
  form,
  loading,
  fileStates,
  setFileStates,
  fileSignature,
  setFileSignature,
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
      <h2 className="text-2xl font-bold mb-4">Pièce d'identité et signature</h2>
      <div className="space-y-4">
        <Label>Télécharger votre pièce d'identité</Label>
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
      <div className="space-y-2">
        <Label>Uploader Votre signature</Label>
        <div className="border rounded-lg p-2 bg-white">
          <MultiFileDropzone
            disabled={loading}
            value={fileSignature}
            dropzoneOptions={{
              maxFiles: 1,
              accept: {
                "image/*": [".png", ".jpg", ".jpeg", ".gif"],
                "application/pdf": [".pdf"],
              },
            }}
            onChange={setFileSignature}
            onFilesAdded={(addedFiles) =>
              setFileSignature([...fileSignature, ...addedFiles])
            }
          />
        </div>
      </div>
      <div>
        <Label htmlFor="lieuSignature">Lieu de la signature</Label>
        <Input
          id="lieuSignature"
          {...register("lieuSignature")}
          disabled={loading}
        />
        {errors.lieuSignature && (
          <p className="text-red-500 text-sm">{errors.lieuSignature.message}</p>
        )}
      </div>
    </motion.div>
  );
};
