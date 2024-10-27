"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

type FormData = {
  typeProcuration: string
  nomMandant: string
  prenomMandant: string
  dateNaissanceMandant: Date | undefined
  lieuNaissanceMandant: string
  nationaliteMandant: string
  adresseMandant: string
  telephoneMandant: string
  emailMandant: string
  nomMandataire: string
  prenomMandataire: string
  dateNaissanceMandataire: Date | undefined
  lieuNaissanceMandataire: string
  nationaliteMandataire: string
  adresseMandataire: string
  telephoneMandataire: string
  emailMandataire: string
  pouvoirsGeneraux: boolean
  pouvoirsSpecifiques: string
  dateDebut: Date | undefined
  dateFin: Date | undefined
  lieuSignature: string
  dateSignature: Date | undefined
  pieceIdentiteMandant: File | null
  pieceIdentiteMandataire: File | null
}

export default function ProcurationComplete() {
  const [formData, setFormData] = useState<FormData>({
    typeProcuration: '',
    nomMandant: '',
    prenomMandant: '',
    dateNaissanceMandant: undefined,
    lieuNaissanceMandant: '',
    nationaliteMandant: '',
    adresseMandant: '',
    telephoneMandant: '',
    emailMandant: '',
    nomMandataire: '',
    prenomMandataire: '',
    dateNaissanceMandataire: undefined,
    lieuNaissanceMandataire: '',
    nationaliteMandataire: '',
    adresseMandataire: '',
    telephoneMandataire: '',
    emailMandataire: '',
    pouvoirsGeneraux: false,
    pouvoirsSpecifiques: '',
    dateDebut: undefined,
    dateFin: undefined,
    lieuSignature: '',
    dateSignature: undefined,
    pieceIdentiteMandant: null,
    pieceIdentiteMandataire: null
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (name: string) => (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, [name]: date }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, pouvoirsGeneraux: checked }))
  }

  const handleFileChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, [name]: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would handle the form submission, e.g., generate PDF
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Création de Procuration</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 shadow-lg">
          <CardHeader>
            <CardTitle>Formulaire de Procuration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="typeProcuration">Type de Procuration</Label>
                <Select onValueChange={handleSelectChange('typeProcuration')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type de procuration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="generale">Procuration Générale</SelectItem>
                    <SelectItem value="speciale">Procuration Spéciale</SelectItem>
                    <SelectItem value="bancaire">Procuration Bancaire</SelectItem>
                    <SelectItem value="vehicule">Procuration Véhicule</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
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
                  <Label htmlFor="dateNaissanceMandant">Date de naissance</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dateNaissanceMandant ? format(formData.dateNaissanceMandant, 'P', { locale: fr }) : <span>Choisir une date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.dateNaissanceMandant}
                        onSelect={handleDateChange('dateNaissanceMandant')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                  <Textarea
                    id="adresseMandant"
                    name="adresseMandant"
                    value={formData.adresseMandant}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="telephoneMandant">Téléphone</Label>
                  <Input
                    id="telephoneMandant"
                    name="telephoneMandant"
                    value={formData.telephoneMandant}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emailMandant">Email</Label>
                  <Input
                    id="emailMandant"
                    name="emailMandant"
                    type="email"
                    value={formData.emailMandant}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pieceIdentiteMandant">Pièce d'identité du Mandant</Label>
                  <div className="mt-1 flex items-center">
                    <label htmlFor="pieceIdentiteMandant" className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <Upload className="h-5 w-5 inline-block mr-2" />
                      Choisir un fichier
                    </label>
                    <input
                      id="pieceIdentiteMandant"
                      name="pieceIdentiteMandant"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange('pieceIdentiteMandant')}
                      accept="image/*,.pdf"
                      required
                    />
                    {formData.pieceIdentiteMandant && (
                      <span className="ml-3 text-sm text-gray-600">
                        {formData.pieceIdentiteMandant.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informations du Mandataire</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nomMandataire">Nom</Label>
                    <Input
                      id="nomMandataire"
                      name="nomMandataire"
                      value={formData.nomMandataire}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="prenomMandataire">Prénom</Label>
                    <Input
                      id="prenomMandataire"
                      name="prenomMandataire"
                      value={formData.prenomMandataire}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="dateNaissanceMandataire">Date de naissance</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dateNaissanceMandataire ? format(formData.dateNaissanceMandataire, 'P', { locale: fr }) : <span>Choisir une date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.dateNaissanceMandataire}
                        onSelect={handleDateChange('dateNaissanceMandataire')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="lieuNaissanceMandataire">Lieu de naissance</Label>
                  <Input
                    id="lieuNaissanceMandataire"
                    name="lieuNaissanceMandataire"
                    value={formData.lieuNaissanceMandataire}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="nationaliteMandataire">Nationalité</Label>
                  <Input
                    id="nationaliteMandataire"
                    name="nationaliteMandataire"
                    value={formData.nationaliteMandataire}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="adresseMandataire">Adresse</Label>
                  <Textarea
                    id="adresseMandataire"
                    name="adresseMandataire"
                    value={formData.adresseMandataire}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="telephoneMandataire">Téléphone</Label>
                  <Input
                    id="telephoneMandataire"
                    name="telephoneMandataire"
                    value={formData.telephoneMandataire}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emailMandataire">Email</Label>
                  <Input
                    id="emailMandataire"
                    name="emailMandataire"
                    type="email"
                    value={formData.emailMandataire}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pieceIdentiteMandataire">Pièce d'identité du Mandataire</Label>
                  <div className="mt-1 flex items-center">
                    <label htmlFor="pieceIdentiteMandataire" className="cursor-pointer bg-white py-2 px-4  border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <Upload className="h-5 w-5 inline-block mr-2" />
                      Choisir un fichier
                    </label>
                    <input
                      id="pieceIdentiteMandataire"
                      name="pieceIdentiteMandataire"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange('pieceIdentiteMandataire')}
                      accept="image/*,.pdf"
                      required
                    />
                    {formData.pieceIdentiteMandataire && (
                      <span className="ml-3 text-sm text-gray-600">
                        {formData.pieceIdentiteMandataire.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pouvoirs</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pouvoirsGeneraux"
                    checked={formData.pouvoirsGeneraux}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="pouvoirsGeneraux"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Pouvoirs généraux
                  </label>
                </div>
                <div>
                  <Label htmlFor="pouvoirsSpecifiques">Pouvoirs spécifiques</Label>
                  <Textarea
                    id="pouvoirsSpecifiques"
                    name="pouvoirsSpecifiques"
                    value={formData.pouvoirsSpecifiques}
                    onChange={handleInputChange}
                    placeholder="Détaillez les pouvoirs spécifiques conférés au mandataire"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Durée de la procuration</h3>
                <div>
                  <Label htmlFor="dateDebut">Date de début</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dateDebut ? format(formData.dateDebut, 'P', { locale: fr }) : <span>Choisir une date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.dateDebut}
                        onSelect={handleDateChange('dateDebut')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="dateFin">Date de fin (optionnelle)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dateFin ? format(formData.dateFin, 'P', { locale: fr }) : <span>Choisir une date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.dateFin}
                        onSelect={handleDateChange('dateFin')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Signature</h3>
                <div>
                  <Label htmlFor="lieuSignature">Lieu de signature</Label>
                  <Input
                    id="lieuSignature"
                    name="lieuSignature"
                    value={formData.lieuSignature}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dateSignature">Date de signature</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dateSignature ? format(formData.dateSignature, 'P', { locale: fr }) : <span>Choisir une date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.dateSignature}
                        onSelect={handleDateChange('dateSignature')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Button type="submit" className="w-full">Générer la Procuration</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="p-6 shadow-lg bg-white">
          <CardHeader>
            <CardTitle>Aperçu de la Procuration</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 text-gray-700 bg-gray-100 p-8 rounded-lg shadow-inner"
            >
              <div className="text-center border-b pb-4">
                <h2 className="text-2xl font-bold">PROCURATION</h2>
                <p className="text-sm text-gray-500">{formData.typeProcuration || "Type de procuration non spécifié"}</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Je soussigné(e),</h3>
                <p><strong>Mandant :</strong> {formData.prenomMandant} {formData.nomMandant}</p>
                <p><strong>Né(e) le :</strong> {formData.dateNaissanceMandant ? format(formData.dateNaissanceMandant, 'P', { locale: fr }) : "Non spécifié"}</p>
                <p><strong>À :</strong> {formData.lieuNaissanceMandant}</p>
                <p><strong>Nationalité :</strong> {formData.nationaliteMandant}</p>
                <p><strong>Demeurant à :</strong> {formData.adresseMandant}</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Donne par la présente pouvoir à :</h3>
                <p><strong>Mandataire :</strong> {formData.prenomMandataire} {formData.nomMandataire}</p>
                <p><strong>Né(e) le :</strong> {formData.dateNaissanceMandataire ? format(formData.dateNaissanceMandataire, 'P', { locale: fr }) : "Non spécifié"}</p>
                <p><strong>À :</strong> {formData.lieuNaissanceMandataire}</p>
                <p><strong>Nationalité :</strong> {formData.nationaliteMandataire}</p>
                <p><strong>Demeurant à :</strong> {formData.adresseMandataire}</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">De, pour moi et en mon nom :</h3>
                {formData.pouvoirsGeneraux && (
                  <p>Exercer tous les pouvoirs généraux nécessaires pour gérer mes affaires.</p>
                )}
                {formData.pouvoirsSpecifiques && (
                  <p><strong>Pouvoirs spécifiques :</strong> {formData.pouvoirsSpecifiques}</p>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Durée de la procuration :</h3>
                <p><strong>Du :</strong> {formData.dateDebut ? format(formData.dateDebut, 'P', { locale: fr }) : "Non spécifié"}</p>
                <p><strong>Au :</strong> {formData.dateFin ? format(formData.dateFin, 'P', { locale: fr }) : "Non spécifié (durée indéterminée)"}</p>
              </div>

              <div className="pt-6 border-t">
                <p><strong>Fait à :</strong> {formData.lieuSignature}</p>
                <p><strong>Le :</strong> {formData.dateSignature ? format(formData.dateSignature, 'P', { locale: fr }) : "Non spécifié"}</p>
              </div>

              <div className="mt-8 space-y-4">
                <div>
                  <p className="font-semibold">Signature du Mandant :</p>
                  <div className="w-40 h-20 border-b border-gray-400 mt-2"></div>
                </div>
                <div>
                  <p className="font-semibold">Signature du Mandataire :</p>
                  <div className="w-40 h-20 border-b border-gray-400 mt-2"></div>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}