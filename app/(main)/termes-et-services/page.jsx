"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function Component() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl m-6">
      <Card className="bg-background">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Conditions Générales d&apos;Utilisation (CGU)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-sm">
            Conditions Générales d&apos;Utilisation (CGU) de www.Tradocument.com
          </div>

          <p className="text-sm text-muted-foreground">
            Bienvenue sur www.Tradocument.com. En accédant ou en utilisant 
            notre site internet, vous acceptez sans réserve les présentes 
            Conditions Générales d&apos;Utilisation (CGU). Merci de les lire attentivement.
          </p>

          <Accordion type="single" collapsible>
            <AccordionItem value="1">
              <AccordionTrigger className="text-lg font-semibold mb-2">1. Objet des CGU</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Les présentes CGU ont pour objet de définir les modalités 
                d&apos;accès et d&apos;utilisation des services proposés par 
                www.Tradocument.com. Tradocument.com propose des services de 
                traduction de documents, de mise en relation avec des 
                professionnels de la traduction, et de demande de devis en ligne.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="2">
              <AccordionTrigger className="text-lg font-semibold mb-2">2. Accès au site et aux services</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground mb-2">
                www.Tradocument.com est accessible aux utilisateurs 
                disposant d&apos;un accès internet. Les utilisateurs peuvent 
                naviguer librement sur le site, demander un devis, et accéder 
                aux services de traduction en fonction des formules proposées. 
                Certains services peuvent nécessiter la création d&apos;un compte
                utilisateur.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="3">
              <AccordionTrigger className="text-lg font-semibold mb-2">3. Création de compte utilisateur</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                L&apos;accès à certaines fonctionnalités de  www.Tradocument.com peut nécessiter 
                la création d&apos;un compte utilisateur. L&apos;utilisateur s&apos;engage à fournir des 
                informations exactes et à les maintenir à jour. Il est responsable de la 
                confidentialité de son identifiant et de son mot de passe, et de toute 
                activité réalisée sous son compte.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="4">
              <AccordionTrigger className="text-lg font-semibold mb-2">4. Services proposés</AccordionTrigger>
              <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  www.Tradocument.com propose divers services de traduction de documents, comprenant :
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground pl-4">
                  <li>
                    <span className="font-medium">- Traduction de documents : </span> en différentes langues, en fonction des besoins de l&apos;utilisateur. 
                  </li>
                  <li>
                    <span className="font-medium">- Demande de devis: </span> possibilité de 
                    soumettre une demande de devis détaillée.
                  </li>
                  <li>
                    <span className="font-medium">- Recrutement de traducteurs: </span> possibilité 
                    de rejoindre notre équipe de traducteurs professionnels.
                  </li>
                  <li>
                    <span className="font-medium">- Modes de livraison : </span> les services de livraison 
                    incluent le coursier privé, le taxi/bus, et DHL, selon les préférences de l&apos;utilisateur.
                  </li>
                  <li>
                    <span className="font-medium">- Paiement en ligne: </span> les paiements peuvent 
                    être effectués par carte bancaire ou via PayPal.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="5">
              <AccordionTrigger className="text-lg font-semibold mb-2">5. Tarification et Paiement</AccordionTrigger>
              <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Les tarifs des services sont indiqués sur le site et sont soumis à la 
                  législation en vigueur. Les paiements en ligne sont sécurisés et réalisés 
                  par carte bancaire ou via PayPal. L&apos;utilisateur accepte de payer les frais 
                  des services commandés selon les tarifs affichés.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="6">
              <AccordionTrigger className="text-lg font-semibold mb-2">6. Politique de confidentialité</AccordionTrigger>
              <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Nous nous engageons à protéger la confidentialité des informations 
                  personnelles de nos utilisateurs, conformément à notre Politique de 
                  Confidentialité, consultable [lien vers la politique de confidentialité]. 
                  Les données collectées sont utilisées dans le cadre de la fourniture de nos 
                  services et ne sont pas partagées avec des tiers sans le consentement 
                  de l&apos;utilisateur.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="7">
              <AccordionTrigger className="text-lg font-semibold mb-2">7. Responsabilités de l&apos;utilisateur</AccordionTrigger>
              <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  L&apos;utilisateur s&apos;engage à utiliser www.Tradocument.com 
                  conformément aux présentes CGU et à ne pas :
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground pl-4">
                  <li>- Utiliser des robots ou autres systèmes automatisés pour accéder au site.</li>
                  <li>- Publier, transmettre ou partager tout contenu illégal ou en violation de droits tiers.</li>
                  <li>- Endommager, perturber ou altérer les fonctionnalités du site.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="8">
              <AccordionTrigger className="text-lg font-semibold mb-2">8. Limitation de responsabilité</AccordionTrigger>
              <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  www.Tradocument.com fait tout son possible pour fournir 
                  un service de qualité. Cependant, nous ne pouvons garantir 
                  l&apos;absence d&apos;erreurs ou d&apos;interruptions de service. www.Tradocument.com 
                  ne pourra être tenu responsable en cas de :
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground pl-4">
                  <li>- Dysfonctionnement du site.</li>
                  <li>- Dommages résultant de l&apos;utilisation du site par l&apos;utilisateur.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="9">
              <AccordionTrigger className="text-lg font-semibold mb-2">9. Sécurité et Protection des Données</AccordionTrigger>
              <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Tradocument.com met en place des mesures de sécurité pour protéger 
                  les données des utilisateurs, incluant l&apos;utilisation de « captchas » 
                  pour prévenir les activités des robots et des scripts automatisés. En utilisant 
                  le site, l&apos;utilisateur accepte ces mesures de sécurité.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="10">
              <AccordionTrigger className="text-lg font-semibold mb-2">10. Modification des CGU</AccordionTrigger>
              <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Tradocument.com se réserve le droit de modifier les présentes
                  CGU à tout moment. Les nouvelles conditions entreront en vigueur
                  dès leur publication sur le site. Il est recommandé aux utilisateurs
                  de consulter régulièrement les CGU pour être informés des éventuels changements.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="11">
              <AccordionTrigger className="text-lg font-semibold mb-2">11. Droit applicable et juridiction compétente</AccordionTrigger>
              <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Les présentes CGU sont soumises au droit Français et toute
                  contestation relative à leur interprétation ou exécution relève 
                  des juridictions compétentes du ressort de Paris, France.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
