"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Component() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl m-6">
      <Card className="bg-background">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Politique de Confidentialité et de Protection des Données
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="intro">
              <AccordionTrigger>Introduction</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Bienvenue sur « tradocument.com ». Nous sommes conscients de l&apos;importance 
                  de la protection de votre vie privée et nous nous engageons à protéger les 
                  informations personnelles que vous partagez avec nous. Cette politique de 
                  confidentialité explique quelles informations sont collectées, comment elles 
                  sont utilisées et protégées, ainsi que vos droits concernant vos données personnelles.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  En utilisant « tradocument.com », vous acceptez les pratiques 
                  décrites dans cette politique de confidentialité. Si vous avez des questions ou 
                  des préoccupations, n&apos;hésitez pas à nous contacter.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="responsable">
              <AccordionTrigger>1. Responsable du Traitement des Données</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  « Tradocument.com » est responsable de la collecte et du traitement de vos données personnelles dans le cadre des services que nous proposons. Vous pouvez nous contacter pour toute question relative à cette politique de confidentialité via l&apos;adresse : contact@tradocument.com.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="donnees-collectees">
              <AccordionTrigger>2. Données Collectées</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Nous collectons et traitons différentes catégories de données pour assurer le bon fonctionnement de nos services et améliorer l&apos;expérience utilisateur sur notre site.
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  Les types de données que nous collectons incluent :
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground pl-4">
                  <li><span className="font-medium">- Traduction de documents :</span> en différentes langues, en fonction des besoins de l&apos;utilisateur.</li>
                  <li><span className="font-medium">- Demande de devis :</span> possibilité de soumettre une demande de devis détaillée.</li>
                  <li><span className="font-medium">- Informations d&apos;identité :</span> nom, prénom, adresse e-mail, et numéro de téléphone.</li>
                  <li><span className="font-medium">- Informations de paiement :</span> détails de carte de crédit ou compte PayPal pour le traitement des transactions.</li>
                  <li><span className="font-medium">- Informations sur les projets :</span> documents et informations nécessaires à la traduction, que vous nous confiez pour traitement.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="utilisation-donnees">
              <AccordionTrigger>3. Utilisation des Données</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Les données personnelles que nous collectons sont utilisées pour fournir nos services, traiter les demandes de devis, et pour améliorer l&apos;expérience utilisateur sur le site. Nous ne partageons pas vos données sans votre consentement, sauf dans les cas prévus par la loi.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="droit-utilisateur">
              <AccordionTrigger>4. Droits des Utilisateurs</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Conformément aux lois en vigueur, vous disposez de droits d&apos;accès, de rectification, de suppression, et d&apos;opposition concernant vos données personnelles. Vous pouvez exercer ces droits en nous contactant à l&apos;adresse indiquée ci-dessus.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="securite">
              <AccordionTrigger>5. Sécurité des Données</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Nous mettons en place des mesures de sécurité pour protéger vos données personnelles contre les accès non autorisés, la divulgation, ou la destruction.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="modifications">
              <AccordionTrigger>6. Modifications de la Politique de Confidentialité</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Cette politique de confidentialité peut être mise à jour périodiquement. Nous vous informerons de toute modification en publiant la nouvelle version sur notre site.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact">
              <AccordionTrigger>7. Contact</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Pour toute question relative à notre politique de confidentialité, vous pouvez nous contacter à l&apos;adresse suivante : contact@tradocument.com.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
