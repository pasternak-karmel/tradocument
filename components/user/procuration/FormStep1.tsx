import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProcurationFormData } from "@/schemas";
import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";

interface FormStep1Props {
  form: UseFormReturn<ProcurationFormData>;
  loading: boolean;
}

export const FormStep1: React.FC<FormStep1Props> = ({ form, loading }) => {
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
      <h2 className="text-2xl font-bold mb-4">Informations personnelles</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nomMandant">Nom</Label>
          <Input
            id="nomMandant"
            {...register("nomMandant")}
            disabled={loading}
          />
          {errors.nomMandant && (
            <p className="text-red-500 text-sm">{errors.nomMandant.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="prenomMandant">Prénom</Label>
          <Input
            id="prenomMandant"
            {...register("prenomMandant")}
            disabled={loading}
          />
          {errors.prenomMandant && (
            <p className="text-red-500 text-sm">
              {errors.prenomMandant.message}
            </p>
          )}
        </div>
      </div>
      {/* Add other fields from step 1 here */}
      <div>
        <Label htmlFor="dateNaissanceMandant">Date de naissance</Label>
        <Input
          type="date"
          id="dateNaissanceMandant"
          {...register("dateNaissanceMandant")}
          disabled={loading}
        />
        {errors.dateNaissanceMandant && (
          <p className="text-red-500 text-sm">
            {errors.dateNaissanceMandant.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="lieuNaissanceMandant">Lieu de naissance</Label>
        <Input
          id="lieuNaissanceMandant"
          {...register("lieuNaissanceMandant")}
          disabled={loading}
        />
        {errors.lieuNaissanceMandant && (
          <p className="text-red-500 text-sm">
            {errors.lieuNaissanceMandant.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="lieuResidant">Lieu de résidence</Label>
        <Input
          id="lieuResidance"
          {...register("lieuResidant")}
          disabled={loading}
        />
        {errors.lieuResidant && (
          <p className="text-red-500 text-sm">{errors.lieuResidant.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="nationaliteMandant">Nationalité</Label>
        <Input
          id="nationaliteMandant"
          {...register("nationaliteMandant")}
          disabled={loading}
        />
        {errors.nationaliteMandant && (
          <p className="text-red-500 text-sm">
            {errors.nationaliteMandant.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="adresseMandant">Adresse</Label>
        <Input
          id="adresseMandant"
          {...register("adresseMandant")}
          disabled={loading}
        />
        {errors.adresseMandant && (
          <p className="text-red-500 text-sm">
            {errors.adresseMandant.message}
          </p>
        )}
      </div>
    </motion.div>
  );
};
