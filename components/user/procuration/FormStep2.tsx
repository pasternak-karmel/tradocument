import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { ProcurationFormData } from "@/schemas";
import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";

interface FormStep2Props {
  form: UseFormReturn<ProcurationFormData>;
  loading: boolean;
}

export const FormStep2: React.FC<FormStep2Props> = ({ form, loading }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const documents = watch("documents") || [];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">Objet de la procuration</h2>
      <div className="">
        <div>
          <Label htmlFor="documents">Documents</Label>
          <MultiSelector
            id="documents"
            onValuesChange={(value) => {
              setValue("documents", value, { shouldValidate: true });
            }}
            values={documents}
            loop
          >
            <MultiSelectorTrigger>
              <MultiSelectorInput placeholder="Sélectionnez les documents" />
            </MultiSelectorTrigger>
            <MultiSelectorContent>
              <MultiSelectorList>
                <MultiSelectorItem value={"Acte de naissance"}>
                  Acte de naissance
                </MultiSelectorItem>
                <MultiSelectorItem value={"Passeport"}>
                  Passeport
                </MultiSelectorItem>
                <MultiSelectorItem value={"Carte d'identité"}>
                  Carte d'identité
                </MultiSelectorItem>
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>
          {/* <Input
            id="documents"
            placeholder="Documents"
            {...register("documents")}
          /> */}
          {errors.documents && (
            <p className="text-red-500 text-sm">{errors.documents.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="institution">
            Institution ou Lieu de récupération
          </Label>
          <Input
            id="institution"
            {...register("institution")}
            disabled={loading}
          />
          {errors.institution && (
            <p className="text-red-500 text-sm">{errors.institution.message}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
