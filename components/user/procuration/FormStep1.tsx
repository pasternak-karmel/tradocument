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
      <h2 className="text-2xl font-bold mb-4">Informations du mandant</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nom">Nom</Label>
          <Input id="nom" {...register("nom")} disabled={loading} />
          {errors.nom && (
            <p className="text-red-500 text-sm">{errors.nom.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="prenom">Prénom</Label>
          <Input id="prenom" {...register("prenom")} disabled={loading} />
          {errors.prenom && (
            <p className="text-red-500 text-sm">{errors.prenom.message}</p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="dateNaissance">Date de naissance</Label>
        <Input
          type="date"
          id="dateNaissance"
          {...register("dateNaissance")}
          disabled={loading}
        />
        {errors.dateNaissance && (
          <p className="text-red-500 text-sm">{errors.dateNaissance.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="lieuNaissance">Lieu de naissance</Label>
        <Input
          id="lieuNaissance"
          {...register("lieuNaissance")}
          disabled={loading}
        />
        {errors.lieuNaissance && (
          <p className="text-red-500 text-sm">{errors.lieuNaissance.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="nationalite">Nationalité</Label>
        <Input
          id="nationalite"
          {...register("nationalite")}
          disabled={loading}
        />
        {errors.nationalite && (
          <p className="text-red-500 text-sm">{errors.nationalite.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="adresse">Adresse</Label>
        <Input id="adresse" {...register("adresse")} disabled={loading} />
        {errors.adresse && (
          <p className="text-red-500 text-sm">{errors.adresse.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="numeroIdentite">
          Numéro d'identité ou de passeport
        </Label>
        <Input
          id="numeroIdentite"
          {...register("numeroIdentite")}
          disabled={loading}
        />
        {errors.numeroIdentite && (
          <p className="text-red-500 text-sm">
            {errors.numeroIdentite.message}
          </p>
        )}
      </div>
    </motion.div>
  );
};

