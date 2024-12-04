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
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
