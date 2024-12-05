import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProcurationFormData } from "@/schemas";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface PreviewCardProps {
  formData: ProcurationFormData;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({ formData }) => {
  const [preview, setPreview] = useState(false);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return format(new Date(dateString), "dd MMMM yyyy", { locale: fr });
  };

  return (
    <Card className="p-6 shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Aperçu de la procuration</span>
          <Button
            type="button"
            onClick={() => setPreview(!preview)}
            variant="outline"
            size="sm"
          >
            {preview ? "Masquer" : "Afficher"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          {preview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 text-gray-700 bg-white p-4 rounded-lg overflow-hidden text-sm"
            >
              <div className="space-y-2">
                <p className="font-semibold text-lg">Je soussigné(e)</p>
                <p>
                  <span className="font-medium">Nom et prénom:</span>{" "}
                  {formData.nom} {formData.prenom}
                </p>
                <p>
                  <span className="font-medium">Né(e) le :</span>{" "}
                  {formatDate(formData.dateNaissance)}
                </p>
                <p>
                  <span className="font-medium">À :</span>{" "}
                  {formData.lieuNaissance}
                </p>
                <p>
                  <span className="font-medium">Nationalité:</span>{" "}
                  {formData.nationalite}
                </p>
                <p>
                  <span className="font-medium">Domicilié(e) à :</span>{" "}
                  {formData.adresse}
                </p>
                <p>
                  <span className="font-medium">
                    Numéro d'identité ou de passeport:
                  </span>{" "}
                  {formData.numeroIdentite}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-lg">
                  Objet de la procuration
                </h3>
                <p>Par la présente, j'autorise [Nom du mandataire] à effectuer en mon nom toutes les démarches nécessaires au retrait de documents officiels {formData.documents?.join(", ") || "___"} auprès de {formData.institution || "___"} dans le respect des lois et règlements en vigueur dans le pays concerné.</p>
                <p>
                  Cette procuration est valable jusqu'au {formData.dateLimite ? formatDate(formData.dateLimite) : "___"} ou jusqu'à l'accomplissement de la mission décrite ci-dessus.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Signature</h3>
                <p>
                  <span className="font-medium">Fait à:</span>{" "}
                  {formData.lieuSignature}
                </p>
                <p>
                  <span className="font-medium">Le:</span>{" "}
                  {formatDate(formData.dateSignature)}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

