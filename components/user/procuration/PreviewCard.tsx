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
  const today = format(new Date(), "dd/MM/yyyy", { locale: fr });

  return (
    <Card className="p-6 shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Aperçu</span>
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
              className="space-y-6 text-gray-700 bg-white p-8 rounded-lg overflow-hidden"
            >
              {/* Add preview content here */}
              <div className="text-center mb-8">
                <h2 className="font-bold">Objet : Procuration</h2>
              </div>
              <div className="space-y-6 text-justify">
                <p>
                  Je, soussigné(e) {formData.prenomMandant || "___"}{" "}
                  {formData.nomMandant || "___"}, né(e) le{" "}
                  {formData.dateNaissanceMandant
                    ? format(
                        new Date(formData.dateNaissanceMandant),
                        "dd/MM/yyyy",
                        { locale: fr }
                      )
                    : "___"}{" "}
                  à {formData.lieuNaissanceMandant || "___"}, donne par la
                  présente pouvoir à l'entité{" "}
                  <span className="font-semibold">Tradocument</span>,
                </p>
                <p>
                  afin qu'elle puisse récupérer le document suivant en mon nom:
                </p>
                <li>{formData.typeProcuration === "Autre" ? formData.customDocumentType || "___" : formData.typeProcuration || "___"}</li>
                <p>
                  Cette procuration est confiée à{" "}
                  <span className="font-semibold">Tradocument</span> pour une
                  durée
                  {formData.dateDebut && formData.dateFin
                    ? ` du ${format(
                        new Date(formData.dateDebut),
                        "dd/MM/yyyy",
                        { locale: fr }
                      )} au ${format(new Date(formData.dateFin), "dd/MM/yyyy", {
                        locale: fr,
                      })}`
                    : " indéterminée"}
                  . Je me réserve la possibilité d'y mettre fin à tout moment.
                </p>
                <p>
                  Je conserve la responsabilité de toutes les actions effectuées
                  par le mandataire en vertu de la présente procuration.
                </p>
                <div className="mt-12">
                  <p>
                    Fait le {today}, à {formData.lieuSignature || "___"} en 2 exemplaires originaux
                  </p>
                </div>
                <div className="space-y-8 mt-16">
                  <div>
                    <p className="text-center font-bold mb-16">
                      SIGNATURE DU MANDANT
                    </p>
                    <div className="w-full text-center">
                      <div className="border-b border-black w-48 mx-auto"></div>
                      <div className="border-b border-black w-48 mx-auto mt-2"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-center font-bold mb-16">
                      SIGNATURE DU MANDATAIRE
                    </p>
                    <div className="w-full text-center">
                      <div className="border-b border-black w-48 mx-auto"></div>
                      <div className="border-b border-black w-48 mx-auto mt-2"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <p>Pièce jointe: Copie de la pièce d'identité du mandant</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
