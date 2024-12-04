import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProcurationFormData } from "@/schemas";
import { motion } from "framer-motion";
import { Controller, UseFormReturn } from "react-hook-form";

interface FormStep2Props {
  form: UseFormReturn<ProcurationFormData>;
  loading: boolean;
}

export const FormStep2: React.FC<FormStep2Props> = ({ form, loading }) => {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = form;
  const watchDocumentType = watch("typeProcuration");

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">Détails de la procuration</h2>
      <div>
        <Label htmlFor="typeProcuration">Type de procuration</Label>
        <Controller
          name="typeProcuration"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le type du document" />
              </SelectTrigger>
              <SelectContent>
                {/* Add SelectItem components here */}
                <SelectItem value="Carte d'identité">
                  Carte d'identité
                </SelectItem>
                <SelectItem value="Passeport">Passeport</SelectItem>
                <SelectItem value="Acte de naissance">
                  Acte de naissance
                </SelectItem>
                <SelectItem value="Acte de mariage">Acte de mariage</SelectItem>
                <SelectItem value="Permis de conduire">
                  Permis de conduire
                </SelectItem>
                <SelectItem value="Document notarié">
                  Document notarié
                </SelectItem>

                {/* Types de procuration */}
                <SelectItem value="Procuration bancaire">
                  Procuration bancaire
                </SelectItem>
                <SelectItem value="Procuration administrative">
                  Procuration administrative
                </SelectItem>
                <SelectItem value="Procuration médicale">
                  Procuration médicale
                </SelectItem>
                <SelectItem value="Procuration immobilière">
                  Procuration immobilière
                </SelectItem>
                <SelectItem value="Procuration pour actes juridiques">
                  Procuration pour actes juridiques
                </SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.typeProcuration && (
          <p className="text-red-500 text-sm">
            {errors.typeProcuration.message}
          </p>
        )}
      </div>
      {watchDocumentType === "Autre" && (
        <div>
          <Label htmlFor="customDocumentType">
            Précisez le type de document
          </Label>
          <Input
            id="customDocumentType"
            {...register("customDocumentType")}
            disabled={loading}
          />
          {errors.customDocumentType && (
            <p className="text-red-500 text-sm">
              {errors.customDocumentType.message}
            </p>
          )}
        </div>
      )}
      {/* Add other fields from step 2 here */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dateDebut">Date de début (optionnel)</Label>
          <Input
            type="date"
            id="dateDebut"
            {...register("dateDebut")}
            disabled={loading}
          />
          {errors.dateDebut && (
            <p className="text-red-500 text-sm">{errors.dateDebut.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="dateFin">Date de fin (optionnel)</Label>
          <Input
            type="date"
            id="dateFin"
            {...register("dateFin")}
            disabled={loading}
          />
          {errors.dateFin && (
            <p className="text-red-500 text-sm">{errors.dateFin.message}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
