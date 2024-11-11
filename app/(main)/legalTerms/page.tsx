import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Component() {
  return (
    <div className="container mx-auto py-6 space-y-8 mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Mentions Légales</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>1. Présentation du site</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Le site web www.Tradocument.com est édité par [Nom de la société ou de l&apos;entrepreneur individuel], situé à [Adresse complète de l&apos;entreprise].
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Nom de la société : [Nom de la société]</li>
                  <li>Adresse du siège social : [Adresse complète]</li>
                  <li>Numéro de téléphone : [Numéro de téléphone]</li>
                  <li>Adresse email : contact@tradocument.com</li>
                  <li>Forme juridique : [Forme juridique de la société, ex. SARL, SASU, etc.]</li>
                  <li>SIRET : [Numéro de SIRET]</li>
                  <li>Numéro d&apos;inscription au RCS : [Numéro d&apos;inscription au Registre du Commerce et des Sociétés]</li>
                </ul>
                <p className="text-sm mt-2">Le directeur de la publication est [Nom du directeur de la publication].</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>2. Hébergement du site</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Le site www.Tradocument.com est hébergé par LWS, situé au 2 rue jules ferry 88190 Golbey RCS Epinal 851 993 683 - APE 6311Z - SIRET 85199368300016
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Nom de l&apos;hébergeur : LWS</li>
                  <li>Adresse : 2 rue jules ferry 88190 Golbey</li>
                  <li>Téléphone: +33 177 62 30 03</li>
                  <li>Site web: www.lws.fr</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>3. Conditions générales d&apos;utilisation</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  L&apos;utilisation du site www.Tradocument.com implique l&apos;acceptation pleine et entière des conditions générales d&apos;utilisation décrites ci-après. Ces conditions d&apos;utilisation peuvent être modifiées ou complétées à tout moment, les utilisateurs du site sont donc invités à les consulter de manière régulière.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>4. Description des services fournis</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Le site www.Tradocument.com a pour objet de fournir un service de traduction de documents. Il propose également la possibilité pour les utilisateurs de rejoindre une équipe de traducteurs professionnels et de faire des demandes de devis.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Le site met à disposition divers modes de livraison, y compris par coursier privé, taxi bus, et DHL, pour garantir la rapidité et la sécurité de la livraison des documents.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>5. Propriété intellectuelle et contrefaçons</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Tous les contenus présents sur le site www.Tradocument.com, incluant, de manière non limitative, les textes, images, graphismes, logos, icônes, sons, logiciels, sont la propriété de la société [Nom de la société] ou de ses partenaires. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de la société [Nom de la société].
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>6. Gestion des données personnelles</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-2">
                  www.Tradocument.com s&apos;engage à respecter la vie privée des utilisateurs. Les informations personnelles collectées sur le site sont utilisées exclusivement pour les besoins de certains services proposés par Tradocument.com, notamment pour la gestion des devis, la gestion des commandes et la communication avec les utilisateurs.
                </p>
                <p className="text-sm text-muted-foreground">
                  Conformément aux dispositions légales en vigueur, chaque utilisateur dispose d&apos;un droit d&apos;accès, de rectification, de suppression et d&apos;opposition aux données personnelles le concernant, en effectuant sa demande écrite et signée, accompagnée d&apos;une copie du titre d&apos;identité avec signature du titulaire de la pièce, en précisant l&apos;adresse à laquelle la réponse doit être envoyée.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>7. Sécurité des paiements</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Le site www.Tradocument.com propose les modes de paiement par carte bancaire et PayPal. Pour assurer la sécurité des paiements, des mesures anti-fraude et un captcha sont mis en place pour éviter les attaques de robots et garantir la sécurité des transactions.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>8. Responsabilité</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Tradocument.com ne pourra être tenu pour responsable des dommages directs ou indirects causés au matériel de l&apos;utilisateur, lors de l&apos;accès au site. Le site décline également toute responsabilité quant à l&apos;utilisation des informations fournies par les utilisateurs sur la plateforme.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger>9. Droit applicable et attribution de juridiction</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Tout litige en relation avec l&apos;utilisation du site www.Tradocument.com est soumis au droit français. En cas de litige, la compétence est attribuée aux tribunaux compétents de [Ville où est située la société].
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger>10. Contact</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Pour toute question relative aux mentions légales du site, vous pouvez contacter Tradocument.com par email à l&apos;adresse suivante : contact@tradocument.com.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}