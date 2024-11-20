"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProcurationFormData } from "@/types";
import { format } from "date-fns";
import { motion } from "framer-motion";
import React, { useState } from "react";

export default function ProcurationComplete() {
  const today = format(new Date(), "dd/MM/yyyy");
  const [formData, setFormData] = useState<ProcurationFormData>({
    typeProcuration: "",
    nomMandant: "",
    prenomMandant: "",
    dateNaissanceMandant: "",
    lieuNaissanceMandant: "",
    nationaliteMandant: "",
    adresseMandant: "",
    dateDebut: "",
    dateFin: "",
    lieuSignature: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Création de Procuration
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 shadow-lg">
          <CardHeader>
            <CardTitle>Formulaire de Procuration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-lg font-semibold">Informations du Mandant</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nomMandant">Nom</Label>
                  <Input
                    id="nomMandant"
                    name="nomMandant"
                    value={formData.nomMandant}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="prenomMandant">Prénom</Label>
                  <Input
                    id="prenomMandant"
                    name="prenomMandant"
                    value={formData.prenomMandant}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="lieuNaissanceMandant">Lieu de naissance</Label>
                <Input
                  id="lieuNaissanceMandant"
                  name="lieuNaissanceMandant"
                  value={formData.lieuNaissanceMandant}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nationaliteMandant">Nationalité</Label>
                <Input
                  id="nationaliteMandant"
                  name="nationaliteMandant"
                  value={formData.nationaliteMandant}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="adresseMandant">Adresse</Label>
                <Input
                  id="adresseMandant"
                  name="adresseMandant"
                  value={formData.adresseMandant}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="typeProcuration">Document à récuperer</Label>
                <Select onValueChange={handleSelectChange("typeProcuration")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type du document" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acte">Acte de naissance</SelectItem>
                    <SelectItem value="speciale">Permis de conduire</SelectItem>
                    <SelectItem value="bancaire">Acte de mariage</SelectItem>
                    <SelectItem value="vehicule">
                      Autorisation pour ken
                    </SelectItem>
                    <SelectItem value="administrative">autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateDebut">Date de début(optionnel)</Label>
                  <Input
                    type="date"
                    id="dateDebut"
                    name="dateDebut"
                    value={formData.dateDebut}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dateFin">Date de fin (optionnel)</Label>
                  <Input
                    type="date"
                    id="dateFin"
                    name="dateFin"
                    value={formData.dateFin}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Télécharger et envoyer
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="p-6 shadow-lg bg-white">
          <CardHeader>
            <CardTitle>Aperçu</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 text-gray-700 bg-white p-8 rounded-lg min-h-[29.7cm] w-full max-w-[21cm] mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="font-bold">Objet : Procuration</h2>
              </div>

              <div className="space-y-6 text-justify">
                <p>
                  Je, soussigné(e) {formData.prenomMandant || "___"}{" "}
                  {formData.nomMandant || "___"}, né(e) le{" "}
                  {formData.dateNaissanceMandant?.toLocaleString() ||
                    "Date de naissance"}{" "}
                  à {formData.lieuNaissanceMandant || "___"}, donne par la
                  présente pouvoir à l'entité suivante :{" "}
                  <span className="font-semibold">Tradocument</span>,
                </p>

                <div className="w-full border-b border-black"></div>

                <p>
                  afin qu'elle puisse récuperer le document suivant en mon nom:
                </p>

                <li>{formData.typeProcuration || "___"}</li>

                <div className="w-full border-b border-black"></div>

                <p>
                  Cette procuration est confiée à{" "}
                  <span className="font-semibold">Tradocument</span> pour une
                  durée
                  {formData.dateFin
                    ? ` du ${formData.dateDebut} au ${formData.dateFin}`
                    : " indéterminée"}
                  . Je me réserve la possibilité d'y mettre fin à tout moment.
                </p>

                <div className="w-full border-b border-black my-4"></div>

                <p>
                  Je conserve la responsabilité de toutes les actions effectuées
                  par le mandataire en vertu de la présente procuration.
                </p>

                <div className="mt-12">
                  <p>Fait le {today}, en 2 (deux) exemplaires originaux,</p>
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
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
