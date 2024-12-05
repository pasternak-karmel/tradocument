"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProcurationFormSchema } from "@/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";


export default function ProcurationPage() {
  const form = useForm<z.infer<typeof ProcurationFormSchema>>({
    resolver: zodResolver(ProcurationFormSchema),
  });

  function onSubmit(data: z.infer<typeof ProcurationFormSchema>) {
    console.log(data);
  }
  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Création de Procuration
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* formulaire */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            {/* nom mandant */}
            <FormField
              control={form.control}
              name="nomMandant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* prenom mandant */}
            <FormField
              control={form.control}
              name="prenomMandant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="votre prenom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* date de naissance mandant */}
            <FormField
              control={form.control}
              name="dateNaissanceMandant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de naissance</FormLabel>
                  <FormControl>
                    <Input placeholder="votre prenom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* lieu de naissance mandant */}
            <FormField
              control={form.control}
              name="lieuNaissanceMandant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lieu de naissance</FormLabel>
                  <FormControl>
                    <Input placeholder="votre prenom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* nationalite mandant */}
            <FormField
              control={form.control}
              name="nationaliteMandant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationalité</FormLabel>
                  <FormControl>
                    <Input placeholder="votre prenom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* adresse mandant */}
            <FormField
              control={form.control}
              name="adresseMandant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input placeholder="votre prenom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* date debut procuration */}
            <FormField
              control={form.control}
              name="dateDebut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de début</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="votre prenom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* date fin procuration */}
            <FormField
              control={form.control}
              name="dateFin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de fin</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="votre prenom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* piece d'identité mandant */}
            <div>Partie piece d'identité</div>
            {/* signature mandant */}
            <div>Partie signature</div>
            {/* type de procuration */}
            <FormField
              control={form.control}
              name="typeProcuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de procuration</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le type du document" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Acte de naissance">
                        Acte de naissance
                      </SelectItem>
                      <SelectItem value="Permis de conduire">
                        Permis de conduire
                      </SelectItem>
                      <SelectItem value="Acte de mariage">
                        Acte de mariage
                      </SelectItem>
                      <SelectItem value="Autorisation pour ken">
                        Autorisation pour ken
                      </SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>

        {/* apperçu */}
        {/* <Card className="p-6 shadow-lg bg-white">
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
                  {formData.dateNaissanceMandant || "___"} à{" "}
                  {formData.lieuNaissanceMandant || "___"}, donne par la
                  présente pouvoir à l'entité{" "}
                  <span className="font-semibold">Tradocument</span>,
                </p>
                <div className="w-full border-b border-black"></div>
                <p>
                  afin qu'elle puisse récupérer le document suivant en mon nom:
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
                <div className="mt-12">
                  <p>Pièce jointe: Copie de la pièce d'identité du mandant</p>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
