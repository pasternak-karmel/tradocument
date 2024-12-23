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
                <MultiSelectorItem value={"Acte de mariage"}>
                  Acte de mariage
                </MultiSelectorItem>
                <MultiSelectorItem value={"Acte de décès"}>
                  Acte de décès
                </MultiSelectorItem>
                <MultiSelectorItem value={"Acte de Naturalisation/Nationalité"}>
                  Acte de Naturalisation/Nationalité
                </MultiSelectorItem>
                <MultiSelectorItem value={"Acte de reconnaissance"}>
                  Acte de reconnaissance
                </MultiSelectorItem>
                <MultiSelectorItem value={"Carte d'identité"}>
                  Carte d'identité
                </MultiSelectorItem>
                <MultiSelectorItem value={"Certificat de célibat"}>
                  Certificat de célibat
                </MultiSelectorItem>
                <MultiSelectorItem value={"Certificat de changement de nom"}>
                  Certificat de changement de nom
                </MultiSelectorItem>
                <MultiSelectorItem value={"Déclaration sur l'honneur"}>
                  Déclaration sur l'honneur
                </MultiSelectorItem>
                <MultiSelectorItem value={"Livret de famille"}>
                  Livret de famille
                </MultiSelectorItem>
                <MultiSelectorItem value={"Passeport"}>
                  Passeport
                </MultiSelectorItem>
                <MultiSelectorItem value={"Permis de séjour"}>
                  Permis de séjour
                </MultiSelectorItem>
                <MultiSelectorItem value={"Procuration"}>
                  Procuration
                </MultiSelectorItem>
                <MultiSelectorItem value={"Bilan"}>Bilan</MultiSelectorItem>
                <MultiSelectorItem value={"Contrat"}>Contrat</MultiSelectorItem>
                <MultiSelectorItem value={"Convention"}>
                  Convention
                </MultiSelectorItem>
                <MultiSelectorItem value={"Acte de divorce"}>
                  Acte de divorce
                </MultiSelectorItem>
                <MultiSelectorItem value={"Acte notarié"}>
                  Acte notarié
                </MultiSelectorItem>
                <MultiSelectorItem value={"Assignations et Jugements"}>
                  Assignations et Jugements
                </MultiSelectorItem>
                <MultiSelectorItem value={"Casier Judiciaire"}>
                  Casier Judiciaire
                </MultiSelectorItem>
                <MultiSelectorItem value={"Exequatur"}>
                  Exequatur
                </MultiSelectorItem>
                <MultiSelectorItem value={"Procuration Juridique"}>
                  Procuration Juridique
                </MultiSelectorItem>
                <MultiSelectorItem value={"Testament"}>
                  Testament
                </MultiSelectorItem>
                <MultiSelectorItem value={"Attestation de scolarité"}>
                  Attestation de scolarité
                </MultiSelectorItem>
                <MultiSelectorItem value={"Attestation de stage"}>
                  Attestation de stage
                </MultiSelectorItem>
                <MultiSelectorItem value={"Attestation d'études"}>
                  Attestation d'études
                </MultiSelectorItem>
                <MultiSelectorItem
                  value={"Diplôme (Licence, Ingénieurat, Master, Doctorat...)"}
                >
                  Diplôme (Licence, Ingénieurat, Master, Doctorat...)
                </MultiSelectorItem>
                <MultiSelectorItem
                  value={
                    "Relevé de notes Bac/Relevé de notes universitaires avec appréciations"
                  }
                >
                  Relevé de notes Bac/Relevé de notes universitaires avec
                  appréciations
                </MultiSelectorItem>
                <MultiSelectorItem value={"Avis d'imposition"}>
                  Avis d'imposition
                </MultiSelectorItem>
                <MultiSelectorItem value={"Bulletin de salaire"}>
                  Bulletin de salaire
                </MultiSelectorItem>
                <MultiSelectorItem value={"Relevé de compte"}>
                  Relevé de compte
                </MultiSelectorItem>
                <MultiSelectorItem value={"Appels d'offre"}>
                  Appels d'offre
                </MultiSelectorItem>
                <MultiSelectorItem value={"Brevets"}>Brevets</MultiSelectorItem>
                <MultiSelectorItem value={"Brochures"}>
                  Brochures
                </MultiSelectorItem>
                <MultiSelectorItem value={"Cahier des charges"}>
                  Cahier des charges
                </MultiSelectorItem>
                <MultiSelectorItem value={"Catalogues Produits"}>
                  Catalogues Produits
                </MultiSelectorItem>
                <MultiSelectorItem value={"Journaux d'entreprise"}>
                  Journaux d'entreprise
                </MultiSelectorItem>
                <MultiSelectorItem value={"Manuels et notices techniques"}>
                  Manuels et notices techniques
                </MultiSelectorItem>
                <MultiSelectorItem value={"Newsletters spécialisées"}>
                  Newsletters spécialisées
                </MultiSelectorItem>
                <MultiSelectorItem value={"Normes"}>Normes</MultiSelectorItem>
                <MultiSelectorItem value={"Rapport d'expertise"}>
                  Rapport d'expertise
                </MultiSelectorItem>
                <MultiSelectorItem value={"Rapport technique"}>
                  Rapport technique
                </MultiSelectorItem>
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>
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
