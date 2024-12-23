"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Component() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl m-6">
      <Card className="bg-background">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Politique de Gestion des Cookies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="intro">
              <AccordionTrigger>Introduction</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Cette Politique de Gestion des Cookies s&apos;applique au site tradconnect.com et explique comment 
                  nous utilisons les cookies et autres technologies similaires. En utilisant notre site, vous consentez à 
                  l&apos;utilisation des cookies comme décrit dans cette politique. Nous vous recommandons de lire 
                  attentivement cette politique pour comprendre comment nous gérons vos informations.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="definition">
              <AccordionTrigger>1. Qu&apos;est-ce qu&apos;un Cookie ?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Les cookies sont de petits fichiers texte que les sites web placent sur votre appareil (ordinateur, 
                  tablette, smartphone) lorsque vous les visitez. Ils permettent de stocker des informations concernant 
                  votre navigation et vos préférences pour améliorer votre expérience utilisateur.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="types">
              <AccordionTrigger>2. Types de Cookies Utilisés</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Nous utilisons plusieurs types de cookies pour différentes finalités :
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground pl-4">
                  <li><span className="font-medium">- Cookies Essentiels:</span> Ces cookies sont nécessaires pour le bon fonctionnement de 
                  « tradconnect.com » et vous permettent d&apos;accéder aux fonctionnalités de base, comme la connexion 
                  sécurisée aux espaces de devis et de gestion de projets.</li>
                  <li><span className="font-medium">- Cookies de Performance:</span> Ces cookies collectent des informations sur la manière dont vous 
                  utilisez notre site, comme les pages que vous visitez le plus souvent et les éventuels messages 
                  d&apos;erreur. Ces données nous aident à améliorer le fonctionnement du site et l&apos;expérience utilisateur.</li>
                  <li><span className="font-medium">- Cookies Fonctionnels:</span> Ces cookies permettent à notre site de se souvenir de vos choix (comme la 
                  langue ou la région) pour vous offrir une expérience personnalisée.</li>
                  <li><span className="font-medium">- Cookies de Publicité:</span> Ces cookies peuvent être utilisés pour diffuser des publicités plus 
                  personnalisées ou pour suivre l&apos;efficacité de nos campagnes publicitaires. Ils enregistrent les 
                  pages que vous avez visitées pour adapter les annonces en conséquence.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="duree">
              <AccordionTrigger>3. Durée de Conservation des Cookies</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Les cookies sont conservés pendant une durée qui dépend de leur type. Certains sont supprimés dès 
                  que vous fermez votre navigateur (cookies de session), tandis que d&apos;autres sont conservés plus 
                  longtemps (cookies persistants).
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="gestion">
              <AccordionTrigger>4. Gestion et Désactivation des Cookies</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Vous avez la possibilité de gérer et de désactiver les cookies en modifiant les paramètres de votre 
                  navigateur. La plupart des navigateurs vous permettent d&apos;accepter ou de refuser les cookies, de 
                  supprimer les cookies existants, ou d&apos;être informé lorsque des cookies sont placés sur votre 
                  appareil.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Pour en savoir plus sur la gestion des cookies, vous pouvez consulter la section d&apos;aide de votre 
                  navigateur.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="modifications">
              <AccordionTrigger>5. Consentement et Modification de la Politique</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  En continuant à utiliser « tradconnect.com », vous consentez à notre utilisation 
                  des cookies comme décrite dans cette politique. Nous pouvons occasionnellement 
                  mettre à jour notre politique de gestion des cookies. Nous vous recommandons 
                  de consulter régulièrement cette page pour rester informé des changements.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact">
              <AccordionTrigger>6. Contact</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Si vous avez des questions ou des préoccupations concernant notre politique de gestion des cookies, vous pouvez nous contacter par mail à l&apos;adresse suivante : contact@tradconnect.com.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
