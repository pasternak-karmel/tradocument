"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
          <div className="text-sm">
          Politique de Confidentialité et de Protection des Données
          </div>
          <div className="text-sm">
          Introduction
          </div>
          
          <p className="text-sm text-muted-foreground">
          Bienvenue sur « tradocument.com ». Nous sommes conscients de l&apos;importance 
          de la protection de votre vie privée et nous nous engageons à protéger les 
          informations personnelles que vous partagez avec nous. Cette politique de 
          confidentialité explique quelles informations sont collectées, comment elles 
          sont utilisées et protégées, ainsi que vos droits concernant vos données personnelles.
          </p>
          <p className="text-sm text-muted-foreground">
          En utilisant « tradocument.com », vous acceptez les pratiques 
          décrites dans cette politique de confidentialité. Si vous avez des questions ou 
          des préoccupations, n&apos;hésitez pas à nous contacter.
          </p>

          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">1. Responsable du Traitement des Données</h2>
              <p className="text-sm text-muted-foreground">
              « Tradocument.com » est responsable de la collecte et du
               traitement de vos données personnelles dans le cadre des services
                que nous proposons. Vous pouvez nous contacter pour toute question relative
                 à cette politique de confidentialité 
                 via l&pos;adresse : [email@tradocument.com](mailto:email@tradocument.com).
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">2. Données Collectées</h2>
              <p className="text-sm text-muted-foreground mb-2">
              Nous collectons et traitons différentes catégories de 
              données pour assurer le bon fonctionnement de nos services et améliorer 
              l&apos;expérience utilisateur sur notre site.
              </p>
              <p className="text-sm text-muted-foreground mb-2">
              Les types de données que nous collectons incluent :
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
                  <span className="font-medium">- Informations d&apos;identité: </span>  nom, prénom, adresse e-mail, et numéro de téléphone.
                </li>
                <li>
                  <span className="font-medium">- Informations de paiement:  </span> détails de carte 
                  de crédit ou compte PayPal pour le traitement des transactions.
                </li>
                <li>
                  <span className="font-medium">- Informations sur les projets:  </span> documents et 
                  informations nécessaires à la traduction, que vous nous confiez pour traitement.
                </li>
                <li>
                  <span className="font-medium">- Données de connexion :  </span> adresse IP, 
                  type de navigateur, pages consultées, et durée des visites pour des raisons de 
                  sécurité et d&apos;amélioration du service.
                </li>
                <li>
                  <span className="font-medium">- Cookies :  </span> technologies de suivi 
                  pour analyser l&apos;usage du site et améliorer votre expérience.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">3. Utilisation des Données</h2>
              <p className="text-sm text-muted-foreground">
              Nous utilisons vos données personnelles dans les buts suivants :
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground pl-4">
                <li>
                  <span className="font-medium">- Prestation de services :  </span> pour gérer et traiter vos 
                  demandes de traduction et vos commandes. 
                </li>
                <li>
                  <span className="font-medium">- Paiement :  </span> pour traiter les transactions 
                  effectuées sur notre site via carte bancaire ou PayPal.
                </li>
                <li>
                  <span className="font-medium">- Communication :  </span>  pour vous informer de l&apos;état de 
                  vos commandes, 
                  des offres promotionnelles ou des actualités de tradocument.com.
                </li>
                <li>
                  <span className="font-medium">- Amélioration de nos services :   </span> pour analyser 
                  l&apos;utilisation
                   de notre site et optimiser son fonctionnement.
                </li>
                <li>
                  <span className="font-medium">- Sécurité :  </span> pour détecter et
                   prévenir les activités frauduleuses ou malveillantes.
                </li>               
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">4. Partage de Vos Données</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                Nous nous engageons à ne pas vendre, louer ou divulguer vos données personnelles à des tiers sans
                 votre consentement, sauf dans les cas suivants :
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground pl-4">
                <li>
                  <span className="font-medium">- Sous-traitants et partenaires :  </span> nous partageons 
                  certaines données avec nos prestataires 
                  pour le traitement des paiements, la traduction ou la livraison.
                </li>
                <li>
                  <span className="font-medium">- Obligations légales:  </span> nous pouvons divulguer vos informations 
                  si la loi nous y oblige ou en 
                  réponse à des demandes légitimes des autorités publiques.
                </li>
                
              </ul>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">5. Sécurité des Données</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                Nous mettons en œuvre toutes les mesures de sécurité techniques 
                et organisationnelles pour protéger vos données personnelles contre 
                l&apos;accès non autorisé, la perte, la destruction ou la divulgation. 
                Vos informations sont stockées sur des serveurs sécurisés et protégés par des 
                systèmes de cryptage et des protocoles de sécurité de haut niveau.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">6. Conservation des Données</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                Vos données personnelles sont conservées uniquement le temps 
                nécessaire pour accomplir les finalités pour lesquelles elles ont été collectées, 
                et conformément aux exigences légales en vigueur. Une fois vos 
                données devenues inutiles, nous les supprimons ou les anonymisons.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">7. Vos Droits</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                En vertu de la réglementation sur la protection des données, 
                vous disposez des droits suivants :
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground pl-4">
                <li>
                - Droit d&apos;accès : vous pouvez demander à savoir quelles informations nous détenons sur vous. 
                </li>
                <li>
                - Droit de rectification : vous pouvez demander la correction
                 des informations inexactes ou incomplètes.
                </li>
                <li>
                - Droit de suppression: vous pouvez demander
                 la suppression de vos données personnelles, dans les limites prévues par la loi.
                </li>
                <li>
                - Droit d&apos;opposition: vous pouvez vous opposer au 
                traitement de vos données dans certains cas.
                </li>
                <li>
                - Droit à la portabilité : vous pouvez demander 
                à recevoir vos données dans un format structuré.
                </li>
                </ul>
                <p>Pour exercer ces droits, veuillez nous contacter à l&apos;adresse
                   [email@tradocument.com](mailto:email@tradocument.com). Nous 
                   répondrons à vos demandes dans les délais prévus par la législation applicable.</p>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">8. Utilisation des Cookies</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                « Tradocument.com » utilise des cookies pour analyser l&apos;utilisation de
                 notre site, optimiser votre expérience utilisateur et personnaliser nos
                  contenus. Vous avez la possibilité de gérer vos préférences en matière
                   de cookies via les paramètres de votre navigateur.
                </p>               
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">9. Modifications de la Politique de Confidentialité</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                Nous nous réservons le droit de modifier cette politique
                 de confidentialité pour refléter les changements apportés
                  à nos pratiques de traitement de données. Toute modification
                   sera publiée sur cette page, et nous vous encourageons à la consulter régulièrement.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">10. Contact</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                Si vous avez des questions ou des préoccupations concernant
                 notre politique de confidentialité, vous pouvez nous contacter
                  à l&apos;adresse [email@tradocument.com](mailto:email@tradocument.com).
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}